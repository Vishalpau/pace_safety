import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import TableContainer from '@material-ui/core/TableContainer';
import Pagination from '@material-ui/lab/Pagination';
import moment from "moment";
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import "../../../styles/custom/customheader.css";
import api from "../../../utils/axios";
// import ObservationSearchSection from './ObservationSearchSection';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

import preplanning from 'dan-images/preplanning.png';
import progress from 'dan-images/progress.png';
import completed from 'dan-images/completed.png';

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "flex-end"
  },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    // border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: '4px',
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
    // vertical padding + font size from searchIcon
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
  pLTen : {
    marginLeft: '5px',
  },
  mTtop20 : {
    marginTop: '20px',
  },
  marginTopBottom : {
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
  backgroundColor: '#517b8d',
  color: '#ffffff',
  minWidth: '100px',
  marginRight: '6px',
  maxHeight: '40px',
  minHeight: '40px',
  opacity: '10',
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
buttonsNTwo: {
  borderRadius: '5px 5px 5px 5px',
  backgroundColor: '#517b8d',
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
pR0: {
  paddingRight: '0px',
},
},
floatE: {
  textAlign: 'center',
  padding: '24px 0px !important',
},
mR10: {
  marginRight: '10px',
 '& img:hover': {
   borderRadius: '50%',
   boxShadow: '0px 0px 2px 2px #f47607',
 },
},
sepHeight: {
  borderLeft: '1px solid #cccccc',
  height: '68px',
},
sepHeightTen: {
  borderLeft: '1px solid #cccccc',
  height: '10px',
  verticalAlign:'middle',
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
pLtenPRten: {margin: '0px 10px 0px 10px',},
buttonsNewDays: {
  padding: '6px 5px 5px 6px', 
  margin: '0px 10px',
  minWidth: '38px',
  backgroundColor: '#ffffff',
  color: '#23343e',
  borderRadius: '0px',
  fontFamily: 'Montserrat-Medium',
},
WhiteBack: {
  backgroundColor: '#ffffff',
  padding: '13px 10px 5px 10px',
},
minWd55: {
  minWidth: '55px !important',
},
navTabBack: {
  backgroundColor: 'transparent',
  marginTop: '13px',
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
    borderRadius: '5px 5px 5px 5px',
    color: '#ffffff',
    minWidth: '100px',
    marginRight: '6px',
    maxHeight: '40px',
    minHeight: '40px',
    marginLeft: '5px',
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
  },
  '& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
    marginBottom: '3px',
    marginRight: '5px',
  },
},
Lheight: {
  lineHeight: '65px',
  float: 'right',
  marginRight: '15px',
},
pLThirty: {
  paddingLeft: '30px',
  color: '#23343e',
  fontWeight: '600',
  '& svg:not(:root)': {
    overflow: 'hidden',
    marginRight: '5px',
},
iconSize: {height: '40px'},
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
statusIconBox: {
  textAlign: 'center',
  padding: '24px 0px !important',
  ['@media (max-width:800px)']: { 
    padding: '0px 0px 25px 0px !important',
  },
  ['@media (max-width:480px)']: { 
    padding: '12px 0px 25px 16px !important',
    textAlign: 'left',
  },
},
  filterIcon: {
    color: theme.palette.primary.dark,
    fontSize: '1.8rem',
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
    fontSize: '1rem',
  },
  chipAction: {
    textAlign: 'right',
  },
  dataAction: {
    marginRight: theme.spacing(1),
  },
  actionMargin: {
    marginLeft: '2.5rem',
    lineHeight: '6rem'
  },
  marginLeft: {
    marginLeft: '2px',
    fontSize: '14px'
  },
  mLeft: {
    marginLeft: '2px',
  },
  mLeftfont: {
    marginLeft: '2px',
    fontSize: '14px',
    textDecoration: 'underline',
    color: 'rgba(0, 0, 0, 0.87) !important',
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ObservationsList(props) {
  const [incidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);
  // const [observation , setObservation] = useState("My Observation");

  // const [searchIncident, setSeacrhIncident] = useState("")
  const [status, setStatus] = useState('')
  const [obs , setObs] = useState("My Observation")

  const handleButtonChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 0){
      setObs("My Observation")
      fetchInitialiObservation("My Observation")
      setIsLoading(false)
    }else if(newValue === 1){
      setObs("Big Picture")
      fetchInitialiObservation("Big Picture")
      setIsLoading(false)
      setStatus('')
    }
  };
  const handleSearch = (e) => {
    setSeacrhIncident(e.target.value);
  };

  const handelView = (e) => {
    setListToggle(false);
  };
  const handelViewTabel = (e) => {
    setListToggle(true);
  };
  const [page, setPage] = useState(1)


  const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  //   Data for the table view
  const columns = ['Number', 'Type', 'Location', 'Reported on', 'Reported by'];


  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
    search: false,
    onSearchChange: searchText => {
      if (searchText != null) {
        setSeacrhIncident(searchText);

      } else {
        setSeacrhIncident("");

      }
    },
    download: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: false,
    selectableRowsOnClick: false,
    viewColumns: false,
    selectableRows: false,
    rowsPerPage: 10,
    page: 0,
    pagination: false,
  };




  const [allInitialData, setAllInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchIncident, setSeacrhIncident] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0)
  const [data, setData] = useState([])
  const [totalData, setTotalData] = useState(0);
  const history = useHistory();

  const fetchInitialiObservation = async (observation) => {
    await setPage(1)
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
    const createdBy = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).id
      : null;
    let struct = "";
    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    // let observation  = observation === undefined ? "My Observation" : "";
    if(observation === "My Observation" || observation === undefined){
    const res = await api.get(`api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}`);
    if (res.status === 200) {
      const result = res.data.data.results.results
      await setAllInitialData(result)
      let pageCount = Math.ceil(res.data.data.results.count / 25)
      await setPageData(res.data.data.results.count / 25)
      await setTotalData(res.data.data.results.count)
      await setPageCount(pageCount)
      await handelTableView(result)

      await setIsLoading(true)
    }
  }else{
      const res = await api.get(`api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`);
    if (res.status === 200) {
      const result = res.data.data.results.results
      await setAllInitialData(result)
      let pageCount = Math.ceil(res.data.data.results.count / 25)
      await setPageData(res.data.data.results.count / 25)
      await setTotalData(res.data.data.results.count)
      await setPageCount(pageCount)
      await handelTableView(result)

      await setIsLoading(true)
    }
  }
  };


  const handleChange = async (event, value) => {
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
   const createdBy = JSON.parse(localStorage.getItem('userDetails')) !== null
        ? JSON.parse(localStorage.getItem('userDetails')).id
        : null;
    let struct = "";

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    if(obs === "My Observation"){
    const res = await api.get(`api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&page=${value}`);
    await setAllInitialData(res.data.data.results.results);
    await handelTableView(res.data.data.results.results)
    await setPage(value)
    }else{
      const res = await api.get(`api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&page=${value}`);
    await setAllInitialData(res.data.data.results.results);
    await handelTableView(res.data.data.results.results)
    await setPage(value)
    }
  };

  const handelTableView = async (result) => {
    const temp = []
    result.map((value) => {
      temp.push([
        value.observationNumber,
        value.observationType,
        value.location,
        moment(value.createdAt).format(
          "Do MMMM YYYY, h:mm:ss a"
        ),
        value.reportedByName,
      ])
    })
    await setData(temp)
  }
  const handleSummaryPush = async (index) => {
    const id = allInitialData[index].id;
    localStorage.setItem("fkobservationId", id);
    if (allInitialData[index].isCorrectiveActionTaken !== null) {
      localStorage.setItem("action", "Done");
    } else {
      localStorage.removeItem("action");
    }
    history.push(`/app/observation/details/${id}`);
  };

  const classes = useStyles();
  useEffect(() => {
    fetchInitialiObservation();
    // handleProjectList();
  }, [props.projectName.breakDown, searchIncident]);

  return (
    <>
      <Box>
          {/* <ObservationSearchSection/> */}
          <Grid item md={12} className={classes.AppBarHeader}>
		  <Grid container spacing={3}>
			
			<Grid item md={7} sm={12} xs={12}>
				<AppBar position="static" className={classes.navTabBack}>
				  <div className={classes.floatL}>
					<Tabs className={classes.minwdTab} value={value} onChange={handleButtonChange} aria-label="Tabs" indicatorColor="none">
					  <Tab label="My Observations" {...a11yProps(0)} />
					  {/* <Tab label="Team's Observations" {...a11yProps(1)} /> */}
					  <Tab label="Big Picture" {...a11yProps(2)} />
					{/* <Tab icon={<StarsIcon className={classes.buckmarkIcon} />} {...a11yProps(3)} className={classes.minWd55} /> */}
					</Tabs>
				  </div>  
			  </AppBar>
			</Grid>
		<Grid item md={3} sm={12} xs={12} className={classes.pR0}>
		  <Paper elevation={1} className={classes.search}>
        <div className={classes.searchIcon}>
        <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => handleSearch(e)}

        />
      </Paper> 
		</Grid>

      {/* <Grid item md={2} sm={12} xs={12} className={classes.statusIconBox}>
        <span className={classes.mR10}>
          <img src={preplanning} onClick={(e) => setStatus("Open")} selected={true} />
          <img src={progress} className={classes.pLtenPRten} onClick={(e) => setStatus("Planned")} />
          <img src={completed} onClick={(e) => setStatus("Completed")} />
        </span>
      </Grid> */}

			
		  </Grid>
	  </Grid>
          <TableContainer component={Paper}>
          
    {isLoading ? <>

            <Grid component={Paper}>
            
              <MUIDataTable
                data={Object.entries(allInitialData).map((item) => [
                  item[1]["observationNumber"],
                  item[1]["observationType"],
                  item[1]["location"],
                  moment(item[1]["createdAt"]).format(
                    "Do MMMM YYYY, h:mm:ss a"
                  ),
                  item[1]["username"],
                ])}
                // title="Observations List"
                className="dataTableSectionDesign"
                columns={columns}
                options={options}
              />
            </Grid>
            <div className={classes.pagination}>
            {totalData != 0 ? Number.isInteger(pageData) !== true ? totalData < 25 * page ? `${page * 25 - 24} - ${totalData} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : null}
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </div>
            </> : <h1>Loading...</h1>}

          </TableContainer>


          
      </Box>
    </>
  );
}

// export default ObservationsList;
const mapStateToProps = state => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state

  }
}

export default connect(mapStateToProps, null)(ObservationsList);