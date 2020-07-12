import React, { useState, forwardRef, useImperativeHandle } from 'react';
import firebase from '../../util/firebase';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const CreateContact = forwardRef((props, ref) => {
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

  const saveContact = () => {
    const contactName = document.querySelector('#contact-name').value;
    const contactUid = document.querySelector('#contact-uid').value;
    const contactType = document.querySelector('#contact-type').value;
    const contactCity = document.querySelector('#contact-city').value;

    firebase.firestore().collection('contacts').add({
      name: contactName,
      uid: contactUid,
      type: contactType,
      city: contactCity,
    });
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={hideDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new contact, please enter the correct information below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="contact-name"
            label="Contact Name"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
          />
          <TextField
            margin="dense"
            id="contact-uid"
            label="Contact UID"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
          />
          <TextField
            margin="dense"
            id="contact-type"
            label="Contact Type"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
          />
          <TextField
            margin="dense"
            id="contact-city"
            label="Contact City"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={saveContact}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default CreateContact;
