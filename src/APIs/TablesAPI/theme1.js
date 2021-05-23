import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber, green } from '@material-ui/core/colors'
import { rgbToHex } from "@material-ui/core";


const theme = createMuiTheme({

    overrides:{
        MuiButton:{
            contained:{
                // color : deepPurple[500],
                // backgroundColor : "rgb(255,0,0)"
            },
            root:{
                fontSize : "13px",
                minWidth : "auto",
                width : "100%",
                fontFamily : "Montserrat, serif",
                fontWeight : "800",

                
            },
            label:{
                justifyContent : "flex-start"
            }
        },
        MuiFormControl:{
            fullWidth:{
                width : "100%",
            },
            root:{
                backgroundColor : "azure"
            }
        },
        MuiInputBase:{
            input:{
                fontSize : "13px",
                backgroundColor:  "white",
                
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

    palette: {
        primary: {
          main: 'rgb(0,0,0)',
          contrastText : 'rgb(255,255,255)',
        },
        secondary: {
            main: 'rgb(0,0,0)',
            contrastText:  'rgb(255,255,255)',
          },
      },

      typography: {
        useNextVariants: true,
          fontFamily: ' Montserrat, serif ',
        fontWeight : 600
    },
    

    // palette:{
    //     primary : {
    //         main : "rgb(0,0,0)",
    //         // main : "rgb(255,255,255)",
    //     },
    //     secondary : {
    //         main : "rgb(0,0,255)",
    //         contrastText : "rgb(0,0,0)",
            
            
    //     },
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
    // },

//     typography: {
//         button: {
//           fontSize: 20, // works
//           color: "rgb(255,0,0)",
//         }

// }

})

export default theme;