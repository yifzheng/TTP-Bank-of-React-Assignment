import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class AccountBalance extends Component {

    render() {
        return (
            <div>
                <h1>Balance : {this.props.accountBalance} $</h1>
            </div>
        )
    }
}

export default AccountBalance;