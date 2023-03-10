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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import styles from "../../../components/Header/header-jss";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory, useParams } from 'react-router';

import { useDropzone } from 'react-dropzone';
import LinearProgress from '@material-ui/core/LinearProgress';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';


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
      padding: '35px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#06425c',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '0.625rem',
      cursor: 'pointer',
    },
  },
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
  marginR8: {
    marginRight: '0.5rem',
  },

  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2.188rem',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#06425c',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '0.625rem',
      cursor: 'pointer',
    },
  },
  uploadProgressBox: {
    padding: '0.313rem', 
    marginTop: '20px', 
  },
  uploadFileDetail: {
    paddingTop: '0.625rem',
    display: 'block',
    fontSize: '16px',
    color: '#06425c',
  },
  msgUploadSection: {
    flexGrow: 'initial',
    minWidth: '288px',
    width: '500px',
    backgroundColor: '#ff8533',
    color: '#ffffff',
    position: 'absolute',
    bottom: '0rem',
    left: '0%',
    '& .MuiCardContent-root': {
      paddingBottom: '16px',
    },
  },
}));

const BulkUploadQuestion = () => {
    const classes = useStyles();

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    // console.log(acceptedFiles)
    // const [uploadFile , setUploadFile] = useState(acceptedFiles)
    // console.log(uploadFile)
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
      <LinearProgress variant="determinate" className={classes.uploadProgressBox} color="secondary" value="100" />
      <span className={classes.uploadFileDetail}>
        {file.path}
        {' '}
  -
        {file.size}
        {' '}
        bytes
      </span>
    </li>
    ));

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleFileUpload = (event) => {
        console.log(event.target.files)
    }

    const handleUpload = () => {
        let temp = []
        acceptedFiles.map((value, index) => { 
        const data = new FormData();
        data.append("pk", acceptedFiles[index])
        temp.push(data);
    }
        )
    }
    

    return (
        <>
        <Grid container spacing={2}>
            <Grid
                item
                md={12}
                xs={12}
            >
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
                        <Grid item md={12} sm={12} xs={12} className='paddBRemove'>
                            <FormLabel component="legend" className="checkRadioLabel">(If selected all  compliance questions will be available across the projects)</FormLabel>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl
                                variant="outlined"
                                className="formControl"
                            >
                                <InputLabel id="project-name-label">Sections</InputLabel>
                                <Select
                                id="project-name"
                                labelId="project-name-label"
                                label="Sections"
                                >
                                    <MenuItem value="Phase">All sections</MenuItem>
                                    <MenuItem value="Phase1">Section 1</MenuItem>
                                </Select>
                                
                            </FormControl>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl
                                variant="outlined"
                                className="formControl"
                            >
                                <InputLabel id="project-name-label">Unit</InputLabel>
                                <Select
                                id="project-name"
                                labelId="project-unit-label"
                                label="Unit"
                                >
                                    <MenuItem value="unit">All unit</MenuItem>
                                    <MenuItem value="unit1">Unit1</MenuItem>
                                </Select>
                                
                            </FormControl>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl
                                //required
                                variant="outlined"
                                className="formControl"
                            >
                                <InputLabel id="project-name-label">Work area</InputLabel>
                                <Select
                                id="project-name"
                                labelId="project-unit-label"
                                label="Work area"
                                >
                                    <MenuItem value="WA1">All work areas</MenuItem>
                                    <MenuItem value="WA2">P1-WA1</MenuItem>
                                </Select>
                                
                            </FormControl>
                        </Grid>  
                    </Grid>
                    </Paper>
                </Grid> 

                    <Grid item md={9} sm={8} xs={8} className="paddTBRemove">
                        <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <g id="group-32" transform="translate(-611.999 -210.999)">
                            <g id="Rectangle_1911" data-name="Rectangle 1911" transform="translate(611.999 210.999)" fill="none" stroke="#707070" stroke-width="1" opacity="0">
                                <rect width="32" height="32" stroke="none"/>
                                <rect x="0.5" y="0.5" width="31" height="31" fill="none"/>
                            </g>
                            <g id="noun-group-3455272-FF9C34" transform="translate(611.999 216.333)">
                                <path id="Path_6440" data-name="Path 6440" d="M418.276,226.952a5.476,5.476,0,1,1,5.476-5.476A5.483,5.483,0,0,1,418.276,226.952Zm0-8.846a3.37,3.37,0,1,0,3.37,3.37A3.371,3.371,0,0,0,418.276,218.106Z" transform="translate(-402.294 -216)" fill="#06425c"/>
                                <path id="Path_6441" data-name="Path 6441" d="M816.4,339.2a4,4,0,1,1,4-4A4,4,0,0,1,816.4,339.2Zm0-5.9a1.9,1.9,0,1,0,1.9,1.9A1.888,1.888,0,0,0,816.4,333.306Z" transform="translate(-790.406 -327.83)" fill="#06425c"/>
                                <path id="Path_6442" data-name="Path 6442" d="M118,339.2a4,4,0,1,1,4-4A4,4,0,0,1,118,339.2Zm0-5.9a1.9,1.9,0,1,0,1.9,1.9A1.888,1.888,0,0,0,118,333.306Z" transform="translate(-112.034 -327.83)" fill="#06425c"/>
                                <path id="Path_6443" data-name="Path 6443" d="M765.182,543.828a21.412,21.412,0,0,1-3.089-.176l-.878-.14v-1.018a6.989,6.989,0,0,0-1.264-3.967L759.6,538l.281-.562a6.053,6.053,0,0,1,5.265-3.44,6.3,6.3,0,0,1,6,6.318c0,3.51-3.3,3.51-5.968,3.51Zm-1.9-2.176c.6.035,1.264.07,1.9.07,3.545,0,3.861-.351,3.861-1.4a4.223,4.223,0,0,0-3.9-4.212,3.808,3.808,0,0,0-3.089,1.755,8.933,8.933,0,0,1,1.229,3.791Z" transform="translate(-739.152 -524.697)" fill="#06425c"/>
                                <path id="Path_6444" data-name="Path 6444" d="M52.768,543.829c-2.668,0-5.968,0-5.968-3.51A6.227,6.227,0,0,1,52.768,534a6.03,6.03,0,0,1,5.265,3.44l.281.562-.351.527a6.99,6.99,0,0,0-1.229,3.967v1.053l-.878.105a21.4,21.4,0,0,1-3.089.176Zm0-7.723a4.143,4.143,0,0,0-3.861,4.212c0,1.053.316,1.4,3.861,1.4a17.447,17.447,0,0,0,1.9-.07,9.387,9.387,0,0,1,1.194-3.791,3.809,3.809,0,0,0-3.089-1.755Z" transform="translate(-46.8 -524.698)" fill="#06425c"/>
                                <path id="Path_6445" data-name="Path 6445" d="M321.389,532.02c-3.837,0-8.189,0-8.189-4.7,0-4.844,3.735-8.916,8.189-8.916s8.189,4.072,8.189,8.916C329.577,532.02,325.226,532.02,321.389,532.02Zm0-11.514c-3.255,0-6.133,3.194-6.133,6.81,0,2.141,1.1,2.6,6.133,2.6s6.133-.456,6.133-2.6C327.521,523.7,324.643,520.506,321.389,520.506Z" transform="translate(-305.407 -509.554)" fill="#06425c"/>
                            </g>
                            </g>
                        </svg> Groups
                        </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                        <Paper elevation={1} className="paperSection">
                            <Grid container spacing={3}>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    >
                                    <FormLabel className="checkRadioLabel" component="legend">Group name</FormLabel>
                                    <FormGroup className={classes.customCheckBoxList}>
                                        <FormControlLabel
                                            className="selectLabel"
                                            control={(
                                                <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                onChange={handleChange}
                                                />
                                            )}
                                            label="Material"
                                        />
                                        <FormControlLabel
                                            className="selectLabel"
                                            control={(
                                                <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                onChange={handleChange}
                                                />
                                            )}
                                            label="Environment"
                                        />
                                        <FormControlLabel
                                            className="selectLabel"
                                            control={(
                                                <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                onChange={handleChange}
                                                />
                                            )}
                                            label="Housekeeping"
                                        />
                                        <FormControlLabel
                                            className="selectLabel"
                                            control={(
                                                <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                onChange={handleChange}
                                                />
                                            )}
                                            label="Electrical"
                                        />
                                        <FormControlLabel
                                            className="selectLabel"
                                            control={(
                                                <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                onChange={handleChange}
                                                />
                                            )}
                                            label="Mechanical"
                                        />
                                        <FormControlLabel
                                            className="selectLabel"
                                            control={(
                                                <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                onChange={handleChange}
                                                />
                                            )}
                                            label="Guards of equipment"
                                        />
                                        <FormControlLabel
                                            className="selectLabel"
                                            control={(
                                                <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                onChange={handleChange}
                                                />
                                            )}
                                            label="Fire"
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <Grid container spacing={3}>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <FormLabel className="checkRadioLabel" component="legend">Material</FormLabel>
                                            <FormGroup className={classes.customCheckBoxList}>
                                                <FormControlLabel
                                                className="selectLabel"
                                                control={(
                                                    <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                    name="checkedI"
                                                    onChange={handleChange}
                                                    />
                                                )}
                                                label="Category"
                                                />
                                                <FormControlLabel
                                                className="selectLabel"
                                                control={(
                                                    <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                    name="checkedI"
                                                    onChange={handleChange}
                                                    />
                                                )}
                                                label="Fire"
                                                />
                                                <FormControlLabel
                                                className="selectLabel"
                                                control={(
                                                    <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                    name="checkedI"
                                                    onChange={handleChange}
                                                    />
                                                )}
                                                label="Category 2"
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <FormLabel className="checkRadioLabel" component="legend">Electrical</FormLabel>
                                            <FormGroup className={classes.customCheckBoxList}>
                                                <FormControlLabel
                                                    className="selectLabel"
                                                    control={(
                                                        <Checkbox
                                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                        name="checkedI"
                                                        onChange={handleChange}
                                                        />
                                                    )}
                                                    label="Category"
                                                />
                                                <FormControlLabel
                                                    className="selectLabel"
                                                    control={(
                                                        <Checkbox
                                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                        name="checkedI"
                                                        onChange={handleChange}
                                                        />
                                                    )}
                                                    label="Category 2"
                                                />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="paddBRemove">
                        <IconButton
                            variant="contained"
                            color="primary"
                            className="customAddButton"
                        >
                            <SystemUpdateAltIcon className='marginR5' /> Download template
                        </IconButton>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                        <Typography variant="h6" className="sectionHeading">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <g id="bulk-upload-32" transform="translate(-297 -1902)">
                                <g id="noun-batch-upload-1035168" transform="translate(276.522 1880.518)">
                                <path id="Path_6876" data-name="Path 6876" d="M172.4,26.954a.692.692,0,0,0,.494-.206l3.842-3.879V44.134a.7.7,0,1,0,1.391,0V22.869l3.842,3.879a.7.7,0,1,0,.988-.979l-5.031-5.08h0l0,0h0c-.007-.007-.015-.011-.022-.018a.7.7,0,0,0-.08-.066l0,0c-.018-.011-.036-.019-.055-.029s-.039-.023-.06-.032l-.006,0c-.019-.008-.04-.012-.059-.018l-.017-.005c-.016,0-.031-.011-.047-.014h-.006c-.018,0-.037,0-.056-.006a.727.727,0,0,0-.076-.007h0c-.016,0-.033,0-.049,0a.731.731,0,0,0-.083.008h0c-.017,0-.032.01-.049.015a.694.694,0,0,0-.076.023l-.005,0c-.02.008-.037.02-.056.029s-.041.019-.06.032l0,0h0a.741.741,0,0,0-.079.065c-.007.007-.016.012-.023.019h0l0,0h0l-5.031,5.08a.7.7,0,0,0,.494,1.185Z" transform="translate(-140.95 3)" fill="#06425c"/>
                                <path id="Path_6877" data-name="Path 6877" d="M51.782,302.08c-.384,0-1.7.312-1.7.7v9.782H22.869v-9.782c0-.384-1.312-.7-1.7-.7a.7.7,0,0,0-.7.7v11.478a.7.7,0,0,0,.7.7H51.782a.7.7,0,0,0,.7-.7V302.776a.7.7,0,0,0-.7-.7Z" transform="translate(0 -262.468)" fill="#06425c"/>
                                <path id="Path_6878" data-name="Path 6878" d="M274.988,133.326l0,0h0c-.007-.007-.015-.012-.023-.018h0a.67.67,0,0,0-.08-.065l0,0c-.018-.012-.037-.02-.056-.03s-.038-.023-.059-.031l-.006,0c-.02-.008-.042-.013-.063-.019l-.014,0c-.016,0-.031-.011-.047-.014h-.006c-.019,0-.038,0-.057-.006a.7.7,0,0,0-.075-.007h0c-.016,0-.032,0-.048,0h0a.7.7,0,0,0-.085.008h0c-.017,0-.032.01-.049.015a.631.631,0,0,0-.076.023l0,0a.625.625,0,0,0-.056.03c-.02.011-.041.019-.06.032l0,0h0a.663.663,0,0,0-.079.065c-.007.007-.016.012-.023.019h0l0,0h0l-3.354,3.387h0a.7.7,0,1,0,.988.979l2.164-2.185V149.12a.7.7,0,1,0,1.391,0V135.507l2.164,2.185h0a.7.7,0,1,0,.988-.979l-3.354-3.387Z" transform="translate(-230.986 -101.986)" fill="#06425c"/>
                                <path id="Path_6879" data-name="Path 6879" d="M123.023,137.9a.693.693,0,0,0,.494-.206l2.164-2.185v13.613a.7.7,0,1,0,1.391,0V135.508l2.164,2.185a.7.7,0,1,0,.988-.979l-3.354-3.387h0l0,0h0c-.007-.007-.015-.011-.022-.018h0a.679.679,0,0,0-.08-.066l0,0c-.018-.011-.036-.019-.055-.029a.677.677,0,0,0-.06-.032l-.006,0c-.019-.008-.04-.012-.059-.018l-.017-.005c-.016,0-.031-.011-.047-.014h-.006c-.018,0-.037,0-.056-.006h0a.662.662,0,0,0-.076-.007h0c-.016,0-.033,0-.049,0h0a.665.665,0,0,0-.083.008h0c-.017,0-.032.01-.049.015a.676.676,0,0,0-.076.023l-.005,0c-.02.008-.037.02-.056.029s-.041.019-.06.032l0,0h0a.7.7,0,0,0-.079.065c-.007.007-.016.012-.023.019h0l0,0h0l-3.354,3.387a.7.7,0,0,0,.494,1.185Z" transform="translate(-96.93 -101.987)" fill="#06425c"/>
                                </g>
                                <rect id="Rectangle_2119" data-name="Rectangle 2119" width="32" height="32" transform="translate(297 1902)" fill="none"/>
                            </g>
                            </svg> Bulk upload
                        </Typography> 
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                        <Paper elevation={1} className="paperSection">
                            <Grid container spacing={3}>
                                <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
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
                                            <ul>{files}</ul>
                                        </aside>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid> 
            </Grid>

            <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
                <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle" onClick={() => handleUpload()}>
                    Upload
                </Button>
            </Grid>

            </Grid>
        </>
    );
};

export default BulkUploadQuestion;