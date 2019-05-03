import React, {useState} from 'react'
import "../css/Converter.css"

export default function Converter(props) {

    const [value, setValue] = useState("1");

    const handleChange = (event) => {
        const {value} = event.target;
        setValue(value);

        // updates amount value in parent component;
        props.amtFunc(value);
    }

    return (
        <div className="inbox">
            <input onChange={handleChange} name="amt" type="text" value={value}/>
            <label id="label" for="amt"> Bitcoin</label>
        </div>
    );
}
