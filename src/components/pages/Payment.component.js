// [Base Imports]
import React, { useState, useEffect, useRef } from "react";
import firebase from "../../util/firebase";
import moment from "moment";

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
    width: 1280,
  },

  heading: {
    fontWeight: "bold",
  },

  paper: {
    height: 64,
    width: 1280,
    padding: 16,
    marginBottom: 8,
  },

  tableRow: {
    "&:hover": {
      backgroundColor: "#ecf0f1",
      cursor: "pointer",
    },
  },
});

function useDebts() {
  const [debts, setDebts] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("debts")
      .onSnapshot((snapshot) => {
        const fetchedDebts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDebts(fetchedDebts);
      });
  }, []);

  return debts;
}

export default function PaymentComponent() {
  const classes = useStyles();
  const debts = useDebts();

  return (
    <div>
      <h1>Debts / Payments</h1>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="applications table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.heading}>Unique ID</TableCell>
              <TableCell align="right" className={classes.heading}>
                Amount
              </TableCell>
              <TableCell align="right" className={classes.heading}>
                Date
              </TableCell>
              <TableCell align="right" className={classes.heading}>
                Installment No.
              </TableCell>
              <TableCell align="right" className={classes.heading}>
                Loan ID
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {debts.map((debt) => (
              <TableRow key={debt.id} className={classes.tableRow}>
                <TableCell component="td" scope="row">
                  {debt.id}
                </TableCell>
                <TableCell align="right">{debt.amount}</TableCell>
                <TableCell align="right">
                  {moment(debt.date.seconds * 1000).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">{debt.installmentNo}</TableCell>
                <TableCell align="right">{debt.loan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
