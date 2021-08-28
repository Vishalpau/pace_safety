import React, { useEffect, useState, Component, useRef } from 'react';
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
import Snackbar from "@material-ui/core/Snackbar";
import { useParams, useHistory } from 'react-router';

import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';

import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from "@material-ui/lab/Alert";

import FormSideBar from '../../../Forms/FormSideBar';
import { JHA_FORM } from "../Utils/constants";
import api from "../../../../utils/axios";
import { handelJhaId } from "../Utils/checkValue"
import { handelFileName } from "../../../../utils/CheckerValue";
import Attachment from "../../../../containers/Attachment/Attachment";
import {
  HEADER_AUTH,
  SSO_URL,
} from "../../../../utils/constants";


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

  const [form, setForm] = useState({})
  const [notificationSentValue, setNotificationSentValue] = useState([]);
  const history = useHistory()

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [open, setOpen] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const ref = useRef();

  const handelJobDetails = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/`)
    const apiData = res.data.data.results
    setForm(apiData)

    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName.projectId;
    var config = {
      method: "get",
      url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/incident/?subentity=incident`,
      headers: HEADER_AUTH,
    };
    const notify = await api(config);
    if (notify.status === 200) {
      const result = notify.data.data.results;
      setNotificationSentValue(result);
    }

  }

  let fileTypeError =
    "Only pdf, png, jpeg, jpg, xls, xlsx, doc, word, ppt File is allowed!";
  let fielSizeError = "Size less than 25Mb allowed";
  const handleFile = async (e) => {
    let acceptFileTypes = [
      "pdf",
      "png",
      "jpeg",
      "jpg",
      "xls",
      "xlsx",
      "doc",
      "word",
      "ppt",
    ];
    let file = e.target.files[0].name.split(".");

    if (
      acceptFileTypes.includes(file[file.length - 1]) &&
      e.target.files[0].size < 25670647
    ) {
      const temp = { ...form };
      temp.jhaAssessmentAttachment = e.target.files[0];
      await setForm(temp);
    } else {
      ref.current.value = "";
      !acceptFileTypes.includes(file[file.length - 1])
        ? await setMessage(fileTypeError)
        : await setMessage(`${fielSizeError}`);
      await setMessageType("error");
      await setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      // setOpenError(false)
      return;
    }
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const handelNavigate = (navigateType) => {
    if (navigateType == "next") {
      history.push("/app/pages/jha/jha-summary")
    } else if (navigateType == "previous") {
      history.push("/app/pages/Jha/assessments/assessment")
    }
  }

  const handelNotifyTo = async (e, index) => {
    if (e.target.checked === true) {
      let temp = [...notifyToList];
      temp.push(e.target.value)
      let uniq = [...new Set(temp)];
      setNotifyToList(uniq);
    } else {
      let temp = [...notifyToList];
      let newData = temp.filter((item) => item !== e.target.value);
      setNotifyToList(newData);
    }

  };

  const handelNext = async () => {
    if (typeof form.jhaAssessmentAttachment === "object") {
      let data = new FormData();
      data.append("fkCompanyId", form.fkCompanyId);
      data.append("fkProjectId", form.fkProjectId);
      data.append("location", form.location);
      data.append("jhaAssessmentDate", form.jhaAssessmentDate);
      data.append("permitToPerform", form.permitToPerform);
      data.append("jobTitle", form.jobTitle);
      data.append("description", form.description);
      data.append("classification", form.classification);
      data.append("workHours", form.workHours);
      data.append("jhaAssessmentAttachment", form.jhaAssessmentAttachment)
      const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, data)
    }
    else {
      delete form["jhaAssessmentAttachment"]
      const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, form)
    }
  }

  useEffect(() => {
    handelJobDetails()
  }, [])

  const classes = useStyles();
  return (
    <PapperBlock title="Document And Notification" icon="ion-md-list-box">
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

              <Grid item xs={12} md={6}>
                <input
                  id="selectFile"
                  type="file"
                  className={classes.fullWidth}
                  name="file"
                  ref={ref}
                  accept=".pdf, .png, .jpeg, .jpg,.xls,.xlsx, .doc, .word, .ppt"
                  // style={{
                  //   color:
                  //     typeof form.attachments === "string" && "transparent",
                  // }}
                  onChange={(e) => {
                    handleFile(e);
                  }}
                />
                <Typography title={handelFileName(form.jhaAssessmentAttachment)}>
                  {form.jhaAssessmentAttachment != "" &&
                    typeof form.jhaAssessmentAttachment == "string" ? (
                    <Attachment value={form.jhaAssessmentAttachment} />
                  ) : (
                    <p />
                  )}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                label="Link"
                name="link"
                name="link"
                id="link"
                value={form.link != null ? form.link : ""}
                fullWidth
                variant="outlined"
                className={classes.formControl}
                onChange={(e) => setForm({
                  ...form,
                  link: e.target.value
                })}
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
              <Button
                variant="outlined"
                size="medium"
                className={classes.custmSubmitBtn}
                onClick={(e) => handelNavigate("previous")}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="medium"
                className={classes.custmSubmitBtn}
                style={{ marginLeft: "10px" }}
                onClick={(e) => handelNext()}
              >
                Submit</Button>
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={messageType}>
          {message}
        </Alert>
      </Snackbar>
    </PapperBlock>
  );
};

export default DocumentNotification;