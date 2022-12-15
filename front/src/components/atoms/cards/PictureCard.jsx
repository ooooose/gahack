import React from "react";

import Picture from "../picture/Picture";
import { Link } from "react-router-dom";

import Likes from "../../molecules/Likes";

import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
    margin: 'auto'
  }
}))

const PictureCard = ({picture, pictureId }) => {
  const classes = useStyles();

  return (
    <>
      <Card
        className={classes.card}
      >
        <Link to={{
            pathname: "/pictures/" + picture.id,
            state: {id: picture.id}
          }}
          id={picture.id}
          className = {classes.link}
        >
          <Picture picture={picture} 
            theme={picture.theme} 
            image={picture.image}
            />          
        </Link>
        <Likes picture={picture} pictureId={pictureId} />
      </Card>
    </>
  )
}

export default PictureCard;