import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AddIcon from '@material-ui/icons/Add';
import ahaLogoSymbol from 'dan-images/ahaLogoSymbol.png';
import classNames from "classnames";
import Button from '@material-ui/core/Button';
import ReorderIcon from '@material-ui/icons/Reorder';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import AhaSearchSection from './AhaSearchSection';
//import ObservationsFilter from './ObservationsFilter';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import GamesOutlinedIcon from '@material-ui/icons/GamesOutlined';
import AhaKanban from './AhaKanban';
import AhaBarCharts from './AhaBarCharts';
import AhaList from './AhaList';
import preplanning from 'dan-images/preplanning.png';
import progress from 'dan-images/progress.png';
import completed from 'dan-images/completed.png';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useHistory, useParams } from 'react-router';

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
    marginRight: '10px',
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
    marginTop: '20px',
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
  activeTab: {
    color: 'orange',
  },
  buttonsNew: {
    borderRadius: '5px',
    backgroundColor: '#06425c',
    padding: '7px 10px 7px 10px',
    marginTop: '10px',
    float: 'right',
  },
  paddLRzero: {
    padding: '0px 0px 24px 0px',
    '& .MuiBox-root': {
      padding: '0px',
    },
    pL0: {
      paddingLeft: '0px !important',
    },
    pLFiveHt40: {
      paddingLeft: '15px 5px 5px 5px',
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

export default function AhaMain() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewAhaPush = async () => {
    //console.log("Ashutosh")
    localStorage.removeItem('fkAHAId')
    history.push(
      "/app/pages/aha/assessments/project-details"
    );
  };

  return (
    <div className={classes.root}>
      <Grid item sm={12} xs={12} className={classes.borderTop}>
        <Grid container spacing={3}>
          <Grid item md={7} sm={6} xs={12} className={classes.pLFiveHt40}>
            <img src={ahaLogoSymbol} className={classes.attachImg} alt="decoration" />
            <Typography variant="h5"> Area Hazard Assessments</Typography>
          </Grid>
          <Grid item md={5} sm={6} xs={12}>
            <Button size="medium" variant="contained" className={classNames(classes.buttonsNew, classes.floatR)} color="primary" onClick={(e) => handleNewAhaPush(e)}>
              <AddIcon className={classes.floatR} /> Add new
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
      <Grid item sm={6} xs={12} className={classes.listViewTab}>
        <AppBar position="static" className={classes.navTabBack}>
          <div className={classes.floatL}>
              <Tabs className={classes.minwdTab} value={value} onChange={handleChange} aria-label="Tabs" indicatorColor="none">
              <Tab label="Card" {...a11yProps(0)} icon={<DashboardIcon  className={classNames(classes.pL0)} />} />
              <Tab label="List" {...a11yProps(1)} icon={<ReorderIcon />}  classNames={classes.pLTen} />
              <Tab label="Kanban" {...a11yProps(2)} icon={<ViewWeekIcon classNames={classes.pLTen} />} />
              <Tab label="Trend" {...a11yProps(3)} icon={<EqualizerIcon classNames={classes.pLTen} />} />
            </Tabs>
          </div>  
        </AppBar>
      </Grid>
      <Grid item sm={6} xs={12} className={classes.iplnGisDSection}>
        <Grid className={classes.Lheight}>
          <div className={classes.floatR}>				
            <span className={classes.pLTen}>
              <Button size="small" className={classes.buttonsNTwo} variant="contained">
                <PermIdentityIcon /> GIS
              </Button>
            </span>
            
            {/* <span className={classes.pLTen}>
              <Button size="small" className={classes.buttonsNTwo} variant="contained">
                <DateRangeOutlinedIcon />iPlanner
              </Button>
            </span>
				
			  <span className={classes.pLTen}>
				<Button size="small" className={classes.buttonsNTwo} variant="contained">
				  <GamesOutlinedIcon /> 3D
				</Button>
				</span>*/} 
            </div>
          </Grid>
        </Grid>
      </Grid>
      <TabPanel value={value} index={0} className={classes.paddLRzero}>
        <AhaSearchSection />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.paddLRzero}>
		    <AhaList />      
      </TabPanel>
	    <TabPanel value={value} index={2} className={classes.paddLRzero}>
        <AhaKanban />
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.paddLRzero}>
        <AhaBarCharts />
      </TabPanel>
    </div>
  );
}
