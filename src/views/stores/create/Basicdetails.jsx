import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Icon, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SimpleCard from '../../../APIs/SimpleCard/SimpleCard'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  Calendar 
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



class App extends React.Component {



    render(){


        return(

            <div>
                <div style = {{width : "90%", margin : "5%", marginTop : "0%"}}>
                      <SimpleCard title = "Basic Details" style = {{width : "90%", margin : "5%", marginTop : "0%"}}>
        <div style = {{width : "90%", margin : "5%", marginTop : "3%"}}>


<div style = {{ textAlign : "right" }}>
<FormControlLabel
        control={
          <Switch
            defaultChecked={this.props.data.storeStatus === "Active" ? true : false}
            onChange={(e)=>{
            //   me.Store_Details.isFranchise = e.target.checked ? 1 : 0
           {this.props.handler1("storeStatus", e.target.checked ? "Active" : "Inactive")}
            }}
            name="checkedB"
            color="primary"
          />
        }
        label={this.props.data.storeStatus === "Active"? "STORE ACTIVE" : "STORE INACTIVE"}
      />
</div>



<Grid container spacing={4}>
    <Grid item lg={6} md={6} sm={12} xs={12}>
    <TextField  autoComplete='none'  variant="outlined"  autoFocus defaultValue = {this.props.data.storeName}  margin="dense" id="name" label="Store Name" onChange = {(e)=>{this.props.handler1("storeName", e.target.value)}} type="text" fullWidth/>
     <TextField   autoComplete='none'  variant="outlined"  autoFocus defaultValue = {this.props.data.storeCode}  margin="dense" id="name" label="Store Code" onChange = {(e)=>{this.props.handler1("storeCode", e.target.value)}} type="text" fullWidth/>
     

     <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label = "Start Time"
          variant = "inline"
          onChange = {(e)=>{this.props.handler1("inTime", new Date(e))}}
          value = {this.props.data.inTime}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
       </MuiPickersUtilsProvider>

     
    </Grid>
    <Grid item lg={6} md={6} sm={12} xs={12}>
      <TextField   autoComplete='none'  variant="outlined"  autoFocus defaultValue = {this.props.data.storeMobile}  margin="dense" id="name" label="Mobile" onChange = {(e)=>{this.props.handler1("storeMobile", e.target.value)}} type="number" fullWidth/>
    <TextField   autoComplete='none'  variant="outlined"  autoFocus defaultValue = {this.props.data.storeMobileAlternate}  margin="dense" id="name" label="Alternate" onChange = {(e)=>{this.props.handler1("storeMobileAlternate", e.target.value)} } type="number" fullWidth/>
  
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label = "Close Time"
          variant = "inline"
          onChange = {(e)=>{this.props.handler1("outTime", new Date(e))}}
          value = {this.props.data.outTime}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
       </MuiPickersUtilsProvider>
    
    </Grid>

    
  </Grid>





  <Button>Connection details</Button>

<Grid container spacing={4}>
<Grid item lg={6} md={6} sm={12} xs={12}>
<FormControlLabel
        control={
          <Switch
            defaultChecked={this.props.data.isFranchise === 1 ? true : false}
            onChange={(e)=>{
            //   me.Store_Details.isFranchise = e.target.checked ? 1 : 0
           {this.props.handler1("isFranchise", e.target.checked ? 1 : 0)}
            }}
            name="checkedB"
            color="primary"
          />
        }
        label="Is Franchise"
      />
</Grid>

<Grid item lg={6} md={6} sm={12} xs={12}>

{this.props.data.isFranchise ? (
  <div>
    <TextField required autoComplete='none'  variant="outlined"  defaultValue = {this.props.data.royalityOnlinePercentage}  autoFocus  margin="dense" id="name" label="Royalty % Online" onChange = {(e)=>{this.props.handler1("royalityOnlinePercentage", e.target.value)}} type="percent" fullWidth/>
  <TextField required autoComplete='none'  variant="outlined"  defaultValue = {this.props.data.royalityOfflinePercentage}  autoFocus  margin="dense" id="name" label="Royalty % Offline" onChange = {(e)=>{this.props.handler1("royalityOfflinePercentage", e.target.value)}} type="percent" fullWidth/>
  
  </div>
) : (null)}


</Grid>
  
</Grid>

<Button>Store Type</Button>

{/* <Switch  name="checkedB" color="primary"  /> */}

<Grid container spacing={4}>
<Grid item lg={6} md={6} sm={12} xs={12}>

<FormControlLabel
        control={
          <Switch
            checked={this.props.data.isVirtual}
            onChange = {(e)=>{

              this.props.handler1("isVirtual", e.target.checked)
             

            }}



            
            name="checkedB"
            color="primary"
          />
        }
        label="Is Virtual Store"
      />

      


</Grid>

<Grid item lg={6} md={6} sm={12} xs={12}>

{this.props.data.isVirtual ? (

  

<Autocomplete 

options={this.props.storeData}
getOptionLabel={(option) => option.storeName}
getOptionDisabled={(option) => option.isVirtual === true}
onChange = {(e,value)=>{

  var alpha = ["addr1", "addr2", "addressType", "city", "landmark", "latitude", "longitude", "pincode", "state"]

  console.log(value)

  if(value !== null){
    alpha.map((v,index)=>{
      if(index === 5 || index === 6){
  
        this.props.handler2(v, parseFloat(value.storeAddress[v]) )
  
      }else{
  
        this.props.handler2(v, value.storeAddress[v])
  
      }
    })

    this.props.handler1("parentStore", value._id)
  }else{
    this.props.handler1("parentStore", "")
  }

  

  


}}
value = {this.props.data.parentStore === "" ? null : this.props.storeData[this.props.storeData.findIndex(x => x._id === this.props.data.parentStore) ]  }
renderInput={(params) => <TextField {...params} label="Select Physical Store" variant="outlined" />}
/>  


) : (

<FormControlLabel
        control={
          <Switch
            checked={this.props.data.showInStoreLocator}
            onChange = {(e)=>{

              this.props.handler1("showInStoreLocator", e.target.checked)

            }}

            
            name="checkedB"
            color="primary"
          />
        }
        label="Show in Store Map"
      />

)}

</Grid>
  
</Grid>




</div>
        </SimpleCard>
          </div>



            </div>

        )
    }


}


export default App;