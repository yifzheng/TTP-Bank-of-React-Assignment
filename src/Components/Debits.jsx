import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import DisplayDebit from "./DisplayDebit";
import AccountBalance from "./AccountBalance"

class Debits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
            displayDebit: false,
            addDebit: false,
            totalBalance: this.props.totalAmount,
            creditAmount: this.props.creditAmount,
            debitAmount: this.props.amount,
            debit: this.props.debits
        }
        this.formDescription = React.createRef();
        this.formAmount = React.createRef();
        this.formDate = React.createRef();
    }


    setBalance = () => {
        const num = this.props.creditAmount;
        return (
            this.setState({
                totalBalance: parseFloat(num - this.state.debitAmount)
            })
        )
    }

    handleSubmit = () => {
        Number(this.formAmount.current.value);
        let num = parseFloat(this.formAmount.current.value)
        let obj = {
            id: this.formDescription.current.value + this.formAmount.current.value + this.formDate.current.value + Math.random() * 100,
            description: this.formDescription.current.value,
            amount: num,
            date: this.formDate.current.value
        }
        let arr = this.props.debits;
        arr.push(obj);
        const total = parseFloat(this.state.debitAmount + num);
        this.setState({
            debitAmount: total,
            debit: arr,
            addDebit: false
        })
        this.props.debitCallBack(num);
    }


    viewBalance = () => {
        this.setState({
            display: !this.state.display,
            addDebit: false
        })
    }

    handleCancel = () => {
        this.setState({
            addDebit: false
        })
    }

    render() {
        let displayDebit = <div id="debit-cards">
            {
                this.state.debit.map((item) => {
                    return (
                        <DisplayDebit key={item.id} description={item.description} amount={item.amount} date={item.date} />
                    )
                })
            }
        </div>
        return (
            <div id="debits-page">
                {!this.state.addDebit && !this.state.display && <div className="btn">
                    <Link to="/" style={{ textDecoration: 'none' }}><button className="return-home" >Home Page</button></Link>
                    <button className="return-home" style={{ textDecoration: 'none' }} onClick={e => this.setState({ displayDebit: !this.state.displayDebit })}>Display Debit</button>
                    <button className="balanceBtn" onClick={this.viewBalance}>View Balance</button>
                    <button className="addBtn" onClick={e => { this.setState({ addDebit: !this.state.addDebit, display: false }) }}>Add Debit</button>
                </div>}
                {this.state.display &&
                    <div id = "display-balance">
                        <h1>Account Balance: ${this.props.totalAmount.toFixed(2)}</h1>
                        <button className="return-debit" onClick={() => this.setState({display : false})}>Back</button>
                    </div>}
                {this.state.addDebit &&
                        (<div id="debit-form">
                            <form>
                                <label id="debit-desription">
                                    Description:
                                    <input type="text" name="formDescription" placeholder={"Starbucks"} ref={this.formDescription} />
                                </label>
                                <label id="debit-desription">
                                    Amount:
                                    <input type="number" name="formAmount" placeholder={100.15} ref={this.formAmount} />
                                </label>
                                <label id="debit-desription">
                                    Date:
                                <input type="text" name="formDate" placeholder={"2021-01-12"} ref={this.formDate} />
                                </label>

                            </form>
                            <button className="submit-btn" onClick={this.handleSubmit}>Submit</button>
                            <button className="cancel-btn" onClick={this.handleCancel}>Cancel</button>
                        </div>)
                    }
                <br></br>
                <h1>{this.props.message}</h1>
                <br></br>
                <br></br>
                {this.state.displayDebit && displayDebit}
            </div>

        );
    }
}

export default Debits;