import { Button, FormHelperText, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PapperBlock } from "dan-components";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useHistory } from "react-router";
import Type from "../../../styles/components/Fonts.scss";
import api from "../../../utils/axios";
import { handelApiValue } from "../../../utils/CheckerValue";
import {
  BEHAVIOURISSUES, EQUIMENTMACHINARY, ERGONOMICS, HAZARDIOUS_ACTS_SUB_TYPES, PROCEDURES, ROOT_CAUSE_ANALYSIS_FORM, SAFETYITEMS, SUPERVISON,
  WORKPACKAGE
} from "../../../utils/constants";
import FormSideBar from "../FormSideBar";
import CircularProgress from '@material-ui/core/CircularProgress';

import Loader from "../Loader";


const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const HazardiousActs = () => {
  const [form, setForm] = useState({
    supervision: { remarkType: "options", rcaSubType: "Supervision", rcaRemark: [] },
    workpackage: { remarkType: "options", rcaSubType: "workPackage", rcaRemark: [] },
    equipmentMachinery: { remarkType: "options", rcaSubType: "equipmentMachinery", rcaRemark: [] },
    behaviourIssue: { remarkType: "options", rcaSubType: "behaviourIssue", rcaRemark: [] },
    safetyIssues: { remarkType: "options", rcaSubType: "safetyIssues", rcaRemark: [] },
    ergonimics: { remarkType: "options", rcaSubType: "ergonimics", rcaRemark: [] },
    procedures: { remarkType: "options", rcaSubType: "procedures", rcaRemark: [] },
    others: { remarkType: "remark", rcaSubType: "otherActs", rcaRemark: [] },
  });

  const putId = useRef("");
  const history = useHistory();
  const [error, setError] = useState({})
  const [incidentDetail, setIncidentDetail] = useState({});
  const [paceCauseDelete, setPaceCauseDelete] = useState()
  const [nextButton, setNextButton] = useState(false)
  const [allPaceCause, setAllPaceCause] = useState({})
  const [loading, setLoading] = useState(false)

  // get data and set to states
  const handelUpdateCheck = async () => {
    let tempData = {}
    let paceCauseid = []
    let paceCauseRmk = []
    let allFetchPaceCause = {}
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
        if (HAZARDIOUS_ACTS_SUB_TYPES.includes(value.rcaSubType)) {
          if (Object.keys(tempData).includes(value.rcaSubType)) {
            tempData[value.rcaSubType].push(value.rcaRemark)
          } else {
            tempData[value.rcaSubType] = [value.rcaRemark]
          }
          paceCauseRmk.push(value.rcaRemark)
          paceCauseid.push(value.id)
          allFetchPaceCause[value.id] = value.rcaRemark
        }
      })
      setForm({
        ...form,
        supervision: {
          ...form.supervision,
          rcaRemark: handelApiValue(tempData["Supervision"]),
        },
        workpackage: {
          ...form.workpackage,
          rcaRemark: handelApiValue(tempData["workPackage"]),
        },
        equipmentMachinery: {
          ...form.equipmentMachinery,
          rcaRemark: handelApiValue(tempData["equipmentMachinery"]),
        },
        behaviourIssue: {
          ...form.behaviourIssue,
          rcaRemark: handelApiValue(tempData["behaviourIssue"]),
        },
        safetyIssues: {
          ...form.safetyIssues,
          rcaRemark: handelApiValue(tempData["safetyIssues"]),
        },
        ergonimics: {
          ...form.ergonimics,
          rcaRemark: handelApiValue(tempData["ergonimics"]),
        },
        procedures: {
          ...form.procedures,
          rcaRemark: handelApiValue(tempData["procedures"]),
        },
        others: {
          ...form.others,
          rcaRemark: handelApiValue(tempData["otherActs"]),
        },
      });
      setPaceCauseDelete(paceCauseid)
      setAllPaceCause(allFetchPaceCause)
    }
  }

  const handelSupervison = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.supervision.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        supervision: {
          remarkType: "options",
          rcaSubType: "Supervision",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        supervision: {
          remarkType: "options",
          rcaSubType: "Supervision",
          rcaRemark: [...form.supervision.rcaRemark, value],
        },
      });
    }
  };

  const handelWorkpackage = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.workpackage.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        workpackage: {
          remarkType: "options",
          rcaSubType: "workPackage",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        workpackage: {
          remarkType: "options",
          rcaSubType: "workPackage",
          rcaRemark: [...form.workpackage.rcaRemark, value],
        },
      });
    }
  };

  const handelEquipmentMachinary = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.equipmentMachinery.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        equipmentMachinery: {
          remarkType: "options",
          rcaSubType: "equipmentMachinery",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        equipmentMachinery: {
          remarkType: "options",
          rcaSubType: "equipmentMachinery",
          rcaRemark: [...form.equipmentMachinery.rcaRemark, value],
        },
      });
    }
  };

  const handelBehaviousIssues = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.behaviourIssue.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        behaviourIssue: {
          remarkType: "options",
          rcaSubType: "behaviourIssue",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        behaviourIssue: {
          remarkType: "options",
          rcaSubType: "behaviourIssue",
          rcaRemark: [...form.behaviourIssue.rcaRemark, value],
        },
      });
    }
  };

  const handelSafetyIssues = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.safetyIssues.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        safetyIssues: {
          remarkType: "options",
          rcaSubType: "safetyIssues",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        safetyIssues: {
          remarkType: "options",
          rcaSubType: "safetyIssues",
          rcaRemark: [...form.safetyIssues.rcaRemark, value],
        },
      });
    }
  };

  const handelErgonomics = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.ergonimics.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        ergonimics: {
          remarkType: "options",
          rcaSubType: "ergonimics",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        ergonimics: {
          remarkType: "options",
          rcaSubType: "ergonimics",
          rcaRemark: [...form.ergonimics.rcaRemark, value],
        },
      });
    }
  };

  const handelProcedures = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.procedures.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        procedures: {
          remarkType: "options",
          rcaSubType: "procedures",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        procedures: {
          remarkType: "options",
          rcaSubType: "procedures",
          rcaRemark: [...form.procedures.rcaRemark, value],
        },
      });
    }
  };

  const handelOthers = (e) => {
    setForm({
      ...form,
      others: {
        remarkType: "remark",
        rcaSubType: "otherActs",
        rcaRemark: [e.target.value],
      },
    });
  };

  const handelDelete = async () => {
    let currentRemark = [].concat.apply([], [
      form.supervision.rcaRemark,
      form.workpackage.rcaRemark,
      form.equipmentMachinery.rcaRemark,
      form.behaviourIssue.rcaRemark,
      form.safetyIssues.rcaRemark,
      form.ergonimics.rcaRemark,
      form.procedures.rcaRemark,
      form.others.rcaRemark,
    ])
    if (paceCauseDelete !== undefined && paceCauseDelete.length > 0) {
      for (let key in allPaceCause) {
        if (!currentRemark.includes(allPaceCause[key])) {
          let delPaceCause = await api.delete(`api/v1/incidents/${putId.current}/pacecauses/${key}/`)
          if (delPaceCause.status == 200) {
            console.log("deleted")
          }
        }
      }
    }
  }

  const handelNavigate = (navigateType) => {
    if (navigateType == "next") {
      history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Hazardous conditions"]}${putId.current}`)
    } else if (navigateType == "previous") {
      history.push(`${ROOT_CAUSE_ANALYSIS_FORM["RCA Details"]}${putId.current}`)
    }
  }

  const handelApiCall = async () => {
    let tempData = []
    let lastRemark = Object.values(allPaceCause)
    Object.entries(form).map(async (item, index) => {
      let api_data = item[1];
      api_data.rcaRemark.map((value) => {
        if (!lastRemark.includes(value) && value !== "") {
          let temp = {
            createdBy: "0",
            fkIncidentId: putId.current,
            rcaRemark: value,
            rcaSubType: api_data["rcaSubType"],
            rcaType: "Immediate",
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

  const classes = useStyles();

  const handelCallBack = async () => {
    await setLoading(true)
    await fetchIncidentDetails();
    await handelUpdateCheck();
    await setLoading(false)
  }

  useEffect(() => {
    handelCallBack()
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock
      title="Immediate Causes - Hazardous Acts"
      icon="ion-md-list-box"
    >
      {loading == false ?
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <Typography variant="h6" className={Type.labelName} gutterBottom>
                  Incident number
                </Typography>
                <Typography className={Type.labelValue}>
                  {incidentDetail.incidentNumber}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h6" className={Type.labelName} gutterBottom>
                  RCA method
                </Typography>
                <Typography className={Type.labelValue}>
                  PACE cause analysis
                </Typography>
              </Grid>

              <Grid item md={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Supervision</FormLabel>
                  <FormGroup>
                    {SUPERVISON.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.supervision.rcaRemark.includes(value)}
                        onChange={async (e) => await handelSupervison(e, value)}
                      />
                    ))}
                  </FormGroup>
                  {error && error.supervision && (
                    <FormHelperText>{error.supervision}</FormHelperText>
                  )}
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              {/* workpackage */}
              <Grid item md={12}>
                <FormControl component="fieldset" error={error.workpackage}>
                  <FormLabel component="legend">Work package</FormLabel>
                  <FormGroup>
                    {WORKPACKAGE.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.workpackage.rcaRemark.includes(value)}
                        onChange={async (e) => handelWorkpackage(e, value)}
                      />
                    ))}
                  </FormGroup>
                  {error && error.workpackage && (
                    <FormHelperText>{error.workpackage}</FormHelperText>
                  )}
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              {/* equiment machinary     */}
              <Grid item md={12}>
                <FormControl
                  component="fieldset"
                  error={error.equipmentMachinery}
                >
                  <FormLabel component="legend">Equipment & machinery</FormLabel>
                  <FormGroup>
                    {EQUIMENTMACHINARY.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.equipmentMachinery.rcaRemark.includes(
                          value
                        )}
                        onChange={async (e) => handelEquipmentMachinary(e, value)}
                      />
                    ))}
                  </FormGroup>
                  {error && error.equipmentMachinery && (
                    <FormHelperText>{error.equipmentMachinery}</FormHelperText>
                  )}
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              <Grid item md={12}>
                <FormControl component="fieldset" error={error.behaviourIssue}>
                  <FormLabel component="legend">Behaviour issue</FormLabel>
                  <FormGroup>
                    {BEHAVIOURISSUES.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.behaviourIssue.rcaRemark.includes(value)}
                        onChange={async (e) => handelBehaviousIssues(e, value)}
                      />
                    ))}
                  </FormGroup>
                  {error && error.behaviourIssue && (
                    <FormHelperText>{error.behaviourIssue}</FormHelperText>
                  )}
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              {/* safety issues    */}
              <Grid item md={12}>
                <FormControl component="fieldset" error={error.safetyIssues}>
                  <FormLabel component="legend">Safety items</FormLabel>
                  <FormGroup>
                    {SAFETYITEMS.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.safetyIssues.rcaRemark.includes(value)}
                        onChange={async (e) => handelSafetyIssues(e, value)}
                      />
                    ))}
                  </FormGroup>
                  {error && error.safetyIssues && (
                    <FormHelperText>{error.safetyIssues}</FormHelperText>
                  )}
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              <Grid item md={12}>
                <FormControl component="fieldset" error={error.procedures}>
                  <FormLabel component="legend">Ergonomics</FormLabel>
                  <FormGroup>
                    {ERGONOMICS.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.ergonimics.rcaRemark.includes(value)}
                        onChange={async (e) => handelErgonomics(e, value)}
                      />
                    ))}
                  </FormGroup>
                  {error && error.ergonimics && (
                    <FormHelperText>{error.ergonimics}</FormHelperText>
                  )}
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              <Grid item md={12}>
                <FormControl component="fieldset" error={error.procedures}>
                  <FormLabel component="legend">Procedure</FormLabel>
                  <FormGroup>
                    {PROCEDURES.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.procedures.rcaRemark.includes(value)}
                        onChange={async (e) => handelProcedures(e, value)}
                      />
                    ))}
                  </FormGroup>
                  {error && error.procedures && (
                    <FormHelperText>{error.procedures}</FormHelperText>
                  )}
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              {/* others */}
              <Grid item xs={12}>
                <TextField
                  className={classes.formControl}
                  id="filled-basic"
                  label="Others"
                  variant="outlined"
                  multiline
                  error={error.others}
                  value={
                    form.others.rcaRemark !== "No option selected"
                      ? form.others.rcaRemark
                      : ""
                  }
                  helperText={error ? error.others : ""}
                  rows={3}
                  onChange={async (e) => handelOthers(e)}
                />
              </Grid>

              <Grid item md={12}>
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
                  Next{nextButton && <CircularProgress size={20} />}
                </Button>
              </Grid>
            </Grid>
          </Col>
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Hazardous acts"}
              />
            </Col>
          )}
        </Row>
        :
        <Loader />
      }
    </PapperBlock>
  );
};

export default HazardiousActs;
