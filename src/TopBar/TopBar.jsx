import React, { Component } from "react";
import "./topbar.css"
import theme from './theme'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import { Icon, Button, Fab,  Grid, Collapse } from "@material-ui/core";




class App extends Component{

    state = {ishovering :  false, updatestate : true}
    expanded = []


render(){
    return(

        <div class = "topbar_main_div">

    <MuiThemeProvider theme = {theme}>
    <Button variant  = "contained" color = "secondary">{"Welcome " + JSON.parse(window.localStorage.getItem("auth_user")).firstName}</Button>
    </MuiThemeProvider>

        </div>

    )}

}

 export default App;

