
// import Topbar from  '../../../Routes/topbar'
import Loader from  '../../../APIs/Loader/Loader'
import Alert from  '../../../APIs/Alerts/Alert'
import Axiosconfig from  '../../../Axios/AxiosConfig'
import Validation from  '../../../APIs/Validation/validation'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import Table from '../../../APIs/TablesAPI/Table'

import React, { Component } from "react";


// import { makeStyles, getContrastRatio } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Icon, Button, Fab,  Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import theme from './theme'
import "./master_fields.css"
import Switch from '@material-ui/core/Switch';
const axios = require('axios').default;





class create_cat extends Component{

  
    state = {dataloaded : false, tabvalue : 1, dialogmc : false, dialogcat : false, updatestate : false }
    mothercats_options = []
    mothercat_template = {

        mcDeliveryCharge: 0,
        mcDeliveryDuration: 2,
        mcDeliveryDurationText: "d",
        mcDesc: "",
        mcExpressDeliveryDuration: 2,
        mcExpressDeliveryDurationText: "d",
        mcExpressMultiplier: 2,
        mcImage: "",
        mcMinOrderValue: 500,
        mcName: "",
        mcSmallDesc: "",
        mcStatus: 1,

    }
    catfileds = {}

    cats_options = []
    
    subcats_options = []
    cat_template = {

      catDeliveryCharge: 0,
      catDeliveryDuration: 2,
      catDeliveryDurationText: "d",
      catDesc: "",
      catExpressDeliveryDuration: 2,
      catExpressDeliveryDurationText: "d",
      catImage: "",
      catName: "",
      catSmallDesc: "",
      catStatus: 1,
      mcId: ""

    }
    catfileds = {}

    alertObj = null


   async componentWillMount(){

    getcategories(this)

    }
  
    render(){

      if(this.state.dataloaded === false){
        return(<Loader/>)

      }else{
        return(
        
        <div className="m-sm-30">
        
        
<div className="m-sm-30">
  
  {/* <Topbar/> */}

  <div style = {{margin : "0px", marginBottom : "30px" }}>
 

  <Tabs
        value={this.state.tabvalue}
        onChange={(e,v)=>{
          this.setState({tabvalue : v })
        }}
        aria-label="disabled tabs example"
        
      >
        <Tab  label="Mother Categories" value = {1} />
        
        <Tab label="Categories" value = {2}  />

        {/* <Tab label="Sub Categories" value = {3}  /> */}
      </Tabs>

{/* Tab Decision */}

{tabrender(this)}
{dialogmc(this)}
{dialogcat(this)}
{showalert(this)}


</div>


</div> 

      </div>
        
        
        
        
        )
      }
     
  
     
    }
  }


  function mothercats2(me){

    var statlookup = {
      "0" : "Inactive",
      "1" : "Active"
    }

    const headers = [
      {title:  "Name", filter : true, sorting : true, width : "15%", id : "mcName" },
      {title:  "Delivery Charges", filter : true, sorting : true, width : "15%", id : "mcDeliveryCharge" },
      {title:  "Minimum Order", filter : true, sorting : true, width : "15%", id : "mcMinOrderValue" },
      {title:  "Status", filter : true, sorting : true, width : "15%", id : "mcStatus", lookup : statlookup },
      {title : "Edit", filter : false, sorting : false, width : "10%", id : "edit",
    render : rowData =>{
      return(
        <Button onClick  = {()=>{
          me.mothercatfileds = JSON.parse(JSON.stringify(me.mothercats_options[me.mothercats_options.findIndex(x => x._id === rowData._id)]))
          me.setState({dialogmc : true })
        }}>
          <Icon>create</Icon>
        </Button>
      )
    }
    }
  
    ]

    return(
      <div class = "viewcats_main_div">
  
<Button onClick = {()=>{
  
  me.mothercatfileds = me.mothercat_template
  me.setState({dialogmc : true})
}} color = "primary" variant = "contained" >
                    <Icon>add_circle</Icon> Add Mother Category
                  </Button> 
<Table key = {Math.random()} headers = {headers} data = {me.mothercats_options} label = "Mother Categories"/>
</div>
    )

  }
  


  function cats2(me){

    const headers = [
      {title:  "Mother Category", filter : true,  sorting : true, width : "15%", id : "mcName"
    
    },
      {title:  "Name", filter : true, sorting : true, width : "15%", id : "catName" },
      {title:  "Delivery Charges", filter : true, sorting : true, width : "15%", id : "catDeliveryCharge" },
    
      {title : "Edit", filter : false, sorting : false, width : "15%", id : "edit",
    render : rowData =>{
      return(
        <Button 
       
        onClick  = {()=>{
          me.catfileds = JSON.parse(JSON.stringify(me.cats_options[me.cats_options.findIndex(x => x._id === rowData._id)]))
          me.setState({dialogcat : true })
        }}>
          <Icon>create</Icon>
        </Button>
      )
    }
    }
  
    ]

    me.cats_options.map((v,ind)=>{
      console.log(ind)

      me.cats_options[ind].mcName = me.mothercats_options[me.mothercats_options.findIndex(x => x._id === v.mcId)].mcName

    })

    return(
      <div class = "viewcats_main_div">


<Button onClick = {()=>{

me.catfileds = me.cat_template
me.setState({dialogcat : true})
}}  color = "primary" variant = "contained">
                <Icon>add_circle</Icon>  Add  Category
              </Button>


              <Table key = {Math.random()} headers = {headers} data = {me.cats_options} label =  "Categories"/>

      
    </div>
    )

  }


function subcats(me){

  const headers = [
    {title:  "Name", filter : true,  sorting : true, width : "15%", id : "subcatName"
  
  }
  

  ]





  return(
    <div class = "viewcats_main_div">

<Table key = {Math.random()} headers = {headers} data = {me.subcats_options} label =  "Sub Categories"/>
    </div>
)
}

function tabrender(me){

switch(me.state.tabvalue){
  case 1 : 
  return(mothercats2(me))

  case 2 : 
  return(cats2(me))

  case 3 : 
  return(subcats(me))
}

}


function dialogmc(me){

  if(me.state.dialogmc){
    return(
      <Dialog maxWidth={"sm"} fullWidth={true} open={me.state.dialogmc}
      onClose={()=>{
        me.setState({dialogmc : false})
      }} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">{me.mothercatfileds._id === undefined ? ("Create Mother Category") : ("Update Mother Category")}</DialogTitle>
          <DialogContent>

          <Switch
            defaultChecked={me.mothercatfileds.mcStatus === 0 ? false : true}
            onChange={(e)=>{

              me.mothercatfileds.mcStatus =  me.mothercatfileds.mcStatus === 1 ? 0 : 1
              me.setState({updatestate : true})
         
            }}
            name="checkedB"
            color="primary"
           
          />
          {me.mothercatfileds.mcStatus === 0 ? "Inactive" : "Active"}

          <TextField autoComplete='none' variant="outlined" inputProps = {{ maxlength: 16 }} defaultValue = {me.mothercatfileds.mcName} autoFocus  margin="dense" id="name" label="Mother Category Name" onChange = {(e)=>{me.mothercatfileds.mcName = e.target.value}} type="text" fullWidth/>
          <TextField autoComplete = "none"   variant="outlined" inputProps = {{ maxlength: 20 }} defaultValue = {me.mothercatfileds.mcSmallDesc} autoFocus  margin="dense" id="name" label="Short Description"  onChange = {(e)=>{me.mothercatfileds.mcSmallDesc = e.target.value}}  type="text" fullWidth/>
          <TextField  autoComplete = "none"  variant="outlined"  inputProps = {{ maxlength: 30 }}  defaultValue = {me.mothercatfileds.mcDesc} autoFocus  margin="dense" id="name" label="Long Description"  onChange = {(e)=>{me.mothercatfileds.mcDesc = e.target.value}}  type="text" fullWidth/>
          <TextField  autoComplete = "none"  variant="outlined"  inputProps = {{ min: 0 }}  defaultValue = {me.mothercatfileds.mcMinOrderValue} autoFocus  margin="dense" id="name" label="Minimum Order Value"  onChange = {(e)=>{me.mothercatfileds.mcMinOrderValue = e.target.value}}  type="number" fullWidth/>
          <TextField  autoComplete = "none"  variant="outlined"  inputProps = {{ min: 0 }}  defaultValue = {me.mothercatfileds.mcDeliveryCharge}  autoFocus  margin="dense" id="name" label="Delivery Charge"  onChange = {(e)=>{me.mothercatfileds.mcDeliveryCharge = e.target.value}}  type="number" fullWidth/>

          <div style = {{width : "100%", display : "flex",  flexDirection : "row", justifyContent : "space-between"}}>
            <div style = {{width : "80%"}}>
                <TextField   inputProps = {{ min: 0 }} autoComplete = "none"  defaultValue = {me.mothercatfileds.mcDeliveryDuration} variant="outlined" autoFocus margin="dense" width = "80%"id="name"label="Delivery Duration"   onChange = {(e)=>{me.mothercatfileds.mcDeliveryDuration = e.target.value}}    type="number"fullWidth/>
            </div>
            <div style = {{marginTop : "0px"}}>
            <FormControl >
                <InputLabel htmlFor="max-width"></InputLabel>
                <Select autoFocus  defaultValue = {me.mothercatfileds.mcDeliveryDurationText}  onChange = {(e)=>{me.mothercatfileds.mcDeliveryDurationText = e.target.value}} >
                    <MenuItem value="d">Days</MenuItem>
                    <MenuItem value="h">Hours</MenuItem>
                </Select>
            </FormControl>
            </div>
          </div>
          <TextField  inputProps = {{ min: 0 }}  autoComplete = "none"  variant="outlined" defaultValue = {me.mothercatfileds.mcExpressMultiplier} autoFocus  margin="dense" id="name"   onChange = {(e)=>{me.mothercatfileds.mcExpressMultiplier = e.target.value}} label="Express Multiplier"  type="number" fullWidth/>

          <div style = {{width : "100%", display : "flex",  flexDirection : "row", justifyContent : "space-between"}}>
            <div style = {{width : "80%"}}>
                <TextField  autoComplete = "none"  variant="outlined" defaultValue = {me.mothercatfileds.mcExpressDeliveryDuration} autoFocus margin="dense"width = "80%"id="name"  onChange = {(e)=>{me.mothercatfileds.mcExpressDeliveryDuration = e.target.value}}   label="Express Delivery Duration" type="number"   fullWidth />
            </div>
            <div style = {{marginTop : "0px"}}>
            <FormControl >
                <InputLabel htmlFor="max-width"></InputLabel>
                <Select autoFocus   defaultValue = {me.mothercatfileds.mcExpressDeliveryDurationText}  onChange = {(e)=>{me.mothercatfileds.mcExpressDeliveryDurationText = e.target.value}}  >
                    <MenuItem value="d">Days</MenuItem>
                    <MenuItem value="sm">Hours</MenuItem>
                </Select>
            </FormControl>
            </div>
          </div>

        

          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={()=>{
              me.setState({dialogmc : false})
              me.mothercatfileds = {}
            }} >
              Cancel
            </Button>
            <Button variant="contained"   onClick={async ()=>{

              

              let alpha = mc_validationpropscreator(me)
              var vallogs = Validation(alpha)

              if(vallogs.length === 0){
                
              if(me.mothercatfileds._id === undefined){
                await  axios.post(Axiosconfig.main + 'mc', me.mothercatfileds,  Axiosconfig.config)
              .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                me.setState({dataloaded : false, dialogmc : false}) 
                me.mothercatfileds = {}
                getcategories(me)
              })
              .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
                me.alertObj = {type : "error", msg : err.response.data.message , show : true }
                me.setState({updatestate : true})

              })

           

              }else{
                await  axios.put(Axiosconfig.main + 'mc/?id=' + me.mothercatfileds._id , me.mothercatfileds,  Axiosconfig.config)
              .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                me.setState({dataloaded : false, dialogmc : false})
                me.mothercatfileds = {}
                getcategories(me)
              })
              .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                me.alertObj = {type : "error", msg : err.response.data.error , show : true }
                me.setState({updatestate : true})
              })


              }
        




              

              
              }else{
                me.alertObj = {type : "error", msg : vallogs[0], show : true }
                me.setState({updatestate : true})
              }



            }} color="primary">
              {me.mothercatfileds._id === undefined ? ("Create") : ("Update")}
            </Button>
          </DialogActions>
      </Dialog>
    )
  }

}

function mc_validationpropscreator(me){
  return(
    [
      {
        val : me.mothercatfileds.mcName,
        validators : [{type : "minStrLen", value : 4}, {type : "maxStrLen", value : 16}, {type : "isRequired", value : true}],
        errormsg : "Mother Cat name should be more than 4 chars and less than 16"
      },

      {
        val : me.mothercatfileds.mcDesc,
        validators : [{type : "minStrLen", value : 1}, {type : "maxStrLen", value : 60} , {type : "isRequired", value : true}],
        errormsg : "Description should not be more than 60 chars"
      },

      {
        val : me.mothercatfileds.mcSmallDesc,
        validators : [{type : "minStrLen", value : 1}, {type : "maxStrLen", value : 20}, {type : "isRequired", value : true}],
        errormsg : "Short Description should not be more than 20 chars"
      },

      {
        val : me.mothercatfileds.mcDeliveryCharge,
        validators : [{type : "minIntVal", value : 0}, {type : "isRequired", value : true}],
        errormsg : "Delivery Charge should be a positive value"
      },

      {
        val : me.mothercatfileds.mcMinOrderValue,
        validators : [{type : "minIntVal", value : 0}, {type : "isRequired", value : true}],
        errormsg : "Min Order value should be a positive value"
      },

      {
        val : me.mothercatfileds.mcDeliveryDuration,
        validators : [{type : "minIntVal", value : 0}, {type : "isRequired", value : true}],
        errormsg : "Delivery Duration should be a positive value"
      },

      {
        val : me.mothercatfileds.mcExpressMultiplier,
        validators : [{type : "minIntVal", value : 0}, {type : "isRequired", value : true}],
        errormsg : "Express Multiplier should be a positive value"
      },

      {
        val : me.mothercatfileds.mcExpressDeliveryDuration,
        validators : [{type : "minIntVal", value : 0}, {type : "isRequired", value : true}],
        errormsg : "Express Duration value should be a positive value"
      },

    ]
  )
}

function cat_validationpropscreator(me){
  return(
    [
      {
        val : me.catfileds.catName,
        validators : [{type : "minStrLen", value : 3}, {type : "maxStrLen", value : 16}, {type : "isRequired", value : true}],
        errormsg : "Category name should be more than 3 chars and less than 16"
      },

      {
        val : me.catfileds.mcId,
        validators : [{type : "isRequired", value : true}],
        errormsg : "Please Select the Mother Category"
      },

      {
        val : me.catfileds.catSmallDesc,
        validators : [{type : "minStrLen", value : 0}, {type : "maxStrLen", value : 20}],
        errormsg : "Short Description should not be more than 20 chars"
      },

      {
        val : me.catfileds.catDesc,
        validators : [{type : "minStrLen", value : 0}, {type : "maxStrLen", value : 60}],
        errormsg : "Short Description should not be more than 60 chars"
      },

      {
        val : me.catfileds.catDeliveryCharge,
        validators : [{type : "minIntVal", value : 0}, {type : "isRequired", value : true}],
        errormsg : "Delivery Charge should be a positive value"
      },

      {
        val : me.catfileds.catExpressDeliveryDuration,
        validators : [{type : "minIntVal", value : 0}, {type : "isRequired", value : true}],
        errormsg : "Express Delivery Duration should be a positive value"
      },

      

    ]
  )
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

function dialogcat(me){

  if(me.state.dialogcat){
    return(
      <Dialog maxWidth={"sm"} fullWidth={true} open={me.state.dialogcat}
      onClose={()=>{
        me.setState({dialogcat : false})
      }} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">{me.catfileds._id === undefined ? ("Create Category") : ("Update Category")}</DialogTitle>
          <DialogContent>
          <Autocomplete id="combo-box-demo" options={me.mothercats_options } getOptionLabel={(option) => option.mcName} style={{ width: "100%" }} 
          onChange = {(e,v)=>{
            me.catfileds.mcId = v._id
          }}
          defaultValue = { me.catfileds.mcId === ""  ? null :   me.mothercats_options[me.mothercats_options.findIndex(x => x._id === me.catfileds.mcId)]}
          renderInput={(params) => <TextField {...params} label="Mother Categoriy" variant="outlined" />  }
            />
        
     



          <TextField  variant="outlined"  inputProps = {{ maxlength: 15 }} defaultValue = {me.catfileds.catName} autoFocus  margin="dense" id="name" label="Category Name" onChange = {(e)=>{me.catfileds.catName = e.target.value}} type="text" fullWidth/>
          <TextField  variant="outlined"  inputProps = {{ maxlength: 20 }}  defaultValue = {me.catfileds.catSmallDesc}  autoFocus  margin="dense" id="name" label="Short Description"  onChange = {(e)=>{me.catfileds.catSmallDesc = e.target.value}}  type="text" fullWidth/>
          <TextField  variant="outlined"  inputProps = {{ maxlength: 30 }}  defaultValue = {me.catfileds.catDesc}  autoFocus  margin="dense" id="name" label="Long Description"  onChange = {(e)=>{me.catfileds.catDesc = e.target.value}}  type="text" fullWidth/>
           <TextField  variant="outlined"  inputProps = {{ min: 0 }}  defaultValue = {me.catfileds.catDeliveryCharge}  autoFocus  margin="dense" id="name" label="Delivery Charge"  onChange = {(e)=>{me.catfileds.catDeliveryCharge = e.target.value}}  type="number" fullWidth/>

          <div style = {{width : "100%", display : "flex",  flexDirection : "row", justifyContent : "space-between"}}>
            <div style = {{width : "80%"}}>
                <TextField  inputProps = {{ min: 0 }}  defaultValue = {me.catfileds.catDeliveryDuration}  variant="outlined" autoFocus margin="dense" width = "80%"id="name"label="Delivery Duration"   onChange = {(e)=>{me.catfileds.catDeliveryDuration = e.target.value}}    type="number"fullWidth/>
            </div>
            <div style = {{marginTop : "0px"}}>
            <FormControl >
                <InputLabel htmlFor="max-width"></InputLabel>
                <Select   autoFocus   defaultValue = {me.catfileds.catDeliveryDurationText}   onChange = {(e)=>{me.catfileds.catDeliveryDurationText = e.target.value}} >
                    <MenuItem value="d">Days</MenuItem>
                    <MenuItem value="h">Hours</MenuItem>
                </Select>
            </FormControl>
            </div>
          </div>
         
          <div style = {{width : "100%", display : "flex",  flexDirection : "row", justifyContent : "space-between"}}>
            <div style = {{width : "80%"}}>
                <TextField  inputProps = {{ min: 0 }}  defaultValue = {me.catfileds.catExpressDeliveryDuration}  variant="outlined" autoFocus margin="dense"width = "80%"id="name"  onChange = {(e)=>{me.catfileds.catExpressDeliveryDuration = e.target.value}}   label="Express Delivery Duration" type="number"   fullWidth />
            </div>
            <div style = {{marginTop : "0px"}}>
            <FormControl >
                <InputLabel htmlFor="max-width"></InputLabel>
                <Select autoFocus   defaultValue = {me.catfileds.catDeliveryDurationText}   onChange = {(e)=>{me.catfileds.catExpressDeliveryDurationText = e.target.value}}  >
                    <MenuItem value="d">Days</MenuItem>
                    <MenuItem value="h">Hours</MenuItem>
                </Select>
            </FormControl>
            </div>
          </div>

     

          </DialogContent>





<DialogActions>
            <Button variant="outlined" color="secondary" onClick={()=>{
              me.setState({dialogcat : false})
              me.catfileds = {}
            }} >
              Cancel
            </Button>
            <Button variant="contained"   onClick={async ()=>{

              var alpha = cat_validationpropscreator(me)
              var vallogs = Validation(alpha)


              if(vallogs.length === 0){
                if(me.catfileds._id === undefined){
                  await  axios.post(Axiosconfig.main + 'cat', me.catfileds,  Axiosconfig.config)
                .then((res) => {
                  console.log("RESPONSE RECEIVED: ", res);
                  me.setState({dataloaded : false})
                  me.setState({dialogcat : false})
                me.catfileds = {}
  
                getcategories(me)
                })
                .catch((err) => {
                  console.log("AXIOS ERROR: ", err.response);
                  me.alertObj = {type : "error", msg : err.response.data.message , show : true }
                  me.setState({updatestate : true})
                })
  
             
  
                }else{
                  await  axios.put(Axiosconfig.main + 'cat/?id=' + me.catfileds._id , me.catfileds,  Axiosconfig.config)
                .then((res) => {
                  console.log("RESPONSE RECEIVED: ", res);
                  me.setState({dataloaded : false})
                  me.setState({dialogcat : false})
                me.catfileds = {}
  
                getcategories(me)
                })
                .catch((err) => {
                  console.log("AXIOS ERROR: ", err.response);
                  me.alertObj = {type : "error", msg : err.response.data.message , show : true }
                  me.setState({updatestate : true})
                })
  
  
                }
          
                
              }else{

                me.alertObj = {type : "error", msg : vallogs[0], show : true }
                me.setState({updatestate : true})

              }
              
              


            }} color="primary">
              {me.catfileds._id === undefined ? ("Create Category") : ("Update Category")}
            </Button>
          </DialogActions>







      </Dialog>
    )
  }

}

async function getcategories(me){

console.log(Axiosconfig.config)
console.log(JSON.parse(window.localStorage.getItem("auth_user")))

  await axios.get( Axiosconfig.main + 'mc', Axiosconfig.config)
  .then((res) => {
    console.log("RESPONSE RECEIVED:1 ", res);
    
      me.mothercats_options = res.data.data.mc
     
 
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })

  
      await axios.get( Axiosconfig.main + 'cat', Axiosconfig.config)
      .then((res) => {
        console.log("RESPONSE RECEIVED:2 ", res);
   
          me.cats_options= res.data.data.cat
          me.setState({dataloaded : false})
          
   
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })

    
      await axios.get( Axiosconfig.main + 'subcat', Axiosconfig.config)
      .then((res) => {
        console.log("RESPONSE RECEIVED:3 ", res);
        
        me.subcats_options = res.data.data.subcat
        console.log("updatestete")
        me.setState({updatestate : true , dataloaded : true })

      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })  


}
  
  
  
 
  
  export default create_cat;


