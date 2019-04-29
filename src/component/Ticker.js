import React, {Component} from "react"
import '../css/Ticker.css'

class Ticker extends Component {

    state = {
        status : {
            price : 0,
            oldPrice : 0,
            vol : 0,
            min : 0,
            max : 0,
        },
        style : {
            color:"white"
        },
        isLoading : true
    }

    currFormatter = Intl.NumberFormat('en-US', {
        style : 'currency',
        currency : "INR"
    });

    fetchPrice = () => {
        this.setState({isLoading : true});
        const url = this.props.data.url;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const values = this.props.data.func(data);
            const {price, vol, min, max} = values;
            const formattedPrice = Number.parseFloat((Number.parseFloat(price)).toFixed(2));
            this.setState((prevState) => {
                const oldPrice = prevState.status.oldPrice;
                let color;
                
                // Set price color based on price movements
                if(prevState.status.price) {
                    if(price > oldPrice)
                        color = "green"
                    else if(price < oldPrice)
                        color = "red"
                    else
                        color = prevState.style.color;
                }

                return {status : 
                    {price : formattedPrice, 
                        vol, min, max,oldPrice},
                    style : {color},
                    isLoading : false}
            });
            
            // Return price back to parent component
            this.props.getBack(formattedPrice);

        })
        .catch(err => {
            this.setState({isLoading: false, price : 0});
        });
    }


    componentDidMount() {
        this.fetchPrice();
        this.timer = setInterval(this.fetchPrice,30000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {

        return (
            <div className="ticker">
                <span style={this.state.style} className="price">{this.state.isLoading ? "Refreshing..." : this.currFormatter.format(this.state.status.price)}</span>
                <span className="details">{this.props.data.name}</span>
            </div>
        );
    }
}

export default Ticker;
