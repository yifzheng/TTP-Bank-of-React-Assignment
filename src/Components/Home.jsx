import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AccountBalance from "./AccountBalance"

class Home extends Component {

render() {
    return (
        <div className="homepagecontener">

            <div className="homefirstdiv">


                                <h1>Welcome to our Bank</h1> <br/><br/>


                    <img src="https://img.etimg.com/thumb/msid-71487585,width-300,imgsize-169788,,resizemode-4,quality-100/bank-getty.jpg" alt="bank" id="logo"/>
                    




            </div>
            <div class="homeseconddiv">
            {/* <p><Link to="/userProfile">User Profile</Link></p>  */}
              
                <div className="identification">
                        <Link to='/login'><button>Logout</button></Link>
                </div>
                <div className="displaybalance">
                        <AccountBalance accountBalance={this.props.accountBalance} /> 

                        <Link to='/Credits'><button>Credits</button></Link>
                                             <button>Debits</button>
                </div>

            </div>

        </div>
    )
}
}

export default Home;