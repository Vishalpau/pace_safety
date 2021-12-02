import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Grid, TextField, Typography
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import MuiAlert from '@material-ui/lab/Alert';
import { PapperBlock } from 'dan-components';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router';

import api from '../../../../utils/axios';
import { handelCommonObject, handelFileName } from '../../../../utils/CheckerValue';
import {
  HEADER_AUTH,
  SSO_URL
} from '../../../../utils/constants';
import Attachment from '../../../Attachment/Attachment';
import FormSideBar from '../../../Forms/FormSideBar';
import { handelJhaId } from '../Utils/checkValue';
import { JHA_FORM, SUMMARY_FORM } from '../Utils/constants';

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
    '&:hover': {
      backgroundColor: '#ff8533',
      border: 'none',
    },
    marginLeft: '10px'
  },
  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
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

const DocumentNotification = () => {
  const [form, setForm] = useState({});
  const [notificationSentValue, setNotificationSentValue] = useState([]);
  const history = useHistory();
  const [notifyToList, setNotifyToList] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const ref = useRef();

  const handelJobDetails = async () => {
    const jhaId = handelJhaId();
    const res = await api.get(`/api/v1/jhas/${jhaId}/`);
    const apiData = res.data.data.results;
    setForm(apiData);
    handelCommonObject('commonObject', 'jha', 'projectStruct', apiData.fkProjectStructureIds);

    const companyId = JSON.parse(localStorage.getItem('company')).fkCompanyId;
    const { projectId } = JSON.parse(localStorage.getItem('projectName')).projectName;
    const config = {
      method: 'get',
      url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/jha/?subentity=jha&roleType=custom`,
      headers: HEADER_AUTH,
    };
    const notify = await api(config);
    if (notify.status === 200) {
      const result = notify.data.data.results;
      setNotificationSentValue(result);
    }
  };

  const fileTypeError = 'Only pdf, png, jpeg, jpg, xls, xlsx, doc, word, ppt File is allowed!';
  const fielSizeError = 'Size less than 25Mb allowed';
  const handleFile = async (e) => {
    const acceptFileTypes = [
      'pdf',
      'png',
      'jpeg',
      'jpg',
      'xls',
      'xlsx',
      'doc',
      'word',
      'ppt',
    ];
    const file = e.target.files[0].name.split('.');

    if (
      acceptFileTypes.includes(file[file.length - 1])
      && e.target.files[0].size < 25670647
    ) {
      const temp = { ...form };
      const filesAll = e.target.files[0];
      temp.jhaAssessmentAttachment = filesAll;
      await setForm(temp);
    } else {
      ref.current.value = '';
      !acceptFileTypes.includes(file[file.length - 1])
        ? await setMessage(fileTypeError)
        : await setMessage(`${fielSizeError}`);
      await setMessageType('error');
      await setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      // setOpenError(false)
      return;
    }
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handelNavigate = (navigateType) => {
    if (navigateType === 'next') {
      history.push('/app/pages/jha/jha-summary');
    } else if (navigateType === 'previous') {
      history.push('/app/pages/Jha/assessments/assessment');
    }
  };

  const handelNotifyTo = async (e, value) => {
    if (e.target.checked === true) {
      let temp = [...notifyToList];

      temp.push(value)
      let uniq = [...new Set(temp)];
      setNotifyToList(uniq)

      setForm({ ...form, notifyTo: temp.toString() });
    } else {
      let temp = [...notifyToList];

      let newData = temp.filter((item) => item !== value);

      setNotifyToList(newData);
      setForm({ ...form, notifyTo: newData.toString() });

    }

  };

  const handelApiError = () => {
    setSubmitLoader(false);
    history.push('/app/pages/error');
  };


  const handelNext = async () => {
    setSubmitLoader(true);
    if (typeof form.jhaAssessmentAttachment === 'object' && form.jhaAssessmentAttachment != null) {
      const data = new FormData();
      data.append('fkCompanyId', form.fkCompanyId);
      data.append('fkProjectId', form.fkProjectId);
      data.append('location', form.location);
      data.append('jhaAssessmentDate', form.jhaAssessmentDate);
      data.append('permitToPerform', form.permitToPerform);
      data.append('jobTitle', form.jobTitle);
      data.append('description', form.description);
      data.append('classification', form.classification);
      data.append('workHours', form.workHours);
      data.append('notifyTo', form.notifyTo !== null ? form.notifyTo.toString() : null);
      data.append('link', form.link);
      data.append('jhaAssessmentAttachment', form.jhaAssessmentAttachment);
      data.append('jhaStatus', "Close")
      data.append("jhaStage", "Assessment")
      await api.put(`/api/v1/jhas/${localStorage.getItem('fkJHAId')}/ `, data).catch(() => handelApiError());
    } else {
      delete form.jhaAssessmentAttachment;
      form["jhaStatus"] = "Close"
      form["jhaStage"] = "Assessment"
      form.notifyTo = form.notifyTo !== undefined && form.notifyTo.toString();
      await api.put(`/api/v1/jhas/${localStorage.getItem('fkJHAId')}/ `, form).catch(() => handelApiError());
    }
    history.push(SUMMARY_FORM.Summary);
    localStorage.setItem('Jha Status', JSON.stringify({ assessment: 'done' }));
    setSubmitLoader(false);
  };

  useEffect(() => {
    handelJobDetails();
  }, []);

  const classes = useStyles();
  return (
    <PapperBlock title="Document And Notification" icon="ion-md-list-box">
      {/* {console.log(form)} */}
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
                  {form.jhaAssessmentAttachment !== ''
                    && typeof form.jhaAssessmentAttachment === 'string' ? (
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
                id="link"
                value={form.link != null ? form.link : ''}
                fullWidth
                variant="outlined"
                className={classes.formControl}
                onChange={(e) => setForm({
                  ...form,
                  link: e.target.value
                })}
              />
            </Grid>

            {notificationSentValue.length > 0
              ? (
                <Grid
                  item
                  md={12}
                  xs={12}
                  className={classes.formBox}
                >
                  <FormLabel className={classes.labelName} component="legend">Notifications to be sent to</FormLabel>
                  <FormGroup>{notificationSentValue.map((value) => (
                    <FormControlLabel
                      className={classes.labelValue}
                      control={(
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          name="checkedI"
                          checked={form.notifyTo !== null ? form.notifyTo.includes(value.id) : ""}
                          onChange={(e) => handelNotifyTo(e, value.id)}
                        />
                      )}
                      label={value.roleName}
                    />

                  ))}
                  </FormGroup>
                </Grid>

              )
              : null}

            <Grid
              item
              md={12}
              xs={12}
            >
              <Button
                variant="outlined"
                size="medium"
                className={classes.custmSubmitBtn}
                onClick={() => handelNavigate('previous')}
              >
                Previous
              </Button>
              <div className={classes.loadingWrapper}>
                <Button
                  variant="outlined"
                  onClick={(e) => handelNext()}
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
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                className={classes.custmSubmitBtn}
                onClick={() => history.push(SUMMARY_FORM.Summary)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Col>
        <Col md={3}>
          <FormSideBar
            deleteForm="hideArray"
            listOfItems={JHA_FORM}
            selectedItem="Documents & Notifications"
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
