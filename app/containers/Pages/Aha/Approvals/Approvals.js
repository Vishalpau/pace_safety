import { Button, CircularProgress, Grid, Typography,TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Close from '@material-ui/icons/Close';
import { PapperBlock } from "dan-components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useHistory } from "react-router";
import Type from "../../../../styles/components/Fonts.scss";
import api from "../../../../utils/axios";
import { handelActionDataAssessment } from "../../../../utils/CheckerValue";
import ActionShow from '../../../Forms/ActionShow';
import ActionTracker from "../../../Forms/ActionTracker";
import FormSideBar from '../../../Forms/FormSideBar';
import { APPROVAL_FORM } from "../constants";
import Paper from '@material-ui/core/Paper';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import ahaLogoSymbol from 'dan-images/ahaLogoSymbol.png';
import FormLabel from '@material-ui/core/FormLabel';
import Loader from "../../Loader"




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
    position: 'absolute',
    top: '1rem',
    right: '1rem'
  }
}));

const Approvals = () => {
  const [form, setForm] = useState({});
  const history = useHistory();
  const [submitLoader, setSubmitLoader] = useState(false);
  const [updatePage, setUpdatePage] = useState(false)
  const [actionData, setActionData] = useState([])
  const [projectData, setProjectData] = useState({
    companyId: "",
    projectId: "",
    createdBy: "",
    ProjectStructId: "",
  })
  const [ error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const user =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

  const handelJobDetails = async () => {
    // const jhaId = handelJhaId()
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`
    );
    const apiData = res.data.data.results;
    setForm(apiData);
    setIsLoading(true)
  };

  const handelActionTracker = async () => {
    let jhaId = localStorage.getItem("fkAHAId")
    const allAction = await handelActionDataAssessment(jhaId, [], "", "aha:approval");
    setActionData(allAction)
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

    const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).id
      : null;

    const projectStuctId = JSON.parse(localStorage.getItem("commonObject"))["aha"]["projectStruct"]
    setProjectData({
      companyId: fkCompanyId,
      projectId: projectId,
      createdBy: userId,
      ProjectStructId: projectStuctId,
    })
  }

  const handelWorkAndPic = (type) => {
    let user = JSON.parse(localStorage.getItem("userDetails"));
    let name = user.name;
    if (type == "work") {
      setForm({
        ...form,
        wrpApprovalUser: name,
        wrpApprovalDateTime: new Date(),
      });
      setOpen(false)
    } else if (type == "pic") {
      setForm({
        ...form,
        picApprovalUser: name,
        picApprovalDateTime: new Date(),
      });
    }
    handleProjectClose()
  };
  const handleClose = () => {
    setOpen(false)
  }
  const handelSubmit = async () => {
    if(form.notifyTo === null){
      form['notifyTo'] = "null"
    }
    const { error, isValid} = ApprovalValidator(form , actionData)
    await setError(error)
    if(!isValid) {
      return "data not valid"
    }
    await setSubmitLoader(true)

    delete form["ahaAssessmentAttachment"];
    const res = await api.put(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/ `,
      form
    );
    history.push(`/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`);
  };
const [projectOpen , setProjectOpen] = useState(false)
  const handleProjectOpen = () => {
    setProjectOpen(true);
  };

  const handleProjectClose = () => {
    setProjectOpen(false);
  };

  useEffect(() => {
    handelJobDetails();
    handelWorkAndPic();
    handelActionTracker();
    handelActionLink();
  }, []);

  const classes = useStyles();
  return (
    <>
        <CustomPapperBlock title="Assessment - Approval" icon={ahaLogoSymbol} whiteBg>
        {isLoading ? <>
          <Row>
            <Col md={9}>
              <Grid container spacing={3}>

              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25.16" height="28.45" viewBox="0 0 25.16 28.45">
                    <g id="Group_5490" data-name="Group 5490" transform="translate(-1383 -174.131)">
                      <g id="approval" transform="translate(1383 174.131)">
                        <path id="Path_5203" data-name="Path 5203" d="M5.821,12.357a.641.641,0,0,0,0,1.283h4.656a.641.641,0,0,0,0-1.283ZM18.006,0a7.156,7.156,0,0,1,3.07,13.618V26.975A1.478,1.478,0,0,1,19.6,28.45H1.475A1.478,1.478,0,0,1,0,26.975V5.186A1.478,1.478,0,0,1,1.475,3.711H11.732A7.153,7.153,0,0,1,18.006,0Zm1.8,14.079a7.159,7.159,0,0,1-8.62-9.1H1.475a.209.209,0,0,0-.146.06.213.213,0,0,0-.06.146V26.973a.206.206,0,0,0,.206.206H19.6a.209.209,0,0,0,.146-.06.213.213,0,0,0,.06-.146V14.079ZM5.821,21.352a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269Zm0-4.494a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269ZM15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z" fill="#06425c"/>
                      </g>
                      <g id="approval-2" data-name="approval" transform="translate(1383 174.131)">
                        <path id="Path_5203-2" data-name="Path 5203" d="M15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z" fill="#fff"/>
                      </g>
                    </g>
                  </svg> Approval
                </Typography>
              </Grid>

              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={classes.labelName} gutterBottom>
                    Aha number
                  </Typography>

                  <Typography varint="body1" className={Type.labelValue}>
                    {form.ahaNumber ? form.ahaNumber : "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={classes.labelName} gutterBottom>
                    Aha assessment data
                  </Typography>
                  <Typography className={Type.labelValue}>
                    {moment(form.ahaAssessmentDate).format(
                      "Do MMMM YYYY"
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={classes.labelName} gutterBottom>
                    Aha description
                  </Typography>
                  <Typography className={Type.labelValue}>
                    {form.description ? form.description : "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={classes.labelName} gutterBottom>
                    Aha location
                  </Typography>
                  <Typography className={Type.labelValue}>
                    {form.location ? form.location : "-"}
                  </Typography>
                </Grid>
                <Grid item md={8} xs={12} className="formFieldBTNSection">

                  <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Work Responsible Person (WRP)
                  </Typography>
                  <Button
                    variant="contained"
                    color={form.wrpApprovalUser == "" ? "primary" : "secondary"}
                    className="marginT0"
                    onClick={handleProjectOpen}

                    // onClick={(e) => setOpen(true)}
                  >
                    {form.wrpApprovalUser == "" ? "Approve Now" : "Approved"}
                  </Button>
                </Grid>
                {form.wrpApprovalDateTime !== undefined
                      &&
                      form.wrpApprovalDateTime !== null ?
                <Grid item xs={12} md={6}>
                  <FormLabel component="legend" className="viewLabel">Approved by</FormLabel>
                  <Typography className="viewLabelValue">
                  {`${form.wrpApprovalUser} , ${moment(form.wrpApprovalDateTime).format('MMMM Do YYYY, h:mm:ss a')}`}          
                  </Typography>
                </Grid> : null}

                <Grid item md={8} xs={12} className={classes.formBox}>

                  <Typography variant="h6" gutterBottom className={classes.labelName}>

                    If not approved then create a action.
                  </Typography>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormLabel className="checkRadioLabel" component="legend">Create action </FormLabel>
                    <ActionTracker
                      actionContext="aha:approval"
                      enitityReferenceId={`${localStorage.getItem("fkAHAId")}:00`}
                      setUpdatePage={setUpdatePage}
                      updatePage={updatePage}
                      fkCompanyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                      fkProjectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                      fkProjectStructureIds={JSON.parse(localStorage.getItem("commonObject"))["aha"]["projectStruct"]}
                      createdBy={JSON.parse(localStorage.getItem('userDetails')).id}
                      handelShowData={handelActionTracker}
                    />
                  <Typography className={classes.aLabelValue}>
                    {actionData.map((value) => (
                      <ActionShow
                        action={{ id: value.id, number: value.actionNumber }}
                        title={value.actionTitle}
                        companyId={projectData.companyId}
                        projectId={projectData.projectId}
                        updatePage={updatePage}
                      />
                    ))}
                  </Typography>
                </Grid>

                </Grid>
                </Paper>
                </Grid>

                <Dialog
                  className={classes.projectDialog}
                  fullScreen
                  scroll='paper'
                  open={projectOpen}
                  onClose={handleProjectClose}
                >
                  <DialogTitle onClose={handleProjectClose}>
                    Approval of AHA - 127634
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Grid container spacing={4}>
                        <Grid item md={3} xs={12}>
                          <Grid
                          item
                          md={12}
                          xs={12}
                          margin="dense"
                          className={classes.formLablBox}
                          >
                            <Typography variant="h6" className={classes.labelName} style={{paddingBottom: '10px'}}>Please enter your pin</Typography>
                          </Grid>
                          <Grid
                          item
                          md={12}
                          xs={12}
                          className={classes.formBox}
                          >
                            <TextField
                              label="Enter pin"
                              name="enterpin"
                              id="enterpin"
                              defaultValue=""
                              fullWidth
                              variant="outlined"
                              className={classes.formControl}
                          />
                          </Grid>
                        </Grid>

                        {/* <Grid
                          item
                          md={12}
                          xs={12}
                          className={classes.popBttn}
                          >
                            <Button variant="outlined" size="medium" style={{marginLeft: '5px'}} className={classes.custmSubmitBtn}>Submit</Button>
                            <Button variant="outlined" size="medium" className={classes.custmCancelBtn}>Cancel</Button>
                          </Grid> */}
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                  <Grid item md={5} sm={6} xs={12} className={classes.popUpButtonBig}>
                    <DialogActions align="left" className="marginB10">
                      <Button color="primary" variant="contained" className="spacerRight buttonStyle" onClick={(e) => handelWorkAndPic("work")}>
                        Submit
                      </Button>
                      <Button onClick={handleProjectClose} color="secondary" variant="contained" className="buttonStyle custmCancelBtn">
                        Cancel
                      </Button>
                    </DialogActions> 
                  </Grid>
                </Dialog>

                <Dialog
                  className={classes.projectDialog}
                  open={open}
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
                  <IconButton className={classes.closeIcon} onClick={() => handleClose()}><Close /></IconButton>
                  <DialogContent>
                    <DialogContentText>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.projectSelectionTitle}
                      >
                        You are approving work responsible person.
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
                        onClick={(e) => handelWorkAndPic("work")}
                      >
                        Ok
                      </Button>
                    </Tooltip>
                  </DialogActions>
                </Dialog>
                

                

                <Grid item md={12} xs={12}>
                  <div className={classes.loadingWrapper}>

                    <Button size="medium" 
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
                    )}</div>
                    <Button size="medium"
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
          </Row> </> : <Loader/>}
      </CustomPapperBlock>
    </>
  );
};

export default Approvals;