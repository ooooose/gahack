import React from "react";

import TextField from "@material-ui/core/TextField";

export const Form = (props) => {
  return (
    <>
      <TextField
        variant="outlined"
        required
        fullWidth
        label={props.label}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        margin="dense"
        autoComplete={props.autoComplete}
        onChange={props.onChange}
      />
    </>

  )

};