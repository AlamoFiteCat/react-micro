// [Base Imports]
import React, { useState, forwardRef, useImperativeHandle } from "react";

// [Dialog Imports]
import Dialog from "@material-ui/core/Dialog";
//import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const RepaymentPlan = forwardRef((props, ref) => {
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
  return (
    <div>
      <Dialog
        open={open}
        onClose={hideDialogEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Repayment Plan</DialogTitle>
        <DialogContent>
          <h1>Hello</h1>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default RepaymentPlan;
