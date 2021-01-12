import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

      credit : []
    };
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  async componentDidMount() {
    try {
      let  datafromApi ="https://moj-api.herokuapp.com/credits";
      let  result = await fetch(datafromApi);
      const jsondata = await result.json();
      this.setState({
        credit: jsondata
      });
    }
    catch(error){
      console.error(error);
    }
  }

  render() {
    const CreditComponent = () =>(<Credit bankinfo={this.state.credit} />);
    // date={this.state.currentUser.memberSince}  userID={this.state.currentUser.userName} balance={this.state.accountBalance}
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
