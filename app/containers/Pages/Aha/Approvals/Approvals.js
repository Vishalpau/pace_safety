import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
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
  const [isLoading, setIsLoading] = useState(false)
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
  };
  const handleClose = () => {
    setOpen(false)
  }
  const handelSubmit = async () => {
    await setSubmitLoader(true)

    delete form["ahaAssessmentAttachment"];
    const res = await api.put(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/ `,
      form
    );
    history.push(`/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`);
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
      <PapperBlock title="Approval" icon="ion-md-list-box">
        {isLoading ? <>
          <Row>
            <Col md={9}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={Type.labelName} gutterBottom>
                    Aha number
                  </Typography>

                  <Typography varint="body1" className={Type.labelValue}>
                    {form.ahaNumber ? form.ahaNumber : "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={Type.labelName} gutterBottom>
                    Aha assessment data
                  </Typography>
                  <Typography className={Type.labelValue}>
                    {moment(form.ahaAssessmentDate).format(
                      "Do MMMM YYYY"
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={Type.labelName} gutterBottom>
                    Aha description
                  </Typography>
                  <Typography className={Type.labelValue}>
                    {form.description ? form.description : "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={Type.labelName} gutterBottom>
                    Aha location
                  </Typography>
                  <Typography className={Type.labelValue}>
                    {form.location ? form.location : "-"}
                  </Typography>
                </Grid>
                <Grid item md={8} xs={12} className={classes.formBox}>

                  <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Work Responsible Person (WRP)
                  </Typography>
                  <Button
                    variant="contained"
                    color={form.wrpApprovalUser == "" ? "primary" : "secondary"}
                    className={classes.approvalButton}
                    onClick={(e) => setOpen(true)}
                  >
                    {form.wrpApprovalUser == "" ? "Approve Now" : "Approved"}
                  </Button>
                  <div>
                    {form.wrpApprovalDateTime !== undefined
                      &&
                      form.wrpApprovalDateTime !== null ?
                      `Approved By: ${form.wrpApprovalUser} on Date: ${moment(form.wrpApprovalDateTime).format('MMMM Do YYYY, h:mm:ss a')}`
                      : null
                    }
                  </div>
                </Grid>

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
                <Grid item md={8} xs={12} className={classes.formBox}>

                  <Typography variant="h6" gutterBottom className={classes.labelName}>

                    If not approved then create a action.
                  </Typography>
                </Grid>

                <Grid item md={6} xs={12}>
                  <Typography variant="h6" gutterBottom className={classes.labelName}>
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
                  </Typography>
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

                <Grid item md={12} xs={12}>
                  <div className={classes.loadingWrapper}>

                    <Button
                      variant="outlined"
                      onClick={(e) => handelSubmit()}
                      className={classes.custmSubmitBtn}
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
          </Row> </> : <h1>Loading...</h1>}
      </PapperBlock>
    </>
  );
};

export default Approvals;
