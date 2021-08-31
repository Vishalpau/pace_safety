import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
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
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDropzone } from 'react-dropzone';
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
import classNames from 'classnames';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import { findAllByDisplayValue } from 'react-testing-library';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ControlCameraOutlinedIcon from '@material-ui/icons/ControlCameraOutlined';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Switch from '@material-ui/core/Switch';
import Link from '@material-ui/core/Link';
import MUIDataTable from 'mui-datatables';
import api from "../../../utils/axios";
// import React ,{useState } from "react";


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
    paddingRight: '5px',
    marginLeft: '16px',
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
  mttoptenn: {
    marginTop: '10px',
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
  headerBackground: {
    backgroundColor: '#ffffff',
    color: '#06425c',
  },
  pTopandRight: {
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '13px',
  },
  mbThirty: {
    marginBottom: '30px',
  },
  formControlTwo: {
    width: '100%',
  },
  inputTab: {
    display: 'none',
  },
  widthSelect: {
    minWidth: '170px',
    height: '58px',
    borderRadius: '4px',
  },
  divider: {
    margin: '15px 15px',
    width: '97.4%',
    boxShadow: '1px 2px 10px #d4d4d4',
  },
  table: {
    minWidth: '100%',
    width: '100%',
  },
  plTen: {
    paddingLeft: '3px;',
    height: '18px;',
  },
  plFive: {
    paddingLeft: '5px;',
    height: '22px;',
  },
  createHazardbox: {
    margin: '0px 0px 10px 0px',
  },
  createHazardboxRight: {
    paddingLeft: '5px',
    float: 'right',
    margin: '0px 16px 20px 20px',
  },
  mLeft: {
    marginLeft: '10px',
  },
  mRight: {
    minHeight: '30px',
    height: '30px',
    width: '30px',
  },
  labelColor: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '14px;',
    fontFamily: 'Open Sans,sans-serif',
    fontWeight: '400;',
  },
  mToptewntySixteen: {
    marginTop: '16px',
  },
  heightDate: {
    '& .MuiInput-root': {
      height: '54px',
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '95.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  backPaper: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 10px 1px #e0e0e0 !important',
    marginBottom: '20px',
  },
  childBackPaper: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 10px 1px #e0e0e0 !important',
    marginBottom: '10px',
  },
  headingColor: {
    backgroundColor: '#f9f9f9',
    color: '#06425c',
    borderRadius: '6px 6px 0px 0px',
  },
  cellHeight: {
    '& td': {
      padding: '16px 6px',
    },
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
const FlhaDetails = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const [taskName, setTaskName] = React.useState(" ");

  const [task, setTask] = React.useState([]);
  React.useEffect(() => {
    let jobIdName = document.URL.split('/')
    setTaskName(jobIdName[jobIdName.length-1])

    criticalApiHandler();
  }, []);

  // Initial forms.
  const [criticalForm, setCriticalForm] = React.useState({
    taskIdentification: "",
    control: "",
    fkCompanyId:"",
    fkJobId:"",
    fkProjectId:"",
    taskIdentification:""
  });


//for status
const initialState = {
  status: true,
}
const [statusChange, setStatusChange] = React.useState(initialState.status);

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;
  console.log('company', fkCompanyId)
  const projectName =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;
  console.log('project', projectName)

  const handelSubmit = async () => {
    let fkJobId = localStorage.getItem('fkJobId')

    let formClone = JSON.parse(JSON.stringify(criticalForm));
    formClone["fkCompanyId"] = fkCompanyId;
    formClone["fkProjectId"] = JSON.parse(localStorage.getItem("projectName")).projectName.projectId ;
    formClone["createdBy"] = JSON.parse(localStorage.getItem("userDetails")).id ;
    formClone["fkJobId"] = localStorage.getItem("fkJobId");

    let res = await api.post(`api/v1/configflhas/jobtitles/${fkJobId}/criticaltasks/`, formClone);
    setCriticalForm({...criticalForm,
      taskIdentification: "",
      control: "",
      fkCompanyId:"",
      fkJobId:"",
      fkProjectId:"",
      taskIdentification:""
    })

    criticalApiHandler()
  };

  const criticalApiHandler = async () => {
    let fkJobId = localStorage.getItem('fkJobId')
    const res = await api.get(`api/v1/configflhas/jobtitles/${fkJobId}/criticaltasks/`);
    console.log("res ", res, res.data.data.results.results);
    let data = [];
    res.data.data.results.results.map(critcalTask => {
      let taskData = [];
      
      taskData.push(critcalTask.taskIdentification);
      taskData.push(critcalTask.control);
      taskData.push(critcalTask.status);
      taskData.push(critcalTask.id);
      data.push(taskData);
      localStorage.setItem('critcalTaskId',critcalTask.id)

    });
    setTask(data);
  }

//for status api
const statusToggle = async (value,data) => {
  let fkJobId = localStorage.getItem('fkJobId')

  console.log(data,"vis")

  let obj = {
    fkCompanyId:fkCompanyId,
    taskIdentification: data[0],
    control: data[1],
    fkJobId: localStorage.getItem("fkJobId"),
    status:value
  }    

  const res = await api.put(`api/v1/configflhas/jobtitles/${fkJobId}/criticaltasks/${data[3]}/`,obj);
  console.log('status',res)
  setStatusChange(res.data.data.results.results)
}


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onInputChange = (e, data) => {
    console.log('target',data)
    let value =e.target.checked === true ? "Active" : "Inactive";
    console.log('value',value)
    setStatusChange({
      ...initialState,status: value,
    })
    statusToggle(value, data);
  }


  //   Data for the table view
  const columns = [
    {
      name: 'Task Identification',
      options: {
        filter: true
      }
    },
    {
      name: 'Control',
      options: {
        filter: true
      }
    },
    {
      name: 'Status',
      options: {
        filter: false,
        customBodyRender: (value,tableMeta) => (
          <>
            <Switch onChange= {(e) => onInputChange(e, tableMeta.rowData)} checked='checked'/>
          </>
        )
      }
    },
    {
      name: '',
      options: {
        filter: false,
        customBodyRender: (value,tableMeta) => (
          <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  href="/app/pages/assesments/FlhaConfig"
                >
                  Flha Config

                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  href={`/app/pages/assesments/FlhaConfigHazard/${tableMeta.rowData[0]}`}
                >
                  Hazards

                </Link>
              </MenuItem>
            </Menu>
          </>
        )
      }
    },
  ];

  function payloadHandler(e, payloadType) {
    console.log(e.target.value)
    let formPayload = JSON.parse(JSON.stringify(criticalForm));
    formPayload[payloadType] = e.target.value;
    console.log("criticalForm", formPayload);
    setCriticalForm(formPayload);

  }

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
    scroll: true,
    search: false,
    download: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: false,
    selectableRowsOnClick: false,
    viewColumns: false,
    selectableRows: false,
    rowsPerPage: 10,
    page: 0,
  };

  
  return (
    <div>
      <PapperBlock title={`Job Title - ${taskName}` }icon="ion-ios-create-outline" desc="" color="primary" >
        <Paper elevation={3}>
          <Box padding={3}>
            <Grid item xs={12}>
              <Grid component={Paper}>
                <MUIDataTable
                  data={task}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider className={classes.divider} />
          <Box padding={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <CheckOutlinedIcon className={classes.headingIcon} />
                New Critical Task
              </Typography>
              <Grid container spacing={3} className={classes.mttopThirty}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    variant="outlined"
                    id="immediate-actions"
                    multiline
                    rows="1"
                    label="Task identification"
                    value= {criticalForm.taskIdentification}
                    onChange={(e) => payloadHandler(e, "taskIdentification")}
                    // onChange={(e) => setCriticalForm({...criticalForm, taskIdentification:e.target.value})}


                    className={classes.fullWidth}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    variant="outlined"
                    id="immediate-actions"
                    multiline
                    rows="1"
                    label="Control"
                    className={classes.fullWidth}
                    value= {criticalForm.control}

                    onChange={(e) => payloadHandler(e, "control")}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <Button size="medium" variant="contained" color="primary" onClick={(e) => handelSubmit()}>
                    Save

                    {' '}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </PapperBlock>
    </div>
  );
};

export default FlhaDetails;
