import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-grid-system";
import { useHistory } from 'react-router';
import api from "../../../../utils/axios";
import { handelActionData } from "../../../../utils/CheckerValue";
import ActionShow from '../../../Forms/ActionShow';
import ActionTracker from "../../../Forms/ActionTracker";
import FormSideBar from '../../../Forms/FormSideBar';
import JhaCommonInfo from "../JhaCommonInfo";
import { handelJhaId } from "../Utils/checkValue";
import { APPROVAL_FORM, SUMMARY_FORM } from "../Utils/constants";


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
}));

const Approvals = () => {

  const [form, setForm] = useState({})
  const [check, setCheck] = useState({ wrp: false, pic: false })
  const history = useHistory()
  const [updatePage, setUpdatePage] = useState(false)
  const [actionData, setActionData] = useState([])
  const [projectData, setProjectData] = useState({
    companyId: "",
    projectId: "",
    createdBy: "",
    ProjectStructId: "",
  })

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
    let name = user.id
    if (type == "work") {
      check.wrp == false && alert("You have approved work responsible person")
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

    let allAction = await handelActionData(jhaId, [], "title")
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
    delete form["jhaAssessmentAttachment"]
    if (form["wrpApprovalUser"] == null) {
      form["wrpApprovalUser"] = ""
    }
    const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, form)
    history.push(SUMMARY_FORM["Summary"])
  }

  const handelCallBack = async () => {
    await handelActionLink()
    await handelJobDetails()
    await handelWorkAndPic()
    await handelActionTracker()
  }

  useEffect(() => {
    handelCallBack()
  }, [])

  const classes = useStyles();
  return (
    <>
      <PapperBlock title="Approval" icon="ion-md-list-box">
        {/* {console.log(projectData)} */}
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>

              <Grid
                item
                xs={12}
              >
                <JhaCommonInfo />
              </Grid>

              <Grid
                item
                md={8}
                xs={12}
                className={classes.formBox}
              >
                <Typography variant="h6" gutterBottom className={classes.labelName}>
                  Work Responsible Person (WRP)
                </Typography>
                <Button
                  variant="contained"
                  color={check.wrp ? "secondary" : "primary"}
                  className={classes.approvalButton}
                  onClick={(e) => handelWorkAndPic("work")}
                >
                  {check.wrp ? "Approved" : "Approve Now"}
                </Button>
                <div>
                  {form.wrpApprovalDateTime !== undefined
                    &&
                    form.wrpApprovalDateTime !== null ?
                    `${form.wrpApprovalUser} ${moment(form.wrpApprovalDateTime).format('MMMM Do YYYY, h:mm:ss a')}`
                    : null
                  }
                </div>

              </Grid>

              <Grid
                item
                md={8}
                xs={12}
                className={classes.formBox}
              >
                <Typography variant="h6" gutterBottom className={classes.labelName}>
                  PIC (Person-in-charge)
                </Typography>
                <Button
                  variant="contained"
                  color={check.pic ? "secondary" : "primary"}
                  className={classes.approvalButton}
                  onClick={(e) => handelWorkAndPic("pic")}
                >
                  {check.pic ? "Approved" : "Approve Now"}
                </Button>
                <div>
                  {form.picApprovalDateTime !== undefined
                    &&
                    form.picApprovalDateTime !== null ?
                    `${form.picApprovalUser} ${moment(form.picApprovalDateTime).format('MMMM Do YYYY, h:mm:ss a')}`
                    : null
                  }
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="h6" gutterBottom className={classes.labelName}>
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
                    />
                  ))}
                </Typography>
              </Grid>
              <Grid
                item
                md={8}
                xs={12}
                className={classes.formBox}
              >
                <Typography variant="h6" gutterBottom className={classes.labelName}>
                  Signature
                </Typography>
                <Button variant="contained" color="primary" className={classes.approvalButton}>Sign Now</Button>
              </Grid>

              <Grid
                item
                md={6}
                xs={11}
              >
                <TextField
                  label="Comment"
                  name="comment"
                  id="comment"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
                <Button
                  variant="outlined"
                  size="medium"
                  className={classes.custmSubmitBtn}
                  onClick={(e) => handelSubmit()}
                >
                  Submit
                </Button>
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
      </PapperBlock>
    </>
  );
};

export default Approvals;