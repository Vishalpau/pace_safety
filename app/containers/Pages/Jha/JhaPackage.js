import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
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
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Incidents from 'dan-styles/IncidentsList.scss';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import MUIDataTable from 'mui-datatables';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import MenuItem from '@material-ui/core/MenuItem';
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';
import completed_small from 'dan-images/completed-small.png';
import projectpj from 'dan-images/projectpj.png';
import in_progress_small from 'dan-images/in_progress_small.png';
import "../../../styles/custom/customheader.css";
import StarsIcon from '@material-ui/icons/Stars';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { useHistory, useParams } from 'react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from "react-redux";
import api from "../../../utils/axios";
import { handelCommonObject } from "../../../utils/CheckerValue";
import Loader from "../Loader";

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
  pagination: {
    padding: "0px 0px 20px 0px",
    display: "flex",
    justifyContent: "flex-end",
    marginTop : '-10px',
  },
}));

function JhaPackage(props) {
  const [cardView, setCardView] = useState(true);
  const [allJHAData, setAllJHAData] = useState([])
  const search = props.search
  const status = props.status
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0)
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1)
  const [openAttachment, setopenAttachment] = React.useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleClickOpenAttachment = () => {
    setopenAttachment(true);
  };

  const handleCloseAttachment = () => {
    setopenAttachment(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const fetchData = async () => {
    await setIsLoading(false);
    await setPage(1)
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
    const createdBy = JSON.parse(localStorage.getItem('userDetails')) !== null
        ? JSON.parse(localStorage.getItem('userDetails')).id
        : null;
    let struct = "";
    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);

    if(props.assessment === "My Assessments"){
      const res = await api.get(`api/v1/jhas/?search=${props.search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&jhaStatus=${status}`);
  
      const result = res.data.data.results.results
      await setAllJHAData(result)
      await setTotalData(res.data.data.results.count)
      await setPageData(res.data.data.results.count / 25)
      let pageCount = Math.ceil(res.data.data.results.count / 25)
      await setPageCount(pageCount)
    }else{
      const res = await api.get(`api/v1/jhas/?search=${props.search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&jhaStatus=${status}`);
  
      const result = res.data.data.results.results
      await setAllJHAData(result)
      await setTotalData(res.data.data.results.count)
      await setPageData(res.data.data.results.count / 25)
      let pageCount = Math.ceil(res.data.data.results.count / 25)
      await setPageCount(pageCount)
    }
    // handelTableView(result)

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
    const createdBy = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).id
    : null;
    if(props.observation === "My Assessments"){
      const res = await api.get(`api/v1/jhas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&jhaStatus=${status}&page=${value}`);
        await setAllJHAData(res.data.data.results.results);
        await setPage(value)
    }else{
      const res = await api.get(`api/v1/jhas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&jhaStatus=${status}&page=${value}`);
      await setAllJHAData(res.data.data.results.results);
      await setPage(value)
    }
  };

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

  const handleChangeOne = (event, newValue) => {
    setValue(newValue);
  };

  //dialog
  const [MyFavopen, setMyFavOpen] = React.useState(false);

  const handleMyFavClickOpen = () => {
    setMyFavOpen(true);
  };

  const handleMyFavClose = () => {
    setMyFavOpen(false);
  };

  const [myUserPOpen, setMyUserPOpen] = React.useState(false);

  const handleMyUserPClickOpen = () => {
    setMyUserPOpen(true);
  };

  const handleMyUserPClose = () => {
    setMyUserPOpen(false);
  };

  const classes = useStyles();

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
  const handleAttachClose = () => {
    setAttachOpen(false);
  };

  //view comments
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [hiddenn, setHiddenn] = useState(false);

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

  const handleSummaryPush = async (selectedJha) => {

    const jha = selectedJha

    localStorage.setItem("fkJHAId", jha.id)
    handelCommonObject("commonObject", "jha", "projectStruct", jha.fkProjectStructureIds)
    localStorage.removeItem('JSAAssessments')
    localStorage.removeItem('JSAApproval')
    localStorage.removeItem('JSAlessonsLearned')
    history.push(`/app/pages/jha/jha-summary/${jha.id}`);
  };

  const handleDelete = async (item) => {
    let data = item
    // let id = item[1].id
    data.status = "Delete"
    delete data.jhaAssessmentAttachment
    await setIsLoading(false)
    const res1 = await api.put(`/api/v1/jhas/${data.id}/`, data).then(response => fetchData()).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [props.projectName.breakDown,props.search,props.assessment,props.status])

  return (
    <>
    {isLoading ? 
      <Box>
      
       { allJHAData.length > 0 ? allJHAData.map((value) => (
          <Grid className={classes.marginTopBottom}>

            <div className="gridView">
              <Card variant="outlined" className={classes.card}>
                <CardContent>
                  <Grid container spacing={3} className={classes.cardContentSection}>
                    <Grid item md={2} sm={4} xs={12}
                      className={classes.userPictureBox}
                    >
                      <Button className={classNames(classes.floatR)}
                      //  onClick={(e) => handleMyUserPClickOpen(e)}
                        >
                        <img src={value["avatar"]} className={classes.userImage} /> {value["username"]}
                      </Button>
                    </Grid>
                    <Link
                      onClick={() => handleSummaryPush(value)}
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
                                  {value["description"]}
                                </Typography>
                                <Typography
                                  display="inline"
                                  className={classes.listingLabelName}
                                >
                                  Number: <span>
                                    <Link
                                      onClick={() => handleSummaryPush()}
                                      variant="h6"
                                      className={classes.mLeftfont}
                                    >
                                      <span className={classes.listingLabelValue}>{value["jhaNumber"]}</span>
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
                                  Category: <span className={classes.listingLabelValue}>{value["jhaNumber"].split("-")[0]}</span>
                                </Typography>
                                <span item xs={1} className={classes.sepHeightOne}></span>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  display="inline"
                                  color="textPrimary"
                                  className={classes.listingLabelName}
                                >
                                  Stage: <span className={classes.listingLabelValue}>{value["jhaStage"]}<img src={in_progress_small} className={classes.smallImage} /></span>
                                  <span item xs={1} className={classes.sepHeightOne}></span>
                                  Status: <span className="listingLabelValue statusColor_complete">{value["jhaStatus"]}</span>
                                </Typography>

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
                              color="textPrimary"
                              gutterBottom
                              className={classes.listingLabelName}
                            >
                              Location:
                            </Typography>
                            <Typography

                              className={classes.listingLabelValue}
                            >
                              {value["location"]}
                            </Typography>
                          </Grid>

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
                              {value["jhaAssessmentDate"]}
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
                              {value["createdByName"]}
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
                          <Link href="#"
                            // onClick={handleVisibility}
                            color="secondary"
                            aria-haspopup="true"
                            className={classes.mLeft}>
                            {value["attachmentCount"]}
                          </Link>
                        </span>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span>
                      {/* <Typography
                        variant="body1"
                        display="inline"
                        color="textPrimary"
                        className={classes.mLeft}
                      >
                        <InsertCommentOutlinedIcon className={classes.mright5} />
                        <Link href="#"
                          onClick={handleVisibilityComments}
                          aria-haspopup="true">
                          Comments:
                        </Link>

                      </Typography>
                      <Typography variant="body2" display="inline" className={classes.mLeft}>
                        <span>
                          <Link href="#"
                            color="secondary"
                            aria-haspopup="true"
                            className={classes.mLeft}>
                            {value["commentsCount"]}
                          </Link>
                        </span>
                      </Typography> */}
                    </Grid>

                    <Grid item xs={12} md={7} md={7} sm={12} className={classes.textRight}>
                      <div className={classes.floatR}>
                        {/* <Typography variant="body1" display="inline">
                      <WifiTetheringIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Network View</Link>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span> */}
                        {/* <Typography variant="body1" display="inline">
                          <PrintOutlinedIcon className={classes.iconColor} /> <Link href="/app/pages/general-observation-prints" className={classes.mLeftR5}>Print</Link>
                        </Typography>
                        <span item xs={1} className={classes.sepHeightTen}></span>
                        <Typography variant="body1" display="inline"><Link href="#" className={classes.mLeftR5}><StarsIcon className={classes.iconteal} /></Link>
                        </Typography> */}
                        <span item xs={1} className={classes.sepHeightTen}></span>
                        <Typography variant="body1" display="inline">
                          <Link href="#" className={classes.mLeftR5}><DeleteForeverOutlinedIcon className={classes.iconteal} onClick={(e) => handleDelete(value)} /></Link>
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
                  <Button onClick={handleMyUserPClose} className="custmCancelBtn" variant="contained" autoFocus>
                    Close
                  </Button>
                </DialogActions> */}
            </Dialog>

            
          </Grid>
        )) : <Typography className={classes.sorryTitle} variant="h6" color="primary" noWrap>
                      Sorry, no matching records found
                    </Typography>}

        <div className={classes.pagination}>
          {totalData != 0 ?  Number.isInteger(pageData) !== true ? totalData < 25*page ? `${page*25 -24} - ${totalData} of ${totalData}` : `${page*25 -24} - ${25*page} of ${totalData}`  : `${page*25 -24} - ${25*page} of ${totalData}` : null}
                <Pagination count={pageCount} page={page} onChange={handleChange} />
              </div> 

      </Box>
      : <Loader/>}
    </>
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
)(JhaPackage);