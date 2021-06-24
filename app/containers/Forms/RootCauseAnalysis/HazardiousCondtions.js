import React, { useEffect, useState } from "react";
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

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import HazardiousConditionsValidation from "../../Validator/RCAValidation/HazardiousConditonsValidation"


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
    fkIncidentId: parseInt(localStorage.getItem("fkincidentId"))
  })


  const [error, setError] = useState({})

  const [form, setForm] = useState({
    warningSystem: { rcaSubType: "", rcaRemark: [] },
    energyTypes: { rcaSubType: "", rcaRemark: [] },
    tools: { rcaSubType: "", rcaRemark: [] },
    safetyitems: { rcaSubType: "", rcaRemark: [] },
    others: { rcaSubType: "", remarkType: "" }
  }
  )

  const handelWarningSystems = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.warningSystem.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, warningSystem: {
          rcaSubType: "warningSystem",
          rcaRemark: newData
        }
      })
    } else {
      setForm({
        ...form, warningSystem: {
          rcaSubType: "warningSystem",
          rcaRemark: [...form.warningSystem.rcaRemark, value]
        }
      })
    }
  }

  const handelEnergyTypes = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.energyTypes.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, energyTypes: {
          rcaSubType: "energyTypes",
          rcaRemark: newData
        }
      })
    } else {
      setForm({
        ...form, energyTypes: {
          rcaSubType: "energyTypes",
          rcaRemark: [...form.energyTypes.rcaRemark, value]
        }
      })
    }
  }

  const handelTools = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.tools.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, tools: {
          rcaSubType: "tools",
          rcaRemark: newData
        }
      })
    } else {
      setForm({
        ...form, tools: {
          rcaSubType: "tools",
          rcaRemark: [...form.tools.rcaRemark, value]
        }
      })
    }
  }

  const handelSafetyItems = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.safetyitems.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, safetyitems: {
          rcaSubType: "safetyitems",
          rcaRemark: newData
        }
      })
    } else {
      setForm({
        ...form, safetyitems: {
          rcaSubType: "safetyitems",
          rcaRemark: [...form.safetyitems.rcaRemark, value]
        }
      })
    }
  }

  const handelOthers = (e) => {
    setForm({
      ...form, others: {
        rcaSubType: "others",
        remarkType: e.target.value
      }
    })
  }

  const handelNext = (e) => {
    console.log(form)
    const { error, isValid } = HazardiousConditionsValidation(form);
    setError(error);
  }


  const selectValues = ["Option1", "Option2", "...."];

  const classes = useStyles();
  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Immediate Causes - Hazardous conditions
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

              <Grid item md={8}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    RCA Method: PACE Cuase Analysis
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={12}>
                <Typography variant="h6" gutterBottom>
                  Immediate Causes
                </Typography>

                <Typography variant="body" gutterBottom>
                  Hazardous conditions
                </Typography>
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.warningSystem}>Warning System</FormLabel>
                  <FormGroup>

                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelWarningSystems(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.warningSystem && (
                  <p><small style={{ color: "red" }}>{error.warningSystem}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.energyTypes}> Energy Types</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelEnergyTypes(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.energyTypes && (
                  <p><small style={{ color: "red" }}>{error.energyTypes}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.tools}> Tools</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelTools(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.tools && (
                  <p><small style={{ color: "red" }}>{error.tools}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.safetyitems}> Saftey Items</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelSafetyItems(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.safetyitems && (
                  <p><small style={{ color: "red" }}>{error.safetyitems}</small></p>
                )}
              </Grid>

              <Grid item md={12}>
                {/* <p>others</p> */}
                <TextField
                  variant="outlined"
                  id="filled-basic"
                  label="Others"
                  multiline
                  error={error.others}
                  helperText={error ? error.others : ""}
                  rows={3}
                  className={classes.formControl}
                  onChange={async (e) => handelOthers(e)}
                />
                {/* {error && error.others && (
                  <p>{error.others}</p>
                )} */}
              </Grid>

              <Grid item md={12}>
                <Box marginTop={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/hazardious-acts/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/cause-and-action/"
                    onClick={(e) => handelNext(e)}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>

            </Grid>
            <Grid item md={3}>
              {/* <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Hazardious conditions"}
              /> */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default HazardiousCondition;
