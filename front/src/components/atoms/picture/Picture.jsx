import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';
import styles from '../../../css/components/Frames.module.css';

const useStyles = makeStyles(() => ({
  imageScales: {
    maxWidth: '100%',
    height: 'auto',
  },
}));

const Picture = memo(({ theme, picture }) => {
  const classes = useStyles();
  return (
    <div
      className={picture.frameId === 2 ? `${styles.second}` : `${styles.first}`}
    >
      <img
        src={picture.twitterCard.url}
        alt={theme}
        className={classes.imageScales}
      />
    </div>
  );
});

export default Picture;
