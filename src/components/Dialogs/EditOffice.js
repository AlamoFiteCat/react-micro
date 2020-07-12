// [Imports]
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import firebase from '../../util/firebase';

// [Dialog Imports]
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const EditOffice = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const showDialogEdit = () => {
    setOpen(true);
  };
  const hideDialogEdit = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => {
    return {
      showDialogEdit: showDialogEdit,
    };
  });

  const deleteOffice = (officeId) => {
    firebase.firestore().collection('offices').doc(officeId).delete();
    setOpen(false);
  };

  const updateOffice = (officeId) => {
    const newOfficeName = document.querySelector('#office-name-edit').value;
    const newOfficeCity = document.querySelector('#office-city-edit').value;
    firebase.firestore().collection('offices').doc(officeId).set({
      name: newOfficeName,
      city: newOfficeCity,
    });
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={hideDialogEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Office</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit an office, please enter the new values here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="office-name-edit"
            label="Office Name"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
            defaultValue={props.dialogData.name}
          />
          <TextField
            margin="dense"
            id="office-city-edit"
            label="Office City"
            type="text"
            fullWidth
            defaultValue={props.dialogData.city}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => deleteOffice(props.dialogData.id)}
          >
            Delete
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              updateOffice(props.dialogData.id);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default EditOffice;
