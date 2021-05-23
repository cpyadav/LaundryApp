
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{
       
        MuiFormControl:{
            root:{
                minWidth : "30%",
            }
        },
        MuiInputBase:{
            input:{
                fontSize : "15px",
                
            }
        },

   
   
    },

 
    

    palette:{
        primary : {
            main : deepPurple[500],

            
        },
        secondary : {
            main : amber[500],
            contrastText : "rgb(255,0,0)",
         
            
            
        },
        alpha :{
            main : amber[500],
            contrastText : "rgb(255,0,0)",
            font : "rgb(255,0,0)",
        }
    },

    typography: {
        button: {
          fontSize: 20, // works
          color: "rgb(255,0,0)",
        }

}})

export default theme;