import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Axiosconfig from  '../../../Axios/AxiosConfig'
import SimpleCard from  '../../../APIs/SimpleCard/SimpleCard'
import Loader from  '../../../APIs/Loader/Loader'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider,  KeyboardTimePicker, KeyboardDatePicker, Calendar } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Collapse from '@material-ui/core/Collapse';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import './Create.css';
import theme from './theme';
import firebase from '../../../Firebase/firebase';
import uploaddoc from '../../../images/uploaddoc.png';
const axios = require('axios').default;

class App extends Component {

  state = {updatestate : true, storesdata : [], dataloaded:  false}

  pickupTime = {

    
    selected : false,

    timeslots : []
    
  }

  bookingTime = {
    fromDate : new Date(),
    toDate : new Date(),
    
    selected : false,
    timeSelected : false,

    timeslots : [
      {
        from : new Date(),
        to : new Date()
      }
    ]
    
  }

  geoArea = {
    selected : false,
    selectionArray : [],
    

  }



  category = {
    selected : false,
    selectionArray : [],
    criteriaType : "category"

  }

  

  orderMode = {
    selected : false,
    value : []
  }

  serviceType = {
    selected : false,
    value : []
  }

  customerLvl = {

    bookingCount:{
      selected : false,
      value : 50
    },
    lastBooked:{
      selected : false,
      value : 50
    },
    lifetimeDiscountPer:{
      selected : false,
      value : 10
    },
    lifetimeOrder:{
      selected : false,
      value : 10
    },

  }



  couponName = ""
  couponMeta = {

  couponDes : "",
  couponDesLong : "",
  couponImg : {
    imgUrl : "",
    imgRef : ""
  }

  }
  
  couponScheme = {

    minOrderValue : {
      selected : true,
      value : 0
    },

    discountType : "",
      
    
    discountAmount : 0,  //applicable for discount type : amount and cashback and percent

    maxDiscount : {
      selected : true,
      value : 0
    },

    maxCountPerUser : {
      selected : true,
      value : 0
    },

    overallUsageCount : {
      selected : true,
      value : 0
    },

  

  }

  showValid = true
  showScheme = true

  mothercats_options = []
  cats_options = []
  timeSlots = []
 

  applicableClient = []
    // type: String,
    // enum: [
    // 'SAAS-ADMIN',
    // 'SAAS-ANDROID',
    // 'SAAS-IOS',
    // 'SAAS-WEBSITE',
    // 'SAAS-MSITE',
    // ],
    





 Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  handleClose = () => {
     
  };





   componentWillMount(){

  getstoreslist(this)
  getcategories(this)
  getcoupondata(this)
  fetchTimeSlots(this)
  
  }



render() {


    return (
      
      
      !this.state.dataloaded ? (
        <div className="m-sm-30">




<MuiThemeProvider>
{renderTop(this)}
</MuiThemeProvider>



<FormControlLabel
        control={
          <Switch
            checked={this.showScheme}
            onChange={(e)=>{
              
              
              this.showScheme = e.target.checked
              this.setState({updatestate : true })
           
            }}
            name="checkedB"
            color="primary"
          />
        }
        label={"Show Scheme"}
      />

<div class="container">
             
             <MuiThemeProvider theme = {theme}>
             <Collapse in = {this.showScheme}>{schema(this)}</Collapse>
             </MuiThemeProvider>

             

             
         </div>

<FormControlLabel
        control={
          <Switch
            checked={this.showValid}
            onChange={(e)=>{
              
              
              this.showValid = e.target.checked
              this.setState({updatestate : true })
           
            }}
            name="checkedB"
            color="primary"
          />
        }
        label={"Show Validation" }
      />

          <div class="container">
             

              <MuiThemeProvider theme = {theme}>
              <Collapse in = {this.showValid}>{customerLvl(this)}</Collapse>
              </MuiThemeProvider>
              
              <MuiThemeProvider theme = {theme}>
              <Collapse in = {this.showValid}>{pickup(this)}</Collapse>
              </MuiThemeProvider>

              <MuiThemeProvider theme = {theme}>
              <Collapse in = {this.showValid}>{booking(this)}</Collapse>
              </MuiThemeProvider>

              <MuiThemeProvider theme = {theme}>
              <Collapse in = {this.showValid}>{geoarea(this)}</Collapse>
              </MuiThemeProvider>

           
              <MuiThemeProvider theme = {theme}>
              <Collapse in = {this.showValid}>{ordermode(this)}</Collapse>
              </MuiThemeProvider>

              {this.couponScheme.discountType === "expresschargewaiveoff" ? (

                null

              ) : (

             <MuiThemeProvider theme = {theme}>
              <Collapse in = {this.showValid}>{ servicetype(this)}</Collapse>
              </MuiThemeProvider>

              )}

             
              <MuiThemeProvider theme = {theme}>
              <Collapse in = {this.showValid}>{categorywise(this)}</Collapse>
              </MuiThemeProvider>
              
               
              

              
          </div>


        


        
      </div>
      )  : (<Loader/>)
     
     
    );
  }
}

function customerLvl(me){

  const totalcont = []

  var temp_array = [
    {key1 : "bookingCount",label : "Lifetime Booking Count", compsym : "<"},
    {key1 : "lastBooked",label : "Last Booking in days", compsym : "<"},
    {key1 : "lifetimeDiscountPer",label : "Lifetime Discount %", compsym : "<"},
    {key1 : "lifetimeOrder",label : "Lifetime Booking Value", compsym : ">"}

  ]

  temp_array.map(v=>{

    totalcont.push(
      <div class = "coupon_scheme_inddiv" >
  
  <FormControlLabel
          control={
            <Switch
              checked={me.customerLvl[v.key1].selected}
              onChange={(e)=>{
                me.customerLvl[v.key1].selected = e.target.checked
                me.setState({updatestate : true })
             
              }}
              name="checkedB"
              color="primary"
            />
          }
          label={v.label + "  " + v.compsym}
        />
  
      
      <Collapse  in = {me.customerLvl[v.key1].selected}>
  
        <TextField variant = "outlined"  label = {v.label} />
  
      </Collapse>
  
      </div>
    )

  }

  )


  return (

    <SimpleCard title = "Customer Loyalty" >
    <div class = "create_coupons_cardtoggle">
    <FormControlLabel
       control={
         <Switch
           checked={me.customerLvl.selected}
           onChange={(e)=>{
             
             
            me.customerLvl.selected = !me.customerLvl.selected
             me.setState({updatestate : true })
          
           }}
           name="checkedB"
           color="primary"
         />
       }
       label={"Make Customer Dependent" }
     />
    </div>



 
<div class = "create_coupons_cardview">
<Collapse in = { me.customerLvl.selected } >

<div>
 {totalcont}
</div>

</Collapse>
</div>



  </SimpleCard>



  )

}

function renderTop(me){
  return(

<div style = {{margin : "20px"}}>
<SimpleCard title = "Coupon Basic Details">

<div class = "sendtotopright">
  <Button variant="contained" color="primary"  onClick = {()=>{
    savecoupon(me)
  }} > <Icon>save</Icon>save coupon</Button> 
  </div>
     <div class = "create_coupons_basicdetails_maindiv">
       
       


     <div class = "create_coupons_rendertop_maindiv">
  
  <TextField defaultValue = {me.couponName}  variant = "outlined" label = "Coupon Code" onChange = {(e)=>{me.couponName = e.target.value}} />
  
  <TextField defaultValue = {me.couponMeta.couponDes} variant = "outlined" label = "Scheme Description" onChange = {(e)=>{me.couponMeta.couponDes = e.target.value}} />
  
  <TextField defaultValue = {me.couponMeta.couponDesLong} variant = "outlined" label = "Scheme Long Description" onChange = {(e)=>{me.couponMeta.couponDesLong = e.target.value}} />
  
  
 
  
  
  
  </div>
  

   <div>

  {me.couponMeta.couponImg.imgUrl !== "" ? (
    <img class = "create_coupons_rendertop_imgdiv" src = {me.couponMeta.couponImg.imgUrl} />
    ) : (
      <img class = "create_coupons_rendertop_imgdiv" src = {uploaddoc} />
    )} 


<input  style = {{display : "none"}}
          accept="image/*"
          id={"upload_item"}
          multiple
          type="file"
          onChange = {(e)=>{
            uploadfiles(me, e)
          }}
        />
       
  <label htmlFor={"upload_item"} class = "uploader_but_loader_main_div" >
  
  
  <div >
  <Tooltip  title = {"Upload Image"}>
  <Button variant="contained" color="primary" component="span">
  <Icon>cloud_upload</Icon>
  </Button>
                          </Tooltip>
  </div>
  
  
  </label>  

     
  </div>  



       
       
       
       
       </div> 
    </SimpleCard>
</div>




  )
}

function geoarea(me){


  return(

   <SimpleCard title = "Geography" >
     <div class = "create_coupons_cardtoggle">
     <FormControlLabel
        control={
          <Switch
            checked={me.geoArea.selected}
            onChange={(e)=>{
              
              
              me.geoArea.selected = !me.geoArea.selected
              
              // me.geoarea.selectionArray.splice(0,me.geoarea.selectionArray.length)
              me.setState({updatestate : true })
           
            }}
            name="checkedB"
            color="primary"
          />
        }
        label={"Make Coupon Store Dependent" }
      />
     </div>



  
<div class = "create_coupons_cardview">
<Collapse in = { me.geoArea.selected } >

<div>
  {renderstore(me)}
</div>

</Collapse>
</div>



   </SimpleCard>

  )
}

function pickup(me){

 


  return(

   <SimpleCard title = "Pick Up Timings" >
     <div class = "create_coupons_cardtoggle">
     <FormControlLabel
        control={
          <Switch
            checked={me.pickupTime.selected}
            onChange={(e)=>{
              
              
              me.pickupTime.selected = !me.pickupTime.selected
              me.setState({updatestate : true })
           
            }}
            name="checkedB"
            color="primary"
          />
        }
        label={"Pickup Slots" }
      />
     </div>



  
<div class = "create_coupons_cardview">
<Collapse in = { me.pickupTime.selected } >

{me.timeSlots.map(v=>{
  return(
    <div>
      <Button>{v.id}</Button>
      <Button>{ formatAMPM(v.from) }</Button>
      <Button>{formatAMPM(v.to)}</Button>

      <Switch
            defaultChecked={me.pickupTime.timeslots.includes(v.id)}
            onChange={(e)=>{
              
              if(me.pickupTime.timeslots.includes(v.id)){

                me.pickupTime.timeslots.splice( me.pickupTime.timeslots.indexOf(x => x === v.id), 1 )

              }else{

                me.pickupTime.timeslots.push(v.id)

              }

              console.log(me.pickupTime.timeslots)

              // me.setState({updatestate : true })
           
            }}
            name="checkedB"
            color="primary"
          />
      
    </div>
  )
})}



</Collapse>
</div>










   </SimpleCard>

  )
}

function booking(me){

 
  return(

   <SimpleCard title = "Booking Timings" >
     <div class = "create_coupons_cardtoggle">
     <FormControlLabel
        control={
          <Switch
            checked={me.bookingTime.selected}
            onChange={(e)=>{
              
              
              me.bookingTime.selected = !me.bookingTime.selected
              me.setState({updatestate : true })
           
            }}
            name="checkedB"
            color="primary"
          />
        }
        label={"Booking Date n Time" }
      />
     </div>



  
<div class = "create_coupons_cardview">
<Collapse in = { me.bookingTime.selected } >


<MuiPickersUtilsProvider utils={DateFnsUtils}>
<KeyboardDatePicker 
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Coupon Valid From Date"
          value={ me.bookingTime.fromDate }
          onChange={(e,v)=>{
            me.bookingTime.fromDate = v
            me.setState({updatestate : true })
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      
<KeyboardDatePicker 
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Coupon Valid From Date"
          value={ me.bookingTime.toDate}
          onChange={(e,v)=>{
            me.bookingTime.toDate = v
            me.setState({updatestate : true })
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />


<FormControlLabel
        control={
          <Switch
            checked={me.bookingTime.timeSelected}
            onChange={(e)=>{
              
              
              me.bookingTime.timeSelected = e.target.checked
              me.setState({updatestate : true })
           
            }}
            name="checkedB"
            color="primary"
          />
        }
        label={"Time" }
      />


<Collapse id = "time-picker" in = {me.bookingTime.timeSelected}>

{me.bookingTime.timeslots.map((v,ind)=>{
  return(

<div class = "create_coupon_booking">

  <Button>{"Slot No. " + (ind +  1)}</Button>

<KeyboardTimePicker
          margin="normal"
          variant = "inline"
          label="Coupon Valid from Time"
          value={me.bookingTime.timeslots[ind].from}
          onChange={(e,v)=>{
            me.bookingTime.timeslots[ind].from = new Date(e)
            me.setState({updatestate : true })
          }}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />

<KeyboardTimePicker
          margin="normal"
          variant = "inline"
          label="Coupon Valid to Time"
          value={me.bookingTime.timeslots[ind].to}
          onChange={(e,v)=>{
            me.bookingTime.timeslots[ind].to = new Date(e)
            me.setState({updatestate : true })
          }}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />

<Button disabled = {me.bookingTime.timeslots.length === 1} color = "secondary" onClick = {()=>{
  me.bookingTime.timeslots.splice(ind, 1)
  me.setState({updatestate : true })
}} ><Icon>remove</Icon></Button>
</div>


  )
})}

<Button variant = "contained" color = "primary" onClick = {()=>{

me.bookingTime.timeslots.push(
  {
    from : new Date(),
    to : new Date()
  }
)

me.setState({updatestate : true })

}} ><Icon>add</Icon></Button>


</Collapse>

</MuiPickersUtilsProvider>

</Collapse>
</div>










   </SimpleCard>

  )
}

async function getstoreslist(me){

  await axios.get( Axiosconfig.main + 'store', Axiosconfig.config)
  .then((res) => {
    console.log("RESPONSE RECEIVED:1 ", res);
    me.setState({storesdata : res.data.data.store})

  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })

}

function rendercity(me){

const totalcont = []
var cityarray = []

me.state.storesdata.map(v=>{

  if(!cityarray.includes(v.storeAddress.city)){
    cityarray.push(v.storeAddress.city)
    totalcont.push(
      // <div>{v.storeAddress.city}</div>

      <FormControlLabel
      control={
        <Switch
          checked={me.geoArea.selectionArray.includes(v.storeAddress.city)}
          onChange={(e)=>{
            
            
            if(e.target.checked){
              me.geoArea.selectionArray.push(v.storeAddress.city)
            }else{
              me.geoArea.selectionArray.splice(me.geoArea.selectionArray.indexOf(v.storeAddress.city),1)
            }
            me.setState({updatestate : true })
         
          }}
          name="checkedB"
          color="primary"
        />
      }
      label={v.storeAddress.city}
    />
    )
  }

})


return (
  <div class = "create_coupons_rendercity">
    {totalcont}
  </div>
)



}

function renderstore(me){
  const totalcont = []

  var cityarray = []

  



  // Top menu Store Selectore


  totalcont.push(
    <SimpleCard title = "Select all Stores in below cities">


{
  me.state.storesdata.map(v=>{

    if(!cityarray.includes(v.storeAddress.city)){
      cityarray.push(v.storeAddress.city)
      return(

        <Button variant = "outlined" color = "primary" onClick = {()=>{

          selectallfromcity(v.storeAddress.city, me)

        }} >{v.storeAddress.city}</Button>
  
      )
    }
  
  })
}

<Button disabled = {me.geoArea.selectionArray.length === 0} variant = "outlined" color = "primary" onClick = {()=>{

me.geoArea.selectionArray = []
me.setState({updatestate : true})

}} >Unselect All</Button>



  </SimpleCard>
  )


  // Top menu Store Selectore

  me.state.storesdata.map(v=>{


totalcont.push(
  
  <FormControlLabel
  control={
    <Switch
      checked={me.geoArea.selectionArray.includes(v._id)}
      onChange={(e)=>{
        
        
        if(e.target.checked){
          me.geoArea.selectionArray.push(v._id)
        }else{
          me.geoArea.selectionArray.splice(me.geoArea.selectionArray.indexOf(v._id),1)
        }
        me.setState({updatestate : true })
     
      }}
      name="checkedB"
      color="primary"
    />
  }
  label={v.storeName}
/>
)
 

})


return (
  <div class = "create_coupons_rendercity">
    {totalcont}
  </div>
)

}

function selectallfromcity(cityName, me){

me.state.storesdata.map(v=>{

if(v.storeAddress.city === cityName & !me.geoArea.selectionArray.includes(v._id)){
me.geoArea.selectionArray.push(v._id)
}

})

me.setState({updatestate : true})

}

function ordermode(me){
  
  return(
    <SimpleCard title = "Order Mode" >
    <div class = "create_coupons_cardtoggle">
    <FormControlLabel
       control={
         <Switch
           checked={me.orderMode.selected}
           onChange={(e)=>{
             
             
             me.orderMode.selected = !me.orderMode.selected
             me.setState({updatestate : true })
          
           }}
           name="checkedB"
           color="primary"
         />
       }
       label={"Mode Dependent" }
     />
    </div>



 
<div class = "create_coupons_cardview">
<Collapse in = { me.orderMode.selected } >

<ToggleButtonGroup  value={me.orderMode.value} onChange={(e,value)=>{

me.orderMode.value = value


me.setState({updatestate : true }) }}   aria-label="device">
                              <ToggleButton value="online" aria-label="laptop">
                              Online
                              </ToggleButton>
                              <ToggleButton value="walkin" aria-label="tv">
                              Walk In
                              </ToggleButton>
   
</ToggleButtonGroup>
  


</Collapse>
</div>










  </SimpleCard>
  )



}

function servicetype(me){
  
  
  return(
    <SimpleCard title = "Order Type" >
    <div class = "create_coupons_cardtoggle">
    <FormControlLabel
       control={
         <Switch
           checked={me.serviceType.selected}
           onChange={(e)=>{
             
             
             me.serviceType.selected = !me.serviceType.selected
             me.setState({updatestate : true })
          
           }}
           name="checkedB"
           color="primary"
         />
       }
       label={"Type Dependent" }
     />
    </div>



 
<div class = "create_coupons_cardview">
<Collapse in = { me.serviceType.selected } >

<ToggleButtonGroup  value={me.serviceType.value} onChange={(e,value)=>{

me.serviceType.value = value

me.setState({updatestate : true }) }}   aria-label="device">
                              <ToggleButton value="express" aria-label="laptop">
                              Express
                              </ToggleButton>
                              <ToggleButton value="regular" aria-label="tv">
                              regular
                              </ToggleButton>
   
</ToggleButtonGroup>
  


</Collapse>
</div>










  </SimpleCard>
  )



}

function schema(me){

  var discamountcol = ["cashback", "amount", "percentage"]
  var maxdiscamountcol = ["percentage"]
  
  
  return(
    <SimpleCard title = "Coupon Scheme" >
  
<div class = "coupon_scheme_inddiv">
  
<FormControlLabel
       control={
         <Switch
           checked={me.couponScheme.minOrderValue.selected}
           onChange={(e)=>{
             
             
             me.couponScheme.minOrderValue.selected = e.target.checked
             me.setState({updatestate : true })
             console.log(me.couponScheme)
          
           }}
           name="checkedB"
           color="primary"
         />
       }
       label={"Minimum Order Value" }
     />

    <Collapse in = {me.couponScheme.minOrderValue.selected}>
      <TextField type = "number" variant = "outlined" label = "Min Order Value" defaultValue = {me.couponScheme.minOrderValue.value} onChange = {(e)=>{
        me.couponScheme.minOrderValue.value = e.target.value
      }}  />
    </Collapse>

</div>

<div class = "coupon_scheme_inddiv">


<ToggleButtonGroup color = "primary" title = "Coupon Benefit" exclusive  value={me.couponScheme.discountType } onChange={(e,value)=>{

me.couponScheme.discountType = value
if(value === "expresschargewaiveoff"){
  me.serviceType.selected = false
}


me.setState({updatestate : true }) }}   aria-label="device">
                              <ToggleButton value="cashback" aria-label="laptop">
                               Cashback
                              </ToggleButton>
                              <ToggleButton value="amount" aria-label="tv">
                              Discount Amount
                              </ToggleButton>
                              <ToggleButton value="percentage" aria-label="tv">
                               Percent Off
                              </ToggleButton>
                              <ToggleButton value="deliverywaiveoff" aria-label="tv">
                              Delivery Fees wave Off
                              </ToggleButton>
                              <ToggleButton value="expresschargewaiveoff" aria-label="tv">
                              Express Charge Wave off
                              </ToggleButton>
   
</ToggleButtonGroup>
  

   
  

</div>

<div class = "coupon_scheme_inddiv">

      <Collapse in = {discamountcol.includes(me.couponScheme.discountType)}>

      <TextField type = "number" variant = "outlined" label = {decidelabel(me.couponScheme.discountType)} defaultValue = {me.couponScheme.minOrderValue.value} onChange = {(e)=>{
        me.couponScheme.discountAmount = e.target.value
      }}  />
  
      </Collapse>

</div>




<div >
  
<Collapse in = {maxdiscamountcol.includes(me.couponScheme.discountType)}>

<div class = "coupon_scheme_inddiv">


<FormControlLabel
         control={
           <Switch
             checked={me.couponScheme.maxDiscount.selected}
             onChange={(e)=>{
               
               
              me.couponScheme.maxDiscount.selected = e.target.checked
               me.setState({updatestate : true })
            
             }}
             name="checkedB"
             color="primary"
           />
         }
         label={"Max Discount" }
       />
  
      <Collapse in = {me.couponScheme.maxDiscount.selected}>
        <TextField type = "number" variant = "outlined" label = "Max Discount" defaultValue = {me.couponScheme.maxDiscount.value} onChange = {(e)=>{
          me.couponScheme.maxDiscount.value = e.target.value
        }}  />
      </Collapse>
</div>

</Collapse>
  
  </div>


  <div class = "coupon_scheme_inddiv">


<FormControlLabel
         control={
           <Switch
             checked={me.couponScheme.maxCountPerUser.selected}
             onChange={(e)=>{
               
               
              me.couponScheme.maxCountPerUser.selected = e.target.checked
               me.setState({updatestate : true })
            
             }}
             name="checkedB"
             color="primary"
           />
         }
         label={"Max Count Per User" }
       />
  
      <Collapse in = {me.couponScheme.maxCountPerUser.selected}>
        <TextField type = "number" variant = "outlined" label = "Max count per user" defaultValue = {me.couponScheme.maxCountPerUser.value} onChange = {(e)=>{
          me.couponScheme.maxCountPerUser.value = e.target.value
        }}  />
      </Collapse>
</div>

<div class = "coupon_scheme_inddiv">


<FormControlLabel
         control={
           <Switch
             checked={me.couponScheme.overallUsageCount.selected}
             onChange={(e)=>{
               
               
              me.couponScheme.overallUsageCount.selected = e.target.checked
               me.setState({updatestate : true })
            
             }}
             name="checkedB"
             color="primary"
           />
         }
         label={"Overall usage count" }
       />
  
      <Collapse in = {me.couponScheme.overallUsageCount.selected}>
        <TextField type = "number" variant = "outlined" label = "Overall usage count" defaultValue = {me.couponScheme.overallUsageCount.value} onChange = {(e)=>{
          me.couponScheme.overallUsageCount.value = e.target.value
        }}  />
      </Collapse>
</div>





  </SimpleCard>
  )



}

function decidelabel(a){

  switch (a) {
    case "cashback":
    return "Wallet Cashback"
    break;

    case "amount":
    return "Discount Amount"
    break;

    case "percentage":
    return "Cashback %"
    break;

    default : 
    return "Select Type"
    break;


  }

}

function categorywise(me){
  
  
    return(
  
     <SimpleCard title = "Category" >
       <div class = "create_coupons_cardtoggle">
       <FormControlLabel
          control={
            <Switch
              checked={me.category.selected}
              onChange={(e)=>{
                
                
                me.category.selected = !me.category.selected
                me.setState({updatestate : true })
             
              }}
              name="checkedB"
              color="primary"
            />
          }
          label={"Category Dependent" }
        />
       </div>
  
  
  
    
  <div class = "create_coupons_cardview">
  <Collapse in = { me.category.selected } >
  

  {renderCategories(me)}
  

  
  </Collapse>
  </div>
  
  
  
  
  
  
  
  
  
  
     </SimpleCard>
  
    )
}

function renderCategories(me){

     return(
      me.mothercats_options.map((vmc)=>{
        return(
          <div>

        <Button>{vmc.mcName}</Button>



        {me.cats_options.map(v=>{
        if(v.mcId === vmc._id ){
          return(
            <div>
              <FormControlLabel
          control={
            <Switch
              checked={me.category.selectionArray.includes(v._id)}
              onChange={(e)=>{
                
                
                if(e.target.checked){
                  me.category.selectionArray.push(v._id)
                }else{
                  me.category.selectionArray.splice(me.category.selectionArray.indexOf(v._id),1)
                }
                me.setState({updatestate : true })
             
              }}
              name="checkedB"
              color="primary"
            />
          }
          label={v.catName}
        />
            </div>
            )
        }
      })}






          </div>
        )
      }

      )
     )
    
   


}
  
async function getcategories(me){

  
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
            me.setState({dataloaded : false})
            
     
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
  
  
  
}

function uploadfiles(me,e){

  
    var file = e.target.files[0];
    // console.log(e.target)
    // me.setState({uploadingimg : true})
    
  
  
    var imagename = Date.now() + file.name
    var storageRef = firebase.storage().ref('CouponImages/' + imagename);
    var uploadTask = storageRef.put(file);
  
  
    
  
    uploadTask.on('state_changed', function(snapshot){
      
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      console.log(error);
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      
        if(me.couponMeta.couponImg.imgUrl !== ""  ){

          // deleteimage(me)
          console.log("Hi am deleting")

        }

        me.couponMeta.couponImg.imgUrl = downloadURL
        me.couponMeta.couponImg.imgRef = imagename
        console.log(me.couponMeta)
        me.setState({updatestate : true})
  
  
      });
    });
  
  
  
  
  
}

function deleteimage(me){

    var storageref = firebase.storage().ref().child('CouponImages/' + me.couponMeta.couponImg.imgRef)


    storageref.delete().then(function() {
      console.log("success")
    }).catch(function(error) {
      console.log(error)
    });

}

function savecoupon(me){

    var totalcont = {}
    var columns = ["pickupTime", "bookingTime", "geoArea", "category", "orderMode", "serviceType", "couponName", "couponMeta", "couponScheme", "customerLvl" ]

    columns.map(v=>{
      totalcont[v] = me[v]
    })

    console.log(totalcont)

      if(window.location.search === ""){
        axios.post(Axiosconfig.main + 'coupon', totalcont,  Axiosconfig.config).then((res) => {
          console.log(res)
        })
        .catch((err) => {
        console.log(err)
        })
      }else{
        axios.put(Axiosconfig.main + 'coupon' + window.location.search, totalcont,  Axiosconfig.config).then((res) => {
          console.log(res)
        })
        .catch((err) => {
         console.log(err)
        })
      }


  

}

function getcoupondata(me){

  me.setState({dataloaded : true})

if(window.location.search !== ""){
  axios.get(Axiosconfig.main + 'coupon/' + window.location.search ,  Axiosconfig.config)
  .then((res) => {
  

    var columns = ["pickupTime", "bookingTime", "geoArea", "category", "orderMode", "serviceType", "couponName", "couponMeta", "couponScheme", "customerLvl" ]


    columns.map(v=>{
      me[v] = res.data.data[v]
    })
    console.log("hi")
    me.setState({dataloaded : false})

    


    
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}else{
  me.setState({dataloaded : false})
}

}  

async function fetchTimeSlots(me){
  await axios.get( Axiosconfig.main + 'timeslot',  Axiosconfig.config)
  .then((res) => {
    console.log("RESPONSE RECEIVED:1 ", res.data.data.timeSlots);
    me.timeSlots = res.data.data.timeSlots
    
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })

}

function formatAMPM(date) {

  var hours = (new Date(date)).getHours();
  var minutes = (new Date(date)).getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export default App;