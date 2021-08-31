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
const FlhaDetails = () => {
  const classes = useStyles();
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

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
              {/* <Grid item xs={12}>
                    <FormLabel component="legend">Project</FormLabel>
                    <Typography>
                      XFLHA
                    </Typography>
                  </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                  <DescriptionOutlinedIcon className={classes.headingIcon} /> Job information
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" onClick={handleClickOpen('paper')}>Select Job <FindInPageOutlinedIcon className={classes.plFive} /></Button>
                </Grid>
                <Grid item xs={10}>
                <TextField
                    multiline
                    variant="outlined"
                    rows="1"
                    id="JobTitle"
                    label="*Title"
                    className={classes.fullWidth}
                  />
                </Grid>
                <Grid item xs={2}><img src={project} height={58} alt="" className={classes.mttopSix} /></Grid>
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
                      <Autocomplete
                        id="job-title"
                        className={classes.mtTen}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Search job" variant="outlined" />}
                      />
                    </Grid>

                    <Grid item md={6} sm={6} xs={12}>
                    <div className={classes.spacer}>
                    <Autocomplete
                        id="department"
                        className={classes.mtTen}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="department" variant="outlined" />}
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
                        <Grid item xs={3}><Tooltip title="Task#1 - Job details" placement="bottom"><img src={project} alt="decoration" /></Tooltip></Grid>
                        <Grid item xs={3}><Tooltip title="Task#1 - Job details" placement="bottom"><img src={project} alt="decoration" /></Tooltip></Grid>
                        <Grid item xs={3}><Tooltip title="Task#1 - Job details" placement="bottom"><img src={project} alt="decoration" /></Tooltip></Grid>
                        <Grid item xs={3}><Tooltip title="Task#1 - Job details" placement="bottom"><img src={project} alt="decoration" /></Tooltip></Grid>
                        <Grid item xs={3}><Tooltip title="Task#1 - Job details" placement="bottom"><img src={project} alt="decoration" /></Tooltip></Grid>
                        <Grid item xs={3}><Tooltip title="Task#1 - Job details" placement="bottom"><img src={project} alt="decoration" /></Tooltip></Grid>
                        <Grid item xs={3}><Tooltip title="Task#1 - Job details" placement="bottom"><img src={project} alt="decoration" /></Tooltip></Grid>
                        <Grid item xs={3}><Tooltip title="Task#1 - Job details" placement="bottom"><img src={project} alt="decoration" /></Tooltip></Grid>
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
                    variant="outlined"
                    rows="2"
                    id="description"
                    label="*Details"
                    className={classes.fullWidth}
                  />
                </Grid>  */}
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
                              id="description"
                              label="*Task Identification"
                              className={classes.fullWidth}
                            />
                          </Grid>
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
                                  <div className={classes.spacer}>
                                    <FormControl component="fieldset">
                                      <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
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
                                    />
                                    <div className={classes.spacer}>
                                      <FormControl component="fieldset">
                                        <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
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
                                  <Grid item md={4} sm={4} xs={12} className={classes.ratioColororange}>
                                    50% Risk
                                  </Grid>
                                </Grid>
                                </Grid>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion expanded1={expanded1 === 'panell2'} onChange={handleOneChange('panell2')} className={classes.childBackPaper}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2bh-content"
                              id="panel2bh-header"
                              className={classes.headingColor}
                            >
                              <Typography className={classes.heading}>Hazardk#2 - "Hazard Name"</Typography>
                              <Typography className={classes.secondaryHeading}>
                                  <Fab
                                  color="secondary"
                                  size="small"
                                  align="right"
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
                                  <div className={classes.spacer}>
                                    <FormControl component="fieldset">
                                      <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </Grid>
                                  <Grid item sm={1} xs={4}>
                                  <img src={chemicalHazard} alt="decoration" className={classes.mttopEight} height={56} />
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
                                    />
                                    <div className={classes.spacer}>
                                      <FormControl component="fieldset">
                                        <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
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
                                  <Grid item md={4} sm={4} xs={12} className={classes.ratioColorred}>
                                    90% Risk
                                  </Grid>
                                </Grid>
                                </Grid>
                            </AccordionDetails>
                          </Accordion>
                          <Grid item xs={12} className={classes.createHazardbox}>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<AddCircleIcon />}
                              className={classes.button}
                            >
                                  Add new hazard
                            </Button>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion expanded={expanded === 'panel2'} onChange={handleTwoChange('panel2')} className={classes.backPaper}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                          className={classes.headingColor}
                        >
                          <Typography className={classes.heading}>
                            <MenuOpenOutlinedIcon className={classes.headingIcon} />
                            {' '}
Task#2 - "Task identification"
                            {' '}
                          </Typography>

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
                          <Typography className={classes.heading}>
                            <MenuOpenOutlinedIcon className={classes.headingIcon} />
                            {' '}
Task#3 - "Task identification"
                            {' '}
                          </Typography>

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
                          <Typography className={classes.heading}>
                            <MenuOpenOutlinedIcon className={classes.headingIcon} />
                            {' '}
Task#4 - "Task identification"
                            {' '}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                          Dummy content
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
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
                                  <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="No" control={<Radio />} label="NA" />
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
                                  <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="No" control={<Radio />} label="NA" />
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
                                  <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="No" control={<Radio />} label="NA" />
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
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default FlhaDetails;
