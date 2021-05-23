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
import URLe from  '../../../APIs/URLExtract/URLE'

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
import CouponApplic from './couponAppli';
import './create.css'
import Axiosconfig from  '../../../Axios/AxiosConfig'
const axios = require('axios').default;

class App extends React.Component {


  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  handleClose = ()=>{
    this.setState({showselectcustomer : false})
  }

  selected = (custdata)=>{
  
    this.customer = custdata
    this.handleClose()
    pushnewAddress(this)
    
  }

  customer = null
  timeslotId = 0
  selectedaddress = {}
  store = null
  ratecard = null
  mothercategory = null
  category = null
  servsrchqry = ""
  selectedservices = []
  masterlistdata = []
  express = false
  deliveryCharge = 60
  viewnum = 1     //Changes here are done for developement , change this afterwards




  state = {showselectcustomer : false, isloading : false}


  async componentWillMount(){

    console.log(window.location)

    var customerqryid = URLe().customerid
    this.orderId = URLe().orderId
    this.setState({isloading : true})   


   if(customerqryid !== ""){
    axios.get(Axiosconfig.main + 'customer?id=' + customerqryid ,  Axiosconfig.config)
    .then((res) => {
      
      this.customer = res.data.data


     pushnewAddress(this)

      
      this.setState({updatestate : true})
      
    })
    .catch((err) => {
    
    })
   }

   await axios.get( Axiosconfig.main + 'store', Axiosconfig.config)
    .then((res) => {
 
      this.setState({storesdata : res.data.data.store})
      this.store = res.data.data.store[0]
      console.log(this.store)

      
    })
    .catch((err) => {
     
    })

    await axios.get( Axiosconfig.main + 'ratecard', Axiosconfig.config)
    .then((res) => {
 
      this.setState({ratecards : res.data.data})
      this.ratecard = res.data.data[0]

      
    })
    .catch((err) => {
    
    })

    await  axios.get(Axiosconfig.main + 'item',  Axiosconfig.config)
    .then((res) => {
      
      this.masterlistdata = res.data.data[0].itemList
 
    })
    .catch((err) => {
    
    })

    getcategories(this)







  }

render(){
    return(
        <div className="m-sm-30">



         

        {this.state.isloading ? (<Loader/>) : (
          
          decideViewnRender(this)

        )}

        </div>
    )
}

}

function pushnewAddress(me){


  me.customer.address.push(

    {
    addr1: "Store Pikup",
    addr2: "-",
    addressType: "-",
    }

)

me.selectedaddress = me.customer.address[me.customer.address.length-1]

if(me.orderId !== undefined){


  me.selectedaddress = me.customer.address[me.customer.address.findIndex(x => x._id === URLe().addressId)]
  me.express = URLe().express === "true" ? (true) : (false)


}

}

function decideViewnRender(me){

  switch (me.viewnum){
    case 1 : 
    return(
      <div>
              {rendertop(me)}
  
  {renderselectcustomer(me)} 
  
  {me.ratecard === null ? (null) : (
    renderservicenorder(me)
  )}
            </div>
    )

    case 2 : 
    return(
      <div>
           { orderSummaryPage(me)}
            </div>
    )
  }

}

function renderservicenorder(me){

  return(
    <div style = {{marginTop : "30px"}}>
 { me.mothercategory === null ? (null) : (
   rendermainservorder(me)
 )}

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
      <div 
      style = {{backgroundColor : colormaker(me.cats_options.findIndex(x => x._id === me.category.id) + 5)}} 
      class = "service_list_main_div">
      {renderservices(me)}
      </div>
      </div>
      </SimpleCard>
  
    </div>

    
      
      
    

    </MuiThemeProvider>

    <div class = "order_main_div">
        <SimpleCard title = "Order Summary">



        <div class = "sendtotopright" >
        <FormControlLabel
        control={
          <Switch
            checked={me.express}
            onChange={(e)=>{

              me.express = e.target.checked
              me.setState({updatestate : true})
       

            }}
            name="checkedB"
            color="primary"
          />
        }
        label="Express Service"
      />
        </div>






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
      <Button disabled = {me.customer === null} variant = "contained" color = "primary" onClick = {()=>{
   convertSelectedServices(me)

        me.viewnum = 2
        me.setState({updatestate : true})
      }}  >Proceed</Button>
    </div>



  )


  return totalcont


}

function calculate_total(me){

  var total = 0

  me.cats_options.map((cat,catind) =>{

    if(cat.mcId === me.mothercategory._id){

      total += cat.subordertotal*(me.express ? (me.mothercategory.mcExpressMultiplier) : (1))

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
    {me.express ? (" x " + "Express Multiplier : "+  me.mothercategory.mcExpressMultiplier + " = " + cat.subordertotal*me.mothercategory.mcExpressMultiplier) : null}
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
      <InputAdornment position="start">Pcs</InputAdornment>
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
disableClearable = {true}
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

<Autocomplete id="combo-box-demo" disableClearable = {true} options={me.state.storesdata } getOptionLabel={(option) => option.storeName} style={{ width: "15%" }} 
onChange = {(e,v)=>{

me.store = v
me.setState({updatestate  : true})


}}
value = {me.store}
renderInput={(params) => <TextField {...params} label="Store Select" variant="outlined" />  }
/>


<Autocomplete id="combo-box-demo" disableClearable = {true} options={me.state.ratecards } getOptionLabel={(option) => option.rateCardName} style={{ width: "15%" }} 
onChange = {(e,v)=>{
me.ratecard = v
me.setState({updatestate  : true})

}}
value = {me.ratecard}
renderInput={(params) => <TextField {...params} label="Rate Card " variant="outlined" />  }
/>



<Autocomplete disableClearable = {true} id="combo-box-demo" options={me.mothercats_options} 
getOptionDisabled = {(option)=> me.ratecard.rateCardServices.findIndex(x => x.mcId === option._id) === -1 }
getOptionLabel={(option) => option.mcName} style={{ width: "30%" }} 
onChange = {(e,v)=>{
me.mothercategory = v
me.setState({updatestate : true})

}}
value = {me.mothercategory}
renderInput={(params) => <TextField {...params} label="Select Mother Category" variant="outlined" />  }
/>





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


  
    await axios.get( Axiosconfig.main + 'mc', Axiosconfig.config)
    .then((res) => {
 
      
        me.mothercats_options = res.data.data.mc
       
   
    })
    .catch((err) => {
   
    })
  
    
        await axios.get( Axiosconfig.main + 'cat', Axiosconfig.config)
        .then((res) => {
     
     
            me.cats_options= res.data.data.cat
            
     
        })
        .catch((err) => {
    
        })
  
      
        await axios.get( Axiosconfig.main + 'subcat', Axiosconfig.config)
        .then((res) => {
     
          
          me.subcats_options = res.data.data.subcat
        
          me.setState({isloading : false })
     

  
        })
        .catch((err) => {
       
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

function convertSelectedServices(me){

  me.orderComplete = {
    orderTotal : calculateOrdertotal(me),
    revisedOrderTotal : calculateOrdertotal(me),
    couponCode : "",
    storeId : me.store._id,
    rateCardId : me.ratecard._id,
    mcId : me.mothercategory._id,
    address : me.selectedaddress,
    customerId : me.customer._id,
    customer : {
        id : me.customer._id,
        address : me.selectedaddress,
        name : me.customer.firstName,
        mobile : me.customer.mobileNumber
    },
    orderCategories : [],
    express : me.express,
    deliveryCharge : me.deliveryCharge,
    
    
}

if(me.orderId !== undefined){
  me.orderComplete.orderId = me.orderId
}




me.cats_options.map((cat, catind)=>{

  if(cat.mcId === me.mothercategory._id  && pushSubOrderServices(me,cat._id).length > 0 ){

    me.orderComplete.orderCategories.push({

  categoryId : cat._id,
  subOrderTotal : calculateSubOrderTotal(me,cat._id),
  revisedSubOrderTotal : calculateSubOrderTotal(me,cat._id),
  couponCode : [],
  subOrderServices : pushSubOrderServices(me,cat._id)

    })

  }

})


console.log(me.orderComplete)






}

function calculateOrdertotal(me){

var total = 0
me.selectedservices.map(v=>{
total = total + calculateindiprice(v,me).amount

})

return total

}

function calculateSubOrderTotal(me,catId){

  var total = 0
me.selectedservices.map(v=>{
if(v.catId === catId){
  total = total + calculateindiprice(v,me).amount
}

})

return total


}

function pushSubOrderServices(me,catId){
  var total = []
  me.selectedservices.map(v=>{
  if(v.catId === catId){
    total.push(v)
  }
  
  })

  return total
}

function orderSummaryPage(me){



  return(
    <div>
      
    <div class = "orderSummary_topbar" >
      <Button onClick = {()=>{
        me.viewnum = 1
        me.setState({updatestate : true})
      }} ><Icon>keyboard_backspace</Icon></Button>
    </div>
  
    <div  class = "orderSummary_maincontent">
      <CouponApplic orderDetails = {me.orderComplete} cats = {me.cats_options}   />
    </div>
  
    </div>
  )
  
}  

function colormaker(ind){

    var r = ind*600 > 255 ? (((ind*600) % 255)) : (ind*600)
    var g = ind*200 > 255 ? (((ind*200) % 255)) : (ind*200)
    var b = ind*10 > 255 ? (((ind*10) % 255)) : (ind*10)
  
  return "rgb(" + r +  "," + g +  "," + b + ")"
  
} 

 

 export default App;