import React, { Component } from 'react';

import Slide from '@material-ui/core/Slide';

import './App.css';
import { Icon, Button, Fab,  Grid, Card, Paper, DialogContent} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import Create_staff from './CreateStaff'
import Table from '../../APIs/TablesAPI/Table'
// import Popover from '@material-ui/core/Popover';
import Loader from  '../../APIs/Loader/Loader'
import Alert from  '../../APIs/Alerts/Alert'
import Axiosconfig from  '../../Axios/AxiosConfig'
import Validation from  '../../APIs/Validation/validation'

// import MaterialTable from "material-table";
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from "@material-ui/core/Menu";

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import CalendarAPI from './CalendarAPI'
// import Basicdetails from './Basicdetails'
// import DateFnsUtils from '@date-io/date-fns';

// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
//   Calendar 
// } from '@material-ui/pickers';


const axios = require('axios').default;

class App extends Component {


  

 Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  handleClose = () => {
    this.setState({create_edit_dialog : false })
    this.currentdata = {
    
    staffStatus:"Active",
    staffFirstName:"",
    staffLastName:"",
    staffEmailId:"",
    staffMobile:"",
    staffAlternateMobile:"",
    encryptPassword:"", 
    staffProof: [],
    staffEmployeeType:[]
    
    }
    
  
  };

  






  state = {staffdata : [], create_edit_dialog : false, anchorEl : null, loadingdata : false, showavail_dialog : false }

  currentdata = {
    
    "staffFirstName": "Pawan",
    "staffLastName": "Pandey",
    "staffEmailId": "pkp3836@gmail.com",
    "staffMobile": "8989063238",
    "staffAlternateMobile": "",
    "staffPassword": "123545",
    "staffProof": [],
    "staffBankDetails": null,
    "staffEmployeeType": ["Delivery boy", "Store boy", "Store owner"],
    "staffStatus": "Active"

}

workDays = []

  async componentWillMount(){
    this.setState({loadingdata : true})
    var count = 0
    await axios.get( Axiosconfig.main + 'staff', Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res);
      this.setState({staffdata : res.data.data})
      this.setState({loadingdata : false})

      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }



  render() {
    return (
      <div  className="m-sm-30">



<div style = {{ marginBottom : "-30px", display : "flex", flexDirection : "row-reverse", justifyContent : "space-between" }}>
             
              <Tooltip TransitionComponent={Zoom} title = {"Add Store"}>
              <Button color="primary" aria-label="Add" href = "/staffs/create" variant = "contained" color = "primary" ><Icon>add_circle</Icon>Add Staff</Button>
</Tooltip>
  </div>
      <div className="container" style={{height: "100%" ,marginTop : "0%"}}>
              <div style = {{textAlign : "-webkit-right"}}>





{this.state.loadingdata ? (<Loader/>) : (
  <Card >
  {renderTable(this)}
  </Card>
  
  )}


      <Dialog maxWidth={"lg"} fullWidth={true}    open={this.state.create_edit_dialog} onClose={this.handleClose} TransitionComponent={this.Transition}>
      <AppBar style = {{height : "0"}}>
          <Toolbar>
            <IconButton style = {{backgroundColor : "white"}} color="primary" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              
            </Typography>
          </Toolbar>
        </AppBar>
        
       <div style = {{marginTop : "0px"}}>
       <Create_staff databasic = {this.currentdata}/>
       </div>
      </Dialog>

</div>

    
      </div>
  

          {renderavail_dialog(this)}
      
      </div>
     
     
    );
  }
}

function renderavail_dialog(me){
  if(me.state.showavail_dialog){

    return(

      <Dialog open = {me.state.showavail_dialog} onClose = {()=>{
        me.setState({showavail_dialog : false})
      }} >
        <DialogContent>
          <CalendarAPI workDays = {me.workDays} />
        </DialogContent>
      </Dialog>
  
    )

  }else{
    return(

      null
  
    )
  }
}

function renderTable(me){

  var lookup_stat = {
    "Active" : "Active",
    "Inactive" : "Inactive"
  }

  const headers = [
    {title:  "First Name", filter : true,  sorting : true, width : "15%", id : "staffFirstName"},
    {title:  "Last Name", filter : true,  sorting : true, width : "15%", id : "staffLastName"},
    {title:  "Mobile", filter : true,  sorting : false, width : "10%", id : "staffMobile"},
    {title:  "Status", filter : true,  sorting : false, width : "10%", id : "staffStatus", lookup : lookup_stat},
    
    {title:  "More..", width : "20%", id : "action" ,
  
    render : rowData =>{
  return(
    <div class = "staff_action_div">
      <Button href = {"/staffs/update?id=" + rowData._id} ><Icon>create</Icon>Edit</Button>
      <Button onClick = {()=>{
        me.workDays = rowData.workdays
        me.setState({showavail_dialog : true})
      }}>
      <Icon>date_range</Icon>
      </Button>
    </div>
  )},

    },

   
  
  ]


      return(
        <Table key = {Math.random()}  headers = {headers} data = {me.state.staffdata} label = "Staffs" ></Table>
      )
  
     
  
}


export default App;