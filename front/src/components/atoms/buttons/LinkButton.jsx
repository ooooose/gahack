import React, { memo } from "react";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


export const LinkButton = memo((props) => {
  return (
    <>
      <Button
        sytle={{textTransform:"none"}}
        component={Link}
        to={props.to}
        color={props.color}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </>
  )
});