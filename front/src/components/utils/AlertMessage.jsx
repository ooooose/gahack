import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


const Alert = (props) =>{
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertMessage = (props) => {
  const { open, setOpen, severity, message} = props;
  const handleCloseAlertMessage = (e, reason) => {
    if (reason === "clickaway") return
      setOpen(false)
  }

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={3000} 
      anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
      onClose={handleCloseAlertMessage}
    >
      <Alert onClose={handleCloseAlertMessage} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
