import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class UserProfile extends Component {

    render() {
        return (
            <div>
                <Link to="/">Home Page</Link>

                <h1>User Profile</h1>

                <div>Username: {this.props.userName}</div>
                <div>Member Since: {this.props.memberSince}</div>
            </div>
        );
    }
}

export default UserProfile;