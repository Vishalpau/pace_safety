import React, { useState, useEffect } from 'react';
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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';
import completed_small from 'dan-images/completed-small.png';
import in_progress_small from 'dan-images/in_progress_small.png';
import preplanning from 'dan-images/preplanning.png';
import '../../../styles/custom/customheader.css';
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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Fonts from 'dan-styles/Fonts.scss';
import moment from 'moment';

import api from "../../../utils/axios";
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import { handelCommonObject } from "../../../utils/CheckerValue"
import Loader from "../Loader"
import { checkACL } from '../../../utils/helper';
import Attachment from '../../Attachment/Attachment';
import Delete from '../../Delete/Delete'

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
    '&:hover': {
      cursor: 'pointer'
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
    marginTop: '-10px',
  },
}));

function AhaPackage(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const [cardView, setCardView] = useState(true);
  const [tableView, setTableView] = useState(false);
  const [allAHAData, setAllAHAData] = useState([])
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0)
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [checkDeletePermission, setCheckDeletePermission] = useState(false);
  const [deleteQ, setDeleteQ] = useState(false);
  const [deleteValue, setDeleteValue] = useState("")

  const search = props.search
  const status = props.status
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClickDeleteAlert = (value) => {
    console.log(value, 'value')
    setDeleteQ(true);
    setDeleteValue(value);
    // handleDelete(value);
  };

  const getFromChid = (value) => {
    setDeleteValue(value)
  }

  const handleCloseDeleteAlert = () => {
    setDeleteQ(false);
    setDeleteValue("");
  };

  useEffect(() => {
    console.log(allAHAData, 'allAHahData');
  }, [allAHAData]);

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const [incidents] = useState([]);
  // const [listToggle, setListToggle] = useState(false);

  // const handelView = (e) => {
  //   setListToggle(false);
  // };
  // const handelViewTabel = (e) => {
  //   setListToggle(true);
  // };

  // const [value, setValue] = React.useState(2);

  //dialog
  const [MyFavopen, setMyFavOpen] = React.useState(false);
  const [myUserPOpen, setMyUserPOpen] = React.useState(false);

  const handleMyUserPClickOpen = () => {
    setMyUserPOpen(true);
  };
  const handleMyUserPClose = () => {
    setMyUserPOpen(false);
  };

  // const handleSummaryPush = async () => {
  //   history.push(
  //     "/app/pages/aha/aha-summary/"
  //   );
  // };

  const handleSummaryPush = async (index) => {
    console.log(index, 'index');
    const id = allAHAData[index].id;
    console.log(id, 'id');
    const fkProjectStructureIds = allAHAData[index].fkProjectStructureIds
    localStorage.setItem('fkAHAId', id)
    handelCommonObject("commonObject", "aha", "projectStruct", fkProjectStructureIds)
    localStorage.removeItem('Assessments')
    localStorage.removeItem('Approval')
    localStorage.removeItem('lessonsLearned')
    history.push(
      `/app/pages/aha/aha-summary/${id}`
    );
  };

  const handleNewAhaPush = async () => {
    localStorage.removeItem('fkAHAId')
    history.push(
      "/app/pages/aha/assessments/project-details"
    );
  };

  // const fetchAllAHAData = async () => {
  //   const res = await api.get("/api/v1/ahas/")
  //   const result = res.data.data.results.results

  //   await setAllAHAData(result)
  //   // await handelTableView(result)
  // }


  const fetchAllAHAData = async () => {
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
    if (props.assessments === "My Assessments") {
      const res = await api.get(`api/v1/ahas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&ahaStatus=${status}&createdBy=${createdBy}`);
      const result = res.data.data.results.results
      await setAllAHAData(result)
      await setTotalData(res.data.data.results.count)
      await setPageData(res.data.data.results.count / 25)
      let pageCount = Math.ceil(res.data.data.results.count / 25)
      await setPageCount(pageCount)
    } else {
      const res = await api.get(`api/v1/ahas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&ahaStatus=${status}`);
      const result = res.data.data.results.results
      await setAllAHAData(result)
      await setTotalData(res.data.data.results.count)
      await setPageData(res.data.data.results.count / 25)
      let pageCount = Math.ceil(res.data.data.results.count / 25)
      await setPageCount(pageCount)
    }


    await setIsLoading(true)
  };

  const handleChange = async (event, value) => {
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
    if (props.assessments === "My Assessments") {
      const res = await api.get(`api/v1/ahas/?search=${props.search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&ahaStatus=${status}&createdBy=${createdBy}&page=${value}`);
      setAllAHAData(res.data.data.results.results);
      setPage(value)
    } else {
      const res = await api.get(`api/v1/ahas/?search=${props.search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&ahaStatus=${status}&page=${value}`);
      setAllAHAData(res.data.data.results.results);
      setPage(value)
    }
  };

  const handleDelete = async () => {
    // let temp = { ...deleteValue }
    let temp = {
      fkCompanyId: deleteValue.fkCompanyId,
      fkProjectId: deleteValue.fkProjectId,
      fkProjectStructureIds: deleteValue.fkProjectStructureIds,
      location: deleteValue.location,
      assessmentDate: deleteValue.assessmentDate,
      permitToPerform: deleteValue.permitToPerform,
      description: deleteValue.description,
      classification: deleteValue.classification,
      createdBy: deleteValue.createdBy,
      status: "Delete"
    }
    // temp.status = "Delete";
    let id = deleteValue.id;
    console.log(temp);
    setIsLoading(false);
    const res = await api.put(`/api/v1/ahas/${id}/`, temp)
      .then((response) => {
        fetchAllAHAData();
        handleCloseDeleteAlert()
      })
      .catch((error) => console.log(error));
  };

  //Assigning 'classes' to useStyles()
  const classes = useStyles();

  useEffect(() => {
    fetchAllAHAData()
    setCheckDeletePermission(checkACL('safety-aha', 'delete_aha'));
    // handleProjectList()
  }, [props.projectName.breakDown, props.search, props.assessments, props.status])


  const AllCardData = (item, index) => {
    const [showGrid, setShowGrid] = useState(false);
    const [hidden, setHidden] = useState(false);

    function handleVisibility() {
      setShowGrid(true);
      setHidden(!hidden);
    };

    function handleAttachClose() {
      setShowGrid(false);
    };

    function handleAttachClick() {
      setShowGrid(!open);
    };

    function handleAttachOpen() {
      if (!hidden) {
        setShowGrid(true);
      }
    }
    return (
      <>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Grid container spacing={3} className={classes.cardContentSection}>
              <Grid item md={2} sm={4} xs={12}
                className={classes.userPictureBox}
              >
                <Button className={classes.floatR} onClick={(e) => handleMyUserPClickOpen(e)} >
                  <img src={item.item.avatar !== null ? item.item.avatar : paceLogoSymbol} className={classes.userImage} /> {item.item.username}
                </Button>
              </Grid>
              <Link
                onClick={(e) => handleSummaryPush(item.index)}
                className={classes.cardLinkAction}
              >
                <Grid item xs={12}>
                  <Grid container spacing={3} alignItems="flex-start">
                    <Grid item sm={12} xs={12} className={classes.listHeadColor}>
                      <Grid container spacing={3} alignItems="flex-start">
                        <Grid item md={10} sm={12} xs={12}>
                          <Typography
                            className={classes.title}
                            variant="h6"
                          >
                            {item.item.description}
                          </Typography>
                          <Typography
                            display="inline"
                            className={classes.listingLabelName}
                          >
                            Number: <span><Link
                              onClick={(e) => handleSummaryPush(item.index)}
                              variant="h6"
                              className={classes.mLeftfont}
                            >
                              <span className={classes.listingLabelValue}>{item.item.ahaNumber}</span>
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
                            Category: <span className={classes.listingLabelValue}>AHA</span>
                          </Typography>
                          <span item xs={1} className={classes.sepHeightOne}></span>
                          <Typography
                            variant="body1"
                            gutterBottom
                            display="inline"
                            color="textPrimary"
                            className={classes.listingLabelName}
                          >
                            Stage: <span className={classes.listingLabelValue}>{item.item.ahaStage} <img src={item.ahaStage === "Open" ? preplanning : completed_small} className={classes.smallImage} /></span>
                            <span item xs={1} className={classes.sepHeightOne}></span>
                            Status: <span className={classes.listingLabelValue}>{item.item.ahaStatus} <img src={item.ahaStatus === "Open" ? preplanning : completed_small} className={classes.smallImage} /></span>
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
                        gutterBottom
                        color="textPrimary"
                        className={classes.listingLabelName}
                      >
                        Work area:
                      </Typography>

                      <Typography
                        gutterBottom
                        className={classes.listingLabelValue}
                      >
                        {/* {item[1]["incidentReportedByName"]} */}
                        {item.workArea}
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
                        {item.item.location}
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
                        {moment(item.item.createdAt).format(
                          "Do MMMM YYYY, h:mm:ss a"
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
                        {item.item.createdByName}
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
                    <Link
                      // href="#"
                      onClick={item.item.attachmentCount && handleVisibility}
                      color="secondary"
                      aria-haspopup="true"
                      className={classes.mLeftR5}
                    >
                      {item.item.attachmentCount}
                    </Link>
                  </span>
                </Typography>
                {/* <span item xs={1} className={classes.sepHeightTen}></span>
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
                        <Link href="#" color="secondary" className={classes.mLeft}>{item[1].commentsCount}</Link>
                      </Typography> */}
              </Grid>

              <Grid item xs={12} md={7} sm={12} className={classes.textRight}>
                <div className={classes.floatR}>
                  {/* <Typography variant="body1" display="inline">
                      <WifiTetheringIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Network view</Link>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body1" display="inline">
                        <PrintOutlinedIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Print</Link>
                      </Typography> */}
                  {/* <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body1" display="inline">
                      <Share className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Share</Link>
                      </Typography> */}
                  {/* <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body1" display="inline">
                      <Link href="#" className={classes.mLeftR5}><StarsIcon className={classes.iconteal} /></Link>
                      </Typography> */}
                  <span item xs={1} className={classes.sepHeightTen}></span>
                  <Typography variant="body1" display="inline">
                    <Delete
                      deleteUrl={`/api/v1/ahas/${item.item.id}/`}
                      afterDelete={fetchAllAHAData}
                      axiosObj={api}
                      item={item.item}
                      loader={setIsLoading}
                      loadingFlag={false}
                      deleteMsg='Are you sure you want to delete this AHA?'
                      yesBtn='Yes'
                      noBtn='No'
                    />
                    {/* {!checkDeletePermission
                      ? (
                        <DeleteForeverOutlinedIcon
                          className={classes.iconteal}
                          style={{
                            color: '#c0c0c0',
                            cursor: 'not-allowed'
                          }}
                        />
                      )
                      : (
                        <Link
                          href="#"
                          className={classes.mLeftR5}
                        >
                          <DeleteForeverOutlinedIcon
                            className={classes.iconteal}
                            onClick={(e) => handleClickDeleteAlert(item.item)}
                          />
                        </Link>
                      )} */}
                    {/* <Link href="#" className={classes.mLeftR5}>
                          <DeleteForeverOutlinedIcon className={classes.iconteal} onClick={(e) => handleDelete(item)} />
                        </Link> */}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardActions>
        </Card>

        {item.item.attachmentCount ?
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
            open={showGrid}
            className="paddTBRemove attactmentShowSection"
          >
            <Paper elevation={1} className="cardSectionBottom">
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                  <List>
                    <ListItem>
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                      >
                        <div className="attachFileThumb">
                          <Attachment src={item.item.ahaAssessmentAttachment} value={item.item.ahaAssessmentAttachment} />
                        </div>
                      </Grid>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          : ''
        }
      </>
    )
  }

  return (
    <>
      <Box>
        {isLoading ?
          <Grid className={classes.marginTopBottom}>
            <div>
              <div className="gridView">
                {allAHAData.length > 0 ? allAHAData.map((item, index) => {
                  // console.log(item);
                  return (
                    <AllCardData item={item} index={index} />
                  )
                })
                  : <Typography className={classes.sorryTitle} variant="h6" color="primary" noWrap>
                    Sorry, no matching records found
                  </Typography>}

                {/* <div> */}
                <Dialog
                  open={myUserPOpen}
                  onClose={handleMyUserPClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                  maxWidth={'sm'}
                >
                  <DialogTitle id="alert-dialog-title">{"Admin"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Grid
                        item md={12} sm={12} xs={12}
                        className={classes.usrProfileListBox}
                      >
                        <h3>Basic Information</h3>
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
                        <h3>Company Information</h3>
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
                  <DialogActions>
                    <Button onClick={handleMyUserPClose} color="primary" variant="contained" autoFocus>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* </div> */}

                <Dialog
                  open={deleteQ}
                  onClose={handleCloseDeleteAlert}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Grid container spacing={3}>
                        <Grid
                          item
                          md={12}
                          xs={12}
                        >
                          <FormControl component="fieldset">
                            <FormLabel component="legend" className="checkRadioLabel">Are you sure you want to delete this question?</FormLabel>
                          </FormControl>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} className={classes.popUpButton}>
                          <Button color="primary" variant="contained" className="spacerRight buttonStyle" onClick={() => handleDelete()}>
                            Yes
                          </Button>
                          <Button color="secondary" variant="contained" className="buttonStyle custmCancelBtn" onClick={() => handleCloseDeleteAlert()}>
                            No
                          </Button>
                        </Grid>
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>

              </div>
            </div>
            <div className={classes.pagination}>
              {totalData != 0 ? Number.isInteger(pageData) !== true ? totalData < 25 * page ? `${page * 25 - 24} - ${totalData} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : null}
              <Pagination count={pageCount} page={page} onChange={handleChange} />
            </div>
          </Grid>
          :
          <Loader />

        }
      </Box>
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
)(AhaPackage);

