import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import api from "../../../utils/axios";
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
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ListIcon from "@material-ui/icons/List";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import BuildIcon from "@material-ui/icons/Build";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory, useParams } from "react-router";

import Fonts from "dan-styles/Fonts.scss";
import Incidents from "dan-styles/IncidentsList.scss";
import { List } from "immutable";

import { connect } from "react-redux";
import { tabViewMode } from '../../../redux/actions/initialDetails';
import { fetchPermission } from "../../../redux/actions/authentication";
import { useDispatch } from "react-redux";
import { INITIAL_NOTIFICATION_FORM_NEW, SELF_API, SSO_URL, API_URL } from "../../../utils/constants";
import Pagination from '@material-ui/lab/Pagination';
// import { handleTimeOutError } from "../../../utils/CheckerValue"

// Styles
const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "flex-end"
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
  const [permissionListData, setPermissionListData] = useState([])
  const [page, setPage] = useState(1)
  const [pageData, setPageData] = useState(0)
  const [totalData, setTotalData] = useState(0);


  const history = useHistory();
  const dispatch = useDispatch();
  const handelView = (e) => {
    setListToggle(false);
  };

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
    await setPage(1)
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
    let struct = "";

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    if (fkProjectStructureIds) {
      const res = await api.get(`api/v1/incidents/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`)
      // debugger;
      await setIncidents(res.data.data.results.results);

      await setTotalData(res.data.data.results.count)
      await setPageData(res.data.data.results.count / 25)
      let pageCount = Math.ceil(res.data.data.results.count / 25)
  await setPageCount(pageCount)
    } else {
      const res = await api.get(`api/v1/incidents/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`)
        // alert('hey')
        .then(async(res) => {
          // debugger;
          setIncidents(res.data.data.results.results);
          await setTotalData(res.data.data.results.count)
          await setPageData(res.data.data.results.count / 25)
          let pageCount = Math.ceil(res.data.data.results.count / 25)
      await setPageCount(pageCount)
        })
        .catch(err => console.log(err.message))
      // handleTimeOutError(res)




    }
  };

  const handlePush = async () => {
    history.push(INITIAL_NOTIFICATION_FORM_NEW['Incident details']);
  };

  const filterSubscription = () => {
    // const userDetails = JSON.parse(localStorage.getItem(''))
  }
  useEffect(() => {
    fetchData();
    fetchPermissionData();
  }, [props.projectName]);

  useEffect(() => {
    // fetchPermission();
  }, [])
  const handelSearchIncident = async (e) => {
    let allSeacrh = [];
    if (e.target.value.length === 0) {
      await setShowIncident([]);
    } else {
      await setSeacrhIncident(e.target.value.toLowerCase());
      Object.entries(incidents).map((item) => {
        if (item[1]["incidentNumber"].toLowerCase().includes(searchIncident)) {
          allSeacrh.push([
            item[1]["incidentNumber"],
            item[1]["incidentReportedByName"],
            item[1]["incidentLocation"],
            moment(item[1]["incidentReportedOn"]).format(
              "Do MMMM YYYY, h:mm:ss a"
            ),
            item[1]["incidentReportedByName"],
          ]);
        }
      });
      await setShowIncident(allSeacrh);
    }
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
    onRowsDelete: (rowsDeleted) => {

      const idsToDelete = rowsDeleted.data.map(
        (d) => incidents[d.dataIndex].id
      );
      for (var i = 0; i < idsToDelete.length; i++) {
        const res = api.delete(`api/v1/incidents/${idsToDelete[i]}/`);
      }
    },
    filter: true,
    selectableRows: true,
    filterType: "dropdown",
    responsive: "stacked",
    rowsPerPage: 100,
    print: false,
    search: false,
    filter: false,
    viewColumns: false,
    download: false,
    paging: false,
    pagination:false

  };
  const fetchPermissionData = async () => {
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const res = await api.get(`${SELF_API}${fkCompanyId}/`)

    let roles = res.data.data.results.data.companies[0].subscriptions.filter(item => item.appCode === "safety")

    const fetchPermissiondata = await api.get(`${SSO_URL}${roles[0].roles[0].aclUrl.substring(0)}`)

    setPermissionListData(fetchPermissiondata.data.data.results.permissions[0].incident)

  }
  const handleChange = async (event, value) => {
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
    let struct = "";

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    // https://dev-safety-api.paceos.io/api/v1/incidents/?companyId=1&projectStructureIds=1L1:2L3:3L6&projectId=1
    const res = await api.get(`api/v1/incidents/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}`)
      .then((res) => {
        setIncidents(res.data.data.results.results);
        setPage(value)
      })
      .catch(error => {

      })

  };
  const classes = useStyles();

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
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
                      onChange={(e) => setSeacrhIncident(e.target.value)}
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
                        disabled={!permissionListData.add_incidents}
                        disableElevation
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
              <Card variant="outlined" className={Incidents.card} key={index}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3} alignItems="flex-start">
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
                            justifyContent={isDesktop ? "flex-end" : null}
                          >
                            <Chip
                              avatar={<Avatar src={item[1]["avatar"] ? item[1]["avatar"] : "/images/pp_boy.svg"} />}
                              label={item[1]["username"] ? item[1]["username"] : "Admin"}
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
                              onClick={(e) => history.push(`/incident/details/${item[1].id}/`)}
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
                            label={`Initial Notification${index}`}
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
                                {moment(item[1]["incidentOccuredOn"]).format(
                                  "Do MMM YYYY, h:mm a"
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
                          <Typography className={Fonts.listingLabelValue}>
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
                            {moment(item[1]["incidentReportedOn"]).format(
                              "Do MMM YYYY, h:mm a"
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

                          <Typography className={Fonts.listingLabelValue}>
                            {item[1]["incidentReportedByName"]}
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions className={Incidents.cardActions}>
                  <Grid container spacing={2} justifyContent='space-between' alignItems="center">
                    <Grid item xs={6} md={3}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Fonts.listingLabelName}
                        onClick={() => history.push(`/app/incidents/comments/${item[1]["id"]}/`)}
                      >
                        <MessageIcon fontSize="small" /> Comments:{item[1]["commentsCount"]}
                      </Typography>

                    </Grid>


                    <Grid item xs={6} md={3}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Fonts.listingLabelName}
                      >
                        <AttachmentIcon fontSize="small" /> Attachments:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <ILink href="#">{item[1]["attachmentCount"]}</ILink>
                      </Typography>
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <Button
                        // disabled
                        size="small"
                        color="primary"
                        startIcon={<Print />}
                        className={Incidents.actionButton}
                      >
                        Print
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            ))}

        </div>
      ) : (
        // listview end

        <div className="listView">
          <MUIDataTable
            data={Object.entries(incidents).filter((searchText) => {
              return (

                searchText[1]["incidentTitle"]
                  .toLowerCase()
                  .includes(searchIncident.toLowerCase()) ||
                searchText[1]["incidentNumber"].includes(
                  searchIncident.toUpperCase()
                )
              );
            }).map((item) => [
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
      )}
     <div className={classes.pagination}>
     {totalData != 0 ?  Number.isInteger(pageData) !== true ? totalData < 25*page ? `${page*25 -24} - ${totalData} of ${totalData}` : `${page*25 -24} - ${25*page} of ${totalData}`  : `${page*25 -24} - ${25*page} of ${totalData}` : null}
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </div>
    </PapperBlock>
  );
}
const mapStateToProps = state => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state

  }
}

export default connect(mapStateToProps, null)(BlankPage);