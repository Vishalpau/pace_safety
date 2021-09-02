import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import { useDropzone } from 'react-dropzone';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Switch from '@material-ui/core/Switch';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

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
  spacer: {
    padding: '.75rem 0',
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
  radioInline: {
    flexDirection: 'row',
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
  widthFl: {
    width: '250px',
  },
  formControlTwo: {
    width: '100%',
  },
  inputTab: {
    display: 'none',
  },
  widthSelect: {
    width: '150px',
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

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

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
                      <Grid item xs={12}><Typography variant="h6">Isolation Control</Typography></Grid>
                      <Grid item xs={12}>
                        <TableContainer>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHeading}>
                              <TableRow>
                                <TableCell align="left">Sr. no.</TableCell>
                                <TableCell align="left">Isolation</TableCell>
                                <TableCell align="left">Tagging condition</TableCell>
                                <TableCell align="left">Verify</TableCell>
                                <TableCell align="left">Complate</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">Isolation</TableCell>
                                <TableCell align="left">Condition</TableCell>
                                <TableCell align="left">
                                  <ImageSearchIcon fontSize="large" />
                                  {' '}
Scanned
                                </TableCell>
                                <TableCell align="left">
                                  <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">Isolation</TableCell>
                                <TableCell align="left">Condition</TableCell>
                                <TableCell align="left">
                                  <ImageSearchIcon fontSize="large" />
Scanned
                                </TableCell>
                                <TableCell align="left">
                                  <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">Isolation</TableCell>
                                <TableCell align="left">Condition</TableCell>
                                <TableCell align="left">
                                  <ImageSearchIcon fontSize="large" />
Verified
                                </TableCell>
                                <TableCell align="left">
                                  <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">Isolation</TableCell>
                                <TableCell align="left">Condition</TableCell>
                                <TableCell align="left"><ImageSearchIcon fontSize="large" /></TableCell>
                                <TableCell align="left">
                                  <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Typography>Is the isolation complete?</Typography>
                        </TableContainer>
                      </Grid>
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
