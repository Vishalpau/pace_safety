import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PapperBlock } from "dan-components";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
// Redux
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { tabViewMode } from "../../../redux/actions/initialDetails";
import Type from "../../../styles/components/Fonts.scss";
import api from "../../../utils/axios";
import { EVIDENCE_FORM, SUMMERY_FORM } from "../../../utils/constants";
import AdditionalDetailValidate from "../../Validator/AdditionalDetailsValidation";
import FormSideBar from "../FormSideBar";



const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    "& .MuiInputLabel-outlined": {
      right: "20px",
      lineHeight: "1.2",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AdditionalDetails = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [error, setError] = React.useState({});

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [additionalDetailList, setAdditionalDetailList] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isNext, setIsNext] = useState(true);
  const [incidentDetail, setIncidentDetail] = useState({});
  const [additionalList, setAdditionalList] = useState([
    {
      questionCode: "ADD-22",
      question: "Any part/equipment sent for analysis",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "ADD-23",
      question: "Evidence analysis notes",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "ADD-24",
      question: "Evidence summary",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "ADD-25",
      question: "Additional notes if any",
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
    let lastId = id ? id : localStorage.getItem("fkincidentId");
    const res = await api.get(`/api/v1/incidents/${lastId}/activities/`)
    .then((res)=>{
      const result = res.data.data.results;
      if (result.length) {
         setAdditionalDetailList(result);
      }
       setIsLoading(true);
    })
    
  };


  const handleNext = async () => {
    setIsNext(false)
    if(incidentDetail.incidentStage === "Evidence"){
      try {
        const temp = incidentDetail
        temp.updatedAt = new Date().toISOString();
        temp.incidentStatus= "Done"
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );
      } catch (error) {
        history.push("/app/pages/error")
      }
    }

    if (id && additionalDetailList.length > 24) {
      try{
      const { error, isValid } = AdditionalDetailValidate(additionalDetailList);
      await setError(error);
      if (!isValid) {
        setIsNext(true)
        return;
      }
      const res = await api.put(
        `api/v1/incidents/${id}/activities/`,
        additionalDetailList
      );
      if (res.status === 200) {
        let viewMode = {
          initialNotification: false,
          investigation: false,
          evidence: true,
          rootcauseanalysis: false,
          lessionlearn: false,
        };
        dispatch(tabViewMode(viewMode));
        history.push(
          `${SUMMERY_FORM["Summary"]}${localStorage.getItem("fkincidentId")}`
        );
      }
    }catch(err){setIsNext(true)}
    } else if (additionalDetailList.length == 25) {
      {
        try{
        const { error, isValid } = AdditionalDetailValidate(additionalList);
        await setError(error);
        if (!isValid) {
          setIsNext(true)
          return;
        }
        const res = await api.put(
          `api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/activities/`,
          additionalDetailList
        );
        if (res.status === 200) {
          let viewMode = {
            initialNotification: false,
            investigation: false,
            evidence: true,
            rootcauseanalysis: false,
            lessionlearn: false,
          };
          dispatch(tabViewMode(viewMode));
          history.push(
            `${SUMMERY_FORM["Summary"]}${localStorage.getItem("fkincidentId")}`
          );
        }
      }catch(err){setIsNext(true)}
      }
    } else {
      try{
      const { error, isValid } = AdditionalDetailValidate(additionalList);
      await setError(error);
      if (!isValid) {
        setIsNext(true)
        return;
      }

      const res = await api.post(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        additionalList
      );
      let viewMode = {
        initialNotification: false,
        investigation: false,
        evidence: true,
        rootcauseanalysis: false,
        lessionlearn: false,
      };
      dispatch(tabViewMode(viewMode));
      history.push(
        `${SUMMERY_FORM["Summary"]}${localStorage.getItem("fkincidentId")}`
      );
      }catch(err){
        setIsNext(true)
      }
    }
  };

  const handleRadioData = (e, questionCode) => {
    let TempActivity = [];
    for (let key in additionalDetailList) {
      let activityObj = additionalDetailList[key];
      if (questionCode == activityObj.questionCode) {
        activityObj.answer = e.target.value;
      }
      TempActivity.push(activityObj);
    }
    setAdditionalDetailList(TempActivity);
  };

  const handleRadioData2 = (e, questionCode) => {
    let TempActivity = [];
    for (let key in additionalList) {
      let activityObj = additionalList[key];
      if (questionCode == activityObj.questionCode) {
        activityObj.answer = e.target.value;
      }
      TempActivity.push(activityObj);
    }
    setAdditionalList(TempActivity);
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    ).then((res)=>{
      const result = res.data.data.results;
     setIncidentDetail(result);
    })
    .catch(()=>{})  
  };
  useEffect(() => {
    fetchIncidentDetails();

    if (id) {
      fetchActivityList();
    } else {
      setIsLoading(true);
      fetchActivityList();
    }
  }, [id]);
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Additional Details" icon="ion-md-list-box">
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
              {additionalDetailList.length > 24 ? (
                <>
                  {Object.entries(additionalDetailList)
                    .slice(21, 25)
                    .map(([key, value]) => (
                      <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="filled-basic"
                            variant="outlined"
                            label={value.question}
                            required={
                              value.question === "Additional notes if any"
                                ? false
                                : true
                            }
                            error={value.error}
                            helperText={value.error ? value.error : null}
                            multiline
                            rows="4"
                            value={value.answer||""}
                            onChange={(e) => {
                              handleRadioData(e, value.questionCode);
                            }}
                          />
                        </FormControl>
                      </Grid>
                    ))}
                </>
              ) : (
                <>
                  {Object.entries(additionalList).map(([key, value]) => (
                    <Grid item xs={12}>
                      <FormControl
                        className={classes.formControl}
                        error={value.error}
                      >
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label={value.question}
                          error={value.error}
                          required={
                            value.question === "Additional notes if any"
                              ? false
                              : true
                          }
                          helperText={value.error ? value.error : null}
                          multiline
                          rows="4"
                          onChange={(e) => {
                            handleRadioData2(e, value.questionCode);
                          }}
                        />
                      </FormControl>
                    </Grid>
                  ))}
                </>
              )}

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => history.goBack()}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => handleNext()}
                  disabled={!isNext}
                >
                  Submit{isNext?null:<CircularProgress size={20}/>}
                </Button>
              </Grid>
            </Grid>
          </Col>

          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={EVIDENCE_FORM}
                selectedItem="Additional details"
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


export default AdditionalDetails;
