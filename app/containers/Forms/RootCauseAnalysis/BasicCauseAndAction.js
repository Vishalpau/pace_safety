import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import { BASIC_CAUSE_SUB_TYPES } from "../../../utils/constants";
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
  const [data, setData] = useState([]);
  const history = useHistory();
  const putId = useRef("");
  const handelShowData = async () => {
    let tempApiData = {};
    let subTypes = BASIC_CAUSE_SUB_TYPES;

    let previousData = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`
    );

    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType)) {
        let valueQuestion = value.rcaSubType;
        let valueAnser = value.rcaRemark;
        tempApiData[valueQuestion] = valueAnser.includes(",")
          ? valueAnser.split(",")
          : [valueAnser];
      }
    });

    await setData(tempApiData);
  };

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }
  const handelNext = () => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    putId.current = lastItem;
    if (!isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/management-control/${localStorage.getItem(
          "fkincidentId"
        )}`
      );
    } else {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/management-control/`
      );
    }
  };

  let form_link = window.location.href;

  useEffect(() => {
    handelShowData();
  }, []);
  const classes = useStyles();
  return (
    <PapperBlock title="Actions Against Basic Causes" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Number
            </Typography>
            <Typography className={Type.labelValue}>
              {localStorage.getItem("fkincidentId")}
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Method
            </Typography>
            <Typography className={Type.labelValue}>5 Why Analysis</Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" gutterBottom>
              Actions
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" gutterBottom>
              Option Selected from Basic Cause
            </Typography>

            {Object.entries(data).map(([key, value]) => (
              <List
                className={classes.list}
                component="ul"
                subheader={
                  <ListSubheader
                    disableGutters
                    disableSticky
                    component="div"
                    id="selected-options"
                  >
                    {key}
                  </ListSubheader>
                }
              >
                {value.map((value) => (
                  <ListItemText primary={value} />
                ))}
              </List>
            ))}
            <button className={classes.textButton}>
              <AddCircleOutlineIcon /> Add a new action
            </button>
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
              onClick={(e) => handelNext()}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem={"Basic Cause and Action"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default BasicCauseAndAction;
