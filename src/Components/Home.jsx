import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AccountBalance from "./AccountBalance"

class Home extends Component {

    render() {
        return (
            <div>
                <Link to="/userProfile">User Profile</Link>
                <Link to='/login'>LogIn</Link>

                <img src="https://img.etimg.com/thumb/msid-71487585,width-300,imgsize-169788,,resizemode-4,quality-100/bank-getty.jpg" alt="bank" />
                <h1>Bank of React</h1>


                <AccountBalance accountBalance={this.props.accountBalance} />

                <Link to='/Credits'>Credits</Link>
            </div>
        )
    }
}

export default Home;