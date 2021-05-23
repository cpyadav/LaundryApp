import React, { Component } from "react";
import navigations from "./navigations";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import { Icon, Button, Fab,  Grid, Collapse } from "@material-ui/core";
import theme from './theme'
import './sidenav.css';



class App extends Component{

    state = {ishovering :  false, updatestate : true}
    expanded = []


render(){
    return(

        
        <MuiThemeProvider theme = {theme}>

            



            <div onMouseOver = {()=>{
            this.setState({ishovering:  true})
        }} onMouseLeave = {()=>{
            this.setState({ishovering:  false})
        }} class = "SideNav_maindiv">

            <div class = "SideNav_subdiv">

            <Button color = "primary" onClick = {()=>{
                  window.localStorage.setItem("auth_user",  null );
                window.location.href = '/login'
            }} ><Icon>power_settings_new</Icon></Button>
           {
               navigations.map((v,vind)=>{
                return(
              
                <div>
                    <Button color = "primary" href = {v.path} onClick = {()=>{

                        if(this.expanded.includes(vind)){
                            this.expanded.splice(this.expanded.indexOf(vind), 1)
                        }else{
                            this.expanded.push(vind)
                        }

                        this.setState({updatestate : true})
                        
                    }} ><Icon fontSize="small" >{v.icon}</Icon>{ this.state.ishovering ? (
                        <div style = {{ fontSize : "0.8rem" }} >
                            {v.name}
                        </div>
                    ) : (null) }</Button>
                <Collapse in = {this.expanded.includes(vind)}>
                
                {
                    v.children !== undefined ? (
                        v.children.map(chil=>{
                            return(
                                <Button color = "primary" href = {chil.path}  ><Icon>{chil.icon}</Icon>{ this.state.ishovering ? (chil.name) : (null) }</Button>
                            )
                        })
                    ) :(null)
                }

                </Collapse>
                </div>
              
                )
                })
           }

            </div>

             
        </div>
        </MuiThemeProvider>
    )
}

}

export default App;





