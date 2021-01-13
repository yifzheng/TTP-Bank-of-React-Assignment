import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./userprofile.css"
class UserProfile extends Component {

    render() {
        return (
            <div id="user-profile">
                <button className="back-home"><Link to="/" style={{ textDecoration: 'none' }}>Home Page</Link></button>
                <div id="profile">
                    <h1 className="user-profile">User Profile</h1>
                    <img className="profile-pic" src="https://www.pngfind.com/pngs/m/16-168465_aws-simple-icons-non-service-specific-user-default.png" alt="user"></img>
                    <div className="username">Username: {this.props.userName}</div>
                    <div className="member">Member Since: {this.props.memberSince}</div>
                </div>
            </div>
        );
    }
}

export default UserProfile;