import React, { Component } from 'react';
import {Link } from "react-router-dom";
    
class Credit extends Component {
  constructor(props) {
    super(props)
    this.state={
        date : props.date,
        userID: props.user,
        balance: props.balance,
        info : props.bankinfo
    }
  }
  render() {

    return (
        <div>
           <h1> This is the Credit Page </h1>
           {/* <p>{this.state.date}</p>
           <p>{this.state.userID}</p>
           <p>{this.state.balance}</p> */}
           {this.state.info.map((value) =>{
              console.log(<p>value.id</p>) 
           })}

           <Link exact to='/'>Home Page</Link>
        </div>
    );
  }
}

export default Credit;