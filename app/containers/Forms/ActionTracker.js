import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Button, Grid } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import moment from "moment";

import apiAction from "../../utils/axiosActionTracker";
import { handelCommonObject, fetchReportedBy, fetchDepartmentName } from "../../utils/CheckerValue";
import { checkACL } from "../../utils/helper";

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
  button: {
    marginRight: "20px",
  },
  buttonProgress: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-flex",
  },
  disabledButton: {
    "& .MuiButton-contained.Mui-disabled": {
      background: '#616161'
    }
  }

}));

export default function ActionTracker(props) {
  const userName = JSON.parse(localStorage.getItem('userDetails')).name
  const userId = JSON.parse(localStorage.getItem('userDetails')).id
  const [form, setForm] = useState({
    fkCompanyId: props.fkCompanyId,
    fkProjectId: props.fkProjectId,
    fkProjectStructureIds: props.fkProjectStructureIds,
    parentId: 0,
    actionContext: props.actionContext,
    enitityReferenceId: props.enitityReferenceId,
    actionTitle: "",
    actionDetail: "",
    actionCategory: "",
    actionShedule: "Planned",
    priority: "",
    severity: "",
    approver: props.createdBy,
    approverName: JSON.parse(localStorage.getItem('userDetails'))["name"],
    assignTo: userId,
    assignToName: "",
    deligateTo: 0,
    plannedStartDate: new Date(),
    department: "",
    actualStartDate: null,
    plannedEndDate: null,
    actualEndDate: null,
    forecaststartDate: null,
    forecastEndDate: null,
    location: null,
    latitude: 0,
    longitude: 0,
    supervisorId: 0,
    contractor: 0,
    contractorName: null,
    contractorCompany: null,
    actionStatus: null,
    actionStage: null,
    status: "Active",
    createdBy: props.createdBy,
    reviewedBy: 0,
    reviewDate: null,
    closedBy: 0,
    closeDate: null,
    source: "Web",
    vendor: null,
    vendorReferenceId: null,
  });

  const [reportedByName, setReportedByName] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [isDateShow, setIsDateShow] = useState(false)
  const [assigneeValue, setAssigneeValue] = useState("")
  const [allDepartment, setallDepartment] = useState([])

  const handelUpdate = async () => {
    if (props.actionID !== undefined && props.actionID !== undefined) {
      const res = await apiAction.get(`/api/v1/actions/${props.actionID}/`)
    }
  }

  const handelClose = () => {
    setIsDateShow(false)
    return true
  }

  const [open, setOpen] = useState(false);
  const [error, setError] = useState({ actionTitle: "" });

  const fetchReported = async () => {
    try {
      let commentObjectAction = JSON.parse(localStorage.getItem("commonObject"))["action"]["actionUser"]
      setReportedByName(commentObjectAction)
    }
    catch {
      let allUsers = await fetchReportedBy()
      handelCommonObject("commonObject", "action", "actionUser", allUsers)
      setReportedByName(allUsers)
    }
  };

  const fetchDepartment = async () => {
    try {
      let commentObjectAction = JSON.parse(localStorage.getItem("commonObject"))["ActionDept"]["department"]
      setallDepartment(commentObjectAction)
    }
    catch {
      let allDepartment = await fetchDepartmentName()
      handelCommonObject("commonObject", "ActionDept", "department", allDepartment)
      setallDepartment(allDepartment)
    }
  };



  const select = async () => {
    await apiAction.get(`api/v1/core/companies/select/${props.fkCompanyId}/`)
  }

  const handleClickOpen = async () => {
    await setOpen(true);
  };

  const handelCloseAndSubmit = () => {
    setForm(
      {
        ...form,
        plannedEndDate: null,
        actionTitle: "",
        severity: "",
        department: "",
        assignToName: ""
      }
    );
  }

  const handleClose = async () => {
    await setError({ actionTitle: "" });
    await handelCloseAndSubmit()
    await setOpen(false);
    await props.setUpdatePage(!props.updatePage)
  };

  const handelSubmit = async () => {
    if (form.actionTitle == "") {
      setError({ actionTitle: "Please enter action title" });
    } else {
      setLoading(true)
      await select()
      if (form["severity"] === "") {
        form["severity"] = "Normal"
      }
      form["assignToName"] === "" ? form["assignToName"] = userName : form["assignToName"] = form["assignToName"]
      if (form["plannedEndDate"] === null) {
        form.plannedEndDate = new Date()
      }
      let res = await apiAction.post("api/v1/actions/", form).then().catch(() => setLoading(false));
      if (res.status == 200) {
        await setError({ actionTitle: "" });
        await handelCloseAndSubmit()
        await setOpen(false);
        await props.setUpdatePage(!props.updatePage)
        await props.handelShowData()
      }
      setLoading(false)
    }
  };

  const handelAssigne = () => {
    let assigneName;
    if (form["department"] == "") {
      assigneName = reportedByName
    } else {
      let deptAssigneName = []
      reportedByName.map((value) => {
        if (value["department"].length > 0) {
          value["department"].map((valueDept) => {
            if (form["department"] === valueDept["departmentName"]) {
              deptAssigneName.push(value)
            }
          })
        }
      })
      assigneName = deptAssigneName
    }
    return assigneName
  }

  const handelDeparment = (value = "") => {
    setForm({
      ...form,
      department: value,
      assignTo: userId,
      assignToName: "",
    })
    if (form["department"] == "") {
      setAssigneeValue(userName)
    } else {
      console.log("here1")
      let firstAssigneeName = handelAssigne()
      setAssigneeValue("");
    }
  }

  let severity = ["Normal", "Critical", "Blocker"];
  const classes = useStyles();

  const handelCallBack = async () => {
    await handelUpdate()
    await fetchDepartment()
    await fetchReported()
  }

  useEffect(() => {
    handelCallBack()
  }, [])

  return (
    <>
      {props.isCorrectiveActionTaken === null ?
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          disabled={props.isCorrectiveActionTaken === null ? true : false}
        // style={{
        //   background: props.isCorrectiveActionTaken ? '#616161!important' : '#c0c0c0',
        //   cursor: props.isCorrectiveActionTaken ? 'pointer' : 'not-allowed'
        // }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 75 50">
            <g id="Group_336" data-name="Group 336" transform="translate(-338 -858)">
              <g id="baseline-flash_auto-24px" transform="translate(364 871)">
                <path id="Path_1634" data-name="Path 1634" d="M0,0H24V24H0Z" fill="none" />
                <path id="Path_1635" data-name="Path 1635" d="M3,2V14H6v9l7-12H9l4-9ZM19,2H17l-3.2,9h1.9l.7-2h3.2l.7,2h1.9ZM16.85,7.65,18,4l1.15,3.65Z" fill="#ffffff" />
              </g>
            </g>
          </svg>
        </Button>
        :
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          disabled={!checkACL('action_tracker-actions', 'add_actions')}
          style={{
            background: checkACL('action_tracker-actions', 'add_actions') ? '#616161!important' : '#c0c0c0',
            cursor: checkACL('action_tracker-actions', 'add_actions') ? 'pointer' : 'not-allowed'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 75 50">
            <g id="Group_336" data-name="Group 336" transform="translate(-338 -858)">
              <g id="baseline-flash_auto-24px" transform="translate(364 871)">
                <path id="Path_1634" data-name="Path 1634" d="M0,0H24V24H0Z" fill="none" />
                <path id="Path_1635" data-name="Path 1635" d="M3,2V14H6v9l7-12H9l4-9ZM19,2H17l-3.2,9h1.9l.7-2h3.2l.7,2h1.9ZM16.85,7.65,18,4l1.15,3.65Z" fill="#ffffff" />
              </g>
            </g>
          </svg>
        </Button>
      }
      {/* {console.log(form)} */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle id="form-dialog-title">Action tracker</DialogTitle>
        <IconButton
          className={classes.dialogCloseButton}
          onClick={(e) => {
            handleClose();
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.formControl}
                id="filled-basic"
                label="Action title"
                variant="outlined"
                required
                error={error.actionTitle}
                helperText={error ? error.actionTitle : null}
                onChange={(e) =>
                  setForm({ ...form, actionTitle: e.target.value, actionDetail: e.target.value })
                }
              />
            </Grid>

            {/* department */}
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                requirement
                className="formControl"
              >
                <InputLabel id="Department">
                  Department
                </InputLabel>
                <Select
                  labelId="Department"
                  id="Department"
                  label="Department"
                  defaultValue=""
                >
                  {allDepartment.map((value) => (
                    <MenuItem
                      value={value}
                      onClick={(e) => handelDeparment(value)}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* assigen */}
            <Grid item xs={12}>
              {reportedByName !== undefined && reportedByName[0] !== "No users found" ?
                <Autocomplete
                  id="combo-box-demo"
                  options={handelAssigne()}
                  className={classes.mT30}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, option) =>
                    setForm({
                      ...form,
                      assignTo: option.id,
                      assignToName: option.name
                    })
                  }
                  renderInput={(params) => <TextField {...params}
                    label="Assignee" variant="outlined" />}
                  value={form.department == "" && form.assignToName == "" ? reportedByName.find(value => value.name == userName) : reportedByName.find(value => value.name == form.assignToName)}
                  error={error.assignTo}
                />
                :
                <TextField
                  className={classes.formControl}
                  id="filled-basic"
                  variant="outlined"
                  label="Assignee"
                  disabled={true}
                />
              }
            </Grid>

            {/* due date */}
            <Grid item xs={12}>
              <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.formControl}
                  label="Due date"
                  format="dd/MM/yyyy"
                  inputVariant="outlined"
                  value={form.plannedEndDate}
                  disablePast={true}
                  open={isDateShow}
                  onClose={(e) => handelClose()}
                  onClick={(e) => setIsDateShow(true)}
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
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="project-name-label">Severity</InputLabel>
                <Select
                  id="project-name"
                  labelId="project-name-label"
                  label="severity"
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
          {reportedByName !== undefined && reportedByName[0] !== "No users found" ?
            <>
              <div className={classes.loadingWrapper}>
                <Button
                  variant="contained"
                  onClick={(e) => handelSubmit()}
                  className={classes.button}
                  disabled={isLoading}
                >
                  Create action
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </>
            :
            <div style={{ marginRight: "29px", color: "red" }}>
              Please add user to add action
            </div>
          }
        </DialogActions>
      </Dialog>
    </>
  );
}



