import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";

import dummy from "dan-api/dummy/dummyContents";
import messageStyles from "dan-styles/Messages.scss";
import avatarApi from "dan-api/images/avatars";
import companyLogo from "dan-api/images/logos";
import link from "dan-api/ui/link";
import styles from "./header-jss";

import "../../styles/custom/customheader.css";

function UserMenu(props) {
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

  const handleLogout = () => {
    localStorage.clear();
    window.location.href =
      "https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo&client_secret=pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz&response_type=code";
  };

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

      <Menu
        id="apps-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={appsOpen}
        onClose={handleAppsClose}
        className="headerAppsGrid"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
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
      </Menu>

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
        // getContentAnchorEl="undefined"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <Button onClick={handleLogout}>Log Out</Button>
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
