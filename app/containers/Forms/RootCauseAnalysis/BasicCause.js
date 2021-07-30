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
import { PapperBlock } from "dan-components";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import BasicCauseValidation from "../../Validator/RCAValidation/BasicCauseValidation";
import {
  BASIC_CAUSE_SUB_TYPES,
  PERSONAL,
  PERSONALWELNESSFACTORS,
  LEADERSHIP,
  PROCESSES,
} from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const BasicCause = () => {

  const [form, setForm] = useState({
    personal: { remarkType: "options", rcaSubType: "personal", rcaRemark: [] },
    wellnessFactors: { remarkType: "options", rcaSubType: "wellnessFactors", rcaRemark: [] },
    otherHumanFactor: { remarkType: "remark", rcaSubType: "othersHumanFactors", rcaRemark: "" },
    leadership: { remarkType: "options", rcaSubType: "leadership", rcaRemark: [] },
    processes: { remarkType: "options", rcaSubType: "processes", rcaRemark: [] },
    otherJobFactors: { remarkType: "remark", rcaSubType: "othersJobFactors", rcaRemark: "" },
  });
  const putId = useRef("");
  const [fetchApiData, setFetchApiData] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const updateIds = useRef();
  const [error, setError] = useState({});
  const [incidentDetail, setIncidentDetail] = useState({});
  const checkPost = useRef()

  const setRemark = (value) => {
    let remark = value.includes(",") ? value.split(",") : [value]
    if (remark.includes("No option selected") && remark.length > 0) {
      let removeItemIndex = remark.indexOf("No option selected")
      remark.splice(removeItemIndex, 1)
    }
    return remark
  }
  // get data and set to states

  const handelUpdateCheck = async () => {
    let tempApiData = {};
    let tempApiDataId = [];
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    let previousData = await api.get(`/api/v1/incidents/${incidentId}/pacecauses/`);
    let allApiData = previousData.data.data.results;

    if (allApiData.length > 14) {
      putId.current = incidentId;
      allApiData.map((value) => {
        if (BASIC_CAUSE_SUB_TYPES.includes(value.rcaSubType)) {
          let valueQuestion = value.rcaSubType;
          let valueAnser = value.rcaRemark;
          tempApiData[valueQuestion] = valueAnser;
          tempApiDataId.push(value.id);
        }
      });
      updateIds.current = tempApiDataId.reverse();
      await setFetchApiData(tempApiData);
      checkPost.current = false

      // set fetched spervised data
      setForm({
        ...form,
        personal: {
          remarkType: "options",
          rcaSubType: "personal",
          rcaRemark: setRemark(tempApiData.personal),
        },
        wellnessFactors: {
          remarkType: "options",
          rcaSubType: "wellnessFactors",
          rcaRemark: setRemark(tempApiData.wellnessFactors),
        },
        otherHumanFactor: {
          remarkType: "remark",
          rcaSubType: "othersHumanFactors",
          rcaRemark: tempApiData.othersHumanFactors,
        },
        leadership: {
          remarkType: "options",
          rcaSubType: "leadership",
          rcaRemark: setRemark(tempApiData.leadership),
        },
        processes: {
          remarkType: "options",
          rcaSubType: "processes",
          rcaRemark: setRemark(tempApiData.processes),
        },
        otherJobFactors: {
          remarkType: "remark",
          rcaSubType: "othersJobFactors",
          rcaRemark: tempApiData.othersJobFactors,
        },
      });
    }
  };

  const handelPrevious = () => {
    if (!isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/cause-and-action/${putId.current
        }`
      );
    } else if (isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/cause-and-action/`
      );
    }

  }

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
        rcaSubType: "othersHumanFactors",
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
        rcaSubType: "othersJobFactors",
        rcaRemark: e.target.value,
      },
    });
  };
  const selectValues = ["Option1", "Option2", "...."];
  const classes = useStyles();

  const handelNext = async (e) => {
    let tempData = [];
    Object.entries(form).map(async (item, index) => {
      let api_data = item[1];
      // post request object
      if (checkPost.current !== false) {
        let temp = {
          createdBy: "0",
          fkIncidentId: localStorage.getItem("fkincidentId"),
          rcaRemark: api_data["rcaRemark"].toString() !== "" ? api_data["rcaRemark"].toString() : "No option selected",
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
          fkIncidentId: putId.current || localStorage.getItem("fkincidentId"),
          rcaRemark: api_data["rcaRemark"].toString() !== "" ? api_data["rcaRemark"].toString() : "No option selected",
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
    let nextPageLink = 0;
    let callObjects = tempData;
    for (let key in callObjects) {
      if (Object.keys(error).length == 0) {
        if (checkPost.current == false) {
          const res = await api.put(
            `/api/v1/incidents/${putId.current}/pacecauses/${callObjects[key].pk}/`,
            callObjects[key]
          );
          if (res.status == 200) {
            nextPageLink = res.status;
          }
        } else {
          const res = await api.post(
            `/api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/pacecauses/`,
            callObjects[key]
          );
          if (res.status == 201) {
            nextPageLink = res.status;
          }
        }
      }
    }
    if (nextPageLink == 201 && Object.keys(error).length === 0) {
      history.push(
        "/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/"
      );
    } else if (nextPageLink == 200 && Object.keys(error).length === 0) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/${putId.current
        }`
      );
    }
    // api call //

  };

  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  useEffect(() => {
    fetchIncidentDetails();
    handelUpdateCheck();
  }, []);
  return (
    <PapperBlock title="Basic Cause" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident number
            </Typography>

            <Typography className={Type.labelValue} gutterBottom>
              {incidentDetail.incidentNumber}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              RCA method
            </Typography>
            <Typography className={Type.labelValue} gutterBottom>
              PACE cause analysis
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6" gutterBottom>
                Human factors
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12}>
            <FormControl component="fieldset" error={error.personal}>
              <FormLabel component="legend">Personal</FormLabel>
              <FormGroup>
                {PERSONAL.map((value) => (
                  <FormControlLabel
                    control={<Checkbox name={value} />}
                    label={value}
                    checked={form.personal.rcaRemark.includes(value)}
                    onChange={async (e) => handelPersonal(e, value)}
                  />
                ))}
              </FormGroup>
              {error && error.personal && (
                <FormHelperText>{error.personal}</FormHelperText>
              )}
            </FormControl>
            <Box borderTop={1} marginTop={2} borderColor="grey.300" />
          </Grid>
          {/* wellness factors */}
          <Grid item md={12}>
            <FormControl
              component="fieldset"
              error={error.wellnessFactors}
            >
              <FormLabel component="legend">Wellness factors</FormLabel>
              <FormGroup>
                {PERSONALWELNESSFACTORS.map((value) => (
                  <FormControlLabel
                    control={<Checkbox name={value} />}
                    label={value}
                    checked={form.wellnessFactors.rcaRemark.includes(value)}
                    onChange={async (e) => handelWellnessFactors(e, value)}
                  />
                ))}
              </FormGroup>
              {error && error.wellnessFactors && (
                <FormHelperText>{error.wellnessFactors}</FormHelperText>
              )}
            </FormControl>
            <Box borderTop={1} marginTop={2} borderColor="grey.300" />
          </Grid>
          {/* other human factors */}
          <Grid item md={12}>
            <TextField
              id="filled-basic"
              variant="outlined"
              multiline
              rows={4}
              label="Other human factors"
              error={error.otherHumanFactor}
              value={form.otherHumanFactor.rcaRemark !== "No option selected" ? form.otherHumanFactor.rcaRemark : ""}
              helperText={error ? error.otherHumanFactor : ""}
              className={classes.formControl}
              onChange={async (e) => handelOtherHumanFactors(e)}
            />
          </Grid>

          <Grid item md={12}>
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6" gutterBottom>
                Job factors
              </Typography>
            </Box>
          </Grid>

          <Grid item md={12}>
            <FormControl component="fieldset" error={error.leadership}>
              <FormLabel component="legend">Leadership</FormLabel>
              <FormGroup>
                {LEADERSHIP.map((value) => (
                  <FormControlLabel
                    control={<Checkbox name={value} />}
                    label={value}
                    checked={form.leadership.rcaRemark.includes(value)}
                    onChange={async (e) => handelLeadership(e, value)}
                  />
                ))}
              </FormGroup>
              {error && error.leadership && (
                <FormHelperText>{error.leadership}</FormHelperText>
              )}
            </FormControl>
            <Box borderTop={1} marginTop={2} borderColor="grey.300" />
          </Grid>
          {/* processes */}
          <Grid item md={12}>
            <FormControl component="fieldset" error={error.processes}>
              <FormLabel component="legend">Processes</FormLabel>
              <FormGroup>
                {PROCESSES.map((value) => (
                  <FormControlLabel
                    control={<Checkbox name={value} />}
                    label={value}
                    checked={form.processes.rcaRemark.includes(value)}
                    onChange={async (e) => handelProcesses(e, value)}
                  />
                ))}
              </FormGroup>
              {error && error.processes && (
                <FormHelperText>{error.processes}</FormHelperText>
              )}
            </FormControl>
            <Box borderTop={1} marginTop={2} borderColor="grey.300" />
          </Grid>
          {/* other job factors */}
          <Grid item md={12}>
            <TextField
              id="filled-basic"
              variant="outlined"
              multiline
              error={error.otherJobFactors}
              value={form.otherJobFactors.rcaRemark !== "No option selected" ? form.otherJobFactors.rcaRemark : ""}
              helperText={error ? error.otherJobFactors : ""}
              rows={3}
              label="Other job factors"
              className={classes.formControl}
              onChange={async (e) => handelOtherJobFactors(e)}
            />
          </Grid>
          <Grid item md={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handelPrevious(e)}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handelNext(e)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem={"Basic cause"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};
export default BasicCause;
