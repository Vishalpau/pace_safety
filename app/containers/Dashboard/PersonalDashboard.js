import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import brand from "dan-api/dummy/brand";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import {
  SliderWidget,
  CounterIconsWidget,
  PerformanceChartWidget,
  DateWidget,
  TaskWidget,
  WeatherWidget,
  ContactWidget,
  TimelineWidget,
  FilesWidget,
} from "dan-components";
import styles from "./dashboard-jss";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { PapperBlock } from "dan-components";

import "../../styles/custom/hexagon.css";
import icons from "dan-api/images/icons";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import axios from "axios";
import api from "../../utils/axios";
import {
  HEADER_AUTH,
  LOCAL_LOGIN_URL,
  LOGIN_URL,
  SELF_API,
} from "../../utils/constants";

// Styles
import Fonts from "dan-styles/Fonts.scss";
import { Typography } from "@material-ui/core";
import { async } from "fast-glob";

// redux

import { useDispatch } from "react-redux";

import {
  projectName,
} from "../../redux/actions/initialDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 650,
    backgroundColor: "#fff",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

function PersonalDashboard(props) {
  const title = brand.name + " - Personal Dashboard";
  const description = brand.desc;
  const { classes } = props;
  const style = useStyles();
  // define props
  const [userData, setUserData] = useState([]);
  const [companyListData, setCompanyListData] = useState([]);
  const [projectListData, setProjectListData] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  // compney name get
  const handleCompanyName = async (e, key, name) => {
    console.log(e, key, name)
    let companeyDetails = {};
    companeyDetails.fkCompanyId = e;
    companeyDetails.fkCompanyName = name;
    localStorage.setItem("company", JSON.stringify(companeyDetails));
    let newData = companyListData[key];
    if (newData) {
      await setProjectListData(newData.projects);
    } else {
      await setOpen(false);
    }
  };

  // handle project Name
  const handleProjectName = async (key) => {    
    let data = projectListData[key];
    await dispatch(projectName(data));
    localStorage.setItem("projectName", JSON.stringify(data));
    setOpen(false);
  };

  // fetch user data
  const userDetails = async () => {
    let config = {
      method: "get",
      url: `${SELF_API}`,
      headers: HEADER_AUTH,
    };
    await axios(config)
      .then(function(response) {
        if (response.status === 200) {
          if (response.data.data.results.data.companies.length > 1) {
            setCompanyListData(response.data.data.results.data.companies);
            setOpen(true)
          }
          if(response.data.data.results.data.companies.length === 1){
            let companeyDetails = {};
              companeyDetails.fkCompanyId = response.data.data.results.data.companies[0].id;
              companeyDetails.fkCompanyName = response.data.data.results.data.companies[0].name;
              localStorage.setItem("company", JSON.stringify(companeyDetails));
              let newData = response.data.data.results.data.companies[0];
              if (newData) {
                if(newData.projects.length === 1){
                  dispatch(projectName(newData.projects[0]))
                  localStorage.setItem("projectName", JSON.stringify(newData.projects[0]));
                }
                if(newData.projects.length > 1){
                   setProjectListData(newData.projects);
                  setOpen(true)
                }              
              }
          }
          setUserData(response.data.data.results);
        }
      })
      .catch(function(error) {
      });
  };

  useState(() => {
    userDetails();
  },[]);

  return (
    <PapperBlock title="Dashboard" icon="ion-md-warning">
      <div class="honeycomb">
        <div class="ibws-fix hexagon_row1">
          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a
                class="hse_health_safety_environment_mgmt_new"
                href="#"
                target="_blank"
              >
                <p>HSE Management</p>
              </a>
            </div>
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a class="hse_compliance_protocols" href="#" target="_blank">
                <p>Compliances</p>
              </a>
            </div>
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a
                class="hse_incident_reporting_management"
                href="#"
                target="_blank"
              >
                <p>Incidents</p>
              </a>
            </div>
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>
        </div>

        <div class="ibws-fix hexagon_row2">
          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a class="project_information_hub" href="#" target="_blank">
                <p>Project Information Hub</p>
              </a>
            </div>
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a class="hse_smart_permit_management" href="#" target="_blank">
                <p>Assessments</p>
              </a>
            </div>
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a class="hse_environment_development" href="#" target="_blank">
                <p>Observations</p>
              </a>
            </div>
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a
                class="hse_intelligent_permit_management_new"
                href="https://ntpc-stage.teknobuilt.com/index.php?do=/permitmanagement/projectid_1/phaseid_1/uid_0/type_2/wctype_iwp/"
                target="_blank"
              >
                <p>Intelligent Permits</p>
              </a>
            </div>
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a class="hse_environment_development" href="#" target="_blank">
                <p>Observations</p>
              </a>
            </div>
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a
                class="hse_rapid_knowledge_collaboration"
                href="javascript:void(0);"
              >
                <p>Rapid Knowledge &amp; Collaboration</p>
              </a>
            </div>
          </div>
        </div>

        <div class="ibws-fix hexagon_row3">
          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon bghide_in_view hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hide_responsiv hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon bghide_in_view hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon bghide_in_view hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>
        </div>
      </div>
      {/* Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            width: 700,
          },
        }}
      >
        <DialogTitle id="choose-project-title">
          {"Choose a Project"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="choose-project-content">
            <Grid container spacing={2} className={classes.paper}>
              {/* Compney dropdown */}
              {companyListData.length>1?
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  className={style.filterSelect}
                >
                  <InputLabel id="company-label">Company name</InputLabel>
                  <Select
                    labelId="company-label"
                    id="company"
                    // value={age}
                    label="Company name"
                    style={{ width: "100%" }}
                  >
                    {companyListData.length > 0
                      ? companyListData.map((selectValues, key) => (
                          <MenuItem
                            key={key}
                            onClick={() =>
                              handleCompanyName(
                                selectValues.companyId,
                                key,
                                selectValues.companyName
                              )
                            }
                            value={selectValues.companyId}
                          >
                            {selectValues.companyName}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
             
                          :null}
            {/* Project Dropdown */}
              {projectListData.length > 1 ? (
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    className={style.filterSelect}
                  >
                    <InputLabel id="project-label">Project</InputLabel>
                    <Select
                      labelId="project-label"
                      id="project"
                      label="Project"
                      style={{ width: "100%" }}
                    >
                      {projectListData.length > 0?projectListData.map((selectValues, key) => (
                        <MenuItem
                          key={key}
                          onClick={() => handleProjectName(key)}
                          value={selectValues.projectId}
                        >
                          {selectValues.projectName}
                        </MenuItem>
                      )):null}
                    </Select>
                  </FormControl>
                </Grid>
              ) : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </PapperBlock>
  );
}

PersonalDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalDashboard);
