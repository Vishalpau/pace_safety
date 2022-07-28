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

const Loader = lazy(() => import("../../Forms/Loader"));

// Styles
const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "flex-end",
  },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: `1px solid rgba(0, 0, 0, .13)`,
    borderRadius: "4px",
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
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
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
    setIsLoading(true);
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

  return (
    <Acl
      module="safety-incident"
      action="view_incidents"
      html={
        <PapperBlock title="Incidents" icon="ion-md-list-box" desc="">
          <div className={classes.root}>
            <AppBar position="static" color="transparent">
              <div className={classes.toolbar}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <div className={classes.search}>
                      <Paper variant="outlined" className={classes.searchPaper}>
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
                    </div>
                  </Grid>

                  <Grid item xs={5} md={3}>
                    <div className="toggleViewButtons">
                      <Tooltip title="List View">
                        <IconButton
                          href="#table"
                          className={classes.filterIcon}
                          onClick={(e) => handelViewTabel(e)}
                        >
                          <FormatListBulleted />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Grid View">
                        <IconButton
                          href="#grid"
                          aria-label="grid"
                          className={classes.filterIcon}
                          onClick={(e) => handelView(e)}
                        >
                          <ViewAgendaIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Grid>
                  <Grid item xs={7} md={5}>
                    <Box display="flex" justifyContent="flex-end">
                      {isDesktop ? (
                        <Tooltip title="New Incident">
                          <Button
                            aria-label="New Incident"
                            onClick={() => handlePush()}
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<AddCircleIcon />}
                            className={classes.newIncidentButton}
                            disableElevation
                            style={{
                              background: checkACL(
                                "safety-incident",
                                "add_incidents"
                              )
                                ? "#06425c"
                                : "#c0c0c0",
                              cursor: checkACL(
                                "safety-incident",
                                "add_incidents"
                              )
                                ? "pointer"
                                : "not-allowed",
                            }}
                          >
                            New Incident
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip title="New Incident">
                          <IconButton
                            onClick={() => handlePush()}
                            className={classes.newIncidentIconButton}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </AppBar>
          </div>

          {listToggle == false ? (
            <>
              {isLoading == false ? (
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
                        <Card
                          variant="outlined"
                          className={Incidents.card}
                          key={index}
                        >
                          <CardContent>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Grid
                                  container
                                  spacing={3}
                                  alignItems="flex-start"
                                >
                                  <Grid item xs={12} md={10}>
                                    <Typography variant="h6">
                                      {item[1]["incidentTitle"]}
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    md={2}
                                    className={classes.adminLabel}
                                  >
                                    <Box
                                      display={isDesktop ? "flex" : null}
                                      justifyContent={
                                        isDesktop ? "flex-end" : null
                                      }
                                    >
                                      <Chip
                                        avatar={
                                          <Avatar
                                            src={
                                              item[1]["avatar"]
                                                ? item[1]["avatar"]
                                                : "/images/pp_boy.svg"
                                            }
                                          />
                                        }
                                        label={
                                          item[1]["username"]
                                            ? item[1]["username"]
                                            : "Admin"
                                        }
                                      />
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={3}>
                                    <Typography
                                      display="inline"
                                      className={Fonts.listingLabelName}
                                    >
                                      Number:
                                      <ILink
                                        onClick={(e) =>
                                          history.push({
                                            pathname: `/incident/details/${
                                              item[1].id
                                            }/`,
                                            state: "change_incident",
                                          })
                                        }
                                        variant="subtitle2"
                                        className={Fonts.listingLabelValue}
                                      >
                                        {item[1]["incidentNumber"]}
                                      </ILink>
                                    </Typography>
                                  </Grid>

                                  <Grid item xs={12} md={3}>
                                    <Chip
                                      variant="outlined"
                                      label={item[1].incidentStage}
                                      color="primary"
                                      size="small"
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={3}>
                                    <Typography
                                      display="inline"
                                      className={Fonts.listingLabelName}
                                    >
                                      <Box display="flex" alignItems="center">
                                        <CalendarTodayIcon fontSize="small" />
                                        <span className={Incidents.dateValue}>
                                          {DateFormat(
                                            item[1]["incidentOccuredOn"],
                                            true
                                          )}
                                        </span>
                                      </Box>
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              {isDesktop && (
                                <>
                                  <Grid item xs={12} lg={3}>
                                    <Typography
                                      className={Fonts.listingLabelName}
                                      gutterBottom
                                    >
                                      Incident type
                                    </Typography>
                                    <Typography
                                      className={Fonts.listingLabelValue}
                                    >
                                      {item[1]["incidentType"]}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} lg={3}>
                                    <Typography
                                      className={Fonts.listingLabelName}
                                      gutterBottom
                                    >
                                      Incident location
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      className={Fonts.listingLabelValue}
                                    >
                                      {item[1]["incidentLocation"]}
                                    </Typography>
                                  </Grid>

                                  <Grid item xs={12} lg={3}>
                                    <Typography
                                      className={Fonts.listingLabelName}
                                      gutterBottom
                                    >
                                      Reported on
                                    </Typography>

                                    <Typography
                                      variant="body1"
                                      className={Fonts.listingLabelValue}
                                    >
                                      {DateFormat(
                                        item[1]["incidentReportedOn"],
                                        true
                                      )}
                                    </Typography>
                                  </Grid>

                                  <Grid item xs={12} lg={3}>
                                    <Typography
                                      className={Fonts.listingLabelName}
                                      gutterBottom
                                    >
                                      Reported by
                                    </Typography>

                                    <Typography
                                      className={Fonts.listingLabelValue}
                                    >
                                      {item[1]["incidentReportedByName"]}
                                    </Typography>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                          </CardContent>
                          <Divider />
                          <CardActions className={Incidents.cardActions}>
                            <Grid
                              container
                              spacing={2}
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item xs={6} md={3}>
                                <Typography
                                  variant="body2"
                                  display="inline"
                                  className={Fonts.listingLabelName}
                                  // onClick={() => history.push(`/app/incidents/comments/${item[1]["id"]}/`)}
                                >
                                  <MessageIcon fontSize="small" /> Comments:
                                  {item[1]["commentsCount"]}
                                </Typography>
                              </Grid>

                              <Grid item xs={6} md={3}>
                                <Typography
                                  variant="body2"
                                  display="inline"
                                  className={Fonts.listingLabelName}
                                >
                                  <AttachmentIcon fontSize="small" />{" "}
                                  Attachments:
                                </Typography>
                                <Typography variant="body2" display="inline">
                                  {/* <ILink href="#"> */}
                                  {item[1].attachmentCount.attachmentCount}
                                  {/* </ILink> */}
                                </Typography>
                              </Grid>

                              <Grid item xs={6} md={3}>
                                {/* <Button
                            // disabled
                            size="small"
                            color="primary"
                            startIcon={<Print />}
                            className={Incidents.actionButton}
                          >
                            Print
                          </Button> */}
                                <div className={classes.floatR}>
                                  <Typography variant="body1" display="inline">
                                    {!checkDeletePermission ? (
                                      <DeleteForeverOutlinedIcon
                                        className={classes.iconteal}
                                        style={{
                                          color: "#c0c0c0",
                                          cursor: "not-allowed",
                                        }}
                                      />
                                    ) : (
                                      // <Link
                                      //   // href="#"
                                      //   className={classes.mLeftR5}
                                      // >
                                      //   <DeleteForeverOutlinedIcon
                                      //     className={classes.iconteal}
                                      //     onClick={(e) => handleDelete(item)}
                                      //   />
                                      // </Link>
                                      <Delete
                                        deleteUrl={`/api/v1/incidents/${
                                          item[1].id
                                        }/`}
                                        afterDelete={() => {
                                          fetchData();
                                        }}
                                        axiosObj={api}
                                        item={deleteItem}
                                        loader={setIsLoading}
                                        loadingFlag={false}
                                        deleteMsg="Are you sure you want to delete this Incident?"
                                        yesBtn="Yes"
                                        noBtn="No"
                                      />
                                    )}
                                  </Typography>
                                </div>
                              </Grid>
                            </Grid>
                          </CardActions>
                        </Card>
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
              {isLoading == false ? (
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
        </PapperBlock>
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
