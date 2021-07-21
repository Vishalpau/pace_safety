import React, { useState } from "react";
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

import "../../styles/custom/customheader.css";
import {
  access_token,
  ACCOUNT_API_URL,
  LOGIN_URL,
  LOGOUT_URL,
  SSO_CLIENT_ID,
  SSO_URL
} from "../../utils/constants";
import axios from "axios";

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
});

function UserMenu(props) {
  const history = useHistory()
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

  const handleAppsClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleAppsClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault()
    console.log(access_token);
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/user/logout/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Cookie': 'csrftoken=Z4uAv7EMxWG5KCWNNzqdravi8eoUZcIB8OoGeJ4W1abx4i3zqhLwIzloVMcsFrr5'
      },
    };
    console.log(config);
    axios(config)
      .then((response) => {
        if(response.status === 201) {
          console.log(response)
          localStorage.removeItem('access_token')
          localStorage.clear();
            window.location.href =`${LOGOUT_URL}`          
        }
      })
      .catch((error) => {
        localStorage.removeItem('access_token');
        localStorage.clear();
        window.location.href =`${LOGOUT_URL}`
      });
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const classnames = useStyles();

  return (
    <div>
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
              <Avatar className={messageStyles.icon}>
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
      </Menu>

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

      <Drawer
        anchor="right"
        anchorEl={menuAnchorEl}
        open={appsOpen}
        onClose={handleAppsClose}
      >
        <div className={classnames.list}>
          <List dense className={classnames.menulist}>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Project Information Hub" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
              <ListItemText primary="HSE Management" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Assesments" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Complaince Protocols" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Environment Management" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Intelligent Permit Management" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Incident Reporting & Management" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Rapid Knowledge & Collaboration" />
            </ListItemLink>
          </List>
        </div>
      </Drawer>

      {/* <Menu
        id="apps-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        PaperProps={{
          style: {
            width: 250,
          },
        }}
        open={appsOpen}
        onClose={handleAppsClose}
        className="headerAppsGrid"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleAppsClose}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="subtitle2">Project Information Hub</Typography>
        </MenuItem>
        <MenuItem onClick={handleAppsClose}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="subtitle2">Menu Item</Typography>
        </MenuItem>
        <MenuItem onClick={handleAppsClose}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="subtitle2">Menu Item</Typography>
        </MenuItem>
        <MenuItem onClick={handleAppsClose}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="subtitle2">Menu Item</Typography>
        </MenuItem>
        <MenuItem onClick={handleAppsClose}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="subtitle2">Menu Item</Typography>
        </MenuItem>
        <MenuItem onClick={handleAppsClose}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="subtitle2">Menu Item</Typography>
        </MenuItem>
        <MenuItem onClick={handleAppsClose}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="subtitle2">Menu Item</Typography>
        </MenuItem>
        <MenuItem onClick={handleAppsClose}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="subtitle2">Menu Item</Typography>
        </MenuItem>
      </Menu> */}

      <Button
        className={classes.userControls}
        onClick={handleMenu("user-setting")}
      >
        <img className={classes.userLogo} src={companyLogo[0]} />
        <Avatar
          alt={dummy.user.name}
          variant="circle"
          src={dummy.user.avatar}
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
        <MenuItem onClick={handleClose} component={Link} to={link.profile}>
          My Profile
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={link.calendar}>
          My Calendar
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={link.email}>
          My Inbox
          <ListItemIcon>
            <Badge
              className={classNames(classes.badge, classes.badgeMenu)}
              badgeContent={2}
              color="secondary"
            />
          </ListItemIcon>
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

export default withStyles(styles)(UserMenu);
