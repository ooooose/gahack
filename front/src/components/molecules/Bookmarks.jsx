import React, { useState, useContext, memo } from "react";

import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import { AiOutlineStar } from 'react-icons/ai';
import BookmarkButton from "../atoms/buttons/BookmarkButton";
import UnbookmarkButton from "../atoms/buttons/UnbookmarkButton";
import { AuthContext } from "../../App";
import GuestsAlert from "../utils/GuestsAlert";

const useStyles = makeStyles (() => ({
  container: {
    width: '100%',
  },
  bookmarkButton: {
    float: 'right'
  },
  text: {
    marginTop: '12px',
    float: 'left',
  },
  length: {
    fontSize: '14px'
  },
}))


const Bookmarks = memo(({picture, pictureId}) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [bookmarkState, setBookmarkState] = useState(picture.bookmarked);
  const [openAlert, setOpenAlert] = useState(false);

  const generateParams = () => {
    const bookmarkParams = {
      picture_id: pictureId,
    };
    return bookmarkParams;
  };
  const handleOpen = () => {
    setOpenAlert(true);
  }
  return (
    <>
    { currentUser.name === "ゲストユーザー" ? (
      <>
        <div className={classes.container}>
          <Tooltip title="お気に入り">
            <IconButton className={classes.bookmarkButton} onClick={handleOpen} >
              <AiOutlineStar />
            </IconButton>
          </Tooltip>
        </div>
        <GuestsAlert open={openAlert} setOpen={setOpenAlert} />
      </>
    ) : (
      <>
        { bookmarkState ? (
          <UnbookmarkButton 
          params={generateParams()}
          setBookmarkState={setBookmarkState}
          bookmarkId={picture.bookmark_id}
          />
        ) : (
          <BookmarkButton
            params={generateParams()}
            bookmarkState={bookmarkState}
            setBookmarkState={setBookmarkState}
          />
        )}
      </>
    )
    }
    </>
  )
});

export default Bookmarks;
