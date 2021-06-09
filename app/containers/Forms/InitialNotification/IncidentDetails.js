import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '.5rem 0',
    minWidth: 260,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
  },
  spacer: {
    padding: '.75rem 0',
  },
}));

const IncidentDetails = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ['Yes', 'No', 'N/A'];
  return (
    <div>
      <Container>
        <Box padding={3} bgcolor="background.paper">
          <Typography variant="h4" gutterBottom>
            Initial Notification
          </Typography>
          <Grid container justify="flex-start">
            <Grid item md={12}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="project-name">Project Name</InputLabel>
                <Select
                  inputProps={{
                    id: 'project-name',
                  }}
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item md={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="unit-name-label">Unit Name</InputLabel>
                <Select labelId="unit-name-label" id="unit-name">
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <FormControl requirement className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Incident Type
                </InputLabel>
                <Select labelId="incident-type-label" id="incident-type">
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Grid item md={6}>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                className={classes.formControl}
              >
                <KeyboardDatePicker
                  label="Incident Date"
                  required
                  id="date-picker-dialog"
                  format="dd/mm/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item md={6}>
              <MuiPickersUtilsProvider
                utils={MomentUtils}
                className={classes.formControl}
              >
                <TimePicker
                  label="Masked timepicker"
                  mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
                  placeholder="08:00 AM"
                  required
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <Icon>access_time</Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item lg={12} md={6} sm={6}>
              <TextField
                id="title"
                label="Title"
                className={classes.fullWidth}
              />
            </Grid>

            <Grid item md={12}>
              <TextField
                multiline
                rows="5"
                id="description"
                label="Description"
                className={classes.fullWidth}
              />
            </Grid>

            <Grid item md={12}>
              <TextField
                id="immediate-actions"
                multiline
                rows="4"
                label="Any immediate actions taken"
                className={classes.fullWidth}
              />
            </Grid>

            <Grid item lg={12} md={6} sm={6}>
              <FormControl className={classes.formControl}>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={6}>
              <TextField
                id="contractor"
                label="Contractor"
                required
                className={classes.formControl}
              />
            </Grid>

            <Grid item md={6}>
              <TextField
                id="filled-basic"
                label="Sub-Contractor"
                required
                className={classes.formControl}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item lg={12} md={6} sm={6}>
              <div className={classes.spacer}>
                <p>Were any person affected during incident?</p>
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </div>
            </Grid>

            <Grid item lg={12} md={6} sm={6}>
              <div className={classes.spacer}>
                <p>Was any propery damaged during incident?</p>

                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </div>
            </Grid>

            <Grid item lg={12} md={6} sm={6}>
              <div className={classes.spacer}>
                <p>Was there any equiptment damaged?</p>

                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </div>
            </Grid>

            <Grid item lg={12} md={6} sm={6}>
              <p>Was there any environment impact?</p>

              {radioDecide.map((value) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={value}
                />
              ))}
            </Grid>

            <Box marginTop={4}>
              <Button size="medium" variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default IncidentDetails;
