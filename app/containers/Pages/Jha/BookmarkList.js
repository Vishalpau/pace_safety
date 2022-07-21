import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
// import ObservationsKanban from './ObservationsKanban';
import StarsIcon from '@material-ui/icons/Stars';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import ObservationsLookAhead from './ObservationsLookAhead';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  leftSide: {
    flexGrow: 1,
  },
  rightSide: {
    flexGrow: 8,
    textAlign: 'right',
  },
  newIncidentButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  search: {
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '97% !important',
    margin: '14px 2px 9px 0px',
    padding: '0px 0px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'orange',
    fontSize: '18px',
    float: 'right',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  mLeftfont: {
    marginLeft: '2px',
    fontSize: '14px',
    textDecoration: 'underline',
    color: 'rgba(0, 0, 0, 0.87) !important',
  },
  spacerRight: {
    marginRight: '4px',
  },
  paddZero: {
    padding: '0px',
  },
  pLTen: {
    marginLeft: '5px',
  },
  mTtop20: {
    marginTop: '20px',
  },
  marginTopBottom: {
    marginBottom: '16px',
    backgroundColor: '#f3f3f3',
    padding: '16px',
    borderRadius: '8px',
  },
  searchHeaderTop: {
    border: '1px solid #f1f1f1',
    backgroundColor: '#ffffff',
    padding: '0px 16px',
    borderRadius: '5px',
    marginTop: '20px',
  },
  greyBg: {
    backgroundColor: '#f3f3f3',
  },
  AppBarHeader: {
    color: 'inherit',
    backgroundColor: '#ffffff',
    border: '1px solid #e4e4e4',
    padding: '0px 5px 0px 5px',
    borderRadius: '3px',
    marginBottom: '30px',
    boxShadow: '1px 1px 13px #e6e6e6',
  },
  buttonsNewChild: {
    borderRadius: '5px 5px 5px 5px',
    backgroundColor: '#7692a4',
    color: '#ffffff',
    minWidth: '100px',
    marginRight: '6px',
    maxHeight: '40px',
    minHeight: '40px',
    opacity: '10',
  },
  buttonsNTwo: {
    borderRadius: '5px 5px 5px 5px',
    backgroundColor: '#7692a4',
    color: '#ffffff',
    marginRight: '6px',
    maxHeight: '40px',
    minHeight: '40px',
    opacity: '10',
  },
  active: {
    backgroundColor: '#f47607',
    borderRadius: '5px 5px 5px 5px',
    color: '#ffffff',
    minWidth: '100px',
    marginRight: '6px',
    maxHeight: '40px',
    minHeight: '40px',
    marginLeft: '5px',
  },
  activeFont: {
    backgroundColor: '#f47607',
    borderRadius: '5px',
    color: '#ffffff',
    minWidth: '34px',
    padding: '4px 5px 5px 4px',
  },
  floatR: {
    float: 'right',
    marginTop: '18px',
    marginRight: '20px',
    '& .MuiButton-containedPrimary:hover': {
      backgroundColor: '#f47607',
      borderRadius: '5px',
      color: '#fff',
    },
  },
  buckmark: {
    borderRadius: '5px 5px 5px 5px',
    color: '#06425c',
    minWidth: '50px',
    marginRight: '6px',
    paddingTop: '0px',
  },
  buckmarkIcon: {
    height: '35px',
    width: '35px',
  },

  sepHeight: {
    borderLeft: '1px solid #cccccc',
    height: '68px',
  },
  sepHeightTen: {
    borderLeft: '1px solid #cccccc',
    height: '10px',
    verticalAlign: 'middle',
  },
  textCenter: {
    textAlign: 'right',
    verticalAlign: 'middle',
    padding: '20px 16px 12px 16px!important',
  },
  textLeftone: {
    textAlign: 'left',
    verticalAlign: 'middle',
    padding: '16px!important',
    minWidth: '19% !important',
  },
  pLtenPRten: { margin: '0px 10px 0px 10px' },
  buttonsNewDays: {
    padding: '6px 5px 5px 6px',
    minWidth: '38px',
    backgroundColor: '#ffffff',
    color: '#23343e',
    borderRadius: '0px',
  },
  WhiteBack: {
    backgroundColor: '#ffffff',
    padding: '13px 10px 5px 10px',
  },
  Lheight: {
    lineHeight: '65px',
    float: 'right',
    marginRight: '15px',
  },
  searchSetionBox: {
    paddingRight: '0px',
    '@media (max-width:800px)': {
      padding: '0px 12px !important',
    },
    '& .MuiPaper-root': {
      '@media (max-width:800px)': {
        margin: '0px 0px 0px 8px',
      },
    },
  },
  statusIconBox: {
    textAlign: 'center',
    padding: '24px 0px !important',
    '@media (max-width:800px)': {
      padding: '0px 0px 25px 0px !important',
    },
    '@media (max-width:480px)': {
      padding: '12px 0px 25px 16px !important',
      textAlign: 'left',
    },
  },
  mR10: {
    marginRight: '10px',
    '& img:hover': {
      borderRadius: '50%',
      boxShadow: '0px 0px 2px 2px #f47607',
    },
  },
  pLThirty: {
    paddingLeft: '30px',
    color: '#23343e',
    fontWeight: '600',
    '& svg:not(:root)': {
      overflow: 'hidden',
      marginRight: '5px',
    },

    pLTen: {
      paddingLeft: '10px',
    },
    paddLRzero: {
      padding: '0px 0px 24px 0px',
      '& .MuiBox-root': {
        padding: '0px',
      },
    },
  },
  navTabBack: {
    backgroundColor: 'transparent',
    marginTop: '13px',
    '& button': {
      '@media (max-width:480px)': {
        fontSize: '9px',
      },
    },
    '& .MuiTab-root': {
      minWidth: '80px',
      minHeight: '40px',
      paddingLeft: '0px',
    },
    '& .MuiTab-wrapper': {
      display: 'inline',
      textAlign: 'left',
      fontWeight: '600',
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      backgroundColor: '#f47607',
      color: '#ffffff',
      // borderRadius: '5px 5px 5px 5px',
      // minWidth: '100px',
      // marginRight: '6px',
      // maxHeight: '40px',
      // minHeight: '40px',
      // marginLeft: '5px',
    },
    '& .MuiTab-textColorInherit': {
      backgroundColor: '#06425c',
      borderRadius: '5px 5px 5px 5px',
      color: '#ffffff',
      minWidth: '100px',
      marginRight: '6px',
      maxHeight: '40px',
      minHeight: '40px',
      marginLeft: '5px',
      padding: '10px',
      '@media (max-width:480px)': {
        minWidth: 'auto',
        marginLeft: '2px',
        marginRight: '2px',
      },
    },
    '& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
      marginBottom: '3px',
      marginRight: '5px',
    },
  },
  minWd55: {
    minWidth: '55px !important',
  },
  hoverB: {
    '&:hover': {
      backgroundColor: '#f47607 !important',
      opacity: '0.9',
    },
  },
}));

export default function Bookmarklist() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  // let timer
  // let debounce = ( v, d) => {
  //   return function() {
  //     clearTimeout(timer)
  //     timer = setTimeout(() => setSearch(v), d)
  //   }
  // }

  // const handelSearch = e => debounce( e.target.value.toLowerCase(), 1000)()

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setAssessments('My Assessments');
    } else if (newValue === 1) {
      setAssessments('Big Picture');
    }
  };

  return (
    <div className={classes.root}>
      <h5>Welcome to Bookmarked section</h5>
      <Grid container spacing={3}>
        <Grid item md={7} sm={12} xs={12}>
          <AppBar position="static" className={classes.navTabBack}>
            <div className={classes.floatL}>
              <Tabs
                className={classes.minwdTab}
                value={value}
                onChange={handleChange}
                aria-label="Tabs"
                indicatorColor="none"
              >
                {/* <Tab label="Team's Assessments" {...a11yProps(1)} className={classes.hoverB} /> */}

                <Tab
                  icon={<StarsIcon className={classes.buckmarkIcon} />}
                  {...a11yProps(0)}
                  className={classNames(classes.hoverB, classes.minWd55)}
                />

                {/* <Tab icon={<StarsIcon className={classes.buckmarkIcon} />} {...a11yProps(3)} className={classNames(classes.hoverB, classes.minWd55)} /> */}
              </Tabs>
            </div>
          </AppBar>
        </Grid>
      </Grid>
    </div>
  );
}
