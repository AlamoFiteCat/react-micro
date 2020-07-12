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

const EditContact = forwardRef((props, ref) => {
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

  const deleteContact = (contactId) => {
    firebase.firestore().collection('contacts').doc(contactId).delete();
    setOpen(false);
  };

  const updateContact = (contactId) => {
    const newContactName = document.querySelector('#contact-name-edit').value;
    const newContactUid = document.querySelector('#contact-uid-edit').value;
    const newContactType = document.querySelector('#contact-type-edit').value;
    const newContactCity = document.querySelector('#contact-city-edit').value;

    firebase.firestore().collection('contacts').doc(contactId).set({
      name: newContactName,
      uid: newContactUid,
      type: newContactType,
      city: newContactCity,
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
        <DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update this contact, please enter the correct information below.
          </DialogContentText>
          <TextField
            margin="dense"
            id="contact-name-edit"
            label="Contact Name"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
            defaultValue={props.dialogData.name}
          />
          <TextField
            margin="dense"
            id="contact-uid-edit"
            label="Contact UID"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
            defaultValue={props.dialogData.uid}
          />
          <TextField
            margin="dense"
            id="contact-type-edit"
            label="Contact Type"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
            defaultValue={props.dialogData.type}
          />
          <TextField
            margin="dense"
            id="contact-city-edit"
            label="Contact City"
            type="text"
            fullWidth
            defaultValue={props.dialogData.city}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => deleteContact(props.dialogData.id)}
          >
            Delete
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => updateContact(props.dialogData.id)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default EditContact;
