import React from 'react';
import {
  Button, Grid, Container, Input, Select
} from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { PapperBlock } from 'dan-components';

import FormSideBar from '../FormSideBar';
import { INVESTIGATION_FORM } from '../../../utils/constants';
import FormHeader from '../FormHeader';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EventDetails = () => {
  const reportedTo = [
    'Internal Leadership',
    'Police',
    'Environment Officer',
    'OHS',
    'Mital Aid',
    'Other',
  ];
  const notificationSent = ['Manage', 'SuperVisor'];
  const selectValues = [1, 2, 3, 4];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ['Yes', 'No'];
  const classes = useStyles();
  return (
    <PapperBlock title="Events Details" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={6}>
            {/* <p>*Activity</p> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Activity</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Activity"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            {/* <p>*Job Task</p> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Job Task</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Job Task"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            {/* <p>Eqipment Invoked</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Equipment involved"
              className={classes.formControl}
            />
          </Grid>
          <Grid item md={6}>
            {/* <p> Weather</p> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Weather</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Weather"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            {/* <p> Weather2</p> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Weather2</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Weather2"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            {/* <p> Temprature(c</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Temprature"
              className={classes.formControl}
            />
          </Grid>
          <Grid item md={6}>
            {/* <p>Lighting</p> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Lighting</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Lighting"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            {/* <p> Wind Speed</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Wind Speed"
              className={classes.formControl}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6">Lighting</Typography>
          </Grid>
          <Grid item md={6}>
            {/* <p>Fluid Amount</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Fluid Amount"
              className={classes.formControl}
            />
          </Grid>
          <Grid item md={6}>
            {/* <p>Fluid Type</p> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Fluid Type</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Fluid Type"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            {/* <p>AEL </p> */}
            <TextField
              id="title"
              variant="outlined"
              label="AEL"
              className={classes.formControl}
            />
          </Grid>
          <Grid item md={6}>
            {/* <p>PEL </p> */}
            <TextField
              id="title"
              variant="outlined"
              label="PEL"
              className={classes.formControl}
            />
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="http://localhost:3000/app/incident-management/registration/investigation/equiptment-impact-details/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="http://localhost:3000/app/incident-management/registration/investigation/action-taken/"
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={INVESTIGATION_FORM}
            selectedItem="Event details"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default EventDetails;
