import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '../../APIs/TablesAPI/Table'
import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";
// import Tooltip from '@material-ui/core/Tooltip';
// import Zoom from '@material-ui/core/Zoom';
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
// import theme from './theme'
import Alert from  '../../APIs/Alerts/Alert'
import SimpleCard from  '../../APIs/SimpleCard/SimpleCard'
import InputAdornment from '@material-ui/core/InputAdornment';
import Axiosconfig from  '../../Axios/AxiosConfig'
import Loader from  '../../APIs/Loader/Loader'
import InputLabel from '@material-ui/core/InputLabel';
import ManageCustomer from '../customers/Manage'
import MenuItem from '@material-ui/core/MenuItem';
// import Menu from "@material-ui/core/Menu";
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
import './manage.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

const axios = require('axios').default;

class App extends Component {


  state = {showselectcustomer : false }

  alertobj = null


 Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  handleClose = ()=>{
    this.setState({showselectcustomer : false, showlogdialog : false})
  }

  selected = (custdata)=>{
    console.log(custdata)
    this.customer = custdata
    this.handleClose()
    this.selectedaddress = null
    
  }

  customer = null
  datalogs = []
  addWalletType = "wallet"
  allplans = []
  paymentTransaction = "cash"

  amttrans = 0
  amtcred = 0
  memberplan = null
  paymentReferenceId = ""
  walletDescription = ""


   async componentWillMount(){

    getplans(this)
    this.customer = this.props.customer === undefined ? (null) : (this.props.customer)

  
  }



  render() {


    return (
      <div className="m-sm-30">



{rendertop(this)}

{ this.customer !== null ?  rendermid(this) : (null)}

{ this.customer != null ?  renderend(this) : (null)}

{renderselectcustomer(this)} 

{ this.state.showlogdialog ?  ( logdialog(this)) : (null)}

{showalert(this)}


      </div>
     
     
    );
  }
}

function rendertop(me){
  
const totalcont = []

totalcont.push(
  <SimpleCard title = "Customer Wallet">
    <div class = "wallet_top_bar_main_div">
    <Button disabled = {me.props.customer !== undefined} variant = "contained" color = "primary" onClick = {()=>{
    me.setState({showselectcustomer : true})
  }} >{me.customer === null ? ("Select Customer") :  me.customer.firstName}</Button>

{me.customer === null ? (null) : (<Button onClick = {async ()=>{
  me.setState({loadinglogs : true})

  var datalogs = []
         await axios.get(Axiosconfig.admin + 'wallet/?customerId=' + me.customer._id ,  Axiosconfig.config)
         .then((res) => {
           console.log("RESPONSE RECEIVED: ", res);
           me.datalogs = res.data.data
           me.loadingrow = null
         
           me.setState({showlogdialog : true, loadinglogs : false})
           
         })
         .catch((err) => {
           console.log("AXIOS ERROR: ", err);
         })





}}  variant = "contained" color = "secondary"  >{  me.state.loadinglogs ? ("Loading logs...") :   ("Wallet Balance : " + me.customer.cashWallet)}</Button>)}

  </div>
  </SimpleCard>
)

return totalcont

}


function rendermid(me){

return(

 <div class = "wallet_mid_bar_main_div">
    <SimpleCard>

<div class = "wallet_mid_bar_sub_div">

<FormControl component="fieldset">
      {/* <FormLabel component="legend">Type</FormLabel> */}
      <RadioGroup row aria-label="gender" name="gender1" value={me.addWalletType} onChange = {(e)=>{
        me.addWalletType = e.target.value
        me.amttrans = 0
        me.amtcred = 0
        me.memberplan = null
        me.setState({updatestate : true})
      }} >
        <FormControlLabel value="wallet" control={<Radio />} label="Add Money" />
        {me.allplans.length > 0 ? (<FormControlLabel value="membership" control={<Radio />} label="Add Membership" />) : (null)}
        {/* <FormControlLabel value="membership" control={<Radio />} label="Add Membership" /> */}
      </RadioGroup>
    </FormControl>

    {me.addWalletType === "wallet" ? (

      <TextField onChange = {(e)=>{
        me.amttrans = e.target.value
        me.amtcred = e.target.value
        me.setState({updatestate : true})
      }} variant = "outlined" value = {me.amttrans} label = "Amount" type = "number"  InputProps={{
        startAdornment: (
          <InputAdornment position="start">Rs.</InputAdornment>
        ),
      }} />

    )  : (

      <Autocomplete id="combo-box-demo" options={me.allplans } getOptionLabel={(option) => option.planName} style={{ width: "30%" }} 
          
      getOptionDisabled = {(option)=> (new Date(option.planEndDate) < new Date()) || option.status === "Inactive" }
      renderOption = {(option)=>{
        return(
        <div>{option.planName + " : Pay Amt. : " + option.planAmount  + " : Cred Amt. : " + option.planCreditAmount}</div>
        )
      }}
      
      onChange = {(e,v)=>{

       if(v === null){
        me.memberplan = null
        me.amttrans = 0
        me.amtcred = 0
        me.setState({updatestate : true})
       }else{
        me.memberplan = v
        me.amttrans = v.planAmount
        me.amtcred = v.planCreditAmount
        me.setState({updatestate : true})
       }
        
      }}
      value = {me.memberplan}
      renderInput={(params) => <TextField {...params} label="Select Membership" variant="outlined" />  }
        /> 

    )} 



</div>


  </SimpleCard>
 </div>

)

}

function showalert(me){

  if(me.alertobj !== null){
    var alertObjClone = me.alertobj
    me.alertobj = null

    return(
      <Alert key = {Math.random()} alertObj = {alertObjClone} ></Alert>
    )
  }else{
    return null
  }
}

function renderend(me){

  return(
  
  
<div style = {{ marginTop : "10px" }}>
{/* <MuiThemeProvider theme = {theme}> */}
  <SimpleCard title = "Transaction">
  <div class = "wallet_ebd_bar_main_div">
  <div class = "wallet_end_bar_sub_div">
<FormControl variant="outlined" >
  <InputLabel id="demo-simple-select-outlined-label">  Mode</InputLabel>
  <Select
    labelId="demo-simple-select-outlined-label"
    id="demo-simple-select-outlined"
    value = {me.paymentTransaction}
    onChange={(e)=>{
      me.paymentTransaction = e.target.value
      me.setState({updatestate : true})
    }}
    label="Mode"
  >
        <MenuItem value="paytm">Paytm</MenuItem>
        <MenuItem value="upi">UPI</MenuItem>
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="card">Card</MenuItem>
  </Select>
</FormControl>

<TextField variant = "outlined" label = "Reference Id" value = {me.paymentReferenceId}  onChange = {(e)=>{

me.paymentReferenceId = e.target.value
me.setState({updatestate : true})

}} />

{/* <FormControl variant="outlined" >
  <InputLabel id="demo-simple-select-outlined-label">  Collected By</InputLabel>
  <Select
    labelId="demo-simple-select-outlined-label"
    id="demo-simple-select-outlined"
    value = {me.transmode}
    onChange={(e)=>{
      me.transmode = e.target.value
      me.setState({updatestate : true})
    }}
    label="Collected By"
  >
        <MenuItem value="paytm">Paytm</MenuItem>
        <MenuItem value="upi">UPI</MenuItem>
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="cardswipe">Card</MenuItem>
  </Select>
</FormControl> */}

<TextField variant = "outlined" label = "Remark" value = {me.walletDescription}  onChange = {(e)=>{

me.walletDescription = e.target.value
me.setState({updatestate : true})

}}  />




</div>

<div class = "wallet_end_bar_sub_div">
  <div class = "amount_div">
  <Button variant="contained" color = "secondary" >{"Amount Transfer : Rs. " + me.amttrans }</Button>
  <Button variant="contained" color = "secondary" >{"Amount Credit : Rs. " + me.amtcred }</Button>
  </div>

  <Button variant = "contained" color = "primary" onClick = {async ()=>{

    // Validation function  

var datatopush = validatedata(me)

if(datatopush !== false){

  await axios.put( Axiosconfig.admin + 'wallet?customerId=' + me.customer._id , datatopush ,  Axiosconfig.config)
.then((res) => {
    console.log("Membership Plans", res)
    
    me.alertobj = {type : "success", msg : "Successfully added to Wallet", show : true }
    fetchcustinfo(me)
    
    me.walletDescription = ""
    me.addWalletType = "wallet"
    me.paymentReferenceId = ""
    me.amttrans = 0
    me.amtcred = 0
    me.paymentTransaction = "cash"

    me.setState({updatestate : true})
    if(me.props.customer !== undefined){

      window.location.href = window.location.href

    }
   

})
.catch((err) => {
  console.log("AXIOS ERROR: ", err);
})


}





  }} >Submit</Button>
</div>


</div>
</SimpleCard>
  {/* </MuiThemeProvider> */}
</div>
  
  
  )
  
  }


  async function fetchcustinfo(me){

 await axios.get(Axiosconfig.main + 'customer?id=' + me.customer._id ,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res.data.data);
      me.customer = res.data.data
      me.setState({updatestate : true})


      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

  }


function validatedata(me){

if(me.addWalletType === "membership" & me.memberplan === null){

      me.alertobj = {type : "error", msg : "Please Select the Plan", show : true }
      me.setState({updatestate : true})
      return false


}else if(me.addWalletType === "wallet" & me.amttrans <= 0){

  me.alertobj = {type : "error", msg : "Enter Amount more than 0", show : true }
  me.setState({updatestate : true})
  return false



}else if(me.paymentTransaction !== "cash" & (me.paymentReferenceId === undefined || me.paymentReferenceId === ""  || me.paymentReferenceId === null)){

  me.alertobj = {type : "error", msg : "Please provide reference Id", show : true }
  me.setState({updatestate : true})
  return false



}else{
  var walletpushdata = {}
  walletpushdata.walletDescription = me.walletDescription
  walletpushdata.addWalletType = me.addWalletType
  walletpushdata.paymentTransaction = me.paymentTransaction
  walletpushdata.paymentReferenceId = me.paymentReferenceId
  
  if(me.addWalletType === "wallet"){
  
    walletpushdata.amount = parseInt(me.amttrans)
  
  }else{
  
    walletpushdata.membershipId = me.memberplan._id
  
  }
  
  console.log(walletpushdata)
  return walletpushdata
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

function smallloader(me){
  return(
    <div style = {{alignSelf : "center", width : "50px"}}><div class = "loader_div_cust">
                     <div class="loader_cust"></div>
                         </div></div>
  )
}

function logdialog(me){

  


  var headers = [
    {title:  "TR Time", sorting : true, filter : true, width : "15%", id : "createdAt" , render : rowData =>{
      return(
        
      <div>{new Date(rowData.createdAt).toUTCString().substring(5, 22)}</div>


      )
    } },
    {title:  "Tr Name", sorting : true, filter : true,width : "15%", id : "transactionName" },
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

async function getplans(me){

  await axios.get( Axiosconfig.admin + 'membership', Axiosconfig.config)
  .then((res) => {
      console.log("Membership Plans", res)
      me.allplans = res.data.data
      me.setState({dataloaded : true})
     
 
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })

}





export default App;