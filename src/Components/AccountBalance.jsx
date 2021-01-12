import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
            <div>
                <h3>Balance : {num}</h3>
            </div>
        )
    }
}

export default AccountBalance;