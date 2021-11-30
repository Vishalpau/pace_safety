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

import Attachment from '../../../containers/Attachment/Attachment';
import api from '../../../utils/axios';
import ViewHazard from './ViewHazard';


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


  render() {
    const { classes } = this.props;
    const {
      value, flha, criticalTasks, visualConfirmations, versions
    } = this.state;

    return (
      <PapperBlock title={'FLHA Number:' + flha.flhaNumber} icon="ion-ios-game-controller-a-outline" desc="">
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Paper elevation={0} className={classes.pTopandRight}>
              <Grid container spacing={3}>
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
                        href={'/app/pages/assesments/flha/' + this.props.match.params.id + '/revise'}
                        variant="subtitle"
                      >
                        <ListItemText  primary="Revise FLHA" />
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
                        href={'/app/pages/assesments/AuditCheck/' + this.props.match.params.id + '/' + this.state.flha.fkProjectStructureIds}
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
                        href={'/app/pages/assesments/flha/' + this.props.match.params.id + '/close-out'}
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

      </PapperBlock>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);