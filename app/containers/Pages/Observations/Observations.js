import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
// import api from "../../../utils/axios";
// import api from "../../../"
import { object } from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AttachmentIcon from "@material-ui/icons/Attachment";
import InfoIcon from "@material-ui/icons/Info";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MUIDataTable from "mui-datatables";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ListIcon from "@material-ui/icons/List";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import BuildIcon from "@material-ui/icons/Build";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import api from "../../../utils/axios";
import axios from "axios";
import Pagination from '@material-ui/lab/Pagination';

// import Fonts from "dan-styles/Fonts.scss";
import Incidents from "dan-styles/IncidentsList.scss";
import { List } from "immutable";
import { useHistory, useParams } from "react-router";
import Tooltip from "@material-ui/core/Tooltip";

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  pagination:{
    padding:"1rem 0",
    display:"flex",
    justifyContent:"flex-end"
  },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: "1px solid rgba(0, 0, 0, .13)",
    borderRadius: "4px",
  },
  leftSide: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.primary.dark,
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
    paddingInline: theme.spacing(1),
    // height: "100%",
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
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
  },
  newFormButton: {
    "& svg": {
      // fontSize: '25px',
      // color: '#06425c',
    },
  },
  listingLabelName: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "0.88rem",
  },
  listingLabelValue: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "0.88rem",
    "& a": {
      paddingLeft: "5px",
      cursor: "pointer",
      color: "rgba(0, 0, 0, 0.87)",
      fontWeight: "600",
    },
  },
  cardActions: {
    padding: "1.25rem",
  },
  dateValue: {
    display: "inline-block",
    marginLeft: "0.5rem",
  },
  labelIcon: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.54)",
    verticalAlign: "text-top",
  },
}));

function Observations(props) {
  const [listToggle, setListToggle] = useState(false);
  const history = useHistory();
  const [allInitialData, setAllInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchIncident, setSeacrhIncident] = useState("");
  const [projectListData, setProjectListData] = useState([]);
  const [projectDisable, setProjectDisable] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
  ? JSON.parse(localStorage.getItem('userDetails')).name
  : null;
  const handelView = (e) => {
    setListToggle(false);
    history.push(`/app/observations`);
  };
  const handelViewTabel = (e) => {
    setListToggle(true);
    history.push(`/app/observations#table`);
  };

  const handlePush = async () => {
    history.push(
      "/app/incident-management/registration/initial-notification/incident-details/"
    );
  };

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

  const handelActionTracker = async () => {
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    let ActionToCause = {};
    const allActionTrackerData = await api_action.get("/api/v1/actions/");
    const allActionTracker = allActionTrackerData.data.data.results.results;
  };

  const handleInitialNotificationPush = async () => {
    localStorage.removeItem("action");
    history.push("/app/observation-initial-notification");
  };
  const columns = [
    {
      name: "Number",
      options: {
        filter: true,
      },
    },
    {
      name: "Type",
      options: {
        filter: true,
      },
    },
    {
      name: "Location",
      options: {
        filter: false,
      },
    },
    {
      name: "Reported on",
      options: {
        filter: true,
      },
    },
    {
      name: "Reported by",
      options: {
        filter: false,
      },
    },
  ];

  const options = {
    print : false,
    search: false,
    filter: false,
    viewColumns: false,
    download :false
  };

  const handlePrintPush = async (index) => {
    const id = allInitialData[index].id;
    localStorage.setItem("fkobservationId", id);
    //console.log("Ashutosh")
    history.push(`/app/prints/${id}`);
  };


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
  const handleSearch = (e) => {
    // console.log(e.target.value)
    setSeacrhIncident(e.target.value);
    // history.push(`/app/observationsearch/#{search-${e.target.value}}`)
  };

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
  const classes = useStyles();
  useEffect(() => {
    fetchInitialiObservation();
    // handleProjectList();
  }, [props.projectName]);

  return (
    <PapperBlock title="Observations" icon="ion-md-list-box" desc="">
      {isLoading ? (
        <Box>
          <div className={classes.root}>
            <AppBar position="static" color="transparent">
              <Toolbar>
                <div className="leftSide" className={classes.leftSide}>
                  <div className={classes.search}>
                    <Paper>
                      <div
                        className={classes.searchIcon}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                        onChange={(e) => handleSearch(e)}
                      />
                    </Paper>
                    <div className="toggleViewButtons">
                      <IconButton
                        aria-label="list"
                        onClick={(e) => handelViewTabel(e)}
                        className={classes.filterIcon}
                      >
                        <FormatListBulleted />
                      </IconButton>

                      <IconButton
                        onClick={(e) => handelView(e)}
                        aria-label="grid"
                        className={classes.filterIcon}
                      >
                        <ViewAgendaIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>

                <Button
                  variant="contained"
                  // color="primary"
                  size="small"
                  startIcon={<AddCircleIcon />}
                  className={classes.newFormButton}
                  disableElevation
                  onClick={() => handleInitialNotificationPush()}
                >
                  New Observation
                </Button>
              </Toolbar>
            </AppBar>
          </div>

          {listToggle == false ? (
            <>
              {/* {allInitialData.map((data,index) => ( */}
              <div className="gridView">
                {
                  Object.entries(allInitialData)
                    .filter(
                      (item) => {return (
                         
                        item[1]["observationDetails"]
                          .toLowerCase()
                          .includes(searchIncident.toLowerCase()) ||
                          item[1]["observationNumber"].toLowerCase().includes(
                            searchIncident.toLowerCase()
                          
                        )
                      )}
                        
                    )
                    .map((item, index) => (
                      <Card variant="outlined" className={Incidents.card}>
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <Grid
                                container
                                spacing={3}
                                alignItems="flex-start"
                              >
                                <Grid item xs={10}>
                                  <Typography variant="h6">
                                    {item[1]["observationDetails"]}
                                  </Typography>
                                </Grid>

                                <Grid
                                  item
                                  xs={2}
                                  style={{ display: "flex" }}
                                  justify="flex-end"
                                >
                                  <Chip
                              avatar={<Avatar src={item[1]["avatar"]?item[1]["avatar"]:"/images/pp_boy.svg"}/>}
                              label={item[1]["username"]?item[1]["username"]:"Admin"}
                            />
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item md={3}>
                                  <Typography
                                    display="inline"
                                    className={classes.listingLabelName}
                                  >
                                    Number:
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    display="inline"
                                    className={classes.listingLabelValue}
                                  >
                                    <Link
                                      onClick={() => handleSummaryPush(index)}
                                    >
                                      {item[1]["observationNumber"]}
                                    </Link>
                                  </Typography>
                                </Grid>

                                <Grid item md={3}>
                                  <Chip
                                    variant="outlined"
                                    label={item[1]["isCorrectiveActionTaken"] == null ? "Initial Notification" : "Action Tracking"}
                                    color="primary"
                                    size="small"
                                  />
                                </Grid>

                                <Grid item md={3}>
                                  <Typography display="inline">
                                    {/* <i className="ion-ios-calendar-outline" /> */}
                                    <CalendarTodayOutlinedIcon
                                      className={classes.labelIcon}
                                    />
                                    <span className={classes.dateValue}>
                                      {moment(item[1]["observedAt"]).format(
                                        "Do MMMM YYYY, h:mm:ss a"
                                      )}
                                    </span>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item lg={3}>
                              <Typography
                                className={classes.listingLabelName}
                                gutterBottom
                              >
                                Type
                              </Typography>

                              <Typography className={classes.listingLabelValue}>
                                {/* {item[1]["incidentReportedByName"]} */}
                                {item[1]["observationType"]}
                              </Typography>
                            </Grid>
                            <Grid item lg={3}>
                              <Typography
                                className={classes.listingLabelName}
                                gutterBottom
                              >
                                Location
                              </Typography>
                              <Typography className={classes.listingLabelValue}>
                                {/* {item[1]} */}
                                {item[1]["location"]}
                              </Typography>
                            </Grid>

                            <Grid item lg={3}>
                              <Typography
                                className={classes.listingLabelName}
                                gutterBottom
                              >
                                Reported on
                              </Typography>

                              <Typography
                                variant="body1"
                                className={classes.listingLabelValue}
                              >
                                {/* {item[3]} */}
                                {moment(item[1]["createdAt"]).format(
                                  "Do MMMM YYYY, h:mm:ss a"
                                )}
                              </Typography>
                            </Grid>

                            <Grid item lg={3}>
                              <Typography
                                className={classes.listingLabelName}
                                gutterBottom
                              >
                                Reported By
                              </Typography>

                              <Typography className={classes.listingLabelValue}>
                                {/* {item[1]} */}
                                {item[1]["username"]?item[1]["username"]:"Admin"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions className={classes.cardActions}>
                          <Grid
                            container
                            spacing={2}
                            // justify="flex-end"
                            alignItems="center"
                          >
                            <Grid item xs={6} md={3}>
                              <Typography
                                display="inline"
                                className={classes.listingLabelName}
                              >
                                <MessageIcon fontSize="small" /> Comments:
                              </Typography>
                              <Typography variant="body2" display="inline">
                                <Link href="#">{item[1].commentsCount}</Link>
                              </Typography>
                            </Grid>

                            <Grid item xs={6} md={3}>
                              <Typography
                                variant="body2"
                                display="inline"
                                className={classes.listingLabelName}
                              >
                                <BuildIcon fontSize="small" /> Actions:
                              </Typography>
                              <Typography variant="body2" display="inline">
                                <Link href="#">3</Link>
                              </Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography
                                variant="body2"
                                display="inline"
                                className={classes.listingLabelName}
                              >
                                <AttachmentIcon fontSize="small" /> Attachments:
                              </Typography>
                              <Typography variant="body2" display="inline">
                                <Link href="#">{item[1].attachmentCount}</Link>
                              </Typography>
                            </Grid>

                            <Grid item xs={6} md={3}>
                              <Button
                                disabled
                                size="small"
                                color="primary"
                                startIcon={<Print />}
                                className={Incidents.actionButton}
                                onClick={() => handlePrintPush(index)}
                              >
                                Print
                              </Button>

                              <Button
                                disabled
                                size="small"
                                color="primary"
                                startIcon={<Share />}
                                className={classes.actionButton}
                              >
                                Share
                              </Button>
                            </Grid>
                          </Grid>
                        </CardActions>
                      </Card>
                    ))}

                {/* {showIncident.map((item, key) => (

                ))} */}
              </div>
              <div className={classes.pagination}>
      <Pagination count={pageCount} onChange={handleChange}/>
    </div>

              {/* ))} */}
            </>
          ) : (
            // listview end

            <div className="listView">
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
                  item[1]["username"],
                ])}
                columns={columns}
                options={options}
              />
            </div>
          )}
         
        </Box>
        
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
}

const mapStateToProps = state => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state

  }
}

export default connect(mapStateToProps,null)(Observations);
