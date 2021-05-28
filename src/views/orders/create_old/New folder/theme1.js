
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {deepPurple, amber } from '@material-ui/core/colors'
import color from "@material-ui/core/colors/amber";


const theme = createMuiTheme({

    overrides:{
        MuiButton:{
            root:{
                fontSize : "14px",
                // width : "100%",
               

            },
            contained:{
                color : deepPurple[500],
               
            }
        },

        h:{
            full:{
                height : "auto"
            }
        },

        // MuiOutlinedInput:{
        //     input:{
        //         padding : "2px"
        //     }
        // },

        MuiFab:{
            root:{

                width : "16px",
                height : "16px",
                minHeight : "16px"
            }
        },
        MuiCard:{
            root:{
                width : "100%"
            }
        },
        MuiFormControl:{
            fullWidth:{
                width : "100%",
            }
        },
        MuiInputBase:{
            input:{
                fontSize : "15px",
                
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
    

    palette:{
        primary : {
            main : deepPurple[500],

            
        },
        secondary : {
            main : amber[500],
            contrastText : "rgb(255,0,0)",
         
            
            
        },
        alpha :{
            main : amber[500],
            contrastText : "rgb(255,0,0)",
            font : "rgb(255,0,0)",
        }
    },

    typography: {
        button: {
          fontSize: 20, // works
          color: "rgb(255,0,0)",
        }

}})

export default theme;