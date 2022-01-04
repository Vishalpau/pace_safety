import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import classNames from "classnames";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import Share from "@material-ui/icons/Share";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@material-ui/core/styles";
import Incidents from "dan-styles/IncidentsList.scss";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import MUIDataTable from "mui-datatables";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import paceLogoSymbol from "dan-images/paceLogoSymbol.png";
import { useHistory, useParams } from "react-router";
//import "../../../styles/custom/customheader.css";
import StarsIcon from "@material-ui/icons/Stars";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import projectpj from "dan-images/projectpj.png";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import api from "../../../../utils/axios";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import Loader from "../../Loader";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    borderRadius: "4px",
  },
  leftSide: {
    flexGrow: 1,
  },
  rightSide: {
    flexGrow: 8,
    textAlign: "right",
  },
  newIncidentButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  search: {
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  filterIcon: {
    color: theme.palette.primary.dark,
    fontSize: "1.8rem",
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
    fontSize: "1rem",
  },
  chipAction: {
    textAlign: "right",
  },
  dataAction: {
    marginRight: theme.spacing(1),
  },
  actionMargin: {
    marginLeft: "2.5rem",
    lineHeight: "6rem",
  },
  marginLeft: {
    marginLeft: "2px",
    fontSize: "14px",
  },
  mLeft: {
    marginLeft: "2px",
  },
  mLeftR5: {
    marginLeft: "5px",
    marginRight: "15px",
    ["@media (max-width:480px)"]: {
      marginLeft: "3px",
      marginRight: "3px",
    },
  },
  pLeft5: {
    paddingLeft: "5px",
  },
  mLeftfont: {
    marginLeft: "2px",
    fontSize: "14px",
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87) !important",
    fontWeight: "500",
    "&:hover": {
      textDecoration: "none",
    },
  },
  spacerRight: {
    marginRight: "4px",
  },
  paddZero: {
    padding: "0px",
  },
  listingLabelName: {
    color: "#7692a4",
    fontSize: "0.88rem",
    fontFamily: "Montserrat-Regular",
  },
  listingLabelValue: {
    color: "#333333",
    fontSize: "0.88rem",
    fontFamily: "Montserrat-Regular",
    "& a": {
      paddingLeft: "5px",
      cursor: "pointer",
      color: "rgba(0, 0, 0, 0.87)",
      fontWeight: "600",
    },
  },
  textPrimary: {
    color: "#06425c",
  },
  dataTableNew: {
    minWidth: "1360px !important",
  },

  title: {
    fontSize: "1.25rem",
    fontFamily: "Montserrat-Regular",
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "500",
    lineHeight: "1.6",
  },
  pt30: {
    paddingTop: "30px",
  },

  mTopThirtybtten: {
    marginTop: "0rem",
    float: "right",
  },

  TableToolbar: {
    display: "none",
  },
  pLTen: {
    marginLeft: "5px",
  },
  mTtop15: {
    marginTop: "15px",
  },
  mTtop20: {
    marginTop: "20px",
  },
  mTtop30: {
    marginTop: "30px",
  },
  marginTopBottom: {
    marginBottom: "16px",
    borderRadius: "8px",
    ["@media (max-width:800px)"]: {
      paddingTop: "55px",
    },
  },
  searchHeaderTop: {
    border: "1px solid #f1f1f1",
    backgroundColor: "#ffffff",
    padding: "0px 16px",
    borderRadius: "5px",
    marginTop: "20px",
  },
  greyBg: {
    backgroundColor: "#f3f3f3",
  },
  AppBarHeader: {
    color: "inherit",
    backgroundColor: "#f7f7f7",
    border: "1px solid #e4e4e4",
    padding: "0px 16px 0px 10px",
    borderRadius: "8px",
  },
  buttonsNewChild: {
    borderRadius: "5px",
    backgroundColor: "#23343e",
    color: "#ffffff",
  },
  padd10: {
    padding: "10px 10px 10px 10px",
  },
  sepHeightTen: {
    borderLeft: "3px solid #cccccc",
    height: "8px",
    verticalAlign: "middle",
    margin: "0px 10px 0px 0px",
    fontSize: "10px",
    ["@media (max-width:480px)"]: {
      margin: "10px 5px 10px 5px",
    },
  },
  floatR: {
    float: "right",
    textTransform: "capitalize",
    ["@media (max-width:480px)"]: {
      float: "left",
    },
  },
  Chip: {
    backgroundColor: "#eaeaea",
    borderRadius: " 50px",
    paddingRight: "12px",
  },
  sepHeightOne: {
    borderLeft: "3px solid #cccccc",
    height: "8px",
    verticalAlign: "middle",
    margin: "15px",
    fontSize: "10px",
  },
  mright5: {
    marginRight: "5px",
    color: "#a7a7a7",
  },
  iconColor: {
    color: "#a7a7a7",
  },
  iconteal: {
    color: "#517b8d",
    fontSize: "24px",
  },
  listHeadColor: { backgroundColor: "#fafafa" },
  marginTopBottom: {
    "& .MuiTypography-h6 .MuiTypography-h5": {
      fontFamily: "Montserrat-Regular",
    },
  },
  textRight: {
    textAlign: "right",
    ["@media (max-width:480px)"]: {
      textAlign: "left",
      padding: "0px 8px 15px 8px !important",
    },
  },
  userImage: {
    borderRadius: "50px",
    width: "48px",
    height: "48px",
    marginRight: "10px",
  },
  mrFifteen: {
    marginRight: "15px",
  },
  card: {
    boxShadow: "0px 0px 2px #ccc",
    borderRadius: "10px",
    marginBottom: "30px",
  },
  usrProfileListBox: {
    "& ul": {
      paddingTop: "0px",
      "& li": {
        paddingLeft: "0px",
        paddingTop: "0px",
        paddingBottom: "0px",
        "& div": {
          "& span": {
            display: "inline-block",
            float: "left",
            paddingRight: "14px",
            fontSize: "15px",
            fontWeight: "600",
          },
          "& p": {
            display: "inline-block",
            float: "left",
            fontSize: "15px",
          },
        },
      },
    },
  },
  cardLinkAction: {
    width: "100%",
    float: "left",
    padding: "14px",
    cursor: "pointer",
    textDecoration: "none !important",
    ["@media (max-width:800px)"]: {
      paddingTop: "85px",
    },
  },
  userPictureBox: {
    position: "absolute",
    right: "0px",
    ["@media (max-width:800px)"]: {
      right: "auto",
    },
  },
  cardContentSection: {
    position: "relative",
    "&:hover": {
      backgroundColor: "#f0f0f0",
      webkitBoxShadow: "0 1px 5px 2px #f0f0f0",
      boxShadow: "0 1px 5px 2px #f0f0f0",
    },
    "&:hover .MuiGrid-align-items-xs-flex-start": {
      backgroundColor: "#f0f0f0",
    },
  },
  cardBottomSection: {
    "& p": {
      ["@media (max-width:480px)"]: {
        fontSize: "12px !important",
      },
    },
    // '& p': {
    //   ['@media (max-width:375px)']: {
    //     fontSize: '12px !important',
    //   },
    // },
  },
  cardActionBottomBox: {
    ["@media (max-width:480px)"]: {
      padding: "8px !important",
    },
  },
  formControlOwnership: {
    width: "100%",
    marginBottom: "30px",
  },
  popUpButton: {
    paddingRight: "5px",
    marginLeft: "12px",
    "& .MuiDialogActions-root, img": {
      justifyContent: "flex-start",
    },
  },
  viewAttachmentDialog: {
    "& .MuiDialogContent-root": {
      overflowY: "hidden !important",
      height: "90px !important",
    },
  },
  imageSectionHeight: {
    "& .MuiDialogContent-root": {
      height: "90px !important",
      minHeight: "90px !important",
    },
  },
  viewattch1: {
    padding: "12px 30px",
    backgroundColor: "#8a9299",
    color: "#fff",
    borderRadius: "2px",
    border: "1px solid #fff",
    display: "inline",
  },
  viewattch2: {
    padding: "12px 8px",
    backgroundColor: "#06425c",
    color: "#fff",
    borderRadius: "2px",
    border: "1px solid #fff",
    display: "inline",
  },
  plusIcon: {
    fontSize: "32px",
    marginRight: "10px",
    color: "#06425c",
  },
  minusIcon: {
    fontSize: "32px",
    color: "#06425c",
  },
  popUpButton: {
    paddingRight: "5px",
    marginLeft: "12px",
    "& .MuiDialogActions-root, img": {
      justifyContent: "flex-start",
    },
  },
  pagination: {
    padding: "0px 0px 20px 0px",
    display: "flex",
    justifyContent: "flex-end",
    marginTop : '-10px',
  },
  
}));

function ComplianceListNew(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeOne = (event, newValue) => {
    setValue(newValue);
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

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  //view comments
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [hiddenn, setHiddenn] = useState(false);
  const [allComplianceData, setAllComplianceData] = useState([]);
  const [attachOpen, setAttachOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0)
  const [totalData, setTotalData] = useState(0);
  const [page , setPage] = useState(1)
  const handleVisibility = () => {
    setAttachOpen(true);
    setHidden(!hidden);
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

  const handleAttachClose = () => {
    setAttachOpen(false);
  };
  const handleAttachClick = () => {
    setAttachOpen(!open);
  };
  const handleAttachOpen = () => {
    if (!hidden) {
      setAttachOpen(true);
    }
  };

  //image download attachment section
  const [openAttachment, setopenAttachment] = React.useState(false);

  const handleClickOpenAttachment = () => {
    setopenAttachment(true);
  };

  const handleCloseAttachment = () => {
    setopenAttachment(false);
  };

  //   Data for the table view
  const columns = [
    "Number",
    "Type",
    "Schedule",
    "Status",
    "Requested by",
    "Date submitted",
    "Date approved",
    "Approved by",
  ];

  const data = [
    [
      "AT-125-256-251",
      "Action",
      "Planned",
      "Assigned",
      "Mayank",
      "Dec 26, 2020",
      "Dec 26, 2020",
      "Prakash",
    ],
    [
      "AT-125-256-251",
      "Action",
      "Planned",
      "Assigned",
      "Mayank",
      "Dec 26, 2020",
      "Dec 26, 2020",
      "Prakash",
    ],
    [
      "AT-125-256-251",
      "Action",
      "Planned",
      "Assigned",
      "Mayank",
      "Dec 26, 2020",
      "Dec 26, 2020",
      "Prakash",
    ],
    [
      "AT-125-256-251",
      "Action",
      "Planned",
      "Assigned",
      "Mayank",
      "Dec 26, 2020",
      "Dec 26, 2020",
      "Prakash",
    ],
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
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

  const handleSummaryPush = async (item) => {
    console.log("calling this");
    let id = item
    localStorage.setItem("fkComplianceId", id)
    history.push(`/app/pages/compliance/compliance-summary/${id}`);
  };

  const handleNewCompliancePush = async () => {
    history.push("/app/pages/compliance/compliance");
  };

  const [myUserPOpen, setMyUserPOpen] = React.useState(false);

  const handleMyUserPClickOpen = () => {
    console.log("opened");
    setMyUserPOpen(true);
  };

  const handleMyUserPClose = () => {
    console.log("closed");
    setMyUserPOpen(false);
  };

  const classes = useStyles();

  const fetchAllComplianceData = async () => {
    await setPage(1)
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId =
      props.projectName.projectId ||
      JSON.parse(localStorage.getItem("projectName")).projectName.projectId;
    const selectBreakdown =
      props.projectName.breakDown.length > 0
        ? props.projectName.breakDown
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
    if(props.compliance === "My Inspections"){
      const res = await api.get(`api/v1/audits/?search=${props.search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}`);
      const result = res.data.data.results.results
      await setAllComplianceData(result)
      await setTotalData(res.data.data.results.count)
            await setPageData(res.data.data.results.count / 25)
            let pageCount = Math.ceil(res.data.data.results.count / 25)
            await setPageCount(pageCount)
    }else{
      const res = await api.get(`api/v1/audits/?search=${props.search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`);
      
      const result = res.data.data.results.results
      await setAllComplianceData(result)
      await setTotalData(res.data.data.results.count)
            await setPageData(res.data.data.results.count / 25)
            let pageCount = Math.ceil(res.data.data.results.count / 25)
            await setPageCount(pageCount)
    }
    
    await setIsLoading(true);
  };

  const handleChange = async(event, value) => {
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
   const selectBreakdown = props.projectName.breakDown.length>0? props.projectName.breakDown
    :JSON.parse(localStorage.getItem("selectBreakDown")) !== null
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
  if(props.compliance === "My Inspections"){
    const res = await api.get(`api/v1/audits/?search=${props.search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&page=${value}`);
      await setAllComplianceData(res.data.data.results);
      await setPage(value)
  }else{
    const res = await api.get(`api/v1/audits/?search=${props.search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}`);
    await setAllComplianceData(res.data.data.results);
    await setPage(value)
  }
  
  };

  const handleDelete = async (item) => {
    let temp = {...item}
    temp.status = "Delete"
    let id = item.id
    setIsLoading(false)
    const  res = await api.put(`api/v1/audits/${id}/`,temp).then((response) => {
      fetchAllComplianceData()
      setIsLoading(true)
    }).catch((error) => console.log(error))
  }

console.log(totalData,"++++++++++")
  useEffect(() => {
    fetchAllComplianceData();
  }, [props.projectName.breakDown,props.compliance,props.search,props.status]);

  return (
    <>
      <Box>
        <Grid className={classes.marginTopBottom}>
          <div>
            <div className="gridView">
              {isLoading ? (
                allComplianceData.map((value, index) => (
                  <Card variant="outlined" className={classes.card}>
                    <CardContent>
                      <Grid
                        container
                        spacing={3}
                        className={classes.cardContentSection}
                      >
                        <Grid
                          item
                          md={2}
                          sm={4}
                          xs={12}
                          className={classes.userPictureBox}
                        >
                          <Button
                            className={classes.floatR}
                            onClick={(e) => handleMyUserPClickOpen(e)}
                          >
                            <img
                              src={value['avatar'] !== null ? value['avatar'] :paceLogoSymbol}
                              className={classes.userImage}
                            />{" "}
                            {value['username']}
                          </Button>
                        </Grid>
                        <Link
                          onClick={() => handleSummaryPush(value["id"])}
                          className={classes.cardLinkAction}
                        >
                          <Grid item xs={12}>
                            <Grid container spacing={3} alignItems="flex-start">
                              <Grid
                                item
                                sm={12}
                                xs={12}
                                className={classes.listHeadColor}
                              >
                                <Grid
                                  container
                                  spacing={3}
                                  alignItems="flex-start"
                                >
                                  <Grid item md={10} sm={12} xs={12}>
                                    <Typography
                                      className={classes.title}
                                      variant="h6"
                                    >
                                      {value['auditType'] !== null ? value['auditType'] : "-"}
                                    </Typography>
                                    <Typography
                                      className={classes.listingLabelName}
                                      display="inline"
                                    >
                                      Number:{" "}
                                      <span>
                                        <Link
                                          onClick={() => handleSummaryPush()}
                                          //href="/app/pages/actions/actionsummary"
                                          variant="h6"
                                          className={classes.mLeftfont}
                                        >
                                          <span
                                            className={
                                              classes.listingLabelValue
                                            }
                                          >
                                            {value['auditNumber'] !== null ? value['auditNumber'] : "-"}
                                          </span>
                                        </Link>
                                      </span>
                                    </Typography>
                                    <span
                                      item
                                      xs={1}
                                      className={classes.sepHeightOne}
                                    />
                                    <Typography
                                      variant="body1"
                                      gutterBottom
                                      display="inline"
                                      color="textPrimary"
                                      className={classes.listingLabelName}
                                    >
                                      Category:{" "}
                                      <span
                                        className={classes.listingLabelValue}
                                      >
                                       data not available in api
                                      </span>
                                    </Typography>
                                    <span
                                      item
                                      xs={1}
                                      className={classes.sepHeightOne}
                                    />
                                    <Typography
                                      variant="body1"
                                      gutterBottom
                                      display="inline"
                                      color="textPrimary"
                                      className={classes.listingLabelName}
                                    >
                                      {/* Assignee: <span className={classes.listingLabelValue}>Ajay chauhan</span>
                                  <span item xs={1} className={classes.sepHeightOne}></span> */}
                                      Status:{" "}
                                      <span className="listingLabelValue statusColor_complete">
                                        Assigned
                                      </span>
                                    </Typography>
                                  </Grid>

                                  {/* <Grid item md={2} sm={4} xs={12}>
                                <Button  className={classes.floatR} onClick={(e) => handleNewCompliancePush(e)} >
                                  <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                                </Button>
                              </Grid> */}
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
                                  data not available in api
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
                                  {moment(value["createdAt"]).format(
                                  "Do MMMM YYYY, h:mm:ss a"
                                )}
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
                                  {value['createdByName'] !== null ? value['createdByName'] : "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Link>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions
                      className={classNames(
                        Incidents.cardActions,
                        classes.cardActionBottomBox
                      )}
                    >
                      <Grid
                        container
                        spacing={2}
                        justify="flex-end"
                        alignItems="left"
                        className={classes.cardBottomSection}
                      >
                        <Grid item xs={12} sm={6} md={5}>
                          <Typography
                            variant="body1"
                            display="inline"
                            color="textPrimary"
                          >
                            <AttachmentIcon className={classes.mright5} />
                            Attachments:
                          </Typography>
                          <Typography variant="body2" display="inline">
                            {/* <Link href="#" color="secondary" className={classes.mLeftR5}>3</Link> */}
                            <span>
                              <Link
                                href="#"
                                onClick={handleVisibility}
                                color="secondary"
                                aria-haspopup="true"
                                className={classes.mLeftR5}
                              >
                                3
                              </Link>
                            </span>
                          </Typography>
                          <span item xs={1} className={classes.sepHeightTen} />
                          <Typography
                            variant="body1"
                            display="inline"
                            color="textPrimary"
                            className={classes.mLeft}
                          >
                            <InsertCommentOutlinedIcon
                              className={classes.mright5}
                            />
                            <Link
                              href="#"
                              onClick={handleVisibilityComments}
                              aria-haspopup="true"
                            >
                              Comments:
                            </Link>
                          </Typography>
                          <Typography
                            variant="body2"
                            display="inline"
                            className={classes.mLeft}
                          >
                            <span>
                              <Link
                                href="#"
                                color="secondary"
                                aria-haspopup="true"
                                className={classes.mLeft}
                              >
                                3
                              </Link>
                            </span>
                            {/* <Link href="#" color="secondary" className={classes.mLeft}>3</Link> */}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={7}
                          className={classes.textRight}
                        >
                          {/* <Typography variant="body1" display="inline">
                            <IconButton>
                              <PrintOutlinedIcon className={classes.iconteal} />
                            </IconButton>{" "}
                            <Link
                              href="/app/pages/general-observation-prints"
                              className={classes.mLeftR5}
                            />
                          </Typography> */}
                          {/* <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body2" display="inline">
                      <Share className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Share</Link>
                      </Typography> */}
                          {/* <span item xs={1} className={classes.sepHeightTen} />
                          <Typography variant="body1" display="inline">
                            <Link href="#" className={classes.mLeftR5}>
                              <IconButton>
                                <StarsIcon className={classes.iconteal} />
                              </IconButton>
                            </Link>
                          </Typography> */}
                          <span item xs={1} className={classes.sepHeightTen} />
                          <Typography variant="body1" display="inline">
                            <Link href="#" className={classes.mLeftR5}>
                              <IconButton onClick={() => handleDelete(value)}>
                                <DeleteForeverOutlinedIcon
                                  className={classes.iconteal}
                                />
                              </IconButton>
                            </Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                ))
              ) : (
                <Loader />
              )}

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
                <Paper elevation={1} className="cardSectionBottom">
                  <Grid container spacing={3}>
                    <Grid item md={12} sm={12} xs={12}>
                      <List>
                        <ListItem>
                          <img
                            src={projectpj}
                            onClick={handleClickOpenAttachment}
                            className="hoverIcon"
                          />
                        </ListItem>
                        <ListItem>
                          <img
                            src={projectpj}
                            onClick={handleClickOpenAttachment}
                            className="hoverIcon"
                          />
                        </ListItem>
                        <ListItem>
                          <img
                            src={projectpj}
                            onClick={handleClickOpenAttachment}
                            className="hoverIcon"
                          />
                        </ListItem>
                        <ListItem>
                          <img
                            src={projectpj}
                            onClick={handleClickOpenAttachment}
                            className="hoverIcon"
                          />
                        </ListItem>
                        <ListItem>
                          <img
                            src={projectpj}
                            onClick={handleClickOpenAttachment}
                            className="hoverIcon"
                          />
                        </ListItem>
                        <ListItem>
                          <img
                            src={projectpj}
                            onClick={handleClickOpenAttachment}
                            className="hoverIcon"
                          />
                        </ListItem>
                        <ListItem>
                          <img
                            src={projectpj}
                            onClick={handleClickOpenAttachment}
                            className="hoverIcon"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
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
                  <Paper elevation={1} className="cardSectionBottom">
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
                              <AddCircleOutlineIcon
                                className={classes.plusIcon}
                              />
                              <RemoveCircleOutlineIcon
                                className={classes.minusIcon}
                              />
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
                                className="custmCancelBtn buttonStyle"
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
                  <DialogTitle id="alert-dialog-title">
                    Viw Attachment
                  </DialogTitle>
                  <DialogContent classNames={classes.imageSectionHeight}>
                    <Grid
                      container
                      spacing={3}
                      classNames={classes.viewImageSection}
                    >
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        classNames={classes.mb10}
                      >
                        <ul classNames={classes.viewImageSection}>
                          <li className={classes.viewattch1}>
                            View Attachment
                          </li>
                          <li className={classes.viewattch2}>
                            Download Attachment
                          </li>
                        </ul>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseAttachment}
                      color="primary"
                      autoFocus
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <div>
                <Dialog
                  open={myUserPOpen}
                  onClose={handleMyUserPClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                  maxWidth={"sm"}
                >
                  {/* <DialogTitle id="alert-dialog-title">{"Admin"}</DialogTitle> */}
                  <DialogTitle
                    classNames={classes.mb10}
                    id="alert-dialog-title"
                  >
                    <img src={paceLogoSymbol} className={classes.userImage} />{" "}
                    {"Admin"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className={classes.usrProfileListBox}
                      >
                        <h6>Change ownership</h6>
                        <FormControl
                          variant="outlined"
                          className={classes.formControlOwnership}
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            Ownership
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            //value="Ashutosh"
                            onChange={handleChangeOne}
                            label="Ownership"
                            className="formControl"
                            fullWidth
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
                        item
                        md={12}
                        sm={12}
                        xs={12}
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
                            <ListItemText
                              primary="Full Name:"
                              secondary="Prakash"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Organization Type:"
                              secondary="Epc ORGANIZATION"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Organization Role:"
                              secondary="N/A"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Role Title:"
                              secondary="N/A"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Current Location:"
                              secondary="Delhi » NCT » India"
                            />
                          </ListItem>
                        </List>
                      </Grid>

                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className={classes.usrProfileListBox}
                      >
                        <h3>Company information</h3>
                        <List>
                          <ListItem>
                            <ListItemText
                              primary="Company Name:"
                              secondary="JWIL"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Location:"
                              secondary="Italy"
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.popUpButton}
                  >
                    <DialogActions align="left" className="marginB10">
                      <Button
                        onClick={handleMyUserPClose}
                        color="secondary"
                        variant="contained"
                        className="buttonStyle custmCancelBtn"
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Grid>
                  {/* <DialogActions>
                            <Button onClick={handleMyUserPClose}  color="primary" variant="contained" autoFocus>
                              Close
                            </Button>
                          </DialogActions> */}
                </Dialog>
                <div className={classes.pagination}>
                  {totalData != 0 ?  Number.isInteger(pageData) !== true ? totalData < 25*page ? `${page*25 -24} - ${totalData} of ${totalData}` : `${page*25 -24} - ${25*page} of ${totalData}`  : `${page*25 -24} - ${25*page} of ${totalData}` : null}
                  <Pagination count={pageCount} page={page} onChange={handleChange} />
                </div>
              </div>
            </div>
            {/* <div className="paginationSection">
              <Pagination count={10} />
            </div> */}
          </div>
        </Grid>
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
)(ComplianceListNew);
