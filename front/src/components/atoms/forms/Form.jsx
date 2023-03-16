import React, { memo } from "react";

import TextField from "@material-ui/core/TextField";

export const Form = memo((props) => (
    <TextField
        variant="outlined"
        required
        fullWidth
        label={props.label}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue===undefined? "" : props.defaultValue}
        margin="dense"
        autoComplete={props.autoComplete}
        onChange={props.onChange}
      />
  ));