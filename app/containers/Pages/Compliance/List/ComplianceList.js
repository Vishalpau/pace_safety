import React, { useState, useEffect } from "react";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import Share from "@material-ui/icons/Share";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import TableContainer from "@material-ui/core/TableContainer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
import Incidents from "dan-styles/IncidentsList.scss";
import ViewColumnOutlinedIcon from "@material-ui/icons/ViewColumnOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import InsertChartOutlinedOutlinedIcon from "@material-ui/icons/InsertChartOutlinedOutlined";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import MUIDataTable from "mui-datatables";
import ViewWeekOutlinedIcon from "@material-ui/icons/ViewWeekOutlined";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import api from "../../../../utils/axios";
import moment from "moment";
import Loader from "../../Loader";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    // border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: "4px",
  },
  leftSide: {
    flexGrow: 1,
  },
  rightSide: {
    flexGrow: 8,
    textAlign: "right",
  },
  newIncidentButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  search: {
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  filterIcon: {
    color: theme.palette.primary.dark,
    fontSize: "1.8rem",
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
    fontSize: "1rem",
  },
  chipAction: {
    textAlign: "right",
  },
  dataAction: {
    marginRight: theme.spacing(1),
  },
  actionMargin: {
    marginLeft: "2.5rem",
    lineHeight: "6rem",
  },
  marginLeft: {
    marginLeft: "2px",
    fontSize: "14px",
  },
  mLeft: {
    marginLeft: "2px",
  },
  mLeftfont: {
    marginLeft: "2px",
    fontSize: "14px",
    textDecoration: "underline",
    color: "rgba(0, 0, 0, 0.87) !important",
  },
  pagination: {
    padding: "0px 0px 20px 0px",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
}));

function Actions(props) {
  const [incidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allComplianceData, setAllComplianceData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
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
  const columns = ["Number", "Type", "Location", "Audited on", "Audited by"];

  const data = [
    ["Compliance-125-256-251", "Not found", "Delhi", "Dec 26, 2020", "Admin"],
    ["Compliance-125-256-251", "Not found", "Delhi", "Dec 26, 2020", "Admin"],
    ["Compliance-125-256-251", "Not found", "Delhi", "Dec 26, 2020", "Admin"],
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
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
  };

  const classes = useStyles();

  //method to fetch all compliance data filetrs
  const fetchAllComplianceData = async () => {
    setAllComplianceData([]);
    setTotalData(0);
    await setPage(1);
    // get all the ids (fkCompanyId,fkProjectId, selectBreakdown,fkProjectStructureIds, createdBy )
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId =
      props.projectName.projectId ||
      JSON.parse(localStorage.getItem("projectName")).projectName.projectId;
    const selectBreakdown =
      props.projectName.breakDown.length > 0
        ? props.projectName.breakDown
        : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
          ? JSON.parse(localStorage.getItem("selectBreakDown"))
          : null;
    let struct = "";
    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    const createdBy =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).id
        : null;
    // for types filter
    if (props.type === "Categories" || props.type === "All") {
      setIsLoading(true);
      if (props.compliance === "My Inspections") {
        const res = await api.get(
          `api/v1/audits/?search=${props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}`
        );
        const result = res.data.data.results.results;
        await setAllComplianceData(result);
        await setTotalData(res.data.data.results.count);
        await setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        await setPageCount(pageCount);
        setIsLoading(false);
      } else {
        const res = await api.get(
          `api/v1/audits/?search=${props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`
        );

        const result = res.data.data.results.results;
        await setAllComplianceData(result);
        await setTotalData(res.data.data.results.count);
        await setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        await setPageCount(pageCount);
        setIsLoading(false);
      }
    } else {
      if (props.compliance === "My Inspections") {
        setIsLoading(true);
        const res = await api.get(
          `api/v1/audits/?search=${props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&auditType=${props.type
          }&createdBy=${createdBy}`
        );
        const result = res.data.data.results.results;
        await setAllComplianceData(result);
        await setTotalData(res.data.data.results.count);
        await setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        await setPageCount(pageCount);
        setIsLoading(false);
      } else {
        const res = await api.get(
          `api/v1/audits/?search=${props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&auditType=${props.type
          }&projectStructureIds=${fkProjectStructureIds}`
        );

        const result = res.data.data.results.results;
        await setAllComplianceData(result);
        await setTotalData(res.data.data.results.count);
        await setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        await setPageCount(pageCount);
        setIsLoading(false);
      }
    }

  };

  //method for  all the types filters
  const handleChange = async (event, value) => {
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId =
      props.projectName.projectId ||
      JSON.parse(localStorage.getItem("projectName")).projectName.projectId;
    const selectBreakdown =
      props.projectName.breakDown.length > 0
        ? props.projectName.breakDown
        : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
          ? JSON.parse(localStorage.getItem("selectBreakDown"))
          : null;
    const createdBy =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).id
        : null;
    let struct = "";

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    if (props.type === "Categories" || props.type === "All") {
      if (props.compliance === "My Inspections") {
        const res = await api.get(
          `api/v1/audits/?search=${props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&page=${value}`
        );
        await setAllComplianceData(res.data.data.results.results);
        await setPage(value);
      } else {
        const res = await api.get(
          `api/v1/audits/?search=${props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}`
        );
        await setAllComplianceData(res.data.data.results.results);
        await setPage(value);
      }

    } else {
      if (props.compliance === "My Inspections") {
        const res = await api.get(
          `api/v1/audits/?search=${props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&auditType=${props.type
          }&createdBy=${createdBy}&page=${value}`
        );
        await setAllComplianceData(res.data.data.results.results);
        await setPage(value);
      } else {
        const res = await api.get(
          `api/v1/audits/?search=${props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&auditType=${props.type
          }&page=${value}`
        );
        await setAllComplianceData(res.data.data.results.results);
        await setPage(value);
      }
    }
  };

  useEffect(() => {
    fetchAllComplianceData();
  }, [
    props.projectName.breakDown,
    props.compliance,
    props.search,
    props.status,
    props.type,
    // props.blank
  ]);

  return (
    <>
      <Box>
        {isLoading === false ? (
          <>
            <TableContainer component={Paper}>
              <Grid component={Paper}>
                <MUIDataTable
                  //title="Compliance List"
                  data={allComplianceData.map((data) => [
                    data["auditNumber"],
                    data["auditType"],
                    data["area"] ? data["area"] : '-',
                    moment(data["createdAt"]).format("DD MMMM YYYY"),
                    data["username"] !== null ? data["username"] : "-",
                  ])}
                  columns={columns}
                  options={options}
                  className="dataTableSectionDesign"
                />
              </Grid>
            </TableContainer>
            <div className={classes.pagination}>
              {totalData != 0
                ? Number.isInteger(pageData) !== true
                  ? totalData < 25 * page
                    ? `${page * 25 - 24} - ${totalData} of ${totalData}`
                    : `${page * 25 - 24} - ${25 * page} of ${totalData}`
                  : `${page * 25 - 24} - ${25 * page} of ${totalData}`
                : null}
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
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
)(Actions);
