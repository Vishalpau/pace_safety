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
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
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
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';
import in_progress_small from 'dan-images/in_progress_small.png';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import projectpj from 'dan-images/projectpj.png';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import Loader from "../Loader";

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


import { SELF_API, HEADER_AUTH } from '../../../utils/constants';
// react-redux
import { connect } from "react-redux";
import { projectName, company } from '../../../redux/actions/initialDetails';
import { useDispatch } from 'react-redux';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    borderRadius: '4px',
  },
  leftSide: {
    flexGrow: 1,
  },
  viewImageSection: {
    textAlign: 'center',
    '& MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-1': {
      textAlign: 'center',
      minHeight: '100px',
    },
  },
  rightSide: {
    flexGrow: 8,
    textAlign: 'right',
  },
  mb10: { marginBottom: '10px !important' },
  newIncidentButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  search: {
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
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
    ['@media (max-width:480px)']: {
      marginLeft: '3px',
      marginRight: '3px',
    },
  },
  pLeft5: {
    paddingLeft: '5px',
  },
  mLeftfont: {
    marginLeft: '2px',
    fontSize: '14px',
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87) !important',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'none',
    },
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
    fontFamily: 'Montserrat-Regular',
  },
  statusCompleted: {
    color: '#024c9a',
    fontSize: '0.88rem',
    fontFamily: 'Montserrat-Regular',
    '& a': {
      paddingLeft: '5px',
      cursor: 'pointer',
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: '600',
    },
  },
  listingLabelValue: {
    color: '#333333',
    fontSize: '0.88rem',
    fontFamily: 'Montserrat-Regular',
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

  title: {
    fontSize: '1.25rem',
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: '500',
    lineHeight: '1.6',
  },
  pt30: {
    paddingTop: '30px',

  },

  mTopThirtybtten: {
    marginTop: '0rem',
    float: 'right',
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
    ['@media (max-width:800px)']: {
      paddingTop: '55px',
    },
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
    ['@media (max-width:480px)']: {
      margin: '10px 5px 10px 5px',
    },
  },
  floatR: {
    float: 'right',
    textTransform: 'capitalize',
    ['@media (max-width:480px)']: {
      float: 'left',
    },
  },
  newIncidentButton: {
    marginTop: '20px',
    marginLeft: '5px',
  },
  Chip: {
    backgroundColor: '#eaeaea',
    borderRadius: ' 50px',
    paddingRight: '12px',
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
  iconteal: {
    color: '#06425c',
  },
  listHeadColor: { backgroundColor: '#fafafa', },
  marginTopBottom: {
    '& .MuiTypography-h6 .MuiTypography-h5': {
      fontFamily: 'Montserrat-Regular',
    },
  },
  textRight: {
    textAlign: 'right',
    ['@media (max-width:480px)']: {
      textAlign: 'left',
      padding: '0px 8px 15px 8px !important',
    },
  },
  userImage: {
    borderRadius: '50px',
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
  mrFifteen: {
    marginRight: '15px',
  },
  card: {
    boxShadow: '0px 0px 2px #ccc',
    borderRadius: '10px',
    marginBottom: '30px',
  },

  cardLinkAction: {
    width: '100%',
    float: 'left',
    padding: '14px',
    cursor: 'pointer',
    textDecoration: 'none !important',
    ['@media (max-width:800px)']: {
      paddingTop: '85px',
    }
  },
  userPictureBox: {
    position: 'absolute',
    right: '0px',
    ['@media (max-width:800px)']: {
      right: 'auto',
    },
  },
  cardContentSection: {
    position: 'relative',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      webkitBoxShadow: '0 1px 5px 2px #f0f0f0',
      boxShadow: '0 1px 5px 2px #f0f0f0',
    },
    '&:hover .MuiGrid-align-items-xs-flex-start': {
      backgroundColor: '#f0f0f0',
    },
  },
  cardBottomSection: {
    '& p': {
      ['@media (max-width:480px)']: {
        fontSize: '12px !important',
      },
    },
    // '& p': {
    //   ['@media (max-width:375px)']: { 
    //     fontSize: '12px !important',
    //   },
    // },
  },
  formControlOwnership: {
    width: '100%',
    marginBottom: '30px',
  },
  cardActionBottomBox: {
    ['@media (max-width:480px)']: {
      padding: '8px !important',
    },
  },

  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
  },
  usrProfileListBox: {
    '& ul': {
      paddingTop: '0px',
      '& li': {
        paddingLeft: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        '& div': {
          '& span': {
            display: 'inline-block',
            float: 'left',
            paddingRight: '14px',
            fontSize: '15px',
            fontWeight: '600',
          },
          '& p': {
            display: 'inline-block',
            float: 'left',
            fontSize: '15px',
          },
        },
      },
    },
  },

  viewAttachmentDialog: {
    '& .MuiDialogContent-root': {
      overflowY: 'hidden !important',
      height: '90px !important',

    },
  },
  imageSectionHeight: {
    '& .MuiDialogContent-root': {
      height: '90px !important',
      minHeight: '90px !important',
    },
  },
  viewattch1: {
    padding: '12px 30px',
    backgroundColor: '#8a9299',
    color: '#fff',
    borderRadius: '2px',
    border: '1px solid #fff',
    display: 'inline',
  },
  viewattch2: {
    padding: '12px 8px',
    backgroundColor: '#06425c',
    color: '#fff',
    borderRadius: '2px',
    border: '1px solid #fff',
    display: 'inline',
  },
  plusIcon: {
    fontSize: '32px',
    marginRight: '10px',
    color: '#06425c',
  },
  minusIcon: {
    fontSize: '32px',
    color: '#06425c',
  },
  popUpButton: {
    paddingRight: "5px",
    marginLeft: "12px",
    '& .MuiDialogActions-root, img': {
      justifyContent: 'flex-start',
    },
  },
}));

const styles = theme => ({

});
const handleAttachClose = () => {
  setAttachOpen(false);
};

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
  const [hidden, setHidden] = useState(false);
  const [searchFlha, setSeacrhFlha] = useState('');
  const [attachOpen, setAttachOpen] = useState(false);
  const [hiddenn, setHiddenn] = useState(false);
  const [openAttachment, setopenAttachment] = React.useState(false);

  const [commentsOpen, setCommentsOpen] = useState(false);

  const [myUserPOpen, setMyUserPOpen] = React.useState(false);
  const [value, setValue] = React.useState(2);

  const dispatch = useDispatch();

  const handleChangeOne = (event, newValue) => {
    setValue(newValue);
  };
  const handleMyUserPClickOpen = () => {
    setMyUserPOpen(true);
  };

  const handleMyUserPClose = () => {
    setMyUserPOpen(false);
  };

  const handleFlhaSummaryPush = async (id) => {
    localStorage.setItem("flhaId", id)
    history.push(
      "/app/pages/assesments/flhasummary/" + id
    );
  };
  const handleClickOpenAttachment = () => {
    setopenAttachment(true);
  };

  const handleCloseAttachment = () => {
    setopenAttachment(false);
  };
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
    const res = await api.get('api/v1/flhas/');
    console.log({ res: res.data.data.results.results });
    setFlhas(res.data.data.results.results);
  };
  const handleVisibility = () => {
    setAttachOpen(true);
    setHidden(!hidden);
  };
  const handleAttachClick = () => {
    setAttachOpen(!open);
  };
  const handleAttachOpen = () => {
    if (!hidden) {
      setAttachOpen(true);
    }
  };
  const handleVisibilityComments = () => {
    setCommentsOpen(true);
    setHiddenn(!hiddenn);
  };
  const handleCommentsClick = () => {
    setCommentsOpen(!open);
  };
  const handleCommentsOpen = () => {
    if (!hiddenn) {
      setCommentsOpen(true);
    }
  };
  const handleCommentsClose = () => {
    setCommentsOpen(false);
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
  const userDetails = async (compId, proId) => {
    // window.location.href = `/${tagetPage}`
    try {
      if (compId) {

        let config = {
          method: "get",
          url: `${SELF_API}`,
          headers: HEADER_AUTH,
        };
        // localStorage.setItem("loading", JSON.stringify({companyId:compId,projectId:projectId,tagetPage:tagetPage}));

        await api(config)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
              let hosting = response.data.data.results.data.companies.filter(company => company.companyId == compId)[0]
                .subscriptions.filter(subs => subs.appCode === "safety")[0]
                .hostings[0].apiDomain

              console.log(hosting)
              let data1 = {
                method: "get",
                url: `${hosting}/api/v1/core/companies/select/${compId}/`,
                headers: HEADER_AUTH,
              };
              console.log(data1)
              axios(data1).then((res) => {
                localStorage.setItem('userDetails', JSON.stringify(response.data.data.results.data))

                if (compId) {
                  let companies = response.data.data.results.data.companies.filter(item => item.companyId == compId);

                  let companeyData = { fkCompanyId: companies[0].companyId, fkCompanyName: companies[0].companyName }
                  localStorage.setItem('company', JSON.stringify(companeyData))
                  console.log("storage company in xlfha")
                  dispatch(company(companeyData))
                }
                if (proId) {
                  let companies = response.data.data.results.data.companies.filter(item => item.companyId == compId);
                  let project = companies[0].projects.filter(item => item.projectId == proId)

                  localStorage.setItem("projectName", JSON.stringify(project[0]))
                  dispatch(projectName(project[0]))
                }
                // fetchPermissionData();
                localStorage.removeItem("direct_loading")
              })


            }
          })
          .catch(function (error) {
          });
      }
    } catch (error) {
    }
  }
  useEffect(() => {

    let state = JSON.parse(localStorage.getItem('direct_loading'))
    if (state !== null) {
      console.log("hlo this xlfha");
      userDetails(state.comId, state.proId)
    } else {
      fetchData();
    }
  }, [props.projectName.projectName]);

  return (

    <>
      <PapperBlock title="Field Level Hazard Assessment" icon="ion-md-list-box" desc="">
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
                    <Box>
                      <Grid className={classes.marginTopBottom}>
                        <div className="gridView">
                          <Card variant="outlined" className={classes.card}>
                            <CardContent>
                              <Grid container spacing={3} className={classes.cardContentSection}>
                                <Grid item md={2} sm={4} xs={12}
                                  className={classes.userPictureBox}
                                >
                                  <Button className={classNames(classes.floatR)}  >
                                    <img src={item[1].avatar} className={classes.userImage} /> {item[1].username}
                                  </Button>
                                </Grid>
                                <Link
                                  onClick={() => handleFlhaSummaryPush(item[1].id)}
                                  className={classes.cardLinkAction}
                                >
                                  <Grid item xs={12}>
                                    <Grid container spacing={3} alignItems="flex-start">
                                      <Grid item sm={12} xs={12} className={classes.listHeadColor}>
                                        <Grid container spacing={3} alignItems="flex-start">
                                          <Grid item md={10} sm={12} xs={12} className={classes.pr0}>
                                            <Typography
                                              className={classes.title}
                                              variant="h6"
                                            >
                                              {item[1].jobTitle}
                                            </Typography>
                                            <Typography
                                              display="inline"
                                              className={classes.listingLabelName}
                                            >
                                              Number: <span>
                                                <Link
                                                  href={`/app/pages/assesments/flhasummary/${item[1].id}`}
                                                  variant="h6"
                                                  className={classes.mLeftfont}
                                                >
                                                  <span className={classes.listingLabelValue}>{item[1].flhaNumber}</span>
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
                                              Category: <span className={classes.listingLabelValue}>FLHA</span>
                                            </Typography>
                                            <span item xs={1} className={classes.sepHeightOne}></span>
                                            <Typography
                                              variant="body1"
                                              gutterBottom
                                              display="inline"
                                              color="textPrimary"
                                              className={classes.listingLabelName}
                                            >
                                              Assignee: <span className={classes.listingLabelValue}>NA</span>
                                              <span item xs={1} className={classes.sepHeightOne}></span>
                                              Stage: <span className={classes.listingLabelValue}>{item[1].flhaStage}  <img src={in_progress_small} className={classes.smallImage} /></span>
                                              <span item xs={1} className={classes.sepHeightOne}> </span>
                                              Status: <span className="listingLabelValue statusColor_complete">{item[1].flhaStatus}</span>
                                            </Typography>

                                          </Grid>

                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item sm={12} xs={12}>
                                    <Grid container spacing={3}>
                                      {/* <Grid item md={3} sm={6} xs={12}>
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
                                        > */}
                                          {/* {item[1]["incidentReportedByName"]} */}
                                          {/* Not found
                                        </Typography>
                                      </Grid> */}
                                      {/* <Grid item md={3} sm={6} xs={12}>
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
                                          {item[1].location}
                                        </Typography>
                                      </Grid> */}

                                      <Grid item md={3} sm={6} xs={12}>
                                        <Typography
                                          variant="body1"
                                          color="textPrimary"
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
                                          color="textPrimary"
                                          gutterBottom
                                          className={classes.listingLabelName}
                                        >
                                          Created by:
                                        </Typography>

                                        <Typography

                                          className={classes.listingLabelValue}
                                        >
                                          {item[1].createdByName}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Link>
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
                                    <span>
                                      {/* <Link href="#"
                   onClick={handleVisibility}
                   color="secondary"
                   aria-haspopup="true" 
                   className={classes.mLeftR5}
                   disable={true}
                   > */}
                                      {" " + item[1].attachmentCount}
                                      {/* </Link> */}
                                    </span>
                                  </Typography>
                                  <span item xs={1} className={classes.sepHeightTen}></span>
                                  <Typography
                                    variant="body1"
                                    display="inline"
                                    color="textPrimary"
                                    className={classes.mLeft}
                                  >
                                    <InsertCommentOutlinedIcon className={classes.mright5} />
                                    {/* <Link href="#"
                   onClick={handleVisibilityComments}
                   aria-haspopup="true"> */}
                                    Comments:
                                    {/* </Link> */}

                                  </Typography>
                                  <Typography variant="body2" display="inline" className={classes.mLeft}>
                                    <span>
                                      <Link href="#"
                                        color="secondary"
                                        aria-haspopup="true"
                                        className={classes.mLeft}>
                                        {item[1].commentsCount}
                                      </Link>
                                    </span>
                                  </Typography>
                                </Grid>

                                <Grid item xs={12} md={7} md={7} sm={12} className={classes.textRight}>
                                  <div className={classes.floatR}>
                                    {/* <Typography variant="body1" display="inline">
                <WifiTetheringIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Network View</Link>
                </Typography>
                <span item xs={1} className={classes.sepHeightTen}></span> */}
                                    <Typography variant="body1" display="inline">
                                      <PrintOutlinedIcon className={classes.iconColor} /> <Link href="/app/pages/general-observation-prints" className={classes.mLeftR5}>Print</Link>
                                    </Typography>
                                    <span item xs={1} className={classes.sepHeightTen}></span>
                                    <Typography variant="body1" display="inline"><Link href="#" className={classes.mLeftR5}><StarsIcon className={classes.iconteal} /></Link>
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
                            open={attachOpen}
                            className="paddTBRemove attactmentShowSection"
                          >
                            <Paper elevation={1} className="paperSection">
                              <Grid container spacing={3}>
                                <Grid item md={12} sm={12} xs={12}>
                                  <List>
                                    <ListItem>
                                      <img src={projectpj} onClick={handleClickOpenAttachment} className="hoverIcon" />
                                    </ListItem>
                                    <ListItem>
                                      <img src={projectpj} onClick={handleClickOpenAttachment} className="hoverIcon" />
                                    </ListItem>
                                    <ListItem>
                                      <img src={projectpj} onClick={handleClickOpenAttachment} className="hoverIcon" />
                                    </ListItem>
                                    <ListItem>
                                      <img src={projectpj} onClick={handleClickOpenAttachment} className="hoverIcon" />
                                    </ListItem>
                                    <ListItem>
                                      <img src={projectpj} onClick={handleClickOpenAttachment} className="hoverIcon" />
                                    </ListItem>
                                    <ListItem>
                                      <img src={projectpj} onClick={handleClickOpenAttachment} className="hoverIcon" />
                                    </ListItem>
                                    <ListItem>
                                      <img src={projectpj} onClick={handleClickOpenAttachment} className="hoverIcon" />
                                    </ListItem>
                                  </List>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        </div>
                        <div>
                          <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                            hidden={!hiddenn}
                            onBlur={handleCommentsClose}
                            onClick={handleCommentsClick}
                            onClose={handleCommentsClose}
                            onFocus={handleCommentsOpen}
                            onMouseEnter={handleCommentsOpen}
                            onMouseLeave={handleCommentsClose}
                            open={commentsOpen}
                            className="commentsShowSection"
                          >
                            <Paper elevation={1} className="paperSection">
                              <Grid container spacing={3}>
                                <Grid item md={12} xs={12}>
                                  <Box padding={3}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                        <TextField
                                          multiline
                                          variant="outlined"
                                          rows="1"
                                          id="JobTitle"
                                          label="Add your comments here"
                                          className="formControl"
                                        />
                                      </Grid>
                                      <Grid item xs={3}>
                                        <input type="file" />
                                      </Grid>
                                      <Grid item xs={9}>
                                        <AddCircleOutlineIcon className={classes.plusIcon} />
                                        <RemoveCircleOutlineIcon className={classes.minusIcon} />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          size="small"
                                          className="spacerRight buttonStyle"
                                          disableElevation

                                        >
                                          Respond
                                        </Button>
                                        <Button
                                          variant="contained"
                                          color="secondary"
                                          size="small"
                                          className="buttonStyle custmCancelBtn"
                                          disableElevation

                                        >
                                          Cancel
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        </div>
                        <div>
                          <Dialog
                            open={openAttachment}
                            onClose={handleCloseAttachment}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            classNames={classes.viewAttachmentDialog}
                          >
                            <DialogTitle id="alert-dialog-title">Viw Attachment</DialogTitle>
                            <DialogContent classNames={classes.imageSectionHeight}>
                              <Grid container spacing={3} classNames={classes.viewImageSection}>
                                <Grid item md={12} sm={12} xs={12} classNames={classes.mb10}>
                                  <ul classNames={classes.viewImageSection}>
                                    <li className={classes.viewattch1}>View Attachment</li>
                                    <li className={classes.viewattch2}>Download Attachment</li>
                                  </ul>
                                </Grid>
                              </Grid>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseAttachment} color="primary" autoFocus>
                                Close
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                        <Dialog
                          open={myUserPOpen}
                          onClose={handleMyUserPClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          fullWidth={true}
                          maxWidth={'sm'}
                        >
                          <DialogTitle classNames={classes.mb10} id="alert-dialog-title"><img src={paceLogoSymbol} className={classes.userImage} /> {"Admin"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              <Grid
                                item md={12} sm={12} xs={12}
                                className={classes.usrProfileListBox}
                              >
                                <h6>Change ownership</h6>
                                <FormControl variant="outlined" className={classes.formControlOwnership}>
                                  <InputLabel id="demo-simple-select-outlined-label">Ownership</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Ashutosh"
                                    onChange={handleChangeOne}
                                    label="Ownership"
                                  >
                                    <MenuItem value={10}>Self</MenuItem>
                                    <MenuItem value={10}>Prakash</MenuItem>
                                    <MenuItem value={20}>Ashutosh</MenuItem>
                                    <MenuItem value={30}>Saddam</MenuItem>
                                    <MenuItem value={30}>Sunil</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid
                                item md={12} sm={12} xs={12}
                                className={classes.usrProfileListBox}
                              >
                                <h3>Basic information</h3>
                                <List>
                                  <ListItem>
                                    {/* <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar> */}
                                    <ListItemText primary="Full Name:" secondary="Prakash" />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText primary="Organization Type:" secondary="Epc ORGANIZATION" />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText primary="Organization Role:" secondary="N/A" />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText primary="Role Title:" secondary="N/A" />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText primary="Current Location:" secondary="Delhi » NCT » India" />
                                  </ListItem>
                                </List>
                              </Grid>

                              <Grid
                                item md={12} sm={12} xs={12}
                                className={classes.usrProfileListBox}
                              >
                                <h3>Company information</h3>
                                <List>
                                  <ListItem>
                                    <ListItemText primary="Company Name:" secondary="JWIL" />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText primary="Location:" secondary="Italy" />
                                  </ListItem>
                                </List>
                              </Grid>
                            </DialogContentText>
                          </DialogContent>
                          <Grid item md={12} sm={12} xs={12} className={classes.popUpButton}>
                            <DialogActions align="left" className="marginB10">
                              <Button onClick={handleMyUserPClose} color="secondary" variant="contained" className="buttonStyle custmCancelBtn">
                                Close
                              </Button>
                            </DialogActions>
                          </Grid>
                          {/* <DialogActions>
            <Button onClick={handleMyUserPClose} className="buttonStyle custmCancelBtn" variant="contained" autoFocus>
              Close
            </Button>
          </DialogActions> */}
                        </Dialog>

                      </Grid>


                    </Box>

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
        {/* <Loader /> */}
      </PapperBlock>


    </>

  );
}

// export default Actions;
const mapStateToProps = state => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state

  }
}

export default connect(mapStateToProps, null)(xflha);
