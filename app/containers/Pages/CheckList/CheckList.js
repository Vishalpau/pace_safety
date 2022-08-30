import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { TextField, Select } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory, useParams } from 'react-router';
import FormControl from '@material-ui/core/FormControl';
import Editor from '../../../components/Editor';

import api from '../../../utils/axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  table: {
    minWidth: 650,
  },
  tabelBorder: {
    width: 110,
  },
  columunBorder: {
    width: 110,
    fontWeight: 600,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
}));

function CheckList() {
  const [checkListData, setCheckListData] = useState([]);
  const [checkLists, setCheckLists] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    search: "",
    filter: ""
  })
  const history = useHistory();
  const handelCheckList = async () => {
    const temp = {};
    const res = await api.get('api/v1/core/checklists/');
    const result = res.data.data.results;
    result.map((value) => {
      if (value.hasGroup == 'Yes') {
        value.checklistGroups.map((groupValue) => {
          if (temp[value.checklistId] in temp) {
            temp[value.checklistId].push(groupValue.checklistgroupId);
          } else {
            temp[value.checklistId] = [groupValue.checklistgroupId];
          }
        });
      }
    });
    setCheckListData(result);
    setCheckLists(result)
  };

  const getModalStyle = () => ({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  });

  const [open, setOpen] = useState(false);
  const [hagGroup, setHasGroup] = useState();
  const [checklistId, setCheckListID] = useState('');

  const handleOpen = (value, groupId) => {
    setOpen(true);
    setHasGroup(value);
    setCheckListID(groupId);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handelNavigate = (value) => {
    if (value == 'groups') {
      history.push(`/app/pages/groups/${checklistId}`);
    } else if (value == 'options') {
      history.push(`/app/pages/options/${checklistId}`);
    }
  };

  useEffect(() => {
    handelCheckList();
  }, []);

  const handleSearchFilterChange = (value, key) => {
    setSearchFilter(data => ({
      ...data,
      [key]: value
    }))
  }

  const isvalidate = (text, column, id) => {
    const val = picklists.filter(value => value == text);
    if (val.length && column == 'name') {
      return false;
    }
    return true;
  };

const save = (text, column, id) => {
    console.log(text,column,id)
    console.log(checkLists)
    const value = {};
    checkLists.forEach(checkList => {
      if (checkList.id === id) {
          value.checkListName = checkList.listName,
          value.checkListLabel = checkList.listLabel,
          value.fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId,
          value.checkListSelectType = checkList.listSelectType,
          value.status = checkList.status,
          value.checkListType = checkList.listType
        if (column == 'label') {
          value.listLabel = text;
        }
      }
    });
    api.put('api/v1/core/checklists/' + id, value);
  };
  useEffect(() => {
    const temp = [];
    checkListData.forEach(value => {
      if (searchFilter.search) {
        if (searchFilter.filter) {
          if (value.checkListLabel.toLowerCase().indexOf(searchFilter.search.toLowerCase()) !== -1 && value.status === searchFilter.filter) {
            temp.push(value)
          }
        } else {
          if (value.checkListLabel.toLowerCase().indexOf(searchFilter.search.toLowerCase()) !== -1) {
            temp.push(value)
          }
        }
      } else {
        if (searchFilter.filter) {
          if (searchFilter.filter === value.status) {
            temp.push(value)
          }
        } else {
          temp.push(value)
        }
      }
    })

    setCheckLists([...temp])
  }, [searchFilter, checkListData])

  const classes = useStyles();
  return (
    <PapperBlock title="Check List" icon="ion-md-list-box" desc="">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField id="outlined-basic" label="Search Checklist" onChange={(e) => handleSearchFilterChange(e.target.value, 'search')} variant="outlined" style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel style={{ marginLeft: '20px', marginTop: '-5px' }} id="checklistSearchFilter">Filter</InputLabel>
            <Select
              style={{ minWidth: '120px' }}
              labelId="checklistSearchFilte"
              id="demo-simple-select-helper"
              onChange={(e) => handleSearchFilterChange(e.target.value, 'filter')}
              value={searchFilter.filter}
              variant="outlined"
              label="Filter"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={"active"}>Status - active</MenuItem>
              <MenuItem value={"inactive"}>Status - inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.columunBorder} style={{ width: '80px' }}>Sr.</TableCell>
            {/* <TableCell className={classes.columunBorder}>Group Name</TableCell> */}
            <TableCell className={classes.columunBorder}>Input Type</TableCell>
            <TableCell className={classes.columunBorder}>CheckList Name</TableCell>
            <TableCell className={classes.columunBorder}>Select</TableCell>
            <TableCell className={classes.columunBorder}>Has group?</TableCell>
            <TableCell className={classes.columunBorder}>Status</TableCell>
            <TableCell className={classes.columunBorder}>Actions</TableCell>
          </TableRow>
          {checkLists.length ?
            <>
              {checkLists.map((value) => (
                <TableRow>
                  <TableCell className={classes.tabelBorder} style={{ width: '80px' }}>{value.checklistId}</TableCell>
                  {/* <TableCell className={classes.tabelBorder}>{value.checkListName}</TableCell> */}
                  <TableCell className={classes.tabelBorder}>{value.checkListType}</TableCell>
                  {/* <TableCell className={classes.tabelBorder}>{value.checkListLabel}</TableCell> */}
                  <TableCell className={classes.tabelBorder}>
                    <Editor
                          type="text"
                          id={value.checklistId}
                          value={value.checkListLabel}
                          column="label"
                          save={save}
                          isvalidate={isvalidate}
                        />
                  </TableCell>
                  <TableCell className={classes.tabelBorder}>{value.checkListSelectType}</TableCell>
                  <TableCell className={classes.tabelBorder}>{value.hasGroup}</TableCell>
                  <TableCell className={classes.tabelBorder}>{value.status}</TableCell>
                  <TableCell className={classes.tabelBorder}>
                    <IconButton size="small" color="primary">
                      <MoreVertIcon onClick={(e) => handleOpen(value.hasGroup, value.checklistId)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </>
            :
            <>{(searchFilter.search || searchFilter.filter) && (<p style={{ paddingTop: '15px', paddingLeft: '15px', textAlign: 'center', fontSize: '14px', fontWeight: '700' }}>No data found!</p>)}</>
          }
        </TableBody>
      </Table>

      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={(e) => handleClose()}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {hagGroup == 'Yes' ? (
              <Typography
                variant="h8"
                id="modal-title"
                onClick={(e) => handelNavigate('groups')}
              >
                <GroupWorkIcon />
                <span>Groups</span>
              </Typography>
            )
              : null
            }
            <Typography
              variant="subtitle1"
              id="simple-modal-description"
              onClick={(e) => handelNavigate('options')}
            >
              <SelectAllIcon />
              <span>Options</span>
            </Typography>
          </div>
        </Modal>
      </Grid>
    </PapperBlock>
  );
}

export default CheckList;
