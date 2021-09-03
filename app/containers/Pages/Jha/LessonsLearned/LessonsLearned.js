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
import { Col, Row } from "react-grid-system";
import { useParams, useHistory } from 'react-router';
import FormSideBar from '../../../Forms/FormSideBar';
import { LESSION_LEARNED_FORM, SUMMARY_FORM } from "../Utils/constants"

import { handelJhaId } from "../Utils/checkValue"
import api from "../../../../utils/axios";


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
}));

const LessonsLearned = () => {

  const [form, setForm] = useState({})
  const [user, setUser] = useState({ name: "", badgeNumber: "" })
  const history = useHistory()
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

  const radioDecide = ["Yes", "No"]

  const handelSubmit = async () => {
    delete form["jhaAssessmentAttachment"]
    if (form["anyLessonsLearnt"] == null) {
      form["anyLessonsLearnt"] = ""
    }
    const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, form)
    history.push(SUMMARY_FORM["Summary"])
  }

  const classes = useStyles();

  useEffect(() => {
    handelJobDetails()
    handelUserName()
  }, [])
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
                        md={12}
                        xs={12}
                        className={classes.formBox}
                        margin="dense"
                      >
                        <Typography className={classes.labelValue}>
                          {user.name} {user.badgeNumber}
                        </Typography>
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
              listOfItems={LESSION_LEARNED_FORM}
              selectedItem={"Lession Learned"}
            />
          </Col>
        </Row>
      </PapperBlock>
    </>
  );
};

export default LessonsLearned;