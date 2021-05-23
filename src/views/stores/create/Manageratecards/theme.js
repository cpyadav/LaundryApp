import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber, green } from '@material-ui/core/colors'


const theme = createMuiTheme({

    overrides:{
        MuiButton:{
            contained:{
                color : deepPurple[500],
                width : "100%"
            },
            root:{
                fontSize : "14px",
                marginRight : "20px"
            }
        },
        MuiFormControl:{
            fullWidth:{
                width : "100%",
            }
        },
        MuiInputBase:{
            input:{
                fontSize : "13px",
                
            }
        },

        MuiSvgIcon:{
            fontSizeSmall:{
                fontSize : "0px"
            }
        },

        MuiAutocomplete:{
            root:{
                width : "100%"
            }
        },
        MuiSelect:{
            outlined:{
                padding : "10px"
            }
        },
        // MuiIconButton:{
        //     root:{
        //         backgroundColor : "white"
        //     }
        // }

       
    },
    

    palette:{
        primary : {
            main : deepPurple[500],
        },
        secondary : {
            main : amber[500],
            contrastText : "rgb(0,0,0)",
            
            
        },
        // info:{
        //     main : deepPurple[500],
        // },
        // offline:{
        //     main : amber[500],
        // },
        // alpha :{
        //     main : amber[500],
        //     contrastText : "rgb(255,0,0)",
        //     font : "rgb(255,0,0)",
        // }
    },

    typography: {
        button: {
          fontSize: 20, // works
          color: "rgb(255,0,0)",
        }

}})

export default theme;