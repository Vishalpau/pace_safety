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
            <Paper elevation={0} className={classes.pTopandRight}>
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30.6" height="30.168" viewBox="0 0 39.6 30.168">
                      <path id="workflow" d="M37.251,11.412l.967.967a.645.645,0,0,1,0,.925l-.78.78a5.208,5.208,0,0,1,.483,1.289H38.93a.645.645,0,0,1,.645.645V17.4a.645.645,0,0,1-.645.645h-1.1a5.176,5.176,0,0,1-.57,1.25l.715.712a.645.645,0,0,1,0,.925l-.967.967a.645.645,0,0,1-.928.013l-.78-.78a5.037,5.037,0,0,1-1.289.483v1.009a.645.645,0,0,1-.645.645H31.991a.645.645,0,0,1-.645-.645V21.512a5.3,5.3,0,0,1-1.26-.564l-.712.709a.645.645,0,0,1-.925,0l-.967-.967a.645.645,0,0,1,0-.925l.78-.78a5.082,5.082,0,0,1-.483-1.289H26.77a.645.645,0,0,1-.645-.645V15.676a.645.645,0,0,1,.645-.645h1.1a5.176,5.176,0,0,1,.57-1.25l-.712-.722a.645.645,0,0,1,0-.925l.967-.967a.645.645,0,0,1,.925,0l.78.78a5.082,5.082,0,0,1,1.289-.483V10.455a.645.645,0,0,1,.645-.645H33.7a.645.645,0,0,1,.645.645v1.1a5.176,5.176,0,0,1,1.25.57l.712-.712a.645.645,0,0,1,.922,0ZM14.2,17.081a.709.709,0,0,1-.645-.761.693.693,0,0,1,.645-.761h8.079a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM8.864,14.825h2.72a.242.242,0,0,1,.255.255V17.8a.238.238,0,0,1-.255.245H8.864A.238.238,0,0,1,8.61,17.8V15.07a.242.242,0,0,1,.255-.255Zm0,6.719h2.72a.242.242,0,0,1,.255.255v2.72a.242.242,0,0,1-.255.255H8.864a.242.242,0,0,1-.255-.255v-2.73a.242.242,0,0,1,.255-.255ZM14.2,23.8a.709.709,0,0,1-.645-.757.693.693,0,0,1,.645-.761h5.511a.709.709,0,0,1,.645.761.693.693,0,0,1-.645.757ZM9.651,11.334a.435.435,0,0,1-.583-.074l-.061-.052-.812-.835a.461.461,0,0,1,.077-.645A.541.541,0,0,1,8.98,9.7l.432.458L10.995,8.7a.448.448,0,0,1,.645.151.509.509,0,0,1-.052.709L9.654,11.341Zm4.512-.645c-.355,0-.59-.355-.59-.761s.235-.761.59-.761h9.346a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM1.11,22.662a3.617,3.617,0,0,1,2.6-1.35V.967C.746,1.257,1.088,4,1.107,6.549V22.662ZM4.817,3.9h27.79a.761.761,0,0,1,.548.229.773.773,0,0,1,.229.548V6.929H31.949V5.156H4.817V21.87h0a.471.471,0,0,1-.4.467c-4.228.654-4.431,5.669-.122,6.388H31.949v-2.1H33.39v2.772a.777.777,0,0,1-.229.548h0a.773.773,0,0,1-.548.229H4.253A4.953,4.953,0,0,1,.811,28.3a5.569,5.569,0,0,1-.828-3.535V6.562C-.017,3.445-.05.077,4.291,0h.058a.474.474,0,0,1,.467.477Zm28.038,9.962a2.688,2.688,0,1,1-2.688,2.688,2.688,2.688,0,0,1,2.688-2.688Z" transform="translate(0.026)" fill="#06425c" />
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
                            <Typography className={classes.statusLabel} variant="caption" display="block" align="center">
                              {flha.flhaStage} <CheckCircle />
                            </Typography>
                          </li>
                        </ul>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <FormLabel component="legend">Job title</FormLabel>
                  <Typography>
                    {flha.jobTitle}

                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <FormLabel component="legend">Status</FormLabel>
                  <Typography
                    variant="p"
                    gutterBottom
                  >
                    {flha.flhaStatus}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <FormLabel component="legend">Project</FormLabel>
                  <Typography>
                    {JSON.parse(localStorage.getItem('projectName')).projectName.projectName}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <FormLabel component="legend">Reference</FormLabel>
                  <Typography>
                    {flha.referenceNumber !== 'undefined' ? flha.referenceNumber : '-'}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormLabel component="legend">Job description</FormLabel>
                  <Typography>
                    {(flha.jobDetails) ? flha.jobDetails : '-'}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

              </Grid>
            </Paper>
            <div className={classes.root}>
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

            </div>
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