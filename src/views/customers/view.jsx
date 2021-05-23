import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SimpleCard from '../../APIs/SimpleCard/SimpleCard';
import Loader from '../../APIs/Loader/Loader';
import Table from '../../APIs/TablesAPI/Table';
import ListView from '../../APIs/ListView/ListView';
import { Icon, Button, Fab,  Grid, Card, Typography, Dialog} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import WalletPage from '../wallet/Manage'
import MapLocation from '../../APIs/MapsAPI/Location_Customer'
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Axiosconfig from  '../../Axios/AxiosConfig'
import "./view.css"
import IconButton from '@material-ui/core/IconButton';
const axios = require('axios').default;

class App extends Component {

    constructor(props) {
        super(props)
    
        this.handler = this.handler.bind(this)
      }

    state = {tabvalue : 1, custLoaded : false, edit_location : false,showWalletDialog : false, logsLoaded : false  }
    customer = {}
    add_num = null


    handleClose=()=>{
        this.setState({edit_location : false})
    }


    handler(key,  value){
        console.log(key, value, this.customer)

        if(this.add_num === -1){

            this.customer.address.push({})
            this.add_num = this.customer.address.length - 1

        

        this.customer.address[this.add_num][key] = value
        if(key === "addressType"){

            savedata(this)

        }

        }else{

           

        this.customer.address[this.add_num][key] = value
        if(key === "addressType"){

            savedata(this)

        }

        }
          
        }


    render(){
        return(
            <div>
                {this.state.custLoaded ? (
                    <div>
                      { renderTop(this)}

                    {renderTabs(this)}
                    <div class = "view_customer_main_area">{renderDecider(this)}</div>
                    {renderEditLocation(this)}
                </div>
                ) : (<Loader/>)}
            </div>
        )
    }

    componentWillMount(){

        fetchCustomerInfo(this)


    }

 



}

function renderTop(me){

 var stats = [
     {title : "Total Orders", details : "60", bkgclr : "#eeeeee"},
     {title : "Total Orders Value", details : "6300", bkgclr : "#eeeeee"},
     {title : "Last Month", details : "2500", bkgclr : "#eeeeee"}
 ]  
 
 var actionables = [
    {title : "Create Order", href : "/order/create?customerid=" + me.customer._id , icon : "create"},
    // {title : "Create Order", href : "/order/create?customerid=" + me.customer._id , icon : "create"},
    // {title : "Create Order", href : "/order/create?customerid=" + me.customer._id , icon : "create"},
    // {title : "Create Order", href : "/order/create?customerid=" + me.customer._id , icon : "create"},
    // {title : "Create Pikup", href : "/order/create?customerid=" + me.customer._id , icon : "create"},
    {title : "Create Pikup", href : "/pickups/?customerid=" + me.customer._id , icon : "directions"},
   
 ]

return(

<div class = "view_cust_top_view">

<div class =  "view_cust_top_view_anal" >

{stats.map(v=>{
    return(
        
<div><SimpleCard bkgclr = {v.bkgclr} title = {v.title}>
    
    <div class = "view_cust_top_view_anal_det">
        {v.details}
    </div>

    </SimpleCard></div>
    )
})}



</div>

<div class =  "view_cust_top_view_actionables">

{actionables.map(v=>{
    return(
        <Button variant = "contained" color = "secondary" href = {v.href} ><Icon>{v.icon}</Icon>{v.title}</Button>
    )
})}



</div>



</div>

)

}

function savedata(me){

    console.log(me.customer)

     axios.put(Axiosconfig.main + 'customer?id=' + window.location.search.substring(8,window.location.search.length), me.customer,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      window.location.href = window.location.href
    //   this.alertobj = {type : "success", msg : "Customer Details Updated Successfully", show : true }
    //   this.setState({updatestate : true, savingdata : false})
      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err.response);
    //   this.alertobj = {type : "error", msg : err.response.data.message, show : true }
    //   this.setState({updatestate : true, savingdata : false})
     
    })


}

function renderEditLocation(me){

if(me.state.edit_location){
    return(

<Dialog maxWidth={"md"} fullWidth={true}  open={me.state.edit_location} onClose={me.handleClose}>



<AppBar style = {{height : "0"}}>
          <Toolbar>
            <Tooltip title = "close">
            <IconButton  style = {{backgroundColor : "white"}} color="primary" onClick={me.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            </Tooltip>
            
          </Toolbar>
        </AppBar>

        <MapLocation data = {me.currentLocation} static = {false} renderAddressType = {true} Changehandler = {me.handler} disableTextFields = {false} />




 
</Dialog>








     
    )
}else{
    return(null)
}


}

function renderTabs(me){

return(

<Tabs
        value={me.state.tabvalue}
        onChange={(e,v)=>{
          me.setState({tabvalue : v })
        }}
        aria-label="disabled tabs example"
        
      >
        <Tab label="Details" value = {1} />
        
        <Tab label="Orders" value = {2}  />

        <Tab label="Wallet" value = {3}  />
      </Tabs>

)

}

function renderDecider(me){





switch( me.state.tabvalue){
    case 1 : 
    return(renderDetails(me))
    break;
    case 2 : 
    return(renderOrders(me))
    break;
    case 3 : 
    return(renderWallet(me))
    break;
}

}

function renderDetails(me){

    var temp_cust = JSON.parse(JSON.stringify(me.customer))
    temp_cust.dob = new Date(me.customer.dob).toDateString()

    var headers = [
        {Label : "First Name", id : "firstName"},
        {Label : "Last Name", id : "lastName"},
        {Label : "Email", id : "email"},
        {Label : "Gender", id : "gender"},
        {Label : "DOB", id : "dob"},
        {Label : "Referal Code", id : "referralCode"},
    ]


    return(
        <div class = "viewCust_details_main_div">
            <div class = "viewCust_details_main_div_details">
            <SimpleCard title = "Basic">
                <div>
                    <div class = "customer_img_div" >
                        <img class = "customer_img" src = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
                    </div>

                    <ListView data = {temp_cust}   header = {headers} font = "14px" />

                </div>
            </SimpleCard>
            </div>

            <div class = "viewCust_details_main_div_address">
            <SimpleCard title = "Address List">

                <div class = "viewCust_details_add_Cust_button_div">
                 <Button variant = "contained" color = "primary" onClick = {()=>{
                     me.currentLocation =  {addr1 : "", addr2 : "", city : "", state : "", latitude : undefined, longitude : undefined, addressType : "Work", status : "Active", pincode : "", landmark : ""}
                     
                     
                     me.add_num = -1
                     me.setState({edit_location : true})
                 }}><Icon>add</Icon>Add</Button>
                </div>

                <div class = "viewCust_details_main_div_address_sub">

                    {me.customer.address.map((v, ind)=>{
                        return(


                            <div >
             
                

                  {
                        (() => {
                            
                            switch (v.addressType.substring(0,4)){
                                case "Home":
                                    return (<Button variant = "contained" color = "primary" size = "small" ><Icon style = {{height : "20px"}} >home</Icon>Home</Button>);
                                    break;
                                case "Work":
                                    return (<Button  variant = "contained" color = "primary" size = "small"><Icon style = {{height : "20px"}} >work</Icon>Work</Button>);
                                    break;
                                default:
                            return (<Button  variant = "contained" color = "primary" size = "small"><Icon style = {{height : "20px"}} >add_location</Icon> {v.addressType}</Button>);
                                    break;    
                            }
                                
                            
                        })()
                    }



                 <Typography style = {{fontSize : "12px",  marginTop : "15px" }} >{v.addr1 || ""}</Typography>
                 <Typography style = {{fontSize : "12px"}} >{v.addr2 || ""}</Typography>
                 <Typography style = {{fontSize : "12px"}} >{v.city || ""}</Typography>
                 
             

              <div style = {{textAlign : "-webkit-center", justifyContent : "space-around" , display : "flex" }}>
              <Tooltip title = "Remove">
              <Button variant = "text" color = "primary" onClick = {(e)=>{
                
                me.customer.address.splice( me.customer.address.findIndex(x => x._id === v._id ), 1 )

                savedata(me)
                


              }} >
             Delete
             </Button>
              </Tooltip>
             <Tooltip title = "Edit">
             <Button variant = "text" color = "primary" onClick = {(e)=>{

                 me.currentLocation = v
                 me.add_num = ind
                 me.setState({edit_location : true})

                



              }} >
             Edit
             </Button>
             </Tooltip>
              </div>

            
            
              </div>



                        )
                    })}

                </div>
            </SimpleCard>
            </div>



        </div>
    )
}

function renderOrders(me){

    var orderList = [
        {orderId : "Ipsum Lorem", orderValue : "960", orderDate : "12/12/2020", orderStatus : "Delivered", paymentStatus : "Done", ratings : "3"},
        {orderId : "Ipsum Lorem", orderValue : "960", orderDate : "12/12/2020", orderStatus : "Delivered", paymentStatus : "Done", ratings : "3"},
        {orderId : "Ipsum Lorem", orderValue : "960", orderDate : "12/12/2020", orderStatus : "Delivered", paymentStatus : "Done", ratings : "3"},
        {orderId : "Ipsum Lorem", orderValue : "960", orderDate : "12/12/2020", orderStatus : "Delivered", paymentStatus : "Done", ratings : "3"}
    ]

    var headers = [

    {title : "Order ID", width : "10%", id : "orderId"},
    {title : " Value", width : "10%", id : "orderValue"},
    {title : " Date", width : "10%", id : "orderDate"},
    {title : "Order Status", width : "15%", id : "orderStatus"},
    {title : "Pay Status", width : "15%", id : "paymentStatus"},
    {title : "Ratings", width : "10%", id : "ratings"},

    ]

    return(
        <div>
            <Table headers = {headers} data = {orderList} />
        </div>
    )
}

function renderWallet(me){



    var headers = [
        {title:  "TR Time", sorting : false, filter : false, width : "15%", id : "createdAt" , render : rowData =>{
          return(
            
          <div>{new Date(rowData.createdAt).toUTCString().substring(5, 22)}</div>
    
    
          )
        } },
        // {title:  "Tr Name", sorting : true, filter : true,width : "15%", id : "transactionName" },
        // {title:  "Wallet Type", sorting : true,filter : true, width : "15%", id : "walletType" },
      
        {title:  "Trans Amt.", sorting : true,filter : true, width : "15%", id : "amount" },
        {title:  "Done By", sorting : true,filter : true, width : "15%", id : "createdType" },
        {title:  "Trans Typ.", sorting : true,filter : true, width : "15%", id : "transactionType" },
        {title:  "Current Bal.", sorting : true,filter : true, width : "15%", id : "currentCashWallet" },
      ]

    if(me.state.logsLoaded){

        return(
            <div>
                <Button onClick = {()=>{
                    me.setState({showWalletDialog : true})
                }} >Record Transaction</Button>
                <Table key = {Math.random()} headers = {headers} data = {me.walletLogs} />
    
                {walletDialog(me)}
    
    
            </div>
        )

    }else{

        fetchLogs(me)

        return(
            <Loader/>
        )

    }
}


function walletDialog(me){

return(

<Dialog maxWidth={"md"} fullWidth={true}  open={me.state.showWalletDialog} onClose={()=>{
    me.setState({showWalletDialog : false})
}}>



<AppBar style = {{height : "0"}}>
          <Toolbar>
            <Tooltip title = "close">
            <IconButton  style = {{backgroundColor : "white"}} color="primary" onClick={()=>{
    me.setState({showWalletDialog : false})
}} aria-label="close">
              <CloseIcon />
            </IconButton>
            </Tooltip>
            
          </Toolbar>
        </AppBar>

        <WalletPage customer = {me.customer} />




 
</Dialog>

)

}

function fetchCustomerInfo(me){


    axios.get(Axiosconfig.main + 'customer?id=' + window.location.search.substring(8,window.location.search.length) ,  Axiosconfig.config)
    .then((res) => {

        console.log(res.data.data)
      me.customer = res.data.data
      me.setState({custLoaded : true})
      
    })
    .catch((err) => {

        console.log(err)
    
    })


}

function fetchLogs(me){

 axios.get(Axiosconfig.admin + 'wallet/?customerId=' + me.customer._id ,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      me.walletLogs = res.data.data
   
    
      me.setState({logsLoaded : true})
      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

}

export default App;