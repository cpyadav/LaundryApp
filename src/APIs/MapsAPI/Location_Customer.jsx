import React, { Component } from "react";
import {GoogleMap,Marker, Polygon, LoadScript  } from "@react-google-maps/api";
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import './Storelocation.css'
import mapstyles from './mapStyles'

import   SimpleCard  from '../SimpleCard/SimpleCard';
import Alert from  '../../APIs/Alerts/Alert'
import { Icon, Button, Fab,  Grid, Card, Typography, Dialog} from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const axios = require('axios').default;




class create_cat extends Component{

  

  mapoptions = {styles : mapstyles, disableDefaultUI :true }

  mapContainerStyle = {height: "100%", border : "solid", margin : "20px", height : "300px" };

  paths = [ ]
      
  options = {fillColor: "lightblue", fillOpacity: 0.3,strokeColor: "red", strokeOpacity: 1, strokeWeight: 2,clickable: true, draggable: true, editable: true, geodesic: true, zIndex: 1 }

  state = {address : '', toggle : "Home",  markerpos : {lat : 22, lng : 70}, center : {lat: 22,lng: 70,}, updatestate : true}

  othervalue = ""

  temp_address = {}

  alertObj = null

  handleChange = address => {
    this.setState({ address });
    };


    handleToggleChange = (e,value)=>{

        if(value !== "Home" & value !== "Work"){
            // this.props.Changehandler("addressType", this.othervalue)
            this.temp_address.addressType =  this.othervalue
        }else{
            // this.props.Changehandler("addressType", value)
            this.temp_address.addressType =  value
        }

        this.setState({updatestate : true})


    }
   
  handleSelect = address => {

    this.setState({address : ""})
  
      // this.props.Changehandler("addr2", address)
      this.temp_address.addr2 =  address
      this.setState({updatestate : true})
      geocodeByAddress(address).then(results=>{
        extractcitynstate(results[0].address_components, this)
        getLatLng(results[0]).then(latLng =>{
          pancenter(latLng, this)

        }
  
        )
      }
  
      )
        
  
    }


  componentWillMount(){

    this.temp_address = JSON.parse(JSON.stringify(this.props.data) )
    console.log(this.temp_address)

    if(this.props.data.latitude === "" || this.props.data.latitude === undefined){
        navigator.geolocation.getCurrentPosition((pos)=>{
      
            var posi = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }
        
            this.setState({center : posi, markerpos : posi})
            this.temp_address.latitude = posi.lat
            this.temp_address.longitude = posi.lng
            this.setState({updatestate : true})
        
          })
    }else{
        var posi = {
            lat: this.props.data.latitude,
            lng: this.props.data.longitude
          }
        this.setState({center : posi, markerpos : posi})
    }

    
  }


      

render(){
 
    return (

      <SimpleCard style= {{padding : "30px", height : "100%", paddingBottom : "30px"  }}>

      <div style = {{ display : "flex", flexDirection : "column", height : "100%", justifyContent : "space-between", margin : "10px" }}>
          {this.props.renderAddressType ? (renderAddressType(this)) : (null)}

      <div style = {{ display : "flex", flexDirection : "row"}}>
      {renderTextFields(this)}
      {renderMap(this)}

      </div>

        



      </div>

    

      {showalert(this)}
      </SimpleCard>
    );
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

function renderAddressType(me){
return(
    <div style = {{display : "flex", flexDirection : "row", justifyContent : "space-between" , alignSelf : "center", width : "100%" }}>
    <div style = {{display : "flex", flexDirection : "row", height  : "80px", alignItems : "flex-end" }}>
      <ToggleButtonGroup exclusive value = {me.temp_address.addressType} aria-label="device" onChange = {me.handleToggleChange} >
              <ToggleButton value="Work" aria-label="laptop">
              <Icon >work</Icon>
              </ToggleButton>
              <ToggleButton value="Home" aria-label="tv">
              <Icon >home</Icon>
              </ToggleButton>
              <ToggleButton value="Other" aria-label="phone">
              <Icon >add_location</Icon>
              </ToggleButton>
            </ToggleButtonGroup>
            <div style = {{marginTop : "10px", marginLeft : "5px"}}>
            {(me.temp_address.addressType !== "Home" & me.temp_address.addressType !== "Work") ? (
                <TextField variant = "outlined" label = "Address Name" value = {me.temp_address.addressType} onChange = {(e)=>{
                    me.othervalue = e.target.value
                    // me.props.Changehandler("addressType", e.target.value)
                    me.temp_address.addressType = e.target.value
                    me.setState({updatestate : true})
                }} ></TextField>
            ) : (<div>
              {/* {me.temp_address.addressType} */}
              </div>)  }
  
            </div>
    </div>

            <div style = {{marginLeft : "50px"}}>
 <Button variant = "contained" color = "primary"  onClick = {()=>{
        
        if(me.temp_address.addr1 === "" ||
        me.temp_address.addr2 === "" ||
        me.temp_address.city === "" ||
        me.temp_address.state === ""){
          
          me.alertObj = {type : "error", msg : "Please fill all required fields", show : true }
          me.setState({updatestate : true})


        }else{

          me.props.Changehandler("addr1",me.temp_address.addr1)
        me.props.Changehandler("addr2",me.temp_address.addr2)
        me.props.Changehandler("city",me.temp_address.city)
        me.props.Changehandler("state",me.temp_address.state)
        me.props.Changehandler("landmark",me.temp_address.landmark)
        me.props.Changehandler("pincode",me.temp_address.pincode)
        me.props.Changehandler("latitude",me.temp_address.latitude)
        me.props.Changehandler("longitude",me.temp_address.longitude)
        me.props.Changehandler("addressType",me.temp_address.addressType)

        }

        }} >Save Changes<Icon>near_me</Icon></Button>
 </div>
    </div>
)

}


function renderTextFields(me){


    return(
<div class = "Store_location_textfields" >

        
        
       


<div class = "MapsAPI_Texfield_cont_div">
<TextField disabled = {me.props.disableTextFields} autoComplete='none'  variant="outlined"   margin="dense"  label="Address Line 1*" value = {me.temp_address.addr1} onChange = {(e)=>{
    // me.props.Changehandler("addr1", e.target.value)
    me.temp_address.addr1 = e.target.value
    console.log(me.temp_address)
    me.setState({updatestate : true})
}}   type="text" fullWidth/>
  <TextField  disabled = {true} autoComplete='none'  variant="outlined"    margin="dense" id="name" type="text" value = {me.temp_address.addr2} onChange = {(e)=>{
    // me.props.Changehandler("addr2", e.target.value)
    me.temp_address.addr2 = e.target.value
    me.setState({updatestate : true})
}}    label = "Address Line 2*"  fullWidth/>
  <TextField disabled = {me.props.disableTextFields} autoComplete='none'   variant="outlined"  label = "City*"  value = {me.temp_address.city} onChange = {(e)=>{
    // me.props.Changehandler("city", e.target.value)
    me.temp_address.city = e.target.value
    me.setState({updatestate : true})
}}    margin="dense" id="name" type="text" fullWidth />
  <TextField disabled = {me.props.disableTextFields} autoComplete='none'   variant="outlined"   label = "State*"   value = {me.temp_address.state} onChange = {(e)=>{
    // me.props.Changehandler("state", e.target.value)
    me.temp_address.state = e.target.value
    me.setState({updatestate : true})
}}    margin="dense" id="name"  type="text" fullWidth  />
  <TextField disabled = {me.props.disableTextFields} autoComplete='none'    variant="outlined"   label = "Landmark" value = {me.temp_address.landmark} onChange = {(e)=>{
    // me.props.Changehandler("landmark", e.target.value)
    me.temp_address.landmark = e.target.value
    me.setState({updatestate : true})
}}    margin="dense" id="name"  type="text" fullWidth  />
  <TextField  disabled = {me.props.disableTextFields} autoComplete='none'   variant="outlined"  autoFocus margin="dense" id="name" value = {me.temp_address.pincode} onChange = {(e)=>{
    // me.props.Changehandler("pincode", e.target.value)
    me.temp_address.pincode = e.target.value
    me.setState({updatestate : true})
}}   label="Pin code" type="number" fullWidth/> 
</div>

{me.props.showPlacesAuto === false ? (null) : (
  <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} libraries = {["places"]}>
    
  <div class = "placesauto" >{placeautocomp(me)}</div>

</LoadScript>
)}



                       
     </div>


    )
}

function renderMap(me){


    return(
                
<div style = {{padding : "0px" , width : "70%", height : "90%"}}>




<div  style = {{textAlignLast : "center", height : "100%"}}>
<LoadScript 
googleMapsApiKey={ process.env.REACT_APP_GOOGLE_MAP_API_KEY} 
  libraries = {["places"]}>
<GoogleMap
          id="map"
          mapContainerStyle={me.mapContainerStyle}
     
          zoom={10}
          center={me.state.center}
          options = {{ scrollwheel : true, mapTypeControl : false, streetViewControl : false, fullscreenControl : true, zoomControl : true  } }
          >

          <Marker position = {me.state.markerpos} animation={2} draggable = {!me.props.static} clickable = {!me.props.static}  onMouseUp = {(e)=>{

                // me.props.Changehandler("location", {lat : e.latLng.lat(), lng : e.latLng.lng()} )
                me.temp_address.latitude = e.latLng.lat()
                me.temp_address.longitude = e.latLng.lng()
                me.setState({updatestate : true})
           

                const geocoder = new window.google.maps.Geocoder()

                geocoder.geocode({location : { lat : e.latLng.lat(), lng : e.latLng.lng() }}, (results, status)=>{
                  
            
                  if(status === "OK"){
                    extractcitynstate(results[0].address_components , me)
                    // me.props.Changehandler("addr2",results[0].formatted_address)
                    me.temp_address.addr2 = results[0].formatted_address
                    me.setState({updatestate : true})
                  
                  }
                  
      
                })


          }} />

        
          
    </GoogleMap>
    
</LoadScript>



</div>


  


</div>
    )
}


function extractcitynstate(address,  me){

  var citylist = ['Bhopal', 'Bengaluru', 'Indore', 'Vadodara']
  var statelist = ['Madhya Pradesh', 'Karnataka', 'Gujarat']
  var city = ""
  var state = ""

  address.map(v=>{

    if(statelist.includes(v.long_name)){
     state =  v.long_name
    }
    if(citylist.includes(v.long_name)){
      city = v.long_name
    }

  })

  // me.props.Changehandler("state", state)
  me.temp_address.state = state
  // me.props.Changehandler("city", city)
  me.temp_address.city = city
  me.setState({updatestate : true})

}



function pancenter(latlng, me){


  var seves = [{lat : latlng.lat + 0.02, lng : latlng.lng - 0.02},{lat : latlng.lat + 0.02, lng : latlng.lng + 0.02},{lat : latlng.lat - 0.02, lng : latlng.lng} ]
  me.service_coords = seves

  me.setState({center : latlng, markerpos : latlng})
  // me.props.Changehandler("location" ,latlng)
  me.temp_address.latitude = latlng.lat
  me.temp_address.longitude = latlng.lng
  me.setState({updatestate : true})
}

function placeautocomp(me){

  return(
    <PlacesAutocomplete
    value={me.state.address}
    onChange={me.handleChange}
    onSelect={me.handleSelect}
  >
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div class = "autocomplete_master">
        <input
          id = "inputbox_style" 
          {...getInputProps({
            placeholder: 'Enter Location ...',
            className: 'location-search-input',
            // disabled : me.temp_address.isVirtual
           
          })}
        />
        <div class="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map(suggestion => {
            const className = suggestion.active
              ? 'suggestion-item--active'
              : 'suggestion-item';
            // inline style for demonstration purpose
            const style = suggestion.active
              ? { backgroundColor: '#999999', padding : "5px",  cursor: 'pointer', width : "100%", textAlign : "center" , marginTop : "5px", marginBottom : "0%", borderRadius : "6px", fontSize : "12px" }
              : { backgroundColor: '#888888' ,padding : "5px",cursor: 'pointer' , width : "100%",  textAlign : "center", marginTop : "5px", marginBottom : "0%",borderRadius : "6px", fontSize : "12px"    };
            return (
              <div class = "suggests-space"
                {...getSuggestionItemProps(suggestion, {
                  className,
                  style,
                })}
              >
                <span class = "suggests">{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </PlacesAutocomplete>
  )

}





export default create_cat


