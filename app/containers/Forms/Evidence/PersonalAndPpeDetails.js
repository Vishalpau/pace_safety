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

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
    margin: "1rem 0",
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
  const [ppeList, setPpeList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [incidentDetail, setIncidentDetail] = useState({});
  const [ppeData, ppeSetData] = useState([
    {
      questionCode: "PPE-08",
      question: "PPE worn properly?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-09",
      question: "PPE in good shape?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-10",
      question: "PPE Proper fit?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-11",
      question: " PPE appropriate for task?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-12",
      question: "Employee self supervised",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-13",
      question: "Supervisor present at site",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-14",
      question: "Supervisor provided clear detail of work",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-15",
      question: "Supervisor provided detail work package",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-16",
      question:"Did supervisor conducted I-care observation",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-17",
      question: "Was flag person required for this job",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-18",
      question: "Flag person trained/competent",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-19",
      question: "Was flag person present",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-20",
      question: " Metal on Metal incident",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "PPE-21",
      question: " Was person in the line of fire ",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
  ]);
  
  // const [ad08, setAd08] = useState({error:""});
  // const [ad09, setAd09] = useState({error:""});
  // const [ad10, setAd10] = useState({error:""});
  // const [ad11, setAd11] = useState({error:""});
  // const [ad12, setAd12] = useState({error:""});
  // const [ad13, setAd13] = useState({error:""});
  // const [ad14, setAd14] = useState({error:""});
  // const [ad15, setAd15] = useState({error:""});
  // const [ad16, setAd16] = useState({error:""});
  // const [ad17, setAd17] = useState({error:""});
  // const [ad18, setAd18] = useState({error:""});
  // const [ad19, setAd19] = useState({error:""});
  // const [ad20, setAd20] = useState({error:""});
  // const [ad21, setAd21] = useState({error:""});

  const handleNext = async () => {
    if (ppeList.length > 19) {
      const res = await api.put(`api/v1/incidents/${id}/activities/`, ppeList);
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/evidence/additional-details/${id}`
        );
      }
    } else {
      

      

      const valdation = ppeData;
      console.log(valdation);
      const { error, isValid } = PersonalAndPpeDetailValidate(valdation);
      setError(error);
      const res = await api.post(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        ppeData
      );
      console.log(res);

      history.push(
        "/app/incident-management/registration/evidence/additional-details/"
      );
    }
  };

  const handlePpeData = (e, index) => {
    console.log(e.target.value)
    const TempPpe = ppeData;
    const TempIndexData = ppedata[index];
    TempIndexData.answer = e.target.value;
    TempPpe[index] = TempIndexData;
    setPpeData(TempPpe);
  };

  const handleUpdatePpeList = (e, index) => {
    const TempPpe = ppeList;
    const TempIndexData = ppeList[index];
    TempIndexData.answer = e.target.value;
    TempPpe[index] = TempIndexData;
    setPpeList(TempPpe);
  };

  const fetchPpeList = async () => {
    const res = await api.get(`api/v1/incidents/${id}/activities/`);
    const result = res.data.data.results;
    if (result.length) {
      await setPpeList(result);
    }
    await setIsLoading(true);
  };

  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };
  useEffect(() => {
    fetchIncidentDetails();
    if (id) {
      fetchPpeList();
    } else {
      setIsLoading(true);
    }
    
  }, []);

  return (
    <PapperBlock title=" Personal and PPE" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Incident number: {incidentDetail.incidentNumber}
                </Typography>
              </Box>
            </Grid>
            {ppeList.length === undefined ? (
              <>
                {ppeData.slice(0,4).map((key, value) =>(
                <>
                {console.log(key)}
                <Grid item md={6}>
                  {/* <p>PPE worn properly</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">{key.question}</FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      onChange={(e) => {handlePpeData(e, key)
                      }
                    }
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

                
                </>
              ))}
              <Grid item md={12}>
                  <Typography variant="h6">Supervision</Typography>
              </Grid>
              {ppeData.slice(4,9).map((key, value) =>(
                <>
                

                <Grid item md={6}>
                  {/* <p>Employee self supervised</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      {key.question}
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      onChange={(e) => {handlePpeData(e, key)}}
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

                
                </>
              ))}
              <Grid item md={12}>
                  <Typography variant="h6">Flag Person</Typography>
                </Grid>
              {ppeData.slice(9,12).map((key, value) =>(
                <>
                <Grid item md={6}>
                  {/* <p>Was flag person required for this job</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      {key.question}
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      onChange={(e) => {handlePpeData(e, key)}}
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

               
                </>
              ))}
              
                

                
                <Grid item md={12}>
                  <Box marginBottom={3} marginTop={4}>
                    <Typography variant="h6">Other</Typography>
                  </Box>
                </Grid>
                {ppeData.slice(12,14).map((key, value)=>(<>
                  <Grid item md={6}>
                  {/* <p>Metal on Metal incident</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      {key.question}
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      onChange={(e) => {handlePpeData(e, key)}}
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

               

                </>))}

               
              </>
            ) : (
              <>
                {/* {Object.entries(acti).slice(6,20).map(([key, value] ) => ())} */}
                <Grid item md={6}>
                  {/* <p>PPE worn properly</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">PPE worn properly?</FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[7].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 7);
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
                  {/* <p>PPE in good shape</p> */}

                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">PPE in good shape?</FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[8].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 8);
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
                  {/* <p>PPE Proper fit</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">PPE Proper fit?</FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[9].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 9);
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
                  {/* <p>PPE appropriate for task</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      PPE appropriate for task?
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[10].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 10);
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
                  {/* <p>Employee self supervised</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Employee self supervised
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[11].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 11);
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
                  >
                    <FormLabel component="legend">
                      Supervisor present at site
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[12].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 12);
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
                  {/* <p>Supervisor provided clear detail of work</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Supervisor provided clear detail of work
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[13].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 13);
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
                  {/* <p>Supervisor provided detail work package</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Supervisor provided detail work package
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[14].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 14);
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
                  {/* <p>Did supervisor conducted I-care observation</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Did supervisor conducted I-care observation
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[15].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 15);
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
                  {/* <p>Was flag person required for this job</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Was flag person required for this job
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[16].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 16);
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
                  {/* <p>Flag person trained/competent</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Flag person trained/competent
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[17].answer}
                      onChange={(e) => {
                        {
                          handleUpdatePpeList(e, 17);
                        }
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
                  {/* <p>Was flag person present</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Was flag person present
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[18].answer}
                      onChange={(e) => {
                        {
                          handleUpdatePpeList(e, 18);
                        }
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
                  {/* <p>Metal on Metal incident</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Metal on Metal incident
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[19].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 19);
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
                  {/* <p>Was person in the line of fire</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Was person in the line of fire
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      defaultValue={ppeList[20].answer}
                      onChange={(e) => {
                        handleUpdatePpeList(e, 20);
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
              </>
            )}
            <Grid item md={12}>
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
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default PersonalAndPpeDetails;
