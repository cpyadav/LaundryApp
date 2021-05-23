import React, { Component } from 'react';
import DND from '../../APIs/DND/DND';
import Table from '../../APIs/TablesAPI/Table';
import URLe from '../../APIs/URLExtract/URLE';
import Loader from '../../APIs/Loader/Loader';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tab from '@material-ui/core/Tab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tabs from '@material-ui/core/Tabs';
import alpha from '../../APIs/URLExtract/URLE'
import { Icon, Button, Fab,  Grid, Typography, Tooltip } from "@material-ui/core";
import './manage.css';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from "@material-ui/core/Dialog";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import theme from './manage'
import DialogActions from "@material-ui/core/DialogActions";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ManageCustomer from '../customers/Manage'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PikupReq from './request';

import Axiosconfig from  '../../Axios/AxiosConfig'
import isThisHour from 'date-fns/esm/isThisHour/index.js';
const axios = require('axios').default;



class App extends React.Component {



    state = {showActionDialog : false, showselectcustomer : false, fetchingSlots:  false, fetchingOrders : false, showRequestPikup : false, showCancelDialog : false}

    handleClose = ()=>{
        this.setState({showselectcustomer : false})
    }

    selected = (cust)=>{

console.log(cust)
this.customer = cust
this.selectedaddress = cust.address[0]

console.log(cust)

getTimeSlots(this)

this.setState({showselectcustomer : false})

    }


    orders = []
    timeSlots = []
    cancelReason = null

    

    componentDidMount(){
        if(URLe().customerid !== undefined){
            // 

            axios.get(Axiosconfig.main + 'customer?id=' + URLe().customerid ,  Axiosconfig.config)
            .then((res) => {
        
            console.log(res.data.data)
              this.customer = res.data.data
              this.setState({showRequestPikup : true})
              
            })
            .catch((err) => {
        
                console.log(err)
            
            })

        }
        fetchOrders(this)


    }



render(){
    return(  <div  class = "Manage_orders_main_div">

        <Button onClick = {()=>{

            this.setState({showRequestPikup : true})

        }} >Request Pik</Button>

{this.state.fetchingOrders ? (<div>Fetching Order</div>) : (renderTable(this))}
<MuiThemeProvider theme = {theme} >
{actionDialog(this)}
{this.state.showRequestPikup ? requestPikup(this) : (null)}
{this.state.showCancelDialog ? cancelDialog(this) : (null)}


</MuiThemeProvider>


    </div> )
}

}

function cancelDialog(me){


    return(
        <Dialog maxWidth={"sm"} fullWidth={true}  open={me.state.showCancelDialog}
        onClose={()=>{
          me.setState({showCancelDialog : false})
        }} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">{"Cancel Pickup Request"}</DialogTitle>
    
            <DialogContent>
                <div class = "manage_orders_dialog_div" >
    
                <Typography>Are you sure you want to cancel this order?</Typography>
               
                </div >




                <Select  variant = "outlined"   defaultValue = {null}  onChange = {(e)=>{

                    me.cancelReason = e.target.value

                    }}  >

                    
                    <MenuItem value = {"reason1"} >{"Reason Des 1"}</MenuItem>
                    <MenuItem value = {"reason2"} >{"Reason Des 2"}</MenuItem>
                    <MenuItem value = {"reason3"} >{"Reason Des 3"}</MenuItem>
                    <MenuItem value = {"reason4"} >{"Reason Des 4"}</MenuItem>
                   




                </Select>






    
                <div class = "manage_orders_dialog_div">
                
                
                <Button onClick = {()=>{





axios.put( Axiosconfig.main + 'order/' + me.currentOrder._id, { status : "Cancelled", remark : me.cancelReason }, Axiosconfig.config)
.then((res) => {
    window.location.href =    window.location.href 

})
.catch((err) => {

    console.log(err)

})




                }} > Submit </Button>
                </div>
            </DialogContent>
    
    
            </Dialog>
    )


}

function getTimeSlots(me){

    me.setState({fetchingSlots : true})
    
    axios.get( Axiosconfig.main + 'timeslot/search?customerId=' + me.customer._id + "&latitude=" + me.selectedaddress.latitude + "&longitude=" + me.selectedaddress.longitude, Axiosconfig.config)
   .then((res) => {

    console.log(  res.data.data)
       me.timeSlots = structureSlots(res.data.data.slots)
       me.store = res.data.data.store
       me.rateCardId = me.store.ratecardOnline
       me.selectedSlot = me.timeSlots[0].pos
       me.categories = res.data.data.services.categories
       me.express = false
       me.coupons = res.data.data.coupons

       console.log(  me.timeSlots)
       me.setState({fetchingSlots : false})

      
  
   })
   .catch((err) => {

    console.log(err)
  
   })



}

function fetchOrders(me){


    me.setState({fetchingOrders : true})
    
  
    axios.get( Axiosconfig.main + 'order', Axiosconfig.config)
   .then((res) => {

    console.log(res)
     
       me.orders = res.data.data.filter(x=> x.type === "pickup")
       structureSlotsOrders(me)
      
      
  
   })
   .catch((err) => {
  
   })


}

function structureSlotsOrders(me){

    me.orders.map(v=>{

       
        v.stSlots = structureSlots(v.slots)

    })

    console.log(me.orders)
   
    me.setState({fetchingOrders : false})



}

function structureSlots(slots){



        var stSlots = []
        
       var count = 1
        slots.map(v1=>{

            v1.slots.map(v2=>{

                stSlots.push(
                {
                    date : v1.date,
                    _id : v2._id,
                    from : formatAMPM(v2.from),
                    to : formatAMPM(v2.to),
                    pos : count

                }

                
            )
            count = count +  1
            })


        })
        return stSlots;

  





}

function actionDialog(me){

return(

    <Dialog maxWidth={"sm"} fullWidth={true}  open={me.state.showActionDialog}
    onClose={()=>{
      me.setState({showActionDialog : false})
    }} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">{"Order Actions"}</DialogTitle>

        <DialogContent>
            <div class = "manage_orders_dialog_div" >

            <Typography>Apply Coupon</Typography>
            <TextField
           
           InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Button variant  variant = "contained"  color = "primary" > Apply</Button>
              </InputAdornment>
            ),
          }}
           
           variant = "outlined" label = "Coupon"></TextField>
            </div >

            <Typography>Record Payment</Typography>

            <div class = "manage_orders_dialog_div">
            <TextField   variant = "outlined" label = "Amount"></TextField>

<TextField variant = "outlined" label = "Ref Id"></TextField>

<Button> Submit </Button>
            </div>
        </DialogContent>


        </Dialog>

)


}

function renderTable(me){

    var fontSize = "12px";


    const headers = [
        {
            title : "Id", width : "5%", id : "id", filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    <div>
                        <div>{rowData._id}</div>
                        <div>{rowData.express ? "Express" : "Regular"}</div>
                    </div>
                )
            }
        },
      
        {
            title : "Customer",  width : "7%",id : "name",  filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    <div>
                       <div>
                       {rowData.customer.firstName}:
                    </div>
                    <div>
                       {rowData.customer.mobileNumber}
                    </div>
                    </div>
                )
            }
        },
       
        {
            title : "Date/Slot",  width : "18%", id : "date", filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    <Select  variant = "outlined"  defaultValue = {rowData.stSlots[rowData.stSlots.findIndex(x => x._id === rowData.pickup.timeslotId && x.date === rowData.pickup.date.substring(0,10)  )]}  onChange = {(e)=>{
  
                        console.log(e.target.value)
                        rowData.pickup = {
                            date : e.target.value.date,
                            timeslotId: e.target.value._id
                        }
                        console.log(rowData)

                        

                        

    
                        axios.put( Axiosconfig.main + 'order/' + rowData._id, {pickup : rowData.pickup} , Axiosconfig.config)
                        .then((res) => {
                            console.log(res.data.data)

                                    axios.get( Axiosconfig.main + 'order/' + rowData._id + "/" + rowData.pickup.timeslotId + "/staffs?date=" + rowData.pickup.date , Axiosconfig.config)
                                    .then((res) => {
                                
                                    console.log(res.data.data)
                                    rowData.pickupStaffs = res.data.data

                                    me.setState({updatestate : true})

                                
                                    })
                                    .catch((err) => {
                                
                                    })

                               
    
                        })
                        .catch((err) => {
    
                            console.log(err)
    
                        })
    
                        
    
                      
                      }}  >

                    {rowData.stSlots.map(v=>{

                        return(
                            <MenuItem value = {v} >{v.date + " - " + v.from + " - " + v.to}</MenuItem>
                        )

                    })}
                      
                     
                     
                  
                      </Select>
                )
            }
        },
        
        {
            title : "Address",  width : "10%", id : "address", filter : false, sorting : true, fontSize : fontSize, render : rowData=>{
                return(
                    <div>{rowData.address.addr1 + " " + rowData.address.addr2 + " " + rowData.address.city}</div>
                )
            }
        },
        {
            title : "Status",  width : "12%", id : "status", filter  : false, sorting : true, fontSize : "10px", render : rowData=>{

                return(

                    <div>
                        
                        <Select  variant = "outlined"  value = {rowData.status}  onChange = {(e)=>{
                            
                            if(e.target.value === "Cancelled"){
                                me.cancelReason = null
                                me.currentOrder = rowData
                                me.setState({showCancelDialog : true})
                            }else{
                                rowData.status = e.target.value
                                

                                axios.put( Axiosconfig.main + 'order/' + rowData._id, { status : rowData.status }, Axiosconfig.config)
                                .then((res) => {
                                    me.setState({updatestate : true})

                                })
                                .catch((err) => {

                                    console.log(err)

                                })
                                                            }
                            
                            




                    }}  >



      <MenuItem value={"Cancelled"}>{"CANCELLED"}</MenuItem> 
      <MenuItem value={"PickedUp"}>{"PICKED UP"}</MenuItem> 
      <MenuItem value={"At Store"}>{"AT STORE"}</MenuItem> 
   

</Select>
                        
                        
                    </div>
                )
             
            }
        },
        {
            title : "Pickup Boy ",  width : "10%", id : "status", filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    // <div>{rowData.pickup_boy}</div>
                    <Select  variant = "outlined"  value = {rowData.pickup.staffId}  onChange = {(e)=>{
  
                        rowData.pickup.staffId = e.target.value
                        me.setState({updatestate : true})
                      
                      }}  >
                      

                      {rowData.pickupStaffs.map(v=>{
                          return(
                            <MenuItem value={v._id}>{v.staffFirstName}</MenuItem>   
                          )
                      })}
                      
                      </Select>
                )
            }
        },
        {
            title : "Action",  width : "10%", id : "pikup_boy", filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    <div>
                      

<Button href = {"/order/create?customerid=" + rowData.customerId + "&&orderId=" + rowData._id + "&&addressId=" + rowData.addressId + "&&express=" + rowData.express } onClick = {()=>{

}} >Create Order</Button>


                    </div>
                )
            }
        },

     

       
       
     
    ]



    return(
        <div class = "Table_elem_size"><Table  key = {123} headers = {headers} data = {me.orders} title = "Pickup List"  /></div>
    )

}

function requestPikup(me){


    return(

        <Dialog maxWidth={"sm"} fullWidth={true}  open={me.state.showRequestPikup}
        onClose={()=>{
        console.log("hi")
          me.setState({showRequestPikup : false})
        }} aria-labelledby="form-dialog-title" >

<DialogTitle id="form-dialog-title">{"Request pikup"}</DialogTitle>

<DialogContent><PikupReq customer = {me.customer} /></DialogContent>


        


        </Dialog>

       


    )


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