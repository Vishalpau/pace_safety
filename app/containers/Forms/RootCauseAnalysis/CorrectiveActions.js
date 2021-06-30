import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import { PapperBlock } from "dan-components";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
// import Typography from "../../UiElements/Typography";
import CorrectiveActionValidation from "../../Validator/RCAValidation/CorrectiveActionsValidation";

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

  const [form, setForm] = useState({
    managementControl: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    regionSupport: { remarkType: "", rcaSubType: "", rcaRemark: "" },
  });

  const handelManagementControl = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.managementControl.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        managementControl: {
          remarkType: "options",
          rcaSubType: "management control",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        managementControl: {
          remarkType: "options",
          rcaSubType: "management control",
          rcaRemark: [...form.managementControl.rcaRemark, value],
        },
      });
    }
  };

  const handelRegionSupport = (e) => {
    setForm({
      ...form,
      regionSupport: {
        remarkType: "remark",
        rcaSubType: "Details the region to support above",
        rcaRemark: e.target.value,
      },
    });
  };

  const checkBox = [
    "Inadequate System",
    "Inadequate standards",
    "Inadequate compilance and standards",
  ];

  const handelNext = (e) => {
    const { error, isValid } = CorrectiveActionValidation(form);
    setError(error);

    let tempData = [];
    Object.entries(form).map((item) => {
      let api_data = item[1];

      console.log(item);
      let temp = {
        createdBy: "0",
        fkIncidentId: localStorage.getItem("fkincidentId"),
        rcaRemark: api_data["rcaRemark"].toString(),
        rcaSubType: api_data["rcaSubType"],
        rcaType: "Basic",
        remarkType: api_data["remarkType"],
        status: "Active",
      };
      tempData.push(temp);
    });
    setData(tempData);
  };

  const handelApiCall = async (e) => {
    let callObjects = data;

    for (let key in callObjects) {
      console.log(callObjects[key]);
      if (Object.keys(error).length == 0) {
        const res = await api.post(
          `/api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/pacecauses/`,
          callObjects[key]
        );
        if (res.status == 201) {
          console.log("request done");
          console.log(res);
        }
      }
    }
  };

  const classes = useStyles();

  return (
    <PapperBlock title=" Corrective Actions" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={4}>
            <Box>
              <Typography variant="body2" gutterBottom>
                Incident number: {localStorage.getItem("fkincidentId")}
              </Typography>
            </Box>
          </Grid>

          <Grid item md={8}>
            <Box>
              <Typography variant="body2" gutterBottom>
                RCA Method: PACE Cause Analysis
              </Typography>
            </Box>
          </Grid>

          <Grid item md={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" error={error.managementControl}>
                Management Control
              </FormLabel>
              {checkBox.map((value) => (
                <FormControlLabel
                  control={<Checkbox name={value} />}
                  label={value}
                  onChange={async (e) => handelManagementControl(e, value)}
                />
              ))}
            </FormControl>
            {error && error.managementControl && (
              <p>
                <small style={{ color: "red" }}>
                  {error.managementControl}
                </small>
              </p>
            )}
          </Grid>

          <Grid item md={12}>
            <TextField
              id="filled-basic"
              variant="outlined"
              multiline
              error={error.regionSupport}
              helperText={error ? error.regionSupport : ""}
              rows={3}
              label="Details of the Reasons to Support Above"
              className={classes.formControl}
              onChange={async (e) => handelRegionSupport(e)}
            />
            {/* {error && error.regionSupport && (
                    <p>{error.regionSupport}</p>
                  )} */}
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              // href={Object.keys(error).length > 0 ? '#' : "/app/incident-management/registration/root-cause-analysis/root-cause-analysis/"}
              onClick={(e) => {
                handelNext(e);
                handelApiCall(e);
              }}
            >
              Next
            </Button>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem={"Corrective action"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default CorrectiveAction;
