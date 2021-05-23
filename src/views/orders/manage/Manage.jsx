import React, { Component } from 'react';
import DND from '../../../APIs/DND/DND';
import Table from '../../../APIs/TablesAPI/Table';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Icon, Button, Fab,  Grid, Typography } from "@material-ui/core";
import './manage.css';
import Dialog from "@material-ui/core/Dialog";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import theme from './manage'
import DialogActions from "@material-ui/core/DialogActions";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Axiosconfig from  '../../../Axios/AxiosConfig'
const axios = require('axios').default;



class App extends React.Component {



    state = {showActionDialog : false}

    currentOrder = null
    couponCode = ""

    orders = []


    componentDidMount(){

        fetchOrders(this)

    }



render(){
    return(  <div  class = "Manage_orders_main_div">



<MuiThemeProvider theme = {theme} >
{renderTable(this)}

{actionDialog(this)}

</MuiThemeProvider>


    </div> )
}

}

function fetchOrders(me){


    
  
     axios.get( Axiosconfig.main + 'order', Axiosconfig.config)
    .then((res) => {
 
      
        console.log(res.data.data)
        me.orders = res.data.data.filter(x=> x.type === "order")
        me.setState({updatestate : true})
       
   
    })
    .catch((err) => {
   
    })


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

            defaultValue = {me.couponCode}

            onChange = {(e)=>{
                me.couponCode = e.target.value
            }}
           
           InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Button onClick = {()=>{

                   me.currentOrder.couponCode = me.couponCode
                   
axios.put( Axiosconfig.main + 'order/' + me.currentOrder._id, { couponCode : me.couponCode }, Axiosconfig.config)
.then((res) => {
    console.log(res.data.data)

})
.catch((err) => {

    console.log(err)

})



                }} variant  variant = "contained"  color = "primary" > Apply</Button>
              </InputAdornment>
            ),
          }}
           
           variant = "outlined" label = "Coupon"></TextField>
            </div >

            <Typography>Record Payment</Typography>

            <div class = "manage_orders_dialog_div">
            <TextField   variant = "outlined" label = "Amount"></TextField>

<TextField variant = "outlined" label = "Ref Id"></TextField>

<Button onClick = {()=>{

me.currentOrder.payments.push({amount : 89, refId : "ajshdgasd"})
axios.put( Axiosconfig.main + 'order/' + me.currentOrder._id, me.currentOrder , Axiosconfig.config)
.then((res) => {
    console.log(res.data.data)
    me.setState({showActionDialog : false})

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

function renderTable(me){

    var fontSize = "12px";


    const headers = [
       
      
        {
            title : "Customer",  width : "10%",id : "name",  filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    <div class = "table_cont_nextline">
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
            title : "Date/Slot",  width : "15%", id : "date", filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    <div>
                       <div>
                       {new Date(rowData.updatedAt).toUTCString().substring(0,16)}
                    </div>
                    <div>
                       {/* {rowData.timeSlot} */}
                    </div>
                    </div>
                )
            }
        },
        
      
        {
            title : "Status",  width : "15%", id : "status", filter  : false, sorting : true, fontSize : "10px", render : rowData=>{


                return(

                    <Select  variant = "outlined"  value = {rowData.status}  onChange = {(e)=>{
  
                        

                        axios.put( Axiosconfig.main + 'order/' + rowData._id, {status : e.target.value} , Axiosconfig.config)
                        .then((res) => {
                            // console.log(res.data.data)
                            rowData.status = e.target.value
                            me.setState({updatestate : true})

                        })
                        .catch((err) => {

                            console.log(err)

                        })

                        

                      
                      }}  >
                      
                     
                      <MenuItem value={"Cancelled"}>Cancelled</MenuItem> 
                      <MenuItem value={"Initiated"}>Initiated</MenuItem>    
                      <MenuItem value={"Processing"}>Processing</MenuItem>   
                      <MenuItem value={"Out For Delivery"}>Out For Delivery</MenuItem>   
                      <MenuItem value={"Delivered"}>Delivered</MenuItem>    
                  
                      </Select>


                )




                // switch(rowData.status){
                //     case "Initiated" : 
                //     return(
                //         <div class = "status_in_tables" style = {{backgroundColor : "blue"}} >Initiated</div>
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
            title : "Pay Status",  width : "12%", id : "paystatus", filter  : false, sorting  : true, fontSize : "10px", render : rowData=>{
                switch(rowData.paystatus){
                    case 0 : 
                    return(
                        <div class = "status_in_tables" style = {{backgroundColor : "blue"}} >Pending</div>
                    )
                    break;
                    case 1 : 
                    return(
                        <div class = "status_in_tables" style = {{backgroundColor : "purple"}} >Partial</div>
                    )
                    break;
                    case 2 : 
                    return(
                        <div class = "status_in_tables" style = {{backgroundColor : "green"}}>Done</div>
                    )
                    break;
                   
                }
            }
        },

        {
            title : "Bill Amt",  width : "10%", id : "orderTotal", filter  : false, sort  : false, fontSize : "16px"
        },

        {
            title : "Pending Amt",  width : "10%", id : "pendingAmount", filter  : false, sort  : false, fontSize : "16px"
        },

        {
            title : "Action",  width : "10%", id : "status", filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    <Button onClick = {()=>{

                        me.currentOrder = rowData
                        me.setState({showActionDialog : true})

                    }}  ><Icon>rowing</Icon></Button>
                )
            }
        },
       
     
    ]



    return(
        <div class = "Table_elem_size"><Table key = {Math.random()}  headers = {headers} data = {me.orders}   /></div>
    )

}




 

 export default App;