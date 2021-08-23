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
import { PapperBlock } from 'dan-components';

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
import FormSideBar from "../../../../containers/Forms/FormSideBar";

import api from "../../../../utils/axios";

import { AHA } from "../constants";


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
    // '& .MuiInputBase-root': {
    //   borderRadius: '4px',
    // },
    margin: '.5rem 0',
    width: '100%',
    // '& .MuiOutlinedInput-root': {
    //   boxShadow: 'inset 0px 0px 9px #dedede',
    // },
    // '& .MuiOutlinedInput': {
    //   boxShadow: 'inset 0px 0px 9px #dedede',
    // },
  },
  fullWidth: {
    width: '100%',
    margin: '.2rem 0',
    //boxShadow: 'inset 0px 0px 9px #dedede',
	'& td textHeight': {
		padding: '2.5px 5px',
    	borderRadius: '8px',
	  },
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
  // customCheckBoxList: {
  //   display: 'block',
  //   '& .MuiFormControlLabel-root': {
  //     width: '30%',
  //     [theme.breakpoints.down("xs")]: {
  //       width: '48%',
  //     },
  //   },
  // },
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
  // divider: {
	//   margin: '15px 15px',
  //   width: '97.4%',
  //   boxShadow: '1px 2px 10px #d4d4d4',
  // },
}));

const Assessment = () => {

  const [form , setForm] = useState([])
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [expanded, setExpanded] = React.useState('panel');
  
  const handleTwoChange = (panel) => (event, isExpanded ) => {
    setExpanded(isExpanded ? panel : false);
  };
  const fetchHzardsData = async () => {
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`)
    const result = res.data.data.results.results
    await setForm(result)
  }

console.log(form)
  useEffect(() => {
    fetchHzardsData()
  },[])

  const classes = useStyles();
  return (
    <>            <PapperBlock title="Assessments" icon="ion-md-list-box">
        <Grid container spacing={3} className={classes.observationNewSection}>


        <Grid container spacing={3} item xs={12} md={9}>
  
      {/* <Grid
      item
      md={12}
      xs={12}
      //className={classes.formBox}
      >
        <MUIDataTable
          title="Detailed Project Area Hazard Assessment"
          data={data}
          columns={columns}
          options={options}
          className={classes.tableSection}
        />

      </Grid> */}

      <Grid item sm={12} xs={12} className={classes.mttopBottomThirty}>
      <div>{form.map((value , index)=> (
        <Accordion expanded={expanded === 'panel'} onChange={handleTwoChange('panel')} defaultExpanded className={classes.backPaper} key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={classes.headingColor}
          >
            <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} /> {value.hazard}</Typography>  
          </AccordionSummary>
            <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                    variant="outlined"
                    id="immediate-actions"
                    multiline
                    rows="1"
                    label="Identify risk"
                    defaultValue={value.risk ? value.risk : ""}
                    className={classes.fullWidth}
                  />
              </Grid>
              
              <Grid item md={4} sm={4} xs={12}>
                <FormControl
                  variant="outlined"
                  requirement
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-label">
                    Risk Severity
                  </InputLabel>
                  <Select
                    labelId="incident-type-label"
                    id="incident-type"
                    label="Incident Type"
                  >
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} sm={4} xs={12}>
                <FormControl
                  variant="outlined"
                  requirement
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-label">
                    Risk Probability
                  </InputLabel>
                  <Select
                    labelId="incident-type-label"
                    id="incident-type"
                    label="Incident Type"
                  >
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} sm={4} xs={12}> 
                <div className={classes.ratioColororange}>50% Risk</div>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                    variant="outlined"
                    id="immediate-actions"
                    multiline
                    rows="1"
                    label="Identify controls"
                    className={classes.fullWidth}
                  />
              </Grid>
              <Grid item md={4} sm={4} xs={12}>
                <FormControl
                  variant="outlined"
                  requirement
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-label">
                  Evaluate Residual risk
                  </InputLabel>
                  <Select
                    labelId="incident-type-label"
                    id="incident-type"
                    label="Eveluate residual risk"
                  >
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} sm={4} xs={12}>
                <FormControl
                  variant="outlined"
                  requirement
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-label">
                  Approve to implement
                  </InputLabel>
                  <Select
                    labelId="incident-type-label"
                    id="incident-type"
                    label="Eveluate residual risk"
                  >
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item md={4} sm={4} xs={12}>
                <FormControl
                  variant="outlined"
                  requirement
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-label">
                  Monitor
                  </InputLabel>
                  <Select
                    labelId="incident-type-label"
                    id="incident-type"
                    label="Eveluate residual risk"
                  >
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                    <MenuItem>One</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} className={classes.createHazardbox}>
                <Divider light />
              </Grid>
              
              <Grid item xs={12} className={classes.createHazardbox}>

                <Typography className={classes.increaseRowBox}>
                  <ControlPointIcon />
                  <span className={classes.addLink}><Link to="">New action</Link></span>
                </Typography>

                {/* <Button
                  variant="contained" 
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  className={classes.button}
                    >
                        Action item
                  </Button> */}
              </Grid>        
            </Grid>  
            </AccordionDetails>
          </Accordion>

      ))}
        
          {/* <Accordion expanded={expanded === 'panel2'} onChange={handleTwoChange('panel2')} className={classes.backPaper}>
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
          </Accordion> */}
        </div>

      </Grid>





        <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">Discuss and document conditions when the work must be Stopped</FormLabel>
            <FormGroup className={classes.customCheckBoxList}>
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
        <Grid item xs={12} md={3}>
        <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Assessment"
              />
</Grid>
    </Grid>
    </PapperBlock>
    </>
  );
};

export default Assessment;