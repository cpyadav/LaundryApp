import React, { Component } from "react";
import {GoogleMap,Marker, Polygon, LoadScript  } from "@react-google-maps/api";
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import './Storelocation.css'
import mapstyles from './mapStyles'
import Axiosconfig from  '../../Axios/AxiosConfig'
import   SimpleCard  from '../SimpleCard/SimpleCard';
import { Icon, Button, Fab,  Grid, Card, Typography, Dialog} from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';
const axios = require('axios').default;




class create_cat extends Component{

  

  mapoptions = {styles : mapstyles, disableDefaultUI :true }

  mapContainerStyle = {height: "100%", border : "solid", margin : "20px", height : "400px" };

  paths = [ ]
      
  options = {fillColor: "lightblue", fillOpacity: 0.3,strokeColor: "red", strokeOpacity: 1, strokeWeight: 2,clickable: true, draggable: true, editable: true, geodesic: true, zIndex: 1 }

  state = {address : '', toggle : "Home",  markerpos : {lat : 22, lng : 70}, center : {lat: 22,lng: 70,}, updatestate : true}

  othervalue = ""

   citylist = ['Bhopal', 'Bengaluru', 'Indore', 'Vadodara']
   statelist = ['Madhya Pradesh', 'Karnataka', 'Gujarat', "Delhi", "Telangana", "Maharashtra", "Tamil Nadu", "Kerala", "Rajasthan", "Uttar Pradesh", "Andhra Pradesh", "West Bengal"]

  handleChange = address => {
    this.setState({ address });
    };


    handleToggleChange = (e,value)=>{

        if(value !== "Home" & value !== "Work"){
            this.props.Changehandler("addressType", this.othervalue)
        }else{
            this.props.Changehandler("addressType", value)
        }


    }
   
  handleSelect = address => {

    this.setState({address : ""})
  
      this.props.Changehandler("addr2", address)
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

     axios.get( Axiosconfig.main + 'city', Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res.data.data.cities);
      this.citylist = res.data.data.cities
      this.setState({updatestate:  true})
      
       
   
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
    

    if(this.props.data.latitude === "" || this.props.data.latitude === undefined){
        navigator.geolocation.getCurrentPosition((pos)=>{
      
            var posi = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }
        
            this.setState({center : posi, markerpos : posi})
            this.props.Changehandler("location", posi)
        
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

    

      </SimpleCard>
    );
}

}


function renderAddressType(me){
return(
    <div style = {{display : "flex", flexDirection : "row" }}>
    <ToggleButtonGroup exclusive value = {me.props.data.addressType} aria-label="device" onChange = {me.handleToggleChange} >
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
            {(me.props.data.addressType !== "Home" & me.props.data.addressType !== "Work") ? (
                <TextField value = {me.props.data.addressType} onChange = {(e)=>{
                    me.othervalue = e.target.value
                    me.props.Changehandler("addressType", e.target.value)
                }} ></TextField>
            ) : (<div>{me.props.data.addressType}</div>)  }
  
            </div>
    </div>
)

}


function renderTextFields(me){

  console.log(me.citylist[me.citylist.findIndex(x => x.cityName === me.props.data.city)])

    return(
<div class = "Store_location_textfields" >

        
        
       


<div class = "MapsAPI_Texfield_cont_div">
<TextField disabled = {me.props.disableTextFields} autoComplete='none'  variant="outlined"   margin="dense" id="name" label="Address Line 1*" value = {me.props.data.addr1} onChange = {(e)=>{
    me.props.Changehandler("addr1", e.target.value)
}}   type="text" fullWidth/>
  <TextField  disabled = {true} autoComplete='none'  variant="outlined"    margin="dense" id="name" type="text" value = {me.props.data.addr2} onChange = {(e)=>{
    me.props.Changehandler("addr2", e.target.value)
}}    label = "Address Line 2*"  fullWidth/>
  
 


<Autocomplete disabled = {me.props.disableTextFields} id="combo-box-demo" options={me.statelist } 
getOptionLabel={(option) => option} 
onChange = {(e,v)=>{
  me.props.Changehandler("state", v)
}}
value = {me.props.data.state}
renderInput={(params) => <TextField {...params} label="State" variant="outlined" />  }
/>

<Autocomplete disabled = {me.props.disableTextFields} key = {Math.random()} id="combo-box-demo" options={me.citylist } 
getOptionLabel={(option) => option.cityName} 
onChange = {(e,v)=>{
  me.props.Changehandler("city", v.cityName)
}}
value = {me.citylist[me.citylist.findIndex(x => x.cityName === me.props.data.city)]}
renderInput={(params) => <TextField {...params} label="City" variant="outlined" />  }
/>


  <TextField disabled = {me.props.disableTextFields} autoComplete='none'    variant="outlined"   label = "Landmark" value = {me.props.data.landmark} onChange = {(e)=>{
    me.props.Changehandler("landmark", e.target.value)
}}    margin="dense" id="name"  type="text" fullWidth  />
  <TextField  disabled = {me.props.disableTextFields} autoComplete='none'   variant="outlined"  autoFocus margin="dense" id="name" value = {me.props.data.pincode} onChange = {(e)=>{
    me.props.Changehandler("pincode", e.target.value)
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
<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} libraries = {["places"]}>
<GoogleMap
          id="map"
          mapContainerStyle={me.mapContainerStyle}
     
          zoom={10}
          center={me.state.center}
          options = {{ scrollwheel : true, mapTypeControl : false, streetViewControl : false, fullscreenControl : true, zoomControl : true  } }
          >

          <Marker position = {me.state.markerpos} animation={2} draggable = {!me.props.static} clickable = {!me.props.static}  onMouseUp = {(e)=>{

                me.props.Changehandler("location", {lat : e.latLng.lat(), lng : e.latLng.lng()} )
           

                const geocoder = new window.google.maps.Geocoder()

                geocoder.geocode({location : { lat : e.latLng.lat(), lng : e.latLng.lng() }}, (results, status)=>{
                  
            
                  if(status === "OK"){
                    extractcitynstate(results[0].address_components , me)
                    me.props.Changehandler("addr2",results[0].formatted_address)
                  
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

  
  var city = ""
  var state = ""

  address.map(v=>{

    if(me.statelist.includes(v.long_name)){
     state =  v.long_name
    }
    // if(me.citylist.includes(x => x.cityName === v.long_name)){
    //   city = v.long_name
    // }

    me.citylist.map(v1=>{

      console.log(v1.cityName)
      console.log(v.long_name)

       if(v1.cityName === v.long_name){
      city = v.long_name
    }

    })

  })

  me.props.Changehandler("state", state)
  me.props.Changehandler("city", city)


}



function pancenter(latlng, me){


  var seves = [{lat : latlng.lat + 0.02, lng : latlng.lng - 0.02},{lat : latlng.lat + 0.02, lng : latlng.lng + 0.02},{lat : latlng.lat - 0.02, lng : latlng.lng} ]
  me.service_coords = seves

  me.setState({center : latlng, markerpos : latlng})
  me.props.Changehandler("location" ,latlng)

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
            // disabled : me.props.data.isVirtual
           
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


