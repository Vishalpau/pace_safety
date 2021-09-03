import React, { useEffect, useState } from 'react';
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
import Dropzone from 'react-dropzone'
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
import { useDropzone } from 'react-dropzone';
import FlhaConfigEdit from './FlhaConfigEdit';

import MUIDataTable from 'mui-datatables';
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
    minWidth: '650px !important',
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
  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '14px 15px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#06425c',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '5px',
      cursor: 'pointer',
      height: '55px',
      '& p': {
        margin: '0px',
      },
    },
  },
}));
const FlhaDetails = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [dataAr, setDatAr] = React.useState([]);
  const [dropDownAr, setDropDownAr] = React.useState([]);

  React.useEffect(() => {
    jobTitleApiHandler();
    dropDownHandle();
  }, []);


  // for status
  const initialState = {
    status: true,
  };
  const [statusChange, setstatusChange] = React.useState(initialState.status);

  const [fileName, setFilename] = React.useState('');

  // for image upload
  const [file, setFiles] = React.useState({});

  const handleNewFileUpload = (files) => {
    setFiles(files[0]);
    setFilename(files[0].name);
  };

  // Initial forms.
  const [form, setForm] = React.useState({
    fkCompanyId: '',
    fkDeparmentName: '',
    jobTitle: '',
    projectName: '',
    jobDetail: '',
    fkDepartmentId: '',
    jobTitleImage: '',
    status: ""
  });

  const fkCompanyId = JSON.parse(localStorage.getItem('company')) !== null
    ? JSON.parse(localStorage.getItem('company')).fkCompanyId
    : null;
  console.log('company', fkCompanyId);
  const projectName = JSON.parse(localStorage.getItem('projectName')) !== null
    ? JSON.parse(localStorage.getItem('projectName')).projectName.projectId
    : null;
  console.log('project', projectName);

  const handleDepartment = (id, name) => {
    setForm({ ...form, fkDepartmentId: id, fkDeparmentName: name });
  };

  const handelSubmit = async () => {
    // // console.log('depFor',
    const formData = new FormData(); // formdata object

    formData.append('fkCompanyId', JSON.parse(localStorage.getItem('company')).fkCompanyId);
    formData.append('fkProjectId', JSON.parse(localStorage.getItem('projectName')).projectName.projectId);
    formData.append('projectName', JSON.parse(localStorage.getItem('projectName')).projectName.projectName);
    formData.append('createdBy', JSON.parse(localStorage.getItem('userDetails')).id);

    formData.append('jobTitleImage', file);
    formData.append('fkDeparmentName', form.fkDeparmentName);
    formData.append('fkDepartmentId', form.fkDepartmentId);
    formData.append('jobDetail', form.jobDetail);
    formData.append('jobTitle', form.jobTitle);
    // localStorage.setItem('fkJobId', jobTitle.id);

    const res = await api.post('api/v1/configflhas/jobtitles/', formData);
    setForm({
      fkCompanyId: "",
      fkDeparmentName: '',
      jobTitle: '',
      projectName: '',
      jobDetail: '',
      fkDepartmentId: '',
      jobTitleImage: '',
      status: ""
    });
    dropDownHandle();
    setRender(!render);
    await jobTitleApiHandler();
  };

  const [render, setRender] = React.useState(false);

  const dropDownHandle = async () => {
    const res = await api.get(`${SSO_URL}/api/v1/companies/${fkCompanyId}/departments/`);
    setDropDownAr(res.data.data.results);
  };

  // for status api
  const statusToggle = async (value, data) => {
    // console.log('vishal',value)
    const obj = {
      fkCompanyId: data[5],
      fkDeparmentName: data[1],
      jobTitle: data[0],
      projectName: JSON.parse(localStorage.getItem('projectName')).projectName.projectName,
      jobDetail: data[3],
      fkDepartmentId: data[6],
      status: value
    };

    const res = await api.put(`api/v1/configflhas/jobtitles/${data[5]}/`, obj);
    setstatusChange(res.data.data.results.results);
  };


  const jobTitleApiHandler = async () => {
    const res = await api.get('api/v1/configflhas/jobtitles/');
    // console.log("res ", res, res.data.data.results.results);
    const data = [];
    res.data.data.results.results.map(jobTitle => {
      const innerAr = [];
      innerAr.push(jobTitle.jobTitle);
      innerAr.push(jobTitle.fkDeparmentName);
      innerAr.push(jobTitle.jobTitleImage);
      innerAr.push(jobTitle.jobDetail);
      innerAr.push(jobTitle.status);
      innerAr.push(jobTitle.id);
      innerAr.push(jobTitle.fkDepartmentId);

      // innerAr.push(jobTitle.projectName);


      data.push(innerAr);
    });

    await setDatAr(data);
    console.log({ updatedData111: data });
    console.log({ updatedData: dataAr });
  };
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

    console.log('data', data);
    const value = e.target.checked === true ? 'Active' : 'Inactive';
    console.log('value', value);
    setstatusChange({
      ...initialState, status: value,
    });
    statusToggle(value, data);
  };


  // third dialog
  const [ConfigOpen, setConfigOpen] = React.useState(false);
  const [ editPayload , setEditPayloadData] = React.useState([]) ;

  function handleConfigClickOpen(tableMeta) {
    setEditPayloadData(tableMeta.rowData)
    setConfigOpen(true);
  }

  function handleConfigClose() {
    setConfigOpen(false);
  }

//for edit
const [ hazardPayload , setCriticalPayload] = React.useState({}) ;
function dataHandler(data) {
  setCriticalPayload(data) ;
}

const hazardEditSubmitHandler = async () => {
  console.log({submithazard: payload})
    const formData = new FormData();

    formData.append('fkDeparmentName', payload.fkDeparmentName);
    formData.append('jobTitle', payload.jobTitle);
    formData.append('jobDetail', payload.jobDetail);
    formData.append('jobTitleImage', payload.jobTitleImage);
    formData.append('fkDepartmentId', payload.fkDepartmentId);

  let res = await api.put(`api/v1/configflhas/jobtitles/${editPayload[editPayload.length-2]}/`,formData) ;
  handleFlhaClose()
  jobTitleApiHandler()

}

const [payload, setPayload] = React.useState({
  fkDeparmentName:   "" ,
  jobTitle: "" ,
  jobDetail:  "" ,
  jobTitleImage:  "" ,
  fkDepartmentId:  "" ,
})
const handleFieldChange = async(e, fieldname) => {
  const temp = {...payload}
  // alert(fieldname)
  if(fieldname == "jobTitleImage"){
    console.log({event: e})
    temp['jobTitleImage'] = e[0];
  }
  else {
    temp[fieldname] = e.target.value
  }
  console.log('jobTitleImage',temp)
  await setPayload(temp);    
  console.log({payload: payload})
}


  //   Data for the table view
  const columns = [
    {
      name: 'Titles',
      options: {
        filter: true
      }
    },
    {
      name: 'Department',
      options: {
        filter: true
      }
    },
    {
      name: 'Image',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <img src={tableMeta.rowData[2]} height={58} alt="" className={classes.mttopSix} />
          </>
        )
      }
    },
    {
      name: 'Details',
      options: {
        filter: true
      }
    },
    {
      name: 'Status',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <Switch onChange={(e) => onInputChange(e, tableMeta.rowData)} checked="checked" />
          </>
        )
      }
    },
    {
      name: "fkDepartmentId",
      options: {
        display: false
      }
    },
    {
      name: '',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          // console.log(tableMeta);
          // const rowID = [tableMeta.tableData[tableMeta.rowIndex][5]];
          return (
            <>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon />
              </Button>
              {/* <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}> */}

                  <Link
                    // href={"/app/pages/assesments/FlhaConfigCriticalTask"+tableMeta.rowData[5]}
                    href={`/app/pages/assesments/flhaconfigcriticaltask/${tableMeta.rowData[5]}`}

                  >
                    Critical task

                  </Link>
                {/* </MenuItem> */}
                {/* <MenuItem onClick={handleClose}> */}
                  <span variant="outlined" color="primary" onClick={() => handleConfigClickOpen(tableMeta)}>
                    Edit job title
                  </span>
                {/* </MenuItem> */}
              {/* </Menu> */}
            </>
          )
        }
      }
    },
  ];

  function payloadHandler(e, payloadType) {
    console.log(e.target.value);
    const formPayload = JSON.parse(JSON.stringify(form));
    formPayload[payloadType] = e.target.value;
    console.log('form ', formPayload);
    setForm(formPayload);

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
  console.log({ dropDownAr });
  console.log({ dataAr });

  return (
    <div>
      <PapperBlock title="X-FLHA - Job Titles" icon="ion-ios-create-outline" desc="" color="primary">
        <Paper elevation={3}>
          {/* Flha config */}
          <div>
            <Dialog
              open={ConfigOpen}
              onClose={handleConfigClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Update X-FLHA Job Titles
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {console.log(editPayload,"kkkkk")}
                  <FlhaConfigEdit onChangeField={(e, fieldname) => handleFieldChange(e, fieldname)} editpayload={payload} dataHandler={(data) => dataHandler(data)} editPayload={editPayload}/>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={hazardEditSubmitHandler} color="primary" size="medium" variant="contained" className={classes.spacerRight}>
                  Save
                </Button>
                <Button onClick={handleConfigClose} color="secondary" autoFocus size="medium" variant="contained" className={classes.spacerRight}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Box padding={3}>
            <Grid item xs={12}>
              <Grid component={Paper}>

                <MUIDataTable
                  data={dataAr}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
          </Box>
          <Box padding={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <CheckOutlinedIcon className={classes.headingIcon} />New X-FLHA Job Titles</Typography>
              <Grid container spacing={3} className={classes.mttopThirty}>
                <Grid item md={4} sm={4} xs={12}>
                  <TextField
                    variant="outlined"
                    id="immediate-actions"
                    multiline
                    rows="1"
                    onChange={(e) => payloadHandler(e, 'jobTitle')}
                    value={form.jobTitle}
                    label="titles"
                    className={classes.fullWidth}
                  />
                </Grid>

                <Grid item sm={4} xs={12}>
                  <FormControl
                    variant="outlined"
                    requirement
                    className={classes.fullWidth}
                  >
                    <InputLabel id="department-label">
                      department

                      {' '}
                    </InputLabel>
                    <Select
                      fullWidth
                      label="department"
                      margin="dense"
                      name="department"
                      id="department"
                      select
                      variant="outlined"
                      className={classes.formControl}

                    >

                      {dropDownAr.map((department) => (
                        <MenuItem
                          key={department.id} value={department.id} onClick={(e) => {
                            handleDepartment(department.id, department.departmentName);
                          }}
                        >

                          {department.departmentName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                  className={classes.formBox}
                >
                  <Dropzone className="dropzone" onDrop={acceptedFiles => handleNewFileUpload(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <div className="block-dropzone" {...getRootProps()}>
                        <input onChange={handleNewFileUpload} {...getInputProps()} />
                        <p>{fileName || ""}</p>
                      </div>
                    )}
                  </Dropzone>
                  {/* <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} onChange={handleNewFileUpload} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div> */}
                  {/* <p>{fileName ? fileName : ""}</p> */}
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <TextField
                    variant="outlined"
                    id="immediate-actions"
                    multiline
                    rows="1"
                    label="details"
                    className={classes.fullWidth}
                    onChange={(e) => payloadHandler(e, 'jobDetail')}
                    value={form.jobDetail}
                  />
                </Grid>
                <Grid item md={1} sm={1} xs={12}>
                  <Button size="medium" variant="contained" color="primary" className={classes.spacerRight} onClick={(e) => handelSubmit()}>
                    Save
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
