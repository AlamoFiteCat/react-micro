import React, { useState, forwardRef, useImperativeHandle } from 'react';
import firebase from '../../util/firebase';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const CreateCity = forwardRef((props, ref) => {
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

  const saveCity = () => {
    const cityName = document.querySelector('#city-name').value;
    const cityCode = document.querySelector('#city-code').value;
    firebase
      .firestore()
      .collection('cities')
      .add({ name: cityName, code: cityCode });
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
            To add a new city, please enter the correct name and code here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="city-name"
            label="City Name"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
          />
          <TextField
            margin="dense"
            id="city-code"
            label="City Code"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveCity} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default CreateCity;
