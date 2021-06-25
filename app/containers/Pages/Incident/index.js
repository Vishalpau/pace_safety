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
import { makeStyles } from "@material-ui/core/styles";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ListIcon from "@material-ui/icons/List";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import Fonts from "dan-styles/Fonts.scss";
import Incidents from "dan-styles/IncidentsList.scss";
import { List } from "immutable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: `1px solid ${theme.palette.primary.shade}`,
    borderRadius: "4px",
  },
  leftSide: {
    flexGrow: 1,
  },
  newIncidentButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.primary.dark,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
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
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
  },
}));

function BlankPage() {
  const [incidents, setIncidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);
  const [searchIncident,setSeacrhIncident] = useState("")
  const [showIncident,setShowIncident] = useState([])

  const handelView = (e) => {
    setListToggle(false);
  };

  const handelViewTabel = (e) => {
    setListToggle(true);
  };


  useEffect(async () => {
    const allIncidents = await api.get("api/v1/incidents/");
    await setIncidents(allIncidents.data.data.results);
  }, []);

  // useEffect( () => {
  //   const callback=async()=>{
  //     const allIncidents = await api.get("api/v1/incidents/");
  //     await setIncidents(allIncidents.data.data.results);
  //   }
  //   callback();
  // }, []);

  const handelSearchIncident = async (e) => {
    console.log('here')
    let allSeacrh  = []
    console.log(e.target.value.length)
    if(e.target.value.length === 0){
      setShowIncident([])
    }else{
      await setSeacrhIncident(e.target.value.toLowerCase())
      console.log(searchIncident)
       Object.entries(incidents).map((item) => 
        {
          if(item[1]["incidentNumber"].toLowerCase().includes(searchIncident)){
            allSeacrh.push([
            item[1]["incidentNumber"],
            item[1]["incidentReportedByName"],
            item[1]["incidentLocation"],
            moment(item[1]["incidentReportedOn"]).format("Do MMMM YYYY, h:mm:ss a"),
            item[1]["incidentReportedByName"]
          ])
          }
        }
        )
        await setShowIncident(allSeacrh)
    }

      console.log(showIncident)
 
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
    {
      name: "Incident reported by",
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 10,
    page: 0,
  };

  const classes = useStyles();

  return (
    <PapperBlock title="Incidents" icon="ion-md-list-box" desc="">
      {console.log('here')}
      <Box>
        <div className={classes.root}>
          <AppBar position="static" color="transparent">
            <Toolbar>
              <div className="leftSide" className={classes.leftSide}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<AddCircleIcon />}
                  className={classes.newIncidentButton}
                  disableElevation
                  href="/app/incident-management/registration/initial-notification/incident-details/"
                >
                  New Incident
                </Button>
              </div>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={(e) => handelView(e)}
              >
                List View
              </Button> */}

              <div className={classes.search}>
                <Paper>
                  <div className={classes.searchIcon}>
                    <SearchIcon/>
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onChange = {(e)=>handelSearchIncident(e)}
                  />
                </Paper>
              </div>

              <div className="toggleViewButtons">
                <Typography variant="caption" className={classes.toggleTitle}>
                  Toggle View
                </Typography>
                <IconButton
                  onClick={(e) => handelView(e)}
                  aria-label="grid" className={classes.filterIcon}>
                  <ViewAgendaIcon />
                </IconButton>

                <IconButton
                  aria-label="list"
                  onClick={(e) => handelViewTabel(e)}
                  className={classes.filterIcon}
                >
                  <ListIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        {listToggle == false ? (
          <>
          
          
          {showIncident.length > 0 ? 
          
          <div className="gridView">
            {showIncident.map((item) => (
              <Card variant="outlined" className={Incidents.card}>
                {/* <CardHeader disableTypography title="Incident with No Injury" /> */}
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3} alignItems="flex-start">
                        <Grid item xs={10}>
                          <Typography
                            variant="h6"
                            // display="inline"
                            // color="textSecondary"
                            // className={Fonts.labelValue}
                          >
                            {/* {item[1]["incidentTitle"]} */}
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Reprehenderit culpa voluptates iste.
                          </Typography>
                        </Grid>

                        <Grid item xs={2}>
                          <Chip
                            avatar={<Avatar src="/images/pp_boy.svg" />}
                            label="John Doe"
                            // onDelete={handleDelete}
                            // className={classes.chip}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <div className={Incidents.statusRow}>
                        <Typography
                          variant="h6"
                          display="inline"
                          className={Fonts.labelName}
                        >
                          Number{" "}
                          <Link
                            href="#"
                            variant="subtitle2"
                            className={Incidents.incidentNumber}
                            style={{ textDecoration: "underline" }}
                          >
                            {item[0]}
                          </Link>
                        </Typography>

                        <Chip
                          variant="outlined"
                          label=" Initial Notification"
                          color="primary"
                          size="small"
                        />

                        <Typography
                          variant="body1"
                          // color="textSecondary"
                          display="inline"
                        >
                          {/* {item[1]["incidentNumber"]} */}
                          <i className="ion-ios-calendar-outline" />
                          <span className={Incidents.dateValue}>
                            {/* {item[1]["incidentOccuredOn"]} */}

                            {moment(item[1]["incidentOccuredOn"]).format(
                              "Do MMM YYYY, h:mm a"
                            )}
                          </span>
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item lg={3}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Incident Type
                      </Typography>

                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {/* {item[1]["incidentReportedByName"]} */}
                        Not found
                      </Typography>
                    </Grid>
                    <Grid item lg={3}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Incident location
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {item[1]}
                      </Typography>
                    </Grid>

                    <Grid item lg={3}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Reported on
                      </Typography>

                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {item[3]}
                      </Typography>
                    </Grid>

                    <Grid item lg={3}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Reported By
                      </Typography>

                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {item[2]}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions className={Incidents.cardActions}>
                  <Grid
                    container
                    spacing={2}
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item xs={6} md={3} lg={2}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Incidents.actionsLabel}
                      >
                        <AttachmentIcon /> Comments:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <Link href="#">3</Link>
                      </Typography>
                    </Grid>

                    <Grid item xs={6} md={3} lg={2}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Incidents.actionsLabel}
                      >
                        <AttachmentIcon /> Actions:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <Link href="#">3</Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Incidents.actionsLabel}
                      >
                        <AttachmentIcon /> Evidences:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <Link href="#">3</Link>
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
                        color="textSecondary"
                        className={Type.statusHighlight}
                      >
                        Initial Notification
                      </Typography>
                    </Grid> */}
                    <Grid item xs={6} md={3} lg={2}>
                      <Button
                        size="small"
                        color="secondary"
                        startIcon={<Print />}
                        className={Incidents.actionButton}
                      >
                        Print
                      </Button>
                    </Grid>

                    <Grid item xs={6} md={3} lg={2}>
                      <Button
                        size="small"
                        color="secondary"
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
          
          : 
          <div className="gridView">
            {Object.entries(incidents).map((item,index) => (
              <Card variant="outlined" className={Incidents.card} key={index}>
                {/* <CardHeader disableTypography title="Incident with No Injury" /> */}
                <CardContent>
                  {/* {console.log(item[index].incidentTitle)} */}
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3} alignItems="flex-start">
                        <Grid item xs={10}>
                          <Typography
                            variant="h6"
                            // display="inline"
                            // color="textSecondary"
                            // className={Fonts.labelValue}
                          >
                            {item[1]["incidentTitle"]}
                            {/* {item[index]["incidentTitle"]} */}
                          </Typography>
                        </Grid>

                        <Grid item xs={2}>
                          <Chip
                            avatar={<Avatar src="/images/pp_boy.svg" />}
                            label="John Doe"
                            // onDelete={handleDelete}
                            // className={classes.chip}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <div className={Incidents.statusRow}>
                        <Typography
                          variant="h6"
                          display="inline"
                          className={Fonts.labelName}
                        >
                          Number{" "}
                          <Link
                            href="#"
                            variant="subtitle2"
                            className={Incidents.incidentNumber}
                            style={{ textDecoration: "underline" }}
                          >
                            {item[1]["incidentNumber"]}
                          </Link>
                        </Typography>

                        <Chip
                          variant="outlined"
                          label=" Initial Notification"
                          color="primary"
                          size="small"
                        />

                        <Typography
                          variant="body1"
                          // color="textSecondary"
                          display="inline"
                        >
                          {/* {item[1]["incidentNumber"]} */}
                          <i className="ion-ios-calendar-outline" />
                          <span className={Incidents.dateValue}>
                            {/* {item[1]["incidentOccuredOn"]} */}

                            {moment(item[1]["incidentOccuredOn"]).format(
                              "Do MMM YYYY, h:mm a"
                            )}
                          </span>
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item lg={3}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Incident Type
                      </Typography>

                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {/* {item[1]["incidentReportedByName"]} */}
                        Not found
                      </Typography>
                    </Grid>
                    <Grid item lg={3}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Incident location
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {item[1]["incidentLocation"]}
                      </Typography>
                    </Grid>

                    <Grid item lg={3}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Reported on
                      </Typography>

                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {moment(item[1]["incidentReportedOn"]).format(
                          "Do MMM YYYY, h:mm a"
                        )}
                      </Typography>
                    </Grid>

                    <Grid item lg={3}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Reported By
                      </Typography>

                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
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
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item xs={6} md={3} lg={2}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Incidents.actionsLabel}
                      >
                        <AttachmentIcon /> Comments:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <Link href="#">3</Link>
                      </Typography>
                    </Grid>

                    <Grid item xs={6} md={3} lg={2}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Incidents.actionsLabel}
                      >
                        <AttachmentIcon /> Actions:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <Link href="#">3</Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Incidents.actionsLabel}
                      >
                        <AttachmentIcon /> Evidences:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <Link href="#">3</Link>
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
                        color="textSecondary"
                        className={Type.statusHighlight}
                      >
                        Initial Notification
                      </Typography>
                    </Grid> */}
                    <Grid item xs={6} md={3} lg={2}>
                      <Button
                        size="small"
                        color="secondary"
                        startIcon={<Print />}
                        className={Incidents.actionButton}
                      >
                        Print
                      </Button>
                    </Grid>

                    <Grid item xs={6} md={3} lg={2}>
                      <Button
                        size="small"
                        color="secondary"
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
          }
          </>
          // listview end
          
        ) : (
          <div className="listView">
            <MUIDataTable
              // title="Incidents List"
              data={Object.entries(incidents).map((item) => [
                item[1]["incidentNumber"],
                item[1]["incidentReportedByName"],
                item[1]["incidentLocation"],
                moment(item[1]["incidentReportedOn"]).format(
                  "Do MMMM YYYY, h:mm:ss a"
                ),
                item[1]["incidentReportedByName"],
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