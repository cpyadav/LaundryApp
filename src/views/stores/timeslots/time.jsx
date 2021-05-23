import React, { Component } from "react";
import { Icon, Button, Fab,  Grid, Collapse, TextField } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SimpleCard from '../../../APIs/SimpleCard/SimpleCard'
import Table from '../../../APIs/TablesAPI/Table'
import Alert from  '../../../APIs/Alerts/Alert'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './time.css'
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import theme from './theme'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import Loader from  '../../../APIs/Loader/Loader'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import { MuiPickersUtilsProvider,  KeyboardTimePicker, KeyboardDatePicker, Calendar } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Axiosconfig from  '../../../Axios/AxiosConfig'

import MenuItem from '@material-ui/core/MenuItem';
const axios = require('axios').default;



class App extends Component{

    state = { updatestate : true, showAddSlotDialog : false, dataLoaded : false}
    viewnum = 1
    weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    master_slots = [ ]
    temp_slots = [ ]

    addSlotsDialog_temp = []

    alertObj = null

    componentWillMount(){

        fetchSlots(this, true)
      
    }

    
  



render(){


    console.log(new Date().toISOString())


    return(
        <MuiThemeProvider theme = {theme}>
            <div>

{this.state.dataLoaded ? (
    <div class = "Timeslots_Main_stores" >
        {renderTop(this)}
    {renderview(this)}
    {addSlotDialog(this)}
    {showalert(this)}
    </div>
) : (<Loader/>)}


        </div>
        </MuiThemeProvider>
    )
}

}

async function fetchSlots(me, showfirstStore){

    if(showfirstStore){
        await axios.get( Axiosconfig.main + 'timeslot',  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res);
      if(Object.keys(res.data.data).length === 0){
        me.master_slots_company = []
        console.log(1, me.master_slots_company)
      }else{
        me.master_slots_company = res.data.data.timeSlots
        console.log(2, me.master_slots_company)
      }

    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

    await axios.get( Axiosconfig.main + 'store', Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res);
      me.storeList = res.data.data.store
      me.currentStore = me.storeList[0]._id

      console.log(me.currentStore)
     

      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
    }

    await axios.get( Axiosconfig.main + 'timeslot?storeId=' + me.currentStore + "&slotType=masterSlots",  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res.data.data.masterSlots.length);
      if(res.data.data.masterSlots.length === undefined){
        me.master_slots = []
        console.log(1, res.data.data)
      }else{
        me.master_slots = res.data.data.masterSlots
        console.log(2, me.master_slots )
      }

    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })


    await axios.get( Axiosconfig.main + 'timeslot?storeId=' + me.currentStore + "&slotType=tempSlots",  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res);
      if(res.data.data.tempSlots.length === undefined){
        me.temp_slots_loaded = []
        console.log(1, res.data.data)
      }else{
        me.temp_slots_loaded = res.data.data.tempSlots
        console.log(2, me.temp_slots_loaded )
      }

      me.setState({dataLoaded : true})

    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })



}

function addSlotDialog(me){

return(


   me.state.showAddSlotDialog ? (
    <Dialog
    width = "md"
    open={me.state.showAddSlotDialog}
    onClose={()=>{
        me.setState({showAddSlotDialog : false})
    }}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Add Slot"}</DialogTitle>
    <DialogContent>

        <div class = "addslots_dialog_Slots_main_div">
        <div>
        {me.master_slots_company.map(v=>{

            if(me.master_slots.findIndex(x => x._id === v._id) === -1){
                console.log(me.addSlotsDialog_temp.includes(v._id))
            return(
                <Button color = {me.addSlotsDialog_temp.includes(v._id) ? "primary" : "secondary"} variant = {me.addSlotsDialog_temp.includes(v._id) ? "contained" : "outlined"}  onClick = {()=>{

                    console.log(me.addSlotsDialog_temp)

                    if(!me.addSlotsDialog_temp.includes(v._id)){
                        me.addSlotsDialog_temp.push(v._id)
                    }else{

                        me.addSlotsDialog_temp.splice(me.addSlotsDialog_temp.findIndex(x=> x === v._id),1)

                    }

                    me.setState({updatestate : true})


                }}  >{formatAMPM(v.from) + "  " + formatAMPM(v.to)}</Button>
            )
            }
        })}
        </div>

        </div>



 
    

    </DialogContent>
    <DialogActions>
      <Button onClick={()=>{
          me.addSlotsDialog_temp.length = 0
          me.setState({showAddSlotDialog : false})
      }} color="primary">
        No
      </Button>
      <Button variant = "contained" onClick={()=>{

me.addSlotsDialog_temp.map(v=>{

    var alpha1 = {}
                    me.weekdays.map(v=>{
                        alpha1[v] = {
                            selected : false,
                            maxValue: ""
                        }
                    })

                    me.master_slots.push(

                        {
                            timeslot : v,
                            slots: JSON.parse(JSON.stringify(alpha1))
                        }
                    )

                    console.log(me.master_slots)

                    me.setState({showAddSlotDialog  : false})


})


me.addSlotsDialog_temp.length = 0



      }} color="primary" autoFocus>
        Add this Slot
      </Button>
    </DialogActions>
  </Dialog>
   ) : (null)


)

}

function renderTop(me){

    return(
    
    <div class = "storestimeslots_toptoggle_main_div">
        
    <ToggleButtonGroup exclusive value={me.viewnum} onChange={(e,value)=>{
    if(value !== null){
        me.viewnum = value
    if(value === 2){
        formulateTempSlots(me)
    }
    }

    me.setState({updatestate : true }) 
    
    }}   aria-label="device">
                                  <ToggleButton value={1} aria-label="laptop">
                                  Master Slots
                                  </ToggleButton>
                                  <ToggleButton value={2} aria-label="laptop">
                                  Temporary Slots
                                  </ToggleButton>
                                 
       
    </ToggleButtonGroup>

   

  <Button variant = "outlined" color = "primary"  onClick = {()=>{

            if(me.viewnum === 1){

                console.log(me.master_slots)

                axios.put( Axiosconfig.main + 'timeslot?storeId=' + me.currentStore + "&slotType=masterSlots", {masterSlots : me.master_slots}, Axiosconfig.config)
            .then((res) => {
            console.log("RESPONSE RECEIVED:1 ", res);
            fetchSlots(me,false)
            me.alertObj = {type : "success", msg : "Slots Successfully Updated" , show : true }
            me.setState({updatestate : true})
          

            })
            .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            })

            }else{

            console.log(me.temp_slots)

            axios.put( Axiosconfig.main + 'timeslot?storeId=' + me.currentStore + "&slotType=tempSlots", {tempSlots : me.temp_slots}, Axiosconfig.config).then((res) => {
                console.log("RESPONSE RECEIVED:1 ", res);
                fetchSlots(me,false)
                me.alertObj = {type : "success", msg : "Temporary Slots Successfully Updated" , show : true }
                me.setState({updatestate : true})

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
            }


        }} >{me.viewnum === 1 ? ("Save Master Slots") : ("Save Temporary Slots")}</Button>

    <Button disabled = {me.viewnum === 2} variant = "outlined" color = "primary"  onClick = {()=>{

        me.setState({showAddSlotDialog : true})

    }} >Add Slots</Button>


<Select disabled = {me.viewnum === 2} variant = "outlined"  value = {me.currentStore}  onChange = {(e)=>{
  
  me.currentStore = e.target.value
  me.setState({dataLoaded : false})
  fetchSlots(me, false)

}}  >

{me.storeList.map(v=>{
return(

<MenuItem value={v._id}>{v.storeName}</MenuItem>    
)
})}

</Select>


    </div>
    
    )
    
}

function renderview(me){


        switch(me.viewnum){
        
       
        
        case 1:
            return(
                renderstorematrix(me)
                // <div>hi</div>
            )
            break;  
        case 2:
                return(
                    rendertemp(me)
                )
                break;    
            
           
        }
        
}

function renderstorematrix(me){

    console.log(me.master_slots_company)
    console.log(me.master_slots)

    var headers = [ ]

      headers.push(
        {title:  "Slot", sorting : false, filter : false ,width : "15%",
        render : rowData=>{
            return(
            <div>{formatAMPM( me.master_slots_company[me.master_slots_company.findIndex(x => x._id === rowData.timeslot) ].from ) + " to " + 
            formatAMPM( me.master_slots_company[me.master_slots_company.findIndex(x => x._id === rowData.timeslot) ].to )} </div>

            
            
            )
        } 
      })

      

      me.weekdays.map(v=>{
        headers.push(
            {title:  v, sorting : false, filter : false ,width : "10%", render : rowData=>{
                return(
                <div class = "toggle_tex_main_div">
                    
                <FormControlLabel
                    control={
                    <Switch
                        defaultChecked={rowData.slots[v].selected}
                        onChange={(e)=>{  rowData.slots[v].selected = e.target.checked }}
                        name="checkedB"
                        color="primary"
                    /> } />
                 <TextField defaultValue = {rowData.slots[v].maxValue} onChange = {(e)=>{

                    rowData.slots[v].maxValue = e.target.value
                    console.log(me.master_slots)

                 }} variant = "outlined"  />   
                </div>
                )
            } 
          })
      })

   

    return(  
    <Table key = {Math.random()} headers = {headers} data = {me.master_slots} title = "Master Slots"   />
    // <div>hi</div>
      )
}  

function rendertemp(me){

    console.log(me.master_slots_company, me.temp_slots)
  
    var headers = [ ]

    headers.push(
        {title:  "Slot", sorting : false, filter : false ,width : "15%",
        render : rowData=>{
            return(
            <div>{formatAMPM( me.master_slots_company[me.master_slots_company.findIndex(x => x._id === rowData.timeslot) ].from ) + " to " + 
            formatAMPM( me.master_slots_company[me.master_slots_company.findIndex(x => x._id === rowData.timeslot) ].to )} </div>

            
            
            )
        } 
      })



      getnewdaymat(me).map(v=>{
        headers.push( 
            {

            titlerender : ()=>{
                return(
                    <div>
                        <div>{v.day}</div>
                        <div>{v.date}</div>
                    </div>
                )
            }    
            
            
            , sorting : false, filter : false ,width : "10%", render : rowData=>{
                return(
                <div class = "toggle_tex_main_div">
                    
                <FormControlLabel
                    control={
                    <Switch
                        defaultChecked={rowData.slots[v.date].selected}
                        onChange={(e)=>{  rowData.slots[v.date].selected = e.target.checked }}
                        name="checkedB"
                        color="primary"
                    /> } />
                 <TextField defaultValue = {rowData.slots[v.date].maxValue}  onChange = {(e)=>{
                     rowData.slots[v.date].maxValue = e.target.value 
                 }} variant = "outlined"  />   
                </div>
                )
            } 
          })
      })

   

    return(  <Table headers = {headers} data = {me.temp_slots} title = "Temporay Next 7 days Slots"   />  )
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

function getnewdaymat(me){



    var dateObj = new Date();                      
    // dateObj.setDate(dateObj.getDate() + 1);  
    var daycode = dateObj.getDay()
    var a;

    var new_mat = []

    for(let i = daycode ; i <7 + daycode ; i++ ){
        a = i
        if(i>6){
            a = i-7
        }
        
        new_mat.push({
            day : me.weekdays[a],
            // date : dateObj.toDateString().substring(4,10)
            date : dateObj.toISOString().substring(0,10)
        })

        dateObj.setDate(dateObj.getDate() + 1)

    }

    return new_mat


}

function formulateTempSlots(me){

var container = []


me.master_slots.map(v=>{
    container.push(
        {
            timeslot : v.timeslot,
            slots : createRowWise(v.timeslot,me)
        }
    )

})

console.log(container)




me.temp_slots = container
updateColumnwise(me)

}  

function createRowWise(id,me){

    
var alpha1 = {}

getnewdaymat(me).map(v=>{
    alpha1[v.date] = {
        selected : me.master_slots[me.master_slots.findIndex(x => x.timeslot === id)].slots[v.day].selected,
        maxValue : me.master_slots[me.master_slots.findIndex(x => x.timeslot === id)].slots[v.day].maxValue
    }
})

return alpha1

}

function updateColumnwise(me){

    if(me.temp_slots_loaded.length > 0){
        getnewdaymat(me).map(v=>{

            if(me.temp_slots_loaded[0].slots[v.date] !== undefined){
                console.log("hi")
                me.temp_slots.map(v1=>{

                    if(me.temp_slots_loaded.findIndex(x => x.timeslot === v1.timeslot) !== -1){
                        v1.slots[v.date] =  me.temp_slots_loaded[me.temp_slots_loaded.findIndex(x => x.timeslot === v1.timeslot)].slots[v.date]
                        console.log("hi2")
                    }

                   
                })
            }
    
    
        })
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

export default App;





