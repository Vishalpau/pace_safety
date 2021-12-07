import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CommentIcon from '@material-ui/icons/Comment';
import HistoryIcon from '@material-ui/icons/History';
import { PapperBlock } from 'dan-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CheckCircle from '@material-ui/icons/CheckCircle';

import Attachment from '../../../containers/Attachment/Attachment';
import api from '../../../utils/axios';
import ViewHazard from './ViewHazard';

import { withRouter } from 'react-router-dom';
import flhaLogoSymbol from 'dan-images/flhaLogoSymbol.png';

import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';


function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: '.5rem 0',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
    '& td textHeight': {
      padding: '11.5px 14px',
      borderRadius: '8px',
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
  mttopTen: {
    paddingTop: '20px',
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
      lineHeight: '0.5rem',
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
  statusButton: {
    borderRadius: 4,
    fontSize: 14,
    width: '100%',
    textTransform: 'none',
    fontFamily: 'Montserrat-SemiBold !important',
    lineHeight: '18px',
    border: '1px solid #06425c',
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
  attachImg: {
    minWidth: '50px',
    height: '30px',
    borderRadius: '4px',
    float: 'left'
  },
  table: {
    minWidth: 600,
  },
  statusLabel: {
    fontSize: '14px',
    fontFamily: 'Montserrat-Regular',
    '& svg': {
      color: '#06425C',
    },
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: "1.0",
    flha: {},
    criticalTasks: {},
    visualConfirmations: {},
    versions: ["1.0",]

  };

  componentDidMount() {
    this.getFlhaDetails();
    this.getJobVisualConfirmation();
    this.handelVersion();
  }

  getFlhaDetails = async () => {
    const flhaNumber = this.props.match.params.id;
    const res = await api.get('api/v1/flhas/' + flhaNumber + '/');
    this.setState({ flha: res.data.data.results });
  }

  handelVersion = async () => {
    const flhaId = this.props.match.params.id;
    let taskUrl = `api/v1/flhas/${flhaId}/criticaltasks/`
    var res = await api.get(`${taskUrl}?version=1.0`);
    var resAllTask = await api.get(taskUrl);
    await this.setState({ criticalTasks: res.data.data.results });
    await this.setState({ versions: resAllTask.data.data.results.versions })
  }

  getPreventiveControls = async (value) => {
    const flhaId = this.props.match.params.id;
    let taskUrl = `api/v1/flhas/${flhaId}/criticaltasks/`
    var res = await api.get(`${taskUrl}?version=${value}`);
    await this.setState({ criticalTasks: res.data.data.results });
  }

  getJobVisualConfirmation = async () => {
    const flhaId = this.props.match.params.id;
    const res = await api.get('api/v1/flhas/' + flhaId + '/visualconfirmations/');
    await this.setState({ visualConfirmations: res.data.data.results });
  }
  redirectToHome = (Path) => {
    const { history } = this.props;
    if (history) {
      history.push(Path);
    }
  }

  render() {
    const { classes } = this.props;
    const {
      value, flha, criticalTasks, visualConfirmations, versions
    } = this.state;

    return (

      <CustomPapperBlock title={'FLHA Number:' + flha.flhaNumber} icon={flhaLogoSymbol} whiteBg>
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30.6" height="30.168" viewBox="0 0 39.6 30.168">
                      <path id="workflow" d="M37.251,11.412l.967.967a.645.645,0,0,1,0,.925l-.78.78a5.208,5.208,0,0,1,.483,1.289H38.93a.645.645,0,0,1,.645.645V17.4a.645.645,0,0,1-.645.645h-1.1a5.176,5.176,0,0,1-.57,1.25l.715.712a.645.645,0,0,1,0,.925l-.967.967a.645.645,0,0,1-.928.013l-.78-.78a5.037,5.037,0,0,1-1.289.483v1.009a.645.645,0,0,1-.645.645H31.991a.645.645,0,0,1-.645-.645V21.512a5.3,5.3,0,0,1-1.26-.564l-.712.709a.645.645,0,0,1-.925,0l-.967-.967a.645.645,0,0,1,0-.925l.78-.78a5.082,5.082,0,0,1-.483-1.289H26.77a.645.645,0,0,1-.645-.645V15.676a.645.645,0,0,1,.645-.645h1.1a5.176,5.176,0,0,1,.57-1.25l-.712-.722a.645.645,0,0,1,0-.925l.967-.967a.645.645,0,0,1,.925,0l.78.78a5.082,5.082,0,0,1,1.289-.483V10.455a.645.645,0,0,1,.645-.645H33.7a.645.645,0,0,1,.645.645v1.1a5.176,5.176,0,0,1,1.25.57l.712-.712a.645.645,0,0,1,.922,0ZM14.2,17.081a.709.709,0,0,1-.645-.761.693.693,0,0,1,.645-.761h8.079a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM8.864,14.825h2.72a.242.242,0,0,1,.255.255V17.8a.238.238,0,0,1-.255.245H8.864A.238.238,0,0,1,8.61,17.8V15.07a.242.242,0,0,1,.255-.255Zm0,6.719h2.72a.242.242,0,0,1,.255.255v2.72a.242.242,0,0,1-.255.255H8.864a.242.242,0,0,1-.255-.255v-2.73a.242.242,0,0,1,.255-.255ZM14.2,23.8a.709.709,0,0,1-.645-.757.693.693,0,0,1,.645-.761h5.511a.709.709,0,0,1,.645.761.693.693,0,0,1-.645.757ZM9.651,11.334a.435.435,0,0,1-.583-.074l-.061-.052-.812-.835a.461.461,0,0,1,.077-.645A.541.541,0,0,1,8.98,9.7l.432.458L10.995,8.7a.448.448,0,0,1,.645.151.509.509,0,0,1-.052.709L9.654,11.341Zm4.512-.645c-.355,0-.59-.355-.59-.761s.235-.761.59-.761h9.346a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM1.11,22.662a3.617,3.617,0,0,1,2.6-1.35V.967C.746,1.257,1.088,4,1.107,6.549V22.662ZM4.817,3.9h27.79a.761.761,0,0,1,.548.229.773.773,0,0,1,.229.548V6.929H31.949V5.156H4.817V21.87h0a.471.471,0,0,1-.4.467c-4.228.654-4.431,5.669-.122,6.388H31.949v-2.1H33.39v2.772a.777.777,0,0,1-.229.548h0a.773.773,0,0,1-.548.229H4.253A4.953,4.953,0,0,1,.811,28.3a5.569,5.569,0,0,1-.828-3.535V6.562C-.017,3.445-.05.077,4.291,0h.058a.474.474,0,0,1,.467.477Zm28.038,9.962a2.688,2.688,0,1,1-2.688,2.688,2.688,2.688,0,0,1,2.688-2.688Z" transform="translate(0.026)" fill="#06425c" />
                    </svg> Status
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid item md={12} sm={12} xs={12} className={classes.item}>
                        <ul className="SummaryTabList">
                          <li>
                            <Button
                              color="primary"
                              variant="contained"
                              size="small"
                              className={classes.statusButton}
                              onClick={(e) => {
                                setFlhatab(true);
                              }}
                            >
                              {flha.flhaStatus}
                            </Button>
                          </li>
                        </ul>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24.961" height="30.053" viewBox="0 0 30.961 36.053">
                      <path id="generate-report" d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z" transform="translate(0 0)" fill="#06425c" />
                    </svg> Project information
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid item md={12} sm={12} xs={12}>
                        <Typography gutterBottom className="labelValue">
                          {JSON.parse(localStorage.getItem('projectName')).projectName.projectName}
                        </Typography>
                        <Typography className="labelValue">
                          Level1 : Level2 : Level3
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg id="Group_4994" data-name="Group 4994" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                      <g id="outline-assignment-24px">
                        <g id="Bounding_Boxes">
                          <path id="Path_2274" data-name="Path 2274" d="M0,0H40V40H0Z" fill="none" />
                        </g>
                        <g id="manager" transform="translate(3.4 4.897)">
                          <path id="Path_5093" data-name="Path 5093" d="M13.46,23.911,15.2,29.017l.873-3.031-.427-.47a.715.715,0,0,1-.13-.74c.232-.459.711-.373,1.159-.373.47,0,1.051-.089,1.2.5a.766.766,0,0,1-.149.613l-.43.47.873,3.031,1.572-5.106c1.135,1.021,4.49,1.224,5.741,1.921a3.325,3.325,0,0,1,1.04.878,3.672,3.672,0,0,1,1.035,2.375,1.15,1.15,0,0,1-1.2,1.121H6.846a1.146,1.146,0,0,1-1.2-1.121A3.686,3.686,0,0,1,6.682,26.71a3.2,3.2,0,0,1,1.04-.878c1.248-.7,4.607-.9,5.739-1.921Zm-5.9-.338a.874.874,0,0,0-.073-.119c-.122-.2-.243-.4-.367-.624-.122-.246-.243-.476-.354-.689-.108-.23-.213-.476-.305-.719-.076-.213-.168-.457-.259-.748A.978.978,0,0,0,5.269,20H2.626a.571.571,0,0,1-.246-.046.577.577,0,0,1-.181-.135.7.7,0,0,1-.135-.181.551.551,0,0,1-.046-.243V16.062a.782.782,0,0,1,.032-.23.826.826,0,0,1,.154-.213.42.42,0,0,1,.181-.122.558.558,0,0,1,.243-.046H5.058a1,1,0,0,0,.978-.811c.059-.259.122-.5.181-.719.076-.246.154-.476.246-.719a6.352,6.352,0,0,1,.305-.7c.108-.246.23-.457.335-.67a.97.97,0,0,0-.168-1.159L5.042,8.762c-.014-.014-.014-.014-.032-.014a.657.657,0,0,1-.135-.181.424.424,0,0,1-.032-.213.491.491,0,0,1,.046-.23.65.65,0,0,1,.154-.213L7.379,5.587a.634.634,0,0,1,.213-.154.483.483,0,0,1,.23-.046.491.491,0,0,1,.23.046.931.931,0,0,1,.2.135h.014L9.991,7.295a.98.98,0,0,0,1.254.108c.2-.122.4-.243.624-.367.243-.122.476-.243.689-.354.23-.108.476-.213.719-.305.213-.076.457-.168.748-.259a.978.978,0,0,0,.67-.932V2.537a.571.571,0,0,1,.046-.246,1.414,1.414,0,0,1,.122-.181.436.436,0,0,1,.181-.122.555.555,0,0,1,.246-.046H17.9a.571.571,0,0,1,.246.046.42.42,0,0,1,.181.122,1.179,1.179,0,0,1,.122.181.555.555,0,0,1,.046.246V5.182a.981.981,0,0,0,.67.932c.289.092.535.181.748.259.246.092.489.2.719.305.213.108.443.23.689.354.23.122.427.243.624.367A.974.974,0,0,0,23.2,7.292L24.93,5.566h.014a.654.654,0,0,1,.2-.135.476.476,0,0,1,.23-.046.491.491,0,0,1,.23.046.623.623,0,0,1,.213.154l2.337,2.324a.635.635,0,0,1,.154.213.476.476,0,0,1,.046.23.424.424,0,0,1-.032.213.734.734,0,0,1-.135.181c-.014,0-.014,0-.032.014l-1.894,1.91a.967.967,0,0,0-.168,1.159c.108.213.23.427.335.67a7.472,7.472,0,0,1,.305.7c.092.243.168.476.246.719.059.213.122.457.181.719a1,1,0,0,0,.978.811h2.426a.571.571,0,0,1,.246.046.4.4,0,0,1,.181.122.874.874,0,0,1,.154.213.973.973,0,0,1,.032.23v3.331a.571.571,0,0,1-.046.246.808.808,0,0,1-.135.181.505.505,0,0,1-.181.135.558.558,0,0,1-.243.046H27.926a.981.981,0,0,0-.932.67c-.092.289-.181.535-.259.748-.092.246-.2.489-.305.719-.23.451-.451.883-.719,1.313a.874.874,0,0,0-.073.119H27.95c.1-.195.195-.405.3-.621.122-.276.243-.548.354-.824.014-.046.046-.108.062-.154h1.956a2.662,2.662,0,0,0,.992-.181,2.584,2.584,0,0,0,.843-.565,2.364,2.364,0,0,0,.565-.843,2.744,2.744,0,0,0,.181-.992V16.059a2.636,2.636,0,0,0-.2-.978,2.433,2.433,0,0,0-.548-.824l-.014-.014a2.546,2.546,0,0,0-.824-.567,2.445,2.445,0,0,0-.992-.2H28.955a.292.292,0,0,0-.032-.122c-.092-.289-.181-.581-.289-.856s-.23-.567-.351-.824a1.025,1.025,0,0,1-.059-.122L29.6,10.161a2.28,2.28,0,0,0,.578-.811,2.694,2.694,0,0,0,.2-.992,2.393,2.393,0,0,0-.2-.992,2.7,2.7,0,0,0-.565-.824H29.6L27.264,4.22a2.641,2.641,0,0,0-.843-.565,2.5,2.5,0,0,0-.992-.2,2.455,2.455,0,0,0-.992.2,2.425,2.425,0,0,0-.843.565L22.4,5.4l-.092-.046c-.246-.135-.521-.259-.811-.4-.276-.122-.548-.243-.824-.354-.046-.014-.108-.046-.154-.062V2.58a2.652,2.652,0,0,0-.181-.992,2.556,2.556,0,0,0-.565-.843,2.656,2.656,0,0,0-.843-.565A2.727,2.727,0,0,0,17.94,0H15.26a2.723,2.723,0,0,0-.992.181,2.8,2.8,0,0,0-.843.565,2.515,2.515,0,0,0-.565.843,2.672,2.672,0,0,0-.181.992V4.536c-.046.014-.108.046-.154.062-.276.108-.548.23-.824.354s-.565.259-.811.4L10.8,5.4,9.608,4.218a2.4,2.4,0,0,0-.843-.565,2.55,2.55,0,0,0-.992-.2,2.393,2.393,0,0,0-.992.2,2.626,2.626,0,0,0-.843.565L3.6,6.541H3.588a2.782,2.782,0,0,0-.565.824,2.479,2.479,0,0,0-.2.989,2.608,2.608,0,0,0,.2.992,2.312,2.312,0,0,0,.581.811l1.375,1.391a.853.853,0,0,1-.059.122c-.122.259-.23.535-.354.824-.108.276-.2.565-.289.856a.407.407,0,0,0-.032.122H2.583a2.375,2.375,0,0,0-.992.2,2.481,2.481,0,0,0-.824.565l-.014.014a2.42,2.42,0,0,0-.548.824A2.589,2.589,0,0,0,0,16.059v3.329a2.723,2.723,0,0,0,.181.992,2.425,2.425,0,0,0,.565.843,2.488,2.488,0,0,0,.843.565,2.682,2.682,0,0,0,.992.181H4.536c.014.046.046.108.062.154.108.276.23.548.354.824.105.219.2.43.3.621H7.56v.005Zm5.115-6.968a.955.955,0,0,0-.489.127.384.384,0,0,0-.14.162.551.551,0,0,0-.046.259,2.311,2.311,0,0,0,.462,1.124l0,.008h0l.97,1.543a8.271,8.271,0,0,0,1.3,1.713,2.664,2.664,0,0,0,1.862.748,2.723,2.723,0,0,0,1.967-.784,8.623,8.623,0,0,0,1.343-1.832L21,17.875a1.77,1.77,0,0,0,.232-.959c-.03-.108-.149-.162-.351-.17-.043,0-.086,0-.132,0l-.154.008a.286.286,0,0,1-.084-.005,1.62,1.62,0,0,1-.3-.016l.373-1.656A8.5,8.5,0,0,1,15.6,13.666c-.532-.338-.692-.727-1.224-.689a1.8,1.8,0,0,0-1.008.546,2.611,2.611,0,0,0-.578,1.137L13,16.611a1.339,1.339,0,0,1-.33-.005Zm8.584-.349a.7.7,0,0,1,.511.53A2.195,2.195,0,0,1,21.5,18.11h0l-.016.032-1.105,1.821a8.984,8.984,0,0,1-1.437,1.945,3.26,3.26,0,0,1-2.342.929,3.187,3.187,0,0,1-2.229-.894,8.6,8.6,0,0,1-1.4-1.826L12,18.575a2.852,2.852,0,0,1-.551-1.41,1.133,1.133,0,0,1,.095-.505.935.935,0,0,1,.332-.386,1.2,1.2,0,0,1,.235-.119,24.828,24.828,0,0,1-.046-2.775,3.512,3.512,0,0,1,1.759-2.718,4.388,4.388,0,0,1,.883-.43,5.512,5.512,0,0,1,5.658,1.121,3.775,3.775,0,0,1,.951,2.378l-.062,2.526Z" fill="#06425c" />
                        </g>
                      </g>
                    </svg> Job information
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid item md={12} sm={12} xs={12}>
                        <FormLabel component="legend" className="viewLabel">Title</FormLabel>
                        <Typography className="viewLabelValue">
                          {flha.jobTitle}
                        </Typography>
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        <FormLabel component="legend" className="viewLabel">Job description</FormLabel>
                        <Typography className="viewLabelValue">
                          {(flha.jobDetails) ? flha.jobDetails : '-'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormLabel component="legend" className="viewLabel">Reference</FormLabel>
                        <Typography>
                          {flha.referenceNumber !== 'undefined' ? flha.referenceNumber : '-'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* <Grid item xs={12}>
                  <FormLabel component="legend">Date</FormLabel>
                  <Typography>
                    {moment(this.state.flha.dateTimeFlha).format(
                      'Do MMMM YYYY, h:mm:ss a'
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <FormLabel component="legend">Attachment</FormLabel>
                  <Typography>

                  </Typography>
                  {flha.attachment ? (
                    <Typography >
                      {flha.attachment ===
                        null ? null : typeof flha.attachment ===
                          "string" ? (
                        <Attachment value={flha.attachment} />
                      ) : null}
                    </Typography>) : ("-")}
                </Grid> */}

              </Grid>
              <Grid>
              <AppBar position="static" className={classes.headerBackground}>
                <Tabs value={value} onChange={this.handleChangeTab} initialSelectedIndex={1.0}>
                  {(this.state.versions !== undefined && this.state.versions.length > 0) ?

                    (versions.map((version) => (
                      <Tab
                        value={version} key={version} label={(version == "1.0") ? "Initial Revision" : version}
                        onClick={(e) => this.getPreventiveControls(version)}
                      />
                    )))
                    : "Initial Revision"
                  }
                </Tabs>
              </AppBar>

              <TabContainer className={classes.paddZero}>
                <ViewHazard criticalTasks={this.state.criticalTasks} visualConfirmations={this.state.visualConfirmations} flha={this.state.flha} />
              </TabContainer>
              </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper elevation={0}>
              <div className={classes.root}>
                <Box padding={1} bgcolor="background.paper">
                  <Typography variant="h6" gutterBottom>
                    Quick Actions

                  </Typography>
                  <Divider />
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem
                      button
                      disabled={this.state.flha.flhaStage === "Close" ? true : false}
                    >
                      <ListItemIcon>
                        <CommentIcon />
                      </ListItemIcon>
                      <Link
                        // onClick={()=>.push('/app/pages/assesments/flha/' + this.props.match.params.id + '/revise')}
                        onClick={() => this.redirectToHome('/app/pages/assesments/flha/' + this.props.match.params.id + '/revise')}
                        variant="subtitle"
                      >
                        <ListItemText primary="Revise FLHA" />
                      </Link>
                    </ListItem>
                    <Divider />

                    <ListItem
                      button
                    >
                      <ListItemIcon>
                        <HistoryIcon />
                      </ListItemIcon>
                      <Link
                        onClick={() => this.redirectToHome('/app/pages/assesments/AuditCheck/' + this.props.match.params.id + '/' + this.state.flha.fkProjectStructureIds)}
                        variant="subtitle"
                      >
                        <ListItemText primary="Complete audit check" />
                      </Link>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <CloseIcon />
                      </ListItemIcon>
                      <Link
                        onClick={() => this.redirectToHome('/app/pages/assesments/flha/' + this.props.match.params.id + '/close-out')}
                        variant="subtitle"
                      >
                        <ListItemText primary="Close out" />
                      </Link>
                    </ListItem>
                  </List>
                </Box>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </CustomPapperBlock>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleTabs));


// export default ;