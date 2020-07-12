import React, { useState, forwardRef, useImperativeHandle } from 'react';
import firebase from '../../util/firebase';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const CreateOffice = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const showDialog = () => {
    setOpen(true);
  };
  const hideDialog = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => {
    return {
      showDialog: showDialog,
    };
  });
  const saveOffice = () => {
    const officeName = document.querySelector('#office-name').value;
    const officeCity = document.querySelector('#office-city').value;
    firebase
      .firestore()
      .collection('offices')
      .add({ name: officeName, city: officeCity });
    hideDialog();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={hideDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New City</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new office, please enter the correct name and city here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="office-name"
            label="Office Name"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
          />
          <TextField
            margin="dense"
            id="office-city"
            label="Office City"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveOffice} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default CreateOffice;
