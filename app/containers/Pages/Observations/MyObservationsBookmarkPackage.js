import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import AttachmentIcon from '@material-ui/icons/Attachment';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import Print from '@material-ui/icons/Print';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import Share from '@material-ui/icons/Share';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import completed_small from 'dan-images/completed_small.png';
import in_progress_small from 'dan-images/in_progress_small.png';
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';
import Incidents from 'dan-styles/IncidentsList.scss';
import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import "../../../styles/custom/customheader.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    // border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: '4px',
    fontFamily: 'Montserrat-Medium',
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
  mLeftR5: {
    marginLeft: '5px',
    marginRight: '15px',
  },
  PLR0: {
    paddingRight: '0px',
    minWidth: '30px',
    paddingLeft: '0px',
  },
  pLeft5: {
    paddingLeft: '5px',
  },
  pt15: {
    paddingTop: '15px !important',
  },
  mLeftfont: {
    marginLeft: '2px',
    fontSize: '14px',
    textDecoration: 'underline',
    color: 'rgba(0, 0, 0, 0.87) !important',
  },
  spacerRight: {
    marginRight: '4px',
  },
  paddZero: {
    padding: '0px',
  },
  listingLabelName: {
    color: '#7692a4',
    fontSize: '0.88rem',
    fontFamily: 'Montserrat-Medium',
  },
  listingLabelValue: {
    color: '#333333',
    fontSize: '0.88rem',
    fontFamily: 'Montserrat-Medium',
    '& a': {
      paddingLeft: '5px',
      cursor: 'pointer',
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: '600',
    },
  },
  textPrimary: {
    color: '#06425c',
  },
  dataTableNew: {
    minWidth: '1360px !important',
  },
  TableToolbar: {
    display: 'none',
  },
  pLTen: {
    marginLeft: '5px',
  },
  mTtop15: {
    marginTop: '15px',
  },
  mTtop20: {
    marginTop: '20px',
  },
  mTtop30: {
    marginTop: '30px',
  },
  marginTopBottom: {
    marginBottom: '16px',
    borderRadius: '8px',
  },
  searchHeaderTop: {
    border: '1px solid #f1f1f1',
    backgroundColor: '#ffffff',
    padding: '0px 16px',
    borderRadius: '5px',
    marginTop: '20px',
  },
  greyBg: {
    backgroundColor: '#f3f3f3',
  },
  AppBarHeader: {
    color: 'inherit',
    backgroundColor: '#f7f7f7',
    border: '1px solid #e4e4e4',
    padding: '0px 16px 0px 10px',
    borderRadius: '8px',
  },
  buttonsNewChild: {
    borderRadius: '5px',
    backgroundColor: '#23343e',
    color: '#ffffff',
  },
  padd10: {
    padding: '10px 10px 10px 10px',
  },
  sepHeightTen: {
    borderLeft: '3px solid #cccccc',
    height: '8px',
    verticalAlign: 'middle',
    margin: '15px 15px 15px 8px',
    fontSize: '10px',
  },
  sepHeightOne: {
    borderLeft: '3px solid #cccccc',
    height: '8px',
    verticalAlign: 'middle',
    margin: '15px',
    fontSize: '10px',
  },
  mright5: {
    marginRight: '5px',
    color: '#a7a7a7',
  },
  iconColor: {
    color: '#a7a7a7',
  },
  floatR: {
    float: 'right',
    textTransform: 'capitalize',
  },
  iconteal: {
    color: '#06425c',
    fontSize: '28px',
  },
  listHeadColor: { backgroundColor: '#fafafa', },
  marginTopBottom: {
    '& .MuiTypography-h6 .MuiTypography-h5': {
      fontFamily: 'Montserrat-Medium',
    },
  },
  textRight: {
    textAlign: 'right',
  },
  userImage: {
    height: '56px',
    width: '58px',
  },
  mrFifteen: {
    marginRight: '15px',
  },
  card: {
    boxShadow: '0px 0px 2px #ccc',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  title: {
    fontSize: '20px',
    fontFamily: 'Montserrat !important',
    color: '#06425c',
  },
  pr0: { paddingRight: '0px !important', },
}));

function Actions() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [incidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);

  const handelView = (e) => {
    setListToggle(false);
  };
  const handelViewTabel = (e) => {
    setListToggle(true);
  };

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   Data for the table view
  const columns = ['Number', 'Type', 'Schedule', 'Status', 'Requested by', 'Date submitted', 'Date approved', 'Approved by'];

  const data = [
    ['AT-125-256-251', 'Action', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'Action', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'Action', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'Action', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
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
  };
  //dialog
  const [MyFavopen, setMyFavOpen] = React.useState(false);

  const handleMyFavClickOpen = () => {
    setMyFavOpen(true);
  };

  const handleMyFavClose = () => {
    setMyFavOpen(false);
  };
  const classes = useStyles();

  return (
    <>
      <Box>

        <Grid className={classes.marginTopBottom}>
          {listToggle == false ? (
            <div>
              <div className="gridView">

                <Card variant="outlined" className={classes.card}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3} alignItems="flex-start">
                          <Grid item sm={12} xs={12} className={classes.listHeadColor}>
                            <Grid container spacing={3} alignItems="flex-start">
                              <Grid item md={10} sm={8} xs={12} className={classes.pr0}>
                                <Typography
                                  className={classes.title}
                                >
                                  Exposure to dangerous chemicals or toxins
                                </Typography>
                                <Typography
                                  display="inline"
                                  className={classes.listingLabelName}
                                >
                                  Number: <span><Link
                                    href="/app/pages/actions/actionsummary"
                                    variant="h6"
                                    className={classes.mLeftfont}
                                  >
                                    <span className={classes.listingLabelValue}>AT-182-252-36</span>
                                  </Link></span>
                                </Typography>
                                <span item xs={1} className={classes.sepHeightOne}></span>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  display="inline"
                                  color="textPrimary"
                                  className={classes.listingLabelName}
                                >
                                  Category: <span className={classes.listingLabelValue}>HSE incident Action</span>
                                </Typography>
                                <span item xs={1} className={classes.sepHeightOne}></span>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  display="inline"
                                  color="textPrimary"
                                  className={classes.listingLabelName}
                                >
                                  Assignee: <span className={classes.listingLabelValue}>Ajay chauhan</span>
                                  <span item xs={1} className={classes.sepHeightOne}></span>
                                  Stage: <span className={classes.listingLabelValue}>In Progress <img src={in_progress_small} className={classes.smallImage} /></span>
                                  <span item xs={1} className={classes.sepHeightOne}></span>
                                  Status: <span className={classes.listingLabelValue}>Completed <img src={completed_small} className={classes.smallImage} /></span>
                                </Typography>

                              </Grid>


                              <Grid item md={2} sm={4} xs={12}>
                                <Button className={classes.floatR}>
                                  <img src={paceLogoSymbol} className={classes.userImage} /> Prakash
                                </Button>
                                {/* <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                              >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                              </Menu> */}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sm={12} xs={12}>
                        <Grid container spacing={3}>
                          <Grid item md={3} sm={6} xs={12}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              color="textPrimary"
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
                              color="textPrimary"
                              gutterBottom
                              className={classes.listingLabelName}
                            >
                              Location:
                            </Typography>
                            <Typography

                              className={classes.listingLabelValue}
                            >
                              Delhi
                            </Typography>
                          </Grid>

                          <Grid item md={3} sm={6} xs={12}>
                            <Typography
                              variant="body1"
                              color="textPrimary"
                              gutterBottom
                              className={classes.listingLabelName}
                            >
                              Reported on:
                            </Typography>

                            <Typography

                              className={classes.listingLabelValue}
                            >
                              24 6 2021
                            </Typography>
                          </Grid>

                          <Grid item md={3} sm={6} xs={12}>
                            <Typography
                              variant="body1"
                              color="textPrimary"
                              gutterBottom
                              className={classes.listingLabelName}
                            >
                              Reported by:
                            </Typography>

                            <Typography

                              className={classes.listingLabelValue}
                            >
                              Person
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* <Grid item sm={2} xs={12}>
                      <Typography
                        variant="h6"
                        color="textPrimary"
                      >
                        <img src={qrcode} />
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                        29 Dec 2020
                      </Typography>
                    </Grid> */}
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions className={Incidents.cardActions}>
                    <Grid
                      container
                      spacing={2}
                      justify="flex-end"
                      alignItems="left"
                    >
                      <Grid item xs={12} md={5} sm={12} className={classes.pt15}>
                        <Typography
                          variant="body1"
                          display="inline"
                          color="textPrimary"

                        >
                          <AttachmentIcon className={classes.mright5} />
                          Attachments:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          <Link href="#" color="secondary" className={classes.mLeftR5}>3</Link>
                        </Typography>
                        <span item xs={1} className={classes.sepHeightTen}></span>
                        <Typography
                          variant="body1"
                          display="inline"
                          color="textPrimary"
                          className={classes.mLeft}
                        >
                          <InsertCommentOutlinedIcon className={classes.mright5} />
                          Comments:
                        </Typography>
                        <Typography variant="body2" display="inline" className={classes.mLeft}>
                          <Link href="#" color="secondary" className={classes.mLeft}>3</Link>
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={7} md={7} sm={12} className={classes.textRight}>
                        <div className={classes.floatR}>
                          <Typography variant="body1" display="inline">
                            <WifiTetheringIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Network View</Link>
                          </Typography>
                          <span item xs={1} className={classes.sepHeightTen}></span>
                          <Typography variant="body1" display="inline">
                            <PrintOutlinedIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Print</Link>
                          </Typography>
                          <span item xs={1} className={classes.sepHeightTen}></span>
                          <Typography variant="body1" display="inline">
                            <Share className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Share</Link>
                          </Typography>
                          <span item xs={1} className={classes.sepHeightTen}></span>
                          <Typography variant="body1" display="inline">
                            <Link href="#" className={classes.mLeftR5}><DeleteForeverOutlinedIcon className={classes.iconteal} /></Link>
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>

              </div>
              <div>
                <Dialog
                  open={MyFavopen}
                  onClose={handleMyFavClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"My Favorite Package"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <img src={paceLogoSymbol} className={classes.userImage} /> Prakash

                      <span className={classes.floatR}><BackspaceOutlinedIcon /></span>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                      <Typography
                        variant="subtitle1"
                        display="inline"
                      >
                        <a href="#" >Sparing philosophy</a>
                      </Typography>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                      <Typography
                        variant="body1"
                      >
                        Prakash
                      </Typography>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                      <Typography
                        variant="body1"
                      >
                        Sparing philosophy defined
                      </Typography>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleMyFavClose} color="primary" variant="contained" autoFocus>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
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
                                label="Admin"
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Typography

                              // display="inline"
                              // color="textPrimary"
                              // className={classes.listingLabelValue}
                              >
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
                                252-525-256
                              </Link>
                            </Typography>

                            <Chip
                              variant="outlined"
                              label="Initial Action"
                              color="primary"
                              size="small"
                            />

                            <Typography
                              variant="body1"
                              // color="textPrimary"
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
                            color="textPrimary"
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
                            color="textPrimary"
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
                            color="textPrimary"
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
                            color="textPrimary"
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
                        <Grid item xs={6} md={3}>
                          <Typography
                            variant="body2"
                            display="inline"
                            className={Incidents.actionsLabel}
                          >
                            <AttachmentIcon />
                            {' '}
                            Comments:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            <Link href="#" className={classes.mLeft}>3</Link>
                          </Typography>
                        </Grid>

                        <Grid item xs={6} md={3}>
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
                        <Grid item xs={6} md={3}>
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

                        <Grid item xs={6} md={3} alignItems="right">
                          <Button
                            size="small"
                            color="secondary"
                            startIcon={<Print />}
                            className={Incidents.actionButton}
                          >
                            Print
                          </Button>
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
            <TableContainer component={Paper}>
              <Grid component={Paper}>
                <MUIDataTable
                  title="Actions List"
                  data={data}
                  columns={columns}
                  options={options}
                  className="classes.dataTableNew"
                />
              </Grid>
            </TableContainer>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default Actions;
