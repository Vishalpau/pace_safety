import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Info from "@material-ui/icons/Info";
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/CheckCircle";
import Error from "@material-ui/icons/RemoveCircle";
import ImageIcon from "@material-ui/icons/Image";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import dummy from "dan-api/dummy/dummyContents";
import messageStyles from "dan-styles/Messages.scss";
import avatarApi from "dan-api/images/avatars";
import companyLogo from "dan-api/images/logos";
import link from "dan-api/ui/link";
import styles from "./header-jss";
import { useHistory } from "react-router";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AssignmentIcon from '@material-ui/icons/Assignment';
import "../../styles/custom/customheader.css";
import {
  access_token,
  ACCOUNT_API_URL,
  LOGIN_URL,
  LOGOUT_URL,
  SELF_API,
  SSO_CLIENT_ID,
  SSO_URL,
  API_VERSION
} from "../../utils/constants";
import axios from "axios";
import Topbar from "./Topbar";
import api from "../../utils/axios";
// redux
import { connect } from 'react-redux'
import { useDispatch } from "react-redux";
import { fetchPermission } from "../../redux/actions/authentication";
const useStyles = makeStyles((theme) => ({
  list: {
    width: 350,
    '& .MuiListItem-root': {
      paddingTop: '8px',
      paddingBottom: '8px',
    },
  },
  fullList: {
    width: "auto",
  },
  headerItems: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  menuListItem: {
    padding: theme.spacing(3),
  },
  nestedMenuListItem: {
    paddingLeft: theme.spacing(6),
  },
  fontWeightMedium: {
    fontWeight: 600,
  },
  appDrawerLable: {
    paddingLeft: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
    backgroundColor: '#f7f7f7',
    margin: '0px',
    fontSize: '14px',
    color: '#333333',
    '& span': {
      fontSize: '14px',
      color: '#333333',
    }
  },
  appDrawerLink: {
    paddingLeft: '35px',
    '& svg': {
      marginRight: '10px',
      color: '#06425c',
    },
    '& .MuiListItemText-root': {
      '& span': {
        fontSize: '15px',
        fontWeight: '400',
        color: '#06425c',
      },
    },
  },
  appDrawerImage: {
    paddingRight: '10px'
  }
}));
function UserMenu(props) {
  const direct_loading = JSON.parse(localStorage.getItem('direct_loading'));
  const history = useHistory();
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    openMenu: null,
  });
  const handleMenu = (menu) => (event) => {
    const { openMenu } = menuState;
    setMenuState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget,
    });
  };
  const handleClose = () => {
    setMenuState({ anchorEl: null, openMenu: null });
  };

  const companyId = JSON.parse(localStorage.getItem('company')) !== null && JSON.parse(localStorage.getItem('company')).fkCompanyId
  const projectId = JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
    : null
  // const selectBreakDown = JSON.parse(localStorage.getItem("selectBreakDown")) !== null
  //   ? JSON.parse(localStorage.getItem("selectBreakDown")).selectBreakDown
  //   : null

  // const selectBreakdown = 
  //     JSON.parse(localStorage.getItem("selectBreakDown"))
  // let struct = "";
  // for (const i in selectBreakdown) {
  //   struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  // }
  // const projectStructure = struct.slice(0, -1);

  const { classes, dark } = props;
  const { anchorEl, openMenu } = menuState;
  // Apps Menu
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const appsOpen = Boolean(menuAnchorEl);
  const [avatar, setAvatar] = useState([]);
  const [name, setName] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState([]);
  const [applications, setApplications] = useState([]);
  const [codes, setCodes] = useState([]);
  const [apps, setApps] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [userImageLink, setUserImageLink] = useState([])
  const [companyLogoLink, setCompanyLogoLink] = useState('')
  const [companyName, setCompanyName] = useState('')
  const anchorRef = React.useRef(null);
  const [openA, setOpena] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [openCompanyList, setOpenCompanyList] = useState(false);

  const [project, setProject] = ([])
  const dispatch = useDispatch()
  const handleAppsClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setOpena(true)
  };
  const handleAppsClose = () => {
    setMenuAnchorEl(null);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/user/logout/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        Cookie:
          "csrftoken=Z4uAv7EMxWG5KCWNNzqdravi8eoUZcIB8OoGeJ4W1abx4i3zqhLwIzloVMcsFrr5",
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 201) {
          localStorage.removeItem("access_token");
          localStorage.clear();
          window.location.href = `${LOGOUT_URL}`;
        }
      })
      .catch((error) => {
        localStorage.removeItem("access_token");
        localStorage.clear();
        window.location.href = `${LOGOUT_URL}`;
      });
  };
  const getSubscriptions = async () => {
    let subscriptionData = {}
    let data = await api
      .get(`${ACCOUNT_API_URL}api/v1/applications/`)
      .then(function (res) {
        subscriptionData = res.data.data.results;
        // setSubscriptions(res.data.data.results);
        return res.data.data.results
      })
      .catch(function (error) {
        localStorage.removeItem("access_token");
        localStorage.clear();
        window.location.href = `${LOGOUT_URL}`;
      });
    setSubscriptions(data);
    setIsLoading(true)
  }
  const getSubscribedApps = async () => {
    const companyId = props.initialValues.companyDataList.fkCompanyId ||
      JSON.parse(localStorage.getItem('company')) !== null && JSON.parse(localStorage.getItem('company')).fkCompanyId

    if (companyId) {
      let subscriptionData = {}
      let data = await api.get(`${SELF_API}${companyId}/`).then(function (res) {
        subscriptionData = res.data.data.results.data.companies[0].subscriptions;
        let hostings = subscriptionData.filter(item => item.appCode === "safety")[0].hostings[0].apiDomain
        let appId = subscriptionData.filter(item => item.appCode === "safety")[0].appId
        let subscriptionAction = subscriptionData.filter(item => item.appCode === "actions")
        let apiUrlDomain = {}

        if (subscriptionAction.length > 0) {
          let actionHosting = subscriptionAction[0].hostings[0].apiDomain
          let actionUI = subscriptionAction[0].hostings[0].appDomain
          let actionClientId = subscriptionAction[0].hostings[0].clientId

          apiUrlDomain = { "safety": hostings, "actions": actionHosting, "actionsUI": actionUI, "actionClientID": actionClientId, "appId": appId }
        } else {
          apiUrlDomain = { "safety": hostings }
        }

        localStorage.setItem("apiBaseUrl", hostings)
        localStorage.setItem("BaseUrl", JSON.stringify(apiUrlDomain))
        setUserImageLink(res.data.data.results.data.avatar)
        setCompanyLogoLink(res.data.data.results.data.companies[0].logo)
        setCompanyName(res.data.data.results.data.companies[0].companyName)
        // setSubscriptions(subscriptionData);
        return subscriptionData
      })
        .catch(function (error) {
          localStorage.removeItem("access_token");
          localStorage.clear();
          window.location.href = `${LOGOUT_URL}`;
        });
      const modules = data.map(subscription => subscription.modules)
      var temp = []
      modules.map((module) => {
        temp = [...temp]
        if (module.length > 0) {
          (module.map((mod) => {
            if (mod.subscriptionStatus == 'active') {
              temp.push(mod.moduleCode)
              setApps(temp)
              return temp
            }
          }
          ))
        }
      }
      )
    }
  }

  const handleClosea = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpena(false);
  };
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  const handleClick = (clientId, tarProjectStruct, targetPage) => {
    if (clientId) {

      // http://localhost:3000/?code=pBN2PBLLdbYb4frzG1Qe9xAlW8Bkdu&state=%7B%27companyId%27%3A+%271%27%2C+%27projectId%27%3A+%2713%27%2C+%27projectStructure%27%3A+%27%5B%7B%22depth%22%3A%221L%22%2C%22id%22%3A66%2C%22name%22%3A%22phase1%22%2C%22label%22%3A%22Phase%22%7D%2C%7B%22depth%22%3A%222L%22%2C%22id%22%3A68%2C%22name%22%3A%22unit1%22%2C%22label%22%3A%22Unit%22%7D%5D%27%2C+%27targetPage%27%3A+%27pages%2Fcompliance%27%2C+%27phaseId%27%3A+%27%27%2C+%27unitId%27%3A+%27%27%2C+%27moduleType%27%3A+%27%27%2C+%27targetId%27%3A+%27%27%2C+%27redirect_back%27%3A+%27%27%7D

      window.open(
        ACCOUNT_API_URL + API_VERSION + 'user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&projectStructure=' + tarProjectStruct + '&companyId=' + JSON.parse(localStorage.getItem('company')).fkCompanyId + '&projectId=' + JSON.parse(localStorage.getItem('projectName')).projectName.projectId,
        '_blank' // <- This is what makes it open in a new window.
      );
    }

    // window.open(
    //   window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+clientId+'&response_type=code',
    //   '_blank' // <- This is what makes it open in a new window.
    // );

  }
  useEffect(() => {
    getSubscribedApps();
    getSubscriptions();
  }, [props.initialValues.companyDataList])

  const classnames = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");

  const handleCompanyDialog = () => {
    localStorage.clear();
    window.location.href = "/";
    // const companiesData = [];
    // JSON.parse(localStorage.getItem('userDetails')).companies.forEach(company => {
    //   companiesData.push({
    //     fkCompanyId: company.companyId,
    //     fkCompanyName: company.companyName
    //   })
    // })
    // setCompanyList([...companiesData])
    // setOpenCompanyList(!openCompanyList)
  }

  // const handleCompany = (index) => {
  //   localStorage.clear();
  //   localStorage.setItem('company', JSON.stringify(companyList[index]));
  //   window.location.href = "/";
  // }

  return (
    <>
      {/* {openCompanyList && (
        <Dialog
          className={classes.projectDialog}
          open
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              handleCompanyDialog();
            }
          }}
          PaperProps={{
            style: {
              width: 400,
            },
          }}
        >
          <DialogTitle onClose={handleCompanyDialog}>
            Select Company
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <List>
                    {companyList.length > 0
                      ? companyList.map((selectValues, key) => (
                        <ListItem
                          button
                          key={key}
                          onClick={() => handleCompany(key)}
                        >
                          <ListItemAvatar>
                            <Avatar variant="rounded">
                              <ImageIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            className={classes.companyNameList}
                            primary={selectValues.fkCompanyName}
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

      )} */}
      <div>
        <Tooltip title="Apps" placement="bottom">
          <IconButton
            aria-controls={openA ? "apps-menu" : undefined}
            aria-haspopup="true"
            onClick={handleAppsClick}
            className={classNames(
              classes.appIcon,
              dark ? classes.dark : classes.light
            )}
          >
            <i className="ion-ios-apps" />
          </IconButton>
        </Tooltip>
        {/* <Topbar/> */}
        {/* <Drawer anchor="right" open={appsOpen} onClose={handleAppsClose}>
        {isLoading ?
          <div elevation={3} className={classnames.list}>
            <List component="nav">
              {subscriptions.map((subscription, key) => (
                (subscription.appCode !== "safety") && subscription.modules.length > 0 && apps.includes(subscription.appId) ?
                  <div key={key}>
                    <ListItemText
                      className={classnames.appDrawerLable}
                      primary={subscription.appName}
                    />
                    <Divider />
                    <List>
                      {subscription.modules.map((module, mIndex) => (
                        <div key={mIndex}>

                          <ListItemLink disabled={!apps.includes(subscription.appId)} onClick={() => handleClick(subscription.hostings[0].clientId != undefined ? ((subscription.hostings[0].clientId != undefined ? subscription.hostings.filter(hosting => hosting.fkCompanyId === JSON.parse(localStorage.getItem("company")).fkCompanyId)[0].clientId : "")) : "", module.targetPage,)} className={classnames.appDrawerLink}>
                            <img className={classnames.appDrawerImage} src={module.moduleIcon} />
                            <ListItemText primary={module.moduleWebName} />
                          </ListItemLink>
                        </div>
                      ))}
                    </List>
                  </div>
                  : ""
              )
              )}
            </List>
          </div> : null}
      </Drawer> */}

        <Drawer anchor="right" className={classes.appDrawerSection} open={openA} role={undefined} transition disablePortal>
          <div elevation={3} className={classnames.list}>
            <ClickAwayListener onClickAway={handleClosea}>
              <List component="nav">
                {subscriptions.map((subscription) => (
                  (subscription.modules.length > 0) ?
                    <div>
                      <ListItemText
                        className={classnames.appDrawerLable}
                        primary={subscription.appName}
                      />
                      <Divider />
                      <List>
                        {subscription.modules.map((module) => {
                          // console.log(module, 'module');
                          return (
                            <div>
                              <ListItemLink disabled={!apps.includes(module.moduleCode)} onClick={() => handleClick(subscription.hostings[0].clientId != undefined ?
                                ((subscription.hostings[0].clientId != undefined ?
                                  subscription.hostings.filter(hosting => hosting.fkCompanyId === JSON.parse(localStorage.getItem("company")).fkCompanyId)[0].clientId
                                  : ""))
                                : "", direct_loading.tarProjectStruct, module.targetPage)}
                                className={classnames.appDrawerLink}>
                                {Boolean(module.moduleIcon) ?
                                  <img className={classnames.appDrawerImage} src={module.moduleIcon} />
                                  : <AssignmentIcon />
                                }
                                <ListItemText primary={module.moduleWebName} />
                              </ListItemLink>
                            </div>
                          )
                        }
                        )}
                      </List>
                    </div>
                    : ""
                ))}
                <Divider />
              </List>
            </ClickAwayListener>
          </div>
        </Drawer>

        <Button
          // className={classes.userControls}        
          className="textCenter"
          onClick={handleMenu("user-setting")}
        >
          {isDesktop && companyLogoLink ?
            <img className={classes.userLogo} src={companyLogoLink} />
            : <MenuItem style={{ color: "white" }} color="white">{companyName}</MenuItem>}
          <Avatar
            alt={dummy.user.name}
            variant="circle"
            src={userImageLink ? userImageLink : dummy.user.avatar}
          />
        </Button>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              width: 350,
            },
          }}
          open={openMenu === "user-setting"}
          onClose={handleClose}
        >
          <Grid container spacing={3} className="textCenter">
            <Grid item md={12} sm={12} xs={12} className="userPrigileGrid">
              <Avatar
                alt={dummy.user.name}
                variant="circle"
                src={userImageLink ? userImageLink : dummy.user.avatar}
                className="avtarCenter"
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="pTopFour">
              <Typography className="userDropDownHeading">
                {/* {JSON.parse(localStorage.getItem('userDetails')).name} */}
                {JSON.parse(localStorage.getItem("userDetails")) !== null
                  ? JSON.parse(localStorage.getItem("userDetails")).name
                  : null}
              </Typography>
              {/* <Typography className="userDropDown">
              Safety Department
            </Typography> */}
              <Typography className="userDropDownLast">
                {/* {JSON.parse(localStorage.getItem('projectName')).projectName.projectName} */}
                {JSON.parse(localStorage.getItem("projectName")) !== null
                  ? JSON.parse(localStorage.getItem("projectName")).projectName.projectName
                  : null}
              </Typography>
            </Grid>
          </Grid>
          <MenuItem
            component={Link}
            className="userText"
            onClick={() =>
              window.location.href = `${SSO_URL}/UserProfile/?companyId=${companyId}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g id="Profile-24" transform="translate(-2 -2)">
                <g id="Group_29" data-name="Group 29" transform="translate(2 2)">
                  <path id="Path_2265" data-name="Path 2265" d="M14,2A12,12,0,1,0,26,14,12,12,0,0,0,14,2ZM8.084,21.536C8.6,20.456,11.744,19.4,14,19.4s5.412,1.056,5.916,2.136a9.51,9.51,0,0,1-11.832,0ZM21.632,19.8C19.916,17.708,15.752,17,14,17s-5.916.708-7.632,2.8a9.6,9.6,0,1,1,15.264,0Z" transform="translate(-2 -2)" fill="#06425c" />
                  <path id="Path_2266" data-name="Path 2266" d="M12,6a3.5,3.5,0,1,0,3.5,3.5A3.491,3.491,0,0,0,12,6Zm0,5a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,11Z" transform="translate(0 -0.769)" fill="#06425c" />
                </g>
              </g>
            </svg>
            Profile
          </MenuItem>
          <Divider />
          <MenuItem
            component={Link}
            className="userText"
            disabled={true}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g id="setting-24" transform="translate(-1041 -51)">
                <g id="Group_5797" data-name="Group 5797" transform="translate(1041 51)">
                  <g id="Group_5785" data-name="Group 5785" transform="translate(0)">
                    <g id="Group_5770" data-name="Group 5770">
                      <g id="Group_5756" data-name="Group 5756">
                        <g id="Group_5753" data-name="Group 5753">
                          <g id="Group_5746" data-name="Group 5746">
                            <g id="Group_5744" data-name="Group 5744">
                              <g id="Group_5742" data-name="Group 5742">
                                <rect id="Rectangle_1883" data-name="Rectangle 1883" width="23" height="23" fill="none" />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                  <g id="noun_setting_4423294" transform="translate(1 1)">
                    <g id="Group_5759" data-name="Group 5759">
                      <g id="Group_5757" data-name="Group 5757">
                        <path id="Path_6426" data-name="Path 6426" d="M80.654,235.332a1.176,1.176,0,0,0-.968-.992,12.727,12.727,0,0,0-4.653,0,1.176,1.176,0,0,0-.968.992l-.257,2.045a9.514,9.514,0,0,0-2.18,1.2l-1.991-.811a1.248,1.248,0,0,0-1.385.3,11.379,11.379,0,0,0-2.328,3.835,1.117,1.117,0,0,0,.42,1.292l1.734,1.236a8.412,8.412,0,0,0,0,2.395s-1.734,1.234-1.734,1.234a1.117,1.117,0,0,0-.42,1.292,11.379,11.379,0,0,0,2.328,3.835,1.248,1.248,0,0,0,1.385.3l1.991-.811a9.514,9.514,0,0,0,2.18,1.2l.257,2.045a1.176,1.176,0,0,0,.968.992,12.727,12.727,0,0,0,4.653,0,1.176,1.176,0,0,0,.968-.992l.257-2.045a9.514,9.514,0,0,0,2.179-1.2l1.991.811a1.248,1.248,0,0,0,1.385-.3,11.379,11.379,0,0,0,2.328-3.835,1.117,1.117,0,0,0-.42-1.292l-1.734-1.236a8.41,8.41,0,0,0,0-2.395s1.734-1.234,1.734-1.234a1.117,1.117,0,0,0,.42-1.292,11.379,11.379,0,0,0-2.328-3.835,1.248,1.248,0,0,0-1.385-.3l-1.991.811a9.514,9.514,0,0,0-2.179-1.2Zm-2.291,1.142.237,1.88a1.167,1.167,0,0,0,.838.961,7.034,7.034,0,0,1,2.627,1.443,1.256,1.256,0,0,0,1.293.211l1.829-.745a9.039,9.039,0,0,1,1,1.653L84.6,243.012a1.122,1.122,0,0,0-.455,1.171,6.305,6.305,0,0,1,0,2.885,1.122,1.122,0,0,0,.455,1.171l1.592,1.135a9.039,9.039,0,0,1-1,1.653l-1.829-.745a1.256,1.256,0,0,0-1.293.211,7.034,7.034,0,0,1-2.627,1.443,1.167,1.167,0,0,0-.838.961l-.237,1.88a10.2,10.2,0,0,1-2.007,0l-.237-1.88a1.167,1.167,0,0,0-.838-.961,7.035,7.035,0,0,1-2.627-1.443,1.256,1.256,0,0,0-1.293-.211l-1.829.745a9.038,9.038,0,0,1-1-1.653l1.592-1.135a1.122,1.122,0,0,0,.455-1.171,6.305,6.305,0,0,1,0-2.885,1.122,1.122,0,0,0-.455-1.171l-1.592-1.135a9.038,9.038,0,0,1,1-1.653l1.829.745a1.256,1.256,0,0,0,1.293-.211,7.034,7.034,0,0,1,2.627-1.443,1.167,1.167,0,0,0,.838-.961l.237-1.88a10.193,10.193,0,0,1,2.007,0Z" transform="translate(-65.86 -234.125)" fill="#06425c" fill-rule="evenodd" />
                      </g>
                      <g id="Group_5758" data-name="Group 5758" transform="translate(7.659 7.659)">
                        <path id="Path_6427" data-name="Path 6427" d="M138.675,46.5a3.841,3.841,0,1,0,3.841,3.841A3.843,3.843,0,0,0,138.675,46.5Zm0,2.2a1.646,1.646,0,1,1-1.646,1.646A1.648,1.648,0,0,1,138.675,48.7Z" transform="translate(-134.834 -46.5)" fill="#06425c" fill-rule="evenodd" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>

            Settings
          </MenuItem>
          <Divider />
          <MenuItem
            component={Link}
            className="userText"
            onClick={handleCompanyDialog}
            disabled={localStorage.getItem('companiesCount') > 1 ? false : true}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g id="switch-compnay-24" transform="translate(-96.011 -108.003)">
                <path id="Path_6532" data-name="Path 6532" d="M119.694,519.1a1.088,1.088,0,0,0-.8-.294h-6.416l2.783-2.81h-3.35l-3.945,3.933,3.945,3.933h3.35l-2.783-2.809h5.246v6.181H98.3v-7.351a1.143,1.143,0,1,0-2.286,0v8.391a1.261,1.261,0,0,0,.384.841,1.318,1.318,0,0,0,.866.367h21.634a1.156,1.156,0,0,0,.8-.367,1.193,1.193,0,0,0,.317-.841V519.87a1.027,1.027,0,0,0-.317-.768Z" transform="translate(0 -397.48)" fill="#06425c" />
                <path id="Path_6533" data-name="Path 6533" d="M119.719,108.324a1.1,1.1,0,0,0-.794-.321H97.291a1.285,1.285,0,0,0-.87.321,1.162,1.162,0,0,0-.388.8v8.406a1.2,1.2,0,0,0,.388.814,1.3,1.3,0,0,0,.87.339h6.416l-2.783,2.809h3.35l3.945-3.933-3.945-3.933h-3.35l2.783,2.809H98.318v-6.181h19.428v7.26a1.143,1.143,0,1,0,2.286,0v-8.391a1.083,1.083,0,0,0-.313-.8Z" transform="translate(-0.021 0)" fill="#06425c" />
              </g>
            </svg>
            Switch Company
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              handleLogout(e);
            }}
            className="textCenterButton"
          >
            <Button size="medium" variant="contained" color="primary" className="buttonStyleDropdown">
              Logout
            </Button>
          </MenuItem>
          {/* <MenuItem
          onClick={() =>
            window.location.href = `${SSO_URL}/UserProfile`}
        >
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={(e) => {
            handleClose();
            handleLogout(e);
          }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Log Out
        </MenuItem> */}
        </Menu>
      </div>
    </>
  );
}
UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  dark: PropTypes.bool,
};
UserMenu.defaultProps = {
  dark: false,
};
const UserInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(UserMenu);
export default withStyles(styles)(UserInit);