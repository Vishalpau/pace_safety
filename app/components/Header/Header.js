import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import UserMenu from "./UserMenu";
import SearchUi from "../Search/SearchUi";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FilterListIcon from "@material-ui/icons/FilterList";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import styles from "./header-jss";
import logos from "dan-api/images/logos";
import ImageIcon from "@material-ui/icons/Image";

import ProjectImg from "dan-images/projectImages/projectimg.jpg";
import ProjectImgOne from "dan-images/projectImages/projectimgone.jpg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";

import Headerbox from "./headerbox";

import { useParams } from "react-router";

// redux
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { projectName, breakDownDetails, levelBDownDetails  } from "../../redux/actions/initialDetails";
import Topbar from "./Topbar";

import { HEADER_AUTH, SSO_URL } from "../../utils/constants";
import Axios from "axios";

// import ProjectImg from '../../containers/Pages/Images/projectimage.jpg';

const elem = document.documentElement;

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
  },
  projectName: {
    fontSize: "13px",
    paddingLeft: "0px",
    paddingRight: "0px",
    color: "#ffffff !important" ,
    opacity: 1,
    "& .MuiSvgIcon-root": {
      marginLeft: "4px",
      fontSize: "15px",
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
      fontFamily: "Montserrat-Regular",
      color: "#054D69",
    },
  },
  projectCloseButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
  },
}));

function Header(props) {
  const [open] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [projectOpen, setProjectOpen] = React.useState(false);
  const [projectListData, setProjectListData] = useState([]);
  const [projectDisable, setProjectDisable] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {fkid}  = useParams();
  const dispatch = useDispatch();

  const [selectBreakDown, setSelectBreakDown] = useState([]);

  const [companyOpen, setCompanyOpen] = React.useState(false);

  // Initial header style
  let flagDarker = false;

  let flagTitle = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = scroll > 30;
    const newFlagTitle = scroll > 40;
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
    if (flagTitle !== newFlagTitle) {
      setShowTitle(newFlagTitle);
      flagTitle = newFlagTitle;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openFullScreen = () => {
    setFullScreen(true);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const closeFullScreen = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const turnMode = (mode) => {
    if (mode === "light") {
      props.changeMode("dark");
    } else {
      props.changeMode("light");
    }
  };

  const {
    classes,
    toggleDrawerOpen,
    margin,
    position,
    gradient,
    mode,
    title,
    openGuide,
    history,
    initialValues,
  } = props;

  // check and store in localstorage
  if (Object.keys(props.initialValues.projectName).length > 0) {
    localStorage.setItem("projectName", JSON.stringify(props.initialValues));
  }
  const projectData = JSON.parse(localStorage.getItem("projectName"));
  const breakDownData = JSON.parse(localStorage.getItem("selectBreakDown"))
  const setMargin = (sidebarPosition) => {
    if (sidebarPosition === "right-sidebar") {
      return classes.right;
    }
    if (sidebarPosition === "left-sidebar-big") {
      return classes.leftBig;
    }
    return classes.left;
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  //Project selections
  const handleProjectOpen = () => {
    setProjectOpen(true);
  };

  const handleProjectClose = () => {
    setCompanyOpen(false);
    setProjectOpen(false);
  };

  // handle project Name
  const handleProjectName = async (key) => {
    let selectBreakDown=[]
    let data = projectListData[key];
    await dispatch(projectName(data));
    
    await dispatch(breakDownDetails(selectBreakDown))
    // await setIsPopUpOpen(true)
    setProjectOpen(false);
    setCompanyOpen(false);
   
    localStorage.setItem("projectName", JSON.stringify(data));
    localStorage.setItem(
      "selectBreakDown",
      JSON.stringify(selectBreakDown)
    );
    document.getElementById("open").click()
    // documentElementById("open").click()
    // setAnchorEl(event.currentTarget);
  };

  const handleProjectList = () => {
    try {
      const company = JSON.parse(localStorage.getItem("company"));
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));

      const data = userDetails.companies.map((item) => {
        if (item.companyId === parseInt(company.fkCompanyId)) {
          setProjectDisable(item.projects.length > 1);
          return setProjectListData(item.projects);
        }
      });
      const filterData = userDetails.companies.filter(
        (item) => item.companyId === parseInt(company.fkCompanyId)
      );
      let projectLength = filterData[0].projects.length <= 1;
     
      setProjectDisable(projectLength);
    } catch (error) {}
  };

  //company selections
  const handleCompanyOpen = () => {
    setCompanyOpen(true);
  };

  const handleCompanyClose = () => {
    setCompanyOpen(false);
  };

  const ProjectChip = (props) => {
    return <Chip className={classes.projectChip} size="small" {...props} />;
  };

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

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);


  const classesm = useStyles();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterOpen = Boolean(anchorEl);
  const id = filterOpen ? "simple-popover" : undefined;

  const handleBreakdown = async (e, index, label) => {
    const value = e.target.value;
    let temp = [...breakdown1ListData]
    temp[index - 1][`selectValue`] = value;
    setBreakdown1ListData(temp)
    if (selectBreakDown.filter(filterItem => filterItem.depth === `${index}L`).length > 0) {
      const removeSelectBreakDown = selectBreakDown.slice(0, index - 1)
      const removeBreakDownList = breakdown1ListData.slice(0, index + 1)
      removeBreakDownList[index][`selectValue`] = "";

      await setBreakdown1ListData(removeBreakDownList)

      let name = breakdown1ListData[index - 1].breakdownValue.map(
        async (item) => {
          if (item.id === value) {
            setSelectBreakDown([
              ...removeSelectBreakDown,
              { depth: item.depth, id: item.id, name: item.name,label:label },
            ]);
            dispatch(breakDownDetails([
              ...removeSelectBreakDown,
              { depth: item.depth, id: item.id, name: item.name,label:label },
            ]))
            localStorage.setItem(
              "selectBreakDown",
              JSON.stringify([
                ...removeSelectBreakDown,
                { depth: item.depth, id: item.id, name: item.name,label:label },
              ])
            );
            return;
          }

        }
      );
    } else {
      let name = breakdown1ListData[index - 1].breakdownValue.map(
        async (item) => {
          if (item.id === value) {
            await setSelectBreakDown([
              ...selectBreakDown,
              { depth: item.depth, id: item.id, name: item.name,label:label },
            ]);
            dispatch(breakDownDetails([
              ...selectBreakDown,
              { depth: item.depth, id: item.id, name: item.name,label:label },
            ]))
            localStorage.setItem(
              "selectBreakDown",
              JSON.stringify([
                ...selectBreakDown,
                { depth: item.depth, id: item.id, name: item.name,label:label },
              ])
            );
            return;
          }

        }
      );
    }

    if(projectData.projectName.breakdown.length !== index){
    for (var key in projectData.projectName.breakdown) {
      if (key == index) {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
            }${value}`,
          headers: HEADER_AUTH,
        };
        await Axios(config)
          .then(function (response) {
            if (response.status === 200) {

              if (
                breakdown1ListData.filter(
                  (item) =>
                    item.breakdownLabel ===
                    projectData.projectName.breakdown[index].structure[0].name
                ).length > 0
              ) {
                return;
              } else {
                setBreakdown1ListData([
                  ...breakdown1ListData,
                  {
                    breakdownLabel:
                      projectData.projectName.breakdown[index].structure[0]
                        .name,
                    breakdownValue: response.data.data.results,
                    selectValue: value
                  },
                ]);
                dispatch(levelBDownDetails([
                  {
                    breakdownLabel:
                      projectData.projectName.breakdown[index].structure[0]
                        .name,
                    breakdownValue: response.data.data.results,
                    selectValue: value,
                    index:index
                  },
                ]))
              }
            }
          })
          .catch(function (error) {

          });
      }
    }
  }else{
    dispatch(levelBDownDetails([
    ]))
  }
  };

  const fetchCallBack = async () => {
    setSelectBreakDown([])
    for (var key in projectData.projectName.breakdown) {

      if (key == 0) {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
            }`,
          headers: HEADER_AUTH,
        };
        await Axios(config)
          .then(async(response)=> {
              
            await setBreakdown1ListData([
              {
                breakdownLabel:
                  projectData.projectName.breakdown[0].structure[0].name,
                breakdownValue: response.data.data.results,
                selectValue: "",
                index:0
              },
            ]);
            if(JSON.parse(localStorage.getItem("selectBreakDown"))){
              await dispatch(levelBDownDetails([]))
            }else{
              await dispatch(levelBDownDetails([
                {
                  breakdownLabel:
                    projectData.projectName.breakdown[0].structure[0]
                      .name,
                  breakdownValue: response.data.data.results,
                  selectValue: "",
                  index:0
                },
              ]))
            }
            
            setIsLoading(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  const fetchIncidentData = async()=>{
   
    const res = await Axios.get(`/api/v1/incidents/${fkid}/`);
        const result = res.data.data.results;
      
  }
  useEffect(() => {
      fetchCallBack();
      if(fkid){
        fetchIncidentData();
      }
      
  }, [props.initialValues.projectName]);

  useEffect(() => {
    handleProjectList();
  }, [initialValues.projectName]);

  const isTablet = useMediaQuery("(min-width:768px)");

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        classes.floatingBar,
        margin && classes.appBarShift,
        setMargin(position),
        turnDarker && classes.darker,
        gradient ? classes.gradientBg : classes.solidBg
      )}
    >
      <Toolbar disableGutters={!open}>
        <Fab
          size="small"
          className={classes.menuButton}
          aria-label="Menu"
          onClick={toggleDrawerOpen}
        >
          <MenuIcon />
        </Fab>

        <div className={classes.headerProperties}>
          <div className={classes.projectSwitcher}>
            {/* project selections */}
            {isTablet && <Typography display="inline">Project:</Typography>}
            <IconButton
              aria-label="control tower"
              variant="outlined"
              clickable
              size="small"
              className={classesm.projectName}
              
              disabled={projectDisable} 
              
            >
              {projectData !== null
                ? projectData.projectName.projectName
                : null}
             {projectDisable?null:<EditIcon onClick={handleCompanyOpen} />} 
            </IconButton>

            {/* company selections */}

            {/*company selections */}
            <Dialog
              className={classes.projectDialog}
              open={companyOpen}
              onClose={handleCompanyClose}
              PaperProps={{
                style: {
                  width: "100%",
                  maxWidth: 400,
                },
              }}
            >
              <DialogTitle onClose={handleCompanyClose}>
                Confirmation
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classesm.projectSelectionTitle}
                  >
                    Are you sure to switch another project?
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Tooltip title="Cancel">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleCompanyClose()}
                  >
                    No
                  </Button>
                </Tooltip>
                <Tooltip title="Ok">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleProjectOpen()}
                  >
                    Yes
                  </Button>
                </Tooltip>
              </DialogActions>
            </Dialog>
            {/* Project selections */}
            <Dialog
              className={classes.projectDialog}
              fullScreen
              scroll="paper"
              open={projectOpen}
              onClose={handleProjectClose}
            >
              <DialogTitle onClose={handleProjectClose}>
                Switch to a Different Project
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid container spacing={4}>
                    {projectListData.length > 0
                      ? projectListData.map((value, index) => (
                          <Grid
                            item
                            md={4}
                            sm={6}
                            xs={12}
                            className={classesm.cardContentBox}
                            key={index}
                          >
                            <Card onClick={() => {
                            
                              handleProjectName(index)}}>
                              <CardActionArea
                                className={classesm.cardActionAreaBox}
                              >
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
                            </Card>
                          </Grid>
                        ))
                      : null}
                  </Grid>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
          <Hidden smDown>
            {/* <Headerbox filterOpen={isPopUpOpen} handleClick={handleClick} setIsPopUpOpen={setIsPopUpOpen}/> */}
         
   <Headerbox/>
    
          </Hidden>
        </div>

      
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  margin: PropTypes.bool.isRequired,
  gradient: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  openGuide: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const HeaderInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(Header);

export default withStyles(styles)(HeaderInit);
