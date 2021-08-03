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

import Fonts from "dan-styles/Fonts.scss";
import Incidents from "dan-styles/IncidentsList.scss";
import { List } from "immutable";
import { useHistory, useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: `1px solid rgba(0, 0, 0, .13)`,
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
}));

const ILink = withStyles({
  root: {
    display: "inline-block",
    marginLeft: ".5rem",
    color: "rgba(0, 0, 0, .85)",
  },
})(Link);

function BlankPage() {
  const [incidents, setIncidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);
  const [searchIncident, setSeacrhIncident] = useState("");
  const [showIncident, setShowIncident] = useState([]);
  const history = useHistory();

  const handelView = (e) => {
    setListToggle(false);
  };

  const handelViewTabel = (e) => {
    setListToggle(true);
  };

  const fetchData = async () => {
    const fkCompanyId = JSON.parse(localStorage.getItem('company')).fkCompanyId
    const fkProjectId = JSON.parse(localStorage.getItem('projectName')).projectName.projectId
    const res = await api.get("api/v1/incidents/");
    
    const newData = res.data.data.results.results.filter(item=>item.fkCompanyId === fkCompanyId && item.fkProjectId ===fkProjectId)
    await setIncidents(newData);
    
  };

  const handlePush = async () => {
    history.push(
      "/app/incident-management/registration/initial-notification/incident-details/"
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      },
    },
    {
      name: "Incident reported by",
      options: {
        filter: true,
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
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 10,
    page: 0,
    // rowsSelected:[1,2,3]
  };

  const classes = useStyles();

  return (
    <PapperBlock title="Incidents" icon="ion-md-list-box" desc="">
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
                      onChange={(e) => setSeacrhIncident(e.target.value)}
                    />
                  </Paper>
                  <div className="toggleViewButtons">
                    {/* <Typography
                      variant="caption"
                      className={classes.toggleTitle}
                    >
                      Toggle View
                    </Typography> */}

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
                color="primary"
                size="small"
                startIcon={<AddCircleIcon />}
                className={classes.newIncidentButton}
                disableElevation
                onClick={() => handlePush()}
              >
                New Incident
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        {listToggle == false ? (
          <>
            {showIncident.length > 0 ? (
              <div className="gridView">
                {showIncident.map((item, key) => (
                  <Card variant="outlined" className={Incidents.card} key={key}>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Grid container spacing={3} alignItems="flex-start">
                            <Grid item xs={10}>
                              <Typography
                                variant="h6"
                                // display="inline"
                                //
                                // className={Fonts.listingLabelValue}
                              >
                                {/* {item[1]["incidentTitle"]} */}
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Reprehenderit culpa voluptates
                                iste.
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              xs={2}
                              style={{ display: "flex" }}
                              justify="flex-end"
                            >
                              <Chip
                                avatar={<Avatar src="/images/pp_boy.svg" />}
                                label="Admin"
                              />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item md={3}>
                              <Typography
                                display="inline"
                                className={Fonts.listingLabelName}
                              >
                                Number:
                                <Link
                                  href={`/app/incident-management/registration/summary/summary/${
                                    item[1].id
                                  }`}
                                  variant="subtitle2"
                                  className={Fonts.listingLabelValue}
                                  style={{
                                    textDecoration: "underline",
                                    display: "inline-block",
                                    marginLeft: "8px",
                                  }}
                                >
                                  {item[1]}
                                </Link>
                              </Typography>
                            </Grid>

                            <Grid item md={3}>
                              <Chip
                                variant="outlined"
                                label="Initial Notification"
                                color="primary"
                                size="small"
                              />
                            </Grid>

                            <Grid item md={3}>
                              <Typography
                                display="inline"
                                className={Fonts.listingLabelName}
                              >
                                <CalendarTodayIcon fontSize="small" />
                                <span className={Incidents.dateValue}>
                                  {moment(item[1]["incidentOccuredOn"]).format(
                                    "Do MMM YYYY, h:mm a"
                                  )}
                                </span>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item lg={3}>
                          <Typography
                            className={Fonts.listingLabelName}
                            gutterBottom
                          >
                            Incident Type
                          </Typography>

                          <Typography className={Fonts.listingLabelValue}>
                            {item[1]["incidentType"]}
                            
                          </Typography>
                        </Grid>
                        <Grid item lg={3}>
                          <Typography
                            className={Fonts.listingLabelName}
                            gutterBottom
                          >
                            Incident location
                          </Typography>
                          <Typography className={Fonts.listingLabelValue}>
                            {item[1]['incidentLocation']}
                          </Typography>
                        </Grid>

                        <Grid item lg={3}>
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

                        <Grid item lg={3}>
                          <Typography
                            className={Fonts.listingLabelName}
                            gutterBottom
                          >
                            Reported By
                          </Typography>

                          <Typography className={Fonts.listingLabelValue}>
                            {item[1]["incidentReportedByName"]}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions className={Incidents.cardActions}>
                      <Grid
                        container
                        spacing={2}
                        // justify="flex-end"
                        alignItems="center"
                      >
                        <Grid item xs={6} md={3}>
                          <Typography
                            display="inline"
                            className={Fonts.listingLabelName}
                          >
                            <MessageIcon fontSize="small" /> Comments:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            <ILink href="#">3</ILink>
                          </Typography>
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography
                            variant="body2"
                            display="inline"
                            className={Fonts.listingLabelName}
                          >
                            <BuildIcon fontSize="small" /> Actions:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            <ILink href="#">3</ILink>
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Typography
                            variant="body2"
                            display="inline"
                            className={Fonts.listingLabelName}
                          >
                            <AttachmentIcon fontSize="small" /> Evidences:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            <ILink href="#">3</ILink>
                          </Typography>
                        </Grid>
                        {/* <Grid item xs={6} md={3} lg={3}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Incidents.actionsLabel}
                      >
                        <InfoIcon /> Status:
                      </Typography>
                      <Typography
                        variant="body2"
                        display="inline"
                        
                        className={Type.statusHighlight}
                      >
                        Initial Notification
                      </Typography>
                    </Grid> */}
                        <Grid item xs={6} md={3}>
                          <Button
                            disabled
                            size="small"
                            color="primary"
                            startIcon={<Print />}
                            className={Incidents.actionButton}
                          >
                            Print
                          </Button>

                          <Button
                            disabled
                            size="small"
                            color="primary"
                            startIcon={<Share />}
                            className={Incidents.actionButton}
                          >
                            Share
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="gridView">
                {Object.entries(incidents).filter(searchText=>{return searchText[1]['incidentTitle'].toLowerCase().includes(searchIncident.toLowerCase())
                || searchText[1]["incidentNumber"].includes(searchIncident.toUpperCase())}).map((item, index) => (
                  <Card
                    variant="outlined"
                    className={Incidents.card}
                    key={index}
                  >
                    {/* <CardHeader disableTypography title="Incident with No Injury" /> */}
                    <CardContent>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Grid container spacing={3} alignItems="flex-start">
                            <Grid item xs={10}>
                              <Typography
                                variant="h6"
                                // display="inline"
                                //
                                // className={Fonts.listingLabelValue}
                              >
                                {item[1]["incidentTitle"]}
                                {/* {item[index]["incidentTitle"]} */}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              xs={2}
                              style={{ display: "flex" }}
                              justify="flex-end"
                            >
                              <Chip
                                avatar={<Avatar src="/images/pp_boy.svg" />}
                                label="Admin"
                                // onDelete={handleDelete}
                                // className={classes.chip}
                              />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item md={3}>
                              <Typography
                                display="inline"
                                className={Fonts.listingLabelName}
                              >
                                Number:
                                <Link
                                  href={`/app/incident-management/registration/summary/summary/${
                                    item[1].id
                                  }`}
                                  variant="subtitle2"
                                  className={Fonts.listingLabelValue}
                                  style={{
                                    textDecoration: "underline",
                                    display: "inline-block",
                                    marginLeft: "8px",
                                  }}
                                >
                                  {item[1]["incidentNumber"]}
                                </Link>
                              </Typography>
                            </Grid>

                            <Grid item md={3}>
                              <Chip
                                variant="outlined"
                                label="Initial Notification"
                                color="primary"
                                size="small"
                              />
                            </Grid>

                            <Grid item md={3}>
                              <Typography
                                display="inline"
                                className={Fonts.listingLabelName}
                              >
                                <CalendarTodayIcon fontSize="small" />
                                <span className={Incidents.dateValue}>
                                  {moment(item[1]["incidentOccuredOn"]).format(
                                    "Do MMM YYYY, h:mm a"
                                  )}
                                </span>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item lg={3}>
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
                        <Grid item lg={3}>
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

                        <Grid item lg={3}>
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

                        <Grid item lg={3}>
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
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions className={Incidents.cardActions}>
                      <Grid
                        container
                        spacing={2}
                        // justify="flex-end"
                        alignItems="center"
                      >
                        <Grid item xs={6} md={3}>
                          <Typography
                            variant="body2"
                            display="inline"
                            className={Fonts.listingLabelName}
                          >
                            <MessageIcon fontSize="small" /> Comments:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            <ILink href="#">3</ILink>
                          </Typography>
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography
                            variant="body2"
                            display="inline"
                            className={Fonts.listingLabelName}
                          >
                            <BuildIcon fontSize="small" /> Actions:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            <ILink href="#">3</ILink>
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Typography
                            variant="body2"
                            display="inline"
                            className={Fonts.listingLabelName}
                          >
                            <AttachmentIcon fontSize="small" /> Evidences:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            <ILink href="#">3</ILink>
                          </Typography>
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Button
                            disabled
                            size="small"
                            color="primary"
                            startIcon={<Print />}
                            className={Incidents.actionButton}
                          >
                            Print
                          </Button>

                          <Button
                            disabled
                            size="small"
                            color="primary"
                            startIcon={<Share />}
                            className={Incidents.actionButton}
                          >
                            Share
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          // listview end

          <div className="listView">
            <MUIDataTable
              data={Object.entries(incidents).map((item) => [
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
      </Box>
    </PapperBlock>
  );
}

export default BlankPage;
