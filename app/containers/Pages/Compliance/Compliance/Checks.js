import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
  DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import classNames from "classnames";

import Styles from 'dan-styles/Summary.scss';
import Fonts from 'dan-styles/Fonts.scss';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

import Rating from '@material-ui/lab/Rating';
import DeleteIcon from '@material-ui/icons/Delete';
import icoExcel from 'dan-images/icoExcel.svg';
import icoAudio from 'dan-images/icoAudio.svg';
import icoPDF from 'dan-images/icoPDF.svg';
import icoPng from 'dan-images/icoPng.svg';
import icoVideo from 'dan-images/icoVideo.svg';
import FormSideBar from "../../../Forms/FormSideBar";
import {COMPLIANCE} from "../Constants/Constants"
import {useParams , useHistory} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
// const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
    width: '100%',
  },
  coponentTitleBox: {
    '& h5': {
      paddingBottom: '20px',
      borderBottom: '1px solid #ccc',
    },
  },
  formControl: {
    '& .MuiInputBase-root': {
      borderRadius: '4px',
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
    fontWeight: '500',
    color: '#063d55',
  },
  custmSubmitBtn: {
    color: '#ffffff',
    backgroundColor: '#06425c',
    lineHeight: '30px',
    border: 'none',
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
        padding: '12px',
        borderWidth: '2px',
        borderRadius: '5px',
        borderColor: '#CBCBCB',
        borderStyle: 'dashed',
        backgroundColor: '#ffffff',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        marginTop: '10px',
        marginBottom: '10px',
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
  inputFieldWithLabel: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    '& button': {
        marginTop: '8px',
    },
  },

    accordingHeaderContentLeft: {
        display: 'inline-block',
        width: 'auto',
        padding: '0px',
    },
    accordingHeaderContentRight: {
        display: 'inline-block',
        float: 'right',
        '& li': {
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            '& span': {
                display: 'inline-block',
            },
            '& p': {
                display: 'inline-block',
                fontSize: '1rem !important',
                fontWeight: '500 !important',
                color: '#063d55',
                paddingLeft: '5px',
            },
        },
    },
    accordingHeaderContentleft: {
        display: 'inline-block',
        float: 'left',
        '& li': {
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            '& span': {
                display: 'inline-block',
            },
            '& p': {
                display: 'inline-block',
                fontSize: '1rem !important',
                fontWeight: '500 !important',
                color: '#063d55',
                paddingLeft: '5px',
            },
        },
    },
    accordingHeaderContent: {
        display: 'inline-block',
        color: '#000',
        width: 'auto',
        float: 'left',
    },
    aLabelValue: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#063d55',
        float: 'left',
        width: '100%',
    },
    updateLink: {
        float: 'left',
        fontSize: '0.88rem',
        fontWeight: '400',
        lineHeight: '1.2',
        '& a': {
            cursor: 'pointer',
            textDecoration: 'underline',
        },
    },
    actionTitleLable: {
        float: 'right',
        width: 'calc(100% - 100px)',
        textAlign: 'right',
    },
    catSetionSeparatorBox: {
        marginTop: '15px',
        marginBottom: '30px',
    },
    // backPaperAccordian: {
    //     marginBottom: '10px',
    //     border: '1px solid #06425c',
    // },
    custmCancelBtn: {
        color: '#ffffff',
        backgroundColor: '#ff8533',
        lineHeight: '30px',
        marginLeft: '5px',
        border: 'none',
        '&:hover': {
          backgroundColor: '#ff8533',
          border: 'none',
        },
      },
      custmSaveBtn: {
        color: '#ffffff',
        backgroundColor: '#06425c',
        lineHeight: '30px',
        marginLeft: '5px',
        border: 'none',
        '&:hover': {
          backgroundColor: '#ff8533',
          border: 'none',
        },
      },
      ratioColororange: {
        //backgroundColor: 'orange',
        padding: '16px!important',
        height: '70%',
        marginTop: '7px',
        borderRadius: '5px',
        //color: '#ffffff'
      },
}));

const styles = (theme) => ({
rootPop: {
    margin: 0,
    padding: theme.spacing(2),
},
closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
},
});

const Checks = () => {
    const history = useHistory();
    //const [expanded, setExpanded] = React.useState('panel1');
    const [expandedTableDetail, setExpandedTableDetail] = React.useState('panel4');
    // const handleExpand = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };
    const handleTDChange = (panel) => (event, isExpanded ) => {
        setExpandedTableDetail(isExpanded ? panel : false);
    };

//   const [state, setState] = React.useState({
//     checkedA: true,
//     checkedB: true,
//     checkedF: true,
//     checkedG: true,
//   }); 

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
        <img src={icoExcel} alt="excel-icon" />
      {' '}
      {file.path}
      {' '}
-
      {file.size}
      {' '}
        bytes <DeleteIcon />
    </li>
  ));

  const Criticality = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'criticality',
      label: 'Criticality',
    },
    {
      value: 'criticality1',
      label: 'Criticality 1',
    },
  ];
  const Status = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'status',
      label: 'Status',
    },
    {
      value: 'status1',
      label: 'Status 1',
    },
  ];
  
  const [selectedActionDate, setSelectedActionDate] = useState(new Date());
  const [myUserPOpen, setMyUserPOpen] = React.useState(false);
  const handleActionDateChange = (date) => {
    setSelectedActionDate(date);
  };
  const handleMyUserPClickOpen = () => {
    setMyUserPOpen(true);
  };
  const handleMyUserPClose = () => {
    setMyUserPOpen(false);
  };

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.rootPop} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const [value, setValue] = React.useState(1);
  const handelSubmit =() => {
      history.push("/app/pages/compliance/performance-summary")
  }
  const classes = useStyles();
  return (
        <>
            <Grid container spacing={3}>
            <Grid container spacing={3} item xs={12} md={9}>

                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 49.737 39">
                            <g id="check-30" transform="translate(-100.352 -178.176)">
                                <path id="Path_6414" data-name="Path 6414" d="M100.352,178.176v33.94h39.493v-33.94Zm37.025,31.348H102.82v-28.88h34.557Z" transform="translate(0)" fill="#06425c"/>
                                <path id="Path_6415" data-name="Path 6415" d="M192.512,333.824h4.32v3.456h-4.32Z" transform="translate(-86.606 -146.268)" fill="#06425c"/>
                                <path id="Path_6416" data-name="Path 6416" d="M286.72,352.256h21.968v1.234H286.72Z" transform="translate(-175.137 -163.59)" fill="#06425c"/>
                                <path id="Path_6417" data-name="Path 6417" d="M286.72,466.944h21.968v1.234H286.72Z" transform="translate(-175.137 -271.366)" fill="#06425c"/>
                                <path id="Path_6418" data-name="Path 6418" d="M286.72,585.728h21.968v1.234H286.72Z" transform="translate(-175.137 -382.992)" fill="#06425c"/>
                                <path id="Path_6419" data-name="Path 6419" d="M192.512,448.512h4.32v3.456h-4.32Z" transform="translate(-86.606 -254.045)" fill="#06425c"/>
                                <path id="Path_6420" data-name="Path 6420" d="M192.512,567.3h4.32v3.456h-4.32Z" transform="translate(-86.606 -365.671)" fill="#06425c"/>
                                <path id="Path_6421" data-name="Path 6421" d="M308.978,300.173l-3.826,2.962s9.75,8.269,15.3,16.044c0,0,3.456-13.452,22.092-30.361l-.864-2.1s-10.861,5.06-23.7,21.1A79.707,79.707,0,0,0,308.978,300.173Z" transform="translate(-192.458 -102.003)" fill="#06425c"/>
                            </g>
                        </svg> Checks
                    </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <FormLabel component="legend" className="viewLabel">Compliance type</FormLabel>
                                <Typography className="viewLabelValue">
                                    General Inspection
                                </Typography>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormLabel component="legend" className="viewLabel">Work area information</FormLabel>
                                <Typography className="viewLabelValue">
                                    Work area 11
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel className="checkRadioLabel" component="legend">Environment</FormLabel>
                                <span className={classes.accordingHeaderContentleft}>
                                    <ListItem className={classes.accordingHeaderContent}>
                                        <ListItemText className="viewLabelValueListTag" primary="Total score: " secondary="25" />
                                    </ListItem>
                                    <ListItem className={classes.accordingHeaderContent}>
                                        <ListItemText className="viewLabelValueListTag" primary="Acceptable score: " secondary="<as per admin config>" />
                                    </ListItem>
                                </span>
                                <Grid container item xs={12}>
                                    <Grid item md={12}>
                                        <div>
                                            <Accordion expanded={expandedTableDetail === 'panel4'} onChange={handleTDChange('panel4')} defaultExpanded className="backPaperAccordian">
                                                <AccordionSummary

                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className="accordionHeaderSection"
                                                >
                                                    <List className={classes.heading}>
                                                        <ListItem className={classes.accordingHeaderContentLeft}>
                                                            <ListItemText primary="Welding machines used are tested and properly connected" />
                                                        </ListItem>
                                                    </List>  
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            xs={12}
                                                        >
                                                            <TextField
                                                                label="Criticality*"
                                                                name="criticality"
                                                                id="criticality"
                                                                select
                                                                fullWidth
                                                                variant="outlined"
                                                                className="formControl"
                                                            >
                                                                {Criticality.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            xs={12}
                                                            >
                                                            <TextField
                                                                label="Status*"
                                                                name="status"
                                                                id="status"
                                                                select
                                                                fullWidth
                                                                variant="outlined"
                                                                className="formControl"
                                                            >
                                                                {Status.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            xs={12}
                                                        >
                                                            <TextField
                                                            label="Performance rating"
                                                            //margin="dense"
                                                            name="performancerating"
                                                            id="performancerating"
                                                            defaultValue="35%"
                                                            fullWidth
                                                            variant="outlined"
                                                            className="formControl"
                                                            />
                                                        </Grid>
                                                        {/* 
                                                        <Grid item md={4} sm={4} xs={12} className={classes.ratioColororange}>                
                                                            50% Risk
                                                        </Grid> */}
                                                        <Grid
                                                        item
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                        >
                                                            <TextField
                                                                label="Findings"
                                                                name="findings"
                                                                id="findings"
                                                                multiline
                                                                rows={4}
                                                                defaultValue=""
                                                                fullWidth
                                                                variant="outlined"
                                                                className="formControl"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={12}
                                                            sm={12}
                                                            xs={12}
                                                        >
                                                            <FormLabel className="checkRadioLabel marginB5" component="legend">Score</FormLabel>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            sm={4}
                                                            xs={12}
                                                        >
                                                            <Rating
                                                                name="simple-controlled"
                                                                value={value}
                                                                onChange={(event, newValue) => {
                                                                    setValue(newValue);
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            sm={4}
                                                            xs={12}
                                                        >
                                                            <FormControl variant="outlined" className="formControl">
                                                                <InputLabel id="demo-simple-select-outlined-label">Counts</InputLabel>
                                                                <Select
                                                                    labelId="scoreCount"
                                                                    id="scoreCount"
                                                                    // onChange={handleChangeOne}
                                                                    label="Counts"
                                                                    className="formControl"
                                                                    fullWidth
                                                                >
                                                                    <MenuItem value={1}>1</MenuItem>
                                                                    <MenuItem value={2}>2</MenuItem>
                                                                    <MenuItem value={3}>3</MenuItem>
                                                                    <MenuItem value={4}>4</MenuItem>
                                                                    <MenuItem value={5}>5</MenuItem>
                                                                    <MenuItem value={6}>6</MenuItem>
                                                                    <MenuItem value={7}>7</MenuItem>
                                                                    <MenuItem value={8}>8</MenuItem>
                                                                    <MenuItem value={9}>9</MenuItem>
                                                                    <MenuItem value={10}>10</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            sm={4}
                                                            xs={12}
                                                        >
                                                            <TextField
                                                                label="Percentage"
                                                                name="performancerating"
                                                                id="performancerating"
                                                                // defaultValue="20%"
                                                                fullWidth
                                                                variant="outlined"
                                                                className="formControl"
                                                            />
                                                        </Grid>

                                                        <Grid
                                                            item
                                                            md={12}
                                                            xs={12}
                                                        >
                                                            <FormLabel className="checkRadioLabel" component="legend">Create Action </FormLabel>
                                                            <Button variant="outlined" size="medium" className={classes.custmSubmitBtn} onClick={(e) => handleMyUserPClickOpen(e)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 75 50">
                                                                    <g id="Group_336" data-name="Group 336" transform="translate(-338 -858)">
                                                                    <g id="baseline-flash_auto-24px" transform="translate(364 871)">
                                                                        <path id="Path_1634" data-name="Path 1634" d="M0,0H24V24H0Z" fill="none"/>
                                                                        <path id="Path_1635" data-name="Path 1635" d="M3,2V14H6v9l7-12H9l4-9ZM19,2H17l-3.2,9h1.9l.7-2h3.2l.7,2h1.9ZM16.85,7.65,18,4l1.15,3.65Z" fill="#ffffff"/>
                                                                    </g>
                                                                    </g>
                                                                </svg>
                                                            </Button>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={12}
                                                            xs={12}
                                                        >
                                                            <Table component={Paper} className="simpleTableSection" >
                                                                <TableHead>
                                                                    <TableRow>
                                                                    <TableCell className="tableHeadCellFirst">Action number</TableCell>
                                                                    <TableCell className="tableHeadCellSecond">Action title</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                    <TableCell align="left">
                                                                        <Link to="#">AT-211004-012</Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        Action 1 for iCare-211004-002
                                                                    </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                    <TableCell align="left">
                                                                        <Link to="#">AT-211004-012</Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        Action 1 for iCare-211004-002
                                                                    </TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </Grid>
                                                        
                                                        {/* <Grid item md={10} xs={12}>
                                                            <Typography variant="label" gutterBottom className={classes.labelName}>
                                                                Corrective Actions
                                                            </Typography>
                                                            <Typography className={classes.aLabelValue}>
                                                                <span className={classes.updateLink}><Link to="">AL-nnnnn</Link></span>
                                                                <div className={classes.actionTitleLable}>Action title</div>
                                                            </Typography>
                                                            <Typography className={classes.aLabelValue}>
                                                                <span className={classes.updateLink}><Link to="">AL-nnnnn</Link></span>
                                                                <div className={classes.actionTitleLable}>Action title</div>
                                                            </Typography>

                                                            <Typography className={classes.increaseRowBox}>
                                                                <ControlPointIcon />
                                                                <span className={classes.addLink}><Link to="">Add action</Link></span>
                                                            </Typography>
                                                        </Grid> */}

                                                        <Dialog onClose={handleMyUserPClose} aria-labelledby="customized-dialog-title" open={myUserPOpen} >
                                                            <DialogTitle id="customized-dialog-title" onClose={handleMyUserPClose}>
                                                                Create a new action
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    <Grid container spacing={3}>
                                                                        <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        >
                                                                        <TextField
                                                                            label="Location*"
                                                                            //margin="dense"
                                                                            name="location"
                                                                            id="location"
                                                                            defaultValue=""
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            className="formControl"
                                                                        />
                                                                        </Grid>
                                                                        <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        >
                                                                        <FormControl
                                                                            //required
                                                                            variant="outlined"
                                                                            className="formControl"
                                                                        >
                                                                            <InputLabel id="project-name-label">Assignee</InputLabel>
                                                                            <Select
                                                                            id="assignee"
                                                                            labelId="assigneelabel"
                                                                            label="Assignee"
                                                                            >
                                                                            <MenuItem value="Prakash">Prakash</MenuItem>
                                                                            <MenuItem value="Mayank">Mayank</MenuItem>
                                                                            </Select>
                                                                            
                                                                        </FormControl>
                                                                        </Grid>
                                                                        <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                    >
                                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                        <KeyboardDateTimePicker
                                                                            className="formControl"
                                                                            //margin="dense"
                                                                            fullWidth
                                                                            label="Due Date*"
                                                                            value={selectedActionDate}
                                                                            onChange={handleActionDateChange}
                                                                            inputVariant="outlined"
                                                                        />
                                                                        </MuiPickersUtilsProvider>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        >
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            className="formControl"
                                                                        >
                                                                            <InputLabel id="project-name-label">Severity</InputLabel>
                                                                            <Select
                                                                            id="severity"
                                                                            labelId="Severitylabel"
                                                                            label="Severity"
                                                                            >
                                                                            <MenuItem value="Prakash">Prakash</MenuItem>
                                                                            <MenuItem value="Mayank">Mayank</MenuItem>
                                                                            </Select>
                                                                            
                                                                        </FormControl>
                                                                        </Grid>
                                                                    </Grid>
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button variant="outlined" size="medium" align="left" className={classes.custmSubmitBtn}>Create Action</Button>
                                                            </DialogActions>
                                                        </Dialog>

                                                        <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
                                                            <FormLabel className="checkRadioLabel" component="legend">Attachment </FormLabel>
                                                            <Typography className="viewLabelValue">
                                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                                <input {...getInputProps()} />
                                                                <span align="center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="39.4" height="28.69" viewBox="0 0 39.4 28.69">
                                                                    <g id="upload-outbox-svgrepo-com" transform="translate(0 0)">
                                                                        <g id="Group_4970" data-name="Group 4970" transform="translate(13.004)">
                                                                        <g id="Group_4969" data-name="Group 4969">
                                                                            <path id="Path_3322" data-name="Path 3322" d="M180.343,76.859l-6.73-8.242a.307.307,0,0,0-.236-.113.3.3,0,0,0-.237.111l-6.73,8.244a.293.293,0,0,0,.237.482h2.268V84.35c0,.169.307.321.476.321h7.934c.169,0,.143-.152.143-.321V77.341h2.64a.293.293,0,0,0,.237-.482Z" transform="translate(-166.342 -68.504)" fill="#7890a4"/>
                                                                        </g>
                                                                        </g>
                                                                        <g id="Group_4972" data-name="Group 4972" transform="translate(0 12.502)">
                                                                        <g id="Group_4971" data-name="Group 4971">
                                                                            <path id="Path_3323" data-name="Path 3323" d="M38.893,234.386h.038l-5.083-4.954a3.307,3.307,0,0,0-2.263-1.008H26.115a.611.611,0,0,0,0,1.222h5.471a2.253,2.253,0,0,1,1.434.68l3.7,3.6H25.2a.6.6,0,0,0-.611.594,4.579,4.579,0,0,1-9.158,0,.6.6,0,0,0-.611-.6H3.008L6.7,230.33a2.261,2.261,0,0,1,1.439-.684H13.9a.611.611,0,1,0,0-1.222H8.138a3.357,3.357,0,0,0-2.287,1.012L.765,234.31A1.879,1.879,0,0,0,0,235.725v7.025a2,2,0,0,0,1.989,1.862H37.725A1.732,1.732,0,0,0,39.4,242.75v-7.025A1.76,1.76,0,0,0,38.893,234.386Z" transform="translate(0 -228.424)" fill="#7890a4"/>
                                                                        </g>
                                                                        </g>
                                                                    </g>
                                                                    </svg>
                                                                </span>
                                                                <p className="chooseFileDesign">Drag and drop here or <span>Choose file</span></p>
                                                                </div>
                                                                <aside>
                                                                {/* <h4>Files</h4> */}
                                                                {/* <ul>{files}</ul> */}
                                                                    <ul className="attachfileListBox">
                                                                        <li><img src={icoExcel} alt="excel-icon" /> DocExcel - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                        <li><img src={icoPDF} alt="pdf-icon" /> DocPDF - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                        <li><img src={icoPng} alt="image-icon" /> ImageFile - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                        <li><img src={icoAudio} alt="audio-icon" /> AudioFile - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                        <li><img src={icoVideo} alt="video-icon" /> VideoFile - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                    </ul>
                                                                </aside>
                                                            </Typography>
                                                        </Grid>

                                                        {/* <Grid
                                                            item
                                                            md={10}
                                                            xs={12}
                                                            className={classes.formBox}
                                                        >
                                                            <Typography variant="label" gutterBottom className={classes.labelName}>
                                                                Attachment
                                                            </Typography>
                                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                            <input {...getInputProps()} />
                                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                                            </div>
                                                            <aside>
                                                            <ul>{files}</ul>
                                                            </aside>
                                                        </Grid> */}
                                                    </Grid>  
                                                </AccordionDetails>
                                            </Accordion>

                                            <Accordion expanded={expandedTableDetail === 'panel6'} onChange={handleTDChange('panel6')} className="backPaperAccordian">
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className="accordionHeaderSection"
                                                >
                                                    <List className={classes.heading}>
                                                        <ListItem className={classes.accordingHeaderContentLeft}>
                                                            <ListItemText primary="Permit system- whether work is done through relevant Permit" />
                                                        </ListItem>
                                                    </List>  
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        
                                                        <Grid
                                                        item
                                                        md={12}
                                                        xs={12}
                                                        >
                                                            <FormControl component="fieldset">
                                                                <FormLabel component="legend" className="checkRadioLabel">Is this control applicable ?</FormLabel>
                                                                <RadioGroup row aria-label="select-typeof-compliance" name="select-typeof-compliance">
                                                                    <FormControlLabel value="contractor-compliance" className="selectLabel" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="workarea-compliance" className="selectLabel" control={<Radio />} label="No" />
                                                                    <FormControlLabel value="general-compliance" className="selectLabel" control={<Radio />} label="NA" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid
                                                        item
                                                        md={12}
                                                        xs={12}
                                                        >
                                                            <TextField
                                                                label="Findings"
                                                                name="findings"
                                                                id="findings"
                                                                multiline
                                                                rows={4}
                                                                defaultValue=""
                                                                fullWidth
                                                                variant="outlined"
                                                                className="formControl"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={12}
                                                            sm={12}
                                                            xs={12}
                                                        >
                                                            <FormLabel className="checkRadioLabel marginB5" component="legend">Score</FormLabel>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            sm={4}
                                                            xs={12}
                                                        >
                                                            <Rating
                                                                name="simple-controlled"
                                                                value={value}
                                                                onChange={(event, newValue) => {
                                                                    setValue(newValue);
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            sm={4}
                                                            xs={12}
                                                        >
                                                            <FormControl variant="outlined" className="formControl">
                                                                <InputLabel id="demo-simple-select-outlined-label">Counts</InputLabel>
                                                                <Select
                                                                    labelId="scoreCount"
                                                                    id="scoreCount"
                                                                    // onChange={handleChangeOne}
                                                                    label="Counts"
                                                                    className="formControl"
                                                                    fullWidth
                                                                >
                                                                    <MenuItem value={1}>1</MenuItem>
                                                                    <MenuItem value={2}>2</MenuItem>
                                                                    <MenuItem value={3}>3</MenuItem>
                                                                    <MenuItem value={4}>4</MenuItem>
                                                                    <MenuItem value={5}>5</MenuItem>
                                                                    <MenuItem value={6}>6</MenuItem>
                                                                    <MenuItem value={7}>7</MenuItem>
                                                                    <MenuItem value={8}>8</MenuItem>
                                                                    <MenuItem value={9}>9</MenuItem>
                                                                    <MenuItem value={10}>10</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            sm={4}
                                                            xs={12}
                                                        >
                                                            <TextField
                                                                label="Percentage"
                                                                name="performancerating"
                                                                id="performancerating"
                                                                // defaultValue="20%"
                                                                fullWidth
                                                                variant="outlined"
                                                                className="formControl"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={12}
                                                            xs={12}
                                                        >
                                                            <FormLabel className="checkRadioLabel" component="legend">Create Action </FormLabel>
                                                            <Button variant="outlined" size="medium" className={classes.custmSubmitBtn} onClick={(e) => handleMyUserPClickOpen(e)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 75 50">
                                                                    <g id="Group_336" data-name="Group 336" transform="translate(-338 -858)">
                                                                    <g id="baseline-flash_auto-24px" transform="translate(364 871)">
                                                                        <path id="Path_1634" data-name="Path 1634" d="M0,0H24V24H0Z" fill="none"/>
                                                                        <path id="Path_1635" data-name="Path 1635" d="M3,2V14H6v9l7-12H9l4-9ZM19,2H17l-3.2,9h1.9l.7-2h3.2l.7,2h1.9ZM16.85,7.65,18,4l1.15,3.65Z" fill="#ffffff"/>
                                                                    </g>
                                                                    </g>
                                                                </svg>
                                                            </Button>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={12}
                                                            xs={12}
                                                        >
                                                            <Table component={Paper} className="simpleTableSection" >
                                                                <TableHead>
                                                                    <TableRow>
                                                                    <TableCell className="tableHeadCellFirst">Action number</TableCell>
                                                                    <TableCell className="tableHeadCellSecond">Action title</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                    <TableCell align="left">
                                                                        <Link to="#">AT-211004-012</Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        Action 1 for iCare-211004-002
                                                                    </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                    <TableCell align="left">
                                                                        <Link to="#">AT-211004-012</Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        Action 1 for iCare-211004-002
                                                                    </TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </Grid>

                                                        <Dialog onClose={handleMyUserPClose} aria-labelledby="customized-dialog-title" open={myUserPOpen} >
                                                            <DialogTitle id="customized-dialog-title" onClose={handleMyUserPClose}>
                                                                Create a new action
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    <Grid container spacing={3}>
                                                                        <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        >
                                                                        <TextField
                                                                            label="Location*"
                                                                            //margin="dense"
                                                                            name="location"
                                                                            id="location"
                                                                            defaultValue=""
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            className="formControl"
                                                                        />
                                                                        </Grid>
                                                                        <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        >
                                                                        <FormControl
                                                                            //required
                                                                            variant="outlined"
                                                                            className="formControl"
                                                                        >
                                                                            <InputLabel id="project-name-label">Assignee</InputLabel>
                                                                            <Select
                                                                            id="assignee"
                                                                            labelId="assigneelabel"
                                                                            label="Assignee"
                                                                            >
                                                                            <MenuItem value="Prakash">Prakash</MenuItem>
                                                                            <MenuItem value="Mayank">Mayank</MenuItem>
                                                                            </Select>
                                                                            
                                                                        </FormControl>
                                                                        </Grid>
                                                                        <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                    >
                                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                        <KeyboardDateTimePicker
                                                                            className="formControl"
                                                                            //margin="dense"
                                                                            fullWidth
                                                                            label="Due Date*"
                                                                            value={selectedActionDate}
                                                                            onChange={handleActionDateChange}
                                                                            inputVariant="outlined"
                                                                        />
                                                                        </MuiPickersUtilsProvider>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        >
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            className="formControl"
                                                                        >
                                                                            <InputLabel id="project-name-label">Severity</InputLabel>
                                                                            <Select
                                                                            id="severity"
                                                                            labelId="Severitylabel"
                                                                            label="Severity"
                                                                            >
                                                                            <MenuItem value="Prakash">Prakash</MenuItem>
                                                                            <MenuItem value="Mayank">Mayank</MenuItem>
                                                                            </Select>
                                                                            
                                                                        </FormControl>
                                                                        </Grid>
                                                                    </Grid>
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button variant="outlined" size="medium" align="left" className={classes.custmSubmitBtn}>Create Action</Button>
                                                            </DialogActions>
                                                        </Dialog>

                                                        <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
                                                            <FormLabel className="checkRadioLabel" component="legend">Attachment </FormLabel>
                                                            <Typography className="viewLabelValue">
                                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                                <input {...getInputProps()} />
                                                                <span align="center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="39.4" height="28.69" viewBox="0 0 39.4 28.69">
                                                                    <g id="upload-outbox-svgrepo-com" transform="translate(0 0)">
                                                                        <g id="Group_4970" data-name="Group 4970" transform="translate(13.004)">
                                                                        <g id="Group_4969" data-name="Group 4969">
                                                                            <path id="Path_3322" data-name="Path 3322" d="M180.343,76.859l-6.73-8.242a.307.307,0,0,0-.236-.113.3.3,0,0,0-.237.111l-6.73,8.244a.293.293,0,0,0,.237.482h2.268V84.35c0,.169.307.321.476.321h7.934c.169,0,.143-.152.143-.321V77.341h2.64a.293.293,0,0,0,.237-.482Z" transform="translate(-166.342 -68.504)" fill="#7890a4"/>
                                                                        </g>
                                                                        </g>
                                                                        <g id="Group_4972" data-name="Group 4972" transform="translate(0 12.502)">
                                                                        <g id="Group_4971" data-name="Group 4971">
                                                                            <path id="Path_3323" data-name="Path 3323" d="M38.893,234.386h.038l-5.083-4.954a3.307,3.307,0,0,0-2.263-1.008H26.115a.611.611,0,0,0,0,1.222h5.471a2.253,2.253,0,0,1,1.434.68l3.7,3.6H25.2a.6.6,0,0,0-.611.594,4.579,4.579,0,0,1-9.158,0,.6.6,0,0,0-.611-.6H3.008L6.7,230.33a2.261,2.261,0,0,1,1.439-.684H13.9a.611.611,0,1,0,0-1.222H8.138a3.357,3.357,0,0,0-2.287,1.012L.765,234.31A1.879,1.879,0,0,0,0,235.725v7.025a2,2,0,0,0,1.989,1.862H37.725A1.732,1.732,0,0,0,39.4,242.75v-7.025A1.76,1.76,0,0,0,38.893,234.386Z" transform="translate(0 -228.424)" fill="#7890a4"/>
                                                                        </g>
                                                                        </g>
                                                                    </g>
                                                                    </svg>
                                                                </span>
                                                                <p className="chooseFileDesign">Drag and drop here or <span>Choose file</span></p>
                                                                </div>
                                                                <aside>
                                                                    {/* <h4>Files</h4> */}
                                                                    {/* <ul>{files}</ul> */}
                                                                    <ul className="attachfileListBox">
                                                                        <li><img src={icoExcel} alt="excel-icon" /> DocExcel - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                        <li><img src={icoPDF} alt="pdf-icon" /> DocPDF - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                        <li><img src={icoPng} alt="image-icon" /> ImageFile - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                        <li><img src={icoAudio} alt="audio-icon" /> AudioFile - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                        <li><img src={icoVideo} alt="video-icon" /> VideoFile - 234bytes <IconButton aria-label="delete" ><DeleteIcon /></IconButton></li>
                                                                    </ul>
                                                                </aside>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>  
                                                </AccordionDetails>
                                            </Accordion>
                                                
                                        </div>  
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>

                <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
                    <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle" onClick={(e) => handelSubmit()}>
                        Next
                    </Button>
                    <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle">
                        Save
                    </Button>
                    <Button size="medium" variant="contained" color="secondary" className="buttonStyle custmCancelBtn">
                        Cancel
                    </Button>
                </Grid>
            </Grid> 
            <Grid item xs={12} md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={COMPLIANCE}
                selectedItem="Checks"
              />
            </Grid>
             </Grid>                    

            {/* <Grid container spacing={3} className={classes.observationNewSection}>
                
                
                <Grid
                item
                md={12}
                xs={12}
                style={{marginTop: '15px'}}
                >
                    <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Next</Button>
                    <Button variant="outlined" size="medium" className={classes.custmSaveBtn}>Save</Button>
                    <Button variant="outlined" size="medium" className={classes.custmCancelBtn}>Cancel</Button>
                </Grid>
            </Grid> */}
        </>
    );
};

export default Checks;