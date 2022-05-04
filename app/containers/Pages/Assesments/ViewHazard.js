import React, { useState, useEffect, useRef } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import moment from 'moment';

import Attachment from '../../../containers/Attachment/Attachment';
import classNames from 'classnames';
import { HEADER_AUTH, SSO_URL } from '../../../utils/constants';
import api from '../../../utils/axios';
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '.5rem 0',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
    '& .MuiOutlinedInput': {
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.2rem 0',
    boxShadow: 'inset 0px 0px 9px #dedede',
    '& td textHeight': {
      padding: '2.5px 5px',
      borderRadius: '8px',
    },
  },
  spacer: {
    padding: '5px 0',
    '& .MuiFormControl-fullWidth': {
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
  },
  spacerRight: {
    marginRight: '.75rem',
  },
  mToptewnty: {
    marginTop: '.50rem',
  },
  addButton: {
    '& .MuiButton-root': {
      marginTop: '9px',
      backgroundColor: '#ffffff',
      color: '#06425c',
      border: '1px solid #06425c',
      borderRadius: '4px',
      padding: '11px 12px',
    },
  },
  jobTitle: {
    '& .MuiDialogTitle-root': {
      marginBottom: '5px !important',
    },
  },
  ptopTwenty: {
    '& span': {
      paddingTop: '15px',
    }
  },
  radioInline: {
    flexDirection: 'row',
  },
  mrTen: {
    marginRight: '15px',
    width: '98%',
    boxShadow: 'inset 0px 0px 9px #dedede',
    '& .MuiFormControl-fullWidth': {
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
  },
  borderCategory: {
    borderLeft: '2px solid #06425c',
  },
  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '6px 10px',
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
  popUpButton: {
    paddingRight: '5px',
    marginLeft: '16px',
    '& .MuiDialogActions-root, img': {
      justifyContent: 'flex-start',
    },
  },

  spacerRight: {
    marginRight: '.75rem',
  },
  mToptewnty: {
    marginTop: '.75rem',
  },
  radioInline: {
    flexDirection: 'row',
  },
  tableRowColor: {
    backgroundColor: '#ffffff',
  },
  mttopThirty: {
    paddingTop: '30px',
  },
  mttoptenn: {
    marginTop: '10px',
  },
  mttopEight: {
    marginTop: '8px',
    marginLeft: '10px',
  },
  ratioColorgreen: {
    backgroundColor: 'green',
    padding: '16px!important',
    height: '70%',
    marginTop: '12px',
    borderRadius: '5px',
    color: '#ffffff'
  },
  ratioColorred: {
    backgroundColor: 'red',
    padding: '16px!important',
    height: '70%',
    marginTop: '12px',
    borderRadius: '5px',
    color: '#ffffff'
  },
  ratioColororange: {
    backgroundColor: 'orange',
    padding: '16px!important',
    height: '70%',
    marginTop: '12px',
    borderRadius: '5px',
    color: '#ffffff'
  },
  mttopBottomThirty: {
    marginTop: '30px',
    marginBottom: '30px',
  },
  mttopTen: {
    paddingTop: '10px',
  },
  mttopSix: {
    paddingTop: '6px',
  },
  curserPointer: {
    cursor: 'Pointer',
    textDecoration: 'underline',
  },
  paddZero: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  tableHeading: {
    '& tr th': {
      backgroundColor: '#06425c',
      color: '#ffffff',
      // lineHeight: '0.5rem',
    },
  },
  headerBackground: {
    backgroundColor: '#ffffff',
    color: '#06425c',
  },
  pTopandRight: {
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '13px',
  },
  mbThirty: {
    marginBottom: '30px',
  },
  formControlTwo: {
    width: '100%',
  },
  inputTab: {
    display: 'none',
  },
  widthSelect: {
    minWidth: '170px',
    height: '58px',
    borderRadius: '4px',
  },
  divider: {
    margin: '15px 15px',
    width: '97.4%',
    boxShadow: '1px 2px 10px #d4d4d4',
  },
  table: {
    minWidth: 700,
  },
  plTen: {
    paddingLeft: '3px;',
    height: '18px;',
  },
  plFive: {
    paddingLeft: '5px;',
    height: '22px;',
  },
  createHazardbox: {
    margin: '0px 0px 10px 0px',
  },
  createHazardboxRight: {
    paddingLeft: '5px',
    float: 'right',
    margin: '0px 16px 20px 20px',
  },
  mLeft: {
    marginLeft: '10px',
  },
  mRight: {
    minHeight: '30px',
    height: '30px',
    width: '30px',
  },
  labelColor: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '14px;',
    fontFamily: 'Open Sans,sans-serif',
    fontWeight: '400;',
  },
  mToptewntySixteen: {
    marginTop: '16px',
  },
  heightDate: {
    '& .MuiInput-root': {
      height: '54px',
      boxShadow: 'inset 0px 0px 9px #dedede',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '95.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  backPaper: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 10px 1px #e0e0e0 !important',
    marginBottom: '20px',
  },
  childBackPaper: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 10px 1px #e0e0e0 !important',
    marginBottom: '10px',
  },
  headingColor: {
    backgroundColor: '#f9f9f9',
    color: '#06425c',
    borderRadius: '6px 6px 0px 0px',
  },
  cellHeight: {
    '& td': {
      padding: '0px 6px',
    },
  },
  headingIcon: {
    width: '35px',
    border: '1px solid rgb(229, 233, 235)',
    height: '35px',
    background: 'rgb(131, 166, 181)',
    boxShadow: '0 2px 15px -5px #06425c',
    textAlign: 'center',
    lineHeight: '44px',
    marginRight: '12px',
    borderRadius: '8px',
    verticalAlign: 'middle',
    padding: '3px',
    color: '#ffffff',
  },
  attachImg: {
    minWidth: '50px',
    height: '40px',
    borderRadius: '4px',
    float: 'right',
    marginTop: '2px',
    marginRight: '20%',
  },
  question: {
    marginTop: '12px'
  }
}));

const FlhaDetails = (props) => {
  const classes = useStyles();
  const [flha, setFlha] = useState({});
  const [notify, setNotify] = useState('');

  const [open, setOpen] = useState(false);
  const handleRiskChange = (rating) => {
    console.log(rating, 'rating')
    let colorRating = ''
    if (rating === "1 Trivial" || rating === "2 Trivial" || rating === "3 Trivial" || rating === "4 Trivial") {
      colorRating = '#009933'
    } else if (rating === "5 Tolerable" || rating === "6 Tolerable" || rating === "7 Tolerable" || rating === "8 Tolerable") {
      colorRating = '#8da225'

    } else if (rating === "9 Moderate" || rating === "10 Moderate" || rating === "11 Moderate" || rating === "12 Moderate" ||
      rating === "13 Moderate" || rating === "14 Moderate" || rating === "15 Moderate" || rating === "16 Moderate") {
      colorRating = '#FFBF00'

    } else if (rating === "17 Substantial" || rating === "18 Substantial" || rating === "19 Substantial" || rating === "20 Substantial"
      || rating === "21 Substantial" || rating === "22 Substantial" || rating === "23 Substantial" || rating === "24 Substantial") {
      colorRating = '#990000'
    }
    else {
      colorRating = '#FFBF00'
    }
    return colorRating
  };
  const descriptionElementRef = useRef(null);
  const [expanded, setExpanded] = useState('panel');
  const handleTwoChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [expanded1, setExpanded1] = useState(false);
  const handleOneChange = (panell) => (event, isExpanded1) => {
    setExpanded1(isExpanded1 ? panell : false);
  };

  const [notificationSentValue, setNotificationSentValue] = useState([])

  const fetchNotificationSent = async (notifyTo) => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
    let struct = "";
    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    try {
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/flha/?subentity=flha&roleType=custom&projectStructure=${fkProjectStructureIds}`,
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
    if (props.notifyToValues != undefined) {
      setNotify(props.notifyToValues[props.flha.notifyTo])
    }
    fetchNotificationSent(props.flha.notifyTo)
    setFlha(props.flha)
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.criticalTasks, props.visualConfirmations, props.flha, props.notifyToValues]);
  return (

    <div>

      <Grid container spacing={1}>
        <Grid item sm={12} xs={12}>
          <Box padding={0}>
            <Grid container spacing={3}>
              {/* <Divider className={classes.divider} /> */}
              <Grid item xs={12}>
                <Box padding={0}>
                  <Grid item sm={12} xs={12}>
                    <Typography variant="h6" className="sectionHeading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <g id="Group_5329" data-name="Group 5329" transform="translate(-327 -742)">
                          <g id="Group_4995" data-name="Group 4995" transform="translate(327 742)">
                            <g id="outline-assignment-24px">
                              <g id="Bounding_Boxes">
                                <path id="Path_2274" data-name="Path 2274" d="M0,0H40V40H0Z" fill="none" />
                              </g>
                              <path id="services_1_" data-name="services (1)" d="M.824,15.012H5.662a.827.827,0,0,1,.824.824v9.889a.827.827,0,0,1-.824.824H.824A.827.827,0,0,1,0,25.725V15.836a.827.827,0,0,1,.824-.824Zm6.731,10.57V15.951H12.7a16.278,16.278,0,0,1,5.516,2.486h3.371c1.523.09,2.323,1.638.843,2.658-1.183.867-2.741.816-4.338.675a.725.725,0,1,0,0,1.43c.4.032.832-.061,1.212-.064,1.994,0,3.637-.383,4.641-1.957l.513-1.2L29.468,17.5c2.509-.824,4.291,1.8,2.443,3.623a65.661,65.661,0,0,1-11.165,6.569,7.558,7.558,0,0,1-8.3,0L7.558,25.582ZM16.482,2.034a.306.306,0,0,0-.1-.056.191.191,0,0,0-.085,0,.3.3,0,0,0-.194.1l-.673.8a.407.407,0,0,1-.505.1c-.09-.048-.186-.093-.282-.133s-.21-.082-.311-.117-.2-.064-.324-.1-.221-.061-.324-.085a.409.409,0,0,1-.308-.383l-.1-1.1a.343.343,0,0,0-.032-.112.324.324,0,0,0-.061-.077A.191.191,0,0,0,13.092.83a.245.245,0,0,0-.109,0L11.572.968A.377.377,0,0,0,11.463,1a.311.311,0,0,0-.09.074.287.287,0,0,0-.048.088h0a.237.237,0,0,0,0,.088l.1,1.034a.409.409,0,0,1-.3.433c-.085.029-.181.064-.29.109s-.2.09-.287.136h-.016c-.09.048-.186.1-.266.152H10.24c-.09.053-.178.109-.266.165a.412.412,0,0,1-.484-.021l-.92-.712a.34.34,0,0,0-.093-.053.183.183,0,0,0-.08,0,.348.348,0,0,0-.109.035H8.273a.356.356,0,0,0-.066.061L7.316,3.669a.346.346,0,0,0-.061.109.231.231,0,0,0,0,.085v.019a.239.239,0,0,0,.027.09v.013a.308.308,0,0,0,.064.069l.8.673a.4.4,0,0,1,.1.508q-.072.13-.13.266a3.288,3.288,0,0,0-.117.311c-.032.1-.066.2-.1.324s-.061.223-.085.324a.407.407,0,0,1-.364.33l-1.1.1a.327.327,0,0,0-.109.032.3.3,0,0,0-.08.064.239.239,0,0,0-.045.085.266.266,0,0,0,0,.106L6.25,8.59a.324.324,0,0,0,.032.112.3.3,0,0,0,.072.09.359.359,0,0,0,.088.048.29.29,0,0,0,.1,0l1.034-.1a.407.407,0,0,1,.417.3c.029.085.066.183.112.29s.088.2.136.29l.019.037c.043.082.09.173.144.266l.178.292a.412.412,0,0,1-.027.479l-.736.906a.4.4,0,0,0-.048.085.239.239,0,0,0,0,.077.308.308,0,0,0,.032.112.266.266,0,0,0,.069.082c.367.306.744.606,1.109.914a.279.279,0,0,0,.08.04.25.25,0,0,0,.1,0h0a.377.377,0,0,0,.117-.032h.013a.656.656,0,0,0,.072-.056l.665-.8a.407.407,0,0,1,.508-.1,3.05,3.05,0,0,0,.282.133c.1.045.207.082.311.117s.2.066.324.1.221.061.324.085a.407.407,0,0,1,.316.383l.1,1.082a.292.292,0,0,0,.035.109.247.247,0,0,0,.061.08.3.3,0,0,0,.085.045.29.29,0,0,0,.109,0l1.409-.138A.34.34,0,0,0,14,13.888h0a.33.33,0,0,0,.085-.064.34.34,0,0,0,.056-.1.191.191,0,0,0,0-.1l-.1-1.037a.407.407,0,0,1,.266-.425c.1-.035.207-.074.308-.117h.032c.085-.037.17-.08.266-.128h.016c.1-.051.2-.1.287-.157l.3-.178a.4.4,0,0,1,.476.029l.9.734a.359.359,0,0,0,.088.048h0a.183.183,0,0,0,.085,0,.266.266,0,0,0,.109-.029.324.324,0,0,0,.08-.072c.306-.367.606-.744.914-1.109a.237.237,0,0,0,.04-.077.306.306,0,0,0,0-.1h0a.4.4,0,0,0-.032-.117.322.322,0,0,0-.066-.085l-.8-.649a.4.4,0,0,1-.1-.51,3.049,3.049,0,0,0,.133-.282c.045-.109.085-.213.117-.308s.064-.207.1-.327.061-.218.085-.324a.407.407,0,0,1,.391-.316l1.106-.117a.343.343,0,0,0,.112-.032.409.409,0,0,0,.077-.061.3.3,0,0,0,.045-.085h0a.3.3,0,0,0,0-.1l-.138-1.409a.348.348,0,0,0-.032-.109V6.163a.335.335,0,0,0-.066-.074.287.287,0,0,0-.088-.048h0a.237.237,0,0,0-.088,0l-1.045.074a.412.412,0,0,1-.425-.266c-.035-.1-.072-.2-.12-.308s-.093-.218-.138-.306V5.216a2.993,2.993,0,0,0-.149-.266c-.053-.09-.114-.181-.175-.266a.409.409,0,0,1,.024-.492l.728-.9a.306.306,0,0,0,.053-.093.178.178,0,0,0,0-.077.367.367,0,0,0-.035-.112V2.991a.311.311,0,0,0-.056-.064l-1-.819A.388.388,0,0,1,16.482,2.034Zm11,6.54a.409.409,0,0,0-.306-.1.431.431,0,0,0-.282.152l-.407.492a2.842,2.842,0,0,0-.4-.17c-.144-.045-.266-.085-.42-.12L25.6,8.146a.417.417,0,0,0-.146-.282.385.385,0,0,0-.3-.088l-.867.085A.428.428,0,0,0,24.021,8a.4.4,0,0,0-.1.306l.058.63a2.491,2.491,0,0,0-.407.173,3.03,3.03,0,0,0-.372.218l-.548-.441a.377.377,0,0,0-.3-.1.425.425,0,0,0-.282.154l-.532.662a.412.412,0,0,0,.056.587l.463.407a2.552,2.552,0,0,0-.167.4,4.056,4.056,0,0,0-.122.42l-.686.064a.425.425,0,0,0-.282.146.388.388,0,0,0-.072.306l.085.864a.42.42,0,0,0,.146.279.391.391,0,0,0,.3.1l.63-.058a2.6,2.6,0,0,0,.165.4,4.176,4.176,0,0,0,.218.383l-.441.532a.375.375,0,0,0-.1.3A.42.42,0,0,0,21.9,15l.673.577a.4.4,0,0,0,.306.088.447.447,0,0,0,.287-.144l.409-.5a2.459,2.459,0,0,0,.4.17,3.958,3.958,0,0,0,.42.12l.064.689a.428.428,0,0,0,.146.279.4.4,0,0,0,.306.09l.864-.085a.431.431,0,0,0,.279-.146.4.4,0,0,0,.1-.306l-.061-.63a2.31,2.31,0,0,0,.407-.173,3.86,3.86,0,0,0,.38-.215l.532.441a.4.4,0,0,0,.306.1.409.409,0,0,0,.282-.152l.553-.67a.407.407,0,0,0,.09-.306.436.436,0,0,0-.146-.287l-.5-.4a2.366,2.366,0,0,0,.189-.4,4.1,4.1,0,0,0,.12-.417l.689-.064a.417.417,0,0,0,.266-.146.393.393,0,0,0,.09-.306l-.085-.864a.431.431,0,0,0-.146-.266.4.4,0,0,0-.306-.1l-.63.061A2.958,2.958,0,0,0,28,10.626a2.318,2.318,0,0,0-.218-.372l.444-.548a.388.388,0,0,0,.1-.3.431.431,0,0,0-.152-.282l-.665-.545h-.021Zm-2.626,1.816a1.789,1.789,0,0,1,.67.066,1.749,1.749,0,0,1,.572.308,1.691,1.691,0,0,1,.412.5,1.6,1.6,0,0,1,.191.641,1.784,1.784,0,0,1-.066.67A1.634,1.634,0,0,1,25.2,13.752a1.731,1.731,0,0,1-.67-.066,1.757,1.757,0,0,1-.574-.306,1.736,1.736,0,0,1-.409-.505,1.574,1.574,0,0,1-.2-.646,1.669,1.669,0,0,1,.877-1.653,1.574,1.574,0,0,1,.641-.191ZM16.631,1.2a1.233,1.233,0,0,1,.266.12.393.393,0,0,1,.16.08l1.071.891a1.114,1.114,0,0,1,.25.29l.021.035a1.124,1.124,0,0,1,.128.4.989.989,0,0,1-.045.441,1.114,1.114,0,0,1-.189.343l-.548.681.035.056a3.586,3.586,0,0,1,.189.362q.1.186.16.343l.021.053.718-.069a1.023,1.023,0,0,1,.415.037H19.3a1.114,1.114,0,0,1,.34.183l.037.032a1.111,1.111,0,0,1,.237.292l.021.035a1.116,1.116,0,0,1,.114.385c0,.356.09,1.047.138,1.42a1.063,1.063,0,0,1-.029.4v.024a1.063,1.063,0,0,1-.2.375h0a1.079,1.079,0,0,1-.316.266,1.175,1.175,0,0,1-.4.122l-.845.074-.021.077c-.029.106-.066.226-.114.362s-.088.266-.133.364l-.021.045.582.471a1.1,1.1,0,0,1,.266.343,1.138,1.138,0,0,1,.085.367v.013a1.045,1.045,0,0,1-.035.425,1.1,1.1,0,0,1-.178.359L17.9,12.819a1.063,1.063,0,0,1-.322.266,1.042,1.042,0,0,1-.407.128,1.082,1.082,0,0,1-.423-.035h-.021A1.14,1.14,0,0,1,16.391,13l-.689-.561-.069.04c-.117.069-.231.13-.34.183s-.2.1-.311.149l-.1.032.074.718a1.039,1.039,0,0,1-.045.439,1.132,1.132,0,0,1-.2.359l-.016.016a1.167,1.167,0,0,1-.3.242h-.027a1.138,1.138,0,0,1-.383.114c-.356,0-1.047.093-1.42.141a1.124,1.124,0,0,1-.425-.035,1.063,1.063,0,0,1-.375-.2h-.013a1.164,1.164,0,0,1-.253-.319,1.1,1.1,0,0,1-.122-.4l-.077-.843-.074-.021-.362-.114A3.31,3.31,0,0,1,10.5,12.8l-.051-.021-.479.582a1.063,1.063,0,0,1-.311.242l-.029.019a1.223,1.223,0,0,1-.37.106H9.251a1.063,1.063,0,0,1-.428-.035,1.117,1.117,0,0,1-.354-.181L7.345,12.58a1.1,1.1,0,0,1-.266-.322,1.109,1.109,0,0,1-.128-.4A.957.957,0,0,1,7,11.431a1.063,1.063,0,0,1,.181-.338l.561-.689-.029-.066c-.058-.1-.114-.2-.17-.316h0c-.066-.122-.122-.239-.173-.359L7.342,9.6l-.712.066a1.029,1.029,0,0,1-.436-.043,1.063,1.063,0,0,1-.34-.186l-.04-.029a1.159,1.159,0,0,1-.266-.332A1.119,1.119,0,0,1,5.434,8.7c0-.359-.093-1.039-.141-1.417a1.09,1.09,0,0,1,.024-.439,1.063,1.063,0,0,1,.2-.375h0A1.175,1.175,0,0,1,5.838,6.2a1.1,1.1,0,0,1,.4-.12L7.084,6l.021-.077c.032-.1.069-.226.114-.359s.09-.266.136-.367l.021-.051-.545-.463a1.122,1.122,0,0,1-.266-.3L6.55,4.366a1.042,1.042,0,0,1-.112-.377V3.967a1.063,1.063,0,0,1,.043-.428,1.111,1.111,0,0,1,.207-.375l.891-1.087a1.042,1.042,0,0,1,.292-.247L7.9,1.808a1.063,1.063,0,0,1,.4-.128.954.954,0,0,1,.433.045,1.138,1.138,0,0,1,.343.189l.683.55.069-.053c.109-.064.221-.122.332-.178s.234-.117.343-.165l.064-.024L10.5,1.33A1.023,1.023,0,0,1,10.54.915V.894a1.114,1.114,0,0,1,.183-.34l.04-.021a1.138,1.138,0,0,1,.327-.266,1.1,1.1,0,0,1,.385-.12c.356,0,1.047-.09,1.42-.138a1.051,1.051,0,0,1,.8.234h0a1.154,1.154,0,0,1,.266.316,1.175,1.175,0,0,1,.128.415l.074.845.077.021c.1.029.226.066.362.112l.364.136.053.024.46-.556A1.085,1.085,0,0,1,15.8,1.29a1.1,1.1,0,0,1,.412-.133,1,1,0,0,1,.428.04ZM12.417,4.283a3.647,3.647,0,0,1,.614,0,3.238,3.238,0,0,1,.627.125h0a3.28,3.28,0,0,1,.564.237l.024.013a3.347,3.347,0,0,1,.479.322h0a3.318,3.318,0,0,1,.768.944,2.81,2.81,0,0,1,.245.582,2.906,2.906,0,0,1,.117.627h0a3.363,3.363,0,0,1,0,.611,2.977,2.977,0,0,1-.122.627V8.4a3.256,3.256,0,0,1-.229.532,3.522,3.522,0,0,1-.332.505l-.027.029a3.243,3.243,0,0,1-.922.747,3.054,3.054,0,0,1-.585.245,3.28,3.28,0,0,1-.625.117,3.775,3.775,0,0,1-.625,0,3.19,3.19,0,0,1-.627-.125h0a3.344,3.344,0,0,1-.561-.237,3.615,3.615,0,0,1-.505-.335h0a3.256,3.256,0,0,1-.425-.431,3.512,3.512,0,0,1-.346-.51,3.017,3.017,0,0,1-.242-.585,2.906,2.906,0,0,1-.117-.627h0a3.363,3.363,0,0,1,0-.611,2.977,2.977,0,0,1,.122-.627h0a3.19,3.19,0,0,1,.237-.564L9.937,5.9a3.1,3.1,0,0,1,.322-.481l.021-.027a3,3,0,0,1,.415-.407,3.5,3.5,0,0,1,.51-.343,3,3,0,0,1,.582-.245,3.347,3.347,0,0,1,.627-.117Zm.532.816a2.557,2.557,0,0,0-.473,0h0a2.345,2.345,0,0,0-.46.085,2.18,2.18,0,0,0-.423.175,2.775,2.775,0,0,0-.391.266,2.472,2.472,0,0,0-.3.292h0a2.478,2.478,0,0,0-.239.359V6.3a2.515,2.515,0,0,0-.175.423,2.353,2.353,0,0,0-.117.473,2.81,2.81,0,0,0,0,.473h0a2.222,2.222,0,0,0,.088.463,2.087,2.087,0,0,0,.178.431,2.536,2.536,0,0,0,.266.388,2.228,2.228,0,0,0,.314.319,2.539,2.539,0,0,0,.375.247,2.688,2.688,0,0,0,.425.178,2.127,2.127,0,0,0,.46.09,2.643,2.643,0,0,0,.481,0,2.408,2.408,0,0,0,.463-.085,2.127,2.127,0,0,0,.407-.175,2.563,2.563,0,0,0,.391-.266,2.472,2.472,0,0,0,.3-.3h0a2.523,2.523,0,0,0,.266-.383,2.887,2.887,0,0,0,.173-.4V8.156a2.393,2.393,0,0,0,.093-.463,2.81,2.81,0,0,0,0-.473h0a2.222,2.222,0,0,0-.088-.463,2.153,2.153,0,0,0-.175-.423,2.414,2.414,0,0,0-.266-.388,2.228,2.228,0,0,0-.314-.319,2.563,2.563,0,0,0-.354-.237h-.021a2.658,2.658,0,0,0-.425-.178,2.143,2.143,0,0,0-.457-.09ZM4.32,22.822a.946.946,0,1,1-.944.946.946.946,0,0,1,.944-.946Z" transform="translate(3.727 5.592)" fill="#06425c" />
                            </g>
                          </g>
                        </g>
                      </svg> Preventive controls
                    </Typography>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} className="sectionSubHeading paddBRemove">
                    <div className="subsectiontitle">
                      <Typography variant="h6" className="sectionHeading">
                        <svg id="Group_5073" data-name="Group 5073" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                          <g id="outline-assignment-24px">
                            <g id="Bounding_Boxes">
                              <path id="Path_2274" data-name="Path 2274" d="M0,0H40V40H0Z" fill="none" />
                            </g>
                            <g id="project-manager" transform="translate(2 5.872)">
                              <path id="Path_5094" data-name="Path 5094" d="M14.777,24.319a3.2,3.2,0,0,0,6.1,0c1.1.993,4.365,1.189,5.578,1.869a3.2,3.2,0,0,1,1.011.855,5.18,5.18,0,0,1,.627,1.213H7.562a5.18,5.18,0,0,1,.627-1.213A3.166,3.166,0,0,1,9.2,26.188c1.213-.68,4.474-.879,5.578-1.869Zm15.334-10.8H27.788a1.259,1.259,0,0,0-.914.375,1.243,1.243,0,0,0-.375.914v2.265a1.28,1.28,0,0,0,1.289,1.289h1a5.053,5.053,0,0,1-.278.809,2.169,2.169,0,0,1-.565.735,4.561,4.561,0,0,0,1.348-.586,4,4,0,0,0,1.017-.958h.855a1.266,1.266,0,0,0,.914-.375,1.231,1.231,0,0,0,.375-.914V14.8a1.254,1.254,0,0,0-.375-.914,1.238,1.238,0,0,0-.914-.375H30.111ZM36,16.116v2.265a1.467,1.467,0,0,1-.442,1.066,1.5,1.5,0,0,1-.2.167,1.558,1.558,0,0,1-.22.132s-.009,0-.012.006a1.377,1.377,0,0,1-.3.1,1.576,1.576,0,0,1-.334.035h-.712c.015.044.029.091.047.138.041.126.094.249.146.375v0a1.629,1.629,0,0,0,.2.331,2.473,2.473,0,0,0,.311.331.21.21,0,0,1,.018.3.216.216,0,0,1-.211.067,5.336,5.336,0,0,1-.747-.258,4.4,4.4,0,0,1-.665-.36,4.121,4.121,0,0,1-.577-.457,4.635,4.635,0,0,1-.428-.466h-.747a1.661,1.661,0,0,1-.4-.05,1.463,1.463,0,0,1-.369-.158.211.211,0,0,1,.22-.36,1.044,1.044,0,0,0,.261.111,1.057,1.057,0,0,0,.293.038h.853a.211.211,0,0,1,.17.085,3.873,3.873,0,0,0,.967.905,4.121,4.121,0,0,0,.571.313c-.041-.067-.07-.132-.1-.2-.056-.132-.111-.267-.158-.407s-.088-.272-.126-.413a.217.217,0,0,1,.2-.287H34.5a1.1,1.1,0,0,0,.243-.026,1.157,1.157,0,0,0,.208-.07l.009-.006a1.025,1.025,0,0,0,.155-.091.981.981,0,0,0,.146-.126A1.085,1.085,0,0,0,35.5,18.8a1.063,1.063,0,0,0,.076-.416V16.122a1.119,1.119,0,0,0-.076-.416,1.04,1.04,0,0,0-.237-.349,1.085,1.085,0,0,0-.349-.237,1.063,1.063,0,0,0-.416-.076H33.439a.214.214,0,1,1,0-.428h1.055a1.5,1.5,0,0,1,.574.111,1.471,1.471,0,0,1,.486.328,1.412,1.412,0,0,1,.328.489,1.444,1.444,0,0,1,.111.574H36ZM4.386,11.856a.171.171,0,0,1-.056-.009.17.17,0,0,1-.17-.17v-.334H2.517v.334a.168.168,0,0,1-.152.167.189.189,0,0,1-.059.009H1.685v.691H4.928v-.691H4.38l.006,0Zm-2.859,4.16a.334.334,0,1,1-.334.334.33.33,0,0,1,.334-.334Zm-.387-.823a.15.15,0,1,1,.249-.167l.082.12.325-.4a.15.15,0,1,1,.231.19l-.448.548a.125.125,0,0,1-.035.032.151.151,0,0,1-.208-.041l-.2-.287Zm0-1.157a.15.15,0,0,1,.041-.208.148.148,0,0,1,.208.041l.082.12.325-.4a.15.15,0,0,1,.231.19l-.448.548a.2.2,0,0,1-.035.035.151.151,0,0,1-.208-.041l-.2-.29Zm3.48,5.13a.179.179,0,0,1-.114.044.081.081,0,0,1-.026,0H.375A.374.374,0,0,1,.108,19.1.367.367,0,0,1,0,18.832v-6.5a.369.369,0,0,1,.111-.267.376.376,0,0,1,.267-.111h.976v-.185a.239.239,0,0,1,.076-.179.257.257,0,0,1,.179-.076h.577v-.231a.27.27,0,0,1,.085-.2.279.279,0,0,1,.2-.082H4.228a.28.28,0,0,1,.278.278v.231h.521a.26.26,0,0,1,.255.255v.185h.976a.369.369,0,0,1,.267.111.382.382,0,0,1,.111.267v4.688a.169.169,0,0,1-.05.17L4.646,19.154a.051.051,0,0,1-.015.012Zm-.284-.3c0-2.244-.284-1.978,1.951-1.978V12.334a.032.032,0,0,0-.012-.026.037.037,0,0,0-.026-.012H5.273v.34a.248.248,0,0,1-.073.179.255.255,0,0,1-.179.073H1.6a.26.26,0,0,1-.179-.073c-.006-.006-.009-.012-.015-.018a.258.258,0,0,1-.059-.161V12.3H.372a.032.032,0,0,0-.026.012.044.044,0,0,0-.012.026v6.5a.029.029,0,0,0,.012.026.037.037,0,0,0,.026.012H4.336Zm-1.585-2.4a.172.172,0,0,1-.17-.17.17.17,0,0,1,.17-.17H4.362a.17.17,0,0,1,0,.34Zm0-2.423a.17.17,0,1,1,0-.34H5.232a.17.17,0,1,1,0,.34Zm0,1.213a.17.17,0,0,1-.17-.17.168.168,0,0,1,.17-.17H5.232a.168.168,0,0,1,.17.17.17.17,0,0,1-.17.17ZM20.766,1.219A4.159,4.159,0,1,0,21.984,4.16a4.147,4.147,0,0,0-1.219-2.941Zm-3.012.92h-.527a.021.021,0,0,0-.018.009.025.025,0,0,0-.009.018v2.76h2.581a.021.021,0,0,0,.018-.009.025.025,0,0,0,.009-.018V4.371a.021.021,0,0,0-.009-.018.025.025,0,0,0-.018-.009H17.93A.15.15,0,0,1,17.78,4.2V2.165a.022.022,0,0,0-.006-.015l0,0a.021.021,0,0,0-.018-.009ZM17.824.68A3.481,3.481,0,1,1,15.363,1.7,3.47,3.47,0,0,1,17.824.68ZM4.081,27.188a.684.684,0,1,1-1.248.56,16.011,16.011,0,0,1-1.374-5.464.686.686,0,0,1,1.368-.1,14.691,14.691,0,0,0,.41,2.558,14.486,14.486,0,0,0,.844,2.443Zm3.627-17.1a.685.685,0,0,1-.914-1.02A18.3,18.3,0,0,1,8.956,7.409,11.575,11.575,0,0,1,11.048,6.3a.684.684,0,0,1,.492,1.277,10.245,10.245,0,0,0-1.84.979A17.352,17.352,0,0,0,7.708,10.09ZM23.7,7.6a.684.684,0,1,1,.563-1.248,16.219,16.219,0,0,1,5.581,4.166.685.685,0,1,1-1.037.9,14.859,14.859,0,0,0-2.353-2.183A14.45,14.45,0,0,0,23.7,7.6Zm8.6,15.483a.684.684,0,0,1,1.356.179,16.026,16.026,0,0,1-.463,2.25,15.709,15.709,0,0,1-.776,2.156.687.687,0,0,1-1.257-.554,14.543,14.543,0,0,0,.712-1.975,13.929,13.929,0,0,0,.428-2.057ZM14.013,18.24a.932.932,0,0,0-.475.123.377.377,0,0,0-.138.158.562.562,0,0,0-.044.252,2.248,2.248,0,0,0,.448,1.093l.006.006h0l.943,1.5a7.9,7.9,0,0,0,1.269,1.664,2.581,2.581,0,0,0,1.808.727A2.656,2.656,0,0,0,19.743,23a8.4,8.4,0,0,0,1.3-1.778l1.061-1.749a1.7,1.7,0,0,0,.226-.932c-.026-.105-.144-.158-.343-.167-.041,0-.085,0-.129,0l-.149.009a.253.253,0,0,1-.082-.006,1.618,1.618,0,0,1-.29-.015L21.7,16.9c-2.7.425-4.717-1.579-7.57-.4l.205,1.746a1.478,1.478,0,0,1-.325-.009Zm8.338-.34a.683.683,0,0,1,.5.513,2.127,2.127,0,0,1-.258,1.289h0a.272.272,0,0,1-.015.029L21.5,21.5a8.723,8.723,0,0,1-1.4,1.893,3.162,3.162,0,0,1-2.276.9,3.11,3.11,0,0,1-2.168-.867A8.4,8.4,0,0,1,14.3,21.656l-.943-1.5a2.735,2.735,0,0,1-.536-1.371,1.079,1.079,0,0,1,.094-.492.916.916,0,0,1,.325-.378,1.047,1.047,0,0,1,.229-.117,20.941,20.941,0,0,1-.044-2.546,3.439,3.439,0,0,1,.117-.609,3.035,3.035,0,0,1,1.594-1.731,5.061,5.061,0,0,1,1.336-.595c.3-.085-.255-1.043.056-1.075,1.5-.152,3.92,1.213,4.966,2.344a2.858,2.858,0,0,1,.923,2.013l-.064,2.3Z" fill="#06425c" />
                            </g>
                          </g>
                        </svg> Critical tasks
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item sm={12} xs={12} className={classes.mttopBottomThirty}>
                    {/* <div> */}
                    {(props.criticalTasks !== undefined && props.criticalTasks.length > 0)
                      ? (props.criticalTasks.map((task, index) => (
                        <Accordion expanded={expanded === 'panel'} onChange={handleTwoChange('panel')} defaultExpanded className="backPaperAccordian">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            className="accordionHeaderSection"
                          >
                            <Typography className={classes.heading}>
                              {/* <MenuOpenOutlinedIcon className={classes.heading} /> */}
                              {' '}
                              Task# {index + 1}-
                              {' '}
                              {task.taskIdentification}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid item sm={12} xs={12}>
                              <FormLabel component="legend" className="viewLabel">Task Name</FormLabel>
                              <Typography>
                                {task.taskIdentification}
                              </Typography>
                            </Grid>
                            {(task.hazards.length > 0)
                              ? (task.hazards.map((hazard, key) => (
                                <Accordion expanded1={expanded1 === 'panell'} onChange={handleOneChange('panell')} defaultExpanded className="backPaperSubAccordian">
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                    className="accordionSubHeaderSection"
                                  >
                                    <Typography className={classes.heading}>
                                      Hazard#{(key) + 1} -
                                      {hazard.hazards}
                                    </Typography>

                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Grid container spacing={0}>
                                      <Grid item sm={11} xs={8}>
                                        <FormLabel component="legend" className="viewLabel">Hazards</FormLabel>
                                        <Typography>
                                          {hazard.hazards}
                                        </Typography>
                                      </Grid>
                                      <Grid item sm={1} xs={4}>
                                        {(hazard.hazardImage) ? <img src={hazard.hazardImage} alt="decoration" className={classes.mttopEight} height={56} /> : ''}
                                      </Grid>
                                      <Grid container spacing={2}>
                                        <Grid item sm={12} xs={12}>
                                          <FormLabel component="legend" className="viewLabel">Is this hazard present?</FormLabel>
                                          <Typography>
                                            {hazard.hazardStatus ? hazard.hazardStatus : "-"}
                                          </Typography>
                                        </Grid>
                                      </Grid>

                                      {hazard.hazardStatus === "Yes" || hazard.hazardStatus === "" || hazard.hazardStatus === undefined ? <>
                                        <Grid container spacing={2}>
                                          <Grid item sm={12} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Has this control been put in place?</FormLabel>
                                            <Typography>
                                              {hazard.controlStatus ? hazard.controlStatus : "-"}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                        <Grid item sm={11} xs={8}>
                                          <FormLabel component="legend" className="viewLabel">Control</FormLabel>
                                          <Typography>
                                            {hazard.control ? hazard.control : "-"}
                                          </Typography>
                                        </Grid>

                                        <Grid container spacing={1}>
                                          <Grid item md={4} sm={4} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Risk Severity</FormLabel>
                                            <Typography>
                                              {hazard.riskSeverity ? hazard.riskSeverity : '-'}
                                            </Typography>
                                          </Grid>
                                          <Grid item md={4} sm={4} xs={12}>
                                            <FormLabel component="legend" className="viewLabel">Risk Probability</FormLabel>
                                            <Typography>
                                              {hazard.riskProbability ? hazard.riskProbability : '-'}
                                            </Typography>
                                          </Grid>
                                          <Grid item md={4} sm={4} xs={12} >
                                            <div
                                              className={
                                                classes.ratioColororange
                                              }
                                              style={{ backgroundColor: handleRiskChange(hazard.riskRatingLevel) }}
                                            >
                                              {hazard.riskRatingLevel}
                                            </div>
                                          </Grid>
                                        </Grid>
                                      </> : null}
                                    </Grid>
                                  </AccordionDetails>
                                </Accordion>
                              ))) : ''}

                          </AccordionDetails>
                        </Accordion>

                      ))) : ''}
                    {/* </div> */}

                  </Grid>

                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                      <svg id="outline-assignment-24px" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <g id="Bounding_Boxes">
                          <path id="Path_2274" data-name="Path 2274" d="M0,0H40V40H0Z" fill="none" />
                        </g>
                        <path id="eye-scanning" d="M16.061,7.49a5.244,5.244,0,1,1-5.244,5.244A5.244,5.244,0,0,1,16.061,7.49ZM5.839,23.862a.8.8,0,1,1,0,1.606H1.026a.8.8,0,0,1-.8-.8v-4.74A.8.8,0,0,1,1.6,19.36l.018.021a.8.8,0,0,1,.23.546v3.936ZM5.839,0a.812.812,0,0,1,.569.235l.018.021a.8.8,0,0,1-.588,1.35h-4V5.542a.8.8,0,0,1-1.606,0V.8A.785.785,0,0,1,1.026,0ZM26.282,1.606a.8.8,0,1,1,0-1.606h4.811a.8.8,0,0,1,.8.8V5.542a.8.8,0,0,1-1.606,0V1.606Zm0,23.862a.8.8,0,1,1,0-1.606h4.009V19.926a.8.8,0,0,1,1.6,0v4.74a.8.8,0,0,1-.8.8ZM.276,12.076a24.718,24.718,0,0,1,2.39-2.515,19.572,19.572,0,0,1,12.773-5.32,20.461,20.461,0,0,1,13.5,5.038,28.335,28.335,0,0,1,2.935,2.8.93.93,0,0,1,.06,1.178,19.112,19.112,0,0,1-3.674,3.917,18.783,18.783,0,0,1-11.7,4.051A20.631,20.631,0,0,1,4.6,17.424,21.475,21.475,0,0,1,.216,13.285a.927.927,0,0,1,.06-1.209Zm3.641-1.144a22.577,22.577,0,0,0-1.75,1.781,19.519,19.519,0,0,0,3.5,3.194,18.8,18.8,0,0,0,10.888,3.471A16.944,16.944,0,0,0,27.1,15.722a17.174,17.174,0,0,0,2.873-2.938,26.2,26.2,0,0,0-2.215-2.076A18.7,18.7,0,0,0,15.463,6.093,17.66,17.66,0,0,0,3.9,10.932Zm12.157-.115a1.917,1.917,0,1,1-1.357.561,1.92,1.92,0,0,1,1.357-.561Z" transform="translate(3.979 8.401)" fill="#06425c" />
                      </svg> Job visual confirmation
                    </Typography>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                      <Table className={classes.table} aria-label="simple table">

                        <TableHead className={classes.tableHeading}>
                          <TableRow className={classes.cellHeight}>
                            <TableCell align="left" className={classes.tableRowColor}>Visual confirmation</TableCell>
                            <TableCell align="left" className={classes.tableRowColor}>Status</TableCell>
                            <TableCell align="center" className={classNames(classes.tableRowColor, classes.cellWidth)}>Attachments</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {(props.visualConfirmations.length > 0)
                            ? (props.visualConfirmations.map((visualConf) => (
                              <TableRow className={classes.cellHeight}>
                                <TableCell align="left">{visualConf.visualConfirmationType}</TableCell>
                                <TableCell className="attachFileStylethum" align="left">
                                  <div className="attachFileThumb">
                                    {visualConf.visualConfirmationStatus ? visualConf.visualConfirmationStatus : '-'}
                                  </div>
                                </TableCell>
                                <TableCell align="left">
                                  {visualConf.visualConfirmationAttachment ?
                                    <Typography >
                                      {visualConf.visualConfirmationAttachment ===
                                        null ? null : typeof visualConf.visualConfirmationAttachment ===
                                          "string" ? (
                                        <Attachment value={visualConf.visualConfirmationAttachment ? visualConf.visualConfirmationAttachment : '-'} />
                                      ) : null}
                                    </Typography>
                                    : '-'}
                                </TableCell>
                              </TableRow>
                            ))) : <TableRow className={classes.cellHeight}>No Data Available</TableRow>}
                        </TableBody>
                      </Table>

                      <Grid item md={4} sm={4} xs={12} className={classes.question}>
                        <FormLabel component="legend" className="viewLabel">Is permit to work done?*</FormLabel>
                        <Typography>
                          {flha.permitToWork}
                        </Typography>
                      </Grid>
                      <Grid item md={4} sm={4} xs={12} className={classes.question}>
                        <FormLabel component="legend" className="viewLabel">Enter permit number</FormLabel>
                        <Typography>
                          {flha.permitToWorkNumber == undefined || flha.permitToWorkNumber == 'undefined' || flha.permitToWorkNumber == '' ? '-' : flha.permitToWorkNumber}
                        </Typography>
                      </Grid>
                      <Grid item md={4} sm={4} xs={12} className={classes.question}>
                        <FormLabel component="legend" className="viewLabel">Permit job reference</FormLabel>
                        <Typography>
                          {flha.referenceNumber == undefined || flha.referenceNumber == 'undefined' || flha.referenceNumber == '' ? '-' : flha.referenceNumber}

                        </Typography>
                      </Grid>
                      <Grid item xs={12} className={classes.question}>
                        <FormLabel className="viewLabel" component="legend">Date</FormLabel>
                        <Typography >
                          {moment(flha.dateTimeFlha).format(
                            'Do MMM YYYY'
                          )}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} className={classes.question}>
                        <FormLabel className="viewLabel" component="legend">Attachment</FormLabel>
                        {flha.attachment ? (
                          <Typography >
                            {flha.attachment ===
                              null ? null : typeof flha.attachment ===
                                "string" ? (
                              <Attachment value={flha.attachment} />
                            ) : null}
                          </Typography>) : ("-")}
                      </Grid>
                    </Paper>
                  </Grid>

                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31.44" viewBox="0 0 30 31.44">
                        <g id="outline-assignment-24px" transform="translate(0 1.44)">
                          <g id="Bounding_Boxes">
                            <path id="Path_2274" data-name="Path 2274" d="M0,0H30V30H0Z" fill="none" />
                          </g>
                          <path id="Path_2530" data-name="Path 2530" d="M16.815,3.254a.668.668,0,0,1-.217-.033.651.651,0,0,1-.65-.65V1.292h-6.3V2.571a.647.647,0,0,1-.583.64.732.732,0,0,1-.228.033H6.46V5.892H18.892V3.242h-2.1l.023.013ZM5.846,19.2a1.279,1.279,0,1,1-1.279,1.279A1.28,1.28,0,0,1,5.846,19.2ZM4.367,16.042a.575.575,0,0,1,.957-.64l.315.466,1.246-1.515a.576.576,0,1,1,.89.732l-1.724,2.1a.673.673,0,0,1-.138.13.574.574,0,0,1-.8-.159l-.747-1.113Zm0-4.431a.575.575,0,0,1,.957-.64l.315.466L6.885,9.919a.576.576,0,0,1,.89.732l-1.724,2.1a.673.673,0,0,1-.138.13.574.574,0,0,1-.8-.159l-.747-1.11ZM17.705,31.268a.671.671,0,0,1-.435.171.348.348,0,0,1-.1-.01H1.438a1.438,1.438,0,0,1-1.016-.422A1.422,1.422,0,0,1,0,29.989V5.079A1.441,1.441,0,0,1,1.438,3.641H5.181V2.932a.956.956,0,0,1,.287-.686.968.968,0,0,1,.686-.287H8.369V1.072A1.053,1.053,0,0,1,8.689.32,1.053,1.053,0,0,1,9.441,0h6.747a1.053,1.053,0,0,1,.752.32,1.058,1.058,0,0,1,.32.752v.89h2a1.011,1.011,0,0,1,.686.287.986.986,0,0,1,.287.686v.709h3.743a1.441,1.441,0,0,1,1.438,1.438V23.05a.656.656,0,0,1-.194.65l-7.433,7.522a.223.223,0,0,1-.056.046h-.023ZM16.62,30.137c0-8.6-1.085-7.581,7.476-7.581V5.079a.121.121,0,0,0-.046-.1.143.143,0,0,0-.1-.046H20.2v1.3a.956.956,0,0,1-.287.686.968.968,0,0,1-.686.287H6.141a.986.986,0,0,1-.686-.287c-.023-.023-.033-.046-.056-.069a.994.994,0,0,1-.228-.617V4.93H1.428a.121.121,0,0,0-.1.046.171.171,0,0,0-.046.1v24.91a.107.107,0,0,0,.046.1.143.143,0,0,0,.1.046H16.62Zm-6.071-9.208a.65.65,0,0,1,0-1.3h6.174a.65.65,0,0,1,0,1.3Zm0-9.282a.65.65,0,1,1,0-1.3h9.508a.65.65,0,1,1,0,1.3Zm0,4.641a.65.65,0,1,1,0-1.3h9.508a.65.65,0,1,1,0,1.3Z" transform="translate(2.703 -1.44)" fill="#06425c" />
                        </g>
                      </svg> Notification block
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
                          <Typography
                            variant="label"
                            gutterBottom
                            className="viewLabel"
                          >
                            Roles
                          </Typography>
                          <Typography className="viewLabelValue">

                            {notificationSentValue.length > 0 ? notificationSentValue.map((value) => value.roleName) : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>


                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                      <svg id="outline-assignment-24px" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <g id="Bounding_Boxes">
                          <path id="Path_2274" data-name="Path 2274" d="M0,0H40V40H0Z" fill="none" />
                        </g>
                        <path id="reminder" d="M11.552,19.5a.8.8,0,0,1,0-1.592h2.787a10.146,10.146,0,0,0-.459,1.033c-.071.183-.134.368-.194.57ZM25.573,32.761a2.8,2.8,0,0,1-2.755,2.288,2.852,2.852,0,0,1-.97-.165,2.721,2.721,0,0,1-.856-.493,2.881,2.881,0,0,1-.633-.733,2.767,2.767,0,0,1-.328-.913.3.3,0,0,1,.242-.348h5.011a.285.285,0,0,1,.285.285.359.359,0,0,1,0,.08ZM24.384,16.5a5.859,5.859,0,0,1,.707.231,6.846,6.846,0,0,1,.973.479l.037.023a6.626,6.626,0,0,1,.827.6,6.275,6.275,0,0,1,.739.747h0a6.175,6.175,0,0,1,.6.873,6.651,6.651,0,0,1,.459.967h0a6.041,6.041,0,0,1,.285,1.061,6.238,6.238,0,0,1,.1,1.115v2.353h0a8.472,8.472,0,0,0,.063,1,8.315,8.315,0,0,0,.18.961h0a4.98,4.98,0,0,0,.314.881,5.445,5.445,0,0,0,.493.856h0a4.977,4.977,0,0,0,.719.8,8.324,8.324,0,0,0,1.033.8.491.491,0,0,1-.285.9H13.936a.491.491,0,0,1-.493-.491.5.5,0,0,1,.248-.442,8.311,8.311,0,0,0,1.027-.8,4.849,4.849,0,0,0,.713-.807l.02-.026a6.038,6.038,0,0,0,.473-.827,5.172,5.172,0,0,0,.319-.881s0,0,0-.017a7.159,7.159,0,0,0,.168-.918,8.411,8.411,0,0,0,.06-1.015V22.607a6.415,6.415,0,0,1,.1-1.118,5.915,5.915,0,0,1,.285-1.064,6.652,6.652,0,0,1,.465-.975,6.31,6.31,0,0,1,.613-.879h0a6.5,6.5,0,0,1,.75-.759,6.326,6.326,0,0,1,1.854-1.1,6.092,6.092,0,0,1,.724-.222,1.446,1.446,0,0,1,.436-.719,1.583,1.583,0,0,1,1.135-.365,1.629,1.629,0,0,1,1.124.371,1.515,1.515,0,0,1,.436.719Zm.262,1.512a5.285,5.285,0,0,0-.793-.242.465.465,0,0,1-.405-.408.682.682,0,0,0-.177-.431.7.7,0,0,0-.454-.137.636.636,0,0,0-.439.12.662.662,0,0,0-.174.434h0a.465.465,0,0,1-.379.408A4.889,4.889,0,0,0,20.97,18a4.969,4.969,0,0,0-.784.379,5.028,5.028,0,0,0-.7.508,5.365,5.365,0,0,0-.608.613h0a5.456,5.456,0,0,0-.493.713A5.8,5.8,0,0,0,18,21a4.809,4.809,0,0,0-.237.856,5.1,5.1,0,0,0-.077.9V24.98a8.991,8.991,0,0,1-.066,1.083,8.132,8.132,0,0,1-.191,1.007v.023a5.759,5.759,0,0,1-.365,1,6.806,6.806,0,0,1-.525.916l-.017.029a5.813,5.813,0,0,1-.81.913h14.2a5.679,5.679,0,0,1-.813-.916h0a6.344,6.344,0,0,1-.553-.953,5.667,5.667,0,0,1-.377-.984h0a8.729,8.729,0,0,1-.191-1.035,9.7,9.7,0,0,1-.066-1.067h0v-2.23a4.96,4.96,0,0,0-.08-.9A4.706,4.706,0,0,0,27.6,21h0a5.419,5.419,0,0,0-.371-.79,5.133,5.133,0,0,0-.491-.707h0a5.066,5.066,0,0,0-.6-.61,5.362,5.362,0,0,0-.67-.488l-.031-.02A6.05,6.05,0,0,0,24.655,18Zm-19.869.7a.588.588,0,0,1,.975-.653l.319.479L7.342,17a.588.588,0,1,1,.907.744L6.492,19.878a.548.548,0,0,1-.14.128.59.59,0,0,1-.816-.16l-.759-1.141Zm0-5.59a.588.588,0,1,1,.975-.653l.319.476,1.269-1.537a.588.588,0,0,1,.907.744L6.492,14.29a.57.57,0,0,1-.14.131.588.588,0,0,1-.816-.16L4.777,13.12Zm0-5.593a.588.588,0,1,1,.975-.653l.319.473L7.342,5.807a.589.589,0,1,1,.907.753L6.492,8.7a.616.616,0,0,1-.14.131.59.59,0,0,1-.816-.163L4.777,7.524Zm6.774.134a.8.8,0,1,1,0-1.592h8.48a.8.8,0,0,1,0,1.592ZM1.845,0H24.529a1.84,1.84,0,0,1,1.845,1.843v11.6l-.134-.06a8.754,8.754,0,0,0-1.064-.348h0a2.3,2.3,0,0,0-.385-.77V1.851a.258.258,0,0,0-.262-.262H1.845a.262.262,0,0,0-.26.262v22.8a.262.262,0,0,0,.26.262H13.283v.8c0,.262,0,.519-.023.77H1.851a1.834,1.834,0,0,1-1.309-.533A1.814,1.814,0,0,1,0,24.649V1.845A1.84,1.84,0,0,1,1.845,0Zm9.7,13.583a.8.8,0,1,1,0-1.589H19.37a.793.793,0,0,1,.716,1.141c-.228.066-.454.143-.676.225-.18.068-.357.143-.533.222Z" transform="translate(5.345 2.951)" fill="#06425c" />
                      </svg> Additional information
                    </Typography>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                      <Grid container spacing={3}>
                        <Grid
                          item
                          md={5}
                          xs={12}
                        >
                          <Typography
                            variant="label"
                            gutterBottom
                            className="viewLabel"
                          >
                            Is a First Aid/Medical Aid present for your shift?
                          </Typography>
                          <Typography className="viewLabelValue">
                            {flha.firstAid ? flha.firstAid : '-'}
                          </Typography>

                        </Grid>
                        <Grid
                          item
                          md={4}
                          xs={12}
                        >
                          <Typography
                            variant="label"
                            gutterBottom
                            className="viewLabel"
                          >
                            Emergency phone number
                          </Typography>
                          <Typography className="viewLabelValue">

                            {flha.emergencyPhoneNumber == undefined || flha.emergencyPhoneNumber == 'undefined' || flha.emergencyPhoneNumber == '' ? '-' : flha.emergencyPhoneNumber}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid
                          item
                          md={5}
                          xs={12}
                        >
                          <Typography
                            variant="label"
                            gutterBottom
                            className="viewLabel"
                          >
                            Has the JHA been reviewed?
                          </Typography>
                          <Typography className="viewLabelValue">

                            {flha.jhaReviewed ? flha.jhaReviewed : '-'}
                          </Typography>

                        </Grid>
                        <Grid
                          item
                          md={4}
                          xs={12}
                        >
                          <Typography
                            variant="label"
                            gutterBottom
                            className="viewLabel"
                          >
                            Enter the evacuation/assembly point
                          </Typography>
                          <Typography className="viewLabelValue">
                            {flha.evacuationPoint == undefined || flha.evacuationPoint == 'undefined' || flha.evacuationPoint == '' ? '-' : flha.evacuationPoint}
                          </Typography>

                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid
                          item
                          md={5}
                          xs={12}
                        >
                          <Typography
                            variant="label"
                            gutterBottom
                            className="viewLabel"
                          >
                            Do you have access to job procedure?
                          </Typography>
                          <Typography className="viewLabelValue">
                            {flha.accessToJobProcedure ? flha.accessToJobProcedure : '-'}
                          </Typography>

                        </Grid>
                        <Grid
                          item
                          md={4}
                          xs={12}
                        >
                          <Typography
                            variant="label"
                            gutterBottom
                            className="viewLabel"
                          >
                            Enter the location details
                          </Typography>
                          <Typography className="viewLabelValue">
                            {flha.location ? flha.location : '-'}
                          </Typography>
                        </Grid>

                      </Grid>
                    </Paper>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state,
  };
};


export default connect(
  mapStateToProps,
  null
)(FlhaDetails);

