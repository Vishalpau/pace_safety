import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
// import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

// import { Helmet } from "react-helmet";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import ImageIcon from "@material-ui/icons/Image";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import axios from "axios";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import cTower from "dan-images/projectImages/cTower.png";
import ProjectImg from "dan-images/projectImages/projectimg.jpg";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// redux
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  company,
  projectName,
  breakDownDetails,
  appAcl,
} from "../../redux/actions/initialDetails";
import "../../styles/custom/hexagon.css";
import api from "../../utils/axios";
import {
  ACCOUNT_API_URL,
  API_VERSION,
  HEADER_AUTH,
  SELF_API,
  APPCODE,
  SSO_URL,
} from "../../utils/constants";
import styles from "./dashboard-jss";
import "./style.css";
import Loading from "dan-components/Loading";
import paceLogo from "dan-images/paceLogo.png";

const useStyles = makeStyles((theme) => ({
  // Project selections
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

  // company selections
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
  cardContentBox: {
    minWidth: "260px",
    position: "relative",
    height: "450px",
    "& .MuiPaper-root.MuiCard-root": {
      position: "absolute",
      width: "calc(100% - 32px)",
    },
  },
  cardContentBoxIndexHigh: {
    minWidth: "260px",
    position: "relative",
    height: "450px",
    zIndex: "999",
    "& .MuiPaper-root.MuiCard-root": {
      position: "absolute",
      width: "calc(100% - 32px)",
    },
  },
  projectDialog: {
    minWidth: 600,
  },
  cardActionAreaBox: {
    padding: "0px !important",
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
    height: "270px",
    position: "relative",
    borderRadius: "10px",
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
  projectTitleSection: {
    width: "100%",
    float: "left",
    position: "absolute",
    bottom: "0px",
    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,2))",
    padding: "20px 20px 14px 20px",
  },
  projectSelectionTitle: {
    fontSize: "16px",
    color: "#ffffff",
    lineHeight: "19px",
    fontFamily: "Montserrat-Medium !important",
    textAlign: "left",
    marginBottom: "0px",
  },
  projectCodeTitle: {
    fontSize: "14px",
    color: "#ffffff",
    fontFamily: "Montserrat-Regular !important",
    lineHeight: "32px",
    textAlign: "left",
    width: "60%",
    float: "left",
  },
  customTooltip: {
    backgroundColor: "rgba(6, 66, 92, 0.8)",
    padding: "8px",
    fontFamily: "Montserrat-Regular",
  },
  customArrow: {
    color: "rgba(6, 66, 92, 0.8)",
  },
  externalLinkSection: {
    textAlign: "right",
    width: "40%",
    float: "left",
    "& button": {
      padding: "0px",
      marginLeft: "2px",
      marginRight: "2px",
      "& svg": {
        width: "25px",
        filter: "brightness(0) invert(1)",
      },
      "&:hover svg": {
        filter: "brightness(1) invert(0)",
      },
    },
  },
  marginR: {
    marginRight: "8px !important",
  },
  actionBttmArea: {
    float: "right",
  },
  projectName: {
    fontSize: "13px",
    paddingLeft: "0px",
    paddingRight: "0px",
    color: "#ffffff !important",
    opacity: 1,
    "& .MuiSvgIcon-root": {
      marginLeft: "4px",
      fontSize: "15px",
    },
  },
  mainProjectMenuList: {
    padding: "0px 8px 0px 8px",
    boxShadow: "none",
    "& .MuiListItemText-root": {
      margin: "0px",
    },
    "& .Mui-expanded": {
      "& > ul > .MuiButtonBase-root": {
        backgroundColor: "#F28705",
        color: "#ffffff",
        "& .MuiListItemText-primary": {
          color: "#ffffff",
        },
      },
    },
  },
  sectionScrolling: {
    maxHeight: "135px",
    overflow: "auto",
    marginTop: "8px",
    marginRight: "3px",
    marginBottom: "5px",
    // paddingRight: '5px',
    "& .MuiAccordion-root.Mui-expanded": {
      margin: "0px 0",
      boxShadow: "none",
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    "& .MuiAccordionSummary-root": {
      padding: "0px",
      minHeight: "100%",
      "& .MuiAccordionSummary-content": {
        margin: "0px",
        "& ul": {
          padding: "0px",
        },
      },
    },
    "& .MuiAccordion-root:before": {
      height: "0px",
    },
  },
  sectionScrollingMax: {
    maxHeight: "150px",
    overflow: "auto",
    marginTop: "8px",
    marginRight: "3px",
    marginBottom: "5px",
    // paddingRight: '5px',
    "& .MuiAccordion-root.Mui-expanded": {
      margin: "0px 0",
      boxShadow: "none",
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    "& .MuiAccordionSummary-root": {
      padding: "0px",
      minHeight: "100%",
      "& .MuiAccordionSummary-content": {
        margin: "0px",
        "& ul": {
          padding: "0px",
        },
      },
    },
    "& .MuiAccordion-root:before": {
      height: "0px",
    },
  },
  listSection: {
    width: "100%",
    float: "left",
    padding: "0px",
  },
  phaseMenuList: {
    backgroundColor: "#7890A4",
    color: "#ffffff",
    borderRadius: "10px",
    marginBottom: "6px",
    "& .MuiListItemText-primary": {
      color: "#ffffff !important",
      fontSize: "14px",
      fontFamily: "Montserrat-Medium !important",
      lineHeight: "19px",
    },
    "& svg": {
      fontSize: "16px",
    },
    "&:hover": {
      backgroundColor: "#F28705",
    },
  },
  unitMenuList: {
    backgroundColor: "#DFDFDF",
    color: "#06425C",
    borderRadius: "10px",
    marginBottom: "6px",
    "& .MuiListItemText-primary": {
      color: "#06425C",
      fontSize: "14px",
      fontFamily: "Montserrat-Medium",
      lineHeight: "19px",
    },
    "& svg": {
      fontSize: "16px",
    },
    "&:hover": {
      backgroundColor: "#F28705",
      color: "#ffffff !important",
    },
    "&:hover .MuiListItemText-primary": {
      color: "#ffffff !important",
    },
  },
  workAreaList: {
    backgroundColor: "#F0F0F0",
    color: "#06425C",
    borderRadius: "10px",
    marginBottom: "6px",
    "& .MuiListItemText-primary": {
      color: "#06425C",
      fontSize: "14px",
      fontFamily: "Montserrat-Medium",
      lineHeight: "19px",
    },
    "&:hover": {
      backgroundColor: "#F28705",
      color: "#ffffff !important",
    },
    "&:hover .MuiListItemText-primary": {
      color: "#ffffff !important",
    },
  },
  subUnitSection: {
    padding: "0px 0px 0px 8px",
    display: "block",
    flexDirection: "row",
    "& .MuiAccordion-root": {
      boxShadow: "none",
    },
  },
  companyNamePsl: {
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    "& li": {
      padding: "0px",
      "& .MuiListItemText-primary": {
        color: "#06425C",
        fontSize: "20px",
        fontFamily: "Xolonium-Regular !important",
        lineHeight: "22px",
        paddingLeft: "10px",
      },
    },
  },
  pinBoardIconSection: {
    position: "absolute",
    zIndex: "1",
    top: "10px",
    right: "10px",
    "& button": {
      backgroundColor: "#06425C",
      padding: "6px 7px",
      "&:hover": {
        backgroundColor: "#E38005",
      },
    },
  },

  // company selections
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
  projectCloseButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
  },
  projecDialogHeadTitle: {
    marginBottom: "0px",
    "& h6": {
      color: "#fff",
      padding: "15px 15px 12px 15px",
      backgroundColor: "#06425C",
      borderRadius: "10px",
      fontFamily: "Montserrat-Medium !important",
      fontWeight: "normal",
      fontSize: "18px !important",
      "& svg": {
        marginRight: "10px",
      },
    },
    "& button": {
      top: "28px",
      color: "#ffffff",
      right: "24px",
    },
  },
}));

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

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
  const [companyId, setCompanyId] = useState(0);
  const [projectListData, setProjectListData] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [projectOpen, setProjectOpen] = React.useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState([]);
  const [applications, setApplications] = useState([]);
  const [modules, setModules] = useState([]);
  const [codes, setCode] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({});
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const [changeClass, setChangeClass] = React.useState(false);
  const [phaseSelect, setPhaseSelect] = React.useState([]);
  const [openPhase, setOpenPhase] = React.useState();
  const [secondBreakdown, setSecondBreakdown] = React.useState(null);
  const [thirdBreakdown, setThirdBreakdown] = React.useState(null);
  const [fourthBreakdown, setFourthBreakdown] = React.useState(null);
  const [openSubUnit, setOpenSubUnit] = React.useState();

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classesm.projectCloseButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const getSubscriptions = async (compId) => {
    const companyId =
      compId ||
      (JSON.parse(localStorage.getItem("company")) !== null &&
        JSON.parse(localStorage.getItem("company")).fkCompanyId);

    if (companyId) {
      try {
        const data = await api
          .get(`${SELF_API}${companyId}/`)
          .then((res) => {
            const rolesApi = res.data.data.results.data.companies[0].subscriptions.filter(
              (sub) => sub.appCode.toLowerCase() == APPCODE
            )[0].roles[0].aclUrl;
            api.get(`${ACCOUNT_API_URL.slice(0, -1)}${rolesApi}`).then((d) => {
              localStorage.setItem(
                "app_acl",
                JSON.stringify(d.data.data.results.permissions[0])
              );
            });
            return res.data.data.results.data.companies[0].subscriptions;
          })

          .catch((error) => {
            console.log(error);
          });

        setSubscriptions(data);

        dispatch(appAcl(d.data.data.results.permissions[0]));

        // redirectionAccount()

        const modules = data.map((subscription) => subscription.modules);
        let modulesState = [];
        let temp = [];
        modules.map((module) => {
          modulesState = [...modulesState];
          temp = [...temp];
          if (module.length > 0) {
            module.map((mod) => {
              modulesState.push(mod);
              // this.setState({modules: module})
              if (mod.subscriptionStatus == "active") {
                temp.push(mod.moduleCode);
                // this.setState({ codes: temp })
                return temp;
              }
            });
            // this.setState({ codes: codes })
          }
        });
        // let mod = ['incidents', 'knowledge', 'observations', 'actions', 'controltower', 'HSE', 'compliances', 'ProjectInfo', 'assessments', 'permits']
        setCode(temp);
        await getModules(apps);
      } catch (error) {}
    }
    // getAllPickList()
  };

  const redirectionAccount = () => {
    if (
      localStorage.getItem("lastState") != null &&
      localStorage.getItem("projectName") != null
    ) {
      const laststate = localStorage.getItem("lastState");
      localStorage.removeItem("lastState");
      history.push(laststate);
    }
    if (localStorage.getItem("projectName") != null) {
      setTimeout(() => history.push("app/icare"), 1000);
    }
  };

  const getModules = async (apps) => {
    const data = await api
      .post(`${ACCOUNT_API_URL}${API_VERSION}applications/modules/`, {
        fkAppId: apps,
      })
      .then((res) => res.data.data.results)
      .catch((error) => {
        console.log(error);
      });
    await setModules(data);
    // let data1 = apps.filter(item => item.appId === 1)

    const codes = data.map((module) => module.moduleCode);

    await setCode(codes);
  };

  const handleClick = async (appCode) => {
    const companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const { projectId } = JSON.parse(
      localStorage.getItem("projectName")
    ).projectName;

    const data = await api
      .get(
        ACCOUNT_API_URL +
          API_VERSION +
          "applications/modules/" +
          appCode +
          "/" +
          companyId +
          "/"
      )
      .then((res) => res.data.data.results)
      .catch((error) => {
        console.log(error);
      });

    if (data.hostings != undefined) {
      const targetPage = data.modules ? data.modules.targetPage : "";
      // alert(localStorage.getItem('companyId'))
      const { clientId } = data.hostings;
      window.open(
        ACCOUNT_API_URL +
          API_VERSION +
          "user/auth/authorize/?client_id=" +
          clientId +
          "&response_type=code&targetPage=" +
          targetPage +
          "&companyId=" +
          companyId +
          "&projectId=" +
          projectId
      ); // <- This is what makes it open in a new window.
    }
  };

  // const handleDisableModule = (appcode) => {
  //   let moduleDisable = modules.map(module => {
  //     if (module.moduleCode == appCode) {
  //       return false;
  //     }
  //     else {
  //       return true
  //     }
  //   })[0]
  // }

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  // multi tenant architecture, fetch company
  // const fetchCompany = async (url) => {
  //   let config = {
  //     method: 'get',
  //     url: url,
  //     headers: HEADER_AUTH,
  //   }
  //   await (config)
  // }

  // compney name get
  const handleCompanyName = async (e, key, name) => {
    const hosting = companyListData
      .filter((company) => company.companyId === e)[0]
      .subscriptions.filter(
        (subscription) => subscription.appCode.toLowerCase() == APPCODE
      )[0].hostings[0].apiDomain;
    const config = {
      method: "get",
      url: `${hosting}/api/v1/core/companies/select/${e}/`,
      headers: HEADER_AUTH,
    };
    axios(config);
    const companeyDetails = {};
    companeyDetails.fkCompanyId = e;
    await getSubscriptions(e);
    companeyDetails.fkCompanyName = name;
    dispatch(company(companeyDetails));
    setCompanyId(e);
    localStorage.setItem("company", JSON.stringify(companeyDetails));
    const newData = companyListData[key];
    // if (newData.projects.length === 1) {
    //   setProjectListData(newData.projects[0]);
    //   setOpen(false);
    //   let data = newData.projects[0];
    //   dispatch(projectName(data));
    //   localStorage.setItem("projectName", JSON.stringify(data));
    // }
    if (newData.projects.length > 0) {
      // setProjectListData(newData.projects);
      handleProjectOpen(newData.projects);
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const fetchPhaseData = async (projects) => {
    const data = [];
    for (let i = 0; i < projects.length; i++) {
      if (
        projects[i].breakdown &&
        projects[i].breakdown.length > 0 &&
        projects[i].breakdown[0].structure &&
        projects[i].breakdown[0].structure[0].url
      ) {
        const config = {
          method: "get",
          url: `${SSO_URL}/${projects[i].breakdown[0].structure[0].url}`,
          headers: HEADER_AUTH,
        };
        const res = await axios(config);
        if (res && res.status && res.status === 200) {
          projects[i].firstBreakdown = res.data.data.results;
          data.push(projects[i]);
        } else {
          projects[i].firstBreakdown = [];
          data.push(projects[i]);
        }
      } else {
        projects[i].firstBreakdown = [];
        data.push(projects[i]);
      }
    }
    return data;
  };

  // Project selections
  const handleProjectOpen = async (projects) => {
    if (projects) {
      const data = await fetchPhaseData(projects);
      setProjectListData([...data]);
    }
    setProjectOpen(true);
  };

  const handleProjectClose = () => {
    setProjectOpen(false);
  };

  // handle project Name
  const handleProjectName = async (key) => {
    const data = projectListData[key];
    await dispatch(projectName(data));
    localStorage.setItem("projectName", JSON.stringify(data));
    setProjectOpen(false);
    redirectionAccount();
  };

  // fecthing project structure with name and label
  const handelProjectStruct = async (compId, proId, tarProjectStruct) => {
    const breakDownData = JSON.parse(tarProjectStruct);
    localStorage.setItem("selectBreakDown", JSON.stringify(breakDownData));
    dispatch(breakDownDetails(breakDownData));
    redirectionAccount();
  };
  // end fetching name and label

  // fetch user data
  const userDetails = async (
    comId = 0,
    proId = 0,
    redback = "",
    tarPage = "",
    tarId
  ) => {
    const config = {
      method: "get",
      url: `${SELF_API}`,
      headers: HEADER_AUTH,
    };
    await axios(config).then((response) => {
      localStorage.setItem(
        "companiesCount",
        response.data.data.results.data.companies.length
      );
      // setIsLoading(true)
      if (response.status === 200) {
        if (comId != 0) {
          response.data.data.results.data.companies = response.data.data.results.data.companies.filter(
            (comp) => comp.companyId == comId
          );
        }
        if (response.data.data.results.data.companies.length === 1) {
          // console.log(
          //   response.data.data.results.data.companies.filter(
          //     (company) =>
          //       company.companyId ===
          //       response.data.data.results.data.companies[0].companyId
          //   )[0],
          //   "ppppppppppppppppppppppppppp"
          // );
          const companyDataArr = response.data.data.results.data.companies;
          handleProjectOpen(companyDataArr[0].projects);
          setOpen(false);
          setCompanyListData(response.data.data.results.data.companies);
          const hosting = companyDataArr[0].subscriptions.filter(
            (subscription) => subscription.appCode.toLowerCase() == APPCODE
          )[0].hostings[0].apiDomain;
          const config = {
            method: "get",
            url: `${hosting}/api/v1/core/companies/select/${
              companyDataArr[0].companyId
            }/`,
            headers: HEADER_AUTH,
          };
          axios(config);
          const companeyDetails = {};
          companeyDetails.fkCompanyId = companyDataArr[0].companyId;

          // const subscriptionData =
          getSubscriptions(companyDataArr[0].companyId);
          setCompanyId(companyDataArr[0].companyId);
          companeyDetails.fkCompanyName = companyDataArr[0].companyName;
          localStorage.setItem("company", JSON.stringify(companeyDetails));
          dispatch(company(companeyDetails));
          const newData = companyDataArr[0];
          if (newData) {
            if (proId != 0) {
              newData.projects = newData.projects.filter(
                (proj) => proj.projectId == proId
              );
            }
            if (newData.projects.length === 1) {
              dispatch(projectName(newData.projects[0]));
              localStorage.setItem(
                "projectName",
                JSON.stringify(newData.projects[0])
              );
              redirectionAccount();
            }
            if (newData.projects.length > 1) {
              if (JSON.parse(localStorage.getItem("projectName") === null)) {
                setProjectListData(newData.projects);
                setProjectOpen(true);
              }
              // setOpen(true);
            }
          }
        } else if (response.data.data.results.data.companies.length > 1) {
          const companey = JSON.parse(localStorage.getItem("company"));
          if (companey === null) {
            setCompanyListData(response.data.data.results.data.companies);
            setOpen(true);
          }
        }
        setUserData(response.data.data.results);
      }
    });
  };

  const fetchUserDetails = async (
    compId,
    proId,
    targetPage,
    tarProjectStruct,
    tarId
  ) => {
    // window.location.href = `/${tagetPage}`
    try {
      if (compId) {
        const config = {
          method: "get",
          url: `${SELF_API}`,
          headers: HEADER_AUTH,
        };

        await api(config).then(async (response) => {
          if (response.status === 200) {
            // localStorage.setItem('companiesCount', response.data.data.results.data.companies.length);
            // setIsLoading(true)
            const hosting = response.data.data.results.data.companies
              .filter((company) => company.companyId == compId)[0]
              .subscriptions.filter(
                (subs) => subs.appCode.toLowerCase() === APPCODE
              )[0].hostings[0].apiDomain;

            localStorage.setItem("apiBaseUrl", hosting);
            const data1 = {
              method: "get",
              url: `${hosting}/api/v1/core/companies/select/${compId}/`,
              headers: HEADER_AUTH,
            };
            axios(data1).then(async (res) => {
              const responseData = JSON.stringify(
                response.data.data.results.data
              );
              localStorage.setItem("userDetails", responseData);

              if (compId) {
                const companies = response.data.data.results.data.companies.filter(
                  (item) => item.companyId == compId
                );
                const companeyData = {
                  fkCompanyId: companies[0].companyId,
                  fkCompanyName: companies[0].companyName,
                };
                localStorage.setItem("company", JSON.stringify(companeyData));
                dispatch(company(companeyData));
              }

              if (proId) {
                const companies = response.data.data.results.data.companies.filter(
                  (item) => item.companyId == compId
                );
                const project = companies[0].projects.filter(
                  (item) => item.projectId == proId
                );
                localStorage.setItem("projectName", JSON.stringify(project[0]));
                dispatch(projectName(project[0]));
              }

              // fetchPermissionData();
              if (res.status === 200) {
                await getSubscriptions().then((res) => {
                  setTimeout(() => {
                    // localStorage.removeItem("direct_loading");
                    history.push("/app/" + targetPage + tarId);
                  }, 1000);
                });
              }
            });
          }
        });
      }
    } catch (error) {}
    handelProjectStruct(compId, proId, tarProjectStruct);
  };

  const handelCallBack = async () => {
    const state = JSON.parse(localStorage.getItem("direct_loading"));
    const comId = 0;
    const proId = 0;
    const redback = "";
    const tarPage = "";
    const tarId = 0;
    if (state !== null) {
      await fetchUserDetails(
        state.comId,
        state.proId,
        state.tarPage,
        state.tarProjectStruct,
        state.tarId
      );
    } else {
      await userDetails(comId, proId, redback, tarPage, tarId);
    }
    await getSubscriptions();
  };

  useEffect(() => {
    handelCallBack();
    // redirectionAccount()
    if (localStorage.getItem("projectName") != null) {
      setTimeout(() => history.push("app/icare"), 1000);
    }
  }, []);

  const handlePhaseChange = (panel, phases, index, id) => async (
    event,
    isExpanded
  ) => {
    if (
      openPhase !== panel &&
      projectListData[index].breakdown &&
      projectListData[index].breakdown.length > 1 &&
      projectListData[index].breakdown[1].structure &&
      projectListData[index].breakdown[1].structure[0].url
    ) {
      const config = {
        method: "get",
        url: `${SSO_URL}/${
          projectListData[index].breakdown[1].structure[0].url
        }${id}`,
        headers: HEADER_AUTH,
      };
      const res = await axios(config);
      if (res && res.status === 200) {
        setSecondBreakdown([...res.data.data.results]);
      }
    } else {
      setSecondBreakdown(null);
    }
    setChangeClass(!!isExpanded);
    setPhaseSelect([phases]);
    setOpenPhase(isExpanded ? panel : false);
  };

  const [openUnit, setOpenUnit] = React.useState();
  const handleUnitChange = (panel, index, id) => async (event, isExpanded) => {
    if (
      openUnit !== panel &&
      projectListData[index].breakdown &&
      projectListData[index].breakdown.length > 2 &&
      projectListData[index].breakdown[2].structure &&
      projectListData[index].breakdown[2].structure[0].url
    ) {
      const config = {
        method: "get",
        url: `${SSO_URL}/${
          projectListData[index].breakdown[2].structure[0].url
        }${id}`,
        headers: HEADER_AUTH,
      };
      const res = await axios(config);
      if (res && res.status === 200) {
        setThirdBreakdown([...res.data.data.results]);
      }
    } else {
      setThirdBreakdown(null);
    }
    setOpenUnit(isExpanded ? panel : false);
  };

  const handleSubUnitChange = (panel, index, id) => async (
    event,
    isExpanded
  ) => {
    if (
      openUnit !== panel &&
      projectListData[index].breakdown &&
      projectListData[index].breakdown.length > 3 &&
      projectListData[index].breakdown[2].structure &&
      projectListData[index].breakdown[3].structure[0].url
    ) {
      const config = {
        method: "get",
        url: `${SSO_URL}/${
          projectListData[index].breakdown[3].structure[0].url
        }${id}`,
        headers: HEADER_AUTH,
      };
      const res = await axios(config);
      if (res && res.status === 200) {
        setFourthBreakdown([...res.data.data.results]);
      }
    } else {
      setFourthBreakdown(null);
    }
    setOpenSubUnit(isExpanded ? panel : false);
  };

  const handleProjectBreakdown = (
    index,
    phaseIndex,
    unitIndex,
    subUnitIndex,
    subSubUnitIndex,
    depth
  ) => {
    const data = [];
    const temp = [];

    data.push({
      depth: "1L",
      id: projectListData[index].firstBreakdown[phaseIndex].id,
      label: projectListData[index].breakdown[0].structure[0].name,
      name: projectListData[index].firstBreakdown[phaseIndex].structureName,
    });
    temp.push({
      breakdownLabel: projectListData[index].breakdown[0].structure[0].name,
      breakdownValue: projectListData[index].firstBreakdown,
      selectValue: "",
    });

    if (depth === "4L") {
      data.push({
        depth: "2L",
        id: secondBreakdown[unitIndex].id,
        label: projectListData[index].breakdown[1].structure[0].name,
        name: secondBreakdown[unitIndex].structureName,
      });
      data.push({
        depth: "3L",
        id: thirdBreakdown[subUnitIndex].id,
        label: projectListData[index].breakdown[2].structure[0].name,
        name: thirdBreakdown[subUnitIndex].structureName,
      });
      data.push({
        depth: "4L",
        id: fourthBreakdown[subSubUnitIndex].id,
        label: projectListData[index].breakdown[2].structure[0].name,
        name: fourthBreakdown[subSubUnitIndex].structureName,
      });
      temp.push({
        breakdownLabel: projectListData[index].breakdown[1].structure[0].name,
        breakdownValue: secondBreakdown,
        selectValue: "",
      });
      temp.push({
        breakdownLabel: projectListData[index].breakdown[2].structure[0].name,
        breakdownValue: thirdBreakdown,
        selectValue: "",
      });
      temp.push({
        breakdownLabel: projectListData[index].breakdown[3].structure[0].name,
        breakdownValue: fourthBreakdown,
        selectValue: "",
      });
    }
    if (depth === "3L") {
      data.push({
        depth: "2L",
        id: secondBreakdown[unitIndex].id,
        label: projectListData[index].breakdown[1].structure[0].name,
        name: secondBreakdown[unitIndex].structureName,
      });
      data.push({
        depth: "3L",
        id: thirdBreakdown[subUnitIndex].id,
        label: projectListData[index].breakdown[2].structure[0].name,
        name: thirdBreakdown[subUnitIndex].structureName,
      });
      temp.push({
        breakdownLabel: projectListData[index].breakdown[1].structure[0].name,
        breakdownValue: secondBreakdown,
        selectValue: "",
      });
      temp.push({
        breakdownLabel: projectListData[index].breakdown[2].structure[0].name,
        breakdownValue: thirdBreakdown,
        selectValue: "",
      });
    }
    if (depth === "2L") {
      data.push({
        depth: "2L",
        id: secondBreakdown[unitIndex].id,
        label: projectListData[index].breakdown[1].structure[0].name,
        name: secondBreakdown[unitIndex].structureName,
      });
      temp.push({
        breakdownLabel: projectListData[index].breakdown[1].structure[0].name,
        breakdownValue: secondBreakdown,
        selectValue: "",
      });
    }

    localStorage.setItem("selectBreakDown", JSON.stringify(data));
    localStorage.setItem("projectName", JSON.stringify(projectListData[index]));
    dispatch(projectName(projectListData[index]));
    dispatch(breakDownDetails(data));
    setProjectOpen(false);
    redirectionAccount();
  };

  return (
    <>
      <>
        {/* <PapperBlock title="Home" icon="ion-md-list-box"> */}
        <CustomPapperBlock
          title="Home"
          icon="customDropdownPageIcon homePageIcon"
          whiteBg
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Paper elevation={1} className="paperSection">
                {isLoading ? (
                  <div className="seven_hexagon_row">
                    <div className="honeycomb">
                      <div className="ibws-fix hexagon_row1">
                        <div className="hexagon hide_responsiv">
                          <div className="hexagontent hexagon_content_box" />
                        </div>

                        <div
                          className={
                            !codes.includes("HSE")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="hse_health_safety_environment_mgmt_new"
                              onClick={() => handleClick("HSE")}
                            >
                              <p>HSE Management</p>
                            </a>
                          </div>
                        </div>

                        <div className="hexagon hide_responsiv">
                          <div className="hexagontent hexagon_content_box" />
                        </div>

                        <div
                          className={
                            !codes.includes("controltower")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="hse_digital_control_tower"
                              onClick={() =>
                                history.push(
                                  "/app/pages/control-tower/controltower-icare"
                                )
                              }
                            >
                              <p>Control Tower </p>
                            </a>
                          </div>
                        </div>

                        <div className="hexagon hide_responsiv">
                          <div className="hexagontent hexagon_content_box" />
                        </div>

                        <div
                          className={
                            !codes.includes("incidents")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="hse_incident_reporting_management"
                              onClick={() => history.push("/incidents/")}
                            >
                              <p>Incident Management</p>
                            </a>
                          </div>
                        </div>

                        <div className="hexagon hide_responsiv">
                          <div className="hexagontent hexagon_content_box" />
                        </div>
                      </div>

                      <div className="ibws-fix hexagon_row2">
                        <div
                          className={
                            !codes.includes("ProjectInfo")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="project_information_hub"
                              onClick={() => handleClick("ProjectInfo")}
                            >
                              <p>Project Information Hub</p>
                            </a>
                          </div>
                        </div>

                        {/* <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div> */}
                        <div
                          className={
                            !codes.includes("compliances")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="hse_compliance_protocols"
                              onClick={() =>
                                history.push("/app/pages/compliance")
                              }
                            >
                              <p>Compliance</p>
                            </a>
                          </div>
                        </div>

                        <div
                          className={
                            !codes.includes("observations")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="hse_observations"
                              onClick={() => history.push("/app/icare")}
                            >
                              <p>iCare</p>
                            </a>
                          </div>
                        </div>
                        <div
                          className={
                            !codes.includes("assessments")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="hse_assessments_development"
                              onClick={() =>
                                history.push("/app/pages/assesments/xflha")
                              }
                            >
                              <p>Assessments</p>
                            </a>
                          </div>
                        </div>

                        <div
                          className={
                            !codes.includes("actions")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="hse_action_tracker_new"
                              onClick={() => handleClick("actions")}
                            >
                              <p>Action Tracker</p>
                            </a>
                          </div>
                        </div>
                        <div
                          className={
                            !codes.includes("permits")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="hse_intelligent_permit_management_new"
                              onClick={() => handleClick("permits")}
                            >
                              <p>Permit Management</p>
                            </a>
                          </div>
                        </div>

                        <div
                          className={
                            !codes.includes("gis")
                              ? "hexagon hexagon_fullcontnt inactive_hexagon"
                              : "hexagon hexagon_fullcontnt"
                          }
                        >
                          <div className="hexagontent hexagon_content_box">
                            <a
                              className="hse_safety_plot_manager"
                              onClick={() => handleClick("gis")}
                            >
                              <p>Safety plot manager</p>
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
                ) : (
                  <Loading />
                )}
                <Dialog
                  className={classes.projectDialog}
                  maxWidth="md"
                  open={open}
                  onClose={(event, reason) => {
                    if (reason !== "backdropClick") {
                      handleClose(event, reason);
                    }
                  }}
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Grid container spacing={4}>
                        <Grid item md={12} sm={12}>
                          {/* className={classNames(classes.groupSection, classes.companySelection)} */}
                          <Grid item xs={12} sm={12} md={12} align="center">
                            <img
                              className={classes.pacelogonBox}
                              src={paceLogo}
                              title="Pace OS"
                              alt="Pace OS"
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            align="center"
                            className={classes.loginTopDetailSection}
                          >
                            <Typography
                              variant="h1"
                              gutterBottom
                              className={classes.selectCompTitle}
                            >
                              Select Company
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            className={classes.companyListBox}
                          >
                            {companyListData.length > 0 && (
                              <Grid container spacing={3}>
                                {companyListData.map((selectValues, key) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    className={classes.companyList}
                                    key={key}
                                    onClick={() =>
                                      handleCompanyName(
                                        selectValues.companyId,
                                        key,
                                        selectValues.companyName
                                      )
                                    }
                                  >
                                    <Card className={classes.companyCardBox}>
                                      <CardMedia
                                        className={classes.companyLogo}
                                      >
                                        {selectValues.logo && (
                                          <img
                                            className={classes.companyLogoIcon}
                                            src={selectValues.logo}
                                            title="Pace OS"
                                            alt={selectValues.companyName}
                                          />
                                        )}
                                      </CardMedia>
                                      <CardContent>
                                        <Typography
                                          className={classes.companyTag}
                                        >
                                          {selectValues.businessVertical}
                                        </Typography>
                                        <Typography
                                          className={classes.companyName}
                                        >
                                          Company:{" "}
                                          <span>
                                            {selectValues.companyName}
                                          </span>
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                ))}
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
                {/* <Dialog
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

                </Dialog> */}

                {/* Project  */}
                <Dialog
                  className={classesm.projectDialog}
                  fullScreen
                  scroll="paper"
                  open={projectOpen}
                  onClose={handleProjectClose}
                >
                  <DialogTitle className={classesm.projecDialogHeadTitle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                    >
                      <g id="Select-Project-40" transform="translate(-0.985)">
                        <g id="Layer_1_22_" transform="translate(0.985)">
                          <g id="Group_6914" data-name="Group 6914">
                            <path
                              id="Path_6934"
                              data-name="Path 6934"
                              d="M5.372,32.774V4.37H28.409V28.224l4.389-3.61V2.185A2.189,2.189,0,0,0,30.6,0H3.178A2.189,2.189,0,0,0,.985,2.185V34.958a2.189,2.189,0,0,0,2.193,2.185H22.324l-3.1-4.369Z"
                              transform="translate(-0.985)"
                              fill="#e5e9ec"
                            />
                            <path
                              id="Path_6935"
                              data-name="Path 6935"
                              d="M42.225,27.558a1.1,1.1,0,0,0-1.451-.049L30.711,35.826,24,31.8a1.1,1.1,0,0,0-1.46,1.574l7.268,10.284a1.1,1.1,0,0,0,.886.464h.01a1.093,1.093,0,0,0,.884-.449L42.358,29A1.1,1.1,0,0,0,42.225,27.558Z"
                              transform="translate(-2.569 -4.125)"
                              fill="#e5e9ec"
                            />
                            <path
                              id="Path_6936"
                              data-name="Path 6936"
                              d="M24.689,8.988H11.523a2.194,2.194,0,0,0,0,4.388H24.688a2.194,2.194,0,0,0,0-4.388Z"
                              transform="translate(-1.68 -1.342)"
                              fill="#e5e9ec"
                            />
                            <path
                              id="Path_6937"
                              data-name="Path 6937"
                              d="M24.689,16.691H11.523a2.194,2.194,0,0,0,0,4.388H24.688a2.194,2.194,0,0,0,0-4.388Z"
                              transform="translate(-1.68 -2.492)"
                              fill="#e5e9ec"
                            />
                            <path
                              id="Path_6938"
                              data-name="Path 6938"
                              d="M24.689,24.4H11.523a2.194,2.194,0,0,0,0,4.388H24.688a2.194,2.194,0,0,0,0-4.388Z"
                              transform="translate(-1.68 -3.643)"
                              fill="#e5e9ec"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>{" "}
                    Switch to a different project
                  </DialogTitle>
                  {/* <DialogTitle onClose={handleProjectClose}>
                Select a Project
              </DialogTitle> */}
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Grid container spacing={4}>
                        <Grid
                          item
                          md={12}
                          sm={12}
                          xs={12}
                          className={classesm.companyNamePsl}
                        >
                          <List>
                            <ListItem>
                              <ListItemAvatar>
                                <CardMedia src={company.logo} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  currentCompany
                                    ? currentCompany.companyName
                                    : ""
                                }
                              />
                            </ListItem>
                          </List>
                        </Grid>
                        {projectListData.length > 0
                          ? projectListData.map((value, index) => (
                              <Grid
                                item
                                md={4}
                                sm={6}
                                xs={12}
                                className={
                                  changeClass && phaseSelect.includes("phase1")
                                    ? classesm.cardContentBoxIndexHigh
                                    : classesm.cardContentBox
                                }
                                key={index}
                              >
                                <Card>
                                  <CardContent
                                    className={classesm.cardActionAreaBox}
                                  >
                                    <div
                                      className={classesm.cardMediaBox}
                                      onClick={() => {
                                        value.breakdown &&
                                        value.breakdown.length > 0
                                          ? null
                                          : handleProjectName(index);
                                      }}
                                    >
                                      {currentProjectId &&
                                        currentProjectId ===
                                          value.projectId && (
                                          <span
                                            className={
                                              classesm.pinBoardIconSection
                                            }
                                          >
                                            <Tooltip
                                              title="Click here to go to pinned area"
                                              arrow
                                              placement="bottom-end"
                                              classes={{
                                                tooltip: classesm.customTooltip,
                                                arrow: classesm.customArrow,
                                              }}
                                            >
                                              <IconButton aria-label="pinboard">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="20"
                                                  height="22"
                                                  viewBox="0 0 28.551 30.854"
                                                >
                                                  <g
                                                    id="Pin-board-Icon"
                                                    transform="translate(-573.303 -183.304)"
                                                  >
                                                    <g
                                                      id="pin-svgrepo-com_1_"
                                                      data-name="pin-svgrepo-com (1)"
                                                      transform="matrix(0.819, 0.574, -0.574, 0.819, 585.892, 182.279)"
                                                      fill="#fff"
                                                    >
                                                      <path
                                                        d="M 10.81800174713135 25.26760864257812 C 10.48860168457031 25.26760864257812 10.24362182617188 24.8985481262207 10.02366161346436 24.07095909118652 C 9.876991271972656 23.51911926269531 9.786201477050781 22.91523742675781 9.786201477050781 22.67220878601074 L 9.786201477050781 15.88600826263428 L 3.781801700592041 15.88600826263428 C 3.212861776351929 15.88600826263428 2.750001668930054 15.4231481552124 2.750001668930054 14.85420799255371 C 2.750001668930054 13.58863830566406 3.412101745605469 12.34002876281738 4.664731979370117 11.24337863922119 C 5.043968677520752 10.91408729553223 5.451108932495117 10.61365985870361 5.877201557159424 10.34851551055908 L 5.877201557159424 3.687326192855835 C 5.707998752593994 3.560086011886597 5.54697322845459 3.420594453811646 5.397281646728516 3.271508455276489 C 4.902551651000977 2.775158405303955 4.313601970672607 1.940958380699158 4.313601970672607 0.7817983627319336 C 4.313111782073975 0.5064383745193481 4.420111656188965 0.2469983547925949 4.61488151550293 0.05173835530877113 C 4.810121536254883 -0.1430016458034515 5.068901538848877 -0.2500016391277313 5.344001770019531 -0.2500016391277313 L 16.29060173034668 -0.2500016391277313 C 16.85954093933105 -0.2500016391277313 17.32240104675293 0.2128583490848541 17.32240104675293 0.7817983627319336 C 17.32240104675293 1.940948367118835 16.73345184326172 2.775158405303955 16.2393913269043 3.270848274230957 C 16.08903121948242 3.420022010803223 15.92799377441406 3.559428691864014 15.75880146026611 3.687040090560913 L 15.75880146026611 10.34893798828125 L 15.76179218292236 10.35077857971191 C 16.20144081115723 10.62581825256348 16.60735130310059 10.9258279800415 16.96980094909668 11.24345874786377 C 18.22330093383789 12.33880805969238 18.88600158691406 13.58746814727783 18.88600158691406 14.85420799255371 C 18.88600158691406 15.4231481552124 18.42314147949219 15.88600826263428 17.85420227050781 15.88600826263428 L 11.84980201721191 15.88600826263428 L 11.84980201721191 22.67220878601074 C 11.84980201721191 22.91523742675781 11.75901222229004 23.51911926269531 11.61234188079834 24.07095909118652 C 11.39238166809082 24.8985481262207 11.14740180969238 25.26760864257812 10.81800174713135 25.26760864257812 Z M 5.131830215454102 13.82240867614746 L 16.5041675567627 13.82240867614746 C 16.29999160766602 13.48112297058105 16.00108909606934 13.13755989074707 15.6116418838501 12.79709815979004 C 15.20903968811035 12.44766330718994 14.76706314086914 12.14070606231689 14.29824447631836 11.88505172729492 L 14.26475143432617 11.86920833587646 C 13.91267204284668 11.69277858734131 13.69443130493164 11.33852863311768 13.6952018737793 10.94471836090088 L 13.6952018737793 3.127198457717896 C 13.69363117218018 2.725996494293213 13.92673015594482 2.359151124954224 14.29030895233154 2.189306259155273 C 14.46654796600342 2.084347009658813 14.62969207763672 1.958009958267212 14.77545547485352 1.813598394393921 L 6.860558032989502 1.813598394393921 C 7.015889644622803 1.967246174812317 7.189934253692627 2.099895238876343 7.37856912612915 2.208495378494263 C 7.726963043212891 2.388191938400269 7.940791606903076 2.7387855052948 7.940801620483398 3.127188444137573 L 7.940801620483398 10.94520854949951 C 7.940801620483398 11.33813858032227 7.722571849822998 11.69158840179443 7.37127161026001 11.86762809753418 L 7.353760242462158 11.87640285491943 L 7.274331569671631 11.92052841186523 C 6.829561710357666 12.16862869262695 6.408641815185547 12.46383857727051 6.023621559143066 12.79774856567383 C 5.634727001190186 13.13772392272949 5.335971355438232 13.4811544418335 5.131830215454102 13.82240867614746 Z"
                                                        stroke="none"
                                                      />
                                                      <path
                                                        d="M 5.344005584716797 -1.9073486328125e-06 C 5.137022018432617 -1.9073486328125e-06 4.938459396362305 0.08208847045898438 4.791881561279297 0.2282886505126953 C 4.645351409912109 0.3751888275146484 4.563232421875 0.5743083953857422 4.563602447509766 0.7817974090576172 C 4.563602447509766 1.843488693237305 5.098352432250977 2.617467880249023 5.573692321777344 3.094367980957031 C 5.744872093200684 3.264848709106445 5.930021286010742 3.420707702636719 6.127202033996582 3.560317993164062 L 6.127202033996582 10.48862838745117 C 5.66814136505127 10.76476860046387 5.233921051025391 11.08023834228516 4.829412460327148 11.43147850036621 C 4.000701904296875 12.15699863433838 3.000001907348633 13.33281803131104 3.000001907348633 14.85420799255371 C 3.000001907348633 15.28597831726074 3.350021362304688 15.63600826263428 3.781801223754883 15.63600826263428 L 10.03620147705078 15.63600826263428 L 10.03620147705078 22.67220878601074 C 10.03620147705078 23.10375785827637 10.38645172119141 25.01760864257812 10.81800174713135 25.01760864257812 C 11.24955177307129 25.01760864257812 11.59980201721191 23.10375785827637 11.59980201721191 22.67220878601074 L 11.59980201721191 15.63600826263428 L 17.85420227050781 15.63600826263428 C 18.28598213195801 15.63600826263428 18.63600158691406 15.28597831726074 18.63600158691406 14.85420799255371 C 18.63600158691406 13.33281803131104 17.63530158996582 12.15699863433838 16.80503082275391 11.43147850036621 C 16.37504196166992 11.05465793609619 15.94817161560059 10.76225852966309 15.63076210021973 10.56368827819824 L 15.50880241394043 10.48862838745117 L 15.50880241394043 3.560317993164062 C 15.67142105102539 3.444608688354492 15.86530113220215 3.289817810058594 16.06232070922852 3.094367980957031 C 16.53765106201172 2.617467880249023 17.07240104675293 1.845048904418945 17.07240104675293 0.7817974090576172 C 17.07240104675293 0.3500289916992188 16.72238159179688 -1.9073486328125e-06 16.29060173034668 -1.9073486328125e-06 L 5.345401763916016 -1.9073486328125e-06 C 5.344932556152344 -1.9073486328125e-06 5.344474792480469 -1.9073486328125e-06 5.344005584716797 -1.9073486328125e-06 M 16.90979194641113 14.07240867614746 L 4.726211547851562 14.07240867614746 C 4.945121765136719 13.54077816009521 5.362602233886719 13.04355812072754 5.859821319580078 12.60887813568115 C 6.258611679077148 12.26302814483643 6.69193172454834 11.95913791656494 7.152921676635742 11.70198822021484 L 7.259271621704102 11.644118309021 C 7.523781776428223 11.51156806945801 7.690801620483398 11.24104881286621 7.690801620483398 10.94520854949951 L 7.690801620483398 3.127199172973633 C 7.690792083740234 2.832588195800781 7.525171279907227 2.562997817993164 7.262372016906738 2.429838180541992 L 7.259242057800293 2.428268432617188 C 7.047942161560059 2.30723762512207 6.853442192077637 2.158988952636719 6.68071174621582 1.987339019775391 C 6.554061889648438 1.862247467041016 6.439921379089355 1.719959259033203 6.346101760864258 1.5635986328125 L 15.28990173339844 1.5635986328125 C 15.19764137268066 1.721529006958008 15.08037185668945 1.862247467041016 14.95529174804688 1.987339019775391 C 14.79078197479248 2.150968551635742 14.60640144348145 2.293317794799805 14.40646171569824 2.411067962646484 C 14.12475204467773 2.537708282470703 13.94399166107178 2.818328857421875 13.9452018737793 3.127199172973633 L 13.9452018737793 10.94520854949951 C 13.94462203979492 11.24163818359375 14.11174201965332 11.51289844512939 14.37675189971924 11.64569854736328 L 14.37988185882568 11.64569854736328 L 14.39864158630371 11.65507793426514 C 14.89121150970459 11.92185878753662 15.3531322479248 12.24168872833252 15.77618217468262 12.60887813568115 C 16.27340126037598 13.04355812072754 16.69088172912598 13.54077816009521 16.90979194641113 14.07240867614746 M 7.262372016906738 2.429838180541992 L 7.259242057800293 2.428268432617188 L 7.262372016906738 2.429838180541992 M 5.344001770019531 -0.5000019073486328 L 16.29060173034668 -0.5000019073486328 C 16.99739074707031 -0.5000019073486328 17.57240104675293 0.07500839233398438 17.57240104675293 0.7817974090576172 C 17.57240104675293 2.026338577270508 16.94379234313965 2.918258666992188 16.41646194458008 3.447338104248047 C 16.28717422485352 3.575601577758789 16.15091323852539 3.696640014648438 16.00880241394043 3.809608459472656 L 16.00880241394043 10.21146583557129 C 16.41672134399414 10.47408485412598 16.79411506652832 10.75708961486816 17.13457107543945 11.05543804168701 C 18.4437313079834 12.19943809509277 19.13600158691406 13.51318836212158 19.13600158691406 14.85420799255371 C 19.13600158691406 15.56099796295166 18.56099128723145 16.13600921630859 17.85420227050781 16.13600921630859 L 12.09980201721191 16.13600921630859 L 12.09980201721191 22.67220878601074 C 12.09980201721191 22.9738883972168 11.99181175231934 23.61649894714355 11.8539514541626 24.13517761230469 C 11.67226219177246 24.81877899169922 11.40710163116455 25.51760864257812 10.81800174713135 25.51760864257812 C 10.22890186309814 25.51760864257812 9.963741302490234 24.81877899169922 9.782052040100098 24.13517761230469 C 9.644191741943359 23.61649894714355 9.536201477050781 22.9738883972168 9.536201477050781 22.67220878601074 L 9.536201477050781 16.13600921630859 L 3.781801223754883 16.13600921630859 C 3.07501220703125 16.13600921630859 2.500001907348633 15.56099796295166 2.500001907348633 14.85420799255371 C 2.500001907348633 13.51444816589355 3.191612243652344 12.20079803466797 4.50006103515625 11.05527877807617 C 4.854766845703125 10.74728012084961 5.232664108276367 10.46425342559814 5.627201080322266 10.21081256866455 L 5.627201080322266 3.810070037841797 C 5.485071182250977 3.697265625 5.349029541015625 3.576290130615234 5.220861434936523 3.448648452758789 C 4.692222595214844 2.918268203735352 4.063602447509766 2.026348114013672 4.063602447509766 0.7817974090576172 C 4.062992095947266 0.4400577545166016 4.195911407470703 0.1177577972412109 4.437881469726562 -0.1248207092285156 C 4.680770874023438 -0.3670825958251953 5.002252578735352 -0.5000019073486328 5.344001770019531 -0.5000019073486328 Z M 14.00709915161133 2.0635986328125 L 7.624673843383789 2.0635986328125 C 7.977375030517578 2.299890518188477 8.190783500671387 2.694652557373047 8.190801620483398 3.127178192138672 L 8.190801620483398 10.94520854949951 C 8.190801620483398 11.43334865570068 7.919692039489746 11.87243843078613 7.483282089233398 12.0911283493042 L 7.470568656921387 12.09749889373779 L 7.39574146270752 12.13906860351562 C 6.966301918029785 12.37861824035645 6.559501647949219 12.66391849517822 6.187411308288574 12.98661804199219 C 5.966859817504883 13.17942714691162 5.774895668029785 13.37626647949219 5.615266799926758 13.57240867614746 L 16.02066612243652 13.57240867614746 C 15.86079788208008 13.37601184844971 15.66841697692871 13.17879295349121 15.44709205627441 12.98530864715576 C 15.06220436096191 12.65125179290771 14.63926696777344 12.35692691802979 14.19073867797852 12.11119937896729 L 14.15275192260742 12.09270858764648 C 13.71536159515381 11.87352848052979 13.44424152374268 11.43345832824707 13.4452018737793 10.94422817230225 L 13.4452018737793 3.127199172973633 C 13.44351577758789 2.698196411132812 13.6584529876709 2.30036735534668 14.00709915161133 2.0635986328125 Z"
                                                        stroke="none"
                                                        fill="#fff"
                                                      />
                                                    </g>
                                                  </g>
                                                </svg>
                                              </IconButton>
                                            </Tooltip>
                                          </span>
                                        )}
                                      <CardMedia
                                        className={classesm.media}
                                        image={
                                          value.projectImage === null
                                            ? ProjectImg
                                            : value.projectImage
                                        }
                                      />
                                      <span
                                        className={classesm.projectTitleSection}
                                      >
                                        <Typography
                                          gutterBottom
                                          variant="body1"
                                          component="h5"
                                          className={
                                            classesm.projectSelectionTitle
                                          }
                                        >
                                          {value.projectName}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                          component="p"
                                          className={
                                            classesm.projectSelectionCode
                                          }
                                        >
                                          <span
                                            className={
                                              classesm.projectCodeTitle
                                            }
                                          >
                                            Code: {value.projectCode}
                                          </span>
                                          <span
                                            className={
                                              classesm.externalLinkSection
                                            }
                                          >
                                            {/* <Tooltip title="Control tower" arrow placement="bottom-end" classes={{ tooltip: classesm.customTooltip, arrow: classesm.customArrow }}>
                                            <IconButton aria-label="delete" className={classesm.margin}>
                                              <svg id="Control-Tower-32" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                                <g id="Group_5864" data-name="Group 5864" transform="translate(4.371 0.874)">
                                                  <g id="control-tower-svgrepo-com" transform="translate(0)">
                                                    <g id="Group_5507" data-name="Group 5507" transform="translate(1.54 3.126)">
                                                      <path id="Path_5211" data-name="Path 5211" d="M161.221,307.915h-1.344a.877.877,0,0,1,0-1.739h.578V304.27h-8.19v1.907h4.822a.877.877,0,0,1,0,1.739H151.5a.823.823,0,0,1-.765-.869V303.4a.822.822,0,0,1,.765-.869h9.721a.823.823,0,0,1,.765.869v3.646A.823.823,0,0,1,161.221,307.915Z" transform="translate(-146.71 -287.291)" fill="#f28705" />
                                                      <path id="Path_5212" data-name="Path 5212" d="M79.44,57.656a.953.953,0,0,1,.039-.875l2.869-4.889A.766.766,0,0,1,83,51.5h8.569a.874.874,0,0,1,0,1.739H83.428L81.04,57.306l2.665.735H94.3l2.665-.735-2.619-4.464a.93.93,0,0,1,.228-1.2.736.736,0,0,1,1.083.253l2.869,4.889a.953.953,0,0,1,.039.875C95.336,59.6,82.669,59.6,79.44,57.656Z" transform="translate(-79.352 -51.497)" fill="#f28705" />
                                                    </g>
                                                    <g id="Group_5508" data-name="Group 5508">
                                                      <path id="Path_5214" data-name="Path 5214" d="M70.009,184.474H56.461a.78.78,0,0,1-.7-.469l-3.63-7.743a.951.951,0,0,1,.026-.852.773.773,0,0,1,.671-.418H73.639a.773.773,0,0,1,.671.418.951.951,0,0,1,.026.852L70.706,184A.78.78,0,0,1,70.009,184.474Zm-13.07-1.739H69.531l2.815-6H54.123Z" transform="translate(-52.045 -165.037)" fill="#f28705" />
                                                      <path id="Path_5215" data-name="Path 5215" d="M145.961,184.475a.8.8,0,0,1-.717-.469l-3.731-7.743a.9.9,0,0,1,.345-1.172.78.78,0,0,1,1.089.371l3.731,7.743a.9.9,0,0,1-.345,1.172A.759.759,0,0,1,145.961,184.475Z" transform="translate(-136.56 -165.038)" fill="#f28705" />
                                                      <path id="Path_5216" data-name="Path 5216" d="M276.564,184.473a.757.757,0,0,1-.371-.1.9.9,0,0,1-.345-1.172l3.731-7.743a.78.78,0,0,1,1.089-.371.9.9,0,0,1,.345,1.172L277.282,184A.8.8,0,0,1,276.564,184.473Z" transform="translate(-263.586 -165.036)" fill="#f28705" />
                                                      <path id="Path_5217" data-name="Path 5217" d="M308.292,371.65a.84.84,0,0,1-.807-.869v-7.332a.81.81,0,1,1,1.615,0v7.332A.84.84,0,0,1,308.292,371.65Z" transform="translate(-293.5 -341.927)" fill="#f28705" />
                                                      <path id="Path_5218" data-name="Path 5218" d="M176.678,371.65a.84.84,0,0,1-.807-.869v-7.332a.81.81,0,1,1,1.615,0v7.332A.84.84,0,0,1,176.678,371.65Z" transform="translate(-169.092 -341.927)" fill="#f28705" />
                                                      <path id="Path_5219" data-name="Path 5219" d="M242.486,4.692a.84.84,0,0,1-.807-.869V.869a.81.81,0,1,1,1.615,0V3.822A.84.84,0,0,1,242.486,4.692Z" transform="translate(-231.296)" fill="#f28705" />
                                                    </g>
                                                  </g>
                                                </g>
                                                <rect id="Rectangle_1908" data-name="Rectangle 1908" width="32" height="32" fill="none" />
                                              </svg>
                                            </IconButton>
                                          </Tooltip> */}
                                            {/* <Tooltip title="Geo location" arrow placement="bottom-end" classes={{ tooltip: classesm.customTooltip, arrow: classesm.customArrow }}>
                                        <IconButton aria-label="delete" className={classesm.marginR}>
                                          <svg id="GIS-Map-32" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                            <rect id="Rectangle_2080" data-name="Rectangle 2080" width="32" height="32" fill="none" />
                                            <g id="map-svgrepo-com_1_" data-name="map-svgrepo-com (1)" transform="translate(1.429 1.593)">
                                              <path id="Path_5235" data-name="Path 5235" d="M28.681,18.961V9.714a.458.458,0,0,0-.327-.439L24.075,8.005a6.375,6.375,0,0,0,.538-2.361,5.645,5.645,0,0,0-11.289,0,6.375,6.375,0,0,0,.538,2.361L9.713,9.236.588,6.529A.458.458,0,0,0,0,6.968v18.51a.458.458,0,0,0,.328.439L9.576,28.66l.007,0h0a.448.448,0,0,0,.052.011l.014,0a.417.417,0,0,0,.118,0l.014,0a.466.466,0,0,0,.052-.011h.009l8.936-2.651a.455.455,0,0,0,.371,0l8.94,2.652a.458.458,0,0,0,.588-.439V18.965s0,0,0,0Zm-.915-8.906v8.3l-8.34-2.475v-1.3A26.544,26.544,0,0,0,23.69,8.846l4.076,1.209Zm-8.8-9.14A4.735,4.735,0,0,1,23.7,5.645a5.965,5.965,0,0,1-.635,2.41.457.457,0,0,0-.047.1,24.92,24.92,0,0,1-4.047,5.577,24.9,24.9,0,0,1-4.045-5.572.458.458,0,0,0-.051-.109,5.963,5.963,0,0,1-.633-2.406A4.735,4.735,0,0,1,18.968.915Zm-.458,13.664v1.3l-8.34,2.475v-8.3l4.076-1.209A26.544,26.544,0,0,0,18.511,14.579ZM.915,16.836l3.162.938a.458.458,0,1,0,.26-.878L.915,15.881v-8.3l8.34,2.475v8.3l-3.162-.938a.458.458,0,0,0-.26.878L9.255,19.31v8.3L.915,25.136v-8.3Zm18.511,8.3V21.823a.458.458,0,1,0-.915,0v3.313L10.17,27.61v-8.3l8.34-2.475v3.156a.458.458,0,0,0,.915,0V16.836l8.34,2.475v8.3Z" transform="translate(0 0)" fill="#f28705" stroke="#f28705" stroke-width="1" />
                                              <path id="Path_5236" data-name="Path 5236" d="M261.535,46.408a3.2,3.2,0,1,0-3.2-3.2A3.207,3.207,0,0,0,261.535,46.408Zm0-5.492a2.288,2.288,0,1,1-2.288,2.288A2.291,2.291,0,0,1,261.535,40.915Z" transform="translate(-242.567 -37.559)" fill="#f28705" stroke="#f28705" stroke-width="1" />
                                            </g>
                                          </svg>
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Media channel" arrow placement="bottom-end" classes={{ tooltip: classesm.customTooltip, arrow: classesm.customArrow }}>
                                        <IconButton aria-label="delete" className={classesm.margin}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32.271" viewBox="0 0 32 32.271">
                                            <g id="media-channel-icon-32" transform="translate(19 0.727)">
                                              <rect id="Rectangle_2081" data-name="Rectangle 2081" width="32" height="32" transform="translate(-19 -0.456)" fill="none" />
                                              <g id="Group_6903" data-name="Group 6903" transform="translate(154.804 74.402)">
                                                <path id="Path_6901" data-name="Path 6901" d="M30.411,12H5.39A1.391,1.391,0,0,0,4,13.392v18.1A1.391,1.391,0,0,0,5.39,32.88H30.411a1.391,1.391,0,0,0,1.39-1.392v-18.1A1.391,1.391,0,0,0,30.411,12Z" transform="translate(-175.705 -77.564)" fill="none" stroke="#f28705" stroke-linejoin="round" stroke-width="1.8" />
                                                <path id="Path_6902" data-name="Path 6902" d="M25.936,19H11V30.949H25.936Z" transform="translate(-178.532 -80.072)" fill="none" stroke="#f28705" stroke-linejoin="round" stroke-width="1.8" />
                                                <path id="Path_6903" data-name="Path 6903" d="M14,3.867l6.847,5.6L29.064,2" transform="translate(-179.336 -75.858)" fill="none" stroke="#f28705" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
                                                <path id="Path_6904" data-name="Path 6904" d="M38,18v.747" transform="translate(-185.285 -79.299)" fill="none" stroke="#f28705" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
                                                <path id="Path_6905" data-name="Path 6905" d="M38,25v.747" transform="translate(-185.285 -81.606)" fill="none" stroke="#f28705" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
                                              </g>
                                            </g>
                                          </svg>
                                        </IconButton>
                                      </Tooltip> */}
                                          </span>
                                        </Typography>
                                      </span>
                                    </div>
                                    <div
                                      className={
                                        changeClass &&
                                        phaseSelect.includes(`phase${index}`)
                                          ? classesm.sectionScrollingMax
                                          : classesm.sectionScrolling
                                      }
                                    >
                                      {value.firstBreakdown && (
                                        <>
                                          {value.firstBreakdown.map(
                                            (phase, phaseIndex) => (
                                              <Accordion
                                                expanded={
                                                  openPhase ===
                                                  `panel${index}${phaseIndex}`
                                                }
                                                onChange={handlePhaseChange(
                                                  `panel${index}${phaseIndex}`,
                                                  `phase${index}${phaseIndex}`,
                                                  index,
                                                  phase.id
                                                )}
                                                defaultExpanded
                                                className={
                                                  classesm.mainProjectMenuList
                                                }
                                              >
                                                <AccordionSummary
                                                  aria-controls="panel1bh-content"
                                                  id="panel1bh-header"
                                                >
                                                  <List
                                                    className={
                                                      classesm.listSection
                                                    }
                                                  >
                                                    <ListItem
                                                      button
                                                      className={
                                                        classesm.phaseMenuList
                                                      }
                                                      onClick={
                                                        value.breakdown &&
                                                        !value.breakdown[1]
                                                          ? () =>
                                                              handleProjectBreakdown(
                                                                index,
                                                                phaseIndex,
                                                                null,
                                                                null,
                                                                null,
                                                                "1L"
                                                              )
                                                          : null
                                                      }
                                                    >
                                                      <ListItemText
                                                        primary={
                                                          phase.structureName
                                                        }
                                                      />
                                                      {value.breakdown &&
                                                        value.breakdown[1] && (
                                                          <>
                                                            {openPhase ===
                                                            `panel${index}${phaseIndex}` ? (
                                                              <RemoveIcon />
                                                            ) : (
                                                              <AddIcon />
                                                            )}
                                                          </>
                                                        )}
                                                    </ListItem>
                                                  </List>
                                                </AccordionSummary>

                                                <AccordionDetails
                                                  className={
                                                    classesm.subUnitSection
                                                  }
                                                >
                                                  {openPhase ===
                                                    `panel${index}${phaseIndex}` &&
                                                    secondBreakdown &&
                                                    secondBreakdown.length >
                                                      0 && (
                                                      <>
                                                        {secondBreakdown.map(
                                                          (unit, unitIndex) => (
                                                            <Accordion
                                                              expanded={
                                                                openUnit ===
                                                                `panel${index}${phaseIndex}${unitIndex}`
                                                              }
                                                              onChange={handleUnitChange(
                                                                `panel${index}${phaseIndex}${unitIndex}`,
                                                                index,
                                                                unit.id
                                                              )}
                                                            >
                                                              <AccordionSummary
                                                                aria-controls="panel1bh-content"
                                                                id="panel1bh-header"
                                                              >
                                                                <List
                                                                  className={
                                                                    classesm.listSection
                                                                  }
                                                                >
                                                                  <ListItem
                                                                    button
                                                                    className={
                                                                      classesm.unitMenuList
                                                                    }
                                                                    onClick={
                                                                      value.breakdown &&
                                                                      !value
                                                                        .breakdown[2]
                                                                        ? () =>
                                                                            handleProjectBreakdown(
                                                                              index,
                                                                              phaseIndex,
                                                                              unitIndex,
                                                                              null,
                                                                              null,
                                                                              "2L"
                                                                            )
                                                                        : null
                                                                    }
                                                                  >
                                                                    <ListItemText
                                                                      primary={
                                                                        unit.structureName
                                                                      }
                                                                    />
                                                                    {value.breakdown &&
                                                                      value
                                                                        .breakdown[2] && (
                                                                        <>
                                                                          {openUnit ===
                                                                          `panel${index}${phaseIndex}${unitIndex}` ? (
                                                                            <RemoveIcon />
                                                                          ) : (
                                                                            <AddIcon />
                                                                          )}
                                                                        </>
                                                                      )}
                                                                  </ListItem>
                                                                </List>
                                                              </AccordionSummary>
                                                              {openUnit ===
                                                                `panel${index}${phaseIndex}${unitIndex}` &&
                                                                thirdBreakdown &&
                                                                thirdBreakdown.length >
                                                                  0 && (
                                                                  <AccordionDetails
                                                                    className={
                                                                      classesm.subUnitSection
                                                                    }
                                                                  >
                                                                    {thirdBreakdown.map(
                                                                      (
                                                                        subUnit,
                                                                        subUnitIndex
                                                                      ) => (
                                                                        <Accordion
                                                                          expanded={
                                                                            openSubUnit ===
                                                                            `panel${index}${phaseIndex}${unitIndex}${subUnitIndex}`
                                                                          }
                                                                          onChange={handleSubUnitChange(
                                                                            `panel${index}${phaseIndex}${unitIndex}${subUnitIndex}`,
                                                                            index,
                                                                            subUnit.id
                                                                          )}
                                                                        >
                                                                          <AccordionSummary
                                                                            aria-controls="panel1bh-content"
                                                                            id="panel1bh-header"
                                                                          >
                                                                            <List
                                                                              className={
                                                                                classesm.listSection
                                                                              }
                                                                            >
                                                                              <ListItem
                                                                                button
                                                                                className={
                                                                                  classesm.unitMenuList
                                                                                }
                                                                                onClick={
                                                                                  value.breakdown &&
                                                                                  !value
                                                                                    .breakdown[3]
                                                                                    ? () =>
                                                                                        handleProjectBreakdown(
                                                                                          index,
                                                                                          phaseIndex,
                                                                                          unitIndex,
                                                                                          subUnitIndex,
                                                                                          null,
                                                                                          "3L"
                                                                                        )
                                                                                    : null
                                                                                }
                                                                              >
                                                                                <ListItemText
                                                                                  primary={
                                                                                    subUnit.structureName
                                                                                  }
                                                                                />
                                                                                {value.breakdown &&
                                                                                  value
                                                                                    .breakdown[3] && (
                                                                                    <>
                                                                                      {openSubUnit ===
                                                                                      `panel${index}${phaseIndex}${unitIndex}${subUnitIndex}` ? (
                                                                                        <RemoveIcon />
                                                                                      ) : (
                                                                                        <AddIcon />
                                                                                      )}
                                                                                    </>
                                                                                  )}
                                                                              </ListItem>
                                                                            </List>
                                                                          </AccordionSummary>
                                                                          {fourthBreakdown &&
                                                                            fourthBreakdown.length >
                                                                              0 && (
                                                                              <AccordionDetails
                                                                                className={
                                                                                  classesm.subUnitSection
                                                                                }
                                                                              >
                                                                                <List
                                                                                  className={
                                                                                    classesm.listSection
                                                                                  }
                                                                                >
                                                                                  {fourthBreakdown.map(
                                                                                    (
                                                                                      subSubUnit,
                                                                                      subSubUnitIndex
                                                                                    ) => (
                                                                                      <ListItem
                                                                                        button
                                                                                        className={
                                                                                          classesm.workAreaList
                                                                                        }
                                                                                        onClick={() =>
                                                                                          handleProjectBreakdown(
                                                                                            index,
                                                                                            phaseIndex,
                                                                                            unitIndex,
                                                                                            subUnitIndex,
                                                                                            subSubUnitIndex,
                                                                                            "4L"
                                                                                          )
                                                                                        }
                                                                                      >
                                                                                        <ListItemText
                                                                                          primary={
                                                                                            subSubUnit.structureName
                                                                                          }
                                                                                        />
                                                                                      </ListItem>
                                                                                    )
                                                                                  )}
                                                                                </List>
                                                                              </AccordionDetails>
                                                                            )}
                                                                        </Accordion>
                                                                      )
                                                                    )}
                                                                  </AccordionDetails>
                                                                )}
                                                            </Accordion>
                                                          )
                                                        )}
                                                      </>
                                                    )}
                                                </AccordionDetails>
                                                {/* <AccordionDetails className={classesm.subUnitSection}>
                                          <Accordion expanded={openUnit === `panel${index}12`} onChange={handleUnitChange(`panel${index}12`)}>
                                            <AccordionSummary
                                              aria-controls="panel1bh-content"
                                              id="panel1bh-header"
                                            >
                                              <List className={classesm.listSection}>
                                                <ListItem button className={classesm.unitMenuList}>
                                                  <ListItemText primary="Unit-1 (200MW)" />
                                                  {openUnit === `panel${index}12` ? <RemoveIcon /> : <AddIcon />}
                                                </ListItem>
                                              </List>
                                            </AccordionSummary>
                                            <AccordionDetails className={classesm.subUnitSection}>
                                              <List className={classesm.listSection}>
                                                <ListItem button className={classesm.workAreaList}>
                                                  <ListItemText primary="Incident details" />
                                                </ListItem>
                                                <ListItem button className={classesm.workAreaList}>
                                                  <ListItemText primary="Incident details" />
                                                </ListItem>
                                              </List>
                                            </AccordionDetails>
                                          </Accordion>
                                          <Accordion expanded={openUnit === `panel${index}13`} onChange={handleUnitChange(`panel${index}13`)}>
                                            <AccordionSummary
                                              aria-controls="panel1bh-content"
                                              id="panel1bh-header"
                                            >
                                              <List className={classesm.listSection}>
                                                <ListItem button className={classesm.unitMenuList}>
                                                  <ListItemText primary="Unit-1 (200MW)" />
                                                  {openUnit === `panel${index}13` ? <RemoveIcon /> : <AddIcon />}
                                                </ListItem>
                                              </List>
                                            </AccordionSummary>
                                            <AccordionDetails className={classesm.subUnitSection}>
                                              <List className={classesm.listSection}>
                                                <ListItem button className={classesm.workAreaList}>
                                                  <ListItemText primary="Incident details" />
                                                </ListItem>
                                                <ListItem button className={classesm.workAreaList}>
                                                  <ListItemText primary="Incident details" />
                                                </ListItem>
                                                <ListItem button className={classesm.workAreaList}>
                                                  <ListItemText primary="Incident details" />
                                                </ListItem>
                                              </List>
                                            </AccordionDetails>
                                          </Accordion>

                                        </AccordionDetails> */}
                                              </Accordion>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* <Card onClick={() => {

                            handleProjectName(index)
                          }}>
                            <CardActionArea
                              className={classesm.cardActionAreaBox}
                            >
                              <div className={classesm.cardMediaBox}>
                                <CardMedia
                                  className={classesm.media}
                                  image={value.projectImage === null ? ProjectImg : value.projectImage}

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
                                  {value.projectName}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                  className={classesm.projectSelectionCode}
                                >
                                  Code: {value.projectCode}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <Divider />
                            <CardActions className={classesm.actionBttmArea}>
                              <Tooltip title="Control Tower">
                                <IconButton aria-label="control tower">
                                  <SettingsRemoteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="GIS Location">
                                <IconButton aria-label="GIS location">
                                  <LocationOnIcon />
                                </IconButton>
                              </Tooltip>
                            </CardActions>
                          </Card> */}
                              </Grid>
                            ))
                          : null}
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </Paper>
            </Grid>
          </Grid>
        </CustomPapperBlock>
      </>
    </>
  );
}

PersonalDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
const DashboardInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(PersonalDashboard);
export default withStyles(styles)(DashboardInit);
