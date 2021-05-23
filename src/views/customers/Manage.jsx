import React, { Component } from 'react';
import './manage.css';

import Loader from  '../../APIs/Loader/Loader'
import Alert from  '../../APIs/Alerts/Alert'
import Axiosconfig from  '../../Axios/AxiosConfig'
import Validation from  '../../APIs/Validation/validation'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import Table from '../../APIs/TablesAPI/Table'

import Slide from '@material-ui/core/Slide';
import ViewCustomer from './view'


import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import Create_Cust from './CreateCust'
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from "@material-ui/core/Menu";
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import theme from './theme';

const axios = require('axios').default;

class App extends Component {


 Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  handleClose = () => {
    this.setState({create_edit_dialog : false, showlogdialog : null})
  };




  state = {customerdata : [], create_edit_dialog : false, anchorEl : null, updateState : false, showlogdialog : null, loadinglogs : false }
  currentdata = null
  showloader1 = false
  showloader2 = false
  datalogs = []
  loadingrow = null




   componentWillMount(){
 
  
  }



  render() {

    console.log(window.location.search)

    return(
      <div>
        {window.location.search.length === 0 ? 


<div >
  
  <div class = "Manage_customer_top_bar">
  {renderTop(this)}
  </div>
            <div >
                <div >
  
                
                  {renderTable(this)}
                  {renderAddDialog(this)}
                  
  
  
                </div>
  
               { this.state.showlogdialog ?  ( logdialog(this)) : (null)}
            </div>
         
        </div>

   : 

    <ViewCustomer/>}
      </div>
    )

    


  }
}

function renderAddDialog(me){
                            
                            if(me.state.create_edit_dialog){
                              return(
                                <Dialog  maxWidth={"lg"} fullWidth={true}  open={me.state.create_edit_dialog} onClose={me.handleClose} TransitionComponent={me.Transition}>
                                    <DialogTitle id="alert-dialog-title">{"Add/Edit Customer Details"}</DialogTitle>
              <AppBar style = {{height : "0"}}>
          <Toolbar>
            <IconButton  style = {{backgroundColor : "white"}} color="primary" onClick={me.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            
          </Toolbar>
        </AppBar>
              <Create_Cust data = {me.currentdata}/>
              </Dialog>

                              )
                            }
                                
                            
                    

}


function smallloader(me){
  return(
    <div style = {{alignSelf : "center", width : "50px"}}><div class = "loader_div_cust">
                     <div class="loader_cust"></div>
                         </div></div>
  )
}

 function logdialog(me){

  


  var headers = [
    {title:  "TR Time", sorting : true, datatype : "date",  filter : true,  width : "15%", id : "createdAt" , render : rowData =>{
      return(
        
      <div>{new Date(rowData.createdAt).toUTCString().substring(5, 22)}</div>


      )
    } },
    {title:  "Tr Name", sorting : true, filter : true ,width : "15%", id : "transactionName" },
    {title:  "Wallet Type", sorting : true,filter : true, width : "15%", id : "walletType" },
  
    {title:  "Trans Amt.", sorting : true,filter : true, width : "15%", id : "amount" },
    {title:  "Done By", sorting : true,filter : true, width : "15%", id : "createdType" },
    {title:  "Trans Typ.", sorting : true,filter : true, width : "15%", id : "transactionType" },
    {title:  "Current Bal.", sorting : true,filter : true, width : "15%", id : "currentCashWallet" },
  ]





  return(

    <Dialog  maxWidth={"lg"} fullWidth={true}  open={me.state.showlogdialog} onClose={me.handleClose} TransitionComponent={me.Transition}>
    <AppBar style = {{height : "0"}}>
<Toolbar>
  <IconButton  style = {{backgroundColor : "white"}} color="primary" onClick={me.handleClose} aria-label="close">
    <CloseIcon />
  </IconButton>
  
</Toolbar>
</AppBar>
    <Table  key = {Math.random()} headers = {headers} data = {me.datalogs} label = "Wallet Transactions"  />
    </Dialog>



  )

}





function renderTable(me){


  var headers = []
  
  me.props.parent === "order" ? (
  
  
       headers = [
  
        {title : "Select", filter : false, sorting : false, width : "15%", id : "edit",
      render : rowData =>{
        return(
          <Button onClick = {()=>{
  
            me.props.selecthandler(rowData)
  
          }} variant = "contained" color = "primary"> &#10003; </Button>
  
  
        )
      }
      },
      {title:  "Name", sorting : true, width : "15%", id : "firstName" },
      {title:  "Mobile", sorting : true, width : "15%", id : "mobileNumber" },
      {title:  "Gender", sorting : true, width : "15%", id : "gender" },
  
      
    
  
    ]
  
  
  ) : (
  
         headers = [
            {title:  "Name", sorting : true, width : "10%", id : "firstName", render : rowData=>{return(
              
              <Button variant = "contained" href = {"/customers?custId=" + rowData._id} >{rowData.firstName }</Button>
            )} },
            {title:  "Mobile", sorting : true, width : "10%", id : "mobileNumber" },
            {title:  "Email", sorting : true, width : "15%", id : "Email", render : rowData=>{return(
              <div>pkp3836@gmail.com</div>
            )} },
        
            {title:  "LTV", sorting : true, width : "10%", id : "LTV", render : rowData=>{return(
              <div>14000</div>
            )} },
           
            {title:  "Wallet", sorting : true, width : "10%", id : "cashWallet" 
            
            
          
          
          },
        
            {title : "Actions", filter : false, sorting : false, width : "15%", id : "edit",
            render : rowData =>{
              return(
                <div>
        
        
        <Tooltip TransitionComponent={Zoom} title = {"Request Pikup"}>
        <Button   onClick = {(e)=>{
               
                }}  > <Icon>directions</Icon>Pikup</Button>
          </Tooltip>
        
        
        
          <Tooltip TransitionComponent={Zoom} title = {"Create Order"}>
          <Button  href = {"/order/create?customerid=" + rowData._id} >
            <Icon>notes</Icon>
            Order
            </Button>
        </Tooltip>
                  
                
                </div>
        
        
        
              )
            }
            }
          
        
          ]
  
  )
  
    return(
      <Table key = {Math.random()} headers = {headers} data = {me.state.customerdata} label = "Customers"/>
    
  
  
    )
  
      
    
  }



function renderTop(me){

  return(


    <MuiThemeProvider theme = {theme}>   
    
    <div class = "manage_cust_top_details">
    <div>
   <div class = "qrydiv">
    <TextField autoComplete='none'  inputProps = {{id : "customername"}} variant="outlined" onChange = {  (e)=>{
    document.getElementById("customermob").value =  "" 
    if(e.target.value.length > 3){
      me.showloader1 = true
      me.setState({updateState : true})
      
       axios.get(Axiosconfig.main + 'customer/?name=' + e.target.value ,  Axiosconfig.config)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            me.showloader1 = false
            me.setState({customerdata : res.data.data})
            
            
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })

    }

  }}  autoFocus margin="dense" id="name" label="Name..." type="text" />

{/* Loader decision */}

     {(() => { if(me.showloader1){
             return( smallloader(me))
            }else{return(<div style = {{alignSelf : "center", width : "50px"}} ></div>) }})()} 
  

  <TextField autoComplete='none'  variant="outlined" inputProps = {{id : "customermob"}}  onChange = { async (e)=>{
document.getElementById("customername").value =  "" 
                          if(e.target.value.length > 3){
                            me.showloader2 = true
                            me.setState({updateState : true})

                            await axios.get(Axiosconfig.main + 'customer/?mobile=' + e.target.value ,  Axiosconfig.config)
                                .then((res) => {
                                  console.log("RESPONSE RECEIVED: ", res);
                                  me.showloader2 = false
                                  me.setState({customerdata : res.data.data})
                                  
                                })
                                .catch((err) => {
                                  console.log("AXIOS ERROR: ", err);
                                })

                          }

}}   autoFocus margin="dense" id="name" label="Mobile..." type="text" />

{/* Loader decision */}

{(() => { if(me.showloader2){
             return( smallloader(me))
            }else{return(<div style = {{alignSelf : "center", width : "50px"}} ></div>) }})()}
    </div>

  </div>





<div style = {{ display : "flex", flexDirection : "row", justifyContent : "space-between" }}>


<Tooltip TransitionComponent={Zoom} title = {"Add Customer"}>
<Button color="primary" variant = "contained" aria-label="Add" onClick = {() =>{ 
me.currentdata = null 
me.setState({create_edit_dialog : true}) }} ><Icon>add</Icon>Add</Button>
</Tooltip>


</div>

        </div>
    
    
    </MuiThemeProvider>




  )


}


export default App;