import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import UserMenu from "./UserMenu";
import SearchUi from "../Search/SearchUi";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { spacing } from "@material-ui/system";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import styles from "./header-jss";

import { useSelector } from "react-redux";
import {connect } from "react-redux"
// const useStyles = makeStyles((theme) => ({
//   button: {
//     color: theme.palette.primary.contrastText,
//   },
// }));

const elem = document.documentElement;

const theme = createMuiTheme({ palette: { type: "dark" } });

function Header(props) {
  const [open] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const quoteDetails = useSelector((state) => state);
  console.log('state', quoteDetails)
  
  // const [projectDataList, setProjectListData] = useState({})

  // get project data
  
  // let projectData = JSON.parse(localStorage.getItem('projectDataList'))
  // setProjectListData(projectData)

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
    initialValues
  } = props;

  console.log('props', props.initialValues)
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

  const filterOpen = Boolean(anchorEl);
  const id = filterOpen ? "simple-popover" : undefined;

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
        <Hidden smDown>
          <div className={classes.headerProperties}>
          {props.initialValues.projectName === {}?null:
            <MuiThemeProvider theme={theme}>
              <div className={classes.projectSwitcher}>
                <Typography variant="body2">Project:</Typography>
                <Breadcrumbs
              className={classes.projectBreadcrumbs}
              separator={<NavigateNextIcon fontSize="small" />}
            >
            <Chip size="large" label={props.initialValues.projectName.projectName || 'JWIL Project 1'} />
              
            </Breadcrumbs>
              </div>
            </MuiThemeProvider>}

            <div>
              <IconButton
                aria-describedby={id}
                className={classes.filterIcon}
                onClick={handleClick}
              >
                <FilterListIcon fontSize="small" />
              </IconButton>
              <Popover
                id={id}
                open={filterOpen}
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                PaperProps={{
                  style: {
                    width: 200,
                  },
                }}
              >
                <Box p={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        className={classes.filterSelect}
                      >
                        <InputLabel id="filter3-label">Phases</InputLabel>
                        <Select
                          labelId="filter3-label"
                          id="filter3"
                          value={age}
                          onChange={handleChange}
                          label="Phases"
                          style={{ width: "100%" }}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        className={classes.filterSelect}
                      >
                        <InputLabel id="filter3-label">Phases</InputLabel>
                        <Select
                          labelId="filter3-label"
                          id="filter3"
                          value={age}
                          onChange={handleChange}
                          label="Phases"
                          style={{ width: "100%" }}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        className={classes.filterSelect}
                      >
                        <InputLabel id="filter3-label">Phases</InputLabel>
                        <Select
                          labelId="filter3-label"
                          id="filter3"
                          value={age}
                          onChange={handleChange}
                          label="Phases"
                          style={{ width: "100%" }}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disableElevation
                      >
                        Apply
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Popover>
            </div>

            <Breadcrumbs
              className={classes.projectBreadcrumbs}
              separator={<NavigateNextIcon fontSize="small" />}
            >
              <Chip size="small" label="Phase 1" />
              <Chip size="small" label="Unit 11" />
              <Chip size="small" label="Work Area 11" />
            </Breadcrumbs>
          </div>
        </Hidden>
        {/* <div className={classes.searchWrapper}>
          <div className={classNames(classes.wrapper, classes.light)}>
            <div className={classes.search}>
              <SearchIcon />
            </div>
            <SearchUi history={history} />
          </div>
        </div> */}
        {/* <Hidden xsDown>
          <span className={classes.separatorV} />
        </Hidden> */}
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

const HeaderInit = connect(
  state => ({
    initialValues: state.getIn(['InitialDetailsReducer'])
  }),
)(Header);

export default withStyles(styles)(HeaderInit);
