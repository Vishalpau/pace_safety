import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import brand from 'dan-api/dummy/brand';
import dummy from 'dan-api/dummy/dummyContents';
import paceLogo from '../../Assets/Images/paceLogo.png';
import MainMenu from './MainMenu';
import styles from './sidebar-jss';

function SidebarContent(props) {
  const [transform, setTransform] = useState(0);

  const handleScroll = (event) => {
    const scroll = event.target.scrollTop;
    setTransform(scroll);
  };

  useEffect(() => {
    const mainContent = document.getElementById('sidebar');
    mainContent.addEventListener('scroll', handleScroll);
    return () => {
      mainContent.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const {
    classes,
    turnDarker,
    drawerPaper,
    toggleDrawerOpen,
    loadTransition,
    leftSidebar,
    dataMenu,
    status,
    anchorEl,
    openMenuStatus,
    closeMenuStatus,
    changeStatus,
    isLogin
  } = props;

  const setStatus = st => {
    switch (st) {
      case 'online':
        return classes.online;
      case 'idle':
        return classes.idle;
      case 'bussy':
        return classes.bussy;
      default:
        return classes.offline;
    }
  };

  return (
    <div className={classNames(classes.drawerInner, !drawerPaper ? classes.drawerPaperClose : '')}>
      <div className={classes.drawerHeader}>
        <NavLink to="/">
          <img src={paceLogo} alt="Pace Logo" />
        </NavLink>
        {/* <NavLink to="/app" className={classNames(classes.brand, classes.brandBar, turnDarker && classes.darker)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink> */}
        {/* {isLogin && (
          <div
            className={classNames(classes.profile, classes.user)}
            style={{ opacity: 1 - (transform / 100) }}
          >
            <Avatar
              alt={dummy.user.name}
              src={dummy.user.avatar}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <div>
              <h4>{dummy.user.name}</h4>
              <Button size="small" onClick={openMenuStatus}>
                <i className={classNames(classes.dotStatus, setStatus(status))} />
                {status}
              </Button>
              <Menu
                id="status-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenuStatus}
                className={classes.statusMenu}
              >
                <MenuItem onClick={() => changeStatus('online')}>
                  <i className={classNames(classes.dotStatus, classes.online)} />
                  Online
                </MenuItem>
                <MenuItem onClick={() => changeStatus('idle')}>
                  <i className={classNames(classes.dotStatus, classes.idle)} />
                  Idle
                </MenuItem>
                <MenuItem onClick={() => changeStatus('bussy')}>
                  <i className={classNames(classes.dotStatus, classes.bussy)} />
                  Bussy
                </MenuItem>
                <MenuItem onClick={() => changeStatus('offline')}>
                  <i className={classNames(classes.dotStatus, classes.offline)} />
                  Offline
                </MenuItem>
              </Menu>
            </div>
          </div>
        )} */}
      </div>
      <div
        id="sidebar"
        className={
          classNames(
            classes.menuContainer,
            leftSidebar && classes.rounded,
            isLogin && classes.withProfile
          )
        }
      >
        <MainMenu loadTransition={loadTransition} dataMenu={dataMenu} toggleDrawerOpen={toggleDrawerOpen} />

        <div
          id="version"
          className="versionSectionText"
        >
            <svg id="administration-24_" data-name="administration-24 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g id="Group_5747" data-name="Group 5747" opacity="0">
                <g id="Group_5746" data-name="Group 5746">
                  <g id="Group_5744" data-name="Group 5744" transform="translate(0)">
                    <g id="Group_5742" data-name="Group 5742">
                      <g id="Rectangle_1883" data-name="Rectangle 1883" fill="#fff" stroke="#fff" stroke-width="0.5">
                        <rect width="24" height="24" stroke="none"/>
                        <rect x="0.25" y="0.25" width="23.5" height="23.5" fill="none"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g id="Group_6275" data-name="Group 6275" transform="translate(1)">
                <g id="Group_6264" data-name="Group 6264">
                  <g id="noun-version-3574475-FF9C34">
                    <path id="Path_6511" data-name="Path 6511" d="M598.706,292.719a.055.055,0,0,1-.038.082l-.583.07,2.473,2.265.789-2.685-.6.108a.183.183,0,0,1-.192-.089c-.388-.675-2.563-4.041-5.76-.692a2.92,2.92,0,0,1,3.909.94" transform="translate(-583.78 -290.319)" fill="#06425c"/>
                    <path id="Path_6512" data-name="Path 6512" d="M504.856,439.56h-8.65a2.871,2.871,0,0,0-2.867,2.868v12.5a2.871,2.871,0,0,0,2.867,2.867h8.649a2.87,2.87,0,0,0,2.867-2.867v-12.5a2.87,2.87,0,0,0-2.867-2.868m1.96,15.372a1.962,1.962,0,0,1-1.96,1.96h-8.65a1.962,1.962,0,0,1-1.96-1.96v-12.5a1.963,1.963,0,0,1,1.96-1.96h8.649a1.962,1.962,0,0,1,1.96,1.96v12.5Z" transform="translate(-486.238 -433.799)" fill="#06425c"/>
                    <path id="Path_6513" data-name="Path 6513" d="M310.31,362.119v-12.5a1.963,1.963,0,0,1,1.96-1.96h8.649a1.963,1.963,0,0,1,1.96,1.96v.235h.907v-.235a2.871,2.871,0,0,0-2.867-2.868H312.27a2.871,2.871,0,0,0-2.867,2.868v12.5a2.87,2.87,0,0,0,2.867,2.867h3.855v-.907H312.27a1.962,1.962,0,0,1-1.96-1.96" transform="translate(-309.402 -344.569)" fill="#06425c"/>
                    <path id="Path_6514" data-name="Path 6514" d="M385.32,453.3v.562h4.162a3.036,3.036,0,0,1,.4-.562Z" transform="translate(-382.389 -447.008)" fill="#06425c"/>
                    <path id="Path_6515" data-name="Path 6515" d="M385.32,502.826h3.792v-.444c0-.04,0-.079.006-.119h-3.8Z" transform="translate(-382.389 -494.082)" fill="#06425c"/>
                    <path id="Path_6516" data-name="Path 6516" d="M385.32,551.23h3.792v.562H385.32Z" transform="translate(-382.389 -541.158)" fill="#06425c"/>
                    <path id="Path_6517" data-name="Path 6517" d="M385.32,600.19h3.792v.562H385.32Z" transform="translate(-382.389 -588.228)" fill="#06425c"/>
                    <path id="Path_6518" data-name="Path 6518" d="M385.32,649.16h3.792v.562H385.32Z" transform="translate(-382.389 -635.308)" fill="#06425c"/>
                    <path id="Path_6519" data-name="Path 6519" d="M385.32,698.12h3.792v.562H385.32Z" transform="translate(-382.389 -682.378)" fill="#06425c"/>
                    <path id="Path_6520" data-name="Path 6520" d="M573.18,546.9h8.149v.562H573.18Z" transform="translate(-562.997 -536.995)" fill="#06425c"/>
                    <path id="Path_6521" data-name="Path 6521" d="M573.18,595.87h8.149v.562H573.18Z" transform="translate(-562.997 -584.075)" fill="#06425c"/>
                    <path id="Path_6522" data-name="Path 6522" d="M573.18,644.83h8.149v.562H573.18Z" transform="translate(-562.997 -631.145)" fill="#06425c"/>
                    <path id="Path_6523" data-name="Path 6523" d="M573.18,693.79h8.149v.562H573.18Z" transform="translate(-562.997 -678.215)" fill="#06425c"/>
                    <path id="Path_6524" data-name="Path 6524" d="M573.18,742.75h8.149v.562H573.18Z" transform="translate(-562.997 -725.285)" fill="#06425c"/>
                    <path id="Path_6525" data-name="Path 6525" d="M573.18,791.72h8.149v.563H573.18Z" transform="translate(-562.997 -772.365)" fill="#06425c"/>
                  </g>
                </g>
              </g>
            </svg> <span>Application Version : 2.1</span>
        </div>

      </div>
    </div>
  );
}

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  turnDarker: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  leftSidebar: PropTypes.bool.isRequired,
  dataMenu: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  openMenuStatus: PropTypes.func.isRequired,
  closeMenuStatus: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  isLogin: PropTypes.bool
};

SidebarContent.defaultProps = {
  turnDarker: false,
  toggleDrawerOpen: () => {},
  loadTransition: () => {},
  anchorEl: null,
  isLogin: true,
};

export default withStyles(styles)(SidebarContent);
