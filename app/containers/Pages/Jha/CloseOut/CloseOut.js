import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import { PapperBlock } from "dan-components";
import moment from "moment";
import { useHistory, useParams } from "react-router";
import "../../../../styles/custom.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormHelperText from "@material-ui/core/FormHelperText";
import api from "../../../../utils/axios";
import { access_token, ACCOUNT_API_URL } from "../../../../utils/constants";
import JhaCommonInfo from "../JhaCommonInfo";
import { handelJhaId } from "../Utils/checkValue";
import { SUMMARY_FORM } from "../Utils/constants";
import CloseOutValidator from "../Validation/CloseOutValidation";

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
  loader: {
    marginLeft: "20px",
  },
  custmSubmitBtn: {
    color: "#ffffff",
    backgroundColor: "#06425c",
    lineHeight: "30px",
    border: "none",
    "&:hover": {
      backgroundColor: "#ff8533",
      border: "none",
    },
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
}));

const CloseOut = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  // const dispatch = useDispatch();
  const [jhaListData, setJhaListdata] = useState({});
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    reviewedBy: 0,
    reviewDate: null,
    closedBy: 0,
    closeDate: new Date(),
  });
  const [isDateShow, setIsDateShow] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);

  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;

  // fetch incident data
  const fetchJhaData = async () => {
    const jhaId = handelJhaId();
    const res = await api.get(`/api/v1/jhas/${jhaId}/`);
    const result = res.data.data.results;
    if (result.closedDate == null) {
      result["closedDate"] = new Date();
    }
    await setJhaListdata(result);
    await setIsLoading(true);
  };
  // handle close snackbar

  //   fetch user data

  const fetchUserList = async () => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    var config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${companyId}/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    axios(config)
      .then(function(response) {
        if (response.status === 200) {
          const result = response.data.data.results.users;
          setUserList(result);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handelClose = () => {
    setIsDateShow(false);
    return true;
  };

  const handleNext = async () => {
    const { error, isValid } = CloseOutValidator(jhaListData);
    await setError(error);
    if (!isValid) {
      return "data not valid";
    }
    await setSubmitLoader(true);
    delete jhaListData["jhaAssessmentAttachment"];
    jhaListData["jhaStage"] = "Close out";
    jhaListData["jhaStatus"] = "Close";
    const res = await api.put(
      `/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `,
      jhaListData
    );
    if (res.status == 200) {
      history.push(SUMMARY_FORM["Summary"]);
    }
    await setSubmitLoader(false);
  };

  const handelCallBack = async () => {
    await fetchUserList();
    await fetchJhaData();
  };

  useEffect(() => {
    handelCallBack();
  }, []);
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Close out" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item xs={12} md={9} justify="flex-start" spacing={3}>
            <Grid item xs={12}>
              <JhaCommonInfo />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Action item close out
              </Typography>
            </Grid>

            <Grid item md={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  className={classes.formControl}
                  format="dd-MMM-yyyy hh:mm:s a"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  label="Work completion"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  disabled={true}
                  disableFuture
                  InputProps={{ readOnly: true }}
                  open={isDateShow}
                  onClose={(e) => handelClose()}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                error={error.closedByName ? error.closedByName : ""}
              >
                <InputLabel id="demo-simple-select-label">
                  Closed by*
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Closed by"
                  value={
                    jhaListData.closedByName ? jhaListData.closedByName : ""
                  }
                >
                  {userList.map((selectValues, index) => (
                    <MenuItem
                      value={selectValues.name}
                      key={index}
                      onClick={(e) =>
                        setJhaListdata({
                          ...jhaListData,
                          closedByName: selectValues.name,
                          closedById: selectValues.id,
                        })
                      }
                    >
                      {selectValues.name}
                    </MenuItem>
                  ))}
                </Select>
                {error.closedByName ? (
                  <FormHelperText>{error.closedByName}</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  className={classes.formControl}
                  onClick={(e) => setIsDateShow(true)}
                  error={error.closeDate}
                  helperText={error.closeDate ? error.closeDate : null}
                  value={jhaListData.closedDate ? jhaListData.closedDate : null}
                  format="yyyy/MM/dd HH:mm"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  format="yyyy/MM/dd HH:mm"
                  inputVariant="outlined"
                  label="Closed on"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  onChange={(e) => {
                    setJhaListdata({
                      ...jhaListData,
                      closedDate: moment(e).format("YYYY-MM-DD hh:mm:ss"),
                    });
                  }}
                  disableFuture
                  InputProps={{ readOnly: true }}
                  open={isDateShow}
                  onClose={(e) => handelClose()}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.loadingWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
                  disabled={submitLoader}
                >
                  Submit
                </Button>
                {submitLoader && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>Loading...</>
      )}
    </PapperBlock>
  );
};

export default CloseOut;
