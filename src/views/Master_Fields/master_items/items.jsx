
import Loader from  '../../../APIs/Loader/Loader'
import Alert from  '../../../APIs/Alerts/Alert'
import Axiosconfig from  '../../../Axios/AxiosConfig'
import Validation from  '../../../APIs/Validation/validation'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import Table from '../../../APIs/TablesAPI/Table'

import firebase from '../../../Firebase/firebase'
import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import { Icon, Button, Fab,  Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from '@material-ui/core/Tooltip';
import './items.css'
import upimg from './UploadImage.png'

const axios = require('axios').default;



class create_cat extends Component{

  state = {showdialog : false, uploadingimg : false, issaving : false, showdeletedialog : false}

  data = []
  temp_datapoint = {}
  currentedit = -1
  alertObj = null

  handleClosedelete = ()=>{
    this.setState({showdeletedialog : false})
  }

  

   async componentWillMount(){

    this.setState({dataloaded : false})

    await  axios.get(Axiosconfig.main + 'item',  Axiosconfig.config)
    .then((res) => {
      
      this.data_id = res.data.data[0]._id
      this.data = res.data.data[0].itemList
      this.setState({dataloaded : true})
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

   
    }
  
    render(){

     return(

<div >

             
         
<div class = "masterfields_additem">


<Button onClick = {()=>{
   this.setState({showdialog : true})
   this.temp_datapoint = {
     itemName : "",
     itemShortDes : "",
     imgUrl : "",
     imgRef : ""
   }
}} color = "primary" variant = "contained" >
                    <Icon>add_circle</Icon> Add Item
                  </Button> 


</div>

 {this.state.dataloaded ? (
   renderTable(this)
 ) :(<Loader/>)}
 {renderdialog(this)}

 {showalert(this)}

 {showdeletealert(this)}


      

        </div>
     )
     
     
    }
}

function renderTable(me){

    const headers = [
      {title:  "Item", filter : true,  sorting : true, width : "15%", id : "itemName"},
      {title:  "Image",  width : "15%", id : "img" ,
    
        render : rowData =>{
      return(
        <img src = {rowData.imgUrl} class = "items_img"/>
      )
    }
    
    },
      {title:  " Desc.", width : "20%", id : "itemShortDes" },
      {title:  "Actions", width : "20%", id : "action" ,
    
      render : rowData =>{
    return(
      <div>
        <Button onClick = {()=>{
          
          me.rowDatatodel = rowData
          me.setState({showdeletedialog : true})


        }} ><Icon>delete</Icon></Button>
        <Button onClick = {()=>{

          me.temp_datapoint = JSON.parse(JSON.stringify(rowData))
          me.setState({showdialog : true})
          me.currentedit = me.data.findIndex(x => x === rowData)

         


        }} ><Icon>create</Icon></Button>
      </div>
    )},

      }
    

  
    ]


    return(
      <div style = {{marginTop : "20px"}}>
        {me.state.issaving ? (<Loader/>) : (
          <Table key = {Math.random()}  headers = {headers} data = {me.data} title = "Master Items" ></Table>
        )}
      </div>
    )

}

function showdeletealert(me){

  return(
    <Dialog
        open={me.state.showdeletedialog}
        onClose={me.handleClosedelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Master Item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Master item might be linked to some of your services and orders , Are you sure you want to delete this??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={me.handleClosedelete} color="primary">
            No
          </Button>
          <Button variant = "contained" onClick={()=>{

          var ind_del = me.data.findIndex(x => x === me.rowDatatodel)
                    
          me.temp_datapoint = me.data[ind_del]
          deleteimage(me)
          me.data.splice(ind_del, 1)
          savedata(me)

          me.temp_datapoint = {}

            me.handleClosedelete()
          }} color="primary" autoFocus>
            Yes, Delete this
          </Button>
        </DialogActions>
      </Dialog>
  )


}

async function savedata(me){

    var datatosend = {
      itemList : me.data
    }

    me.setState({issaving : true})

    if(me.data_id === undefined){
      await  axios.post(Axiosconfig.main + 'item', datatosend,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      me.data_id = ""
      me.setState({issaving : false})
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
    }else{
      await  axios.put(Axiosconfig.main + 'item', datatosend,  Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      me.setState({issaving : false})
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
    }

}

function renderdialog(me){

    return(
      <Dialog maxWidth={"sm"} fullWidth={true} open={me.state.showdialog}
      onClose={()=>{
        me.setState({showdialog : false})
        if(me.currentedit === -1){
          deleteimage(me)
        }
        me.temp_datapoint = {}
        me.currentedit = -1
      }} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">Master Item</DialogTitle>
          <DialogContent>

          <TextField  inputProps = {{ maxlength : 12 }}   autoComplete='none' variant="outlined" defaultValue = {me.temp_datapoint === {}  ? "" : me.temp_datapoint.itemName } onChange = {(e)=>{
            me.temp_datapoint.itemName = e.target.value
            
          }} autoFocus  margin="dense" label="Item Name*"  type="text" fullWidth/>
          <TextField inputProps = {{ maxlength : 15 }} onChange = {(e)=>{
            me.temp_datapoint.itemShortDes = e.target.value
           
          }}autoComplete='none' variant="outlined"  autoFocus defaultValue = {me.temp_datapoint  === {}  ? "" : me.temp_datapoint.itemShortDes } margin="dense" label="Item Description"  type="text" fullWidth/>

          <input  style = {{display : "none"}}
        accept="image/*"
        id={"upload_item"}
        multiple
        type="file"
        onChange = {(e)=>{
          uploadfiles(me,e)
        }}
      />
    
    <div class = "upload_main_div">


    <img class = "item_dialog_img" src = {me.temp_datapoint.imgUrl === "" ? (upimg) : (me.temp_datapoint.imgUrl)}  />

    </div>

    <div class = "upload_main_div">


<label htmlFor={"upload_item"}>

{me.state.uploadingimg ? (
<div class = "uploader_but_loader_main_div"> <Loader/></div>
) : (
<div class = "uploader_but_loader_main_div">
<Tooltip  title = {"Upload Image"}>
<Button variant="contained" color="primary" component="span">
<Icon>cloud_upload</Icon>
</Button>
                        </Tooltip>
</div>
)}

</label>

</div>
        
        

          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={()=>{
              me.setState({showdialog : false})
          
            }} >
              Cancel
            </Button>
            <Button variant="contained" onClick = {()=>{

            let alpha = validationpropscreator(me)
            var vallogs = Validation(alpha)

              if(vallogs.length === 0){  //Validation Check

                if(me.data.findIndex(x => x.itemName.toUpperCase() === me.temp_datapoint.itemName.toUpperCase()) === -1 || (me.currentedit !== -1)){      //Duplicacy Check]
                  if(me.currentedit === -1){
                    me.data.push(me.temp_datapoint) 
                    me.setState({showdialog : false})
                    me.temp_datapoint = {}
                    savedata(me)
      
      
                  }else{
                    

                    me.data[me.currentedit] = me.temp_datapoint
                    me.setState({showdialog : false})
                    me.temp_datapoint = {}
                    me.currentedit = -1
                    savedata(me)
                    
                  }
                }else{
                  me.alertObj = {type : "error", msg : "Item Name already Exists", show : true }
                  me.setState({updatestate : true})
                }
                
              }else{
                me.alertObj = {type : "error", msg : vallogs[0], show : true }
                me.setState({updatestate : true})
              }

            }} color="primary">
              {me.currentedit === -1 ? ("Create") : ("Update")}
            </Button>
          </DialogActions>
      </Dialog>
    )

}

function validationpropscreator(me){


    console.log(me.temp_datapoint.itemShortDes)
    return(
      [
        {
          val : me.temp_datapoint.itemName,
          validators : [{type : "minStrLen", value : 4}, {type : "maxStrLen", value : 10}, {type : "isRequired", value : true}],
          errormsg : "Item name should be more than 4 and less than 10 Characters"
        },
  
        {
          val : me.temp_datapoint.itemShortDes,
          validators : [{type : "maxStrLen", value : 20}],
          errormsg : "Description should not be more than 20 chars"
        },
  
        {
          val : me.temp_datapoint.imgUrl,
          validators : [{type : "isRequired", value : true}],
          errormsg : "Please upload image"
        },
  
  
      ]
    )
}

function uploadfiles(me, e, index){

  
    var file = e.target.files[0]
    console.log(e.target)
    me.setState({uploadingimg : true})
    
  
  
    var imagename = Date.now() + file.name
    var storageRef = firebase.storage().ref('MasterItemsList/' + imagename);
    var uploadTask = storageRef.put(file);
  
  
    
  
    uploadTask.on('state_changed', function(snapshot){
      
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      console.log(error);
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      
        if(me.temp_datapoint.imgUrl !== undefined &  me.data.findIndex(x => x.imgUrl === me.temp_datapoint.imgUrl) === -1  ){

          deleteimage(me)
          console.log("Hi am deleting")

        }

        me.temp_datapoint.imgUrl = downloadURL
        me.temp_datapoint.imgRef = imagename
        me.setState({updatestate : true, uploadingimg : false })
        
  
  
      });
    });
  
  
  
  
  
}

function deleteimage(me){

    var storageref = firebase.storage().ref().child('MasterItemsList/' + me.temp_datapoint.imgRef)


    storageref.delete().then(function() {
      console.log("success")
    }).catch(function(error) {
      console.log(error)
    });

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

  
  export default create_cat;


