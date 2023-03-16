import React, { memo } from 'react';

import { makeStyles, Button } from "@material-ui/core";

import { destroyRelationship } from '../../../lib/api/relationships';

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    color: 'black',
  },
}));

const UnFollowButton = memo(({ userId, params, setFollowState }) => {
  const classes = useStyles();
  const handleDeleteRelationship = async () => {
    try {
      const res = await destroyRelationship(userId, params);
      if (res.status === 200) {
        setFollowState(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Button
        variant="outlined"
        color="secondary"
        onClick={handleDeleteRelationship}
        className={classes.submitBtn}
      >
        フォロー解除
      </Button>
  )
});

export default UnFollowButton;