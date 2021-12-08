import { Button, Grid, TextField, Typography, FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-grid-system";
import { useHistory } from 'react-router';

import api from "../../../../utils/axios";
import FormSideBar from '../../../Forms/FormSideBar';
import { handelJhaId } from "../Utils/checkValue";
import { handelActionWithEntity } from "../../../../utils/CheckerValue";
import { LESSION_LEARNED_FORM, SUMMARY_FORM } from "../Utils/constants";
import CircularProgress from '@material-ui/core/CircularProgress';
import ActionShow from '../../../Forms/ActionShow';
import ActionTracker from "../../../Forms/ActionTracker";
import jhaLogoSymbol from 'dan-images/jhaLogoSymbol.png';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import Paper from '@material-ui/core/Paper';



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
  const [submitLoader, setSubmitLoader] = useState(false)
  const history = useHistory()
  const [updatePage, setUpdatePage] = useState(false)
  const [actionData, setActionData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({})

  const handelJobDetails = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/`)
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
    let jhaId = localStorage.getItem("fkJHAId")
    let allAction = await handelActionWithEntity(jhaId, "jha:lessonLearned")
    setActionData(allAction)
  };

  const handelSubmit = async () => {
    if (form.anyLessonsLearnt == "Yes" || form.anyLessonsLearnt == "No") {
      await setSubmitLoader(true)
      delete form["jhaAssessmentAttachment"]
      if (form["anyLessonsLearnt"] == null) {
        form["anyLessonsLearnt"] = ""
      }
      form["jhaStage"] = "Lesson learned"
      form["jhaStatus"] = "Close"
      const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, form)
      history.push(SUMMARY_FORM["Summary"])
    }
    else {
      setError({ LessonDecide: "Please select any one." })
    }
  }

  const classes = useStyles();

  const handelCallback = async () => {
    await handelJobDetails()
    await handelUserName()
    await handelActionTracker()
    await setIsLoading(true)
  }

  useEffect(() => {
    handelCallback()
  }, [])
  return (
    <>
      <CustomPapperBlock title="Assessment - Lessons learned" icon={jhaLogoSymbol} whiteBg>
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25.698" height="27.581" viewBox="0 0 25.698 27.581">
                    <g id="Group_5491" data-name="Group 5491" transform="translate(-1474 -226)">
                      <g id="project-management-timeline" transform="translate(1474 226)">
                        <path id="Path_5204" data-name="Path 5204" d="M23.634,17.109l.852.852a.568.568,0,0,1,0,.807l-.7.7a5,5,0,0,1,.426,1.144h.9a.594.594,0,0,1,.583.583V22.4a.594.594,0,0,1-.583.583H24.15a4.845,4.845,0,0,1-.493,1.1l.628.628a.568.568,0,0,1,0,.807l-.852.852a.568.568,0,0,1-.807,0l-.7-.7a5,5,0,0,1-1.144.426V27a.594.594,0,0,1-.583.583H18.993A.594.594,0,0,1,18.41,27v-.987a4.845,4.845,0,0,1-1.1-.493l-.628.628a.568.568,0,0,1-.807,0l-.852-.852a.568.568,0,0,1,0-.807l.7-.7a5,5,0,0,1-.426-1.144h-.9a.594.594,0,0,1-.583-.583V20.854a.594.594,0,0,1,.583-.583h.964a4.845,4.845,0,0,1,.493-1.1l-.605-.605a.568.568,0,0,1,0-.807l.852-.852a.568.568,0,0,1,.807,0l.7.7a5,5,0,0,1,1.144-.426v-.9a.594.594,0,0,1,.583-.583H20.54a.594.594,0,0,1,.583.583v.964a4.845,4.845,0,0,1,1.1.493l.628-.628a.541.541,0,0,1,.785,0ZM9.283,18.432a.63.63,0,0,1-.561-.673.615.615,0,0,1,.561-.673h2.781a.63.63,0,0,1,.561.673.615.615,0,0,1-.561.673Zm.83,6.75a.673.673,0,1,1,0,1.345H1.592a1.6,1.6,0,0,1-1.121-.471A1.557,1.557,0,0,1,0,24.935V1.592A1.557,1.557,0,0,1,.471.471,1.557,1.557,0,0,1,1.592,0H21.033a1.6,1.6,0,0,1,1.121.471,1.557,1.557,0,0,1,.471,1.121V12.423a.673.673,0,0,1-1.345,0V1.592a.23.23,0,0,0-.224-.224H1.592a.2.2,0,0,0-.157.067.175.175,0,0,0-.067.157V24.98a.23.23,0,0,0,.224.224h8.521v-.022Zm-5.9-8.566h2.4a.212.212,0,0,1,.224.224V18.9a.212.212,0,0,1-.224.224h-2.4a.212.212,0,0,1-.224-.224V16.84a.212.212,0,0,1,.224-.224Zm0-11.862h2.4a.212.212,0,0,1,.224.224V7.041a.212.212,0,0,1-.224.224h-2.4a.212.212,0,0,1-.224-.224V4.978a.212.212,0,0,1,.224-.224ZM9.283,6.57A.63.63,0,0,1,8.723,5.9a.615.615,0,0,1,.561-.673h7.781a.63.63,0,0,1,.561.673.615.615,0,0,1-.561.673Zm-4.373,6.3A.387.387,0,0,1,4.4,12.8l-.045-.045-.718-.74a.407.407,0,0,1,.067-.583.479.479,0,0,1,.628-.022l.381.4,1.256-1.009a.394.394,0,0,1,.561.135.451.451,0,0,1-.045.628l-1.57,1.3ZM8.9,12.288a.63.63,0,0,1-.561-.673.615.615,0,0,1,.561-.673h7.781a.63.63,0,0,1,.561.673.615.615,0,0,1-.561.673Zm10.853,6.974a2.377,2.377,0,1,1-2.377,2.377,2.378,2.378,0,0,1,2.377-2.377Z" transform="translate(0 0)" fill="#06425c" />
                      </g>
                      <g id="project-management-timeline-2" data-name="project-management-timeline" transform="translate(1504 226)">
                        <path id="Path_5204-2" data-name="Path 5204" d="M19.755,19.262a2.377,2.377,0,1,1-2.377,2.377,2.378,2.378,0,0,1,2.377-2.377Z" transform="translate(-30 0)" fill="#fff" />
                      </g>
                    </g>
                  </svg> Lessons learned
                </Typography>
              </Grid>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Paper elevation={1} className="paperSection">
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
                          <FormLabel component="legend" className="checkRadioLabel">Are there any lessons learned?</FormLabel>
                            <RadioGroup row aria-label="gender" name="gender1">
                              {radioDecide.map((value) => (
                                <FormControlLabel
                                  value={value}
                                  className="selectLabel"
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
                  className="paddBRemove"
                >
                  <FormLabel className="checkRadioLabel" component="legend">Work completion and lessons learned discussion</FormLabel>
                  <List className="listGapRemove">
                    <ListItem>
                        <ListItemText
                          primary="1. What, where and when?"
                          //className={classes.fildLableTitle}
                          className="selectLabel"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                          primary="2. How could the job have been improved?"
                          //className={classes.fildLableTitle}
                          className="selectLabel"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                          primary="3. Lessons learned"
                          //className={classes.fildLableTitle}
                          className="selectLabel"
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
                                  actionContext="jha:lessionLearned"
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
                            </Grid>
                            <Grid item xs={12} className={classes.createHazardbox}>
                              {handelActionShow(localStorage.getItem("fkJHAId"))}
                            </Grid>

                            

                            <Grid
                              item
                              md={12}
                              xs={12}
                              className={classes.formBox}
                              margin="dense"
                            >
                  <FormLabel component="legend" className="viewLabel">Work responsible Person (WRP)</FormLabel>
                                {user.name} {user.badgeNumber}
                            </Grid>
                          </>
                          : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <div className={classes.loadingWrapper}>
                  <Button
                    size="medium" variant="contained" color="primary" className="spacerRight buttonStyle"
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
                   size="medium" variant="contained" color="secondary" className="buttonStyle custmCancelBtn"
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
              listOfItems={LESSION_LEARNED_FORM}
              selectedItem={"Lession Learned"}
            />
          </Col>
        </Row>
      </CustomPapperBlock>
    </>
  );
};

export default LessonsLearned;