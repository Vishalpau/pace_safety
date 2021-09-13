import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import { PapperBlock } from 'dan-components';
import Link from '@material-ui/core/Link';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { useParams, useHistory } from 'react-router';
import { Col, Row } from "react-grid-system";
import axios from "axios";

import api from "../../../../utils/axios";
import FormSideBar from '../../../Forms/FormSideBar';
import { APPROVAL_FORM } from "../Utils/constants"
import ActionTracker from "../../../Forms/ActionTracker";
import { JHA_FORM, SUMMARY_FORM } from "../Utils/constants";
import { handelJhaId } from "../Utils/checkValue"


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
    projectId: "",
    companyId: "",
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
      setCheck({ ...check, wrp: true })
      setForm({ ...form, wrpApprovalUser: name, wrpApprovalDateTime: new Date() })
    } else if (type == "pic") {
      setCheck({ ...check, pic: true })
      setForm({ ...form, picApprovalUser: name, picApprovalDateTime: new Date() })
    }
  }

  const handelActionTracker = async () => {
    let jhaId = localStorage.getItem("fkJHAId")
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    const allActionTrackerData = await api_action.get(`api/v1/actions/?enitityReferenceId=${jhaId}%3A00`);
    let allAction = allActionTrackerData.data.data.results.results
    setActionData(allAction !== null ? allAction : [])
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

    setProjectData({ projectId: projectId, companyId: fkCompanyId })
  }

  const handelSubmit = async () => {
    delete form["jhaAssessmentAttachment"]
    if (form["wrpApprovalUser"] == null) {
      form["wrpApprovalUser"] = ""
    }
    const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, form)
    history.push(SUMMARY_FORM["Summary"])
  }

  useEffect(() => {
    handelJobDetails()
    handelWorkAndPic()
    handelActionTracker()
    handelActionLink()
  }, [updatePage])

  const classes = useStyles();
  return (
    <>
      <PapperBlock title="Approval" icon="ion-md-list-box">
        {/* {console.log(form)} */}
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
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
              </Grid>
              <Grid
                item
                md={8}
                xs={12}
                className={classes.formBox}
              >
                <Typography variant="h6" gutterBottom className={classes.labelName}>
                  PIC (if attended the Toolbox meeting)
                </Typography>
                <Button
                  variant="contained"
                  color={check.pic ? "secondary" : "primary"}
                  className={classes.approvalButton}
                  onClick={(e) => handelWorkAndPic("pic")}
                >
                  {check.pic ? "Approved" : "Approve Now"}
                </Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="h6" gutterBottom className={classes.labelName}>
                  <ActionTracker
                    actionContext="jha:approval"
                    enitityReferenceId={`${localStorage.getItem("fkJHAId")}:00`}
                    setUpdatePage={setUpdatePage}
                    updatePage={updatePage}
                  />
                </Typography>
                <Typography className={classes.aLabelValue}>
                  {actionData.map((value) => (
                    <>
                      <span className={classes.updateLink}>
                        <Link
                          href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&companyId=${projectData.companyId}&projectId=${projectData.projectId}&targetPage=/app/pages/Action-Summary/&targetId=${value.id}`}
                        >
                          {value.actionNumber}
                        </Link>
                      </span>
                      <div className={classes.actionTitleLable}>
                        {value.actionTitle}
                      </div>
                    </>
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