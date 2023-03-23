import React, { memo } from 'react';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const LinkButton = memo((props) => (
  <Button
    sytle={{ textTransform: 'none' }}
    component={Link}
    to={props.to}
    color={props.color}
    onClick={props.onClick}
  >
    {props.children}
  </Button>
));

export default LinkButton;