import React, { useEffect, useState, useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Col, Row } from "react-grid-system";

import api from "../../../utils/axios";
import WhyAnalysisValidate from "../../Validator/RCAValidation/WhyAnalysisValidation";
import { checkValue } from "../../../utils/CheckerValue";
import { LESSION_LEARNED_FORM } from "../../../utils/constants";


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
import Type from "../../../styles/components/Fonts.scss";

const WhyAnalysis = () => {
  const [incidents, setIncidents] = useState([]);
  const putId = useRef("");
  const [whyData, setWhyData] = useState({
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId:
      putId.current == ""
        ? localStorage.getItem("fkincidentId")
        : putId.current,
  });

  const [error, setError] = useState({});

  const history = useHistory();
  const [form, setForm] = useState([{ why: "", whyCount: "" }]);

  const updateIds = useRef();
  const checkPost = useRef();
  const [investigationData, setInvestigationData] = useState({})
  // get data and set to states
  const handelUpdateCheck = async () => {
    let tempApiData = {};
    let tempApiDataId = [];
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");

    let previousData = await api.get(
      `/api/v1/incidents/${incidentId}/fivewhy/`
    );
    let allApiData = previousData.data.data.results;

    if (allApiData.length > 0) {
      form.length = 0;
      putId.current = incidentId;
      allApiData.map((value) => {
        form.push({
          why: value.why,
          whyCount: value.whyCount,
          whyId: value.id,
        });
      });
      checkPost.current = false;
    }
    updateIds.current = tempApiDataId;
  };

  const handelInvestigationData = async () => {
    let incidentId = putId.current == "" ? localStorage.getItem("fkincidentId") : putId.current;
    const investigationpreviousData = await api.get(`api/v1/incidents/${incidentId}/investigations/`);
    const investigationApiData = investigationpreviousData.data.data.results[0];
    if (investigationApiData != null) {
      setInvestigationData({
        startData: investigationApiData.srartDate,
        endDate: investigationApiData.endDate,
        classification: investigationApiData.classification,
      })
    }
  };

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(`api/v1/incidents/${localStorage.getItem("fkincidentId")}/`);
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
    if (Object.keys(form).length < 100) {
      setForm([...form, { why: "", whyCount: "" }]);
    }
  };

  const handelRemove = async (e, index) => {
    let incidentId = putId.current == "" ? localStorage.getItem("fkincidentId") : putId.current;
    if (form.length > 1) {
      let temp = form;
      let newData = form.filter((item, key) => key !== index);
      if (form[index].whyId !== undefined) {
        const removeWhy = await api.delete(`/api/v1/incidents/${incidentId}/fivewhy/${form[index].whyId}/`);
      }
      await setForm(newData);
    }
  };

  const handelApiCall = async (e) => {
    const { error, isValid } = WhyAnalysisValidate(form);
    setError(error);
    let nextPageLink = 0;
    let callObjects = form;
    for (let key in callObjects) {
      if (Object.keys(error).length == 0) {
        if (callObjects[key]["whyId"] == undefined) {
          let postObject = { ...whyData, ...callObjects[key] };
          const res = await api.post(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/fivewhy/`, postObject);
          if (res.status == 201) {
            nextPageLink = res.status;
          }
        } else if (callObjects[key]["whyId"] !== undefined) {
          let dataID = callObjects[key].whyId;
          let postObject = { ...whyData, ...callObjects[key] };
          if (typeof postObject != "undefined") {
            const res = await api.put(`/api/v1/incidents/${putId.current}/fivewhy/${dataID}/`, postObject);
            if (res.status == 200) {
              nextPageLink = res.status;
            }
          }
        }
      }
      if (nextPageLink == 201 && Object.keys(error).length == 0) {
        let viewMode = {
          initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: true, lessionlearn: false

        }
        localStorage.setItem("viewMode", JSON.stringify(viewMode))
        history.push(
          `${LESSION_LEARNED_FORM["Lessons learnt"]}${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      } else if (nextPageLink == 200 && Object.keys(error).length == 0) {
        let viewMode = {
          initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: true, lessionlearn: false

        }
        localStorage.setItem("viewMode", JSON.stringify(viewMode))
        history.push(
          `${LESSION_LEARNED_FORM["Lessons learnt"]}${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      }
    }
    localStorage.setItem("RootCause", "Done");
  };

  const handelPrevious = () => {
    if (!isNaN(putId.current)) {
      history.push(`/app/incident-management/registration/root-cause-analysis/details/${putId.current}`);
    } else if (isNaN(putId.current)) {
      history.push(`/app/incident-management/registration/root-cause-analysis/details/`);
    }
  };



  const handelCallBack = async () => {
    await handelUpdateCheck();
    await fetchIncidentData();
    await handelInvestigationData();
  }

  useEffect(() => {
    handelCallBack()
  }, []);

  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Five why analysis" icon="ion-md-list-box">
      <Row>
        <Col md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>
              <Typography className={Type.labelValue}>
                {incidents.incidentNumber}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Method
              </Typography>
              <Typography className={Type.labelValue}>
                Five why analysis
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident Description
              </Typography>
              <Typography className={Type.labelValue}>
                {incidents.incidentDetails}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Level of classification
              </Typography>
              <Typography className={Type.labelValue}>
                {checkValue(investigationData["classification"])}
              </Typography>
            </Grid>

            {form.map((item, index) => (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={11}>
                    <TextField
                      id="filled-basic"
                      label={`Why ${index + 1}`}
                      variant="outlined"
                      multiline
                      required
                      rows={3}
                      error={error[`why${[index]}`]}
                      value={form[index].why || ""}
                      helperText={error ? error[`why${[index]}`] : ""}
                      className={classes.formControl}
                      onChange={(e) => handleForm(e, index)}
                    />
                  </Grid>
                  {form.length > 1 ? (
                    <Grid item xs={12} md={1} justify="center">
                      <IconButton onClick={(e) => handelRemove(e, index)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            ))}

            {form.length <= 99 ? (
              <Grid item xs={12} md={1}>
                {/* This button will add another entry of why input  */}
                <button
                  onClick={(e) => handelAdd(e)}
                  className={classes.textButton}
                >
                  <AddIcon /> Add
                </button>
              </Grid>
            ) : null}

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => handelPrevious(e)}
              >
                Previous
              </Button>
              <Button
                id="myBtn"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => handelApiCall(e)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Col>
        {isDesktop && (
          <Col md={3}>
            <FormSideBar
              listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
              selectedItem={"Five Why analysis"}
            />
          </Col>
        )}
      </Row>
    </PapperBlock>
  );
};

export default WhyAnalysis;
