
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{
        MuiButton:{
            root:{
                fontSize : "14px",
                // width : "40%"
            },
            contained:{
                color : deepPurple[500],
               
            }
        },
      

     


     

   
    },


   

})

export default theme;