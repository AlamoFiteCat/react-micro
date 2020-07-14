// [Imports]
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import firebase from "../../util/firebase";

// [Dialog Imports]
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

// [Dropdown Fuctions]
function useContacts() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("contacts")
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
      .collection("offices")
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

const EditApplication = forwardRef((props, ref) => {
  // [Dialog Controls]
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

  // [CRUD Control]
  const updateApplication = (applicationId) => {
    const contact = document.querySelector("#app-contact-edit").innerHTML;
    const office = document.querySelector("#app-office-edit").innerHTML;
    const requestedAmount = document.querySelector("#app-amount-edit").value;
    const installments = document.querySelector("#app-installments-edit").value;
    const requestedInterestRate = document.querySelector(
      "#app-interest-rate-edit"
    ).value;
    firebase.firestore().collection("applications").doc(applicationId).update({
      contact,
      office,
      requestedAmount,
      installments,
      requestedInterestRate,
    });
    setOpen(false);
  };

  const deleteApplication = (applicationId) => {
    if (props.dialogData.status === 1) {
      firebase
        .firestore()
        .collection("applications")
        .doc(applicationId)
        .delete();
    }
    setOpen(false);
  };

  // [SELECT Controls]
  const contacts = useContacts();
  const offices = useOffices();
  const [person, setPerson] = React.useState("");

  const handleChange = (event) => {
    setPerson(event.target.value);
  };
  const [office, setOffice] = React.useState("");
  const handleChangeOffice = (event) => {
    setOffice(event.target.value);
  };

  // [Menu Controls]
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // [Flow Control]
  const sendForApproval = (applicationId) => {
    firebase.firestore().collection("applications").doc(applicationId).update({
      status: 2,
    });
    handleClose();
  };

  const approveApplication = (applicationId) => {
    firebase.firestore().collection("applications").doc(applicationId).update({
      status: 3,
    });

    let contact = document.querySelector("#app-contact-edit").innerHTML;
    let office = document.querySelector("#app-office-edit").innerHTML;
    const approvedAmount = document.querySelector("#app-amount-edit").value;
    const installments = document.querySelector("#app-installments-edit").value;
    const approvedInterestRate = document.querySelector(
      "#app-interest-rate-edit"
    ).value;

    const newLoan = {
      agreementDate: new Date(),
      applicationId,
      approvedAmount,
      approvedInterestRate,
      contact,
      installments,
      office,
      status: 1,
    };

    if (contact.trim() === "<span>​</span>") {
      newLoan.contact = props.dialogData.contact;
    }

    if (office.trim() === "<span>​</span>") {
      newLoan.office = props.dialogData.office;
    }

    firebase.firestore().collection("loans").add(newLoan);

    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={hideDialogEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the application, please enter the correct information here.
            Use the activies to move through the flow.
          </DialogContentText>
          <InputLabel id="contact-label">Contact</InputLabel>
          <Select
            labelId="contact-label"
            id="app-contact-edit"
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
            id="app-office-edit"
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
            id="app-amount-edit"
            label="Requested Amount"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
            defaultValue={props.dialogData.requestedAmount}
          />
          <TextField
            margin="dense"
            id="app-installments-edit"
            label="Requested Installments"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
            defaultValue={props.dialogData.installments}
          />
          <TextField
            margin="dense"
            id="app-interest-rate-edit"
            label="Requested Interest Rate"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
            defaultValue={props.dialogData.requestedInterestRate}
          />
        </DialogContent>
        <DialogActions>
          <Button
            aria-controls="activity-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="primary"
            variant="contained"
          >
            Activity
          </Button>
          <Menu
            id="activity-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => sendForApproval(props.dialogData.id)}>
              Send for Approval
            </MenuItem>
            <MenuItem onClick={() => approveApplication(props.dialogData.id)}>
              Approve
            </MenuItem>
          </Menu>

          <Button
            color="secondary"
            variant="contained"
            onClick={() => deleteApplication(props.dialogData.id)}
          >
            Delete
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => updateApplication(props.dialogData.id)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default EditApplication;
