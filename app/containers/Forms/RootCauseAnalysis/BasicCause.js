import React, { useEffect, useState, useRef } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory, useParams } from "react-router";
import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import BasicCauseValidation from "../../Validator/RCAValidation/BasicCauseValidation";
import {
  PERSONAL,
  PERSONALWELNESSFACTORS,
  LEADERSHIP,
  PROCESSES,
} from "../../../utils/constants";
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const BasicCause = () => {
  const [commonForm, setCommonForm] = useState({
    rcaNumber: "string",
    rcaType: "string",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: parseInt(localStorage.getItem("fkincidentId")),
  });
  const [error, setError] = useState({});
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    personal: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    wellnessFactors: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    otherHumanFactor: { remarkType: "", rcaSubType: "", rcaRemark: "" },
    leadership: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    processes: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    otherJobFactors: { remarkType: "", rcaSubType: "", rcaRemark: "" },
  });
  const putId = useRef("");
  const [fetchApiData, setFetchApiData] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const updateIds = useRef();
  // get data and set to states
  const handelUpdateCheck = async () => {
    let allrcaSubType = [
      "personal",
      "wellnessFactors",
      "othershumanfactors",
      "leadership",
      "processes",
      "othersjobfactors",
    ];
    let tempApiData = {};
    let tempApiDataId = [];
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    if (!isNaN(lastItem)) {
      let previousData = await api.get(
        `/api/v1/incidents/${lastItem}/pacecauses/`
      );
      putId.current = lastItem;
      let allApiData = previousData.data.data.results;
      allApiData.map((value) => {
        if (allrcaSubType.includes(value.rcaSubType)) {
          let valueQuestion = value.rcaSubType;
          let valueAnser = value.rcaRemark;
          tempApiData[valueQuestion] = valueAnser;
          tempApiDataId.push(value.id);
        }
      });
      updateIds.current = tempApiDataId.reverse();
      console.log(tempApiData);
      await setFetchApiData(tempApiData);
      // set fetched spervised data
      form.personal.remarkType = "options";
      form.personal.rcaSubType = "personal";
      form.personal.rcaRemark = tempApiData.personal.includes(",")
        ? tempApiData.personal.split(",")
        : [tempApiData.personal];
      // set fetched spervised data
      form.wellnessFactors.remarkType = "options";
      form.wellnessFactors.rcaSubType = "wellnessFactors";
      form.wellnessFactors.rcaRemark = tempApiData.wellnessFactors.includes(",")
        ? tempApiData.wellnessFactors.split(",")
        : [tempApiData.wellnessFactors];
      // set fetched others data
      form.otherHumanFactor.remarkType = "remark";
      form.otherHumanFactor.rcaSubType = "othershumanfactors";
      form.otherHumanFactor.rcaRemark = tempApiData.othershumanfactors;
      // set fetched spervised data
      form.leadership.remarkType = "options";
      form.leadership.rcaSubType = "leadership";
      form.leadership.rcaRemark = tempApiData.leadership.includes(",")
        ? tempApiData.leadership.split(",")
        : [tempApiData.leadership];
      // set fetched spervised data
      form.processes.remarkType = "options";
      form.processes.rcaSubType = "processes";
      form.processes.rcaRemark = tempApiData.processes.includes(",")
        ? tempApiData.processes.split(",")
        : [tempApiData.processes];
      // set fetched others data
      form.otherJobFactors.remarkType = "remark";
      form.otherJobFactors.rcaSubType = "othersjobfactors";
      form.otherJobFactors.rcaRemark = tempApiData.othersjobfactors;
    }
  };
  const handelPersonal = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.personal.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        personal: {
          remarkType: "options",
          rcaSubType: "personal",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        personal: {
          remarkType: "options",
          rcaSubType: "personal",
          rcaRemark: [...form.personal.rcaRemark, value],
        },
      });
    }
  };
  const handelWellnessFactors = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.wellnessFactors.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        wellnessFactors: {
          remarkType: "options",
          rcaSubType: "wellnessFactors",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        wellnessFactors: {
          remarkType: "options",
          rcaSubType: "wellnessFactors",
          rcaRemark: [...form.wellnessFactors.rcaRemark, value],
        },
      });
    }
  };
  const handelOtherHumanFactors = (e) => {
    setForm({
      ...form,
      otherHumanFactor: {
        remarkType: "remark",
        rcaSubType: "othershumanfactors",
        rcaRemark: e.target.value,
      },
    });
  };
  const handelLeadership = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.leadership.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        leadership: {
          remarkType: "options",
          rcaSubType: "leadership",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        leadership: {
          remarkType: "options",
          rcaSubType: "leadership",
          rcaRemark: [...form.leadership.rcaRemark, value],
        },
      });
    }
  };
  const handelProcesses = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.processes.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        processes: {
          remarkType: "options",
          rcaSubType: "processes",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        processes: {
          remarkType: "options",
          rcaSubType: "processes",
          rcaRemark: [...form.processes.rcaRemark, value],
        },
      });
    }
  };
  const handelOtherJobFactors = (e) => {
    setForm({
      ...form,
      otherJobFactors: {
        remarkType: "remark",
        rcaSubType: "othersjobfactors",
        rcaRemark: e.target.value,
      },
    });
  };
  const selectValues = ["Option1", "Option2", "...."];
  const classes = useStyles();
  const handelNext = async (e) => {
    const { error, isValid } = BasicCauseValidation(form);
    await setError(error);
    let tempData = [];
    Object.entries(form).map(async (item, index) => {
      let api_data = item[1];
      // post request object
      if (putId.current == "") {
        let temp = {
          createdBy: "0",
          fkIncidentId: localStorage.getItem("fkincidentId"),
          rcaRemark: api_data["rcaRemark"].toString(),
          rcaSubType: api_data["rcaSubType"],
          rcaType: "Basic",
          remarkType: api_data["remarkType"],
          status: "Active",
        };
        tempData.push(temp);
        // put request object
      } else {
        let temp = {
          createdBy: "0",
          fkIncidentId: localStorage.getItem("fkincidentId"),
          rcaRemark: api_data["rcaRemark"].toString(),
          rcaSubType: api_data["rcaSubType"],
          rcaType: "Basic",
          remarkType: api_data["remarkType"],
          status: "Active",
          pk: updateIds.current[index],
        };
        tempData.push(temp);
      }
    });
    // api call //
    let callObjects = tempData;
    for (let key in callObjects) {
      if (Object.keys(error).length == 0) {
        if (putId.current !== "") {
          const res = await api.put(
            `/api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/pacecauses/${callObjects[key].pk}/`,
            callObjects[key]
          );
          if (res.status == 200) {
            console.log("request done");
            console.log(res);
          }
        } else {
          const res = await api.post(
            `/api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/pacecauses/`,
            callObjects[key]
          );
          if (res.status == 201) {
            console.log("request done");
            console.log(res);
          }
        }
      }
    }
    // api call //
  };
  useEffect(() => {
    handelUpdateCheck();
  }, []);
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Basic Cause
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item md={4}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Incident number: {localStorage.getItem("fkincidentId")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      RCA Method: PACE Cause Analysis
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={12}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Human Factors
                    </Typography>
                  </Box>
                </Grid>
                {/* perosonal */}
                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" error={error.personal}>
                      Personal
                    </FormLabel>
                    <FormGroup>
                      {PERSONAL.map((value) => (
                        <FormControlLabel
                          control={<Checkbox name={value} />}
                          label={<small>{value}</small>}
                          checked={form.personal.rcaRemark.includes(value)}
                          onChange={async (e) => handelPersonal(e, value)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  {error && error.personal && (
                    <p>
                      <small style={{ color: "red" }}>{error.personal}</small>
                    </p>
                  )}
                </Grid>
                {/* wellness factors */}
                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" error={error.wellnessFactors}>
                      Wellness factors
                    </FormLabel>
                    <FormGroup>
                      {PERSONALWELNESSFACTORS.map((value) => (
                        <FormControlLabel
                          control={<Checkbox name={value} />}
                          label={<small>{value}</small>}
                          checked={form.wellnessFactors.rcaRemark.includes(
                            value
                          )}
                          onChange={async (e) =>
                            handelWellnessFactors(e, value)
                          }
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  {error && error.wellnessFactors && (
                    <p>
                      <small style={{ color: "red" }}>
                        {error.wellnessFactors}
                      </small>
                    </p>
                  )}
                </Grid>
                {/* other human factors */}
                <Grid item md={12}>
                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    multiline
                    rows={4}
                    label="Other Human Factors"
                    error={error.otherHumanFactor}
                    defaultValue={form.otherHumanFactor.rcaRemark}
                    helperText={error ? error.otherHumanFactor : ""}
                    className={classes.formControl}
                    onChange={async (e) => handelOtherHumanFactors(e)}
                  />
                  {/* {error && error.otherHumanFactor && (
                    <p>{error.otherHumanFactor}</p>
                  )} */}
                </Grid>
                <Grid item md={12}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Job Factors
                    </Typography>
                  </Box>
                </Grid>
                {/* leadership */}
                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" error={error.leadership}>
                      Leadership
                    </FormLabel>
                    <FormGroup>
                      {LEADERSHIP.map((value) => (
                        <FormControlLabel
                          control={<Checkbox name={value} />}
                          label={<small>{value}</small>}
                          checked={form.leadership.rcaRemark.includes(value)}
                          onChange={async (e) => handelLeadership(e, value)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  {error && error.leadership && (
                    <p>
                      <small style={{ color: "red" }}>{error.leadership}</small>
                    </p>
                  )}
                </Grid>
                {/* processes */}
                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" error={error.processes}>
                      Processes
                    </FormLabel>
                    <FormGroup>
                      {PROCESSES.map((value) => (
                        <FormControlLabel
                          control={<Checkbox name={value} />}
                          label={<small>{value}</small>}
                          checked={form.processes.rcaRemark.includes(value)}
                          onChange={async (e) => handelProcesses(e, value)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  {error && error.processes && (
                    <p>
                      <small style={{ color: "red" }}>{error.processes}</small>
                    </p>
                  )}
                </Grid>
                {/* other job factors */}
                <Grid item md={12}>
                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    multiline
                    error={error.otherJobFactors}
                    defaultValue={form.otherJobFactors.rcaRemark}
                    helperText={error ? error.otherJobFactors : ""}
                    rows={3}
                    label="Other job factors"
                    className={classes.formControl}
                    onChange={async (e) => handelOtherJobFactors(e)}
                  />
                  {/* {error && error.otherJobFactors && (
                    <p>{error.otherJobFactors}</p>
                  )} */}
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/cause-and-action/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // href={Object.keys(error).length > 0 ? '#' : "/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/"}
                    onClick={(e) => handelNext(e)}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  deleteForm={[1, 2, 3]}
                  listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                  selectedItem={"Basic cause"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};
export default BasicCause;
