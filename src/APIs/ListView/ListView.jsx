import React, { Component } from 'react';
import './listview.css'


class App extends Component {

    render(){
        return(


            <div class = "listview_main_div">
               { renderFinal(this)}
            </div>


        )
    }

}

function renderFinal(me){

    const datacont = []


    me.props.header.map((v, index)=> {

           datacont.push(
                <div style = {{fontSize : me.props.font === undefined ? ("14px") : (me.props.font) }} >
                    <div style = {{width : "40%"}}>{v.Label + " : "}</div>
                    <div style = {{width : "40%"}}>{me.props.data[v.id]}</div>
                    
                </div>
            )
        
      });


      return datacont
      


}


export default App;
