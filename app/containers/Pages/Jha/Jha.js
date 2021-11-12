import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AttachmentIcon from '@material-ui/icons/Attachment';
import BuildIcon from '@material-ui/icons/Build';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import MessageIcon from '@material-ui/icons/Message';
import Print from '@material-ui/icons/Print';
import SearchIcon from '@material-ui/icons/Search';
import Share from '@material-ui/icons/Share';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import Pagination from '@material-ui/lab/Pagination';
import { PapperBlock } from 'dan-components';
import Fonts from 'dan-styles/Fonts.scss';
import Incidents from 'dan-styles/IncidentsList.scss';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router';
import api from "../../../utils/axios";
import { handelCommonObject } from "../../../utils/CheckerValue";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: '1px solid rgba(0, 0, 0, .13)',
    borderRadius: '4px',
  }, pagination: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "flex-end"
  },
  leftSide: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.primary.dark,
    marginRight: theme.spacing(2),
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    paddingInline: theme.spacing(1),
    // height: "100%",
    top: '50%',
    transform: 'translateY(-50%)',
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
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
  },
  newFormButton: {
    '& svg': {
      // fontSize: '25px',
      // color: '#06425c',
    },
  },
  listingLabelName: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.88rem',
  },
  listingLabelValue: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.88rem',
    '& a': {
      paddingLeft: '5px',
      cursor: 'pointer',
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: '600',
    },
  },
  cardActions: {
    padding: '1.25rem',
  },
  dateValue: {
    display: 'inline-block',
    marginLeft: '0.5rem',
  },
  labelIcon: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.54)',
    verticalAlign: 'text-top',
  },
  newFormBTN: {
    textAlign: 'right',
  },

}));

// Link component for links in the card
const ILink = withStyles({
  root: {
    display: 'inline-block',
    marginLeft: '2px',
    color: 'rgba(0, 0, 0, .85)',
  },
})(Link);

function Jha(props) {
  const [cardView, setCardView] = useState(true);
  const [allJHAData, setAllJHAData] = useState([])
  const [listToggle, setListToggle] = useState(false);
  const [searchIncident, setSeacrhIncident] = useState("");
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0)
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1)

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

    const res = await api.get(`api/v1/jhas/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`);
    const result = res.data.data.results.results !== undefined && res.data.data.results.results
    await setAllJHAData(result)
    await setTotalData(res.data.data.results.count)
    await setPageData(res.data.data.results.count / 25)
    let pageCount = Math.ceil(res.data.data.results.count / 25)
    await setPageCount(pageCount)
    handelTableView(result)

    await setIsLoading(true)
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
    const res = await api.get(`api/v1/jhas/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}`);
    await setAllJHAData(res.data.data.results.results);
    await setPage(value)
    await handelTableView(res.data.data.results.results)

  };

  // Function to toggle the view mode
  const handleView = () => {
    setCardView(true)
    history.push(`/app/pages/jha/all_jha/`)
  };

  const handleTabelView = () => {
    setCardView(false)
    history.push(`/app/pages/jha/all_jha/_table`)
  };

  //   Data for the table view

  const columns = ['Jha number', 'Location', 'Work area', 'Created by', 'Created on'];

  const handelTableView = (result) => {
    const temp = []
    result.map((value) => {
      temp.push([
        value.jhaNumber,
        value.location,
        value.workArea,
        value.username,
        moment(value.createdAt).format('DD MM YYYY')
      ])
    })
    setData(temp)
  }

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    rowsPerPage: 100,
    page: 100,
    search: true,
    filter: false,
    viewColumns: false,
    download: false
  };

  const handleSummaryPush = async (e, index) => {

    const jha = allJHAData[index]

    localStorage.setItem("fkJHAId", jha.id)
    handelCommonObject("commonObject", "jha", "projectStruct", jha.fkProjectStructureIds)
    history.push(`/app/pages/jha/jha-summary/${jha.id}`);
  };

  const handleNewJhaPush = async () => {
    localStorage.removeItem("fkJHAId")
    history.push("/app/pages/jha/assessments/project-details");
  };

  useEffect(() => {
    fetchData()
  }, [props.projectName.breakDown])

  //   Assigning 'classes' to useStyles()
  const classes = useStyles();
  return (
    <PapperBlock title="JHA" icon="ion-md-list-box">
      {isLoading ? <>
        <div className={classes.root}>
          <AppBar position="static" color="transparent">
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={7} md={3}>
                  <div className={classes.search}>
                    <Paper>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        onChange={(e) => setSeacrhIncident(e.target.value)}
                      />
                    </Paper>
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="toggleViewButtons">
                    <IconButton
                      className={classes.filterIcon}
                      onClick={handleView}
                    >
                      <FormatListBulleted />
                    </IconButton>

                    <IconButton
                      aria-label="grid"
                      className={classes.filterIcon}
                      onClick={handleTabelView}
                    >
                      <ViewAgendaIcon />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.newFormBTN}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddCircleIcon />}
                    className={classes.newIncidentButton}
                    disableElevation
                    onClick={(e) => handleNewJhaPush(e)}
                  >
                    New JHA
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>

        {cardView ? (<>
          {allJHAData.length > 0 && Object.entries(allJHAData).filter((item) => item[1]["jhaNumber"].includes(searchIncident.toUpperCase()) ||
            item[1]["description"].toLowerCase().includes(
              searchIncident.toLowerCase()
            )).map((item, index) => (
              <Card variant="outlined" className={Incidents.card}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3} alignItems="flex-start">
                        <Grid item xs={11}>
                          <Typography variant="h6">
                            {item[1]["description"]}
                          </Typography>
                        </Grid>

                        <Grid item xs={1} justifyContent="flex-end">
                          <Chip
                            avatar={<Avatar src={item[1]["avatar"]} />}
                            label={item[1]["username"]}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <Typography
                            display="inline"
                            className={Fonts.listingLabelName}
                          >
                            Number:
                            <Link
                              onClick={(e) => handleSummaryPush(e, index)}
                              variant="subtitle2"
                              className={Fonts.listingLabelValue}
                              style={{
                                textDecoration: 'underline',
                                display: 'inline-block',
                                marginLeft: '8px',
                              }}
                            >
                              {item[1]["jhaNumber"]}
                            </Link>
                          </Typography>
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Chip
                            variant="outlined"
                            label="JHA"
                            color="primary"
                            size="small"
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <Typography
                            display="inline"
                            className={Fonts.listingLabelName}
                          >
                            <CalendarTodayIcon fontSize="small" />
                            <span className={Fonts.listingLabelValue}>
                              {moment(item[1]["assessmentDate"]).format(
                                "Do MMMM YYYY"
                              )}
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={6} lg={3}>
                      <Typography className={Fonts.listingLabelName} gutterBottom>
                        Work Area
                      </Typography>

                      <Typography className={Fonts.listingLabelValue}>
                        {item[1]["workArea"]}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                      <Typography className={Fonts.listingLabelName} gutterBottom>
                        Location
                      </Typography>
                      <Typography className={Fonts.listingLabelValue}>
                        {item[1]["location"]}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} lg={3}>
                      <Typography className={Fonts.listingLabelName} gutterBottom>
                        Created on
                      </Typography>

                      <Typography variant="body1" className={Fonts.listingLabelValue}>
                        {moment(item[1]["createdAt"]).format(
                          "Do MMMM YYYY, h:mm:ss a"
                        )}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} lg={3}>
                      <Typography className={Fonts.listingLabelName} gutterBottom>
                        Created By
                      </Typography>

                      <Typography className={Fonts.listingLabelValue}>
                        {item[1]["username"]}
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
                      <Typography display="inline" className={Fonts.listingLabelName}>
                        <MessageIcon fontSize="small" />
                        {' '}
                        Comments:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <ILink href="#">{item[1]["commentsCount"]}</ILink>
                      </Typography>
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Fonts.listingLabelName}
                      >
                        <BuildIcon fontSize="small" />
                        {' '}
                        Actions:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <ILink href="#">{item[1]["actionCount"]}</ILink>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography
                        variant="body2"
                        display="inline"
                        className={Fonts.listingLabelName}
                      >
                        <AttachmentIcon fontSize="small" />
                        {' '}
                        Attachments:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <ILink href="#">{item[1]["attachmentCount"]}</ILink>
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
              </Card>))}</>)
          : (
            <MUIDataTable
              title="Incidents List"
              data={data}
              columns={columns}
              options={options}
            />
          )}

        <div className={classes.pagination}>
          {totalData != 0 ? Number.isInteger(pageData) !== true ? totalData < 25 * page ? `${page * 25 - 24} - ${totalData} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : null}
          <Pagination count={pageCount} page={page} onChange={handleChange} />
        </div>
      </> : <h1>Loading...</h1>}
    </PapperBlock>
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
)(Jha);
