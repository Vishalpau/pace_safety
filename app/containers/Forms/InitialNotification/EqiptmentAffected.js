import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router";

import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";
import api from "../../../utils/axios";
import EquipmentValidate from "../../Validator/EquipmentValidation";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  spacer: {
    marginTop: "1rem",
  },
  customLabel: {
    marginBottom: 0,
  },
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EqiptmentAffected = () => {
  const reportedTo = [
    "Internal Leadership",
    "Police",
    "Environment Officer",
    "OHS",
    "Mital Aid",
    "Other",
  ];

  const notificationSent = ["Manage", "SuperVisor"];

  const selectValues = [1, 2, 3, 4];

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState({});
  const [equipmentAffected, setequipmentAffected] = useState([]);
  const [equipmentTypeValue, setEquipmentTypeValue] = useState([]);
  const [detailsOfEquipmentAffect, setDetailsOfEquipmentAffect] = useState("");
  const [equipmentListdata, setEquipmentListData] = useState([]);
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [equipmentDamagedComments, setEequipmentDamagedComments] = useState("");
  const [form, setForm] = useState([
    {
      equipmentType: "",
      equipmentOtherType: "",
      equipmentDeatils: "",
      createdBy: 1,
      fkIncidentId: localStorage.getItem("fkincidentId"),
    },
  ]);
  const handleUpdateEquipment = async (e, key, fieldname, equipmentId) => {
    const temp = equipmentListdata;
    console.log(temp);
    const value = e.target.value;
    temp[key][fieldname] = value;
    temp[key]["updatedBy"] = 0;
    console.log(temp[key]);

    const res = await api.put(
      `api/v1/incidents/${id}/equipments/${equipmentId}/`,
      temp[key]
    );
    console.log(res);
  };

  const addNewEquipmentDetails = () => {
    setForm([
      ...form,
      {
        equipmentType: "",
        equipmentOtherType: "",
        equipmentDeatils: "",
        createdBy: 1,
        fkIncidentId: localStorage.getItem("fkincidentId"),
      },
    ]);
  };
  const handleForm = (e, key, fieldname) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key][fieldname] = value;
    console.log(temp);
    setForm(temp);
  };

  const handleNext = async () => {
    console.log(form);

    const nextPath = JSON.parse(localStorage.getItem("nextPath"));
    if (equipmentListdata.length > 0) {
      if (nextPath.environmentAffect === "Yes") {
        history.push(
          `/app/incident-management/registration/initial-notification/environment-affected/${id}`
        );
      } else {
        history.push(
          `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
        );
      }
    } else {
      if (detailsOfEquipmentAffect === "Yes") {
        const { error, isValid } = EquipmentValidate(form);
        setError(error);
        console.log(form);
        var status = 0;

        for (var i = 0; i < form.length; i++) {
          const res = await api.post(
            `/api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/equipments/`,
            form[i]
          );

          status = res.status;
        }
        if (status === 201) {
          if (nextPath.environmentAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/environment-affected/"
            );
          } else {
            history.push(
              "/app/incident-management/registration/initial-notification/reporting-and-notification/"
            );
          }
        }
      } else {
        const temp = incidentsListData;
        temp["equipmentDamagedComments"] = equipmentDamagedComments;
        temp["isEquipmentDamagedAvailable"] = detailsOfEquipmentAffect;
        temp["updatedAt"] = moment(new Date()).toISOString();
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );
        if (nextPath.environmentAffect === "Yes") {
          history.push(
            "/app/incident-management/registration/initial-notification/environment-affected/"
          );
        } else {
          history.push(
            "/app/incident-management/registration/initial-notification/reporting-and-notification/"
          );
        }
      }
    }
  };
  const fetchEquipmentListData = async () => {
    const res = await api.get(`api/v1/incidents/${id}/equipments/`);
    const result = res.data.data.results;
    setEquipmentListData(result);
  };

  const fetchEquipmentAffectedValue = async () => {
    const res = await api.get("api/v1/lists/14/value");
    const result = res.data.data.results;
    setequipmentAffected(result);
  };

  const fetchEquipmentTypeValue = async () => {
    const res = await api.get("api/v1/lists/15/value");
    const result = res.data.data.results;
    setEquipmentTypeValue(result);
  };

  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentsListdata(result);
    await setIsLoading(true);
  };
  useEffect(() => {
    fetchEquipmentAffectedValue();
    fetchEquipmentTypeValue();
    fetchEquipmentListData();
    fetchIncidentsData();
  }, []);
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            {/* <Box marginBottom={5}>
              <FormHeader selectedHeader={"Initial notification"} />
            </Box> */}
            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Details of Equiptments Affected
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item md={12}>
                  <Typography variant="body" component="p" gutterBottom>
                    Do you have details to share about the equiptment accected?
                  </Typography>
                  <RadioGroup
                    aria-label="detailsOfPropertyAffect"
                    name="detailsOfPropertyAffect"
                    value={detailsOfEquipmentAffect}
                    onChange={(e) => {
                      setDetailsOfEquipmentAffect(e.target.value);
                      handleEquipmentDamageAvailable();
                    }}
                  >
                    {equipmentAffected.length !== 0
                      ? equipmentAffected.map((value, index) => (
                          <FormControlLabel
                            value={value.inputValue}
                            control={<Radio />}
                            label={value.inputLabel}
                          />
                        ))
                      : null}
                  </RadioGroup>
                </Grid>
                {detailsOfEquipmentAffect === "Yes" ? (
                  <>
                    {equipmentListdata.length > 0
                      ? equipmentListdata.map((equipment, key) => (
                          <>
                            <Grid item md={6}>
                              {/* <p>Equiptment type</p> */}
                              <FormControl
                                variant="outlined"
                                className={classes.formControl}
                              >
                                <InputLabel id="eq-type-label">
                                  Equiptment type
                                </InputLabel>
                                <Select
                                  labelId="eq-type-label"
                                  id="eq-type"
                                  label="Equiptment type"
                                  defaultValue={equipment.equipmentType}
                                  onChange={(e) =>
                                    handleUpdateEquipment(
                                      e,
                                      key,
                                      "equipmentType",
                                      equipment.id
                                    )
                                  }
                                >
                                  {equipmentTypeValue.length !== 0
                                    ? equipmentTypeValue.map(
                                        (selectValues, index) => (
                                          <MenuItem
                                            key={index}
                                            value={selectValues.inputValue}
                                          >
                                            {selectValues.inputLabel}
                                          </MenuItem>
                                        )
                                      )
                                    : null}
                                </Select>
                              </FormControl>
                              {/* {error && error[`equipmentType${[key]}`] && (
                            <p>{error[`equipmentType${[key]}`]}</p>
                          )} */}
                            </Grid>

                            <Grid item md={6}>
                              {/* <p>if other describe</p> */}
                              <TextField
                                variant="outlined"
                                id="filled-basic"
                                label="If others, describe"
                                className={classes.formControl}
                                defaultValue={equipment.equipmentOtherType}
                                onChange={(e) =>
                                  handleUpdateEquipment(
                                    e,
                                    key,
                                    "equipmentOtherType",
                                    equipment.id
                                  )
                                }
                              />
                              {/* {error && error[`equipmentOtherType${[key]}`] && (
                            <p>{error[`equipmentOtherType${[key]}`]}</p>
                          )} */}
                            </Grid>

                            <Grid item md={12}>
                              {/* <p>Describe the damage</p> */}
                              <TextField
                                id="describe-damage"
                                multiline
                                variant="outlined"
                                rows="3"
                                label="Describe the damage"
                                className={classes.fullWidth}
                                defaultValue={equipment.equipmentDeatils}
                                onChange={(e) =>
                                  handleUpdateEquipment(
                                    e,
                                    key,
                                    "equipmentDeatils",
                                    equipment.id
                                  )
                                }
                              />
                              {/* {error && error[`equipmentDeatils${[key]}`] && (
                            <p>{error[`equipmentDeatils${[key]}`]}</p>
                          )} */}
                            </Grid>
                          </>
                        ))
                      : form.map((value, key) => (
                          <>
                            <Grid item md={6}>
                              {/* <p>Equiptment type</p> */}
                              <FormControl
                                variant="outlined"
                                className={classes.formControl}
                              >
                                <InputLabel id="eq-type-label">
                                  Equiptment type
                                </InputLabel>
                                <Select
                                  labelId="eq-type-label"
                                  id="eq-type"
                                  label="Equiptment type"
                                  onChange={(e) =>
                                    handleForm(e, key, "equipmentType")
                                  }
                                >
                                  {equipmentTypeValue.length !== 0
                                    ? equipmentTypeValue.map(
                                        (selectValues, index) => (
                                          <MenuItem
                                            key={index}
                                            value={selectValues.inputValue}
                                          >
                                            {selectValues.inputLabel}
                                          </MenuItem>
                                        )
                                      )
                                    : null}
                                </Select>
                              </FormControl>
                              {error && error[`equipmentType${[key]}`] && (
                                <p>{error[`equipmentType${[key]}`]}</p>
                              )}
                            </Grid>

                            <Grid item md={6}>
                              {/* <p>if other describe</p> */}
                              <TextField
                                variant="outlined"
                                id="filled-basic"
                                label="If others, describe"
                                className={classes.formControl}
                                onChange={(e) =>
                                  handleForm(e, key, "equipmentOtherType")
                                }
                              />
                              {error && error[`equipmentOtherType${[key]}`] && (
                                <p>{error[`equipmentOtherType${[key]}`]}</p>
                              )}
                            </Grid>

                            <Grid item md={12}>
                              {/* <p>Describe the damage</p> */}
                              <TextField
                                id="describe-damage"
                                multiline
                                variant="outlined"
                                rows="3"
                                label="Describe the damage"
                                className={classes.fullWidth}
                                onChange={(e) =>
                                  handleForm(e, key, "equipmentDeatils")
                                }
                              />
                              {error && error[`equipmentDeatils${[key]}`] && (
                                <p>{error[`equipmentDeatils${[key]}`]}</p>
                              )}
                            </Grid>
                          </>
                        ))}
                    {equipmentListdata.length > 0 ? null : (
                      <Grid item lg={12} md={6} sm={6}>
                        <button
                          className={classes.textButton}
                          onClick={() => addNewEquipmentDetails()}
                        >
                          Add details of additional equiptment affected?
                        </button>
                      </Grid>
                    )}
                  </>
                ) : null}
                <Grid item lg={12} md={6} sm={6}>
                  {/* <p>Comment </p> */}
                  <TextField
                    id="comments"
                    multiline
                    variant="outlined"
                    rows="4"
                    label="Describe any actions taken"
                    onChange={(event) =>
                      setEequipmentDamagedComments(event.target.value)
                    }
                    className={classes.fullWidth}
                  />
                </Grid>
                <Box marginTop={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="/app/incident-management/registration/initial-notification/property-affected/"
                  >
                    Previouse
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleNext()}
                    // href="http://localhost:3000/app/incident-management/registration/initial-notification/environment-affected/"
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  listOfItems={INITIAL_NOTIFICATION_FORM}
                  selectedItem={"Equipment affected"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default EqiptmentAffected;
