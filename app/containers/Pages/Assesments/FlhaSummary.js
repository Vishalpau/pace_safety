import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import BookIcon from '@material-ui/icons/Book';
import ViewColumnOutlinedIcon from '@material-ui/icons/ViewColumnOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import Paper from '@material-ui/core/Paper';
import { PapperBlock } from 'dan-components';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import CommentIcon from '@material-ui/icons/Comment';
import HistoryIcon from '@material-ui/icons/History';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import sampleimg from 'dan-images/sampleimg.png';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Addhazard from './Addhazard';
import moment from 'moment';
import ViewHazard from './ViewHazard';
import api from '../../../utils/axios';
//import Loader from "../Loader";


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
    float: 'right'
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
    

  handleChangeTab = (event, value) => {
    // alert(value)
    this.setState({ value });
    this.getPreventiveControls(value)
  };


  componentDidMount() {
    this.getFlhaDetails();
    this.getPreventiveControls("1.0");
    this.getJobVisualConfirmation();
  }

  getFlhaDetails = async () => {
    const flhaNumber = this.props.match.params.id;
    const res = await api.get('api/v1/flhas/' + flhaNumber + '/');
    console.log({ flhares: res.data.data.results });
    this.setState({ flha: res.data.data.results });
  }

  getPreventiveControls = async (value=undefined) => {
    const flhaId = this.props.match.params.id;
    if(value != undefined){
      var res = await api.get('api/v1/flhas/' + flhaId + '/criticaltasks/');
    }
    else{
      var res = await api.get('api/v1/flhas/' + flhaId + '/criticaltasks/');
    }
    
    
    await this.setState({ criticalTasks: res.data.data.results.tasks });
    console.log({ controls: this.state.criticalTasks });
    await this.setState({versions: res.data.data.results.versions})
  }

  getJobVisualConfirmation = async () => {
    const flhaId = this.props.match.params.id;
    const res = await api.get('api/v1/flhas/' + flhaId + '/visualconfirmations/');
    console.log({ visualConfirmations: res.data.data.results });
    await this.setState({ visualConfirmations: res.data.data.results });
  }

  render() {
    const { classes } = this.props;
    const {
      value, flha, criticalTasks, visualConfirmations, versions
    } = this.state;
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    console.log({versionscon: versions})

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
                    Open
                    {/* {flha.status} */}

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
                    {(flha.referenceNumber) ? flha.referenceNumber : '-'}

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

              </Grid>
            </Paper>

            <div className={classes.root}>
              <AppBar position="static" className={classes.headerBackground}>
                <Tabs value={value} onChange={this.handleChangeTab} initialSelectedIndex={1.0}>
                  {(this.state.versions.length > 0) ?
                
                  (versions.map((version) => (
                    // console.log(this.state.versions)
                    <Tab value={version} key={version} label={(version == "1.0") ? "Initial Revision" : version} />
                  )))
                  : "Initial Revision"

                  }
                  {/* <Tab label="Initial revision" />
                  <Tab label="Revision 1.1" />
                  <Tab label="Revision 1.2" /> */}
                </Tabs>
              </AppBar>
              {/* {value === 0
			&& ( */}
			  <TabContainer className={classes.paddZero}>
            <ViewHazard criticalTasks={this.state.criticalTasks} visualConfirmations={this.state.visualConfirmations} flha={this.state.flha} />
			  </TabContainer>
			{/* )} */}
              {/* {value === 1 && <TabContainer>Item Two</TabContainer>}
              {value === 2 && <TabContainer>Item Three</TabContainer>}
              {value === 3 && (
                <TabContainer />
              )} */}
            </div>
            {/* <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography>
				Has the energy control being completed?

                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
				Yes

                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
				Has the audit check being done?

                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
				Yes

                </Typography>
              </Grid>
            </Grid>
             */}
            {/* <Grid item xs={12} className={classes.mttopThirty}>
              <FormLabel component="legend">Actions</FormLabel>

              <Grid item xs={12}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  <Link color="inherit" href="#">
					Action ID

                  </Link>
                  <Link color="inherit" href="#">
				Action title

                  </Link>
                  <Typography color="textPrimary">Due date</Typography>
                  <Typography color="textPrimary">Status</Typography>
                </Breadcrumbs>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  <Link color="inherit" href="#">
					Action ID

                  </Link>
                  <Link color="inherit" href="#">
				Action title

                  </Link>
                  <Typography color="textPrimary">Due date</Typography>
                  <Typography color="textPrimary">Status</Typography>
                </Breadcrumbs>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  <Link color="inherit" href="#">
					Action ID

                  </Link>
                  <Link color="inherit" href="#">
				Action title

                  </Link>
                  <Typography color="textPrimary">Due date</Typography>
                  <Typography color="textPrimary">Status</Typography>
                </Breadcrumbs>
              </Grid>
            </Grid>

             */}
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
                    >
                      <ListItemIcon>
                        <CommentIcon />
                      </ListItemIcon>
                      <Link
                        href={'/app/pages/assesments/flha/' + this.props.match.params.id + '/revise'}
                        variant="subtitle"
                      >
                        <ListItemText primary="Revise FLHA" />
                      </Link>
                    </ListItem>
                    <Divider />
                    <ListItem
                      disbaled={true}
                      button
                    >
                      <ListItemIcon>
                        <HistoryIcon />
                      </ListItemIcon>
                      {console.log(this.state,'w')}
                      <Link
                      
                      // disabled={true}
                        href={'/app/pages/assesments/AuditCheck/'+ this.props.match.params.id + '/' + this.state.flha.fkProjectStructureIds}
                        variant="subtitle"
                      >
                        <ListItemText primary="Complete audit check" />
                      </Link>
                    </ListItem>
                    {/* <ListItem
                      disabled={true}
                      button
                    >
                      <ListItemIcon>
                        <CommentIcon />
                      </ListItemIcon>
                      <Link
                        disabled={true}
                        href={"/app/pages/assesments/flha/"+this.props.match.params.id+"/comments"}
                        // href="/app/pages/actions/comments"
                        variant="subtitle"
                      >

                        <ListItemText primary="Comments" />
                      </Link>
                    </ListItem> */}
                    {/* <Divider />
                    <ListItem
                    disabled={true}
                      button
                    >
                      <ListItemIcon>
                        <HistoryIcon />
                      </ListItemIcon>
                      <Link
                        href={"/app/pages/assesments/flha/"+this.props.match.params.id+"/activities"}
                        variant="subtitle"
                      >
                        <ListItemText primary="Activity History" />
                      </Link>
                    </ListItem>
                    <Divider /> */}
                    {/* <ListItem
				button
				>
				<ListItemIcon>
					<HistoryIcon />
				</ListItemIcon>
				<Link
					href="/app/pages/assesments/IsolationControl"
					variant="subtitle"
				>
					<ListItemText primary="Isolation Control" />
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
					href="/app/pages/assesments/PreventiveControls"
					variant="subtitle"
				>
					<ListItemText primary="Preventive Controls" />
				</Link>
				</ListItem>
				<Divider /> */}
                    <ListItem>
                      <ListItemIcon>
                        <CloseIcon />
                      </ListItemIcon>
                      <Link
                        href={'/app/pages/assesments/flha/' + this.props.match.params.id + '/close-out'}
                        // href="/app/pages/assesments/CloseOut"
                        variant="subtitle"
                      >
                        <ListItemText primary="Close out" />
                      </Link>
                    </ListItem>
                    {/* <ListItem
                      disabled={true}
                      button
                    >
                      <ListItemIcon>
                        <PrintIcon />
                      </ListItemIcon>
                      <Link
                        href=""
                        variant="subtitle"
                      >
                        <ListItemText primary="Print" />
                      </Link>
                    </ListItem> */}
                    {/* <ListItem
                      disabled={true}
                      button
                    >
                      <ListItemIcon>
                        <ShareIcon />
                      </ListItemIcon>
                      <Link

                        variant="subtitle"
                      >
                        <ListItemText disabled secondary="Share" />
                      </Link>
                    </ListItem> */}
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
