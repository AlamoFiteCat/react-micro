// [Imports]
import React, { useEffect, useState, useRef } from "react";
import firebase from "../../util/firebase";

// [Component Import]
import CreateOffice from "../Dialogs/CreateOffice";
import EditOffice from "../Dialogs/EditOffice";
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

// == [CRUD] ===========================================================================
// [GET]
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
// == [/CRUD] ===========================================================================

// [Component Function]
const OfficeComponent = () => {
  const offices = useOffices();
  const classes = useStyles();

  // [CREATE]
  const ref = useRef(false);
  const handleClickOpen = () => {
    ref.current.showDialog();
  };

  // [UPDATE & DELETE]
  const [dialogData, setDialogData] = useState({});
  const refEdit = useRef(false);
  const handleClickOpenEdit = (city) => {
    setDialogData(city);
    refEdit.current.showDialogEdit();
  };

  if (offices) {
    return (
      <div>
        <h1>Offices</h1>
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DescriptionIcon />}
            onClick={handleClickOpen}
          >
            New Office
          </Button>
        </Paper>
        <CreateOffice ref={ref} />
        <EditOffice ref={refEdit} dialogData={dialogData} />
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="office table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.heading}>Unique ID</TableCell>
                <TableCell className={classes.heading} align="right">
                  Name
                </TableCell>
                <TableCell className={classes.heading} align="right">
                  City
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offices.map((office) => (
                <TableRow
                  key={office.id}
                  className={classes.tableRow}
                  onClick={() =>
                    handleClickOpenEdit({
                      id: office.id,
                      name: office.name,
                      city: office.city,
                    })
                  }
                >
                  <TableCell component="th" scope="row">
                    {office.id}
                  </TableCell>
                  <TableCell align="right">{office.name}</TableCell>
                  <TableCell align="right">{office.city}</TableCell>
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
export default OfficeComponent;
