import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Icon, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CardActions from '@material-ui/core/CardActions';
import SimpleCard from '../../APIs/SimpleCard/SimpleCard'
import uploaddoc from './../../images/uploaddoc.png'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Tooltip from '@material-ui/core/Tooltip';


import firebase from './../../Firebase/firebase'


class App extends React.Component {

    Allroles =  [
        { title: 'Store Boy' },
        { title: 'Store Owner' },
        { title: 'Delivery Boy' }]

  componentWillMount(){


    
  }


    render(){
        return(

            <div>
                <div style = {{width : "90%", margin : "5%", marginTop : "15px"}}>
                      <SimpleCard title = {"Bank Details"} style = {{width : "90%", margin : "5%", marginTop : "0%"}}>
        <div style = {{width : "90%", margin : "5%", marginTop : "0%"}}>



<Grid container spacing={4}>
    <Grid item lg={6} md={6} sm={12} xs={12}>
    <TextField  variant="outlined"  autoFocus defaultValue = {this.props.databank.accHolder} onChange = {(e)=>{
      this.props.handler3("accHolder", e.target.value)
    }} 
    margin="dense" id="name" label="Account Holder Name"    type="text" fullWidth/>
    <TextField  variant="outlined"   onChange = {(e)=>{
      this.props.handler3("bankName", e.target.value)
    }}  autoFocus defaultValue = {this.props.databank.bankName}  margin="dense" id="name" label="Bank Name"  type="text" fullWidth/>
    <TextField   variant="outlined"   onChange = {(e)=>{
      this.props.handler3("bankNumber", e.target.value)
    }}  autoFocus defaultValue = {this.props.databank.bankNumber}  margin="dense" id="name" label="Account Number"  type="text" fullWidth/>
    <TextField   variant="outlined"   onChange = {(e)=>{
      this.props.handler3("bankIfsc", e.target.value)
    }}  autoFocus defaultValue = {this.props.databank.bankIfsc}  margin="dense" id="name" label="IFSC"  type="text" fullWidth/>
    <TextField   variant="outlined"   onChange = {(e)=>{
      this.props.handler3("upiId", e.target.value)
    }}  autoFocus defaultValue = {this.props.databank.upiId}  margin="dense" id="name" label="UPI ID"  type="text" fullWidth/>
     

     
    </Grid>
    <Grid item lg={6} md={6} sm={12} xs={12}>
    <Card style = {{width : "10s0%", padding  : "20px", marginBottom : "20px" }}>
    
       

    <div class = "Image_div">

    
{this.props.databank.bankCopy.length === 0 ? (<img  src = {uploaddoc}></img>) :  <AliceCarousel  

disableButtonsControls = {true} dotsDisabled={false} onSlideChanged = {(e)=>{
  
  }}
  buttonsDisabled={true} 
>

  { this.props.databank.bankCopy.map((v1, ind1)=>{

                  return(
                    <div class = "imagenbuttondiv">
                      <div class = "buttondiv" onClick = {()=>{

                        var proofcopy_temp = this.props.databank.bankCopy
                        proofcopy_temp.splice(ind1, 1)
                        this.props.handler3("bankCopy", proofcopy_temp)

                        var storageref = firebase.storage().ref().child('AllImages/' + v1.ref)


                        storageref.delete().then(function() {
                          console.log("success")
                        }).catch(function(error) {
                          console.log(error)
                        });



                      }}><Tooltip  title = {"Remove this image"}>
                      <Button color = "secondary"><Icon>do_not_disturb_on</Icon></Button>
                      </Tooltip></div>
                      <img src={v1.url} className="sliderimg"/>
                    </div>
                  )
                })}

  </AliceCarousel>

    }




</div>


<CardActions>



<input  style = {{display : "none"}}
accept="image/*"
id={"upload_button"}
multiple
type="file"
onChange = {(e)=>{
 
  uploadfiles(this, e)
}}
/>
<label htmlFor={"upload_button"}>
<Button variant="contained" color="primary" component="span">
<Icon>cloud_upload</Icon>
</Button>
</label>



</CardActions>
    </Card>
  
    
    </Grid>

    
  </Grid>

  

 
  


</div>
        </SimpleCard>
          </div>
            </div>

        )
    }


}


function uploadfiles(me, e){


  var file = e.target.files[0];
  


  var imagename = Date.now() + file.name
  var storageRef = firebase.storage().ref('AllImages/' + imagename);
  var uploadTask = storageRef.put(file);


  

  uploadTask.on('state_changed', function(snapshot){
    
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        // console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        // console.log('Upload is running');
        break;
    }
  }, function(error) {
    console.log(error);
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    
      var imgurls = me.props.databank.bankCopy
      imgurls.push({url : downloadURL, ref :  imagename})
      
      me.props.handler3("bankCopy", imgurls )





    });
  });





}


export default App;