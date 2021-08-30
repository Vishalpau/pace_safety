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
import FormSideBar from '../../../Forms/FormSideBar';
import { LESSION_LEARNED_FORM } from "../Utils/constants"


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
                        <FormControlLabel value="yes" className={classes.labelValue} control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" className={classes.labelValue} control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
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
                      defaultValue=""
                      fullWidth
                      variant="outlined"
                      className={classes.formControl}
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
                      Name, Badge-number
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
                <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Submit</Button>
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