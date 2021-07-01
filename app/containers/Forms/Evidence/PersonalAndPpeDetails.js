import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import { PapperBlock } from "dan-components";

import { useHistory, useParams } from "react-router";
import moment from "moment";
import api from "../../../utils/axios";

import PersonalAndPpeDetailValidate from "../../Validator/PersonalAndPpeDetailValidation";

import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import Type from "../../../styles/components/Fonts.scss";

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
  },
  button: {
    margin: theme.spacing(1),
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
}));

const PersonalAndPpeDetails = () => {
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const [error, setError] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [activtyList, setActvityList] = useState([]);
  const [ad08, setAd08] = useState({});
  const [ad09, setAd09] = useState({});
  const [ad10, setAd10] = useState({});
  const [ad11, setAd11] = useState({});
  const [ad12, setAd12] = useState({});
  const [ad13, setAd13] = useState({});
  const [ad14, setAd14] = useState({});
  const [ad15, setAd15] = useState({});
  const [ad16, setAd16] = useState({});
  const [ad17, setAd17] = useState({});
  const [ad18, setAd18] = useState({});
  const [ad19, setAd19] = useState({});
  const [ad20, setAd20] = useState({});
  const [ad21, setAd21] = useState({});

  const handleNext = async () => {
    if (id !== undefined && activtyList.length > 0) {
      history.push(
        "/app/incident-management/registration/evidence/personal-and-ppedetails/"
      );
    } else {
      const selectedQuestion = [
        ad08,
        ad09,
        ad10,
        ad11,
        ad12,
        ad13,
        ad14,
        ad15,
        ad16,
        ad17,
        ad18,
        ad19,
        ad20,
        ad21,
      ];
      console.log(selectedQuestion);
      for (let i = 0; i < selectedQuestion.length; i++) {
        const valdation = selectedQuestion[i];
        console.log(valdation);
        // const { isValid, error } = ActivityDetailValidate(valdation);
        setError(error);
        // const res = await api.post(`api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        //   selectedQuestion[i]
        // );
        // console.log(res);
      }
      // history.push("/app/incident-management/registration/evidence/personal-and-ppedetails/")
      // }
      history.push(
        "/app/incident-management/registration/evidence/personal-and-ppedetails/"
      );
    }
  };

  const handleUpdateActivityList = async (e, key, fieldname, activityId) => {
    const temp = activtyList;
    console.log(temp);
    const { value } = e.target;
    temp[key][fieldname] = value;
    temp[key].updatedBy = 0;
    temp[key].updatedAt = moment(new Date()).toISOString();
    console.log(temp[key]);

    const res = await api.put(
      `api/v1/incidents/${id}/activities/${activityId}/`,
      temp[key]
    );
    console.log(res);
  };

  const fetchActivityList = async () => {
    const res = await api.get(`api/v1/incidents/${id}/activities/`);
    const result = res.data.data.results;
    await setActvityList(result);
    console.log(result);
  };
  useEffect(() => {
    fetchActivityList();
  }, []);

  return (
    <PapperBlock title=" Personal and PPE" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident number
            </Typography>
            <Typography className={Type.labelValue}>989542468</Typography>
          </Grid>
          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.ppeans1}
            >
              <FormLabel component="legend">PPE Worn Properly ?</FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd08({
                    ...ad08,
                    questionCode: "PPE-08",
                    question: "PPE Worn Properly?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.ppeans2}
            >
              <FormLabel component="legend">PPE in Good Shape ?</FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd09({
                    ...ad09,
                    questionCode: "PPE-09",
                    question: "PPE in Good Shape ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.ppeans3}
            >
              <FormLabel component="legend">PPE Proper Fit ?</FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd09({
                    ...ad10,
                    questionCode: "PPE-10",
                    question: "PPE Proper Fit ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.ppeans4}
            >
              <FormLabel component="legend">
                PPE Appropriate For Task ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd11({
                    ...ad11,
                    questionCode: "PPE-11",
                    question: "PPE Appropriate For Task ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6">Supervision</Typography>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.supervisionans1}
            >
              <FormLabel component="legend">
                Employee Self Supervised ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd12({
                    ...ad12,
                    questionCode: "PPE-12",
                    question: "Employee Self Supervised ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            {/* <p>Supervisor present at site</p> */}

            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.supervisionans2}
            >
              <FormLabel component="legend">
                Supervisor Present at Site ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd13({
                    ...ad13,
                    questionCode: "PPE-13",
                    question: "Supervisor Present at Site ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.supervisionans3}
            >
              <FormLabel component="legend">
                Supervisor Provided Clear Detail of Work ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd14({
                    ...ad14,
                    questionCode: "PPE-14",
                    question: "Supervisor Provided Clear Detail of Work ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.supervisionans4}
            >
              <FormLabel component="legend">
                Supervisor Provided Detail Work Package ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd15({
                    ...ad15,
                    questionCode: "PPE-15",
                    question: "Supervisor Provided Detail Work Package ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.supervisionans5}
            >
              <FormLabel component="legend">
                Did Supervisor Conducted I-care Observation ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd16({
                    ...setAd16,
                    questionCode: "PPE-16",
                    question: " Did Supervisor Conducted I-care Observation ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6">Flag Person</Typography>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.flagans1}
            >
              <FormLabel component="legend">
                Was Flag Person Required For this Job ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd17({
                    ...setAd17,
                    questionCode: "PPE-17",
                    question: " Was Flag Person Required For this Job ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.flagans2}
            >
              <FormLabel component="legend">
                Flag Person Trained/Competent ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd18({
                    ...setAd18,
                    questionCode: "PPE-18",
                    question: "  Flag Person Trained/Competent ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.flagans3}
            >
              <FormLabel component="legend">
                Was Flag Person Present ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd19({
                    ...setAd19,
                    questionCode: "PPE-19",
                    question: "Was Flag Person Present ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Box marginBottom={3} marginTop={4}>
              <Typography variant="h6">Other</Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.otherans1}
            >
              <FormLabel component="legend">
                Metal on Metal Incident ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd20({
                    ...setAd20,
                    questionCode: "PPE-20",
                    question: "Metal on Metal Incident ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={error.otherans2}
            >
              <FormLabel component="legend">
                Was Person in the Line of Fire ?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                onChange={(e) => {
                  setAd21({
                    ...setAd21,
                    questionCode: "PPE-21",
                    question: "Was Person in the Line of Fire ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="/app/incident-management/registration/evidence/activity-detail/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handleNext()}
              // href={Object.keys(error).length == 0 ? "http://localhost:3000/app/incident-management/registration/evidence/additional-details/" : "#"}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            listOfItems={EVIDENCE_FORM}
            selectedItem="Personal and Ppedetails"
            deleteForm={[1, 2, 3]}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default PersonalAndPpeDetails;
