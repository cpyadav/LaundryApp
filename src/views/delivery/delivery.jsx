import React, { Component } from 'react';
import DND from '../../APIs/DND/DND';
import Table from '../../APIs/TablesAPI/Table';
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

import Axiosconfig from  '../../Axios/AxiosConfig'
const axios = require('axios').default;



class App extends React.Component {



    state = {showActionDialog : false}


    
  
    orders = [


    ]

    delboys = [

        {
            name : "Pawan"
        },
        {
            name : "Vishnu"
        },
        {
            name : "Amol"
        },

    ]


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
        me.orders = res.data.data
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

    var fontSize = "14px";


    const headers = [
        // {
        //     title : "Id", width : "7%", id : "id", filter  : false, sort  : false, fontSize : fontSize
        // },
      
        {
            title : "Customer",  width : "10%",id : "name",  filter  : false, sort  : false, fontSize : fontSize, render : rowData=>{
                return(
                    <div class = "table_cont_nextline">
                       <div>
                       {rowData.customer.name}:
                    </div>
                    <div>
                       {rowData.customer.mobile}
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
        
        // {
        //     title : "Nos",  width : "8%", id : "nos", filter : false, sorting : true, fontSize : fontSize
        // },
        {
            title : "Status",  width : "12%", id : "status", filter  : false, sorting : true, fontSize : "10px", render : rowData=>{
                


                return(
                    <Select  variant = "outlined"  defaultValue = {rowData.status}  onChange = {(e)=>{
  
                        rowData.status = e.target.value
    
                        axios.put( Axiosconfig.main + 'order/' + rowData._id, {status : e.target.value} , Axiosconfig.config)
                        .then((res) => {
                            console.log(res.data.data)
    
                        })
                        .catch((err) => {
    
                            console.log(err)
    
                        })
    
                        
    
                      
                      }}  >
                      
                     
                      
                     
                      <MenuItem value={"Out For Delivery"}>Out For Delivery</MenuItem>   
                      <MenuItem value={"Delivery Failed"}>Delivery Failed</MenuItem>    
                      <MenuItem value={"Paid"}>Paid</MenuItem>    
                      <MenuItem value={"Paid and Delivered"}>Paid and Delivered</MenuItem>   
                  
                      </Select>
                )


            }
        },
        // {
        //     title : "Pay Status",  width : "12%", id : "paystatus", filter  : false, sorting  : true, fontSize : "10px", render : rowData=>{
        //         switch(rowData.paystatus){
        //             case 0 : 
        //             return(
        //                 <div class = "status_in_tables" style = {{backgroundColor : "blue"}} >Pending</div>
        //             )
        //             break;
        //             case 1 : 
        //             return(
        //                 <div class = "status_in_tables" style = {{backgroundColor : "purple"}} >Partial</div>
        //             )
        //             break;
        //             case 2 : 
        //             return(
        //                 <div class = "status_in_tables" style = {{backgroundColor : "green"}}>Done</div>
        //             )
        //             break;
                   
        //         }
        //     }
        // },

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