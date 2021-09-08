import React, { useEffect, useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Grid, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Link from '@material-ui/core/Link';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ActionTrackerValidator from "./ActionTrackerValidation";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
  dialogCloseButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  custmSubmitBtn: {
    color: '#ffffff',
    backgroundColor: '#06425c',
    lineHeight: '30px',
    border: 'none',
    '&:hover': {
      backgroundColor: '#ff8533',
      border: 'none',
    },
  },
  dialogContent:{
    overflow: 'hidden',
  }
}));

export default function ActionTracker(props) {

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;
  const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).id
      : null;
  const project =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName
    : null;
  const selectBreakdown =
  JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
    var struct = "";
  for (var i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }
  const fkProjectStructureIds = struct.slice(0, -1);

  const [form, setForm] = useState({
    fkCompanyId: parseInt(fkCompanyId),
    fkProjectId: parseInt(project.projectId),
    fkProjectStructureIds: fkProjectStructureIds !== "" ? fkProjectStructureIds : 0,
    parentId: 0,
    actionContext: props.actionContext,
    enitityReferenceId: props.enitityReferenceId,
    actionTitle: props.actionTitle,
    actionDetail: "string",
    actionCategory: "string",
    actionShedule: "string",
    priority: "string",
    severity: "",
    approver: 0,
    assignTo: 0,
    deligateTo: 0,
    plannedStartDate: "2021-07-21T17:05:39.604Z",
    actualStartDate: "2021-07-21T17:05:39.604Z",
    plannedEndDate: null,
    actualEndDate: "2021-07-21T17:05:39.604Z",
    forecaststartDate: "2021-07-21T17:05:39.604Z",
    forecastEndDate: "2021-07-21T17:05:39.604Z",
    location: "string",
    latitude: 0,
    longitude: 0,
    supervisorId: 0,
    contractor: 0,
    contractorName: "string",
    contractorCompany: "string",
    actionStatus: "string",
    actionStage: "string",
    status: "Active",
    createdBy: 0,
    reviewedBy: 0,
    reviewDate: "2021-07-21T17:05:39.605Z",
    closedBy: 0,
    closeDate: "2021-07-21T17:05:39.605Z",
    source: "Web",
    vendor: "string",
    vendorReferenceId: "string",
  });
  let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
  const api = axios.create({
    baseURL: API_URL_ACTION_TRACKER,
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({ });
  const [actionTakenData, setActionTakenData] = useState([])
  const [isLoading , setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    await setError({ actionTitle: "",assignTo:"" });
    await setForm({ ...form, actionTitle: ""  ,assignTo : "",severity : "", plannedEndDate: null })
    await setOpen(false);
  };
  const handelSubmit = async () => {
    const { error, isValid } = ActionTrackerValidator(form);
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    
      let res = await api.post(`api/v1/actions/`, form);
      if (res.status == 201) {
        let actionId = res.data.data.results.actionNumber
        localStorage.setItem("actionId" , actionId)
        await setError({ actionTitle: "",assignTo : "" });
        await setForm({ ...form,actionTitle : "",assignTo : "",severity : "", plannedEndDate: null })
        await setOpen(false);
        await props.setUpdatePage(!props.updatePage)

      
    
  };
  }
  let actionId = props.actionId;
  let actionDetail = props.actionData
  let severity = ["Normal", "Critical", "Blocker"];
  const [reportedByName , setReportedByName] = useState([]);
  let filterReportedByName = []
  const classes = useStyles();

  const fetchReportedBy = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${fkCompanyId}/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results[0].users;
          let user = [];
          user = result;
          for (var i in result) {
            filterReportedByName.push(result[i]);
          }
          setReportedByName(filterReportedByName);
        }
      })
      .catch((error) => {
      });
  };

  const fetchactionTrackerData = async () =>{
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    let ActionToCause = {}
    const allActionTrackerData = await api_action.get("/api/v1/actions/")
    const allActionTracker = allActionTrackerData.data.data.results.results
    const newData = allActionTracker.filter(
      (item) => item.enitityReferenceId === localStorage.getItem("fkobservationId") 
      
      )
      let sorting = newData.sort((a, b) => a.id - b.id)
    await setActionTakenData(sorting)
    await setIsLoading(true);

  }

  useEffect(() => {
      fetchReportedBy()
      fetchactionTrackerData();
    
    
  },[])

  return (
    <>
      {isLoading ? (<>
        {/* {actionTakenData[0] ? <Link onClick={handleClickOpen}>{actionDetail.actionNumber}</Link>  : */}
      <button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        <FlashOnIcon />
      </button> 
      {/* } */}
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Action tracker</DialogTitle>
        <IconButton
          className={classes.dialogCloseButton}
          onClick={(e) => {
            setOpen(false);
            setError({ actionTitle: "" });
          }}
        >
          <CloseIcon onClick={handleClose}/>
        </IconButton>
        <DialogContent className={classes.dialogContent}>
          {/* action title */}
          <Grid container spacing={3}>
          <Grid item md={12}>
            <TextField
              className={classes.formControl}
              id="filled-basic"
              label="Action title"
              variant="outlined"
              autoComplete="off"
              required
              rows={1}
              // defaultValue={actionDetail.actionTitle}
              error={error.actionTitle}
              helperText={error ? error.actionTitle : ""}
              onChange={(e) =>
                setForm({ ...form, actionTitle: e.target.value })
              }
            />
          </Grid>

          {/* assigen */}
          <Grid item md={12}>
              <Autocomplete
                id="combo-box-demo"
                options={reportedByName}
                className={classes.mT30}
                
                getOptionLabel={(option) => option.name}
                onChange={(e,option) => 
                  setForm({
                    ...form,
                    assignTo: option.id,
                  })
                }
                renderInput={(params) => <TextField {...params}
                //  margin="dense"
                error={error.assignTo}
                required

              helperText={error.assignTo ? error.assignTo : ""}
                  label="Assignee"  variant="outlined" />}
            />
            {/* </FormControl> */}
          </Grid>

          {/* due date */}
          <Grid item md={12}>
            <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.formControl}
                label="Due date"
                format="dd/MM/yyyy"
                inputVariant="outlined"
                value={form.plannedEndDate}
                disablePast={true}
                onChange={(e) => {
                  setForm({
                    ...form,
                    plannedEndDate: moment(e).toISOString(),
                  });
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          {/* severity */}

          <Grid item md={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Severity</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="RCA recommended"
              >
                {severity.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                    onClick={(e) =>
                      setForm({ ...form, severity: selectValues })
                    }
                  >
                    {selectValues}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handelSubmit()} variant="outlined" size="medium" className={classes.custmSubmitBtn}>
            Create action
          </Button>
        </DialogActions>
      </Dialog></>) : <h1></h1>}
    </> 
  );
}
