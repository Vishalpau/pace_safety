import { FormHelperText } from "@material-ui/core";
import Box from "@material-ui/core/Box";
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
import { useHistory, useParams } from "react-router";
import Type from "../../../styles/components/Fonts.scss";
import api from "../../../utils/axios";
import { EVIDENCE_FORM } from "../../../utils/constants";
import PersonalAndPpeDetailValidate from "../../Validator/PersonalAndPpeDetailValidation";
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
    flexBasis: "100%",
    gap: "1.5rem",
  },
}));

const PersonalAndPpeDetails = () => {
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const [error, setError] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [ppeList, setPpeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [incidentDetail, setIncidentDetail] = useState({});
  const [isNext, setIsNext] = useState(true)
  const [ppeData, setPpeData] = useState([
    {
      questionCode: "PPE-08",
      question: "PPE worn properly?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 2,
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
      question: "PPE proper fit?",
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
      question: "Employee self supervised?",
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
      question: "Supervisor present at site?",
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
      question: "Supervisor provided clear detail of work?",
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
      question: "Supervisor provided detail work package?",
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
      question: "Did supervisor conduct I-Care observation?",
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
      question: "Was flag person required for this job?",
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
      question: "Flag person trained/competent?",
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
      question: "Was flag person present?",
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
      question: "Metal on metal incident?",
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
      question: "Was person in the line of fire?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
  ]);

  const handleNext = async () => {
    setIsNext(false)
    if (id && ppeList.length > 19) {
      try{
      const res = await api.put(`api/v1/incidents/${id}/activities/`, ppeList);
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/evidence/additional-details/${id}`
        );
      }
      }catch(err){
        setIsNext(true)
      }
      
    } else if (localStorage.getItem("fkincidentId") && ppeList.length > 19) {
      try{
      const res = await api.put(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        ppeList
      );
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/evidence/additional-details/`
        );
      }
    }catch(err){setIsNext(true)}
    } else {
      const valdation = ppeData;
      const { error, isValid } = PersonalAndPpeDetailValidate(valdation);
      await setError(error);
      if (!isValid) {
        return "Data is not valid";
      }
      try{
      const res = await api.post(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        ppeData
      );
       
          history.push(
            "/app/incident-management/registration/evidence/additional-details/"
          );
        
      
      }catch(err){setIsNext(true)}
    }
    // }
  };

  const handlePpeData = async (e, index) => {
    let TempPpeData = [...ppeData];
    TempPpeData[index].answer = e.target.value;
    await setPpeData(TempPpeData);
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
  const fetchppeDetails = async () => {
    const res = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`
    );
    const result = res.data.data.results;

    await setPpeList(result);

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
    fetchppeDetails();
    fetchIncidentDetails();
    if (id) {
      fetchPpeList();
    } else {
      setIsLoading(true);
    }
  }, []);
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Personal and PPE Details" icon="ion-md-list-box">
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
                <Typography className={Type.labelValue} gutterBottom>
                  {incidentDetail.incidentNumber}
                </Typography>
              </Grid>
              {ppeList.length < 8 ? (
                <>
                  {ppeData.slice(0, 4).map((value, index) => (
                    <>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          component="fieldset"
                          className={classes.formControl}
                          required
                          error={value.error}
                        >
                          <FormLabel component="legend">
                            {value.question}
                          </FormLabel>
                          <RadioGroup
                            className={classes.inlineRadioGroup}
                            onChange={(e) => {
                              handlePpeData(e, index);
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

                          {value.error ? (
                            <FormHelperText>{value.error}</FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>
                    </>
                  ))}
                  <Grid item xs={12}>
                    <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                      <Typography variant="h6">Supervisor</Typography>
                    </Box>
                  </Grid>
                  {ppeData.slice(4, 9).map((value, index) => (
                    <>
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
                            onChange={(e) => {
                              handlePpeData(e, index + 4);
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
                          {value.error ? (
                            <FormHelperText>{value.error}</FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>
                    </>
                  ))}
                  <Grid item xs={12}>
                    <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                      <Typography variant="h6">Flag Person</Typography>
                    </Box>
                  </Grid>
                  {ppeData.slice(9, 12).map((value, index) => (
                    <>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          component="fieldset"
                          className={classes.formControl}
                          required
                          error={value.error}
                        >
                          <FormLabel component="legend">
                            {value.question}
                          </FormLabel>
                          <RadioGroup
                            className={classes.inlineRadioGroup}
                            onChange={(e) => {
                              handlePpeData(e, index + 9);
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

                          {value.error ? (
                            <FormHelperText>{value.error}</FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>
                    </>
                  ))}

                  <Grid item xs={12}>
                    <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                      <Typography variant="h6">Other</Typography>
                    </Box>
                  </Grid>
                  {ppeData.slice(12, 14).map((value, index) => (
                    <>
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
                            onChange={(e) => {
                              handlePpeData(e, index + 12);
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

                          {value.error ? (
                            <FormHelperText>{value.error}</FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>
                    </>
                  ))}
                </>
              ) : (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        PPE worn properly?
                      </FormLabel>
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        PPE in Good Shape?
                      </FormLabel>
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">PPE Proper Fit?</FormLabel>
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                      required
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Supervisor present at site?
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Supervisor provided clear detail of work?
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      required
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Supervisor provided detail work package?
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Did supervisor conduct I-Care observation?
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
                  <Grid item xs={12}>
                    <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                      <Typography variant="h6">Flag person</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Was flag person required for this job?
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Flag person trained competent
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Was flag person present?
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
                  <Grid item xs={12}>
                    <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                      <Typography variant="h6">Other</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Metal on metal incident
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

                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                      required
                    >
                      <FormLabel component="legend">
                        Was person in the line of fire?
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
                >
                  Next{isNext?null:<CircularProgress size={20}/>}
                </Button>
              </Grid>
            </Grid>
          </Col>
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                listOfItems={EVIDENCE_FORM}
                selectedItem="Personal and PPE details"
                deleteForm={[1, 2, 3]}
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

export default PersonalAndPpeDetails;
