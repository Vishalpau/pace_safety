import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-grid-system";
import { useHistory } from 'react-router';
import api from "../../../../utils/axios";
import { handelActionData, handelActionDataAssessment } from "../../../../utils/CheckerValue";
import Paper from '@material-ui/core/Paper';
import ActionShow from '../../../Forms/ActionShow';
import ActionTracker from "../../../Forms/ActionTracker";
import FormSideBar from '../../../Forms/FormSideBar';
import FormLabel from '@material-ui/core/FormLabel';
import JhaCommonInfo from "../JhaCommonInfo";
import { handelJhaId } from "../Utils/checkValue";
import { APPROVAL_FORM, SUMMARY_FORM } from "../Utils/constants";
import CircularProgress from '@material-ui/core/CircularProgress';
import jhaLogoSymbol from 'dan-images/jhaLogoSymbol.png';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  // const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },

  labelName: {
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    color: '#737373',
  },
  labelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
  },
  updateLink: {
    float: 'right',
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    '& a': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  addLink: {
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    '& a': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  increaseRowBox: {
    marginTop: '10px',
    color: '#06425c',
  },
  approvalButton: {
    borderRadius: '4px',
    marginTop: '5px',
    fontSize: '13px',
    fontWeight: '400',
  },
  aLabelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
    float: 'left',
    width: '100%',
  },
  updateLink: {
    float: 'left',
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    '& a': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  actionTitleLable: {
    float: 'right',
    width: 'calc(100% - 100px)',
    textAlign: 'right',
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
  },
  custmSubmitBtn: {
    color: '#ffffff',
    backgroundColor: '#06425c',
    lineHeight: '30px',
    border: 'none',
    '&:hover': {
      backgroundColor: '#ff8533',
      border: 'none',
    },
    marginLeft: "20px"
  },
  approvalButtonColor: {
    backgroundColor: '#ff8533 !important',
    borderRadius: '4px',
    marginTop: '5px',
    fontSize: '13px',
    fontWeight: '400',
    display: 'block',
    color: '#ffffff !important',
    borderRadius: '20px',
  },
}));

const Approvals = () => {

  const [form, setForm] = useState({})
  const [check, setCheck] = useState({ wrp: false, pic: false })
  const history = useHistory()
  const [submitLoader, setSubmitLoader] = useState(false)
  const [updatePage, setUpdatePage] = useState(false)
  const [actionData, setActionData] = useState([])
  const [projectData, setProjectData] = useState({
    companyId: "",
    projectId: "",
    createdBy: "",
    ProjectStructId: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const handelJobDetails = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/`)
    const apiData = res.data.data.results

    setForm(apiData)
    setCheck({
      ...check,
      wrp: apiData.wrpApprovalUser !== null ? true : false,
      pic: apiData.picApprovalUser !== null ? true : false
    })
  }

  const handelWorkAndPic = (type) => {
    let user = JSON.parse(localStorage.getItem("userDetails"))
    let name = user.name
    if (type == "work") {
      setOpen(false)
      setCheck({ ...check, wrp: !check.wrp })
      setForm({ ...form, wrpApprovalUser: name, wrpApprovalDateTime: new Date() })
    } else if (type == "pic") {
      check.pic == false && alert("You have approved person incharge")
      setCheck({ ...check, pic: !check.pic })
      setForm({ ...form, picApprovalUser: name, picApprovalDateTime: new Date() })
    }
  }

  const handelActionTracker = async () => {
    let jhaId = localStorage.getItem("fkJHAId")

    let allAction = await handelActionDataAssessment(jhaId, [], "title", "jha:approval")
    let temp = []
    allAction.map((value) => {
      if (value.enitityReferenceId.split(":")[1] == "00") {
        temp.push(value)
      }
    })
    setActionData(temp !== null ? temp : [])
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

    const projectStuctId = JSON.parse(localStorage.getItem("commonObject"))["jha"]["projectStruct"]
    setProjectData({
      companyId: fkCompanyId,
      projectId: projectId,
      createdBy: userId,
      ProjectStructId: projectStuctId,
    })
  }

  const handelSubmit = async () => {
    await setSubmitLoader(true)
    delete form["jhaAssessmentAttachment"]
    if (form["wrpApprovalUser"] == null) {
      form["wrpApprovalUser"] = ""
    }
    const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, form)
    history.push(SUMMARY_FORM["Summary"])
    setSubmitLoader(false)
  }

  const handelCallBack = async () => {
    await setLoading(true);
    await handelActionLink();
    await handelJobDetails();
    await handelWorkAndPic();
    await handelActionTracker();
    await setLoading(false);
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    handelCallBack()
  }, [])


  const classes = useStyles();
  return (
    <>
      <CustomPapperBlock title="Assessment - Approval" icon={jhaLogoSymbol} whiteBg>
        {/* {console.log(projectData)} */}
        {loading == false ?
          <Row>
            <Col md={9}>
              <Grid container spacing={3}>

                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25.16" height="28.45" viewBox="0 0 25.16 28.45">
                      <g id="Group_5490" data-name="Group 5490" transform="translate(-1383 -174.131)">
                        <g id="approval" transform="translate(1383 174.131)">
                          <path id="Path_5203" data-name="Path 5203" d="M5.821,12.357a.641.641,0,0,0,0,1.283h4.656a.641.641,0,0,0,0-1.283ZM18.006,0a7.156,7.156,0,0,1,3.07,13.618V26.975A1.478,1.478,0,0,1,19.6,28.45H1.475A1.478,1.478,0,0,1,0,26.975V5.186A1.478,1.478,0,0,1,1.475,3.711H11.732A7.153,7.153,0,0,1,18.006,0Zm1.8,14.079a7.159,7.159,0,0,1-8.62-9.1H1.475a.209.209,0,0,0-.146.06.213.213,0,0,0-.06.146V26.973a.206.206,0,0,0,.206.206H19.6a.209.209,0,0,0,.146-.06.213.213,0,0,0,.06-.146V14.079ZM5.821,21.352a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269Zm0-4.494a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269ZM15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z" fill="#06425c" />
                        </g>
                        <g id="approval-2" data-name="approval" transform="translate(1383 174.131)">
                          <path id="Path_5203-2" data-name="Path 5203" d="M15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z" fill="#fff" />
                        </g>
                      </g>
                    </svg> Approval
                  </Typography>
                </Grid>


                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>

                      <Grid
                        item
                        md={8}
                        xs={12}
                        className={classes.formBox}
                      >


                        <Grid item xs={12} className="formFieldBTNSection" align="left">
                          <Button
                            color={check.wrp ? "secondary" : "primary"}
                            variant="contained"
                            className="marginT0"
                            onClick={(e) => setOpen(true)}
                          >
                            {check.wrp ? "Approved" : "Approve Now"}
                          </Button>
                          <Button disabled variant="contained" color="primary" className={classes.approvalButtonColor}>Approved</Button>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <FormLabel component="legend" className="viewLabel">Approved by</FormLabel>
                          <Typography className="viewLabelValue">
                            {form.wrpApprovalDateTime !== undefined && form.wrpApprovalUser !== null
                              &&
                              form.wrpApprovalDateTime !== `Approved by: ${form.wrpApprovalUser} on Date ${moment(new Date()).format('DD MMMM YYYY, h:mm:ss a')}` ?
                              `${form.wrpApprovalUser} ${moment(form.wrpApprovalDateTime).format('DD MMMM YYYY, h:mm:ss a')}`
                              : null
                            }
                          </Typography>
                        </Grid>


                        <Grid item md={12} sm={12} xs={12} className="paddBRemove">
                          <FormLabel className="checkRadioLabel" component="legend">PIC (if attended the toolbox meeting)</FormLabel>
                        </Grid>
                        <Grid item xs={12} className="formFieldBTNSection" align="left">
                          <Button
                            variant="contained"
                            color="primary"
                            className="marginT0"
                          >
                            Approve now
                          </Button>
                        </Grid>

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

                      <Grid item md={12} xs={12}>
                        <Typography variant="h6" gutterBottom className={classes.labelName}>
                          <FormLabel className="checkRadioLabel" component="legend">Create action </FormLabel>
                          <ActionTracker
                            actionContext="jha:approval"
                            enitityReferenceId={`${localStorage.getItem("fkJHAId")}:00`}
                            setUpdatePage={setUpdatePage}
                            updatePage={updatePage}
                            fkCompanyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                            fkProjectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                            fkProjectStructureIds={JSON.parse(localStorage.getItem("commonObject"))["jha"]["projectStruct"]}
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
                              fkCompanyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                              fkProjectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                              fkProjectStructureIds={JSON.parse(localStorage.getItem("commonObject"))["jha"]["projectStruct"]}
                              createdBy={JSON.parse(localStorage.getItem('userDetails')).id}
                              handelShowData={handelActionTracker}
                            />))}
                        </Typography>

                      </Grid>

                      <Grid item md={12} sm={12} xs={12} className="paddBRemove">
                        <FormLabel className="checkRadioLabel" component="legend">Signature</FormLabel>
                      </Grid>
                      <Grid item xs={12} className="formFieldBTNSection" align="left">
                        <Button
                          variant="contained"
                          color="primary"
                          className="marginT0"
                        >
                          Sign now
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* submitLoader */}
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <div className={classes.loadingWrapper}>
                    <Button
                      variant="outlined"
                      size="medium"
                      className={classes.custmSubmitBtn}
                      onClick={(e) => handelSubmit()}
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
                    variant="outlined"
                    size="medium"
                    color="secondary"
                    className={classes.custmSubmitBtn}
                    onClick={(e) => history.push(SUMMARY_FORM["Summary"])}
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
          </Row>
          : "Loading..."}
      </CustomPapperBlock>
    </>
  );
};

export default Approvals;