// [Imports]
import React, { useState, forwardRef, useImperativeHandle } from "react";
import firebase from "../../util/firebase";

// [Dialog Imports]
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const EditCity = forwardRef((props, ref) => {
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

  const deleteCity = (cityId) => {
    firebase.firestore().collection("cities").doc(cityId).delete();
    setOpen(false);
  };

  const updateCity = (cityId) => {
    const newCityName = document.querySelector("#city-name-edit").value;
    const newCityCode = document.querySelector("#city-code-edit").value;
    firebase.firestore().collection("cities").doc(cityId).set({
      name: newCityName,
      code: newCityCode,
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
        <DialogTitle id="form-dialog-title">Edit City</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit a city, please enter the new values here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="city-name-edit"
            label="City Name"
            type="text"
            fullWidth
            style={{ marginBottom: 32 }}
            defaultValue={props.dialogData.name}
          />
          <TextField
            margin="dense"
            id="city-code-edit"
            label="City Code"
            type="text"
            fullWidth
            defaultValue={props.dialogData.code}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => deleteCity(props.dialogData.id)}
          >
            Delete
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => updateCity(props.dialogData.id)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default EditCity;
