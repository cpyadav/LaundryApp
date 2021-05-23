import React, { Component } from 'react';
import { Icon, Button, Fab,  Grid, Card, Typography, Dialog} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import   SimpleCard  from '../../APIs/SimpleCard/SimpleCard';
import Loader from  '../../APIs/Loader/Loader'
import Alert from  '../../APIs/Alerts/Alert'
import Axiosconfig from  '../../Axios/AxiosConfig'
import Validation from  '../../APIs/Validation/validation'
import Zoom from '@material-ui/core/Zoom';
import MapLocation from '../../APIs/MapsAPI/Location_Customer'
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

class App extends Component{

    constructor(props) {
        super(props)
    
        this.handler = this.handler.bind(this)
      }
    
      handler(key,  value){

       console.log(key, value)

      this.props.handler2(null, "update", this.currentaddress - 1, key, value)

      if(key === "addressType"){
        this.props.handler3()
      this.setState({edit_address : false})
      }

      

        
      }

    currentaddress = 0
    state = {updateState : false, edit_address : false , address :  ""}
    alertObj = null

handleChange=(e,v)=>{
    
    this.currentaddress = v
    this.setState({updateState : true})
}

componentDidMount(){

   
}

handleClose = ()=>{
        if(this.props.addressList[this.currentaddress-1].addr1 === "" ||
        this.props.addressList[this.currentaddress-1].addr2 === "" ||
        this.props.addressList[this.currentaddress-1].city === "" ||
        this.props.addressList[this.currentaddress-1].state === "" ){

            this.props.handler2(null, "remove", this.currentaddress-1)
                  this.currentaddress = 0
                  this.alertObj = null

          //         this.alertobj = {type : "error", msg : "Please fill all required fields", show : true }
          this.setState({edit_address : false})

        }else{
      
          this.setState({edit_address : false})
        }

        

 
    
}


render(){

    return(
      <div  style = {{marginBottom : "20px"}}>
      <SimpleCard title = "Addresses">
          
              <div style = {{width : "90%", margin : "5%", marginTop : "5px", marginBottom : "0px",  justifyContent : "space-between", display : "flex", flexDirection : "row"}}>

          

                <Tooltip TransitionComponent={Zoom} title = {"Add Address"}>
                <Fab color="primary" aria-label="Add" onClick = {(e)=>{
                        this.props.handler2({addr1 : "", addr2 : "", city : "", state : "", latitude : undefined, longitude : undefined, addressType : "Work", status : "Active", pincode : "", landmark : ""}, "add")
                        this.currentaddress = this.props.addressList.length
                        this.setState({edit_address : true})
                    }} ><Icon>add_circle</Icon></Fab>
                </Tooltip>
       

              </div>

              <div style = {{display : "flex", flexDirection :"row", justifyContent : "space-between", flexWrap : "wrap" }}>
              {this.props.addressList.map((v,index)=>{
            
            return(
                
              <div class = "create_cust_indi_address_div">
             
                

                  {
                        (() => {
                            
                            switch (this.props.addressList[index].addressType.substring(0,4)){
                                case "Home":
                                    return (<Button variant = "contained" color = "primary" size = "small" ><Icon style = {{height : "20px"}} >home</Icon>Home</Button>);
                                    break;
                                case "Work":
                                    return (<Button  variant = "contained" color = "primary" size = "small"><Icon style = {{height : "20px"}} >work</Icon>Work</Button>);
                                    break;
                                default:
                            return (<Button  variant = "contained" color = "primary" size = "small"><Icon style = {{height : "20px"}} >add_location</Icon> {this.props.addressList[index].addressType}</Button>);
                                    break;    
                            }
                                
                            
                        })()
                    }



                 <Typography style = {{fontSize : "12px",  marginTop : "15px" }} >{this.props.addressList[index].addr1 || ""}</Typography>
                 <Typography style = {{fontSize : "12px"}} >{this.props.addressList[index].addr2 || ""}</Typography>
                 <Typography style = {{fontSize : "12px"}} >{this.props.addressList[index].city || ""}</Typography>
                 
             

              <div style = {{textAlign : "-webkit-center", justifyContent : "space-around" , display : "flex" }}>
              <Tooltip title = "Remove">
              <Button variant = "text" color = "primary" onClick = {(e)=>{
                  this.props.handler2(null, "remove", index)
                  this.currentaddress = 0
              }} >
             Delete
             </Button>
              </Tooltip>
             <Tooltip title = "Edit">
             <Button variant = "text" color = "primary" onClick = {(e)=>{
                  this.currentaddress = index + 1
                  this.setState({edit_address : true })
              }} >
             Edit
             </Button>
             </Tooltip>
              </div>

            
            
              </div>
              
                  )
            

  
        })}
              </div>



              
     
      </SimpleCard>
      {renderAddressDialog(this)}
      {showalert(this)}
      </div>
      

     
  


    )
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

function renderAddressDialog(me){
    if(me.props.addressList[me.currentaddress-1] !== undefined){
        return(
            <Dialog maxWidth={"md"} fullWidth={true}  open={me.state.edit_address} onClose={me.handleClose}>

{/* <IconButton  style = {{backgroundColor : "white"}} color="primary" onClick ={me.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton> */}

<AppBar style = {{height : "0"}}>
          <Toolbar>
            <Tooltip title = "close">
            <IconButton  style = {{backgroundColor : "white"}} color="primary" onClick={me.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            </Tooltip>
            
          </Toolbar>
        </AppBar>

<MapLocation data = {me.props.addressList[me.currentaddress-1]} static = {false} renderAddressType = {true} Changehandler = {me.handler} disableTextFields = {false} />




 
</Dialog>
        )
    }else{
        return null
    }
}




export default App;
