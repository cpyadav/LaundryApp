import React, { Component } from 'react';

import { Icon, Button, Fab,  Grid, Card, Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"



import './Manageratecards/ratecard_manage.css'
import theme from './Manageratecards/theme'
import Axiosconfig from  '../../../Axios/AxiosConfig'
import Loader from  '../../../APIs/Loader/Loader'
import SimpleCard from '../../../APIs/SimpleCard/SimpleCard'
const axios = require('axios').default;



class App extends Component {

state = {ratecardlist : [], onlineqry : "", offlineqry : "", dataloaded : false }

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
    
  await axios.get( Axiosconfig.main + 'ratecard' + qryparam , Axiosconfig.config)
  .then((res) => {
    console.log("RESPONSE RECEIVED:1 ", res);
    var alpha = []

    res.data.data.map((v,index)=>{

      alpha.push({id : v._id, Name : v.rateCardName, category : v.storeId})

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
      me.state.dataloaded ? (
        <MuiThemeProvider theme = {theme}>
              <div class = "manage_ratecards_main_div">

<div class = "manage_ratecards_type">
<SimpleCard title = "Online rate Card">
  <div class = "inner_titles">
  <TextField onChange = {(e)=>{
    me.setState({onlineqry : e.target.value})
  }} placeholder = "Search Rate cards"></TextField>
  {renderOnline(me)}
  
  </div>

 

</SimpleCard>


</div>

<div class = "manage_ratecards_type">
<SimpleCard title = "Offline rate Card">
  <div class = "inner_titles">
  <TextField onChange = {(e)=>{
    me.setState({offlineqry : e.target.value})
  }}placeholder = "Search Rate cards"></TextField>
  {renderOffline(me)}
 
  </div>

 

</SimpleCard>


</div>




</div>
      </MuiThemeProvider>
      ) : (<Loader/>)

    )
  }


  function renderOnline(me ){
    return(
      <div class = "company_main_div">
        <label class = "label_class">Company Rate Cards</label>
        {me.state.ratecardlist.map((v,ind)=>{
      
            if(v.Name.toUpperCase().includes(me.state.onlineqry.toUpperCase())){
              return(
                <div class = "indi_ratecard_stores">
              <Button variant = "contained" color = {v.id === me.props.data.ratecardOnline ? "primary" : ""} onClick = {()=>{
                me.props.handler4( me.props.data.ratecardOffline,  v.id)
              }} ><Icon>list</Icon>{v.Name}</Button>
              </div>
              )
           
            }
        })}


        

      </div>

    )
  }

  function renderOffline(me ){
    return(
      <div class = "company_main_div">
        <label class = "label_class">Company Rate Cards</label>
        {me.state.ratecardlist.map((v,ind)=>{
       if(v.Name.toUpperCase().includes(me.state.offlineqry.toUpperCase())){
            return(
            <div class = "indi_ratecard_stores">
              <Button variant = "contained" color = {me.props.data.ratecardOffline.includes(v.id) ? "primary" : ""} onClick = {()=>{
              var offline_temp = me.props.data.ratecardOffline
              offline_temp.includes(v.id) ? offline_temp.splice(offline_temp.indexOf(v.id), 1) : offline_temp.push(v.id)
              
              me.props.handler4( offline_temp, me.props.data.ratecardOnline)
            }} ><Icon>list</Icon>{v.Name}</Button>
            </div>
            )

          }
         
        })}


        

      </div>

    )
  }

 



  

export default App;