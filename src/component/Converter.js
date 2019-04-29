import React, {Component} from 'react'
import "../css/Converter.css"

class Converter extends Component {


    state = {
        value : 1
    }


    handleChange = (event) => {
        const {value} = event.target;
        this.setState({value});

        // updates amount value in parent component;
        this.props.amtFunc(value);
    }

    render() {
        return (
            <div className="inbox">
                <input onChange={this.handleChange} name="amt" type="text" value={this.state.value}/>
                <label id="label" for="amt"> Bitcoin</label>
            </div>
        );
    }

}

export default Converter;
