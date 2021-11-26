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
                  <Typography variant="h6" className="sectionHeading">
											<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
											<g id="Group_5329" data-name="Group 5329" transform="translate(-327 -742)">
												<g id="Group_4995" data-name="Group 4995" transform="translate(327 742)">
												<g id="outline-assignment-24px">
													<g id="Bounding_Boxes">
													<path id="Path_2274" data-name="Path 2274" d="M0,0H40V40H0Z" fill="none"/>
													</g>
													<path id="services_1_" data-name="services (1)" d="M.824,15.012H5.662a.827.827,0,0,1,.824.824v9.889a.827.827,0,0,1-.824.824H.824A.827.827,0,0,1,0,25.725V15.836a.827.827,0,0,1,.824-.824Zm6.731,10.57V15.951H12.7a16.278,16.278,0,0,1,5.516,2.486h3.371c1.523.09,2.323,1.638.843,2.658-1.183.867-2.741.816-4.338.675a.725.725,0,1,0,0,1.43c.4.032.832-.061,1.212-.064,1.994,0,3.637-.383,4.641-1.957l.513-1.2L29.468,17.5c2.509-.824,4.291,1.8,2.443,3.623a65.661,65.661,0,0,1-11.165,6.569,7.558,7.558,0,0,1-8.3,0L7.558,25.582ZM16.482,2.034a.306.306,0,0,0-.1-.056.191.191,0,0,0-.085,0,.3.3,0,0,0-.194.1l-.673.8a.407.407,0,0,1-.505.1c-.09-.048-.186-.093-.282-.133s-.21-.082-.311-.117-.2-.064-.324-.1-.221-.061-.324-.085a.409.409,0,0,1-.308-.383l-.1-1.1a.343.343,0,0,0-.032-.112.324.324,0,0,0-.061-.077A.191.191,0,0,0,13.092.83a.245.245,0,0,0-.109,0L11.572.968A.377.377,0,0,0,11.463,1a.311.311,0,0,0-.09.074.287.287,0,0,0-.048.088h0a.237.237,0,0,0,0,.088l.1,1.034a.409.409,0,0,1-.3.433c-.085.029-.181.064-.29.109s-.2.09-.287.136h-.016c-.09.048-.186.1-.266.152H10.24c-.09.053-.178.109-.266.165a.412.412,0,0,1-.484-.021l-.92-.712a.34.34,0,0,0-.093-.053.183.183,0,0,0-.08,0,.348.348,0,0,0-.109.035H8.273a.356.356,0,0,0-.066.061L7.316,3.669a.346.346,0,0,0-.061.109.231.231,0,0,0,0,.085v.019a.239.239,0,0,0,.027.09v.013a.308.308,0,0,0,.064.069l.8.673a.4.4,0,0,1,.1.508q-.072.13-.13.266a3.288,3.288,0,0,0-.117.311c-.032.1-.066.2-.1.324s-.061.223-.085.324a.407.407,0,0,1-.364.33l-1.1.1a.327.327,0,0,0-.109.032.3.3,0,0,0-.08.064.239.239,0,0,0-.045.085.266.266,0,0,0,0,.106L6.25,8.59a.324.324,0,0,0,.032.112.3.3,0,0,0,.072.09.359.359,0,0,0,.088.048.29.29,0,0,0,.1,0l1.034-.1a.407.407,0,0,1,.417.3c.029.085.066.183.112.29s.088.2.136.29l.019.037c.043.082.09.173.144.266l.178.292a.412.412,0,0,1-.027.479l-.736.906a.4.4,0,0,0-.048.085.239.239,0,0,0,0,.077.308.308,0,0,0,.032.112.266.266,0,0,0,.069.082c.367.306.744.606,1.109.914a.279.279,0,0,0,.08.04.25.25,0,0,0,.1,0h0a.377.377,0,0,0,.117-.032h.013a.656.656,0,0,0,.072-.056l.665-.8a.407.407,0,0,1,.508-.1,3.05,3.05,0,0,0,.282.133c.1.045.207.082.311.117s.2.066.324.1.221.061.324.085a.407.407,0,0,1,.316.383l.1,1.082a.292.292,0,0,0,.035.109.247.247,0,0,0,.061.08.3.3,0,0,0,.085.045.29.29,0,0,0,.109,0l1.409-.138A.34.34,0,0,0,14,13.888h0a.33.33,0,0,0,.085-.064.34.34,0,0,0,.056-.1.191.191,0,0,0,0-.1l-.1-1.037a.407.407,0,0,1,.266-.425c.1-.035.207-.074.308-.117h.032c.085-.037.17-.08.266-.128h.016c.1-.051.2-.1.287-.157l.3-.178a.4.4,0,0,1,.476.029l.9.734a.359.359,0,0,0,.088.048h0a.183.183,0,0,0,.085,0,.266.266,0,0,0,.109-.029.324.324,0,0,0,.08-.072c.306-.367.606-.744.914-1.109a.237.237,0,0,0,.04-.077.306.306,0,0,0,0-.1h0a.4.4,0,0,0-.032-.117.322.322,0,0,0-.066-.085l-.8-.649a.4.4,0,0,1-.1-.51,3.049,3.049,0,0,0,.133-.282c.045-.109.085-.213.117-.308s.064-.207.1-.327.061-.218.085-.324a.407.407,0,0,1,.391-.316l1.106-.117a.343.343,0,0,0,.112-.032.409.409,0,0,0,.077-.061.3.3,0,0,0,.045-.085h0a.3.3,0,0,0,0-.1l-.138-1.409a.348.348,0,0,0-.032-.109V6.163a.335.335,0,0,0-.066-.074.287.287,0,0,0-.088-.048h0a.237.237,0,0,0-.088,0l-1.045.074a.412.412,0,0,1-.425-.266c-.035-.1-.072-.2-.12-.308s-.093-.218-.138-.306V5.216a2.993,2.993,0,0,0-.149-.266c-.053-.09-.114-.181-.175-.266a.409.409,0,0,1,.024-.492l.728-.9a.306.306,0,0,0,.053-.093.178.178,0,0,0,0-.077.367.367,0,0,0-.035-.112V2.991a.311.311,0,0,0-.056-.064l-1-.819A.388.388,0,0,1,16.482,2.034Zm11,6.54a.409.409,0,0,0-.306-.1.431.431,0,0,0-.282.152l-.407.492a2.842,2.842,0,0,0-.4-.17c-.144-.045-.266-.085-.42-.12L25.6,8.146a.417.417,0,0,0-.146-.282.385.385,0,0,0-.3-.088l-.867.085A.428.428,0,0,0,24.021,8a.4.4,0,0,0-.1.306l.058.63a2.491,2.491,0,0,0-.407.173,3.03,3.03,0,0,0-.372.218l-.548-.441a.377.377,0,0,0-.3-.1.425.425,0,0,0-.282.154l-.532.662a.412.412,0,0,0,.056.587l.463.407a2.552,2.552,0,0,0-.167.4,4.056,4.056,0,0,0-.122.42l-.686.064a.425.425,0,0,0-.282.146.388.388,0,0,0-.072.306l.085.864a.42.42,0,0,0,.146.279.391.391,0,0,0,.3.1l.63-.058a2.6,2.6,0,0,0,.165.4,4.176,4.176,0,0,0,.218.383l-.441.532a.375.375,0,0,0-.1.3A.42.42,0,0,0,21.9,15l.673.577a.4.4,0,0,0,.306.088.447.447,0,0,0,.287-.144l.409-.5a2.459,2.459,0,0,0,.4.17,3.958,3.958,0,0,0,.42.12l.064.689a.428.428,0,0,0,.146.279.4.4,0,0,0,.306.09l.864-.085a.431.431,0,0,0,.279-.146.4.4,0,0,0,.1-.306l-.061-.63a2.31,2.31,0,0,0,.407-.173,3.86,3.86,0,0,0,.38-.215l.532.441a.4.4,0,0,0,.306.1.409.409,0,0,0,.282-.152l.553-.67a.407.407,0,0,0,.09-.306.436.436,0,0,0-.146-.287l-.5-.4a2.366,2.366,0,0,0,.189-.4,4.1,4.1,0,0,0,.12-.417l.689-.064a.417.417,0,0,0,.266-.146.393.393,0,0,0,.09-.306l-.085-.864a.431.431,0,0,0-.146-.266.4.4,0,0,0-.306-.1l-.63.061A2.958,2.958,0,0,0,28,10.626a2.318,2.318,0,0,0-.218-.372l.444-.548a.388.388,0,0,0,.1-.3.431.431,0,0,0-.152-.282l-.665-.545h-.021Zm-2.626,1.816a1.789,1.789,0,0,1,.67.066,1.749,1.749,0,0,1,.572.308,1.691,1.691,0,0,1,.412.5,1.6,1.6,0,0,1,.191.641,1.784,1.784,0,0,1-.066.67A1.634,1.634,0,0,1,25.2,13.752a1.731,1.731,0,0,1-.67-.066,1.757,1.757,0,0,1-.574-.306,1.736,1.736,0,0,1-.409-.505,1.574,1.574,0,0,1-.2-.646,1.669,1.669,0,0,1,.877-1.653,1.574,1.574,0,0,1,.641-.191ZM16.631,1.2a1.233,1.233,0,0,1,.266.12.393.393,0,0,1,.16.08l1.071.891a1.114,1.114,0,0,1,.25.29l.021.035a1.124,1.124,0,0,1,.128.4.989.989,0,0,1-.045.441,1.114,1.114,0,0,1-.189.343l-.548.681.035.056a3.586,3.586,0,0,1,.189.362q.1.186.16.343l.021.053.718-.069a1.023,1.023,0,0,1,.415.037H19.3a1.114,1.114,0,0,1,.34.183l.037.032a1.111,1.111,0,0,1,.237.292l.021.035a1.116,1.116,0,0,1,.114.385c0,.356.09,1.047.138,1.42a1.063,1.063,0,0,1-.029.4v.024a1.063,1.063,0,0,1-.2.375h0a1.079,1.079,0,0,1-.316.266,1.175,1.175,0,0,1-.4.122l-.845.074-.021.077c-.029.106-.066.226-.114.362s-.088.266-.133.364l-.021.045.582.471a1.1,1.1,0,0,1,.266.343,1.138,1.138,0,0,1,.085.367v.013a1.045,1.045,0,0,1-.035.425,1.1,1.1,0,0,1-.178.359L17.9,12.819a1.063,1.063,0,0,1-.322.266,1.042,1.042,0,0,1-.407.128,1.082,1.082,0,0,1-.423-.035h-.021A1.14,1.14,0,0,1,16.391,13l-.689-.561-.069.04c-.117.069-.231.13-.34.183s-.2.1-.311.149l-.1.032.074.718a1.039,1.039,0,0,1-.045.439,1.132,1.132,0,0,1-.2.359l-.016.016a1.167,1.167,0,0,1-.3.242h-.027a1.138,1.138,0,0,1-.383.114c-.356,0-1.047.093-1.42.141a1.124,1.124,0,0,1-.425-.035,1.063,1.063,0,0,1-.375-.2h-.013a1.164,1.164,0,0,1-.253-.319,1.1,1.1,0,0,1-.122-.4l-.077-.843-.074-.021-.362-.114A3.31,3.31,0,0,1,10.5,12.8l-.051-.021-.479.582a1.063,1.063,0,0,1-.311.242l-.029.019a1.223,1.223,0,0,1-.37.106H9.251a1.063,1.063,0,0,1-.428-.035,1.117,1.117,0,0,1-.354-.181L7.345,12.58a1.1,1.1,0,0,1-.266-.322,1.109,1.109,0,0,1-.128-.4A.957.957,0,0,1,7,11.431a1.063,1.063,0,0,1,.181-.338l.561-.689-.029-.066c-.058-.1-.114-.2-.17-.316h0c-.066-.122-.122-.239-.173-.359L7.342,9.6l-.712.066a1.029,1.029,0,0,1-.436-.043,1.063,1.063,0,0,1-.34-.186l-.04-.029a1.159,1.159,0,0,1-.266-.332A1.119,1.119,0,0,1,5.434,8.7c0-.359-.093-1.039-.141-1.417a1.09,1.09,0,0,1,.024-.439,1.063,1.063,0,0,1,.2-.375h0A1.175,1.175,0,0,1,5.838,6.2a1.1,1.1,0,0,1,.4-.12L7.084,6l.021-.077c.032-.1.069-.226.114-.359s.09-.266.136-.367l.021-.051-.545-.463a1.122,1.122,0,0,1-.266-.3L6.55,4.366a1.042,1.042,0,0,1-.112-.377V3.967a1.063,1.063,0,0,1,.043-.428,1.111,1.111,0,0,1,.207-.375l.891-1.087a1.042,1.042,0,0,1,.292-.247L7.9,1.808a1.063,1.063,0,0,1,.4-.128.954.954,0,0,1,.433.045,1.138,1.138,0,0,1,.343.189l.683.55.069-.053c.109-.064.221-.122.332-.178s.234-.117.343-.165l.064-.024L10.5,1.33A1.023,1.023,0,0,1,10.54.915V.894a1.114,1.114,0,0,1,.183-.34l.04-.021a1.138,1.138,0,0,1,.327-.266,1.1,1.1,0,0,1,.385-.12c.356,0,1.047-.09,1.42-.138a1.051,1.051,0,0,1,.8.234h0a1.154,1.154,0,0,1,.266.316,1.175,1.175,0,0,1,.128.415l.074.845.077.021c.1.029.226.066.362.112l.364.136.053.024.46-.556A1.085,1.085,0,0,1,15.8,1.29a1.1,1.1,0,0,1,.412-.133,1,1,0,0,1,.428.04ZM12.417,4.283a3.647,3.647,0,0,1,.614,0,3.238,3.238,0,0,1,.627.125h0a3.28,3.28,0,0,1,.564.237l.024.013a3.347,3.347,0,0,1,.479.322h0a3.318,3.318,0,0,1,.768.944,2.81,2.81,0,0,1,.245.582,2.906,2.906,0,0,1,.117.627h0a3.363,3.363,0,0,1,0,.611,2.977,2.977,0,0,1-.122.627V8.4a3.256,3.256,0,0,1-.229.532,3.522,3.522,0,0,1-.332.505l-.027.029a3.243,3.243,0,0,1-.922.747,3.054,3.054,0,0,1-.585.245,3.28,3.28,0,0,1-.625.117,3.775,3.775,0,0,1-.625,0,3.19,3.19,0,0,1-.627-.125h0a3.344,3.344,0,0,1-.561-.237,3.615,3.615,0,0,1-.505-.335h0a3.256,3.256,0,0,1-.425-.431,3.512,3.512,0,0,1-.346-.51,3.017,3.017,0,0,1-.242-.585,2.906,2.906,0,0,1-.117-.627h0a3.363,3.363,0,0,1,0-.611,2.977,2.977,0,0,1,.122-.627h0a3.19,3.19,0,0,1,.237-.564L9.937,5.9a3.1,3.1,0,0,1,.322-.481l.021-.027a3,3,0,0,1,.415-.407,3.5,3.5,0,0,1,.51-.343,3,3,0,0,1,.582-.245,3.347,3.347,0,0,1,.627-.117Zm.532.816a2.557,2.557,0,0,0-.473,0h0a2.345,2.345,0,0,0-.46.085,2.18,2.18,0,0,0-.423.175,2.775,2.775,0,0,0-.391.266,2.472,2.472,0,0,0-.3.292h0a2.478,2.478,0,0,0-.239.359V6.3a2.515,2.515,0,0,0-.175.423,2.353,2.353,0,0,0-.117.473,2.81,2.81,0,0,0,0,.473h0a2.222,2.222,0,0,0,.088.463,2.087,2.087,0,0,0,.178.431,2.536,2.536,0,0,0,.266.388,2.228,2.228,0,0,0,.314.319,2.539,2.539,0,0,0,.375.247,2.688,2.688,0,0,0,.425.178,2.127,2.127,0,0,0,.46.09,2.643,2.643,0,0,0,.481,0,2.408,2.408,0,0,0,.463-.085,2.127,2.127,0,0,0,.407-.175,2.563,2.563,0,0,0,.391-.266,2.472,2.472,0,0,0,.3-.3h0a2.523,2.523,0,0,0,.266-.383,2.887,2.887,0,0,0,.173-.4V8.156a2.393,2.393,0,0,0,.093-.463,2.81,2.81,0,0,0,0-.473h0a2.222,2.222,0,0,0-.088-.463,2.153,2.153,0,0,0-.175-.423,2.414,2.414,0,0,0-.266-.388,2.228,2.228,0,0,0-.314-.319,2.563,2.563,0,0,0-.354-.237h-.021a2.658,2.658,0,0,0-.425-.178,2.143,2.143,0,0,0-.457-.09ZM4.32,22.822a.946.946,0,1,1-.944.946.946.946,0,0,1,.944-.946Z" transform="translate(3.727 5.592)" fill="#06425c"/>
												</g>
												</g>
											</g>
											</svg> Preventive controls
											</Typography>
                  </Grid>
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
																		{flha.firstAid ? flha.firstAid :'-' }
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
																	{flha.emergencyPhoneNumber ? flha.emergencyPhoneNumber:'-'}
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
                                  {flha.jhaReviewed}
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
																		{flha.evacuationPoint ? flha.evacuationPoint:'-'}
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
																		{flha.accessToJobProcedure}
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
																	{flha.location ? flha.location: '-' }
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
