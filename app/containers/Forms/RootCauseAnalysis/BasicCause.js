import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Col, Row } from "react-grid-system";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import BasicCauseValidation from "../../Validator/RCAValidation/BasicCauseValidation";
import {
  BASIC_CAUSE_SUB_TYPES,
  PERSONAL,
  PERSONALWELNESSFACTORS,
  LEADERSHIP,
  PROCESSES,
} from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import { handelApiValue } from "../../../utils/CheckerValue"


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
    wellnessFactors: {
      remarkType: "options",
      rcaSubType: "wellnessFactors",
      rcaRemark: [],
    },
    otherHumanFactor: {
      remarkType: "remark",
      rcaSubType: "othersHumanFactors",
      rcaRemark: [],
    },
    leadership: {
      remarkType: "options",
      rcaSubType: "leadership",
      rcaRemark: [],
    },
    processes: {
      remarkType: "options",
      rcaSubType: "processes",
      rcaRemark: [],
    },
    otherJobFactors: {
      remarkType: "remark",
      rcaSubType: "othersJobFactors",
      rcaRemark: [],
    },
  });
  const putId = useRef("");
  const [fetchApiData, setFetchApiData] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const updateIds = useRef();
  const [error, setError] = useState({});
  const [incidentDetail, setIncidentDetail] = useState({});
  const checkPost = useRef();
  const [paceCauseDelete, setPaceCauseDelete] = useState();
  const [nextButton, setNextButton] = useState(false);

  const setRemark = (value) => {
    let remark = value.includes(",") ? value.split(",") : [value];
    if (remark.includes("No option selected") && remark.length > 0) {
      let removeItemIndex = remark.indexOf("No option selected");
      remark.splice(removeItemIndex, 1);
    }
    return remark;
  };
  // get data and set to states

  const handelUpdateCheck = async () => {
    let tempData = {}
    let paceCauseid = []
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    putId.current = incidentId
    let previousData = await api.get(`/api/v1/incidents/${incidentId}/pacecauses/`);
    let allApiData = previousData.data.data.results
    if (allApiData.length > 0) {
      allApiData.map((value) => {
        if (BASIC_CAUSE_SUB_TYPES.includes(value.rcaSubType)) {
          if (Object.keys(tempData).includes(value.rcaSubType)) {
            tempData[value.rcaSubType].push(value.rcaRemark)
          } else {
            tempData[value.rcaSubType] = [value.rcaRemark]
          }
          paceCauseid.push(value.id)
        }
      })
      setForm({
        ...form,
        personal: {
          remarkType: "options",
          rcaSubType: "personal",
          rcaRemark: handelApiValue(tempData["personal"]),
        },
        wellnessFactors: {
          remarkType: "options",
          rcaSubType: "wellnessFactors",
          rcaRemark: handelApiValue(tempData["wellnessFactors"]),
        },
        otherHumanFactor: {
          remarkType: "remark",
          rcaSubType: "othersHumanFactors",
          rcaRemark: handelApiValue(tempData["othersHumanFactors"]),
        },
        leadership: {
          remarkType: "options",
          rcaSubType: "leadership",
          rcaRemark: handelApiValue(tempData["leadership"]),
        },
        processes: {
          remarkType: "options",
          rcaSubType: "processes",
          rcaRemark: handelApiValue(tempData["processes"]),
        },
        otherJobFactors: {
          remarkType: "remark",
          rcaSubType: "othersJobFactors",
          rcaRemark: handelApiValue(tempData["othersJobFactors"]),
        },
      });
      setPaceCauseDelete(paceCauseid)
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
        rcaRemark: [e.target.value],
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
        rcaRemark: [e.target.value],
      },
    });
  };

  const handelDelete = async () => {
    if (paceCauseDelete !== undefined && paceCauseDelete.length > 0) {
      for (let key in paceCauseDelete) {
        let delPaceCause = await api.delete(`api/v1/incidents/${putId.current}/pacecauses/${paceCauseDelete[key]}/`)
        if (delPaceCause.status == 200) {
          console.log("deleted")
        }
      }
    }
  }


  const handelNavigate = (navigateType) => {
    if (navigateType == "next") {
      history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Management control"]}${putId.current}`)
    } else if (navigateType == "previous") {
      history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Corrective actions"]}${putId.current}`)
    }
  }

  const handelApiCall = async () => {
    console.log(form)
    let tempData = []
    Object.entries(form).map(async (item, index) => {
      let api_data = item[1];
      api_data.rcaRemark.map((value) => {
        if (value !== "") {
          let temp = {
            createdBy: "0",
            fkIncidentId: putId.current,
            rcaRemark: value,
            rcaSubType: api_data["rcaSubType"],
            rcaType: "Basic",
            remarkType: api_data["remarkType"],
            status: "Active",
          };
          tempData.push(temp);
        }
      })
    })
    const res = await api.post(`api/v1/incidents/${putId.current}/bulkpacecauses/`, tempData);
    if (res.status == 200) {
      handelNavigate("next")
    }
  }

  const handelNext = async () => {
    await setNextButton(true)
    await handelDelete()
    await handelApiCall()
    await setNextButton(false)
  }

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

  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Basic Cause" icon="ion-md-list-box">
      <Row>
        <Col md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>

              <Typography className={Type.labelValue} gutterBottom>
                {incidentDetail.incidentNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                RCA method
              </Typography>
              <Typography className={Type.labelValue} gutterBottom>
                PACE cause analysis
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                <Typography variant="h6" gutterBottom>
                  Human factors
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <FormControl component="fieldset" error={error.wellnessFactors}>
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
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                variant="outlined"
                multiline
                rows={4}
                label="Other human factors"
                error={error.otherHumanFactor}
                value={
                  form.otherHumanFactor.rcaRemark !== "No option selected"
                    ? form.otherHumanFactor.rcaRemark
                    : ""
                }
                helperText={error ? error.otherHumanFactor : ""}
                className={classes.formControl}
                onChange={async (e) => handelOtherHumanFactors(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                <Typography variant="h6" gutterBottom>
                  Job factors
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                variant="outlined"
                multiline
                error={error.otherJobFactors}
                value={
                  form.otherJobFactors.rcaRemark !== "No option selected"
                    ? form.otherJobFactors.rcaRemark
                    : ""
                }
                helperText={error ? error.otherJobFactors : ""}
                rows={3}
                label="Other job factors"
                className={classes.formControl}
                onChange={async (e) => handelOtherJobFactors(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => handelNavigate("previous")}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={nextButton == true}
                className={classes.button}
                onClick={(e) => handelNext(e)}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Col>
        {isDesktop && (
          <Col md={3}>
            <FormSideBar
              listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
              selectedItem={"Basic cause"}
            />
          </Col>
        )}
      </Row>
    </PapperBlock>
  );
};
export default BasicCause;
