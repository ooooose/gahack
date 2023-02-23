import React, { memo } from 'react';

import { makeStyles, Button } from "@material-ui/core";
import { createRelationship } from '../../../lib/api/relationships';


const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
  },
}));

const FollowButton = memo(({ userId, params, setFollowState }) => {
  const classes = useStyles();
  const handleCreateLike = async () => {
    try {
      const res = await createRelationship(userId, params);
      if (res.status === 200) {
        setFollowState(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.submitBtn} 
        onClick={handleCreateLike} >
          フォロー
      </Button>
    </>
  )
});

export default FollowButton;