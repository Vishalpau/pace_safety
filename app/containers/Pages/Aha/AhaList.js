import React, { useState } from 'react';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Incidents from 'dan-styles/IncidentsList.scss';
import ViewColumnOutlinedIcon from '@material-ui/icons/ViewColumnOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import MUIDataTable from 'mui-datatables';
import ViewWeekOutlinedIcon from '@material-ui/icons/ViewWeekOutlined';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
  mLeftfont: {
    marginLeft: '2px',
    fontSize: '14px',
    textDecoration: 'underline',
    color: 'rgba(0, 0, 0, 0.87) !important',
  },
}));

function FlhaList() {
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
  
  //   Data for the table view
  const columns = ['Number', 'Type', 'Schedule', 'Status', 'Requested by', 'Submitted date', 'Required date', 'Approved date', 'Approved by'];
const data = [
  ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
  ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
  ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
  ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
  ['FLHA-125-256-251', 'XFLHA', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
];
  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
    search: false,
    download: true,
    viewColumns: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: false,
    selectableRowsOnClick: false,
    viewColumns: false,
    selectableRows: false,
    rowsPerPage: 10,
    page: 0,
  };

  const classes = useStyles();

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Grid component={Paper}>
              <MUIDataTable
                //title="Observations List"
                className="dataTableSectionDesign"
                data={data}
                columns={columns}
                options={options}
                //className="classes.dataTableNew"
              />
              </Grid>
            </TableContainer>
      </Box>
    </>
  );
}

export default FlhaList;
