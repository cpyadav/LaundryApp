import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex : 500,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      
    },
  },
}));

export default function CustomizedSnackbars(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(props.alertObj.show);
  

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      
      {(() => { 
          
          switch(props.alertObj.type){
              case "success":{
                  return(

                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                      {props.alertObj.msg}
                    </Alert>
                  </Snackbar>

                  )

                  break;
              }

              case "error":{
                return(

                  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error">
                    {props.alertObj.msg}
                  </Alert>
                </Snackbar>

                )

                break;
            }
          }
                
                
                }
                    
                    
                    )()}
      
    </div>
  );
}
