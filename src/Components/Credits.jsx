import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DisplayCredit from './DisplayCredit'
import Homepage from './Home'
    
class Credit extends Component {
  constructor(props) {
    super(props)
    this.state={
        credits : props.credits,
        Amount : props.creditAmount,
        balance: props.balance,
        isDisplay: false,  // to hendle the display credit
        balanceisCheck : false, // to hendle the display balance
        isAdded: false, // to hendle the add credit
        description : '',
        amount : 0,

    }

    this.handlevalidate = this.handlevalidate.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  //method that helps update the state depending the user input
  changeHendler =(e)=>{
   this.setState({
     [e.target.name]: e.target.value
   })
   
  }
  
   // method that handle the save button !! not completed
  handlevalidate(){
    const currentdate = new Date()
    const newObject={id:this.state.credits.length + 12, 
                     description: this.state.description, 
                     amount:   this.state.amount, 
                     date:{currentdate}
                    }
    let tab = this.props.credits
    tab.push(newObject)
     let total =parseFloat(this.state.balance) +parseFloat(this.state.amount)
    this.setState({
      balance : total,
      isDisplay: false,
      balanceisCheck : false,
      isAdded: false,
      description : this.state.description,
      amount : this.state.amount,
    })
    
  }


 // method that handle the cancel button 
  handleCancel(){
    this.setState({
      isDisplay: false,
      balanceisCheck : false,
      isAdded: false,
      description : '',
      amount : 0,
      date : " " 
    })

  }

  // method that handle the display button 
  handleDisplaye(){
    this.setState(
      {
        isAdded:false,
        balanceisCheck: false,
        isDisplay: !this.state.isDisplay
      }
    )
  }

  //method that handle the balance checking
  handlebalanceCheck(){ // mod
    this.setState(
      { isAdded:false,
        balanceisCheck: !this.state.balanceisCheck,
        isDisplay: false
      }
    )
  }

  // method that handle the credit adding 
  handleAddcredit(){
    this.setState(
      {
        isDisplay: false,
        balanceisCheck: false,
        isAdded: !this.state.isAdded
      }
    )
  }


  render() {
    let displaycredit;
    let balance
    if(this.state.balanceisCheck){
    
      balance = <p>Total Balance: {this.state.balance}</p>;
    }
    if(this.state.isDisplay){
      displaycredit =    <div >
             
             {
               this.state.credits.map((item)=><DisplayCredit key={item.id} description={item.description} amount={item.amount} date={item.date}/>)
             }

                </div>
      
    }
    if(this.state.isAdded){

           
      return <div className="credit">
              <form>
                  <label>
                      Description:
                      <input type="text" name="description" value={this.state.description} placeholder="Description" onChange={this.changeHendler}/>
                      
                  </label>
                  <label>
                      Amount:
                      <input type="number" name="amount" value={this.state.amount} placeholder={'00'}  onChange={this.changeHendler}/>
                  </label>
  
              </form>
              
              <button onClick={this.handlevalidate}>Validate</button>
              <button  onClick={this.handleCancel}>Cancel</button>
      </div>
  
    }
 
    return (
      
          <div>
                        <Link  to='/'> Home Page</Link>
  
                        <h1> THis is the Credit Page</h1>
                      
                        <button onClick={()=> this.handlebalanceCheck()}> Check Your Balance</button>
                        <button onClick={() =>this.handleDisplaye()} > Display Credit</button>
                        or <button onClick={() =>this.handleAddcredit()}> AddCredit</button>
                        {balance} 
                        {displaycredit} 
            </div>
    );
                      
  }
  
}

export default Credit;