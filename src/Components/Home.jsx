import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./homepage.css"
import AccountBalance from "./AccountBalance"

class Home extends Component {

    render() {
        return (
            <div id="home">
                <div id="nav-bar">
                    <Link to="/userProfile" style={{ textDecoration: 'none' }}><button>User Profile</button></Link>
                    <Link to='/login' style={{ textDecoration: 'none' }}><button>LogIn</button></Link>
                    <Link to="/debits" style={{ textDecoration: 'none' }}><button>Debits Page</button></Link>
                    <Link to='/Credits' style={{ textDecoration: 'none' }}><button>Credits Page</button></Link>
                </div>

                <div id="home-page">
                    <img className="bank-pic" src="https://img.etimg.com/thumb/msid-71487585,width-300,imgsize-169788,,resizemode-4,quality-100/bank-getty.jpg" alt="bank" />
                    <h1>Welcome to Bank of React</h1><br/>
                    <h2 className="home-balance">Account Balance: ${this.props.accountBalance.toFixed(2)}</h2>
                </div>

            </div>
        )
    }
}

export default Home;