import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';


import Table from '../../APIs/TablesAPI/Table'
import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Axiosconfig from  '../../Axios/AxiosConfig'
import Loader from  '../../APIs/Loader/Loader'
import Switch from '@material-ui/core/Switch';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from "@material-ui/core/Menu";
// import Toolbar from '@material-ui/core/Toolbar';
// import CloseIcon from '@material-ui/icons/Close';
// import AppBar from '@material-ui/core/AppBar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const axios = require('axios').default;

class App extends Component {


 Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  handleClose = () => {
      this.currentdata = {}
    this.setState({create_edit_dialog : false})
  };




  state = { create_edit_dialog : false,  updateState : false ,dataloaded : false }
  currentdata = {}
  allplans = []
  


   async componentWillMount(){

    getplans(this)
    
    var a = "2020-11-14T08:08:08.200Z"
    console.log(new Date(a).toUTCString().substring(5,22))
  
  }



  render() {


    return (
      <div className="m-sm-30">


<div style = {{ marginBottom : "-30px", display : "flex", flexDirection : "row-reverse", justifyContent : "space-between" }}>


  
<Tooltip TransitionComponent={Zoom} title = {"Add Plan"}>
  <Button color="primary" aria-label="Add" variant = "contained" onClick = {() =>{ 
    this.currentdata = {
        
planAmount: 0,
planDescription : "",
planCreditAmount: 0,
planEndDate: new Date().toISOString().substring(0,10),
planName: "",
planStartDate: new Date().toISOString().substring(0,10),
status: "Active",

    }
    this.setState({create_edit_dialog : true}) 
    
    }} ><Icon>add_circle</Icon>Add Membership</Button>
</Tooltip>


</div>


          <div className="container" style={{height: "100%", marginTop : "0%"}}>
              <div style = {{textAlign : "-webkit-right"}}>

              
                { this.state.dataloaded  ? renderTable(this) : (<Loader/>)}
                

         

                     {
                        (() => {
                            
                            if(this.state.create_edit_dialog){
                              return(
                                dialognewmemner(this)

                              )
                            }
                                
                            
                        })()
                    }

              </div>

              
          </div>
      </div>
     
     
    );
  }
}

function renderTable(me){


var headers = []

headers = [


  {title:  "Plan Name", sorting : true, filter : true,  width : "20%", id : "planName" },
  {title:  "Plan Amount", sorting : true,filter : true,  width : "20%", id : "planAmount" },
  {title:  "Credit Amount", sorting : true, width : "20%", id : "planCreditAmount" },
      {title : "Plan Expiry", filter : false, sorting : false, width : "20%", id : "edit",
  render : rowData =>{
    return(
    <div>{new Date(rowData.planEndDate).toUTCString().substring(5, 16)}</div>

    


    )
  }
  },

  {title : "Edit", filter : false, sorting : false, width : "10%", id : "edit",
  render : rowData =>{
    return(
      <Button onClick = {()=>{
        me.currentdata = rowData
        
        me.setState({create_edit_dialog : true })

      }} > <Icon>create</Icon> </Button>


    )
  }
  },

  


]

  return(
    <Table key = {Math.random()} headers = {headers} data = {me.allplans} label = "Memberships"/>


  )

    
  
}


function dialognewmemner(me){

    

    if( me.currentdata.planStartDate.includes("T")){
        me.currentdata.planStartDate = me.currentdata.planStartDate.substring(0,10)
    }

    if( me.currentdata.planEndDate.includes("T")){
        me.currentdata.planEndDate = me.currentdata.planEndDate.substring(0,10)
    }

return(
    

       
            <Dialog maxWidth={"sm"} fullWidth={true} open={me.state.create_edit_dialog}
            onClose={()=>{
              me.setState({create_edit_dialog : false})
            }} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">{me.currentdata._id === undefined  ? ("Create Membership Plan") : ("Update Membership Plan") }</DialogTitle>
                <DialogContent>
      
                <Switch
                  defaultChecked ={me.currentdata.status === "Active" ? true : false}
                  onChange={(e)=>{
      
                    me.currentdata.status =  e.target.checked ? ("Active") : ("Inactive")
                   
               
                  }}
                  name="checkedB"
                  color="primary"
                 
                />
                
      
                    <TextField autoComplete='none' variant="outlined" defaultValue = {me.currentdata.planName} autoFocus  margin="dense" id="name" label="Plan Name" onChange = {(e)=>
                    {me.currentdata.planName = e.target.value}}  type="text" fullWidth/>
                    <TextField autoComplete='none' variant="outlined" defaultValue = {me.currentdata.planDescription} autoFocus  margin="dense" id="name" label="Plan Des" onChange = {(e)=>
                    {me.currentdata.planDescription = e.target.value}}  type="text" fullWidth/>
                    <TextField autoComplete='none' variant="outlined" defaultValue = {me.currentdata.planAmount} autoFocus  margin="dense" id="name" label="Plan Amount" onChange = {(e)=>
                    {me.currentdata.planAmount = e.target.value}}  type="text" fullWidth/>
                    <TextField autoComplete='none' variant="outlined" defaultValue = {me.currentdata.planCreditAmount} autoFocus  margin="dense" id="name" label="Plan Cred" onChange = {(e)=>
                    {me.currentdata.planCreditAmount = e.target.value}}  type="text" fullWidth/>
                    
                    <div style = {{marginTop  : "20px", display : "flex", flexDirection : "row", justifyContent : "space-around"}}>
                    <TextField variant="outlined"  label="Plan Start" defaultValue = {me.currentdata.planStartDate} onChange = {(e)=>{
                         
                            me.currentdata.planStartDate = e.target.value
                    }} type = "date" />

                    <TextField variant="outlined"   label="Plan End" defaultValue = {me.currentdata.planEndDate} onChange = {(e)=>{
                           
                            me.currentdata.planEndDate = e.target.value
                    }} type = "date" />
                    </div>
                
      
      
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" color="secondary" onClick={()=>{
                    me.setState({create_edit_dialog : false})
                    me.currentdata = {}
                  }} >
                    Cancel
                  </Button>
                  <Button variant="contained"   onClick={async ()=>{
      
      
                    
                    if(me.currentdata._id === undefined){
                      await  axios.post(Axiosconfig.admin + 'membership', me.currentdata,  Axiosconfig.config)
                    .then((res) => {
                      console.log("RESPONSE RECEIVED: ", res);
                    me.setState({create_edit_dialog : false})
                    me.currentdata = {}
                    me.setState({dataloaded : false})
                    getplans(me)
                    })
                    .catch((err) => {
                      console.log("AXIOS ERROR: ", err);
                    })
      
                 
      
                    }else{
                      await  axios.put(Axiosconfig.admin + 'membership/?id=' + me.currentdata._id , me.currentdata,  Axiosconfig.config)
                    .then((res) => {
                      console.log("RESPONSE RECEIVED: ", res);
                    me.setState({create_edit_dialog : false})
                    me.currentdata = {}
                    me.setState({dataloaded : false})
                    getplans(me)
                    })
                    .catch((err) => {
                      console.log("AXIOS ERROR: ", err);
                    })
      
      
                    }
              
      
      
                
      
      
                  }} color="primary">
                    {me.currentdata._id === undefined  ? ("Create") : ("Update") }
                  </Button>
                </DialogActions>
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