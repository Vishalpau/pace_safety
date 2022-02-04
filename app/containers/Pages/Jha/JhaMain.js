import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ReorderIcon from '@material-ui/icons/Reorder';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import classNames from "classnames";
import jhaLogoSymbol from 'dan-images/jhaLogoSymbol.png';
import PropTypes from 'prop-types';
import React , { useEffect } from 'react';
import { useHistory } from 'react-router';
import JhaSearchSection from './JhaSearchSection';
import JhaSearchSectionKanban from './JhaSearchSectionKanban';
import JhaSearchSectionList from './JhaSearchSectionList';
import JhaSearchSectionTrend from './JhaSearchSectionTrend';
import allPickListDataValue from "../../../utils/Picklist/allPickList"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  navTabBack: {
    backgroundColor: 'transparent',
    color: 'black',
    '& .MuiTab-root': {
      minWidth: '80px',
      minHeight: '40px',
      paddingLeft: '0px',
    },
    '& .MuiTab-wrapper': {
      display: 'inline',
      textAlign: 'left',
      fontWeight: '600',
      '&:hover': {
        color: '#f47607 !important',
      },
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      color: '#f47607',
    },
    '& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
      marginBottom: '3px',
      marginRight: '5px',
    },
  },
  pLtenPRten: { padding: '0px 10px 0px 10px', },
  // pLTen: {
  //   marginRight: '5px',
  // },
  mTtop20: {
    marginTop: '20px',
  },
  attachImg: {
    float: 'left',
    paddingRight: '10px',
  },
  headignLineHeight: {
    lineHeight: '40px',
  },
  listViewTab: {
    ['@media (max-width:480px)']: {
      padding: '12px 12px 0px 12px !important',
    },
  },
  iplnGisDSection: {
    ['@media (max-width:480px)']: {
      padding: '0px 12px 12px 12px !important',
    },
  },
  Lheight: {
    lineHeight: '65px',
    textAlign: 'right',
    ['@media (max-width:480px)']: {
      padding: '0px 0px 20px 0px !important',
      lineHeight: '0px',
      textAlign: 'left',
    },
    '& .MuiButton-sizeSmall': {
      padding: '7px 12px',
      borderRadius: '5px',
      backgroundColor: '#517b8d',
      marginLeft: '1px',
      marginTop: '-8px',
      '&:hover': {
        backgroundColor: '#f47607',
      },
      ['@media (max-width:480px)']: {
        fontSize: '11px',
      },
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
  },
  borderTop: {
    marginTop: '5px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    '& .MuiTypography-h5': {
      fontSize: '1.5rem !important',
      fontFamily: 'Xolonium',
      fontWeight: '400',
      lineHeight: '1.8',
      color: '#23343e',
    },
    textCenter: {
      textAlign: 'right',
      verticalAlign: 'middle',
      margin: '20px 16px 12px 16px!important',
      float: 'right',
    },
  },
  floatRTop10: {
    float: 'right',
    marginTop: '10px',
  },
  floatL: {
    float: 'left',
  },
  floatLTabs: {
    float: 'left',
    paddingTop: '10px',
  },
  activeTab: {
    color: 'orange',
  },
  buttonsNew: {
    borderRadius: '5px',
    backgroundColor: '#06425c',
    padding: '7px 10px 7px 10px',
    float: 'right',
    ['@media (max-width:800px)']: {
      marginTop: '0px',
    },
  },
  pLFiveHt40: {
    ['@media (max-width:800px)']: {
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
    },
  },
  paddLRzero: {
    padding: '0px 0px 24px 0px',
    '& .MuiBox-root': {
      padding: '0px',
    },
    pL0: {
      paddingLeft: '0px !important',
    },
    ptotop20: {
      paddingTop: '20px',
    },
    listTabColor: {
      color: '#06425c !important',
    },
    buttonsNewChild: {
      borderRadius: '5px 5px 5px 5px !important',
      backgroundColor: '#517b8d',
      color: '#ffffff',
      maxHeight: '40px',
      minHeight: '40px',
      opacity: '10',
    },
    buttonsNTwo: {
      borderRadius: '5px 5px 5px 5px !important',
      backgroundColor: '#517b8d',
      color: '#ffffff',
      maxHeight: '40px',
      minHeight: '40px',
      opacity: '10',
      '&:hover': {
        backgroundColor: '#f47607',
      }
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
      textAlign: 'right',
    },
  },
}));

export default function JhaMain() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewJhaPush = async () => {
    localStorage.removeItem("fkJHAId")
    localStorage.removeItem('JSAAssessments')
    localStorage.removeItem('JSAApproval')
    localStorage.removeItem('JSAlessonsLearned')
    history.push("/app/pages/jha/assessments/Job-hazards");
  };

  useEffect(() => {
    allPickListDataValue()
  }, [])

  return (
    <div className={classes.root}>
      <Grid item sm={12} xs={12} className={classes.borderTop}>
        <Grid container spacing={3}>
          <Grid item md={7} sm={6} xs={12} className={classes.pLFiveHt40}>
            <img src={jhaLogoSymbol} className={classes.attachImg} alt="decoration" />
            <Typography variant="h5"> Job Safety Assessments</Typography>
          </Grid>
          <Grid item md={5} sm={6} xs={12}>
            <Button size="medium" variant="contained" className={classNames(classes.buttonsNew, classes.floatR)} color="primary" onClick={(e) => handleNewJhaPush(e)}>
              <AddIcon className={classes.floatR} /> Add new
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12} className={classes.listViewTab}>
          <AppBar position="static" className={classes.navTabBack}>
            <div className={classes.floatLTabs}>
              <Tabs className={classes.minwdTab} value={value} onChange={handleChange} aria-label="Tabs" indicatorColor="none">
                <Tab label="Card" {...a11yProps(0)} icon={<DashboardIcon className={classNames(classes.pL0)} />} />
                <Tab label="List" {...a11yProps(1)} icon={<ReorderIcon />} classNames={classes.pLTen} />
               /
              </Tabs>
            </div>
          </AppBar>
        </Grid>
        {/* <Grid item sm={6} xs={12} className={classes.iplnGisDSection}>
          <Grid className={classes.Lheight}>
            <div className={classes.floatR}>
              <span className={classes.pLTen}>
                <Button size="small" className={classes.buttonsNTwo} variant="contained">
                  <PermIdentityIcon /> GIS
                </Button>
              </span>
            </div>
          </Grid>
        </Grid> */}
      </Grid>
      <TabPanel value={value} index={0} className={classes.paddLRzero}>
        <JhaSearchSection />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.paddLRzero}>
        <JhaSearchSectionList />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.paddLRzero}>
        <JhaSearchSectionKanban />
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.paddLRzero}>
        <JhaSearchSectionTrend />
      </TabPanel>
    </div>
  );
}
