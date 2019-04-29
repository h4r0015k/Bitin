import React, {Component} from 'react';
import Exchanges from "./Exchanges"
import Converter from "./component/Converter"
import Ticker from "./component/Ticker"
import Average from "./component/Average"
import Footer from "./component/Footer"
import "./css/App.css"

class App extends Component {

    constructor() {
        super();
        
        this.state = {
            totalPrice : [],
            amount : 1
        }

        this.exchanges = new Exchanges(); 
        this.tickers = this.exchanges.data.map((current) => {
            return <Ticker key = {current.id}
                data = {current} 
                getBack = {this.getPriceBack}
                />
        })
    }

    getPriceBack = data => {
        this.setState(prevState => {
            return {totalPrice : [...prevState.totalPrice, data]}
        });
    }

    setAmount = amt => {
        this.setState({amount:amt});
    }

    render() {
        return (
            <div className="appBox">
                <Converter amtFunc={this.setAmount} />
                <Average prices={this.state.totalPrice} amount={this.state.amount}/>    
                <div className="tickerBox">
                    {this.tickers}
                </div>
                <Footer />
            </div>
        );
    }

}

export default App;
