import React, { Component } from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import Loader from  '../../../APIs/Loader/Loader'
import Alert from  '../../../APIs/Alerts/Alert'
import Axiosconfig from  '../../../Axios/AxiosConfig'
import Validation from  '../../../APIs/Validation/validation'
import Table from '../../../APIs/TablesAPI/Table'
import MapLocation from '../../../APIs/MapsAPI/Location_Store'


import './App.css';
import { Icon, Grid, Checkbox} from "@material-ui/core";
import Button from "@material-ui/core/Button";




import Basicdetails from './Basicdetails'
import StoreServiceArea from './StoreServiceArea'
import Ratecards from './Ratecards'
import Managestaffs from './Managestaffs'

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"

const axios = require('axios').default;

function Steps(me) {

 

    var a  =  [
      "Enter Basic Store Details",
      "Select Store Location",
      "Select Service Area",
      "Manage Rate cards",
      "Manage Staffs",
      
    ]

    var totalcont = []

    a.map((v,ind)=>{
      totalcont.push(
      <Button disabled = {me.Store_Details.perCompletion  < ind} onClick = {()=>{
        me.setState({activeStep : ind})
      }} >{v}</Button>
      )
    })

    return totalcont



 
  
}

function getStepContent(stepIndex, me) {
  switch (stepIndex) {
    case 0:
  
        if(me.state.dataloaded){
          return <Basicdetails rateCards = {me.state.ratecardlist} data = {me.Store_Details} handler1 = {me.handler1}  storeData = {me.storeData} handler2 = {me.handler2} ></Basicdetails>
        
        }else{
          return <Loader/>
        }


      case 1:
      if(me.state.dataloaded){
        console.log(me.Store_Details.isVirtual)
        
        
        return <MapLocation showPlacesAuto = {!me.Store_Details.isVirtual} static = {me.Store_Details.isVirtual} disableTextFields = {me.Store_Details.isVirtual} data = {me.Store_Details.storeAddress} renderAddressType = {false} Changehandler = {me.handler2} />
      }else{
        return <Loader/>
      }
        
        
      
      case 2:
        
      
      if(me.state.dataloaded){
        
        
        return  <StoreServiceArea data = {me.Store_Details} handler3 = {me.handler3} AllStoresCoords = {me.AllStoresCoords} />
      }else{
        return <Loader/>
      }

      case 3:
        
        if(me.state.dataloaded){
        
        
          return <Ratecards data = {me.Store_Details} handler4 = {me.handler4} />
        }else{
          return <Loader/>
        }
          
       

      case 4:
       
       
        if(me.state.dataloaded){
        
        
          return <Managestaffs data = {me.Store_Details} handler5 = {me.handler5} />
        }else{
          return <Loader/>
        }

     
    
    default:
      return null}
}



class App extends React.Component {

  constructor(props) {
    super(props)

    this.handler1 = this.handler1.bind(this)
    this.handler2 = this.handler2.bind(this)
    this.handler3 = this.handler3.bind(this)
    this.handler4 = this.handler4.bind(this)
    this.handler5 = this.handler5.bind(this)
   
  }

  handler1(key, value){
    this.Store_Details[key] = value
    this.setState({updateState : true})


  }

  handler2(key, value){

    if(key === "location"){
      this.Store_Details.storeAddress["latitude"] = value.lat
      this.Store_Details.storeAddress["longitude"] = value.lng

    }else{
      this.Store_Details.storeAddress[key] = value
    }

    this.setState({updateState : true})
  
    
  }

  handler3(service_area){

    this.Store_Details.storeCoordinates = service_area
   
    this.setState({updateState : true})
    
   
  }

  handler4(offline, online){

    this.Store_Details.ratecardOffline = offline
    this.Store_Details.ratecardOnline = online
    this.setState({updateState : true})
   
  }

  handler5(SO, SB, DB){

    this.Store_Details.storeOwners = SO
    this.Store_Details.storeStaffBoys = SB
    this.Store_Details.storeDeliveryBoys = DB
    this.setState({updateState : true})
   
  }

 
  
    state = {activeStep : 0, currentlocation : null, updateState : false, currentStore : null, openalert : false, dataloaded : false}
    alertobj = null
    storeData = []
    storeData = []
    AllStoresCoords = []

  

    Store_Details = {}
    rateCards = [{id : "ratecard1", rateCardName : "Pawan's Rate Card" }, {id : "ratecard2", rateCardName : "Vishnu's Rate Card" }]
    error_details = {severity : "", msg : ""}

  markermoved = false

    servicecords = []

     polycords = [
        {lat: 22, lng: 78},
        {lat: 24, lng: 78},
        {lat: 24, lng: 76},
      ];

handleNext = async () => {

  var vallogs = []

  switch(this.state.activeStep){
    case 0:{
      var alpha = basicdets_validationprops(this.Store_Details)
      vallogs = Validation(alpha)
      break;
    }

    case 1:{
      var alpha = location_validationprops(this.Store_Details)
      vallogs = Validation(alpha)
      break;
    }

    case 3:{
      var alpha = ratecards_validationprops(this.Store_Details)
      vallogs = Validation(alpha)
      break;
    }

    case 4:{
      var alpha = staffs_validationprops(this.Store_Details)
      vallogs = Validation(alpha)
      break;
    }
  }

  


  if(vallogs.length === 0){

    await pushdata(this)
  
  
  if(this.state.activeStep === 5){
    window.location.href = "/stores/manage"
  }

  }else{

    this.alertobj = {type : "error", msg : vallogs[0], show : true }
    this.setState({updatestate : true})



  }

  


  }

   handleBack = () => {
    this.setState({activeStep : this.state.activeStep - 1})
    // pushdata(this)
 
  };

   handleReset = () => {
    var curstep =  this.state.activeStep
    this.setState({activeStep : 0})
  };

  handleChange = (path) => {

  
    var servicecords = []
    for(let i = 0; i < path.getLength() ; i++){

      const xy = path.getAt(i);
      servicecords.push({lat : xy.lat(), lng : xy.lng()})

    };

   this.servicecords = servicecords
  

  }

  handleCloseSnack = (event, reason) => {
   
    this.setState({openalert : false})
  } 

  


  async componentWillMount(){


     var store_id = window.location.search.substring(4,(window.location.search).length)
    
 this.Store_Details = {
  "storeName": "",
  "storeCode": "",
  "storeMobile": "" ,
  "storeMobileAlternate": "",
  "isFranchise": 1,
  "royalityOnlinePercentage": 0,
  "royalityOfflinePercentage": 0,
  storeOwners: "",
  storeDeliveryBoys: [],
  storeStaffBoys: [],
  perCompletion : 0,
  inTime : new Date(),
  outTime : new Date(),

  "isVirtual" : false,
  "showInStoreLocator" : false,
  "parentStore" : "",
  "ratecardOnline" : "",
  "ratecardOffline" : [],



  "storeAddress": {
    addr1: "",
    addr2 : "",
    pincode: "",
    latitude: "",
    longitude: "",
    city: "",
    state: "",
    landmark: "",
    addressType: "HOME",

  },

  "storeStatus": "Active",
  "storeCoordinates":[]
 }


 







 await axios.get(Axiosconfig.main + 'store',  Axiosconfig.config)
 .then((res) => {
console.log(res)
  var temp_storedata = []
  res.data.data.store.map((v,ind)=>{
    this.storeData = res.data.data.store
    if(v._id === store_id){
      console.log(v)
      this.Store_Details = v
      this.Store_Details.perCompletion =  (this.Store_Details.perCompletion + 1)
      
    }
  })

  this.setState({dataloaded : true})

 })
 .catch((err) => {
   console.log("AXIOS ERROR: ", err);
   this.setState({dataloaded : true})
 })


if(this.Store_Details.storePolygon !== undefined){
  var mongo2frontend = []
  this.Store_Details.storePolygon.coordinates[0].map((v)=>{
    mongo2frontend.push({lat : v[0], lng : v[1]})
  })

  this.Store_Details.storeCoordinates = mongo2frontend
  console.log("jhsagjsa", this.Store_Details.storeCoordinates)
}


convertstoredattoAllStoreCoords(this)







  
  }

render(){
    return (
        <div>
          <Stepper activeStep={this.state.activeStep} alternativeLabel>
            {Steps(this).map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          
          <div style = {{ width : "100%"}}>
            {this.state.activeStep === Steps(this).length ? (
              <div style = {{ marginTop  : "2%"}}>
                <Loader />
                
              </div>
            ) : (
                <div style = {{ marginTop  : "0%", width : "90%", marginLeft : "5%"}}>
               
               
                <div className="pt-4 save_next_butdiv">
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
                    {this.state.activeStep === Steps(this).length - 1 ? "SAVE DATA" : "Save & Next"}
                  </Button>

                  {/* <div class = "seperator"></div> */}
                  
                </div>
                {getStepContent(this.state.activeStep, this)}
              </div>
            )}
            
          </div>

      {showalert(this)}
          
        </div>
      );
}
}




function reframeStoreCoordinates(Servicearray, me){

  var newarray = []

  Servicearray.map((v)=>{
    newarray.push([v.lat, v.lng])
  })

  me.Store_Details_temp.storeCoordinates = [newarray]

  

}





async function pushdata(me){

  
  
  me.Store_Details_temp = JSON.parse(JSON.stringify(me.Store_Details))

  reframeStoreCoordinates(me.Store_Details_temp.storeCoordinates, me)

  

  console.log(me.Store_Details_temp.perCompletion,me.state.activeStep )
  me.Store_Details_temp.perCompletion = me.Store_Details_temp.perCompletion <= me.state.activeStep ? (me.Store_Details_temp.perCompletion) : (me.Store_Details_temp.perCompletion - 1)

  console.log("Data to be pushed", me.Store_Details_temp)
  me.setState({dataloaded : false})
  if(me.Store_Details._id === undefined){
    
    await axios.post(Axiosconfig.main + 'store', me.Store_Details_temp,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ID ", res);
      me.Store_Details._id = res.data.data._id
      me.Store_Details.perCompletion = (me.state.activeStep === me.Store_Details.perCompletion ) ? ( me.Store_Details.perCompletion + 1) : me.Store_Details.perCompletion
          
      me.setState({dataloaded : true, activeStep : me.state.activeStep + 1})

    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err.response);
      me.alertobj = {type : "error", msg : err.response.data.message, show : true }
      me.setState({dataloaded : true})

    })

  }else{
    await axios.put(Axiosconfig.main + 'store/?id=' + me.Store_Details_temp._id, me.Store_Details_temp,  Axiosconfig.config)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            me.Store_Details.perCompletion = (me.state.activeStep === me.Store_Details.perCompletion ) ? ( me.Store_Details.perCompletion + 1) : me.Store_Details.perCompletion
            me.setState({dataloaded : true, activeStep : me.state.activeStep + 1})
           
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err.response);
            me.alertobj = {type : "error", msg : err.response.data.message, show : true }
            me.setState({dataloaded : true})
          })
  }

          
}



function basicdets_validationprops(data){

  return(
    [
      {
        val : data.storeName,
        validators : [{type : "minStrLen", value : 3}, {type : "maxStrLen", value : 16}, {type : "isRequired", value : true}],
        errormsg : "Name should be more than 3 chars and less than 16"
      },

      {
        val : data.storeCode,
        validators : [{type : "minStrLen", value : 3}, {type : "maxStrLen", value : 16}, {type : "isRequired", value : true}],
        errormsg : "Code should be more than 3 chars and less than 16"
      },

      {
        val : data.storeMobile,
        validators : [{type : "isMobile", value : true}, {type : "isRequired", value : true}],
        errormsg : "Enter Valid Mobile Number"
      },

      {
        val : data.storeMobileAlternate,
        validators : [{type : "isMobile", value : true}, {type : "isRequired", value : true}],
        errormsg : "Enter Valid Alternate Mobile Number"
      },

      {
        val : data.royalityOnlinePercentage,
        validators : [{type : "minIntVal", value : 0}, {type : "isRequired", value : true}],
        errormsg : "Enter Positive Royality value "
      },

      {
        val : data.royalityOfflinePercentage,
        validators : [{type : "minIntVal", value : 0}, {type : "isRequired", value : true}],
        errormsg : "Enter Positive Royality value "
      },

      

    ])

}


function location_validationprops(data){

  return(
    [
      {
        val : data.storeAddress.addr1,
        validators : [ {type : "isRequired", value : true}],
        errormsg : "Please fill Address 1"
      },

      {
        val : data.storeAddress.addr2,
        validators : [ {type : "isRequired", value : true}],
        errormsg : "Please fill Address 2"
      },

      {
        val : data.storeAddress.city,
        validators : [ {type : "isRequired", value : true}],
        errormsg : "Please fill City"
      },

      {
        val : data.storeAddress.state,
        validators : [{type : "isRequired", value : true}],
        errormsg : "Please fill State"
      },

    ])

}

function ratecards_validationprops (data){

  return(
    [
      {
        val : data.ratecardOnline,
        validators : [ {type : "isRequired", value : true}],
        errormsg : "Please Select an online rate card"
      },

      {
        val : data.ratecardOffline,
        validators : [{type : "arraynotnull", value : true}],
        errormsg : "Please Select at least one Offline rate card"
      },

    

    ])

}


function staffs_validationprops (data){

 
  return(
    [
      {
        val : data.storeOwners,
        validators : [ {type : "isRequired", value : true}],
        errormsg : "Please Select a Store Owner"
      },

      {
        val : data.storeStaffBoys,
        validators : [{type : "arraynotnull", value : true}],
        errormsg : "Please Select at least one Staff Boy"
      },
      {
        val : data.storeDeliveryBoys,
        validators : [{type : "arraynotnull", value : true}],
        errormsg : "Please Select at least one Delivery Boy"
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


function convertstoredattoAllStoreCoords(me){

var temp = []  

me.storeData.map((v,ind)=>{

  var temp1 = []
  v.storePolygon.coordinates[0].map((v1)=>{
    console.log(v, me.Store_Details._id)
    if(v._id !== me.Store_Details._id ){
      temp1.push({lat : v1[0], lng : v1[1]})
    }
  })

  if(temp1.length > 0){
    temp.push({
      StoreName : v.storeName,
      StoreCoords : temp1
    })
  }




})

me.AllStoresCoords = temp

console.log(temp)


}




export default App;
