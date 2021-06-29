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
import { useHistory, useParams } from 'react-router';

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import HazardiousActsValidation from "../../Validator/RCAValidation/HazardiousActsValidation"
import { call } from "file-loader";



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
  const putId = useRef("")
  const [fetchApiData, setFetchApiData] = useState({})
  const { id } = useParams();
  const history = useHistory();
  const updateIds = useRef()


  // get data and set to states
  const handelUpdateCheck = async () => {
    let allrcaSubType = ["Supervision", "Workpackage", "equipmentMachinery", "behaviourIssue", "safetyIssues", "ergonimics", "procedures", "otheracts"]
    let tempApiData = {}
    let tempApiDataId = []
    let page_url = window.location.href
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf('/') + 1))

    if (!isNaN(lastItem)) {
      let previousData = await api.get(`/api/v1/incidents/${lastItem}/pacecauses/`)
      putId.current = lastItem
      let allApiData = previousData.data.data.results

      allApiData.map(value => {
        if (allrcaSubType.includes(value.rcaSubType)) {
          let valueQuestion = value.rcaSubType
          let valueAnser = value.rcaRemark
          tempApiData[valueQuestion] = valueAnser
          tempApiDataId.push(value.id)
        }
      })
      updateIds.current = tempApiDataId.reverse()
      await setFetchApiData(tempApiData)

      // set fetched spervised data
      form.supervision.remarkType = "options"
      form.supervision.rcaSubType = "Supervision"
      form.supervision.rcaRemark = tempApiData.Supervision.includes(',') ? tempApiData.Supervision.split(",") : tempApiData.Supervision.split(" ")

      // set fetched workpackage data
      form.workpackage.remarkType = "options"
      form.workpackage.rcaSubType = "Workpackage"
      form.workpackage.rcaRemark = tempApiData.Workpackage.includes(',') ? tempApiData.Workpackage.split(",") : tempApiData.Workpackage.split(" ")

      // set fetched equiment machinary data
      form.equipmentMachinery.remarkType = "options"
      form.equipmentMachinery.rcaSubType = "equipmentMachinery"
      form.equipmentMachinery.rcaRemark = tempApiData.equipmentMachinery.includes(',') ? tempApiData.equipmentMachinery.split(",") : tempApiData.equipmentMachinery.split(" ")

      // set fetched behaviour issues data
      form.behaviourIssue.remarkType = "options"
      form.behaviourIssue.rcaSubType = "behaviourIssue"
      form.behaviourIssue.rcaRemark = tempApiData.behaviourIssue.includes(',') ? tempApiData.behaviourIssue.split(",") : tempApiData.behaviourIssue.split(" ")

      // set fetched safety issues data
      form.safetyIssues.remarkType = "options"
      form.safetyIssues.rcaSubType = "safetyIssues"
      form.safetyIssues.rcaRemark = tempApiData.safetyIssues.includes(',') ? tempApiData.safetyIssues.split(",") : tempApiData.safetyIssues.split(" ")

      // set fetched ergonimics data
      form.ergonimics.remarkType = "options"
      form.ergonimics.rcaSubType = "ergonimics"
      form.ergonimics.rcaRemark = tempApiData.ergonimics.includes(',') ? tempApiData.ergonimics.split(",") : tempApiData.ergonimics.split(" ")

      // set fetched procedures data
      form.procedures.remarkType = "options"
      form.procedures.rcaSubType = "procedures"
      form.procedures.rcaRemark = tempApiData.procedures.includes(',') ? tempApiData.procedures.split(",") : tempApiData.procedures.split(" ")

      // set fetched others data
      form.others.remarkType = "remark"
      form.others.rcaSubType = "otheracts"
      form.others.rcaRemark = tempApiData.otheracts
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
        rcaSubType: "otheracts",
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
    Object.entries(form).map((item, index) => {

      let api_data = item[1]
      let rcaRemark_one = api_data.rcaRemark

      // post request object
      if (putId.current == "") {
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
        setData(tempData)
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
          pk: updateIds.current[index]
        }
        tempData.push(temp)
        setData(tempData)
      }
    })
  }

  // api call
  const handelApiCall = async (e) => {
    let callObjects = data

    for (let key in callObjects) {
      if (Object.keys(error).length == 0) {
        if (putId.current !== "") {
          const res = await api.put(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/${callObjects[key].pk}/`, callObjects[key]);
          if (res.status == 201) {
            console.log("request done")
            console.log(res)
          }
        } else {
          const res = await api.post(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`, callObjects[key]);
          if (res.status == 201) {
            console.log("request done")
            console.log(res)
          }
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
        {/* {console.log(fetchApiData.Supervision !== "undefined" ? fetchApiData : "")} */}
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

              {/* supervision */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.supervision}>Supervision</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.supervision.rcaRemark.includes(value)}
                        onChange={async (e) => await handelSupervison(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.supervision && (
                  <p><small style={{ color: "red" }}>{error.supervision}</small></p>
                )}
              </Grid>

              {/* workpackage */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.workpackage}> Work package </FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.workpackage.rcaRemark.includes(value)}
                        onChange={async (e) => handelWorkpackage(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.workpackage && (
                  <p><small style={{ color: "red" }}>{error.workpackage}</small></p>
                )}
              </Grid>

              {/* equiment machinary     */}
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
                        checked={form.equipmentMachinery.rcaRemark.includes(value)}
                        onChange={async (e) => handelEquipmentMachinary(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.equipmentMachinery && (
                  <p><small style={{ color: "red" }}>{error.equipmentMachinery}</small></p>
                )}
              </Grid>

              {/* behaviour issues      */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.behaviourIssue}> Behaviour Issue</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={typeof fetchApiData.behaviourIssue !== "undefined" && fetchApiData.behaviourIssue.includes(value) ? true : false}
                        onChange={async (e) => handelBehaviousIssues(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.behaviourIssue && (
                  <p><small style={{ color: "red" }}>{error.behaviourIssue}</small></p>
                )}
              </Grid>

              {/* safety issues    */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.safetyIssues}> Saftey Items</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.safetyIssues.rcaRemark.includes(value)}
                        onChange={async (e) => handelSafetyIssues(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.safetyIssues && (
                  <p><small style={{ color: "red" }}>{error.safetyIssues}</small></p>
                )}
              </Grid>

              {/* ergonomics */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.procedures}>Ergohomics</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.ergonimics.rcaRemark.includes(value)}
                        onChange={async (e) => handelErgonomics(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.ergonimics && (
                  <p><small style={{ color: "red" }}>{error.ergonimics}</small></p>
                )}
              </Grid>

              {/* procedures */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.procedures}>Procedure</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.procedures.rcaRemark.includes(value)}
                        onChange={async (e) => handelProcedures(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.procedures && (
                  <p><small style={{ color: "red" }}>{error.procedures}</small></p>
                )}
              </Grid>

              {/* others */}
              <Grid item md={12}>
                <TextField
                  className={classes.formControl}
                  id="filled-basic"
                  label="Others"
                  variant="outlined"
                  multiline
                  error={error.others}
                  defaultValue={form.others.rcaRemark}
                  helperText={error ? error.others : ""}
                  rows={3}
                  onChange={async (e) => handelOthers(e)}
                />
              </Grid>

              {/* buttons */}
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
                    // href={Object.keys(error).length > 0 ? '#' : "/app/incident-management/registration/root-cause-analysis/hazardious-condtions/"}
                    onClick={async (e) => { await handelNext(e); await handelApiCall(e) }}
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
