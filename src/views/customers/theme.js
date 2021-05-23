
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{
        MuiButton:{
            root:{
                fontSize : "14px"
            },
            contained:{
                color : deepPurple[500],
               
            },
            containedSizeSmall:{
                display : "initial"
            }

        },
        MuiFormControl:{
            fullWidth:{
                width : "100%",
            }
        },
        // MuiInputBase:{
        //     input:{
        //         fontSize : "15px",
                
        //     }
        // },


        MuiInputBase:{
            root:{
                fontFamily: ' Montserrat, serif ',
                fontWeight : 600,
                fontSize : "1rem",
                width : "15vw"
            }

        },

        MuiSvgIcon:{
            fontSizeSmall:{
                fontSize : "0px"
            }
        },

        MuiAutocomplete:{
            input:{
            minWidth : "50px",
            
            },
            inputRoot:{
           
            
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

        MuiInputLabel:{
            root:{
                fontSize : "15px",
                textOverflow : "ellipsis",
                // width : "300px"
            }
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
                "fontFamily": `sans-serif`,
                "fontSize": 16,
                "fontWeight" : 600

            }


        },

       

      


     

   
    },

    typography: {
        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
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
        button: {
          fontSize: 20, // works
          color: "rgb(255,0,0)",
        }

}})

export default theme;