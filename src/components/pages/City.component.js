// [Imports]
import React, { useState, useEffect, useRef } from "react";
import firebase from "../../util/firebase";

// [Component Imports]
import CreateCity from "../Dialogs/CreateCity";
import EditCity from "../Dialogs/EditCity";
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
function useCities() {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("cities")
      .onSnapshot((snapshot) => {
        const fetchedCities = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCities(fetchedCities);
      });
  }, []);

  return cities;
}
// == [/CRUD] ===========================================================================

// [Component Function]
const CityComponent = () => {
  const cities = useCities();
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

  if (cities) {
    return (
      <div>
        <h1>Cities</h1>
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DescriptionIcon />}
            onClick={handleClickOpen}
          >
            New City
          </Button>
        </Paper>

        <CreateCity ref={ref} />
        <EditCity ref={refEdit} dialogData={dialogData} />
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="cities table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.heading}>Unique ID</TableCell>
                <TableCell className={classes.heading} align="right">
                  Name
                </TableCell>
                <TableCell className={classes.heading} align="right">
                  Code
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cities.map((city) => (
                <TableRow
                  key={city.id}
                  className={classes.tableRow}
                  onClick={() =>
                    handleClickOpenEdit({
                      id: city.id,
                      name: city.name,
                      code: city.code,
                    })
                  }
                >
                  <TableCell component="td" scope="row">
                    {city.id}
                  </TableCell>
                  <TableCell align="right">{city.name}</TableCell>
                  <TableCell align="right">{city.code}</TableCell>
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
export default CityComponent;
