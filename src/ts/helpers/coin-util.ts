import { Coin } from "../models/coin";

export default {
  getAvailable: function(): Coin[] {
    return COINS;
  },

  findCoinInArray: function(array: Coin[], coinSymbol: string): Coin | null {
    let coin: Coin | null = null;

    array.forEach(element => {
      if (element.symbol === coinSymbol) {
        coin = element;
      }
    });

    return coin;
  }
};

const COINS = [
  new Coin("ADA", "Cardano"),
  new Coin("ADC", "AudioCoin"),
  new Coin("AEON", "Aeon"),
  new Coin("AMP", "Synereo"),
  new Coin("ANC", "Anoncoin"),
  new Coin("ANT", "Aragon"),
  new Coin("ARDR", "Ardor"),
  new Coin("ARK", "Ark"),
  new Coin("AUR", "Aurora Coin"),
  new Coin("BAT", "Basic Attention Coin"),
  new Coin("BAY", "BitBay"),
  new Coin("BCN", "ByteCoin"),
  new Coin("BCH", "Bitcoin Cash"),
  new Coin("BNB", "Binance Coin"),
  new Coin("BRK", "BreakoutCoin"),
  new Coin("BRX", "Breakout Stake"),
  new Coin("BSD", "BitSend"),
  new Coin("BTA", "Bata"),
  new Coin("BTC", "Bitcoin"),
  new Coin("BTCD", "BitcoinDark"),
  new Coin("BTS", "BitShares"),
  new Coin("CLAM", "CLAMS"),
  new Coin("CLOAK", "CloakCoin"),
  new Coin("DASH", "Dash"),
  new Coin("DCR", "Decred"),
  new Coin("DCT", "Decent"),
  new Coin("DGB", "DigiByte"),
  new Coin("DGD", "Digix DAO"),
  new Coin("DMD", "Diamond"),
  new Coin("DOGE", "Dogecoin"),
  new Coin("EMC", "Emercoin"),
  new Coin("EOS", "EOS"),
  new Coin("ETC", "Ethereum Classic"),
  new Coin("ETH", "Ethereum"),
  new Coin("ETP", "Metaverse"),
  new Coin("FCT", "Factoids"),
  new Coin("FLO", "FlorinCoin"),
  new Coin("FTC", "FeatherCoin"),
  new Coin("GAME", "Gamecredits"),
  new Coin("GAS", "Gas"),
  new Coin("GBYTE", "Byteball"),
  new Coin("GLD", "GoldCoin"),
  new Coin("GNO", "Gnosis"),
  new Coin("GNT", "Golem Network Token"),
  new Coin("GOLOS", "Golos"),
  new Coin("GRC", "GridCoin"),
  new Coin("GRS", "Groestlcoin"),
  new Coin("HSR", "Hshare"),
  new Coin("ICN", "Iconomi"),
  new Coin("INCNT", "Incent"),
  new Coin("IOC", "IOCoin"),
  new Coin("IOT", "IOTA"),
  new Coin("KNC", "Kyber Network"),
  new Coin("KMD", "Komodo"),
  new Coin("KORE", "Kore"),
  new Coin("LBC", "LBRY Credits"),
  new Coin("LDOGE", "LiteDoge"),
  new Coin("LSK", "Lisk"),
  new Coin("LTC", "Litecoin"),
  new Coin("MAID", "MaidSafe Coin"),
  new Coin("MINT", "MintCoin"),
  new Coin("MONA", "MonaCoin"),
  new Coin("MUE", "MonetaryUnit"),
  new Coin("NBT", "NuBits"),
  new Coin("NEO", "NEO"),
  new Coin("NEOS", "NeosCoin"),
  new Coin("NLG", "Gulden"),
  new Coin("NMC", "NameCoin"),
  new Coin("NVC", "NovaCoin"),
  new Coin("NXT", "Nxt"),
  new Coin("OK", "OKCash"),
  new Coin("OMG", "OmiseGo"),
  new Coin("OMNI", "Omni"),
  new Coin("PART", "Particl"),
  new Coin("PAY", "TenX"),
  new Coin("PINK", "PinkCoin"),
  new Coin("PIVX", "Private Instant Verified Transaction"),
  new Coin("POWR", "Power Ledger"),
  new Coin("PPC", "PeerCoin"),
  new Coin("PPT", "Populous"),
  new Coin("QRK", "QuarkCoin"),
  new Coin("QTUM", "Qtum"),
  new Coin("RADS", "Radium"),
  new Coin("RBY", "RubyCoin"),
  new Coin("RDD", "ReddCoin"),
  new Coin("REP", "Augur"),
  new Coin("RISE", "Rise"),
  new Coin("SALT", "Salt Lending"),
  new Coin("SC", "Siacoin"),
  new Coin("SNRG", "Synergy"),
  new Coin("SNT", "Status Network Token"),
  new Coin("START", "StartCoin"),
  new Coin("STEEM", "Steem"),
  new Coin("STORJ", "Storj"),
  new Coin("STRAT", "Stratis"),
  new Coin("SWIFT", "BitSwift"),
  new Coin("SYS", "SysCoin"),
  new Coin("TRIG", "Trigger"),
  new Coin("TX", "Transfer"),
  new Coin("UBQ", "Ubiq"),
  new Coin("USDT", "Tether"),
  new Coin("VERI", "Veritaseum"),
  new Coin("VRC", "VeriCoin"),
  new Coin("VTC", "VertCoin"),
  new Coin("WAVES", "Waves"),
  new Coin("WTC", "Walton"),
  new Coin("XCP", "CounterParty"),
  new Coin("XEM", "NEM"),
  new Coin("XLM", "Stellar"),
  new Coin("XMR", "Monero"),
  new Coin("XPM", "PrimeCoin"),
  new Coin("XRP", "Ripple"),
  new Coin("XUC", "Exchange Union"),
  new Coin("XVG", "Verge"),
  new Coin("ZEC", "Zcash")
];
