import React, { useState , useEffect } from 'react';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccessTime from '@material-ui/icons/AccessTime';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import projectpj from 'dan-images/projectpj.png';
import IconButton from '@material-ui/core/IconButton';


// List
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useHistory, useParams } from 'react-router';

// Icons
import Print from '@material-ui/icons/Print';
import Share from '@material-ui/icons/Share';
import Close from '@material-ui/icons/Close';
import Comment from '@material-ui/icons/Comment';
import History from '@material-ui/icons/History';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Styles from 'dan-styles/Summary.scss';
import Fonts from 'dan-styles/Fonts.scss';

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';

import complianceLogoSymbol from 'dan-images/complianceLogoSymbol.png';

import { ReactVideo } from "reactjs-media";
import { ReactAudio } from "reactjs-media";


import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import api from "../../../utils/axios";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";
import axios from "axios";
import moment from "moment";
import Loader from "../Loader";

// Sidebar Links Helper Function
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  statusButton: {
    borderRadius: 4,
    fontSize: 14,
    width: '100%',
    textTransform: 'none',
    fontFamily: 'Montserrat-SemiBold !important',
    lineHeight: '18px',
    border: '1px solid #06425c',
  },
  heading: {
    width: '100%',
    fontSize: theme.typography.pxToRem(15),
    //fontWeight: theme.typography.fontWeightMedium,
    fontWeight: '500',
    '& p': {
      fontSize: theme.typography.pxToRem(15),
      //fontWeight: theme.typography.fontWeightMedium,
      fontWeight: '500',
    },
    '& span': {
      fontSize: theme.typography.pxToRem(15),
      //fontWeight: theme.typography.fontWeightMedium,
      fontWeight: '500',
    },
  },
  viewSectionHeading: {
    paddingBottom: '0px !important',
    marginTop: '5px !important',
    '& p': {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightMedium,
      //fontWeight: '500',
    },
  },
  aLabelValue: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#063d55',
    float: 'left',
    width: '100%',
    paddingRight: '40px',
    '& div': {
      display: 'inline-block',
      float: 'right',
    },
  },
  updateLink: {
    float: 'left',
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    '& a': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    actionTitleLable: {
      float: 'right',
      width: 'calc(100% - 100px)',
      textAlign: 'right',
    },
  },
  ratioColorgreen: {
    backgroundColor: 'green',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  ratioColorred: {
    backgroundColor: 'red',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  ratioColororange: {
    backgroundColor: 'orange',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  accordingHeaderContentLeft: {
    display: 'inline-block',
    width: 'auto',
    padding: '0px',
  },
  accordingHeaderContentRight: {
      display: 'inline-block',
      float: 'right',
      '& li': {
          paddingTop: '0px',
          paddingBottom: '0px',
          '& span': {
              display: 'inline-block',
          },
          '& p': {
              display: 'inline-block',
              fontSize: '1rem !important',
              fontWeight: '500 !important',
              color: '#063d55',
              paddingLeft: '5px',
          },
      },
  },
  accordingHeaderContent: {
      display: 'inline-block',
      color: '#000',
      width: 'auto',
      float: 'left',
  },
  accordingHeaderText: {
    display: 'inline-block',
    width: 'auto',
    paddingLeft: '0px',
    paddingRight: '30px',
  },
  checkedUnclick: {
    pointerEvents: 'none',
  },
  statusLabel: {
    fontSize: '14px',
    fontFamily: 'Montserrat-Regular',
    '& svg': {
      color: '#06425C',
      //verticalAlign: 'sub',
    },
  },
}));


function ComplianceSummary() {
    const [compliance, setCompliance] = useState(true);
    const [complianceData, setComplianceData] = useState({})
    const [projectStructName, setProjectStructName] = useState([])
    const [team, setTeam] = useState([])
    // const [lessonsLearned, setLessonsLearned] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const {id} = useParams()
    const [notificationSentValue, setNotificationSentValue] = useState([])


    const [expanded, setExpanded] = React.useState('panel1');
    const handleExpand = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const [expandedTableDetail, setExpandedTableDetail] = React.useState('panel3');
    const handleTDChange = (panel) => (event, isExpanded ) => {
      setExpandedTableDetail(isExpanded ? panel : false);
    };

    const [expandedTabDetails, setExpandedTabDetails] = React.useState('panel6');
    const handleTBChange = (panel) => (event, isExpanded ) => {
      setExpandedTabDetails(isExpanded ? panel : false);
    };

    const handleNewComplianceUpdatePush = async () => {
      history.push(
        `/app/pages/compliance/compliance-details/${localStorage.getItem("fkComplianceId")}`
      );
    };

    const handleComplianceCommentPush = async () => {
      history.push(
        '/app/pages/compliance-comment'
      );
    };

    const handleComplianceActivityPush = async () => {
      history.push(
        '/app/pages/compliance-activity'
      );
    };

    const [inputState, setInputState] = useState({
      checkedA: true,
      checkedB: true,
      checkedC: true,
      checkedD: true,
    });

    const handleChange = name => event => {
      setInputState({
        ...inputState,
        [name]: event.target.checked
      });
    };

    const {
      checkedA,
      checkedB,
      checkedC,
      checkedD
    } = inputState;

  const classes = useStyles();

  const [myVideoOpen, setMyVideoOpen] = React.useState(false);

  const handleMyVideoClickOpen = () => {
    setMyVideoOpen(true);
  };

  const handleMyVideoClose = () => {
    setMyVideoOpen(false);
  };

  const [myAudioOpen, setMyAudioOpen] = React.useState(false);

  const handleMyAudioClickOpen = () => {
    setMyAudioOpen(true);
  };

  const handleMyAudioClose = () => {
    setMyAudioOpen(false);
  };

  const fetchComplianceData = async () =>{
    let complianceId = localStorage.getItem('fkComplianceId')
    const res = await api.get(`/api/v1/audits/${complianceId}/`).then((response) => {
      let result = response.data.data.results
      setComplianceData(result) 
      handelWorkArea(result)
      handleTeamName(result.inspectionTeam)
      fetchNotificationSent(result.notifyTo)
      setIsLoading(true)
    }).catch((error) => console.log(error))
  }

  const handelWorkArea = async (complianceData) => {
    const fkCompanyId =
      JSON.parse(localStorage.getItem("company")) !== null
        ? JSON.parse(localStorage.getItem("company")).fkCompanyId
        : null;

    const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;
    let structName = []
    let projectStructId = complianceData.fkProjectStructureIds.split(":")
    for (let key in projectStructId) {
      let workAreaId = [projectStructId[key].substring(0, 2), projectStructId[key].substring(2)]
      const api_work_area = axios.create({
        baseURL: SSO_URL,
        headers: HEADER_AUTH
      });
      const workArea = await api_work_area.get(`/api/v1/companies/${fkCompanyId}/projects/${projectId}/projectstructure/${workAreaId[0]}/${workAreaId[1]}/`);
      structName.push(workArea.data.data.results[0]["structureName"])
    }
    setProjectStructName(structName)
  }
  
  const handleTeamName = (teamName) => {
    let data = teamName.split(",")
    setTeam(data)
  }
  const handleProjectName = (projectId) => {
    const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).companies
      : null;
    const fetchCompanyId = userName.filter((user) => user.companyId === complianceData.fkCompanyId)
    const fetchProjectId = fetchCompanyId[0].projects.filter((user) => user.projectId === projectId)
    return fetchProjectId[0].projectName
  }

  const handleComplianceStatusChange = () => {
    if(complianceData.performanceSummary !== null){
      setCompliance(true);
    }else{
      history.push(
        `/app/pages/compliance/compliance-details/${localStorage.getItem("fkComplianceId")}`
      );
    }
  }

  const fetchNotificationSent = async (notifyTo) => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    try {
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/aha/?subentity=aha&roleType=custom`,
        headers: HEADER_AUTH,
      };
      const res = await api(config);
      if (res.status === 200) {
        let data = []
        let user = notifyTo.split(",");
        const result = res.data.data.results;
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < user.length; j++) {
            if (user[j] == result[i].id) {
              data.push(result[i]);
            }
          }
        }
        await setNotificationSentValue(data);
      }
    } catch (error) { }
  };


  useEffect(() => {
    if (id) {
      fetchComplianceData();  
    }
  }, []);

  return (
      <CustomPapperBlock title="Compliance number: Data not available in api" icon='customDropdownPageIcon compliancePageIcon' whiteBg>
      {isLoading ? <>
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30.6" height="30.168" viewBox="0 0 39.6 30.168">
                    <path id="workflow" d="M37.251,11.412l.967.967a.645.645,0,0,1,0,.925l-.78.78a5.208,5.208,0,0,1,.483,1.289H38.93a.645.645,0,0,1,.645.645V17.4a.645.645,0,0,1-.645.645h-1.1a5.176,5.176,0,0,1-.57,1.25l.715.712a.645.645,0,0,1,0,.925l-.967.967a.645.645,0,0,1-.928.013l-.78-.78a5.037,5.037,0,0,1-1.289.483v1.009a.645.645,0,0,1-.645.645H31.991a.645.645,0,0,1-.645-.645V21.512a5.3,5.3,0,0,1-1.26-.564l-.712.709a.645.645,0,0,1-.925,0l-.967-.967a.645.645,0,0,1,0-.925l.78-.78a5.082,5.082,0,0,1-.483-1.289H26.77a.645.645,0,0,1-.645-.645V15.676a.645.645,0,0,1,.645-.645h1.1a5.176,5.176,0,0,1,.57-1.25l-.712-.722a.645.645,0,0,1,0-.925l.967-.967a.645.645,0,0,1,.925,0l.78.78a5.082,5.082,0,0,1,1.289-.483V10.455a.645.645,0,0,1,.645-.645H33.7a.645.645,0,0,1,.645.645v1.1a5.176,5.176,0,0,1,1.25.57l.712-.712a.645.645,0,0,1,.922,0ZM14.2,17.081a.709.709,0,0,1-.645-.761.693.693,0,0,1,.645-.761h8.079a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM8.864,14.825h2.72a.242.242,0,0,1,.255.255V17.8a.238.238,0,0,1-.255.245H8.864A.238.238,0,0,1,8.61,17.8V15.07a.242.242,0,0,1,.255-.255Zm0,6.719h2.72a.242.242,0,0,1,.255.255v2.72a.242.242,0,0,1-.255.255H8.864a.242.242,0,0,1-.255-.255v-2.73a.242.242,0,0,1,.255-.255ZM14.2,23.8a.709.709,0,0,1-.645-.757.693.693,0,0,1,.645-.761h5.511a.709.709,0,0,1,.645.761.693.693,0,0,1-.645.757ZM9.651,11.334a.435.435,0,0,1-.583-.074l-.061-.052-.812-.835a.461.461,0,0,1,.077-.645A.541.541,0,0,1,8.98,9.7l.432.458L10.995,8.7a.448.448,0,0,1,.645.151.509.509,0,0,1-.052.709L9.654,11.341Zm4.512-.645c-.355,0-.59-.355-.59-.761s.235-.761.59-.761h9.346a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM1.11,22.662a3.617,3.617,0,0,1,2.6-1.35V.967C.746,1.257,1.088,4,1.107,6.549V22.662ZM4.817,3.9h27.79a.761.761,0,0,1,.548.229.773.773,0,0,1,.229.548V6.929H31.949V5.156H4.817V21.87h0a.471.471,0,0,1-.4.467c-4.228.654-4.431,5.669-.122,6.388H31.949v-2.1H33.39v2.772a.777.777,0,0,1-.229.548h0a.773.773,0,0,1-.548.229H4.253A4.953,4.953,0,0,1,.811,28.3a5.569,5.569,0,0,1-.828-3.535V6.562C-.017,3.445-.05.077,4.291,0h.058a.474.474,0,0,1,.467.477Zm28.038,9.962a2.688,2.688,0,1,1-2.688,2.688,2.688,2.688,0,0,1,2.688-2.688Z" transform="translate(0.026)" fill="#06425c"/>
                  </svg> Status & stage 
                </Typography>
              </Grid>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Paper elevation={1} className="paperSection">
                  <Grid container spacing={3}>
                    <Grid item md={12} sm={12} xs={12} className={classes.item}>
                      <ul className="SummaryTabList">
                        <li>
                          <Button
                            color={complianceData.performanceSummary !== null ? "secondary" : "primary"}
                            variant={complianceData.performanceSummary !== null ? "contained" : "not-contained"}
                            size="small"
                            //endIcon={<CheckCircle />}
                            className={classes.statusButton}
                            onClick={(e) => {
                              handleComplianceStatusChange()
                              
                              //setApprovals(false);
                              //setLessonsLearned(false);
                              //setSummary(false);
                            }}
                          >
                            Compliance
                          </Button>
                          <Typography className={classes.statusLabel} variant="caption" display="block" align="center">
                          {complianceData.performanceSummary !== null ? "Done" : "Pending"}{complianceData.performanceSummary !== null ? <CheckCircle /> : <AccessTime />}
                          </Typography>
                        </li>
                      </ul>                        
                    </Grid>

                    {/* <Grid item md={2} sm={3} xs={6} className={classes.item}>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        //endIcon={<CheckCircle />}
                        className={classes.statusButton}
                        onClick={(e) => {
                          setCompliance(true);
                          //setApprovals(false);
                          //setLessonsLearned(false);
                          //setSummary(false);
                        }}
                      >
                        Compliance
                      </Button>
                      <Typography className={classes.statusLabel} variant="caption" display="block" align="center">
                        Done <CheckCircle />
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={12} className="paddTBRemove">
                
                {/* summary and part */}
                <>
                  {(() => {
                    if (
                      compliance == true
                    ) {
                      return (
                          <>
                            {/* <Grid item xs={12}> */}
                              {/* <Grid container spacing={3} className={classes.mToptewnty}> */}

                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                  <Typography variant="h6" className="sectionHeading">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24.961" height="30.053" viewBox="0 0 30.961 36.053">
                                      <path id="generate-report" d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z" transform="translate(0 0)" fill="#06425c"/>
                                    </svg> Project information
                                  </Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                  <Paper elevation={1} className="paperSection">
                                    <Grid container spacing={3}>
                                      <Grid item md={12} sm={12} xs={12}>
                                        <Typography gutterBottom className="labelValue">
                                            {handleProjectName(complianceData['fkProjectId'])}
                                        </Typography>
                                        <Typography className="labelValue">
                                        {projectStructName.map(value => { return value }).join(" : ")}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Paper>
                                </Grid>

                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                  <Typography variant="h6" className="sectionHeading">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="32" viewBox="0 0 33.2 39">
                                      <g id="Group_5733" data-name="Group 5733" transform="translate(-1806 -746)">
                                        <g id="Group_5732" data-name="Group 5732" transform="translate(266)">
                                          <g id="Group_5725" data-name="Group 5725" transform="translate(427.999)">
                                            <path id="personal-information-5" d="M184.6,100.531h16.977a1.124,1.124,0,1,0,0-2.248H184.6a1.124,1.124,0,0,0,0,2.248Zm23.964-32.483H177.615a1.124,1.124,0,0,0-1.124,1.124v36.752a1.124,1.124,0,0,0,1.124,1.124h30.951a1.124,1.124,0,0,0,1.124-1.124V69.172A1.124,1.124,0,0,0,208.566,68.048ZM207.442,104.8h-28.7V70.3h28.7ZM184.6,95.386h16.977a1.124,1.124,0,0,0,0-2.248H184.6a1.124,1.124,0,1,0,0,2.248Z" transform="translate(935.51 677.952)" fill="#06425c"/>
                                          </g>
                                        </g>
                                        <g id="compliance" transform="translate(1813.6 751.414)">
                                          <g id="Group_5383" data-name="Group 5383" transform="translate(0.4 0.4)">
                                            <g id="Group_5382" data-name="Group 5382">
                                              <path id="Path_5175" data-name="Path 5175" d="M14.675,2.41A6.822,6.822,0,0,0,5,2.41a6.826,6.826,0,0,0-.845,8.652l-3.146,2.8c-.058.029-.087.087-.146.117A1.569,1.569,0,0,0,.4,15.083a1.588,1.588,0,0,0,2.709,1.136.635.635,0,0,0,.117-.146l2.8-3.175A6.828,6.828,0,0,0,14.675,2.41ZM9.868,13.073a5.826,5.826,0,1,1,5.826-5.826A5.825,5.825,0,0,1,9.868,13.073Z" transform="translate(-0.4 -0.4)" fill="#06425c"/>
                                              <path id="Path_5176" data-name="Path 5176" d="M23.03,18.392l-1.835-1.835L20,17.78l3.03,3.03,4.457-4.486L26.293,15.1Z" transform="translate(-14.29 -10.818)" fill="#06425c"/>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </svg> Compliance Details
                                  </Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                  <Paper elevation={1} className="paperSection">
                                    <Grid container spacing={3}>

                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className="viewLabel"
                                        >
                                          Select the type of compliance check
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                          {complianceData['auditType']}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className="viewLabel"
                                        >
                                          Date of compliance check
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                          {moment(complianceData['createdAt']).format(
                                              "Do MMMM YYYY, h:mm:ss a"
                                            )}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12} className={classes.viewSectionHeading}>
                                        <FormLabel component="legend" className="checkRadioLabel">Company representative information</FormLabel>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className="viewLabel"
                                        >
                                          Client HSE rep
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                          {complianceData["hseRepresentative"] !== "" ? complianceData["hseRepresentative"] : "-"}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className="viewLabel"
                                        >
                                          Client rep number
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                          Data not available in api
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12} className={classes.viewSectionHeading}>
                                        <FormLabel component="legend" className="checkRadioLabel">Contractor information</FormLabel>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className="viewLabel"
                                        >
                                          Contractor name
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                          {complianceData["contractor"] !== "" ? complianceData["contractor"] : "-"}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className="viewLabel"
                                        >
                                          Contractor rep number
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                          {complianceData["contractorRepNumber"] !== "" ? complianceData["contractorRepNumber"] : "-"}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className="viewLabel"
                                        >
                                          Sub-Contractor name
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                          {complianceData["subContractor"] !== "" ? complianceData["subContractor"] : "-"}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className="viewLabel"
                                        >
                                          Contractor supervisor name
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                          {complianceData["contractorSupervisorName"] !== "" ? complianceData["contractorSupervisorName"] : "-"}
                                        </Typography>
                                      </Grid>

                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className="viewLabel"
                                        >
                                          Inspection team
                                        </Typography>
                                        {team.length > 0 ? team.map((item) => (
                                        <Typography display="block" className="viewLabelValue">{item}</Typography>
                                        )) : "-"}
                                      </Grid>

                                      {/* <Grid item md={12} sm={12} xs={12}>
                                        <Accordion
                                          expanded={expanded === "panel1"}
                                          onChange={handleExpand("panel1")}
                                        >
                                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography className={classes.heading}>
                                              Compliance Details
                                            </Typography>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <Grid container item xs={12} spacing={3}>
                                                <>
                                                  <Grid item md={12}>
                                                    <Typography variant="label" gutterBottom className={Fonts.labelName}>
                                                        Project structure
                                                    </Typography>
                                                    <Typography className={Fonts.labelValue}>
                                                      Project name - Phase Name - Unit Name
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={6}>
                                                    <Typography
                                                      variant="label"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Select the type of compliance check
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      Work area compliance check
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={6}>
                                                    <Typography
                                                      variant="label"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Date of compliance check
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      02-09-2021
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={12} className={classes.viewSectionHeading}>
                                                    <Typography>
                                                      Company representative information
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={6} md={6}>
                                                    <Typography
                                                      variant="label"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Client HSE rep
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      NA
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={6} md={6}>
                                                    <Typography
                                                      variant="label"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Client rep number
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      NA
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={12} className={classes.viewSectionHeading}>
                                                    <Typography>
                                                      Contractor information
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={6}>
                                                    <Typography
                                                      variant="label"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Contractor name
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      NA
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={6}>
                                                    <Typography
                                                      variant="label"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Contractor rep number
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      NA
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={6}>
                                                    <Typography
                                                      variant="label"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Sub-Contractor name
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      NA
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={6}>
                                                    <Typography
                                                      variant="label"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Contractor supervisor name
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      NA
                                                    </Typography>
                                                  </Grid>

                                                  <Grid item xs={12} md={6}>
                                                    <Typography
                                                      variant="label"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Inspection team
                                                    </Typography>
                                                    <Typography variant="body" display="block" className={Fonts.labelValue}>Inspection team one</Typography>
                                                    <Typography variant="body" display="block" className={Fonts.labelValue}>Inspection team Two</Typography>
                                                  </Grid>
                                                </>
                                            </Grid>
                                          </AccordionDetails>
                                        </Accordion>
                                      </Grid> */}
                                    </Grid>
                                  </Paper>
                                </Grid>
                              {/* </Grid> */}
                            {/* </Grid> */}

                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                  <Typography variant="h6" className="sectionHeading">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 39 35.181">
                                      <path id="floor-plan" d="M30.051,29.16a.794.794,0,1,1,0-1.587h1.521V21.586H30.1A.794.794,0,0,1,30.1,20h1.473V11.593H25.343v8.422h1.476a.794.794,0,1,1,0,1.587H25.343v1.644a.794.794,0,0,1-1.587,0V11.593H13.119v5.66h5.212a.787.787,0,0,1,.79.787v9.539h4.616V26.106a.794.794,0,1,1,1.587,0v1.473h1.87a.794.794,0,1,1,0,1.587H12.328a.79.79,0,0,1-.79-.79V10.793a.794.794,0,0,1,.79-.79H32.378a.794.794,0,0,1,.775.79V28.369a.79.79,0,0,1-.775.79ZM1.685,26.093l.089-.063a4.6,4.6,0,0,1,.514-.394,5.266,5.266,0,0,1,1.178-.578,7.878,7.878,0,0,1,1.117-.3V1.619c-2.939.451-2.92,3.4-2.9,6.152.076,3.809-.171,13.847,0,18.322Zm4.444-.654a.8.8,0,0,1-.187.46.771.771,0,0,1-.476.26h0a8.889,8.889,0,0,0-1.27.276,3.971,3.971,0,0,0-1.044.476,3.371,3.371,0,0,0-.813.771,5.263,5.263,0,0,0-.667,1.2,6.9,6.9,0,0,0,.13,1.74,3.781,3.781,0,0,0,.581,1.381h0a3.3,3.3,0,0,0,1.121.984,5.552,5.552,0,0,0,1.8.59H37.428V6.031H6.145V25.439Zm0-20.951H37.872A1.13,1.13,0,0,1,39,5.619V34.058a1.146,1.146,0,0,1-.086.429,1.187,1.187,0,0,1-.244.365h0a1.187,1.187,0,0,1-.365.244,1.089,1.089,0,0,1-.429.086H5.262a5.06,5.06,0,0,1-2.27-.673,5.593,5.593,0,0,1-1.879-1.587,5.336,5.336,0,0,1-.825-1.9,8.688,8.688,0,0,1-.165-2.286c0-6.822-.279-14.215,0-20.951A13.553,13.553,0,0,1,.733,2.625C1.364,1.162,2.682.051,5.281,0h.083a.781.781,0,0,1,.781.781v3.7ZM13.113,18.84v8.739h4.428V18.83Z" transform="translate(0.001)" fill="#06425c"/>
                                    </svg> Categories
                                  </Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                  <Paper elevation={1} className="paperSection">
                                    <Grid container spacing={3}>
                                      <Grid
                                        item
                                        md={12}
                                        xs={12}
                                      >
                                        <Grid container spacing={3}>
                                          <Grid
                                            item
                                            md={6}
                                            xs={12}
                                          >
                                            <FormLabel className="checkRadioLabel" component="legend">Group name</FormLabel>
                                            <FormGroup>
                                              
                                              <FormControlLabel
                                                //className={classNames(classes.checkedUnclick, classes.labelValue)}
                                                className="checkRadioLabel checkedUnclick"
                                                control={(
                                                  <Checkbox
                                                    checked={checkedB}
                                                    onChange={handleChange('checkedB')}
                                                    value="checkedB"
                                                    classes={{
                                                      root: classes.root,
                                                      checked: classes.checked,
                                                    }}
                                                  />
                                                )}
                                                label="Environment"
                                              />
                                              <FormControlLabel
                                                //className={classNames(classes.checkedUnclick, classes.labelValue)}
                                                className="checkRadioLabel checkedUnclick"
                                                control={(
                                                  <Checkbox
                                                    checked={checkedC}
                                                    onChange={handleChange('checkedC')}
                                                    value="checkedC"
                                                    classes={{
                                                      root: classes.root,
                                                      checked: classes.checked,
                                                    }}
                                                  />
                                                )}
                                                label="Housekeeping"
                                              />
                                            </FormGroup>
                                          </Grid>
                                        
                                          <Grid
                                            item
                                            md={6}
                                            xs={12}
                                          >
                                            <Grid container spacing={3}>
                                              <Grid
                                                item
                                                md={12}
                                                xs={12}
                                                className={classes.formBox} 
                                              >
                                                <FormLabel className="checkRadioLabel" component="legend">Environment</FormLabel>
                                                <FormGroup>
                                                  <FormControlLabel
                                                    //className={classes.labelValue}
                                                    className="checkedUnclick"
                                                    control={(
                                                      <Checkbox
                                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                        name="checkedI"
                                                        onChange={handleChange}
                                                        checked={checkedC}
                                                        value="checkedC"
                                                      />
                                                    )}
                                                    label="Category"
                                                  />
                                                  <FormControlLabel
                                                    //className={classes.labelValue}
                                                    className="checkedUnclick"
                                                    control={(
                                                      <Checkbox
                                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                        name="checkedI"
                                                        onChange={handleChange}
                                                        checked={checkedC}
                                                        value="checkedC"
                                                      />
                                                    )}
                                                    label="Category 2"
                                                  />
                                                </FormGroup>
                                              </Grid>
                                              <Grid
                                                item
                                                md={12}
                                                xs={12}
                                                className={classes.formBox} 
                                              >
                                                <FormLabel className="checkRadioLabel" component="legend">Housekeeping</FormLabel>
                                                <FormGroup>
                                                  <FormControlLabel
                                                    //className={classes.labelValue}
                                                    className="checkedUnclick"
                                                    control={(
                                                      <Checkbox
                                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                        name="checkedI"
                                                        onChange={handleChange}
                                                        checked={checkedC}
                                                        value="checkedC"
                                                      />
                                                    )}
                                                    label="Category"
                                                  />
                                                </FormGroup>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>

                                    </Grid>
                                  </Paper>
                                </Grid>


                            
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="28" viewBox="0 0 49.737 39">
                                  <g id="check-30" transform="translate(-100.352 -178.176)">
                                    <path id="Path_6414" data-name="Path 6414" d="M100.352,178.176v33.94h39.493v-33.94Zm37.025,31.348H102.82v-28.88h34.557Z" transform="translate(0)" fill="#06425c"/>
                                    <path id="Path_6415" data-name="Path 6415" d="M192.512,333.824h4.32v3.456h-4.32Z" transform="translate(-86.606 -146.268)" fill="#06425c"/>
                                    <path id="Path_6416" data-name="Path 6416" d="M286.72,352.256h21.968v1.234H286.72Z" transform="translate(-175.137 -163.59)" fill="#06425c"/>
                                    <path id="Path_6417" data-name="Path 6417" d="M286.72,466.944h21.968v1.234H286.72Z" transform="translate(-175.137 -271.366)" fill="#06425c"/>
                                    <path id="Path_6418" data-name="Path 6418" d="M286.72,585.728h21.968v1.234H286.72Z" transform="translate(-175.137 -382.992)" fill="#06425c"/>
                                    <path id="Path_6419" data-name="Path 6419" d="M192.512,448.512h4.32v3.456h-4.32Z" transform="translate(-86.606 -254.045)" fill="#06425c"/>
                                    <path id="Path_6420" data-name="Path 6420" d="M192.512,567.3h4.32v3.456h-4.32Z" transform="translate(-86.606 -365.671)" fill="#06425c"/>
                                    <path id="Path_6421" data-name="Path 6421" d="M308.978,300.173l-3.826,2.962s9.75,8.269,15.3,16.044c0,0,3.456-13.452,22.092-30.361l-.864-2.1s-10.861,5.06-23.7,21.1A79.707,79.707,0,0,0,308.978,300.173Z" transform="translate(-192.458 -102.003)" fill="#06425c"/>
                                  </g>
                                </svg> Checks
                              </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    className="paddBRemove"
                                  >
                                    <FormLabel className="checkRadioLabel" component="legend">Environment</FormLabel>
                                    <span className={classes.accordingHeaderContentleft}>
                                        <ListItem className={classes.accordingHeaderText}>
                                            <ListItemText className="viewLabelValueListTag" primary="Total score: " secondary="25" />
                                        </ListItem>
                                        <ListItem className={classes.accordingHeaderText}>
                                            <ListItemText className="viewLabelValueListTag" primary="Acceptable score: " secondary="<as per admin config>" />
                                        </ListItem>
                                    </span>


                                    <Accordion expanded={expandedTableDetail === 'panel3'} onChange={handleTDChange('panel3')} defaultExpanded className="backPaperAccordian">
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        className="accordionHeaderSection"
                                      >
                                        <List className={classes.heading}>
                                            <ListItem className={classes.accordingHeaderContentLeft}>
                                                <ListItemText primary="Welding machines used are tested and properly connected" />
                                            </ListItem>
                                        </List>  
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Grid container spacing={2}>
                                          {/* <Grid item md={4} sm={4} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Criticality</FormLabel>
                                            <Typography className="viewLabelValue">
                                              NA
                                            </Typography>
                                          </Grid>
                                          
                                          <Grid item md={4} sm={4} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Status</FormLabel>
                                            <Typography className="viewLabelValue">
                                              NA
                                            </Typography>
                                          </Grid> */}

                                          <Grid item md={12} sm={12} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Is this control applicable ?</FormLabel>
                                            <Typography className="viewLabelValue">
                                              Yes
                                            </Typography>
                                          </Grid>
                                          <Grid item md={12} sm={12} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Findings</FormLabel>
                                            <Typography className="viewLabelValue">
                                              NA
                                            </Typography>
                                          </Grid> 
                                          <Grid item md={12} sm={12} xs={12}>
                                            <FormLabel component="legend" className="checkRadioLabel">Score</FormLabel>
                                            <Grid item md={12} sm={12} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Percentage</FormLabel>
                                              <Typography className="viewLabelValue">
                                                20%
                                              </Typography>
                                            </Grid>
                                          </Grid> 
                                          <Grid item md={12} xs={12}>
                                            <FormLabel component="legend" className="checkRadioLabel">Corrective Actions</FormLabel>
                                            <Table component={Paper}>
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell className="tableHeadCellFirst">Action number</TableCell>
                                                  <TableCell className="tableHeadCellSecond">Action title</TableCell>
                                                  <TableCell className="tableHeadCellFirst">Assignee</TableCell>
                                                  <TableCell className="tableHeadCellSecond">Status</TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                                <TableRow>
                                                  <TableCell align="left">
                                                    AT-211004-012
                                                  </TableCell>
                                                  <TableCell>
                                                    Action 1 
                                                  </TableCell>
                                                  <TableCell align="left">
                                                    Ajay Chauhan
                                                  </TableCell>
                                                  <TableCell>
                                                    Assigned
                                                  </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                  <TableCell align="left">
                                                    AT-211004-012
                                                  </TableCell>
                                                  <TableCell>
                                                    Action 2
                                                  </TableCell>
                                                  <TableCell align="left">
                                                    Ajay Chauhan
                                                  </TableCell>
                                                  <TableCell>
                                                    Assigned
                                                  </TableCell>
                                                </TableRow>
                                              </TableBody>
                                            </Table>
                                          </Grid>
                                          <Grid item md={12} sm={12} xs={12}>
                                            <FormLabel component="legend" className="checkRadioLabel">Attachments</FormLabel>
                                            <div className="attachFileThumb">
                                              <img src={projectpj} className="attachFileStyle" alt="attachment" />
                                              <div className="attachContent">
                                                <p>construction.jpg</p>
                                                <p>125kb</p>
                                              </div>
                                            </div>

                                            <div className="attachFileThumb">
                                              <img src={projectpj} className="attachFileStyle" alt="attachment" />
                                              <div className="attachContent">
                                                <p>construction.jpg</p>
                                                <p>125kb</p>
                                              </div>
                                            </div>

                                            <div className="attachFileThumb">
                                              <IconButton aria-label="video" onClick={(e) => handleMyVideoClickOpen(e)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48">
                                                  <g id="Group_5810" data-name="Group 5810" transform="translate(16208 11679)">
                                                    <g id="Rectangle_1887" data-name="Rectangle 1887" transform="translate(-16208 -11679)" fill="#7890a4" stroke="#f3f3f3" stroke-width="1">
                                                      <rect width="48" height="48" rx="10" stroke="none"/>
                                                      <rect x="0.5" y="0.5" width="47" height="47" rx="9.5" fill="none"/>
                                                    </g>
                                                    <path id="Polygon_1" data-name="Polygon 1" d="M8,0l8,14H0Z" transform="translate(-16174 -11663) rotate(90)" fill="#e7e7e7"/>
                                                  </g>
                                                </svg>
                                              </IconButton>
                                              <div className="attachContent">
                                                <p>VideoFile.mp4</p>
                                                <p>234 bytes</p>
                                              </div>
                                            </div>
                                            <div className="attachFileThumb">
                                              <IconButton aria-label="video" onClick={(e) => handleMyAudioClickOpen(e)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48">
                                                  <g id="Group_5809" data-name="Group 5809" transform="translate(16208 11747)">
                                                    <g id="Rectangle_1886" data-name="Rectangle 1886" transform="translate(-16208 -11747)" fill="#7890a4" stroke="#f3f3f3" stroke-width="1">
                                                      <rect width="48" height="48" rx="10" stroke="none"/>
                                                      <rect x="0.5" y="0.5" width="47" height="47" rx="9.5" fill="none"/>
                                                    </g>
                                                    <path id="Path_6428" data-name="Path 6428" d="M18.1,6V16.422a3.816,3.816,0,1,0,2.548,3.593V8.548h3.822V6Z" transform="translate(-16203 -11738)" fill="#e7e7e7"/>
                                                  </g>
                                                </svg>
                                              </IconButton>
                                              <div className="attachContent">
                                                <p>AudioFile.mp3</p>
                                                <p>234 bytes</p>
                                              </div>
                                            </div>

                                            <div className="attachFileThumb">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48">
                                                <g id="Group_5866" data-name="Group 5866" transform="translate(16232 11674)">
                                                  <g id="Group_5865" data-name="Group 5865">
                                                    <g id="Rectangle_1896" data-name="Rectangle 1896" transform="translate(-16232 -11674)" fill="#419a69" stroke="#f3f3f3" stroke-width="1">
                                                      <rect width="48" height="48" rx="10" stroke="none"/>
                                                      <rect x="0.5" y="0.5" width="47" height="47" rx="9.5" fill="none"/>
                                                    </g>
                                                  </g>
                                                  <g id="_48" transform="translate(-16225 -11667.055)">
                                                    <rect id="Rectangle_1897" data-name="Rectangle 1897" width="15.431" height="23.551" transform="translate(17.054 4.872)" fill="#fff"/>
                                                    <path id="Path_6435" data-name="Path 6435" d="M958.054,199.723v23.551H942.623V199.723h15.431m0-1.623H942.623A1.623,1.623,0,0,0,941,199.723v23.551a1.623,1.623,0,0,0,1.623,1.623h15.431a1.623,1.623,0,0,0,1.623-1.623V199.723A1.623,1.623,0,0,0,958.054,198.1Z" transform="translate(-925.569 -194.852)" fill="#217346"/>
                                                    <rect id="Rectangle_1898" data-name="Rectangle 1898" width="5.685" height="2.437" transform="translate(24.363 7.309)" fill="#217346"/>
                                                    <rect id="Rectangle_1899" data-name="Rectangle 1899" width="5.685" height="2.437" transform="translate(24.363 11.369)" fill="#217346"/>
                                                    <rect id="Rectangle_1900" data-name="Rectangle 1900" width="5.685" height="2.437" transform="translate(24.363 15.431)" fill="#217346"/>
                                                    <rect id="Rectangle_1901" data-name="Rectangle 1901" width="5.685" height="2.437" transform="translate(24.363 19.491)" fill="#217346"/>
                                                    <rect id="Rectangle_1902" data-name="Rectangle 1902" width="5.685" height="2.437" transform="translate(24.363 23.551)" fill="#217346"/>
                                                    <rect id="Rectangle_1903" data-name="Rectangle 1903" width="5.685" height="2.437" transform="translate(17.054 7.309)" fill="#217346"/>
                                                    <rect id="Rectangle_1904" data-name="Rectangle 1904" width="5.685" height="2.437" transform="translate(17.054 11.369)" fill="#217346"/>
                                                    <rect id="Rectangle_1905" data-name="Rectangle 1905" width="5.685" height="2.437" transform="translate(17.054 15.431)" fill="#217346"/>
                                                    <rect id="Rectangle_1906" data-name="Rectangle 1906" width="5.685" height="2.437" transform="translate(17.054 19.491)" fill="#217346"/>
                                                    <rect id="Rectangle_1907" data-name="Rectangle 1907" width="5.685" height="2.437" transform="translate(17.054 23.551)" fill="#217346"/>
                                                    <path id="Path_6436" data-name="Path 6436" d="M20.3,0,0,3.557V30.552l20.3,3.557Z" fill="#217346" fill-rule="evenodd"/>
                                                    <path id="Path_6437" data-name="Path 6437" d="M300.437,594.3l-2.834.171-1.73,4.06-.113.366-.082.276-.074.267-.057.22h0a.672.672,0,0,0-.074-.308l-.074-.284-.082-.267-.089-.244-1.486-3.857-2.735.171,2.916,6.318-3.224,6.318,2.671.162,1.794-4.142.082-.284.066-.253.057-.212v-.17h0l.057.3.057.253.049.2.049.138,1.868,4.418,3.1.2-3.493-6.96,3.376-6.846" transform="translate(-285.933 -584.555)" fill="#fff"/>
                                                  </g>
                                                </g>
                                              </svg>
                                              <div className="attachContent">
                                                <p>xcel.xl</p>
                                                <p>125 bytes</p>
                                              </div>
                                            </div>

                                            <div className="attachFileThumb">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48">
                                                <g id="Group_5867" data-name="Group 5867" transform="translate(16232 11742)">
                                                  <g id="Rectangle_1895" data-name="Rectangle 1895" transform="translate(-16232 -11742)" fill="#ff2116" stroke="#f3f3f3" stroke-width="1">
                                                    <rect width="48" height="48" rx="10" stroke="none"/>
                                                    <rect x="0.5" y="0.5" width="47" height="47" rx="9.5" fill="none"/>
                                                  </g>
                                                  <g id="layer1" transform="translate(-16188.924 -11832.732)">
                                                    <g id="g899" transform="translate(-36.076 93.732)">
                                                      <g id="g876">
                                                        <path id="path890" d="M-49.217,183.976a4.338,4.338,0,0,0-4.331,4.332v33.271a4.338,4.338,0,0,0,4.331,4.332h25.441a4.338,4.338,0,0,0,4.331-4.332V194.221a3.586,3.586,0,0,0-.28-1.581,4.38,4.38,0,0,0-.857-1.239l0-.005L-26.9,185.2l-.01-.01a4.994,4.994,0,0,0-1.338-.856,4.889,4.889,0,0,0-1.91-.361H-49.217Z" transform="translate(53.548 -183.976)" fill="#ff2116"/>
                                                        <path id="rect2684" d="M-47.5,187.118h19.09a4.065,4.065,0,0,1,1.321.247,3.619,3.619,0,0,1,.92.582l0,0,6.3,6.177a3.474,3.474,0,0,1,.563.813,3.085,3.085,0,0,1,.158.941q0,.015,0,.03V223.3a2.886,2.886,0,0,1-2.908,2.909H-47.5a2.886,2.886,0,0,1-2.908-2.909V190.027a2.886,2.886,0,0,1,2.908-2.909Z" transform="translate(51.829 -185.695)" fill="#f5f5f5"/>
                                                        <path id="path2697" d="M-35.174,218.7c-.979-.979.08-2.325,2.955-3.753l1.809-.9.7-1.542c.388-.848.966-2.232,1.286-3.075l.581-1.533-.4-1.135a8.106,8.106,0,0,1-.355-4.245c.423-1.021,1.808-.916,2.357.178.428.855.385,2.4-.123,4.355l-.416,1.6.367.622a21.608,21.608,0,0,0,1.309,1.806l.974,1.212,1.212-.158c3.851-.5,5.17.352,5.17,1.576,0,1.545-3.024,1.673-5.563-.11a7.709,7.709,0,0,1-.964-.8s-1.591.324-2.374.535c-.808.218-1.212.354-2.4.754,0,0-.415.6-.686,1.042a11.222,11.222,0,0,1-3.023,3.477A2.061,2.061,0,0,1-35.174,218.7Zm1.537-.549a11.586,11.586,0,0,0,2.436-2.881l.312-.5-1.422.715c-2.2,1.1-3.2,2.144-2.678,2.774.293.354.644.324,1.352-.113Zm14.262-4a.826.826,0,0,0-.148-1.443,4,4,0,0,0-2.086-.269c-.756.052-1.972.2-2.178.25,0,0,.668.462.964.631a12.819,12.819,0,0,0,2.054.858c.691.211,1.091.189,1.393-.028Zm-5.735-2.383a14.071,14.071,0,0,1-1.231-1.588,8.852,8.852,0,0,1-.69-1.028s-.336,1.08-.611,1.73l-.86,2.125-.249.482s1.325-.434,2-.61c.714-.186,2.163-.471,2.163-.471Zm-1.848-7.411a3.113,3.113,0,0,0-.106-1.745c-.621-.679-1.372-.113-1.245,1.5a11.018,11.018,0,0,0,.358,2.045l.328,1.041.231-.784A20.575,20.575,0,0,0-26.958,204.358Z" transform="translate(43.69 -193.736)" fill="#ff2116"/>
                                                        <g id="g858" transform="translate(10.18 29.503)">
                                                          <path id="path845" d="M-31.067,249.125h1.59a4.321,4.321,0,0,1,1.237.146,1.452,1.452,0,0,1,.8.635,2.087,2.087,0,0,1,.325,1.181,2.146,2.146,0,0,1-.263,1.091,1.546,1.546,0,0,1-.71.658,3.46,3.46,0,0,1-1.364.2H-30v2.507h-1.063Zm1.063.823v2.239h.527a1.387,1.387,0,0,0,.974-.263,1.149,1.149,0,0,0,.273-.856,1.285,1.285,0,0,0-.179-.715.733.733,0,0,0-.4-.339,2.472,2.472,0,0,0-.673-.066Z" transform="translate(31.067 -249.125)" fill="#2c2c2c"/>
                                                          <path id="path847" d="M-20.547,249.125H-19.1a3.264,3.264,0,0,1,1.674.372,2.31,2.31,0,0,1,.95,1.105,3.979,3.979,0,0,1,.325,1.627,4.543,4.543,0,0,1-.292,1.679,2.67,2.67,0,0,1-.884,1.185,2.749,2.749,0,0,1-1.693.451h-1.524Zm1.063.851v4.717h.442a1.489,1.489,0,0,0,1.345-.64,3.112,3.112,0,0,0,.419-1.717q0-2.361-1.764-2.361Z" transform="translate(25.311 -249.125)" fill="#2c2c2c"/>
                                                          <path id="path849" d="M-8.593,249.125h3.565v.851h-2.5V251.9h2v.851h-2v2.8H-8.593Z" transform="translate(18.77 -249.125)" fill="#2c2c2c"/>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </svg>
                                              <div className="attachContent">
                                                <p>PDFfile.pdf</p>
                                                <p>125 bytes</p>
                                              </div>
                                            </div>
                                          </Grid>

                                          

                                        </Grid>  
                                        </AccordionDetails>
                                      </Accordion>
                                    </Grid>
                                    
                                    <div>
                                      <Dialog
                                        open={myVideoOpen}
                                        onClose={handleMyVideoClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth={true}
                                        maxWidth={'sm'}
                                      >
                                      {/* <DialogTitle id="alert-dialog-title">{"Admin"}</DialogTitle> */}
                                      <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                          <Grid
                                            item md={12} sm={12} xs={12}
                                            className={classes.usrProfileListBox}
                                          >
                                            <ReactVideo
                                              src="https://www.example.com/url_to_video.mp4"
                                              poster="https://www.example.com/poster.png"
                                              primaryColor="red"
                                            />
                                          </Grid>
                                        </DialogContentText>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                  
                                  <div>
                                      <Dialog
                                        open={myAudioOpen}
                                        onClose={handleMyAudioClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth={true}
                                        maxWidth={'sm'}
                                      >
                                      <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                          <Grid
                                            item md={12} sm={12} xs={12}
                                            className={classes.usrProfileListBox}
                                          >
                                            <ReactAudio
                                              src="/audio.mp4"
                                              poster="/poster.png"
                                            />
                                          </Grid>
                                        </DialogContentText>
                                      </DialogContent>
                                    </Dialog>
                                  </div>


                                    <Grid
                                      item
                                      md={12}
                                      xs={12}
                                      className="paddTBRemove"
                                    >
                                      <Accordion expanded={expandedTableDetail === 'panel11'} onChange={handleTDChange('panel11')} defaultExpanded className="backPaperAccordian">
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1bh-content"
                                          id="panel1bh-header"
                                          className="accordionHeaderSection"
                                        >
                                          <List className={classes.heading}>
                                              <ListItem className={classes.accordingHeaderContentLeft}>
                                                  <ListItemText primary="Welding machines used are tested and properly connected" />
                                              </ListItem>
                                              {/* <span className={classes.accordingHeaderContentRight}>
                                                  <ListItem className={classes.accordingHeaderContent}>
                                                      <ListItemText primary="Performance rating: " secondary="<as per input>" />
                                                  </ListItem>
                                              </span> */}
                                          </List>  
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Grid container spacing={2}>
                                          <Grid item md={4} sm={4} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Criticality</FormLabel>
                                            <Typography className="viewLabelValue">
                                              NA
                                            </Typography>
                                          </Grid>
                                          
                                          <Grid item md={4} sm={4} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Status</FormLabel>
                                            <Typography className="viewLabelValue">
                                              NA
                                            </Typography>
                                          </Grid>

                                          <Grid item md={4} sm={4} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Performance rating</FormLabel>
                                            <Typography className="viewLabelValue">
                                              NA
                                            </Typography>
                                          </Grid>
                                          <Grid item md={12} sm={12} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Findings</FormLabel>
                                            <Typography className="viewLabelValue">
                                              NA
                                            </Typography>
                                          </Grid> 
                                          <Grid item md={12} xs={12}>
                                            <FormLabel component="legend" className="checkRadioLabel">Corrective Actions</FormLabel>
                                            <Table component={Paper}>
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell className="tableHeadCellFirst">Action number</TableCell>
                                                  <TableCell className="tableHeadCellSecond">Action title</TableCell>
                                                  <TableCell className="tableHeadCellFirst">Assignee</TableCell>
                                                  <TableCell className="tableHeadCellSecond">Status</TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                                <TableRow>
                                                  <TableCell align="left">
                                                    AT-211004-012
                                                  </TableCell>
                                                  <TableCell>
                                                    Action 1 
                                                  </TableCell>
                                                  <TableCell align="left">
                                                    Ajay Chauhan
                                                  </TableCell>
                                                  <TableCell>
                                                    Assigned
                                                  </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                  <TableCell align="left">
                                                    AT-211004-012
                                                  </TableCell>
                                                  <TableCell>
                                                    Action 2
                                                  </TableCell>
                                                  <TableCell align="left">
                                                    Ajay Chauhan
                                                  </TableCell>
                                                  <TableCell>
                                                    Assigned
                                                  </TableCell>
                                                </TableRow>
                                              </TableBody>
                                            </Table>
                                          </Grid>
                                          <Grid item md={12} sm={12} xs={12}>
                                            <FormLabel component="legend" className="checkRadioLabel">Attachments</FormLabel>
                                            <div className="attachFileThumb">
                                              <img src={projectpj} className="attachFileStyle" alt="attachment" />
                                              <div className="attachContent">
                                                <p>construction.jpg</p>
                                                <p>125kb</p>
                                              </div>
                                            </div>

                                            <div className="attachFileThumb">
                                              <img src={projectpj} className="attachFileStyle" alt="attachment" />
                                              <div className="attachContent">
                                                <p>construction.jpg</p>
                                                <p>125kb</p>
                                              </div>
                                            </div>
                                          </Grid>

                                        </Grid> 
                                      </AccordionDetails>
                                    </Accordion>
                                  </Grid>



                                  <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    className="paddTBRemove"
                                  >
                                    {/* <Typography variant="label" gutterBottom className={classNames(classes.firstLabelTitle, Fonts.labelName)}>
                                        Group - Category#2
                                    </Typography>
                                    <span className={classes.accordingHeaderContentleft}>
                                        <ListItem className={classes.accordingHeaderText}>
                                            <ListItemText primary="Total score: " secondary="<as per input>" />
                                        </ListItem>
                                        <ListItem className={classes.accordingHeaderText}>
                                            <ListItemText primary="Acceptable score: " secondary="<as per admin config>" />
                                        </ListItem>
                                    </span> */}

                                    <FormLabel className="checkRadioLabel" component="legend">Housekeeping</FormLabel>
                                    <span className={classes.accordingHeaderContentleft}>
                                        <ListItem className={classes.accordingHeaderText}>
                                            <ListItemText className="viewLabelValueListTag" primary="Total score: " secondary="25" />
                                        </ListItem>
                                        <ListItem className={classes.accordingHeaderText}>
                                            <ListItemText className="viewLabelValueListTag" primary="Acceptable score: " secondary="<as per admin config>" />
                                        </ListItem>
                                    </span>


                                    <Accordion expanded={expandedTableDetail === 'panel9'} onChange={handleTDChange('panel9')} defaultExpanded className="backPaperAccordian">
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        className="accordionHeaderSection"
                                      >
                                        <List className={classes.heading}>
                                            <ListItem className={classes.accordingHeaderContentLeft}>
                                                <ListItemText primary="Welding machines used are tested and properly connected" />
                                            </ListItem>
                                            
                                        </List>  
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Criticality</FormLabel>
                                              <Typography className="viewLabelValue">
                                                NA
                                              </Typography>
                                            </Grid>
                                            
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Status</FormLabel>
                                              <Typography className="viewLabelValue">
                                                NA
                                              </Typography>
                                            </Grid>

                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Performance rating</FormLabel>
                                              <Typography className="viewLabelValue">
                                                NA
                                              </Typography>
                                            </Grid>
                                            <Grid item md={12} sm={12} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Findings</FormLabel>
                                              <Typography className="viewLabelValue">
                                                NA
                                              </Typography>
                                            </Grid> 
                                            <Grid item md={12} xs={12}>
                                              <FormLabel component="legend" className="checkRadioLabel">Corrective Actions</FormLabel>
                                              <Table component={Paper}>
                                                <TableHead>
                                                  <TableRow>
                                                    <TableCell className="tableHeadCellFirst">Action number</TableCell>
                                                    <TableCell className="tableHeadCellSecond">Action title</TableCell>
                                                    <TableCell className="tableHeadCellFirst">Assignee</TableCell>
                                                    <TableCell className="tableHeadCellSecond">Status</TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                  <TableRow>
                                                    <TableCell align="left">
                                                      AT-211004-012
                                                    </TableCell>
                                                    <TableCell>
                                                      Action 1 
                                                    </TableCell>
                                                    <TableCell align="left">
                                                      Ajay Chauhan
                                                    </TableCell>
                                                    <TableCell>
                                                      Assigned
                                                    </TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                    <TableCell align="left">
                                                      AT-211004-012
                                                    </TableCell>
                                                    <TableCell>
                                                      Action 2
                                                    </TableCell>
                                                    <TableCell align="left">
                                                      Ajay Chauhan
                                                    </TableCell>
                                                    <TableCell>
                                                      Assigned
                                                    </TableCell>
                                                  </TableRow>
                                                </TableBody>
                                              </Table>
                                            </Grid>
                                            <Grid item md={12} sm={12} xs={12}>
                                              <FormLabel component="legend" className="checkRadioLabel">Attachments</FormLabel>
                                              <div className="attachFileThumb">
                                                <img src={projectpj} className="attachFileStyle" alt="attachment" />
                                                <div className="attachContent">
                                                  <p>construction.jpg</p>
                                                  <p>125kb</p>
                                                </div>
                                              </div>

                                              <div className="attachFileThumb">
                                                <img src={projectpj} className="attachFileStyle" alt="attachment" />
                                                <div className="attachContent">
                                                  <p>construction.jpg</p>
                                                  <p>125kb</p>
                                                </div>
                                              </div>
                                            </Grid>

                                          </Grid>
                                        </AccordionDetails>
                                      </Accordion>
                                    </Grid>

                                    <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    className="paddTBRemove"
                                  >
                                    <Accordion expanded={expandedTableDetail === 'panel10'} onChange={handleTDChange('panel10')} defaultExpanded className="backPaperAccordian">
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        className="accordionHeaderSection"
                                      >
                                        <List className={classes.heading}>
                                            <ListItem className={classes.accordingHeaderContentLeft}>
                                                <ListItemText primary="Welding machines used are tested and properly connected" />
                                            </ListItem>
                                        </List>  
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Criticality</FormLabel>
                                              <Typography className="viewLabelValue">
                                                NA
                                              </Typography>
                                            </Grid>
                                            
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Status</FormLabel>
                                              <Typography className="viewLabelValue">
                                                NA
                                              </Typography>
                                            </Grid>

                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Performance rating</FormLabel>
                                              <Typography className="viewLabelValue">
                                                NA
                                              </Typography>
                                            </Grid>
                                            <Grid item md={12} sm={12} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Findings</FormLabel>
                                              <Typography className="viewLabelValue">
                                                NA
                                              </Typography>
                                            </Grid> 
                                            <Grid item md={12} xs={12}>
                                              <FormLabel component="legend" className="checkRadioLabel">Corrective Actions</FormLabel>
                                              <Table component={Paper}>
                                                <TableHead>
                                                  <TableRow>
                                                    <TableCell className="tableHeadCellFirst">Action number</TableCell>
                                                    <TableCell className="tableHeadCellSecond">Action title</TableCell>
                                                    <TableCell className="tableHeadCellFirst">Assignee</TableCell>
                                                    <TableCell className="tableHeadCellSecond">Status</TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                  <TableRow>
                                                    <TableCell align="left">
                                                      AT-211004-012
                                                    </TableCell>
                                                    <TableCell>
                                                      Action 1 
                                                    </TableCell>
                                                    <TableCell align="left">
                                                      Ajay Chauhan
                                                    </TableCell>
                                                    <TableCell>
                                                      Assigned
                                                    </TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                    <TableCell align="left">
                                                      AT-211004-012
                                                    </TableCell>
                                                    <TableCell>
                                                      Action 2
                                                    </TableCell>
                                                    <TableCell align="left">
                                                      Ajay Chauhan
                                                    </TableCell>
                                                    <TableCell>
                                                      Assigned
                                                    </TableCell>
                                                  </TableRow>
                                                </TableBody>
                                              </Table>
                                            </Grid>
                                            <Grid item md={12} sm={12} xs={12}>
                                              <FormLabel component="legend" className="checkRadioLabel">Attachments</FormLabel>
                                              <div className="attachFileThumb">
                                                <img src={projectpj} className="attachFileStyle" alt="attachment" />
                                                <div className="attachContent">
                                                  <p>construction.jpg</p>
                                                  <p>125kb</p>
                                                </div>
                                              </div>

                                              <div className="attachFileThumb">
                                                <img src={projectpj} className="attachFileStyle" alt="attachment" />
                                                <div className="attachContent">
                                                  <p>construction.jpg</p>
                                                  <p>125kb</p>
                                                </div>
                                              </div>
                                            </Grid>

                                          </Grid>
                                        </AccordionDetails>
                                      </Accordion>
                                    </Grid>

                                </Grid>
                              </Paper>
                            </Grid>

                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="32" viewBox="0 0 33.2 39">
                                  <g id="Group_5726" data-name="Group 5726" transform="translate(-1540 -746)">
                                    <g id="Group_5725" data-name="Group 5725" transform="translate(427.999)">
                                      <path id="personal-information-5" d="M184.6,100.531h16.977a1.124,1.124,0,1,0,0-2.248H184.6a1.124,1.124,0,0,0,0,2.248Zm23.964-32.483H177.615a1.124,1.124,0,0,0-1.124,1.124v36.752a1.124,1.124,0,0,0,1.124,1.124h30.951a1.124,1.124,0,0,0,1.124-1.124V69.172A1.124,1.124,0,0,0,208.566,68.048ZM207.442,104.8h-28.7V70.3h28.7ZM184.6,95.386h16.977a1.124,1.124,0,0,0,0-2.248H184.6a1.124,1.124,0,1,0,0,2.248Z" transform="translate(935.51 677.952)" fill="#06425c"/>
                                    </g>
                                    <path id="statement-2" d="M186.341,173.22l-6.774-3.683a1.53,1.53,0,0,0-1.467,0l-6.776,3.685a1.6,1.6,0,0,0-.83,1.413v7.143a1.606,1.606,0,0,0,.83,1.413l6.775,3.682a1.531,1.531,0,0,0,1.467,0l6.775-3.684a1.607,1.607,0,0,0,.83-1.414v-7.143A1.6,1.6,0,0,0,186.341,173.22Zm-5.424,3.434a.521.521,0,0,1,.521-.521h1.042a.521.521,0,0,1,.521.521v4.159a.522.522,0,0,1-.521.521h-1.042a.522.522,0,0,1-.521-.521Zm-3.127-2.1a.521.521,0,0,1,.521-.521h1.042a.521.521,0,0,1,.521.521v6.256a.522.522,0,0,1-.521.521h-1.042a.522.522,0,0,1-.521-.521Zm-3.127,3.657a.521.521,0,0,1,.521-.521h1.042a.521.521,0,0,1,.521.521v2.6a.522.522,0,0,1-.521.521h-1.042a.522.522,0,0,1-.521-.521Zm9.131,4.16h-9.9a.261.261,0,0,1,0-.521h9.9a.261.261,0,1,1,0,.521Z" transform="translate(1377.505 581.403)" fill="#06425c"/>
                                  </g>
                                </svg> Performance summary
                              </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}> 
                                    <FormLabel component="legend" className="viewLabel">Describe here</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {complianceData["performanceSummary"] !== null ? complianceData["performanceSummary"] : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <FormLabel component="legend" className="viewLabel">Notifications sent to</FormLabel>
                                    {notificationSentValue.length > 0 ? notificationSentValue.map((value) => (
                                    <Typography display="block" className="viewLabelValue">{value.roleName}</Typography>)) : "-"}
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>














                            {/* <Grid item xs={12}>
                              <Accordion
                                expanded={expanded === "panel4"}
                                onChange={handleExpand("panel4")}
                              >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                  <Typography className={classes.heading}>
                                    Performance summary
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Grid container item xs={12} spacing={3}>
                                    <>
                                      <Grid item xs={12} md={6}> 
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Describe here
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          NA
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Notifications sent to
                                        </Typography>
                                        <Typography variant="body" display="block" className={Fonts.labelValue}>Role 1</Typography>
                                        <Typography variant="body" display="block" className={Fonts.labelValue}>Role 2</Typography>
                                      </Grid>
                                    </>
                                  </Grid>
                                </AccordionDetails>
                              </Accordion>
                            </Grid> */}
                          </>
                        );
                    }
                    
                  })()}
                </>

              </Grid> 
            </Grid> 
          </Grid>
          
          <Grid item md={3} xs={12}>
            <div className="quickActionSection">
              <Typography variant="h5" className="rightSectiondetail">
                Quick Actions
              </Typography>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button >
                  <ListItemIcon>
                    {complianceData.performanceSummary !== null ? <Edit /> : <Add />}
                  </ListItemIcon>
                  <Link
                    onClick={(e) => handleNewComplianceUpdatePush(e)}
                    to="#"
                    variant="subtitle"
                  >
                    <ListItemText primary={complianceData.performanceSummary !== null ? "Update compliance" : "Add compliance"} />
                  </Link>
                </ListItem>

                <ListItem button >
                  <ListItemIcon>
                    <Comment />
                  </ListItemIcon>
                  <Link
                    onClick={(e) => handleComplianceCommentPush(e)}
                    to="#"
                    variant="subtitle"
                  >
                    <ListItemText primary="Comments" />
                  </Link>
                </ListItem>

                <ListItem button >
                  <ListItemIcon>
                    <History />
                  </ListItemIcon>
                  <Link
                    onClick={(e) => handleComplianceActivityPush(e)}
                    to="#"
                    variant="subtitle"
                  >
                    <ListItemText primary="Activity history" />
                  </Link>
                </ListItem>

                <ListItem button >
                  <ListItemIcon>
                    <Print />
                  </ListItemIcon>
                  <Link
                    to="#"
                    variant="subtitle"
                  >
                    <ListItemText primary="Print" />
                  </Link>
                </ListItem>
              </List> 
                
                {/* </List>
                <Divider />
                <List dense>
                <ListItem button onClick={(e) => handleCommentsPush(e)}>
                  <ListItemIcon>
                    <Comment />
                  </ListItemIcon>
                  <ListItemText primary="Comments" />
                </ListItem>

                <ListItem button onClick={(e) => handleActivityPush(e)}>
                  <ListItemIcon>
                    <History />
                  </ListItemIcon>
                  <ListItemText primary="Activity History" />
                </ListItem>
              </List>
              <Divider />
              <List dense>
                <ListItem button>
                  <ListItemIcon>
                    <Print />
                  </ListItemIcon>
                  <ListItemText primary="Print" />
                </ListItem>
              </List> */}
            </div>
          </Grid>
        </Grid></>:<Loader/>}
      </CustomPapperBlock>
  );
}

export default ComplianceSummary;
