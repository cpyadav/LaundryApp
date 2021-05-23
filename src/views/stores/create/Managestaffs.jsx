import React, { Component } from 'react';

import { Icon, Button, Fab,  Grid, Card, Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import './Manageratecards/ratecard_manage.css'
import theme from './Manageratecards/theme'
import Axiosconfig from  '../../../Axios/AxiosConfig'
import Loader from  '../../../APIs/Loader/Loader'
import SimpleCard from '../../../APIs/SimpleCard/SimpleCard'
const axios = require('axios').default;



class App extends Component {

state = {ratecardlist : [], SOqry : "", DBqry : "", SBqry : "",dataloaded : false }

    async componentWillMount(){

      this.setState({dataloaded : false})
      loadcats(this)
    
        
      }



  render() {


      return(
        view1(this)
      )
    
        
  
  }}


  async function loadcats(me){

  var qryparam = "?companyId=" + "5f636b4d8dbb2429c05ecf42" + "&" + "storeId=" + me.props.data._id
    
  await axios.get( Axiosconfig.main + 'staff'  , Axiosconfig.config)
  .then((res) => {
    console.log("RESPONSE RECEIVED:1 ", res);
    var alpha = []

    res.data.data.map((v,index)=>{

      alpha.push({id : v._id, Name : v.staffFirstName, Type : v.staffEmployeeType})

    })


    me.setState({ratecardlist : alpha})
    me.setState({dataloaded : true})



    
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })


  
  }


  function view1(me){

 return(
  me.state.dataloaded ? (  <MuiThemeProvider theme = {theme}>
    <div class = "manage_ratecards_main_div">

<div class = "manage_staff_type">
<SimpleCard title = "Store Owner">
<div class = "inner_titles">
<TextField onChange = {(e)=>{
me.setState({SOqry : e.target.value})
}} placeholder = "Search Staffs"></TextField>
{renderSO(me)}

</div>



</SimpleCard>


</div>

<div class = "manage_staff_type">
<SimpleCard title = "Store Staff">
<div class = "inner_titles">
<TextField onChange = {(e)=>{
me.setState({SBqry : e.target.value})
}}placeholder = "Search Staffs"></TextField>
{renderSB(me)}

</div>



</SimpleCard>


</div>


<div class = "manage_staff_type">
<SimpleCard title = "Delivery Boy">
<div class = "inner_titles">
<TextField onChange = {(e)=>{
me.setState({DBqry : e.target.value})
}}placeholder = "Search Staffs"></TextField>
{renderDB(me)}

</div>



</SimpleCard>


</div>






</div>
</MuiThemeProvider>) : (<Loader/>)
 )

   
  }


  function renderSO(me){
    return(
      <div class = "company_main_div">
        <label class = "label_class">Company Staffs</label>
        {me.state.ratecardlist.map((v,ind)=>{
      
            if(v.Name.toUpperCase().includes(me.state.SOqry.toUpperCase())  & v.Type.includes("Store Owner")  ){
              return(
                <div class = "indi_ratecard_stores">
              <Button variant = "contained" color = {v.id === me.props.data.storeOwners ? "primary" : ""} onClick = {()=>{
                me.props.handler5( v.id, me.props.data.storeStaffBoys,  me.props.data.storeDeliveryBoys)
              }} ><Icon>list</Icon>{v.Name}</Button>
              </div>
              )
           
            }
        })}


        

      </div>

    )
  }

  function renderSB(me ){
    return(
      <div class = "company_main_div">
        <label class = "label_class">Company Staffs</label>
        {me.state.ratecardlist.map((v,ind)=>{
       if(v.Name.toUpperCase().includes(me.state.SBqry.toUpperCase())  & v.Type.includes("Store Boy")  ){
            return(
            <div class = "indi_ratecard_stores">
              <Button variant = "contained" color = {me.props.data.storeStaffBoys.includes(v.id) ? "primary" : ""} onClick = {()=>{
              var offline_temp = me.props.data.storeStaffBoys
              offline_temp.includes(v.id) ? offline_temp.splice(offline_temp.indexOf(v.id), 1) : offline_temp.push(v.id)
              
              me.props.handler5(me.props.data.storeOwners, offline_temp,   me.props.data.storeDeliveryBoys)

            }} ><Icon>list</Icon>{v.Name}</Button>
            </div>
            )

          }
         
        })}


        

      </div>

    )
  }

  function renderDB(me ){
    return(
      <div class = "company_main_div">
        <label class = "label_class">Company Staffs</label>
        {me.state.ratecardlist.map((v,ind)=>{
       if(v.Name.toUpperCase().includes(me.state.DBqry.toUpperCase()) & v.Type.includes("Delivery Boy") ){
            return(
            <div class = "indi_ratecard_stores">
              <Button variant = "contained" color = {me.props.data.storeDeliveryBoys.findIndex(x => x.staffId === v.id) > -1 ? "primary" : ""} onClick = {()=>{
              var offline_temp = me.props.data.storeDeliveryBoys

              offline_temp.findIndex(x => x.staffId === v.id) > -1 ? offline_temp.splice( offline_temp.findIndex(x => x.staffId === v.id) , 1) : offline_temp.push({staffId : v.id, autoAssign : true})

              // offline_temp.includes(v.id) ? offline_temp.splice(offline_temp.indexOf(v.id), 1) : offline_temp.push(v.id)
              
              me.props.handler5(me.props.data.storeOwners,me.props.data.storeStaffBoys, offline_temp )
              
            }} ><Icon>list</Icon>{v.Name}</Button>
            {me.props.data.storeDeliveryBoys.findIndex(x => x.staffId === v.id) > -1 ? (
              <div>
                <FormControlLabel
        control={
          <Switch
            checked={me.props.data.storeDeliveryBoys[me.props.data.storeDeliveryBoys.findIndex(x=> x.staffId === v.id)].autoAssign}
            onChange={(e)=>{
              var offline_temp = me.props.data.storeDeliveryBoys
              offline_temp[offline_temp.findIndex(x=> x.staffId === v.id)].autoAssign = e.target.checked
              me.props.handler5(me.props.data.storeOwners,me.props.data.storeStaffBoys, offline_temp )

     
            }}
            name="checkedB"
            color="primary"
          />
        }
        label={"Auto Assign"}
      />
              </div>
            ) : (null)}
            </div>
            )

          }
         
        })}


        

      </div>

    )
  }

 



  

export default App;