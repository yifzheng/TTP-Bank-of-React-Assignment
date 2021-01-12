import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DisplayDebit from "./DisplayDebit";

class Debits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            debit: this.props.debits
        }
    }
    render() {
        return (
            <div id="debits-page">
                <Link to="/">Home Page</Link>

                <h1>Debits Page</h1>

                {
                    this.state.debit.map((item, key) => {
                        return (
                            <DisplayDebit description = {item.description} amount = {item.amount} date = {item.date} />
                        )
                    })
                }
            </div>

        );
    }
}

export default Debits;