import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Close from "@material-ui/icons/Close";
import { PapperBlock } from "dan-components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useHistory } from "react-router";
import Type from "../../../../styles/components/Fonts.scss";
import api from "../../../../utils/axios";
import { handelActionDataAssessment } from "../../../../utils/CheckerValue";
import ActionShow from "../../../Forms/ActionShow";
import ActionTracker from "../../../Forms/ActionTracker";
import FormSideBar from "../../../Forms/FormSideBar";
import { APPROVAL_FORM } from "../constants";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";
import ahaLogoSymbol from "dan-images/ahaLogoSymbol.png";
import FormLabel from "@material-ui/core/FormLabel";
import Loader from "../../Loader";
import ApprovalValidator from "../Validator/ApprovalValidation";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  access_token,
  ACCOUNT_API_URL,
  SSO_URL,
} from "../../../../utils/constants";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { checkACL } from "../../../../utils/helper";
import DateFormat from "../../../../components/Date/DateFormat";

const useStyles = makeStyles((theme) => ({
  // const styles = theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },

  labelName: {
    fontSize: "0.88rem",
    fontWeight: "400",
    lineHeight: "1.2",
    color: "#737373",
  },
  labelValue: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#063d55",
  },
  custmSubmitBtn: {
    color: "#ffffff",
    backgroundColor: "#06425c",
    lineHeight: "30px",
    border: "none",
    "&:hover": {
      backgroundColor: "#ff8533",
      border: "none",
    },
  },
  updateLink: {
    float: "right",
    fontSize: "0.88rem",
    fontWeight: "400",
    lineHeight: "1.2",
    "& a": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  actionLinkAudit: {
    inlineSize: "max-content",
  },
  addLink: {
    fontSize: "0.88rem",
    fontWeight: "400",
    lineHeight: "1.2",
    "& a": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  increaseRowBox: {
    marginTop: "10px",
    color: "#06425c",
  },
  approvalButton: {
    borderRadius: "4px",
    // backgroundColor: "#83a6b5",
    marginTop: "5px",
    fontSize: "13px",
    fontWeight: "400",
  },
  buttonProgress: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-flex",
  },
  closeIcon: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  formControl: {
    width: "100%",
  },
}));

const Approvals = () => {
  const [form, setForm] = useState({});
  const history = useHistory();
  const [submitLoader, setSubmitLoader] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [actionData, setActionData] = useState([]);
  const [projectData, setProjectData] = useState({
    companyId: "",
    projectId: "",
    createdBy: "",
    ProjectStructId: "",
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [person, setPerson] = useState("");
  const [isDateShow, setIsDateShow] = useState(false);
  const [userList, setUserList] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const handelJobDetails = async () => {
    // const jhaId = handelJhaId()
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`
    );
    const apiData = res.data.data.results;
    if (apiData["closedDate"] === null) {
      apiData["closedDate"] = new Date();
    }
    setForm(apiData);
    setIsLoading(true);
  };

  const handelClose = () => {
    setIsDateShow(false);
    return true;
  };

  const handleCloseDate = (e) => {
    if (new Date(e) < new Date()) {
      setForm({ ...form, closedDate: moment(e).toISOString() });
      error.closedDate = "";
      setError(error);
    } else {
      setForm({ ...form, closeDate: null });
      let errorMessage = "Closed time should not be ahead of current time";
      error.closedDate = errorMessage;
      setError(error);
    }
  };

  const handelActionTracker = async () => {
    let jhaId = localStorage.getItem("fkAHAId");
    const allAction = await handelActionDataAssessment(
      jhaId,
      [],
      "",
      "aha:approval"
    );
    setActionData(allAction);
  };

  const handelActionLink = () => {
    const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;

    const fkCompanyId =
      JSON.parse(localStorage.getItem("company")) !== null
        ? JSON.parse(localStorage.getItem("company")).fkCompanyId
        : null;

    const userId =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).id
        : null;

    const projectStuctId = JSON.parse(localStorage.getItem("commonObject"))[
      "aha"
    ]["projectStruct"];
    setProjectData({
      companyId: fkCompanyId,
      projectId: projectId,
      createdBy: userId,
      ProjectStructId: projectStuctId,
    });
  };

  const handelWorkAndPic = (type) => {
    let user = JSON.parse(localStorage.getItem("userDetails"));
    let name = user.name;
    let id = user.id;
    if (type == "Competent Person (CP)") {
      setForm({
        ...form,
        wrpApprovalUser: name,
        wrpApprovalDateTime: new Date(),
      });
      setProjectOpen(false);
    } else if (type == "Senior Authorized Person (SAP)") {
      setForm({
        ...form,
        sapApprovalUser: name,
        sapApprovalDateTime: new Date(),
      });
      setProjectOpen(false);
    }
  };

  const handleClose = () => {
    setProjectOpen(false);
  };
  const handelSubmit = async () => {
    const { error, isValid } = ApprovalValidator(form, actionData);
    setError(error);
    if (!isValid) {
      return "data not valid";
    }
    setSubmitLoader(true);
    if (form.notifyTo === null) {
      form["notifyTo"] = "null";
    }
    if (form["wrpApprovalUser"] !== null && form["sapApprovalUser"] !== null) {
      let user = JSON.parse(localStorage.getItem("userDetails"));
      let name = user.name;
      let id = user.id;
      form["closedById"] = id;
      form["closedByName"] = name;
      form["closedDate"] = new Date();
      form["ahaStage"] = "Closed";
      form["ahaStatus"] = "Closed";
      localStorage.setItem("Approval", "Done");
    }
    form["qrCodeUrl"] = undefined;
    delete form["ahaAssessmentAttachment"];
    const res = await api.put(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/ `,
      form
    );
    history.push(
      `/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`
    );
  };
  const [projectOpen, setProjectOpen] = useState(false);
  const handleProjectOpen = () => {
    setProjectOpen(true);
  };

  const fetchUserList = async () => {
    let fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    var config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${fkCompanyId}/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    axios(config)
      .then(function(response) {
        if (response.status === 200) {
          const result = response.data.data.results.users;

          setUserList(result);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handleProjectClose = () => {
    setProjectOpen(false);
  };

  useEffect(() => {
    handelJobDetails();
    fetchUserList();
    handelWorkAndPic();
    handelActionTracker();
    handelActionLink();
  }, []);

  const classes = useStyles();
  return (
    <>
      <CustomPapperBlock
        title="Assessment - Approval"
        icon="customDropdownPageIcon ahaPageIcon"
        whiteBg
      >
        {isLoading ? (
          <>
            <Row>
              <Col md={9}>
                <Grid container spacing={3}>
                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25.16"
                        height="28.45"
                        viewBox="0 0 25.16 28.45"
                      >
                        <g
                          id="Group_5490"
                          data-name="Group 5490"
                          transform="translate(-1383 -174.131)"
                        >
                          <g id="approval" transform="translate(1383 174.131)">
                            <path
                              id="Path_5203"
                              data-name="Path 5203"
                              d="M5.821,12.357a.641.641,0,0,0,0,1.283h4.656a.641.641,0,0,0,0-1.283ZM18.006,0a7.156,7.156,0,0,1,3.07,13.618V26.975A1.478,1.478,0,0,1,19.6,28.45H1.475A1.478,1.478,0,0,1,0,26.975V5.186A1.478,1.478,0,0,1,1.475,3.711H11.732A7.153,7.153,0,0,1,18.006,0Zm1.8,14.079a7.159,7.159,0,0,1-8.62-9.1H1.475a.209.209,0,0,0-.146.06.213.213,0,0,0-.06.146V26.973a.206.206,0,0,0,.206.206H19.6a.209.209,0,0,0,.146-.06.213.213,0,0,0,.06-.146V14.079ZM5.821,21.352a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269Zm0-4.494a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269ZM15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z"
                              fill="#06425c"
                            />
                          </g>
                          <g
                            id="approval-2"
                            data-name="approval"
                            transform="translate(1383 174.131)"
                          >
                            <path
                              id="Path_5203-2"
                              data-name="Path 5203"
                              d="M15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z"
                              fill="#fff"
                            />
                          </g>
                        </g>
                      </svg>{" "}
                      Approval
                    </Typography>
                  </Grid>

                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                      <Grid container spacing={3}>
                        <Grid
                          item
                          md={8}
                          xs={12}
                          className="formFieldBTNSection"
                        >
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={classes.labelName}
                          >
                            Competent Person (CP)
                          </Typography>
                          <Button
                            variant="contained"
                            color={
                              form.wrpApprovalUser == ""
                                ? "primary"
                                : "secondary"
                            }
                            className="marginT0"
                            disabled={form.wrpApprovalUser !== null}
                            onClick={(e) => {
                              setProjectOpen(true),
                                setPerson("Competent Person (CP)");
                            }}
                          >
                            {form.wrpApprovalUser == null
                              ? "Approve Now"
                              : "Approved"}
                          </Button>
                        </Grid>
                        {form.wrpApprovalDateTime !== undefined &&
                        form.wrpApprovalDateTime !== null ? (
                          <Grid item xs={12} md={6}>
                            <FormLabel component="legend" className="viewLabel">
                              Approved by
                            </FormLabel>
                            <Typography className="viewLabelValue">
                              {`${form.wrpApprovalUser} , ${DateFormat(
                                form.wrpApprovalDateTime,
                                true
                              )}`}
                            </Typography>
                          </Grid>
                        ) : null}

                        <Grid
                          item
                          md={8}
                          xs={12}
                          className="formFieldBTNSection"
                        >
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={classes.labelName}
                          >
                            Senior Authorized Person (SAP)
                          </Typography>
                          <Button
                            variant="contained"
                            color={
                              form.sapApprovalUser === null
                                ? "primary"
                                : "secondary"
                            }
                            className="marginT0"
                            disabled={form.sapApprovalUser !== null}
                            onClick={(e) => {
                              setProjectOpen(true),
                                setPerson("Senior Authorized Person (SAP)");
                            }}
                          >
                            {form.sapApprovalUser === null
                              ? "Approve Now"
                              : "Approved"}
                          </Button>
                        </Grid>
                        {form.sapApprovalUser !== undefined &&
                        form.sapApprovalUser !== null ? (
                          <Grid item xs={12} md={6}>
                            <FormLabel component="legend" className="viewLabel">
                              Approved by
                            </FormLabel>
                            <Typography className="viewLabelValue">
                              {`${form.sapApprovalUser} , ${DateFormat(
                                form.sapApprovalDateTime,
                                true
                              )}`}
                            </Typography>
                          </Grid>
                        ) : null}

                        {actionData.length == 0 ? (
                          <Grid item md={8}>
                            <p style={{ color: "red" }}>{error.action}</p>
                          </Grid>
                        ) : null}

                        <Grid item md={12} xs={12}>
                          <FormLabel
                            className="checkRadioLabel"
                            component="legend"
                          >
                            Create action{" "}
                          </FormLabel>
                          <ActionTracker
                            actionContext="aha:approval"
                            enitityReferenceId={`${localStorage.getItem(
                              "fkAHAId"
                            )}:00`}
                            setUpdatePage={setUpdatePage}
                            updatePage={updatePage}
                            fkCompanyId={
                              JSON.parse(localStorage.getItem("company"))
                                .fkCompanyId
                            }
                            fkProjectId={
                              JSON.parse(localStorage.getItem("projectName"))
                                .projectName.projectId
                            }
                            fkProjectStructureIds={
                              JSON.parse(localStorage.getItem("commonObject"))[
                                "aha"
                              ]["projectStruct"]
                            }
                            createdBy={
                              JSON.parse(localStorage.getItem("userDetails")).id
                            }
                            handelShowData={handelActionTracker}
                          />
                        </Grid>
                        {checkACL("action_tracker-actions", "view_actions") &&
                        actionData.length > 0 ? (
                          <Grid item md={12} xs={12}>
                            <FormLabel
                              component="legend"
                              className="checkRadioLabel"
                            >
                              Actions
                            </FormLabel>
                            <Table component={Paper}>
                              <TableHead>
                                <TableRow>
                                  <TableCell className="tableHeadCellFirst">
                                    Action number
                                  </TableCell>
                                  <TableCell className="tableHeadCellSecond">
                                    Action title
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              {/* Action show */}
                              <TableBody>
                                {actionData.map((action, index) => (
                                  <>
                                    <TableRow>
                                      <TableCell style={{ width: 50 }}>
                                        {/* <a
                                        href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=${JSON.parse(localStorage.getItem("BaseUrl"))["actionClientID"]}
                                        &response_type=code
                                        &companyId=${fkCompanyId}
                                        &projectId=${JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                                        &targetPage=/action/details/
                                        &targetId=${action.id}`}
                                        target="_blank"
                                      >{action.actionNumber}</a> */}
                                        <Link
                                          className={classes.actionLinkAudit}
                                          display="block"
                                          href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=${
                                            JSON.parse(
                                              localStorage.getItem("BaseUrl")
                                            )["actionClientID"]
                                          }&response_type=code&companyId=${
                                            JSON.parse(
                                              localStorage.getItem("company")
                                            ).fkCompanyId
                                          }&projectId=${
                                            JSON.parse(
                                              localStorage.getItem(
                                                "projectName"
                                              )
                                            ).projectName.projectId
                                          }&targetPage=/action/details/&targetId=${
                                            action.id
                                          }&projectStructure=${localStorage.getItem(
                                            "selectBreakDown"
                                          )}
                                              `}
                                          target="_blank"
                                        >
                                          {action.actionNumber}
                                        </Link>
                                      </TableCell>
                                      <TableCell style={{ width: 50 }}>
                                        {action.actionTitle}
                                      </TableCell>
                                    </TableRow>
                                  </>
                                ))}
                              </TableBody>
                            </Table>
                          </Grid>
                        ) : null}
                        {/* <Grid item md={6} xs={12}>
                {actionData.map((value) => (
                      <ActionShow
                        action={{ id: value.id, number: value.actionNumber }}
                        title={value.actionTitle}
                        companyId={projectData.companyId}
                        projectId={projectData.projectId}
                        updatePage={updatePage}
                      />
                    ))}
                </Grid> */}
                      </Grid>
                    </Paper>
                  </Grid>

                  <Dialog
                    className={classes.projectDialog}
                    open={projectOpen}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        width: "100%",
                        maxWidth: 400,
                      },
                    }}
                  >
                    <DialogTitle onClose={() => handleClose()}>
                      Confirmation
                    </DialogTitle>
                    <IconButton
                      className={classes.closeIcon}
                      onClick={() => handleClose()}
                    >
                      <Close />
                    </IconButton>
                    <DialogContent>
                      <DialogContentText>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.projectSelectionTitle}
                        >
                          You are approving as {person}.
                        </Typography>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Tooltip title="Cancel">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleClose()}
                        >
                          cancel
                        </Button>
                      </Tooltip>
                      <Tooltip title="Ok">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => handelWorkAndPic(person)}
                        >
                          Ok
                        </Button>
                      </Tooltip>
                    </DialogActions>
                  </Dialog>

                  <Grid item md={12} xs={12}>
                    <div className={classes.loadingWrapper}>
                      <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        className="spacerRight buttonStyle"
                        onClick={(e) => handelSubmit()}
                        style={{ marginLeft: "10px" }}
                        disabled={submitLoader}
                      >
                        Submit
                      </Button>
                      {submitLoader && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                    <Button
                      size="medium"
                      variant="contained"
                      color="secondary"
                      className="buttonStyle custmCancelBtn"
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Col>
              <Col md={3}>
                <FormSideBar
                  deleteForm={"hideArray"}
                  listOfItems={APPROVAL_FORM}
                  selectedItem={"Approval"}
                />
              </Col>
            </Row>{" "}
          </>
        ) : (
          <Loader />
        )}
      </CustomPapperBlock>
    </>
  );
};

export default Approvals;
