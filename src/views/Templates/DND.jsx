import React, { Component } from 'react';
import DND from '../../../APIs/DND/DND';


class App extends React.Component {


    
  
    items = [
        {
            id : 1,
            content: ()=>{
                return(
                    <div>Hi am 1</div>
                )
            } 
        },
        {
            id : 2,
            content: ()=>{
                return(
                    <div>Hi am 2</div>
                )
            } 
        },
        {
            id : 3,
            content: ()=>{
                return(
                    <div>Hi am 3</div>
                )
            } 
        },
        {
            id : 4,
            content: ()=>{
                return(
                    <div>Hi am 4</div>
                )
            } 
        },
    ]


    changeHandler = (items_new)=>{
        this.items = items_new
        this.setState({updatestate : true})
    }





render(){
    return(  <DND  items = {this.items} changeHandler = {this.changeHandler} />  )
}

}




 

 export default App;