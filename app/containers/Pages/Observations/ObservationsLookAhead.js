import React, { useState } from 'react';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import preplanning from 'dan-images/preplanning.png';
import progress from 'dan-images/progress.png';
import completed from 'dan-images/completed.png';
import classNames from "classnames";
import "../../../styles/custom/customheader.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    // border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: '4px',
  },
  leftSide: {
    flexGrow: 1,
  },
  rightSide: {
    flexGrow: 8,
    textAlign: 'right',
  },
  newIncidentButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  search: {
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  mLeftfont: {
    marginLeft: '2px',
    fontSize: '14px',
    textDecoration: 'underline',
    color: 'rgba(0, 0, 0, 0.87) !important',
  },
  spacerRight: {
    marginRight: '4px',
  },
  paddZero: {
    padding: '0px',
  },
  pLTen : {
    marginLeft: '5px',
  },
  mTtop20 : {
    marginTop: '20px',
  },
  marginTopBottom : {
    marginTop: '16px',
    marginBottom: '16px',
    backgroundColor: '#f3f3f3',
    padding: '16px',
    borderRadius: '8px',
  },
  searchHeaderTop: {
    border: '1px solid #f1f1f1',
    backgroundColor: '#ffffff',
    padding: '0px 16px',
    borderRadius: '5px',
    marginTop: '20px',
  },
  greyBg: {
    backgroundColor: '#f3f3f3',
  },
  AppBarHeader: {
    color: 'inherit',
    backgroundColor: '#ffffff',
    border: '1px solid #e4e4e4',
    padding: '0px 5px 0px 5px',
    borderRadius: '3px',
},
buttonsNewChild: {
  borderRadius: '5px',
  backgroundColor: '#23343e',
  color: '#ffffff',
},
active: {
  backgroundColor: '#f47607',
  borderRadius: '5px',
  color: '#ffffff',
},
activeTwo: {
  backgroundColor: '#f47607',
  borderRadius: '5px',
  color: '#ffffff',
  margin: '0px 10px',
  minWidth: '38px',
  padding: '4px 5px 5px 4px',
},
floatR: {
  float: 'right',
},
sepHeight: {
  borderLeft: '1px solid #cccccc',
  height: '65px',
},
sepHeightTen: {
  borderLeft: '1px solid #cccccc',
  height: '10px',
  verticalAlign:'middle',
},
textCenter: {
  textAlign: 'right',
  verticalAlign: 'middle',
  padding: '16px!important',
},
textLeftone: {
  textAlign: 'left',
  verticalAlign: 'middle',
  padding: '16px!important',
  minWidth: '19% !important',
},
pLtenPRten: {padding: '0px 10px 0px 10px',},
buttonsNewDays: {
  padding: '6px 5px 5px 6px',
  margin: '0px 10px',
  minWidth: '38px',
  backgroundColor: '#ffffff',
  color: '#23343e',
  borderRadius: '0px',
},
}));

function LookAhead() {
  const [incidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);

  const handelView = (e) => {
    setListToggle(false);
  };
  const handelViewTabel = (e) => {
    setListToggle(true);
  };

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const classes = useStyles();

  return (
    <>
      <Box padding={0}>
        <div className={classes.paddZero}>
          <Paper elevation={0}>
              <AppBar position="static" color="transparent" className={classes.AppBarHeader}>
              <Toolbar className={classes.paddZero}>
                <Grid item sm={2} xs={12} className={classes.search}>
                  <Paper elevation={1}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search�"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Paper>
                </Grid>
                <Grid item  sm={5} xs={12} className="toggleViewButtons">
                  <Typography variant="caption" className={classes.toggleTitle} />
                  <Tooltip title="My Observations" aria-label="My Observations">
                    <Button
                      variant="contained"
                      onClick={(e) => handelView(e)}                    
                      color="secondary"
                      className={classes.active}
                      >
                      My Observations
                    </Button>
                  </Tooltip>
                  <Tooltip title="Team's Observations" aria-label="Team's Observations" className={classes.pLTen}>
                    <Button
                      variant="outlined"
                      onClick={(e) => handelViewTabel(e)}
                      color="primary"
                      className={classes.buttonsNewChild}
                      >
                      Team's Observations
                    </Button>
                  </Tooltip>
                  <Tooltip title="Big Picture" aria-label="Big Picture" className={classes.pLTen}>
                    <Button
                      variant="outlined"
                      href="/app/charts/barcharts"
                      color="primary"
                      className={classes.buttonsNewChild}
                      >
                      Big Picture
                    </Button>
                  </Tooltip>
                </Grid>
                    <Grid item sm={3} xs={12} className={classes.textCenter}><img src={preplanning} /><img src={progress} className={classes.pLtenPRten} /><img src={completed} /></Grid>
                    <span item sm={1} xs={1} className={classes.sepHeight}></span>
                    <Grid item sm={2} xs={6} className={classes.textLeftone}>
                      Days: <Button size="medium" variant="contained" className={classes.activeTwo} color="primary">
                            30
                          </Button>
                          <span item xs={1} className={classes.sepHeightTen}></span> 
                          <Button size="medium" variant="contained" className={classes.buttonsNewDays} color="primary">
                            60
                          </Button>
                          <span item xs={1} className={classes.sepHeightTen}></span>
                          <Button size="medium" variant="contained" className={classes.buttonsNewDays} color="primary">
                            90
                          </Button>
                          <span item xs={1} className={classes.sepHeightTen}></span>
                          <Button size="medium" variant="contained" className={classes.buttonsNewDays} color="primary">
                            All
                          </Button>
                  </Grid>
              </Toolbar>
            </AppBar>
          </Paper>
        </div>
      </Box>
    </>
  );
}

export default LookAhead;
