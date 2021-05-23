import React, { Component } from 'react';
import {Icon,Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import   SimpleCard  from '../../APIs/SimpleCard/SimpleCard';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


class App extends Component{


  styles1 = {
    root : {
      backgroundColor : "red"
    }
  }



render(){
    return(
        <div  style = {{marginBottom : "20px" }}>
          <SimpleCard title = "Basic Details">
              
                        <TextField inputProps = {{ maxlength: 15 }}  variant="outlined" value = {this.props.basicdetails.firstName}  onChange = {(e)=>{
                                        this.props.handler1("firstName", e.target.value)
                                    }}  autoFocus margin="dense" label="First Name*" type="text" fullWidth />

                        <TextField  inputProps = {{ maxlength: 15 }}  variant="outlined" value = {this.props.basicdetails.lastName}  onChange = {(e)=>{
                                        this.props.handler1("lastName", e.target.value)
                                    }}  autoFocus margin="dense"  label="Last Name*" type="text" fullWidth/>

                        <TextField value = {this.props.basicdetails.mobileNumber} onChange = {(e)=>{
                                        this.props.handler1("mobileNumber", e.target.value)
                                    }} variant="outlined"  autoFocus  margin="dense"  label="Mobile*" type="number" fullWidth/>

                        <TextField  value = {this.props.basicdetails.email} onChange = {(e)=>{
                                        this.props.handler1("email", e.target.value)
                                    }} variant="outlined"  autoFocus  margin="dense" label="Email" type="text" fullWidth/>

                        
                          

                      <TextField  value = {this.props.basicdetails.dob}  onChange = {(e)=>{
                            var alapsd = new Date(e.target.value)
                            
                          
                            this.props.handler1("dob", e.target.value)
                        }} variant="outlined"  autoFocus  margin="dense" id="name" label = "Date of Birth"  type="date" fullWidth />




                      
                      <TextField  value = {this.props.basicdetails.referarCode} onChange = {(e)=>{
                            this.props.handler1("referarCode", e.target.value)
                        }} variant="outlined"  autoFocus  margin="dense" id="name" label="Referar Code" type="text" fullWidth defaultValue = "XXXX-XX-XX" />

                      <div style = {{width : "100%", textAlignLast : "center", marginTop : "10px"}}>
                      <ToggleButtonGroup classes = {{
                        root : this.styles1.root
                      }} exclusive  value={this.props.basicdetails.gender} onChange={(e,value)=>{

                          this.props.handler1("gender", value)

                          }} aria-label="device">
                                <ToggleButton value="Male" aria-label="laptop">
                                Male
                                </ToggleButton>
                                <ToggleButton value="Female" aria-label="tv">
                                Female
                                </ToggleButton>
     
                      </ToggleButtonGroup>
                     </div>
          </SimpleCard>

          </div>
      
    )
}

}

export default App;