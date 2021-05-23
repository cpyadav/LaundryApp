
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{

        MuiOutlinedInput:{
            adornedEnd:{
                alignItems : "baseline"
            }
        },
        MuiButton:{
            root:{
                
            }
        },
        MuiFormControl:{
            root:{
                // width : "100%"
            }
        },
        MuiTabs:{
            fixed:{
                overflowX : "scroll !important"
            }
        }
      

       

   
    },

    typography: {
        "fontFamily": `'Montserrat'`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
       },
    

    palette:{
        primary: {
            main: 'rgb(116,103,239)',
            contrastText : 'rgb(255,255,255)',
          },
          secondary: {
              main: 'rgb(255,158,67)',
              contrastText:  'rgb(255,255,255)',
            },

   

}})

export default theme;