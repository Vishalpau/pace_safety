import React, { useEffect, useState, lazy } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AttachmentIcon from "@material-ui/icons/Attachment";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import completed_small from "dan-images/completed-small.png";
import in_progress_small from "dan-images/in_progress_small.png";
import preplanning from "dan-images/preplanning.png";
import Incidents from "dan-styles/IncidentsList.scss";
import moment from "moment";
import MUIDataTable from "mui-datatables";
// react-redux
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { company, projectName } from "../../../redux/actions/initialDetails";
import "../../../styles/custom/customheader.css";
import api from "../../../utils/axios";
import { HEADER_AUTH, SELF_API } from "../../../utils/constants";
import paceLogoSymbol from "dan-images/paceLogoSymbol.png";
import { checkACL } from "../../../utils/helper";
import CardView from "../../Card/Index";

const UserDetailsView = lazy(() => import("../../UserDetails/UserDetail"));
const Loader = lazy(() => import("../Loader"));
import Delete from "../../Delete/Delete";
import Attachment from "../../Attachment/Attachment";

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: "0px 0px 20px 0px",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-10px",
  },
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
    "@media (max-width:480px)": {
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
    "@media (max-width:800px)": {
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
    margin: "15px 15px 15px 8px",
    fontSize: "10px",
    "@media (max-width:480px)": {
      margin: "10px 5px 10px 5px",
    },
  },
  floatR: {
    float: "right",
    textTransform: "capitalize",
    "@media (max-width:480px)": {
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
    color: "#06425c",
  },
  listHeadColor: { backgroundColor: "#fafafa" },
  marginTopBottom: {
    "& .MuiTypography-h6 .MuiTypography-h5": {
      fontFamily: "Montserrat-Regular",
    },
  },
  textRight: {
    textAlign: "right",
    "@media (max-width:480px)": {
      textAlign: "left",
      padding: "0px 8px 15px 8px !important",
    },
  },
  userImage: {
    borderRadius: "50px",
    width: "50px",
    height: "50px",
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

  cardLinkAction: {
    width: "100%",
    float: "left",
    padding: "14px",
    cursor: "pointer",
    textDecoration: "none !important",
    "@media (max-width:800px)": {
      paddingTop: "85px",
    },
  },
  userPictureBox: {
    position: "absolute",
    right: "0px",
    "@media (max-width:800px)": {
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
          },
        },
      },
    },
  },
  cardBottomSection: {
    "& p": {
      "@media (max-width:480px)": {
        fontSize: "12px !important",
      },
    },
  },
  cardActionBottomBox: {
    "@media (max-width:480px)": {
      padding: "8px !important",
    },
  },
  smallImage: {
    height: "30px",
    width: "30px",
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
}));

function Actions(props) {
  const type = localStorage.getItem("type");

  const userName =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).name
      : null;
  const dispatch = useDispatch();
  const [listToggle, setListToggle] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();
  const [allInitialData, setAllInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchIncident } = props;
  const { status } = props;

  const [myUserPOpen, setMyUserPOpen] = React.useState(false);

  const handleMyUserPClose = () => {
    setMyUserPOpen(false);
  };

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

  const createdBy =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;

  const handleSummaryPush = async (index, commentPayload) => {
    console.log(allInitialData, "allInitialData");
    const { id } = allInitialData[index];
    localStorage.setItem("fkobservationId", id);
    if (allInitialData[index].isCorrectiveActionTaken !== null) {
      localStorage.setItem("action", "Done");
    } else {
      localStorage.removeItem("action");
    }
    history.push({
      pathname: `/app/icare/details/${id}`,
      // state: commentPayload
      state: { commentPayload, redirectUrl: "/app/icare-initial-notification" },
    });
  };

  const fetchInitialiObservation = async () => {
    setPage(1);

    const { fkCompanyId } = JSON.parse(localStorage.getItem("company"));
    const fkProjectId =
      JSON.parse(localStorage.getItem("projectName")).projectName.projectId ||
      props.projectName.projectId;
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

    if (props.type == "All" || props.type == "Type") {
      // await setAllInitialData(result)
      if (props.observation == "My Observations") {
        const allLogInUserData = await api.get(
          `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&observationStage=${status}`
        );
        const result = allLogInUserData.data.data.results.results;
        setAllInitialData(result);
        setTotalData(allLogInUserData.data.data.results.count);
        setPageData(allLogInUserData.data.data.results.count / 25);
        const pageCount = Math.ceil(
          allLogInUserData.data.data.results.count / 25
        );
        setPageCount(pageCount);
      } else {
        const res = await api.get(
          `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&observationStage=${status}`
        );
        const result = res.data.data.results.results;
        setAllInitialData(result);
        setTotalData(res.data.data.results.count);
        setPageData(res.data.data.results.count / 25);
        const pageCount = Math.ceil(res.data.data.results.count / 25);
        setPageCount(pageCount);
      }
    } else {
      if (props.type == "Risk") {
        if (props.observation == "My Observations") {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&observationType=Risk&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setTotalData(allLogInUserData.data.data.results.count);
          setPageData(allLogInUserData.data.data.results.count / 25);
          const pageCount = Math.ceil(
            allLogInUserData.data.data.results.count / 25
          );
          setPageCount(pageCount);
        } else {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&observationType=Risk&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setTotalData(allLogInUserData.data.data.results.count);
          setPageData(allLogInUserData.data.data.results.count / 25);
          const pageCount = Math.ceil(
            allLogInUserData.data.data.results.count / 25
          );
          setPageCount(pageCount);
        }
      }
      if (props.type == "Comments") {
        if (props.observation == "My Observations") {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&observationType=Comments&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setTotalData(allLogInUserData.data.data.results.count);
          setPageData(allLogInUserData.data.data.results.count / 25);
          const pageCount = Math.ceil(
            allLogInUserData.data.data.results.count / 25
          );
          setPageCount(pageCount);
        } else {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&observationType=Comments&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setTotalData(allLogInUserData.data.data.results.count);
          setPageData(allLogInUserData.data.data.results.count / 25);
          const pageCount = Math.ceil(
            allLogInUserData.data.data.results.count / 25
          );
          setPageCount(pageCount);
        }
      }
      if (props.type == "Positive behavior") {
        if (props.observation == "My Observations") {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&observationType=Positive behavior&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setTotalData(allLogInUserData.data.data.results.count);
          const pageCount = Math.ceil(
            allLogInUserData.data.data.results.count / 25
          );
          setPageData(allLogInUserData.data.data.results.count / 25);
          setPageCount(pageCount);
        } else {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&observationType=Positive behavior&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setTotalData(allLogInUserData.data.data.results.count);
          setPageData(allLogInUserData.data.data.results.count / 25);
          const pageCount = Math.ceil(
            allLogInUserData.data.data.results.count / 25
          );
          setPageCount(pageCount);
        }
      }
    }
    setIsLoading(true);
  };

  const handleChange = async (event, value) => {
    const { fkCompanyId } = JSON.parse(localStorage.getItem("company"));
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

    if (props.type == "All" || props.type == "Type") {
      if (props.observation == "My Observations") {
        const allLogInUserData = await api.get(
          `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&page=${value}&observationStage=${status}`
        );
        const result = allLogInUserData.data.data.results.results;
        setAllInitialData(result);
        setPage(value);
      } else {
        const res = await api.get(
          `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}&observationStage=${status}`
        );
        const result = res.data.data.results.results;
        setAllInitialData(result);
        setPage(value);
      }
    } else {
      if (props.type == "Risk") {
        if (props.observation == "My Observations") {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&observationType=Risk&page=${value}&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setPage(value);
        } else {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&observationType=Risk&page=${value}&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setPage(value);
        }
      }
      if (props.type == "Comments") {
        if (props.observation == "My Observations") {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&observationType=Comments&page=${value}&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setPage(value);
        } else {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&observationType=Comments&page=${value}&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          setAllInitialData(result);
          setPage(value);
        }
      }
      if (props.type == "Positive behavior") {
        if (props.observation == "My Observations") {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&observationType=Positive behavior&page=${value}&observationStage=${status}`
          );
          const result = allLogInUserData.data.data.results.results;
          await setAllInitialData(result);
          await setPage(value);
        } else {
          const allLogInUserData = await api.get(
            `api/v1/observations/?search=${searchIncident}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&observationType=Positive behavior&page=${value}&observationStage=${status}`
          );

          const result = allLogInUserData.data.data.results.results;
          await setAllInitialData(result);
          await setPage(value);
        }
      }
    }
  };

  const [openAttachment, setopenAttachment] = React.useState(false);
  const [openAtt, setopenAtt] = React.useState("");

  const handleClickOpenAttachment = (value) => {
    setopenAtt(value);
    setopenAttachment(true);
  };

  const [attachOpen, setAttachOpen] = useState(false);
  const [attachIndex, setAttachIndex] = useState("");
  const [hidden, setHidden] = useState(false);

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

  // view comments
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [hiddenn, setHiddenn] = useState(false);
  const [checkDeletePermission, setCheckDeletePermission] = useState(false);

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

  const userDetails = async (compId, proId) => {
    try {
      if (compId) {
        const config = {
          method: "get",
          url: `${SELF_API}`,
          headers: HEADER_AUTH,
        };
        await api(config)
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              const hosting = response.data.data.results.data.companies
                .filter((company) => company.companyId == compId)[0]
                .subscriptions.filter((subs) => subs.appCode === "safety")[0]
                .hostings[0].apiDomain;

              console.log(hosting);
              const data1 = {
                method: "get",
                url: `${hosting}/api/v1/core/companies/select/${compId}/`,
                headers: HEADER_AUTH,
              };
              console.log(data1);
              axios(data1).then((res) => {
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(response.data.data.results.data)
                );

                if (compId) {
                  const companies = response.data.data.results.data.companies.filter(
                    (item) => item.companyId == compId
                  );

                  const companeyData = {
                    fkCompanyId: companies[0].companyId,
                    fkCompanyName: companies[0].companyName,
                  };
                  localStorage.setItem("company", JSON.stringify(companeyData));

                  dispatch(company(companeyData));
                }
                if (proId) {
                  const companies = response.data.data.results.data.companies.filter(
                    (item) => item.companyId == compId
                  );
                  const project = companies[0].projects.filter(
                    (item) => item.projectId == proId
                  );

                  localStorage.setItem(
                    "projectName",
                    JSON.stringify(project[0])
                  );
                  dispatch(projectName(project[0]));
                }
                // fetchPermissionData();
                localStorage.removeItem("direct_loading");
              });
            }
          })
          .catch((error) => {});
      }
    } catch (error) {}
  };
  const classes = useStyles();

  const handleDelete = async (item) => {
    if (checkACL("safety-observations", "delete_observations")) {
      const data = item[1];
      data.status = "Delete";
      delete data.attachment;
      setIsLoading(false);
      await api
        .put(`/api/v1/observations/${data.id}/`, data)
        .then((response) => fetchInitialiObservation())
        .catch((err) => console.log(err));
    } else {
    }
  };

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem("direct_loading"));
    if (state !== null) {
      userDetails(state.comId, state.proId);
    } else {
      fetchInitialiObservation();
    }
    setCheckDeletePermission(
      checkACL("safety-observations", "delete_observations")
    );
    setTimeout(
      () =>
        setCheckDeletePermission(
          checkACL("safety-observations", "delete_observations")
        ),
      2500
    );
  }, [
    props.projectName.breakDown,
    props.projectName.projectName,
    props.type,
    searchIncident,
    props.status,
    checkDeletePermission,
  ]);

  const AllCardData = ({ item, index }) => {
    const [showGrid, setShowGrid] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [hiddenn, setHiddenn] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [commentData, setCommentData] = useState("");

    const addComments = (event) => {
      console.log(event.target.value);
      setCommentData(event.target.value);
    };

    const commentPayload = {
      fkCompanyId: item.fkCompanyId,
      fkProjectId: item.fkProjectId,
      commentContext: "observations",
      contextReferenceIds: item.id,
      commentTags: "",
      comment: commentData,
      parent: 0,
      thanksFlag: 0,
      status: "Active",
      createdBy: item.createdBy,
    };

    const handleSendComments = async () => {
      if (commentData) {
        console.log(api, "apiiiiiiii");
        await api
          .post("/api/v1/comments/", commentPayload)
          .then((res) => {
            // handleCommentsClose();
            fetchInitialiObservation();
          })
          .catch((err) => console.log(err));
      }
    };

    const deleteItem = {
      fkCompanyId: item.fkCompanyId,
      fkProjectId: item.fkProjectId,
      fkProjectStructureIds: item.fkProjectStructureIds,
      createdBy: item.createdBy,
      updatedBy: JSON.parse(localStorage.getItem("userDetails")).id,
      status: "Delete",
    };

    const handleVisibility = () => {
      setShowGrid(true);
      setHidden(!hidden);
    };

    const handleAttachClose = () => {
      setShowGrid(false);
    };

    const handleAttachClick = () => {
      setShowGrid(!open);
    };

    const handleAttachOpen = () => {
      if (!hidden) {
        setShowGrid(true);
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

    const oneHour = 3 * 60 * 1000;

    return (
      <>
        <CardView
          ifdifferent={
            item.source === "Paper" &&
            moment() - moment(item.createdAt) < oneHour
              ? "latest"
              : ""
          }
          cardTitle={item.observationDetails}
          avatar={item.avatar}
          username={item.username}
          itemId={item.id}
          headerFields={[
            { label: "Number", value: item.observationNumber },
            { label: "Assignee", value: "" },
            { label: "Stage", value: item.observationStage },
            { label: "Status", value: item.observationStatus },
          ]}
          bodyFields={[
            { label: "Type", value: item.observationType },
            { label: "Location", value: item.location },
            {
              label: "Created On",
              value: moment(item.createdAt).format("Do MMMM YYYY, h:mm:ss a"),
            },
            { label: "Created By", value: item.createdByName },
          ]}
          deleteFields={{
            deleteUrl: `/api/v1/observations/${item.id}/`,
            afterDelete: () => {
              fetchInitialiObservation();
            },
            axiosObj: api,
            item: deleteItem,
            loader: setIsLoading,
            loadingFlag: false,
            deleteMsg: "Are you sure you want to delete this iCare?",
            yesBtn: "Yes",
            noBtn: "No",
          }}
          handleVisibility={() => handleVisibility()}
          handleVisibilityComments={() => handleVisibilityComments()}
          files={item.files !== null ? item.files.length : 0}
          // files={item.attachmentCount}
          commentsCount={item.commentsCount}
          handleSummaryPush={() => handleSummaryPush(index, commentPayload)}
          checkDeletePermission={checkDeletePermission}
        />
        {item.files && item.files.length ? (
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
                        {item.files.map((a) => (
                          <div className="attachFileThumb">
                            <Attachment
                              // src={a.fileName}
                              // value={a.fileName}
                              key={a.id}
                              value={a.fileName}
                              type={a.fileType}
                            />
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
      </>
    );
  };

  return (
    <>
      <Box>
        {isLoading ? (
          <>
            <Grid className={classes.marginTopBottom}>
              {listToggle == false ? (
                <div>
                  <div className="gridView">
                    {Object.keys(allInitialData).length > 0 ? (
                      Object.entries(allInitialData).map((item, index) => (
                        <>
                          <AllCardData item={item[1]} index={index} />
                        </>
                      ))
                    ) : (
                      <Typography
                        className={classes.sorryTitle}
                        variant="h6"
                        color="primary"
                        noWrap
                      >
                        Sorry, no matching records found
                      </Typography>
                    )}
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
                    {/* {openAtt !== "" && <Attachment value={openAtt} /> } */}

                    {/* <Dialog
                open={openAttachment}
                onClose={handleCloseAttachment}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classNames={classes.viewAttachmentDialog}
              > */}
                    {/* <DialogTitle id="alert-dialog-title">Viw Attachment</DialogTitle>
                <DialogContent classNames={classes.imageSectionHeight}>
                <Grid container spacing={3} classNames={classes.viewImageSection}>
                  <Grid item md={12} sm={12} xs={12} classNames={classes.mb10}>
                    <ul classNames={classes.viewImageSection}>
                      <li className={classes.viewattch1}>View Attachment</li>
                      <li className={classes.viewattch2}>Download  444 Attachment</li>
                    </ul>
                  </Grid>
                </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAttachment} color="primary" autoFocus>
                    Close
                  </Button>
                </DialogActions> */}

                    {/* </Dialog> */}
                  </div>
                  <div>
                    <Dialog
                      open={myUserPOpen}
                      onClose={handleMyUserPClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth
                      maxWidth="sm"
                    >
                      <UserDetailsView
                        userName={userInfo.name}
                        userIcon={userInfo.userIcon}
                      />

                      <DialogActions>
                        <Button
                          onClick={handleMyUserPClose}
                          color="primary"
                          variant="contained"
                          autoFocus
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              ) : (
                // listview end

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

            {totalData != 0 ? (
              <div className={classes.pagination}>
                {Number.isInteger(pageData) !== true
                  ? totalData < 25 * page
                    ? `${page * 25 - 24} - ${totalData} of ${totalData}`
                    : `${page * 25 - 24} - ${25 * page} of ${totalData}`
                  : `${page * 25 - 24} - ${25 * page} of ${totalData}`}
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handleChange}
                />
              </div>
            ) : null}
          </>
        ) : (
          <Loader />
        )}
      </Box>
    </>
  );
}

// export default Actions;
const mapStateToProps = (state) => ({
  projectName: state.getIn(["InitialDetailsReducer"]),
  todoIncomplete: state,
});

export default connect(
  mapStateToProps,
  null
)(Actions);
