import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { spacing } from "@material-ui/system";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Col, Row } from "react-grid-system";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM, MANAGEMENTCONTROL, SUMMERY_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import CorrectiveActionValidation from "../../Validator/RCAValidation/CorrectiveActionsValidation";
import Type from "../../../styles/components/Fonts.scss";
import { handelApiValue } from "../../../utils/CheckerValue"

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

const CorrectiveAction = () => {
  const [commonForm, setCommonForm] = useState({
    rcaNumber: "string",
    rcaType: "string",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: parseInt(localStorage.getItem("fkincidentId")),
  });

  const [error, setError] = useState({});

  const [data, setData] = useState([]);
  const [incidentDetail, setIncidentDetail] = useState({});
  const [form, setForm] = useState({
    managementControl: {
      remarkType: "options",
      rcaSubType: "managementControl",
      rcaRemark: [],
    },
    reasonsSupportAbove: {
      remarkType: "remark",
      rcaSubType: "reasonsSupportAbove",
      rcaRemark: [],
    },
  });

  const putId = useRef("");
  const [fetchApiData, setFetchApiData] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const updateIds = useRef();
  const checkPost = useRef();
  const [paceCauseDelete, setPaceCauseDelete] = useState()
  const [nextButton, setNextButton] = useState(false)


  const setRemark = (value) => {
    let remark = value.includes(",") ? value.split(",") : [value];
    if (remark.includes("No option selected") && remark.length > 0) {
      let removeItemIndex = remark.indexOf("No option selected");
      remark.splice(removeItemIndex, 1);
    }
    return remark;
  };

  // get data and set to states
  const handelUpdateCheck = async () => {
    let allrcaSubType = ["managementControl", "reasonsSupportAbove"];
    let tempData = {}
    let paceCauseid = []
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
        if (allrcaSubType.includes(value.rcaSubType)) {
          if (Object.keys(tempData).includes(value.rcaSubType)) {
            tempData[value.rcaSubType].push(value.rcaRemark)
          } else {
            tempData[value.rcaSubType] = [value.rcaRemark]
          }
          paceCauseid.push(value.id)
        }
      })
      setForm({
        ...form,
        managementControl: {
          remarkType: "options",
          rcaSubType: "managementControl",
          rcaRemark: handelApiValue(tempData["managementControl"]),
        },
        reasonsSupportAbove: {
          remarkType: "remark",
          rcaSubType: "reasonsSupportAbove",
          rcaRemark: handelApiValue(tempData["reasonsSupportAbove"]),
        },
      });
      setPaceCauseDelete(paceCauseid)
    }
  }

  const handelManagementControl = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.managementControl.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        managementControl: {
          remarkType: "options",
          rcaSubType: "managementControl",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        managementControl: {
          remarkType: "options",
          rcaSubType: "managementControl",
          rcaRemark: [...form.managementControl.rcaRemark, value],
        },
      });
    }
  };

  const handelreasonsSupportAbove = (e) => {
    setForm({
      ...form,
      reasonsSupportAbove: {
        remarkType: "remark",
        rcaSubType: "reasonsSupportAbove",
        rcaRemark: [e.target.value],
      },
    });
  };

  const handelDelete = async () => {
    if (paceCauseDelete !== undefined && paceCauseDelete.length > 0) {
      for (let key in paceCauseDelete) {
        let delPaceCause = await api.delete(`api/v1/incidents/${putId.current}/pacecauses/${paceCauseDelete[key]}/`)
        if (delPaceCause.status == 200) {
          console.log("deleted")
        }
      }
    }
  }

  const handelNavigate = (navigateType) => {
    if (navigateType == "next") {
      history.push(`${SUMMERY_FORM["Summary"]}${putId.current}`)
    } else if (navigateType == "previous") {
      history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Preventive actions"]}${putId.current}`)
    }
  }

  const handelApiCall = async () => {
    let tempData = []
    Object.entries(form).map(async (item, index) => {
      let api_data = item[1];
      api_data.rcaRemark.map((value) => {
        if (value !== "") {
          let temp = {
            createdBy: "0",
            fkIncidentId: putId.current,
            rcaRemark: value,
            rcaSubType: api_data["rcaSubType"],
            rcaType: "Basic",
            remarkType: api_data["remarkType"],
            status: "Active",
          };
          tempData.push(temp);
        }
      })
    })
    const res = await api.post(`api/v1/incidents/${putId.current}/bulkpacecauses/`, tempData);
    if (res.status == 200) {
      console.log("here")
      handelNavigate("next")
    }
  }

  const handelNext = async () => {
    await setNextButton(true)
    await handelDelete()
    await handelApiCall()
    await setNextButton(false)
  }

  const classes = useStyles();

  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  useEffect(() => {
    fetchIncidentDetails();
    handelUpdateCheck();
  }, []);
  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Additional information" icon="ion-md-list-box">
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
              <FormControl component="fieldset" error={error.managementControl}>
                <FormLabel component="legend">Additional information</FormLabel>
                {MANAGEMENTCONTROL.map((value) => (
                  <FormControlLabel
                    control={<Checkbox name={value} />}
                    label={value}
                    checked={form.managementControl.rcaRemark.includes(value)}
                    onChange={async (e) => handelManagementControl(e, value)}
                  />
                ))}
              </FormControl>
              {error && error.managementControl && (
                <FormHelperText style={{ color: "red" }}>
                  {error.managementControl}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="filled-basic"
                variant="outlined"
                multiline
                error={error.reasonsSupportAbove}
                value={
                  form.reasonsSupportAbove.rcaRemark !== "No option selected"
                    ? form.reasonsSupportAbove.rcaRemark
                    : ""
                }
                helperText={error ? error.reasonsSupportAbove : ""}
                rows={3}
                label="Details of the reasons to support above"
                className={classes.formControl}
                onChange={async (e) => handelreasonsSupportAbove(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => handelNavigate("previous")}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={nextButton == true}
                className={classes.button}
                onClick={(e) => handelNext(e)}
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
              selectedItem={"Additional information"}
            />
          </Col>
        )}
      </Row>
    </PapperBlock>
  );
};

export default CorrectiveAction;
