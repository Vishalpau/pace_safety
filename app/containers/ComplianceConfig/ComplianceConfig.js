import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { PapperBlock } from "dan-components";
import Settings from '@material-ui/icons/Settings';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import SettingsInputSvideo from '@material-ui/icons/SettingsInputSvideo';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dropzone from 'react-dropzone'; 

import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import settingLogoSymbol from 'dan-images/settingLogoSymbol.png';
import Paper from '@material-ui/core/Paper';

import CrudTablePerformanceFactor from './CrudTablePerformanceFactor';
import CrudTablePerformanceMatrix from './CrudTablePerformanceMatrix';
import QuestionsForm from './AuditQuestions/QuestionsForm';

import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import QuestionsList from './AuditQuestions/QuestionsList';

function TabContainer(props) {
  const { children } = props;
  
  return (
    <Typography component="div" style={{background: '#fafafa', marginTop: '0rem' }}>
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
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  tabTitleLabel: {
    color: '#042b3c',
    position: 'relative',
    fontSize: '24px',
    fontWeight: '400',
    marginBottom: '0',
    display: 'inline-block',
    '& svg': {
      color: '#ffffff',
      padding: '2px',
      backgroundColor: '#06425c',
    },
  },
  customTooltip: {
    maxWidth: 110,
  },
  infoIconBox: {
    '& svg': {
      fontSize: '32px',
      color: '#06425c',
    },
  },
  custmSubmitBtn: {
    color: '#ffffff',
    backgroundColor: '#06425c',
    lineHeight: '30px',
    border: 'none',
    marginTop: '30px',
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
  AttaLabelName: {
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    color: '#737373',
  },
  marginR8: {
    marginRight: '0.5rem !important',
  },
});

class ComplianceConfig extends React.Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({files})
    };
    this.onDropTwo = (filestwo) => {
      this.setState({filestwo})
    };
    this.state = {
      files: [],
      filestwo: [],
      value: 0,
      auditQuestions: '',
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick = () => {
    this.setState({auditQuestions: 'questionForm'})
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    // const files = this.state.files.map(file => (
    //   <li key={file.name}>
    //     {file.name} - {file.size} bytes
    //   </li>
    // ));

    // const filestwo = this.state.filestwo.map(filestwo => (
    //   <li key={filestwo.name}>
    //     {filestwo.name} - {filestwo.size} bytes
    //   </li>
    // ));

    return (
        // <PapperBlock title="Settings" icon="ion-md-settings">
          <CustomPapperBlock title="Compliance config" icon='customDropdownPageIcon complianceConfigPageIcon' whiteBg>
            <div className={classes.root}>
                <AppBar position="static" color="white" className="tabContentDesign">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Compliance questions" />
                        <Tab label="Performance factors" />
                        <Tab label="Performance matrix" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                  <>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                        <Typography variant="h6" className="sectionHeading">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <g id="audit-question-32" transform="translate(-180 -1793)">
                              <path id="Subtraction_27" data-name="Subtraction 27" d="M-3094.008,29.719a2.577,2.577,0,0,1-1.23-.315l-11.368-6.178A2.692,2.692,0,0,1-3108,20.854V8.868a2.685,2.685,0,0,1,1.392-2.371l11.369-6.183A2.587,2.587,0,0,1-3094.008,0a2.591,2.591,0,0,1,1.23.314l11.368,6.179a2.686,2.686,0,0,1,1.392,2.371V20.851a2.692,2.692,0,0,1-1.391,2.372l-11.369,6.18A2.589,2.589,0,0,1-3094.008,29.719Zm2.036-8.735h0l-2.553,2.558,1.124,1.124,2.552-2.559-.187-.187.719-.721a2.965,2.965,0,0,0,1.7.534,3,3,0,0,0,2.216-.982,2.99,2.99,0,0,0-.21-4.217,3.078,3.078,0,0,0-2.195-.755l-.161,0h-.023a2.823,2.823,0,0,0-1.839.962,2.968,2.968,0,0,0-.239,3.708l-.718.72-.188-.187ZM-3095.727,6a4.056,4.056,0,0,0-2.97,1.2,5.374,5.374,0,0,0-1.391,3.869,5.192,5.192,0,0,0,2.123,4.341v.025a5.9,5.9,0,0,0-3.658,1.271,4.246,4.246,0,0,0-1.378,3.35v2.965h7.285l2.742-2.749.188.188.082-.083a3.5,3.5,0,0,1,.5-3.971,3.465,3.465,0,0,1,.375-.356,2.255,2.255,0,0,0-1.663-.616v-.025a5.191,5.191,0,0,0,2.123-4.341,5.372,5.372,0,0,0-1.39-3.869A4.056,4.056,0,0,0-3095.727,6Zm7.112,14.675a1.922,1.922,0,0,1-1.294-.5,1.932,1.932,0,0,1-.135-2.725,1.933,1.933,0,0,1,1.431-.633,1.926,1.926,0,0,1,1.294.5,1.933,1.933,0,0,1,.134,2.725A1.933,1.933,0,0,1-3088.615,20.675Z" transform="translate(3290 1794)" fill="#06425c"/>
                              <g id="audit-question-32-2" data-name="audit-question-32">
                                <rect id="Rectangle_2114" data-name="Rectangle 2114" width="32" height="32" transform="translate(180 1793)" fill="none"/>
                              </g>
                            </g>
                          </svg> Compliance questions
                        </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      {/* {this.state.auditQuestions === '' ? 
                        <> */}
                          <Paper elevation={1} className="paperSection">
                            <Grid container spacing={3}>
                                {/* <Grid item md={12} sm={12} xs={12} align='right' className="paddBRemove">
                                  <Tooltip title="New">
                                    <Button size="medium" className="marginR5" variant="contained" color="primary" onClick={() => this.handleClick()} >
                                      <AddIcon className="marginR5" /> New
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Bulk upload">
                                    <Button size="medium" variant="contained" color="primary" >
                                      <CloudUploadIcon className="marginR5" /> Upload
                                    </Button>
                                  </Tooltip>
                                </Grid> */}
                                <Grid item md={12} sm={12} xs={12}>
                                  {/* <ComplianceQuestionsList /> */}
                                  <QuestionsList />
                                </Grid>
                            </Grid>
                          </Paper>
                        {/* </>
                      :
                        <Paper elevation={1} className="paperSection">
                          <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12}>
                              <QuestionsForm />
                            </Grid>
                          </Grid>
                        </Paper>
                      } */}
                    </Grid>
                  </>
                </TabContainer>
                }
                
                {value === 1 && <TabContainer>
                    <>
                          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Typography variant="h6" className="sectionHeading">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <g id="Performance-factor-32" transform="translate(-370 -1793)">
                                  <path id="Subtraction_29" data-name="Subtraction 29" d="M-3094.008,29.719a2.574,2.574,0,0,1-1.23-.315l-11.368-6.178A2.692,2.692,0,0,1-3108,20.854V8.868a2.683,2.683,0,0,1,1.392-2.371l11.369-6.183A2.591,2.591,0,0,1-3094.008,0a2.594,2.594,0,0,1,1.23.314l11.368,6.179a2.687,2.687,0,0,1,1.392,2.371V20.851a2.693,2.693,0,0,1-1.391,2.372l-11.369,6.18A2.591,2.591,0,0,1-3094.008,29.719Zm-8.521-8.6a.471.471,0,0,0-.471.47.471.471,0,0,0,.471.471h17.878a.471.471,0,0,0,.47-.471.47.47,0,0,0-.47-.47Zm13.624-10.329a.942.942,0,0,0-.941.941v7.51a.942.942,0,0,0,.941.941h1.882a.942.942,0,0,0,.941-.941v-7.51a.943.943,0,0,0-.941-.941ZM-3094.551,7a.942.942,0,0,0-.94.941v11.3a.942.942,0,0,0,.94.941h1.882a.942.942,0,0,0,.941-.941V7.941a.942.942,0,0,0-.941-.941Zm-5.646,6.6a.942.942,0,0,0-.94.941v4.693a.942.942,0,0,0,.94.941h1.882a.942.942,0,0,0,.941-.941V14.544a.942.942,0,0,0-.941-.941Z" transform="translate(3480 1794)" fill="#06425c"/>
                                  <g id="performance-factor-32-2" data-name="performance-factor-32">
                                    <g id="performance-factor-32-3" data-name="performance-factor-32" transform="translate(190)">
                                      <rect id="Rectangle_2114" data-name="Rectangle 2114" width="32" height="32" transform="translate(180 1793)" fill="none"/>
                                    </g>
                                  </g>
                                </g>
                              </svg> Performance factors
                          </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                    <Grid item md={12}>
                                      <CrudTablePerformanceFactor />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
                            <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle">
                                Save
                            </Button>
                            <Button size="medium" variant="contained" color="secondary" className="buttonStyle custmCancelBtn">
                                Cancel
                            </Button>
                        </Grid> */}
                    </>
                </TabContainer>
                }
                {value === 2 && <TabContainer>
                    <>
                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Typography variant="h6" className="sectionHeading">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <g id="performance-matrix-32" transform="translate(-275 -1793)">
                                  <path id="Subtraction_28" data-name="Subtraction 28" d="M-3094.008,29.719a2.577,2.577,0,0,1-1.23-.315l-11.368-6.178A2.692,2.692,0,0,1-3108,20.854V8.868a2.685,2.685,0,0,1,1.392-2.371l11.369-6.183A2.587,2.587,0,0,1-3094.008,0a2.591,2.591,0,0,1,1.23.314l11.368,6.179a2.686,2.686,0,0,1,1.392,2.371V20.851a2.692,2.692,0,0,1-1.391,2.372l-11.369,6.18A2.589,2.589,0,0,1-3094.008,29.719Zm1.966-13.784a1.023,1.023,0,0,0-1.021,1.021v5.021A1.023,1.023,0,0,0-3092.043,23h5.021A1.022,1.022,0,0,0-3086,21.978V16.957a1.022,1.022,0,0,0-1.021-1.021Zm-8.936,0A1.023,1.023,0,0,0-3102,16.957v5.021A1.023,1.023,0,0,0-3100.979,23h5.021a1.022,1.022,0,0,0,1.021-1.021V16.957a1.022,1.022,0,0,0-1.021-1.021ZM-3092.043,7a1.022,1.022,0,0,0-1.021,1.021v5.021a1.023,1.023,0,0,0,1.021,1.021h5.021A1.023,1.023,0,0,0-3086,13.042V8.021A1.022,1.022,0,0,0-3087.022,7Zm-8.936,0A1.022,1.022,0,0,0-3102,8.021v5.021a1.023,1.023,0,0,0,1.022,1.021h5.021a1.022,1.022,0,0,0,1.021-1.021V8.021A1.022,1.022,0,0,0-3095.958,7Z" transform="translate(3385 1794)" fill="#06425c"/>
                                  <g id="performance-matrix-32-2" data-name="performance-matrix-32" transform="translate(95)">
                                    <rect id="Rectangle_2114" data-name="Rectangle 2114" width="32" height="32" transform="translate(180 1793)" fill="none"/>
                                  </g>
                                </g>
                              </svg> Performance matrix
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                    <Grid item md={12}>
                                        <CrudTablePerformanceMatrix />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid> 
                    </>
                </TabContainer>
                }

              </div>
        </CustomPapperBlock>
    );
  }
}

ComplianceConfig.propTypes = {
  classes: PropTypes.object.isRequired,
  classestab: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplianceConfig);