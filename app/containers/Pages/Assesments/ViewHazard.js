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
import Attachment from '../../../containers/Attachment/Attachment';


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

let riskProb = { 1: 'Highly unlikely', 2: 'Unlikely', 3: 'Likely', 4: 'Very likely' }
let riskServ = { 2: 'Sightly harmful', 4: 'Harmful', 6: 'Very harmful', 8: 'Extremely harmful' }

const FlhaDetails = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );
  const [criticalTasks, setCriticalTasks] = React.useState({});
  const [flha, setFlha] = React.useState({});

  const [visualConfirmationsm, setVisualConfirmations] = React.useState({});
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


  const handleRiskChange = (rating) => {
    console.log(rating, 'rating')
    let colorRating = ''
    if (rating === "2 Trivial" || rating === "4 Trivial") {
      colorRating = '#009933'
    } else if (rating === "6 Tolerable" || rating === "8 Tolerable") {
      colorRating = '#8da225'

    } else if (rating === "12 Moderate" || rating === "16 Moderate") {
      colorRating = '#fff82e'

    } else if (rating === "18 Substantial" || rating === "24 Substantial") {
      colorRating = '#990000'
    }
    else {

      colorRating = '#ff0000'
    }

    return colorRating

  };



  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    console.log({ props: props.criticalTasks });
    setCriticalTasks(props.criticalTasks);
    console.log({ props2356: props.criticalTasks });
    setVisualConfirmations(props.visualConfirmations);
    setFlha(props.flha)
    console.log({ tytyty: props.flha });
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
                      {(props.criticalTasks.length > 0)
                        ? (props.criticalTasks.map((task) => (
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
                                Task#1 -
                                {' '}
                                {task.taskIdentification}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid item sm={12} xs={12}>
                                <FormLabel component="legend" className={classes.mttoptenn}>Task Name</FormLabel>
                                <Typography>
                                  {task.taskIdentification}
                                </Typography>
                              </Grid>
                              {(task.hazards.length > 0)
                                ? (task.hazards.map((hazard, key) => (
                                  <Accordion expanded1={expanded1 === 'panell'} onChange={handleOneChange('panell')} defaultExpanded className={classes.childBackPaper}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel2bh-content"
                                      id="panel2bh-header"
                                      className={classes.headingColor}
                                    >
                                      <Typography className={classes.heading}>
                                        Hazard#{(key) + 1} -
                                        {hazard.hazards}
                                      </Typography>

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
                                            {hazard.control ? hazard.control : "-"}
                                          </Typography>
                                        </Grid>
                                        <Grid item sm={1} xs={4}>
                                          {(hazard.hazardImage) ? <img src={hazard.hazardImage} alt="decoration" className={classes.mttopEight} height={56} /> : ''}

                                        </Grid>
                                        {/* <Grid container spacing={2}>
                                          <Grid item sm={12} xs={12}>
                                            <FormLabel component="legend" className={classes.mttoptenn}>Task Identification</FormLabel>
                                            <Typography>
                                              {task.taskIdentification}
                                            </Typography>
                                          </Grid>
                                        </Grid> */}
                                        <Grid container spacing={1}>
                                          <Grid item md={4} sm={4} xs={12}>
                                            <FormLabel component="legend" className={classes.mttoptenn}>Risk Severity</FormLabel>
                                            <Typography>
                                              {hazard.riskSeverity}
                                              {/* {riskServ[hazard.riskSeverity]} */}
                                            </Typography>
                                          </Grid>
                                          <Grid item md={4} sm={4} xs={12}>
                                            <FormLabel component="legend" className={classes.mttoptenn}>Risk Probability</FormLabel>
                                            <Typography>
                                              {/* {riskProb[hazard.riskProbability]} */}
                                              {hazard.riskProbability}
                                            </Typography>
                                          </Grid>
                                          <Grid item md={4} sm={4} xs={12} >

                                            <div
                                              className={
                                                classes.ratioColororange
                                              }
                                              style={{ backgroundColor: handleRiskChange(hazard.riskRatingLevel) }}
                                            >
                                              {hazard.riskRatingLevel}
                                            </div>

                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </AccordionDetails>
                                  </Accordion>
                                ))) : ''}

                            </AccordionDetails>
                          </Accordion>

                        ))) : ''}
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
                          {(props.visualConfirmations.length > 0)
                            ? (props.visualConfirmations.map((visualConf) => (
                              <TableRow className={classes.cellHeight}>
                                <TableCell align="left">{visualConf.visualConfirmationType}</TableCell>
                                <TableCell align="left">
                                  <div className={classes.spacer}>
                                    {visualConf.visualConfirmationStatus}
                                  </div>
                                </TableCell>
                                <TableCell align="left">
                                  {/* {
                                    (visualConf.visualConfirmationAttachment) ?
                                      <img src={visualConf.visualConfirmationAttachment} className={classes.attachImg} alt="decoration" height={40} />
                                      : "NA"
                                  } */}
                                  <Typography >
                                    {visualConf.visualConfirmationAttachment ===
                                      null ? null : typeof visualConf.visualConfirmationAttachment ===
                                        "string" ? (
                                      <Attachment value={visualConf.visualConfirmationAttachment} />
                                    ) : null}
                                  </Typography>

                                  {/* <img src={visualConf.visualConfirmationAttachment} className={classes.attachImg} alt="decoration" height={40} /> */}
                                </TableCell>
                              </TableRow>
                            ))) : <TableRow className={classes.cellHeight}>No Data Available</TableRow>}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
														<Typography variant="h6" className="sectionHeading">
															<svg id="outline-assignment-24px" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
																<g id="Bounding_Boxes">
																	<path id="Path_2274" data-name="Path 2274" d="M0,0H40V40H0Z" fill="none" />
																</g>
																<path id="reminder" d="M11.552,19.5a.8.8,0,0,1,0-1.592h2.787a10.146,10.146,0,0,0-.459,1.033c-.071.183-.134.368-.194.57ZM25.573,32.761a2.8,2.8,0,0,1-2.755,2.288,2.852,2.852,0,0,1-.97-.165,2.721,2.721,0,0,1-.856-.493,2.881,2.881,0,0,1-.633-.733,2.767,2.767,0,0,1-.328-.913.3.3,0,0,1,.242-.348h5.011a.285.285,0,0,1,.285.285.359.359,0,0,1,0,.08ZM24.384,16.5a5.859,5.859,0,0,1,.707.231,6.846,6.846,0,0,1,.973.479l.037.023a6.626,6.626,0,0,1,.827.6,6.275,6.275,0,0,1,.739.747h0a6.175,6.175,0,0,1,.6.873,6.651,6.651,0,0,1,.459.967h0a6.041,6.041,0,0,1,.285,1.061,6.238,6.238,0,0,1,.1,1.115v2.353h0a8.472,8.472,0,0,0,.063,1,8.315,8.315,0,0,0,.18.961h0a4.98,4.98,0,0,0,.314.881,5.445,5.445,0,0,0,.493.856h0a4.977,4.977,0,0,0,.719.8,8.324,8.324,0,0,0,1.033.8.491.491,0,0,1-.285.9H13.936a.491.491,0,0,1-.493-.491.5.5,0,0,1,.248-.442,8.311,8.311,0,0,0,1.027-.8,4.849,4.849,0,0,0,.713-.807l.02-.026a6.038,6.038,0,0,0,.473-.827,5.172,5.172,0,0,0,.319-.881s0,0,0-.017a7.159,7.159,0,0,0,.168-.918,8.411,8.411,0,0,0,.06-1.015V22.607a6.415,6.415,0,0,1,.1-1.118,5.915,5.915,0,0,1,.285-1.064,6.652,6.652,0,0,1,.465-.975,6.31,6.31,0,0,1,.613-.879h0a6.5,6.5,0,0,1,.75-.759,6.326,6.326,0,0,1,1.854-1.1,6.092,6.092,0,0,1,.724-.222,1.446,1.446,0,0,1,.436-.719,1.583,1.583,0,0,1,1.135-.365,1.629,1.629,0,0,1,1.124.371,1.515,1.515,0,0,1,.436.719Zm.262,1.512a5.285,5.285,0,0,0-.793-.242.465.465,0,0,1-.405-.408.682.682,0,0,0-.177-.431.7.7,0,0,0-.454-.137.636.636,0,0,0-.439.12.662.662,0,0,0-.174.434h0a.465.465,0,0,1-.379.408A4.889,4.889,0,0,0,20.97,18a4.969,4.969,0,0,0-.784.379,5.028,5.028,0,0,0-.7.508,5.365,5.365,0,0,0-.608.613h0a5.456,5.456,0,0,0-.493.713A5.8,5.8,0,0,0,18,21a4.809,4.809,0,0,0-.237.856,5.1,5.1,0,0,0-.077.9V24.98a8.991,8.991,0,0,1-.066,1.083,8.132,8.132,0,0,1-.191,1.007v.023a5.759,5.759,0,0,1-.365,1,6.806,6.806,0,0,1-.525.916l-.017.029a5.813,5.813,0,0,1-.81.913h14.2a5.679,5.679,0,0,1-.813-.916h0a6.344,6.344,0,0,1-.553-.953,5.667,5.667,0,0,1-.377-.984h0a8.729,8.729,0,0,1-.191-1.035,9.7,9.7,0,0,1-.066-1.067h0v-2.23a4.96,4.96,0,0,0-.08-.9A4.706,4.706,0,0,0,27.6,21h0a5.419,5.419,0,0,0-.371-.79,5.133,5.133,0,0,0-.491-.707h0a5.066,5.066,0,0,0-.6-.61,5.362,5.362,0,0,0-.67-.488l-.031-.02A6.05,6.05,0,0,0,24.655,18Zm-19.869.7a.588.588,0,0,1,.975-.653l.319.479L7.342,17a.588.588,0,1,1,.907.744L6.492,19.878a.548.548,0,0,1-.14.128.59.59,0,0,1-.816-.16l-.759-1.141Zm0-5.59a.588.588,0,1,1,.975-.653l.319.476,1.269-1.537a.588.588,0,0,1,.907.744L6.492,14.29a.57.57,0,0,1-.14.131.588.588,0,0,1-.816-.16L4.777,13.12Zm0-5.593a.588.588,0,1,1,.975-.653l.319.473L7.342,5.807a.589.589,0,1,1,.907.753L6.492,8.7a.616.616,0,0,1-.14.131.59.59,0,0,1-.816-.163L4.777,7.524Zm6.774.134a.8.8,0,1,1,0-1.592h8.48a.8.8,0,0,1,0,1.592ZM1.845,0H24.529a1.84,1.84,0,0,1,1.845,1.843v11.6l-.134-.06a8.754,8.754,0,0,0-1.064-.348h0a2.3,2.3,0,0,0-.385-.77V1.851a.258.258,0,0,0-.262-.262H1.845a.262.262,0,0,0-.26.262v22.8a.262.262,0,0,0,.26.262H13.283v.8c0,.262,0,.519-.023.77H1.851a1.834,1.834,0,0,1-1.309-.533A1.814,1.814,0,0,1,0,24.649V1.845A1.84,1.84,0,0,1,1.845,0Zm9.7,13.583a.8.8,0,1,1,0-1.589H19.37a.793.793,0,0,1,.716,1.141c-.228.066-.454.143-.676.225-.18.068-.357.143-.533.222Z" transform="translate(5.345 2.951)" fill="#06425c" />
															</svg> Additional information
														</Typography>
													</Grid>
													<Grid item md={12} sm={12} xs={12} className="paddTBRemove">
														<Paper elevation={1} className="paperSection">
															<Grid container spacing={3}>
																<Grid
																	item
																	md={5}
																	xs={12}
																>
																	<Typography
																		variant="label"
																		gutterBottom
																		className="viewLabel"
																	>
																		Is a First Aid/Medical Aid present for your shift?
																	</Typography>
																	<Typography className="viewLabelValue">
																		Yes
																	</Typography>
															
																</Grid>
																<Grid
																	item
																	md={4}
																	xs={12}
																>
																	<Typography
																		variant="label"
																		gutterBottom
																		className="viewLabel"
																	>
																		Emergency phone number
																	</Typography>
																	<Typography className="viewLabelValue">
																	{flha.emergencyPhoneNumber}
																	</Typography>
																</Grid>
															</Grid>
															<Grid container spacing={3}>
																<Grid
																	item
																	md={5}
																	xs={12}
																>
																	<Typography
																		variant="label"
																		gutterBottom
																		className="viewLabel"
																	>
																		Has the JHA been reviewed?
																	</Typography>
																	<Typography className="viewLabelValue">
																		Yes
																	</Typography>
																
																</Grid>
																<Grid
																	item
																	md={4}
																	xs={12}
																>
																	<Typography
																		variant="label"
																		gutterBottom
																		className="viewLabel"
																	>
																		Enter the evacuation/assembly point
																	</Typography>
																	<Typography className="viewLabelValue">
																		{flha.evacuationPoint}
																	</Typography>
											
																</Grid>
															</Grid>
															<Grid container spacing={3}>
																<Grid
																	item
																	md={5}
																	xs={12}
																>
																	<Typography
																		variant="label"
																		gutterBottom
																		className="viewLabel"
																	>
																		Do you have access to job procedure?
																	</Typography>
																	<Typography className="viewLabelValue">
																		Yes
																	</Typography>

																</Grid>
																<Grid
																	item
																	md={4}
																	xs={12}
																>
																	<Typography
																		variant="label"
																		gutterBottom
																		className="viewLabel"
																	>
																		Enter the location details
																	</Typography>
																	<Typography className="viewLabelValue">
																	{flha.location ?flha.location: '-' }
																	</Typography>
																</Grid>
                              
                            </Grid>
                            </Paper>
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
