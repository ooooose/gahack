import React, { useState, useContext, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Modal, Button, useMediaQuery } from '@material-ui/core';
import Form from '../atoms/forms/Form';
import AuthContext from '../../context';
import { editUser } from '../../lib/api/users';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '15px',
    borderRadius: '6px',
  },
  minPaper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '300px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '15px',
    borderRadius: '6px',
  },
  avatar: {
    width: '60px',
    height: '60px',
    marginBottom: '10px',
    textAlign: 'center',
    margin: '0 auto',
  },
  input: {
    marginBottom: '5px',
  },
  buttons: {
    paddingTop: '5px',
    float: 'right',
  },
  submitButton: {
    backgroundColor: '#4791db',
  },
  cancelButton: {
    marginRight: '5px',
  },
}));

const EditUserModal = memo(({ open, setOpen, user, setUser, setAvatar }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [editName, setEditName] = useState(user.name);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const matches = useMediaQuery('(min-width:575px)');
  const generateParams = () => {
    const formData = new FormData();
    if (editName) formData.append('name', editName);
    if (image) formData.append('image', image);
    return formData;
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    const id = currentUser?.id;
    try {
      const res = await editUser(id, params);
      setOpen(false);
      const newUser = res.data.user;
      const newAvatar = res.data.user.image;
      setUser(newUser);
      setAvatar(newAvatar);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const previewImage = (e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  };

  const handleClose = () => {
    setOpen(false);
    setImage('');
    setPreview('');
  };

  const body = (
    <>
      {matches ? (
        <div className={classes.paper}>
          <h2 id="simple-modal-title">プロフィール編集</h2>
          <div className={classes.imageUploadBtn}>
            <Avatar
              alt="avatar"
              src={preview || currentUser?.image.url}
              className={classes.avatar}
            />
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={(e) => {
                uploadImage(e);
                previewImage(e);
              }}
            />
          </div>
          <Form
            label="名前"
            defaultValue={currentUser?.name}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div className={classes.buttons}>
            <Button
              variant="contained"
              onClick={handleClose}
              className={classes.cancelButton}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={!editName}
              onClick={handleEditUserSubmit}
            >
              更新
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.minPaper}>
          <h3 id="simple-modal-title">プロフィール編集</h3>
          <div className={classes.imageUploadBtn}>
            <Avatar
              alt="avatar"
              src={preview || currentUser?.image.url}
              className={classes.avatar}
            />
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={(e) => {
                uploadImage(e);
                previewImage(e);
              }}
            />
          </div>
          <Form
            label="名前"
            defaultValue={currentUser?.name}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div className={classes.buttons}>
            <Button
              variant="contained"
              onClick={handleClose}
              className={classes.cancelButton}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={!editName}
              onClick={handleEditUserSubmit}
            >
              更新
            </Button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
});

export default EditUserModal;
