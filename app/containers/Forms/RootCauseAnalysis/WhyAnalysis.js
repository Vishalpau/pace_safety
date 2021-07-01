import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import RemoveCircleOutlineSharpIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Fab from "@material-ui/core/Fab";

import api from "../../../utils/axios";
import WhyAnalysisValidate from "../../Validator/RCAValidation/WhyAnalysisValidation"


const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
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

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";


const WhyAnalysis = () => {

  const [incidents, setIncidents] = useState([]);
  const putId = useRef("")
  const [whyData, setWhyData] = useState({
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: putId.current == "" ? localStorage.getItem("fkincidentId") : putId.current
  })

  const [error, setError] = useState({})

  const [data, setData] = useState([])

  const [form, setForm] = useState([
    { why: "", whyCount: "" }
  ])

  const updateIds = useRef()


  // get data and set to states
  const handelUpdateCheck = async () => {
    let tempApiData = {}
    let tempApiDataId = []
    let page_url = window.location.href
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf('/') + 1))

    if (!isNaN(lastItem)) {
      form.length = 0
      let previousData = await api.get(`/api/v1/incidents/${lastItem}/fivewhy/`)
      putId.current = lastItem
      let allApiData = previousData.data.data.results
      allApiData.map((value) => {
        form.push({ why: value.why, whyCount: value.whyCount, whyId: value.id })
      })
    }
    updateIds.current = tempApiDataId
  }


  const fetchIncidentData = async () => {
    const allIncidents = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    await setIncidents(allIncidents.data.data.results);
  };

  const handleForm = (e, key) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key]["why"] = value;
    temp[key]["whyCount"] = key;
    setForm(temp);
  };

  const handelAdd = (e) => {
    if (Object.keys(form).length < 5) {
      setForm([
        ...form, { why: "", }])
    }
  }

  const handelRemove = async (e, index) => {
    if (form.length > 1) {
      let temp = form
      let newData = form.filter((item, key) => key !== index)
      await setForm(newData)
    }
  }

  const handelApiCall = async (e) => {

    let callObjects = form
    for (let key in callObjects) {
      if (Object.keys(error).length == 0) {

        if (putId.current == "") {
          let postObject = { ...whyData, ...callObjects[key] }
          const res = await api.post(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/fivewhy/`, postObject);
          if (res.status == 201) {
            console.log("request done")
            console.log(res)
          }
        } else {
          let dataID = callObjects[key].whyId
          // delete callObjects[key].whyId
          let postObject = { ...whyData, ...callObjects[key] }
          if (typeof postObject != "undefined") {
            const res = await api.put(`/api/v1/incidents/${putId.current}/fivewhy/${dataID}/`, postObject);
            if (res.status == 200) {
              console.log("request done")
              console.log(res)
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    handelUpdateCheck();
    fetchIncidentData();
  }, []);



  const classes = useStyles();
  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              5 Why Analysis
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
                    Method: 5 Why Analysis
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={12}>
                <Typography variant="h6" gutterBottom>
                  Incident Description:<small>{incidents.incidentDetails}</small>
                </Typography>

                <Box marginTop={3}>
                  <Typography variant="h6" gutterBottom>
                    Level of Investigation
                  </Typography>
                  <Typography variant="body2">Level 5</Typography>
                </Box>
              </Grid>

              <Grid item md={12}>
                {/* <p>Evidence collection</p> */}
                <TextField
                  variant="outlined"
                  id="filled-basic"
                  label="Evidence collection"
                  multiline
                  rows={3}
                  className={classes.formControl}
                />
              </Grid>

              {form.map((item, index) => (
                <Grid item md={12} >
                  <Grid container spacing={2}>

                    <Grid item sm={11}>
                      <TextField
                        id="filled-basic"
                        label={`why ${index}`}
                        variant="outlined"
                        error={error[`why${[index]}`]}
                        defaultValue={form[index].why}
                        helperText={error ? error[`why${[index]}`] : ""}
                        className={classes.formControl}
                        onChange={(e) => handleForm(e, index)}
                      />
                    </Grid>
                    {form.length > 1 ?

                      putId.current == "" ? <Grid item sm={1} justify="center">
                        <Fab size="small" color="secondary" aria-label="remove">
                          <RemoveCircleOutlineIcon onClick={(e) => handelRemove(e, index)} />
                        </Fab>
                      </Grid> : null

                      : null}
                  </Grid>
                  {/* {error && error[`why${[index]}`] && (
                    <p>{error[`why${[index]}`]}</p>
                  )} */}
                </Grid>
              ))}


              <Grid item md={12}>
                {/* This button will add another entry of why input  */}
                {putId.current == "" ?
                  <button onClick={(e) => handelAdd(e)} className={classes.textButton}>
                    <AddIcon /> Add
                  </button>
                  : null}

              </Grid>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/root-cause-analysis/"
                >
                  Previous
                </Button>
                <Button
                  id="myBtn"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  // href={Object.keys(error).length > 0 ? '#' : `/app/incident-management/registration/summary/summary/${localStorage.getItem("fkincidentId")}`}
                  onClick={(e) => handelApiCall(e)}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              Sidebar
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container >
  );
};

export default WhyAnalysis;
