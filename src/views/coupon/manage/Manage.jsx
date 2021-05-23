import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";
// import Tooltip from '@material-ui/core/Tooltip';
// import Axiosconfig from  '../../../Axios/AxiosConfig'
import Table from  '../../../APIs/TablesAPI/Table'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider,  KeyboardTimePicker, KeyboardDatePicker, Calendar } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Collapse from '@material-ui/core/Collapse';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Axiosconfig from  '../../../Axios/AxiosConfig'
import './manage.css'



const axios = require('axios').default;

class App extends Component {

    coupondata = []



componentWillMount(){
   
    fetchCoupons(this)
}

    render(){
        return(
            <div>
                {renderTable(this)}
            </div>
        )
    }

}

function fetchCoupons(me){
    var temp = {}
    axios.get(Axiosconfig.main + 'coupon' ,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res.data.data);
        
    //   res.data.data.map(v=>{
        
    //     temp = JSON.parse(JSON.stringify(v.couponMeta))
    //     temp.couponName = v.couponName
    //     temp.status = v.status
    //     temp.couponImg = temp.couponImg.imgurl
    //     temp.id = v._id
    //     me.coupondata.push(temp)
    //   })
      me.coupondata = res.data.data  
      me.setState({updatestate : true})
      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}

function renderTable(me){


    const headers = [
        {title:  "Name", filter : true, sorting : true, width : "15%", id : "couponName" },
        {title:  "Description", filter : true, sorting : false, width : "15%", id : 2, render : rowData=>{
            return(
            <div>{rowData.couponMeta.couponDes}</div>
            )
        } },
        {title:  "Image", filter : false, sorting : false, width : "15%", id : 3, render : rowData=>{
            return(
                <img class = "manage_coupon_img" src = {rowData.couponMeta.couponImg.imgUrl}  />
            )
        } },
        {title:  "Image",filter : false, sorting : false, width : "15%", id : 4, render : rowData=>{
            return(
                <Button href = {"/Coupon/create?id=" + rowData._id} > <Icon>create</Icon> </Button>
            )
        } },
    ]
    
    
    return(

        <Table key = {Math.random()} headers = {headers} data = {me.coupondata} label = "Coupon Data"/>


    )


}

export default App;
