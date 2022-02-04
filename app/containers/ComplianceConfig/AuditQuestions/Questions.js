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
      borderBottom: '0.063rem solid #ccc',
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
        marginTop: '0.625rem',
        marginBottom: '0.625rem',
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
    paddingTop: '0rem !important',
    paddingBottom: '0rem !important',
    '& button': {
        marginTop: '8px',
    },
  },
  inputFieldWithLabel: {
    paddingTop: '0rem !important',
    paddingBottom: '0rem !important',
    '& button': {
        marginTop: '8px',
    },
  },

    accordingHeaderContentLeft: {
        display: 'inline-block',
        width: 'auto',
        padding: '0rem',
    },
    accordingHeaderContentRight: {
        display: 'inline-block',
        float: 'right',
        '& li': {
            paddingTop: '0rem',
            paddingBottom: '0rem',
            paddingLeft: '0rem',
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
    // accordingHeaderContentleft: {
    //     display: 'inline-block',
    //     float: 'left',
    //     '& li': {
    //         paddingTop: '0rem',
    //         paddingBottom: '0rem',
    //         paddingLeft: '0rem',
    //         '& span': {
    //             display: 'inline-block',
    //         },
    //         '& p': {
    //             display: 'inline-block',
    //             fontSize: '1rem !important',
    //             fontWeight: '500 !important',
    //             color: '#063d55',
    //             paddingLeft: '5px',
    //         },
    //     },
    // },
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
    //     marginBottom: '0.625rem',
    //     border: '0.063rem solid #06425c',
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

// const styles = (theme) => ({
// rootPop: {
//     margin: 0,
//     padding: theme.spacing(2),
// },
// closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
// },
// });

const Questions = () => {

const [expandedTableDetail, setExpandedTableDetail] = React.useState('panel1');
const handleTDChange = (panel) => (event, isExpanded ) => {
    setExpandedTableDetail(isExpanded ? panel : false);
};

const [questionMoreCatgry, setQuestionMoreCatgry] = useState([{}]);
const [questionMore, setQuestionMore] = useState([{}]);

const handleMoreQuestionCatgry=()=>{
    let temp=[...questionMoreCatgry]
    temp.push({})
    setQuestionMoreCatgry(temp)
}

const handleCloseCatgry=(indexOne)=> {
    let temp=[...questionMoreCatgry]
    let newData = temp.filter((item, key) => key !== indexOne);
    setQuestionMoreCatgry(newData)
}

const handleMoreQuestion=()=>{
    let temp=[...questionMore]
    temp.push({})
    setQuestionMore(temp)
}

const handleClose=(index)=> {
    let temp=[...questionMore]
    let newData = temp.filter((item, key) => key !== index);
    setQuestionMore(newData)
}

  const classes = useStyles();

  return (
        <>
            <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32.001" height="25.557" viewBox="0 0 32.001 25.557">
                            <g id="work-area-32" transform="translate(-220 -1887)">
                            <path id="Subtraction_26" data-name="Subtraction 26" d="M-3076.544,25.557h-30.912a.536.536,0,0,1-.478-.22.555.555,0,0,1,.01-.544L-3103,14.461a.567.567,0,0,1,.468-.3h4.225a.585.585,0,0,1,.391.184c.309.365.614.708.87,1s.547.615.83.947h-5.014a.568.568,0,0,0-.468.3l-3.264,6.844h25.917l-3.263-6.844a.568.568,0,0,0-.468-.3h-5.026c.288-.337.581-.667.83-.947l.011-.012c.27-.3.575-.646.862-.984a.586.586,0,0,1,.39-.183h4.234a.568.568,0,0,1,.468.3l4.927,10.332a.556.556,0,0,1,.01.544A.536.536,0,0,1-3076.544,25.557Zm-15.46-5.7a.513.513,0,0,1-.482-.331,16.937,16.937,0,0,0-3.508-5.2c-1.406-1.579-2.733-3.069-3.135-5.391a7.887,7.887,0,0,1,1.488-6.112,7.01,7.01,0,0,1,4.929-2.791c.234-.023.472-.034.706-.034a7.334,7.334,0,0,1,7.25,7.4c0,3.267-1.511,4.963-3.26,6.928a16.946,16.946,0,0,0-3.51,5.2A.509.509,0,0,1-3092,19.86ZM-3092,2a5.006,5.006,0,0,0-5,5,5.006,5.006,0,0,0,5,5,5.006,5.006,0,0,0,5-5A5.005,5.005,0,0,0-3092,2Z" transform="translate(3328 1887)" fill="#06425c"/>
                            <path id="noun-information-4514363_1_" data-name="noun-information-4514363 (1)" d="M39.177,34.509a.949.949,0,0,1,.944.944.921.921,0,0,1-.944.944.949.949,0,0,1-.944-.944A.922.922,0,0,1,39.177,34.509ZM38.683,43a1.2,1.2,0,0,1-1.168-1.528l.809-2.7a.449.449,0,0,0-.449-.584h-.4a1.646,1.646,0,0,1,1.573-1.123A1.2,1.2,0,0,1,40.211,38.6l-.809,2.7a.449.449,0,0,0,.449.584h.4A1.646,1.646,0,0,1,38.683,43Z" transform="translate(197.137 1855.245)" fill="#06425c"/>
                            </g>
                        </svg> Work area information
                    </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12}>
                                <Typography gutterBottom className="labelValue">
                                    NTPC
                                </Typography>
                                <Typography className="labelValue">
                                    All sections : All units : All work areas
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 39 35.181">
                            <path id="floor-plan" d="M30.051,29.16a.794.794,0,1,1,0-1.587h1.521V21.586H30.1A.794.794,0,0,1,30.1,20h1.473V11.593H25.343v8.422h1.476a.794.794,0,1,1,0,1.587H25.343v1.644a.794.794,0,0,1-1.587,0V11.593H13.119v5.66h5.212a.787.787,0,0,1,.79.787v9.539h4.616V26.106a.794.794,0,1,1,1.587,0v1.473h1.87a.794.794,0,1,1,0,1.587H12.328a.79.79,0,0,1-.79-.79V10.793a.794.794,0,0,1,.79-.79H32.378a.794.794,0,0,1,.775.79V28.369a.79.79,0,0,1-.775.79ZM1.685,26.093l.089-.063a4.6,4.6,0,0,1,.514-.394,5.266,5.266,0,0,1,1.178-.578,7.878,7.878,0,0,1,1.117-.3V1.619c-2.939.451-2.92,3.4-2.9,6.152.076,3.809-.171,13.847,0,18.322Zm4.444-.654a.8.8,0,0,1-.187.46.771.771,0,0,1-.476.26h0a8.889,8.889,0,0,0-1.27.276,3.971,3.971,0,0,0-1.044.476,3.371,3.371,0,0,0-.813.771,5.263,5.263,0,0,0-.667,1.2,6.9,6.9,0,0,0,.13,1.74,3.781,3.781,0,0,0,.581,1.381h0a3.3,3.3,0,0,0,1.121.984,5.552,5.552,0,0,0,1.8.59H37.428V6.031H6.145V25.439Zm0-20.951H37.872A1.13,1.13,0,0,1,39,5.619V34.058a1.146,1.146,0,0,1-.086.429,1.187,1.187,0,0,1-.244.365h0a1.187,1.187,0,0,1-.365.244,1.089,1.089,0,0,1-.429.086H5.262a5.06,5.06,0,0,1-2.27-.673,5.593,5.593,0,0,1-1.879-1.587,5.336,5.336,0,0,1-.825-1.9,8.688,8.688,0,0,1-.165-2.286c0-6.822-.279-14.215,0-20.951A13.553,13.553,0,0,1,.733,2.625C1.364,1.162,2.682.051,5.281,0h.083a.781.781,0,0,1,.781.781v3.7ZM13.113,18.84v8.739h4.428V18.83Z" transform="translate(0.001)" fill="#06425c"/>
                        </svg> Material 
                    </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12}>
                                <FormLabel className="checkRadioLabel marginB15" component="legend">Fire</FormLabel>
                                <Grid container>
                                    {questionMoreCatgry.map((value, indexOne) => 
                                    <Grid item md={12} sm={12} xs={12} className="positionRelative">
                                        {questionMoreCatgry.length>1?
                                            <IconButton
                                                variant="contained"
                                                color="primary"
                                                className="accordionCloseIcon"
                                                onClick={() => handleCloseCatgry(indexOne)}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        : null
                                        }
                                        <Accordion expanded={expandedTableDetail === `panel ${indexOne+1}`} onChange={handleTDChange(`panel ${indexOne+1}`)} defaultExpanded className="backPaperAccordian">
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                className="accordionHeaderSection"
                                            >
                                                <List className={classes.heading}>
                                                    <ListItem className={classes.accordingHeaderContentLeft}>
                                                        <ListItemText
                                                            primary={
                                                                <>
                                                                    Question : {indexOne+1}
                                                                </>
                                                            }
                                                        />
                                                    </ListItem>
                                                </List>  
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container spacing={2}>
                                                    <Grid item md={12} xs={12} >
                                                        <TextField
                                                            label="Question"
                                                            name="question"
                                                            id="question"
                                                            defaultValue=""
                                                            fullWidth
                                                            variant="outlined"
                                                            className="formControl"
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend" className="checkRadioLabel">Response type*</FormLabel>
                                                            <RadioGroup row aria-label="gender" name="gender1">
                                                                <FormControlLabel value="ynnafinding" className="selectLabel" control={<Radio />} label="Yes/No/NA/ and finding" />
                                                                <FormControlLabel value="prfind" className="selectLabel" control={<Radio />} label="Performance rating and finding" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend" className="checkRadioLabel">Record geo location</FormLabel>
                                                            <RadioGroup row aria-label="gender" name="gender1">
                                                                <FormControlLabel value="yes" className="selectLabel" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="no" className="selectLabel" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={12} xs={12}>
                                                        <Grid container spacing={2}>
                                                            <Grid item md={4} xs={12} >
                                                                <FormControl
                                                                    variant="outlined"
                                                                    className="formControl"
                                                                >
                                                                    <InputLabel id="scores">Scores</InputLabel>
                                                                    <Select
                                                                        id="scores"
                                                                        labelId="scores"
                                                                        label="Scores"
                                                                    >
                                                                        <MenuItem value="stars">Stars</MenuItem>
                                                                        <MenuItem value="percentge">Percentage</MenuItem>
                                                                        <MenuItem value="count">Count</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend" className="checkRadioLabel">Media attachment (Image / audio / video)</FormLabel>
                                                            <RadioGroup row aria-label="gender" name="gender1">
                                                                <FormControlLabel value="madiayes" className="selectLabel" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="madiano" className="selectLabel" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend" className="checkRadioLabel">Document attachment (document  / pdf)</FormLabel>
                                                            <RadioGroup row aria-label="gender" name="gender1">
                                                                <FormControlLabel value="docyes" className="selectLabel" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="docno" className="selectLabel" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>  
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                    )}
                                    <Grid item md={12} sm={12} xs={12}>
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            className="marginB15 customAddButton"
                                            onClick={() => handleMoreQuestionCatgry()}
                                        >
                                            <AddCircleIcon className='marginR5' /> More question
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12}>
                                <FormLabel className="checkRadioLabel marginB15" component="legend">Category 2</FormLabel>
                                <Grid container>

                                    {/* new Question started */}
                                    {questionMore.map((value, index) => 
                                        <Grid item md={12} sm={12} xs={12} className="positionRelative">
                                            {questionMore.length>1?
                                                <IconButton
                                                    variant="contained"
                                                    color="primary"
                                                    className="accordionCloseIcon"
                                                    onClick={() => handleClose(index)}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            : null
                                            }
                                            <Accordion expanded={expandedTableDetail === `panel ${index+2}`} onChange={handleTDChange(`panel ${index+2}`)} defaultExpanded className="backPaperAccordian">
                                                <AccordionSummary

                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className="accordionHeaderSection"
                                                >
                                                    <List className={classes.heading}>
                                                        <ListItem className={classes.accordingHeaderContentLeft}>
                                                            <ListItemText 
                                                                primary={
                                                                    <>
                                                                        Question : {index+1}
                                                                    </>
                                                                }
                                                             />
                                                        </ListItem>
                                                    </List>  
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid item md={12} xs={12} >
                                                            <TextField
                                                                label="Question"
                                                                name="question"
                                                                id="question"
                                                                defaultValue=""
                                                                fullWidth
                                                                variant="outlined"
                                                                className="formControl"
                                                            />
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <FormControl component="fieldset">
                                                                <FormLabel component="legend" className="checkRadioLabel">Response type*</FormLabel>
                                                                <RadioGroup row aria-label="gender" name="gender1">
                                                                    <FormControlLabel value="ynnafinding" className="selectLabel" control={<Radio />} label="Yes/No/NA/ and finding" />
                                                                    <FormControlLabel value="prfind" className="selectLabel" control={<Radio />} label="Performance rating and finding" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <FormControl component="fieldset">
                                                                <FormLabel component="legend" className="checkRadioLabel">Record geo location</FormLabel>
                                                                <RadioGroup row aria-label="gender" name="gender1">
                                                                    <FormControlLabel value="yes" className="selectLabel" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="no" className="selectLabel" control={<Radio />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item md={12} xs={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item md={4} xs={12} >
                                                                    <FormControl
                                                                        variant="outlined"
                                                                        className="formControl"
                                                                    >
                                                                        <InputLabel id="scores">Scores</InputLabel>
                                                                        <Select
                                                                            id="scores"
                                                                            labelId="scores"
                                                                            label="Scores"
                                                                        >
                                                                            <MenuItem value="stars">Stars</MenuItem>
                                                                            <MenuItem value="percentge">Percentage</MenuItem>
                                                                            <MenuItem value="count">Count</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <FormControl component="fieldset">
                                                                <FormLabel component="legend" className="checkRadioLabel">Media attachment (Image / audio / video)</FormLabel>
                                                                <RadioGroup row aria-label="gender" name="gender1">
                                                                    <FormControlLabel value="madiayes" className="selectLabel" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="madiano" className="selectLabel" control={<Radio />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <FormControl component="fieldset">
                                                                <FormLabel component="legend" className="checkRadioLabel">Document attachment (document  / pdf)</FormLabel>
                                                                <RadioGroup row aria-label="gender" name="gender1">
                                                                    <FormControlLabel value="docyes" className="selectLabel" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="docno" className="selectLabel" control={<Radio />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>  
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    )}
                                    {/* End question here  */}
                                    {/* {questionMore.length<=5 && */}
                                    <Grid item md={12} sm={12} xs={12}>
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            className="marginB15 customAddButton"
                                            onClick={() => handleMoreQuestion()}
                                        >
                                            <AddCircleIcon className='marginR5' /> More question
                                        </IconButton>
                                    </Grid>
                                    {/* } */}

                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
                    <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle">
                        Save and continue
                    </Button>
                    <Button size="medium" variant="contained" color="secondary" className="buttonStyle custmCancelBtn">
                        Reset
                    </Button>
                </Grid>
            </Grid>                    
        </>
    );
};

export default Questions;