import React, { memo } from "react";
import { Modal, Button, makeStyles, useMediaQuery } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '15px',
    borderRadius: '6px',
    textAlign: 'center'
  },
  minPaper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '15px',
    borderRadius: '6px',
    textAlign: 'center'
  },
  buttons: {
    paddingTop: '5px',
  },
  buttonLink: {
    textDecoration: "none",
    color: 'white'
  },
  cancelButton: {
    marginRight: '5px',
  },
  answer: {
    fontSize: '25px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  }
}))


const TwitterAnswerModal = memo(({theme, open, setOpen}) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:575px)');

  const handleClose =() => {
    setOpen(false);
  };

  const body = (
    <>
      {matches ? (
        <>
          <div className={classes.paper}>
            <p className={classes.answer}>この絵のテーマは<strong>{theme.title}</strong>でした！</p>
            <p>あなたもエモい絵を描きましょう！</p>
            <div className={classes.buttons}>
              <Button 
                variant="contained" 
                onClick={() => setOpen(false)} 
                className={classes.cancelButton}>閉じる</Button>
              <Button color="primary" variant="contained" >
                <Link to="/" className={classes.link} >
                  ホームへ
                </Link>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={classes.minPaper}>
            <p className={classes.answer}>この絵のテーマは<br /><strong>{theme.title}</strong><br />でした！</p>
            <p>あなたもエモい絵を描きましょう！</p>
            <div className={classes.buttons}>
              <Button 
                variant="contained" 
                onClick={() => setOpen(false)} 
                className={classes.cancelButton}>閉じる</Button>
              <Button color="primary" variant="contained" >
                <Link to="/" className={classes.link} >
                  ホームへ
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  )
});

export default TwitterAnswerModal;
