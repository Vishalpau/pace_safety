import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import DateFormat from "../../../components/Date/DateFormat";
import { tabViewMode } from "../../../redux/actions/initialDetails";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";
import api from "../../../utils/axios";
import {
  ACCOUNT_API_URL,
  CLOSE_OUT_FORM,
  SUMMERY_FORM,
} from "../../../utils/constants";
import FormSideBar from "../FormSideBar";
import Loader from "../Loader";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
}));

const CloseOut = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isDateShow, setIsDateShow] = useState(false);
  const [isReviewDateShow, setIsReviewDateShow] = useState(false);
  const [closeByName, setCloseByName] = useState(0);
  const [reviewByName, setReviewByName] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const [form, setForm] = useState({
    reviewedBy: 0,
    reviewDate: null,
    closedBy: 0,
    closeDate: null,
  });

  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // fetch incident data
  const fetchIncidentsData = async () => {
    await api
      .get(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`)
      .then((res) => {
        if (res.status === 200) {
          const result = res.data.data.results;
          let temp = { ...form };
          temp = result;
          setForm(result);
          setIncidentsListdata(result);
          setIsLoading(true);
        }
      })
      .catch((err) => history.push("/app/pages/error"));
  };
  // handle close snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsDateShow(false);
    setOpen(false);
  };
  const handleCloseDate = (e) => {
    if (new Date(e) > new Date(form.reviewDate)) {
      setForm({ ...form, closeDate: moment(e).toISOString() });
      error.closeDate = "";
      setError(error);
    } else {
      setForm({ ...form, closeDate: null });
      const errorMessage = "Closed date cannot be prior to reviewed date";
      error.closeDate = errorMessage;
      setError(error);
    }
  };

  const handleReviewDate = (e) => {
    if (new Date(e) < new Date()) {
      setForm({ ...form, reviewDate: moment(e).toISOString() });
      error.reviewDate = "";
      setError(error);
    } else {
      setForm({ ...form, reviewDate: null });
      error.reviewDate = "Invalid date-time selected";
      setError(error);
    }
  };

  //   fetch user data

  const fetchUserList = async () => {
    api
      .get(
        `${ACCOUNT_API_URL}api/v1/companies/${
          JSON.parse(localStorage.getItem("company")).fkCompanyId
        }/company-users/`
      )
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results.users;
          setUserList(result);
        }
      })
      .catch((error) => {
        history.push("/app/pages/error");
      });
  };

  const handleNext = async () => {
    await setIsNext(false);
    const temp = incidentsListData;
    temp.reviewedByName = reviewByName || incidentsListData.reviewedByName;
    temp.reviewedBy = form.reviewedBy || incidentsListData.reviewedBy;
    temp.reviewDate = form.reviewDate || incidentsListData.reviewDate;
    temp.closedByName = closeByName || incidentsListData.closedByName;
    temp.closedBy = form.closedBy || incidentsListData.closedBy;
    temp.closeDate = form.closeDate || incidentsListData.closeDate;
    temp.updatedAt = new Date().toISOString();
    temp.updatedBy = parseInt(userId);
    temp.incidentStage = "Close out";
    if (form.closeDate) {
      temp.incidentStatus = "Done";
    } else {
      temp.incidentStatus = "pending";
    }

    try {
      await api
        .put(`api/v1/incidents/${localStorage.getItem("fkincidentId")}/`, temp)
        .then((res) => {
          if (res.status === 200) {
            const viewMode = {
              initialNotification: false,
              investigation: false,
              evidence: false,
              rootcauseanalysis: false,
              lessionlearn: false,
              closeout: true,
            };
            dispatch(tabViewMode(viewMode));
            history.push(`${SUMMERY_FORM.Summary}${id}/`);
          }
        })
        .catch((err) => history.push("/app/pages/error"));
    } catch (error) {
      history.push("/app/pages/error");
    }
  };

  useEffect(() => {
    fetchUserList();
    fetchIncidentsData();
  }, []);
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Close out" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item xs={12} md={9} justify="flex-start" spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>

              <Typography varint="body1" className={Type.labelValue}>
                {incidentsListData.incidentNumber
                  ? incidentsListData.incidentNumber
                  : "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident occured on
              </Typography>
              <Typography className={Type.labelValue}>
                {moment(incidentsListData.incidentOccuredOn).format(
                  "Do MMMM YYYY, h:mm:ss a"
                )}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident reported on
              </Typography>
              <Typography className={Type.labelValue}>
                {DateFormat(incidentsListData.incidentReportedOn, true)}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Reported by
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentReportedByName
                  ? incidentsListData.incidentReportedByName
                  : "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident type
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentType
                  ? incidentsListData.incidentType
                  : "-"}{" "}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident title
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentTitle
                  ? incidentsListData.incidentTitle
                  : "-"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident description
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentDetails
                  ? incidentsListData.incidentDetails
                  : "-"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident location
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentLocation
                  ? incidentsListData.incidentLocation
                  : "-"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Incident report form review
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Reviewed by
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Reviewed by"
                  defaultValue={form.reviewedBy || ""}
                  onChange={(e) =>
                    setForm({ ...form, reviewedBy: e.target.value })
                  }
                >
                  {userList.map((selectValues, index) => (
                    <MenuItem
                      value={selectValues.id}
                      key={index}
                      onClick={() => setReviewByName(selectValues.name)}
                    >
                      {selectValues.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={messageType}>
                {message}
              </Alert>
            </Snackbar>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  error={error.reviewDate}
                  helperText={error.reviewDate ? error.reviewDate : null}
                  className={classes.formControl}
                  id="date-picker-dialog"
                  format="dd-MMM-yyyy hh:mm:s a"
                  inputVariant="outlined"
                  label="Reviewed on"
                  value={form.reviewDate || null}
                  onChange={(e) => handleReviewDate(e)}
                  onClick={(e) => setIsReviewDateShow(true)}
                  open={isReviewDateShow}
                  onClose={(e) => setIsReviewDateShow(false)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  disableFuture
                  InputProps={{ readOnly: true }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Action item close out
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Closed by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Closed by"
                  defaultValue={form.closedBy || ""}
                  onChange={(e) =>
                    setForm({ ...form, closedBy: e.target.value })
                  }
                >
                  {userList.map((selectValues, index) => (
                    <MenuItem
                      value={selectValues.id}
                      key={index}
                      onClick={() => setCloseByName(selectValues.name)}
                    >
                      {selectValues.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  className={classes.formControl}
                  error={error.closeDate}
                  helperText={error.closeDate ? error.closeDate : null}
                  value={form.closeDate || null}
                  onChange={(e) => handleCloseDate(e)}
                  format="dd-MMM-yyyy hh:mm:s a"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  // format="yyyy/MM/dd HH:mm"
                  label="Closed on"
                  onClick={(e) => setIsDateShow(true)}
                  open={isDateShow}
                  onClose={(e) => setIsDateShow(false)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputProps={{ readOnly: true }}
                  disableFuture
                  minDate={new Date(form.reviewDate)}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNext()}
                disabled={!isNext}
              >
                Submit
                {isNext ? null : <CircularProgress size={20} />}
              </Button>
            </Grid>
          </Grid>
          {isDesktop && (
            <Grid item md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={CLOSE_OUT_FORM}
                selectedItem="Close out"
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <Loader />
      )}
    </PapperBlock>
  );
};

export default CloseOut;
