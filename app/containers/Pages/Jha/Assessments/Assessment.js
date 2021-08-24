import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';

import MenuItem from '@material-ui/core/MenuItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';




const useStyles = makeStyles((theme) => ({
  // const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  observationNewSection: {

  },
  coponentTitleBox: {
    '& h5': {
      paddingBottom: '20px',
      borderBottom: '1px solid #ccc',
    },
  },
  formControl: {
    margin: '.5rem 0',
    width: '100%',
  },
  labelName: {
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    color: '#737373',
  },
  labelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
  },
  custmSubmitBtn: {
    color: '#ffffff',
    backgroundColor: '#06425c',
    lineHeight: '30px',
    border: 'none',
    marginTop: '12px',
    '&:hover': {
      backgroundColor: '#ff8533',
      border: 'none',
    },
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
  customCheckBoxList: {
    display: 'block',
    '& .MuiFormControlLabel-root': {
      width: '30%',
      [theme.breakpoints.down("xs")]: {
        width: '48%',
      },
    },
  },
  createHazardbox: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    '& button': {
      marginTop: '8px',
    },
  },
  tableSection: {
    '& .MuiToolbar-root': {
      paddingLeft: '15px',
      paddingRight: '15px',
    },
    '& .MuiToolbar-root.MuiToolbar-regular': {
      minHeight: '40px',
      paddingTop: '20px',
    },
    '& h6': {
      fontSize: '18px',
      fontWeight: '400',
      color: '#06425c',
    },
    '& div table': {
      marginTop: '10px',
    },
    '& table thead th': {
      padding: '5px 16px',
    },
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
    //boxShadow: 'inset 0px 0px 9px #dedede',
    '& td textHeight': {
      padding: '2.5px 5px',
      borderRadius: '8px',
    },
  },
  ratioColorgreen: {
    backgroundColor: 'green',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  ratioColorred: {
    backgroundColor: 'red',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  ratioColororange: {
    backgroundColor: 'orange',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  increaseRowBox: {
    marginTop: '10px',
    color: '#06425c',
  },
}));

const Assessment = () => {

  const [form, setForm] = useState([])

  const handelCheckList = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/jobhazards/`)
    const apiData = res.data.data.results.results
    setForm(apiData)
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [expanded, setExpanded] = React.useState('panel');

  const handleTwoChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();

  useEffect(() => {
    handelCheckList()
  }, [])

  return (
    <>
      <Grid container spacing={3} className={classes.observationNewSection}>
        <Grid
          item
          md={12}
          xs={12}
        >

          <div>
            <Accordion expanded={expanded === 'panel'} onChange={handleTwoChange('panel')} defaultExpanded className={classes.backPaper}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.headingColor}
              >
                <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} /> Hazard#1 - Hazard Name</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>

                  <Grid item md={4} sm={4} xs={12}>
                    <FormControl
                      variant="outlined"
                      requirement
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Job step
                      </InputLabel>
                      <Select
                        labelId="jobstep_label"
                        id="jobstep_label"
                        label="Job step"
                      >
                        <MenuItem>One</MenuItem>
                        <MenuItem>One</MenuItem>
                        <MenuItem>One</MenuItem>
                        <MenuItem>One</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} sm={4} xs={12}>
                    <TextField
                      variant="outlined"
                      id="potentialhazards"
                      //multiline
                      //rows="1"
                      label="Potential Hazards"
                      className={classes.fullWidth}
                    />
                  </Grid>
                  <Grid item md={4} sm={4} xs={12}>
                    <div className={classes.ratioColororange}>50% Risk</div>
                  </Grid>

                  <Grid item md={12} sm={12} xs={12}>
                    <TextField
                      variant="outlined"
                      id="controls"
                      multiline
                      rows="1"
                      label="Controls"
                      className={classes.fullWidth}
                    />
                  </Grid>
                  <Grid item md={12} xs={12} className={classes.createHazardbox}>
                    <Divider light />
                  </Grid>

                  <Grid item xs={12} className={classes.createHazardbox}>
                    <Typography className={classes.increaseRowBox}>
                      <ControlPointIcon />
                      <span className={classes.addLink}><Link to="">New action</Link></span>
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleTwoChange('panel2')} className={classes.backPaper}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                className={classes.headingColor}
              >
                <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} /> Hazard#3 - Hazard Name</Typography>

              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Dummy content
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleTwoChange('panel3')} className={classes.backPaper}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                className={classes.headingColor}
              >
                <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} />Hazard#2 - Hazard Name </Typography>

              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Dummy content
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleTwoChange('panel4')} className={classes.backPaper}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
                className={classes.headingColor}
              >
                <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} /> Hazard#4 - Hazard Name </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Dummy content
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.createHazardbox}
          style={{ marginTop: '35px', marginBottom: '10px' }}
        >
          <Typography variant="h6" gutterBottom className={classes.labelName}>Specific human performance aspects that have been discussed  before commencing the work</Typography>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormLabel className={classes.labelName} component="legend">Category#1</FormLabel>
          <FormGroup row className={classes.customCheckBoxList}>
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 1"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 2"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 3"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 4"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 5"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 6"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 7"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormLabel className={classes.labelName} component="legend">Category#2</FormLabel>
          <FormGroup row className={classes.customCheckBoxList}>
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 1"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 2"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 3"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 4"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 5"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 6"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 7"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.createHazardbox}
          style={{ marginTop: '35px' }}
        >
          <Typography variant="h6" gutterBottom className={classes.labelName}>Discuss and document conditions when the work must be stopped</Typography>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormGroup>
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Safety concern is raised by crew member(s)"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Unauthorized entry into a barricaded area"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Gas testing results exceeds the acceptable limit"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 3"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 4"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="Option 5"
            />
            <FormControlLabel
              className={classes.labelValue}
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  onChange={handleChange}
                />
              )}
              label="...."
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <TextField
            label="Additional Remarks"
            margin="dense"
            name="additionalremarks"
            id="additionalremarks"
            multiline
            rows={4}
            defaultValue=""
            fullWidth
            variant="outlined"
            className={classes.formControl}
          />
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Next</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Assessment;