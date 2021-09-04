import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookIcon from '@material-ui/icons/Book';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import { useDropzone } from 'react-dropzone';
import { useHistory, useParams } from 'react-router';
import api from '../../../utils/axios';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '.5rem 0',
    width: '100%',
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
  spacerRight: {
    marginRight: '.75rem',
  },
  mToptewnty: {
    marginTop: '.50rem',
  },
  addButton: {
    '& .MuiButton-root': {
      marginTop: '9px',
      backgroundColor: '#ffffff',
      color: '#06425c',
      border: '1px solid #06425c',
      borderRadius: '4px',
      padding: '11px 12px',
    },
  },
  radioInline: {
    flexDirection: 'row',
  },
  mtTen: {
    marginTop: '7px',
  },
  mrTen: {
    marginRight: '15px',
    width: '98%',
  },
  borderCategory: {
    borderLeft: '2px solid #06425c',
  },
  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '35px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#06425c',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '10px',
      cursor: 'pointer',
    },
  },
}));
// Top 100 films as rated by IMDb users.
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
];
const CloseOut = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [showRadioUnplanned, setRadioUnplanned] = React.useState(false);
  const onClick = () => setRadioUnplanned(true);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
      {' '}
-
      {file.size}
      {' '}
bytes
    </li>
  ));
  const [jobForm, setJobForm] = React.useState({
    preUseInspection: '',
    warningRibbon: '',
    workerWorking: '',
    workerRemarks: '',
    permitClosedOut: '',
    hazardsRemaining: '',
    endOfJob: '',
    anyIncidents: '',
    jobCompletionRemarks: '',
    creatingIncident: '',
    jobTitle: '',
    jobDetails: '',
    fkCompanyId: '',
    fkProjectId: ''
  });

  React.useEffect(() => {
    setFlhaDetails();
  }, [open]);

  const setFlhaDetails = async () => {
    const { id } = props.match.params;
    const { fkCompanyId } = JSON.parse(localStorage.getItem('company'));
    const fkProjectId = JSON.parse(localStorage.getItem('projectName')).projectName.projectId;
    const temp = { ...jobForm };
    temp.fkCompanyId = fkCompanyId;
    temp.fkProjectId = fkProjectId;

    const res = await api.get(
      '/api/v1/flhas/' + id + '/'
    );

    const flha = res.data.data.results;
    temp.jobTitle = flha.jobTitle;
    temp.jobDetails = flha.jobDetails;
    console.log({ temp });
    console.log({ res: res.data.data.results });
    await setJobForm(temp);
    console.log({ jobForm });
  };

  const handleJobFormChange = async (e, fieldname) => {
    console.log(jobForm);

    const temp = { ...jobForm };
    const { value } = e.target;

    console.log({ value });
    temp[fieldname] = value;


    console.log({ temp });
    await setJobForm(temp);
    // await console.log({jobForm: jobForm})
  };

  const handleFormSubmit = async () => {
    const { id } = props.match.params;
    console.log({ jobForm });
    const res = await api.put(
      '/api/v1/flhas/' + id + '/',
      jobForm
    );
    console.log(res.data);
    history.push('/app/pages/assesments/flhasummary/' + id);
  };
  return (
    <div>
      <PapperBlock title="XFLHA - Close Out" icon="ion-ios-create-outline" desc="" color="primary">
        <Paper elevation={3}>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <Box padding={3}>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Has a pre-use inspection of tools/equipment been completed?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="preUseInspection" name="preUseInspection" value={jobForm.preUseInspection} onChange={(e) => handleJobFormChange(e, 'preUseInspection')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Is a warning ribbon need?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="warningRibbon" name="warningRibbon" value={jobForm.warningRibbon} onChange={(e) => handleJobFormChange(e, 'warningRibbon')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Is the worker working alone?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="workerWorking" name="workerWorking" value={jobForm.workerWorking} onChange={(e) => handleJobFormChange(e, 'workerWorking')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormLabel component="legend">If yes, explain</FormLabel>
                    <TextField
                      variant="outlined"
                      id="immediate-actions"
                      multiline
                      rows="4"
                      label="Emergency Phone Number"
                      className={classes.fullWidth}
                      value={jobForm.workerRemarks}
                      onChange={(e) => handleJobFormChange(e, 'workerRemarks')}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Are all permit(s) closed out?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="permitClosedOut" name="permitClosedOut" value={jobForm.permitClosedOut} onChange={(e) => handleJobFormChange(e, 'permitClosedOut')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Are there Hazards remaining?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="hazardsRemaining" name="hazardsRemaining" value={jobForm.hazardsRemaining} onChange={(e) => handleJobFormChange(e, 'hazardsRemaining')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Was the area cleaned up at the end of job/shift?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="endOfJob" name="endOfJob" value={jobForm.endOfJob} onChange={(e) => handleJobFormChange(e, 'endOfJob')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Were there any incidents/injuries?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="anyIncidents" name="anyIncidents" value={jobForm.anyIncidents} onChange={(e) => handleJobFormChange(e, 'anyIncidents')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <FormLabel component="legend">If Yes, please provide details</FormLabel>
                    <TextField
                      variant="outlined"
                      id="jobCompletionRemarks"
                      multiline
                      rows="4"
                      label="Enter the details"
                      value={jobForm.jobCompletionRemarks}
                      onChange={(e) => handleJobFormChange(e, 'jobCompletionRemarks')}
                      className={classes.fullWidth}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Do you want to continue to creating an Incident?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="creatingIncident" name="creatingIncident" value={jobForm.creatingIncident} onChange={(e) => handleJobFormChange(e, 'creatingIncident')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Box marginTop={4}>
                    <Button size="medium" variant="outlined" color="primary" className={classes.spacerRight}>
                  Acknowledge
                    </Button>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Box marginTop={4}>
                    <Button size="medium" variant="contained" color="primary" className={classes.spacerRight}>
                  Submit and confirm with an incident
                    </Button>
                  </Box>
                  <Box marginTop={4}>
                    <Button size="medium" variant="contained" color="primary" onClick={() => handleFormSubmit()} className={classes.spacerRight}>
                  Submit
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </PapperBlock>
    </div>
  );
};

export default CloseOut;
