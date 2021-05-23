
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{
        MuiCollapse:{
            wrapperInner:{
                justifyContent : "space between"
            }
        },
        MuiCard:{
            root:{
                margin : "10px"
            }
        },
        MuiOutlinedInput:{
            input:{
                textTransform : "uppercase"
            }
        },
 
        MuiToggleButton:{
            label:{
                // color : "rgb(0,0,0)",
                fontWeight : "600"
               
            },
            "&:selected": {
                // backgroundColor : "rgb(200,0,0)",
                   
                },
        },
        

    
       
        

     

   
    },

  
   })

export default theme;