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
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SelectAllIcon from '@material-ui/icons/SelectAll';

import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import QuestionsForm from './QuestionsForm';
import BulkUploadQuestion from './BulkUploadQuestion';
import QuestionEdit from './QuestionEdit';
import QuestionView from './QuestionView';

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
    border: '0.063rem solid #ccc',
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

function ComplianceQuestionsList() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };
  
  //   Data for the table view
  const columns = [
    {
    name: 'Question ID',
    options: {
        filter: true
    }
    },
    {
    name: 'Questions',
    options: {
        filter: true
    }
    },
    {
    name: 'Response type',
    options: {
        filter: true,
    }
    },
    {
    name: 'Media attachment',
    options: {
        filter: true,
    }
    },
    {
    name: 'Document attachment',
    options: {
        filter: true,
    }
    },
    {
    name: 'Geo location',
    options: {
        filter: true,
    }
    },
    {
    name: 'Actions',
    options: {
        filter: false,
        customBodyRender: (value) => (
          <>
            <IconButton size="small" color="primary" className='tableActionIcons'>
                <MoreVertIcon onClick={handleClickOpen} />
            </IconButton>
            {/* <IconButton size="small" color="primary" className='tableActionIcons'>
              <DeleteIcon />
            </IconButton> */}
          </>
        )
    }
    },

];

  const data = [
    ['1234', 'The question text will come here', 'Risk score', 'Yes', 'Yes', 'Yes'],
    ['1234', 'The question text will come here', 'Risk score', 'Yes', 'Yes', 'Yes'],
    ['1234', 'The question text will come here', 'Risk score', 'Yes', 'Yes', 'Yes'],
    ['1234', 'The question text will come here', 'Risk score', 'Yes', 'Yes', 'Yes'],
    ['1234', 'The question text will come here', 'Risk score', 'Yes', 'Yes', 'Yes'],
    ['1234', 'The question text will come here', 'Risk score', 'Yes', 'Yes', 'Yes'],
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
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
    import: true,
  };

  const [listQuestion, setListQuestion] = useState(true);
  const [newQuestion, setNewQuestion] = useState(false);
  const [bulkUpload, setBulkUpload] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);
  const [viewQuestion, setViewQuestion] = useState(false);

  return (
    <>
      <Grid container spacing={3}>
        <>
          {(() => {
            if (
              listQuestion === true
              || (newQuestion === false
                && bulkUpload === false
                && editQuestion === false
                && viewQuestion === false)
              ) {
              return (
                  <>
                      <Grid item md={12} sm={12} xs={12} align='right' className="paddBRemove">
                        <Tooltip title="New">
                          <Button size="medium" className="marginR5" variant="contained" color="primary"
                            onClick={(e) => {
                              setListQuestion(false);
                              setNewQuestion(true);
                              setBulkUpload(false);
                              setEditQuestion(false);
                              setViewQuestion(false);
                            }}
                          >
                            <AddIcon className="marginR5" /> New
                          </Button>
                        </Tooltip>
                        <Tooltip title="Bulk upload">
                          <Button size="medium" variant="contained"  color="primary" 
                            onClick={(e) => {
                              setListQuestion(false);
                              setNewQuestion(false);
                              setBulkUpload(true);
                              setEditQuestion(false);
                              setViewQuestion(false);
                            }}
                          >
                            <CloudUploadIcon className="marginR5" /> Upload
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        <TableContainer component={Paper}>
                          <Grid component={Paper}>
                            <MUIDataTable
                              //title="Actions List"
                              className="dataTableSectionDesign"
                              data={data}
                              columns={columns}
                              options={options}
                              //className="classes.dataTableNew"
                            />
                            </Grid>
                        </TableContainer>
                      </Grid>
                  </>
              );
            }
            if (newQuestion == true) {
              return (
                  <>
                    <QuestionsForm />
                  </>
              );
            }
            if (bulkUpload == true) {
              return (
                  <>
                    <Grid item xs={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <BulkUploadQuestion />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
              );
            }
            if (editQuestion == true) {
              return (
                  <>
                    <Grid item xs={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <QuestionEdit />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
              )
            }
            if (viewQuestion == true) {
              return (
                  <>
                  <Grid item xs={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <QuestionView />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
              )
            }
          })()}
        </>
          
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <List component="nav" aria-label="main mailbox folders">
              <ListItem 
                button
                onClick={(e) => {
                  setListQuestion(false);
                  setNewQuestion(false);
                  setBulkUpload(false);
                  setEditQuestion(true);
                  setViewQuestion(false);
                  setOpen(false);
                }}
              >
                <ListItemIcon><EditIcon /></ListItemIcon>
                <ListItemText primary="Edit" />
              </ListItem>
              <ListItem
                button
                onClick={(e) => {
                  setListQuestion(false);
                  setNewQuestion(false);
                  setBulkUpload(false);
                  setEditQuestion(false);
                  setViewQuestion(true);
                  setOpen(false);
                }}
              >
                <ListItemIcon><VisibilityIcon /></ListItemIcon>
                <ListItemText primary="View" />
              </ListItem>
              <ListItem
                button
                onClick={(e) => {
                  setOpen(false);
                }}
              >
                <ListItemIcon><DeleteIcon /></ListItemIcon>
                <ListItemText primary="Delete" />
              </ListItem>
            </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ComplianceQuestionsList;
