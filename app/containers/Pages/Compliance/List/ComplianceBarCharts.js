import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import Share from '@material-ui/icons/Share';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Incidents from 'dan-styles/IncidentsList.scss';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import MUIDataTable from 'mui-datatables';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';
import completed_small from 'dan-images/completed-small.png';
import in_progress_small from 'dan-images/in_progress_small.png';
import "../../../../styles/custom/customheader.css";
import StarsIcon from '@material-ui/icons/Stars';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { useHistory, useParams } from 'react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BarCharts from './Charts/BarCharts';

const useStyles = makeStyles((theme) => ({
root: {
  flexGrow: 1,
  marginBottom: theme.spacing(4),
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
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create('width'),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '20ch',
  },
},
filterIcon: {
  color: theme.palette.primary.dark,
  fontSize: '1.8rem',
},
toggleTitle: {
  marginRight: theme.spacing(1),
  fontSize: '1rem',
},
chipAction: {
  textAlign: 'right',
},
dataAction: {
  marginRight: theme.spacing(1),
},
actionMargin: {
  marginLeft: '2.5rem',
  lineHeight: '6rem'
},
marginLeft: {
  marginLeft: '2px',
  fontSize: '14px'
},
mLeft: {
  marginLeft: '2px',
},
mLeftR5: {
  marginLeft: '5px',
  marginRight: '15px',
  ['@media (max-width:480px)']: { 
    marginLeft: '3px',
    marginRight: '3px',
  },
},
pLeft5: {
  paddingLeft: '5px',
},
mLeftfont: {
  marginLeft: '2px',
  fontSize: '14px',
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 0.87) !important',
  fontWeight: '500',
  '&:hover':{
    textDecoration: 'none',
  },
},
spacerRight: {
  marginRight: '4px',
},
paddZero: {
  padding: '0px',
},
listingLabelName: {
  color: '#7692a4',
  fontSize: '0.88rem',
  fontFamily: 'Montserrat-Regular',
},
listingLabelValue: {
  color: '#333333',
  fontSize: '0.88rem',
  fontFamily: 'Montserrat-Regular',
  '& a': {
    paddingLeft: '5px',
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: '600',
  },
},
textPrimary: {
  color: '#06425c',
},
dataTableNew: {
  minWidth: '1360px !important',
},

title:  {
  fontSize: '1.25rem',
  fontFamily: 'Montserrat-Regular',
  color: 'rgba(0, 0, 0, 0.87)',
  fontWeight: '500',
  lineHeight: '1.6',
},
pt30: {
  paddingTop: '30px',

},

mTopThirtybtten: {
  marginTop: '0rem',
  float: 'right',
},

TableToolbar: {
  display: 'none',
},
pLTen: {
  marginLeft: '5px',
},
mTtop15: {
  marginTop: '15px',
},
mTtop20: {
  marginTop: '20px',
},
mTtop30: {
  marginTop: '30px',
},
marginTopBottom: {
  marginBottom: '16px',
  borderRadius: '8px',
  ['@media (max-width:800px)']: { 
    paddingTop: '55px',
  },
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
  backgroundColor: '#f7f7f7',
  border: '1px solid #e4e4e4',
  padding: '0px 16px 0px 10px',
  borderRadius: '8px',
},
buttonsNewChild: {
  borderRadius: '5px',
  backgroundColor: '#23343e',
  color: '#ffffff',
},
padd10: {
  padding: '10px 10px 10px 10px',
},
sepHeightTen: {
  borderLeft: '3px solid #cccccc',
  height: '8px',
  verticalAlign: 'middle',
  margin: '15px 15px 15px 8px',
  fontSize: '10px',
  ['@media (max-width:480px)']: { 
    margin: '10px 5px 10px 5px',
  },
},
floatR: {
  float: 'right',
  textTransform: 'capitalize',
  ['@media (max-width:480px)']: { 
    float: 'left',
  },
},
Chip: {
  backgroundColor: '#eaeaea',
  borderRadius: ' 50px',
  paddingRight: '12px',
},
sepHeightOne: {
  borderLeft: '3px solid #cccccc',
  height: '8px',
  verticalAlign: 'middle',
  margin: '15px',
  fontSize: '10px',
},
mright5: {
  marginRight: '5px',
  color: '#a7a7a7',
},
iconColor: {
  color: '#a7a7a7',
},
iconteal: {
  color: '#06425c',
},
listHeadColor: { backgroundColor: '#fafafa', },
marginTopBottom: {
  '& .MuiTypography-h6 .MuiTypography-h5': {
    fontFamily: 'Montserrat-Regular',
  },
  '& .MuiPaper-elevation3': {
    backgroundColor: 'transparent !important',
    boxShadow: 'none',
  },
},
textRight: {
  textAlign: 'right',
  ['@media (max-width:480px)']: { 
    textAlign: 'left',
    padding: '0px 8px 15px 8px !important',
  },
},
userImage: {
  borderRadius: '50px',
  width: '52px',
  height: '50px',
  marginRight: '10px',

},
mrFifteen: {
  marginRight: '15px',
},
card: {
  boxShadow: '0px 0px 2px #ccc',
  borderRadius: '10px',
  marginBottom: '30px',
},

cardLinkAction: {
  width: '100%',
  float: 'left',
  padding: '14px',
  cursor: 'pointer',
  textDecoration: 'none !important',
  ['@media (max-width:800px)']: { 
    paddingTop: '85px',
  }
},
userPictureBox: {
  position: 'absolute',
  right: '0px',
  ['@media (max-width:800px)']: { 
    right: 'auto',
  },
},
cardContentSection: {
  position: 'relative',
},
cardBottomSection: {
  '& p': {
    ['@media (max-width:480px)']: { 
      fontSize: '12px !important',
    },
  },
},
cardActionBottomBox: {
  ['@media (max-width:480px)']: { 
    padding: '8px !important',
  },
},
usrProfileListBox: {
  '& ul': {
    paddingTop: '0px',
    '& li': {
      paddingLeft: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      '& div': {
        '& span': {
          display: 'inline-block',
          float: 'left',
          paddingRight: '14px',
          fontSize: '15px',
          fontWeight: '600',
        },
        '& p': {
          display: 'inline-block',
          float: 'left',
          fontSize: '15px',
        },
      },
    },
  },
},


}));

function ComplianceBarCharts() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
//dialog
const [MyFavopen, setMyFavOpen] = React.useState(false);

const handleMyFavClickOpen = () => {
  setMyFavOpen(true);
};

const handleMyFavClose = () => {
  setMyFavOpen(false);
};  

const [myUserPOpen, setMyUserPOpen] = React.useState(false);

const handleMyUserPClickOpen = () => {
  setMyUserPOpen(true);
};

const handleMyUserPClose = () => {
  setMyUserPOpen(false);
};

const handleSummaryPush = async () => {
  history.push(
    "/app/pages/actions/actionsummary"
  );
};

const classes = useStyles();

  return (
    <>
      <Box>
        
        <Grid className={classes.marginTopBottom}>
            <div className="gridView">
              <Card variant="outlined" className={classes.card}>
                <CardContent>
                  <BarCharts />
                </CardContent>
                <Divider />
              </Card>
            </div>
        </Grid>  
      </Box>
    </>
  );
}

export default ComplianceBarCharts;
