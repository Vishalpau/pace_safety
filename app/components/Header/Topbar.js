import { AppBar, Hidden, IconButton, Toolbar, Tooltip, Divider } from '@material-ui/core';
//import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
// import LogoImage from '../../../../../../public/LoginImg/logo.png';
// import Ellipse from '../../../../../../public/LoginImg/ellipse.png';
// import productIcon from '../../../../../../public/LoginImg/productIcon.svg';
// import questionCircle from '../../../../../../public/LoginImg/questionCircle.svg';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';
// import { getInitials } from '../../../../../helpers';
import { connect } from "react-redux";
import { Fragment } from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Drawer from '@material-ui/core/Drawer';
import api from '../../utils/axios';
import { ACCOUNT_API_URL, SELF_API } from '../../utils/constants';

//import typography from 'src/js/theme/typography';
/*
const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
}))(Badge); */

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1),
    },
    customHeaderColor: {
        backgroundColor: '#ffffff',
        webkitBoxShadow: '0px 4px 10px -6px rgba(0,0,0,0.75)',
        mozBoxShadow: '0px 4px 10px -6px rgba(0,0,0,0.75)',
        boxShadow: '0px 4px 10px -6px rgba(0,0,0,0.75)',
        '& .MuiAvatar-img': {
            width: 'auto',
            height: 'auto',
        },
        '& .MuiToolbar-root': {
            [theme.breakpoints.down("md")]: {
                paddingTop: '5px',
                paddingBottom: '5px',
            },
        },
    },
    toglIconStyl: {
        paddingRight: '0px',
        '& MuiIconButton-label MuiSvgIcon-root': {
            color: '#16384F',
        },
    },
    logoBoxStyle: {
        width: '55px',
        height: '55px',
        position: 'relative',
        borderRadius: '100px',
        marginBottom: '0px',
        backgroundColor: '#16384F',
        float: 'left',
    },
    logoImg: {
        maxWidth: '100%',
        top: 22,
        display: 'block',
        position: 'absolute',
    },
    logoBoxHeader: {
        '& span': {
            float: 'left',
            lineHeight: '55px',
            fontSize: '30px',
            paddingLeft: '22px',
            color: '#16384F',
            fontFamily: 'Montserrat-Medium',
            [theme.breakpoints.down("sm")]: {
                fontSize: '22px',
                paddingLeft: '12px',
            },
        },
    },
    divider: {
        margin: theme.spacing(2, 0, 0)
    },
    dropwidth: {
        width: '250px',
    },
    appDrawerSection: {
        left: 'auto !important',
        right: '0px',
        height: '100%',
        transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        zIndex: '1',
        '& a:hover': {
            color: 'inherit',
        },
    },
    appDropWidth: {
        width: 350,
        height: '100%',
        overflowY: 'auto',
        flexDirection: 'column',
        top: '0px',
        '& .MuiListItem-root': {
            paddingTop: '8px',
            paddingBottom: '8px',
        },
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
            fontFamily: 'Montserrat-Medium',
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
                fontFamily: 'Montserrat-Medium',
            },
        },
    },
    profilePicImg: {
        textAlign: 'center',
        padding: '16px',
        '& h2': {
            fontSize: '24px',
            fontFamily: 'Montserrat-Medium',
            margin: '0px 0px 12px 0px',
        },
        '& h6': {
            fontFamily: 'Montserrat-Medium',
            lineHeight: '22px',
        }
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        margin: '0px auto',
    },
    profileList: {
        padding: '0px',
        '& .MuiMenuItem-root': {
            paddingTop: '15px',
            paddingBottom: '15px',
            backgroundColor: '#f2f2f2',
            borderBottom: '1px solid #fdfdfd',
            fontSize: '14px',
            fontFamily: 'Montserrat-Medium',
            paddingLeft: '25px',
            paddingRight: '25px',
        },
    },
    logoutStylBtn: {
        '& div': {
            backgroundColor: '#f28705',
            color: '#ffffff',
            padding: '5px 20px',
            borderRadius: '50px',
        }

    },
    topHeaderMenuIcon: {
        '& svg': {
            fontSize: '47px',
            color: '#ffffff',
        }
    },
    topHeaderMenuHelpIcon: {
        '& svg': {
            fontSize: '32px',
            color: '#ffffff',
        }
    },
    appListBox: {
        '& li': {
            width: '33%',
            float: 'left',
            display: 'block',
            textAlign: 'center',
            padding: '5px',
            margin: '5px 0px',
            '& .MuiListItemAvatar-root .MuiAvatar-root': {
                margin: '0px auto',
            },
            '& button': {
                padding: '0px',
                '& .MuiIconButton-label': {
                    display: 'grid',
                },
                '&:hover': {
                    backgroundColor: 'transparent',
                },
                '& .MuiListItemText-root .MuiTypography-root': {
                    color: '#06425c',
                    fontSize: '16px',
                    fontFamily: 'Montserrat-Medium',
                    lineHeight: '32px',
                },
            },
        },
    },
}));

const setStorage = () => {
    api.get(SELF_API)
        .then((res) => {
            // console.log({result:res})
            localStorage.setItem('user', res.data.data.results.data.id)
            localStorage.setItem('email', res.data.data.results.data.email)
            localStorage.setItem('name', res.data.data.results.data.name)
            localStorage.setItem('avatar', res.data.data.results.data.avatar)
            // setAvatar(res.data.data.results.data.avatar)
        }).catch((err) => {
            console.log(err)

        })
}

const Topbar = props => {
    //console.log({reducerprops:props})
    const [avatar, setAvatar] = useState([]);
    const [name, setName] = useState("");
    const [subscriptions, setSubscriptions] = useState([]);
    const [user, setUser] = useState([]);
    const [applications, setApplications] = useState([]);
    const [codes, setCodes] = useState([]);
    const [apps, setApps] = useState([]);

    // toggleDrawer = (side, open) => () => {
    // 	setState({
    // 	  [side]: open,
    // 	});
    //   };


    // setStorage()
    React.useEffect(() => {
        getSubscriptions()
        getSubscribedApps()
    }, [codes])

    const getSubscriptions = async () => {
        const companyId = localStorage.getItem('companyId')
        let subscriptionData = {}
        let data = await axios
            .get(`${ACCOUNT_API_URL}/api/v1 /applications/1/`)
            .then(function (res) {
                console.log('subscription',{ applications: res.data.data.result })
                subscriptionData = res.data.data.results;
                setSubscriptions(subscriptionData);
                return subscriptionData
            })
            .catch(function (error) {
                console.log(error);
            });

        setSubscriptions(data);
        console.log({ subscriptions2: subscriptions })

    }

    const getSubscribedApps = async () => {
        const companyId = localStorage.getItem('companyId')
        let subscriptionData = {}
        let data = await api.get(`${SELF_API}1/`).then(function (res) {
            console.log({ data: res.data.data.results.data.companies })
            subscriptionData = res.data.data.results.data.companies[0].subscriptions;
            // setSubscriptions(subscriptionData);
            return subscriptionData
        })
            .catch(function (error) {
                console.log(error);
            });

        //   setSubscriptions(data);
        setApps(data.map(app => app.appId))

        //   const apps = data.map(app=>app.appId)
        //   this.getModules(apps)

    }

    const { className, onSidebarOpen, userActions } = props;

    const classes = useStyles();

    const [notifications] = useState([]);



    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [openA, setOpena] = React.useState(false);
    const anchorRefa = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleTogglet = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleTogga = () => {
        setOpena((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const handleClosea = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpena(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }


    function ListItemLink(props) {
        return (
            <ListItem
                button
                classes={{ button: classes.menuListItem }}
                component="a"
                {...props}
            />
        );
    }



    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    console.log({ apps: apps })
    return (
        // console.log({"dcfgvhbjn":subscriptions})
        <Fragment>
            {/* <div
			// 	//className={clsx(classes.root, className)}
			// 	className={clsx(classes.customHeaderColor)}
			// > */}
            {/* <Toolbar> */}
            {/* <RouterLink to="/dashboard">
						<Typography className={classes.logoBoxHeader}><div className={classes.logoBoxStyle}><img className={classes.logoImg} src={LogoImage} title="Company" alt="Company" /></div> <span>Pace Account</span></Typography>
					</RouterLink> */}
            <div className={classes.flexGrow} />
            {/* <Hidden mdDown> */}
            <IconButton className={classes.topHeaderMenuHelpIcon} aria-label="Help">
                <HelpIcon />
            </IconButton>


            <IconButton
                className={classes.topHeaderMenuIcon}
                aria-label="Help"
                ref={anchorRef}
                aria-controls={openA ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleTogga}
            >
                <AppsIcon />
            </IconButton>


            <Drawer anchor="right" className={classes.appDrawerSection} open={openA} role={undefined} transition disablePortal>

                <div elevation={3} className={classes.appDropWidth}>
                    <ClickAwayListener onClickAway={handleClosea}>
                        <List component="nav">
                            {subscriptions.map(subscription => (
                                (subscription.modules.length > 0) ?
                                    <div>
                                        <ListItemText
                                            className={classes.appDrawerLable}
                                            primary={subscription.appName}
                                        />
                                        <Divider />
                                        <List>
                                            {subscription.modules.map((module) => (
                                                <div>

                                                    <ListItemLink disabled={!apps.includes(subscription.appId)} href={ACCOUNT_API_URL + 'api/v1/user/auth/authorize/?client_id=' + (subscription.hostings[0] != undefined ? ((subscription.hostings[0].clientId != undefined ? subscription.hostings[0].clientId : "")) : "") + '&response_type=code&targetPage=' + module.targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + localStorage.getItem('ssoProjectId')} className={classes.appDrawerLink}>
                                                        {/* {process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+subscription.hostings[0].clientId+'&response_type=code&targetPage='+module.targetPage+'&companyId='+localStorage.getItem('companyId')+'&projectId='+localStorage.getItem('ssoProjectId')} */}
                                                        <AssignmentIcon />
                                                        <ListItemText primary={module.name} />
                                                    </ListItemLink>
                                                </div>
                                            ))}
                                        </List>


                                    </div>
                                    : ""
                            )

                            )}

                            <Divider />
                        </List>


                    </ClickAwayListener>
                </div>

            </Drawer>
            <IconButton
                className={classes.topHeaderMenuIcon}
                aria-label="Profile"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {/* { ((avatar) ?
									(<Avatar alt="profile image " src={avatar} />)
									: (<Avatar className={classes.orange}>{(avatar) ? avatar : getInitials(name)}</Avatar>)

								) } */}
                {/* <Avatar className={classes.orange}>{getInitials(localStorage.getItem('name'))}</Avatar> */}

                {/* <Avatar alt="Remy Sharp" src={Ellipse} /> */}
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper className={classes.dropwidth}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <div autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <div className={classes.profilePicImg}>
                                        {/* { ((avatar) ?
									(<Avatar className={classes.large} alt="profile image " src={avatar} />)
									: (<Avatar className={classes.large}>{(avatar) ? avatar : getInitials(name)}</Avatar>)

								) } */}
                                        {/* <Avatar className={classes.large}>{getInitials(localStorage.getItem('name'))}</Avatar> */}
                                        {/* <Avatar alt="Remy Sharp" src={Ellipse} className={classes.large} /> */}
                                        <Typography variant="h2">{localStorage.getItem('name')}</Typography>
                                        <Typography variant="h6">{localStorage.getItem('email')}</Typography>
                                    </div>
                                    <Divider className={classes.divider} />
                                    <MenuList className={classes.profileList}>
                                        <RouterLink to="/UserProfile">
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        </RouterLink>

                                        <MenuItem className={classes.logoutStylBtn} onClick={() => userActions.logout()}><div>Logout</div></MenuItem>
                                    </MenuList>
                                </div>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

        </Fragment>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};



function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topbar);

// const mapStateToProps = state => {
// 	return {
// 	  user: state
// 	};
//   };
// export default connect(mapStateToProps)(Topbar);

// export default Topbar;