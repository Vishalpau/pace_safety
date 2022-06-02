import { Button, Grid, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import { saveAs } from 'file-saver';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import '../../../styles/custom/customheader.css';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import api from '../../../utils/axios';
import { handelDateTime } from '../../../utils/CheckerValue';
import {
  HEADER_AUTH, SSO_URL
} from '../../../utils/constants';
import Attachment from '../../Attachment/Attachment';
import Loader from '../Loader';


const useStyles = makeStyles((theme) => ({
  // const styles = theme => ({
  root: {
    '& .MuiAvatar-root.MuiAvatar-square.attachFileStyle': {
      width: '120px !important',
      height: '80px !important',
      overflow: 'visible',

    },
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
    listStyleType: 'disc',
    listStylePosition: 'inside',
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
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  // });
}));
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ObservationInitialNotificationView = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const [tagsData, setTagsData] = useState([]);
  const [actionTakenData, setActionTakenData] = useState([]);
  const [projectSturcturedData, setProjectSturcturedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectDepthAndId, setSelectDepthAndId] = useState([]);

  const history = useHistory();

  const dispatch = useDispatch();

  const project = JSON.parse(localStorage.getItem('projectName')) !== null
    ? JSON.parse(localStorage.getItem('projectName')).projectName
    : null;
  const selectBreakdown = JSON.parse(localStorage.getItem('selectBreakDown')) !== null
    ? JSON.parse(localStorage.getItem('selectBreakDown'))
    : null;
  const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).name
    : null;
  const userBadgeNo = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).badgeNo
    : null;
  const fetchInitialiObservation = async () => {
    const res = await api.get(`/api/v1/observations/${id}/`);
    localStorage.setItem('fkobservationId', id);
    if (res.data.status_code == 400) {
      history.push('/app/error/');
    } else {
      const result = res.data.data.results;
      console.log(res.data.data.results, 'result');
      setInitialData(result);
      if (result.fkProjectStructureIds != 'Not Mentioned') {
        await handelWorkArea(result);
      }
    }
    setIsLoading(false);
  };

  const fetchTags = async () => {
    const response = await api.get(`/api/v1/observations/${id}/observationtags/`);
    const tags = response.data.data.results.results;
    await setTagsData(tags);
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const [projectStructName, setProjectStructName] = useState([]);

  const handelWorkArea = async (assessment) => {
    const fkCompanyId = JSON.parse(localStorage.getItem('company')) !== null
      ? JSON.parse(localStorage.getItem('company')).fkCompanyId
      : null;

    const projectId = JSON.parse(localStorage.getItem('projectName')) !== null
      ? JSON.parse(localStorage.getItem('projectName')).projectName.projectId
      : null;
    const structName = [];
    const projectStructId = assessment.fkProjectStructureIds.split(':');

    for (const key in projectStructId) {
      const workAreaId = [projectStructId[key].substring(0, 2), projectStructId[key].substring(2)];
      const api_work_area = axios.create({
        baseURL: SSO_URL,
        headers: HEADER_AUTH
      });
      const workArea = await api_work_area.get(`/api/v1/companies/${fkCompanyId}/projects/${projectId}/projectstructure/${workAreaId[0]}/${workAreaId[1]}/`);
      structName.push(workArea.data.data.results[0].structureName);
    }

    setProjectStructName(structName);
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
      {' '}
      -
      {file.size}
      {' '}
      bytes
    </li>
  ));

  const [documentUrl, setDocumentUrl] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = (document) => {
    setDocumentUrl(document);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const download = (image_link) => {
    // let onlyImage_url = image_link.replace("https://", "")
    const image_url = image_link;
    const imageArray = image_url.split('/');
    const image_name = imageArray[imageArray.length - 1];
    saveAs(image_url, image_name);
    handleClose();
  };

  const handelFileName = (value) => {
    const fileNameArray = value.split('/');
    const fileName = fileNameArray[fileNameArray.length - 1].split('-');
    const lastNameArray = fileName[fileName.length - 1];
    // const lastName = fileName.split("-");
    return lastNameArray;
  };

  const handleProjectName = (projectId) => {
    const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).companies
      : null;
    const abc = userName.filter((user) => user.companyId === initialData.fkCompanyId);
    const dd = abc[0].projects.filter((user) => user.projectId === projectId);
    return dd[0].projectName;
  };

  const [positiveObservation, setPositiveObservation] = useState(false);

  const handelPositivObservation = (e) => {
    setPositiveObservation(false);
  };

  const handelAtRiskConcern = (e) => {
    setPositiveObservation(true);
  };

  const classes = useStyles();
  useEffect(() => {
    if (id) {
      fetchInitialiObservation();
      fetchTags();
    }
  }, []);
  return (
    <>
      {!isLoading ? (
        <>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="24.913" height="24.902" viewBox="0 0 24.913 24.902">
                <g id="observation_detail" data-name="observation detail" transform="translate(-4.729 -4.75)">
                  <g id="Group_5258" data-name="Group 5258" transform="translate(16.965 7.883)">
                    <path id="Path_5137" data-name="Path 5137" d="M74.363,28.152a.188.188,0,0,1-.188-.188V21.353a.618.618,0,0,0-.618-.618H69.017a.188.188,0,1,1,0-.375h4.541a.994.994,0,0,1,.993.993v6.611A.188.188,0,0,1,74.363,28.152Z" transform="translate(-68.83 -20.36)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5259" data-name="Group 5259" transform="translate(4.979 7.883)">
                    <path id="Path_5138" data-name="Path 5138" d="M21.693,41.879H5.972a.994.994,0,0,1-.993-.993V21.353a.994.994,0,0,1,.993-.993h3.9a.188.188,0,0,1,0,.375h-3.9a.618.618,0,0,0-.618.618V40.886a.618.618,0,0,0,.618.618h15.72a.618.618,0,0,0,.618-.618V36.822a.188.188,0,0,1,.375,0v4.064A.994.994,0,0,1,21.693,41.879Z" transform="translate(-4.979 -20.36)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5260" data-name="Group 5260" transform="translate(6.293 9.197)">
                    <path id="Path_5139" data-name="Path 5139" d="M26.87,46.251h-14.7a.188.188,0,0,1-.188-.188V27.548a.188.188,0,0,1,.188-.188H15.3a.188.188,0,0,1,0,.375H12.355v18.14H26.683V42.42a.188.188,0,0,1,.375,0v3.643A.188.188,0,0,1,26.87,46.251Z" transform="translate(-11.979 -27.36)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5261" data-name="Group 5261" transform="translate(17.224 9.197)">
                    <path id="Path_5140" data-name="Path 5140" d="M74.17,33.922a.188.188,0,0,1-.188-.188v-6H70.4a.188.188,0,1,1,0-.375H74.17a.188.188,0,0,1,.188.188v6.187A.188.188,0,0,1,74.17,33.922Z" transform="translate(-70.21 -27.36)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5262" data-name="Group 5262" transform="translate(9.279 5)">
                    <path id="Path_5141" data-name="Path 5141" d="M36.165,10.323H28.073a.188.188,0,0,1-.184-.224L28.5,6.976a.188.188,0,0,1,.184-.152h2.128V6.3a1.3,1.3,0,0,1,2.61,0v.52h2.128a.188.188,0,0,1,.184.152l.613,3.123a.188.188,0,0,1-.184.224ZM28.3,9.947h7.635L35.4,7.2H33.236a.188.188,0,0,1-.188-.188V6.3a.929.929,0,1,0-1.859,0v.707A.188.188,0,0,1,31,7.2H28.84Z" transform="translate(-27.886 -5)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5263" data-name="Group 5263" transform="translate(7.418 19.974)">
                    <path id="Path_5142" data-name="Path 5142" d="M19.047,86.93a1.077,1.077,0,1,1,1.077-1.077A1.078,1.078,0,0,1,19.047,86.93Zm0-1.779a.7.7,0,1,0,.7.7A.7.7,0,0,0,19.047,85.151Z" transform="translate(-17.97 -84.775)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5264" data-name="Group 5264" transform="translate(10.623 16.915)">
                    <path id="Path_5143" data-name="Path 5143" d="M36.121,70.634A1.077,1.077,0,1,1,37.2,69.556,1.078,1.078,0,0,1,36.121,70.634Zm0-1.779a.7.7,0,1,0,.7.7A.7.7,0,0,0,36.121,68.855Z" transform="translate(-35.044 -68.479)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5265" data-name="Group 5265" transform="translate(14.525 18.694)">
                    <path id="Path_5144" data-name="Path 5144" d="M56.909,80.111a1.077,1.077,0,1,1,1.077-1.077A1.078,1.078,0,0,1,56.909,80.111Zm0-1.779a.7.7,0,1,0,.7.7A.7.7,0,0,0,56.909,78.332Z" transform="translate(-55.832 -77.957)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5266" data-name="Group 5266" transform="translate(12.322 18.174)">
                    <path id="Path_5145" data-name="Path 5145" d="M46.566,76.6a.188.188,0,0,1-.078-.017L44.2,75.541a.188.188,0,0,1,.156-.342l2.284,1.041a.188.188,0,0,1-.078.359Z" transform="translate(-44.094 -75.182)" fill="#06425c" />
                  </g>
                  <g id="Group_5267" data-name="Group 5267" transform="translate(8.949 18.418)">
                    <path id="Path_5146" data-name="Path 5146" d="M26.317,78.693a.188.188,0,0,1-.13-.324l1.92-1.831a.188.188,0,0,1,.259.272l-1.919,1.831A.187.187,0,0,1,26.317,78.693Z" transform="translate(-26.129 -76.486)" fill="#06425c" />
                  </g>
                  <g id="Group_5268" data-name="Group 5268" transform="translate(8.38 11.253)">
                    <path id="Path_5147" data-name="Path 5147" d="M23.283,44.7a.188.188,0,0,1-.093-.351l10.53-6.007a.188.188,0,0,1,.186.326l-10.53,6.007A.187.187,0,0,1,23.283,44.7Z" transform="translate(-23.095 -38.315)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5269" data-name="Group 5269" transform="translate(17.359 10.937)">
                    <path id="Path_5148" data-name="Path 5148" d="M72.354,38.87a.188.188,0,0,1-.184-.225l.279-1.367L71.082,37a.188.188,0,1,1,.075-.368l1.551.317a.188.188,0,0,1,.146.221l-.317,1.551A.188.188,0,0,1,72.354,38.87Z" transform="translate(-70.932 -36.627)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5270" data-name="Group 5270" transform="translate(17.5 15.285)">
                    <path id="Path_5149" data-name="Path 5149" d="M76.317,69.054a4.63,4.63,0,1,1,2.767-.92A4.629,4.629,0,0,1,76.317,69.054Zm-.011-8.886a4.256,4.256,0,1,0,3.416,1.708A4.235,4.235,0,0,0,76.306,60.168Z" transform="translate(-71.68 -59.793)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5271" data-name="Group 5271" transform="translate(18.47 16.256)">
                    <path id="Path_5150" data-name="Path 5150" d="M80.515,72.284a3.655,3.655,0,1,1,2.187-.727A3.658,3.658,0,0,1,80.515,72.284Zm-.009-6.945a3.282,3.282,0,1,0,2.637,1.318A3.269,3.269,0,0,0,80.507,65.339Z" transform="translate(-76.851 -64.964)" fill="#06425c" />
                  </g>
                  <g id="Group_5272" data-name="Group 5272" transform="translate(24.603 23.289)">
                    <path id="Path_5151" data-name="Path 5151" d="M110.415,103.749a.188.188,0,0,1-.151-.075l-.7-.941a.188.188,0,0,1,.3-.225l.7.941a.188.188,0,0,1-.15.3Z" transform="translate(-109.524 -102.433)" fill="#06425c" />
                  </g>
                  <g id="Group_5273" data-name="Group 5273" transform="translate(24.444 23.586)">
                    <path id="Path_5152" data-name="Path 5152" d="M112.965,109.822a2.286,2.286,0,0,1-1.228-.544,10.347,10.347,0,0,1-2.02-2.094,12.2,12.2,0,0,1-1.022-1.607.188.188,0,0,1,.054-.237l1.725-1.289a.188.188,0,0,1,.243.016,12.19,12.19,0,0,1,1.251,1.435,10.344,10.344,0,0,1,1.436,2.531c.3.84.285,1.417-.052,1.669A.63.63,0,0,1,112.965,109.822Zm-3.862-4.278a12.015,12.015,0,0,0,.915,1.415,9.962,9.962,0,0,0,1.942,2.016c.646.475,1.027.531,1.168.425s.2-.487-.077-1.241a9.961,9.961,0,0,0-1.383-2.434,12.037,12.037,0,0,0-1.1-1.279Z" transform="translate(-108.674 -104.014)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5274" data-name="Group 5274" transform="translate(8.516 23.289)">
                    <path id="Path_5153" data-name="Path 5153" d="M32.13,102.808H24.007a.188.188,0,1,1,0-.375H32.13a.188.188,0,1,1,0,.375Z" transform="translate(-23.819 -102.433)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                  <g id="Group_5275" data-name="Group 5275" transform="translate(8.516 25.852)">
                    <path id="Path_5154" data-name="Path 5154" d="M34.265,116.461H24.007a.188.188,0,1,1,0-.375H34.265a.188.188,0,1,1,0,.375Z" transform="translate(-23.819 -116.086)" fill="#06425c" stroke="#06425c" strokeWidth="0.5" />
                  </g>
                </g>
              </svg>
              {' '}
              iCare details
            </Typography>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <FormLabel component="legend" className="viewLabel">
                    iCare Type
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.observationType ? initialData.observationType : '-'}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <FormLabel component="legend" className="viewLabel">
                    iCare Title
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.observationTitle ? initialData.observationTitle : '-'}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <FormLabel component="legend" className="viewLabel">
                    iCare Description
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.observationDetails ? initialData.observationDetails : '-'}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Details of immediate actions taken
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.actionTaken ? initialData.actionTaken : '-'}
                  </Typography>

                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="20.103" height="25.906" viewBox="0 0 20.103 25.906">
                <g id="Observer_and_reporter_details" data-name="Observer and reporter details" transform="translate(-15.736 -5.629)">
                  <path id="Path_5129" data-name="Path 5129" d="M44.491,25.718a.112.112,0,0,0,.095.041.077.077,0,0,0,.041-.021,2.557,2.557,0,0,0,.806,1.218,1.061,1.061,0,0,0,1.4-.011,2.569,2.569,0,0,0,.792-1.207.08.08,0,0,0,.041.021.1.1,0,0,0,.082-.029.649.649,0,0,0,.162-.357c.038-.214,0-.4-.077-.44l-.018-.006a.1.1,0,0,0-.077.025v0h0s0,0,0,0a1.672,1.672,0,0,0-.345-.726.4.4,0,0,0-.077-.033c0,.054.058.137.065.217a1.428,1.428,0,0,0-.585-.217c-.057,0-.118,0-.182,0a2.048,2.048,0,0,1-1.235-.028c-.737-.069-.854.7-.864.786,0,0,0,0,0,.006h0a.1.1,0,0,0-.079-.026.072.072,0,0,0-.031.013.175.175,0,0,0-.054.087c-.007.1-.012.207-.013.315,0,.01,0,.02,0,.03A.677.677,0,0,0,44.491,25.718Z" transform="translate(-20.37 -13.196)" fill="none" />
                  <path id="Path_5130" data-name="Path 5130" d="M37.056,9.229H19.647a.311.311,0,0,0-.311.311V32.752a.311.311,0,0,0,.311.311H37.056a.311.311,0,0,0,.311-.311V9.54A.311.311,0,0,0,37.056,9.229ZM26.329,14.041h.007s0,0,0,0h0a1.93,1.93,0,0,1,.058-.461,2.018,2.018,0,0,1,.195-.754,1.949,1.949,0,0,1,1.972-.932,1.765,1.765,0,0,1,1.766,1.918c0,.081,0,.161-.007.24.124.047.178.328.121.65-.053.3-.183.529-.307.565a3.312,3.312,0,0,1-.729,1.172,1.861,1.861,0,0,1-.619.423,1.21,1.21,0,0,1-.922,0,1.846,1.846,0,0,1-.6-.4,3.292,3.292,0,0,1-.747-1.186c-.13-.018-.27-.258-.325-.569C26.129,14.358,26.192,14.065,26.329,14.041Zm-1.88,4.607c.446-1.536,1.271-1.588,1.449-1.63.349-.082.773-.047,1-.117a6.122,6.122,0,0,0,1.093,1.406l.18-.707A.457.457,0,0,1,28,17.192H28.7a.453.453,0,0,1-.168.409l.183.706A6.13,6.13,0,0,0,29.806,16.9c.226.07.649.035,1,.117.178.041,1,.094,1.449,1.63a.838.838,0,0,1-.059.621c-.366.691-2.289.9-3.843.9s-3.477-.212-3.843-.9A.841.841,0,0,1,24.449,18.647ZM34.578,30.409H22.123a.622.622,0,0,1,0-1.243H34.578a.622.622,0,0,1,0,1.243Zm0-3.316H22.123a.622.622,0,1,1,0-1.243H34.578a.622.622,0,0,1,0,1.243Zm0-3.316H22.123a.622.622,0,0,1,0-1.243H34.578a.622.622,0,0,1,0,1.243Z" transform="translate(-2.564 -2.564)" fill="none" />
                  <path id="Path_5131" data-name="Path 5131" d="M34.492,5.629H17.083a1.348,1.348,0,0,0-1.347,1.347V30.188a1.349,1.349,0,0,0,1.347,1.347H34.492a1.349,1.349,0,0,0,1.347-1.347V6.976A1.349,1.349,0,0,0,34.492,5.629ZM34.8,30.187a.311.311,0,0,1-.311.311H17.083a.311.311,0,0,1-.311-.311V6.976a.311.311,0,0,1,.311-.311H34.492a.311.311,0,0,1,.311.311Z" transform="translate(0 0)" fill="#06425c" />
                  <path id="Path_5132" data-name="Path 5132" d="M40.917,39.152c1.554,0,3.477-.212,3.843-.9a.838.838,0,0,0,.059-.621c-.446-1.536-1.271-1.589-1.449-1.63-.349-.082-.773-.047-1-.117a6.13,6.13,0,0,1-1.093,1.407l-.183-.706a.453.453,0,0,0,.168-.409h-.693a.458.458,0,0,0,.165.407l-.18.707a6.115,6.115,0,0,1-1.093-1.406c-.226.071-.649.036-1,.117-.178.041-1,.094-1.449,1.63a.839.839,0,0,0,.059.621C37.44,38.939,39.363,39.152,40.917,39.152Z" transform="translate(-15.13 -21.543)" fill="#06425c" />
                  <path id="Path_5133" data-name="Path 5133" d="M43.412,21.83a3.292,3.292,0,0,0,.747,1.186,1.848,1.848,0,0,0,.6.4,1.21,1.21,0,0,0,.922,0A1.861,1.861,0,0,0,46.3,23a3.311,3.311,0,0,0,.729-1.172c.124-.036.254-.269.307-.565.058-.322,0-.6-.121-.65,0-.079.007-.158.007-.24a1.765,1.765,0,0,0-1.766-1.918,1.95,1.95,0,0,0-1.972.932,2.023,2.023,0,0,0-.195.754,1.944,1.944,0,0,0-.058.461h0s0,0,0,0h-.007c-.138.024-.2.317-.14.656C43.143,21.572,43.283,21.812,43.412,21.83Zm.031-.869a.174.174,0,0,1,.054-.087.073.073,0,0,1,.031-.013.1.1,0,0,1,.079.026h0s0,0,0-.006c.009-.088.126-.854.864-.786a2.048,2.048,0,0,0,1.235.028c.064,0,.125,0,.182,0a1.434,1.434,0,0,1,.585.217c-.007-.08-.069-.163-.065-.217a.387.387,0,0,1,.077.033,1.67,1.67,0,0,1,.345.726s0,0,0,0h0v0a.1.1,0,0,1,.077-.025l.018.006c.08.038.115.226.077.44a.648.648,0,0,1-.162.358.1.1,0,0,1-.082.029.08.08,0,0,1-.041-.021,2.566,2.566,0,0,1-.792,1.207,1.062,1.062,0,0,1-1.4.011,2.56,2.56,0,0,1-.806-1.218.076.076,0,0,1-.041.021.112.112,0,0,1-.095-.041.687.687,0,0,1-.149-.345c0-.01,0-.02,0-.03C43.431,21.168,43.436,21.064,43.443,20.961Z" transform="translate(-19.462 -9.128)" fill="#06425c" />
                  <path id="Path_5134" data-name="Path 5134" d="M39.937,55.449H27.482a.622.622,0,1,0,0,1.243H39.937a.622.622,0,0,0,0-1.243Z" transform="translate(-7.922 -35.48)" fill="#06425c" />
                  <path id="Path_5135" data-name="Path 5135" d="M39.937,66.97H27.482a.622.622,0,1,0,0,1.243H39.937a.622.622,0,0,0,0-1.243Z" transform="translate(-7.922 -43.684)" fill="#06425c" />
                  <path id="Path_5136" data-name="Path 5136" d="M39.937,78.489H27.482a.622.622,0,0,0,0,1.243H39.937a.622.622,0,0,0,0-1.243Z" transform="translate(-7.922 -51.888)" fill="#06425c" />
                </g>
              </svg>
              {' '}
              Observer and reporter details
            </Typography>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>


                <Grid item md={4} sm={4} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Observed By
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.reportedByName ? initialData.reportedByName : '-'}
                    ,
                    {initialData.reportedByBadgeId !== 'null' ? initialData.reportedByBadgeId : '-'}
                  </Typography>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Observer Department
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.reportedByDepartment ? initialData.reportedByDepartment : '-'}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <FormLabel variant="h6" gutterBottom className="viewLabel">
                    Observed On
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {moment(initialData.observedAt).format(
                      'Do MMMM YYYY'
                    )} {" "} {new Date(initialData.observedAt).toLocaleTimeString(undefined, {timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit'})}
                    {/* {initialData["observedAt"] ? handelDateTime(initialData["observedAt"]) : "-"} */}
                  </Typography>
                </Grid>

                <Grid item md={4} sm={4} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Foreman details
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.supervisorName ? initialData.supervisorName : '-'}
                    ,
                    {initialData.supervisorByBadgeId == 'null' || initialData.supervisorByBadgeId == '' ? '-' : initialData.supervisorByBadgeId}
                  </Typography>
                </Grid>
                <Grid item md={8} sm={8} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Location
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.location ? initialData.location : '-'}
                  </Typography>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Reported by
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {/* {userName} , {userBadgeNo !== null ? userBadgeNo : "-"} */}
                    {initialData.createdByName}
                  </Typography>
                </Grid>

                <Grid item md={4} sm={4} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Reported on
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {moment(initialData.createdAt).format(
                      'Do MMMM YYYY, h:mm:ss a'
                    )}
                    {/* {initialData["createdAt"] ? handelDateTime(initialData["createdAt"]) : "-"} */}

                  </Typography>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <FormLabel component="legend" className="viewLabel">Source</FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.source ? initialData.source : '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg id="outline-assignment-24px" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40">
                <g id="Bounding_Boxes">
                  <path id="Path_2274" data-name="Path 2274" d="M0,0H40V40H0Z" fill="none" />
                </g>
                <path id="enrollment" d="M14.947,31.057a.874.874,0,0,1,0,1.743H1.981A2.008,2.008,0,0,1,0,30.771V2.029A2.008,2.008,0,0,1,1.981,0H25.64a1.96,1.96,0,0,1,1.407.591,2.056,2.056,0,0,1,.585,1.437V16.443a2.91,2.91,0,0,1-.023.382H25.919V2.029a.288.288,0,0,0-.279-.286H1.981a.286.286,0,0,0-.2.083.305.305,0,0,0-.081.2v28.74a.27.27,0,0,0,.083.2.289.289,0,0,0,.2.085Zm9.137.035-4.272,1.495.034-4.871,4.246,3.377Zm-3.039-5.008,4.609-6.406a.411.411,0,0,1,.5-.149l3.775,2.893a.374.374,0,0,1,.039.55l-4.679,6.492ZM7.593,16.774a1.778,1.778,0,0,1-.052-.9c.12-.948.36-1.124,1.215-1.367a8.85,8.85,0,0,0,2.867-.873,2.936,2.936,0,0,0,.193-.382c.1-.227.185-.472.24-.641a8.154,8.154,0,0,1-.631-.921l-.639-1.041a1.941,1.941,0,0,1-.36-.95.777.777,0,0,1,.065-.342.613.613,0,0,1,.219-.267.5.5,0,0,1,.154-.08,17.114,17.114,0,0,1-.031-1.868,2.694,2.694,0,0,1,.078-.424,2.508,2.508,0,0,1,1.079-1.4,3.35,3.35,0,0,1,.9-.411c.2-.059-.175-.723.036-.745A5.144,5.144,0,0,1,16.295,5.79a2.561,2.561,0,0,1,.623,1.6l-.039,1.7h0a.46.46,0,0,1,.326.355,1.481,1.481,0,0,1-.175.892h0v.024l-.73,1.225a6.339,6.339,0,0,1-.891,1.26l.1.144a4.478,4.478,0,0,0,.464.625.043.043,0,0,1,.016.021,10.373,10.373,0,0,0,2.813.892c.782.211,1.069.267,1.243,1.142a1.937,1.937,0,0,1-.023,1.1Zm-.641,9.356a.885.885,0,0,1,0-1.764H18.508l-.016.024h0V24.4h0v.013h0v.408h0v.035h0v.021h0v.211h0v.032H18.38l-.018.013H18.33l-.016.016h-.029l-.016.013h-.016l-.016.016h-.013l-.016.016h0l-.016.016h0l-.016.016h0v.016h0v.029h0v.016h0l-.016.016v.016h-.013v.016h0v.016h0l-.013.016h0v.016h0v.035h0v.035h0l-.013.016v.016h0v.019h0v.019h0v.019h0v.037h0V25.6Zm.331-4.847a.847.847,0,0,1-.777-.421.891.891,0,0,1,0-.9.847.847,0,0,1,.777-.421H19.754a.847.847,0,0,1,.777.421.891.891,0,0,1,0,.9.847.847,0,0,1-.777.421Z" transform="translate(5.333 4.2)" fill="#06425c" />
              </svg>
              iCare classification
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Classification
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.observationClassification ? initialData.observationClassification : '-'}
                  </Typography>
                </Grid>
                {/* <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Actions Taken
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.actionTaken}
          </Typography>
        </Grid> */}
                <Grid item md={6}>
                  <FormLabel component="legend" className="viewLabel">
                    Stop Work
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.stopWork ? initialData.stopWork : '-'}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <FormLabel component="legend" className="viewLabel">
                    Near Miss
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.nearMiss ? initialData.nearMiss : '-'}
                  </Typography>
                </Grid>
                {/* {initialData.personRecognition !== "" ?
            <Grid item md={6}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Recognition
              </Typography>
              <Typography className={classes.labelValue}>
                {initialData.personRecognition ? initialData.personRecognition : "-"}
              </Typography>
            </Grid> : null}

          <Grid item md={12}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Notification sent to Safety Management
            </Typography>
            <Typography className={classes.labelValue}>
              {initialData.isNotifiedToSupervisor ? initialData.isNotifiedToSupervisor : "-"}

            </Typography>
          </Grid> */}
                <Grid item md={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Categories
                  </FormLabel>
                  {/* {tagsData.} */}
                  {tagsData.length > 0
                    && (
                      <Typography className="viewLabelValue">
                        {tagsData.map(tag => tag.observationTag).join(', ')}

                      </Typography>
                    )
                  }
                  {tagsData.length == 0 && '-'}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="23.43" height="29.439" viewBox="0 0 25.43 31.439">
                <path id="Path_2530" data-name="Path 2530" d="M16.815,3.254a.668.668,0,0,1-.217-.033.651.651,0,0,1-.65-.65V1.292h-6.3V2.571a.647.647,0,0,1-.583.64.732.732,0,0,1-.228.033H6.46V5.892H18.892V3.242h-2.1l.023.013ZM5.846,19.2a1.279,1.279,0,1,1-1.279,1.279A1.28,1.28,0,0,1,5.846,19.2ZM4.367,16.042a.575.575,0,0,1,.957-.64l.315.466,1.246-1.515a.576.576,0,1,1,.89.732l-1.724,2.1a.673.673,0,0,1-.138.13.574.574,0,0,1-.8-.159l-.747-1.113Zm0-4.431a.575.575,0,0,1,.957-.64l.315.466L6.885,9.919a.576.576,0,0,1,.89.732l-1.724,2.1a.673.673,0,0,1-.138.13.574.574,0,0,1-.8-.159l-.747-1.11ZM17.705,31.268a.671.671,0,0,1-.435.171.348.348,0,0,1-.1-.01H1.438a1.438,1.438,0,0,1-1.016-.422A1.422,1.422,0,0,1,0,29.989V5.079A1.441,1.441,0,0,1,1.438,3.641H5.181V2.932a.956.956,0,0,1,.287-.686.968.968,0,0,1,.686-.287H8.369V1.072A1.053,1.053,0,0,1,8.689.32,1.053,1.053,0,0,1,9.441,0h6.747a1.053,1.053,0,0,1,.752.32,1.058,1.058,0,0,1,.32.752v.89h2a1.011,1.011,0,0,1,.686.287.986.986,0,0,1,.287.686v.709h3.743a1.441,1.441,0,0,1,1.438,1.438V23.05a.656.656,0,0,1-.194.65l-7.433,7.522a.223.223,0,0,1-.056.046h-.023ZM16.62,30.137c0-8.6-1.085-7.581,7.476-7.581V5.079a.121.121,0,0,0-.046-.1.143.143,0,0,0-.1-.046H20.2v1.3a.956.956,0,0,1-.287.686.968.968,0,0,1-.686.287H6.141a.986.986,0,0,1-.686-.287c-.023-.023-.033-.046-.056-.069a.994.994,0,0,1-.228-.617V4.93H1.428a.121.121,0,0,0-.1.046.171.171,0,0,0-.046.1v24.91a.107.107,0,0,0,.046.1.143.143,0,0,0,.1.046H16.62Zm-6.071-9.208a.65.65,0,0,1,0-1.3h6.174a.65.65,0,0,1,0,1.3Zm0-9.282a.65.65,0,1,1,0-1.3h9.508a.65.65,0,1,1,0,1.3Zm0,4.641a.65.65,0,1,1,0-1.3h9.508a.65.65,0,1,1,0,1.3Z" fill="#06425c" />
              </svg>
              {' '}
              Confirmation and notification
            </Typography>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                  <FormLabel component="legend" className="viewLabel">Recognition</FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.personRecognition ? initialData.personRecognition : '-'}
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <FormLabel component="legend" className="viewLabel">Notification sent to Safety Management</FormLabel>
                  <Typography className="viewLabelValue">
                    {initialData.isNotifiedToSupervisor ? initialData.isNotifiedToSupervisor : '-'}
                  </Typography>
                </Grid>
                {initialData.fkCompanyId === 3
                  ? (
                    <Grid item md={12} sm={12} xs={12}>
                      <FormLabel component="legend" className="viewLabel">Confirm if the foreman was present at the time of your observation</FormLabel>
                      <Typography className="viewLabelValue">
                        {initialData.isSupervisorPresent ? initialData.isSupervisorPresent : '-'}
                      </Typography>
                    </Grid>
                  )
                  : null}
              </Grid>
            </Paper>
          </Grid>
          {/* <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Assignee
          </Typography>
          <Typography className={classes.labelValue}>
           {initialData.assigneeName ? initialData.assigneeName : "-"}
          </Typography>
        </Grid> */}
          {/* <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Actions
          </Typography>
          {actionTakenData.map((actionTaken)=>(
          <Typography className={classes.labelValue}>
            {actionTaken.actionTitle}
          </Typography>
          ))}
        </Grid> */}
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg id="twotone-closed_caption-24px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path id="Path_5090" data-name="Path 5090" d="M0,0H24V24H0Z" fill="none" />
                <path id="Path_5091" data-name="Path 5091" d="M18.5,16H7A4,4,0,0,1,7,8H19.5a2.5,2.5,0,0,1,0,5H9a1,1,0,0,1,0-2h9.5V9.5H9a2.5,2.5,0,0,0,0,5H19.5a4,4,0,0,0,0-8H7a5.5,5.5,0,0,0,0,11H18.5Z" fill="#06425c" />
              </svg>
              {' '}
              Attachment
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item md={12}>
                  {/* <Typography variant="h6" gutterBottom className={classes.labelName}>
              Attachments
            </Typography> */}
                  {initialData.files ? (
                    <Typography style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }} className="viewLabelValue">
                      {typeof initialData.files === 'object' ? (
                        <>
                          <Typography style={{ width: '100%', marginLeft: '10px' }}>
                            {initialData.files.length}
                            {' '}
                            Attachment
                            {initialData.files.length > 1 ? 's' : ''}
                          </Typography>

                          {/* Mapping the files */}

                          {
                            initialData.files.map((file) => (
                              <Attachment key={file.id} value={file.fileName} type={file.fileType} />
                            ))
                          }
                        </>
                      ) : null}
                    </Typography>
                  ) : initialData.attachment ? (
                    <Attachment value={initialData.attachment} />
                  ) : ('-')}
                </Grid>
              </Grid>
            </Paper>
          </Grid>


          {initialData.assigneeName && (
            <>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30.217" height="24.92" viewBox="0 0 37.217 27.92">
                    <path id="project-management" d="M27.194,13.612a.624.624,0,0,0-.3.082.285.285,0,0,0-.094.106.424.424,0,0,0-.03.17,1.515,1.515,0,0,0,.3.739h0l.636,1.012a5.453,5.453,0,0,0,.854,1.124,1.745,1.745,0,0,0,1.212.488,1.781,1.781,0,0,0,1.288-.512,5.583,5.583,0,0,0,.882-1.212l.715-1.178a1.148,1.148,0,0,0,.151-.627c-.018-.073-.1-.106-.23-.115h-.245a1.075,1.075,0,0,1-.194,0l.245-1.085c-1.818.3-3.181-1.063-5.1-.27l.133,1.3a1.039,1.039,0,0,1-.218,0Zm-4.847,8.407c.17-2.187-.261-2.218,1.575-2.905a17.629,17.629,0,0,0,2.924-1.3l1.572,4.208Zm14.845,0c-.167-2.187.261-2.218-1.572-2.905a17.772,17.772,0,0,1-2.927-1.3L31.12,22.019Zm-6.968-2.293h.218a.364.364,0,0,0,.361-.361v-.582a.361.361,0,0,0-.361-.361h-1.3a.361.361,0,0,0-.361.361v.585a.364.364,0,0,0,.361.361h.23l-.424,2.293h1.7l-.409-2.293Zm-20.153.13.248.245a.17.17,0,0,1,0,.236l-.2.2a1.351,1.351,0,0,1,.124.33H10.5a.167.167,0,0,1,.167.167v.348a.167.167,0,0,1-.167.167h-.282a1.382,1.382,0,0,1-.145.318l.182.185a.17.17,0,0,1,0,.236l-.248.245a.167.167,0,0,1-.233,0l-.2-.2a1.351,1.351,0,0,1-.33.124v.264a.167.167,0,0,1-.167.167H8.729a.167.167,0,0,1-.167-.167V22.44a1.339,1.339,0,0,1-.321-.145l-.182.182a.164.164,0,0,1-.236,0l-.245-.245a.164.164,0,0,1,0-.236l.2-.2a1.233,1.233,0,0,1-.121-.33H7.4a.164.164,0,0,1-.167-.167v-.354a.167.167,0,0,1,.167-.167h.282a1.212,1.212,0,0,1,.145-.3l-.182-.182a.164.164,0,0,1,0-.236l.245-.248a.17.17,0,0,1,.236,0l.2.2a1.351,1.351,0,0,1,.33-.124v-.258a.167.167,0,0,1,.167-.167h.348a.167.167,0,0,1,.167.167v.282a1.212,1.212,0,0,1,.318.145l.182-.182a.164.164,0,0,1,.236,0Zm-1.124.606a.688.688,0,1,1-.688.688A.688.688,0,0,1,8.947,20.462Zm4.193-4.756a.657.657,0,0,1-.585-.7.642.642,0,0,1,.585-.7h7.48a.66.66,0,0,1,.588.7.645.645,0,0,1-.588.7Zm0,6.147a.66.66,0,0,1-.585-.7.645.645,0,0,1,.585-.706h5.1a.66.66,0,0,1,.585.706.642.642,0,0,1-.585.7ZM8.929,10.491a.4.4,0,0,1-.539-.07l-.045-.048L7.593,9.6a.427.427,0,0,1,.07-.606.5.5,0,0,1,.657-.021l.4.418,1.315-1.054a.409.409,0,0,1,.585.145.47.47,0,0,1-.03.648l-1.642,1.36ZM13.1,9.885c-.327,0-.545-.33-.545-.706s.218-.7.545-.7h8.565a.657.657,0,0,1,.585.7.645.645,0,0,1-.585.706Zm-8.64-6.28H30.181a.724.724,0,0,1,.721.721V6.411H29.566V4.784H4.463V20.234h0a.436.436,0,0,1-.373.433c-3.923.609-4.108,5.253-.118,5.92H29.566V24.636H30.9V27.2a.721.721,0,0,1-.212.509h0a.727.727,0,0,1-.509.212H3.942a4.59,4.59,0,0,1-3.187-1.73,5.155,5.155,0,0,1-.773-3.269V6.059C-.018,3.187-.045.073,3.972,0h.048a.442.442,0,0,1,.442.442ZM1.028,20.974a3.391,3.391,0,0,1,2.405-1.251V.909c-2.745.27-2.424,2.808-2.424,5.165v14.9ZM10.071,13.7l.248.248a.17.17,0,0,1,0,.236l-.2.2a1.4,1.4,0,0,1,.124.33H10.5a.167.167,0,0,1,.167.167v.348a.17.17,0,0,1-.167.17h-.282a1.445,1.445,0,0,1-.145.3l.182.182a.17.17,0,0,1,0,.236l-.248.248a.167.167,0,0,1-.233,0l-.2-.2a1.351,1.351,0,0,1-.33.124v.258a.167.167,0,0,1-.167.167H8.729a.167.167,0,0,1-.167-.167v-.282a1.466,1.466,0,0,1-.321-.145l-.182.182a.17.17,0,0,1-.236,0l-.245-.248a.164.164,0,0,1,0-.236l.2-.2a1.269,1.269,0,0,1-.121-.33H7.4a.167.167,0,0,1-.167-.167V14.8a.164.164,0,0,1,.167-.167h.282a1.188,1.188,0,0,1,.145-.321l-.182-.182a.164.164,0,0,1,0-.236l.245-.245a.164.164,0,0,1,.236,0l.2.2a1.233,1.233,0,0,1,.33-.121v-.258a.167.167,0,0,1,.167-.17h.348a.17.17,0,0,1,.167.17v.279a1.445,1.445,0,0,1,.318.145l.182-.182a.17.17,0,0,1,.236,0Zm-1.124.624a.688.688,0,1,1-.688.685A.688.688,0,0,1,8.947,14.327Zm23.873-.951a.46.46,0,0,1,.333.348,1.412,1.412,0,0,1-.173.869h0a.064.064,0,0,1,0,.018l-.724,1.194a5.959,5.959,0,0,1-.939,1.275,2.139,2.139,0,0,1-1.536.606,2.072,2.072,0,0,1-1.46-.585,5.614,5.614,0,0,1-.909-1.194L26.776,14.9a1.818,1.818,0,0,1-.361-.924.724.724,0,0,1,.061-.33.63.63,0,0,1,.218-.254.821.821,0,0,1,.155-.079,16.419,16.419,0,0,1-.03-1.818,2.527,2.527,0,0,1,.079-.412c.957-3.169,5.8-2.9,5.962.654l-.039,1.648Z" transform="translate(0.025)" fill="#06425c" />
                  </svg>
                  {' '}
                  Accountability
                </Typography>
              </Grid>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Paper elevation={1} className="paperSection">
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <FormLabel component="legend" className="viewLabel">Assign to</FormLabel>
                      <Typography className="viewLabelValue">
                        {initialData.assigneeName ? initialData.assigneeName : '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel component="legend" className="viewLabel">Department</FormLabel>
                      <Typography className="viewLabelValue">
                        {initialData.departmentName ? initialData.departmentName : '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </>
          )}

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="24.961" height="30.053" viewBox="0 0 30.961 36.053">
                <path id="generate-report" d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z" transform="translate(0 0)" fill="#06425c" />
              </svg>
              {' '}
              Project information
            </Typography>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                  <Typography gutterBottom className="labelValue">
                    {initialData.fkProjectId && handleProjectName(initialData.fkProjectId)}
                  </Typography>
                  <Typography className="labelValue">
                    {projectStructName.map(value => value).join(' : ')}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>


          {/* <Grid item md={12}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Project Information
            </Typography>
            <Typography className={classes.labelValue}>
              {moment(initialData["createdAt"]).format(
                "Do MMMM YYYY, h:mm A"
              )}
            </Typography>
          </Grid>

        </Grid>

              {project.projectName}  {projectStructName.map((value) => ` - ${value}`)}
            </Typography>
          </Grid> */}

          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
            PaperProps={{
              style: {
                width: 700,
              },
            }}
          >
            <DialogTitle id="alert-dialog-slide-title">
              {' Please choose what do you want to?'}
            </DialogTitle>
            <IconButton onClick={handleClose} className={classes.closeButton}>
              <Close />
            </IconButton>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Button
                      startIcon={<VisibilityIcon />}
                      variant="contained"
                      color="primary"
                      className={classes.modalButton}
                      disableElevation
                      href={`${documentUrl}`}
                      target="_blank"
                    >
                      View Attachment 111111
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      startIcon={<GetAppIcon />}
                      variant="contained"
                      disableElevation
                      className={classes.modalButton}
                      onClick={(e) => download(documentUrl)}
                    >
                      Download Attachment
                    </Button>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </>
      )
        : <Loader />
      }
    </>
  );
};

export default ObservationInitialNotificationView;
