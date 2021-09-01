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
    backgroundColor: '#83a6b5',
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
  const history = useHistory()
  const handelJobDetails = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/`)
    const apiData = res.data.data.results
    setForm(apiData)
  }

  const handelWorkAndPic = (type) => {
    let user = JSON.parse(localStorage.getItem("userDetails"))
    let name = user.id
    if (type == "work") {
      setForm({ ...form, wrpApprovalUser: name, wrpApprovalDateTime: new Date() })
    } else if (type == "pic") {
      setForm({ ...form, picApprovalUser: name, picApprovalDateTime: new Date() })
    }
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
  }, [])

  const classes = useStyles();
  return (
    <>
      <PapperBlock title="Approval" icon="ion-md-list-box">
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
                  color="primary"
                  className={classes.approvalButton}
                  onClick={(e) => handelWorkAndPic("work")}
                >
                  Approve Now
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
                  color="primary"
                  className={classes.approvalButton}
                  onClick={(e) => handelWorkAndPic("pic")}
                >
                  Approve Now
                </Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="h6" gutterBottom className={classes.labelName}>
                  <ActionTracker />
                </Typography>
                <Typography className={classes.aLabelValue}>
                  <span className={classes.updateLink}><Link to="">AL-nnnnn</Link></span>
                  <div className={classes.actionTitleLable}>Action title</div>
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