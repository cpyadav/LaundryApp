import React, { Component } from 'react';
// import './App.css';


import { Icon, Button, Fab,  Grid, Card} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import Axiosconfig from  '../../../Axios/AxiosConfig'
import Loader from  '../../../APIs/Loader/Loader'
import SimpleCard from '../../../APIs/SimpleCard/SimpleCard'
import Table from '../../../APIs/TablesAPI/Table'


const axios = require('axios').default;

class App extends Component {




  state = {storedata : null}


master_template = this.currentdata

  async componentWillMount(){
    var count = 0
    await axios.get( Axiosconfig.main + 'store', Axiosconfig.config)
    .then((res) => {
      console.log("RESPONSE RECEIVED:1 ", res);
      this.setState({storedata : res.data.data.store})

      
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }



  render() {

    console.log(window.location.search)

  

    return (
      <div className="m-sm-30">

      



<div style = {{  marginBottom : "-30px",  display : "flex", flexDirection : "row-reverse", justifyContent : "space-between" }}>
           
              <Tooltip TransitionComponent={Zoom} title = {"Add Store"}>
      <Button color="primary" aria-label="Add" href = "/stores/create" variant = "contained" color = "primary" ><Icon>add_circle</Icon>Add Store</Button>
</Tooltip>
  </div>
      <div className="container" style={{height: "100%", marginTop : "0%"}}>
              <div style = {{textAlign : "-webkit-right"}}>



{this.state.storedata === null ? (<Loader></Loader>) : (
 


  <div>
    {renderTable(this)}
  </div>
  
  
  
)}



</div>

    
      </div>
      </div>
     
     
    );
  }
}

function renderTable(me){

  var lookup_Storetype = {

    true : "Virtual",
    false : "Physical"

  }

  var lookup_Storestat = {

    "Active" : "Active",
    "Inactive" : "Inactive"

  }

 var columnsdata_plan = [
    { title: 'Store Name', id: 'storeName' , filter : true, sorting : true, width : "15%"},

    { title: 'Store Code',id: 'storeCode', filter : true, sorting : true, width : "15%"},
    { title: 'Store Type',id: 'isVirtual',  filter : true, sorting: true,width : "15%", lookup : lookup_Storetype },

    { title: 'Status',id: 'storeStatus', filter : true, sorting: true,width : "15%",  lookup : lookup_Storestat},

  { title: 'Profile',id: 'profile', sorting: true,width : "15%",
  render: rowData =>{
    return(
      <div>{(rowData.perCompletion + 1)*20 + "%"}</div>
      )
  }

},

  { title: 'Action',id: 'act', sorting: true,width : "10%",
  render: rowData =>{
    return(<Button href = {'/stores/create?id=' + rowData._id}><Icon>create</Icon></Button>)
  }

},


  ]


  
      return(

        <Table headers = {columnsdata_plan } data = {me.state.storedata} label = "Stores" ></Table>
      
      
      )
     
  
}


export default App;