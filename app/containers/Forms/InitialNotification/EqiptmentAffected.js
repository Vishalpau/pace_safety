import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '.5rem 0',
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
  },
  spacer: {
    marginTop: '1rem',
  },
  customLabel: {
    marginBottom: 0,
  },
  textButton: {
    color: '#3498db',
    padding: 0,
    textDecoration: 'underline',
    display: 'inlineBlock',
    marginBlock: '1.5rem',
    backgroundColor: 'transparent',
  },
}));

const EqiptmentAffected = () => {
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

  const radioDecide = ['Yes', 'No'];
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Typography variant="h5" gutterBottom>
              Details of Equiptments Affected
            </Typography>
            <Grid container justify="flex-start">
              <Box borderBottom={1} marginTop={6} marginBottom={3}>
                <Typography variant="p" gutterBottom>
                  Do you have details to share about the equiptment accected?
                </Typography>
              </Box>
              <Grid item lg={12} md={6} sm={6}>
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={6}>
                {/* <p>Equiptment type</p> */}
                <FormControl className={classes.formControl}>
                  <InputLabel id="eq-type-label">Equiptment type</InputLabel>
                  <Select labelId="eq-type-label" id="eq-type">
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                {/* <p>if other describe</p> */}
                <TextField
                  id="filled-basic"
                  label="If others, describe"
                  className={classes.formControl}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={12}>
                {/* <p>Describe the damage</p> */}
                <TextField
                  id="describe-damage"
                  multiline
                  rows="3"
                  label="Describe the damage"
                  className={classes.fullWidth}
                />
              </Grid>

              <Grid item lg={12} md={6} sm={6}>
                <button className={classes.textButton}>
                  Add details of additional equiptment affected?
                </button>
              </Grid>

              <Grid item lg={12} md={6} sm={6}>
                {/* <p>Comment </p> */}
                <TextField
                  id="comments"
                  multiline
                  rows="4"
                  label="Describe any actions taken"
                  className={classes.fullWidth}
                />
              </Grid>
              <Box marginTop={4}>
                <Button
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default EqiptmentAffected;
