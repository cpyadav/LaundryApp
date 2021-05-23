import React, { Component } from 'react';
import DND from '../../APIs/DND/DND';
import Table from '../../APIs/TablesAPI/Table';
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

import Axiosconfig from  '../../Axios/AxiosConfig'
const axios = require('axios').default;



class App extends React.Component {



    state = {showActionDialog : false, showselectcustomer : false, fetchingSlots:  false, fetchingOrders : false}

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
  
  

    delboys = [

        {
            name : "Pawan",
            id : "idp"
        },
        {
            name : "Vishnu",
            id : "idv"
        },
        {
            name : "Amol",
            id : "ida"
        },

    ]

    timeSlots = []

    

    componentDidMount(){
        alpha()
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
{requestPikup(this)}
{renderselectcustomer(this)}

</MuiThemeProvider>


    </div> )
}

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
            title : "Id", width : "5%", id : "id", filter  : false, sort  : false, fontSize : fontSize
        },
      
        {
            title : "Customer",  width : "10%",id : "name",  filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
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
            title : "Date/Slot",  width : "12%", id : "date", filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    <Select  variant = "outlined"  defaultValue = {rowData.stSlots[rowData.stSlots.findIndex(x => x._id === rowData.pickup.timeslotId && x.date === rowData.pickup.date.substring(0,10)  )]}  onChange = {(e)=>{
  
                        // rowData.pickup = e.target.value
                        console.log(e.target.value)
                        rowData.pickup = e.target.value

                        var pickupObj = {
                           
                                timeslotId : rowData.pickup._id,
                                date : rowData.pickup.date
                          
                        }

    
                        axios.put( Axiosconfig.main + 'order/' + rowData._id, {pickup : pickupObj} , Axiosconfig.config)
                        .then((res) => {
                            console.log(res.data.data)
    
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
            title : "Address",  width : "20%", id : "address", filter : false, sorting : true, fontSize : fontSize, render : rowData=>{
                return(
                    <div>{rowData.address.addr1 + " " + rowData.address.addr2 + " " + rowData.address.city}</div>
                )
            }
        },
        {
            title : "Status",  width : "12%", id : "status", filter  : false, sorting : true, fontSize : "10px", render : rowData=>{

                return(

                    <div>{rowData.status}</div>
                )
                // switch(rowData.status){
                //     case 0 : 
                //     return(
                //         <div class = "status_in_tables" style = {{backgroundColor : "blue"}} >Pikup Scheduled</div>
                //     )
                //     break;
                //     case 1 : 
                //     return(
                //         <div class = "status_in_tables" style = {{backgroundColor : "purple"}} >Processing</div>
                //     )
                //     break;
                //     case 2 : 
                //     return(
                //         <div class = "status_in_tables" style = {{backgroundColor : "orange"}}>Out For Delivery</div>
                //     )
                //     break;
                //     case 3 : 
                //     return(
                //         <div class = "status_in_tables" style = {{backgroundColor : "green"}}>Delivered</div>
                //     )
                //     break;
                // }
            }
        },
        {
            title : "Pickup Boy ",  width : "10%", id : "status", filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    // <div>{rowData.pickup_boy}</div>
                    <Select  variant = "outlined"  value = {rowData.pikupboyId}  onChange = {(e)=>{
  
                        rowData.pikupboyId = e.target.value
                      
                      }}  >
                      
                      {me.delboys.map(v=>{
                      return(
                      
                      <MenuItem value={v.id}>{v.name}</MenuItem>    
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
                        {/* <Button onClick = {()=>{

me.setState({showActionDialog : true})

}}  ><Icon>rowing</Icon></Button> */}

<Button href = {"/order/create?customerid=" + rowData.customerId + "&&orderId=" + rowData._id + "&&addressId=" + rowData.addressId + "&&express=" + rowData.express } onClick = {()=>{

}} >Create Order</Button>

<Button onClick = {()=>{

axios.put( Axiosconfig.main + 'order/' + rowData._id, { status : "Cancelled" }, Axiosconfig.config)
.then((res) => {
    console.log(res.data.data)

})
.catch((err) => {

    console.log(err)

})
    
}} >cancel</Button>
                    </div>
                )
            }
        },

     

       
       
     
    ]



    return(
        <div class = "Table_elem_size"><Table  key = {Math.random()} headers = {headers} data = {me.orders} title = "Pickup List"  /></div>
    )

}

function requestPikup(me){


    return(

        <Dialog maxWidth={"sm"} fullWidth={true}  open={me.state.showRequestPikup}
        onClose={()=>{
          me.setState({showRequestPikup : false})
        }} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">{"Request pikup"}</DialogTitle>
    
            <DialogContent>

                <Button onClick = {()=>{

                    me.setState({showselectcustomer:  true})

                }} >Select Customer</Button>

                {me.customer === undefined ? (null) : (
                    <div>
                        <Button>{me.customer.firstName + " " + me.customer.lastName}</Button>
                        <div>


        <Autocomplete id="combo-box-demo" options={me.customer.address } getOptionLabel={(option) => option.addressType} style={{ width: "100%" }} 
          onChange = {(e,v)=>{
            
            me.selectedaddress = v
            getTimeSlots(me)

          }}
          value = {me.selectedaddress}
          renderInput={(params) => <TextField {...params} label="Address" variant="outlined" />  }
            />



{!me.state.fetchingSlots ? (
    <div>
        <div class = "gimme_space" >Time slots</div>

<Autocomplete id="combo-box-demo" options={me.timeSlots } getOptionLabel={(option) => option.date + " " +  option.from + " " +  option.to} style={{ width: "100%" }} 
  onChange = {(e,v)=>{

    console.log(v)
    
    me.selectedSlot = {
        date : v.date,
        id : v._id,
        pos : v.pos

    }

    console.log(me.selectedSlot)

  }}
  defaultValue = {null}
  renderInput={(params) => <TextField {...params} label="Timeslots" variant="outlined" />  }
    />

           





        <div class = "gimme_space">Mother Category</div>

                    {me.store === undefined ? (null) : (
              

                    <Autocomplete id="combo-box-demo" options={me.store.motherCategories } getOptionLabel={(option) => option.mcName} style={{ width: "100%" }} 
          onChange = {(e,v)=>{
            
            me.mcId = v._id

          }}
          defaultValue = {null}
          renderInput={(params) => <TextField {...params} label="Mother Category" variant="outlined" />  }
            />



            



                    )}

<div class = "gimme_space"> Category</div>

{me.store === undefined ? (null) : (


<Autocomplete id="combo-box-demo" options={me.categories } multiple getOptionLabel={(option) => option.catName} style={{ width: "100%" }} 
onChange = {(e,v)=>{

    console.log(v)

me.categories = v

}}
defaultValue = {[]}
renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />  }
/>


)}

<div class = "gimme_space"> Coupons</div>

{me.store === undefined ? (null) : (


<Autocomplete id="combo-box-demo" options={me.coupons } getOptionLabel={(option) => option.couponName} style={{ width: "100%" }} 
onChange = {(e,v)=>{

me.coupon = v._id

}}
defaultValue = {null}
renderInput={(params) => <TextField {...params} label="Coupons" variant="outlined" />  }
/>


)}



<FormControlLabel
control={
  <Switch
    defaultChecked={me.express}
    onChange={(e)=>{

      me.express = e.target.checked


    }}
    name="checkedB"
    color="primary"
  />
}
label="Express Service"
/>
    </div>
) : (<Loader/>)}

                        







                    <Button onClick = {()=>{

                        var orderCategories = []


                        me.categories.map(v=>{

                            orderCategories.push(
                                {
                                    categoryId : v._id
                                }
                            )

                        })

                        console.log(me.selectedSlot)


                        var data = {
                            address : me.selectedaddress,
                            customerId : me.customer._id,
                            couponCode : me.coupon,
                            express: false,
                            
                            pickup : {
                                timeslotId : me.selectedSlot.id,
                                date : me.selectedSlot.date
                            },
                            storeId : me.store.id,
                            mcId : me.mcId,
                            type : "pickup",
                            rateCardId : me.rateCardId,
                            orderCategories : orderCategories
                            
                            
                        }

                        console.log(data)

                        axios.post(Axiosconfig.main + 'order', data ,  Axiosconfig.config)
                        .then((res) => {
                            console.log(res)
                            // window.location.href =  window.location.href

                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    }} >Request Pikup</Button>














                            
                        </div>
                    </div>
                )}



            </DialogContent>
    
    
            </Dialog>


    )


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