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

import { connect } from "react-redux";
import { useParams } from "react-router";

import { HEADER_AUTH, SSO_URL } from "../../utils/constants";
import Axios from "axios";
import { set } from "lodash";

const elem = document.documentElement;

const theme = createMuiTheme({ palette: { type: "dark" } });

function HeaderBreakdown(props) {
  const [open] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {fkid}  = useParams();


  const [selectBreakDown, setSelectBreakDown] = useState([]);

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

  const setMargin = (sidebarPosition) => {
    if (sidebarPosition === "right-sidebar") {
      return classes.right;
    }
    if (sidebarPosition === "left-sidebar-big") {
      return classes.leftBig;
    }
    return classes.left;
  };

  // check and store in localstorage 
  if (Object.keys(props.initialValues.projectName).length > 0) {

    localStorage.setItem("projectName", JSON.stringify(props.initialValues));
  }

  if(props.initialValues.breakDown.length>0){
    localStorage.setItem('selectBreakDown',JSON.stringify(props.initialValues.breakDown))
  }
  const projectData = JSON.parse(localStorage.getItem("projectName"));
  
  
  const breakDownData = JSON.parse(localStorage.getItem("selectBreakDown"))

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterOpen = Boolean(anchorEl);
  const id = filterOpen ? "simple-popover" : undefined;

  const handleBreakdown = async (e, index) => {
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
              { depth: item.depth, id: item.id, name: item.name },
            ]);
            localStorage.setItem(
              "selectBreakDown",
              JSON.stringify([
                ...removeSelectBreakDown,
                { depth: item.depth, id: item.id, name: item.name },
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
              { depth: item.depth, id: item.id, name: item.name },
            ]);
            localStorage.setItem(
              "selectBreakDown",
              JSON.stringify([
                ...selectBreakDown,
                { depth: item.depth, id: item.id, name: item.name },
              ])
            );
            return;
          }

        }
      );
    }


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
                    selectValue: ""
                  },
                ]);
              }
            }
          })
          .catch(function (error) {

          });
      }
    }
  };

  const fetchCallBack = async () => {
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
                selectValue: ""
              },
            ]);

            setIsLoading(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  const fetchIncidentData = async()=>{
    alert(fkid)
    const res = await Axios.get(`/api/v1/incidents/${fkid}/`);
        const result = res.data.data.results;
        console.log(result)
  }
  useEffect(() => {
      fetchCallBack();
      if(fkid){
        fetchIncidentData();
      }
      
  }, [props.initialValues.projectName]);

  return (
    <>
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
          {isLoading ? (
            <Box p={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {breakdown1ListData.length > 0
                    ? breakdown1ListData.map((item, index) => (
                      <FormControl
                        key={index}
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        className={classes.filterSelect}
                      >

                        <InputLabel id="filter3-label">
                          {item.breakdownLabel}
                        </InputLabel>
                        <Select
                          labelId="filter3-label"
                          id="filter3"
                          value={item.selectValue}
                          onChange={(e) => {
                            handleBreakdown(e, index + 1);

                          }}
                          label="Phases"
                          style={{ width: "100%" }}
                        >
                          {item.breakdownValue.length
                            ? item.breakdownValue.map(
                              (selectValue, selectKey) => (
                                <MenuItem
                                  key={selectKey}
                                  value={selectValue.id}
                                >
                                  {selectValue.name}
                                </MenuItem>
                              )
                            )
                            : null}
                        </Select>
                      </FormControl>
                    ))
                    : null}
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </Popover>
      </div>
      <Breadcrumbs
        className={classes.projectBreadcrumbs}
        separator={<NavigateNextIcon fontSize="small" />}
      >

        {breakDownData !== null
          ? breakDownData.map(
            (item, index) => (
              <Chip size="small" label={item.name} key={index} />
            )
          )
          : null}
      </Breadcrumbs>
    </>
  );
}

HeaderBreakdown.propTypes = {
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
}))(HeaderBreakdown);

export default withStyles(styles)(HeaderInit);