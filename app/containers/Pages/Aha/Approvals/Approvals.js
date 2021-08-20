import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import { PapperBlock } from 'dan-components';
import Link from '@material-ui/core/Link';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

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
}));

const Approvals = () => {


  const classes = useStyles();
  return (
    <>
    <PapperBlock title="Approval" icon="ion-md-list-box">
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
                <Button variant="contained" color="primary" className={classes.approvalButton}>Approve Now</Button>
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
                <Button variant="contained" color="primary" className={classes.approvalButton}>Approve Now</Button>
            </Grid>
            <Grid item md={8}>
                <Typography variant="h6" gutterBottom className={classes.labelName}>
                            Corrective Actions
                </Typography>
                <Typography className={classes.labelValue}>
                            Action title
                    {' '}
                    <span className={classes.updateLink}><Link to="">AL-nnnnn</Link></span>
                </Typography>
                <Typography className={classes.labelValue}>
                            Action title
                    {' '}
                    <span className={classes.updateLink}><Link to="">AL-nnnnn</Link></span>
                </Typography>

                <Typography className={classes.increaseRowBox}>
                    <ControlPointIcon />
                    {' '}
                    <span className={classes.addLink}><Link to="">Add a new action</Link></span>
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
            <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Submit</Button>
            </Grid>
        </Grid>
    </PapperBlock>
    </>
  );
};

export default Approvals;