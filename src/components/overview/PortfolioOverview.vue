<template>
  <div class="portfolio-overview">

    <div v-if="loadedStorage">

      <div class="empty-state" v-if="isEmpty">
        <h1>Your Portfolio is Empty!</h1>
        <h3>Add a balance to get started.</h3>
        <svg class="empty-arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve" width="16" height="16"><g class="nc-icon-wrapper" fill="#00334c"><polygon fill="#00334c" points="14.7,9.3 13.3,7.9 9,12.2 9,0 7,0 7,12.2 2.7,7.9 1.3,9.3 8,16 "></polygon></g></svg>
      </div>

      <div class="dashboard-content" v-else>
        <div class="time-range-picker">
          <!--
          <time-interval-picker
            @update:selected-interval="val => selectedInterval = val">
          </time-interval-picker>
          -->
        </div>
        <portfolio-total
          :total-balance="totalBalance"
          :currency-symbol="selectedCurrencySymbol">     
        </portfolio-total>

        <div class="column-labels">
          <ul>
            <li>Coin</li>
            <li>Amount</li>
            <li>Value Per Coin</li>
            <li>Balance</li>
          </ul>
        </div>

        <div
          class="balance-wrapper" 
          v-for="balance in balanceData" 
          :key="balance.coin.symbol"
          @click="viewTransactionsForCoin(balance.coin.symbol)">

          <portfolio-balance
            :coin-amount="balance.amount"
            :coin-name="balance.coin.symbol"
            :coin-price="balance.getPriceInCurrency(selectedCurrency)"
            :currency-symbol="selectedCurrencySymbol">
          </portfolio-balance>

        </div>
      </div>

    </div>

    <div class="loading-container" v-else>
      <spinner size="large" :line-fg-color="primaryColor" :text-fg-color="primaryColor" message="Loading..."></spinner>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PortfolioTotal from "./PortfolioTotal.vue";
import PortfolioBalance from "./PortfolioBalance.vue";
import TimeIntervalPicker from "./../TimeIntervalPicker.vue";
import Spinner from "vue-simple-spinner";
import { TimeInterval } from "../../ts/enums/time-interval";
import { Balance } from "../../ts/models/balance";
import { StringMap } from "../../ts/string-map";
import { AppData } from "../../ts/app-data";

export default Vue.extend({
  name: "portfolio-overview",

  components: {
    PortfolioBalance,
    PortfolioTotal,
    Spinner,
    TimeIntervalPicker
  },

  props: {
    reloadData: {
      required: true,
      type: Boolean
    }
  },

  data() {
    return {
      balanceData: <StringMap<Balance>>{},
      errors: [],
      loadedStorage: false,
      primaryColor: AppData.settingsManager.getPrimaryColor(),
      selectedCurrency: "USD",
      selectedCurrencySymbol: "$",
      selectedInterval: TimeInterval.ONE_DAY
    };
  },

  mounted() {
    AppData.settingsManager.loadSettings().then(response => {
      this.selectedCurrency = AppData.settingsManager.getSelectedCurrency();
      this.selectedCurrencySymbol = AppData.settingsManager.getSelectedCurrencySymbol();
      this.selectedInterval = AppData.settingsManager.getTimeInterval();
      this.loadBalances(false);
    });
  },

  methods: {
    loadBalances: function(ignoreTimer: boolean) {
      AppData.transactionManager
        .getAllBalances()
        .then(balanceData => {
          this.balanceData = balanceData;
          this.loadedStorage = true;
          this.refreshPrices(ignoreTimer);
        })
        .catch(error => {
          console.log(error);
        });
    },

    refreshPrices: function(ignoreTimer: boolean) {
      let coins = [];
      for (let key in this.balanceData) {
        coins.push(key);
      }

      // Only check prices if coins have been added
      if (coins.length > 0) {
        AppData.priceManager.refreshPrices(coins, ignoreTimer).then(response => {
          if (response.successful) {
            // If call was successful, result will be defined
            let result = response.result!!;

            for (let key in result) {
              // Update data with new prices
              this.balanceData[key].price = result[key];
            }
          }
        });
      }
    },

    viewTransactionsForCoin: function(coinSymbol: string) {
      this.$emit("view-transactions", coinSymbol);
    }
  },

  watch: {
    reloadData: function(reload: boolean) {
      if (reload) {
        this.$emit("update:reload-data", false);
        this.loadedStorage = false;
        this.loadBalances(true);
      }
    },

    selectedInterval: function(interval: string) {
      console.log(interval);
    }
  },

  computed: {
    totalBalance: function() {
      let totalBalance = 0;
      if (this.loadedStorage) {
        for (let key in this.balanceData) {
          // If the coin has a stored price, add it to the total
          let balance = this.balanceData[key];
          if (balance.price) {
            totalBalance += balance.amount * balance.price[this.selectedCurrency];
          }
        }
      }

      return totalBalance.toFixed(2);
    },

    isEmpty: function(): Boolean {
      return Object.keys(this.balanceData).length === 0;
    }
  }
});
</script>

<style scoped>
.portfolio-overview {
  min-height: 100vh;
  background-color: var(--view-bg-theme-color);
  background-image: var(--view-bg-theme-gradient);
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr 200px 200px 200px 200px 1fr;
  grid-template-rows: 24px 242px 48px 96px;
  grid-auto-rows: 96px;
  grid-gap: 16px;
  grid-template-areas:
    ". time-picker     time-picker     time-picker     time-picker    ."
    ". total           total           total           total          ."
    ". balance-labels  balance-labels  balance-labels  balance-labels ."
    ". balance         balance         balance         balance        .";
  padding-bottom: 62px;
}

@media screen and (max-width: 1100px) {
  .dashboard-content {
    grid-template-columns:
      0.5fr minmax(50px, 1fr) minmax(50px, 1fr) minmax(50px, 1fr)
      minmax(50px, 1fr) 0.5fr;
  }
}

@media screen and (min-width: 2000px) {
  .dashboard-content {
    grid-template-columns: 1fr 360px 360px 360px 360px 1fr;
  }
}

.time-range-picker {
  grid-row: 1 / 2;
  grid-column: 2 / 6;
  grid-area: time-picker;
  align-self: center;
}

.column-labels {
  grid-area: balance-labels;
  align-self: end;
  margin-top: 12px;

  & ul {
    display: grid;
    list-style: none;
    text-align: left;
    font-weight: 600;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 0px 32px;
  }
}

.balance-wrapper {
  grid-area: balance;
  grid-row: auto;
}

.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
}

.empty-state {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.5;

  & h3 {
    margin-top: -8px;
    font-weight: 400;
  }

  & .empty-arrow {
    margin-top: 24px;
    transform: rotate(45deg) scale(2);
    transition: all 0.5s var(--ease-in-out-cubic);
  }

  & .empty-arrow:hover {
    transform: rotate(405deg) scale(2);
  }
}
</style>
