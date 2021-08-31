import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookIcon from '@material-ui/icons/Book';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import { useDropzone } from 'react-dropzone';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import pledgebanner from 'dan-images/pledgebanner.jpg';

const useStyles = makeStyles((theme) => ({

  spacer: {
    padding: '.75rem 0',
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
  mtTen: {
    marginTop: '7px',
  },
  mrTen: {
    marginRight: '15px',
    width: '98%',
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
}));
// Top 100 films as rated by IMDb users.
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
];
const FlhaDetails = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [showRadioUnplanned, setRadioUnplanned] = React.useState(false);
  const onClick = () => setRadioUnplanned(true);

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
      <PapperBlock title="XFLHA - Initial Assessment" icon="ion-ios-create-outline" desc="" color="primary">
        <Paper elevation={3}>
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <Box padding={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Preventive controls</Typography>
                      </Grid>

                      <Grid item xs={12}>

                        <Grid item xs={12}>
                          <TextField
                            multiline
                            variant="outlined"
                            id="description"
                            label="Task identification"
                            className={classes.fullWidth}
                          />
                        </Grid>
                        <TableContainer className={classes.mttopThirty}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHeading}>
                              <TableRow>
                                <TableCell align="left" className={classes.widthFl}>Hazards</TableCell>
                                <TableCell align="left">Controls</TableCell>
                                <TableCell align="left">Risk after control</TableCell>
                                <TableCell align="left" />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="left" className={classes.widthFl}>
                                  <FormControl>
                  <Select
                                      id="revision-name"
                                      labelId="revision-name-label"
                                      label="Reason for revision"
                                      className={classes.widthSelect}
                                    >
                                      <MenuItem value="Revision">One</MenuItem>
                                    </Select>
                </FormControl>
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                  multiline
                  variant="outlined"
                  id="description"

                  className={classes.fullWidth}
                />
                                </TableCell>
                                <TableCell align="left">
                                  <FormControl>
                  <Select
                                      id="revision-name"
                                      labelId="revision-name-label"
                                      label="Reason for revision"
                                      className={classes.widthSelect}
                                    >
                                      <MenuItem value="Revision">One</MenuItem>
                                    </Select>
                </FormControl>
                                </TableCell>
                                <TableCell align="left"><DeleteIcon /></TableCell>
                              </TableRow>

                            </TableBody>
                          </Table>
                          <Typography>
                            <AddIcon />
                            {' '}
Add new hazard
                          </Typography>
                        </TableContainer>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Grid item md={12} xs={12}>
                          <Typography variant="caption" display="block" gutterBottom>
              If the risk after controls are still greater than "Low", it is recommended to consider additional controls
                          </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography variant="h6">
                            <AddIcon />
                            {' '}
Add another task
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>

                      <TableContainer className={classes.mttopThirty}>
                        <Typography variant="h6">Job visual confirmation</Typography>

                        <Table className={classes.table} aria-label="simple table">
                          <TableHead className={classes.tableHeading}>
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
                              <TableCell align="left">
                                <input accept="image/*" className={classes.inputTab} id="icon-button-file" name="avatar" type="file" />
                                <label htmlFor="icon-button-file">
                                  <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AttachmentIcon />
                                  </IconButton>
                                </label>
                              </TableCell>
                            </TableRow>
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
                              <TableCell align="left">
                                <input accept="image/*" className={classes.inputTab} id="icon-button-file" name="avatar" type="file" />
                                <label htmlFor="icon-button-file">
                                  <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AttachmentIcon />
                                  </IconButton>
                                </label>
                              </TableCell>
                            </TableRow>
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
                              <TableCell align="left">
                                <input accept="image/*" className={classes.inputTab} id="icon-button-file" name="avatar" type="file" />
                                <label htmlFor="icon-button-file">
                                  <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AttachmentIcon />
                                  </IconButton>
                                </label>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">Others</TableCell>
                              <TableCell align="left" />
                              <TableCell align="left">
                                <input accept="image/*" className={classes.inputTab} id="icon-button-file" name="avatar" type="file" />
                                <label htmlFor="icon-button-file">
                                  <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AttachmentIcon />
                                  </IconButton>
                                </label>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid marginTop={4}>
                      <div className={classes.spacer}>
                        <FormControl component="fieldset">
                          <RadioGroup className={classes.radioInline} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="Yes" control={<Radio />} label="I Accept &amp; Pledge" />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <Grid item xs={12}>
                        <img src={pledgebanner} alt="decoration" />
                      </Grid>

                    </Grid>
                    <Grid marginTop={4} className={classes.mttopThirty}>
                      <Button size="medium" variant="contained" color="primary" className={classes.spacerRight}>
              Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

              </Box>

            </Grid>
            <Grid item md={3} xs={12}>
              <div className={classes.root}>
                <Box padding={3} bgcolor="background.paper">
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem
                      className={classes.borderCategory}
                      button
                    >
                      <ListItemIcon>
                        <DoubleArrowIcon />
                      </ListItemIcon>
                      <Link
                        href="/app/pages/assesments/FlhaEdit"
                        variant="subtitle"
                      >
                        <ListItemText primary="Job details" />
                      </Link>
                    </ListItem>
                    <ListItem
                      button
                    >
                      <ListItemIcon>
                        <RemoveCircleOutlinedIcon />
                      </ListItemIcon>
                      <Link
                        href="/app/pages/assesments/FlhaEdit"
                        variant="subtitle"
                      >
                        <ListItemText primary="Preventive controls" />
                      </Link>
                    </ListItem>

                  </List>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </PapperBlock>
    </div>
  );
};

export default FlhaDetails;
