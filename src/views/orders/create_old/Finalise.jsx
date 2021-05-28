import React, { Component } from 'react';

import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";

class App extends React.Component {



    render(){
        return(
            <div className="m-sm-30">
    
             I am Finalise

             <Button onClick = {()=>{
                 this.props.stepHandler(2)
             }} >Prev</Button>


    
    
            </div>
        )
    }



}



export default App;