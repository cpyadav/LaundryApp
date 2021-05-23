import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import './login.css'
import Alert from '../../APIs/Alerts/Alert'
import SimpleCard from '../../APIs/SimpleCard/SimpleCard'
import { Icon, Button, Fab,  Grid, Collapse, TextField, Dialog } from "@material-ui/core";
import axiosconfig from '../../Axios/AxiosConfig'

const axios = require('axios').default;


class App extends Component{

    state = {ishovering :  false, updatestate : true, signing : false}
    expanded = []
    username = "9111111111"
    password = "9222222223"
    alertObj = null
    componentWillMount(){
        window.localStorage.setItem("auth_user",  null );



      




    }

render(){
    return(
        <MuiThemeProvider >
           <div  >

             
             <Dialog  width={"lg"}  fullWidth={true} open = {true}>
                <SimpleCard title = "Sign in">

                    <div class = "login_main_div">
                                    
                        <div><TextField variant = "outlined" defaultValue = {this.username} label = "Username" onChange = {(e)=>{

                            this.username = e.target.value

                        }} /></div>

                        <div>
                        <TextField variant = "outlined" defaultValue = {this.password} label = "Password" type = "password"   onChange = {(e)=>{

                            this.password = e.target.value

                        }} />

                        </div>

                        <Button disabled = {this.state.signing} variant  = "contained" color = "primary" onClick = {async()=>{

                            this.setState({signing : true})

                            await axios.post( axiosconfig.admin  +  'signin', {
                                username: this.username,
                                password: this.password
                            })
                            .then(function (response) {

                                console.log(response)
                                if(response.status === 200){
                                    window.localStorage.setItem("auth_user",  JSON.stringify(response.data.data) );
                                    window.location.href = "/"
                                }else{
                                    this.alertObj = {type : "error", msg : "wrong credentials" , show : true }
                                    this.setState({updatestate : true})
                                    
                                }
                                console.log(JSON.parse(window.localStorage.getItem("auth_user")))

                            

                                
                            }).catch((err) => {

                                console.log(err)
                                

                                this.alertObj = {type : "error", msg : err.response.data.error , show : true }
                                this.setState({signing : false})
                                
                            })

                        }} >{this.state.signing ? "Signing In" : "Submit"}</Button>

                        <Button onClick = {()=>{

                                this.alertObj = {type : "success", msg : "Password Reset link has been sent to your email" , show : true }
                                this.setState({updatestate : true})




                        }} >Forgot Password</Button>
                    </div>


                </SimpleCard>
             </Dialog>




           </div>

           {showalert(this)}
        </MuiThemeProvider>



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

export default App;





