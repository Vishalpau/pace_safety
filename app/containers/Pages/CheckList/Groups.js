import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

  const [checkListId, setCheckListId] = useState('');
  const [allGroupName, setAllGroupName] = useState([]);
  const [projectName, setProjectName] = useState({});
  const [editGroupId, setEditGroupId] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [viewUpdate, setViewUpdate] = useState(false);
  const handelGroup = async () => {
    const tempGroupName = [];
    const groupID = handelIncidentId();
    setCheckListId(groupID);
    const res = await api.get(`api/v1/core/checklists/${groupID}/groups/`);
    const result = res.data.data.results;
    const allGroups = result;
    setGroup(allGroups);
    allGroups.map((value) => {
      tempGroupName.push(value.checkListGroupName);
    });
    tempGroupName.push('Top');
    // fkProjectId
    console.log(result);
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
    const { projectId } = JSON.parse(localStorage.getItem('projectName'));
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
  };

  const handelParentValue = (value) => {
    if (value == 'Top') {
      setForm({
        ...form,
        parentGroup: '0',
      });
    } else {
      setForm({
        ...form,
        parentGroup: '1',
      });
    }
  };

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

  return (

    <PapperBlock title="Groups" icon="ion-md-list-box" desc="">
      <Button variant="contained" color="secondary" onClick={(e) => setShowNew(true)} style={{ float: 'right' }}>
        <AddIcon  />
                New
      </Button>

      <Grid container spacing={12}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tabelBorder}>Group Name</TableCell>
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
                    />
                  )
                }


              </>
            ))}
            {showNew
              ? (
                <TableRow>
                  <TableCell className={classes.tabelBorder}>
                    <TextField
                      id="filled-basic"
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
                            onClick={(e) => handelParentValue(selectValues)}
                          >
                            {selectValues}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </TableCell>
                  <TableCell className={classes.tabelBorder}>
                    <Switch
                      checked
                      // onChange={handleChange}
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
              )
              : null}


          </TableBody>
        </Table>

      </Grid>
    </PapperBlock>

  );
}

export default Group;
