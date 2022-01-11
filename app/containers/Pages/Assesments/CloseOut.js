import React, { useEffect, useState } from 'react';
import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import flhaLogoSymbol from 'dan-images/flhaLogoSymbol.png';

import { useHistory } from 'react-router';
import api from '../../../utils/axios';
import CloseOutFlhaValidation from "./validation/CloseOutValidation";
import { INITIAL_NOTIFICATION_FORM_NEW } from "../../../utils/constants"



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

const CloseOut = (props) => {
  const history = useHistory();
  const classes = useStyles();

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
    fkProjectId: '',
    flhaStage: ""
  });

  const [loading, setLoading] = useState(false)
  const { id } = props.match.params;
  const [error, setError] = useState({})

  const setFlhaDetails = async () => {
    const { id } = props.match.params;
    const { fkCompanyId } = JSON.parse(localStorage.getItem('company'));
    const fkProjectId = JSON.parse(localStorage.getItem('projectName')).projectName.projectId;
    const temp = { ...jobForm };
    temp.fkCompanyId = fkCompanyId;
    temp.fkProjectId = fkProjectId;
    const res = await api.get('/api/v1/flhas/' + id + '/')
    const flha = res.data.data.results;
    setJobForm({
      preUseInspection: flha.preUseInspection,
      warningRibbon: flha.warningRibbon,
      workerWorking: flha.workerWorking,
      workerRemarks: flha.workerRemarks,
      permitClosedOut: flha.permitClosedOut,
      hazardsRemaining: flha.hazardsRemaining,
      endOfJob: flha.endOfJob,
      anyIncidents: flha.anyIncidents,
      jobCompletionRemarks: flha.jobCompletionRemarks,
      creatingIncident: flha.creatingIncident,
      jobTitle: flha.jobTitle,
      jobDetails: flha.jobDetails,
      fkCompanyId: flha.fkCompanyId,
      fkProjectId: flha.fkProjectId,
      flhaStage: flha.flhaStage
    })
  };

  const handleJobFormChange = async (e, fieldname) => {
    const temp = { ...jobForm };
    const { value } = e.target;
    temp[fieldname] = value;
    await setJobForm(temp);
  };

  const handleFormSubmit = async () => {
    const { error, isValid } = CloseOutFlhaValidation(jobForm);
    setError(error)
    if (Object.keys(error).length === 0) {
      jobForm["flhaStage"] = "Close"
      jobForm["flhaStatus"] = "Close"
      const res = await api.put('/api/v1/flhas/' + id + '/', jobForm);
      if (jobForm.creatingIncident === "Yes") {
        history.push(INITIAL_NOTIFICATION_FORM_NEW["Incident details"])
      } else {
        history.push('/app/pages/assesments/flhasummary/' + id);
      }
    }
  };

  const handelCallBack = async () => {
    await setLoading(true)
    await setFlhaDetails()
    await setLoading(false)
  }

  useEffect(() => {
    handelCallBack()
  }, [open]);

  return (
    <CustomPapperBlock title="FLHA - Close Out" icon='customDropdownPageIcon flhaPageIcon' whiteBg>
      {loading == false ?
        <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg id="baseline-cancel-24px" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                <path id="Path_1990" data-name="Path 1990" d="M12,2A10,10,0,1,0,22,12,9.991,9.991,0,0,0,12,2Zm5,13.59L15.59,17,12,13.41,8.41,17,7,15.59,10.59,12,7,8.41,8.41,7,12,10.59,15.59,7,17,8.41,13.41,12Z" fill="#06425c" />
                <path id="Path_1991" data-name="Path 1991" d="M0,0H24V24H0Z" fill="none" />
              </svg> Close out
            </Typography>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              {/* <Grid item md={12} xs={12}>
                <FormControl
                  component="fieldset"
                  error={true}
                >
                  <FormLabel
                    component="legend"
                    className="checkRadioLabel"
                  >
                    Has a pre-use inspection of tools/equipment been completed?*
                  </FormLabel>
                  <RadioGroup
                    className={classes.radioInline}
                    aria-label="preUseInspection"
                    name="preUseInspection"
                    value={jobForm.preUseInspection}
                    onChange={(e) => handleJobFormChange(e, 'preUseInspection')}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                {error && error["preUseInspection"] && (
                  <FormHelperText style={{ color: "red" }}>
                    {error["preUseInspection"]}
                  </FormHelperText>
                )}
              </Grid>

              <Grid
                item
                md={6}
                sm={6}
                xs={12}
              >
                <FormControl
                  component="fieldset"
                >
                  <FormLabel
                    component="legend"
                    className="checkRadioLabel"
                  >
                    Is a warning ribbon need?*
                  </FormLabel>
                  <RadioGroup
                    className={classes.radioInline}
                    aria-label="warningRibbon"
                    name="warningRibbon"
                    value={jobForm.warningRibbon}
                    onChange={(e) => handleJobFormChange(e, 'warningRibbon')}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                {error && error["warningRibbon"] && (
                  <FormHelperText style={{ color: "red" }}>
                    {error["warningRibbon"]}
                  </FormHelperText>
                )}
              </Grid>

              <Grid
                item
                md={6}
                sm={6}
                xs={12}
              >
                <FormControl
                  component="fieldset"
                >
                  <FormLabel
                    component="legend"
                    className="checkRadioLabel"
                  >
                    Is the worker working alone?*
                  </FormLabel>
                  <RadioGroup
                    className={classes.radioInline}
                    aria-label="workerWorking"
                    name="workerWorking"
                    value={jobForm.workerWorking}
                    onChange={(e) => handleJobFormChange(e, 'workerWorking')}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                {error && error["workerWorking"] && (
                  <FormHelperText style={{ color: "red" }}>
                    {error["workerWorking"]}
                  </FormHelperText>
                )}
              </Grid>

              {jobForm.workerWorking === "Yes" || jobForm.workerWorking == null ?
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <FormLabel
                    component="legend"
                    className="checkRadioLabel"
                  >
                    If yes, explain
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    id="immediate-actions"
                    multiline
                    rows="4"
                    label="Enter the details"
                    className={classes.fullWidth}
                    value={jobForm.workerRemarks}
                    onChange={(e) => handleJobFormChange(e, 'workerRemarks')}
                  />
                  {error && error["workerRemarks"] && (
                    <FormHelperText style={{ color: "red" }}>
                      {error["workerRemarks"]}
                    </FormHelperText>
                  )}
                </Grid>
                :
                null
              } */}

              <Grid item md={6} sm={6} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="checkRadioLabel">Are all permit(s) closed out?*</FormLabel>
                  <RadioGroup className={classes.radioInline} aria-label="permitClosedOut" name="permitClosedOut" value={jobForm.permitClosedOut} onChange={(e) => handleJobFormChange(e, 'permitClosedOut')}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
                {error && error["permitClosedOut"] && (
                  <FormHelperText style={{ color: "red" }}>
                    {error["permitClosedOut"]}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="checkRadioLabel">Are there Hazards remaining?*</FormLabel>
                  <RadioGroup className={classes.radioInline} aria-label="hazardsRemaining" name="hazardsRemaining" value={jobForm.hazardsRemaining} onChange={(e) => handleJobFormChange(e, 'hazardsRemaining')}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
                {error && error["hazardsRemaining"] && (
                  <FormHelperText style={{ color: "red" }}>
                    {error["hazardsRemaining"]}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="checkRadioLabel">Was the area cleaned up at the end of job/shift?*</FormLabel>
                  <RadioGroup className={classes.radioInline} aria-label="endOfJob" name="endOfJob" value={jobForm.endOfJob} onChange={(e) => handleJobFormChange(e, 'endOfJob')}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
                {error && error["endOfJob"] && (
                  <FormHelperText style={{ color: "red" }}>
                    {error["endOfJob"]}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="checkRadioLabel">Were there any incidents/injuries?*</FormLabel>
                  <RadioGroup className={classes.radioInline} aria-label="anyIncidents" name="anyIncidents" value={jobForm.anyIncidents} onChange={(e) => handleJobFormChange(e, 'anyIncidents')}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
                {error && error["anyIncidents"] && (
                  <FormHelperText style={{ color: "red" }}>
                    {error["anyIncidents"]}
                  </FormHelperText>
                )}
              </Grid>

              {jobForm.anyIncidents === "Yes" || jobForm.anyIncidents == null ?
                <Grid item md={12} xs={12}>
                  <FormLabel component="legend" className="checkRadioLabel">If Yes, please provide details</FormLabel>
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
                  {error && error["jobCompletionRemarks"] && (
                    <FormHelperText style={{ color: "red" }}>
                      {error["jobCompletionRemarks"]}
                    </FormHelperText>
                  )}
                </Grid>
                :
                null
              }

              <Grid item md={6} sm={6} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="checkRadioLabel">Do you want to continue to creating an Incident?*</FormLabel>
                  <RadioGroup className={classes.radioInline} aria-label="creatingIncident" name="creatingIncident" value={jobForm.creatingIncident} onChange={(e) => handleJobFormChange(e, 'creatingIncident')}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
                {error && error["creatingIncident"] && (
                  <FormHelperText style={{ color: "red" }}>
                    {error["creatingIncident"]}
                  </FormHelperText>
                )}
              </Grid>

              {false &&
                <Grid item md={12} sm={12} xs={12} className="paddTRemove formFieldBTNSection">
                  <Button className="marginT0" variant="outlined">Acknowledge </Button>
                </Grid>
              }
            </Paper>

            {false &&
              <Grid item md={12} xs={12} className="buttonActionArea marginT10">
                <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle">
                  Submit and confirm with an incident
                </Button>
              </Grid>
            }

            <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
              <Button
                size="medium"
                variant="contained"
                color="primary"
                disabled={jobForm.flhaStage === "Close" ? true : false}
                className="spacerRight buttonStyle"
                onClick={() => handleFormSubmit()}
              >
                Closeout
              </Button>
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                className="buttonStyle custmCancelBtn"
                onClick={() => history.push('/app/pages/assesments/flhasummary/' + id)}
              >
                Cancel
              </Button>
            </Grid>

          </Grid>
        </Grid>

        // </Paper>
        : "Loading..."}
    </CustomPapperBlock>
  );
};

export default CloseOut;
