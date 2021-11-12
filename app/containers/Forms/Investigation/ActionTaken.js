import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  KeyboardDatePicker, MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-grid-system";
// Redux
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { tabViewMode } from "../../../redux/actions/initialDetails";
import api from "../../../utils/axios";
import { INVESTIGATION_FORM, SUMMERY_FORM } from "../../../utils/constants";
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

const ActionTaken = () => {
  const [form, setForm] = useState({});
  const history = useHistory();
  const putId = useRef("");
  const investigationId = useRef("");
  const dispatch = useDispatch();
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isDateShow, setIsDateShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  // handle update check
  const handelUpdateCheck = async (e) => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    putId.current = incidentId;

    await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    ).then((previousData) => {
      let allApiData = previousData.data.data.results[0];
      if (!isNaN(allApiData.id)) {
        setForm(allApiData);
        investigationId.current = allApiData.id;
      }
    }).catch(error => history.push("/app/pages/error"))
  };

  const handleNext = async (e) => {
    setButtonLoading(true)
    const temp = incidentsListData
    temp.updatedAt = new Date().toISOString();
    if (incidentsListData.incidentStage === "Investigation") {
      temp.incidentStatus = "Done"
      try {
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );
      } catch (error) {
        history.push("/app/pages/error")
      }
    }

    form.preEventMitigations === null
      ? (form["preEventMitigations"] = "")
      : null;

    form["endDate"] = new Date()
    const res = await api.put(
      `api/v1/incidents/${putId.current}/investigations/${investigationId.current}/`,
      form
    ).then((res) => {
      if (res.status === 200) {
        let viewMode = {
          initialNotification: false, investigation: true, evidence: false, rootcauseanalysis: false, lessionlearn: false
        }
        localStorage.setItem("viewMode", JSON.stringify(viewMode))
        dispatch(tabViewMode(viewMode));
        history.push(`${SUMMERY_FORM['Summary']}${putId.current}/`);

      }
    }).catch(() => { history.push("/app/pages/error") });
    setButtonLoading(false)
  };
  // fetch incident data
  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    ).then((res) => {
      const result = res.data.data.results;
      setIncidentsListdata(result);
    })
      .catch((err) => history.push("/app/pages/error"))

  };

  const handelCallBack = async () => {
    await setLoading(true)
    await handelUpdateCheck();
    await fetchIncidentsData();
    await setLoading(false)
  }

  useEffect(() => {
    handelCallBack()
  }, []);

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Action Taken" icon="ion-md-list-box">
      {loading == false ?
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  id="filled-basic"
                  label="Pre-event mitigation"
                  value={form.preEventMitigations != undefined ? form.preEventMitigations : ""}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      preEventMitigations: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.formControl}
                    id="date-picker-dialog"
                    value={form.correctionActionClosedAt}
                    disableFuture={true}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        correctionActionClosedAt: moment(e).toISOString(),
                      });
                    }}
                    format="yyyy/MM/dd"
                    inputVariant="outlined"
                    label="Correction action date completed"
                    InputProps={{ readOnly: true }}
                    onClick={(e) => setIsDateShow(true)}
                    open={isDateShow}
                    onClose={(e) => setIsDateShow(false)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

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
                  onClick={(e) => handleNext(e)}
                  disabled={buttonLoading}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Col>
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={INVESTIGATION_FORM}
                selectedItem="Action taken"
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

export default ActionTaken;
