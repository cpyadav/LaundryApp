
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{

        MuiOutlinedInput:{
            input:{
                padding : "0px"
            }
        },
        MuiSelect:{
            outlined:{
                margin : "10px"
            }
        }
        

   

     

   
    },


})

export default theme;