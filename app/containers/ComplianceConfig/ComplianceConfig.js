import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { PapperBlock } from 'dan-components';
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

import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CrudTablePerformanceFactor from './crudTablePerformanceFactor';
import CrudTablePerformanceMatrix from './CrudTablePerformanceMatrix';
import QuestionsForm from './AuditQuestions/QuestionsForm';

import QuestionsList from './AuditQuestions/QuestionsList';
import PerformanceFactorList from './PerformanceFactor/PerformanceFactorList';
import PerformanceMatrixList from './PerformanceMatrix/PerformanceMatrixList';
function TabContainer(props) {
  const { children } = props;

  return (
    <Typography
      component="div"
      style={{ background: '#fafafa', marginTop: '0rem' }}
    >
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = (theme) => ({
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
      this.setState({ files });
    };
    this.onDropTwo = (filestwo) => {
      this.setState({ filestwo });
    };
    this.state = {
      files: [],
      filestwo: [],
      value: localStorage.getItem('configTab') != null ? parseInt(localStorage.getItem('configTab')) : 0,
      auditQuestions: '',
    };
  }


  handleChange = (event, value) => {
    localStorage.setItem('configTab', value);
    this.setState({ value });
  };

  handleClick = () => {
    this.setState({ auditQuestions: 'questionForm' });
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
      <CustomPapperBlock
        title="Compliance Configuration"
        icon="customDropdownPageIcon complianceConfigPageIcon"
        whiteBg
      >
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
          {value == 0 && (
            <TabContainer>
              <>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <g id="compliance-question-40" transform="translate(-785 -309)">
                      <g id="Group_6927" data-name="Group 6927" transform="translate(785 309)">
                        <g id="compliance-protocols-24" transform="translate(0)">
                          <g id="Group_6245" data-name="Group 6245">
                            <g id="action-tracker-24">
                              <g id="Group_5789" data-name="Group 5789">
                                <g id="Group_5787" data-name="Group 5787">
                                  <g id="Group_5778" data-name="Group 5778">
                                    <g id="Group_5762" data-name="Group 5762">
                                      <g id="Group_5739" data-name="Group 5739">
                                        <rect id="Rectangle_1883" data-name="Rectangle 1883" width="32" height="32" fill="none" />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                          <g id="Group_5382" data-name="Group 5382" transform="translate(0)">
                            <path id="Path_5175" data-name="Path 5175" d="M28.158,4.311a13.262,13.262,0,0,0-18.807,0A13.285,13.285,0,0,0,7.708,21.143L1.59,26.584c-.113.057-.17.17-.283.227A3.054,3.054,0,0,0,.4,28.964a3.087,3.087,0,0,0,5.268,2.21,1.236,1.236,0,0,0,.227-.283l5.438-6.177a13.281,13.281,0,0,0,16.825-20.4ZM18.811,25.053a11.335,11.335,0,1,1,11.33-11.335A11.329,11.329,0,0,1,18.811,25.053Z" transform="translate(-0.4 -0.4)" fill="#06425c" />
                          </g>
                        </g>
                      </g>
                      <g id="noun-question-322257" transform="translate(798.458 314.542)">
                        <path id="Path_6901" data-name="Path 6901" d="M156.953,81.5c0,2.778-3.092,3.473-3.092,4.75v1.188h-3.607v-1.7c0-1.972,3.092-3.092,3.092-4.257a1.405,1.405,0,0,0-1.434-1.322c-.829,0-1.524.739-2.2,1.591l-2.263-2.106c1.344-1.77,2.935-2.845,4.884-2.845a4.47,4.47,0,0,1,4.615,4.705Z" transform="translate(-147.453 -76.799)" fill="#06425c" />
                        <path id="Path_6902" data-name="Path 6902" d="M209.008,341.051a2.106,2.106,0,1,1-2.106-2.106,2.106,2.106,0,0,1,2.106,2.106" transform="translate(-202.287 -327.473)" fill="#06425c" />
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
          )}

          {value == 1 && (
            <TabContainer>
              <>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                    >
                      <g
                        id="Performance-factor-32"
                        transform="translate(-370 -1793)"
                      >
                        <path
                          id="Subtraction_29"
                          data-name="Subtraction 29"
                          d="M-3094.008,29.719a2.574,2.574,0,0,1-1.23-.315l-11.368-6.178A2.692,2.692,0,0,1-3108,20.854V8.868a2.683,2.683,0,0,1,1.392-2.371l11.369-6.183A2.591,2.591,0,0,1-3094.008,0a2.594,2.594,0,0,1,1.23.314l11.368,6.179a2.687,2.687,0,0,1,1.392,2.371V20.851a2.693,2.693,0,0,1-1.391,2.372l-11.369,6.18A2.591,2.591,0,0,1-3094.008,29.719Zm-8.521-8.6a.471.471,0,0,0-.471.47.471.471,0,0,0,.471.471h17.878a.471.471,0,0,0,.47-.471.47.47,0,0,0-.47-.47Zm13.624-10.329a.942.942,0,0,0-.941.941v7.51a.942.942,0,0,0,.941.941h1.882a.942.942,0,0,0,.941-.941v-7.51a.943.943,0,0,0-.941-.941ZM-3094.551,7a.942.942,0,0,0-.94.941v11.3a.942.942,0,0,0,.94.941h1.882a.942.942,0,0,0,.941-.941V7.941a.942.942,0,0,0-.941-.941Zm-5.646,6.6a.942.942,0,0,0-.94.941v4.693a.942.942,0,0,0,.94.941h1.882a.942.942,0,0,0,.941-.941V14.544a.942.942,0,0,0-.941-.941Z"
                          transform="translate(3480 1794)"
                          fill="#06425c"
                        />
                        <g
                          id="performance-factor-32-2"
                          data-name="performance-factor-32"
                        >
                          <g
                            id="performance-factor-32-3"
                            data-name="performance-factor-32"
                            transform="translate(190)"
                          >
                            <rect
                              id="Rectangle_2114"
                              data-name="Rectangle 2114"
                              width="32"
                              height="32"
                              transform="translate(180 1793)"
                              fill="none"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    {' '}
                    Performance factors
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid item md={12}>
                        <PerformanceFactorList />
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
          )}
          {value == 2 && (
            <TabContainer>
              <>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                    >
                      <g
                        id="performance-matrix-32"
                        transform="translate(-275 -1793)"
                      >
                        <path
                          id="Subtraction_28"
                          data-name="Subtraction 28"
                          d="M-3094.008,29.719a2.577,2.577,0,0,1-1.23-.315l-11.368-6.178A2.692,2.692,0,0,1-3108,20.854V8.868a2.685,2.685,0,0,1,1.392-2.371l11.369-6.183A2.587,2.587,0,0,1-3094.008,0a2.591,2.591,0,0,1,1.23.314l11.368,6.179a2.686,2.686,0,0,1,1.392,2.371V20.851a2.692,2.692,0,0,1-1.391,2.372l-11.369,6.18A2.589,2.589,0,0,1-3094.008,29.719Zm1.966-13.784a1.023,1.023,0,0,0-1.021,1.021v5.021A1.023,1.023,0,0,0-3092.043,23h5.021A1.022,1.022,0,0,0-3086,21.978V16.957a1.022,1.022,0,0,0-1.021-1.021Zm-8.936,0A1.023,1.023,0,0,0-3102,16.957v5.021A1.023,1.023,0,0,0-3100.979,23h5.021a1.022,1.022,0,0,0,1.021-1.021V16.957a1.022,1.022,0,0,0-1.021-1.021ZM-3092.043,7a1.022,1.022,0,0,0-1.021,1.021v5.021a1.023,1.023,0,0,0,1.021,1.021h5.021A1.023,1.023,0,0,0-3086,13.042V8.021A1.022,1.022,0,0,0-3087.022,7Zm-8.936,0A1.022,1.022,0,0,0-3102,8.021v5.021a1.023,1.023,0,0,0,1.022,1.021h5.021a1.022,1.022,0,0,0,1.021-1.021V8.021A1.022,1.022,0,0,0-3095.958,7Z"
                          transform="translate(3385 1794)"
                          fill="#06425c"
                        />
                        <g
                          id="performance-matrix-32-2"
                          data-name="performance-matrix-32"
                          transform="translate(95)"
                        >
                          <rect
                            id="Rectangle_2114"
                            data-name="Rectangle 2114"
                            width="32"
                            height="32"
                            transform="translate(180 1793)"
                            fill="none"
                          />
                        </g>
                      </g>
                    </svg>
                    {' '}
                    Performance matrix
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid item md={12}>
                        <PerformanceMatrixList />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </>
            </TabContainer>
          )}
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
