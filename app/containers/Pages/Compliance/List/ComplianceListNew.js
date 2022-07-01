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
import FormLabel from "@material-ui/core/FormLabel";

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
import moment from "moment";
import { checkACL } from "../../../../utils/helper";
import Attachment from "../../../../containers/Attachment/Attachment";
import Delete from "../../../Delete/Delete";
import CardView from "../../../../components/Card/Index";

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
    "&:hover": {
      cursor: "pointer",
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
    marginTop: "-10px",
  },
}));

function ComplianceListNew(props) {
  // states
  const history = useHistory();
  const [allComplianceData, setAllComplianceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [checkDeletePermission, setCheckDeletePermission] = useState(false);

  const handleChangeOne = (event, newValue) => {
    setValue(newValue);
  };

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

  // method to push to new component
  const handleSummaryPush = async (item, commentPayload) => {
    let id = item;
    localStorage.setItem("fkComplianceId", id);
    history.push({
      pathname: `/app/pages/compliance/compliance-summary/${id}`,
      state: {
        commentPayload,
        redirectUrl: "/app/pages/compliance/compliance-details",
      },
    });
  };

  const [myUserPOpen, setMyUserPOpen] = React.useState(false);

  //Method to open ownership modal when we click on avatar
  const handleMyUserPClickOpen = () => {
    setMyUserPOpen(true);
  };

  const handleMyUserPClose = () => {
    setMyUserPOpen(false);
  };

  const classes = useStyles();

  //method to fetch all compliance data filetrs
  const fetchAllComplianceData = async () => {
    if (props.search) {
      setAllComplianceData([]);
    }
    setPage(1);
    // get all the ids (fkCompanyId,fkProjectId, selectBreakdown,fkProjectStructureIds, createdBy )
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
    const createdBy =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).id
        : null;
    // for types filter
    if (props.type === "Categories" || props.type === "All") {
      setIsLoading(true);
      if (props.compliance === "My Inspections") {
        const res = await api.get(
          `api/v1/audits/?search=${
            props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}`
        );
        const result = res.data.data.results.results;
        setAllComplianceData(result);
        setTotalData(res.data.data.results.count);
        setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        setPageCount(pageCount);
        setIsLoading(false);
      } else {
        const res = await api.get(
          `api/v1/audits/?search=${
            props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`
        );
        const result = res.data.data.results.results;
        setAllComplianceData(result);
        setTotalData(res.data.data.results.count);
        setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        setPageCount(pageCount);
        setIsLoading(false);
      }
    } else {
      if (props.compliance === "My Inspections") {
        setIsLoading(true);
        const res = await api.get(
          `api/v1/audits/?search=${
            props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&auditType=${
            props.type
          }&createdBy=${createdBy}`
        );
        const result = res.data.data.results.results;
        setAllComplianceData(result);
        setTotalData(res.data.data.results.count);
        setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        setPageCount(pageCount);
        setIsLoading(false);
      } else {
        const res = await api.get(
          `api/v1/audits/?search=${
            props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&auditType=${
            props.type
          }&projectStructureIds=${fkProjectStructureIds}`
        );
        const result = res.data.data.results.results;
        setAllComplianceData(result);
        setTotalData(res.data.data.results.count);
        setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        setPageCount(pageCount);
        setIsLoading(false);
      }
    }
  };

  //method for  all the filters
  const handleChange = async (event, value) => {
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
    const createdBy =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).id
        : null;
    let struct = "";

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }

    const fkProjectStructureIds = struct.slice(0, -1);
    if (props.type === "Categories" || props.type === "All") {
      if (props.compliance === "My Inspections") {
        const res = await api.get(
          `api/v1/audits/?search=${
            props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&page=${value}`
        );
        setAllComplianceData(res.data.data.results.results);
        setPage(value);
      } else {
        const res = await api.get(
          `api/v1/audits/?search=${
            props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}`
        );
        setAllComplianceData(res.data.data.results.results);
        setPage(value);
      }
    } else {
      if (props.compliance === "My Inspections") {
        const res = await api.get(
          `api/v1/audits/?search=${
            props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&auditType=${
            props.type
          }&createdBy=${createdBy}&page=${value}`
        );
        setAllComplianceData(res.data.data.results.results);
        setPage(value);
      } else {
        const res = await api.get(
          `api/v1/audits/?search=${
            props.search
          }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&auditType=${
            props.type
          }&page=${value}`
        );
        setAllComplianceData(res.data.data.results.results);
        setPage(value);
      }
    }
  };

  useEffect(() => {
    fetchAllComplianceData();
    setCheckDeletePermission(
      checkACL("safety-compliance", "delete_compliance")
    );
  }, [
    props.projectName.breakDown,
    props.compliance,
    props.search,
    props.status,
    props.type,
    // props.blank,
  ]);

  // separate card component
  const AllCardData = ({ value, index }) => {
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [hiddenn, setHiddenn] = useState(false);
    const [commentData, setCommentData] = useState("");

    const deleteItem = {
      fkCompanyId: value.fkCompanyId,
      fkProjectId: value.fkProjectId,
      fkProjectStructureIds: value.fkProjectStructureIds,
      createdBy: value.createdBy,
      updatedBy: JSON.parse(localStorage.getItem("userDetails")).id,
      status: "Delete",
    };
    // const [openAttachment, setopenAttachment] = React.useState(false);

    // useEffect(() => {
    //   console.log(commentsOpen, "commnentspjeo");
    // }, [commentsOpen]);

    const addComments = (event) => {
      setCommentData(event.target.value);
    };

    const commentPayload = {
      fkCompanyId: value.fkCompanyId,
      fkProjectId: value.fkProjectId,
      commentContext: "compliance",
      contextReferenceIds: value.id,
      commentTags: "",
      comment: commentData,
      parent: 0,
      thanksFlag: 0,
      status: "Active",
      createdBy: value.createdBy,
    };

    const handleSendComments = async () => {
      if (commentData) {
        setIsLoading(true);
        await api
          .post("/api/v1/comments/", commentPayload)
          .then((res) => {
            fetchAllComplianceData();
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    };

    function handleVisibility() {
      setShowGrid(true);
      setHidden(!hidden);
    }

    function handleVisibilityComments() {
      setCommentsOpen(true);
      setHiddenn(!hiddenn);
    }

    function handleAttachClose() {
      setShowGrid(false);
    }

    function handleAttachClick() {
      setShowGrid(!open);
    }

    function handleAttachOpen() {
      if (!hidden) {
        setShowGrid(true);
      }
    }

    function handleCommentsOpen() {
      if (!hiddenn) {
        setCommentsOpen(true);
      }
    }

    function handleCommentsClose() {
      setCommentsOpen(false);
    }

    function handleCommentsClick() {
      setCommentsOpen(!open);
    }

    function handleClickOpenAttachment() {
      setopenAttachment(true);
    }

    function handleCloseAttachment() {
      setopenAttachment(false);
    }

    // console.log(showGrid);

    const groupNames = value.groups.map((one) => {
      return (
        <>
          {one.checkListGroupName}
          {one !== value.groups[value.groups.length - 1] ? ", " : ""}
        </>
      );
    });

    return (
      <>
        <CardView
          cardTitle={value.auditType}
          avatar={value.avatar}
          username={value.username}
          itemId={value.id}
          headerFields={[
            { label: "Number", value: value.auditNumber },
            {
              label: "Group Name",
              value: value.groups.length > 0 ? groupNames : "-",
            },
          ]}
          bodyFields={[
            { label: "Location", value: value.area },
            {
              label: "Created On",
              value: moment(value.createdAt).format("Do MMMM YYYY, h:mm:ss a"),
            },
            { label: "Created By", value: value.createdByName },
          ]}
          deleteFields={{
            deleteUrl: `api/v1/audits/${value.id}/`,
            afterDelete: () => {
              fetchAllComplianceData();
            },
            axiosObj: api,
            item: deleteItem,
            loader: setIsLoading,
            loadingFlag: false,
            deleteMsg: "Are you sure you want to delete this Compliance?",
            yesBtn: "Yes",
            noBtn: "No",
          }}
          handleVisibilityComments={() => handleVisibilityComments()}
          handleVisibility={() => handleVisibility()}
          files={
            value.attachmentLinks ? value.attachmentLinks.attachmentCount : 0
          }
          commentsCount={value.commentsCount}
          handleSummaryPush={() => handleSummaryPush(value.id, commentPayload)}
          checkDeletePermission={checkDeletePermission}
        />

        {value.attachmentLinks.attachmentCount ? (
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
                      <Grid item md={12} sm={12} xs={12}>
                        {value.attachmentLinks.links.map((a) => (
                          <div className="attachFileThumb">
                            <Attachment src={a} value={a} />
                          </div>
                        ))}
                      </Grid>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ) : (
          ""
        )}

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
                        value={commentData}
                        onChange={(e) => addComments(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className="spacerRight buttonStyle"
                        disableElevation
                        onClick={handleSendComments}
                      >
                        Respond
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className="custmCancelBtn buttonStyle"
                        disableElevation
                        onClick={handleCommentsClose}
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
      </>
    );
  };

  return (
    <>
      <Box>
        <Grid className={classes.marginTopBottom}>
          <div>
            <div className="gridView">
              {isLoading ? (
                <Loader />
              ) : allComplianceData.length > 0 ? (
                allComplianceData.map((value, index) => (
                  <AllCardData value={value} />
                ))
              ) : (
                <>
                  <Typography
                    className={classes.sorryTitle}
                    variant="h6"
                    color="primary"
                    noWrap
                  >
                    Sorry, no matching records found
                  </Typography>
                </>
              )}

              <div className={classes.pagination}>
                {totalData != 0
                  ? Number.isInteger(pageData) !== true
                    ? totalData < 25 * page
                      ? `${page * 25 - 24} - ${totalData} of ${totalData}`
                      : `${page * 25 - 24} - ${25 * page} of ${totalData}`
                    : `${page * 25 - 24} - ${25 * page} of ${totalData}`
                  : null}
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handleChange}
                />
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
              </div>
            </div>
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
