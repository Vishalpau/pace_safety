import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';

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

  const [checked, setChecked] = React.useState(true);

  return (
    <div>
      <PapperBlock title="XFLHA - Energy Control" icon="ion-ios-create-outline" desc="" color="primary">
        <Paper elevation={3}>
          <Box padding={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant="h6">Identification of energy</Typography></Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.tableHeading}>
                        <TableRow>
                            <TableCell align="left">Check</TableCell>
                            <TableCell align="left">Energy present at my site</TableCell>
                            <TableCell align="left">Control and isolation method</TableCell>
                            <TableCell align="left">Camera</TableCell>
                            <TableCell align="left">Snapshot</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell align="left">
                            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                            </TableCell>   
                            <TableCell align="left">Electrical</TableCell>
                            <TableCell align="left">
                            <TextField
                                variant="outlined"
                                id="immediate-actions"
                                multiline
                                rows="1"
                                label=""
                                className={classes.fullWidth}
                            />
                            </TableCell>
                            <TableCell align="left"><CameraAltIcon /></TableCell>
                            <TableCell align="left"><VisibilityIcon /></TableCell>                          
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                            </TableCell>   
                            <TableCell align="left">Stored</TableCell>
                            <TableCell align="left">
                            <TextField
                                variant="outlined"
                                id="immediate-actions"
                                multiline
                                rows="1"
                                label=""
                                className={classes.fullWidth}
                            />
                            </TableCell>
                            <TableCell align="left"><CameraAltIcon /></TableCell>
                            <TableCell align="left"><VisibilityIcon /></TableCell>                          
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                            </TableCell>   
                            <TableCell align="left">Hydraulic</TableCell>
                            <TableCell align="left">
                            <TextField
                                variant="outlined"
                                id="immediate-actions"
                                multiline
                                rows="1"
                                label=""
                                className={classes.fullWidth}
                            />
                            </TableCell>
                            <TableCell align="left"><CameraAltIcon /></TableCell>
                            <TableCell align="left"><VisibilityIcon /></TableCell>                          
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                            </TableCell>   
                            <TableCell align="left">kinetic</TableCell>
                            <TableCell align="left">
                            <TextField
                                variant="outlined"
                                id="immediate-actions"
                                multiline
                                rows="1"
                                label=""
                                className={classes.fullWidth}
                            />
                            </TableCell>
                            <TableCell align="left"><CameraAltIcon /></TableCell>
                            <TableCell align="left"><VisibilityIcon /></TableCell>                          
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                            </TableCell>   
                            <TableCell align="left">Gravitational</TableCell>
                            <TableCell align="left">
                            <TextField
                                variant="outlined"
                                id="immediate-actions"
                                multiline
                                rows="1"
                                label=""
                                className={classes.fullWidth}
                            />
                            </TableCell>
                            <TableCell align="left"><CameraAltIcon /></TableCell>
                            <TableCell align="left"><VisibilityIcon /></TableCell>                          
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                            </TableCell>   
                            <TableCell align="left">Chemical</TableCell>
                            <TableCell align="left">
                            <TextField
                                variant="outlined"
                                id="immediate-actions"
                                multiline
                                rows="1"
                                label=""
                                className={classes.fullWidth}
                            />
                            </TableCell>
                            <TableCell align="left"><CameraAltIcon /></TableCell>
                            <TableCell align="left"><VisibilityIcon /></TableCell>                          
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                            </TableCell>   
                            <TableCell align="left">Radio active</TableCell>
                            <TableCell align="left">
                            <TextField
                                variant="outlined"
                                id="immediate-actions"
                                multiline
                                rows="1"
                                label=""
                                className={classes.fullWidth}
                            />
                            </TableCell>
                            <TableCell align="left"><CameraAltIcon /></TableCell>
                            <TableCell align="left"><VisibilityIcon /></TableCell>                          
                        </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item md={12} xs={12}>
            <Box marginTop={1}>
                <Button size="medium" variant="contained" color="primary" className={classes.spacerRight}>
                Submit
                </Button>
            </Box>
            </Grid>
            </Grid>
          </Box> 
        </Paper>
      </PapperBlock>
    </div>
  );
};

export default FlhaDetails;
