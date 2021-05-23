
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{

        MuiButton:{
            root:{
                alignSelf : "self-start",
                width : "fit-content",
                placeContent : "normal",
                fontWeight : "500",
                fontFamily: ' Montserrat, serif ',
                fontSize : "0.7rem"
            },

            label:{
                justifyContent : "space-around",
                fontWeight : 500
            }
    
        },

        MuiTabs :{
            flexContainer:{
               
                flexDirection : "row",
                display : "flex",
                // justifyContent : "space-around",
                // backgroundColor : "rgb(200,200,200)",
                borderRadius : "5px"


            },
           
        },

        MuiTab : {


            root: {
                textTransform: "none",
                "&:hover": {
                //   backgroundColor: "rgb(240,240,240)",
                //   color: "rgb(240,240,240)"
               
                },
                "&$selected": {
                //   backgroundColor: "primary",
                //   color : "rgb(0,0,0)"   
                }
              },

            textColorPrimary:{
               
               color : "rgb(0,0,0)",
            
            },

            wrapper : {
                fontFamily: ' Montserrat, serif ',
                "fontSize": "0.9rem",
                "fontWeight" : 600

            }


        },

        MuiInputBase:{
            root:{
                fontFamily: ' Montserrat, serif ',
                fontWeight : 600,
                fontSize : "0.8rem"
            }

        }
       


   
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





})

export default theme;