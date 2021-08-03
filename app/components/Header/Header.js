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

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

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
    color: "#ffffff",
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
  } = props;

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

  const handleClose = () => {
    setAnchorEl(null);
  };
  //Project selections
  const handleProjectOpen = () => {
    setProjectOpen(true);
  };

  const handleProjectClose = () => {
    setProjectOpen(false);
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

  const filterOpen = Boolean(anchorEl);
  const id = filterOpen ? "simple-popover" : undefined;
  const classesm = useStyles();

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
            <Typography display="inline">Project:</Typography>
            <IconButton
              aria-label="control tower"
              variant="outlined"
              clickable
              size="small"
              className={classesm.projectName}
              onClick={handleProjectOpen}
            >
              NTPC Project <EditIcon />
            </IconButton>

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
                <DialogContentText>
                  <Grid container spacing={4}>
                    <Grid
                      item
                      md={4}
                      sm={6}
                      xs={12}
                      className={classesm.cardContentBox}
                    >
                      <Card>
                        <CardActionArea className={classesm.cardActionAreaBox}>
                          <div className={classesm.cardMediaBox}>
                            <CardMedia
                              className={classesm.media}
                              image={ProjectImg}
                            />
                          </div>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              className={classesm.projectSelectionTitle}
                            >
                              NTPC Project NTPC Project NTPC Project Project
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className={classesm.projectSelectionCode}
                            >
                              Code: 235E-WE1298
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
                    <Grid
                      item
                      md={4}
                      sm={6}
                      xs={12}
                      className={classesm.cardContentBox}
                    >
                      <Card>
                        <CardActionArea className={classesm.cardActionAreaBox}>
                          <div className={classesm.cardMediaBox}>
                            <CardMedia
                              className={classesm.media}
                              image={ProjectImgOne}
                            />
                          </div>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              className={classesm.projectSelectionTitle}
                            >
                              NTPC Project
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className={classesm.projectSelectionCode}
                            >
                              Code: 235E-WE1298
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
                    <Grid
                      item
                      md={4}
                      sm={6}
                      xs={12}
                      className={classesm.cardContentBox}
                    >
                      <Card>
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
                              NTPC Project NTPC Project NTPC Project Project
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className={classesm.projectSelectionCode}
                            >
                              Code: 235E-WE1298
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
                    <Grid
                      item
                      md={4}
                      sm={6}
                      xs={12}
                      className={classesm.cardContentBox}
                    >
                      <Card>
                        <CardActionArea className={classesm.cardActionAreaBox}>
                          <div className={classesm.cardMediaBox}>
                            <CardMedia
                              className={classesm.media}
                              image={ProjectImgOne}
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
                              NTPC Project
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className={classesm.projectSelectionCode}
                            >
                              Code: 235E-WE1298
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
                    <Grid
                      item
                      md={4}
                      sm={6}
                      xs={12}
                      className={classesm.cardContentBox}
                    >
                      <Card>
                        <CardActionArea className={classesm.cardActionAreaBox}>
                          <div className={classesm.cardMediaBox}>
                            <CardMedia
                              className={classesm.media}
                              image={ProjectImgOne}
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
                              NTPC Project
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className={classesm.projectSelectionCode}
                            >
                              Code: 235E-WE1298
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
                  </Grid>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
          <Hidden smDown>
            <Headerbox />
          </Hidden>
        </div>

        {/* <Tooltip title="Turn Dark/Light" placement="bottom">
          <IconButton className={classes.button} onClick={() => turnMode(mode)}>
            <i className="ion-ios-bulb-outline" />
          </IconButton>
        </Tooltip> */}

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

export default withStyles(styles)(Header);
