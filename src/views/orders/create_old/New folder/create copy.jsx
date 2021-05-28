import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';
import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
// import {  SimpleCard } from "matx";
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
// import Loader from  '../../../Loader/Loader'
import ManageCustomer from '../../customers/Manage'
// import Axiosconfig from  '../../../Axios/axiosconfig'

import Loader from  '../../../APIs/Loader/Loader'
import Alert from  '../../../APIs/Alerts/Alert'
import Axiosconfig from  '../../../Axios/AxiosConfig'
import Validation from  '../../../APIs/Validation/validation'
import SimpleCard from '../../../APIs/SimpleCard/SimpleCard'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Arrowright from '@material-ui/icons/ArrowRightAlt';
import theme1 from './theme1'
import InputAdornment from '@material-ui/core/InputAdornment';
import theme2 from './theme2'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './create.css'
const axios = require('axios').default;

class App extends React.Component {


  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  handleClose = ()=>{
    this.setState({showselectcustomer : false})
  }

  selected = (custdata)=>{
    console.log(custdata)
    this.customer = custdata
    this.handleClose()
    this.selectedaddress = null
    
  }

  customer = null
  selectedaddress = null
  store = null
  ratecard = null
  mothercategory = null
  category = null
  servsrchqry = ""
  selectedservices = []
  masterlistdata = []




  state = {showselectcustomer : false, isloading : false}


  async componentWillMount(){

    console.log(window.location.search.substring(12,(window.location.search).length))
    var customerqryid = window.location.search.substring(12,(window.location.search).length)
    this.setState({isloading : true})


   if(customerqryid !== ""){
    axios.get(Axiosconfig.main + 'customer?id=' + customerqryid ,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res.data.data);
      this.customer = res.data.data
      this.setState({updatestate : true})
      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
   }

   await axios.get( Axiosconfig.main + 'store', Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res);
      this.setState({storesdata : res.data.data.store})

      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

    await axios.get( Axiosconfig.main + 'ratecard', Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:2 ", res);
      this.setState({ratecards : res.data.data})

      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

    await  axios.get(Axiosconfig.main + 'item',  Axiosconfig.config)
    .then((res) => {
      
      this.masterlistdata = res.data.data[0].itemList
 
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

    getcategories(this)







  }

render(){
    return(
        <div className="m-sm-30">



         

        {this.state.isloading ? (<Loader/>) : (
          <div>
            {rendertop(this)}

{renderselectcustomer(this)} 

{this.ratecard === null ? (null) : (
  renderservicenorder(this)
)}
          </div>
        )}

        </div>
    )
}

}

function renderservicenorder(me){

  return(
    <div style = {{marginTop : "30px"}}>


      {/* <SimpleCard title = "Create Order" > */}



      
 { me.mothercategory === null ? (null) : (
   rendermainservorder(me)
 )}

    {/* </SimpleCard> */}



    </div>
  )

}

function renderservices(me){

  var totalcont = []

 

 

me.ratecard.rateCardServices.map((v,ind)=>{

  if(v.mcId === me.mothercategory._id & v.catId === me.category.id & v.serviceName.toUpperCase().includes(me.servsrchqry.toUpperCase())){

 

    totalcont.push(
      <div class = "indiservice_maindiv">
    
      <img class = "indiservice_maindiv_image" src = {me.masterlistdata[me.masterlistdata.findIndex(x => x.itemName === v.masteritem)].imgUrl} />

    <div class = "indiservice_maindiv_servicename">{v.serviceName + " : " + "Rs. " + v.perUnitPrice}</div>

      <div class = "indiservice_maindiv_button">
      <Button disabled = {me.selectedservices.findIndex(x => x.serviceName === v.serviceName) !== -1} variant = "contained" color = "primary" onClick = {()=>{
       
          v.value = 1
          v.express = false
          v.amount = calculateindiprice(v, me)
          me.selectedservices.push(v)
          me.setState({updatestate : true})

          console.log(me.selectedservices)

      }} >
      <Arrowright/>
      </Button>
      </div>
      
      </div>
    )

  }



})

return totalcont
  


}

function rendercategories(me){

  var uniquecatsid = []

  me.ratecard.rateCardServices.map((v,ind)=>{
    
    if(v.mcId === me.mothercategory._id){
      if(!uniquecatsid.includes(v.catId)){
        uniquecatsid.push(v.catId)
      }
    }


  })

 

  var uniquecatsnamenid = []

  uniquecatsid.map((v,ind)=>{

    uniquecatsnamenid.push(
      {
        name : me.cats_options[me.cats_options.findIndex(x => x._id === v)].catName,
        id : v
      }
    )


  })

  var totalcont = []

  uniquecatsnamenid.map((v,ind)=>{
    totalcont.push(
    <div class = "category_comp">
      <Button onClick = {()=>{
        me.category = v
        me.setState({updatestate : true})
      }} variant = "contained"  color = {me.category === null ? ("") : (
        me.category.id === v.id ? ("primary") : ("")
      )}>{v.name}</Button>
    </div>
    
    )
  })

  if(me.category === null){
    me.category = uniquecatsnamenid[0]
    me.setState({updatestate : true})
  }

  return (totalcont);

}

function rendermainservorder(me){
  return(
    <div class = "servicenorder_main_div">
<MuiThemeProvider theme = {theme1}>
    <div class = "servicesncats_main_div">
  
      
     
      <SimpleCard title = "Select category"> 
      <div class = "Select_category_master" >
      <div class = "categories_list_main_div">
        {rendercategories(me)}
      </div>
    
      <div class = "service_txtfld_div">
      <TextField value = {me.servsrchqry} onChange = {(e)=>{
        me.servsrchqry = e.target.value
        me.setState({updatestate : true})
      }} label = "Search" variant = "outlined" />
    </div>
      <div class = "service_list_main_div">
      {renderservices(me)}
      </div>
      </div>
      </SimpleCard>
  
    </div>

    
      
      
    

    </MuiThemeProvider>

    <div class = "order_main_div">
        <SimpleCard title = "Order Summary">
          <MuiThemeProvider theme = {theme2}>
          <div class = "order_main_div_core">
            {renderselectedservices(me)}
          </div>
          </MuiThemeProvider>
        </SimpleCard>
      
      </div>  

  
  
  
  </div>
  )
}

function renderselectedservices(me){
  
  const totalcont = []


  me.cats_options.map((cat, catind)=>{

    if(cat.mcId === me.mothercategory._id){
      const subcont = []
      var totalcountofservs = 0


    subcont.push(<div class = "suborder_headingnexpress_maindiv" >
    <Button color = "primary" variant = "outlined" >{cat.catName}</Button>

    <FormControlLabel
        control={
          <Switch
            checked={cat.expressselected}
            onChange={(e)=>{

              cat.expressselected = e.target.checked
              me.setState({updatestate : true})
       

            }}
            name="checkedB"
            color="primary"
          />
        }
        label="Express Service"
      />

  </div>)

      me.selectedservices.map((v,ind)=>{
    if(v.catId === cat._id){
      totalcountofservs += 1
      subcont.push(
        renderindiservice_summary(me,v,ind)
      )
    }
  })

  subcont.push(rendersuborder_total_summary(me, cat))

  if(totalcountofservs > 0){
    totalcont.push(
      <div class = "selectedservs_suborder_main_div">
        {/* <SimpleCard> */}
        {subcont}
      {/* </SimpleCard> */}
      </div>
    )
  }
    }

  })

  totalcont.push(

    <div style = {{margin : "10px"}}>

      <Button variant = "contained" color = "primary"  >{"Order Total : " + calculate_total(me)}</Button>
    
    </div>



  )


  return totalcont


}

function calculate_total(me){

  var total = 0

  me.cats_options.map((cat,catind) =>{

    if(cat.mcId === me.mothercategory._id){

      total += cat.subordertotal*(cat.expressselected ? (me.mothercategory.mcExpressMultiplier) : (1))

    }





  })

  return total
}

function rendersuborder_total_summary(me,cat){

  var total = 0
  
  

  me.selectedservices.map((v,ind)=>{
    if(v.catId === cat._id){
      
        total = total + calculateindiprice(v,me).amount

    }
  })

  cat.subordertotal = total

  return(
    <Button variant = "outlined" color = "primary">{"Sub Order Total : " + cat.subordertotal}
    {cat.expressselected ? (" x " + "Express Multiplier : "+  me.mothercategory.mcExpressMultiplier + " = " + cat.subordertotal*me.mothercategory.mcExpressMultiplier) : null}
    </Button>
  )

}

function renderindiservice_summary(me, v, ind){
  return(
    <div class = "selectedservs_individual_div">


    <div>
      {/* Name */}
      <div class = "selectedservs_individual_div_servicename">{v.serviceName}</div>
{/* Qtty */}




<div class = "selectedservs_individual_div_qtty">{
        
        me.subcats_options[me.subcats_options.findIndex(x => x._id === v.subcatId)].subcatName === "Plan" ? (
          <div class = "selectedservs_individual_div_qtty_sub">
            <TextField value = {me.selectedservices[ind].value} onChange = {(e)=>{
              
              if(e.target.value >= 1){
                me.selectedservices[ind].value = e.target.value
                me.selectedservices[ind].amount = calculateindiprice(me.selectedservices[ind], me)
                me.setState({updatestate : true})
              }

            }} variant = "outlined" InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {v.minValueText}
            </InputAdornment>
          ),
        }} type = "number" ></TextField>
          
          </div>
        ) : (

         <div class = "selectedservs_individual_div_qtty_sub">




      
            <Fab color="primary" aria-label="Add" onClick = {() =>{


              if(me.selectedservices[ind].value > 1){
                me.selectedservices[ind].value = me.selectedservices[ind].value - 1
              me.selectedservices[ind].amount = calculateindiprice(me.selectedservices[ind], me)
              me.setState({updatestate : true})
              }

            }} ><Icon>remove_circle</Icon></Fab>
          

            <Button variant = "contained" color = "primary" >{me.selectedservices[ind].value}</Button>

         
            <Fab color="primary" aria-label="Add" onClick = {() =>{

              me.selectedservices[ind].value = me.selectedservices[ind].value + 1
              me.selectedservices[ind].amount = calculateindiprice(me.selectedservices[ind], me)
              me.setState({updatestate : true})


            }} ><Icon> add_circle</Icon></Fab>
           



         </div>

        )
        
        
        }</div>



      
    </div>

       

   <div>
            {/* Amount */}







            <div class = "selectedservs_individual_div_price">
        <Tooltip TransitionComponent={Zoom} title = {me.selectedservices[ind].amount.breakup}>
      <Button variant = "outlined" color = "primary" >{"Rs." + me.selectedservices[ind].amount.amount}</Button>
    </Tooltip>
     

        </div>
   



         {/* Remove */}

         <div class = "selectedservs_individual_div_qtty">

{me.subcats_options[me.subcats_options.findIndex(x => x._id === v.subcatId)].subcatName === "Plan" ? (
  <TextField  
  
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">Pieces</InputAdornment>
    ),
  }}

  variant = "outlined" style = {{width : "60%"}}  />
) : (null)}

        <Button onClick = {()=>{

            me.selectedservices.splice(ind,1)
            me.setState({updatestate : true})

        }} ><Icon>delete</Icon></Button>

        </div>
   </div>

      </div>
  )
}

function rendertop(me){

    return(
        <div class = "topbar_1">
          <SimpleCard title = "Basic" >


<div class = "rendertop_order_maindiv">
<Button disabled = {(window.location.search.substring(12,(window.location.search).length) !== "")} onClick = {()=>{

me.setState({showselectcustomer : true})

}} variant = "contained" color = "primary" >{me.customer === null ? "Select Customer" : me.customer.firstName}</Button>


{me.customer === null ? (null) : (
<Autocomplete id="combo-box-demo" options={me.customer.address } 
getOptionLabel={(option) => option.addressType + "-" + option.addr1 + "-" + option.addr2} 
renderOption = {(option) =>(

<div class = "order_autocomp_options">

{rendericon(option.addressType)}
<div style = {{marginLeft : "15px"}}>{option.addr1}</div>

</div>
)}


style={{ width: "25%" }} 
onChange = {(e,v)=>{

me.selectedaddress = v
me.setState({updatestate : true})

}}
value = {me.selectedaddress}

renderInput={(params) => <TextField {...params} label="Address" variant="outlined" />  }
/>

)}

<Autocomplete id="combo-box-demo" options={me.state.storesdata } getOptionLabel={(option) => option.storeName} style={{ width: "15%" }} 
onChange = {(e,v)=>{

me.store = v
me.setState({updatestate  : true})

}}
value = {me.store}
renderInput={(params) => <TextField {...params} label="Store Select" variant="outlined" />  }
/>


<Autocomplete id="combo-box-demo" options={me.state.ratecards } getOptionLabel={(option) => option.rateCardName} style={{ width: "15%" }} 
onChange = {(e,v)=>{
me.ratecard = v
me.setState({updatestate  : true})
}}
value = {me.ratecard}
renderInput={(params) => <TextField {...params} label="Rate Card " variant="outlined" />  }
/>


{me.ratecard === null ? (null) : (
<Autocomplete id="combo-box-demo" options={me.mothercats_options} 
getOptionDisabled = {(option)=> me.ratecard.rateCardServices.findIndex(x => x.mcId === option._id) === -1 }
getOptionLabel={(option) => option.mcName} style={{ width: "30%" }} 
onChange = {(e,v)=>{
me.mothercategory = v
me.setState({updatestate : true})
}}
value = {me.mothercategory}
renderInput={(params) => <TextField {...params} label="Select Mother Category" variant="outlined" />  }
/>
)

}



</div>
</SimpleCard>
        </div>
    )

}

function rendericon(type){
  
  switch (type) {
    case "Home":
      return(<Icon>home</Icon>)
    case "Work":
      return( <Icon>work</Icon>)
    default:
      return( <Icon>add_location</Icon>)

       }
}

function renderselectcustomer(me){

  return(
    <Dialog  maxWidth={"lg"} fullWidth={true}  open={me.state.showselectcustomer} onClose={me.handleClose} TransitionComponent={me.Transition}>
              <AppBar style = {{height : "0"}}>
          <Toolbar>
            <IconButton  style = {{backgroundColor : "white"}} color="primary" onClick={me.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            
          </Toolbar>
        </AppBar>
              <ManageCustomer parent = "order" selecthandler = {me.selected} ></ManageCustomer>
              </Dialog>
  )


}

async function getcategories(me){

  console.log(Axiosconfig.config)
  console.log(JSON.parse(window.localStorage.getItem("auth_user")))
  
    await axios.get( Axiosconfig.main + 'mc', Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res);
      
        me.mothercats_options = res.data.data.mc
       
   
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  
    
        await axios.get( Axiosconfig.main + 'cat', Axiosconfig.config)
        .then((res) => {
          console.log("RESPONSE RECEIVED:2 ", res);
     
            me.cats_options= res.data.data.cat
            
     
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
  
      
        await axios.get( Axiosconfig.main + 'subcat', Axiosconfig.config)
        .then((res) => {
          console.log("RESPONSE RECEIVED:3 ", res);
          
          me.subcats_options = res.data.data.subcat
        
          me.setState({isloading : false })
     

  
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })  
  
  
  }

function calculateindiprice(v, me){

   const service_type =  me.subcats_options[me.subcats_options.findIndex(x => x._id === v.subcatId)].subcatName
 
   var price = 0
   var breakup = ""  

   switch(service_type){
     case "Plan":{
       
      price = parseInt(v.perUnitPrice)
      breakup = "(Unit Price : " + v.perUnitPrice + ")"  
     
      if(v.value > parseInt(v.minValue)){
        price = price + ((v.value - parseInt(v.minValue))*v.additionalPrice)
        breakup = breakup + " + " + ((v.value - parseInt(v.minValue))) + " x " + "(Additional Price : " + v.additionalPrice + ")"
      
      }

     
      return  {
        amount : price,
        breakup : breakup
      }


     }
     default : {
       price = v.perUnitPrice*v.value
       breakup = "(Per Unit Price : " + v.perUnitPrice  + ")" + " x " + v.value
       return  {
         amount : price,
         breakup : breakup
       }
     }
   }


  }

 

 export default App;