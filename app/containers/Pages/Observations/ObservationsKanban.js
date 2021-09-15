import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import FilterBAndWOutlinedIcon from '@material-ui/icons/FilterBAndWOutlined';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import PapperBlock from '../../../components/PapperBlock/PapperBlock';
import CachedIcon from '@material-ui/icons/Cached';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Input from '@material-ui/core/Input';

import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    '& label + .MuiInput-formControl': {
      marginTop: '0px',
      minHeight: '56px',
      borderRadius: '2px',
  },
  },
  paperStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '1300px',
    '& > *': {
      margin: theme.spacing(1),
	    padding: theme.spacing(2),
      width: '18.4%',      
      minHeight: theme.spacing(20),
    },
  },
  formControl: {
    margin: '.5rem 0',
    width: '100%',
  },
  spacerRight: {
    marginRight: '.75rem',
  },
  orangeColor: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
  },
  teelColor: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
  },
  greyColor: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
  },
  greenColor: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
  },
  blueColor: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
  },
  whiteColor: {
    backgroundColor: '#ffffff',
    color: '#ffffff',
  },
  newColor: {
    color: '#a7a7a7',
  },
  paperPad: {
    padding: '.75rem .75rem',
    fontSize: '17px',
  },
  backColor: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
  },
  iconContent: {
    textAlign: 'right',
    float: 'right',
    marginTop: '5px',
    marginLeft: '10px',
  },
  marginTop: {
    marginTop: '.85rem',
    overflowX: 'auto',
  },
  fontSz: {
    fontSize: '30px',
    marginTop: '20px',
    marginLeft: '10px',
  },
  submitedColor: {
    color: '#a8a6a8',
  },
  approvedColor: {
    color: '#ff8533',
  },
  rejectedColor: {
    color: '#e23d14',
  },
  imProgressColor: {
    color: '#00c0ef',
  },
  completedColor: {
    color: '#024c9a',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function KanbanObservation() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (

    <div className={classes.root}>
        <Paper elevation={1}>
          <Grid container spacing={2}>
            <Grid item xs={1 / 3}>
              <FilterBAndWOutlinedIcon className={classes.fontSz} />
            </Grid>
            <Grid item md={2} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Categories</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                className={classes.formControl}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>
            <Grid item md={1} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Status</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                className={classes.formControl}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>
            <Grid item md={2} xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="project-name-label">Full list</InputLabel>
                <Select
                  id=""
                  labelId="project-name-label"
                  label="Project Name"
                >
                  <MenuItem>One</MenuItem>
                  <MenuItem>One</MenuItem>
                  <MenuItem>One</MenuItem>
                </Select>

              </FormControl>
            </Grid>
            <Grid item md={2} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Assignee</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                className={classes.formControl}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>
            <Grid item md={3} xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="project-name-label">Sort by: date descending</InputLabel>
                <Select
                  id=""
                  labelId="project-name-label"
                  label="Project Name"
                >
                  <MenuItem>One</MenuItem>
                  <MenuItem>One</MenuItem>
                  <MenuItem>One</MenuItem>
                </Select>

              </FormControl>
            </Grid>
            <Grid item xs={1 / 2}>
              <CachedIcon className={classes.fontSz} />
              <StarOutlineOutlinedIcon className={classes.fontSz} />
            </Grid>
          </Grid>

        </Paper>

        <Paper elevation={3} className={classes.marginTop}>
          <Grid Container className={classes.paperStyle}>
            <Paper elevation={3} className={classes.greyColor}>
            
            
              <Typography variant="h6" gutterBottom className={classes.paperPad}>
              <FiberManualRecordIcon className={classes.submitedColor} /> Submitted (3)
                {' '}
              <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />  
              </Typography>

              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
            </Paper>
            <Paper elevation={3} className={classes.orangeColor}>
              <Typography variant="h6" gutterBottom className={classes.paperPad}>
              <FiberManualRecordIcon className={classes.approvedColor} /> Approved (3)
                {' '}
                <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />
              </Typography>

              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
            </Paper>
            <Paper elevation={3} className={classes.teelColor}>
              <Typography variant="h6" gutterBottom className={classes.paperPad}>
              <FiberManualRecordIcon className={classes.rejectedColor} /> Rejected (2)
                {' '}
                <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />
              </Typography>

              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
            </Paper>
            <Paper elevation={3} className={classes.blueColor}>
              <Typography variant="h6" gutterBottom className={classes.paperPad}>
              <FiberManualRecordIcon className={classes.imProgressColor} /> In Progress (2)
                {' '}
                <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />
              </Typography>

              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>
            </Paper>
            <Paper elevation={3} className={classes.greenColor}>
              <Typography variant="h6" gutterBottom className={classes.paperPad}>
              <FiberManualRecordIcon className={classes.completedColor} /> Completed (1)
              </Typography>

              <Paper elevation={3} className={classes.WhiteColor}>
                <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Action No.: </span>
                    {' '}
AL-210112-1001
                    {' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Category: </span>
                    {' '}
Technical decisions
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.newColor}>Planned Start Date: </span>
                    {' '}
2021-01-12
                  </Typography>
                </Typography>
              </Paper>

            </Paper>
          </Grid>
        </Paper>
    </div>
  );
}
