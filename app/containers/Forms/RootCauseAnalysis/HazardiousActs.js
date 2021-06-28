import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, Container } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
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

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import HazardiousActsValidation from "../../Validator/RCAValidation/HazardiousActsValidation"



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
    supervision: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    workpackage: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    equipmentMachinery: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    behaviourIssue: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    safetyIssues: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    ergonimics: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    procedures: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    others: { remarkType: "", rcaSubType: "", rcaRemark: "" }
  }
  )

  const [error, setError] = useState({})
  const [data, setData] = useState([])
  const checkUpdate = useRef(false);
  const paceCauseData = useRef()

  const handelUpdateCheck = async () => {
    let page_url = window.location.href
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf('/') + 1))

    if (!isNaN(lastItem)) {
      checkUpdate.current = true;
      let previousData = await api.get(`/api/v1/incidents/${lastItem}/pacecauses/`)
      paceCauseData.current = previousData.data.data.results
      console.log(paceCauseData)
    }

  }

  const handelSupervison = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.supervision.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, supervision: {
          remarkType: "options",
          rcaSubType: "Supervision",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, supervision: {
          remarkType: "options",
          rcaSubType: "Supervision",
          rcaRemark: [...form.supervision.rcaRemark, value],
        }
      })
    }
  }

  const handelWorkpackage = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.workpackage.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, workpackage: {
          remarkType: "options",
          rcaSubType: "Workpackage",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, workpackage: {
          remarkType: "options",
          rcaSubType: "Workpackage",
          rcaRemark: [...form.workpackage.rcaRemark, value],
        }
      })
    }
  }

  const handelEquipmentMachinary = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.equipmentMachinery.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, equipmentMachinery: {
          remarkType: "options",
          rcaSubType: "equipmentMachinery",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, equipmentMachinery: {
          remarkType: "options",
          rcaSubType: "equipmentMachinery",
          rcaRemark: [...form.equipmentMachinery.rcaRemark, value],
        }
      })
    }
  }

  const handelBehaviousIssues = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.behaviourIssue.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, behaviourIssue: {
          remarkType: "options",
          rcaSubType: "behaviourIssue",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, behaviourIssue: {
          remarkType: "options",
          rcaSubType: "behaviourIssue",
          rcaRemark: [...form.behaviourIssue.rcaRemark, value],
        }
      })
    }
  }

  const handelSafetyIssues = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.safetyIssues.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, safetyIssues: {
          remarkType: "options",
          rcaSubType: "safetyIssues",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, safetyIssues: {
          remarkType: "options",
          rcaSubType: "safetyIssues",
          rcaRemark: [...form.safetyIssues.rcaRemark, value],
        }
      })
    }
  }

  const handelErgonomics = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.ergonimics.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, ergonimics: {
          remarkType: "options",
          rcaSubType: "ergonimics",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, ergonimics: {
          remarkType: "options",
          rcaSubType: "ergonimics",
          rcaRemark: [...form.ergonimics.rcaRemark, value],
        }
      })
    }
  }

  const handelProcedures = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.procedures.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, procedures: {
          remarkType: "options",
          rcaSubType: "procedures",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, procedures: {
          remarkType: "options",
          rcaSubType: "procedures",
          rcaRemark: [...form.procedures.rcaRemark, value],
        }
      })
    }
  }

  const handelOthers = (e) => {
    setForm({
      ...form, others: {
        remarkType: "remark",
        rcaSubType: "others",
        rcaRemark: e.target.value
      }
    })
  }

  const selectValues = ["Option1", "Option2", "...."];

  const classes = useStyles();

  const handelNext = (e) => {

    const { error, isValid } = HazardiousActsValidation(form);
    setError(error);

    let tempData = []
    Object.entries(form).map((item) => {
      let api_data = item[1]
      let rcaRemark_one = api_data.rcaRemark
      console.log(item)
      let temp = {
        createdBy: "0",
        fkIncidentId: localStorage.getItem("fkincidentId"),
        rcaRemark: api_data["rcaRemark"].toString(),
        rcaSubType: api_data["rcaSubType"],
        rcaType: "Basic",
        remarkType: api_data["remarkType"],
        status: "Active"
      }
      tempData.push(temp)

    })
    setData(tempData)
  }

  const handelApiCall = async (e) => {
    let callObjects = data

    for (let key in callObjects) {
      console.log(callObjects[key])
      if (Object.keys(error).length == 0) {
        const res = await api.post(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`, callObjects[key]);
        if (res.status == 201) {
          console.log("request done")
          console.log(res)
        }
      }
    }
  }


  useEffect(() => {
    handelUpdateCheck()
  }, []);

  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Typography variant="h6" gutterBottom>
            Immediate Causes - Hazardous acts
          </Typography>
          <Box marginBottom={4} borderBottom={1}>
            <Typography variant="body2" gutterBottom>
              Incident number: {localStorage.getItem("fkincidentId")}
            </Typography>
          </Box>
          <Grid container spacing={3}>

            <Grid container item md={9} spacing={3}>
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.supervision}>Supervision</FormLabel>

                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelSupervison(e, value)}
                      />
                    ))}

                  </FormGroup>
                </FormControl>
                {error && error.supervision && (
                  <p><small style={{ color: "red" }}>{error.supervision}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.workpackage}> Work package </FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelWorkpackage(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.workpackage && (
                  <p><small style={{ color: "red" }}>{error.workpackage}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.equipmentMachinery}>
                    {" "}
                    Equiptment & Machinery
                  </FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelEquipmentMachinary(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.equipmentMachinery && (
                  <p><small style={{ color: "red" }}>{error.equipmentMachinery}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.behaviourIssue}> Behaviour Issue</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelBehaviousIssues(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.behaviourIssue && (
                  <p><small style={{ color: "red" }}>{error.behaviourIssue}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.safetyIssues}> Saftey Items</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelSafetyIssues(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.safetyIssues && (
                  <p><small style={{ color: "red" }}>{error.safetyIssues}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.procedures}>Ergohomics</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelErgonomics(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.ergonimics && (
                  <p><small style={{ color: "red" }}>{error.ergonimics}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.procedures}>Procedure</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        onChange={async (e) => handelProcedures(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.procedures && (
                  <p><small style={{ color: "red" }}>{error.procedures}</small></p>
                )}
              </Grid>

              <Grid item md={12}>
                {/* <p>others</p> */}
                <TextField
                  className={classes.formControl}
                  id="filled-basic"
                  label="Others"
                  variant="outlined"
                  multiline
                  error={error.others}
                  helperText={error ? error.others : ""}
                  rows={3}
                  onChange={async (e) => handelOthers(e)}
                />
              </Grid>

              <Grid item md={12}>
                <Box marginTop={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/details/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href={Object.keys(error).length > 0 ? '#' : "/app/incident-management/registration/root-cause-analysis/hazardious-condtions/"}
                    onClick={(e) => { handelNext(e); handelApiCall(e) }}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Hazardious acts"}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default HazardiousActs;
