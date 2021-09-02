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
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );
  const [criticalTasks, setCriticalTasks] = React.useState({})
  const [visualConfirmationsm, setVisualConfirmations] = React.useState({})
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

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    console.log({props: props.criticalTasks})
    setCriticalTasks(props.criticalTasks)
    console.log({props2356: props.criticalTasks})
    setVisualConfirmations(props.visualConfirmations)
    console.log({props2356: props})
    // getJobVisualConfirmation()
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.criticalTasks, props.visualConfirmations]);

  

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
  
  return (
    
    <div>

      <Grid container spacing={1}>
        <Grid item sm={12} xs={12}>
          <Box padding={0}>
            <Grid container spacing={3}>
              
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
                  {(props.criticalTasks.length > 0) ? 
                      (props.criticalTasks.map((task)=>(
                  <Accordion expanded={expanded === 'panel'} onChange={handleTwoChange('panel')} defaultExpanded className={classes.backPaper}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      className={classes.headingColor}
                    >
                      <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} /> Task#1 - {task.taskIdentification}</Typography>  
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item sm={12} xs={12}>
                        <FormLabel component="legend" className={classes.mttoptenn}>Task Identification</FormLabel>
                        <Typography>
                        {task.taskIdentification}
                        </Typography>
                      </Grid>
                      {(task.hazards.length > 0) ? 
                      (task.hazards.map((hazard)=>(
                      <Accordion expanded1={expanded1 === 'panell'} onChange={handleOneChange('panell')}  defaultExpanded className={classes.childBackPaper}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            className={classes.headingColor}
                            >
                              <Typography className={classes.heading}>Hazardk#1 - {hazard.hazards}</Typography>                              
                              
                          </AccordionSummary>
                          <AccordionDetails>
                          <Grid container spacing={0}>
                            <Grid item sm={11} xs={8}>
                              <FormLabel component="legend" className={classes.mttoptenn}>Hazards</FormLabel>
                              <Typography>
                              {hazard.hazards}
                              </Typography>
                            </Grid>
                            <Grid item sm={11} xs={8}>
                              <FormLabel component="legend" className={classes.mttoptenn}>Control</FormLabel>
                              <Typography>
                                {hazard.control}
                              </Typography>
                            </Grid>
                            <Grid item sm={1} xs={4}>
                              <img src={biologicalHazard} alt="decoration" className={classes.mttopEight} height={56} />
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item sm={12} xs={12}>
                                <FormLabel component="legend" className={classes.mttoptenn}>Task Identification</FormLabel>
                                <Typography>
                                {task.taskIdentification}
                                </Typography>
                                </Grid>
                              </Grid>    
                                <Grid container spacing={1}>
                                  <Grid item md={4} sm={4} xs={12}>
                                    <FormLabel component="legend" className={classes.mttoptenn}>Risk Severity</FormLabel>
                                    <Typography>
                                      {hazard.riskSeverity}
                                    </Typography>
                                  </Grid>
                                  <Grid item md={4} sm={4} xs={12}>
                                  <FormLabel component="legend" className={classes.mttoptenn}>Risk Probability</FormLabel>
                                    <Typography>
                                    {hazard.riskProbability}
                                    </Typography>
                                  </Grid>
                                  <Grid item md={4} sm={4} xs={12} className={classes.ratioColororange}>                
                                  {hazard.riskRatingLevel}
                                  </Grid>
                                </Grid>
                              </Grid>                  
                            </AccordionDetails>
                        </Accordion>
                        ))) : ""} 
                      
                      </AccordionDetails>
                    </Accordion>
                   
                   ))) : ""} 
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
                        {(props.visualConfirmations.length > 0) ? 
                      (props.visualConfirmations.map((visualConf)=>(
                          <TableRow className={classes.cellHeight}>
                            <TableCell align="left">{visualConf.visualConfirmationType}</TableCell>
                            <TableCell align="left">
                              <div className={classes.spacer}>
                              {visualConf.visualConfirmationStatus}
                                </div>
                            </TableCell>
                            <TableCell align="left">
                              
                              <img src={visualConf.visualConfirmationAttachment} className={classes.attachImg} alt="decoration" height={40} />
                            </TableCell>
                          </TableRow>
                        ))) : <TableRow className={classes.cellHeight}>No Data Available</TableRow>} 
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default FlhaDetails;
