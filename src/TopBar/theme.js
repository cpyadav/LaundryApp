
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{
        MuiButton:{
            root:{
                // fontSize : "14px"
                // height : "100%"
                margin : "5px"
            },
        

        },




},

palette: {
    primary: {
      main: 'rgb(116,103,239)',
      contrastText : 'rgb(255,255,255)',
    },
    secondary: {
        main: 'rgb(255,158,67)',
        contrastText:  'rgb(255,255,255)',
      },
  },

  typography: {
    useNextVariants: true,
    fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
},



})

export default theme;