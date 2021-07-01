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
import { AccessAlarm, ThreeDRotation } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { PapperBlock } from "dan-components";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import { BASIC_CAUSE_SUB_TYPES } from "../../../utils/constants";

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
  list: {
    maxWidth: "300px",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

const BasicCauseAndAction = () => {
  const [data, setData] = useState([])


  const handelShowData = async () => {
    let tempApiData = {}
    let subTypes = BASIC_CAUSE_SUB_TYPES


    let previousData = await api.get(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`)

    let allApiData = previousData.data.data.results
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType)) {
        let valueQuestion = value.rcaSubType
        let valueAnser = value.rcaRemark
        tempApiData[valueQuestion] = valueAnser.includes(",") ? valueAnser.split(",") : [valueAnser]
      }
    })

    await setData(tempApiData)
  }

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }


  let form_link = window.location.href;

  useEffect(() => {
    handelShowData()
  }, []);
  const classes = useStyles();
  return (
    <PapperBlock title="Actions Against Basic Causes" icon="ion-md-list-box">
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
                Method: 5 Why Analysis
              </Typography>
            </Box>
          </Grid>

          <Grid item md={12}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Actions
              </Typography>
            </Box>
          </Grid>

          <Grid item md={12}>
            <Box marginBottom={2}>
              <Typography variant="body">
                Option selected from basic cause
              </Typography>
            </Box>

            <Box>
              <List className={classes.list} dense disablePadding>
                {/* console.log(`${key}: ${value}`) */}

                {Object.entries(data).map(([key, value]) => (
                  < div>
                    <ListItem>
                      <ListItemText primary={key} />
                    </ListItem>
                    {value.map((value) => (
                      <ListItemLink href="#">
                        <ListItemText primary={<small>{value}</small>} />
                      </ListItemLink>
                    ))}
                    <button className={classes.textButton}>
                      <AddCircleOutlineIcon /> Add a new action
                    </button>
                  </div>
                ))}

              </List>


            </Box>
          </Grid>


          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="/app/incident-management/registration/root-cause-analysis/basic-cause/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="/app/incident-management/registration/root-cause-analysis/management-control/"
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem={"Basic cause and action"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default BasicCauseAndAction;
