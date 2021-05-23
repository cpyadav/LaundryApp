import React, { Component } from 'react';


import Loader from  '../../APIs/Loader/Loader'
import Alert from  '../../APIs/Alerts/Alert'
import Axiosconfig from  '../../Axios/AxiosConfig'
import Validation from  '../../APIs/Validation/validation'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import Table from '../../APIs/TablesAPI/Table'

import { Icon, Button, Fab,  Grid, Card, Typography} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import DialogContentText from '@material-ui/core/DialogContentText';
// import './ratecard_requests.css'
import './ratecard_manage.css'
import theme from './theme_ratecard'
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import NewDialog from './newDialog'


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";



const axios = require('axios').default;



class App extends Component {



  constructor(props) {
    super(props)

    this.handler1 = this.handler1.bind(this)
   
  }

  

  async handler1(rateCardName, id){

    this.handleClose()

    var ratecard = {

  "rateCardName": rateCardName,
  "rateCardServices" : [],
  "rateCardStatus": "Active",


    }

    if(id !== null){
      
      this.ratecard = "loading"
      this.setState({updateState : true})
      await axios.get( Axiosconfig.main + 'ratecard?id=' + id, Axiosconfig.config)
      .then((res) => {
        console.log("RESPONSE RECEIVED:1 ", res);
        var alpha = []
        ratecard.rateCardServices =  res.data.data.rateCardServices
        
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })


    }


  this.ratecard = JSON.parse(JSON.stringify(ratecard))
  this.temp_ratecard = JSON.parse(JSON.stringify(ratecard))
  this.setState({updateState : true, tableKey : Math.random()})
  
  saveratecard(this)
  
    
  }


  masterlistitems = []
  mothercats_options = []
  primecats_options = []
  subcats_options = []
  ratecard = null
  temp_service = null
  current_edit = -2
  alertObj = null
  temp_ratecard = null
  ratecard_name_qry = ""
    

    

    state = { currentstore : null ,
     storesdata : [],  
     savemsg : false, 
     ratecardlist : [], 
    openRates : true,  
     dataloaded : false, 
     updateState : false,
     shownewDialog : false,
     show_createedit_dialog : false,
     show_addmore_dialog : false,
     savingtoserve : false,
     tableKey : Math.random()


  }

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  handleClose = ()=>{
    this.setState({  shownewDialog : false,
      showopenDialog : false,
      show_createedit_dialog : false,
      show_addmore_dialog : false,
      tableKey : Math.random()
     
    })

    
  }



    async componentWillMount(){

      console.log("url", window.location.search.substring(9,window.location.search.length).length)

      loadcats(this)
    
        
      }





  render() {

    if(this.state.dataloaded){
      return (

        view1(this)
    
        
        
          )
    }else{
      return(
        <Loader/>
      )
    }


    
  
}}

async function loadcats(me){
  
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
      me.primecats_options = res.data.data.cat

    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

  
    await axios.get( Axiosconfig.main + 'subcat', Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:3 ", res);
      me.subcats_options = res.data.data.subcat

     
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })


    await  axios.get(Axiosconfig.main + 'item',  Axiosconfig.config)
    .then((res) => {
      me.masterlistitems = res.data.data[0].itemList
      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })







    
      if(me.state.currentstore === "company_level"){
        fetchratecard(me )
      }else{

        fetchratecard(me )

      }

}

function view1(me){
  return(
    <div style = {{marginTop : "20px"}}>
   
        
    
    
    {rendernewDialog(me)}
    
    
   {me.ratecard !== null ? (

me.ratecard === "loading" ? (<Loader/>) : (
<div>
        

        

<div style = {{display : "flex", flexDirection : "row" , justifyContent : "space-between",  }}>
<div class = "TopMenu_ratecard add_search_div" >






<MuiThemeProvider >
      <div class = "TopMenu_ratecard" >
    
 
 <div>
 <Button variant = "contained" color = "primary" onClick = {()=>{
      me.setState({ shownewDialog : true })
   
    }} ><Icon>add</Icon>New</Button>
    <Button variant = "contained" color = "primary" disabled = { me.state.ratecardlist.length === 0 ? true : false } onClick = {(e)=>{
      me.setState({openRates : true})
    }}><Icon>near_me</Icon>Open</Button>
    
    {renderopenmenu(me)}
    
    <Tooltip title = "Save Changes to Server">
<Button color = "primary" variant = "contained" disabled = {me.ratecard === null ? true : (me.state.savingtoserve ? (true) : false)}  onClick = {()=>{
      saveratecard(me)
      
      
}} > <Icon>save</Icon> {me.state.savingtoserve ? ("Saving data") : ("Save Changes")}</Button>
</Tooltip>
 </div>


<div>
  




<Button  onClick = {()=>{

me.temp_service = {
    mcId : me.mothercats_options[0]._id,  
    subcatId : me.subcats_options[0]._id, 
    catId : me.primecats_options[0]._id, 
    perUnitPrice: 0,
    minValue: 0,
    minValueText: "Kgs",
    minPrice : 0,
    serviceName: "",
    planStatus: true,
    
    additionalPrice : 0,
    masteritem : null
  
}

me.current_edit = -1

me.setState({show_createedit_dialog : true})

}} > <Icon>add_circle</Icon>Add New Service </Button>


<Button 
disabled = {me.ratecard.rateCardServices.findIndex(x => x.selected) === -1}
onClick = {()=>{

me.temp_ratecard.rateCardServices = JSON.parse(JSON.stringify(me.ratecard.rateCardServices.filter(item => item.selected === false  || item.selected === undefined)))
saveratecard(me)
me.setState({updateState : true })

}} > <Icon>delete_circle</Icon>Delete Service </Button>



<TextField variant = "outlined" label = "Rate Card Name"  value = {me.temp_ratecard.rateCardName} onChange = {(e)=>{

me.temp_ratecard.rateCardName = e.target.value
me.current_edit = -2
me.setState({updateState : true})

}} />


</div>
  

    
    </div>

 
      
      </MuiThemeProvider>













</div>
</div> 
{createedit_dialog(me)}
{addmoredialog(me)}
<MuiThemeProvider theme = {theme}>
{renderheaders(me)}
</MuiThemeProvider>

</div>
)

) : (<div style = {{ marginTop : "15px", textAlignLast : "center" , color : "grey"}}><div>No Rate Cards Found</div><div>Click on New in the Menu to Create a New Card</div></div>)
}
    
{showalert(me)}
    </div>
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

async function fetchratecard(me){

 
  me.setState({dataloaded : false})

  await axios.get( Axiosconfig.main + 'ratecard' , Axiosconfig.config)
  .then((res) => {
    console.log("RESPONSE RECEIVED:1 ", res);
    var alpha = []

    res.data.data.map((v,index)=>{

      alpha.push({id : v._id, Name : v.rateCardName, serviceCount : v.rateCardServices.length})

    })

    if(alpha.length > 0){
      if(me.currentratecardname === undefined){

        me.ratecard = JSON.parse(JSON.stringify(res.data.data[0]))
        me.temp_ratecard = JSON.parse(JSON.stringify(res.data.data[0]))

      }else{
        me.ratecard  = res.data.data[res.data.data.findIndex(x => x.rateCardName === me.currentratecardname)]
      }
    
    
    }else{
      me.ratecard = null
     

    }

    me.setState({ratecardlist : alpha , dataloaded : true})



    
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })

  

}

async function fetchratecard_updateaftersave(me){

 
  await axios.get( Axiosconfig.main + 'ratecard' , Axiosconfig.config)
  .then((res) => {
    console.log("RESPONSE RECEIVED:1 ", res);
    var alpha = []

    res.data.data.map((v,index)=>{

      alpha.push({id : v._id, Name : v.rateCardName})

    })

    me.setState({ratecardlist : alpha})

    
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })

 

}

function addmoredialog(me){
 
return(
  <Dialog
  open={me.state.show_addmore_dialog}
  onClose={()=>{
    
  }}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Add More Services"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Want to add more Service within same category??
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={()=>{
      me.handleClose()
      me.current_edit = -2
    } } color="primary">
      No
    </Button>
    <Button variant = "contained" onClick={()=>{
      me.temp_service.serviceName = ""
      me.temp_service.perUnitPrice = 0
      me.temp_service.minValue= 0
      me.temp_service.minValueText= "Kgs"
      me.temp_service.minPrice = 0
      me.temp_service.serviceName= ""
      me.temp_service.planStatus= true

me.setState({show_addmore_dialog : false, show_createedit_dialog : true, tableKey : Math.random()})
    
    }} color="primary" autoFocus>
      Yes, AddMore
    </Button>
  </DialogActions>
</Dialog>
)

}

function renderopenmenu(me){

   

    return(



      <Dialog
      open={me.state.openRates}
      onClose={()=>{
        me.setState({openRates : false})
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth = "md"
      fullScreen 
      fullWidth = {true}
    >
      {/* <DialogTitle id="alert-dialog-title">{"Open Rate Card"}</DialogTitle> */}


      <AppBar >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={()=>{
              me.setState({openRates : false})
            }} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
            Open Rate Card
            </Typography>
            
          </Toolbar>
        </AppBar>



      <DialogContent>
        
        <div>
          <div class = "ratecards_search_div">
          <TextField variant = "outlined" label = "Search..." value = {me.ratecard_name_qry} onChange = {(e)=>{
            me.ratecard_name_qry = e.target.value
            me.setState({updatestate : true})
          }} ></TextField>
          </div>
          <div class = "ratecards_main_div">
          {me.state.ratecardlist.map((v)=>{
            if(v.Name.includes(me.ratecard_name_qry)){
              return(
                <Button fullWidth variant = "contained" color = "primary" onClick = {async ()=>{
  
                  me.ratecard = "loading"
                me.setState({openRates : false})
  
  
                await axios.get( Axiosconfig.main + 'ratecard?id=' + v.id, Axiosconfig.config)
                .then((res) => {
                  console.log("RESPONSE RECEIVED:1 ", res);
                  var alpha = []
                  me.ratecard = res.data.data
                  me.temp_ratecard = JSON.parse(JSON.stringify(res.data.data))
  
                  me.setState({updateState : true, tableKey : Math.random()})
                  
                })
                .catch((err) => {
                  console.log("AXIOS ERROR: ", err);
                })
  
      }} >


<div class = "ratecards_main_div_button_div">

  <div>
  {v.Name}
  </div>

  <div>
  {"Total Services : " + v.serviceCount}
  </div>


</div>


      </Button>
              )
            }
          })}
          </div>
        </div>

      </DialogContent>
     
    </Dialog>


      

    )


}

function saveratecard(me){

    me.setState({savingtoserve : true})
    
    if(me.temp_ratecard._id === undefined){
      axios.post(Axiosconfig.main + 'ratecard' , me.temp_ratecard,  Axiosconfig.config)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        me.ratecard = JSON.parse(JSON.stringify(me.temp_ratecard))

        me.alertObj = {type : "success", msg : "Service Successfully Added" , show : true }
        me.setState({updatestate : true, show_addmore_dialog : me.current_edit === -1 ? true : false, show_createedit_dialog : false, savingtoserve : false, tableKey : Math.random()})
        fetchratecard_updateaftersave(me)

      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err.response);
        me.alertObj = {type : "error", msg : err.response.data.message , show : true }
        me.setState({updatestate : true, savingtoserve : false})

      })
    }else{
      axios.put(Axiosconfig.main + 'ratecard?id=' + me.temp_ratecard._id , me.temp_ratecard,  Axiosconfig.config)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        me.ratecard = JSON.parse(JSON.stringify(me.temp_ratecard))
        me.alertObj = {type : "success", msg : "Service Successfully Updated" , show : true }
        me.setState({updatestate : true, show_addmore_dialog :  me.current_edit === -1 ? true : false, show_createedit_dialog : false, savingtoserve : false, tableKey : Math.random()})
        fetchratecard_updateaftersave(me)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err.response);
        me.alertObj = {type : "error", msg : err.response.data.message , show : true }
        me.setState({updatestate : true, savingtoserve : false})
      })
    }
   
    
  


    
   

}

function addservice(me){

    if(!duplicacy_Validation(me)){
      if(me.current_edit === -1){
        var data_temp = JSON.parse(JSON.stringify(me.temp_ratecard))
        me.temp_ratecard.rateCardServices.splice(0,0, me.temp_service)
      
       
        console.log("1", me.temp_ratecard)
        me.temp_ratecard = JSON.parse(JSON.stringify(me.temp_ratecard))
      
        // me.alertObj = {type : "success", msg : "Service Successfully Added" , show : true }
        // me.setState({updatestate : true, show_addmore_dialog : true, show_createedit_dialog : false})
      }else{
        var data_temp = JSON.parse(JSON.stringify(me.temp_ratecard))
        data_temp.rateCardServices[me.current_edit] = me.temp_service
      
       
        console.log("1", me.temp_ratecard)
        me.temp_ratecard = JSON.parse(JSON.stringify(data_temp))
      
        // me.alertObj = {type : "success", msg : "Service Successfully Updated" , show : true }
        // me.setState({updatestate : true, show_createedit_dialog : false})
      }
      
      saveratecard(me)
    }else{

      me.alertObj = {type : "success", msg : "Service with this category already exists" , show : true }
      me.setState({show_createedit_dialog : true})

    }


   

  


  }

function duplicacy_Validation(me){

    var duplicate = false

    me.ratecard.rateCardServices.map((v,ind)=>{
      if((v.mcId.toString() + v.catId.toString() + v.subcatId.toString() + v.serviceName.toString() === me.temp_service.mcId.toString()  + me.temp_service.catId.toString() + me.temp_service.subcatId.toString() + me.temp_service.serviceName.toString()) & (me.current_edit !== ind)){

        duplicate = true
        console.log(v.mcId.toString() + v.catId.toString() + v.subcatId.toString() + v.serviceName.toString())

      }
    })

    return duplicate


}

function rendernewDialog(me){

  if(me.state.shownewDialog){
    
  return(
    <Dialog maxWidth={"md"} fullWidth={true}    open={me.state.shownewDialog} onClose={me.handleClose} TransitionComponent={me.Transition}>
    <AppBar style = {{height : "0"}}>
        <Toolbar>
          <IconButton style = {{backgroundColor : "white"}} color="primary" onClick={me.handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            
          </Typography>
        </Toolbar>
      </AppBar>
      
     <div style = {{marginTop : "0px"}}>
     <NewDialog handler1 = {me.handler1} ratecardlist = {me.state.ratecardlist} />
     </div>
    </Dialog>
  )
  }

}

function renderheaders(me){


    var lookupmc = {}

    me.mothercats_options.map(v=>{
      lookupmc[v._id] = v.mcName
    })

    var lookupcat = {}

    me.primecats_options.map(v=>{
      lookupcat[v._id] = v.catName
    })

    var lookupsubcat = {}

    me.subcats_options.map(v=>{
      lookupsubcat[v._id] = v.subcatName
    })

    var lookupstatus = {
      true : "Active",
      false : "Inactive"
    }




    const headers = [

      {title : "Select", filter : false, sorting : false, width : "10%" ,id : "select", 
      render : rowData =>{
        // console.log(rowData)
        

        return(
         
          <Checkbox 
            checked = {me.ratecard.rateCardServices[me.ratecard.rateCardServices.findIndex(x => x.serviceName === rowData.serviceName)].selected === undefined ? (false) : (me.ratecard.rateCardServices[me.ratecard.rateCardServices.findIndex(x => x.serviceName === rowData.serviceName)].selected)}
            onChange = {(e)=>{
             

                me.ratecard.rateCardServices[me.ratecard.rateCardServices.findIndex(x => x.serviceName === rowData.serviceName)].selected = e.target.checked

              
              me.setState({updateState : true})

            }}
         
            color = "default"
           
        
          />

  
  
        )
      } },

      {title:  "Name", filter : true, sorting : true, width : "12%", id : "serviceName" },

      {title:  "Mother Cat.", filter : true, sorting : false, width : "12%", id : "mcId", lookup : lookupmc }, 

      {title:  "Category", filter : true, sorting : false, width : "12%", id : "catId", lookup : lookupcat }, 

      {title:  "Sub Cat.", filter : true, sorting : false, width : "12%", id : "subcatId", lookup : lookupsubcat }, 
     
      {title:  "Price", filter : false, sorting : true, width : "12%", id : "perUnitPrice" },
      {title:  "Status", filter : true, sorting : false, width : "10%", id : "planStatus", lookup : lookupstatus },

      {title:  "Edit", filter : false, sorting : false, width : "10%", id : "edit",
       render :  rowData=>{
        return(
          <Button onClick = {()=>{

            me.current_edit = me.ratecard.rateCardServices.findIndex(x => x === rowData)
            me.temp_service = JSON.parse(JSON.stringify(me.ratecard.rateCardServices[me.current_edit]))
            me.setState({show_createedit_dialog : true})

          }} ><Icon>create</Icon></Button>
        )
       }
      },



    ]
    
return (
  
<div style = {{ padding : "10px" }}>
<Table key = {me.state.tableKey} data = {me.ratecard.rateCardServices} headers = {headers} label = "Services"  ></Table>
</div>

)

    
}

function createedit_dialog(me){

    if(me.state.show_createedit_dialog){

      return(
        <Dialog  maxWidth={"sm"} fullWidth={true} open={me.state.show_createedit_dialog}
        onClose={me.handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title"> {me.current_edit === -1 ? ("Add Service") : ("Update Service")}</DialogTitle>
            <DialogContent>
  
            <Switch
              defaultChecked={me.temp_service.planStatus}
              onChange={(e)=>{
  
                me.temp_service.planStatus = e.target.checked
           
              }}
              name="checkedB"
              color="primary"
             
            />

<div class = "ratecard_maincont_div">

<Autocomplete id="combo-box-demo" options={me.mothercats_options } getOptionLabel={(option) => option.mcName} style={{ width: "100%" }} 
                    onChange = {(e,v)=>{

                      me.temp_service.catId = undefined
                      if(v === null){

                        me.temp_service.mcId = undefined
                        me.setState({updateState : true})


                      }else{

                        me.temp_service.mcId = v._id
                      me.setState({updateState : true})

                      }


                    }}

                    disableClearable = {true}

                    value = { me.temp_service.mcId === undefined  ? (null) : (
                      me.mothercats_options[me.mothercats_options.findIndex(x => x._id === me.temp_service.mcId)]
                    )}
                    renderInput={(params) => <TextField {...params} label="Mother Category" variant="outlined" />  }
                      />

          <Autocomplete 
           getOptionDisabled = {(option) => option.mcId !== me.temp_service.mcId}

          id="combo-box-demo" options={me.primecats_options } getOptionLabel={(option) => option.catName} style={{ width: "100%" }} 
                    onChange = {(e,v)=>{
                      if(v === null){

                        me.temp_service.catId = undefined
                        me.setState({updateState : true})

                      }else{

                        me.temp_service.catId = v._id
                      me.setState({updateState : true})

                      }
                    }}

                    disableClearable = {true}
                    value = { me.temp_service.catId === undefined  ? (null) : (
                      me.primecats_options[me.primecats_options.findIndex(x => x._id === me.temp_service.catId)]
                    )}
                    renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />  }
                      />

          <Autocomplete id="combo-box-demo" options={me.subcats_options } getOptionLabel={(option) => option.subcatName} style={{ width: "100%" }} 
                    onChange = {(e,v)=>{
                      if(v === null){

                        me.temp_service.subcatId = undefined
                        me.setState({updateState : true})

                      }else{

                        me.temp_service.subcatId = v._id
                      me.setState({updateState : true})

                      }
                    }}

                    disableClearable = {true}
                    value = { me.temp_service.subcatId === undefined  ? (null) : (
                      me.subcats_options[me.subcats_options.findIndex(x => x._id === me.temp_service.subcatId)]
                    )}
                    renderInput={(params) => <TextField {...params} label="Sub Category" variant="outlined" />  }
                      />


<Autocomplete
  
  options={me.masterlistitems}
  getOptionLabel={(option) => option.itemName}
  renderOption = {(option)=>{
    return(
      <div class = "ratecard_masteritem_maindiv" >
        <div class = "ratecard_masteritem_img"><img  src = {option.imgUrl}  /></div>
        <div > {option.itemName} </div>
      </div>
    )
  }}
  style={{ width: "100%" }} 

  onChange = {(e,value)=>{

    me.temp_service.masteritem = value.itemName
    me.temp_service.serviceName = value.itemName
    me.setState({updateState : true})

  }}
  disableClearable = {true}
  value = {me.masterlistitems[me.masterlistitems.findIndex(x => x.itemName === me.temp_service.masteritem)]}
  renderInput={(params) => <TextField  {...params}  variant="outlined" label="Master Items" />}
  />


            <div class = "ratecards_edit_bifur_main_div">
            <TextField style={{ width: "40%" }}  label = "Service Name" variant = "outlined"  value = {me.temp_service.serviceName} onChange = {(e)=>{
              me.temp_service.serviceName = e.target.value
              me.setState({updateState : true})
            }}   />          
  

  <TextField style={{ width: "40%" }}  label = "Unit Price" InputProps={{
    startAdornment: (
      <InputAdornment position="start" variant = "outlined" > Rs. </InputAdornment>
    ),
  }} defaultValue = {me.temp_service.perUnitPrice}  onChange = {(e)=>{

me.temp_service.perUnitPrice = e.target.value

    }} variant = "outlined" type = "number"/>
            </div>

{me.subcats_options[me.subcats_options.findIndex(x => x._id === me.temp_service.subcatId)].subcatName === "Plan"  ?  (
  <div  class = "ratecards_edit_bifur_main_div">
  <TextField style={{ width: "40%" }}   label = "Minimum Qtty" defaultValue = {me.temp_service.minValue}  onChange = {(e)=>{ me.temp_service.minValue = e.target.value
  
  }} variant = "outlined"  type = "number"  InputProps={{
    startAdornment: (
      <InputAdornment position="end" variant = "outlined" >
        <Select   defaultValue = {me.temp_service.minValueText}  onChange = {(e)=>{
  
  me.temp_service.minValueText = e.target.value
  
  }}  >
  <MenuItem value="Kgs">KGS</MenuItem>
  <MenuItem value="Nos">NOS</MenuItem>
  </Select>
      </InputAdornment>
    ),
  }}  />
  
  
  
  
  
  
  
  <TextField style={{ width: "40%" }}  InputProps={{
    startAdornment: (
      <InputAdornment position="start" variant = "outlined" >
        Rs.
      </InputAdornment>
    ),
  }} label = "Additional Price" defaultValue = {me.temp_service.additionalPrice}   onChange = {(e)=>{
  
  me.temp_service.additionalPrice = e.target.value
  
  }} variant = "outlined" type = "number"/>
  </div>
) : (null) }








</div>

  
  
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="secondary" onClick={me.handleClose} >
                Cancel
              </Button>
              <Button disabled = {me.state.savingtoserve} variant="contained"   onClick={async ()=>{

                var alpha = createvalid_props(me)

                var vallogs = Validation(alpha)
                console.log(vallogs)

                if(vallogs.length === 0){

                  addservice(me)

                }else{
                  me.alertObj = {type : "error", msg : vallogs[0] , show : true }
                me.setState({updatestate : true})
                }
  
              }} color="primary">
                {me.current_edit === -1 ? ("Create") : ("Update")}
              </Button>
            </DialogActions>
        </Dialog>
      )

    }else{
      return(
        null
      )
    }


}

function createvalid_props(me){


  var alpha = [
      {
        val : me.temp_service.mcId,
        validators : [{type : "isRequired", value : true}],
        errormsg : "Please Select Mother Category"
      },

      {
        val : me.temp_service.catId,
        validators : [{type : "isRequired", value : true}],
        errormsg : "Please Select Category"
      },

      {
        val : me.temp_service.subcatId,
        validators : [{type : "isRequired", value : true}],
        errormsg : "Please Select Sub Category"
      },

      {
        val : me.temp_service.serviceName,
        validators : [{type : "minStrLen", value : 4}, {type : "maxStrLen", value : 12}],
        errormsg : "Put Service Name between 4 to 12 characters"
      },

      {
        val : me.temp_service.perUnitPrice,
        validators : [{type : "minIntVal", value : 1}],
        errormsg : "Put Positive Price Value for this service"
      },

      {
        val : me.temp_service.masteritem,
        validators : [{type : "isRequired", value : true}],
        errormsg : "Please Select a Master Item"
      },
    ]

    if(me.subcats_options[me.subcats_options.findIndex(x=> x._id === me.temp_service.subcatId)].subcatName === "Plan"){
      alpha.push(
        {
          val : me.temp_service.minValue,
          validators : [{type : "minIntVal", value : 1}],
          errormsg : "Put Positive Value for this service Qtty"
        },
      )

      alpha.push(
        {
          val : me.temp_service.additionalPrice,
          validators : [{type : "minIntVal", value : 1}],
          errormsg : "Put Positive Price Value for additional Price"
        },
      )
    }

    return alpha


  }





export default App;