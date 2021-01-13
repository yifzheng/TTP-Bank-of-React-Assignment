import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'

//components
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import LogIn from "./Components/Login";
import "./App.css";
import Credit from './Components/Credits'


class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "John_Doe",
        memberSince: "08/23/99",
      },

      credit : [],
      CreditAmount: 0
    };
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  async componentDidMount() {
    axios.get(`https://moj-api.herokuapp.com/credits`)
      .then(res => {
        const credit = res.data;
        this.setState({ 
            credit : credit,
        });
        this.state.credit.map((elem) =>{
          this.setState({
            CreditAmount: this.state.CreditAmount + elem.amount
          })
        })
      }).catch(console.error())
  }



  render() {
    const CreditComponent = () =>(<Credit credits={this.state.credit} creditAmount={this.state.CreditAmount} balance={this.state.accountBalance}/>);
     
    return (
      <Router>
        <div id="App"></div>

        <Switch>
          <Route exact path="/">
            <Home accountBalance={this.state.accountBalance} />
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
          <Route path="/Credits" render={CreditComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
