import React from "react";
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

// Styles
import Styles from "dan-styles/Summary.scss";
import Type from "dan-styles/Typography.scss";
import Fonts from "dan-styles/Fonts.scss";

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
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  return (
    <PapperBlock title="Summary" icon="ion-md-list-box">
      {/* <Box borderBottom={1} marginBottom={2}>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
        </Box> */}

      <Grid container spacing={5}>
        <Grid container item md={9} spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Incident Number
            </Typography>
            <Box paddingBottom={1}>
              <Typography
                variant="body2"
                color="textSecondary"
                className={Type.bold}
              >
                54321 - Company Name
              </Typography>
            </Box>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Incident Progress
            </Typography>

            <Box paddingBottom={1}>
              <div className={Styles.incidents}>
                <div className={Styles.item}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    endIcon={<CheckCircle />}
                    className={classes.statusButton}
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
                    disabled
                    className={classes.statusButton}
                  >
                    Root Cause & Analysis
                  </Button>
                  <Typography variant="caption" color="error">
                    Not Applicable
                  </Typography>
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
          </Grid>
          {/* <Grid item md={6}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Incident Number
            </Typography>

            <Typography
              varaint="body"
              color="textSecondary"
              className={Fonts.labelValue}
            >
              3568166
            </Typography>
          </Grid> */}

          <Grid item md={6}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Incident on
            </Typography>
            <Typography
              variant="body"
              color="textSecondary"
              className={Fonts.labelValue}
            >
              15th June 2018
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Reported on
            </Typography>

            <Typography
              variant="body"
              color="textSecondary"
              className={Fonts.labelValue}
            >
              17th June 2018, 11:26 AM
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Reported by
            </Typography>

            <Typography
              variant="body"
              color="textSecondary"
              className={Fonts.labelValue}
            >
              FirstName LastName
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Incident Type
            </Typography>

            <Typography
              variant="body"
              color="textSecondary"
              className={Fonts.labelValue}
            >
              Near miss
            </Typography>
          </Grid>

          {/* <Grid item md={6}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Incident Title
            </Typography>

            <Typography
              variant="body"
              color="textSecondary"
              className={Fonts.labelValue}
            >
              Lorem Ipsum is simply dummy text
            </Typography>
          </Grid> */}
          <Grid item md={12}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Incidnet Description
            </Typography>

            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <Typography
              variant="body"
              color="textSecondary"
              className={Fonts.labelValue}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" gutterBottom className={Fonts.labelName}>
              Incident Location
            </Typography>

            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <Typography
              variant="body"
              color="textSecondary"
              className={Fonts.labelValue}
            >
              Location
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography
              variant="body"
              color="textSecondary"
              className={Fonts.labelValue}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
              nihil similique dolorem assumenda, adipisci cum, laudantium, iusto
              quisquam at quis eius quasi.
            </Typography>
          </Grid>

          <Grid item md={6}>
            {/* <Typography varint="p">Incident report for review</Typography> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Reviewed by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Reviewed by"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            {/* <Typography varint="p">Reviewed On</Typography> */}

            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="date-picker-dialog"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  inputVariant="outlined"
                  label="Reviewed On"
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            {/* <Typography varint="p">Action item</Typography> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Closed By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Closed By"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            {/* <Typography varint="p">Closed on</Typography> */}

            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="date-picker-dialog"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="Closed On"
                  inputVariant="outlined"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="http://localhost:3000/app/incident-management/registration/lession-learned/lession-learned/"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <List
              dense
              subheader={<ListSubheader component="div">Actions</ListSubheader>}
            >
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
    </PapperBlock>
  );
};

export default Summary;
