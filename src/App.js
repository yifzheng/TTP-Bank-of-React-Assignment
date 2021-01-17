import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

//components
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import LogIn from "./Components/Login";
import Debits from "./Components/Debits";
import "./App.css";
import Credit from './Components/Credits'
import "./Components/credit.css"


class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 0, // formula = credit - debit
      currentUser: {
        userName: "John_Doe",
        memberSince: "08/23/99",
      },
      debit: [], // to store data pulled from debit api
      debitAmount: 0, // to store amount of $ extracted from debit api
      credit: [], // to store data pulled from credit api
      CreditAmount: 0 // to store amount of $ extracted from credit api
    };
  }

  // callback function used to assign as a prop to retrieve the amount of money from debit component
  debitCallBack = (data) => {
    const sum = parseFloat(this.state.accountBalance - data);
    // set the state of accountBalance = this.state.accountBalance - data because account balance is credit-debit
    this.setState({accountBalance : sum}, () => console.log(this.state.accountBalance))
    // update debitamount state
    this.setState({
      debitAmount : this.state.debitAmount + data,
    })   
    console.log("it is working " + this.state.totalAmount); 
  }
  // callback function used to assign as a prop to retrieve the amount of money from credit component
  creditCallBack = data => {
    const sum = parseFloat(this.state.accountBalance + data);
    // update creditAmount state
    this.setState({
      CreditAmount : this.state.CreditAmount + data.value
    })
    // set the state of accountBalance = this.state.accountBalance + data because account balance is credit-debit
    this.setState({accountBalance : sum}, () => console.log(this.state.accountBalance))
  }
  // mock login function. Information enetered in login component is used to set the state of current user
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };
  // in componentDidMount(), we fetch data from api's asyncronously and update the states of credit and debit
  async componentDidMount() {
    try {
      let url = "https://moj-api.herokuapp.com/debits";
      let url2 = "https://moj-api.herokuapp.com/credits";
      let response = await fetch(url);
      let response2 = await fetch(url2);
      const data = await response.json();
      const data2 = await response2.json();
      this.setState({
        debit: data,
        credit: data2,
      });
      // map through the debit and credit states and update creditAmount and debitAmount
      this.state.debit.map((item) => {
        this.setState({
          debitAmount: this.state.debitAmount + item.amount,
          accountBalance : this.state.accountBalance - item.amount
        });
      });
      this.state.credit.map((elem) =>{
          this.setState({
            CreditAmount: this.state.CreditAmount + elem.amount,
            accountBalance: this.state.accountBalance + elem.amount
          })
      })
      parseFloat(this.state.CreditAmount);
      parseFloat(this.state.debitAmount);
    } catch (error) {
      console.error(error);
    }
  }
  // render() function
  render() {
    const CreditComponent = () => (
      <Credit
        credits={this.state.credit}
        creditAmount={this.state.CreditAmount}
        balance={this.state.accountBalance}
        creditCallBack={this.creditCallBack} 
        totalAmount={this.state.totalAmount}
      />
    );
    // routes to other components
    return (
      <Router basename={process.env.PUBLIC_URL + '/'}>
        <Switch>
          <Route exact path="/">
            <Home accountBalance={this.state.accountBalance}/>
          </Route>
          <Route exact path="/userProfile">
            <UserProfile
              userName={this.state.currentUser.userName}
              memberSince={this.state.currentUser.memberSince}
            ></UserProfile>
          </Route>
          <Route exact path="/login">
            <LogIn
              user={this.state.currentUser}
              mockLogIn={this.mockLogIn}
              {...this.props}
            />
          </Route>
          <Route exact path="/debits">
            <Debits debits={this.state.debit} amount={this.state.debitAmount} debitCallBack={this.debitCallBack} totalAmount={this.state.accountBalance}/>
          </Route>
          <Route path="/Credits" render={CreditComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
