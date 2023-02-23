import React, { memo } from 'react';

import { makeStyles, IconButton, Tooltip } from "@material-ui/core";
import { AiOutlineStar } from 'react-icons/ai';
import { createBookmark } from "../../../lib/api/bookmarks";

const useStyles = makeStyles((theme) => ({
  bookmarkButton: {
    cursor: 'pointer',
    color: 'gray',
    opacity: '0.5',
    float: 'right'
  },
  text: {
    marginTop: '12px',
    float: 'left',
  },
  length: {
    fontSize: '14px'
  },
}));

const BookmarkButton = memo(({params, setBookmarkState}) => {
  const classes = useStyles();
  const handleCreateBookmark = async () => {
    try {
      const res = await createBookmark(params);
      if (res.status === 200) {
        setBookmarkState(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Tooltip title="お気に入り">
        <IconButton className={classes.bookmarkButton}   onClick={handleCreateBookmark} >
          <AiOutlineStar />
        </IconButton>
      </Tooltip>
    </>
  )
});

export default BookmarkButton;