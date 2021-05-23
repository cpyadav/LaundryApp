import React, { Component } from 'react';
import './Table.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import   SimpleCard  from '../SimpleCard/SimpleCard';
import Menu from '@material-ui/core/Menu';
import { Icon, Button, Fab,  Grid, Card, Typography, TextField} from "@material-ui/core";
import { resetWarningCache } from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import theme1 from './theme1'
import theme2 from './theme2'


class App extends Component {

    state = {sortobj : {id : null}, anchorEl : null,  itemscount : 5, start: 1, end : 5, showfilterdoalog : false, data : [], updateState : false}

    handleClose = ()=>{
        this.setState({showfilterdoalog : false, itemscount : 5, start: 1, end : 5})

        flagvisibility(this)
    }

    filter = {}
    lookupmap = {

    }

    color = {
        odd : "white",
        even : "white"
    }


    componentWillMount(){

        if(this.props.color !== undefined){

            this.color = this.props.color

        }

        this.setState({data : this.props.data})
        flagvisibility(this)
    
        this.props.headers.map((v)=>{
            if(v.lookup !== undefined){
                this.lookupmap[v.id] = {}
            }
        })
    
        this.props.headers.map((v)=>{
            if(v.lookup !== undefined){
                Object.keys(v.lookup).map(key=>{
                    this.lookupmap[v.id][key] = true
                })
            }
        })
       
        this.setState({updateState : true})
    
        flagvisibility(this)
    
    
        
    
    }


    render(){
        return(
        
            <SimpleCard title = {this.props.title} >
            <div>
            {/* {renderfilters(this)} */}
            <MuiThemeProvider>{renderLabel(this)}</MuiThemeProvider>
            <MuiThemeProvider theme = {theme1}> {renderheaders(this)}</MuiThemeProvider>
            <MuiThemeProvider theme = {theme1}> {renderhfilters(this)}</MuiThemeProvider>
           
            {renderdata(this)}
            {renderfooter(this)}
            {this.state.showfilterdoalog ? renderfilterdialog(this) : (null)}
        </div>
            </SimpleCard>
        
        )
    }




}

function renderLabel(me){
    return(
    <div  class = "TableAPI_label_div" >{me.props.label}</div>
    )
}

function renderheaders(me){



    return(
        <div class = "TableAPI_header_main_div">
            
            {me.props.headers.map((v,ind)=>{
                return(
                    <div class = "TableAPI_header_sub_div" style = {{width : v.width}} >
                        
                        
                                    <Button  onClick = {()=>{
        
                                        if(v.sorting){
                                            var curobj = me.state.sortobj
        
                                        if(curobj === null){
        
                                            me.setState({sortobj : {id : v.id, type : "up", datatype : v.datatype}})
        
                                        }else{
        
                                            if(curobj.id === v.id){
        
                                                if(curobj.type === "up"){
        
                                                    me.setState({sortobj : {id : v.id, type : "down", datatype : v.datatype}})
        
                                                }else if(curobj.type === "down"){
        
                                                    me.setState({sortobj : {id : null}})
        
                                                }
        
                                            }else{
        
                                                me.setState({sortobj : {id : v.id, type : "up", datatype : v.datatype}})
        
                                            }
        
                                        }
                                        }
        
                                        
                                    
                                    }} color = {me.state.sortobj.id === v.id ? "secondary" : "primary"} >
                                        
                                        {  v.title === undefined ? (
                                            v.titlerender()
                                        ) : (v.title) }

                                        {v.sorting ? (<Icon>import_export</Icon>):(null)}
                                       
                                        </Button>
                                    
                               
                      
                      </div>
                )
            })}

        </div>
    )

}

function renderhfilters(me){



    return(
        <div class = "TableAPI_filter_main_div">
            
            {me.props.headers.map((v,ind)=>{
                return(
                    <div class = "TableAPI_header_sub_div" style = {{width : v.width}} >
                        
                        {v.filter ? 
                        (
                            (v.lookup !== undefined) ? 
                        ( <div> 
                            
                            <Button color = "primary" onClick = {(e)=>{
                                me.setState({anchorEl :  e.currentTarget , targetname : ind})
                            }} ><Icon >keyboard_arrow_down</Icon></Button>



                            <Menu
                            anchorEl={me.state.anchorEl}
                            open={me.state.targetname === ind}
                            
                            onClose = {()=>{
                                me.setState({anchorEl : null, targetname : null})
                            }}>

                            {Object.keys(v.lookup).map((key, ind)=>{
                                return(
                                    <MenuItem>
                                    <Checkbox  checked={me.lookupmap[v.id][key]} onChange = {(e)=>{
                                        me.lookupmap[v.id][key] = !me.lookupmap[v.id][key]
                                        me.setState({showfilterdoalog : false, itemscount : 5, start: 1, end : 5})
                                        flagvisibility(me)
                                       
                                  

                                    }} />
                                    <ListItemText primary = {v.lookup[key]} />
                                </MenuItem>
                                )
                            }) }    

            
          </Menu>




                         </div>) : (
                                <TextField 
    
                            placeholder = "Search..."
                            
                           
                            onChange = {(e)=>{
    
                                me.filter[v.id] = e.target.value
                                me.setState({showfilterdoalog : false, itemscount : 5, start: 1, end : 5})
                                flagvisibility(me)
    
                            }}   />
    
                            )
                 ) : null}
                      </div>
                )
            })}

        </div>
    )

}

function renderdata(me){

    const totalcont = []

    sortdataArray(me)
    var count = 0
    var step1 = 1
    totalcont.push(

        me.state.data.map((v,ind)=>{
            v.visibility ?  count = count + 1 : count  = count
            if(count  >= me.state.start & count <= me.state.end & v.visibility){

                step1 = step1*(-1)

                return(
                    <div style = {{backgroundColor : step1 === 1 ? me.color.even : me.color.odd}}  class = "TableAPI_data_main_div">
    
                    {me.props.headers.map((v1,ind1)=>{

                            if(v1.render !== undefined){
                                
                                return(
                                    <div class = "TableAPI_data_sub_div" style = {{width : v1.width, fontSize : v1.fontSize}} > {v1.render(v)} </div>
                                )

                            }else{
                                
                                if(v1.lookup !== undefined){

                                    return(
                                        <div class = "TableAPI_data_sub_div" style = {{width : v1.width, fontSize : v1.fontSize}} > {v1.lookup[v[v1.id]]} </div>
                                    )

                                }else{
                                    return(
                                        <div class = "TableAPI_data_sub_div" style = {{width : v1.width, fontSize : v1.fontSize}} > {v[v1.id]} </div>
                                    )
                                }
                            }
                           
                                
                            
    
                    })}
    
                </div>
                )
            }

        })


    )

    if(me.state.data.length === 0){

        totalcont.push(<div class = "No_data_text">No Data to display</div>)

    }

    return totalcont

}

function sortdataArray(me){

    var curobj = me.state.sortobj
   
    if(curobj !== null){

        if(curobj.datatype !== "date"){
            var multi = (curobj.type === "up") ? 1 : -1

            me.state.data.sort(function(a, b) {
            var keyA = a[curobj.id],
            keyB = b[curobj.id];

            if (keyA < keyB) return -1*multi;
            if (keyA > keyB) return 1*multi;
            return 0;
      });
        }else{
            var multi = (curobj.type === "up") ? 1 : -1

            me.state.data.sort(function(a, b) {
            var keyA = new Date(a[curobj.id]),
            keyB = new Date(b[curobj.id]);

            if (keyA < keyB) return -1*multi;
            if (keyA > keyB) return 1*multi;
            return 0;
      });
        }
    
    
    }

}

function renderfooter(me){

  


return(
    <MuiThemeProvider theme = {theme2}>
        <div class = "TableAPI_footer_main_div">
        <Button disabled = {me.state.start - me.state.itemscount <= 0} onClick = {()=>{

            if(me.state.start - me.state.itemscount > 0){
                me.setState({start : me.state.start - me.state.itemscount, end : me.state.end - me.state.itemscount})
            }


        }} ><Icon>keyboard_arrow_left</Icon></Button>


        <Button disabled = {me.state.end >= me.state.visiblecount} onClick = {()=>{

document.getElementById("maincontent_scroll_comp").scrollTo(0,0)


if(me.state.end < me.state.visiblecount){
    me.setState({start : me.state.start + me.state.itemscount, end : me.state.end + me.state.itemscount})
}



        }} ><Icon>keyboard_arrow_right</Icon></Button>



<Select  
value = {me.state.itemscount}
onChange = {(e)=>{

me.setState({itemscount : e.target.value, start : 1 , end : e.target.value })

}} variant = "outlined" >
  <MenuItem value={5}>5</MenuItem>
  <MenuItem value={10}>10</MenuItem>
  <MenuItem value={20}>20</MenuItem>
  
</Select>
    </div>
    </MuiThemeProvider>
)

}

function renderfilterdialog(me){

return(
    <Dialog maxWidth={"md"} fullWidth={true}    open={me.state.showfilterdoalog} onClose={me.handleClose} TransitionComponent={me.Transition}>
    <AppBar style = {{height : "0"}}>
        <Toolbar>
          <IconButton style = {{backgroundColor : "white"}} color="primary" onClick={me.handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>

      <div>
          <Typography variant = "button" >Filters</Typography>
      </div>
      
     <div class = "TablesAPI_dialog_main_div">

         {me.props.headers.map((v,ind)=>{
            if(v.filter){
                return(
                 
                    
                         <TextField label={v.title} variant = "outlined" onChange = {(e)=>{

                             me.filter[v.id] = e.target.value

                         }} defaultValue = {me.filter[v.id] === undefined ? ("") : (me.filter[v.id])} ></TextField>
                    
                
             )
            }
         })}
     
     </div>
    </Dialog>
)

}

function flagvisibility(me){

    var data1 = me.props.data
    var visiblecount = 0
    for(let i = 0 ;  i< data1.length ; i++ ){
        data1[i].visibility = checkvisibility(data1[i], me)
        if(data1[i].visibility){
            visiblecount = visiblecount + 1
        }
    }

    me.setState({data : data1, visiblecount : visiblecount})






}

function checkvisibility(a, me){

var visibility = true

me.props.headers.map((v,ind)=>{

    if(v.filter){

            if(me.filter[v.id] !== undefined){

               

                if((a[v.id].toString().toUpperCase()).includes(me.filter[v.id].toString().toUpperCase())){


                }else{


                    visibility = false
                    
                }
            }

            if(v.lookup !== undefined){
            
                if(me.lookupmap[v.id] !== undefined){
                    if(me.lookupmap[v.id][a[v.id]] === false){
                        visibility = me.lookupmap[v.id][a[v.id]]
                    }
                }
        
                
            }
        
    }


})

return visibility

}




export default App;
