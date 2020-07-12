import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import firebase from '../../util/firebase';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

// [Dropdown Fuctions]
function useContacts() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('contacts')
      .onSnapshot((snapshot) => {
        const fetchedContacts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(fetchedContacts);
      });
  }, []);

  return contacts;
}

function useOffices() {
  const [offices, setOffices] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('offices')
      .onSnapshot((snapshot) => {
        const fetchedOffices = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOffices(fetchedOffices);
      });
  }, []);

  return offices;
}

const CreateApplication = forwardRef((props, ref) => {
  // [Create Application]
  const saveApplication = () => {
    const contact = document.querySelector('#app-contact').innerHTML;
    const office = document.querySelector('#app-office').innerHTML;
    const requestedAmount = document.querySelector('#app-amount').value;
    const installments = document.querySelector('#app-installments').value;
    const requestedInterestRate = document.querySelector('#app-interest-rate')
      .value;
    firebase.firestore().collection('applications').add({
      contact,
      office,
      requestedAmount,
      installments,
      requestedInterestRate,
      status: 1,
      applicationDate: new Date(),
    });
    setOpen(false);
  };

  // [Dialog Control]
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

  // [SELECT Controls]
  const contacts = useContacts();
  const offices = useOffices();
  const [person, setPerson] = React.useState('');
  const handleChange = (event) => {
    setPerson(event.target.value);
  };
  const [office, setOffice] = React.useState('');
  const handleChangeOffice = (event) => {
    setOffice(event.target.value);
  };

  // [Render]
  return (
    <div>
      <Dialog
        open={open}
        onClose={hideDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new application, please enter the correct information
            here.
          </DialogContentText>
          <InputLabel id="contact-label">Contact</InputLabel>
          <Select
            labelId="contact-label"
            id="app-contact"
            fullWidth
            value={person}
            onChange={handleChange}
            style={{ marginBottom: 32 }}
          >
            {contacts.map((c) => (
              <MenuItem key={c.name} value={c.name}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="office-label">Office</InputLabel>
          <Select
            labelId="office-label"
            id="app-office"
            fullWidth
            value={office}
            onChange={handleChangeOffice}
            style={{ marginBottom: 32 }}
          >
            {offices.map((o) => (
              <MenuItem
                key={o.name}
                value={`${o.name} - ${o.city}`}
              >{`${o.name} - ${o.city}`}</MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            id="app-amount"
            label="Requested Amount"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
          />
          <TextField
            margin="dense"
            id="app-installments"
            label="Requested Installments"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
          />
          <TextField
            margin="dense"
            id="app-interest-rate"
            label="Requested Interest Rate"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={saveApplication}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default CreateApplication;
