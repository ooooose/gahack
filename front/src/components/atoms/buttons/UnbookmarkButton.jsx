import React, { memo } from 'react';

import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { AiFillStar } from 'react-icons/ai';
import { deleteBookmark } from '../../../lib/api/bookmarks';

const useStyles = makeStyles(() => ({
  bookmarkButton: {
    float: 'right',
    color: 'black',
  },
  text: {
    marginTop: '12px',
    float: 'left',
  },
  length: {
    fontSize: '14px',
  },
}));

const UnbookmarkButton = memo(({ params, setBookmarkState, bookmarkId }) => {
  const classes = useStyles();
  const handleDeleteBookmark = async () => {
    try {
      const res = await deleteBookmark(bookmarkId, params);
      if (res.status === 200) {
        setBookmarkState(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Tooltip title="お気に入り">
      <IconButton
        className={classes.bookmarkButton}
        onClick={handleDeleteBookmark}
      >
        <AiFillStar className={classes.bookmarkIcon} />
      </IconButton>
    </Tooltip>
  );
});

export default UnbookmarkButton;
