import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { AccessAlarm, ThreeDRotation } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
  },
  list: {
    maxWidth: "300px",
  },
}));

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

const BasicCauseAndAction = () => {
  const reportedTo = [
    "Internal Leadership",
    "Police",
    "Environment Officer",
    "OHS",
    "Mital Aid",
    "Other",
  ];
  const notificationSent = ["Manage", "SuperVisor"];
  const selectValues = [1, 2, 3, 4];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }

  const radioDecide = ["Yes", "No"];

  let form_link = window.location.href;
  const classes = useStyles();
  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box marginBottom={5}>
            <FormHeader selectedHeader={"Root cause analysis"} />
          </Box>
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Actions against Basic Causes
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container item md={9} spacing={3}>
              <Grid item md={4}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Incident number: nnnnnnnnnn
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={8}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Method: 5 Why Analysis
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={12}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Actions
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={12}>
                <Box marginBottom={2}>
                  <Typography variant="body">
                    Option selected from Hazardous Acts and conditions
                  </Typography>
                </Box>

                <Box>
                  <List className={classes.list} dense disablePadding>
                    <ListItem>
                      <ListItemText primary="Action Title" />
                    </ListItem>
                    <ListItemLink href="#">
                      <ListItemText primary="AL-nnnnnn" />
                    </ListItemLink>
                    <ListItem>
                      <ListItemText primary="Action Title" />
                    </ListItem>
                    <ListItemLink href="#">
                      <ListItemText primary="AL-nnnnnn" />
                    </ListItemLink>
                    <ListItem>
                      <ListItemText primary="Action Title" />
                    </ListItem>
                    <ListItemLink href="#">
                      <ListItemText primary="AL-nnnnnn" />
                    </ListItemLink>
                  </List>

                  <button className={classes.textButton}>
                    <AddCircleOutlineIcon /> Add a new action
                  </button>
                </Box>
              </Grid>

              <Grid item md={12}>
                <Box marginBottom={2}>
                  <Typography variant="body">
                    Option selected from Hazardous Acts and conditions
                  </Typography>
                </Box>

                <Box>
                  <List className={classes.list} dense disablePadding>
                    <ListItem>
                      <ListItemText primary="Action Title" />
                    </ListItem>
                    <ListItemLink href="#">
                      <ListItemText primary="AL-nnnnnn" />
                    </ListItemLink>
                    <ListItem>
                      <ListItemText primary="Action Title" />
                    </ListItem>
                    <ListItemLink href="#">
                      <ListItemText primary="AL-nnnnnn" />
                    </ListItemLink>
                    <ListItem>
                      <ListItemText primary="Action Title" />
                    </ListItem>
                    <ListItemLink href="#">
                      <ListItemText primary="AL-nnnnnn" />
                    </ListItemLink>
                  </List>

                  <button className={classes.textButton}>
                    <AddCircleOutlineIcon /> Add a new action
                  </button>
                </Box>
              </Grid>

              <Grid item md={12}>
                <Box marginBottom={2}>
                  <Typography variant="body">
                    Option selected from Hazardous Acts and conditions
                  </Typography>
                </Box>

                <Box>
                  <List className={classes.list} dense disablePadding>
                    <ListItem>
                      <ListItemText primary="Action Title" />
                    </ListItem>
                    <ListItemLink href="#">
                      <ListItemText primary="AL-nnnnnn" />
                    </ListItemLink>
                    <ListItem>
                      <ListItemText primary="Action Title" />
                    </ListItem>
                    <ListItemLink href="#">
                      <ListItemText primary="AL-nnnnnn" />
                    </ListItemLink>
                    <ListItem>
                      <ListItemText primary="Action Title" />
                    </ListItem>
                    <ListItemLink href="#">
                      <ListItemText primary="AL-nnnnnn" />
                    </ListItemLink>
                  </List>

                  <button className={classes.textButton}>
                    <AddCircleOutlineIcon /> Add a new action
                  </button>
                </Box>
              </Grid>

              <Grid item md={12}>
                <Button variant="contained" color="primary">
                  Next
                </Button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Basic cause and action"}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default BasicCauseAndAction;
