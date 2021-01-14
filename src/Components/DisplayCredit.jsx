import React, { Component } from "react";
import './credit.css'


class DisplayCredit extends Component {
    render() {
        return (
            <div  id="display">
                Description: {this.props.description}<br />
                Amount: ${this.props.amount} <br/>
                Date: {this.props.date}
            </div>
            
        );
    }
}

export default DisplayCredit;