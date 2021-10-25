import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PapperBlock } from "dan-components";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useHistory, useParams } from "react-router-dom";
import Type from "../../../styles/components/Fonts.scss";
import api from "../../../utils/axios";
import { EVIDENCE_FORM } from "../../../utils/constants";
import ActivityDetailValidate from "../../Validator/ActivityDetailValidation";
import FormSideBar from "../FormSideBar";


const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    margin: theme.spacing(1),
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
    flexBasis: "100%",
  },
}));
const ActivityDetails = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [error, setError] = useState();
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isNext, setIsNext] = useState(true)
  const [incidentDetail, setIncidentDetail] = useState({});
  const [activtyList, setActvityList] = useState([
    {
      questionCode: "AD-01",
      question: "Did the job require work permit?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-02",
      question: "If yes, was a permit completed prior of the job?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-03",
      question: "Was pre-job safety discussion held?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-04",
      question: "Was JHA executed for the task?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-05",
      question: "Was FLHA executed for the task?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-06",
      question: "Did pre-planning identify the hazard?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-07",
      question: "Was pre-zone planning enhanced the post-event?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
  ]);

  const fetchActivityList = async () => {
    await api.get(`/api/v1/incidents/${id}/activities/`)
    .then((res)=>{
      const result = res.data.data.results;
      if (result.length) {
        setActvityList(result);
      }
      setIsLoading(true);
    })
    .catch(()=>{history.push("/app/pages/error")})
  };

  const fetchActivityData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`
    ).then((res)=>{
      const result = res.data.data.results;
      if (result.length) {
        let temp = [...activtyList];
        temp = result;
        setActvityList(temp);
      }
      if (!id) {
        setIsLoading(true);
      }
    }).catch(()=>{history.push("/app/pages/error")})
    
  };

  const handleNext = async () => {
    await setIsNext(false)
    if (id && activtyList.length > 0 && activtyList[0].id) {
      try{
      const res = await api.put(
        `api/v1/incidents/${id}/activities/`,
        activtyList
      );
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/evidence/personal-and-ppedetails/${id}`
        );
      }
    }catch(err){setIsNext(true)}
    } else if (
      localStorage.getItem("fkincidentId") &&
      activtyList.length > 6 &&
      activtyList[0].id
    ) {
      try{
      const res = await api.put(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        activtyList
      );
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/evidence/personal-and-ppedetails/`
        );
      }
    }catch(err){setIsNext(true)}
    } else {
      try{
      const { error, isValid } = ActivityDetailValidate(activtyList);
      await setError(error);
      if (!isValid) {
        setIsNext(true)
        return;
      }
      const res = await api.post(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        activtyList
      );
      history.push(
        "/app/incident-management/registration/evidence/personal-and-ppedetails/"
      );
    }catch(err){setIsNext(true)}
    }
  };

  const handleRadioData = (e, questionCode) => {
    let TempActivity = [];
    for (let key in activtyList) {
      let activityObj = activtyList[key];
      if (questionCode == activityObj.questionCode) {
        activityObj.answer = e.target.value;
      }
      TempActivity.push(activityObj);
    }
    setActvityList(TempActivity);
  };

  const fetchIncidentDetails = async () => {
    await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    ).then((res)=>{
      const result = res.data.data.results;
      setIncidentDetail(result);
    }).catch(err=>history.push("/app/pages/error"))
    
  };

  useEffect(() => {
    fetchActivityData();
    fetchIncidentDetails();
    if (id) {
      fetchActivityList();
    }
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Activity Details" icon="ion-md-list-box">
      {isLoading ? (
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  className={Type.labelName}
                  gutterBottom
                >
                  Incident number
                </Typography>
                <Typography className={Type.labelValue}>
                  {incidentDetail.incidentNumber}
                </Typography>
              </Grid>
              {activtyList.length ? (
                <>
                  {Object.entries(activtyList)
                    .slice(0, 7)
                    .map(([key, value]) => (
                      <Grid item xs={12} md={6}>
                        <FormControl
                          component="fieldset"
                          required
                          className={classes.formControl}
                          error={value.error}
                        >
                          <FormLabel component="legend">
                            {value.question}
                          </FormLabel>
                          <RadioGroup
                            className={classes.inlineRadioGroup}
                            defaultValue={value.answer || false}
                            onChange={(e) => {
                              handleRadioData(e, value.questionCode);
                            }}
                            // defaultValue={value.answer}
                          >
                            {radioDecide.map((value) => (
                              <FormControlLabel
                                value={value}
                                control={<Radio />}
                                label={value}
                              />
                            ))}
                          </RadioGroup>
                          ​
                          {value.error ? (
                            <FormHelperText>{value.error}</FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>
                    ))}
                </>
              ) : null}
              <Grid item md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    history.push(
                      `/app/incident-management/registration/evidence/evidence/${localStorage.getItem(
                        "fkincidentId"
                      )}`
                    );
                  }}
                  // href="/app/incident-management/registration/evidence/evidence/"
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => handleNext()}
                  disabled={!isNext}
                  // href={Object.keys(error).length == 0 ? "http://localhost:3000/app/incident-management/registration/evidence/personal-and-ppedetails/" : "#"}
                >
                  Next{isNext?null:<CircularProgress size={20}/>}
                </Button>
              </Grid>
            </Grid>
          </Col>
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={EVIDENCE_FORM}
                selectedItem="Activity details"
              />
            </Col>
          )}
        </Row>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};
export default ActivityDetails;
