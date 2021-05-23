import React, {Component} from 'react';


import './loader.css'
var Link = require('react-router').Link






class loader extends Component{


render(){

    return(
        <div style = {{alignSelf : "center", width : "50px"}}><div class = "loader_div_cust">
                         <div class="loader_cust"></div>
                             </div></div>
      )



}

}


export default loader;

