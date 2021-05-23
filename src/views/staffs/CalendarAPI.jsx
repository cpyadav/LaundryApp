import React, { Component } from 'react';

import Slide from '@material-ui/core/Slide';


import { Icon, Button, Fab,  Grid, Card, Paper, DialogContent} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import Create_staff from './CreateStaff'
import Table from '../../APIs/TablesAPI/Table'
import Popover from '@material-ui/core/Popover';
// import Axiosconfig from  '../../Axios/axiosconfig'
// import Loader from  '../../Loader/Loader'

// import MaterialTable from "material-table";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from "@material-ui/core/Menu";

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Basicdetails from './Basicdetails'
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  Calendar 
} from '@material-ui/pickers';




class App extends Component {

    daymap = {
        0 : "Sunday",
        1 : "Monday",
        2 : "Tuesday",
        3 : "Wednesday",
        4 : "Thursday",
        5 : "Friday",
        6 : "Saturday",
      }
  

   
     render() {
       return (
        <div >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper style={{ overflow: "hidden" }}>
            <Calendar
            renderDay = {(a,b,c,d)=>{
  
              if(c){
                return(
                  <div class = "date_calendar" style = {{  backgroundColor : (this.props.workDays.includes(this.daymap[a.getDay()]) ? "green" : null) , color : (this.props.workDays.includes(this.daymap[a.getDay()]) ? "white" : "black") }} >{parseInt(a.toDateString().substring(8,10))} </div>
                  
      
                  )
              }else{
                return(
                  <div class = "date_calendar"></div>
                  
      
                  )
              }
              
            }}
            date = {new Date()} onChange = {()=>{
  
            }} />
          </Paper>
        </MuiPickersUtilsProvider>
        </div>

       )

     }

    }
   

    export default App;