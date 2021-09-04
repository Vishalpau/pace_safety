import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Print from '@material-ui/icons/Print';
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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Incidents from 'dan-styles/IncidentsList.scss';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import CommentIcon from '@material-ui/icons/Comment';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import classNames from 'classnames';
import MUIDataTable from 'mui-datatables';
import Checkbox from '@material-ui/core/Checkbox';
import Fonts from 'dan-styles/Fonts.scss';
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import api from '../../../utils/axios';

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
    padding: theme.spacing(2, 2),
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
    border: '1px solid #ccc',
    borderRadius: '5px',
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
    color: 'rgba(0, 0, 0, 0.87) !important'
  },
  spacerRight: {
    marginRight: '4px',
  },
  paddZero: {
    padding: '0px',
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
  searchHeaderTop: {
    border: '1px solid #dedede',
    backgroundColor: '#ffffff',
    padding: '0px 16px',
    borderRadius: '5px',
  },
}));

const ILink = withStyles({
  root: {
    display: 'inline-block',
    marginLeft: '.5rem',
    color: 'rgba(0, 0, 0, .85)',
  },
})(Link);

function xflha(props) {
  const [incidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);
  const [flhas, setFlhas] = useState([]);
  const [showFlha, setShowFlha] = useState([]);
  const [searchFlha, setSeacrhFlha] = useState('');
  const handelView = (e) => {
    setListToggle(false);
  };
  const handelViewTabel = (e) => {
    setListToggle(true);
  };
  const history = useHistory();
  //   Data for the table view
  const columns = ['number', 'type', 'schedule', 'status', 'requestedby', 'datesubmitted', 'daterequired', 'dateapproved', 'approvedby'];
  const data = [
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
    scroll: true,
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
  };

  const classes = useStyles();

  const fetchData = async () => {
    console.log(props.projectName, 'project');
    const { fkCompanyId } = JSON.parse(localStorage.getItem('company'));
    // alert(fkCompanyId);
    const fkProjectId = JSON.parse(localStorage.getItem('projectName'))
      .projectName.projectId;
    // alert(fkProjectId);
    const res = await api.get('api/v1/flhas/list/');
    console.log({ res: res.data.data.results.results });
    setFlhas(res.data.data.results.results);
  };

  const handelSearchFlha = async (e) => {
    const allSeacrh = [];
    if (e.target.value.length === 0) {
      await setShowFlha([]);
    } else {
      await setSeacrhFlha(e.target.value.toLowerCase());
      Object.entries(flhas).map((item) => {
        if (item[1].flhaNumber.toLowerCase().includes(searchFlha)) {
          allSeacrh.push([
            item[1].flhaNumber,
            item[1].supervisor,
            item[1].fieldContractor,
            // moment(item[1]["incidentReportedOn"]).format(
            //   "Do MMMM YYYY, h:mm:ss a"
            // ),
            item[1].meetingPoint,
          ]);
        }
      });
      await setShowFlha(allSeacrh);
    }
  };

  useEffect(() => {
    console.log({ props });
    fetchData();
  }, [props.projectName]);


  return (
    <PapperBlock title="Field Level Hazard Assessment" icon="ion-md-list-box" desc="">
      {console.log('here')}

      <Box>
        <div className={classes.root}>
          <AppBar position="static" color="transparent" className={classes.searchHeaderTop}>
            <Toolbar className={classes.paddZero}>
              <div className={classes.search}>
                <Paper elevation={1}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Paper>
              </div>
              <Grid item xs={12}>
                <div className="toggleViewButtons">
                  <Typography variant="caption" className={classes.toggleTitle} />
                  <Tooltip title="card" aria-label="card">
                    <IconButton
                      onClick={(e) => handelView(e)}
                      aria-label="grid"
                      className={classes.filterIcon}
                    >
                      <RecentActorsIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="list" aria-label="list">
                    <IconButton
                      aria-label="list"
                      onClick={(e) => handelViewTabel(e)}
                      className={classes.filterIcon}
                    >
                      <ListAltOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.rightSide}>
                  <Tooltip title="Create XFLHA" aria-label="new XFLHA">
                    <Button size="medium" variant="contained" color="primary" href="/app/pages/assesments/flhaadd">
                      <ControlPointIcon className={classes.spacerRight} />
                      {' '}
Create XFLHA
                    </Button>
                  </Tooltip>
                </div>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>

        {listToggle == false ? (
          <div>


            <div className="gridView">
              {Object.entries(flhas)
                .filter((searchText) => {
                  console.log(searchText, 'searchtext');
                  return (

                    searchText[1].jobTitle
                      .toLowerCase()
                      .includes(searchFlha.toLowerCase())
                || searchText[1].flhaNumber.includes(
                  searchFlha.toUpperCase()
                )
                  );
                })
                .map((item, index) => (
                  <Card variant="outlined" className={Incidents.card}>
                    {/* <CardHeader disableTypography title="Incident with No Injury" /> */}


                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                          <Grid container spacing={3} alignItems="flex-start">
                            <Grid item md={10} xs={12}>
                              <Typography
                                variant="h6"
                                // display="inline"
                                // color="textSecondary"
                                // className={classes.listingLabelValue}
                              >
                                {item[1].jobTitle}
                              </Typography>
                            </Grid>

                            <Grid item md={2} xs={12} className={classes.chipAction}>
                              <Chip
                                avatar={<Avatar src="/images/pp_boy.svg" />}
                                label={item[1].username}
                                // onDelete={handleDelete}
                              />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item md={12} xs={12}>
                          <Grid container spacing={3}>
                            <Grid item md={3} sm={6} xs={12}>
                              <Typography
                                display="inline"
                                className={classes.listingLabelName}
                              >
                          Number:

                                <ILink
                                  onClick={(e) => history.push(`/app/pages/assesments/flhasummary/${item[1].id}`)}
                                  variant="subtitle2"
                                  className={Fonts.listingLabelValue}
                                >
                                  {item[1].flhaNumber}
                                </ILink>
                              </Typography>
                            </Grid>

                            <Grid item md={3} sm={6} xs={12}>
                              <Typography
                                variant="body1"
                                gutterBottom
                                display="inline"
                                color="textSecondary"
                                className={classes.listingLabelName}
                              >
                            Category:
                              </Typography>
                              <Typography
                                display="inline"
                                className={classNames(classes.listingLabelValue, classes.mLeft)}
                              >
                            XFLHA
                              </Typography>
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                              <Chip
                                variant="outlined"
                                label={item[1].flhaStatus}
                                color="primary"
                                size="small"
                              />
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                              <Typography
                                variant="body1"
                                // color="textSecondary"
                                display="inline"
                              >
                                {/* {item[1]["incidentNumber"]} */}
                                <i className="ion-ios-calendar-outline" />
                                <span className={Incidents.dateValue}>
                                  {moment(item[1].dateTimeFlha).format(
                                    'Do MMMM YYYY, h:mm:ss a'
                                  )}
                                </span>
                              </Typography>
                            </Grid>

                          </Grid>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            color="textSecondary"
                            className={classes.listingLabelName}
                          >
                        Type:
                          </Typography>

                          <Typography

                            gutterBottom
                            className={classes.listingLabelValue}
                          >
                            {/* {item[1]["incidentReportedByName"]} */}
                        Not found
                          </Typography>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            gutterBottom
                            className={classes.listingLabelName}
                          >
                        Location:
                          </Typography>
                          <Typography

                            className={classes.listingLabelValue}
                          >
                            {item[1].location}
                          </Typography>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            gutterBottom
                            className={classes.listingLabelName}
                          >
                        Created on:
                          </Typography>

                          <Typography

                            className={classes.listingLabelValue}
                          >
                            {moment(item[1].createdAt).format(
                              'Do MMMM YYYY, h:mm:ss a'
                            )}
                          </Typography>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            gutterBottom
                            className={classes.listingLabelName}
                          >
                        Created by:
                          </Typography>

                          <Typography

                            className={classes.listingLabelValue}
                          >
                            {item[1].username}
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
                        <Grid item md={3} sm={6} xs={12}>
                          <Typography
                            variant="body1"
                            display="inline"
                            color="textSecondary"
                            className={classes.mLeft}
                          >
                            <CommentIcon />

                      Comments:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            <Link href="#" className={classes.mLeft}>{item[1].comments_count}</Link>
                          </Typography>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>
                          <Typography
                            variant="body1"
                            display="inline"
                            color="textSecondary"

                          >
                            <AttachmentIcon />
                        Attachments:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            <Link href="#" className={classes.mLeft}>{item[1].attachment_count}</Link>
                          </Typography>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>
                          <Button
                            size="small"
                            disabled
                            variant="outlined"
                            display="inline"
                            color="textPrimary"
                            startIcon={<Print />}
                          >
                        Print
                          </Button>
                        </Grid>

                        <Grid item md={3} sm={6} xs={12}>
                          <Button
                            size="small"
                            disabled
                            variant="outlined"
                            display="inline"
                            color="textSecondary"
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

            <div className="gridView">
              {Object.entries(incidents).map((item, index) => (
                <Card variant="outlined" className={Incidents.card} key={index}>
                  {/* <CardHeader disableTypography title="Incident with No Injury" /> */}
                  <CardContent>
                    {/* {console.log(item[index].incidentTitle)} */}
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3} alignItems="flex-start">
                          <Grid item xs={9} className={classes.chipAction}>
                            <Chip
                              avatar={<Avatar src="/images/pp_boy.svg" />}
                              label={item[1].username}
                            />
                          </Grid>
                          <Grid item md={3} sm={6} xs={12}>
                            <Typography>
                            Work fell down in site
                              {/* {item[index]["incidentTitle"]} */}
                            </Typography>
                          </Grid>


                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <div className={Incidents.statusRow}>
                          <Typography

                            display="inline"
                            className={classes.listingLabelName}
                          >
                          Number
                            {''}
                            <Link
                              href="/app/ActionSummary"
                              variant="subtitle"
                              className={Incidents.incidentNumber}
                              style={{ textDecoration: 'underline' }}
                            >
                              {item[1].flhaNumber}
                            </Link>
                          </Typography>

                          <Chip
                            variant="outlined"
                            label={item[1].flhaStage}
                            color="primary"
                            size="small"
                          />

                          <Typography
                            variant="body1"
                            // color="textSecondary"
                            display="inline"
                          >

                            <i className="ion-ios-calendar-outline" />
                            <span className={Incidents.dateValue}>
                            24 june 2021
                            </span>
                          </Typography>
                        </div>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography

                          gutterBottom
                          className={classes.listingLabelName}
                        >
                        Type
                        </Typography>

                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.listingLabelValue}
                        >
                          {/* {item[1]["incidentReportedByName"]} */}
                        Not found
                        </Typography>
                      </Grid>
                      <Grid item md={3} sm={6} xs={12}>
                        <Typography

                          gutterBottom
                          className={classes.listingLabelName}
                        >
                        Location
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.listingLabelValue}
                        >
                        Delhi
                        </Typography>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography

                          gutterBottom
                          className={classes.listingLabelName}
                        >
                        Reported on
                        </Typography>

                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.listingLabelValue}
                        >
                        24 june 2021
                        </Typography>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography

                          gutterBottom
                          className={classes.listingLabelName}
                        >
                        Reported By
                        </Typography>

                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.listingLabelValue}
                        >
                        Person
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
                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          variant="body2"
                          display="inline"
                          className={Incidents.actionsLabel}
                        >
                          <AttachmentIcon />
                          {' '}
                          Comments:
                        </Typography>
                        <Typography variant="body2" display="inline" className={classes.mLeft}>
                          <Link href="#">3</Link>
                        </Typography>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          variant="body2"
                          display="inline"
                          className={Incidents.actionsLabel}
                        >
                          <AttachmentIcon />
                          {' '}
                          Actions:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          <Link href="#" className={classes.mLeft}>3</Link>
                        </Typography>
                      </Grid>
                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          variant="body2"
                          display="inline"
                          className={Incidents.actionsLabel}
                        >
                          <AttachmentIcon />
                          {' '}
                        Evidences:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          <Link href="#" className={classes.mLeft}>3</Link>
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
                       Initial Action
                      </Typography>
                    </Grid> */}
                      <Grid item md={3} sm={6} xs={12}>
                        <Button
                          size="small"
                          color="secondary"
                          startIcon={<Print />}
                          className={Incidents.actionButton}
                        >
                        Print
                        </Button>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
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

          </div>
          // listview end

        ) : (
          <Grid component={Paper}>
            <MUIDataTable
              title="FLHA's"
              data={Object.entries(flhas).map((item) => [

                item[1].flhaNumber,
                item[1].jobTitle,
                'NA',
                'NA',
                'NA',
                'NA',
                'NA',
                'NA',
                'NA',
                'NA',
                // item[1]["incidentLocation"],
                // moment(item[1]["incidentReportedOn"]).format(
                //   "Do MMMM YYYY, h:mm:ss a"
                // ),
                // item[1]["incidentReportedByName"],
                // item[1]["id"],
              ])}
              columns={columns}
              options={options}
            />
          </Grid>
        )}

      </Box>
    </PapperBlock>
  );
}

export default xflha;
