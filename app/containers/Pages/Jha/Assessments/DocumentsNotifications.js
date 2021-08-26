import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { PapperBlock } from 'dan-components';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Col, Row } from "react-grid-system";

import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';

import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@material-ui/icons/Delete';

import FormSideBar from '../../../Forms/FormSideBar';
import { JHA_FORM } from "../Utils/constants"


const useStyles = makeStyles((theme) => ({
  // const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  observationNewSection: {

  },
  coponentTitleBox: {
    '& h5': {
      paddingBottom: '20px',
      borderBottom: '1px solid #ccc',
    },
  },
  formControl: {
    '& .MuiInputBase-root': {
      borderRadius: '4px',
    },
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
    marginTop: '12px',
    '&:hover': {
      backgroundColor: '#ff8533',
      border: 'none',
    },
  },
  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '35px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#06425c',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '10px',
      cursor: 'pointer',
    },
  },
  createHazardbox: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    '& button': {
      marginTop: '8px',
    },
  },
  fileUploadFileDetails: {
    '& h4': {
      fontSize: '14px',
      fontWeight: '500',
      color: 'rgba(0, 0, 0, 0.54) !important',
      display: 'inline-block',
      paddingRight: '10px',
      paddingTop: '10px',
    },
    '& ul': {
      display: 'inline-block',
      '& li': {
        display: 'inline-block',
        paddingRight: '8px',
        color: 'rgba(0, 0, 0, 0.87) !important',
        fontSize: '0.9rem !important',
      },
      '& button': {
        display: 'inline-block',
      },
    },
  },
}));

const DocumentNotification = () => {

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <>
      <li key={file.path}>
        {file.path}
        {' '}
        -
        {file.size}
        {' '}
        bytes
      </li>
      <IconButton
        variant="contained"
        color="primary"
      >
        <DeleteForeverIcon />
      </IconButton>
    </>
  ));

  const classes = useStyles();
  return (
    <PapperBlock title="Document And Notifcation" icon="ion-md-list-box">
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
                Risk assessment supporting documents
              </Typography>
              <Grid
                item
                md={12}
                xs={12}
                className={classes.fileUploadFileDetails}
              >
                <h4>Files</h4>
                <ul>{files}</ul>

                {/* <DeleteIcon /> */}
              </Grid>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                label="Link"
                margin="dense"
                name="link"
                id="link"
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
              className={classes.formBox}
            >
              <FormLabel className={classes.labelName} component="legend">Notifications to be sent to</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  className={classes.labelValue}
                  control={(
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      name="checkedI"
                      onChange={handleChange}
                    />
                  )}
                  label="Manager"
                />
                <FormControlLabel
                  className={classes.labelValue}
                  control={(
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      name="checkedI"
                      onChange={handleChange}
                    />
                  )}
                  label="Supervisor"
                />
              </FormGroup>
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Submit</Button>
            </Grid>
          </Grid>
        </Col >
        <Col md={3}>
          <FormSideBar
            deleteForm={"hideArray"}
            listOfItems={JHA_FORM}
            selectedItem={"Documents & Notifications"}
          />
        </Col>
      </Row>
    </PapperBlock>
  );
};

export default DocumentNotification;