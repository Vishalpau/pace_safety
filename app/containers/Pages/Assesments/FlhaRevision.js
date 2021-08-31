import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { withStyles, makeStyles }  from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import BookIcon from '@material-ui/icons/Book';
import CommentIcon from '@material-ui/icons/Comment';
import HistoryIcon from '@material-ui/icons/History';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
import MenuItem from '@material-ui/core/MenuItem';

import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
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
    marginTop: '30px',
  },
  tableHeading: {
    '& tr th': {
      backgroundColor: '#06425c',
      color: '#ffffff',
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
}));

const ActionSummary = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
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

  return (
    <div>

      <PapperBlock title="XFLHA - Revision - 1.1" icon="ion-ios-game-controller-a-outline" desc="">
        <Grid container spacing={1}>
          <Grid item md={12} xs={12}>
            <Paper elevation={0}>
              <Box padding={3} bgcolor="background.paper">

                <Grid container spacing={3} className={classes.mToptewnty}>
                <Grid item md={6} sm={6} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      
                      <InputLabel id="Reason for revision">Reason for revision</InputLabel>
                      <Select
                        id="revision-name"
                        labelId="revision-name-label"
                        label="Reason for revision"
                      >
                        <MenuItem value="Revision">One</MenuItem>
                      </Select>
                      
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      
                      <InputLabel id="Time of revision">Time of revision</InputLabel>
                      <Select
                        id="project-name"
                        labelId="project-name-label"
                        label="Project Name"
                      >
                        <MenuItem value="Time of revision">Time of revision</MenuItem>
                      </Select>
                      
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                  <Typography variant="h6">Preventive controls</Typography>
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        variant="outlined"
                        id="description"
                        label="Task Identification"
                        className={classes.fullWidth}
                      />
                    </Grid>
                  <TableContainer className={classes.mttopThirty}>
                  <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.tableHeading}>
                          <TableRow>
                            <TableCell align="left">Task identification</TableCell>
                            <TableCell align="left">Hazards</TableCell>
                            <TableCell align="left">Controls</TableCell>
                            <TableCell align="left">Risk after control</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                              <TableCell align="left">One every row</TableCell>
                              <TableCell align="left"></TableCell>
                              <TableCell align="left"></TableCell>
                              <TableCell align="left"></TableCell>                              
                            </TableRow>
                        </TableBody>
                      </Table>
                  </TableContainer>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6">Job visual confirmation</Typography>
                    <TableContainer className={classes.mttopThirty}>
                    <Table className={classes.table} style={{ marginTop: '-1rem' }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left" className={classes.tableRowColor}>Visual confirmation</TableCell>
                            <TableCell align="left" className={classes.tableRowColor}>Status</TableCell>
                            <TableCell align="left" className={classes.tableRowColor}>Attachments</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                              <TableCell align="left">Site pictures</TableCell>
                              <TableCell align="left">
                                <div className={classes.spacer}>
                                  <FormControl component="fieldset">
                                      <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                      <FormControlLabel value="No" control={<Radio />} label="No" />
                                      <FormControlLabel value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </div>                               
                              </TableCell>
                              <TableCell align="left"><a href="#">Upload</a></TableCell>                              
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                            <TableCell align="left">Team pictures</TableCell>
                            <TableCell align="left">
                                <div className={classes.spacer}>
                                  <FormControl component="fieldset">
                                      <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                      <FormControlLabel value="No" control={<Radio />} label="No" />
                                      <FormControlLabel value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </div>                               
                              </TableCell>
                              <TableCell align="left"><a href="#">Upload</a></TableCell>                              
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                            <TableCell align="left">Tools and tackles</TableCell>
                            <TableCell align="left">
                                <div className={classes.spacer}>
                                  <FormControl component="fieldset">
                                      <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                      <FormControlLabel value="No" control={<Radio />} label="No" />
                                      <FormControlLabel value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                  </FormControl>
                                </div>                               
                              </TableCell>
                              <TableCell align="left"><a><div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Upload</p>
                                </div>
                                <aside>
                                  {/* <h4>Files</h4> */}
                                  <ul>{files}</ul>
                                </aside></a>
                              </TableCell>                              
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                              <TableCell align="left">Others</TableCell>
                              <TableCell align="left"></TableCell>
                              <TableCell align="left"><a href="#">Upload</a></TableCell>                              
                            </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormLabel component="legend">Actions</FormLabel>
                  
                    <Grid item xs={12} className={classes.formBox}>
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                      <aside>
                        {/* <h4>Files</h4> */}
                        <ul>{files}</ul>
                      </aside>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </PapperBlock>

    </div>
  );
};

export default ActionSummary;
