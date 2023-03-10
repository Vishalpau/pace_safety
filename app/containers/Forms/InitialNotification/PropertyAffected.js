import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { PapperBlock } from "dan-components";
import moment from "moment";
import { FormHelperText } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextButton from "../../CommonComponents/TextButton";
import { Row, Col } from "react-grid-system";
import CircularProgress from '@material-ui/core/CircularProgress';

import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
  COMMENT
} from "../../../utils/constants";
import api from "../../../utils/axios";
import PropertyValidate from "../../Validator/PropertyValidation";
import "../../../styles/custom.css";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  customLabel: {
    marginBottom: 0,
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
  const [isOther, setIsOther] = useState(true);
  const [isNext, setIsNext] = useState(true);
  const nextPath = localStorage.getItem("nextPath");
  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;

  // Default form.
  const [form, setForm] = useState([
    {
      propertyType: "",
      propertyOtherType: "",
      damageDetails: "",
      fkIncidentId: localStorage.getItem("fkincidentId"),
      createdBy: parseInt(userId),
    },
  ]);

  // add new property details
  const addNewPropertyDetails = () => {
    setForm([
      ...form,
      {
        propertyType: "",
        propertyOtherType: "",
        damageDetails: "",
        fkIncidentId: localStorage.getItem("fkincidentId"),
        createdBy: parseInt(userId),
      },
    ]);
  };

  // hablde Remove property details

  const handleRemove = async (key) => {
    if (form[key].id) {
      const res = await api.delete(
        `api/v1/incidents/${id}/properties/${form[key].id}/`
      );
      if (res.status === 200) {
        const temp = form;
        const newData = temp.filter((item, index) => index !== key);
        await setForm(newData);
      }
    } else {
      const temp = form;
      const newData = temp.filter((item, index) => index !== key);
      await setForm(newData);
    }
  };

  //  set data in form
  const handlePropertyDetails = (e, key, fieldname) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key][fieldname] = value;

    setForm(temp);
  };

  // On next click event capture.
  const handleNext = async () => {
    const nextPath = JSON.parse(localStorage.getItem("nextPath"));

    // If property data there then don't do anything as we are doing put request on each change.

    // if check property have or not . if property data have then put else create new

    // If yes selected.
    await setIsNext(false)
    if (detailsOfPropertyAffect === "Yes") {

      // Validate property data.
      const { error, isValid } = PropertyValidate(form);
      setError(error);
      let status = 0;
      for (var i = 0; i < form.length; i++) {
        if (form[i].id) {

          const res = await api.put(
            `api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/properties/${form[i].id}/`,
            {
              propertyType: form[i].propertyType,
              propertyOtherType: form[i].propertyOtherType,
              damageDetails: form[i].damageDetails,
              fkIncidentId: localStorage.getItem("fkincidentId"),
              createdBy: parseInt(userId),
            }
          ).then((res) => {
            status = res.status;
          })
            .catch(() => {
              setIsNext(true)
            })

        } else {
          const res = await api.post(
            `api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/properties/`,
            {
              propertyType: form[i].propertyType,
              propertyOtherType: form[i].propertyOtherType,
              damageDetails: form[i].damageDetails,
              fkIncidentId: localStorage.getItem("fkincidentId"),
              createdBy: parseInt(userId),
            }
          ).then((res) => {
            status = res.status;
          })
            .catch(() => {
              setIsNext(true)
            })
        }


      }

      const temp = incidentsListData;
      temp["propertyDamagedComments"] =
        propertyDamagedComments || incidentsListData.propertyDamagedComments;
      temp["isPropertyDamagedAvailable"] =
        detailsOfPropertyAffect || incidentsListData.isPropertyDamagedAvailable;
      temp["updatedAt"] = new Date().toISOString();
      try {
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );
      } catch (err) {
        await setIsNext(true)
      }
      // If api success
      if (status === 201 || status === 200) {
        if (nextPath.equipmentAffect === "Yes") {
          history.push(
            `/incident/${id}/modify/equipment-affected/`
          );
        } else if (nextPath.environmentAffect === "Yes") {
          history.push(
            `/incident/${id}/modify/environment-affected/`
          );
        } else {
          history.push(
            `/incident/${id}/modify/reporting-and-notification/`
          );
        }
      }
      // If no is selected on form.
    } else {
      // if user select no or N/A remove all existing data
      if (propertyListData.length > 0) {
        // Remove previous data
        for (var i = 0; i < propertyListData.length; i++) {
          const res = await api.delete(
            `api/v1/incidents/${id}/properties/${propertyListData[i].id}/`
          ).catch(() => setIsNext(true))
        }

        // If that is not the case as if,
      }
      const temp = incidentsListData;
      temp["propertyDamagedComments"] =
        propertyDamagedComments || incidentsListData.propertyDamagedComments;
      temp["isPropertyDamagedAvailable"] =
        detailsOfPropertyAffect || incidentsListData.isPropertyDamagedAvailable;
      temp["updatedAt"] = new Date().toISOString();
      const res = await api.put(
        `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
        temp
      );

      // Update case

      if (nextPath.equipmentAffect === "Yes") {
        history.push(
          `/incident/${id}/modify/equipment-affected/`
        );
      } else if (nextPath.environmentAffect === "Yes") {
        history.push(
          `/incident/${id}/modify/environment-affected/`
        );
      } else {
        history.push(
          `/incident/${id}/modify/reporting-and-notification/`
        );
      }
    }

  };

  // get peoperty affetct value radio type
  const fetchPropertyAffectedValue = async () => {
    await api.get("api/v1/lists/12/value")
      .then((res) => {
        const result = res.data.data.results;
        setPropertyAffectedValue(result);
      })
      .catch((err) => history.push("/app/pages/error"))
  };

  // get property type value for dropdown
  const fetchPropertyTypeValue = async () => {
    await api.get("api/v1/lists/13/value")
      .then((res) => {
        const result = res.data.data.results;
        result.push({ inputValue: "Other", inputLabel: "Other" });
        result.push({ inputValue: "NA", inputLabel: "NA" });
        setPropertyTypeValue(result);
      })
      .catch((err) => history.push("/app/pages/error"))

  };

  // get incident details data
  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    ).then((res) => {
      const result = res.data.data.results;
      setIncidentsListdata(result);
      setPropertyDamagedComments(result.propertyDamagedComments);
      const isAvailable = result.isPropertyDamagedAvailable;
      setDetailsOfPropertyAffect(isAvailable);
    })
      .catch((err) => history.push("/app/pages/error"))
  };

  // get property list data
  const fetchPropertyListData = async () => {
    await api.get(`api/v1/incidents/${id}/properties/`)
      .then((res) => {
        const result = res.data.data.results;
        if (result.length > 0) {
          let temp = [...form];
          temp = result;
          setForm(temp);
        }
        setPropertyListData(result);
        setIsLoading(true);
      })
      .catch((err) => history.push("/app/pages/error"))
  };

  // handle go back
  const handleBack = () => {
    const nextPath = JSON.parse(localStorage.getItem("nextPath"))
    if (nextPath.personAffect === "Yes") {
      history.push(
        `/incident/${id}/modify/peoples-afftected/`
      );
    } else {
      history.push(
        `/incident/${id}/modify/`
      );
    }
  };

  useEffect(() => {
    fetchPropertyAffectedValue();
    fetchPropertyTypeValue();
    fetchIncidentsData();
    if (id) {
      fetchPropertyListData();
    } else {
      setIsLoading(true);
    }
  }, []);
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Details of Property/Material Affected" icon="ion-md-list-box">
      {isLoading ? (
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Do you have details to share about the property/material affected?
                </Typography>
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
                  <Grid item xs={12}>
                    <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                      <Typography variant="h6">
                        Details of property/material affected
                      </Typography>
                    </Box>
                  </Grid>
                  {form.map((value, index) => (
                    <Grid
                      container
                      item
                      md={12}
                      spacing={3}
                      className="repeatedGrid"
                    >
                      {/* Property type  */}
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant="outlined"
                          required
                          className={classes.formControl}
                          error={error && error[`propertyType${[index]}`]}
                        >
                          <InputLabel id="person-type-label">
                            Property type
                          </InputLabel>
                          <Select
                            labelId="person-type-label"
                            id={`person-type${index + 1}`}
                            label="Person type"
                            value={value.propertyType || ""}
                            onChange={(e) => {
                              handlePropertyDetails(e, index, "propertyType");
                              setIsOther(e.target.value !== "Other");
                            }}
                          >
                            {propertyTypeValue.length !== 0
                              ? propertyTypeValue.map((selectValues, index) => (
                                <MenuItem
                                  key={index}
                                  value={selectValues.inputValue}
                                >
                                  {selectValues.inputLabel}
                                </MenuItem>
                              ))
                              : null}
                          </Select>
                          {error && error[`propertyType${[index]}`] && (
                            <FormHelperText>
                              {error[`propertyType${[index]}`]}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      {/*Property other type  */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          id={`other-property${index + 1}`}
                          variant="outlined"
                          label="If others, describe"
                          value={value.propertyOtherType || ""}
                          error={error && error[`propertyOtherType${[index]}`]}
                          helperText={
                            error && error[`propertyOtherType${[index]}`]
                              ? error[`propertyOtherType${[index]}`]
                              : null
                          }
                          className={classes.formControl}
                          disabled={
                            value.propertyType === "Other" ? false : true
                          }
                          onChange={(e) =>
                            handlePropertyDetails(e, index, "propertyOtherType")
                          }
                        />
                      </Grid>
                      {/* Property damage details */}
                      <Grid item xs={12}>
                        <TextField
                          id={`describe-damage${index + 1}`}
                          variant="outlined"
                          required
                          error={error && error[`damageDetails${[index]}`]}
                          helperText={
                            error && error[`damageDetails${[index]}`]
                              ? error[`damageDetails${[index]}`]
                              : null
                          }
                          label="Describe the damage"
                          className={classes.formControl}
                          value={value.damageDetails || ""}
                          onChange={(e) =>
                            handlePropertyDetails(e, index, "damageDetails")
                          }
                        />
                      </Grid>
                      {form.length > 1 ? (
                        <Grid item xs={3}>
                          {/* Remove previous data */}
                          <Button
                            onClick={() => handleRemove(index)}
                            variant="contained"
                            startIcon={<DeleteForeverIcon />}
                            color="primary"
                            className={classes.button}
                          >
                            Remove
                          </Button>
                        </Grid>
                      ) : null}
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    {/* Add new property details */}
                    <TextButton
                      startIcon={<PersonAddIcon />}
                      onClick={() => addNewPropertyDetails()}
                    >
                      Add details of another property/material affected
                    </TextButton>
                  </Grid>
                </>
              ) : null}
              {/* text comment for property damage */}
              <Grid item xs={12}>
                {detailsOfPropertyAffect === "Yes" ? null : (
                  <TextField
                    id="describe-any-actions-taken"
                    multiline
                    rows="3"
                    variant="outlined"
                    label={COMMENT}
                    fullWidth
                    value={propertyDamagedComments || ""}
                    onChange={(e) => {
                      setPropertyDamagedComments(e.target.value);
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {/* go back previous page */}
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => handleBack()}
                >
                  Previous
                </Button>
                {/* go next page */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={!isNext}
                >
                  Next {isNext ? null : <CircularProgress size={20} />}
                </Button>
              </Grid>
            </Grid>
          </Col>
          {/* Right sidebar */}
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                listOfItems={INITIAL_NOTIFICATION_FORM}
                selectedItem={"Property/Material affected"}
                id={id}
              />
            </Col>
          )}
        </Row>
      ) : (
        <Loader />
      )}
    </PapperBlock>
  );
};

export default PropertyAffected;
