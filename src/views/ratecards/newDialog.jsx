import React, { Component } from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Icon, Button, Fab,  Grid, Card, MuiThemeProvider, Typography} from "@material-ui/core";
import Axiosconfig from  '../../Axios/AxiosConfig'
const axios = require('axios').default;



class App extends Component {

    state = { selectfromexist : true,  }
    ratecardlist = this.props.ratecardlist
    rateCardName = ""
    templateId = null




  


    render(){
        return(

            <div style = {{textAlign : "-webkit-center", margin : "20px", display : "flex", flexDirection : "column"}}>

            <Typography>Create New Rate Card</Typography>

            <div style = {{display : "flex", flexDirection  : "row", alignItems : "center" }}>
            <Switch  checked = {this.state.selectfromexist} onChange = {(e)=>{

                if(!e.target.checked){
                    this.templateId = null
                }

                this.setState({selectfromexist : e.target.checked})

            }} color="primary"/>

            <Typography>{this.state.selectfromexist  ?  "Choose a Rate Card to Start with" : "Start with an Empty Rate Card"}</Typography>
            </div>

            { this.state.selectfromexist  ? (<Autocomplete
                          
                          options={this.ratecardlist}
                          getOptionLabel={(option) => option.Name}
                          style = {{width  : "40%", margin : "15px"}}
                        //   value = {me.mothercats_options[me.mothercats_options.findIndex(x => x.id === v.mcId)]}
                            onChange = {(e,v)=>{
                                this.templateId = v.id
                            }}
                          renderInput={(params) => <TextField  {...params}  label="Select from these Rate Cards" variant="outlined" />}
                       />
           )  : (null)}


           <TextField placeholder = "Name the Rate Card"  style = {{width  : "40%", margin : "15px"}} variant = "outlined" onChange = {(e)=>{
               this.rateCardName = e.target.value
           }}   />

           <Button onClick = {()=>{

                this.props.handler1(this.rateCardName, this.templateId)

           }} > Create </Button>
            


            </div>


        )
    }


}

export default App