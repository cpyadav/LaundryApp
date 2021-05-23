import React, { Component } from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
// import Alert from  '../../APIs/Alerts/Alert'
// import Axiosconfig from  '../../Axios/axiosconfig'
// import Loader from  '../../Loader/Loader'
import './App.css';
import { Icon, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import Validation from  '../../Validation/validation'

import Loader from  '../../APIs/Loader/Loader'
import Alert from  '../../APIs/Alerts/Alert'
import Axiosconfig from  '../../Axios/AxiosConfig'
import Validation from  '../../APIs/Validation/validation'



import Basicdetails from './Basicdetails'
import BankDetails from './BankDetails'
import VerificationDocs from './VerificationDocs'

 
const axios = require('axios').default;

function Steps() {
  return [
    "Enter Basic Staff Details",
    "Select Verification Docs",
    "Select Bank Details",
   
  ];
}

function getStepContent(stepIndex, me) {
  switch (stepIndex) {
    case 0:
      return(
        <Basicdetails databasic = {me.basicdets} allstaffs = {me.allstaffs} handler1 = {me.handler1}></Basicdetails>
      )
      case 1:
      return (
        <VerificationDocs  dataverifi = {me.staffProof} handler2 = {me.handler2}></VerificationDocs>
      )
      case 2:
       
       return ( <BankDetails databank = {me.bankdata} handler3 = {me.handler3} ></BankDetails>)
      
    default:
      return null}
}



class App extends React.Component {


  constructor(props) {
    super(props)

    this.handler1 = this.handler1.bind(this)
    this.handler2 = this.handler2.bind(this)
    this.handler3 = this.handler3.bind(this)
  }

  handler1(key, value){


    this.basicdets[key] = value
    if(key === "staffEmployeeType" || key === "workdays" || key === "staffManager" || key === "inTime" || key === "outTime"){
      this.setState({updateState : true})
    }
   

  }

  handler2(action, index, key, value){

    switch(action){
      case "add":
        this.staffProof.push({proofName : "", proofNumber : "", proofCopy : 
        [
          
      ]
    })
        break;
      case "delete":
        this.staffProof.splice(index, 1)
        break;
      case "update":
        this.staffProof[index][key] = value
        break;
    }

    if(key !== "proofNumber"){
      this.setState({updateState : true})
    }

    

  }

  handler3(key, value){

    this.bankdata[key] = value

    
    if(key === "bankCopy"){
      this.setState({updateState : true})
    }



  }


  
  state = {activeStep : 0, updateState : false, dataloading  : false }
  
  alertObj = null

  


handleNext = async () => {

  var vallogs = []

  switch(this.state.activeStep){
    case 0 : {

      var alpha = basicdets_valprops(this.basicdets)
      vallogs = Validation(alpha)


      break;

    }

    case 2:{

      var alpha = bank_valprops(this.bankdata)
      vallogs = Validation(alpha)

      break;

    }
  }
    

  if(vallogs.length === 0){
    var curstep =  this.state.activeStep
    this.setState({activeStep : curstep + 1})

    if(curstep === 2 ){

      pushdata(this)

    }
  }else{

    this.alertObj = {type : "error", msg : vallogs[0], show : true }
    this.setState({updatestate : true})

  }

  
  }

   handleBack = () => {
    var curstep =  this.state.activeStep
    this.setState({activeStep : curstep - 1})
 
  };

   handleReset = () => {
    var curstep =  this.state.activeStep
    this.setState({activeStep : 0})
  };


  


  async componentWillMount(){



    this.basicdets = {

      staffFirstName : "",
      staffAlternateMobile : "",
      staffPassword : "",
      staffMobile : "",
      staffLastName : "",
      staffEmailId : "",
      staffEmployeeType : [],
      staffProof : [],
      staffBankDetails : "",
      workdays : [],
      inTime : new Date(),
      outTime : new Date()
  
  
    }
    this.staffProof = []
  
    this.bankdata = {
      "accHolder" : "",
      "bankName": "",
        "bankNumber": "",
        "bankIfsc" : "",
        "bankCopy": [
        ],
        "upiId" : ""
  
    }






    var staff_id = window.location.search.substring(4,(window.location.search).length)
    this.staff_id = staff_id
    this.setState({dataloading : true})
    if(staff_id !== ""){
      await axios.get(Axiosconfig.main + 'staff/?id=' + staff_id,  Axiosconfig.config)
    .then((res) => {
   this.basicdets = res.data.data
   this.staffProof = res.data.data.staffProof
   this.bankdata = res.data.data.staffBankDetails
   this.basicdets.staffEmployeeType = res.data.data.staffEmployeeType

   

   
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
      
    })
    }else{

      this.setState({ dataloading : false})

    }

    await axios.get( Axiosconfig.main + 'staff', Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res);
      this.allstaffs =  res.data.data
      this.setState({dataloading : false})
      
    
      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

 

  
  }

render(){
    return (
        <div>
          {this.state.dataloading ? (<Loader/>) : (
            <div>
            <Stepper activeStep={this.state.activeStep} alternativeLabel>
              {Steps().map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div style = {{  margin : "5%", width : "90%", marginTop  : "2%"}}>
              {this.state.activeStep === Steps().length ? (
                <div style = {{ marginTop  : "5%"}}>
                  <Loader />
                 
                </div>
              ) : (
                  <div style = {{ marginTop  : "0%"}}>
                 
                  <div className="pt-4">
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={this.state.activeStep === 0}
                      onClick={this.handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      className="ml-4"
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                    >
                      {this.state.activeStep === Steps().length - 1 ? "SAVE DATA" : "Next"}
                    </Button>
                  </div>
  
                  {getStepContent(this.state.activeStep, this)}
                </div>
              )}
            </div>
          </div>
          )}
          {showalert(this)}
        </div>
      );
}
}

function basicdets_valprops(data){

  var alpha = 
    [
      {
        val : data.staffEmployeeType,
        validators : [{type : "arraynotnull", value : true}],
        errormsg : "Select atleast one role"
      },

      {
        val : data.workdays,
        validators : [{type : "arraynotnull", value : true}],
        errormsg : "Select atleast one workday"
      },

      {
        val : data.staffFirstName,
        validators : [{type : "minStrLen", value : 3}, {type : "maxStrLen", value : 15}, {type : "isRequired", value : true}],
        errormsg : "Enter First Name not more than 15 Chars"
      },

      {
        val : data.staffLastName,
        validators : [{type : "minStrLen", value : 3}, {type : "maxStrLen", value : 15}, {type : "isRequired", value : true}],
        errormsg : "Enter Last Name not more than 15 Chars"
      },

      {
        val : data.staffMobile,
        validators : [{type : "isMobile", value : true}, {type : "isRequired", value : true}],
        errormsg : "Enter Valid Mobile Number"
      },


      {
        val : data.staffEmailId,
        validators : [{type : "isEmail", value : true}, {type : "isRequired", value : false}],
        errormsg : "Enter Valid Email Id"
      },


    ]

  

    console.log(alpha)

    return alpha

}

function bank_valprops (data){

  return(
    [
      {
        val : data.accHolder,
        validators : [{type : "minStrLen", value : 3}, {type : "maxStrLen", value : 30}, {type : "isRequired", value : false}],
        errormsg : "Name should be more than 3 chars and less than 30"
      },

      {
        val : data.bankName,
        validators : [{type : "minStrLen", value : 3}, {type : "maxStrLen", value : 20}, {type : "isRequired", value : false}],
        errormsg : "Bank Name should be more than 3 chars and less than 20"
      },

      {
        val : data.bankNumber,
        validators : [{type : "minStrLen", value : 9}, {type : "maxStrLen", value : 18}, {type : "isRequired", value : false}],
        errormsg : "Acc Number should be more than 9 chars and less than 18"
      },

      {
        val : data.bankIfsc,
        validators : [{type : "minStrLen", value : 11}, {type : "maxStrLen", value : 11}, {type : "isRequired", value : false}],
        errormsg : "Enter Valid IFSC"
      },

    

    ])

}

function showalert(me){

  if(me.alertObj !== null){
    var alertObjClone = me.alertObj
    me.alertObj = null

    return(
      <Alert key = {Math.random()} alertObj = {alertObjClone} ></Alert>
    )
  }else{
    return null
  }
}

async function pushdata(me){

  var total_data = me.basicdets
  total_data.staffProof = me.staffProof
  total_data.staffBankDetails = me.bankdata



  if(me.staff_id === ""){
    await axios.post(Axiosconfig.main + 'staff', total_data,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ID ", res);
      
      window.location.href = "/staffs/manage"
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err.response);
      me.alertObj = {type : "error", msg : err.response.data.message, show : true }
      me.setState({dataloading : false, activeStep : 0})
    })
  }else{
    await axios.put(Axiosconfig.main + 'staff/?id=' + me.staff_id, total_data,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ID ", res);
      
      window.location.href = "/staffs/manage"
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err.response);
      me.alertObj = {type : "error", msg : err.response.data.message, show : true }
      me.setState({dataloading : false, activeStep : 0})
    })
  }


  
        
 
   

 

          
}


export default App;
