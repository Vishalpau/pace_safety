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

import axios from "axios";
import api from "../../utils/axios";
import { access_token, SELF_API } from "../../utils/constants";

// Styles
import Fonts from "dan-styles/Fonts.scss";
import { Typography } from "@material-ui/core";
import { async } from "fast-glob";

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
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
}));

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
  const [userData, setUserData] = useState([]);
  const [companyListData, setCompanyListData] = useState([]);
  const [projectListData, setProjectListData] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [isCompneyDropDown, setIsCommpaneyDropDown] = useState(true);
  const [isProjectDropDown, setIsProjectDropDown] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompanyName = async(e,key) => {
    localStorage.setItem("companyListData", e);
    let newData = companyListData[key];
    alert(newData.length)
    if(newData.length > 1){
      await setProjectListData(newData.projects);
    }
    if(newData.length === 1){
      await setProjectListData(newData.projects);
      await setOpen(false);
    }
    else if(newData.length === 0 || newData.length === undefined){
      alert(newData.length)
      await setOpen(false);
      localStorage.removeItem('projectDataList')
    }

    // setOpen(false);
  };

  const handleProjectName = async(key)=>{
    let data = {
      projectName: projectListData[key]
    }
    localStorage.setItem('projectDataList',JSON.stringify(data.projectName))
  }

  const loggingCheck = async () => {
    let config = {
      method: "get",
      url: `${SELF_API}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    console.log("config", config);
    await axios(config)
      .then(function(response) {
        if (response.status === 200) {
          console.log(response.data.data.results.data);
          if (response.data.data.results.data.companies.length > 0) {
            setCompanyListData(response.data.data.results.data.companies);
            setOpen(true);
          }
          setUserData(response.data.data.results);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useState(() => {
    loggingCheck();
  });
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
      <Modal className={style.modal} open={open} onClose={handleClose}>
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth={true}
                className={style.filterSelect}
              >
                <InputLabel id="filter3-label">Company name</InputLabel>
                <Select
                  labelId="filter3-label"
                  id="filter3"
                  // value={age}
                  label="Phases"
                  style={{ width: "100%" }}
                >
                  {companyListData.map((selectValues, key) => (
                    <MenuItem 
                    key={key}
                    onClick={() => handleCompanyName(selectValues.companyId,key)} 
                    value={selectValues.companyId}>
                      {selectValues.companyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {projectListData.length>0?
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth={true}
                className={style.filterSelect}
              >
                <InputLabel id="filter3-label">Project</InputLabel>
                <Select
                  labelId="filter3-label"
                  id="filter3"
                  // value={age}
                  // onChange={handleChange}
                  label="Phases"
                  style={{ width: "100%" }}
                >
                 {projectListData.map((selectValues, key) => (
                    <MenuItem 
                    key={key} 
                    onClick={()=>handleProjectName(key)}
                    value={selectValues.projectId}>
                      {selectValues.projectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>:null}

            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disableElevation
                onClick={()=>setOpen(false)}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </PapperBlock>
  );
}

PersonalDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalDashboard);
