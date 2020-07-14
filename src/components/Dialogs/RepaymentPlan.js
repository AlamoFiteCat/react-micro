// [Base Imports]
import React, { useState, forwardRef, useImperativeHandle } from "react";

// [Dialog Imports]
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// [Table Imports]
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// [Set Styles]
const useStyles = makeStyles({
  table: {
    width: 1408,
  },

  heading: {
    fontWeight: "bold",
  },

  paper: {
    height: 64,
    width: 1408,
    padding: 16,
    marginBottom: 8,
  },

  tableRow: {
    "&:hover": {
      backgroundColor: "#ecf0f1",
      cursor: "pointer",
    },
  },

  dialog: {
    width: 1280,
  },
});

const RepaymentPlan = forwardRef((props, ref) => {
  const classes = useStyles();
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
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="repayment plan table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" className={classes.heading}>
                    Installment No.
                  </TableCell>
                  <TableCell align="right" className={classes.heading}>
                    Date
                  </TableCell>
                  <TableCell align="right" className={classes.heading}>
                    Principal
                  </TableCell>
                  <TableCell align="right" className={classes.heading}>
                    Interest
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default RepaymentPlan;
