import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import "./login.css";

class LogIn extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }

  handleChange = (e) => {
    const updatedUser = { ...this.state.user }
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({ user: updatedUser })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/userProfile" />)
    }

    return (
      <div id ="login-page">
        <Link to="/" style={{ textDecoration: 'none' }}><button className="back-home">Home Page</button></Link>
        <div id="form">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="userName">User Name : </label>
              <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
            </div>
            <div>
              <label htmlFor="password">Password : </label>
              <input type="password" name="password" />
            </div><br />
            <center><button>Log In</button></center>
          </form>
        </div>
      </div>
    )
  }
}

export default LogIn