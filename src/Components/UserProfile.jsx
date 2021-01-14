import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class UserProfile extends Component {

render() {
    return (
        <div className="homepagecontener">
            
            <div id="homefirstdiv">
            

            <h1>User Profile</h1>
            <br/><br />
               <img src="https://img.etimg.com/thumb/msid-71487585,width-300,imgsize-169788,,resizemode-4,quality-100/bank-getty.jpg" alt="bank" id="logo"/>

            </div>
            <div class="homeseconddiv">
              <div className="identification">
                <Link to="/"><button>HOME PAGE</button></Link>
              </div>
                <div className="displaybalance">
                    <h1>{this.props.userName}</h1>
                    <h3>Member Since: {this.props.memberSince}</h3>
                </div>
            </div>
        </div>
    );
}
}

export default UserProfile;