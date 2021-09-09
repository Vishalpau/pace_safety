import React, { useEffect, useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { PapperBlock } from "dan-components";
import Link from "@material-ui/core/Link";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { useParams, useHistory } from "react-router";
import api from "../../../../utils/axios";
import ActionTracker from "../ActionTracker";
import { CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';


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
    backgroundColor: "#83a6b5",
    marginTop: "5px",
    fontSize: "13px",
    fontWeight: "400",
  },
}));

const Approvals = () => {
  const [form, setForm] = useState({});
  const history = useHistory();
  const [submitLoader , setSubmitLoader] = useState(false);

  const handelJobDetails = async () => {
    // const jhaId = handelJhaId()
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`
    );
    const apiData = res.data.data.results;
    setForm(apiData);
  };

  const handelWorkAndPic = (type) => {
    let user = JSON.parse(localStorage.getItem("userDetails"));
    let name = user.id;
    if (type == "work") {
      setForm({
        ...form,
        wrpApprovalUser: name,
        wrpApprovalDateTime: new Date(),
      });
    } else if (type == "pic") {
      setForm({
        ...form,
        picApprovalUser: name,
        picApprovalDateTime: new Date(),
      });
    }
  };
  console.log(form);

  const handelSubmit = async () => {
    delete form["ahaAssessmentAttachment"];
    await setSubmitLoader(true)
    const res = await api.put(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/ `,
      form
    );
    history.push(`/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`);
  };

  useEffect(() => {
    handelJobDetails();
    handelWorkAndPic();
  }, []);

  const classes = useStyles();
  return (
    <>
      <PapperBlock title="Approval" icon="ion-md-list-box">
        <Grid container spacing={3}>
          <Grid item md={8} xs={12} className={classes.formBox}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Work Responsible Person (WRP)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.approvalButton}
              onClick={(e) => handelWorkAndPic("work")}
            >
              {form.wrpApprovalUser == "" ? "Approve Now" : "Approved"}
            </Button>
          </Grid>
          <Grid item md={8} xs={12} className={classes.formBox}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              PIC (if attended the Toolbox meeting)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.approvalButton}
              onClick={(e) => handelWorkAndPic("pic")}
            >
                            {form.picApprovalUser == "" ? "Approve Now" : "Approved"}
            </Button>
          </Grid>
          <Grid item md={8}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Corrective Actions
            </Typography>
            <ActionTracker
                            actionContext="aha"
                            enitityReferenceId={`${localStorage.getItem("fkAHAId")}`}
                          />
            {/* <Typography className={classes.labelValue}>
              Action title{" "}
              <span className={classes.updateLink}>
                <Link to="">AL-nnnnn</Link>
              </span>
            </Typography>
            <Typography className={classes.labelValue}>
              Action title{" "}
              <span className={classes.updateLink}>
                <Link to="">AL-nnnnn</Link>
              </span>
            </Typography>

            <Typography className={classes.increaseRowBox}>
              <ControlPointIcon />{" "}
              <span className={classes.addLink}>
                <Link to="">Add a new action</Link>
              </span>
            </Typography> */}
          </Grid>
          <Grid item md={8} xs={12} className={classes.formBox}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Signature
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.approvalButton}
            >
              Sign Now
            </Button>
          </Grid>

          <Grid item md={12} xs={12}>
          {submitLoader == false ?
                <Button
                  variant="outlined"
                  onClick={(e) => handelSubmit()}
                  className={classes.custmSubmitBtn}
                  style={{ marginLeft: "10px" }}
                >

                  Next
                </Button>
                :
                <IconButton className={classes.loader} disabled>
                  <CircularProgress color="secondary" />
                </IconButton>
              }
        
          </Grid>
        </Grid>
      </PapperBlock>
    </>
  );
};

export default Approvals;
