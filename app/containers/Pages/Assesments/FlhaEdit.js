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
import api from "../../../utils/axios";
import { CreateNewFolderSharp } from '@material-ui/icons';
import { useHistory, useParams } from "react-router";

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
const FlhaEdit = (props) => {
  const classes = useStyles();
  const history = useHistory();
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

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [jobTitles, setjobTitles] = React.useState([])
  const [jobForm, setJobForm] = React.useState({
                'fkCompanyId':"", "fkProjectId":"", "jobTitle":"", "jobDetails":"", "location":"",
                "supervisor": "",
                "fieldContractor": "",
                "firstAid": "",
                "jhaReviewed": "",
                "accessToJobProcedure": "",
                "emergencyPhoneNumber": "",
                "evacuationPoint": "",
                "meetingPoint": "",
                "department": "",
                "permitToWork": "",
                "permitToWorkNumber": "",
                "dateTimeFlha": null,
                "referenceGroup": "",
                "referenceNumber": "",
                "classification": "",
              })
  const [hazardForm, setHazardForm] = React.useState([
    {
      hazards: "",
      riskSeverity: "",
      riskProbability: "",
      control: "",
      hazardStatus: "",
      controlStatus: "",
      hazards: "",
      control: "",
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
      taskIdentification: "",
      riskRatingLevel: "",
      rivisionReason: "",
      revisionTime: null,
      version: "",
      createdBy: "",
      hazards: [
        {
          hazards: "",
          riskSeverity: "",
          riskProbability: "",
          control: "",
          hazardStatus: "",
          controlStatus: "",
        }
      ],
    },
  ]);

  const [flha, setFlha] = React.useState("")
  const [flhaDetails, setFlhaDetails] = React.useState({})
  const [criticalTasks, setCriticalTasks] = React.useState([])

  const handleNewHazard = async(e, index) => {
    const temp = [...taskForm]
    temp[index].hazards.push({hazards: "",
          riskSeverity: "",
          riskProbability: "",
          control: "",
          hazardStatus: "",
          controlStatus: "",})
    console.log({temp:temp})
    await setTaskForm(temp)
  };

  const handleJobFormChange = async(e, fieldname) =>  {
    console.log(jobForm)

    const temp = {...jobForm};
    const { value } = e.target;

    console.log({value: value})
    temp[fieldname] = value;
    
    console.log({temp:temp})
    await setJobForm(temp);
  }

  const handleRiskChange = (e, key, taskIndex, fieldname) => {
    const temp = [...taskForm];
    temp[taskIndex].hazards[key][fieldname] = e.target.value
    
    const riskSeverity = ((temp[taskIndex].hazards[key]['riskSeverity'] == undefined || temp[taskIndex].hazards[key]['riskSeverity'] == "") ? 1 : temp[taskIndex].hazards[key]['riskSeverity'])
    const riskProbability = ((temp[taskIndex].hazards[key]['riskProbability'] == undefined || temp[taskIndex].hazards[key]['riskProbability'] == "") ? 1 : temp[taskIndex].hazards[key]['riskProbability'])
    console.log({riskSeverity:riskSeverity})
    console.log({riskSeverity:riskProbability})
    const riskRating =  riskSeverity * riskProbability;
    // alert(riskRating)
    
    if(riskRating >= 1 && riskRating <= 4){
      // alert("low")
      temp[taskIndex].hazards[key]['riskRating'] = "Low"
      temp[taskIndex].hazards[key]['riskRatingColour'] = "#1EBD10"
    }
    else if(riskRating > 4 && riskRating <= 9){
      // alert("medium")
      temp[taskIndex].hazards[key]['riskRating'] = "Medium"
      temp[taskIndex].hazards[key]['riskRatingColour'] = "#FFEB13"
    }
    else if(riskRating > 9 && riskRating <= 14){
      // alert("serious")
      temp[taskIndex].hazards[key]['riskRating'] = "Serious"
      temp[taskIndex].hazards[key]['riskRatingColour'] = "#F3C539"
    }
    else{
      // alert("high")
      temp[taskIndex].hazards[key]['riskRating'] = "High"
      temp[taskIndex].hazards[key]['riskRatingColour'] = "#FF0000"
    }

    console.log({updated: temp})
    setTaskForm(temp)
}


  const handleHazardForm = async (e, key, taskIndex, fieldname) => {
    console.log(fieldname)
    const temp = [...taskForm];
    // const hazardTemp = [...hazardForm]
    const { value } = e.target;

    if(key == undefined){
      temp[taskIndex][fieldname] = value;
    }
    else{
      if(temp[taskIndex]['hazards'][key] == undefined){
        temp[taskIndex]['hazards'][0] = [];
        key = 0;
      }
      temp[taskIndex]['hazards'][key][fieldname] = value
    }
    
    // console.log({hazard:hazardTemp})
    console.log({temp:temp})
    await setTaskForm(temp);
  };

  const handleSelectedJobHazardForm = async (tasks) => {
    // alert("In setting up form")
    console.log({hazardForm: hazardForm})
    console.log({tasks:tasks})
    // const temp = {}
    const temp=[]
    const temp1 = tasks.map((task, index) => {
      console.log({task: task['hazards']})
      temp[index] = {}
      temp[index]['taskIdentifications'] = task['taskIdentification']
      temp[index]['hazards'] = task['hazards']
      return temp
    })
    console.log({temp: temp})
    console.log({temp1:temp1})
    
    await setTaskForm(temp);
    console.log({taskForm: taskForm})

    await setHazardForm(temp1['hazards'])
    console.log({hazardForm: hazardForm})
    
  };


  const handleJobFormSubmit = async() => {
    await createCriticalTask(props.match.params.id)
    
    
  }

  const selectBreakdown =
  JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
  let struct = "";
  for (const i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }
  const fkProjectStructureIds = struct.slice(0, -1);
  const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId = JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
  const fkUserId = JSON.parse(localStorage.getItem("userDetails")).id;

  // const createFlha = async() => {
  //   const flhaId = props.match.params.id
  //   const data = [...taskForm]
  //   // data['fkCompanyId'] = fkCompanyId
  //   // data['fkProjectId'] = fkProjectId
  //   // data['fkProjectStructureIds'] = fkProjectStructureIds
  //   // data['createdBy'] = fkUserId
  //   console.log({jobform: data})
  //   const res = await api.post(
  //     '/api/v1/flhas/'+flhaId+'/criticaltasks/',
  //     taskForm
  //   );
  //   console.log(res.data.data.results.id)
  //   await setFlha(res.data.data.results.id)
    
  //   await createCriticalTask(res.data.data.results.id)
  // }

  const createCriticalTask = async(flha) => {
    const data = taskForm
    console.log({"in submit":data})
    // data['fkFlhaId'] = flha
    
    const flhaData =  data.map((flhaDetail, index)=>{
      console.log({flha: data})
      data[index]['fkFlhaId'] = flha
      data[index]['createdBy'] = fkUserId
      console.log({updatedData: data})
    })
    console.log({data:data})
    const res = await api.post(
      `/api/v1/flhas/${flha}/criticaltasks/`,
      taskForm
    );
    history.push('/app/pages/assesments/flhasummary/'+props.match.params.id)
    console.log({criticalpost: res.data.data.results})

    // await createVisualConfirmation(flha)
  }

  // const createVisualConfirmation = async(flha) => {
  //   alert(flha)
  // }

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
    getFlhaDetails(props.match.params.id)
    getPreventiveControls(props.match.params.id)
    
  }, []);

  const getFlhaDetails = async(flhaId) => {
    const flhaNumber = flhaId
    const res = await api.get("api/v1/flhas/"+flhaNumber+"/");
    
    await setFlhaDetails(res.data.data.results)
    console.log({flhares:res.data.data.results})
    console.log({flhastate:flhaDetails})
  }

  const getPreventiveControls = async(flhaId) => {
    const res = await api.get("api/v1/flhas/"+flhaId+"/criticaltasks/");
    
    await setCriticalTasks(res.data.data.results.tasks)


    await handleSelectedJobHazardForm(res.data.data.results.tasks)

    console.log({controres: res.data.data.results.tasks})
    console.log({controls:criticalTasks})
  }


  const handleJobSelection = async(jobTitleId) => {
    const res = await api.get("api/v1/configflhas/jobtitles/"+jobTitleId+"/");
    const selectedJobTitle = res.data.data.results
    console.log({jobtitleseleted:selectedJobTitle})
    setJobForm(
      {
        "jobTitle":selectedJobTitle.jobTitle, "jobDetails":selectedJobTitle.jobDetail,
      }
    );
    await handleSelectedJobHazardForm(selectedJobTitle.critical_tasks)
      setOpen(false)
    // setjobTitles(res.data.data.results.results)
  }

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

  
  // console.log({flharender: flhaDetails})

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
                      XFLHA
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <DescriptionOutlinedIcon className={classes.headingIcon} />
                      {' '}
Job information
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={10}>
                  <Typography variant="h6"></Typography>
                  <FormLabel component="legend">Job Title</FormLabel>
                    <Typography>
                    JobTitle data here
                    </Typography>
                </Grid>
                  <Grid item xs={2}><img src={project} height={58} alt="" className={classes.mttopSix} /></Grid>
                <Grid item xs={12}>
                  <FormLabel component="legend">Description</FormLabel>
                  <Typography>Duumy content here for description so need a text here. Duumy content here for description so need a text here Duumy content here for description so need a text here. Duumy content here for description so need a text here.</Typography>
                </Grid>
                <Divider className={classes.divider} />
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
                                  value={(taskValue.taskIdentifications != undefined) ? taskValue.taskIdentifications : ""}
                                  onChange={(e) =>
                                    handleHazardForm(e,null, taskIndex, "taskIdentification")
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
                                          value={item.hazards}
                                          onChange={(e) =>
                                            handleHazardForm(e, index, taskIndex, "hazards")
                                          }
                                        />
                                      </FormControl>
                                      <div className={classes.spacer}>
                                        <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                          Hazard Status
                                        </FormLabel>
                                          <RadioGroup className={classes.radioInline} aria-label="hazardStatus" name="hazardStatus" value={item.hazardStatus} onChange={(e)=>handleHazardForm(e, index, taskIndex, 'hazardStatus')}>
                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                          </RadioGroup>
                                        </FormControl>
                                      </div>
                                    </Grid>
                                    <Grid item sm={1} xs={4}>
                                      <img src={biologicalHazard} alt="decoration" className={classes.mttopEight} height={56} />
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
                                          onChange={(e) =>
                                            handleHazardForm(e, index,taskIndex,  "control")
                                          }
                                        />
                                        <div className={classes.spacer}>
                                          <FormControl component="fieldset">
                                          <FormLabel component="legend">
                                            Control Status
                                          </FormLabel>
                                            <RadioGroup className={classes.radioInline} aria-label="controlStatus" name="controlStatus" value={item.controlStatus} onChange={(e)=>handleHazardForm(e, index,taskIndex,  'controlStatus')}>
                                              <FormControlLabel value="Yes" control={<Radio/>} label="Yes" />
                                              <FormControlLabel value="No" control={<Radio />} label="No" />
                                              <FormControlLabel value="No" control={<Radio />} label="NA" />
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
                                            id="riskSeverity"
                                            label="Risk Severity"
                                            value={item.riskSeverity}
                                            onChange={(e) =>
                                              handleRiskChange(e, index,taskIndex,  "riskSeverity")
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
                                            id="riskProbability"
                                            label="Risk Probability"
                                            value={item.riskProbability}
                                            onChange={(e) =>
                                              handleRiskChange(e, index, taskIndex, "riskProbability")
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
                                      <Grid item md={4} sm={4} xs={12} className={classes.ratioColororange} style={{backgroundColor:item.riskRatingColour}}>
                                            {item.riskRating}
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
                   
                    </Box>
                  </Grid>
                  
                  <Divider className={classes.divider} />
               
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

export default FlhaEdit;
