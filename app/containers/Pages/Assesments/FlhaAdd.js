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
import { ContactSupportOutlined, CreateNewFolderSharp } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router';
import api from '../../../utils/axios';
import validate from '../../Validator/jobFormValidation';

import {
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
    minWidth: 700,
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
      padding: '0px 6px',
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
  attachImg: {
    minWidth: '50px',
    height: '40px',
    borderRadius: '4px',
    float: 'right',
    marginTop: '2px',
    marginRight: '20%',
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


const FlhaDetails = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date()
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [value, setValue] = React.useState('female');
  const [error, setError] = React.useState({});
  const handleChange = (event) => {
    // setValue(event.target.value);
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

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [jobTitles, setjobTitles] = React.useState([]);
  const [jobForm, setJobForm] = React.useState({
    fkCompanyId: '',
    fkProjectId: '',
    jobTitle: '',
    jobDetails: '',
    location: '',
    supervisor: '',
    fieldContractor: '',
    firstAid: '',
    jhaReviewed: '',
    accessToJobProcedure: '',
    emergencyPhoneNumber: '',
    evacuationPoint: '',
    meetingPoint: '',
    department: '',
    permitToWork: '',
    permitToWorkNumber: '',
    dateTimeFlha: '',
    referenceGroup: '',
    referenceNumber: '',
    classification: '',
  });
  const [contractors, setContractors] = React.useState([]);
  const [supervisors, setSupervisors] = React.useState([]);
  const [hazardForm, setHazardForm] = React.useState([
    {
      hazards: '',
      riskSeverity: '',
      riskProbability: '',
      control: '',
      hazardStatus: '',
      controlStatus: '',
      hazards: '',
      control: '',
      // taskIdentification: "",
      // evidenceDocument: null,
      // status: "Active",
      // createdBy: parseInt(userId),
      // updatedBy: parseInt(userId),
      // fkIncidentId: localStorage.getItem(""),
    },
  ]);

  const [taskForm, setTaskForm] = React.useState([
    {
      taskIdentification: '',
      riskRatingLevel: '',
      rivisionReason: '',
      revisionTime: null,
      version: '',
      createdBy: '',
      hazards: [
        {
          hazards: '',
          riskSeverity: '',
          riskProbability: '',
          control: '',
          hazardStatus: '',
          controlStatus: '',
        }
      ],
    },
  ]);

  const [flha, setFlha] = React.useState('');
  const [departments, setDepartments] = React.useState([]);
  const handleNewHazard = async (e, index) => {
    const temp = [...taskForm];
    temp[index].hazards.push({
      hazards: '',
      riskSeverity: '',
      riskProbability: '',
      control: '',
      hazardStatus: '',
      controlStatus: '',
    });
    console.log({ temp });
    await setTaskForm(temp);
  };

  const handleJobFormChange = async (e, fieldname, autovalue = undefined) => {
    console.log(jobForm);

    const temp = { ...jobForm };
    const { value } = e.target;

    console.log({ value });
    if (autovalue != undefined) {
      temp[fieldname] = e.target.textContent;
    } else {
      temp[fieldname] = value;
    }


    console.log({ temp });
    await setJobForm(temp);
    // await console.log({jobForm: jobForm})
  };

  const handleHazardForm = async (e, key, taskIndex, fieldname) => {
    // alert(12345678)
    console.log(fieldname);
    const temp = [...taskForm];
    console.log({ tempform: temp });
    const { value } = e.target;
    if (key == undefined) {
      temp[taskIndex][fieldname] = value;
    } else {
      if (temp[taskIndex].hazards[key] == undefined) {
        temp[taskIndex].hazards[0] = [];
        key = 0;
      }
      temp[taskIndex].hazards[key][fieldname] = value;
    }

    console.log({ temp });
    await setTaskForm(temp);
  };

  const handleSelectedJobHazardFormTemp = async (tasks) => {
    // alert(234567)
    console.log({ hazardForm });
    console.log({ tasks });
    const temp = [];

    const temp1 = tasks.map((task, index) => {
      console.log({ task });
      temp[index] = task;
      // temp[index]['taskIdentification'] = task['taskIdentification']
      // temp[index]['hazards'] = task['hazards']
      return temp;
    });
    // alert("Check temp")
    console.log({ temp1111: temp1 });
    console.log({ temp222: temp });
    await setTaskForm(temp);
    console.log({ taskForm12345678: taskForm });

    await setHazardForm(temp.hazards);
    console.log({ hazardForm });
  };

  const handleSelectedJobHazardForm = async (tasks) => {
    // alert(234567)
    console.log({ hazardForm });
    console.log({ tasks });
    // const temp = {}
    const temp = [];
    const temp1 = tasks.map((task, index) => {
      console.log({ task: task.hazards });

      temp.taskIdentification = task.taskIdentification;
      temp.hazards = task.hazards;
      return temp;
    });
    alert('Check temp');
    console.log({ temp1111: temp1 });

    console.log({ temp2222: temp });
    await setTaskForm(temp);
    console.log({ taskForm12345678: taskForm });
    console.log({ taskForm12345678temp: temp });

    await setHazardForm(temp1.hazards);
    console.log({ hazardForm });
  };


  const handleJobFormSubmit = async () => {
    const { error, isValid } = validate(jobForm);
    if (isValid) {
      await createFlha();
    } else {
      await setError(error);
    }
  };

  const selectBreakdown = JSON.parse(localStorage.getItem('selectBreakDown')) !== null
    ? JSON.parse(localStorage.getItem('selectBreakDown'))
    : null;
  let struct = '';
  for (const i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }
  const fkProjectStructureIds = struct.slice(0, -1);
  const { fkCompanyId } = JSON.parse(localStorage.getItem('company'));
  const fkProjectId = JSON.parse(localStorage.getItem('projectName'))
    .projectName.projectId;
  const fkUserId = JSON.parse(localStorage.getItem('userDetails')).id;

  const createFlha = async () => {
    const data = { ...jobForm };
    console.log({ jobform: data });

    data.fkCompanyId = fkCompanyId;
    data.fkProjectId = fkProjectId;
    data.fkProjectStructureIds = fkProjectStructureIds;
    data.createdBy = fkUserId;
    data.attachment = (acceptedFiles) ? acceptedFiles[0] : null;
    console.log({ jobformUpdated: data });

    const formData = new FormData();
    // formData.append(data)
    console.log({ formData });

    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log({ formData1111: formData });
    // return;
    // return;
    const res = await api.post(
      '/api/v1/flhas/',
      formData
    );
    console.log(res.data.data.results.id);
    await setFlha(res.data.data.results.id);

    await createCriticalTask(res.data.data.results.id);
  };

  const createCriticalTask = async (flha) => {
    const data = taskForm;
    // data['fkFlhaId'] = flha
    console.log({ data });
    console.log(data[0]);
    const flhaData = data.map((flhaDetail, index) => {
      console.log({ flha: data });
      data[index].fkFlhaId = flha;
      data[index].createdBy = fkUserId;
      if (data[index].hazards.length > 0) {
        data[index].hazards.map((dat, key) => {
          data[index].hazards[key].status = 'Active';
          data[index].hazards[key].createdBy = fkUserId;
          data[index].hazards[key].updatedBy = fkUserId;
        });
      }
      console.log({ updatedData: data });
    });
    console.log({ data });
    const res = await api.post(
      `/api/v1/flhas/${flha}/criticaltasks/`,
      data
    );
    console.log({ criticalpost: res.data.data.results });
    await createVisualConfirmation(flha);
  };

  const createVisualConfirmation = async (flha) => {
    history.push('/app/pages/assesments/xflha/');
    // alert(flha)
  };

  // const handleChangeHazardStatus = async(e, key, fieldname) => {

  // }

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    getSupervisors();
    getFieldContractors();
    getDepartments();
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const getDepartments = async () => {
    const config = {
      method: 'get',
      url: `${SSO_URL}/api/v1/companies/${fkCompanyId}/departments/`,
      headers: HEADER_AUTH,
    };
    const res = await api(config);

    console.log({ departments: res.data.data.results });
    setDepartments(res.data.data.results);
  };

  const handleDepartmentSelection = async (e, value) => {
    getJobTitles(value.id);
  };

  const getSupervisors = async () => {
    const res = await api.get('api/v1/lists/2/value');
    console.log({ supervisor: res.data.data.results });
    setSupervisors(res.data.data.results);
  };
  const getFieldContractors = async () => {
    const res = await api.get('api/v1/lists/3/value');
    console.log({ fieldContractor: res.data.data.results });
    setContractors(res.data.data.results);
  };
  const getJobTitles = async (id) => {
    alert(234567);
    const res = await api.get('api/v1/configflhas/department/' + id + '/jobtitles/');
    console.log({ jobtitles: res.data.data.results });
    await setjobTitles(res.data.data.results);
  };

  const handleJobSelection = async (jobTitleId) => {
    const res = await api.get('api/v1/configflhas/jobtitles/' + jobTitleId + '/');
    const selectedJobTitle = res.data.data.results;
    console.log({ jobtitleseleted: selectedJobTitle });

    const temp = { ...jobForm };

    console.log({ temp });
    // await setJobForm(temp);

    setJobForm(
      {
        jobTitle: selectedJobTitle.jobTitle,
        jobDetails: selectedJobTitle.jobDetail,
        location: jobForm.location,
        status: 'Active',
        dateTimeFlha: '',
        permitToWork: jobForm.permitToWork,
        jobTitleImage: selectedJobTitle.jobTitleImage,
      }
    );
    console.log({ jobtitleseleted: jobForm });
    await handleSelectedJobHazardFormTemp(selectedJobTitle.critical_tasks);
    setOpen(false);
    // setjobTitles(res.data.data.results.results)
  };

  const [state, setState] = React.useState({
    checkedA: true,
  });

  const [expanded, setExpanded] = React.useState('panel');


  const handleTwoChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const [expanded1, setExpanded1] = React.useState(false);
  const handleOneChange = (panell) => (event, isExpanded1) => {
    setExpanded1(isExpanded1 ? panell : false);
  };


  const handleRiskChange = (e, key, taskIndex, fieldname) => {
    console.log(e.nativeEvent.target.innerText);
    const temp = [...taskForm];
    const txt = e.nativeEvent.target.innerText;
    temp[taskIndex].hazards[key][fieldname] = e.target.value;
    // if(fieldname == "riskSeverity"){
    const riskSeverity = ((temp[taskIndex].hazards[key].riskSeverityValue == undefined || temp[taskIndex].hazards[key].riskSeverityValue == '') ? 1 : temp[taskIndex].hazards[key].riskSeverityValue);

    // }
    // else if(fieldname == "riskProbability"){
    const riskProbability = ((temp[taskIndex].hazards[key].riskProbabilityValue == undefined || temp[taskIndex].hazards[key].riskProbabilityValue == '') ? 1 : temp[taskIndex].hazards[key].riskProbabilityValue);
    // }


    console.log({ riskSeverity });
    console.log({ riskSeverity: riskProbability });
    const riskRating = riskSeverity * riskProbability;
    // alert(riskRating)

    if (fieldname == 'riskSeverityValue') {
      alert('severity');
      temp[taskIndex].hazards[key].riskSeverity = txt;
    } else {
      alert('probability');
      temp[taskIndex].hazards[key].riskProbability = txt;
    }

    if (riskRating >= 1 && riskRating <= 4) {
      // alert("low")
      temp[taskIndex].hazards[key].riskRatingLevel = 'Low';
      temp[taskIndex].hazards[key].riskRatingColour = '#1EBD10';
    } else if (riskRating > 4 && riskRating <= 9) {
      // alert("medium")
      temp[taskIndex].hazards[key].riskRatingLevel = 'Medium';
      temp[taskIndex].hazards[key].riskRatingColour = '#FFEB13';
    } else if (riskRating > 9 && riskRating <= 14) {
      // alert("serious")
      temp[taskIndex].hazards[key].riskRatingLevel = 'Serious';
      temp[taskIndex].hazards[key].riskRatingColour = '#F3C539';
    } else {
      // alert("high")
      temp[taskIndex].hazards[key].riskRatingLevel = 'High';
      temp[taskIndex].hazards[key].riskRatingColour = '#FF0000';
    }

    console.log({ updated: temp });
    setTaskForm(temp);
  };

  const handleFileUpload = (e) => {
    alert('changing file');
    console.log(e.target.file);
  };

  return (
    <div>
      <PapperBlock title="XFLHA - Initial Assessment" icon="ion-ios-create-outline" desc="" color="primary">
        <Paper elevation={3}>
          <Grid container spacing={1}>
            <Grid item sm={12} xs={12}>
              <Box padding={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormLabel component="legend">Project</FormLabel>
                    <Typography>
                      {JSON.parse(localStorage.getItem('projectName')).projectName.projectName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <DescriptionOutlinedIcon className={classes.headingIcon} />
                      {' '}
Job information
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" onClick={handleClickOpen('paper')}>
Select Job
                      <FindInPageOutlinedIcon className={classes.plFive} />
                    </Button>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      error={error.jobTitle}
                      multiline
                      variant="outlined"
                      rows="1"
                      id="JobTitle"
                      label="*Title"
                      className={classes.fullWidth}
                      onChange={(e) => handleJobFormChange(e, 'jobTitle')}
                      value={jobForm.jobTitle}
                    />
                  </Grid>
                  <Grid item xs={2}><img src={jobForm.jobTitleImage} height={58} alt="" className={classes.mttopSix} /></Grid>
                  <div>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      scroll={scroll}
                      aria-labelledby="scroll-dialog-title"
                      aria-describedby="scroll-dialog-description"
                      className={classes.jobTitle}
                    >
                      <DialogTitle id="scroll-dialog-title">Select job title</DialogTitle>
                      <Box padding={2}>
                        <Grid container spacing={3}>

                          <Grid item md={6} sm={6} xs={12}>
                            <div className={classes.spacer}>
                              <Autocomplete
                                id="department"
                                className={classes.mtTen}
                                options={departments}
                                getOptionLabel={(option) => option.departmentName}
                                renderInput={(params) => <TextField {...params} label="department" variant="outlined" />}
                                onChange={(e, value) => handleDepartmentSelection(e, value)}
                              />
                            </div>
                          </Grid>

                        </Grid>
                      </Box>
                      <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                          id="scroll-dialog-description"
                          ref={descriptionElementRef}
                          tabIndex={-1}
                        >
                          <Grid container spacing={3}>
                            {(jobTitles.length > 0) ? jobTitles.map((jobTitle) => (
                              <Grid item xs={3} onClick={() => handleJobSelection(jobTitle.id)}><Tooltip title={jobTitle.jobTitle} placement="bottom"><img src={jobTitle.jobTitleImage} alt="decoration" /></Tooltip></Grid>
                            )) : ''}
                          </Grid>
                        </DialogContentText>
                      </DialogContent>
                      <Box padding={3}>
                        <Grid item md={12} sm={12} xs={12}>
                        Selected job project here
                        </Grid>
                      </Box>

                      <Grid item md={6} sm={6} xs={12} className={classes.popUpButton}>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary" variant="contained">
                        Select
                          </Button>
                          <Button onClick={handleClose} color="secondary" variant="contained">
                        Cancel
                          </Button>
                        </DialogActions>
                      </Grid>

                    </Dialog>
                  </div>

                  <Grid item xs={12}>
                    <TextField
                      multiline
                      error={error.jobDetails}
                      variant="outlined"
                      rows="2"
                      id="description"
                      label="*Details"
                      className={classes.fullWidth}
                      onChange={(e) => handleJobFormChange(e, 'jobDetails')}
                      value={jobForm.jobDetails}
                    />
                  </Grid>
                  <Divider className={classes.divider} />
                  <Grid item xs={12}>
                    <Box padding={0}>
                      <Grid item sm={12} xs={12}>
                        <Typography variant="h6">
                          <ControlCameraOutlinedIcon className={classes.headingIcon} />
                          {' '}
Preventive controls
                        </Typography>
                      </Grid>
                      <Divider className={classes.divider} />
                      <Grid item sm={12} xs={12} className={classes.mttopTen}>
                        <Typography variant="h6">
                          <AssignmentLateOutlinedIcon className={classes.headingIcon} />
                          {' '}
Critical tasks
                        </Typography>

                      </Grid>

                      <Grid item sm={12} xs={12} className={classes.mttopBottomThirty}>
                        <div>
                          {taskForm.map((taskValue, taskIndex) => (
                          // console.log({taskform: taskForm})
                          // console.log({taskvalue: taskValue})
                            <Accordion expanded={expanded === 'panel'} onChange={handleTwoChange('panel')} defaultExpanded className={classes.backPaper}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className={classes.headingColor}
                              >
                                <Typography className={classes.heading}>
                                  <MenuOpenOutlinedIcon className={classes.headingIcon} />
                                  {' '}
Task#1 - "Task identification"
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid item sm={12} xs={12}>
                                  <TextField
                                    multiline
                                    variant="outlined"
                                    rows="1"
                                    id="taskIdentification"
                                    label="*Task Identification"
                                    className={classes.fullWidth}
                                    value={(taskValue.taskIdentification != undefined) ? taskValue.taskIdentification : ''}
                                    onChange={(e) => handleHazardForm(e, null, taskIndex, 'taskIdentification')
                                    }
                                  />
                                </Grid>
                                {taskValue.hazards.map((item, index) => (
                                // console.log({item: item})
                                  <Accordion expanded1={expanded1 === 'panell'} onChange={handleOneChange('panell')} defaultExpanded className={classes.childBackPaper}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel2bh-content"
                                      id="panel2bh-header"
                                      className={classes.headingColor}
                                    >
                                      <Typography className={classes.heading}>Hazardk#1 - "Hazard Name"</Typography>
                                      <Typography className={classes.secondaryHeading}>
                                        <Fab
                                          color="secondary"
                                          size="small"
                                          align="right"
                                          height={30}
                                          width={30}
                                          aria-label="remove"
                                          className={classNames(classes.button, classes.mRight)}
                                        >
                                          <RemoveIcon />
                                        </Fab>
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Grid container spacing={0}>
                                        <Grid item sm={11} xs={8}>
                                          <FormControl
                                            variant="outlined"
                                            requirement
                                            className={classes.formControl}
                                          >
                                            <InputLabel id="demo-simple-select-label">
                                    *Hazards
                                            </InputLabel>
                                            <TextField
                                              multiline
                                              variant="outlined"
                                              rows="3"
                                              id="hazards"
                                              // label="*Hazards"
                                              className={classes.fullWidth}
                                              value={item.hazard}
                                              onChange={(e) => handleHazardForm(e, index, taskIndex, 'hazards')
                                              }
                                            />
                                          </FormControl>
                                          <div className={classes.spacer}>
                                            <FormControl component="fieldset">
                                              <FormLabel component="legend">
                                          Hazard Status
                                              </FormLabel>
                                              <RadioGroup className={classes.radioInline} aria-label="hazardStatus" name="hazardStatus" value={item.hazardStatus} onChange={(e) => handleHazardForm(e, index, taskIndex, 'hazardStatus')}>
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                              </RadioGroup>
                                            </FormControl>
                                          </div>
                                        </Grid>
                                        <Grid item sm={1} xs={4}>
                                          {(item.hazardImage) ? <img src={item.hazardImage} alt="decoration" className={classes.mttopEight} height={56} /> : ''}
                                        </Grid>
                                        <Grid container spacing={2}>
                                          <Grid item sm={12} xs={12}>
                                            <TextField
                                              multiline
                                              variant="outlined"
                                              rows="3"
                                              id="description"
                                              label="*Control"
                                              className={classes.fullWidth}
                                              value={item.control}
                                              onChange={(e) => handleHazardForm(e, index, taskIndex, 'control')
                                              }
                                            />
                                            <div className={classes.spacer}>
                                              <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                            Control Status
                                                </FormLabel>
                                                <RadioGroup className={classes.radioInline} aria-label="controlStatus" name="controlStatus" value={item.controlStatus} onChange={(e) => handleHazardForm(e, index, taskIndex, 'controlStatus')}>
                                                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                  <FormControlLabel value="No" control={<Radio />} label="No" />
                                                  <FormControlLabel value="NA" control={<Radio />} label="NA" />
                                                </RadioGroup>
                                              </FormControl>
                                            </div>
                                          </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
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
                                                id="riskSeverityValue"
                                                label="Risk Severity"
                                                name="riskSeverityValue"
                                                value={item.riskSeverityValue}
                                                onChange={(e) => handleRiskChange(e, index, taskIndex, 'riskSeverityValue')
                                                }
                                              >

                                                <MenuItem value={1}>Negligible</MenuItem>
                                                <MenuItem value={2}>Minor</MenuItem>
                                                <MenuItem value={3}>Moderate</MenuItem>
                                                <MenuItem value={4}>Major/ Critical</MenuItem>
                                                <MenuItem value={5}>Catastrophic</MenuItem>
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
                                                id="riskProbabilityValue"
                                                label="Risk Probability"
                                                value={item.riskProbabilityValue}
                                                onChange={(e) => handleRiskChange(e, index, taskIndex, 'riskProbabilityValue')
                                                }
                                              >
                                                <MenuItem value={1} selected={item.riskProbability == 1}>Improbable</MenuItem>
                                                <MenuItem value={2} selected={item.riskProbability == 2}>Remote</MenuItem>
                                                <MenuItem value={3} selected={item.riskProbability == 3}>Occasional</MenuItem>
                                                <MenuItem value={4} selected={item.riskProbability == 4}>Probable</MenuItem>
                                                <MenuItem value={5} selected={item.riskProbability == 5}>Frequent</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </Grid>
                                          <Grid item md={4} sm={4} xs={12} className={classes.ratioColororange} style={{ backgroundColor: item.riskRatingColour }}>
                                            {item.riskRatingLevel}
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </AccordionDetails>
                                  </Accordion>

                                ))}

                                <Grid item xs={12} className={classes.createHazardbox}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddCircleIcon />}
                                    className={classes.button}
                                    onClick={(e) => handleNewHazard(e, taskIndex)}
                                  >
                                  Add new hazard
                                  </Button>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>

                          ))}

                        </div>

                      </Grid>
                      <Divider className={classes.divider} />
                      <Grid item xs={12}>
                        <TableContainer className={classes.mttopTen}>
                          <Typography variant="h6">
                            <CheckOutlinedIcon className={classes.headingIcon} />
                            {' '}
Job visual confirmation
                          </Typography>

                          <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHeading}>
                              <TableRow className={classes.cellHeight}>
                                <TableCell align="left" className={classes.tableRowColor}>Visual confirmation</TableCell>
                                <TableCell align="left" className={classes.tableRowColor}>Status</TableCell>
                                <TableCell align="left" className={classes.tableRowColor}>Attachments</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow className={classes.cellHeight}>
                                <TableCell align="left">Site pictures</TableCell>
                                <TableCell align="left">
                                  <div className={classes.spacer}>
                                    <FormControl component="fieldset">
                                      <RadioGroup className={classes.radioInline} aria-label="site" name="site" value={value} onChange={handleChange}>
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                        <FormControlLabel value="NA" control={<Radio />} label="NA" />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </TableCell>
                                <TableCell align="left">
                                  <input accept="image/*" className={classes.inputTab} id="icon-button-file" name="avatar" type="file" />
                                  <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                      <AttachmentIcon />
                                    </IconButton>
                                  </label>
                                  <img src={project} className={classes.attachImg} alt="decoration" height={40} />
                                </TableCell>
                              </TableRow>
                              <TableRow className={classes.cellHeight}>
                                <TableCell align="left">Team pictures</TableCell>
                                <TableCell align="left">
                                  <div className={classes.spacer}>
                                    <FormControl component="fieldset">
                                      <RadioGroup className={classes.radioInline} aria-label="teams" name="teams" value={value} onChange={handleChange}>
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                        <FormControlLabel value="NA" control={<Radio />} label="NA" />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </TableCell>
                                <TableCell align="left">
                                  <input accept="image/*" className={classes.inputTab} id="icon-button-file" name="avatar" type="file" />
                                  <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                      <AttachmentIcon />
                                    </IconButton>
                                  </label>
                                  <img src={project} className={classes.attachImg} alt="decoration" height={40} />
                                </TableCell>
                              </TableRow>
                              <TableRow className={classes.cellHeight}>
                                <TableCell align="left">Tools and tackles</TableCell>
                                <TableCell align="left">
                                  <div className={classes.spacer}>
                                    <FormControl component="fieldset">
                                      <RadioGroup className={classes.radioInline} aria-label="tools" name="tools" value={value} onChange={handleChange}>
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                        <FormControlLabel value="NA" control={<Radio />} label="NA" />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </TableCell>
                                <TableCell align="left">
                                  <input accept="image/*" className={classes.inputTab} id="icon-button-file" name="avatar" type="file" />
                                  <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                      <AttachmentIcon />
                                    </IconButton>
                                  </label>
                                  <img src={project} className={classes.attachImg} alt="decoration" height={40} />
                                </TableCell>
                              </TableRow>

                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Typography variant="Body1" className={classes.labelColor}>Attach files</Typography>
                    <Grid item md={12} xs={12} className={classes.formBox}>
                      <div {...getRootProps({ className: 'dropzone' })} onDrop={(e) => handleFileUpload(e)}>
                        <input onDrop={(e) => handleFileUpload(e)} {...getInputProps()} />
                        <p>Drag 'n' drop or click to select files</p>
                      </div>
                      <aside>
                        {/* <h4>Files</h4> */}
                        <ul>{files}</ul>
                      </aside>
                    </Grid>
                  </Grid>
                  <Grid item md={3} sm={3} xs={12}>
                    <Typography variant="Body1" className={classes.labelColor}>Date</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className={classNames(classes.formControl, classes.heightDate)}
                        variant="outlined"
                        required
                        id="date-picker-dialog"
                        format="yyyy-mm-dd"
                        value={selectedDate}
                        onChange={(e) => handleJobFormChange(e, 'dateTimeFlha')}
                      />

                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={3} sm={3} xs={12}>
                    <Typography variant="Body1" className={classes.labelColor}>Time</Typography>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <div className="picker">
                        <TimePicker
                          variant="outlined"
                          required
                          value={selectedDate}
                          className={classNames(classes.formControl, classes.heightDate)}
                          onChange={handleDateChange}
                        />
                      </div>

                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset" display="inline">
                        <FormLabel component="legend">*Is permit to work done?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="permitToWork" name="permitToWork" value={jobForm.permitToWork} onChange={(e) => handleJobFormChange(e, 'permitToWork')}>
                          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio />} label="No" />
                          <FormControlLabel value="na" control={<Radio />} label="NA" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      id="immediate-actions"
                      multiline
                      rows="1"
                      label="Enter permit number"
                      value={jobForm.permitNumber}
                      onChange={(e) => handleJobFormChange(e, 'permitNumber')}
                      className={classes.fullWidth}
                    />
                  </Grid>
                  {/* <Grid item md={6} sm={6} xs={12} className={classes.ptopTwenty}>
                  <Typography variant="Body1">
                    Validate
                  </Typography>
                </Grid> */}
                  <Divider className={classes.divider} />
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="h6">
                      <NotificationsOutlinedIcon className={classes.headingIcon} />
                      {' '}
Notification block
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <FormControl
                      variant="outlined"
                      requirement
                      className={classes.fullWidth}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Reference Group
                      </InputLabel>
                      <Select
                        labelId="incident-type-label"
                        id="incident-type"
                        label="Reference Group"
                        value={jobForm.referenceGroup}
                        onChange={(e) => handleJobFormChange(e, 'referenceGroup')
                        }
                      >
                        <MenuItem value="one">One</MenuItem>
                        <MenuItem value="two">Two</MenuItem>
                        <MenuItem value="three">Three</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      id="immediate-actions"
                      multiline
                      rows="1"
                      label="Reference Number"
                      className={classes.fullWidth}
                      value={jobForm.referenceNumber}
                      onChange={(e) => handleJobFormChange(e, 'referenceNumber')
                      }
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <Autocomplete
                        id="combo-box-demo"
                        className={classes.mtTen}
                        options={supervisors}
                        getOptionLabel={(option) => option.inputValue}
                        renderInput={(params) => <TextField {...params} label="*Supervisor" variant="outlined" />}
                        value={jobForm.supervisor}
                        onChange={(e, value) => handleJobFormChange(e, 'supervisor', value)
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <Autocomplete
                        id="combo-box-demo"
                        className={classes.mRTen}
                        options={contractors}
                        getOptionLabel={(option) => option.inputValue}
                        renderInput={(params) => <TextField {...params} label="Field Contractor" variant="outlined" />}
                        value={jobForm.fieldContractor}
                        onChange={(e, value) => handleJobFormChange(e, value)
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">*Is a First Aid/Medical Aid present for your Shift?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="firstAid" name="firstAid" value={jobForm.firstAid} onChange={(e) => handleJobFormChange(e, 'firstAid')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      id="immediate-actions"
                      multiline
                      rows="1"
                      label="Emergency Phone Number"
                      className={classes.fullWidth}
                      value={jobForm.emergencyPhoneNumber}
                      onChange={(e) => handleJobFormChange(e, 'emergencyPhoneNumber')
                      }
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">*Has the JHA been reviewed?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="jhaReviewed" name="jhaReviewed" value={jobForm.jhaReviewed} onChange={(e) => handleJobFormChange(e, 'jhaReviewed')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      id="immediate-actions"
                      multiline
                      rows="1"
                      label="Enter the evacuation/Assembly Point"
                      className={classes.fullWidth}
                      value={jobForm.evacuationPoint}
                      onChange={(e) => handleJobFormChange(e, 'evacuationPoint')
                      }
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">*Do you have access to Job Procedure?</FormLabel>
                        <RadioGroup className={classes.radioInline} aria-label="accessToJobProcedure" name="accessToJobProcedure" value={jobForm.accessToJobProcedure} onChange={(e) => handleJobFormChange(e, 'accessToJobProcedure')}>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      variant="outlined"
                      id="immediate-actions"
                      multiline
                      rows="1"
                      label="Enter the location details"
                      className={classes.fullWidth}
                      value={(jobForm.location) ? (jobForm.location) : ''}
                      onChange={(e) => handleJobFormChange(e, 'location')}
                    />
                  </Grid>
                  <Divider className={classes.divider} />
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="h6">
                      <AddAlertOutlinedIcon className={classes.headingIcon} />
                      {' '}
Additional information
                    </Typography>
                  </Grid>
                </Grid>

                <Grid marginTop={4}>
                  <div className={classes.spacer}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={state.checkedA}
                          onChange={handleChange}
                          name="checked"
                          color="primary"
                        />
                      )}
                      label="I accept &amp; pledge"
                    />
                  </div>
                  <Grid item xs={12}>
                    <img src={pledgebanner} alt="decoration" />
                  </Grid>

                </Grid>
                <Box marginTop={4}>
                  <Button size="medium" variant="contained" color="primary" className={classes.spacerRight}>
                  Save
                  </Button>
                  <Button size="medium" variant="contained" color="primary" className={classes.spacerRight} onClick={handleJobFormSubmit}>
                  Submit
                  </Button>
                  <Button size="medium" variant="contained" color="secondary" className={classes.spacerRight}>
                  Cancel
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </PapperBlock>
    </div>
  );
};

export default FlhaDetails;
