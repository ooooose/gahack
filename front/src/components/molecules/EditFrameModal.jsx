import React, { useState, memo } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Modal, 
        Button, 
        Select, 
        FormControl, 
        InputLabel,
        MenuItem,
        useMediaQuery} from "@material-ui/core";
import styles from "../../css/components/Frames.module.css";
import { editPicture } from "../../lib/api/pictures";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '500px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '18px',
    borderRadius: '6px',
  },
  minPaper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: '500px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '18px',
    borderRadius: '6px',
  },
  content: {
    position: 'relative',
    fontSize: '8px',
    height: '300px'
  },
  buttons: {
    marginTop: '30px',
    paddingTop: '5px',
    float: 'right',
  },
  submitButton: {
    backgroundColor: '#4791db'
  },
  cancelButton: {
    marginRight: '5px',
  },
}));

const EditFrameModal = memo(({ open, setOpen, picture, setPicture ,image, setTheme }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:575px)');
  const [frame, setFrame] = useState(1);
  const image_src = "data:image/png;base64," + image;
  const handleClose = () => {
    setOpen(false);
  };
  
  const generateParams = () => {
    const frameParams = {
      frame_id: frame,
    };
    return frameParams;
  };

  const handleEditPictureSubmit = async () => {
    const params = generateParams();
    const id = picture.id
    try {
      const res = await editPicture(id, params);
      const new_picture = res.data;
      console.log(res.data);
      const new_theme = res.data.theme;
      setPicture(new_picture);
      setTheme(new_theme);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  }

  const handleFrameChange = (newFrame) => {
    setFrame(prev => newFrame)
  }

  const body = (
    <>
      {matches ? (
        <>
          <div className={classes.paper}>
            <h2 id="simple-modal-title">フレーム編集</h2>
            <div className={classes.content}>
              <div className={frame === 2 ? `${styles.second}` : `${styles.first}`}>
                <img src={image_src} alt={picture.theme} className={classes.imageScales} />
              </div>
            </div>
            <div>
              <FormControl 
                fullWidth
                className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">フレームカラー</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={frame}
                  label="Frame"
                  onChange={e => {
                    handleFrameChange(e.target.value);
                  }}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={1}>ブラック</MenuItem>
                  <MenuItem value={2}>ホワイト</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.buttons}>
              <Button 
                variant="contained" 
                onClick={handleClose} 
                className={classes.cancelButton}>キャンセル</Button>
              <Button 
                variant="contained" 
                color="primary"
                className={classes.submitButton}
                onClick={handleEditPictureSubmit}
                >更新</Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={classes.minPaper}>
            <h2 id="simple-modal-title">フレーム編集</h2>
            <div className={classes.content}>
              <div className={frame === 2 ? `${styles.second}` : `${styles.first}`}>
                <img src={image_src} alt={picture.theme} className={classes.imageScales} />
              </div>
            </div>
            <div>
              <FormControl 
                fullWidth
                className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">フレームカラー</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={frame}
                  label="Frame"
                  onChange={e => {
                    handleFrameChange(e.target.value);
                  }}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={1}>ブラック</MenuItem>
                  <MenuItem value={2}>ホワイト</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.buttons}>
              <Button 
                variant="contained" 
                onClick={handleClose} 
                className={classes.cancelButton}>キャンセル</Button>
              <Button 
                variant="contained" 
                color="primary"
                className={classes.submitButton}
                onClick={handleEditPictureSubmit}
                >更新</Button>
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
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  )
});

export default EditFrameModal;
