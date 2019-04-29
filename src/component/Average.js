import React from "react"
import "../css/Average.css"

function Average(props) {
    
    function calAverage(arr) {
        let currencyFormatter = Intl.NumberFormat('en-US', {
            style : 'currency',
            currency : 'INR'
        });
        
        let amount = Number.parseFloat(props.amount);
        return arr.length ? currencyFormatter.format((((arr.reduce((a, b) => a + b) / arr.length) * amount).toFixed(2))) : 0;
    }

    return (
        <div>
            <span className="average">{calAverage(props.prices)}</span>
        </div>
    );
}

export default Average;
