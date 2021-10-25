import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Info from "@material-ui/icons/Info";
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/CheckCircle";
import Error from "@material-ui/icons/RemoveCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
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
}));
function UserMenu(props) {
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
  const [project, setProject] = ([])
  const dispatch = useDispatch()
  const handleAppsClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
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
    const companyId = props.initialValues.companyDataList.fkCompanyId || JSON.parse(localStorage.getItem('company')).fkCompanyId
    
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
          
          apiUrlDomain = { "safety": hostings, "actions": actionHosting, "actionsUI": actionUI, "actionClientID": actionClientId , "appId" : appId}
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
      await setApps(data.map(app => app.appId))
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
  const handleClick = (clientId,targetPage) => {
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
  useEffect(() => {
    getSubscribedApps();
    getSubscriptions();
  }, [props.initialValues.companyDataList])

  const classnames = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <div>
      {isDesktop && (
        <Tooltip title="Support" placement="bottom">
          <IconButton
            className={classNames(
              classes.helpIcon,
              dark ? classes.dark : classes.light
            )}
          >
            <i className="ion-md-help-circle" />
          </IconButton>
        </Tooltip>
      )}
      {isDesktop && (
        <>
          <IconButton
            aria-haspopup="true"
            onClick={handleMenu("notification")}
            color="inherit"
            className={classNames(
              classes.notifIcon,
              dark ? classes.dark : classes.light
            )}
          >
            <Badge className={classes.badge} badgeContent={4} color="secondary">
              <i className="ion-ios-notifications-outline" />
            </Badge>
          </IconButton>
          <Menu
            id="menu-notification"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            className={classes.notifMenu}
            PaperProps={{
              style: {
                width: 350,
              },
            }}
            open={openMenu === "notification"}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <div className={messageStyles.messageInfo}>
                <ListItemAvatar>
                  <Avatar alt="User Name" src={avatarApi[0]} />
                </ListItemAvatar>
                <ListItemText
                  primary={dummy.text.subtitle}
                  secondary={dummy.text.date}
                />
              </div>
            </MenuItem>
            <Divider variant="inset" />
            <MenuItem onClick={handleClose}>
              <div className={messageStyles.messageInfo}>
                <ListItemAvatar>
                  <Avatar className={messageStyles.icon}>
                    <Info />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={dummy.text.sentences}
                  className={classes.textNotif}
                  secondary={dummy.text.date}
                />
              </div>
            </MenuItem>
            <Divider variant="inset" />
            <MenuItem onClick={handleClose}>
              <div className={messageStyles.messageSuccess}>
                <ListItemAvatar>
                  <Avatar className={messageStyles.icon}>
                    <Check />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={dummy.text.subtitle}
                  className={classes.textNotif}
                  secondary={dummy.text.date}
                />
              </div>
            </MenuItem>
            <Divider variant="inset" />
            <MenuItem onClick={handleClose}>
              <div className={messageStyles.messageWarning}>
                <ListItemAvatar>
                  <Avatar className={messageStyles.icon}>
                    <Warning />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={dummy.text.subtitle}
                  className={classes.textNotif}
                  secondary={dummy.text.date}
                />
              </div>
            </MenuItem>
            <Divider variant="inset" />
            <MenuItem onClick={handleClose}>
              <div className={messageStyles.messageError}>
                <ListItemAvatar>
                  <Avatar src={userImageLink} className={messageStyles.icon}>
                    <Error />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Suspendisse pharetra pulvinar sollicitudin. Aenean ut orci eu odio cursus lobortis eget tempus velit. "
                  className={classes.textNotif}
                  secondary="Jan 9, 2016"
                />
              </div>
            </MenuItem>
          </Menu>{" "}
        </>
      )}
      <Tooltip title="Apps" placement="bottom">
        <IconButton
          aria-controls="apps-menu"
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
      <Drawer anchor="right" open={appsOpen} onClose={handleAppsClose}>
        {isLoading ?
          <div elevation={3} className={classnames.list}>
            <List component="nav">
        {/* https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=6PZZ5hTD0cV7TLTE15GqQU5hucV6PV88VSxNv3NT&response_type=code&targetPage=actions&companyId=1&projectId=undefined */}
              {subscriptions.map((subscription,key) => (
                (subscription.appCode !== "safety") && subscription.modules.length > 0 && apps.includes(subscription.appId) ?
                  <div key={key}>
                    <ListItemText
                      className={classnames.appDrawerLable}
                      primary={subscription.appName}
                    />
                    <Divider />
                    <List>
                      {subscription.modules.map((module,mIndex) => (
                        <div key={mIndex}>
                    
                          <ListItemLink  disabled={!apps.includes(subscription.appId)} onClick={()=>handleClick(subscription.hostings[0].clientId != undefined ? ((subscription.hostings[0].clientId != undefined ? subscription.hostings.filter(hosting=>hosting.fkCompanyId ===JSON.parse(localStorage.getItem("company")).fkCompanyId)[0].clientId : "")) : "",module.targetPage,)} className={classnames.appDrawerLink}>
                            {/* {process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+subscription.hostings[0].clientId+'&response_type=code&targetPage='+module.targetPage+'&companyId='+localStorage.getItem('companyId')+'&projectId='+localStorage.getItem('ssoProjectId')} */}
                            <AssignmentIcon />
                            <ListItemText primary={module.moduleWebName} />
                          </ListItemLink>
                        </div>
                      ))}
                    </List>
                  </div>
                  : ""
              )
              )}
              {/* <Divider /> */}
            </List>
          </div> : null}
      </Drawer>
      <Button
        className={classes.userControls}
        onClick={handleMenu("user-setting")}
      >
        {isDesktop && companyLogoLink ? <img className={classes.userLogo} src={companyLogoLink} /> : <MenuItem style={{ color: "white" }} color="white">{companyName}</MenuItem>}
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
        open={openMenu === "user-setting"}
        onClose={handleClose}
      >
        <MenuItem
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
        </MenuItem>
      </Menu>
    </div>
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