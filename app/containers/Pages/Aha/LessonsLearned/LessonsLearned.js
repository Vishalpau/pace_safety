import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import { PapperBlock } from 'dan-components';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import api from "../../../../utils/axios";
import { useParams, useHistory } from "react-router";
import { Col, Row } from "react-grid-system";
import { CircularProgress } from '@material-ui/core';
import FormSideBar from '../../../Forms/FormSideBar';
import IconButton from '@material-ui/core/IconButton';
import { handelActionWithEntity } from "../../../../utils/CheckerValue";
import { LESSION_LEARNED_FORM} from "../constants";
import ActionShow from '../../../Forms/ActionShow';
import ActionTracker from "../../../Forms/ActionTracker";

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
  fildTitle: {
    color: '#737373',
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
  },
  fildLableTitle: {
    margin: '0px',
    '& span': {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      color: '#063d55',
    },
  },
  formLablBox: {
    paddingBottom: '0px !important',
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
}));

const LessonsLearned = () => {

  const [form, setForm] = useState({})
  const [user, setUser] = useState({ name: "", badgeNumber: "" })
  const [submitLoader , setSubmitLoader] = useState(false);
  const [updatePage, setUpdatePage] = useState(false)
  const [actionData, setActionData] = useState([])

  const history = useHistory()
  const handelJobDetails = async () => {
    // const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`)
    const apiData = res.data.data.results

    apiData["lessonLearntUserName"] = name
    let user = JSON.parse(localStorage.getItem("userDetails"))
    let name = user.id
    setForm(apiData)
  }

  const handelUserName = () => {
    let user = JSON.parse(localStorage.getItem("userDetails"))
    setUser({ ...user, name: user.name, badgeNumber: user.badgeNo })
  }


  const handelActionShow = (id) => (
    <Grid>
      {actionData.map((val) => (
        <>
          {console.log(val)}
          <ActionShow
            action={{ id: val.id, number: val.actionNumber }}
            title={val.actionTitle}
            companyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
            projectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
            updatePage={updatePage}
          />
        </>
      ))}
    </Grid>
  );

  const radioDecide = ["Yes", "No"]

  const handelActionTracker = async () => {
    let ahaId = localStorage.getItem("fkAHAId")
    let allAction = await handelActionWithEntity(ahaId, "Aha:lessionLearned")
    setActionData(allAction)
  };

  const handelSubmit = async () => {
    delete form["ahaAssessmentAttachment"]
    form["lessonLearntUserName"] = user.name
    await setSubmitLoader(true)
    const res = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/ `, form)
    history.push(`/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`);
  }

  // const classes = useStyles();

  useEffect(() => {
    handelJobDetails()
    handelUserName()
    handelActionTracker()
  }, [])

  const classes = useStyles();
  return (
    <>
    <PapperBlock title="Lessons Learned" icon="ion-md-list-box">
    <Row>
          <Col md={9}>
        <Grid container spacing={3}>
            <Grid
            item
            md={8}
            xs={12}
            >
                <Grid container spacing={3}>
                    <Grid
                    item
                    md={12}
                    xs={12}
                    className={classes.formBox}
                    >
                        <FormControl component="fieldset">
                            <FormLabel component="legend" className={classes.labelName}>Are there any lessons learned?</FormLabel>
                            <RadioGroup row aria-label="gender" name="gender1">
                            {radioDecide.map((value) => (
                          <FormControlLabel
                            value={value}
                            className={classes.labelValue}
                            control={<Radio />}
                            label={value}
                            checked={form.anyLessonsLearnt == value}
                            onChange={(e) =>
                              setForm({ ...form, anyLessonsLearnt: e.target.value })
                            }
                          />
                        ))}
                           
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {form.anyLessonsLearnt == "Yes" ?
                    <>
                      <Grid
                        item
                        md={12}
                        xs={12}
                        className={classes.formBox}
                      >
                        <Typography variant="h6" className={classes.fildTitle}>
                          Work Completion and Lessons Learned Discussion
                        </Typography>

                        <List margin="dense">
                          <ListItem>
                            <ListItemText
                              primary="1. What, where and when?"
                              className={classes.fildLableTitle}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="2. How could the job have been improved?"
                              className={classes.fildLableTitle}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="3. Lessons Learned"
                              className={classes.fildLableTitle}
                            />
                          </ListItem>
                        </List>
                      </Grid>

                      <Grid
                        item
                        md={12}
                        xs={12}
                        className={classes.formBox}
                      >
                        <TextField
                          label="Lessons Learned"
                          margin="dense"
                          name="lessonslearned"
                          id="lessonslearned"
                          multiline
                          rows={4}
                          defaultValue={form.lessonLearntDetails || ""}
                          fullWidth
                          variant="outlined"
                          className={classes.formControl}
                          onChange={(e) => setForm({ ...form, lessonLearntDetails: e.target.value })}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <Typography variant="h6" gutterBottom className={classes.labelName}>
                          <ActionTracker
                            actionContext="aha:lessionLearned"
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
                      </Grid>
                      <Grid item xs={12} className={classes.createHazardbox}>
                        {handelActionShow(localStorage.getItem("fkAHAId"))}
                      </Grid>

                      <Grid
                        item
                        md={12}
                        xs={12}
                        margin="dense"
                        className={classes.formLablBox}
                      >
                        <Typography variant="h6" className={classes.fildTitle}>Work Responsible Person (WRP)</Typography>
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                        className={classes.formBox}
                        margin="dense"
                      >
                      <TextField
                            label="Name"
                            margin="dense"
                            name="name"
                            id="name"
                            // defaultValue=""
                            fullWidth
                            disabled
                            variant="outlined"
                            value={user.name}
                            className={classes.formControl}
                        />
                        {/* <Typography className={classes.labelValue}>
                          {user.name} {user.badgeNumber}
                        </Typography> */}
                      </Grid>
                      <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                    margin="dense"
                    >
                        <TextField
                            label="Badge number"
                            margin="dense"
                            name="badgenumber"
                            id="badgenumber"
                            disabled
                            // defaultValue=""
                            value={user.badgeNumber}
                            fullWidth
                            variant="outlined"
                            className={classes.formControl}
                        />
                    </Grid> 
                    </>
                    : null}
                    
                </Grid>
            </Grid>

            <Grid
            item
            md={12}
            xs={12}
            >
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
              listOfItems={LESSION_LEARNED_FORM}
              selectedItem={"Lessons Learned"}
            />
          </Col>
        </Row>
    </PapperBlock>
    </>
  );
};

export default LessonsLearned;