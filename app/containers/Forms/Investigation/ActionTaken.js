import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Col, Row } from "react-grid-system";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM, SUMMERY_FORM } from "../../../utils/constants";
import api from "../../../utils/axios";

// Redux
import { useDispatch } from "react-redux";
import { tabViewMode } from "../../../redux/actions/initialDetails";

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

  const handelUpdateCheck = async (e) => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    putId.current = incidentId;

    let previousData = await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    );
    let allApiData = previousData.data.data.results[0];
    if (!isNaN(allApiData.id)) {
      await setForm(allApiData);
      investigationId.current = allApiData.id;
    }
  };

  const [error, setError] = useState({});

  const handleNext = async (e) => {
    form.preEventMitigations === null
      ? (form["preEventMitigations"] = "")
      : null;
    console.log(form.preEventMitigations);
    form["endDate"] = new Date()
    const res = await api.put(
      `api/v1/incidents/${putId.current}/investigations/${investigationId.current}/`,
      form
    );
    if (res.status === 200) {
      let viewMode = {
        initialNotification: false, investigation: true, evidence: false, rootcauseanalysis: false, lessionlearn: false

      }
      localStorage.setItem("viewMode", JSON.stringify(viewMode))
      dispatch(tabViewMode(viewMode));
      history.push(`${SUMMERY_FORM['Summary']}${putId.current}/`);
      
    }
  };

  useEffect(() => {
    handelUpdateCheck();
  }, []);

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Action Taken" icon="ion-md-list-box">
      <Row>
        <Col md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                id="filled-basic"
                label="Pre-event mitigation"
                value={form.preEventMitigations != undefined ? form.preEventMitigations : ""}
                // placeholder="Pre-event mitigation"
                // InputLabelProps={{
                //   shrink: true,
                // }}
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
                  InputProps={{readOnly:true}}
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
    </PapperBlock>
  );
};

export default ActionTaken;
