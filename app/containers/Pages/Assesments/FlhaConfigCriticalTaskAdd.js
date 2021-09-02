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
import Link from '@material-ui/core/Link';
import MUIDataTable from 'mui-datatables';

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
}));
const FlhaDetails = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [payload , setPayload] = React.useState({
    taskIdentification : ""
  })
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

  const fieldHandler=(e) => {
    console.log("Value  ", e.target.value , e.target.id)
    setPayload({
      ...payload,
     [e.target.id] : e.target.value
    })
  }

  React.useEffect(() => {
    console.log("payload " , payload ) ;
    props.dataHandler(payload)
  },[payload])
  return (
    <div>
      <Paper elevation={3}>
        <Box padding={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  id="immediate-actions"
                  multiline
                  rows="1"
                  id = "taskIdentification"
                  label="Task identification"
                  className={classes.fullWidth}
                  onChange = {fieldHandler}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Grid item sm={12} xs={12}>
                  <TextField
                    variant="outlined"
                    id="immediate-actions"
                    multiline
                    rows="1"
                    label="Control"
                    className={classes.fullWidth}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default FlhaDetails;
