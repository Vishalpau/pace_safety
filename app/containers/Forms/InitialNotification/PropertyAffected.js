import React, { useEffect, useState } from "react";
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
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { PapperBlock } from "dan-components";
import moment from "moment";

import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";
import api from "../../../utils/axios";
import { useHistory, useParams } from "react-router";
import PropertyValidate from "../../Validator/PropertyValidation";

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
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
}));

const PropertyAffected = () => {
  // React defines
  const classes = useStyles();
  const history = useHistory();

  // Id will have the value in case /id will be passed in the url.
  const { id } = useParams();

  // State definations.
  const [propertyAffectedValue, setPropertyAffectedValue] = useState([]);
  const [propertyTypeValue, setPropertyTypeValue] = useState([]);
  const [detailsOfPropertyAffect, setDetailsOfPropertyAffect] = useState("");
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [propertyDamagedComments, setPropertyDamagedComments] = useState("");
  const [propertyListData, setPropertyListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  // Default form.
  const [form, setForm] = useState([
    {
      propertyType: "",
      propertyOtherType: "",
      damageDetails: "",
      fkIncidentId: localStorage.getItem("fkincidentId"),
      createdBy: 2,
    },
  ]);

  const addNewPropertyDetails = () => {
    // alert('ram')
    setForm([
      ...form,
      {
        propertyType: "",
        propertyOtherType: "",
        damageDetails: "",
        fkIncidentId: localStorage.getItem("fkincidentId"),
        createdBy: 2,
      },
    ]);
  };

  const handleUpdateProperty = async (e, key, fieldname, propertyId) => {
    const temp = propertyListData;
  
    const value = e.target.value;
    temp[key][fieldname] = value;
    temp[key]["updatedBy"] = 0;

    const res = await api.put(
      `api/v1/incidents/${id}/properties/${propertyId}/`,
      temp[key]
    );
   
  };

  const handlePropertyType = (e, key, fieldname) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key][fieldname] = value;
  
    setForm(temp);
  };

  const handlePropertyOtherType = (e, key, fieldname) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key][fieldname] = value;
  
    setForm(temp);
  };

  const handleDamageDetails = (e, key, fieldname) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key][fieldname] = value;
  
    setForm(temp);
  };

  // On next click event capture.
  const handleNext = async () => {
    const nextPath = JSON.parse(localStorage.getItem("nextPath"));

    // If property data there then don't do anything as we are doing put request on each change.
    if (propertyListData.length > 0) {
      if (nextPath.equipmentAffect === "Yes") {
        history.push(
          `/app/incident-management/registration/initial-notification/eqiptment-affected/${id}`
        );
      } else if (nextPath.environmentAffect === "Yes") {
        history.push(
          `/app/incident-management/registration/initial-notification/environment-affected/${id}`
        );
      } else {
        history.push(
          `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
        );
      }
      // If that is not the case as if,
    } else {
      // If yes selected.
      if (detailsOfPropertyAffect === "Yes") {
        // Validate property data.
        const { error, isValid } = PropertyValidate(form);
        setError(error);
        let status = 0;
        for (var i = 0; i < form.length; i++) {
          const res = await api.post(
            `api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/properties/`,
            form[i]
          );
          status = res.status;
        }

        const temp = incidentsListData;
        temp["propertyDamagedComments"] =
          propertyDamagedComments || incidentsListData.propertyDamagedComments;
        temp["isPropertyDamagedAvailable"] =
          detailsOfPropertyAffect ||
          incidentsListData.isPropertyDamagedAvailable;
        temp["updatedAt"] = moment(new Date()).toISOString();
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );
        // If api success
        if (status === 201) {
          if (nextPath.equipmentAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/eqiptment-affected/"
            );
          } else if (nextPath.environmentAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/environment-affected/"
            );
          } else {
            history.push(
              "/app/incident-management/registration/summary/summary/"
            );
          }
        }

        // If no is selected on form.
      } else {
        const temp = incidentsListData;
        temp["propertyDamagedComments"] =
          propertyDamagedComments || incidentsListData.propertyDamagedComments;
        temp["isPropertyDamagedAvailable"] =
          detailsOfPropertyAffect ||
          incidentsListData.isPropertyDamagedAvailable;
        temp["updatedAt"] = moment(new Date()).toISOString();
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );

        // Update case
        if (id) {
          if (nextPath.equipmentAffect === "Yes") {
            history.push(
              `/app/incident-management/registration/initial-notification/eqiptment-affected/${id}`
            );
          } else if (nextPath.environmentAffect === "Yes") {
            history.push(
              `/app/incident-management/registration/initial-notification/environment-affected/${id}`
            );
          } else {
            history.push(
              `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
            );
          }
          // New entry case.
        } else {
          if (nextPath.equipmentAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/eqiptment-affected/"
            );
          } else if (nextPath.environmentAffect === "Yes") {
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
      }
    }
  };

  const fetchPropertyAffectedValue = async () => {
    const res = await api.get("api/v1/lists/12/value");
    const result = res.data.data.results;
    setPropertyAffectedValue(result);
  };

  const fetchPropertyTypeValue = async () => {
    const res = await api.get("api/v1/lists/13/value");
    const result = res.data.data.results;
    setPropertyTypeValue(result);
  };

  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentsListdata(result);
    await setIsLoading(true);
    const isAvailable = result.isPropertyDamagedAvailable;
    await setDetailsOfPropertyAffect(isAvailable);
  };

  const fetchPropertyListData = async () => {
    const res = await api.get(`api/v1/incidents/${id}/properties/`);
    const result = res.data.data.results;
    await setPropertyListData(result);
   
  };

  useEffect(() => {
    fetchPropertyAffectedValue();
    fetchPropertyTypeValue();
    fetchIncidentsData();
    fetchPropertyListData();
  }, []);

  return (
    <PapperBlock title=" Details of proprties Affected?" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <Typography variant="body2">
                Do you have details to share about the properties affected?
              </Typography>
              {/* <p>Do you have details of individual effected?</p>   */}
              <RadioGroup
                className={classes.inlineRadioGroup}
                aria-label="detailsOfPropertyAffect"
                name="detailsOfPropertyAffect"
                value={detailsOfPropertyAffect}
                onChange={(event) => {
                  setDetailsOfPropertyAffect(event.target.value);
                }}
              >
                {propertyAffectedValue !== 0
                  ? propertyAffectedValue.map((value, index) => (
                      <FormControlLabel
                        value={value.inputValue}
                        control={<Radio />}
                        label={value.inputLabel}
                      />
                    ))
                  : null}
              </RadioGroup>
            </Grid>
            {detailsOfPropertyAffect === "Yes" ? (
              <>
                <Grid item md={12}>
                  <Box marginTop={2} marginBottom={2}>
                    {/* <h4>Details of people affected</h4> */}
                    <Typography variant="h6">
                      Details of properties affected
                    </Typography>
                  </Box>
                </Grid>
                {propertyListData.length !== 0
                  ? propertyListData.map((property, index) => (
                      <>
                        <Grid item md={6}>
                          {/* <p>person type</p> */}
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel id="person-type-label">
                              Property type
                            </InputLabel>
                            <Select
                              labelId="person-type-label"
                              id="person-type"
                              label="Person type"
                              defaultValue={property.propertyType}
                              onChange={(e) =>
                                handleUpdateProperty(
                                  e,
                                  index,
                                  "propertyType",
                                  property.id
                                )
                              }
                            >
                              {propertyTypeValue.length !== 0
                                ? propertyTypeValue.map(
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
                        </Grid>

                        <Grid item md={6}>
                          {/* <p>Name of people affected</p> */}
                          <TextField
                            id="name-affected"
                            variant="outlined"
                            label="if others, describe"
                            className={classes.formControl}
                            defaultValue={property.propertyOtherType}
                            onChange={(e) =>
                              handleUpdateProperty(
                                e,
                                index,
                                "propertyOtherType",
                                property.id
                              )
                            }
                          />
                        </Grid>

                        <Grid item md={12}>
                          {/* <p>Name of people affected</p> */}
                          <TextField
                            id="name-affected"
                            variant="outlined"
                            label="Describe the damage"
                            className={classes.formControl}
                            defaultValue={property.damageDetails}
                            onChange={(e) =>
                              handleUpdateProperty(
                                e,
                                index,
                                "damageDetails",
                                property.id
                              )
                            }
                          />
                        </Grid>
                      </>
                    ))
                  : form.map((value, index) => (
                      <>
                        <Grid item md={6}>
                          {/* <p>person type</p> */}
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel id="person-type-label">
                              Property type
                            </InputLabel>
                            <Select
                              labelId="person-type-label"
                              id="person-type"
                              label="Person type"
                              onChange={(e) =>
                                handlePropertyType(e, index, "propertyType")
                              }
                            >
                              {propertyTypeValue.length !== 0
                                ? propertyTypeValue.map(
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
                          {error && error[`propertyType${[index]}`] && (
                            <p>{error[`propertyType${[index]}`]}</p>
                          )}
                        </Grid>

                        <Grid item md={6}>
                          {/* <p>Name of people affected</p> */}
                          <TextField
                            id="name-affected"
                            variant="outlined"
                            label="if others, describe"
                            className={classes.formControl}
                            onChange={(e) =>
                              handlePropertyOtherType(
                                e,
                                index,
                                "propertyOtherType"
                              )
                            }
                          />
                          {error && error[`propertyOtherType${[index]}`] && (
                            <p>{error[`propertyOtherType${[index]}`]}</p>
                          )}
                        </Grid>

                        <Grid item md={12}>
                          {/* <p>Name of people affected</p> */}
                          <TextField
                            id="name-affected"
                            variant="outlined"
                            label="Describe the damage"
                            className={classes.formControl}
                            onChange={(e) =>
                              handleDamageDetails(e, index, "damageDetails")
                            }
                          />
                          {error && error[`damageDetails${[index]}`] && (
                            <p>{error[`damageDetails${[index]}`]}</p>
                          )}
                        </Grid>
                      </>
                    ))}
                {propertyListData.length > 0 ? null : (
                  <Grid item md={12}>
                    <button
                      className={classes.textButton}
                      onClick={() => addNewPropertyDetails()}
                    >
                      <PersonAddIcon /> Add details of another person affected
                    </button>
                  </Grid>
                )}
                <Grid item md={12}>
                  {/* <p>Comments</p> */}

                  {/* {error && error.describeactiontaken && <p>{error.describeactiontaken}</p> } */}
                </Grid>
              </>
            ) : null}
            <Grid item md={12}>
              {/* <p>Comments</p> */}
              {detailsOfPropertyAffect === "Yes" ? null : (
                <TextField
                  id="comments"
                  multiline
                  rows="3"
                  variant="outlined"
                  label="Describe any actions taken"
                  className={classes.fullWidth}
                  defaultValue={incidentsListData.propertyDamagedComments}
                  onChange={(e) => {
                    setPropertyDamagedComments(e.target.value);
                  }}
                />
              )}
              {/* {error && error.describeactiontaken && <p>{error.describeactiontaken}</p> } */}
            </Grid>
            <Grid item md={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => history.goBack()}
                // href="/app/incident-management/registration/initial-notification/peoples-afftected/"
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                // href="http://localhost:3000/app/incident-management/registration/initial-notification/eqiptment-affected/"
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem={"Property affected"}
            />
          </Grid>
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default PropertyAffected;
