import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import CheckCircle from "@material-ui/icons/CheckCircle";
import AccessTime from "@material-ui/icons/AccessTime";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import api from "../../../utils/axios";

// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

// Icons
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import Comment from "@material-ui/icons/Comment";
import History from "@material-ui/icons/History";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";

// Styles
import Styles from "dan-styles/Summary.scss";
import Type from "dan-styles/Typography.scss";
import Fonts from "dan-styles/Fonts.scss";
import moment from "moment";

import IncidentDetails from "../../Forms/InitialNotification/IncidentDetails";
import IncidentDetailsSummary from "../../SummaryDetails/InitialNotification"

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
  spacer: {
    padding: ".75rem 0",
  },
  statusButton: {
    borderRadius: 4,
    fontSize: 12,
  },
}));

// Sidebar Links Helper Function

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Summary = () => {

  const [incidents, setIncidents] = useState([]);
  const [initialNotification, setInitialNotification] = useState(false);

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(
      `api/v1/incidents/${fkid}/`
    );
    await setIncidents(allIncidents.data.data.results);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handelInitialNotification = (e) => {
    setInitialNotification(!initialNotification);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  useEffect(() => {
    fetchIncidentData();

  }, []);

  return (
    <div>
      {/* header */}

      <Box paddingBottom={1}>
        <div className={Styles.incidents}>
          <div className={Styles.item}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              endIcon={<CheckCircle />}
              className={classes.statusButton}
            // onClick={(e) => handelInitialNotification(e)}
            >
              Initial Notification
            </Button>
            <Typography variant="caption">Done</Typography>
          </div>

          <div className={Styles.item}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              endIcon={<CheckCircle />}
              className={classes.statusButton}

            >
              Investigation
            </Button>
            <Typography variant="caption">Done</Typography>
          </div>

          <div className={Styles.item}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              className={classes.statusButton}
              endIcon={<AccessTime />}
            >
              Evidence
            </Button>
            <Typography variant="caption">Pending</Typography>
          </div>
          <div className={Styles.item}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              className={classes.statusButton}
            >
              Root Cause & Analysis
            </Button>
            <Typography variant="caption">Pending</Typography>
          </div>
          <div className={Styles.item}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              endIcon={<AccessTime />}
              className={classes.statusButton}
            >
              Lessions Learnt
            </Button>
            <Typography variant="caption">Pending</Typography>
          </div>
        </div>
      </Box>
      <Divider />

      {/* summary and part */}
      {initialNotification == false ? (

        <div>
          <IncidentDetailsSummary />
          <Grid container spacing={5}>

            {/* sidebar */}
            <Grid item xs={12} md={3}>
              <Paper>
                <List
                  dense
                  subheader={
                    <ListSubheader component="div">Actions</ListSubheader>
                  }
                >
                  <ListItem button>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <a
                      href={`/app/incident-management/registration/initial-notification/incident-details/${localStorage.getItem(
                        "fkincidentId"
                      )}`}
                    >
                      <ListItemText primary="Modify Notification" />
                    </a>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <a href="/app/incident-management/registration/investigation/initial-details/">
                      <ListItemText primary="Modify Investigation" />
                    </a>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <a href="/app/incident-management/registration/evidence/evidence/">
                      <ListItemText primary="Add Evidence" />
                    </a>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <a href="/app/incident-management/registration/root-cause-analysis/details/">
                      <ListItemText primary="Perform RCA" />
                    </a>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <a href="/app/incident-management/registration/lession-learned/lession-learned/">
                      <ListItemText primary="Lessions Learnt" />
                    </a>
                  </ListItem>

                  <ListItem button divider>
                    <ListItemIcon>
                      <Close />
                    </ListItemIcon>
                    <ListItemText primary="Close Out" />
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Comment />
                    </ListItemIcon>
                    <ListItemText primary="Comments" />
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <History />
                    </ListItemIcon>
                    <ListItemText primary="Activity History" />
                  </ListItem>
                </List>
                <Divider />
                <List dense>
                  <ListItem button>
                    <ListItemIcon>
                      <Print />
                    </ListItemIcon>
                    <ListItemText primary="Print" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <Share />
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>

      ) : (
        <IncidentDetailsSummary />
      )}
    </div>
  );
};

export default Summary;
