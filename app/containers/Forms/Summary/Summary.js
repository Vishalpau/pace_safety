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
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: ".5rem 0",
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  spacer: {
    padding: ".75rem 0",
  },
}));

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
    <div>
      <Container>
        <Box padding={3} bgcolor="background.paper">
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
          </Box>

          <Paper>
            <Grid container spacing={3}>
              <Grid container item md={9} justify="flex-start" spacing={3}>
                <Grid item md={6}>
                  <Typography varint="p">Incident Number</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Typography varint="p">nnnnnnnnn</Typography>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <Typography varint="p">Incident on</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Typography varint="p">Date and time</Typography>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <Typography varint="p">Reported on</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Typography varint="p">Date and time</Typography>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <Typography varint="p">Reported by</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Typography varint="p">time format</Typography>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <Typography varint="p">Incident Type</Typography>
                  <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Typography varint="p">Near miss</Typography>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <Typography varint="p">Incidnet Title</Typography>
                  <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Typography varint="p">
                      Lorem Ipsum is simply dummy text
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Typography varint="p">Incidnet Description</Typography>
                  <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Typography varint="p">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <Typography varint="p">Incident Location</Typography>
                  <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Typography varint="p">Location</Typography>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <Typography varint="p">
                    Summary Can be same as current page--
                  </Typography>
                  <hr />

                  <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

                    <p>1....</p>
                    <p>2....</p>
                    <p>3....</p>
                    <p>
                      4....
                      <ul>
                        <li>a....</li>
                        <li>a....</li>
                        <li>a....</li>
                      </ul>
                    </p>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <Typography varint="p">Incident report for review</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Reviewed by
                    </InputLabel>
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

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
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
                  <Typography varint="p">Action item</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Closed By
                    </InputLabel>
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

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        label="Closed On"
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
                    href="http://localhost:3000/app/incident-management/registration/lession-learned/lession-learned/"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                Sidebar
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Summary;
