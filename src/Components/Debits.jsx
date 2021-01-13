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
            debitAmount: this.props.amount,
            debit: this.props.debits
        }
        this.formDescription = React.createRef();
        this.formAmount = React.createRef();
        this.formDate = React.createRef();
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
            debit: arr
        })
    }


    viewBalance = () => {
        this.setState({
            display: !this.state.display,
            addDebit : false
        })
        this.props.parentCallBack("100000");
    }

    handleCancel = () => {
        this.setState({
            addDebit: false
        })
    }

    render() {
        return (
            <div id="debits-page">

                <div className="btn">
                    <button className="return-home" ><Link to="/" style={{ textDecoration: 'none' }}>Home Page</Link></button>
                    <button className="balanceBtn" onClick={this.viewBalance}>View Balance</button>
                    <button className="addBtn" onClick={e => this.setState({ addDebit: !this.state.addDebit, display : false })}>Add Debit</button>
                    {this.state.display && <AccountBalance accountBalance={this.state.debitAmount} />}
                    {this.state.addDebit &&
                        <div id="debit-form">
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
                            <button className = "submit-btn"onClick={this.handleSubmit}>Submit</button>
                            <button className = "cancel-btn" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    }
                </div>
                <br></br>
                <h1>Debits Page</h1>
                <br></br>
                <br></br>
                <div id="debit-cards">
                    {
                        this.state.debit.map((item) => {
                            return (
                                <DisplayDebit key={item.id} description={item.description} amount={item.amount} date={item.date} />
                            )
                        })
                    }
                </div>


            </div>

        );
    }
}

export default Debits;