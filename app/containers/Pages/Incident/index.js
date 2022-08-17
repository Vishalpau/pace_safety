import React, { useEffect, useState, lazy } from "react";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AttachmentIcon from "@material-ui/icons/Attachment";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import MessageIcon from "@material-ui/icons/Message";
import SearchIcon from "@material-ui/icons/Search";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import { PapperBlock } from "dan-components";
import Fonts from "dan-styles/Fonts.scss";
import Incidents from "dan-styles/IncidentsList.scss";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import classNames from "classnames";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ReorderIcon from "@material-ui/icons/Reorder";

import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  company,
  projectName,
  tabViewMode,
} from "../../../redux/actions/initialDetails";
import api from "../../../utils/axios";
import {
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM_NEW,
  SELF_API,
  SSO_URL,
} from "../../../utils/constants";
import allPickListDataValue from "../../../utils/Picklist/allPickList";
import { checkACL } from "../../../utils/helper";
import Acl from "../../../components/Error/acl";
// import { Delete } from "@material-ui/icons";
import Delete from "../../Delete/Delete";
import DateFormat from "../../../components/Date/DateFormat";
import CardView from "../../../components/Card/Index";
import { incidentsLabels } from "../../../components/Card/CardConstants";
import Attachment from "../../Attachment/Attachment";
import { Tab, Tabs } from "@material-ui/core";

const Loader = lazy(() => import("../../Forms/Loader"));

// Styles
const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "flex-end",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    display: "flex",
    alignItems: "center",
    paddingInline: theme.spacing(1.5),
    top: "50%",
    transform: "translateY(-50%)",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "orange",
  },
  buttonsNew: {
    borderRadius: "5px",
    backgroundColor: "#06425c",
    padding: "7px 10px 7px 10px",
    marginTop: "10px",
    float: "right",
  },
  floatR: {
    float: "right",
    textAlign: "right",
  },
  borderTop: {
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    "& .MuiTypography-h5": {
      fontSize: "1.5rem",
      fontFamily: "Xolonium",
      fontWeight: "400",
      lineHeight: "1.8",
      color: "#23343e",
    },
    textCenter: {
      textAlign: "right",
      verticalAlign: "middle",
      margin: "20px 16px 12px 16px!important",
      float: "right",
    },
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
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
    marginRight: theme.spacing(1),
  },
  newIncidentIconButton: {
    color: theme.palette.primary.dark,
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
  },
  avatarHolderGrid: {
    display: "flex",
  },
  calendarIcon: {
    marginRight: "5px",
  },
  listViewTab: {
    "@media (max-width:480px)": {
      padding: "12px 12px 0px 12px !important",
    },
  },
  search: {
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "97% !important",
    margin: "10px 2px 9px 0px",
    padding: "0px 0px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "100%",
    },
    "& .MuiInputBase-root": {
      width: "100%",
    },
  },
  Lheight: {
    lineHeight: "65px",
    textAlign: "right",
    "& .MuiButton-sizeSmall": {
      padding: "7px 12px",
      borderRadius: "5px",
      backgroundColor: "#517b8d",
      marginLeft: "1px",
    },
  },
  pL0: {
    paddingLeft: "0px !important",
  },
  AppBarHeader: {
    color: "inherit",
    backgroundColor: "#ffffff",
    border: "1px solid #e4e4e4",
    padding: "0px 5px 0px 5px",
    borderRadius: "3px",
    marginBottom: "30px",
    boxShadow: "1px 1px 13px #e6e6e6",
  },
  navTabBack: {
    backgroundColor: "transparent",
    color: "black",
    "& .MuiTab-root": {
      minWidth: "80px",
      minHeight: "40px",
      paddingLeft: "0px",
    },
    "& .MuiTab-wrapper": {
      display: "inline",
      textAlign: "left",
      fontWeight: "600",
      "&:hover": {
        color: "#f47607 !important",
      },
    },
    "& .MuiTab-textColorInherit.Mui-selected": {
      color: "#f47607",
    },
    "& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child": {
      marginBottom: "3px",
      marginRight: "5px",
    },
  },
  table: {
    "& > div": {
      overflow: "auto",
    },
    "& table": {
      "& td": {
        wordBreak: "keep-all",
      },
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 60,
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },
  toolbar: {
    padding: theme.spacing(1.5),
  },
  searchPaper: {
    width: "100%",
  },
}));

const ILink = withStyles({
  root: {
    display: "inline-block",
    marginLeft: ".5rem",
    color: "rgba(0, 0, 0, .85)",
  },
})(Link);

function BlankPage(props) {
  const [incidents, setIncidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);
  const [searchIncident, setSeacrhIncident] = useState("");
  const [showIncident, setShowIncident] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [permissionListData, setPermissionListData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [checkDeletePermission, setCheckDeletePermission] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const handelView = (e) => {
    setListToggle(false);
  };

  // useEffect(() => {
  //   console.log(isLoading, "isLoading");
  // }, [isLoading]);

  useEffect(() => {
    console.log(incidents, "incidents");
  }, [incidents]);

  const handelViewTabel = (e) => {
    setListToggle(true);
  };
  const selectBreakdown =
    JSON.parse(localStorage.getItem("selectBreakDown")) !== null
      ? JSON.parse(localStorage.getItem("selectBreakDown"))
      : null;
  let struct = "";
  for (const i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }
  const fkProjectStructureIds = struct.slice(0, -1);

  const fetchData = async () => {
    setPage(1);
    // setIsLoading(true);
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
    if (fkProjectStructureIds) {
      // try {
      const res = await api.get(
        `api/v1/incidents/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`
      );
      // debugger;
      setIsLoading(false);
      setIncidents(res.data.data.results.results);
      setTotalData(res.data.data.results.count);
      setPageData(res.data.data.results.count / 25);
      let pageCount = Math.ceil(res.data.data.results.count / 25);
      setPageCount(pageCount);
      // }
      // catch (err) {
      //   console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      //   history.push("/app/pages/error")
      // }
    } else {
      const res = await api
        .get(
          `api/v1/incidents/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`
        )
        // alert('hey')
        .then(async (res) => {
          // debugger;
          setIsLoading(false);
          setIncidents(res.data.data.results.results);
          setTotalData(res.data.data.results.count);
          setPageData(res.data.data.results.count / 25);
          let pageCount = Math.ceil(res.data.data.results.count / 25);
          setPageCount(pageCount);
        });
      // .catch((err) => history.push("/app/pages/error"));
      // handleTimeOutError(res)
    }
    setIsLoading(true);
    const viewMode = {
      initialNotification: true,
      investigation: false,
      evidence: false,
      rootcauseanalysis: false,
      lessionlearn: false,
    };
    dispatch(tabViewMode(viewMode));
    // id !== undefined && history.push(`${SUMMERY_FORM["Summary"]}${id}/`);
  };

  const userDetails = async (compId, proId) => {
    console.log("welcome user details");
    try {
      if (compId) {
        let config = {
          method: "get",
          url: `${SELF_API}`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(function(response) {
            console.log(response);
            if (response.status === 200) {
              let hosting = response.data.data.results.data.companies
                .filter((company) => company.companyId == compId)[0]
                .subscriptions.filter((subs) => subs.appCode === "safety")[0]
                .hostings[0].apiDomain;

              console.log(hosting);
              let data1 = {
                method: "get",
                url: `${hosting}/api/v1/core/companies/select/${compId}/`,
                headers: HEADER_AUTH,
              };
              axios(data1).then((res) => {
                console.log(response);
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(response.data.data.results.data)
                );

                if (compId) {
                  let companies = response.data.data.results.data.companies.filter(
                    (item) => item.companyId == compId
                  );

                  let companeyData = {
                    fkCompanyId: companies[0].companyId,
                    fkCompanyName: companies[0].companyName,
                  };
                  localStorage.setItem("company", JSON.stringify(companeyData));

                  dispatch(company(companeyData));
                }
                if (proId) {
                  let companies = response.data.data.results.data.companies.filter(
                    (item) => item.companyId == compId
                  );
                  let project = companies[0].projects.filter(
                    (item) => item.projectId == proId
                  );

                  localStorage.setItem(
                    "projectName",
                    JSON.stringify(project[0])
                  );
                  dispatch(projectName(project[0]));
                }
                // fetchPermissionData();
                localStorage.removeItem("direct_loading");
              });
            }
          })
          .catch(function(error) {});
      }
    } catch (error) {}
  };

  const handlePush = async () => {
    history.push({
      pathname: INITIAL_NOTIFICATION_FORM_NEW["Incident details"],
      state: "new incident",
    });
  };

  const columns = [
    {
      name: "Incident Number",
      options: {
        filter: true,
        filterOptions: {
          fullWidth: true,
        },
      },
    },
    {
      name: "Incident reported by",
      options: {
        filter: true,
        filterOptions: {
          fullWidth: true,
        },
      },
    },
    {
      name: "Incident location",
      options: {
        filter: false,
      },
    },
    {
      name: "Incident Reported on",
      options: {
        filter: true,
        filterOptions: {
          fullWidth: true,
        },
      },
    },
  ];

  const options = {
    data: incidents,
    selectableRows: false,
    filterType: "dropdown",
    responsive: "stacked",
    rowsPerPage: 100,
    print: false,
    search: false,
    filter: false,
    viewColumns: false,
    download: false,
    paging: false,
    pagination: false,
  };

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
    let struct = "";

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    const res = await api
      .get(
        `api/v1/incidents/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}`
      )
      .then((res) => {
        setIncidents(res.data.data.results.results);
        setPage(value);
      })
      .catch((error) => {});
  };

  // const handleDelete = async (item) => {
  //   // debugger
  //   // const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
  //   // const userDetails = JSON.parse(localStorage.getItem("userDetails")).id;
  //   // const fkProjectId =
  //   //   props.projectName.projectId ||
  //   //   JSON.parse(localStorage.getItem("projectName")).projectName.projectId;
  //   // const selectBreakdown =
  //   //   props.projectName.breakDown.length > 0
  //   //     ? props.projectName.breakDown
  //   //     : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
  //   //       ? JSON.parse(localStorage.getItem("selectBreakDown"))
  //   //       : null;
  //   // let struct = "";

  //   // for (const i in selectBreakdown) {
  //   //   struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  //   // }
  //   // const fkProjectStructureIds = struct.slice(0, -1);
  //   // console.log(item);
  //   if (checkACL("safety-incident", "delete_incidents")) {
  //     const data = {
  //       fkCompanyId: fkCompanyId,
  //       fkProjectId: fkProjectId,
  //       fkProjectStructureIds: fkProjectStructureIds,
  //       // incidentStatus: 'Done',
  //       // incidentStage: '',
  //       updatedBy: userDetails,
  //       createdBy: userDetails,
  //       status: "Delete",
  //     };
  //     // const {fkCompanyId,fkProjectId,jobTitle,jobDetails} = item[1];
  //     // let data = item[1];
  //     // console.log(data);
  //     // data.status = "Delete";
  //     // delete data.attachment
  //     setIsLoading(false);
  //     const res1 = await api
  //       .put(`/api/v1/incidents/${item[1].id}/`, data)
  //       .then((response) => {
  //         console.log(response);
  //         fetchData();
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
  const createdId = JSON.parse(localStorage.getItem("userDetails")).id;
  const fkProjectId =
    props.projectName.projectId ||
    JSON.parse(localStorage.getItem("projectName")).projectName.projectId;
  const selectBreakdown1 =
    props.projectName.breakDown.length > 0
      ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
      ? JSON.parse(localStorage.getItem("selectBreakDown"))
      : null;
  let struct1 = "";

  for (const i in selectBreakdown1) {
    struct1 += `${selectBreakdown1[i].depth}${selectBreakdown1[i].id}:`;
  }
  const fkProjectStructureIds1 = struct1.slice(0, -1);

  const deleteItem = {
    fkCompanyId: fkCompanyId,
    fkProjectId: fkProjectId,
    fkProjectStructureIds: fkProjectStructureIds1,
    // incidentStatus: 'Done',
    // incidentStage: '',
    updatedBy: createdId,
    createdBy: createdId,
    status: "Delete",
  };

  const handleSearchIncident = (serchValue) => {
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
    api
      .get(
        `api/v1/incidents/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&search=${serchValue}`
      )
      .then((res) => {
        setIncidents(res.data.data.results.results);
        setTotalData(res.data.data.results.count);
        setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        setPageCount(pageCount);
      });
  };

  const handelCallBack = async () => {
    //  setIsLoading(true);
    let state = JSON.parse(localStorage.getItem("direct_loading"));
    if (state !== null) {
      await userDetails(state.comId, state.proId);
    } else {
      await fetchData();
    }
    //  setIsLoading(false);
    await allPickListDataValue();
  };

  useEffect(() => {
    handelCallBack();
    setCheckDeletePermission(checkACL("safety-incident", "delete_incidents"));
    // console.log(props.projectName);
  }, [props.projectName.breakDown, props.projectName.projectName]);

  const classes = useStyles();

  const isDesktop = useMediaQuery("(min-width:992px)");

  const handleSummaryPush = (id) => {
    history.push({
      pathname: `/incident/details/${id}/`,
      state: "change_incident",
    });
  };

  const AllCardData = ({ item, index }) => {
    const [showGrid, setShowGrid] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [value, setValue] = React.useState(2);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [hiddenn, setHiddenn] = useState(false);
    const [myUserPOpen, setMyUserPOpen] = React.useState(false);
    const [commentData, setCommentData] = useState("");

    let deleteItem = {
      fkCompanyId: item[1].fkCompanyId,
      fkProjectId: item[1].fkProjectId,
      fkProjectStructureIds: item[1].fkProjectStructureIds,
      createdBy: item[1].createdBy,
      updatedBy: JSON.parse(localStorage.getItem("userDetails")).id,
      status: "Delete",
    };

    function handleVisibilityComments() {
      setCommentsOpen(true);
      setHiddenn(!hiddenn);
      setCommentData("");
    }

    function handleAttachClose() {
      setShowGrid(false);
    }

    function handleAttachClick() {
      setShowGrid(!open);
    }

    function handleAttachOpen() {
      if (!hidden) {
        setShowGrid(true);
      }
    }

    const handleVisibility = () => {
      setShowGrid(true);
      setHidden(!hidden);
    };

    return (
      <Grid className={classes.marginTopBottom}>
        <div className="gridView">
          <CardView
            cardTitle={item[1].incidentTitle} // Card title
            avatar={
              item[1].avatar
                ? item[1].avatar
                : "https://www.businessnetworks.com/sites/default/files/default_images/default-avatar.png"
            } // Card avatar
            username={item[1].username} // Profile username
            itemId={item[1].id} // Item ID
            headerFields={[
              // Card header labels and values for each item
              {
                label: incidentsLabels.header[0],
                value: item[1].incidentNumber,
              },
              {
                label: incidentsLabels.header[1],
                value: "Initial Notification",
              },
              {
                label: incidentsLabels.header[2],
                value: DateFormat(item[1].createdAt, true),
              },
            ]}
            bodyFields={[
              // Card body labels and values for each item
              {
                label: incidentsLabels.body[0],
                value: item[1].incidentType,
              },
              {
                label: incidentsLabels.body[1],
                value: item[1].incidentLocation,
              },
              {
                label: incidentsLabels.body[2],
                value: DateFormat(item[1].incidentReportedOn, true),
              },
              {
                label: incidentsLabels.body[3],
                value: item[1].incidentReportedByName,
              },
            ]}
            // printFields={{
            //   // Print component props
            //   typeOfModule: "Observation",
            //   printUrl: `api/v1/observations/${item.id}/print/`,
            //   number: item.observationNumber,
            // }}
            // bookmarkFields={{
            //   // Bookmark component props
            //   typeOfModule: "observations",
            //   itemId: item.id,
            // }}
            // RefreshBookmarkData={fetchInitialiObservation} // Refreshing data after removing as bookmark
            deleteFields={{
              // Delete component props
              deleteUrl: `/api/v1/incidents/${item[1].id}/`,
              afterDelete: () => {
                fetchData();
              },
              axiosObj: api,
              item: deleteItem,
              loader: setIsLoading,
              loadingFlag: false,
              deleteMsg: "Are you sure you want to delete this Incident?",
              yesBtn: "Yes",
              noBtn: "No",
              dataLength: incidents.length,
            }}
            handleVisibility={() => handleVisibility()} // Show attachment box
            // handleVisibilityComments={() =>
            //   handleVisibilityComments()
            // } // Show "add comment" box
            files={item[1].attachmentCount.attachmentCount} // Attachment counts
            commentsCount={item[1].commentsCount} // Comments count
            handleSummaryPush={() => handleSummaryPush(item[1].id)} // Go to detail page function
            checkDeletePermission={checkDeletePermission} // Check delete permission
          />
          {item[1].attachmentCount.attachmentCount > 0 ? (
            <Grid
              item
              md={12}
              sm={12}
              xs={12}
              hidden={!hidden}
              onBlur={handleAttachClose}
              onClick={handleAttachClick}
              onClose={handleAttachClose}
              onFocus={handleAttachOpen}
              onMouseEnter={handleAttachOpen}
              onMouseLeave={handleAttachClose}
              open={showGrid}
              className="paddTBRemove"
            >
              <Paper elevation={1} className="cardSectionBottom">
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ margin: "0 -10px" }}
                  >
                    {item[1].attachmentCount.links.map((a) => (
                      <div
                        className="attachFileThumb"
                        style={{ width: "auto", margin: "0 10px" }}
                      >
                        <Attachment key={a} value={a} type={a} />
                      </div>
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ) : (
            ""
          )}
        </div>
      </Grid>
    );
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);
  const handleChangeTabs = (event, newValue) => {
    if (newValue === 0) {
      setListToggle(false);
    } else if (newValue === 1) {
      setListToggle(true);
    }
  };

  return (
    <Acl
      module="safety-incident"
      action="view_incidents"
      html={
        <>
          <div className={classes.root}>
            <Grid item sm={12} xs={12} className={classes.borderTop}>
              <Grid container spacing={3}>
                <Grid item sm={7} xs={12} className={classes.pLFiveHt40}>
                  <span className="customDropdownPageIcon incidentPageIcon" />
                  <Typography variant="h5"> Incidents </Typography>
                </Grid>
                <Grid item sm={5} xs={12}>
                  <Button
                    size="medium"
                    variant="contained"
                    className={classNames(classes.buttonsNew, classes.floatR)}
                    color="primary"
                    onClick={() => handlePush()}
                    style={{
                      background: checkACL("safety-incident", "add_incidents")
                        ? "#06425c"
                        : "#c0c0c0",
                      cursor: checkACL("safety-incident", "add_incidents")
                        ? "pointer"
                        : "not-allowed",
                    }}
                  >
                    <AddIcon /> Add new
                  </Button>
                  {/* )} */}
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item sm={8} xs={12} className={classes.listViewTab}>
                <AppBar position="static" className={classes.navTabBack}>
                  <div className={classes.floatL}>
                    <Tabs
                      className={classes.minwdTab}
                      // value={value}
                      onChange={handleChangeTabs}
                      aria-label="Tabs"
                      indicatorColor="none"
                    >
                      <Tab
                        label="Card"
                        {...a11yProps(0)}
                        icon={
                          <DashboardIcon className={classNames(classes.pL0)} />
                        }
                        className={`${!listToggle ? "Mui-selected" : ""}`}
                      />
                      <Tab
                        label="List"
                        {...a11yProps(1)}
                        icon={<ReorderIcon />}
                        className={`${classes.pLTen} ${
                          listToggle ? "Mui-selected" : ""
                        }`}
                      />
                    </Tabs>
                  </div>
                </AppBar>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Grid className={classes.Lheight}>
                  <div className={classes.floatR} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} className={classes.AppBarHeader}>
              <Grid container spacing={3}>
                <Grid item md={3} sm={12} xs={12} className={classes.pR0}>
                  <Paper elevation={1} className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      color="primary"
                      fullWidth
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      onChange={(e) => handleSearchIncident(e.target.value)}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </div>

          {listToggle === false ? (
            <>
              {isLoading ? (
                <>
                  <div className="gridView">
                    {Object.entries(incidents)
                      .filter((searchText) => {
                        return (
                          searchText[1]["incidentTitle"]
                            .toLowerCase()
                            .includes(searchIncident.toLowerCase()) ||
                          searchText[1]["incidentNumber"].includes(
                            searchIncident.toUpperCase()
                          )
                        );
                      })
                      .map((item, index) => (
                        <>
                          <AllCardData item={item} index={index} />
                        </>
                      ))}
                  </div>
                  {Object.keys(incidents).length === 0 && (
                    <>
                      <Card variant="outlined">
                        <CardContent>
                          <Grid container spacing={3} justify="center">
                            Sorry, no matching records found
                          </Grid>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </>
              ) : (
                <Loader />
              )}
            </>
          ) : (
            // listview end
            <>
              {isLoading ? (
                <div className="listView">
                  <MUIDataTable
                    data={Object.entries(incidents)
                      .filter((searchText) => {
                        return (
                          searchText[1]["incidentTitle"]
                            .toLowerCase()
                            .includes(searchIncident.toLowerCase()) ||
                          searchText[1]["incidentNumber"].includes(
                            searchIncident.toUpperCase()
                          )
                        );
                      })
                      .map((item) => [
                        item[1]["incidentNumber"],
                        item[1]["incidentReportedByName"],
                        item[1]["incidentLocation"],
                        moment(item[1]["incidentReportedOn"]).format(
                          "Do MMMM YYYY, h:mm:ss a"
                        ),
                        item[1]["incidentReportedByName"],
                        item[1]["id"],
                      ])}
                    columns={columns}
                    options={options}
                  />
                </div>
              ) : (
                <Loader />
              )}
            </>
          )}
          <div className={classes.pagination}>
            {totalData != 0
              ? Number.isInteger(pageData) !== true
                ? totalData < 25 * page
                  ? `${page * 25 - 24} - ${totalData} of ${totalData}`
                  : `${page * 25 - 24} - ${25 * page} of ${totalData}`
                : `${page * 25 - 24} - ${25 * page} of ${totalData}`
              : null}
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </div>
        </>
      }
    />
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
)(BlankPage);
