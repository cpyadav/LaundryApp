import React, { Component } from 'react';
import ManageCustomer from '../../customers/Manage'
import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";
import "./basic.css";


class App extends React.Component {

    selected = (custdata)=>{

        console.log(custdata)
  
        // this.customer = custdata
        // this.handleClose()
        // pushnewAddress(this)
        
      }

    render(){
        return(
            <div className="m-sm-30">
    
             I am basic

             <Button onClick = {()=>{
                 this.props.stepHandler(2)
             }} >Next</Button>

<div class = "MainContainer">

<div class = "SubContainer">
<ManageCustomer parent = "order" selecthandler = {this.selected} ></ManageCustomer>
</div>

<div class = "SubContainer">
hi
</div>


</div>
           
    
    
    
            </div>
        )
    }



}



export default App;