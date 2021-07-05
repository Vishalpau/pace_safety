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
import { useHistory, useParams } from 'react-router';
import { PapperBlock } from "dan-components";

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
import Type from "../../../styles/components/Fonts.scss"


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
  const history = useHistory();
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
    let nextPageLink = 0
    let callObjects = form
    for (let key in callObjects) {
      if (Object.keys(error).length == 0) {

        if (putId.current == "") {
          let postObject = { ...whyData, ...callObjects[key] }
          const res = await api.post(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/fivewhy/`, postObject);
          if (res.status == 201) {
            console.log("request done")
            nextPageLink = res.status
          }
        } else {
          let dataID = callObjects[key].whyId
          // delete callObjects[key].whyId
          let postObject = { ...whyData, ...callObjects[key] }
          if (typeof postObject != "undefined") {
            const res = await api.put(`/api/v1/incidents/${putId.current}/fivewhy/${dataID}/`, postObject);
            if (res.status == 200) {
              console.log("request done")
              nextPageLink = res.status
            }
          }
        }
      }
      if (nextPageLink == 201 && Object.keys(error).length == 0) {
        history.push(`/app/incident-management/registration/summary/summary/${localStorage.getItem("fkincidentId")}`)
      } else if ((nextPageLink == 200 && Object.keys(error).length == 0)) {
        history.push(`/app/incident-management/registration/summary/summary/${localStorage.getItem("fkincidentId")}`)
      }
    }
  }

  useEffect(() => {
    handelUpdateCheck();
    fetchIncidentData();
  }, []);



  const classes = useStyles();
  return (
    <PapperBlock title="Why Analysis" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident number
            </Typography>
            <Typography className={Type.labelValue}>
              {localStorage.getItem("fkincidentId")}
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Method
            </Typography>
            <Typography className={Type.labelValue}>
              5 Why Analysis
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Description
            </Typography>
            <Typography className={Type.labelValue}>
              {incidents.incidentDetails}
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Level of Investigation
            </Typography>
            <Typography className={Type.labelValue}>
              Level 5
            </Typography>
          </Grid>

          <Grid item md={12}>

            <TextField
              variant="outlined"
              id="filled-basic"
              label="Evidence Collection"
              multiline
              rows={3}
              className={classes.formControl}
            />
          </Grid>

          {form.map((item, index) => (
            <Grid item md={12} >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label={`Why ${index}`}
                    variant="outlined"
                    error={error[`why${[index]}`]}
                    value={form[index].why || ""}
                    helperText={error ? error[`why${[index]}`] : ""}
                    className={classes.formControl}
                    onChange={(e) => handleForm(e, index)}
                  />
                </Grid>
                {form.length > 1 ?

                  putId.current == "" ? <Grid item sm={1} justify="center">
                    <Fab size="small" color="primary" aria-label="remove">
                      <RemoveCircleOutlineIcon onClick={(e) => handelRemove(e, index)} />
                    </Fab>
                  </Grid> : null

                  : null}
              </Grid>
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
    </PapperBlock>
  );
};

export default WhyAnalysis;
