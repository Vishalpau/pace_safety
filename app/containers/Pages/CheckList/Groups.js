import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PapperBlock } from 'dan-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

import { async } from 'fast-glob';
import { handelIncidentId } from '../../../utils/CheckerValue';
import Editor from '../../../components/Editor';
import api from '../../../utils/axios';
import ReadOnlyRow from './CheckListCompoment/ReadGroups';
import EditOnlyRow from './CheckListCompoment/EditGroups';

const useStyles = makeStyles((theme) => ({
  tabelBorder: {
    width: 110,
    fontWeight: 600,
  },
}));

const fkCompanyId =
  JSON.parse(localStorage.getItem("company")) !== null
    ? JSON.parse(localStorage.getItem("company")).fkCompanyId
    : null;

const project =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
    : null;

function Group() {
  const [form, setForm] = useState(
    {
      fkCompanyId: fkCompanyId,
      fkProjectId: project,
      fkCheckListId: '',
      checkListGroupName: '',
      parentGroup: '',
      status: 'active',
      createdBy: JSON.parse(localStorage.getItem('userDetails')).id,
      updatedBy: 0
    }
  );

  const [group, setGroup] = useState([]);

  const history = useHistory();

  const [checkListId, setCheckListId] = useState('');
  const [allGroupName, setAllGroupName] = useState([]);
  const [allGroup, setAllGroup] = useState([]);
  const [projectName, setProjectName] = useState({});
  const [editGroupId, setEditGroupId] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [viewUpdate, setViewUpdate] = useState(false);
  const [newGroupError, setNewGroupError] = useState(false)
  const [searchFilter, setSearchFilter] = useState({
    search: "",
    filter: ""
  })
  const handelGroup = async () => {
    const tempGroupName = [];
    const groupID = handelIncidentId();
    setCheckListId(groupID);
    const res = await api.get(`api/v1/core/checklists/${groupID}/groups/`);
    const result = res.data.data.results;
    const allGroups = result;
    setGroup(allGroups);
    setAllGroup(allGroups)
    allGroups.map((value) => {
      tempGroupName.push({
        name: value.checkListGroupName,
        id: value.checklistgroupId
      });
    });
    tempGroupName.push('Top');
    // fkProjectId
    setAllGroupName(tempGroupName);
  };

  const handelCheckList = (e) => {
    setForm({
      ...form,
      checkListGroupName: e.target.value,
      fkCheckListId: checkListId
    });
  };

  const handelNext = async () => {
    // const { projectId } = JSON.parse(localStorage.getItem('projectName'));
    if (form.checkListGroupName.trim()) {
      setNewGroupError(false)
      form.parentGroup = form.parentGroup == '' ? 0 : form.parentGroup;
      form.fkProjectId = project;
      const res = await api.post(`api/v1/core/checklists/${checkListId}/groups/`, form);
      if (res.status == 201) {
        setForm({
          ...form,
          checkListGroupName: '',
          fkCheckListId: ''
        });
        handelGroup();
      }

      setShowNew(false);
      setViewUpdate(!viewUpdate);
    } else {
      setNewGroupError(true)
    }
  };

  const handelParentValue = (value) => {
    setForm({
      ...form,
      parentGroup: value,
    });
  };

  const handleStatusChange = () => {
    if (form.status === 'active') {
      setForm({
        ...form,
        status: 'inactive'
      })
    } else {
      setForm({
        ...form,
        status: 'active'
      })
    }
  }

  const handelParentShow = (value) => {
    if (value == 0) {
      return 'Top';
    }
    return 'Sub';
  };

  const handleEdit = () => {
    // const { editStart } = this.props; // eslint-disable-line no-shadow
    // return () => editStart(String(widget.id));
  };

  const handelProjectName = () => {
    const tempProject = {};
    const company = JSON.parse(localStorage.getItem('company'));
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const data = userDetails.companies.map((item) => {
      if (item.companyId === parseInt(company.fkCompanyId)) {
        return item.projects;
      }
    });

    data.map((value) => {
      if (value != undefined && Array.isArray(value)) {
        value.map((subValue) => {
          tempProject[subValue.projectId] = subValue.projectName;
        });
      }
    });
    setProjectName(tempProject);
  };

  const editFormData = () => {

  };

  const handleEditFormChange = () => {

  };

  const handleCancelClick = () => {

  };

  const handleEditClick = (e, group) => {
    e.preventDefault();
    setEditGroupId(group.checklistgroupId);
  };

  const handleDeleteClick = () => {

  };

  const handelEditClose = () => {
    setEditGroupId(null);
  };


  const classes = useStyles();

  useEffect(() => {
    handelGroup();
    handelProjectName();
  }, [viewUpdate]);

  const handleSearchFilterChange = (value, key) => {
    setSearchFilter(data => ({
      ...data,
      [key]: value
    }))
  }

  useEffect(() => {
    const temp = [];
    allGroup.forEach(value => {
      if (searchFilter.search) {
        if (searchFilter.filter) {
          if (value.checkListGroupName.toLowerCase().indexOf(searchFilter.search.toLowerCase()) !== -1 && value.status === searchFilter.filter) {
            temp.push(value)
          }
        } else {
          if (value.checkListGroupName.toLowerCase().indexOf(searchFilter.search.toLowerCase()) !== -1) {
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

    setGroup([...temp])
  }, [searchFilter, allGroup])

  return (

    <PapperBlock title="Groups" icon="ion-md-list-box" desc="">
      <Button style={{ marginBottom: '16px', marginLeft: "auto", display: 'block', fontSize: '12px', textDecoration: 'underline' }} onClick={() => history.goBack()}>Go back</Button>
      <Button onClick={(e) => {
        setShowNew(true)
      }} variant="contained" color="secondary" style={{ float: 'right' }}>
        <AddIcon />
        New
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField id="outlined-basic" label="Search Group"
            onChange={(e) => handleSearchFilterChange(e.target.value, 'search')}
            value={searchFilter.search}
            variant="outlined" style={{ width: '100%' }} />
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

      <Grid container spacing={12}>
        <Table className={classes.table}>
          <TableBody>

            {showNew && (
              <TableRow id='botton_add_footer'>
                <TableCell className={classes.tabelBorder}>
                  <TextField
                    id="'add_groupname'"
                    label="group name"
                    variant="outlined"
                    onChange={async (e) => handelCheckList(e)}
                  />
                </TableCell>

                <TableCell className={classes.tabelBorder}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    label="Group name"
                  >
                    <Select
                      id="Group-name"
                      className="inputCell"
                      labelId="Group name"
                      defaultValue="Top"
                    >
                      {allGroupName.map((selectValues) => (
                        <MenuItem
                          value={selectValues}
                          onClick={(e) => handelParentValue(selectValues.id)}
                        >
                          {selectValues.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                </TableCell>
                <TableCell className={classes.tabelBorder}>
                  <Switch
                    checked={form.status === 'active' ? true : false}
                    onChange={() => handleStatusChange()}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </TableCell>

                <TableCell>
                  <DoneIcon
                    onClick={(e) => handelNext(e)}
                  />
                  <span style={{ marginLeft: '20px' }}>
                    <DeleteIcon />
                  </span>

                </TableCell>

              </TableRow>
            )}
            <TableRow>
              <TableCell className={classes.tabelBorder}>Sub-group Name</TableCell>
              <TableCell className={classes.tabelBorder}>Parent Group</TableCell>
              <TableCell className={classes.tabelBorder}>Status</TableCell>
              <TableCell className={classes.tabelBorder}>Action</TableCell>
            </TableRow>
            {group.map((value, index) => (
              <>
                {editGroupId == value.checklistgroupId
                  ? (
                    <EditOnlyRow
                      value={value}
                      allGroupName={allGroupName}
                      handelEditClose={handelEditClose}
                      viewUpdate={viewUpdate}
                      setViewUpdate={setViewUpdate}
                    />
                  )
                  : (
                    <ReadOnlyRow
                      value={value}
                      handleEditClick={handleEditClick}
                      viewUpdate={viewUpdate}
                      setViewUpdate={setViewUpdate}
                      group={allGroupName.filter(item => value.parentGroup == item.id)[0]}
                    />
                  )
                }


              </>
            ))}


          </TableBody>
        </Table>
        {newGroupError && (<p style={{ paddingTop: '14px', color: '#ff0000', paddingLeft: '15px', textAlign: 'center', fontSize: '14px', fontWeight: '700' }}>Please fill all the fields</p>)}
      </Grid>
    </PapperBlock>

  );
}

export default Group;
