import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';
import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
// import {  SimpleCard } from "matx";
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
// import Loader from  '../../../Loader/Loader'
import ManageCustomer from '../../customers/Manage'
// import Axiosconfig from  '../../../Axios/axiosconfig'

import Loader from  '../../../APIs/Loader/Loader'
import Alert from  '../../../APIs/Alerts/Alert'
import URLe from  '../../../APIs/URLExtract/URLE'

import Validation from  '../../../APIs/Validation/validation'
import SimpleCard from '../../../APIs/SimpleCard/SimpleCard'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Arrowright from '@material-ui/icons/ArrowRightAlt';
// import theme1 from './theme1'
import InputAdornment from '@material-ui/core/InputAdornment';
// import theme2 from './theme2'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import CouponApplic from './couponAppli';
import './create.css'
import Axiosconfig from  '../../../Axios/AxiosConfig'
import BasicDetails from './BasicDetails'
import MainOrder from './MainOrder'
import Finalise from './Finalise'
const axios = require('axios').default;

class App extends React.Component {


  state = {view : 1}

  shandler = (nv)=>{
    
    this.setState({view : nv})
  }

  async componentWillMount(){

    
   


  }

render(){
    return(
        <div className="m-sm-30">

          {viewdecider(this)}



        </div>
    )
}

}


function viewdecider(me){


    switch(me.state.view){
      case 1 : 
      return(<BasicDetails stepHandler = {me.shandler} />)
      break;
      case 2 : 
      return(<MainOrder stepHandler = {me.shandler}/>)
      break;
      case 3 : 
      return(<Finalise stepHandler = {me.shandler}/>)
      break;
    }


}


 

 export default App;