
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{

        MuiButton:{
            root:{
                alignSelf : "self-start",
                width : "100%",
                placeContent : "normal",
                margin : "0px",
                marginTop : '5%',
                height : "40px",
                fontSize : "0.8rem"
            }
        }
       


   
    },

    palette: {
        primary: {
          main: 'rgb(255,255,255)'
        },
        secondary: {
            main: 'rgb(60,120,180)'
          },
      },


      typography: {
        useNextVariants: true,
        fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
    },





})

export default theme;