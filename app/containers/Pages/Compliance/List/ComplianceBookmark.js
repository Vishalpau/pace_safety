import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import Share from '@material-ui/icons/Share';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Incidents from 'dan-styles/IncidentsList.scss';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import MUIDataTable from 'mui-datatables';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';
import { useHistory, useParams } from 'react-router';
//import "../../../styles/custom/customheader.css";
import StarsIcon from '@material-ui/icons/Stars';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

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
    cursor: 'pointer',
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
  TableToolbar : {
    display: 'none',
  },
  pLTen : {
    marginLeft: '5px',
  },
  mTtop15 : {
    marginTop: '15px',
  },  
  mTtop20 : {
    marginTop: '20px',
  },  
  mTtop30 : {
    marginTop: '30px',
  },
  marginTopBottom : {
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
padd10:  {
  padding: '10px 10px 10px 10px',
},
sepHeightTen: {
  borderLeft: '3px solid #cccccc',
  height: '8px',
  verticalAlign:'middle',
  margin: '15px 15px 15px 8px',
  fontSize: '10px',
},
sepHeightOne: {
  borderLeft: '3px solid #cccccc',
  height: '8px',
  verticalAlign:'middle',
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
listHeadColor: {backgroundColor: '#fafafa',},
marginTopBottom: {
	'& .MuiTypography-h6 .MuiTypography-h5': {
		fontFamily: 'Montserrat-Medium',
	},
},
textRight:{
  textAlign: 'right',
},
userImage: {
  borderRadius: '50px',
  width: '48px',
  height: '48px',
  marginRight: '10px',
},
mrFifteen: {
  marginRight: '15px',
},
card: {
  boxShadow: '0px 0px 2px #ccc',
  borderRadius: '10px',
  marginBottom: '30px',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    webkitBoxShadow: '0 1px 5px 2px #dcdada',
    boxShadow: '0 1px 5px 2px #dcdada',
  },
  '&:hover .MuiGrid-align-items-xs-flex-start': {
    backgroundColor: '#f0f0f0',
  },
},
title:  {
  fontSize: '20px',
  fontFamily: 'Montserrat !important',
  color: '#06425c',
},
pr0: {paddingRight:'0px !important',},
}));

function ComplianceBookmark() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [incidents] = useState([]);
  // const [listToggle, setListToggle] = useState(false);

  // const handelView = (e) => {
  //   setListToggle(false);
  // };
  // const handelViewTabel = (e) => {
  //   setListToggle(true);
  // };

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

  const handleSummaryPush = async () => {
    history.push(
      "/app/pages/compliance/compliance-summary"
    );
  };

  const classes = useStyles();

  return (
    <>
      <Box>
        
        <Grid className={classes.marginTopBottom}>
          <div>
            <div className="gridView">

              <Card variant="outlined" className={classes.card}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3} alignItems="flex-start">
                      <Grid item sm={12} xs={12} className={classes.listHeadColor}>
                          <Grid container spacing={3} alignItems="flex-start">
                            <Grid item sm={10} xs={12}>
                              <Typography
                                variant="h6"
                              >
                                Exposure to dangerous chemicals or toxins
                              </Typography>
                              <Typography
                                className={classes.listingLabelName}
                                display="inline"
                              >
                                Number: <span><Link
                                  onClick={() => handleSummaryPush()}
                                  //href="/app/pages/actions/actionsummary"
                                  variant="h6"
                                  className={classes.mLeftfont}
                                >
                                <span className={classes.listingLabelValue}>CL-182-252-36</span>
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
                                Category: <span className={classes.listingLabelValue}>Contractor compliance check</span>
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
                                Status: <span className={classes.listingLabelValue}>Assigned</span>
                              </Typography>
                            
                            </Grid>
                            

                            <Grid item md={2} sm={4} xs={12}>
                              <Button  className={classes.floatR}>
                                <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                              </Button>
                            </Grid>
                            </Grid>
                          </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                    <Grid container spacing={3}>  
                    <Grid item sm={3} xs={12}>
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
                    <Grid item sm={3} xs={12}>
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

                    <Grid item sm={3} xs={12}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        gutterBottom
                        className={classes.listingLabelName}
                      >
                        Audited on:
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                        24 6 2021
                      </Typography>
                    </Grid>

                    <Grid item sm={3} xs={12}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        gutterBottom
                        className={classes.listingLabelName}
                      >
                        Audited by:
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                        Person
                      </Typography>
                    </Grid>
                    {/* <Grid item sm={3} xs={12}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        gutterBottom
                        className={classes.listingLabelName}
                      >
                        Planned start date:
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                        26 Dec 2020
                      </Typography>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        gutterBottom
                        className={classes.listingLabelName}
                      >
                        Planned finish date:
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                        02 Jan 2021
                      </Typography>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        gutterBottom
                        className={classes.listingLabelName}
                      >
                        Forecast start date:
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                        26 Dec 2020
                      </Typography>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        gutterBottom
                        className={classes.listingLabelName}
                      >
                        Forecast finish date:
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                        29 Dec 2020
                      </Typography>
                    </Grid> */}
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
                    <Grid item xs={12} sm={9}>
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

                    <Grid item xs={6} sm={3} align="right">
                    <Typography variant="body1" display="inline">
                      <IconButton><PrintOutlinedIcon className={classes.iconteal} /></IconButton> <Link href="/app/pages/general-observation-prints" className={classes.mLeftR5}></Link>
                      </Typography>
                      {/* <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body2" display="inline">
                      <Share className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Share</Link>
                      </Typography> */}
                      {/* <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body2" display="inline">
                      <Link href="#" className={classes.mLeftR5}><StarsIcon className={classes.iconteal} /></Link>
                      </Typography> */}
                      <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body1" display="inline">
                      <Link href="#" className={classes.mLeftR5}><DeleteForeverOutlinedIcon className={classes.iconteal} /></Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>

            </div>
          </div>
        </Grid>  
      </Box>
    </>
  );
}

export default ComplianceBookmark;
