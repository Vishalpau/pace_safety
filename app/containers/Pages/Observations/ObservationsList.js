import React, { useState, useEffect } from "react";
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import Share from '@material-ui/icons/Share';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Incidents from 'dan-styles/IncidentsList.scss';
import ViewColumnOutlinedIcon from '@material-ui/icons/ViewColumnOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import MUIDataTable from 'mui-datatables';
import ViewWeekOutlinedIcon from '@material-ui/icons/ViewWeekOutlined';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import api from "../../../utils/axios";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import Pagination from '@material-ui/lab/Pagination';
import "../../../styles/custom/customheader.css";

const useStyles = makeStyles((theme) => ({
  pagination:{
    padding:"1rem 0",
    display:"flex",
    justifyContent:"flex-end"
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
    // backgroundColor: theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
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

function ObservationsList(props) {
  const [incidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);

  const handelView = (e) => {
    setListToggle(false);
  };
  const handelViewTabel = (e) => {
    setListToggle(true);
  };

  const [value, setValue] = React.useState(2);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  
  //   Data for the table view
  const columns = ['Number', 'Type', 'Date submitted', 'Reported on', 'Reported by'];

  const data = [
    ['OB-125-256-251', 'Observation', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['OB-125-256-251', 'Observation', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
	['OB-125-256-251', 'Observation', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
	['OB-125-256-251', 'Observation', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
	['OB-125-256-251', 'Observation', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
	['OB-125-256-251', 'Observation', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
	['OB-125-256-251', 'Observation', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
    search: true,
    download: true,
    viewColumns: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: false,
    selectableRowsOnClick: false,
    viewColumns: false,
    selectableRows: false,
    rowsPerPage: 10,
    page: 0,
    pagination : false,
  };


  const [allInitialData, setAllInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchIncident, setSeacrhIncident] = useState("");
  const [pageCount, setPageCount] = useState(0);

const fetchInitialiObservation = async () => {
  const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
  const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
    .projectName.projectId;
 const selectBreakdown = props.projectName.breakDown.length>0? props.projectName.breakDown
  :JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
let struct = "";
for (const i in selectBreakdown) {
  struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
}
const fkProjectStructureIds = struct.slice(0, -1);

  const res = await api.get(`api/v1/observations/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`);
  const result = res.data.data.results.results
  await setAllInitialData(result)
  let pageCount  = Math.ceil(res.data.data.results.count/25)
  await setPageCount(pageCount)

  await setIsLoading(true)
};
// const handleSearch = (e) => {
//   // console.log(e.target.value)
//   setSeacrhIncident(e.target.value);
//   // history.push(`/app/observationsearch/#{search-${e.target.value}}`)
// };

const handleChange = async(event, value) => {
  const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
  const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
    .projectName.projectId;
 const selectBreakdown = props.projectName.breakDown.length>0? props.projectName.breakDown
  :JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
let struct = "";

for (const i in selectBreakdown) {
  struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
}
const fkProjectStructureIds = struct.slice(0, -1);
const res = await api.get(`api/v1/observations/?fkCompanyId=${fkCompanyId}&fkProjectId=${fkProjectId}&fkProjectStructureIds=${fkProjectStructureIds}&page=${value}`);
  await setAllInitialData(res.data.data.results.results);
};
console.log(allInitialData)
  const classes = useStyles();
  useEffect(() => {
    fetchInitialiObservation();
    // handleProjectList();
  }, [props.projectName]);

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Grid component={Paper}>
          <MUIDataTable
                data={Object.entries(allInitialData).filter(
                      (item) => {return (
                         
                        item[1]["observationDetails"]
                          .toLowerCase()
                          .includes(searchIncident.toLowerCase()) ||
                          item[1]["observationNumber"].toLowerCase().includes(
                            searchIncident.toLowerCase()
                          
                        )
                      )}
                        
                    ).map((item) => [
                  item[1]["observationNumber"],
                  item[1]["observationType"],
                  item[1]["location"],
                  moment(item[1]["createdAt"]).format(
                    "Do MMMM YYYY, h:mm:ss a"
                  ),
                  item[1]["reportedByName"],
                ])}
                title="Observations List"

                columns={columns}
                options={options}
              />
              </Grid>
            </TableContainer>
            <div className={classes.pagination}>
      <Pagination count={pageCount} onChange={handleChange}/>
    </div>
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

export default connect(mapStateToProps,null)(ObservationsList);