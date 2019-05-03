import React, {useState} from 'react';
import Exchanges from "./Exchanges"
import Converter from "./component/Converter"
import Ticker from "./component/Ticker"
import Average from "./component/Average"
import Footer from "./component/Footer"
import "./css/App.css"

export default function App() {

    const [price, setPrice] = useState({
    
        totalPrice : [],
        amount : 1

    });

    const getPriceBack = data => setPrice(prev => {return {...prev, totalPrice : [...prev.totalPrice, data]}});
    const setAmount = amt => setPrice(prev => {return {...prev, amount:amt}});
    
    const exchanges = new Exchanges(); 
    const tickers = exchanges.data.map((current) => {
            return <Ticker 
                    key = {current.id}
                    data = {current} 
                    getBack = {getPriceBack} />
    }); 

    return (
        <div className="appBox">
            <Converter amtFunc={setAmount} />
            <Average prices={price.totalPrice} amount={price.amount}/>    
            <div className="tickerBox">
                {tickers}
            </div>
            <Footer />
        </div>
    );
    
}
