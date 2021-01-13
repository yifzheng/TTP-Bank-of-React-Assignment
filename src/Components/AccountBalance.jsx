import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./balance.css";

class AccountBalance extends Component {

    constructor(props){
        super(props);

        this.state = {
            balance : this.props.accountBalance
        }
    }
    render() {
        let num = parseFloat(this.state.balance);
        return (
            <h3 className = "balance">Balance : {num}</h3>
        )
    }
}

export default AccountBalance;