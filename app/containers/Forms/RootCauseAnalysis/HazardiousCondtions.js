import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, Container } from "@material-ui/core";
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
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";
import FormHelperText from "@material-ui/core/FormHelperText";

import api from "../../../utils/axios";
import FormHeader from "../FormHeader";
import FormSideBar from "../FormSideBar";
import {
  ROOT_CAUSE_ANALYSIS_FORM,
  SAFETYITEMS,
} from "../../../utils/constants";
import HazardiousConditionsValidation from "../../Validator/RCAValidation/HazardiousConditonsValidation";
import {
  WARNINGSYSTEM,
  ENERGIES,
  TOOLS,
  CONDITIONSAFETYITEMS,
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

const HazardiousCondition = () => {
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
    warningSystem: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    energyTypes: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    tools: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    safetyitems: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    others: { remarkType: "", rcaSubType: "", rcaRemark: "" },
  });

  const putId = useRef("");
  const [fetchApiData, setFetchApiData] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [incidentDetail, setIncidentDetail] = useState({});
  const updateIds = useRef();

  // get data and set to states
  const handelUpdateCheck = async () => {
    let allrcaSubType = [
      "warningSystem",
      "energyTypes",
      "tools",
      "safetyitems",
      "othersconditions",
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
      console.log(putId);
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

      setForm({
        ...form,
        warningSystem: {
          remarkType: "options",
          rcaSubType: "warningSystem",
          rcaRemark: tempApiData.warningSystem.includes(",")
            ? tempApiData.warningSystem.split(",")
            : [tempApiData.warningSystem],
        },
        energyTypes: {
          remarkType: "options",
          rcaSubType: "energyTypes",
          rcaRemark: tempApiData.energyTypes.includes(",")
            ? tempApiData.energyTypes.split(",")
            : [tempApiData.energyTypes],
        },
        tools: {
          remarkType: "options",
          rcaSubType: "tools",
          rcaRemark: tempApiData.tools.includes(",")
            ? tempApiData.tools.split(",")
            : [tempApiData.tools],
        },
        safetyitems: {
          remarkType: "options",
          rcaSubType: "safetyitems",
          rcaRemark: tempApiData.safetyitems.includes(",")
            ? tempApiData.safetyitems.split(",")
            : [tempApiData.safetyitems],
        },
        others: {
          remarkType: "remark",
          rcaSubType: "othersconditions",
          rcaRemark: tempApiData.othersconditions,
        },
      });
    }
  };

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
          rcaSubType: "safetyitems",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        safetyitems: {
          remarkType: "options",
          rcaSubType: "safetyitems",
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
        rcaSubType: "othersconditions",
        rcaRemark: e.target.value,
      },
    });
  };

  const handelNext = async (e) => {
    const { error, isValid } = HazardiousConditionsValidation(form);
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
    let nextPageLink = 0;
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
            console.log("request done");
            nextPageLink = res.status;
          }
        }
      }
      if (nextPageLink == 201 && Object.keys(error).length === 0) {
        history.push(
          "/app/incident-management/registration/root-cause-analysis/cause-and-action/"
        );
      } else if (nextPageLink == 200 && Object.keys(error).length === 0) {
        history.push(
          `/app/incident-management/registration/root-cause-analysis/cause-and-action/${
            putId.current
          }`
        );
      }
    }
    // api call //
  };

  const selectValues = ["Option1", "Option2", "...."];

  const classes = useStyles();

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
    // location.reload()
  }, []);

  return (
    <PapperBlock
      title="Immediate Causes - Hazardous Conditions"
      icon="ion-md-list-box"
    >
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
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
            <FormControl
              component="fieldset"
              required
              error={error.warningSystem}
            >
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
              {error && error.warningSystem && (
                <FormHelperText>{error.warningSystem}</FormHelperText>
              )}
            </FormControl>
            <Box borderTop={1} marginTop={2} borderColor="grey.300" />
          </Grid>

          {/* energy types */}
          <Grid item md={12}>
            <FormControl
              component="fieldset"
              required
              error={error.energyTypes}
            >
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
              {error && error.energyTypes && (
                <FormHelperText>{error.energyTypes}</FormHelperText>
              )}
            </FormControl>
            <Box borderTop={1} marginTop={2} borderColor="grey.300" />
          </Grid>

          {/* tools */}
          <Grid item md={12}>
            <FormControl component="fieldset" required error={error.tools}>
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
              {error && error.tools && (
                <FormHelperText>{error.tools}</FormHelperText>
              )}
            </FormControl>
            <Box borderTop={1} marginTop={2} borderColor="grey.300" />
          </Grid>

          {/* safety items */}
          <Grid item md={12}>
            <FormControl
              component="fieldset"
              required
              error={error.safetyitems}
            >
              <FormLabel component="legend">Saftey items</FormLabel>
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
              {error && error.safetyitems && (
                <FormHelperText>{error.safetyitems}</FormHelperText>
              )}
            </FormControl>
            <Box borderTop={1} marginTop={2} borderColor="grey.300" />
          </Grid>

          <Grid item md={12}>
            <TextField
              variant="outlined"
              id="filled-basic"
              label="Others"
              multiline
              required
              error={error.others}
              defaultValue={form.others.rcaRemark}
              helperText={error ? error.others : ""}
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
                onClick={() => history.goBack()}
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
            </Box>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem="Hazardious conditions"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default HazardiousCondition;
