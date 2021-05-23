import React, { Component } from 'react';
import { Icon, Button, Fab,  Grid, Typography, Dialog} from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';
import SimpleCard from '../../APIs/SimpleCard/SimpleCard'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import uploaddoc from './../../images/uploaddoc.png'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";


import firebase from './../../Firebase/firebase'

class App extends Component{

   
    Verification_list  = []
    state = {updateState : false }

    
    

    Allroles =  [
        'Pan-Card' ,
       'Adhar-Card' ,
        'Voter-Card' ,
         'Ration-Card',
       'Driving-License' ]
  
componentWillMount(){
 
}

render(){



    return(
        <div style = {{width : "90%", margin : "5%", marginTop : "15px"}}>
          <SimpleCard title = {"Verification Docs"} style = {{width : "90%", margin : "5%", marginTop : "0%", padding : "10px"}}>
              <div style = {{width : "90%", margin : "5%", marginTop : "5px", marginBottom : "0px",  justifyContent : "space-between", display : "flex", flexDirection : "row"}}>

          
              

                <Tooltip TransitionComponent={Zoom} title = {"Add Document"}>
                <Fab color="primary" aria-label="Add" onClick = {(e)=>{

                    this.props.handler2("add")
                  

                        
                    }} ><Icon>add_circle</Icon></Fab>
                </Tooltip>
       

              </div>



              <div style = {{display : "flex", flexDirection :"row", justifyContent : "space-between", flexWrap : "wrap" }}>
              {this.props.dataverifi.map((v,index)=>{
            return(
              
                
             


<Card key = {Math.random()} style = {{width : "40%", padding  : "20px", marginBottom : "20px" }}>
    
       
   
       <Autocomplete
                        options={this.Allroles}
                        getOptionLabel={(option) => option}
                        style={{ width: "100%" }}
                        value = {this.props.dataverifi[index].proofName}
                        onChange = {(e,value) => {
                          this.props.handler2("update", index, "proofName", value)
                        }}
                        renderInput={(params) => <TextField {...params} label="ID Type" variant="outlined" />}
                        />

   

        <div class = "Image_div">

    
        {this.props.dataverifi[index].proofCopy.length === 0 ? (<div > No Image found </div>) :  <AliceCarousel  
        
        disableButtonsControls = {true} dotsDisabled={false} onSlideChanged = {(e)=>{
            console.log(e.item)
          }}
          buttonsDisabled={true} 
      >
  
          { this.props.dataverifi[index].proofCopy.map((v1, ind1)=>{
            console.log(v1.url)
                          return(
                            <div class = "imagenbuttondiv">
                              <div class = "buttondiv" onClick = {()=>{

                                var proofcopy_temp = this.props.dataverifi[index].proofCopy
                                proofcopy_temp.splice(ind1, 1)
                                this.props.handler2("update", index, "proofCopy", proofcopy_temp)

                                var storageref = firebase.storage().ref().child('AllImages/' + v1.ref)


                                storageref.delete().then(function() {
                                  console.log("success")
                                }).catch(function(error) {
                                  console.log(error)
                                });



                              }}>

                                <Tooltip  title = {"Remove this image"}>
                                <Button color = "secondary"><Icon>do_not_disturb_on</Icon></Button>
                                </Tooltip>

                                </div>
                              <img src={v1.url} className="sliderimg"/>
                            </div>
                          )
                        })}
  
          </AliceCarousel>

            }




        </div>

        <TextField style = {{width : "100%"}}  variant="outlined" defaultValue = {this.props.dataverifi[index].proofNumber} 
                        onChange = {(e,value) => {
                          this.props.handler2("update", index, "proofNumber", e.target.value)
                        }} autoFocus  margin="dense" id="name" label="ID Number"  type="text" fullWidth/>
      
      <CardActions>
      
       
      
      <input  style = {{display : "none"}}
        accept="image/*"
        id={"upload_button" + index}
        multiple
        type="file"
        onChange = {(e)=>{
          console.log(index)
          uploadfiles(this, e, index)
        }}
      />
      <label htmlFor={"upload_button" + index}>

      <Tooltip  title = {"Upload Image"}>
      <Button variant="contained" color="primary" component="span">
        <Icon>cloud_upload</Icon>
        </Button>
                                </Tooltip>
  
      </label>
    
      <Tooltip  title = {"Remove Document"}>
        <Button onClick = {()=>{
             this.props.handler2("delete", index)
        }} size="small" color="primary">
        <Icon>delete</Icon>
        </Button>
 </Tooltip>
  
      </CardActions>
    </Card>







             
              
                  )
            

  
        })}
              </div>



          </SimpleCard>

           
          
      </div>



    )
}

}

function uploadfiles(me, e, index){

  
  var file = e.target.files[0];
  


  var imagename = Date.now() + file.name
  var storageRef = firebase.storage().ref('AllImages/' + imagename);
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
      // console.log('File available at', downloadURL);
      var imgurls = me.props.dataverifi[index].proofCopy
      imgurls.push({url : downloadURL, ref :  imagename})
      console.log(index)
      me.props.handler2("update", index,"proofCopy", imgurls )





    });
  });





}



export default App;
