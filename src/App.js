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
      accountBalance: 0,
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

  debitCallBack = (data) => {
    const sum = parseFloat(this.state.accountBalance - data);
    this.setState({accountBalance : sum}, () => console.log(this.state.accountBalance))
    this.setState({
      debitAmount : this.state.debitAmount + data,
    })   
    console.log("it is working " + this.state.totalAmount); 
  }
  
  creditCallBack = data => {
    const sum = parseFloat(this.state.accountBalance + data);
    this.setState({
      CreditAmount : this.state.CreditAmount + data.value
    })
    this.setState({accountBalance : sum}, () => console.log(this.state.accountBalance))
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
        credit: data2,
      });
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
