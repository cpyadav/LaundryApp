import React, { Component } from "react";
import {GoogleMap,Marker, Polygon, LoadScript  } from "@react-google-maps/api";
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import Button from "@material-ui/core/Button";
import './Storelocation.css'
import mapstyles from './mapStyles'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';






class create_cat extends Component{

  

  mapoptions = {styles : mapstyles, disableDefaultUI :true }

  mapContainerStyle = {borderRadius : "10px", border : "solid", margin : "20px", height : "60vh", width : "80%"};

  paths = [ ]
      
  options = {fillColor: "lightblue", fillOpacity: 0.3,strokeColor: "blue", strokeOpacity: 1, strokeWeight: 2,clickable: true, draggable: true, editable: true, geodesic: true, zIndex: 1 }
  options2 = {fillColor: "red", fillOpacity: 0.3,strokeColor: "red", strokeOpacity: 1, strokeWeight: 2,clickable: false, draggable: false, editable: false, geodesic: true, zIndex: 1 }

  state = {address : '', markerpos : this.props.storeLocation, center : this.props.storeLocation, updatestate : true, showpolygon : true}

  
  mapref = null

  service_coords = []
  storestoshow = []
  

  



  componentWillMount(){

    console.log(this.props.AllStoresCoords)

    var posi = {
      lat : this.props.data.storeAddress.latitude,
      lng : this.props.data.storeAddress.longitude
    }


    this.setState({markerpos : posi, center : posi})



if(this.props.data.storeCoordinates.length === 0 || this.props.data.storeCoordinates[0].lat === (null) ||  this.props.data.storeCoordinates[0].lng === (null)
|| this.props.data.storeCoordinates[0].lat === (undefined) ||  this.props.data.storeCoordinates[0].lng === (undefined)){

  var posi = {
    lat : this.props.data.storeAddress.latitude,
    lng : this.props.data.storeAddress.longitude
  }

  this.service_coords = [{lat : posi.lat + 0.02, lng : posi.lng - 0.02},{lat : posi.lat + 0.02, lng : posi.lng + 0.02},{lat : posi.lat - 0.02, lng : posi.lng} ]


  this.props.handler3(this.service_coords)




}else{

  this.service_coords = this.props.data.storeCoordinates


}

this.props.AllStoresCoords.map((v)=>{
  this.storestoshow.push(v.StoreName)
})

     
  }

      
  handleChange = address => {
    this.setState({ address });
    };
   
  handleSelect = address => {
    this.setState({updatestate : false})
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => 
          pancenter(latLng, this),
    
        
        )
        .catch(error => console.error('Error', error));

        this.setState({ address });
  

    }

    onEdit = (service_array)=>{

      

      var service_coords2createstore = []
      service_array.map((v,index)=>{
        service_coords2createstore.push({lat : v.lat(), lng : v.lng()})

      })

      console.log(service_coords2createstore)

      this.props.handler3(service_coords2createstore)
    }


  

    onLoad = (polygon) =>{
      polygon.getPath().addListener("set_at", (e)=>{
      
      console.log(5)
       this.onEdit(polygon.getPath().getArray())

      })

      polygon.getPath().addListener("insert_at", (e)=>{
        console.log(5)
        this.onEdit(polygon.getPath().getArray())
 
       })

       polygon.getPath().addListener("remove_at", (e)=>{
        console.log(5)
        this.onEdit(polygon.getPath().getArray())
 
       })
    }

 

render(){

    return (

      <div style = {{height: "100%"}}>
        
<div style = {{padding : "0px" ,height: "100%"}}>

  {/* <Button variant = "contained" color = "primary" onClick = {()=>{

    this.setState({showpolygon : !this.state.showpolygon})

    var posi = {
      lat : this.props.data.storeAddress.latitude,
      lng : this.props.data.storeAddress.longitude
    }
  
    this.service_coords = [{lat : posi.lat + 0.02, lng : posi.lng - 0.02},{lat : posi.lat + 0.02, lng : posi.lng + 0.02},{lat : posi.lat - 0.02, lng : posi.lng} ]
    this.props.handler3(this.service_coords)
    this.setState({updatestate : true})



  }} >{this.state.showpolygon ? ("Remove Polygon") : ("Add Polygon")}</Button> */}


<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} libraries = {["places"]}>

<div  style = {{textAlignLast : "center", height: "90%", display : "flex"}}>

<GoogleMap
       
          id="map"
          mapContainerStyle={this.mapContainerStyle}
          zoom={10}
          center={this.state.center}
          options = {{ scrollwheel : true, mapTypeControl : false, streetViewControl : false, fullscreenControl : true, zoomControl : true  } }
        
          >

          <Marker position = {this.state.markerpos} animation={2} />

           {this.state.showpolygon ? (
              <Polygon onLoad = {this.onLoad} paths={this.service_coords} options={this.options}/>
           ) : (null)}

           {this.props.AllStoresCoords.map((v,ind)=>{
            if(this.storestoshow.includes(v.StoreName)){
              return(
                <Polygon  paths={v.StoreCoords} options={optionsmaker(ind)}/>
              )
            }
           })}
         

      

          {/* <div class = "placesauto" >{placeautocomp(this)}</div> */}
    </GoogleMap>

    <div  style = {{width : "30%"}}>
    {this.props.AllStoresCoords.map((v,ind)=>{
            
            
              return(
                <div style = {{display : "flex" , flexDirection : "row", alignItems : "center", margin : "10px" }}>
                  <div style = {{ width : "20px", height : "20px", backgroundColor : colormaker(ind) , margin : "10px"}} ></div>
                 

<FormControlLabel
        control={
          <Switch
            checked={this.storestoshow.includes(v.StoreName)}
            
            onChange={(e)=>{
            
              if(!this.storestoshow.includes(v.StoreName)){
                this.storestoshow.push(v.StoreName)
              }else{
           
                this.storestoshow.splice(this.storestoshow.findIndex(x => x === v.StoreName), 1)
              }
              this.setState({updatestate : true})

            }}
            name="checkedB"
            color="primary"
            
          />
        }
        label={v.StoreName}
      />


                </div>
              )
            

           })}

    </div>

</div>


  
        

</LoadScript>
</div>


      </div>
    );
}

}


function optionsmaker(ind){

return{fillColor: colormaker(ind), fillOpacity: 0.6,strokeColor: colormaker(ind), strokeOpacity: 1, strokeWeight: 2,clickable: false, draggable: false, editable: false, geodesic: true, zIndex: 1 }


}


function pancenter(latlng, me){
  

  

  var seves = [{lat : latlng.lat + 0.02, lng : latlng.lng - 0.02},{lat : latlng.lat + 0.02, lng : latlng.lng + 0.02},{lat : latlng.lat - 0.02, lng : latlng.lng} ]
  me.service_coords = seves
  
  me.setState({center : latlng})
  this.props.handler3(me.service_coords)
  
  me.setState({updatestate : true})
  

}




function colormaker(ind){

  var r = ind*600 > 255 ? (((ind*600) % 255)) : (ind*600)
  var g = ind*200 > 255 ? (((ind*200) % 255)) : (ind*200)
  var b = ind*10 > 255 ? (((ind*10) % 255)) : (ind*10)

return "rgb(" + r +  "," + g +  "," + b + ")"

}




export default create_cat


