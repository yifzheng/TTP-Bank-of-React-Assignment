import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./homepage.css"
import AccountBalance from "./AccountBalance"

class Home extends Component {

    render() {
        return (
            <div id = "home">
                <div id = "nav-bar">
                    <button><Link to="/userProfile" style={{ textDecoration: 'none' }}>User Profile</Link></button>
                    <button><Link to='/login' style={{ textDecoration: 'none' }}>LogIn</Link></button>
                    <button><Link to="/debits" style={{ textDecoration: 'none' }}>Debits Page</Link></button>
                    <button><Link to='/Credits' style={{ textDecoration: 'none' }}>Credits Page</Link></button>
                </div>

                <div id="home-page">
                    <img className = "bank-pic" src="https://img.etimg.com/thumb/msid-71487585,width-300,imgsize-169788,,resizemode-4,quality-100/bank-getty.jpg" alt="bank" />
                    <h1>Bank of React</h1>
                    <h2 className="home-balance">Account Balance: {this.props.accountBalance}</h2>
                </div>
                
            </div>
        )
    }
}

export default Home;