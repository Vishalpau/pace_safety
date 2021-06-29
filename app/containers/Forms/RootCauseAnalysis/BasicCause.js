import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import BasicCauseValidation from "../../Validator/RCAValidation/BasicCauseValidation"

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const BasicCause = () => {
  const [commonForm, setCommonForm] = useState({
    rcaNumber: "string",
    rcaType: "string",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: parseInt(localStorage.getItem("fkincidentId"))
  })


  const [error, setError] = useState({})

  const [data, setData] = useState([])

  const [form, setForm] = useState({
    personal: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    wellnessFactors: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    otherHumanFactor: { remarkType: "", rcaSubType: "", rcaRemark: "" },
    leadership: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    processes: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    otherJobFactors: { remarkType: "", rcaSubType: "", rcaRemark: "" }
  }
  )

  const handelPersonal = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.personal.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, personal: {
          remarkType: 'options',
          rcaSubType: "personal",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, personal: {
          remarkType: 'options',
          rcaSubType: "personal",
          rcaRemark: [...form.personal.rcaRemark, value],
        }
      })
    }
  }

  const handelWellnessFactors = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.wellnessFactors.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, wellnessFactors: {
          remarkType: 'options',
          rcaSubType: "wellnessFactors",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, wellnessFactors: {
          remarkType: 'options',
          rcaSubType: "wellnessFactors",
          rcaRemark: [...form.wellnessFactors.rcaRemark, value],
        }
      })
    }
  }

  const handelOtherHumanFactors = (e) => {
    setForm({
      ...form, otherHumanFactor: {
        remarkType: 'remark',
        rcaSubType: "others human factors",
        rcaRemark: e.target.value
      }
    })
  }

  const handelLeadership = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.leadership.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, leadership: {
          remarkType: 'options',
          rcaSubType: "leadership",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, leadership: {
          remarkType: 'options',
          rcaSubType: "leadership",
          rcaRemark: [...form.leadership.rcaRemark, value],
        }
      })
    }
  }

  const handelProcesses = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.processes.rcaRemark.filter(item => item !== value)
      setForm({
        ...form, processes: {
          remarkType: 'options',
          rcaSubType: "processes",
          rcaRemark: newData,
        }
      })
    } else {
      setForm({
        ...form, processes: {
          remarkType: 'options',
          rcaSubType: "processes",
          rcaRemark: [...form.processes.rcaRemark, value],
        }
      })
    }
  }

  const handelOtherJobFactors = (e) => {
    setForm({
      ...form, otherJobFactors: {
        remarkType: 'remark',
        rcaSubType: "others job factors",
        rcaRemark: e.target.value
      }
    })
  }

  const selectValues = ["Option1", "Option2", "...."];

  const classes = useStyles();

  const handelNext = (e) => {

    const { error, isValid } = BasicCauseValidation(form);
    setError(error);

    let tempData = []
    Object.entries(form).map((item) => {
      let api_data = item[1]

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

  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">

            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Basic Cause
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>

                <Grid item md={4}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Incident number:  {localStorage.getItem("fkincidentId")}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={4}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      RCA Method: PACE Cause Analysis
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={12}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Human Factors
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" error={error.personal}>Personal</FormLabel>
                    <FormGroup>

                      {selectValues.map((value) => (
                        <FormControlLabel
                          control={<Checkbox name={value} />}
                          label={value}
                          onChange={async (e) => handelPersonal(e, value)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  {error && error.personal && (
                    <p><small style={{ color: "red" }}>{error.personal}</small></p>
                  )}
                </Grid>

                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" error={error.wellnessFactors}>Wellness factors</FormLabel>
                    <FormGroup>

                      {selectValues.map((value) => (
                        <FormControlLabel
                          control={<Checkbox name={value} />}
                          label={value}
                          onChange={async (e) => handelWellnessFactors(e, value)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  {error && error.wellnessFactors && (
                    <p><small style={{ color: "red" }}>{error.wellnessFactors}</small></p>
                  )}
                </Grid>

                <Grid item md={12}>
                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    multiline
                    rows={4}
                    label="Other Human Factors"
                    error={error.otherHumanFactor}
                    helperText={error ? error.otherHumanFactor : ""}
                    className={classes.formControl}
                    onChange={async (e) => handelOtherHumanFactors(e)}
                  />
                  {/* {error && error.otherHumanFactor && (
                    <p>{error.otherHumanFactor}</p>
                  )} */}
                </Grid>

                <Grid item md={12}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Job Factors
                    </Typography>
                  </Box>
                </Grid>


                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" error={error.leadership}>Leadership</FormLabel>
                    <FormGroup>

                      {selectValues.map((value) => (
                        <FormControlLabel
                          control={<Checkbox name={value} />}
                          label={value}
                          onChange={async (e) => handelLeadership(e, value)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  {error && error.leadership && (
                    <p><small style={{ color: "red" }}>{error.leadership}</small></p>
                  )}
                </Grid>



                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" error={error.processes}>Processes</FormLabel>
                    <FormGroup>

                      {selectValues.map((value) => (
                        <FormControlLabel
                          control={<Checkbox name={value} />}
                          label={value}
                          onChange={async (e) => handelProcesses(e, value)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  {error && error.processes && (
                    <p><small style={{ color: "red" }}>{error.processes}</small></p>
                  )}
                </Grid>


                <Grid item md={12}>
                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    multiline
                    error={error.otherJobFactors}
                    helperText={error ? error.otherJobFactors : ""}
                    rows={3}
                    label="Other job factors"
                    className={classes.formControl}
                    onChange={async (e) => handelOtherJobFactors(e)}
                  />
                  {/* {error && error.otherJobFactors && (
                    <p>{error.otherJobFactors}</p>
                  )} */}
                </Grid>

                <Grid item md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/cause-and-action/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // href={Object.keys(error).length > 0 ? '#' : "/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/"}
                    onClick={(e) => { handelNext(e); handelApiCall(e) }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  deleteForm={[1, 2, 3]}
                  listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                  selectedItem={"Basic cause"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default BasicCause;
