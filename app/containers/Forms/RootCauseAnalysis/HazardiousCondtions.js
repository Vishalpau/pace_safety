import React, { useEffect, useState, useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Col, Row } from "react-grid-system";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import {
  ROOT_CAUSE_ANALYSIS_FORM,
  SAFETYITEMS,
} from "../../../utils/constants";
import HazardiousConditionsValidation from "../../Validator/RCAValidation/HazardiousConditonsValidation";
import {
  HAZARDIOUS_CONDITION_SUB_TYPES,
  WARNINGSYSTEM,
  ENERGIES,
  TOOLS,
  CONDITIONSAFETYITEMS,
} from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import { checkValue, handelApiValue } from "../../../utils/CheckerValue"

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const HazardiousCondition = () => {
  const [form, setForm] = useState({
    warningSystem: {
      remarkType: "options",
      rcaSubType: "warningSystem",
      rcaRemark: [],
    },
    energyTypes: {
      remarkType: "options",
      rcaSubType: "energyTypes",
      rcaRemark: [],
    },
    tools: { remarkType: "options", rcaSubType: "tools", rcaRemark: [] },
    safetyitems: {
      remarkType: "options",
      rcaSubType: "safetyItems",
      rcaRemark: [],
    },
    others: {
      remarkType: "remark",
      rcaSubType: "othersConditions",
      rcaRemark: [],
    },
  });

  const putId = useRef("");
  const history = useHistory();
  const [error, setError] = useState({})
  const [incidentDetail, setIncidentDetail] = useState({});
  const [paceCauseDelete, setPaceCauseDelete] = useState()
  const [nextButton, setNextButton] = useState(false)

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
        if (HAZARDIOUS_CONDITION_SUB_TYPES.includes(value.rcaSubType)) {
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
        warningSystem: {
          remarkType: "options",
          rcaSubType: "warningSystem",
          rcaRemark: handelApiValue(tempData["warningSystem"]),
        },
        energyTypes: {
          remarkType: "options",
          rcaSubType: "energyTypes",
          rcaRemark: handelApiValue(tempData["energyTypes"]),
        },
        tools: {
          remarkType: "options",
          rcaSubType: "tools",
          rcaRemark: handelApiValue(tempData["tools"]),
        },
        safetyitems: {
          remarkType: "options",
          rcaSubType: "safetyItems",
          rcaRemark: handelApiValue(tempData["safetyItems"]),
        },
        others: {
          remarkType: "remark",
          rcaSubType: "othersConditions",
          rcaRemark: handelApiValue(tempData["othersConditions"]),
        },
      });
      setPaceCauseDelete(paceCauseid)
    }
  }

  const handelWarningSystems = (e, value) => {
    if (e.target.checked == false) {
      const newData = form.warningSystem.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        warningSystem: {
          remarkType: "options",
          rcaSubType: "warningSystem",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        warningSystem: {
          remarkType: "options",
          rcaSubType: "warningSystem",
          rcaRemark: [...form.warningSystem.rcaRemark, value],
        },
      });
    }
  };

  const handelEnergyTypes = (e, value) => {
    if (e.target.checked == false) {
      const newData = form.energyTypes.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        energyTypes: {
          remarkType: "options",
          rcaSubType: "energyTypes",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        energyTypes: {
          remarkType: "options",
          rcaSubType: "energyTypes",
          rcaRemark: [...form.energyTypes.rcaRemark, value],
        },
      });
    }
  };

  const handelTools = (e, value) => {
    if (e.target.checked == false) {
      const newData = form.tools.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        tools: {
          remarkType: "options",
          rcaSubType: "tools",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        tools: {
          remarkType: "options",
          rcaSubType: "tools",
          rcaRemark: [...form.tools.rcaRemark, value],
        },
      });
    }
  };

  const handelSafetyItems = (e, value) => {
    if (e.target.checked == false) {
      const newData = form.safetyitems.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        safetyitems: {
          remarkType: "options",
          rcaSubType: "safetyItems",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        safetyitems: {
          remarkType: "options",
          rcaSubType: "safetyItems",
          rcaRemark: [...form.safetyitems.rcaRemark, value],
        },
      });
    }
  };

  const handelOthers = (e) => {
    setForm({
      ...form,
      others: {
        remarkType: "remark",
        rcaSubType: "othersConditions",
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
      history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Corrective actions"]}${putId.current}`)
    } else if (navigateType == "previous") {
      history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Hazardous acts"]}${putId.current}`)
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

  const classes = useStyles();

  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  const handelPrevious = () => {
    if (!isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/hazardious-acts/${putId.current
        }`
      );
    } else if (isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/hazardious-acts/`
      );
    }
  };

  const handelCallback = async () => {
    await handelUpdateCheck();
    await fetchIncidentDetails();
  };

  useEffect(() => {
    handelCallback();
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock
      title="Immediate causes - hazardous conditions"
      icon="ion-md-list-box"
    >
      <Row>
        <Col md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentDetail.incidentNumber}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                RCA method
              </Typography>
              <Typography className={Type.labelValue}>
                PACE cause analysis
              </Typography>
            </Grid>

            <Grid item md={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Warning system</FormLabel>
                <FormGroup>
                  {WARNINGSYSTEM.map((value) => (
                    <FormControlLabel
                      control={<Checkbox name={value} />}
                      label={value}
                      checked={form.warningSystem.rcaRemark.includes(value)}
                      onChange={async (e) => handelWarningSystems(e, value)}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <Box borderTop={1} marginTop={2} borderColor="grey.300" />
            </Grid>

            {/* energy types */}
            <Grid item md={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Energy types</FormLabel>
                <FormGroup>
                  {ENERGIES.map((value) => (
                    <FormControlLabel
                      control={<Checkbox name={value} />}
                      label={value}
                      checked={form.energyTypes.rcaRemark.includes(value)}
                      onChange={async (e) => handelEnergyTypes(e, value)}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <Box borderTop={1} marginTop={2} borderColor="grey.300" />
            </Grid>

            {/* tools */}
            <Grid item md={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tools</FormLabel>
                <FormGroup>
                  {TOOLS.map((value) => (
                    <FormControlLabel
                      control={<Checkbox name={value} />}
                      label={value}
                      checked={form.tools.rcaRemark.includes(value)}
                      onChange={async (e) => handelTools(e, value)}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <Box borderTop={1} marginTop={2} borderColor="grey.300" />
            </Grid>

            {/* safety items */}
            <Grid item md={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Safety items</FormLabel>
                <FormGroup>
                  {CONDITIONSAFETYITEMS.map((value) => (
                    <FormControlLabel
                      control={<Checkbox name={value} />}
                      label={value}
                      checked={form.safetyitems.rcaRemark.includes(value)}
                      onChange={async (e) => handelSafetyItems(e, value)}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <Box borderTop={1} marginTop={2} borderColor="grey.300" />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="filled-basic"
                label="Others"
                multiline
                error={error.others}
                value={
                  form.others.rcaRemark !== "No option selected"
                    ? form.others.rcaRemark
                    : ""
                }
                helperText={error ? error.others : null}
                rows={3}
                className={classes.formControl}
                onChange={async (e) => handelOthers(e)}
              />
            </Grid>

            <Grid item md={12}>
              <Box marginTop={3}>
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
                  disabled={nextButton == true}
                  className={classes.button}
                  onClick={(e) => handelNext(e)}
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Col>
        {isDesktop && (
          <Col md={3}>
            <FormSideBar
              listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
              selectedItem="Hazardous conditions"
            />
          </Col>
        )}
      </Row>
    </PapperBlock>
  );
};

export default HazardiousCondition;
