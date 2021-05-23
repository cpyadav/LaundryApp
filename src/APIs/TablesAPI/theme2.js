import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber, green } from '@material-ui/core/colors'
import { rgbToHex } from "@material-ui/core";


const theme = createMuiTheme({

    overrides:{
        MuiButton:{
            contained:{
                boxShadow : "0"
            },
            root:{
                fontSize : "0.8rem",
                minWidth : "auto",
                width : "fit-content",
                
            }
        },
        MuiFormControl:{
            fullWidth:{
                width : "100%",
            },
            root:{
                backgroundColor : "azure",
                border : "solid",
                borderWidth : "3px",
                borderColor : "#554baa",
                borderRadius : "2px"
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
          fontFamily: ' Montserrat, serif ',
        fontWeight : 600
    },
    

    // palette:{
    //     primary : {
    //         main : "rgb(85,75,170)",
    //         // main : amber[500],
    //     },
    //     secondary : {
    //         main : amber[500],
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