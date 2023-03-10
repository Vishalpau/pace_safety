import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

import MenuItem from "@material-ui/core/MenuItem";
import paceLogoSymbol from "dan-images/paceLogoSymbol.png";
import "../../../styles/custom/customheader.css";
import { useHistory, useParams } from "react-router";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import api from "../../../utils/axios";
import { handelCommonObject } from "../../../utils/CheckerValue";
import Loader from "../Loader";
import { checkACL } from "../../../utils/helper";
import Attachment from "../../Attachment/Attachment";
import CardView from "../../../components/Card/Index";
import { jhaLabels } from "../../../components/Card/CardConstants";
import DateFormat from "../../../components/Date/DateFormat";
import AddCommentsComponent from "../../addComments/AddComments";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    borderRadius: "4px",
  },
  leftSide: {
    flexGrow: 1,
  },
  viewImageSection: {
    textAlign: "center",
    "& MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-1": {
      textAlign: "center",
      minHeight: "100px",
    },
  },
  rightSide: {
    flexGrow: 8,
    textAlign: "right",
  },
  mb10: { marginBottom: "10px !important" },
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
  statusCompleted: {
    color: "#024c9a",
    fontSize: "0.88rem",
    fontFamily: "Montserrat-Regular",
    "& a": {
      paddingLeft: "5px",
      cursor: "pointer",
      color: "rgba(0, 0, 0, 0.87)",
      fontWeight: "600",
    },
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
    margin: "15px 15px 15px 8px",
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
  newIncidentButton: {
    marginTop: "20px",
    marginLeft: "5px",
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
    ["@media (max-width:480px)"]: {
      textAlign: "left",
      padding: "0px 8px 15px 8px !important",
    },
  },
  userImage: {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    marginRight: "10px",
    objectFit: "contain",
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
  formControlOwnership: {
    width: "100%",
    marginBottom: "30px",
  },
  cardActionBottomBox: {
    ["@media (max-width:480px)"]: {
      padding: "8px !important",
    },
  },

  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
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

function JhaPackage(props) {
  const [allJHAData, setAllJHAData] = useState([]);
  const search = props.search;
  const status = props.status;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [checkDeletePermission, setCheckDeletePermission] = useState(false);

  const fetchData = async () => {
    // setIsLoading(false);
    setPage(1);
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

    if (props.assessment === "My Assessments") {
      const res = await api.get(
        `api/v1/jhas/?search=${props.search
        }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&jhaStatus=${status}`
      );

      const result = res.data.data.results.results;
      setAllJHAData(result);
      setTotalData(res.data.data.results.count);
      setPageData(res.data.data.results.count / 25);
      let pageCount = Math.ceil(res.data.data.results.count / 25);
      setPageCount(pageCount);
    } else if (props.assessment === "Bookmark List") {
      const loginId = JSON.parse(localStorage.getItem("userDetails")).id;
      const res = await api.get(
        `api/v1/jhas/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&bookmarked_by=${loginId}`
      );
      if (loginId === 6 && res.data.data) {
        const result = res.data.data.results.results;
        setAllJHAData(result);
        setTotalData(res.data.data.results.count);
        setPageData(res.data.data.results.count / 25);
        let pageCount = Math.ceil(res.data.data.results.count / 25);
        setPageCount(pageCount);
      } else {
        if (res.data.data) {
          const result = res.data.data.results.results;
          setAllJHAData(result);
          setTotalData(res.data.data.results.count);
          setPageData(res.data.data.results.count / 25);
          let pageCount = Math.ceil(res.data.data.results.count / 25);
          setPageCount(pageCount);
        } else {
          const result = res;
          setAllJHAData(result);
        }
      }
    } else {
      const res = await api.get(
        `api/v1/jhas/?search=${props.search
        }&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&jhaStatus=${status}`
      );

      const result = res.data.data.results.results;
      setAllJHAData(result);
      setTotalData(res.data.data.results.count);
      setPageData(res.data.data.results.count / 25);
      let pageCount = Math.ceil(res.data.data.results.count / 25);
      setPageCount(pageCount);
    }
    // handelTableView(result)

    setIsLoading(true);
  };

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
    let struct = "";

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    const createdBy =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).id
        : null;
    if (props.observation === "My Assessments") {
      const res = await api.get(
        `api/v1/jhas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&createdBy=${createdBy}&jhaStatus=${status}&page=${value}`
      );
      setAllJHAData(res.data.data.results.results);
      setPage(value);
    } else if (props.observation === "Bookmark List") {
      const loginId = JSON.parse(localStorage.getItem("userDetails")).id;
      const res = await api.get(
        `api/v1/jhas/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&bookmarked_by=${loginId}`
      );
      setAllJHAData(res.data.data.results.results);
      setPage(value);
    } else {
      const res = await api.get(
        `api/v1/jhas/?search=${search}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&jhaStatus=${status}&page=${value}`
      );
      setAllJHAData(res.data.data.results.results);
      setPage(value);
    }
  };

  const classes = useStyles();

  const handleSummaryPush = async (selectedJha) => {
    const jha = selectedJha;
    localStorage.setItem("fkJHAId", jha.id);
    handelCommonObject(
      "commonObject",
      "jha",
      "projectStruct",
      jha.fkProjectStructureIds
    );
    localStorage.removeItem("JSAAssessments");
    localStorage.removeItem("JSAApproval");
    localStorage.removeItem("JSAlessonsLearned");
    history.push({
      pathname: `/app/pages/jha/jha-summary/${jha.id}`,
      state: {
        redirectUrl: "/app/pages/jha/assessments/Job-hazards",
      },
    });
  };

  useEffect(() => {
    fetchData();
    setCheckDeletePermission(checkACL("safety-jha", "delete_jha"));
  }, [
    props.projectName.breakDown,
    props.search,
    props.assessment,
    props.status,
  ]);

  const AllCardData = ({ item, index }) => {
    const [showGrid, setShowGrid] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [value, setValue] = React.useState(2);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [hiddenn, setHiddenn] = useState(false);
    const [myUserPOpen, setMyUserPOpen] = React.useState(false);
    const [commentData, setCommentData] = useState("");
    const [isCardLoading, setIsCardLoading] = useState(false);

    let deleteItem = {
      fkCompanyId: item.fkCompanyId,
      fkProjectId: item.fkProjectId,
      fkProjectStructureIds: item.fkProjectStructureIds,
      createdBy: item.createdBy,
      updatedBy: JSON.parse(localStorage.getItem("userDetails")).id,
      status: "Delete",
    };

    const commentPayload = {
      fkCompanyId: item.fkCompanyId,
      fkProjectId: item.fkProjectId,
      commentContext: "jha",
      contextReferenceIds: item.id,
      commentTags: "",
      comment: commentData,
      parent: 0,
      thanksFlag: 0,
      status: "Active",
      createdBy: item.createdBy,
    };

    function handleVisibilityComments() {
      setCommentsOpen(true);
      setHiddenn(!hiddenn);
      setCommentData("");
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

    const handleComments = (type) => {
      if (type === "handleCommentsClose") {
        setCommentsOpen(false);
      } else if ("handleCommentsClick") {
        setCommentsOpen(!open);
      } else if (type === "handleCommentsOpen") {
        setCommentsOpen(true);
      } else if ("visibility") {
        setShowGrid(true);
        setHidden(!hidden);
      }
    };

    const handleChangeOne = (event, newValue) => {
      setValue(newValue);
    };

    const handleVisibility = () => {
      setShowGrid(true);
      setHidden(!hidden);
    };

    const handleMyUserPClose = () => {
      setMyUserPOpen(false);
    };

    return (
      <Grid className={classes.marginTopBottom}>
        <div className="gridView">
          <CardView
            redirectUrl={`/app/comments/jha/${item.id}`}
            commentPayload={commentPayload}
            cardTitle={item.description}
            avatar={item.avatar}
            username={item.username}
            itemId={item.id}
            headerFields={[
              { label: jhaLabels.header[0], value: item.jhaNumber },
              { label: jhaLabels.header[1], value: "JSA" },
              { label: jhaLabels.header[2], value: item.jhaStage },
              {
                label: jhaLabels.header[3],
                value:
                  item.jhaStatus === "Assessment" ? "Open" : item.jhaStatus,
              },
            ]}
            bodyFields={[
              { label: jhaLabels.body[0], value: item.location },
              {
                label: jhaLabels.body[1],
                value: DateFormat(item.createdAt, true),
              },
              {
                label: jhaLabels.body[2],
                value: item.createdByName,
              },
            ]}
            deleteFields={{
              deleteUrl: `/api/v1/jhas/${item.id}/`,
              afterDelete: () => {
                fetchData();
              },
              axiosObj: api,
              item: deleteItem,
              loader: setIsLoading,
              loadingFlag: false,
              deleteMsg: "Are you sure you want to delete this JSA?",
              yesBtn: "Yes",
              noBtn: "No",
              dataLength: allJHAData.length,
            }}
            printFields={{
              typeOfModule: "JHA",
              printUrl: `api/v1/jhas/${item.id}/print/`,
              number: item.jhaNumber,
            }}
            bookmarkFields={{
              typeOfModule: "jhas",
              itemId: item.id,
              bookmarkTrueFalse: item.bookmark,
              getBookmarkView: props.assessment,
            }}
            RefreshBookmarkData={fetchData}
            handleVisibility={() => handleVisibility()}
            handleVisibilityComments={() => handleVisibilityComments()}
            handleSummaryPush={() => handleSummaryPush(item)}
            files={item.files !== null ? item.files.length : 0}
            commentsCount={item.commentsCount}
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
              className="paddTBRemove"
            >
              <Paper elevation={1} className="cardSectionBottom">
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ margin: "0 -10px" }}
                  >
                    {item.files.map((a) => (
                      <div
                        className="attachFileThumb"
                        style={{ width: "auto", margin: "0 10px" }}
                      >
                        <Attachment
                          key={a.id}
                          value={a.fileName}
                          type={a.fileType}
                        />
                      </div>
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ) : (
            ""
          )}
        </div>

        <AddCommentsComponent
          commentPayload={commentPayload}
          commentOpen={commentsOpen}
          commentData={commentData}
          hiddenn={hiddenn}
          isLoading={isCardLoading}
          setIsLoading={(val) => setIsCardLoading(val)}
          fetchAllData={fetchData}
          handleComments={(type) => handleComments(type)}
          handleVisibilityComments={handleVisibilityComments}
          addComments={(value) => setCommentData(value)}
        />

        <Dialog
          open={myUserPOpen}
          onClose={handleMyUserPClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle classNames={classes.mb10} id="alert-dialog-title">
            <img src={paceLogoSymbol} className={classes.userImage} /> {"Admin"}
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
                    <ListItemText primary="Full Name:" secondary="Prakash" />
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
                    <ListItemText primary="Role Title:" secondary="N/A" />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Current Location:"
                      secondary="Delhi ?? NCT ?? India"
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
      <Button onClick={handleMyUserPClose} className="custmCancelBtn" variant="contained" autoFocus>
        Close
      </Button>
    </DialogActions> */}
        </Dialog>
      </Grid>
    );
  };

  return (
    <>
      {isLoading ? (
        <Box>
          {allJHAData !== undefined && allJHAData.length > 0 ? (
            Object.entries(allJHAData).map((singleitem, index) => (
              <Grid className={classes.marginTopBottom}>
                <div className="gridView">
                  <AllCardData item={singleitem[1]} index={index} />
                </div>
              </Grid>
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

          <div className={classes.pagination}>
            {totalData != 0
              ? Number.isInteger(pageData) !== true
                ? totalData < 25 * page
                  ? `${page * 25 - 24} - ${totalData} of ${totalData}`
                  : `${page * 25 - 24} - ${25 * page} of ${totalData}`
                : `${page * 25 - 24} - ${25 * page} of ${totalData}`
              : null}
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </div>
        </Box>
      ) : (
        <Loader />
      )}
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
