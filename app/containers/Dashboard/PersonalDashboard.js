import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import brand from "dan-api/dummy/brand";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
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

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

import ProjectImg from "dan-images/projectImages/projectimg.jpg";
import ProjectImgOne from "dan-images/projectImages/projectimgone.jpg";
import cTower from "dan-images/projectImages/cTower.png";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useHistory, useParams } from "react-router";

import axios from "axios";
import api from "../../utils/axios";
import {
  ACCOUNT_API_URL,
  HEADER_AUTH,
  LOCAL_LOGIN_URL,
  API_VERSION,
  SELF_API,
  LOGOUT_URL,
} from "../../utils/constants";

// Styles
import Fonts from "dan-styles/Fonts.scss";
import { Typography } from "@material-ui/core";
import { async } from "fast-glob";

// redux

import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { projectName, company } from "../../redux/actions/initialDetails";
import Hexagon from "./Hexagon";
import './style.css';

const useStyles = makeStyles((theme) => ({
  //Project selections
  cardContentBox: {
    minWidth: "260px",
  },
  cardActionAreaBox: {
    "&:hover .MuiCardMedia-root": {
      webkitTransform: "scale(1.2)",
      mozTransform: "scale(1.2)",
      mozTransform: "scale(1.2)",
      transform: "scale(1.2)",
      webkitFilter: "grayscale(0%)",
      filter: "grayscale(0%)",
    },
  },
  cardMediaBox: {
    overflow: "hidden",
    height: "300px",
  },
  media: {
    height: "300px",
    webkitTransition: "all 1.5s ease",
    mozTransition: "all 1.5s ease",
    msTransition: "all 1.5s ease",
    oTransition: "all 1.5s ease",
    transition: "all 1.5s ease",
    webkitFilter: "grayscale(100%)",
    filter: "grayscale(100%)",
  },
  projectSelectionTitle: {
    fontSize: "14px",
    color: "#06425c",
    fontWeight: "600",
    whiteSpace: "normal",
    lineHeight: "22px",
  },
  projectSelectionCode: {
    fontSize: "13px",
  },
  actionBttmArea: {
    float: "right",
    "& button svg": {
      color: "#06425c",
    },
  },
  projectName: {
    fontSize: "13px",
    paddingLeft: "0px",
    paddingRight: "0px",
    color: "#ffffff",
    "& .MuiSvgIcon-root": {
      marginLeft: "4px",
      fontSize: "15px",
    },
  },
  cTowerIcon: {
    width: "22px",
    height: "22px",
    "& img": {
      width: "12px",
      objectFit: "contain",
    },
  },

  //company selections
  companyNameList: {
    "& .MuiListItemText-primary": {
      fontSize: "14px",
      fontFamily: "Montserrat-Medium",
      color: "#054D69",
    },
    "& .MuiListItemText-secondary": {
      fontSize: "12px",
      fontFamily: "Montserrat-Medium",
      color: "#054D69",
    },
  },

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
    padding: theme.spacing(4),
  },
  centeredDialogContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  const history = useHistory();
  const classesm = useStyles();
  // define props
  const [userData, setUserData] = useState([]);
  const [companyListData, setCompanyListData] = useState([]);
  const [companyId, setCompanyId] = useState(0)
  const [projectListData, setProjectListData] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [projectOpen, setProjectOpen] = React.useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState([]);
  const [applications, setApplications] = useState([]);
  const [modules, setModules] = useState([]);
  const [codes, setCode] = useState([])

  const getSubscriptions = async (compId) => {

    const companyId = compId || JSON.parse(localStorage.getItem('company')).fkCompanyId
    if(companyId){

      try {
        let data = await api.get(`${SELF_API}${companyId}/`)
          .then(function (res) {
            
  
            return res.data.data.results.data.companies[0].subscriptions;
          
          })
          .catch(function (error) {
            console.log(error);
          });
        
  
        await setSubscriptions(data)
  
  
        const apps = data.map(app => app.appId)
      
        let app = data.filter(app => app.appCode === "safety")
      
        let module = app[0].modules.map(item => {
          if (item.subscriptionStatus == "active") {
            
            return item.moduleCode
          }
        })
  
        setCode(module)
        getModules(apps)
      } catch (error) { }
    }

  }

  const getModules = async (apps) => {
    let data = await api
      .post(`${ACCOUNT_API_URL}${API_VERSION}applications/modules/`, { "fkAppId": apps })
      .then(function (res) {
        return res.data.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });
    await setModules(data)
    let data1 = apps.filter(item => item.appId === 1)
    
    const codes = data.map(module => module.subscriptionStatus)
    
    // setCode(codes)



  }

  const handleClick = (appCode) => {
    let fkAppId = ""

    let fkApp = modules.map(module => {
      if (module.moduleCode === appCode) {
        fkAppId = module.fkAppId
        return module.fkAppId && module.fkAppId;
      }
    })

    let targetPage = modules.map(module => {
      if (module.moduleCode == appCode) {
        return module.targetPage;
      }
    }).join(' ')
    // console.log({targetPage:apps.appId})

    let clientId = ''
    let hostings = subscriptions.map(apps => {

      if (fkAppId === apps.appId) {
        clientId = apps.hostings[0].clientId
        return apps.hostings;
      }
    })[0];

    
    if (clientId) {

      window.open(
        ACCOUNT_API_URL + API_VERSION + 'user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + JSON.parse(localStorage.getItem('company')).fkCompanyId + '&projectId=' + JSON.parse(localStorage.getItem('projectName')).projectName.projectId,
        '_blank' // <- This is what makes it open in a new window.
      ).onClick();
    }

    // window.open(
    //   window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+clientId+'&response_type=code',
    //   '_blank' // <- This is what makes it open in a new window.
    // );

  }

  const handleDisableModule = (appcode) => {
    alert(appcode)
    let moduleDisable = modules.map(module => {
      if (module.moduleCode == appCode) {
        return false;
      }
      else {
        return true
      }
    })[0]


  }
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
// multi tenant architecture, fetch company
  const fetchCompany = async(url)=>{
    let config = {
      method:'get',
      url:url,
      headers:HEADER_AUTH,
    }
    await (config)
  }

  // compney name get
  const handleCompanyName = async (e, key, name) => {
    let hosting = companyListData.filter(company => company.companyId === e)[0]
    .subscriptions
    .filter(subscription => subscription.appCode == "safety")[0]
    .hostings[0].apiDomain
    let config = {
      method: "get",
      url: `${hosting}/api/v1/core/companies/select/${e}/`,
      headers: HEADER_AUTH,
    };
    axios(config)
    let companeyDetails = {};
    companeyDetails.fkCompanyId = e;
    await getSubscriptions(e)
    companeyDetails.fkCompanyName = name;
    dispatch(company(companeyDetails))
    setCompanyId(e)
    localStorage.setItem("company", JSON.stringify(companeyDetails));
    let newData = companyListData[key];
    if (newData.projects.length === 1) {
      await setProjectListData(newData.projects[0]);
      await setOpen(false);
      let data = newData.projects[0];
      await dispatch(projectName(data));
      localStorage.setItem("projectName", JSON.stringify(data));


    } else if (newData.projects.length > 1) {
      await setProjectListData(newData.projects);
      handleProjectOpen();
      await setOpen(false);
    }
    else {
      await setOpen(false);
    }

  };

  //Project selections
  const handleProjectOpen = () => {
    setProjectOpen(true);
  };

  const handleProjectClose = () => {
    setProjectOpen(false);
  };
  // handle project Name
  const handleProjectName = async (key) => {
    let data = projectListData[key];
    await dispatch(projectName(data));
    localStorage.setItem("projectName", JSON.stringify(data));
    setProjectOpen(false);
  };

  // fetch user data
  const userDetails = async (comId = 0, proId = 0, redback = '', tarPage = '', tarId) => {
    let config = {
      method: "get",
      url: `${SELF_API}`,
      headers: HEADER_AUTH,
    };
    await axios(config)
      .then(function (response) {

        if (response.status === 200) {
          if (comId != 0) {
            response.data.data.results.data.companies = response.data.data.results.data.companies.filter(comp => comp.companyId == comId)
          }
          
          if (response.data.data.results.data.companies.length > 1) {
            const companey = JSON.parse(localStorage.getItem("company"));
            if (companey === null) {
              setCompanyListData(response.data.data.results.data.companies);
              setOpen(true);
            }
          }
          if (response.data.data.results.data.companies.length === 1) {
            let hosting = response.data.data.results.data.companies.filter(company => company.companyId === response.data.data.results.data.companies[0].companyId)[0]
            .subscriptions
            .filter(subscription => subscription.appCode == "safety")[0]
            .hostings[0].apiDomain
            let config = {
              method: "get",
              url: `${hosting}/api/v1/core/companies/select/${response.data.data.results.data.companies[0].companyId}/`,
              headers: HEADER_AUTH,
            };
            axios(config)
            let companeyDetails = {};
            companeyDetails.fkCompanyId =
              response.data.data.results.data.companies[0].companyId;
              console.log({userDetails:response.data.data.results.data.companies})
            // const subscriptionData = 
            getSubscriptions(response.data.data.results.data.companies[0].companyId)
            setCompanyId(response.data.data.results.data.companies[0].companyId)
            companeyDetails.fkCompanyName =
              response.data.data.results.data.companies[0].companyName;
            localStorage.setItem("company", JSON.stringify(companeyDetails));
            dispatch(company(companeyDetails))
            let newData = response.data.data.results.data.companies[0];
            if (newData) {
              if (proId != 0) {
                newData.projects = newData.projects.filter(proj => proj.projectId == proId)
              }
              if (newData.projects.length === 1) {
                dispatch(projectName(newData.projects[0]));
                localStorage.setItem(
                  "projectName",
                  JSON.stringify(newData.projects[0])
                );
              }
              if (newData.projects.length > 1) {
                if(JSON.parse(localStorage.getItem('projectName')===null)){
                  setProjectListData(newData.projects);
                  setProjectOpen(true);
                }
               
                // setOpen(true);
              }
            }
          }
          setUserData(response.data.data.results);
        }
      })
      .catch(function (error) {
        // localStorage.removeItem("access_token");
        // localStorage.clear();
        // window.location.href = `${LOGOUT_URL}`; 
      
      });
  };

  useEffect(() => {
    let state = localStorage.getItem('direct_landing')
    let comId = 0
    let proId = 0
    let redback = ''
    let tarPage = ''
    let tarId = 0
    
    if (state != null) {
      let internal = state.split("{'")[1].split("'}")[0].split("', '")
      let newArr = {}
      internal.map(i => {
        newArr[i.split("':")[0]] = i.split(": '")[1]
      })
      state = newArr

      comId = state.companyId
      proId = state.projectId
      redback = state.redirect_back
      tarPage = state.targetPage
      tarId = state.targetId
    }
    userDetails(comId, proId, redback, tarPage, tarId);
    // userDetails();
    getSubscriptions();
    
  }, []);

  return (
    <PapperBlock title="Home" icon="ion-md-list-box">
      <div className="seven_hexagon_row">
        <div className="honeycomb">
          <div className="ibws-fix hexagon_row1">

            <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className={!(codes.includes('HSE')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box">
                <a
                  className="hse_health_safety_environment_mgmt_new"
                  onClick={() => handleClick('HSE')}
                >
                  <p>HSE Management</p>
                </a>
              </div>
            </div>

            <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className={!(codes.includes('compliance')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"} >
              <div className="hexagontent hexagon_content_box">
                <a className="hse_compliance_protocols" onClick={() => handleClick('compliance')}>
                  <p>Compliance Protocols</p>
                </a>
              </div>
            </div>

            <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className={!(codes.includes('incidents')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box" >
                <a
                  className="hse_incident_reporting_management"
                  onClick={() => handleClick('incidents')}
                >
                  <p >Incident Management</p>
                </a>
              </div>
            </div>

            <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>
          </div>

          {/* Action Tracker

          Permit Management */}

          <div className="ibws-fix hexagon_row2">
            <div className={!(codes.includes('ProjectInfo')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box">
                <a className="project_information_hub" onClick={() => handleClick('ProjectInfo')}>
                  <p>Project Information Hub </p>
                </a>
              </div>
            </div>

            <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className={!(codes.includes('assessments')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box">
                <a className="hse_smart_permit_management" onClick={() => handleClick('assessments')}>
                  <p>Assessments</p>
                </a>
              </div>
            </div>

            <div className={!(codes.includes('observations')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box">
                <a className="hse_observations" onClick={() => handleClick('observations')}>
                  <p>Observations</p>
                </a>
              </div>
            </div>

            <div className={!(codes.includes('intelligent_permit_management')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box">
                <a
                  className="hse_intelligent_permit_management_new"
                  onClick={() => handleClick('intelligent_permit_management')}
                >
                  <p>Permit Management</p>
                </a>
              </div>
            </div>

            {/* <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}

            <div className={!(codes.includes('env_management')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box">
                <a
                  className="hse_environment_development"
                  onClick={() => handleClick('env_management')}
                >
                  <p>Environment Management</p>
                </a>
              </div>
            </div>
            <div className={!(codes.includes('collaboration')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box">
                <a
                  className="hse_rapid_knowledge_collaboration"
                  onClick={() => handleClick('collaboration')}
                >
                  <p>Rapid Knowledge & Collaboration</p>
                </a>
              </div>
            </div>
          </div>

          <div className="ibws-fix hexagon_row1">
            <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className="hexagon bghide_in_view hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className="hexagon hide_responsiv hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className="hexagon bghide_in_view hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className="hexagon bghide_in_view hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>

            <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div>
          </div>
        </div>
      </div>

      {/* <Hexagon companyId={companyId}/> */}
      {/* Company */}

      <Dialog
        className={classes.projectDialog}
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose(event, reason);
          }
        }}
        PaperProps={{
          style: {
            width: 400,
          },
        }}
      >
        <DialogTitle onClose={handleClose}>
          Select Company
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <List>
                  {companyListData.length > 0
                    ? companyListData.map((selectValues, key) => (
                      <ListItem
                        button
                        key={key}
                        onClick={() =>
                          handleCompanyName(
                            selectValues.companyId,
                            key,
                            selectValues.companyName
                          )
                        }
                      >
                        <ListItemAvatar>
                          <Avatar variant="rounded">
                            <ImageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          className={classes.companyNameList}
                          primary={selectValues.companyName}
                        />
                      </ListItem>
                    ))
                    : null}
                </List>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* Project  */}
      <Dialog
        className={classes.projectDialog}
        fullScreen
        scroll="paper"
        open={projectOpen}
        onClose={handleProjectClose}
      >
        <DialogTitle onClose={handleProjectClose}>
        Select a Project
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={4}>
              {projectListData.length > 0
                ? projectListData.map((selectValues, key) => (
                  <Grid
                    item
                    md={4}
                    sm={6}
                    xs={12}
                    className={classesm.cardContentBox}
                    key={key}
                  >
                    <Card
                      
                  
                      onClick={() => handleProjectName(key)}
                    >
                      <CardActionArea className={classesm.cardActionAreaBox}>
                        <div className={classesm.cardMediaBox}>
                          <CardMedia
                            className={classesm.media}
                            image={ProjectImg}
                          //title=""
                          />
                        </div>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classesm.projectSelectionTitle}
                          >
                            {selectValues.projectName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classesm.projectSelectionCode}
                          >
                            Code: {selectValues.projectCode}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <Divider />
                      <CardActions className={classesm.actionBttmArea}>
                        <Tooltip title="Control Tower">
                          <IconButton aria-label="control tower">
                            <Avatar
                              className={classesm.cTowerIcon}
                              src={cTower}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="GIS Location">
                          <IconButton aria-label="GIS location">
                            <LocationOnIcon />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
                : null}
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
const DashboardInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(PersonalDashboard);
export default withStyles(styles)(DashboardInit);