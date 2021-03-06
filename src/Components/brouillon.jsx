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

      //this.handleCancel = this.handleCancel.bind(this)

      this.formDescription = React.createRef();
      this.formAmount = React.createRef();
      this.formDate = React.createRef();
    }


  handleSubmit = () => {
      Number(this.formAmount.current.value);
      let num = parseFloat(this.formAmount.current.value)
      let currentdate = new Date()
      let obj = {
          id: this.formDescription.current.value + this.formAmount.current.value + Math.random() * 100,
          description: this.formDescription.current.value,
          amount: num,
          date: currentdate.toString()
      }
      let arr = this.props.credits;
      arr = [...arr, obj]
      this.setState({
          balance: this.state.balance + num,
          credits: arr,
          isDisplay: false,
          balanceisCheck : false,
          isAdded: false,
      })
  }






    //method that helps update the state depending the user input
    changeHendler =(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
    
    }
    
  // method that handle the cancel button 
    handleCancel = () =>{
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

            
        return (

          <div id="debit-form">
          <form>
              <label id="debit-desription">
                  Description:
                  <input type="text" name="formDescription" placeholder={"student Loan"} ref={this.formDescription} required/>
              </label>
              <label id="debit-desription">
                  Amount:
                  <input type="number" name="formAmount" placeholder={10000} ref={this.formAmount} required/>
              </label>

          </form>
          <button  type="submit" onClick={this.handleSubmit}>Submit</button>
          <button  onClick={this.handleCancel}>Cancel</button>
      </div>
        )
    
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