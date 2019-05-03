import React, {useState, useEffect} from "react"
import '../css/Ticker.css'

export default function Ticker(props) {

    const [priceData, setPriceData] = useState({
        status : {
            price : 0,
            vol : 0,
            min : 0,
            max : 0,
        },
        style : {
            color : "white"
        },
        isLoading : true
    });

    const currFormatter = Intl.NumberFormat('en-US', {
        style : 'currency',
        currency : "INR"
    });

    const fetchPrice = () => {
        setPriceData(prev => {return {...prev, isLoading : true}});
        
        const url = props.data.url;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const values = props.data.func(data);
            const {price, vol, min, max} = values;
            const formattedPrice = Number.parseFloat((Number.parseFloat(price)).toFixed(2));

            setPriceData(prev =>  {
                let color = "";
                const oldPrice = prev.status.price;
            
                // Set price color based on price movements
                if(prev.status.price) {
                    if(price > oldPrice)
                        color = "green"
                    else if(price < oldPrice)
                        color = "red"
                    else
                        color = prev.style.color;
                }

                return {
                    status : {
                        price : formattedPrice, 
                        vol, min, max
                    },
                    style : {color},
                    isLoading : false
                };
            });
            
            // Return price back to parent component
            props.getBack(formattedPrice);

        })
        .catch(err => {
            setPriceData(prev => {return {...prev, isLoading: false, status : {...prev.status, price : 0}}});
        });
    }


    useEffect(() => {
        fetchPrice();
        const timer = setInterval(fetchPrice,30000);
        
        return () => {clearInterval(timer);}
    }, []);

    return (
        <div className="ticker">
            <span style={priceData.style} className="price">{priceData.isLoading ? "Refreshing..." : currFormatter.format(priceData.status.price)}</span>
            <span className="details">{props.data.name}</span>
        </div>
    );
}
