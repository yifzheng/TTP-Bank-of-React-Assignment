import React, { Component } from "react";

import "./debits.css";

class DisplayDebit extends Component {
    render() {
        return (
            <div id = "debit-card">
                <h3>Description: {this.props.description}</h3>
                <h3>Amount: {this.props.amount}</h3>
                <h3>Date: {this.props.date}</h3>
            </div>
        );
    }
}

export default DisplayDebit;