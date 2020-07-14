// [Base Imports]
import React, { useState, useEffect, useRef } from "react";
import firebase from "../../util/firebase";
import moment from "moment";

// [Component Imports]
import CreateApplication from "../Dialogs/CreateApplication";
import EditApplication from "../Dialogs/EditApplication";
import Button from "@material-ui/core/Button";
import DescriptionIcon from "@material-ui/icons/Description";

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

function useApplications() {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("applications")
      .onSnapshot((snapshot) => {
        const fetchedApplicaitons = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(fetchedApplicaitons);
      });
  }, []);

  return applications;
}

const ApplicationComponent = () => {
  const applications = useApplications();
  const classes = useStyles();

  // [CREATE]
  const ref = useRef(false);
  const handleClickOpen = () => {
    ref.current.showDialog();
  };

  // [UPDATE & DELETE]
  const [dialogData, setDialogData] = useState({});
  const refEdit = useRef(false);
  const handleClickOpenEdit = (application) => {
    setDialogData(application);
    refEdit.current.showDialogEdit();
  };

  if (applications) {
    return (
      <div>
        <h1>Application</h1>
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DescriptionIcon />}
            onClick={handleClickOpen}
          >
            New Application
          </Button>
        </Paper>
        <CreateApplication ref={ref} />
        <EditApplication ref={refEdit} dialogData={dialogData} />
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="applications table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.heading}>Unique ID</TableCell>
                <TableCell align="right" className={classes.heading}>
                  Contact
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Office
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Application Date
                </TableCell>
                <TableCell align="right" className={classes.heading}>
                  Status
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
              {applications.map((app) => (
                <TableRow
                  key={app.id}
                  className={classes.tableRow}
                  onClick={() =>
                    handleClickOpenEdit({
                      id: app.id,
                      contact: app.contact,
                      office: app.office,
                      requestedAmount: app.requestedAmount,
                      installments: app.installments,
                      requestedInterestRate: app.requestedInterestRate,
                      status: app.status,
                    })
                  }
                >
                  <TableCell component="td" scope="row">
                    {app.id}
                  </TableCell>
                  <TableCell align="right">{app.contact}</TableCell>
                  <TableCell align="right">{app.office}</TableCell>
                  <TableCell align="right">
                    {moment(app.applicationDate.seconds * 1000).format(
                      "DD/MM/YYYY"
                    )}
                  </TableCell>
                  <TableCell align="right">{app.status}</TableCell>
                  <TableCell align="right">{app.requestedAmount}</TableCell>
                  <TableCell align="right">{app.installments}</TableCell>
                  <TableCell align="right">
                    {app.requestedInterestRate} %
                  </TableCell>
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

export default ApplicationComponent;
