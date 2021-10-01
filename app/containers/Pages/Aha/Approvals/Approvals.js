import React, { useEffect, useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { PapperBlock } from "dan-components";
import Link from "@material-ui/core/Link";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { useParams, useHistory } from "react-router";
import api from "../../../../utils/axios";
import ActionTracker from "../../../Forms/ActionTracker";
import { handelCommonObject, handelActionData } from "../../../../utils/CheckerValue"
import ActionShow from '../../../Forms/ActionShow';
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
    // backgroundColor: "#83a6b5",
    marginTop: "5px",
    fontSize: "13px",
    fontWeight: "400",
  },
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


  const handelJobDetails = async () => {
    // const jhaId = handelJhaId()
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`
    );
    const apiData = res.data.data.results;
    setForm(apiData);
  };

  const handelActionTracker = async () => {
    let jhaId = localStorage.getItem("fkAHAId")

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
    handelActionTracker();
    handelActionLink();
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
              color={form.wrpApprovalUser == "" ? "primary" : "secondary"}
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
              color={form.picApprovalUser == "" ? "primary" : "secondary"}
              className={classes.approvalButton}
              onClick={(e) => handelWorkAndPic("pic")}
            >
              {form.picApprovalUser == "" ? "Approve Now" : "Approved"}
            </Button>
          </Grid>

          <Grid item md={6} xs={12}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              <ActionTracker
                actionContext="jha:approval"
                enitityReferenceId={`${localStorage.getItem("fkAHAId")}:00`}
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
