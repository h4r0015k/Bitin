class Exchanges {

    data = [
        {
            id : 0,
            name : "Bitbns",
            url : "https://cors-anywhere.herokuapp.com/https://bitbns.com/order/getTickerWithVolume/",
            func : this.getBitbns
        },
        {
            id : 1,
            name : "Coindcx",
            url : "https://api.coindcx.com/exchange/ticker",
            func : this.getCoindcx
            
        },
        {
            id : 2,
            name : "Koinex",
            url : "https://koinex.in/api/ticker",
            func : this.getKoinex
        },
        {
            id : 3,
            name : "LocalBitcoin",
            url : "https://cors-anywhere.herokuapp.com/https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/",
            func : this.getLbc
        },
        {
            id : 4,
            name : "Pocketbits",
            url : "https://cors-anywhere.herokuapp.com/https://pocketbits.in/api/tickerall",
            func : this.getPocketbits
        },
        {
            id : 5,
            name : "Wazirx",
            url : "https://cors-anywhere.herokuapp.com/https://api.wazirx.com/api/v2/tickers",
            func : this.getWazir
        }
    ]


    getBitbns(value) {
        const {last_traded_price} = value["BTC"];
        const {volume} = value["BTC"].volume.volume;

        return {price : last_traded_price, max : 0, min : 0, vol : volume};
    }

    getCoindcx(value) {
        const {last_price,high, low} = value[0];
        return {price : last_price, max : high, min : low, vol : 0};
    }

    getKoinex(value) {
        const {last_traded_price, min_24hr, max_24hr, vol_24hrs} = value.stats.inr.BTC; 
        return {price : last_traded_price, max : max_24hr, min : min_24hr, vol : vol_24hrs};
    }

    getLbc(value) {
        const {last} = value["INR"].rates;
        return {price : last, max : 0, min : 0, vol : 0};
    }

    getPocketbits(value) {
        return {price : value["Altcoins"][0]["AltSellPrice"], max : 0, min : 0, vol : 0};
    }

    getWazir(value) {
        const {last, low, high, volume} = value["btcinr"];
        return {price : last, min : low, max : high, vol : volume}
    }


}

export default Exchanges;
