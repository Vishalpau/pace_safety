import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import api from "../../../utils/axios";
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import Loader from "../Loader"

const useStyles = makeStyles((theme) => ({
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
  pagination: {
    padding: "0px 0px 20px 0px",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: '10px',
  },
  dataTableSectionDesign: {
    "& th > div": {
      cursor: "pointer"
    }
  }
}));

function JhaList(props) {
  const [incidents] = useState([]);
  const [cardView, setCardView] = useState(true);
  const [tableView, setTableView] = useState(false);
  const [allJHAData, setAllJHAData] = useState([])
  const [listToggle, setListToggle] = useState(false);
  const [searchIncident, setSeacrhIncident] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0)
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState('');
  const search = props.search
  const status = props.status
  const handelView = (e) => {
    setListToggle(false);
  };
  const handelViewTabel = (e) => {
    setListToggle(true);
  };

  const [value, setValue] = React.useState(2);

  //   Data for the table view
  const columns = ['Number', 'Type', 'Stage', 'Status', 'Requested by', 'Submitted date', 'Approved date', 'Approved by'];
  const data = [
    ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
    search: false,
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
    sort: false,
  };

  const fetchAllJHAData = async () => {
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
    if (props.assessment === "My Assessments") {
      const res = await api.get(`api/v1/jhas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&jhaStatus=${status}`);

      const result = res.data.data.results.results
      await setAllJHAData(result)
      await setTotalData(res.data.data.results.count)
      await setPageData(res.data.data.results.count / 25)
      let pageCount = Math.ceil(res.data.data.results.count / 25)
      await setPageCount(pageCount)
    } else {
      const res = await api.get(`api/v1/jhas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&jhaStatus=${status}`);

      const result = res.data.data.results.results
      await setAllJHAData(result)
      await setTotalData(res.data.data.results.count)
      await setPageData(res.data.data.results.count / 25)
      let pageCount = Math.ceil(res.data.data.results.count / 25)
      await setPageCount(pageCount)
    }
    await setIsLoading(true)
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
    if (props.assessment === "My Assessments") {
      const res = await api.get(`api/v1/jhas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&jhaStatus=${status}&page=${value}`);
      await setAllJHAData(res.data.data.results.results);
      await setPage(value)
    } else {
      const res = await api.get(`api/v1/jhas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&jhaStatus=${status}&page=${value}`);
      await setAllJHAData(res.data.data.results.results);
      await setPage(value)
    }
  };

  const classes = useStyles();

  useEffect(() => {
    fetchAllJHAData()
  }, [props.projectName.breakDown, props.search, props.assessment, props.status])

  window.onclick = (e) => {
    if (e.target.innerHTML.toLowerCase() === "submitted date") {
      order === "ascDate" ? setOrder("descDate") : setOrder("ascDate");
    }
    if (e.target.innerHTML.toLowerCase() === "approved date") {
      order === "ascAppDate" ? setOrder("descAppDate") : setOrder("ascAppDate");
    }
    if (e.target.innerHTML.toLowerCase() === "approved by") {
      order === "ascAppBy" ? setOrder("descAppBy") : setOrder("ascAppBy");
    }
    if (e.target.innerHTML.toLowerCase() === "type") {
      order === "ascType" ? setOrder("descType") : setOrder("ascType");
    }
    if (e.target.innerHTML.toLowerCase() === "stage") {
      order === "ascStg" ? setOrder("descStg") : setOrder("ascStg");
    }
    if (e.target.innerHTML.toLowerCase() === "status") {
      order === "ascStts" ? setOrder("descStts") : setOrder("ascStts");
    }
    if (e.target.innerHTML.toLowerCase() === "number") {
      order === "ascNum" ? setOrder("descNum") : setOrder("ascNum");
    }
  };

  const SetDataOrder = () => {
    let newdata;
    if (order === "ascDate") {
      newdata = allJHAData.slice().sort(function (a, b) {
        return moment(a.createdAt) - moment(b.createdAt);
      });
      setAllJHAData(newdata);
    } else if (order === "descDate") {
      newdata = allJHAData.slice().sort(function (a, b) {
        return moment(b.createdAt) - moment(a.createdAt);
      });
      setAllJHAData(newdata);
    } else if (order === "ascAppDate") {
      newdata = allJHAData.slice().sort(function (a, b) {
        if (b.closedDate === "" || b.closedDate === null) return -1;
        return moment(b.closedDate) - moment(a.closedDate);
      });
      setAllJHAData(newdata);
    } else if (order === "descAppDate") {
      newdata = allJHAData.slice().sort(function (a, b) {
        if (a.closedDate === "" || a.closedDate === null) return -1;
        return moment(b.closedDate) - moment(a.closedDate);
      });
      setAllJHAData(newdata);
    } else if (order === "ascType") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (b.typeOfPermit === "" || b.typeOfPermit === null) return -1;
        if (a.typeOfPermit < b.typeOfPermit) return -1;
        if (a.typeOfPermit > b.typeOfPermit) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    } else if (order === "descType") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (a.typeOfPermit === "" || a.typeOfPermit === null) return -1;
        if (a.typeOfPermit > b.typeOfPermit) return -1;
        if (a.typeOfPermit < b.typeOfPermit) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    } else if (order === "ascAppBy") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (b.closedByName === "" || b.closedByName === null) return -1;
        if (a.closedByName < b.closedByName) return -1;
        if (a.closedByName > b.closedByName) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    } else if (order === "descAppBy") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (a.closedByName === "" || a.closedByName === null) return -1;
        if (a.closedByName > b.closedByName) return -1;
        if (a.closedByName < b.closedByName) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    } else if (order === "ascNum") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (a.jhaNumber < b.jhaNumber) return -1;
        if (a.jhaNumber > b.jhaNumber) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    } else if (order === "descNum") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (a.jhaNumber > b.jhaNumber) return -1;
        if (a.jhaNumber < b.jhaNumber) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    } else if (order === "ascStg") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (a.jhaStage < b.jhaStage) return -1;
        if (a.jhaStage > b.jhaStage) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    } else if (order === "descStg") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (a.jhaStage > b.jhaStage) return -1;
        if (a.jhaStage < b.jhaStage) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    } else if (order === "ascStts") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (a.jhaStatus < b.jhaStatus) return -1;
        if (a.jhaStatus > b.jhaStatus) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    } else if (order === "descStts") {
      newdata = allJHAData.slice().sort((a, b) => {
        if (a.jhaStatus > b.jhaStatus) return -1;
        if (a.jhaStatus < b.jhaStatus) return 1;
        return 0;
      });
      setAllJHAData(newdata);
    }
  };

  useEffect(() => {
    console.log(order, "order");
    SetDataOrder();
  }, [order]);

  return (
    <>
      <Box>
        {isLoading ? <>
          <TableContainer component={Paper}>
            <Grid component={Paper}>
              <MUIDataTable
                //title="Observations List"
                className={`${classes.dataTableSectionDesign} dataTableSectionDesign`}
                data={Object.entries(allJHAData).map((item) => [
                  item[1]["jhaNumber"],
                  item[1]["typeOfPermit"],
                  item[1]["jhaStage"],
                  item[1]["jhaStatus"],
                  item[1]['createdByName'],
                  moment(item[1]["createdAt"]).format(
                    "Do MMMM YYYY"
                  ),


                  item[1]["closedDate"] !== null ? moment(item[1]["closedDate"]).format(
                    "Do MMMM YYYY"
                  ) : "-", item[1]["closedByName"],
                ])}
                columns={columns}
                options={options}
              //className="classes.dataTableNew"
              />
            </Grid>
          </TableContainer>
          <div className={classes.pagination}>
            {totalData != 0 ? Number.isInteger(pageData) !== true ? totalData < 25 * page ? `${page * 25 - 24} - ${totalData} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : null}
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </div></> : <Loader />}
      </Box>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state,
  };
};

export default connect(
  mapStateToProps,
  null
)(JhaList);

