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


function TabContainer(props) {
  const { children } = props;
  
  return (
    <Typography component="div" style={{ padding: 8 * 3, background: '#fafafa', marginTop: '15px' }}>
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
    backgroundColor: theme.palette.background.paper,
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
});

const Language = [
  {
    value: 'language',
    label: 'Language',
  },
  {
    value: 'language1',
    label: 'Language 1',
  }
];

const DateFormate = [
  {
    value: 'mmddyyyy',
    label: 'MM-DD-YYYY',
  },
  {
    value: 'ddmmyyyy',
    label: 'DD-MM-YYYY',
  }
];
const InterfaceMode = [
  {
    value: 'lighttheme',
    label: 'Light Mode',
  },
  {
    value: 'darktheme',
    label: 'Dark Mode',
  }
];
const IncidentNumberFormat = [
  {
    value: 'incidentnumberformat',
    label: 'Incident Number Format',
  },
  {
    value: 'incidentnumberformat1',
    label: 'Incident Number Format One',
  }
];
const ObservationNumberFormat = [
  {
    value: 'observationnumberformat',
    label: 'Observation Number Format',
  },
  {
    value: 'observationnumberformat1',
    label: 'Observation Number Format One',
  }
];

const FLHANumberFormat = [
  {
    value: 'flhanumberformat',
    label: 'FLHA Number Format',
  },
  {
    value: 'flhanumberformat1',
    label: 'FLHA Number Format One',
  }
];

const JHANumberFormat = [
  {
    value: 'jhanumberformat',
    label: 'JHA Number Format',
  },
  {
    value: 'jhanumberformat1',
    label: 'JHA Number Format One',
  }
];

const AHANumberFormat = [
  {
    value: 'ahanumberformat',
    label: 'AHA Number Format',
  },
  {
    value: 'ahanumberformat1',
    label: 'AHA Number Format One',
  }
];



class Setting extends React.Component {
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
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    const filestwo = this.state.filestwo.map(filestwo => (
      <li key={filestwo.name}>
        {filestwo.name} - {filestwo.size} bytes
      </li>
    ));

    return (
        <PapperBlock title="Settings" icon="ion-md-settings">
        {console.log("sagar")}
            <div className={classes.root}>
                <AppBar position="static" color="white">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="General Settings" icon={<Settings />} />
                        <Tab label="Module Settings" icon={<SettingsApplications  />} />
                        <Tab label="Integrations" icon={<SettingsInputSvideo />} />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                  <>
                    <Grid container spacing={3} className={classes.settingsPageSection}>
                      <Grid item md={12}>
                        <Typography variant="h6" gutterBottom className={classes.tabTitleLabel}>
                         <Settings /> General Settings.
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={5}
                        xs={12}
                      >
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <TextField
                              label="Language"
                              name="language"
                              id="language"
                              select
                              fullWidth
                              variant="outlined"
                            >
                              {Language.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid
                            item
                            md={1}
                            xs={1}
                            className={classes.infoIconBox}
                          >
                            <Tooltip classes={{tooltip: classes.customTooltip}} placement="right-start" arrow title="Choose your default language for user interface">
                              <IconButton>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            
                          </Grid>

                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <TextField
                              label="Date Formate"
                              name="dateformate"
                              id="dateformate"
                              select
                              fullWidth
                              variant="outlined"
                            >
                              {DateFormate.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid
                            item
                            md={1}
                            xs={1}
                            className={classes.infoIconBox}
                          >
                            <Tooltip classes={{tooltip: classes.customTooltip}} placement="right-start" arrow title="Choose your default language for user interface">
                              <IconButton>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            
                          </Grid>

                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <TextField
                              label="Interface Mode"
                              name="interfacemode"
                              id="interfacemode"
                              select
                              fullWidth
                              variant="outlined"
                            >
                              {InterfaceMode.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid
                            item
                            md={1}
                            xs={1}
                            className={classes.infoIconBox}
                          >
                            <Tooltip classes={{tooltip: classes.customTooltip}} placement="right-start" arrow title="Choose your default language for user interface">
                              <IconButton>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            
                          </Grid>

                        </Grid>
                        <Grid
                          item
                          md={12}
                          xs={12}
                        >
                          <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Save</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                  </TabContainer>
                }
                {value === 1 && <TabContainer>
                  <>
                    <Grid container spacing={3} className={classes.settingsPageSection}>
                      <Grid item md={12}>
                        <Typography variant="h6" gutterBottom className={classes.tabTitleLabel}>
                          <SettingsApplications  /> Module Settings.
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={5}
                        xs={12}
                      >
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <TextField
                              label="Incident Number Format"
                              name="incidentnumberfromat"
                              id="incidentnumberfromat"
                              select
                              fullWidth
                              variant="outlined"
                            >
                              {IncidentNumberFormat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid
                            item
                            md={1}
                            xs={1}
                            className={classes.infoIconBox}
                          >
                            <Tooltip classes={{tooltip: classes.customTooltip}} placement="right-start" arrow title="Choose your default language for user interface">
                              <IconButton>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            
                          </Grid>

                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <TextField
                              label="Observation Number Format"
                              name="observationnumberformat"
                              id="observationnumberformat"
                              select
                              fullWidth
                              variant="outlined"
                            >
                              {ObservationNumberFormat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid
                            item
                            md={1}
                            xs={1}
                            className={classes.infoIconBox}
                          >
                            <Tooltip classes={{tooltip: classes.customTooltip}} placement="right-start" arrow title="Choose your default language for user interface">
                              <IconButton>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            
                          </Grid>

                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <Typography variant="h6" gutterBottom className={classes.AttaLabelName}>
                              Observation Pledge Image
                            </Typography>

                            <Dropzone onDrop={this.onDrop}>
                              {({getRootProps, getInputProps}) => (
                                <section className="container">
                                  <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                  </div>
                                  <aside>
                                    {/* <h4>Files</h4> */}
                                    <ul>{files}</ul>
                                  </aside>
                                </section>
                              )}
                            </Dropzone>
                          </Grid>
                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <TextField
                              label="FLHA Number Format"
                              name="flhanumberformat"
                              id="flhanumberformat"
                              select
                              fullWidth
                              variant="outlined"
                            >
                              {FLHANumberFormat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid
                            item
                            md={1}
                            xs={1}
                            className={classes.infoIconBox}
                          >
                            <Tooltip classes={{tooltip: classes.customTooltip}} placement="right-start" arrow title="Choose your default language for user interface">
                              <IconButton>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <Typography variant="h6" gutterBottom className={classes.AttaLabelName}>
                              FLHA Pledge Image
                            </Typography>

                            <Dropzone onDrop={this.onDropTwo}>
                              {({getRootProps, getInputProps}) => (
                                <section className="container">
                                  <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                  </div>
                                  <aside>
                                    {/* <h4>Files</h4> */}
                                    <ul>{filestwo}</ul>
                                  </aside>
                                </section>
                              )}
                            </Dropzone>
                          </Grid>
                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <TextField
                              label="JHA Number Format"
                              name="jhahumberformat"
                              id="jhahumberformat"
                              select
                              fullWidth
                              variant="outlined"
                            >
                              {JHANumberFormat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid
                            item
                            md={1}
                            xs={1}
                            className={classes.infoIconBox}
                          >
                            <Tooltip classes={{tooltip: classes.customTooltip}} placement="right-start" arrow title="Choose your default language for user interface">
                              <IconButton>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          <Grid
                            item
                            md={11}
                            xs={11}
                            className={classes.formBox}
                          >
                            <TextField
                              label="AHA Number Format"
                              name="jhahumberformat"
                              id="jhahumberformat"
                              select
                              fullWidth
                              variant="outlined"
                            >
                              {AHANumberFormat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid
                            item
                            md={1}
                            xs={1}
                            className={classes.infoIconBox}
                          >
                            <Tooltip classes={{tooltip: classes.customTooltip}} placement="right-start" arrow title="Choose your default language for user interface">
                              <IconButton>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          md={12}
                          xs={12}
                        >
                          <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Save</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                  </TabContainer>}

                {value === 2 && <TabContainer>
                  <>
                    <Grid container spacing={3} className={classes.settingsPageSection}>
                      <Grid item md={12}>
                        <Typography variant="h6" gutterBottom className={classes.tabTitleLabel}>
                          <SettingsInputSvideo /> Integrations
                        </Typography>
                      </Grid>
                      <Grid item md={12}>
                        <Typography variant="h6" align="center" gutterBottom className={classes.AttaLabelName}>
                            Coming Soon
                          </Typography>
                      </Grid>
                      
                    </Grid>
                  </>
                  </TabContainer>}
            </div>
        </PapperBlock>
    );
  }
}

Setting.propTypes = {
  classes: PropTypes.object.isRequired,
  classestab: PropTypes.object.isRequired,
};

export default withStyles(styles)(Setting);