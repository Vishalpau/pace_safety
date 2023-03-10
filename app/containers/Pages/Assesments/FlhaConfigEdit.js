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
import Dropzone from 'react-dropzone'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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
import Paper from '@material-ui/core/Paper';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDropzone } from 'react-dropzone';
;
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import pledgebanner from 'dan-images/pledgebanner.jpg';
import biologicalHazard from 'dan-images/biologicalHazard.png';
import chemicalHazard from 'dan-images/chemicalHazard.png';
import project from 'dan-images/project.jpg';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import classNames from "classnames";
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import { findAllByDisplayValue } from 'react-testing-library';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ControlCameraOutlinedIcon from '@material-ui/icons/ControlCameraOutlined';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Switch from '@material-ui/core/Switch';
import api from '../../../utils/axios';
import {
  INITIAL_NOTIFICATION_FORM,
  SSO_URL,
  HEADER_AUTH,
} from '../../../utils/constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '.5rem 0',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
    '& .MuiOutlinedInput': {
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.2rem 0',
    boxShadow: 'inset 0px 0px 9px #dedede',
    '& td textHeight': {
      padding: '2.5px 5px',
      borderRadius: '8px',
    },
  },
  spacer: {
    padding: '5px 0',
    '& .MuiFormControl-fullWidth': {
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
  },
  spacerRight: {
    marginRight: '10px',
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
  jobTitle: {
    '& .MuiDialogTitle-root': {
      marginBottom: '5px !important',
    },
  },
  ptopTwenty: {
    '& span': {
      paddingTop: '15px',
    }
  },
  radioInline: {
    flexDirection: 'row',
  },
  mrTen: {
    marginRight: '15px',
    width: '98%',
    boxShadow: 'inset 0px 0px 9px #dedede',
    '& .MuiFormControl-fullWidth': {
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
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
      padding: '6px 10px',
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
  popUpButton: {
    paddingRight: "5px",
    marginLeft: "16px",
    '& .MuiDialogActions-root, img': {
      justifyContent: 'flex-start',
    },
  },

  spacerRight: {
    marginRight: '.75rem',
  },
  mToptewnty: {
    marginTop: '.75rem',
  },
  radioInline: {
    flexDirection: 'row',
  },
  tableRowColor: {
    backgroundColor: '#ffffff',
  },
  mttopThirty: {
    paddingTop: '30px',
  },
  mtTopTenn: {
    marginTop: '.99rem',
  },
  mttopEight: {
    marginTop: '8px',
    marginLeft: '10px',
  },
  ratioColorgreen: {
    backgroundColor: 'green',
    padding: '16px!important',
    height: '70%',
    marginTop: '12px',
    borderRadius: '5px',
    color: '#ffffff'
  },
  ratioColorred: {
    backgroundColor: 'red',
    padding: '16px!important',
    height: '70%',
    marginTop: '12px',
    borderRadius: '5px',
    color: '#ffffff'
  },
  ratioColororange: {
    backgroundColor: 'orange',
    padding: '16px!important',
    height: '70%',
    marginTop: '12px',
    borderRadius: '5px',
    color: '#ffffff'
  },
  mttopBottomThirty: {
    marginTop: '30px',
    marginBottom: '30px',
  },
  mttopTen: {
    paddingTop: '10px',
  },
  mttopSix: {
    paddingTop: '6px',
  },
  curserPointer: {
    cursor: 'Pointer',
    textDecoration: 'underline',
  },
  paddZero: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  tableHeading: {
    '& tr th': {
      backgroundColor: '#06425c',
      color: '#ffffff',
      lineHeight: '0.5rem',
    },
  },

  mbThirty: {
    marginBottom: '30px',
  },
  headingIcon: {
    width: '35px',
    border: '1px solid rgb(229, 233, 235)',
    height: '35px',
    background: 'rgb(131, 166, 181)',
    boxShadow: '0 2px 15px -5px #06425c',
    textAlign: 'center',
    lineHeight: '44px',
    marginRight: '12px',
    borderRadius: '8px',
    verticalAlign: 'middle',
    padding: '3px',
    color: '#ffffff',
  },
}));
const FlhaDetails = (props) => {
  const classes = useStyles();

  const [payload, setPayload] = React.useState({
    fkCompanyId: "",
    fkDeparmentName: '',
    jobTitle: '',
    projectName: '',
    jobDetail: '',
    fkDepartmentId: '',
    jobTitleImage: '',
    status: ""
  })


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dropDownAr, setDropDownAr] = React.useState([]);

  React.useEffect(() => {
    console.log("editPayload ", props.editPayload);
    setPayload({
      fkDeparmentName: props.editPayload[1] ? props.editPayload[1] : "",
      jobTitle: props.editPayload[0] ? props.editPayload[0] : "",
      jobDetail: props.editPayload[3] ? props.editPayload[3] : "",
      jobTitleImage: props.editPayload[2] ? props.editPayload[2] : "",
      fkDepartmentId: props.editPayload[6] ? props.editPayload[6] : "",

    });
  }, []);

  React.useEffect(() => {
    console.log("payloadvalue ", payload);
  }, [payload])


  const fieldHandler = (e) => {
    //  debugger
    console.log("Value  ", e.target.value, e.target.id)
    setPayload({
      ...payload,
      [e.target.id]: e.target.value
    })
  }

  const dropDownHandle = async () => {
    let fkCompanyId = JSON.parse(localStorage.getItem('company')).fkCompanyId
    const res = await api.get(`${SSO_URL}/api/v1/companies/${fkCompanyId}/departments/`);
    setDropDownAr(res.data.data.results);
  };

  React.useEffect(() => {
    // jobTitleApiHandler();
    dropDownHandle();
  }, []);

  React.useEffect(() => {
    props.dataHandler(payload)
  }, [payload])

  const handleDepartment = async (id, name) => {
    
    await setPayload({ ...payload, fkDepartmentId: id, fkDeparmentName: name });
    console.log(id,name,"check")
  };

  return (
    <div>
      <Paper elevation={3}>
        <Box padding={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  id="jobTitle"
                  multiline
                  rows="1"
                  label="titles"
                  className={classes.fullWidth}
                  onChange={(e)=>props.onChangeField(e, 'jobTitle')}                    
                  defaultValue={props.editPayload[0] || ""}
                />
              </Grid>
              {console.log("payload.fkDeparmentName ", props.editPayload[0])}

              {/* {console.log("payload.fkDeparmentName ", props.editPayload[6])} */}
              <Grid item md={12} sm={12} xs={12}>
                <FormControl
                  variant="outlined"
                  requirement
                  className={classes.fullWidth}
                >
                  <InputLabel id="department-label">
                    department
                  </InputLabel>
                  <Select
                    labelId="incident-type-label"
                    id="fkDepartmentId"
                    label="department"
                    Select
                    onChange={(e)=>props.onChangeField(e, 'fkDepartmentId')}                    
                    defaultValue={props.editPayload[6] || ""}
                  >
                    {dropDownAr.map((department) => (

                      <MenuItem
                      value={department.id}

                        key={department.id} onClick={(e) => {
                          handleDepartment(department.id, department.departmentName);
                        }}
                      >
                        {department.departmentName}
                      </MenuItem>
                    ))}
                    {/* <MenuItem>BMD</MenuItem>
								<MenuItem>One</MenuItem>
								<MenuItem>One</MenuItem>
								<MenuItem>One</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} sm={4} xs={12}>
                <img src={props.editPayload[2]} height={58} alt="" className={classes.mttopSix} />
              </Grid>
              <Grid item md={6} sm={6} xs={12} className={classes.mtTopTenn}>
              <Dropzone className="dropzone" onDrop={(e) => props.onChangeField(e,'jobTitleImage')}>
                  {({ getRootProps, getInputProps }) => (
                    <div className="block-dropzone" {...getRootProps()}>
                      <input onChange={(e) => props.onChangeField(e, 'jobTitleImage')} {...getInputProps()} />
                    </div>
                  )}
                </Dropzone>
                {/* <input onChange={(e)=>props.onChangeField(e, 'jobTitleImage')} accept="image/*" className={classes.input} id="icon-button-file" name="avatar" type="file" /> */}
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  id="jobDetail"
                  multiline
                  rows="1"
                  label="details"
                  className={classes.fullWidth}
                  onChange={(e)=>props.onChangeField(e, 'jobDetail')}                    
                  defaultValue={props.editPayload[3] || ""}

                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default FlhaDetails;
