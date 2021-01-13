import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//components
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import LogIn from "./Components/Login";
import Debits from "./Components/Debits";
import "./App.css";
import Credit from "./Components/Credits";

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "John_Doe",
        memberSince: "08/23/99",
      },
      debit: [],
      debitAmount: 0,
      credit: [],
      CreditAmount: 0
    };
  }

  setDebitBalance = data => {
    this.setState({
      accountBalance : data
    })   
  }
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

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
        credit: data,
      });
      this.state.debit.map((item) => {
        this.setState({
          debitAmount: this.state.debitAmount + item.amount,
        });
      });
      this.state.credit.map((elem) =>{
          this.setState({
            CreditAmount: this.state.CreditAmount + elem.amount
          })
      })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const CreditComponent = () => (
      <Credit
        credits={this.state.credit}
        creditAmount={this.state.CreditAmount}
        balance={this.state.accountBalance}
      />
    );
    let difference = parseInt(this.state.CreditAmount - this.state.debitAmount);
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home accountBalance={difference} />
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
            <Debits debits={this.state.debit} amount={this.state.debitAmount} parentCallBack={this.setDebitBalance}/>
          </Route>
          <Route path="/Credits" render={CreditComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
