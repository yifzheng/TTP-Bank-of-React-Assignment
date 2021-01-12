import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import DisplayDebit from "./DisplayDebit";
import AccountBalance from "./AccountBalance"

class Debits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
            addDebit: false,
            debit: this.props.debits
        }
        this.formDescription = React.createRef();
        this.formAmount = React.createRef();
        this.formDate = React.createRef();
    }

    handleSubmit = () => {
        let obj = {
            id : this.formDescription.current.value + this.formAmount.current.value + this.formDate.current.value,
            description : this.formDescription.current.value,
            amount: this.formAmount.current.value,
            date : this.formDate.current.value
        }
        console.log(obj);
        let arr = this.props.debits;
        arr.push(obj);
        this.setState({
            debit : arr
        })
        {console.log(arr)}
    }
    render() {
        return (
            <div id="debits-page">
                <Link to="/">Home Page</Link>

                <h1>Debits Page</h1>
                <button onClick={e => this.setState({ display: !this.state.display })}>View Balance</button>
                <button onClick={e => this.setState({ addDebit: !this.state.addDebit })}>Add Debit</button>
                {this.state.display && <AccountBalance accountBalance={"124412"} />}
                {this.state.addDebit &&
                    <div id="debit-form">
                        <form>
                            <label id="debit-desription">
                                Description:
                        <input type="text" name="formDescription" placeholder={"Starbucks"} ref = {this.formDescription} />
                            </label>
                            <label id="debit-desription">
                                Amount:
                        <input type="text" name="formAmount" placeholder={"100.15"} ref = {this.formAmount} />
                            </label>
                            <label id="debit-desription">
                                Date:
                        <input type="text" name="formDate" placeholder={"2021-01-12"} ref = {this.formDate} />
                            </label>

                        </form>
                        <button onClick = {this.handleSubmit}>Submit</button>
                    </div>
                }

                {
                    this.state.debit.map((item) => {
                        return (
                            <DisplayDebit key={item.id} description={item.description} amount={item.amount} date={item.date} />
                        )
                    })
                }
            </div>

        );
    }
}

export default Debits;