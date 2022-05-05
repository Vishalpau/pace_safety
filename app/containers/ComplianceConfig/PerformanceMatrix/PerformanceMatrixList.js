import React, { useState, Fragment, useEffect } from "react";
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
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';

// import QuestionsForm from './QuestionsForm';
// import BulkUploadQuestion from './BulkUploadQuestion';
// import QuestionEdit from './QuestionEdit';
// import QuestionView from './QuestionView';
import { useHistory, useParams } from 'react-router';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import api from "../../../utils/axios";
import Loader from "../../Pages/Loader";
import Pagination from '@material-ui/lab/Pagination';

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
  pagination: {
    padding: "0px 0px 20px 0px",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: '12px',
  },
}));

function PerformanceMatrixList() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [deleteQ, setDeleteQ] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0)
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("");

 // for delete alert msg box
  const handleClickDeleteAlert = (e, columnValue) => {
    let data = {}
    for (let i = 0; i < allMatrixData.length; i++) {
      if (allMatrixData[i].id === columnValue.rowData[0]) {
        data = allMatrixData[i]
      }
    }
    setMatrixIdData(data)
    setDeleteQ(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    // for close alert box of delete
  const handleCloseDeleteAlert = () => {
    setDeleteQ(false);
  };

  //   Data for the table view
  const columns = [
    {
      name: 'Matrix ID',
      options: {
        filter: true
      }
    }, {
      name: 'Matrix constant',
      options: {
        filter: true
      }
    },
    {
      name: 'Matrix constant name',
      options: {
        filter: true
      }
    },
    {
      name: 'Matrix constant color',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <span className='colorBox' style={{ backgroundColor: "#cccccc" }}>{tableMeta.rowData[3]}</span>
          </>
        )
      }
    },
    {
      name: 'Status',
      options: {
        filter: true,
      }
    },
    {
      name: '	Action',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <IconButton size="small" color="primary" className='tableActionIcons' onClick={(e) => handlePerformanceMatrixEditPush(e, tableMeta)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="primary" className='tableActionIcons' onClick={(e) => handleClickDeleteAlert(e, tableMeta)}>
              <DeleteIcon />
            </IconButton>
          </>
        )
      }
    },

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
    pagination: false
  };

  const history = useHistory();

  // get id from local storage
  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const project =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;

  // push for new matrix
  const handleNewPerformanceMatrixAddPush = async () => {
    history.push(
      '/app/compliance-config/performance-matrix/add'
    );
  };

  const [allMatrixData, setAllMatrixData] = useState([])
  const [matrixIdData, setMatrixIdData] = useState({})

  // for edit the matrix data
  const handlePerformanceMatrixEditPush = async (e, columnValue) => {
    let data = {}
    for (let i = 0; i < allMatrixData.length; i++) {
      if (allMatrixData[i].id === columnValue.rowData[0]) {
        data = allMatrixData[i]
      }
    }
    history.push({ pathname: `/app/compliance-config/performance-matrix/edit/`, state: data }
    );
  };

  const [matrixData, setMatrixData] = useState([])

  // get all the exist data
  const fetchMatrixData = async () => {
    const res = await api.get(`/api/v1/configaudits/matrix/?company=${fkCompanyId}&project=${project}&projectStructure=`)
    const result = res.data.data.results
    setAllMatrixData(result)
    // for pagination
    await setTotalData(res.data.data.metadata.count)
    await setPageData(res.data.data.metadata.count / 25)
    let pageCount = Math.ceil(res.data.data.metadata.count / 25)
    await setPageCount(pageCount)
    let temp = []
    for (let i = 0; i < result.length; i++) {
      temp.push([
        result[i].id,
        result[i].matrixConstant,
        result[i].matrixConstantName,
        result[i].matrixConstantColor,
        result[i].status,

      ])
    }
    await setMatrixData(temp)
    await setIsLoading(true)
  }

  // for change form data
  const handleChange = async (event, value) => {
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
    const createdBy = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).id
      : null;
    let struct = "";

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    const res = await api.get(
      `/api/v1/configaudits/matrix/?company=${fkCompanyId}&project=${fkProjectId}&projectStructure=${fkProjectStructureIds}&&page=${value}`
    );
    const result = res.data.data.results;
    setallMatrixData(result)
    let temp = [];
    for (let i = 0; i < result.length; i++) {
      temp.push([
        result[i].id,
        result[i].matrixConstant,
        result[i].matrixConstantName,
        result[i].matrixConstantColor,
        result[i].status,
      ]);
    }
    await setMatrixData(temp);
    await setPage(value)
  };

  // for delete the data 
  const handleDelete = async () => {
    let res = await api.delete(`/api/v1/configaudits/matrix/${matrixIdData.id}/?company=${matrixIdData.fkCompanyId}&project=${matrixIdData.fkProjectId}`).then(res => { fetchMatrixData(), setDeleteQ(false) }).catch(error => console.log(error))
  }

  useEffect(() => {
    fetchMatrixData()
  }, [])

  // for filter the data
  const handleFilter = (value) => {
    setFilter(value);
    let temp = []
    for (let i = 0; i < allMatrixData.length; i++) {
      if (value) {
        if (allMatrixData[i].status === value) {
          temp.push([
            allMatrixData[i].id,
            allMatrixData[i].matrixConstant,
            allMatrixData[i].matrixConstantName,
            allMatrixData[i].matrixConstantColor,
            allMatrixData[i].status,
          ])
        }
      } else {
        temp.push([
          allMatrixData[i].id,
          allMatrixData[i].matrixConstant,
          allMatrixData[i].matrixConstantName,
          allMatrixData[i].matrixConstantColor,
          allMatrixData[i].status,
        ])
      }
    }
    setMatrixData(temp)
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} sm={6} xs={6} align='left' className="paddBRemove">
          <Tooltip title="New">
            <Button size="medium" variant="contained" color="primary" onClick={(e) => handleNewPerformanceMatrixAddPush(e)}>
              <AddIcon className="marginR5" /> New
            </Button>
          </Tooltip>
          {/* <Tooltip title="Bulk upload">
              <Button size="medium" variant="contained"  color="primary" onClick={(e) => handleBulkUploadPush(e)}>
                <CloudUploadIcon className="marginR5" /> Upload
              </Button>
          </Tooltip> */}
        </Grid>
        <Grid item md={6} sm={6} xs={6} align='right' className="paddBRemove">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel style={{ marginLeft: '20px', marginTop: '-5px' }} id="checklistSearchFilter">Filter</InputLabel>
            <Select
              style={{ minWidth: '120px' }}
              labelId="checklistSearchFilte"
              id="demo-simple-select-helper"
              onChange={(e) => handleFilter(e.target.value)}
              value={filter}
              variant="outlined"
              label="Filter"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={"Active"}>Status - active</MenuItem>
              <MenuItem value={"Inactive"}>Status - inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {isLoading ? <>
            <TableContainer component={Paper}>
              <Grid component={Paper}>
                <MUIDataTable
                  //title="Actions List"
                  className="dataTableSectionDesign performanceFactorTable"
                  data={matrixData}
                  columns={columns}
                  options={options}
                //className="classes.dataTableNew"
                />
              </Grid>
            </TableContainer>
            <div className={classes.pagination}>
              {totalData != 0 ? Number.isInteger(pageData) !== true ? totalData < 25 * page ? `${page * 25 - 24} - ${totalData} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : null}
              <Pagination count={pageCount} page={page} onChange={handleChange} />
            </div></> : <Loader />}
        </Grid>
      </Grid>

      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={(e) => handlePerformanceMatrixEditPush(e)}>
                <ListItemIcon><EditIcon /></ListItemIcon>
                <ListItemText primary="Edit" />
              </ListItem>
              <ListItem button onClick={(e) => handlePerformanceMatrixViewPush(e)}>
                <ListItemIcon><VisibilityIcon /></ListItemIcon>
                <ListItemText primary="View" />
              </ListItem>
            </List>
          </DialogContentText>
        </DialogContent>
      </Dialog> */}

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
                  <FormLabel component="legend" className="checkRadioLabel">Are you sure you want to delete?</FormLabel>
                </FormControl>
              </Grid>
              <Grid item md={12} sm={12} xs={12} className={classes.popUpButton}>
                <Button color="primary" variant="contained" className="spacerRight buttonStyle" onClick={() => handleDelete()}>
                  Yes
                </Button>
                <Button color="secondary" variant="contained" className="buttonStyle custmCancelBtn">
                  No
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PerformanceMatrixList;
