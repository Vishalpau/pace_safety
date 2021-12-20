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
import CachedIcon from '@material-ui/icons/Cached';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Input from '@material-ui/core/Input';

import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    '& label + .MuiInput-formControl': {
      marginTop: '0px',
      minHeight: '56px',
      borderRadius: '2px',
  },
  },
  paperStyle: {
    // display: 'flex',
    // minWidth: '1300px',
    '& > *': {
      margin: theme.spacing(1),
	    padding: theme.spacing(2),
      width: '21.4%',      
      minHeight: theme.spacing(20),
      display: 'inline',
      minWidth: '280px',
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
  greyColorSubmitted: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
    borderTop: '4px solid #a8a6a8',
  },
  greyColorApproved: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
    borderTop: '4px solid #ff8533',
  },
  greyColorRejected: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
    borderTop: '4px solid #e23d14',
  },
  greyColorInProgress: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
    borderTop: '4px solid #00c0ef',
  },
  greyColorCompleted: {
    backgroundColor: '#e8e8e8',
    color: '#06425c',
    borderTop: '4px solid #024c9a',
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
    color: '#7692A4',
    fontWeight: '400',
  },
  scrollBox: {
    maxHeight: '600px',
    '&:hover':{
      maxHeight: '600px',
      overflowY: 'auto',
      '&::-webkit-scrollbar':{
        width: '10px',
        backgroundColor: '#ccc',
      },
      '&::-webkit-scrollbar-track':{
        backgroundColor: '#06425c',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb':{
        backgroundColor: '#f47607',
        maxHeight: '20px',
        borderRadius: '10px',
      },
    },
  },
  paperPad: {
    padding: '.75rem .75rem',
    fontSize: '17px',
    border: '1px solid #ccc',
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
    overflowX: 'scroll',
    overflowY: 'hidden',
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
  inProgressColor: {
    color: '#00c0ef',
  },
  completedColor: {
    color: '#024c9a',
  },
  gridKanban: {
    width: '320px',
    float: 'Left',
  },
  gridKanbanNext: {
    float: 'Left',
    marginLeft: '16px',
    width: '320px',
  },
  gridScroll: {
    display: '-webkit-box',
  },
  dataColor: {
    fontSize: '14px !important',
    fontFamily: 'Montserrat-Medium !important',
    color: '#666666',
  },
  userImage: {
    borderRadius: '50px',
    width: '48px',
    height: '48px',
    marginRight: '10px',
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

export default function ComplianceKanban() {
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

        <Grid className={classes.marginTop}>
          <div className={classes.gridScroll}>
            <div className={classes.gridKanban}>
              <div className={classes.greyColorSubmitted}>
                <Typography variant="h6" gutterBottom className={classes.paperPad}>
                <FiberManualRecordIcon className={classes.submitedColor} /> Submitted (3)
                  {' '}
                <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />  
                </Typography>
              </div>
              <div className={classes.scrollBox}>
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                    <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                    <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
              </div>  
            </div>
            <div className={classes.gridKanbanNext}>
              <div className={classes.greyColorApproved}>
                <Typography variant="h6" gutterBottom className={classes.paperPad}>
                <FiberManualRecordIcon className={classes.approvedColor} /> Approved (2)
                  {' '}
                <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />  
                </Typography>
              </div>
              <div className={classes.scrollBox}>
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
              </div>  
            </div>
            <div className={classes.gridKanbanNext}>
              <div className={classes.greyColorRejected}>
                <Typography variant="h6" gutterBottom className={classes.paperPad}>
                <FiberManualRecordIcon className={classes.rejectedColor} /> Rejected (2)
                  {' '}
                <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />  
                </Typography>
              </div>
              <div className={classes.scrollBox}>
                
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
              </div>  
            </div>
            <div className={classes.gridKanbanNext}>
              <div className={classes.greyColorInProgress}>
                <Typography variant="h6" gutterBottom className={classes.paperPad}>
                <FiberManualRecordIcon className={classes.inProgressColor} /> In progress (1)
                  {' '}
                <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />  
                </Typography>
              </div>
              <div className={classes.scrollBox}>
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
              </div>  
            </div>
            <div className={classes.gridKanbanNext}>
              <div className={classes.greyColorCompleted}>
                <Typography variant="h6" gutterBottom className={classes.paperPad}>
                <FiberManualRecordIcon className={classes.completedColor} /> Completed (1)
                  {' '}
                <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />  
                </Typography>
              </div>
              <div className={classes.scrollBox}>
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
              </div>  
            </div>
            <div className={classes.gridKanbanNext}>
              <div className={classes.greyColorSubmitted}>
                <Typography variant="h6" gutterBottom className={classes.paperPad}>
                <FiberManualRecordIcon className={classes.submitedColor} /> Other status (1)
                  {' '}
                <DoubleArrowIcon fontSize="medium" className={classes.iconContent} />  
                </Typography>
              </div>
              <div className={classes.scrollBox}>
                <div className={classes.WhiteColor}>
                  <Typography variant="subtitle2" gutterBottom className={classes.paperPad}>
                  <Typography variant="subtitle2">
                     <img src={paceLogoSymbol} className={classes.userImage} /> Admin
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Action No.: </span>
                      {' '}
                        <span className={classes.dataColor}>AL-210112-1001</span>
                      {' '}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Category: </span>
                      {' '}
                        <span className={classes.dataColor}>Technical decisions</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Status: </span>
                      {' '}
                        <span className={classes.dataColor}>XYZ</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Description: </span>
                      {' '}
                        <span className={classes.dataColor}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare in neque id hendrerit. Sed lorem erat, blandit et varius id, commodo at turpis. Duis feugiat felis a tortor tincidunt fermentum. 
                        Vivamus pulvinar elit tristique tellus consequat dapibus vitae ultricies eros.</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      <span className={classes.newColor}>Due date: </span>
                      {' '}
                        <span className={classes.dataColor}>2021-01-12</span>
                    </Typography>
                  </Typography>
                </div>
              </div>  
            </div>
          </div>
          </Grid>  
    </div>
  );
}
