// [Imports]
import React, { useState, useEffect, useRef } from 'react';
import firebase from '../../util/firebase';

// [Table Imports]
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// [Dialog Imports]
import EditContact from '../Dialogs/EditContact';
import CreateContact from '../Dialogs/CreateContact';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles({
  table: {
    width: 1024,
  },

  heading: {
    fontWeight: 'bold',
  },

  paper: {
    height: 64,
    width: 1024,
    padding: 16,
    marginBottom: 8,
  },

  tableRow: {
    '&:hover': {
      backgroundColor: '#ecf0f1',
      cursor: 'pointer',
    },
  },
});

// == [CRUD] ===========================================================================
// [GET]
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
// == [/CRUD] ===========================================================================

// [Component Function]
const ContactComponent = () => {
  const contacts = useContacts();
  const classes = useStyles();

  // [CREATE]
  const ref = useRef(false);
  const handleClickOpen = () => {
    ref.current.showDialog();
  };

  // [UPDATE & DELETE]
  const [dialogData, setDialogData] = useState({});
  const refEdit = useRef(false);

  const handleClickOpenEdit = (contact) => {
    setDialogData(contact);
    refEdit.current.showDialogEdit();
  };

  if (contacts) {
    return (
      <div>
        <h1>Contacts</h1>
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DescriptionIcon />}
            onClick={handleClickOpen}
          >
            New Contact
          </Button>
        </Paper>
        <CreateContact ref={ref} />
        <EditContact ref={refEdit} dialogData={dialogData} />
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="contacts table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.heading}>Unique ID</TableCell>
                <TableCell className={classes.heading} align="right">
                  Name
                </TableCell>
                <TableCell className={classes.heading} align="right">
                  UID
                </TableCell>
                <TableCell className={classes.heading} align="right">
                  Тype
                </TableCell>
                <TableCell className={classes.heading} align="right">
                  City
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  className={classes.tableRow}
                  onClick={() =>
                    handleClickOpenEdit({
                      id: contact.id,
                      name: contact.name,
                      uid: contact.uid,
                      type: contact.type,
                      city: contact.city,
                    })
                  }
                >
                  <TableCell component="th" scope="row">
                    {contact.id}
                  </TableCell>
                  <TableCell align="right">{contact.name}</TableCell>
                  <TableCell align="right">{contact.uid}</TableCell>
                  <TableCell align="right">{contact.type}</TableCell>
                  <TableCell align="right">{contact.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

// [Export]
export default ContactComponent;
