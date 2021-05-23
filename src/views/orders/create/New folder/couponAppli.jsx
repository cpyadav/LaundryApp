import React, { Component } from 'react';
import { Icon, Button, Fab,  Grid, Card, TextField} from "@material-ui/core";
import SimpleCard from '../../../APIs/SimpleCard/SimpleCard'
import './couponappli.css'
import theme from './themeCouponAppli'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import ListView from '../../../APIs/ListView/ListView';


import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"

import Tooltip from '@material-ui/core/Tooltip';
import Axiosconfig from '../../../Axios/AxiosConfig';
const axios = require('axios').default;

class App extends React.Component {

    payOption = 1
    option1Data={
        payby : "cash",
        reference : "",
        doneby : "",
    }

    show = []

    orderComplete = this.props.orderDetails
    
   


    render(){


        return(
           <MuiThemeProvider theme = {theme}>
                <div class = "ordercomp_div">

<div class = "ordertopbar_main_div"  >

{renderTopbar(this)}

</div>

<div class = "ordermain_main_div"  >

{renderMain(this)}
{renderPay(this)}

</div>






</div>
           </MuiThemeProvider>
        )
    }



}

function renderTopbar(me){

    return(
       <div >
           
           <Button variant = "contained"  color = "secondary" >{"Customer Name : " + me.orderComplete.customer.name}</Button>
           <Button variant = "contained"  color = "secondary" >{"Delivery Point : " + me.orderComplete.customer.address.addr1}</Button>
           <TextField onChange = {(e)=>{
               me.orderComplete.couponCode = e.target.value
           }}
           
           InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Button variant  variant = "contained"  color = "primary"  onClick = {(e)=>{


axios.post(Axiosconfig.main + 'coupon/apply', me.orderComplete ,  Axiosconfig.config)
     .then((res) => {
         console.log(res.data.data)
         me.orderComplete = res.data.data
         me.setState({updatestate : true})

     })
     .catch((err) => {
         console.log(err)
     })






}} > Apply</Button>
              </InputAdornment>
            ),
          }}
           
           variant = "outlined" label = "Coupon"></TextField>
           <Button variant = "contained"  color = "primary"  onClick = {()=>{

               pushData(me)

           }} >Submit</Button>
        

         
       </div>
    )


}

function pushData(me){

   
if(me.orderComplete.orderId === undefined){
    axios.post(Axiosconfig.main + 'order', me.orderComplete ,  Axiosconfig.config)
.then((res) => {
    console.log(res)
    window.location.href = '/order/manage'
   

})
.catch((err) => {
    console.log(err)
})
}else{

axios.put(Axiosconfig.main + 'order/' + me.orderComplete.orderId, me.orderComplete ,  Axiosconfig.config)
.then((res) => {
    console.log(res)
    window.location.href = '/order/manage'
   

})
.catch((err) => {
    console.log(err)
})

}



}

function renderMain(me){



    var headers = [
        {Label : "Order Total", id : "orderTotal"},
        {Label : "Discount", id : "discount"},
        {Label : "To pay", id : "revisedOrderTotal"},
    ]

    // <ListView data = {temp_cust}   header = {headers} font = "14px" />






    return(
       <div >
          
<div class = "category_main_div">
<SimpleCard title = "Order Summary">

<ListView data = {me.orderComplete}   header = {headers} font = "14px" />


</SimpleCard>
</div>


           {me.orderComplete.orderCategories.map((v ,ind)=>{
               

               if(v.subOrderServices.length > 0){
                return(
                    <div class = "category_main_div">
     
     <SimpleCard 
     
     title = {me.props.cats[me.props.cats.findIndex(x => x._id === v.categoryId)].catName}
     >



<div class = "create_coupons_cardtoggle">
    <FormControlLabel
       control={
         <Switch
           checked = {me.show[ind]}
           onChange={(e)=>{

            me.show[ind] = e.target.checked
            me.setState({updatestate : true})

          
           }}
           name="checkedB"
           color="primary"
         />
       }
       label={"Show Complete Details" }
     />
    </div>

         <Collapse in = {me.show[ind]}>
         
         {v.subOrderServices.map(vs=>{
     
     return(
         <div class = "service_main_div">

             <div><Button>{vs.serviceName}</Button></div>
             <div><Button>{  vs.value + " " + vs.minValueText}</Button></div>
             <div><Tooltip title = {vs.amount.breakup}>
             <Button>{ "Price : " +  vs.amount.amount }</Button>
             </Tooltip></div>
            
             

         </div>
     )



     })}
         </Collapse>
     
                
     
                
                         <Button color = "secondary" variant = "contained" disabled = {v.subOrderTotal !== v.revisedSubOrderTotal }  >{"SubOrderTotal" + v.subOrderTotal}</Button>
                
                 {
     
                     v.subOrderTotal === v.revisedSubOrderTotal  ? (null) : (
                         <Button>{" Rev SubOrderTotal" + v.revisedSubOrderTotal }</Button>
                     )
                 }
     
     </SimpleCard>
     
     
     
                    </div>
                    )
               }


           })}


       </div>
    )


}

function renderPay(me){
    return(
        <div>

                  
    
        <div class = "category_main_div">
        <SimpleCard title = "Payment Options">
        <ToggleButtonGroup exclusive value={me.payOption} onChange={(e,value)=>{
   
   me.payOption = value
   me.setState({updatestate : true})
    
}}   aria-label="device">
                              <ToggleButton value={1} aria-label="laptop">
                             Pay at Counter
                              </ToggleButton>
                              <ToggleButton value={2} aria-label="laptop">
                             Pay later
                              </ToggleButton>
                             
                             
   
</ToggleButtonGroup>


<div class = "payment_main_div_options">

{
        (()=> {
        switch (me.payOption) {
          case 1: return render1(me);
          case 2: return render2(me);
          default: return render1(me);
        }
      })()
 }
    
</div>


</SimpleCard>
        </div>
  
   

        </div>
    )
}

function render1(me){
    return(
        <Select variant = "outlined"
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value = {me.option1Data.payby}
        onChange={(e)=>{

            me.option1Data.payby = e.target.value
            me.setState({updatestate : true})
         
        }}
        label="Mode"
      >
            <MenuItem value="paytm">Paytm</MenuItem>
            <MenuItem value="upi">UPI</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="card">Card</MenuItem>
      </Select>
    )
}

function render2(me){
    return(
        <div>
            <Button color = "secondary" variant = "contained">
                Send Payment Link
            </Button>
        </div>
    )
}

function render3(me){
    return(
        <div> I am pay by link</div>
    )
}


 export default App;
