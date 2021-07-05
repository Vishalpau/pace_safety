import React, { useEffect, useState, useRef } from "react";
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
import { useHistory, useParams } from "react-router";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import CorrectiveActionValidation from "../../Validator/RCAValidation/CorrectiveActionsValidation";
import { MANAGEMENTCONTROL } from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";

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

  const putId = useRef("");
  const [fetchApiData, setFetchApiData] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const updateIds = useRef();

  // get data and set to states
  const handelUpdateCheck = async () => {
    let allrcaSubType = ["managementcontrol", "regionsupportabove"];
    let tempApiData = {};
    let tempApiDataId = [];
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );

    if (!isNaN(lastItem)) {
      let previousData = await api.get(
        `/api/v1/incidents/${lastItem}/pacecauses/`
      );
      putId.current = lastItem;
      let allApiData = previousData.data.data.results;

      allApiData.map((value) => {
        if (allrcaSubType.includes(value.rcaSubType)) {
          let valueQuestion = value.rcaSubType;
          let valueAnser = value.rcaRemark;
          tempApiData[valueQuestion] = valueAnser;
          tempApiDataId.push(value.id);
        }
      });
      updateIds.current = tempApiDataId.reverse();
      await setFetchApiData(tempApiData);

      // set fetched spervised data
      setForm({
        ...form,
        managementControl: {
          remarkType: "options",
          rcaSubType: "managementcontrol",
          rcaRemark: tempApiData.managementcontrol.includes(",")
            ? tempApiData.managementcontrol.split(",")
            : [tempApiData.managementcontrol],
        },
        regionSupport: {
          remarkType: "remark",
          rcaSubType: "regionsupportabove",
          rcaRemark: tempApiData.regionsupportabove,
        },
      });
    }
  };

  const handelManagementControl = (e, value) => {
    if (e.target.checked == false) {
      let newData = form.managementControl.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        managementControl: {
          remarkType: "options",
          rcaSubType: "managementcontrol",
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        managementControl: {
          remarkType: "options",
          rcaSubType: "managementcontrol",
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
        rcaSubType: "regionsupportabove",
        rcaRemark: e.target.value,
      },
    });
  };

  const handelNext = async (e) => {
    const { error, isValid } = CorrectiveActionValidation(form);
    await setError(error);
    let tempData = [];

    Object.entries(form).map(async (item, index) => {
      let api_data = item[1];
      // post request object
      if (putId.current == "") {
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
        // put request object
      } else {
        let temp = {
          createdBy: "0",
          fkIncidentId: localStorage.getItem("fkincidentId"),
          rcaRemark: api_data["rcaRemark"].toString(),
          rcaSubType: api_data["rcaSubType"],
          rcaType: "Basic",
          remarkType: api_data["remarkType"],
          status: "Active",
          pk: updateIds.current[index],
        };
        tempData.push(temp);
      }
    });

    // api call //
    let nextPageLink = 0;
    let callObjects = tempData;
    for (let key in callObjects) {
      if (Object.keys(error).length == 0) {
        if (putId.current !== "") {
          const res = await api.put(
            `/api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/pacecauses/${callObjects[key].pk}/`,
            callObjects[key]
          );
          if (res.status == 200) {
            console.log("request done");
            nextPageLink = res.status;
          }
        } else {
          const res = await api.post(
            `/api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/pacecauses/`,
            callObjects[key]
          );
          if (res.status == 201) {
            console.log("request done");
            nextPageLink = res.status;
          }
        }
      }
      if (nextPageLink == 201 && Object.keys(error).length === 0) {
        history.push(
          "/app/incident-management/registration/root-cause-analysis/root-cause-analysis/"
        );
      } else if (nextPageLink == 200 && Object.keys(error).length === 0) {
        console.log("here");
        history.push(
          `/app/incident-management/registration/root-cause-analysis/root-cause-analysis/${
            putId.current
          }`
        );
      }
    }
    // api call //
  };

  const classes = useStyles();

  useEffect(() => {
    handelUpdateCheck();
  }, []);

  return (
    <PapperBlock title="Corrective Actions" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident number
            </Typography>
            <Typography className={Type.labelValue}>
              {localStorage.getItem("fkincidentId")}
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              RCA Method
            </Typography>
            <Typography className={Type.labelValue}>
              PACE Cause Analysis
            </Typography>
          </Grid>

          <Grid item md={12}>
            <FormControl
              component="fieldset"
              required
              error={error.managementControl}
            >
              <FormLabel component="legend">Management Control</FormLabel>
              {MANAGEMENTCONTROL.map((value) => (
                <FormControlLabel
                  control={<Checkbox name={value} />}
                  label={value}
                  checked={form.managementControl.rcaRemark.includes(value)}
                  onChange={async (e) => handelManagementControl(e, value)}
                />
              ))}
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <TextField
              id="filled-basic"
              variant="outlined"
              multiline
              required
              error={error.regionSupport}
              defaultValue={form.regionSupport.rcaRemark}
              helperText={error ? error.regionSupport : ""}
              rows={3}
              label="Details of the Reasons to Support Above"
              className={classes.formControl}
              onChange={async (e) => handelRegionSupport(e)}
            />
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
              onClick={(e) => handelNext(e)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem={"Corrective Actions"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default CorrectiveAction;
