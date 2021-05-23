import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Icon, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SimpleCard from '../../APIs/SimpleCard/SimpleCard'
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Axiosconfig from  '../../Axios/axiosconfig'
// import Loader from  '../../Loader/Loader'
// import {  SimpleCard } from "matx";
import theme from './theme'
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
// import InputLabel from '@material-ui/core/InputLabel';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  Calendar 
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// import Select from '@material-ui/core/Select';
const axios = require('axios').default;


class App extends Component {

  basicdata = {}
  currentStat = []
  allstaffs = []
  state = {updatestate : true}
  

    Allroles =  [
        { title: 'Store Boy' },
        { title: 'Delivery Boy' },
        { title: 'Store Owner' },]



  componentWillMount(){

this.basicdata = this.props.databasic


    
  }


    render(){
        return(

            <div>

<div class = "Simplecard_container_staffbasic">
          
          <SimpleCard title = {"Basic Details"} >
          <div style = {{width : "90%", margin : "5%", marginTop : "0%"}}>
  
  
  
  <Grid container spacing={4}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
      <TextField  autoComplete='none' variant="outlined"   defaultValue = {this.props.databasic.staffFirstName} onChange = {(e)=>{
       
        this.props.handler1("staffFirstName", e.target.value)
      }} 
      margin="dense" id="name" label="First Name*"  type="text" fullWidth/>
  
  
      <TextField autoComplete='none'  variant="outlined"    defaultValue = {this.props.databasic.staffLastName} onChange = {(e)=>{
       
       this.props.handler1("staffLastName", e.target.value)
      }}   margin="dense" id="name" label="Last Name*"  type="text" fullWidth/>
  
  <TextField autoComplete='none'  variant="outlined"    defaultValue = {this.props.databasic.staffMobile} onChange = {(e)=>{
        
        this.props.handler1("staffMobile", e.target.value)
      }}   margin="dense" id="name" label="Mobile*" type="number" fullWidth/>
  
  
      <TextField autoComplete='none'  variant="outlined"    defaultValue = {this.props.databasic.staffAlternateMobile} onChange = {(e)=>{
       
       this.props.handler1("staffAlternateMobile", e.target.value)
      }} margin="dense" id="name" label="Alternate"  type="number" fullWidth/>
  
  
      <TextField  autoComplete='none' variant="outlined"    defaultValue = {this.props.databasic.staffEmailId} onChange = {(e)=>{
      
      this.props.handler1("staffEmailId", e.target.value)
      }} margin="dense" id="name" label="Email"  type="text" fullWidth/>

      <div style = {{display : "flex", justifyContent : "space-between" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label = "In-time"
          variant = "inline"
          
          onChange={(e,v)=>{
            this.props.handler1("inTime", new Date(e))
        
          }}
          value = {this.props.databasic.inTime}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
       </MuiPickersUtilsProvider>
   
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label = "Out-time"
          variant = "inline"
          
          
          
          onChange={(e,v)=>{
            this.props.handler1("outTime", new Date(e))
        
          }}
          value = {this.props.databasic.outTime}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
       </MuiPickersUtilsProvider>
      </div>
       
       
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
      
     {renderworkdays(this)}
      
      </Grid>
  
      
    </Grid>
  
  
    
  
  
  </div>
          </SimpleCard>
  
        </div>
              

       

         
            </div>

        )
    }


}

function renderworkdays(me){

  var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]

  return(
<MuiThemeProvider theme = {theme}>
<div class = "workdays_sub_div">
<div class = "workdays_div">
<div class = "basic_dets_labels">Working Days</div>
{weekdays.map((v,ind)=>{
  return(
    <div  class = "workdays_sub_div">
 

    <FormControlLabel
        control={
          <Switch
            checked={me.props.databasic.workdays.includes(v) ? true : false}
            
            onChange={(e)=>{
            
            var currentStat = me.props.databasic.workdays
            currentStat.includes(v) ? currentStat.splice(currentStat.indexOf(v), 1) : currentStat.push(v)
            me.props.handler1("workdays", currentStat)

            }}
            name="checkedB"
            color="primary"
          />
        }
        label={v}
      />
    
    
    
    </div>
  )
})}



</div>

<div class = "roles_div_staffs" >
<div class = "basic_dets_labels">Roles</div>
                {me.Allroles.map((v)=>{
                  return(


<FormControlLabel
        control={
          <Switch
            checked={me.props.databasic.staffEmployeeType.includes(v.title) ? true : false}
            
            onChange={(e)=>{
            
                    var currentStat = me.props.databasic.staffEmployeeType
                    currentStat.includes(v.title) ? currentStat.splice(currentStat.indexOf(v.title), 1) : currentStat.push(v.title)
                    me.props.handler1("staffEmployeeType", currentStat)

            }}
            name="checkedB"
            color="primary"
          />
        }
        label={v.title}
      />


                  // <Button variant = {me.props.databasic.staffEmployeeType.includes(v.title) ? "contained" : ""}
                  //  color = {me.props.databasic.staffEmployeeType.includes(v.title) ? "primary" : ""} onClick = {()=>{
                    
                  
  
                  //   var currentStat = me.props.databasic.staffEmployeeType
                  //   currentStat.includes(v.title) ? currentStat.splice(currentStat.indexOf(v.title), 1) : currentStat.push(v.title)
                  //   me.props.handler1("staffEmployeeType", currentStat)
            
                  // }} >{me.props.databasic.staffEmployeeType.includes(v.title) ? <Icon>check_box</Icon> : <Icon>crop_din</Icon>}{v.title}</Button>
                  )
                })}
            
            
            
                </div>

</div>

            
               
            
          
            
              

</MuiThemeProvider>
  )

}

export default App;