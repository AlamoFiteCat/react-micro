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

// [Repayment Plan Import]
import RepaymentPlan from "../Dialogs/RepaymentPlan";

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
});

function useLoans() {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("loans")
      .onSnapshot((snapshot) => {
        const fetchedLoans = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoans(fetchedLoans);
      });
  }, []);

  return loans;
}

export default function LoanComponent() {
  const loans = useLoans();
  const classes = useStyles();

  // [Repayment Plan Controls]
  const [dialogData, setDialogData] = useState({});
  const refEdit = useRef(false);
  const handleClickOpenEdit = (loan) => {
    setDialogData(loan);
    refEdit.current.showDialogEdit();
  };

  if (loans) {
    return (
      <div>
        <h1>Loans</h1>
        <RepaymentPlan ref={refEdit} dialogData={dialogData} />
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="loans table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.heading}>Unique ID</TableCell>
                <TableCell align="right" className={classes.heading}>
                  Application ID
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Agreement Date
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Contact
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Office
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Status
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Closing Date
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Amount
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Installments
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Interest Rate
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((l) => (
                <TableRow
                  key={l.id}
                  className={classes.tableRow}
                  onClick={() =>
                    handleClickOpenEdit({
                      id: l.id,
                      amount: l.approvedAmount,
                      installments: l.installments,
                      interestRate: l.approvedInterestRate,
                      date: l.agreementDate,
                    })
                  }
                >
                  <TableCell component="td" scope="row">
                    {l.id}
                  </TableCell>
                  <TableCell align="right">{l.applicationId}</TableCell>
                  <TableCell component="td" scope="row">
                    {moment(l.agreementDate.seconds * 1000).format(
                      "DD/MM/YYYY"
                    )}
                  </TableCell>
                  <TableCell align="right">{l.contact}</TableCell>
                  <TableCell align="right">{l.office}</TableCell>
                  <TableCell align="right">{l.status}</TableCell>
                  <TableCell align="right">
                    {l.status !== 3
                      ? "/"
                      : moment(l.closingDate.seconds * 1000).format(
                          "DD/MM/YYYY"
                        )}
                  </TableCell>
                  <TableCell align="right">{l.approvedAmount}</TableCell>
                  <TableCell align="right">{l.installments}</TableCell>
                  <TableCell align="right">{l.approvedInterestRate}</TableCell>
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
}
