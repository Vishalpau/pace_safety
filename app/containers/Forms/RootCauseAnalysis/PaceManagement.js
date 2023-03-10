import { Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PapperBlock } from "dan-components";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useHistory } from "react-router";
import Type from "../../../styles/components/Fonts.scss";
import api from "../../../utils/axios";
import { checkValue, handelApiValue } from "../../../utils/CheckerValue";
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  ASSESSMENTS,
  BASIC_CAUSE_SUB_TYPES, COMPILANCE,
  ENGAGEMENT,
  PACE_MANAGEMENT_CONTROL_SUB_TYPES,
  PROACTIVEMANAGEMENT,
  ROOT_CAUSE_ANALYSIS_FORM
} from "../../../utils/constants";
import FormSideBar from "../FormSideBar";
import Loader from "../Loader";


const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PaceManagementControl = () => {
  const [form, setForm] = useState({
    ProActiveManagement: {
      remarkType: "options",
      rcaSubType: "ProActiveManagement",
      rcaRemark: [],
    },
    Assessments: {
      remarkType: "options",
      rcaSubType: "Assessments",
      rcaRemark: [],
    },
    Compilance: {
      remarkType: "options",
      rcaSubType: "Compilance",
      rcaRemark: [],
    },
    Engagement: {
      remarkType: "options",
      rcaSubType: "Engagement",
      rcaRemark: [],
    },
  })
  const [incidentDetail, setIncidentDetail] = useState({});
  const [nextButton, setNextButton] = useState(false)
  const [paceCauseDelete, setPaceCauseDelete] = useState()
  const history = useHistory();
  const putId = useRef("")
  const [optionBasicCause, setOptionBasicCause] = useState([])
  const [allPaceCause, setAllPaceCause] = useState({})
  const [loading, setLoading] = useState(false)


  const handelUpdateCheck = async () => {
    let tempData = {}
    let paceCauseid = []
    let allFetchPaceCause = {}
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    putId.current = incidentId
    let previousData = await api.get(`/api/v1/incidents/${incidentId}/pacecauses/`);
    let allApiData = previousData.data.data.results
    if (allApiData.length > 0) {
      allApiData.map((value) => {
        if (PACE_MANAGEMENT_CONTROL_SUB_TYPES.includes(value.rcaSubType)) {
          if (Object.keys(tempData).includes(value.rcaSubType)) {
            tempData[value.rcaSubType].push(value.rcaRemark)
          } else {
            tempData[value.rcaSubType] = [value.rcaRemark]
          }
          paceCauseid.push(value.id)
          allFetchPaceCause[value.id] = value.rcaRemark
        }
      })
      setForm({
        ...form,
        ProActiveManagement: {
          remarkType: "options",
          rcaSubType: "ProActiveManagement",
          rcaRemark: handelApiValue(tempData["ProActiveManagement"]),
        },
        Assessments: {
          remarkType: "options",
          rcaSubType: "Assessments",
          rcaRemark: handelApiValue(tempData["Assessments"]),
        },
        Compilance: {
          remarkType: "options",
          rcaSubType: "Compilance",
          rcaRemark: handelApiValue(tempData["Compilance"]),
        },
        Engagement: {
          remarkType: "options",
          rcaSubType: "Engagement",
          rcaRemark: handelApiValue(tempData["Engagement"]),
        },
      })
      setPaceCauseDelete(paceCauseid)
      setAllPaceCause(allFetchPaceCause)
    }
  }

  const handelOptionDispay = (type, subType, option) => {
    let temp = []
    if (option !== "-") {
      option.map((value) => {
        temp.push(`${type} - ${subType} - ${value}`)
      })
    }
    return temp
  }

  const handelShowData = async () => {
    let tempApiData = {};
    let subTypes = BASIC_CAUSE_SUB_TYPES;
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));

    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(`/api/v1/incidents/${putId.current}/pacecauses/`);
    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType)
      ) {
        let valueQuestion = value.rcaSubType;
        let valueAnser = value.rcaRemark;
        if (Object.keys(tempApiData).includes(valueQuestion)) {
          tempApiData[valueQuestion].push(valueAnser)
        } else {
          tempApiData[valueQuestion] = [valueAnser]
        }
      }
    });


    let OptionWithSubType =
      handelOptionDispay("Human factors", "personal", checkValue(tempApiData["personal"])).concat
        (handelOptionDispay("Human factors", "wellness factors", checkValue(tempApiData["wellnessFactors"]))).concat
        (handelOptionDispay("Jobfactors", "leadership", checkValue(tempApiData["leadership"]))).concat
        (handelOptionDispay("Jobfactors", "processes", checkValue(tempApiData["processes"]))).concat
        (handelOptionDispay("Jobfactors", "other issuses", checkValue(tempApiData["otherIssues"])))
    setOptionBasicCause(OptionWithSubType)
  };

  const handelProactiveManagement = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.ProActiveManagement.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        ProActiveManagement: {
          remarkType: "options",
          rcaSubType: "ProActiveManagement",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        ProActiveManagement: {
          remarkType: "options",
          rcaSubType: "ProActiveManagement",
          rcaRemark: [...form.ProActiveManagement.rcaRemark, value],
        },
      });
    }
  };

  const handelAssessmet = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.Assessments.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        Assessments: {
          remarkType: "options",
          rcaSubType: "Assessments",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        Assessments: {
          remarkType: "options",
          rcaSubType: "Assessments",
          rcaRemark: [...form.Assessments.rcaRemark, value],
        },
      });
    }
  };

  const handelCompilance = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.Compilance.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        Compilance: {
          remarkType: "options",
          rcaSubType: "Compilance",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        Compilance: {
          remarkType: "options",
          rcaSubType: "Compilance",
          rcaRemark: [...form.Compilance.rcaRemark, value],
        },
      });
    }
  };

  const handelEngagement = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.Engagement.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        Engagement: {
          remarkType: "options",
          rcaSubType: "Engagement",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        Engagement: {
          remarkType: "options",
          rcaSubType: "Engagement",
          rcaRemark: [...form.Engagement.rcaRemark, value],
        },
      });
    }
  };

  const handelDelete = async () => {
    let currentRemark = [].concat.apply([], [
      form.ProActiveManagement.rcaRemark,
      form.Assessments.rcaRemark,
      form.Compilance.rcaRemark,
      form.Engagement.rcaRemark,
    ])
    if (paceCauseDelete !== undefined && paceCauseDelete.length > 0) {
      for (let key in allPaceCause) {
        if (!currentRemark.includes(allPaceCause[key])) {
          let delPaceCause = await api.delete(`api/v1/incidents/${putId.current}/pacecauses/${key}/`)
          if (delPaceCause.status == 200) {
            console.log("deleted")
          }
        }
      }
    }
  }

  const handelNavigate = (nextPageLink, navigateType) => {
    if (navigateType == "next") {
      if (nextPageLink == 201) {
        history.push(ROOT_CAUSE_ANALYSIS_FORM["Preventive actions"]);
      } else if (nextPageLink == 200) {
        history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Preventive actions"]}${putId.current}`);
      }
    } else if (navigateType == "previous") {
      if (!isNaN(putId.current)) {
        history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Basic cause"]}${putId.current}`);
      } else if (isNaN(putId.current)) {
        history.push(ROOT_CAUSE_ANALYSIS_FORM["Basic cause"]);
      }
    }
  }

  const handelApiCall = async () => {
    let nextPageLink = 0;
    let tempData = []
    let lastRemark = Object.values(allPaceCause)
    Object.entries(form).map(async (item) => {
      let api_data = item[1];
      api_data.rcaRemark.map((value) => {
        if (!lastRemark.includes(value) && value !== "") {
          let temp = {
            createdBy: "0",
            fkIncidentId: putId.current,
            rcaRemark: value,
            rcaSubType: api_data["rcaSubType"],
            rcaType: "PACE Management control",
            remarkType: api_data["remarkType"],
            status: "Active",
          };
          tempData.push(temp);
        }
      })
    })
    const res = await api.post(`api/v1/incidents/${putId.current}/bulkpacecauses/`, tempData);
    if (res.status == 200) {
      nextPageLink = res.status;
      handelNavigate(nextPageLink, "next")
    }
  }


  const handelNext = async () => {
    await setNextButton(true)
    await handelDelete()
    await handelApiCall()
    await setNextButton(false)
  }

  const fetchIncidentDetails = async () => {
    const res = await api.get(`/api/v1/incidents/${putId.current}/`);
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  const handelCallBack = async () => {
    await setLoading(true)
    await handelUpdateCheck();
    await fetchIncidentDetails();
    await handelShowData();
    await setLoading(false)
  }

  useEffect(() => {
    handelCallBack()
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  const classes = useStyles();
  return (
    <PapperBlock
      title="Basic cause - PACE Management System Controls Impacted "
      icon="ion-md-list-box"
    >
      {loading == false ?
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={Type.labelName} gutterBottom>
                  Incident number
                </Typography>
                <Typography className={Type.labelValue}>
                  {incidentDetail.incidentNumber}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={Type.labelName} gutterBottom>
                  RCA method
                </Typography>
                <Typography className={Type.labelValue}>
                  PACE cause analysis
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Basic cause selected</Typography>
                {optionBasicCause.map((value) => (
                  <p>
                    <small>{value}</small>
                  </p>
                ))}
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              <Grid item xs={12}>
                <Box paddingBottom={2}>
                  <Typography variant="h6">Management control</Typography>
                </Box>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Proactive management</FormLabel>
                  <FormGroup>
                    {PROACTIVEMANAGEMENT.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.ProActiveManagement.rcaRemark.includes(
                          value
                        )}
                        onChange={async (e) =>
                          await handelProactiveManagement(e, value)
                        }
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Assessments</FormLabel>
                  <FormGroup>
                    {ASSESSMENTS.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.Assessments.rcaRemark.includes(value)}
                        onChange={async (e) => await handelAssessmet(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Compliance</FormLabel>
                  <FormGroup>
                    {COMPILANCE.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.Compilance.rcaRemark.includes(value)}
                        onChange={async (e) => await handelCompilance(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Engagement</FormLabel>
                  <FormGroup>
                    {ENGAGEMENT.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        checked={form.Engagement.rcaRemark.includes(value)}
                        onChange={async (e) => await handelEngagement(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={(e) => handelNavigate("nextPageLink", "previous")}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={nextButton == true}
                  onClick={(e) => handelNext(e)}
                >
                  Next{nextButton && <CircularProgress size={20} />}
                </Button>
              </Grid>
            </Grid>
          </Col>
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Management control"}
              />
            </Col>
          )}
        </Row>
        :
        <Loader />
      }
    </PapperBlock>
  );
};

export default PaceManagementControl;