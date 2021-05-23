import React, { Component } from "react";
import { Icon, Button, Fab,  Grid, Collapse, TextField } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SimpleCard from '../../../APIs/SimpleCard/SimpleCard'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from  '../../../APIs/Alerts/Alert'
import Loader from  '../../../APIs/Loader/Loader'
import Switch from '@material-ui/core/Switch';
import Axiosconfig from  '../../../Axios/AxiosConfig'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import { MuiPickersUtilsProvider,  KeyboardTimePicker, KeyboardDatePicker, Calendar } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DND from '../../../APIs/DND/DND';
import './time.css'
const axios = require('axios').default;


class App extends Component{

    state = { updatestate : true, showAddDialog : false, savingOrder : false, loaded : false}
    viewnum = 1
    alertObj = null
    master_slots = []

    items = []

    temp = {
        from : new Date(),
        to : new Date()
    }
    


    changeHandler = (items_new)=>{

        this.setState({savingOrder : true})

        this.items = items_new

        console.log(items_new)

        var alpha = []

        items_new.map((v,ind)=>{
            // items_new[ind].order = ind+1
            alpha.push(
                this.master_slots[this.master_slots.findIndex(x => v._id === x._id)]
            )
            alpha[ind].order = ind+1
        })

        console.log(alpha)

        var alpha1 = {
            timeSlots : alpha
        }

        axios.put( Axiosconfig.main + 'timeslot', alpha1, Axiosconfig.config)
        .then((res) => {
          console.log("RESPONSE RECEIVED:1 ", res);
          this.alertObj = {type : "success", msg : "Order Updated" , show : true }
          this.setState({savingOrder : false})
    
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })

        

    }

    componentWillMount(){
        fetchTimeSlots(this)
    }
  

render(){

  return(
    <div>
        {this.state.loaded ? (
   
   <div>
     
{rendermaster(this)}
{addDialog(this)}
{showalert(this)}


   </div>

) :  (
 
   <div>
     
<Loader/>


   </div>

)}
    </div>
  )

}

}

function showalert(me){

    if(me.alertObj !== null){
      var alertObjClone = me.alertObj
      me.alertObj = null
  
      return(
        <Alert key = {Math.random()} alertObj = {alertObjClone} ></Alert>
      )
    }else{
      return null
    }
}
  
function addDialog(me){

    return(
        <Dialog
            open={me.state.showAddDialog}
            onClose={()=>{
                me.setState({showAddDialog : false})
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Add Master Slot"}</DialogTitle>
            <DialogContent>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardTimePicker 
               margin="normal"
               variant = "dialog"
               label="From Time"
              value={ me.temp.from }
              onChange={(e,val)=>{
                me.temp.from = new Date(e)
                me.setState({updatestate : true})
              }}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
    
    
    <KeyboardTimePicker 
              margin="normal"
              variant = "inline"
              label="To Time"
              value={ me.temp.to  }
              onChange={(e,val)=>{
                me.temp.to = new Date(e)
                me.setState({updatestate : true})
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />        
    
    </MuiPickersUtilsProvider>
            



            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{
                  me.setState({showAddDialog : false})
              }} color="primary">
                No
              </Button>
              <Button variant = "contained" onClick={()=>{

                  console.log(me.master_slots)
    
                me.master_slots.push(
                    {
                        from : me.temp.from,
                        to : me.temp.to,
                        order : (me.master_slots.length + 1)
                    }
                )

                var alpha1 = {
                    timeSlots : me.master_slots
                }

                console.log(alpha1)

                 axios.put( Axiosconfig.main + 'timeslot', alpha1, Axiosconfig.config)
                .then((res) => {
                  console.log("RESPONSE RECEIVED:1 ", res);
                  window.location.href =  window.location.href
            
                })
                .catch((err) => {
                  console.log("AXIOS ERROR: ", err);
                })



              }} color="primary" autoFocus>
                Add this Slot
              </Button>
            </DialogActions>
          </Dialog>
      )

}

function rendermaster(me){
       return(
           <SimpleCard title = "Master Slots">

<div class = "sendtotopright" >

<Button disabled = {me.state.savingOrder} variant = "contained" color = "primary" >Save Order</Button>  

    <Button variant = "contained" color = "primary" onClick = {()=>{

        me.setState({showAddDialog : true})

    }} ><Icon>add_circle</Icon>Add Slot</Button>

</div>


{renderelements(me)}
               





           </SimpleCard>
       )
}    

function renderelements(me){



return(
    <div class = "DND_main_div">
        <DND items = {me.items} changeHandler = {me.changeHandler}   />
    </div>
)




}

function makeelementslist(me){


    me.master_slots.map((v,ind)=>{
        me.items.push(
            
            {
                order : v.order,
                _id : v._id,
                content : ()=>{
                    return(
                        <div class = "master_slots_subdiv">
    
        {/* <Button variant = "contained" color = "primary">{v.order}</Button> */}

        <Button variant = "contained" color = "primary">{formatAMPM(v.from)}</Button>

        <Button variant = "contained" color = "primary">{formatAMPM(v.to)}</Button>

        <FormControlLabel
                    control={
                    <Switch
                        defaultChecked={true}
                        onChange={(e)=>{
                          
                          
                            
                        }}
                        name="checkedB"
                        color="primary"
                    /> } />
        
    
        

    
    
    
            </div>
                    )
                }
            }
        )
    })

} 

async function fetchTimeSlots(me){
    await axios.get( Axiosconfig.main + 'timeslot',  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res);
      if(Object.keys(res.data.data).length === 0){
        me.master_slots = []
        console.log(1, res.data.data)
      }else{
        me.master_slots = res.data.data.timeSlots
        console.log(2, me.master_slots )
        makeelementslist(me)
       
      }

      me.setState({loaded : true})


    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

}

function formatAMPM(date) {

    var hours = (new Date(date)).getHours();
    var minutes = (new Date(date)).getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export default App;





