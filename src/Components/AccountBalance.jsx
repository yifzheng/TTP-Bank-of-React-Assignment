import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class AccountBalance extends Component {

    constructor(props){
        super(props);

        this.state = {
            debits : []
        }
    }
    render() {
        return (
            <div>
                <h3>Balance : {this.props.accountBalance}</h3>
            </div>
        )
    }
}

export default AccountBalance;