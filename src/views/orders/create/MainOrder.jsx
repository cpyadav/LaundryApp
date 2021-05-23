import React, { Component } from 'react';
import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";


class App extends React.Component {



    render(){
        return(
            <div className="m-sm-30">
    
             I am Main
    
             <Button onClick = {()=>{
                 this.props.stepHandler(1)
             }} >Prev</Button>

<Button onClick = {()=>{
                 this.props.stepHandler(3)
             }} >Next</Button>
    
    
            </div>
        )
    }



}



export default App;