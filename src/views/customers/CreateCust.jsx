import React, { Component } from 'react';
import Loader from  '../../APIs/Loader/Loader'
import Alert from  '../../APIs/Alerts/Alert'
import Axiosconfig from  '../../Axios/AxiosConfig'
import Validation from  '../../APIs/Validation/validation'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import Table from '../../APIs/TablesAPI/Table'
import {Icon,Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BasicDetails from './BasicDetails'
import AddressList from './AddressList'

const axios = require('axios').default;






class App extends React.Component {




  constructor(props) {
    super(props)

    this.handler2 = this.handler2.bind(this)
    this.handler1 = this.handler1.bind(this)
    this.handler3 = this.handler3.bind(this)
  }


 async handler3(){

  var alpha = basicdets_validationprops(this.basicdets)
  var vallogs = Validation(alpha)
  console.log(vallogs)



if(vallogs.length === 0){

  var customer_details_payload = this.basicdets
  customer_details_payload.address = this.addresses

  console.log(customer_details_payload)

  this.setState({savingdata : true})
  if(customer_details_payload._id === undefined){
    await axios.post(Axiosconfig.main + 'customer', customer_details_payload,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      this.basicdets._id = res.data.data._id
      this.alertobj = {type : "success", msg : "Customer Added Successfully", show : true }
      this.setState({updatestate : true, savingdata : false})
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err.response);
      this.alertobj = {type : "error", msg : err.response.data.message, show : true }
      this.setState({updatestate : true, savingdata : false})
      
    })

  }else{

    await axios.put(Axiosconfig.main + 'customer?id=' + customer_details_payload._id, customer_details_payload,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      this.alertobj = {type : "success", msg : "Customer Details Updated Successfully", show : true }
      this.setState({updatestate : true, savingdata : false})
      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err.response);
      this.alertobj = {type : "error", msg : err.response.data.message, show : true }
      this.setState({updatestate : true, savingdata : false})
     
    })

  }
}else{

  this.alertobj = {type : "error", msg : vallogs[0], show : true }
  this.setState({updatestate : true})

}



  }

  handler1(key, value){
    this.basicdets[key] = value
    this.setState({updateState : true})
  }

  handler2(address, action, index, key,  value){
    if(action === "add"){
      this.addresses.push(address)
    
    }else if(action === "remove"){

      this.addresses.splice(index, 1)
      
     

    }else if(action === "update"){
      this.addresses[index][key] = value
      
    }

    this.setState({updateState : true})

    
  
  }

  


    state = {activeStep : 0, currentlocation : null, updateState : false, savingdata : false}
    addresses = []
    basicdets = {firstName : "", lastName : "", mobileNumber : "", email : "", gender : "",  dob : "1980-01-01", referarCode : "" }
    alertobj = null
   





  componentWillMount(){

if( this.props.data !== null ){
  this.addresses = this.props.data.address

  const fields1 = ["dob", "firstName", "lastName", "gender", "mobileNumber", "email", "referarCode", "_id"]

  fields1.map((v,index)=>{

    
    if(index === 0){
      this.basicdets[v] = this.props.data[v].substring(0,10)
      
    }else if(index === 6){
      this.basicdets[v] = ""
    }else{
      this.basicdets[v] = this.props.data[v]
    }

  })
}


  }




render(){
    return (
        <div>
          <div class = "create_cust_top_div" >
          <Button onClick = {()=>{
            this.handler3()
          }} disabled = {this.state.savingdata} variant = "contained" color = "primary"><Icon>save</Icon>{this.state.savingdata ? ("Saving") : ("Save Changes")}</Button>
          </div>
          <div class = "create_cust_main_div" >
          <div class = "create_cust_sub_div"><BasicDetails basicdetails = {this.basicdets}  handler1 = {this.handler1}/></div>
          <div class = "create_cust_sub_div"><AddressList addressList = {this.addresses} handler2 = {this.handler2}  handler3 = {this.handler3} /></div>
        
          </div>

          {showalert(this)}
        </div>

    
      );
}
}

function basicdets_validationprops(data){

  return(
    [
      {
        val : data.firstName,
        validators : [{type : "minStrLen", value : 3}, {type : "maxStrLen", value : 16}, {type : "isRequired", value : true}],
        errormsg : "Name should be more than 3 chars and less than 16"
      },

      {
        val : data.lastName,
        validators : [{type : "minStrLen", value : 1}, {type : "maxStrLen", value : 16}, {type : "isRequired", value : true}],
        errormsg : "Last Name should be more than 1 chars and less than 16"
      },

      {
        val : data.mobileNumber,
        validators : [{type : "isMobile", value : true}, {type : "isRequired", value : true}],
        errormsg : "Enter Valid Mobile Number"
      },

      {
        val : data.email,
        validators : [{type : "isEmail", value : true}, {type : "isRequired", value : false}],
        errormsg : "Enter Valid Email Id"
      },

    ])

}


function showalert(me){

  if(me.alertobj !== null){
    var alertObjClone = me.alertobj
    me.alertobj = null

    return(
      <Alert key = {Math.random()} alertObj = {alertObjClone} ></Alert>
    )
  }else{
    return null
  }
}

export default App;
