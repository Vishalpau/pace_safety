import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Print from '@material-ui/icons/Print';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AddIcon from '@material-ui/icons/Add';
import ReorderIcon from '@material-ui/icons/Reorder';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import Share from '@material-ui/icons/Share';
import flhaLogoSymbol from 'dan-images/flhaLogoSymbol.png';
import preplanning from 'dan-images/preplanning.png';
import progress from 'dan-images/progress.png';
import completed from 'dan-images/completed.png';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Incidents from 'dan-styles/IncidentsList.scss';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import CommentIcon from '@material-ui/icons/Comment';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import classNames from 'classnames';
import MUIDataTable from 'mui-datatables';
import Checkbox from '@material-ui/core/Checkbox';
import Fonts from 'dan-styles/Fonts.scss';
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';
import in_progress_small from 'dan-images/in_progress_small.png';
import draft_small from 'dan-images/draft_small.png';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import projectpj from 'dan-images/projectpj.png';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';

import FormLabel from '@material-ui/core/FormLabel';


import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Pagination from '@material-ui/lab/Pagination';
// react-redux
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { projectName, company } from '../../../redux/actions/initialDetails';
import { SELF_API, HEADER_AUTH } from '../../../utils/constants';
import Loader from '../Loader';
import api from '../../../utils/axios';
import StatusFilter from './StatusFilter';
import allPickListDataValue from '../../../utils/Picklist/allPickList';
import { checkACL } from '../../../utils/helper';
import Acl from '../../../components/Error/acl';
import Attachment from '../../Attachment/Attachment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    borderRadius: '4px',
  },
  leftSide: {
    flexGrow: 1,
  },
  viewImageSection: {
    textAlign: 'center',
    '& MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-1': {
      textAlign: 'center',
      minHeight: '100px',
    },
  },
  rightSide: {
    flexGrow: 8,
    textAlign: 'right',
  },
  mb10: { marginBottom: '10px !important' },
  newIncidentButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  search: {
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '97% !important',
    margin: '14px 2px 9px 0px',
    padding: '0px 0px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
    '& .MuiInputBase-root': {
      width: '100%',
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
    color: 'orange',
    fontSize: '18px',
    float: 'right',
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
    cursor: 'pointer',
    '@media (max-width:480px)': {
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
    '&:hover': {
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
  statusCompleted: {
    color: '#024c9a',
    fontSize: '0.88rem',
    fontFamily: 'Montserrat-Regular',
    '& a': {
      paddingLeft: '5px',
      cursor: 'pointer',
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: '600',
    },
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

  title: {
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
    '@media (max-width:800px)': {
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
    backgroundColor: '#ffffff',
    border: '1px solid #e4e4e4',
    padding: '0px 5px 0px 5px',
    borderRadius: '3px',
    marginBottom: '30px',
    boxShadow: '1px 1px 13px #e6e6e6',
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
    '@media (max-width:480px)': {
      margin: '10px 5px 10px 5px',
    },
  },
  floatR: {
    float: 'right',
    textTransform: 'capitalize',
    '@media (max-width:480px)': {
      float: 'left',
    },
  },
  floatRR: {
    float: 'right',
    marginTop: '5px',
    textTransform: 'capitalize',
    '@media (max-width:480px)': {
      float: 'left',
    },
  },

  newIncidentButton: {
    marginTop: '20px',
    marginLeft: '5px',
  },
  mR10: {
    marginRight: '20px',
    float: 'right',
    '& img:hover': {
      borderRadius: '50%',
      boxShadow: '0px 0px 2px 2px #f47607',
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
  },
  textRight: {
    textAlign: 'right',
    '@media (max-width:480px)': {
      textAlign: 'left',
      padding: '0px 8px 15px 8px !important',
    },
  },
  userImage: {
    borderRadius: '50px',
    width: '50px',
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
    '@media (max-width:800px)': {
      paddingTop: '85px',
    }
  },
  userPictureBox: {
    position: 'absolute',
    right: '0px',
    '@media (max-width:800px)': {
      right: 'auto',
    },
  },
  cardContentSection: {
    position: 'relative',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      webkitBoxShadow: '0 1px 5px 2px #f0f0f0',
      boxShadow: '0 1px 5px 2px #f0f0f0',
    },
    '&:hover .MuiGrid-align-items-xs-flex-start': {
      backgroundColor: '#f0f0f0',
    },
  },
  cardBottomSection: {
    '& p': {
      '@media (max-width:480px)': {
        fontSize: '12px !important',
      },
    },
    // '& p': {
    //   ['@media (max-width:375px)']: {
    //     fontSize: '12px !important',
    //   },
    // },
  },
  formControlOwnership: {
    width: '100%',
    marginBottom: '30px',
  },
  cardActionBottomBox: {
    '@media (max-width:480px)': {
      padding: '8px !important',
    },
  },

  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
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
  borderTop: {
    marginTop: '5px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    '& .MuiTypography-h5': {
      fontSize: '1.5rem !important',
      fontFamily: 'Xolonium',
      fontWeight: '400',
      lineHeight: '1.8',
      color: '#23343e',
    },
    textCenter: {
      textAlign: 'right',
      verticalAlign: 'middle',
      margin: '20px 16px 12px 16px!important',
      float: 'right',
    },
  },
  pagination: {
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  viewAttachmentDialog: {
    '& .MuiDialogContent-root': {
      overflowY: 'hidden !important',
      height: '90px !important',

    },
  },
  imageSectionHeight: {
    '& .MuiDialogContent-root': {
      height: '90px !important',
      minHeight: '90px !important',
    },
  },
  viewattch1: {
    padding: '12px 30px',
    backgroundColor: '#8a9299',
    color: '#fff',
    borderRadius: '2px',
    border: '1px solid #fff',
    display: 'inline',
  },
  viewattch2: {
    padding: '12px 8px',
    backgroundColor: '#06425c',
    color: '#fff',
    borderRadius: '2px',
    border: '1px solid #fff',
    display: 'inline',
  },
  plusIcon: {
    fontSize: '32px',
    marginRight: '10px',
    color: '#06425c',
  },
  pL0: {
    paddingLeft: '0px !important',
  },
  minusIcon: {
    fontSize: '32px',
    color: '#06425c',
  },
  popUpButton: {
    paddingRight: '5px',
    marginLeft: '12px',
    '& .MuiDialogActions-root, img': {
      justifyContent: 'flex-start',
    },
  },
  navTabBack: {
    backgroundColor: 'transparent',
    marginTop: '13px',
    '& button': {
      '@media (max-width:480px)': {
        fontSize: '9px',
      },
    },
    '& .MuiTab-root': {
      minWidth: '80px',
      minHeight: '40px',
      paddingLeft: '0px',
    },
    '& .MuiTab-wrapper': {
      display: 'inline',
      textAlign: 'left',
      fontWeight: '600',
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      backgroundColor: '#f47607',
      color: '#ffffff',
    },
    '& .MuiTab-textColorInherit': {
      backgroundColor: '#06425c',
      borderRadius: '5px 5px 5px 5px',
      color: '#ffffff',
      minWidth: '100px',
      marginRight: '6px',
      maxHeight: '40px',
      minHeight: '40px',
      marginLeft: '5px',
      padding: '10px',
      '@media (max-width:480px)': {
        minWidth: 'auto',
        marginLeft: '2px',
        marginRight: '2px',
      },
    },
    '& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
      marginBottom: '3px',
      marginRight: '5px',
    },
  },

  hoverB: {
    '&:hover': {
      backgroundColor: '#f47607 !important',
      opacity: '0.9',
    },
  },
  hoverA: {
    backgroundColor: '#f47607 !important',
    opacity: '0.9',
    '&:hover': {
      backgroundColor: '#f47607 !important',
      opacity: '0.9',
    },
  },
  buckmarkIcon: {
    height: '35px',
    width: '35px',
  },
  searchSetionBox: {
    paddingRight: '0px',
    '@media (max-width:800px)': {
      padding: '0px 12px !important',
    },
    '& .MuiPaper-root': {
      '@media (max-width:800px)': {
        margin: '0px 0px 0px 8px',
      },
    },
  },
  statusIconBox: {
    textAlign: 'center',
    padding: '24px 0px !important',
    '@media (max-width:800px)': {
      padding: '0px 0px 25px 0px !important',
    },
    '@media (max-width:480px)': {
      padding: '12px 0px 25px 16px !important',
      textAlign: 'left',
    },
  },
  buttonsNew: {
    borderRadius: '5px',
    backgroundColor: '#06425c',
    padding: '7px 10px 7px 10px',
    float: 'right',
    '@media (max-width:800px)': {
      marginTop: '0px',
    },
  },
  floatLTabs: {
    float: 'left',
    paddingTop: '10px',
  },
  buttonsNTwo: {
    borderRadius: '5px 5px 5px 5px !important',
    backgroundColor: '#517b8d',
    color: '#ffffff',
    maxHeight: '40px',
    minHeight: '40px',
    opacity: '10',
    '&:hover': {
      backgroundColor: '#f47607',
    }
  },
  topNavTabBack: {
    backgroundColor: 'transparent',
    color: 'black',
    '& .MuiTab-root': {
      minWidth: '80px',
      minHeight: '40px',
      paddingLeft: '0px',
    },
    '& .MuiTab-wrapper': {
      display: 'inline',
      textAlign: 'left',
      fontWeight: '600',
      '&:hover': {
        color: '#f47607 !important',
      },
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      color: '#f47607',
    },
    '& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
      marginBottom: '3px',
      marginRight: '5px',
    },
  },
}));

const styles = theme => ({

});
const handleAttachClose = () => {
  setAttachOpen(false);
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const ILink = withStyles({
  root: {
    display: 'inline-block',
    marginLeft: '.5rem',
    color: 'rgba(0, 0, 0, .85)',
  },
})(Link);

function xflha(props) {
  const [incidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);
  const [flhas, setFlhas] = useState([]);
  const [showFlha, setShowFlha] = useState([]);
  // const [hidden, setHidden] = useState(false);
  const [searchFlha, setSeacrhFlha] = useState('');
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0);
  const [status, setStatus] = useState('');
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [myUserPOpen, setMyUserPOpen] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const [assessments, setAssessments] = useState('My Assessments');
  const [checkDeletePermission, setCheckDeletePermission] = useState(false);
  const [deleteValue, setDeleteValue] = useState("")
  const [deleteQ, setDeleteQ] = useState(false);

  const handleClickDeleteAlert = (value) => {
    setDeleteQ(true);
    setDeleteValue(value);
    // handleDelete(value);
  };

  const handleCloseDeleteAlert = () => {
    setDeleteQ(false);
    setDeleteValue("");
  };

  const dispatch = useDispatch();

  const handleChangeOne = (event, newValue) => {
    setValue(newValue);
  };

  const handleMyUserPClickOpen = () => {
    setMyUserPOpen(true);
  };

  const handleMyUserPClose = () => {
    setMyUserPOpen(false);
  };

  const handleFlhaSummaryPush = async (id) => {
    localStorage.setItem('flhaId', id);
    history.push(
      '/app/pages/assesments/flhasummary/' + id
    );
  };
  // const handleClickOpenAttachment = () => {
  //   setopenAttachment(true);
  // };

  // const handleCloseAttachment = () => {
  //   setopenAttachment(false);
  // };
  const handelView = (e) => {
    setListToggle(false);
  };

  const handelViewTabel = (e) => {
    setListToggle(true);
  };

  const history = useHistory();
  //   Data for the table view
  const columns = ['Number', 'Type', 'Stage', 'Status', 'Requestedby', 'Submitted date', 'Approved date', 'Approved by'];
  const data = [
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
    scroll: true,
    search: false,
    download: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: false,
    selectableRowsOnClick: false,
    viewColumns: false,
    selectableRows: false,
    rowsPerPage: 10,
    page: 0,
    pagination: false,
  };

  const classes = useStyles();
  const createdBy = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).id
    : null;
  const fetchData = async () => {
    await setPage(1);
    const { fkCompanyId } = JSON.parse(localStorage.getItem('company'));
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem('projectName'))
      .projectName.projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem('selectBreakDown')) !== null
        ? JSON.parse(localStorage.getItem('selectBreakDown'))
        : null;
    let struct = '';
    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    if (assessments === 'My Assessments') {
      const res = await api.get(`api/v1/flhas/?search=${searchFlha}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&flhastatus=${status}&createdBy=${createdBy}`);
      const result = res.data.data.results.results;
      await setFlhas(result);

      await setTotalData(res.data.data.results.count);
      await setPageData(res.data.data.results.count / 25);
      const pageCount = Math.ceil(res.data.data.results.count / 25);
      await setPageCount(pageCount);
    } else {
      const res = await api.get(`api/v1/flhas/?search=${searchFlha}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&flhastatus=${status}`);
      const result = res.data.data.results.results;
      await setFlhas(result);
      await setTotalData(res.data.data.results.count);
      await setPageData(res.data.data.results.count / 25);
      const pageCount = Math.ceil(res.data.data.results.count / 25);
      await setPageCount(pageCount);
    }
    await setIsLoading(false);
  };

  let timer;
  const debounce = (fn, v, d) => function () {
    clearTimeout(timer);
    timer = setTimeout(() => setSeacrhFlha(v), d);
  };

  const handleSearch = e => debounce(fetchData, e.target.value.toLowerCase(), 500)();

  // const handleDelete = async (item) => {
  //   console.log(item[1].id)
  //   let data = item[1]
  //   // let id = item[1].id
  //   data.status = "Delete"
  //   delete data.ahaAssessmentAttachment
  //   console.log(data, "!!!!!!!!!")
  //   await setIsLoading(false)
  //   const res1 = await api.put(`/api/v1/flha/${data.id}/`, data).then(response => fetchData()).catch(err => console.log(err))
  // }

  // const handleVisibility = () => {
  //   setAttachOpen(true);
  //   setHidden(!hidden);
  // };
  // const handleAttachClick = () => {
  //   setAttachOpen(!open);
  // };
  // const handleAttachOpen = () => {
  //   if (!hidden) {
  //     setAttachOpen(true);
  //   }
  // };
  // const handleVisibilityComments = () => {
  //   setCommentsOpen(true);
  //   setHiddenn(!hiddenn);
  // };
  // const handleCommentsClick = () => {
  //   setCommentsOpen(!open);
  // };
  // const handleCommentsOpen = () => {
  //   if (!hiddenn) {
  //     setCommentsOpen(true);
  //   }
  // };
  const handleAssment = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setAssessments('My Assessments');
      setStatus('');
    } else if (newValue === 1) {
      setAssessments('Big Picture');
      setStatus('');
    }
  };

  const handleCommentsClose = () => {
    setCommentsOpen(false);
  };
  const handelSearchFlha = async (e) => {
    const allSeacrh = [];
    if (e.target.value.length === 0) {
      await setShowFlha([]);
    } else {
      await setSeacrhFlha(e.target.value.toLowerCase());
      Object.entries(flhas).map((item) => {
        if (item[1].flhaNumber.toLowerCase().includes(searchFlha)) {
          allSeacrh.push([
            item[1].flhaNumber,
            item[1].supervisor,
            item[1].fieldContractor,
            // moment(item[1]["incidentReportedOn"]).format(
            //   "Do MMMM YYYY, h:mm:ss a"
            // ),
            item[1].meetingPoint,
          ]);
        }
      });
      await setShowFlha(allSeacrh);
    }
  };
  const userDetails = async (compId, proId) => {
    // window.location.href = `/${tagetPage}`
    try {
      if (compId) {
        const config = {
          method: 'get',
          url: `${SELF_API}`,
          headers: HEADER_AUTH,
        };
        // localStorage.setItem("loading", JSON.stringify({companyId:compId,projectId:projectId,tagetPage:tagetPage}));

        await api(config)
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              const hosting = response.data.data.results.data.companies.filter(company => company.companyId == compId)[0]
                .subscriptions.filter(subs => subs.appCode === 'safety')[0]
                .hostings[0].apiDomain;

              console.log(hosting);
              const data1 = {
                method: 'get',
                url: `${hosting}/api/v1/core/companies/select/${compId}/`,
                headers: HEADER_AUTH,
              };
              console.log(data1);
              axios(data1).then((res) => {
                localStorage.setItem('userDetails', JSON.stringify(response.data.data.results.data));

                if (compId) {
                  const companies = response.data.data.results.data.companies.filter(item => item.companyId == compId);

                  const companeyData = { fkCompanyId: companies[0].companyId, fkCompanyName: companies[0].companyName };
                  localStorage.setItem('company', JSON.stringify(companeyData));
                  console.log('storage company in xlfha');
                  dispatch(company(companeyData));
                }
                if (proId) {
                  const companies = response.data.data.results.data.companies.filter(item => item.companyId == compId);
                  const project = companies[0].projects.filter(item => item.projectId == proId);

                  localStorage.setItem('projectName', JSON.stringify(project[0]));
                  dispatch(projectName(project[0]));
                }
                // fetchPermissionData();
                localStorage.removeItem('direct_loading');
              });
            }
          })
          .catch((error) => {
          });
      }
    } catch (error) {
    }
  };

  const handleChange = async (event, value) => {
    const { fkCompanyId } = JSON.parse(localStorage.getItem('company'));
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem('projectName'))
      .projectName.projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem('selectBreakDown')) !== null
        ? JSON.parse(localStorage.getItem('selectBreakDown'))
        : null;
    let struct = '';

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    const res = await api.get(`api/v1/flhas/?search=${searchFlha}&companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}`);
    await setFlhas(res.data.data.results.results);
    await setPage(value);
  };

  const handleDelete = async () => {
    // console.log(item);
    // if (checkACL('safety-flha', 'delete_flha')) {
      // const data = {
      //   fkCompanyId: item[1].fkCompanyId,
      //   fkProjectId: item[1].fkProjectId,
      //   jobTitle: item[1].jobTitle,
      //   jobDetails: item[1].jobDetails,
      //   status: 'Delete'
      // };
      setIsLoading(true);

      let temp = {
        fkCompanyId: deleteValue.fkCompanyId,
        fkProjectId: deleteValue.fkProjectId,
        fkProjectStructureIds: deleteValue.fkProjectStructureIds,
        location: deleteValue.location,
        dateTimeFlha: deleteValue.dateTimeFlha,
        permitToWork: deleteValue.permitToWork,
        jobTitle: deleteValue.jobTitle,
        description: deleteValue.description,
        classification: deleteValue.classification,
        createdBy: deleteValue.createdBy,
        jobDetails: deleteValue.jobDetails,
        status: "Delete"
      }
      let id = deleteValue.id;
      const res = await api
        .put(`/api/v1/flhas/${id}/`, temp)
        .then((response) => {
          setIsLoading(false);
          fetchData();
          handleCloseDeleteAlert()
          // setIsLoading(true);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(true);
        })


      // setIsLoading(false);
      // const res1 = await api.put(`/api/v1/flhas/${item[1].id}/`, data)
      //   .then(response => {
      //     console.log(response);
      //     fetchData();
      //   })
      //   .catch(err => console.log(err));
    // }
  };

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem('direct_loading'));
    if (state !== null) {
      userDetails(state.comId, state.proId);
    } else {
      fetchData();
    }
    setCheckDeletePermission(checkACL('safety-flha', 'delete_flha'));
  }, [, props.projectName.breakDown, searchFlha, status, assessments]);

  useEffect(() => {
    allPickListDataValue();
  }, []);

  const AllCardData = (item) => {
    console.log(item, 'itemdddd');
    const [showGrid, setShowGrid] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [hiddenn, setHiddenn] = useState(false);
    // const [openAttachment, setopenAttachment] = React.useState(false);

    function handleVisibility() {
      setShowGrid(true);
      setHidden(!hidden);
    };

    // function handleVisibilityComments() {
    //   setCommentsOpen(true);
    //   setHiddenn(!hiddenn);
    // };

    const handleAttachClose = () => {
      setShowGrid(false);
    };

    const handleAttachClick = () => {
      setShowGrid(!open);
    };

    const handleAttachOpen = () => {
      if (!hidden) {
        setShowGrid(true);
      }
    };

    const handleVisibilityComments = () => {
      setCommentsOpen(true);
      setHiddenn(!hiddenn);
    };

    const handleCommentsClick = () => {
      setCommentsOpen(!open);
    };

    const handleCommentsOpen = () => {
      if (!hiddenn) {
        setCommentsOpen(true);
      }
    };

    return (
      <Box>
        {' '}

        {listToggle == false ? (
          <div>
            <div className="gridView">
              <Box>
                <Grid className={classes.marginTopBottom}>
                  <div className="gridView">
                    <Card variant="outlined" className={classes.card}>
                      <CardContent>
                        <Grid container spacing={3} className={classes.cardContentSection}>
                          <Grid
                            item
                            md={2}
                            sm={4}
                            xs={12}
                            className={classes.userPictureBox}
                          >
                            <Button className={classNames(classes.floatR)} onClick={(e) => handleMyUserPClickOpen(e)}>
                              <img src={item.item[1].avatar !== null ? item.item[1].avatar : paceLogoSymbol} className={classes.userImage} />
                              {' '}
                              {item.item[1].username}
                            </Button>
                          </Grid>
                          <Link
                            onClick={() => handleFlhaSummaryPush(item.item[1].id)}
                            className={classes.cardLinkAction}
                          >
                            <Grid item xs={12}>
                              <Grid container spacing={3} alignItems="flex-start">
                                <Grid item sm={12} xs={12} className={classes.listHeadColor}>
                                  <Grid container spacing={3} alignItems="flex-start">
                                    <Grid item md={10} sm={12} xs={12} className={classes.pr0}>
                                      <Typography
                                        className={classes.title}
                                        variant="h6"
                                      >
                                        {item.item[1].jobTitle}
                                      </Typography>
                                      <Typography
                                        display="inline"
                                        className={classes.listingLabelName}
                                      >
                                        Number:
                                        {' '}
                                        <span>
                                          <Link
                                            href={`/app/pages/assesments/flhasummary/${item.item[1].id}`}
                                            variant="h6"
                                            className={classes.mLeftfont}
                                          >
                                            <span className={classes.listingLabelValue}>{item.item[1].flhaNumber}</span>
                                          </Link>
                                        </span>
                                      </Typography>
                                      <span item xs={1} className={classes.sepHeightOne} />
                                      <Typography
                                        variant="body1"
                                        gutterBottom
                                        display="inline"
                                        color="textPrimary"
                                        className={classes.listingLabelName}
                                      >
                                        Category:
                                        {' '}
                                        <span className={classes.listingLabelValue}>FLHA</span>
                                      </Typography>
                                      <span item xs={1} className={classes.sepHeightOne} />
                                      <Typography
                                        variant="body1"
                                        gutterBottom
                                        display="inline"
                                        color="textPrimary"
                                        className={classes.listingLabelName}
                                      >
                                        {/* Assignee: <span className={classes.listingLabelValue}>NA</span>
                                        <span item xs={1} className={classes.sepHeightOne}></span> */}
                                        Stage:
                                        {' '}
                                        <span className={classes.listingLabelValue}>
                                          {item.item[1].flhaStage}
                                          {' '}
                                          <img src={draft_small} className={classes.smallImage} />
                                        </span>
                                        <span item xs={1} className={classes.sepHeightOne} />
                                        Status:
                                        {' '}
                                        <span className="listingLabelValue statusColor_complete">{item.item[1].flhaStatus}</span>
                                      </Typography>

                                    </Grid>

                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item sm={12} xs={12}>
                              <Grid container spacing={3}>
                                {/* <Grid item md={3} sm={6} xs={12}>
                                  <Typography
                                    variant="body1"
                                    gutterBottom
                                    color="textPrimary"
                                    className={classes.listingLabelName}
                                  >
                                    Type:
                                  </Typography>

                                  <Typography
                                    gutterBottom
                                    className={classes.listingLabelValue}
                                  > */}
                                {/* {item[1]["incidentReportedByName"]} */}
                                {/* Not found
                                  </Typography>
                                </Grid> */}
                                {/* <Grid item md={3} sm={6} xs={12}>
                                  <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    gutterBottom
                                    className={classes.listingLabelName}
                                  >
                                    Location:
                                  </Typography>
                                  <Typography

                                    className={classes.listingLabelValue}
                                  >
                                    {item[1].location}
                                  </Typography>
                                </Grid> */}

                                <Grid item md={3} sm={6} xs={12}>
                                  <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    gutterBottom
                                    className={classes.listingLabelName}
                                  >
                                    Created on:
                                  </Typography>

                                  <Typography

                                    className={classes.listingLabelValue}
                                  >
                                    {moment(item.item[1].createdAt).format(
                                      'Do MMMM YYYY, h:mm:ss a'
                                    )}
                                  </Typography>
                                </Grid>

                                <Grid item md={3} sm={6} xs={12}>
                                  <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    gutterBottom
                                    className={classes.listingLabelName}
                                  >
                                    Created by:
                                  </Typography>

                                  <Typography

                                    className={classes.listingLabelValue}
                                  >
                                    {item.item[1].createdByName}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Link>
                        </Grid>
                      </CardContent>
                      <Divider />
                      <CardActions className={Incidents.cardActions}>
                        <Grid
                          container
                          spacing={2}
                          justify="flex-end"
                          alignItems="left"
                        >
                          <Grid item xs={12} md={5} sm={12} className={classes.pt15}>
                            <Typography
                              variant="body1"
                              display="inline"
                              color="textPrimary"

                            >
                              <AttachmentIcon className={classes.mright5} />
                              Attachments:
                            </Typography>
                            <Typography variant="body2" display="inline">
                              <span>
                                <Link
                                  // href="#"
                                  onClick={item.item[1].attachmentCount && handleVisibility}
                                  color="secondary"
                                  aria-haspopup="true"
                                  className={classes.mLeftR5}
                                >
                                  {item.item[1].attachmentCount}
                                </Link>
                              </span>
                            </Typography>
                            {/* <Grid item xs={12} md={7} md={7} sm={12} className={classes.textRight}> */}

                            {/* </Grid> */}
                            {/* <span item xs={1} className={classes.sepHeightTen}></span>
                            <Typography
                              variant="body1"
                              display="inline"
                              color="textPrimary"
                              className={classes.mLeft}
                            >
                              <InsertCommentOutlinedIcon className={classes.mright5} />

                              Comments:

                            </Typography> */}
                            {/* <Typography variant="body2" display="inline" className={classes.mLeft}>
                              <span>
                                <Link href="#"
                                  color="secondary"
                                  aria-haspopup="true"
                                  className={classes.mLeft}>
                                  {item[1].commentsCount}
                                </Link>
                              </span>
                            </Typography> */}
                          </Grid>

                          <Grid item xs={12} md={7} sm={12} className={classes.textRight}>
                            <div className={classes.floatR}>
                              <Typography variant="body1" display="inline">
                                {!checkDeletePermission
                                  ? (
                                    <DeleteForeverOutlinedIcon
                                      className={classes.iconteal}
                                      style={{
                                        color: '#c0c0c0',
                                        cursor: 'not-allowed'
                                      }}
                                    />
                                  )
                                  : (
                                    <Link
                                      href="#"
                                      className={classes.mLeftR5}
                                    >
                                      <DeleteForeverOutlinedIcon
                                        className={classes.iconteal}
                                        onClick={(e) => handleClickDeleteAlert(item.item[1])}

                                      />
                                    </Link>
                                  )}
                              </Typography>
                              {/* <Typography variant="body1" display="inline">
          <WifiTetheringIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Network View</Link>
          </Typography>
          <span item xs={1} className={classes.sepHeightTen}></span> */}
                              {/* <Typography variant="body1" display="inline">
                                <PrintOutlinedIcon className={classes.iconColor} /> <Link href="/app/pages/general-observation-prints" className={classes.mLeftR5}>Print</Link>
                              </Typography>
                              <span item xs={1} className={classes.sepHeightTen}></span>
                              <Typography variant="body1" display="inline"><Link href="#" className={classes.mLeftR5}><StarsIcon className={classes.iconteal} /></Link>
                              </Typography> */}
                              {/* <span item xs={1} className={classes.sepHeightTen}></span>
                              <Typography variant="body1" display="inline">
                                <Link href="#" className={classes.mLeftR5}><DeleteForeverOutlinedIcon className={classes.iconteal} onClick={(e) => handleDelete(item)} /></Link>
                              </Typography> */}
                            </div>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                    {item.item[1].attachmentCount ?
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        hidden={!hidden}
                        onBlur={handleAttachClose}
                        onClick={handleAttachClick}
                        onClose={handleAttachClose}
                        onFocus={handleAttachOpen}
                        onMouseEnter={handleAttachOpen}
                        onMouseLeave={handleAttachClose}
                        open={showGrid}
                        className="paddTBRemove attactmentShowSection"
                      >
                        <Paper elevation={1} className="cardSectionBottom">
                          <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12}>
                              <List>
                                <ListItem>
                                  <Grid
                                    item
                                    md={12}
                                    sm={12}
                                    xs={12}
                                  >
                                    <div className="attachFileThumb">
                                      <Attachment src={item.item[1].attachment} value={item.item[1].attachment} />
                                    </div>
                                  </Grid>
                                </ListItem>
                              </List>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      : ""
                    }
                  </div>
                  <div>
                    <Grid
                      item
                      md={12}
                      sm={12}
                      xs={12}
                      hidden={!hiddenn}
                      onBlur={handleCommentsClose}
                      onClick={handleCommentsClick}
                      onClose={handleCommentsClose}
                      onFocus={handleCommentsOpen}
                      onMouseEnter={handleCommentsOpen}
                      onMouseLeave={handleCommentsClose}
                      open={commentsOpen}
                      className="commentsShowSection"
                    >
                      <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                          <Grid item md={12} xs={12}>
                            <Box padding={3}>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <TextField
                                    multiline
                                    variant="outlined"
                                    rows="1"
                                    id="JobTitle"
                                    label="Add your comments here"
                                    className="formControl"
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <input type="file" />
                                </Grid>
                                <Grid item xs={9}>
                                  <AddCircleOutlineIcon className={classes.plusIcon} />
                                  <RemoveCircleOutlineIcon className={classes.minusIcon} />
                                </Grid>
                                <Grid item xs={12}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className="spacerRight buttonStyle"
                                    disableElevation

                                  >
                                    Respond
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    className="buttonStyle custmCancelBtn"
                                    disableElevation

                                  >
                                    Cancel
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </div>

                </Grid>
              </Box>
            </div>

            <div className="gridView">
              {Object.entries(incidents).map((item, index) => (
                <Card variant="outlined" className={Incidents.card} key={index}>
                  {/* <CardHeader disableTypography title="Incident with No Injury" /> */}
                  <CardContent>
                    {/* {console.log(item[index].incidentTitle)} */}
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3} alignItems="flex-start">
                          <Grid item xs={9} className={classes.chipAction}>
                            <Chip
                              avatar={<Avatar src="/images/pp_boy.svg" />}
                              label={item[1].username}
                            />
                          </Grid>
                          <Grid item md={3} sm={6} xs={12}>
                            <Typography>
                              Work fell down in site
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <div className={Incidents.statusRow}>
                          <Typography

                            display="inline"
                            className={classes.listingLabelName}
                          >
                            Number
                            {''}
                            <Link
                              href="/app/ActionSummary"
                              variant="subtitle"
                              className={Incidents.incidentNumber}
                              style={{ textDecoration: 'underline' }}
                            >
                              {item[1].flhaNumber}
                            </Link>
                          </Typography>

                          <Chip
                            variant="outlined"
                            label={item[1].flhaStage}
                            color="primary"
                            size="small"
                          />

                          <Typography
                            variant="body1"
                            // color="textSecondary"
                            display="inline"
                          >

                            <i className="ion-ios-calendar-outline" />
                            <span className={Incidents.dateValue}>
                              24 june 2021
                            </span>
                          </Typography>
                        </div>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography

                          gutterBottom
                          className={classes.listingLabelName}
                        >
                          Type
                        </Typography>

                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.listingLabelValue}
                        >
                          Not found
                        </Typography>
                      </Grid>
                      <Grid item md={3} sm={6} xs={12}>
                        <Typography

                          gutterBottom
                          className={classes.listingLabelName}
                        >
                          Location
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.listingLabelValue}
                        >
                          Delhi
                        </Typography>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          gutterBottom
                          className={classes.listingLabelName}
                        >
                          Reported on
                        </Typography>

                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.listingLabelValue}
                        >
                          24 june 2021
                        </Typography>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          gutterBottom
                          className={classes.listingLabelName}
                        >
                          Reported By
                        </Typography>

                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.listingLabelValue}
                        >
                          Person
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions className={Incidents.cardActions}>
                    <Grid
                      container
                      spacing={2}
                      justify="flex-end"
                      alignItems="center"
                    >
                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          variant="body2"
                          display="inline"
                          className={Incidents.actionsLabel}
                        >
                          <AttachmentIcon />
                          {' '}
                          Comments:
                        </Typography>
                        <Typography variant="body2" display="inline" className={classes.mLeft}>
                          <Link href="#">3</Link>
                        </Typography>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          variant="body2"
                          display="inline"
                          className={Incidents.actionsLabel}
                        >
                          <AttachmentIcon />
                          {' '}
                          Actions:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          <Link href="#" className={classes.mLeft}>3</Link>
                        </Typography>
                      </Grid>
                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          variant="body2"
                          display="inline"
                          className={Incidents.actionsLabel}
                        >
                          <AttachmentIcon />
                          {' '}
                          Evidences:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          <Link href="#" className={classes.mLeft}>3</Link>
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={6} md={3} lg={3}>
    <Typography
      variant="body2"
      display="inline"
      className={Incidents.actionsLabel}
    >
      <InfoIcon /> Status:
    </Typography>
    <Typography
      variant="body2"
      display="inline"
      color="textSecondary"
      className={Type.statusHighlight}
    >
     Initial Action
    </Typography>
  </Grid> */}
                      {/* <Grid item md={3} sm={6} xs={12}>
                    <Button
                      size="small"
                      color="secondary"
                      startIcon={<Print />}
                      className={Incidents.actionButton}
                    >
                      Print
                    </Button>
                  </Grid>

                  <Grid item md={3} sm={6} xs={12}>
                    <Button
                      size="small"
                      color="secondary"
                      startIcon={<Share />}
                      className={Incidents.actionButton}
                    >
                      Share
                    </Button>
                  </Grid> */}
                    </Grid>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        )
          : (
            <Box>
              <TableContainer component={Paper}>
                <Grid component={Paper}>
                  <MUIDataTable
                    className="dataTableSectionDesign"
                    title="FLHA's"
                    data={Object.entries(flhas).map((item) => [

                      item[1].flhaNumber,
                      item[1].jobTitle,
                      item[1].flhaStage,
                      item[1].flhaStatus,
                      item[1].createdByName,
                      // item[1].dateTimeFlha,
                      moment(item[1].createdAt).format(
                        'Do MMMM YYYY'
                      ),
                      item[1].closedDate !== null ? moment(item[1].closedDate).format(
                        'Do MMMM YYYY'
                      ) : '-',
                      item[1].closedByName ? item[1].closedByName : '-',

                    ])}
                    columns={columns}
                    options={options}
                  />
                </Grid>
              </TableContainer>
            </Box>
          )}

      </Box>
    )
  }


  return (
    <Acl
      module="safety-flha"
      action="view_flha"
      html={(
        <div>
          <Grid item sm={12} xs={12} className={classes.borderTop}>

            <Grid container spacing={3}>
              <Grid item md={7} sm={6} xs={12} className="mainPageTitleBox">
                <img src={flhaLogoSymbol} className={classes.attachImg} alt="decoration" />
                <span className="customDropdownPageFlhaIcon assessmentPageIcon" />
                <Typography variant="h5">Field Level Hazard Assessment</Typography>
              </Grid>
              <Grid item md={5} sm={6} xs={12}>
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  className={classNames(classes.buttonsNew, classes.floatR)}
                  onClick={() => history.push('/app/pages/assesments/flhaadd')}
                  style={{
                    background: checkACL('safety-flha', 'add_flha') ? '#06425c' : '#c0c0c0',
                    cursor: checkACL('safety-flha', 'add_flha') ? 'pointer' : 'not-allowed'
                  }}
                >
                  <AddIcon className={classes.floatR} />
                  {' '}
                  Add new
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item sm={6} xs={12} className={classes.listViewTab}>
              <AppBar position="static" className={classes.topNavTabBack}>
                <div className={classes.floatLTabs}>
                  <Tabs className={classes.minwdTab} value={value} onChange={fetchData} aria-label="Tabs" indicatorColor="none">
                    <Tab label="Card" {...a11yProps(0)} icon={<DashboardIcon className={classNames(classes.pL0)} />} onClick={(e) => handelView(e)} />
                    <Tab label="List" {...a11yProps(1)} icon={<ReorderIcon />} classNames={classes.pLTen} onClick={(e) => handelViewTabel(e)} />
                    {/* <Tab label="Kanban" {...a11yProps(2)} icon={<ViewWeekIcon classNames={classes.pLTen} />} />
          <Tab label="Trend" {...a11yProps(3)} icon={<EqualizerIcon classNames={classes.pLTen} />} /> */}
                  </Tabs>
                </div>
              </AppBar>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.iplnGisDSection}>
              <Grid className={classes.Lheight}>
                <div className={classes.floatRR}>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12} className={classes.AppBarHeader}>
            <Grid container spacing={3}>
              <Grid item md={7} sm={12} xs={12}>
                <AppBar position="static" className={classes.navTabBack}>
                  <div className={classes.floatL}>
                    <Tabs className={classes.minwdTab} value={value} onChange={handleAssment} aria-label="Tabs" indicatorColor="none">
                      <Tab label="My Assessments" {...a11yProps(3)} className={classes.hoverA} />
                      {/* <Tab label="Team's Assessments" {...a11yProps(1)} className={classes.hoverB} /> */}
                      <Tab label="Big Picture" {...a11yProps(4)} className={classes.hoverB} />
                      {/* <Tab icon={<StarsIcon className={classes.buckmarkIcon} />} {...a11yProps(3)} className={classNames(classes.hoverB, classes.minWd55)} /> */}
                    </Tabs>
                  </div>
                </AppBar>
              </Grid>
              <Grid item md={3} sm={6} xs={12} className={classes.searchSetionBox}>
                <div className={classes.search}>
                  <Paper elevation={1}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={(e) => handleSearch(e)}
                    />
                  </Paper>
                </div>
              </Grid>
              <Grid item md={2} sm={6} xs={12} className={classes.statusIconBox}>
                <span className={classes.mR10}>
                  <img src={preplanning} onClick={() => setStatus('Open')} />
                  <img src={completed} onClick={() => setStatus('Closed')} />
                </span>
              </Grid>
            </Grid>
          </Grid>

          <Box>
            {' '}
            {Object.entries(flhas).length > 0 ?
              Object.entries(flhas)
                .map((item, index) => (
                  <AllCardData item={item} index={index} />
                ))
              :
              <p>Sorry, no matching records found</p>
            }
          </Box>
          <Dialog
            open={myUserPOpen}
            onClose={handleMyUserPClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle classNames={classes.mb10} id="alert-dialog-title">
              <img src={paceLogoSymbol} className={classes.userImage} />
              {' '}
              {'Admin'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.usrProfileListBox}
                >
                  <h6>Change ownership</h6>
                  <FormControl variant="outlined" className={classes.formControlOwnership}>
                    <InputLabel id="demo-simple-select-outlined-label">Ownership</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value="Ashutosh"
                      onChange={handleChangeOne}
                      label="Ownership"
                    >
                      <MenuItem value={10}>Self</MenuItem>
                      <MenuItem value={10}>Prakash</MenuItem>
                      <MenuItem value={20}>Ashutosh</MenuItem>
                      <MenuItem value={30}>Saddam</MenuItem>
                      <MenuItem value={30}>Sunil</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.usrProfileListBox}
                >
                  <h3>Basic information</h3>
                  <List>
                    <ListItem>
                      {/* <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar> */}
                      <ListItemText primary="Full Name:" secondary="Prakash" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Organization Type:" secondary="Epc ORGANIZATION" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Organization Role:" secondary="N/A" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Role Title:" secondary="N/A" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Current Location:" secondary="Delhi » NCT » India" />
                    </ListItem>
                  </List>
                </Grid>

                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.usrProfileListBox}
                >
                  <h3>Company information</h3>
                  <List>
                    <ListItem>
                      <ListItemText primary="Company Name:" secondary="JWIL" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Location:" secondary="Italy" />
                    </ListItem>
                  </List>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <Grid item md={12} sm={12} xs={12} className={classes.popUpButton}>
              <DialogActions align="left" className="marginB10">
                <Button onClick={handleMyUserPClose} color="secondary" variant="contained" className="buttonStyle custmCancelBtn">
                  Close
                </Button>
              </DialogActions>
            </Grid>
            {/* <DialogActions>
      <Button onClick={handleMyUserPClose} className="buttonStyle custmCancelBtn" variant="contained" autoFocus>
        Close
      </Button>
    </DialogActions> */}
          </Dialog>
          <Dialog
            open={deleteQ}
            onClose={handleCloseDeleteAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <FormControl component="fieldset">
                      <FormLabel component="legend" className="checkRadioLabel">Are you sure you want to delete this question?</FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} className={classes.popUpButton}>
                    <Button color="primary" variant="contained" className="spacerRight buttonStyle" onClick={() => handleDelete()}>
                      Yes
                    </Button>
                    <Button color="secondary" variant="contained" className="buttonStyle custmCancelBtn" onClick={() => handleCloseDeleteAlert()}>
                      No
                    </Button>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <div className={classes.pagination}>
            {totalData != 0 ? Number.isInteger(pageData) !== true ? totalData < 25 * page ? `${page * 25 - 24} - ${totalData} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : null}
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </div>
        </div>
      )}
    />
  );
}

// export default Actions;
const mapStateToProps = state => ({
  projectName: state.getIn(['InitialDetailsReducer']),
  todoIncomplete: state

});

export default connect(mapStateToProps, null)(xflha);
