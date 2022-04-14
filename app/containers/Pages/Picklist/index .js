import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { PapperBlock } from 'dan-components';
import React, { useEffect, useState } from 'react';
import Editor from '../../../components/Editor';
import api from "../../../utils/axios";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { apiUrl } from '../../../utils/helper';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: `1px solid ${theme.palette.primary.shade}`,
    borderRadius: '4px',
  },
  leftSide: {
    flexGrow: 1,
  },
  newIncidentButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.primary.dark,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
  },
}));

function Picklists(props) {
  const [picklists, setPicklists] = useState([]);
  const [listToggle, setListToggle] = useState(false);
  const [searchFilter, setSearchFilter] = useState({
    search: "",
    filter: ""
  })

  const handelView = (e) => {
    setListToggle(!listToggle);
  };

  const handelPickListGet = async () => {
    const res = await api.get("/api/v1/lists/")
    setPicklists(res.data.data.results)
  }

  const columns = [
    {
      name: 'List Name'
    },
    {
      name: 'List Label'
    },
    {
      name: 'Type'
    },
    {
      name: 'Parent'
    },
    {
      name: 'System Defined'
    },
    {
      name: 'Actions'
    },
  ];

  const options = {
    filter: false,
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    rowsPerPage: 10,
    page: 0,
    search: false,
    download: false,
  };

  const classes = useStyles();

  const save = (text, column, id) => {
    // Update
    const value = {};
    picklists.forEach(picklist => {
      if (picklist.id === id) {
        value.listName = picklist.listName,
          value.listLabel = picklist.listLabel,
          value.fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId,
          value.listSelectType = picklist.listSelectType,
          value.status = picklist.status,
          value.listType = picklist.listType

        if (column == "name")
          value.listName = text;
        if (column == 'label') {
          value.listLabel = text;
        }
      }
    });
    // const val = {};

    // if (column == 'name') {
    //   val.listName = text;
    // }
    // if (column == 'label') { val.listLabel = text; }
    // if (column == 'type') { val.listType = text; }
    // value["fkCompanyId"] = JSON.parse(localStorage.getItem("company")).fkCompanyId,
    //   value["listName"] = 0
    // value["listSelectType"] = 'single'
    // value["listType"] = val.listType
    // value["status"] = 'Active'
    api.put('api/v1/lists/' + id, value);
  };

  const redirectto = e => {
    e.preventDefault();
    props.history.push(e.target.getAttribute('to'));
  };

  const [form, setForm] = useState({
    fkCompanyId: JSON.parse(localStorage.getItem("company")).fkCompanyId,
    parentList: 0,
    listName: '',
    listLabel: '',
    listType: '',
    listSelectType: 'single',
    hasGroup: 'No',
    status: 'Active',
    isSystem: 'Yes',
    createdBy: JSON.parse(localStorage.getItem('userDetails')).id
  });

  const [formError, setFormerror] = useState({
    listName: '',
    listLabel: '',
    listType: '',
  });


  const select_type_options = [
    { label: 'checkbox', value: 'checkbox' },
    { label: 'radiogroup', value: 'radiogroup' },
    { label: 'dropdown', value: 'dropdown' },
  ];

  const isvalidate = (text, column, id) => {
    const val = picklists.filter(value => value == text);
    if (val.length && column == 'name') {
      return false;
    }
    return true;
  };

  const _picklists = list => list.map(listItem => {
    if (searchFilter.search) {
      if (searchFilter.filter) {
        if (listItem.listLabel.toLowerCase().indexOf(searchFilter.search.toLowerCase()) !== -1 && listItem.listType === searchFilter.filter) {
          return (
            <tr>
              <td>
                <Editor
                  type="text"
                  id={listItem.id}
                  value={listItem.listName}
                  column="name"
                  save={save}
                  isvalidate={isvalidate}
                  edit={listItem.isSystem == 0}
                />
              </td>
              <td>
                <Editor
                  type="text"
                  id={listItem.id}
                  value={listItem.listLabel}
                  column="label"
                  save={save}
                  isvalidate={isvalidate}
                  edit={listItem.isSystem == 0}
                />
              </td>

              <td>
                {listItem.listType}
                {/* <Editor
                  type="select"
                  options={select_type_options}
                  id={listItem.id}
                  value={listItem.listType}
                  column="type"
                  save={save}
                  edit={listItem.isSystem == 0}
                  isvalidate={isvalidate}
                /> */}
              </td>
              <td>
                {listItem.parentList === 0 ? 'Parent' : listItem.parentList}
              </td>
              <td>
                {listItem.isSystem == 0 ? 'Yes' : 'No'}
              </td>
              <td>
                <Link
                  to={'/app/pages/picklist/value/' + listItem.id}
                  onClick={redirectto}
                >
                  Update values
                </Link>
              </td>
            </tr>
          )
        } else {
          return <></>
        }
      } else {
        if (listItem.listLabel.toLowerCase().indexOf(searchFilter.search.toLowerCase()) !== -1) {
          return (
            <tr>
              <td>
                <Editor
                  type="text"
                  id={listItem.id}
                  value={listItem.listName}
                  column="name"
                  save={save}
                  isvalidate={isvalidate}
                  edit={listItem.isSystem == 0}
                />
              </td>
              <td>
                <Editor
                  type="text"
                  id={listItem.id}
                  value={listItem.listLabel}
                  column="label"
                  save={save}
                  isvalidate={isvalidate}
                  edit={listItem.isSystem == 0}
                />
              </td>

              <td>
                {listItem.listType}
                {/* <Editor
                  type="select"
                  options={select_type_options}
                  id={listItem.id}
                  value={listItem.listType}
                  column="type"
                  save={save}
                  edit={listItem.isSystem == 0}
                  isvalidate={isvalidate}
                /> */}
              </td>
              <td>
                {listItem.parentList === 0 ? 'Parent' : listItem.parentList}
              </td>
              <td>
                {listItem.isSystem == 0 ? 'Yes' : 'No'}
              </td>
              <td>
                <Link
                  to={'/app/pages/picklist/value/' + listItem.id}
                  onClick={redirectto}
                >
                  Update values
                </Link>
              </td>
            </tr>
          )
        } else {
          return <></>
        }
      }
    } else {
      if (searchFilter.filter) {
        if (searchFilter.filter === listItem.listType) {
          return (
            <tr>
              <td>
                <Editor
                  type="text"
                  id={listItem.id}
                  value={listItem.listName}
                  column="name"
                  save={save}
                  isvalidate={isvalidate}
                  edit={listItem.isSystem == 0}
                />
              </td>
              <td>
                <Editor
                  type="text"
                  id={listItem.id}
                  value={listItem.listLabel}
                  column="label"
                  save={save}
                  isvalidate={isvalidate}
                  edit={listItem.isSystem == 0}
                />
              </td>

              <td>
                {listItem.listType}
                {/* <Editor
                  type="select"
                  options={select_type_options}
                  id={listItem.id}
                  value={listItem.listType}
                  column="type"
                  save={save}
                  edit={listItem.isSystem == 0}
                  isvalidate={isvalidate}
                /> */}
              </td>
              <td>
                {listItem.parentList === 0 ? 'Parent' : listItem.parentList}
              </td>
              <td>
                {listItem.isSystem == 0 ? 'Yes' : 'No'}
              </td>
              <td>
                <Link
                  to={'/app/pages/picklist/value/' + listItem.id}
                  onClick={redirectto}
                >
                  Update values
                </Link>
              </td>
            </tr>
          )
        } else {
          return <></>
        }
      } else {
        return (
          <tr>
            <td>
              <Editor
                type="text"
                id={listItem.id}
                value={listItem.listName}
                column="name"
                save={save}
                isvalidate={isvalidate}
                edit={listItem.isSystem == 0}
              />
            </td>
            <td>
              <Editor
                type="text"
                id={listItem.id}
                value={listItem.listLabel}
                column="label"
                save={save}
                isvalidate={isvalidate}
                edit={listItem.isSystem == 0}
              />
            </td>

            <td>
              {listItem.listType}
              {/* <Editor
                type="select"
                options={select_type_options}
                id={listItem.id}
                value={listItem.listType}
                column="type"
                save={save}
                edit={listItem.isSystem == 0}
                isvalidate={isvalidate}
              /> */}
            </td>
            <td>
              {listItem.parentList === 0 ? 'Parent' : listItem.parentList}
            </td>
            <td>
              {listItem.isSystem == 0 ? 'No' : 'Yes'}
            </td>
            <td>
              <Link
                to={'/app/pages/picklist/value/' + listItem.id}
                onClick={redirectto}
              >
                Update values
              </Link>
            </td>
          </tr>
        )
      }
    }
  });

  const validate = () => {
    const { listName, listLabel, listType } = form;
    if (listName == '' || listLabel == '' || listType == '') return false;
    const val = picklists.filter(value => value.listName == listName);
    if (val.length) {
      setFormerror({ ...formError, listName: 'This picklist already exists' });
      return false;
    }
    return true;
  };

  const add_new = () => {
    if (!validate()) return;

    // Post form data in API
    api.post('api/v1/lists/', { ...form, isSystem: 0 }).then(response => {
      const update = [...picklists];
      update.push(response.data.data.results);
      setPicklists(update);
      document.getElementById('add_list_name').value = '';
      document.getElementById('add_list_label').value = '';
    });
  };

  useEffect(() => {
    // appapi.get(setApiUrl() + 'api/v1/lists/')
    //   .then(response => setPicklists(response.data.data.results));
    handelPickListGet()
  }, []);

  const handleSearchFilterChange = (value, key) => {
    setSearchFilter(data => ({
      ...data,
      [key]: value
    }))
  }

  return (
    <PapperBlock title="Picklists" icon="ion-md-list-box" desc="">
      <Box>
        <div className={classes.root}>
          <AppBar position="static" color="transparent">
            <Toolbar>
              <div className={classes.leftSide}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<AddCircleIcon />}
                  className={classes.newIncidentButton}
                  disableElevation
                  onClick={() => {
                    document.getElementById('add_list_name').focus();
                    document.getElementById('botton_add_footer').scrollIntoView();
                  }}
                >
                  New Picklist
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField id="outlined-basic" label="Search Picklist" onChange={(e) => handleSearchFilterChange(e.target.value, 'search')} variant="outlined" style={{ width: '100%' }} />
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
                  <MenuItem value={"dropdown"}>Type - dropdown</MenuItem>
                  <MenuItem value={"radiogroup"}>Type - radiogroup</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>

        <div className="listView">
          <table id="picklistmanage_table" className="table table-striped table-bordered datatable_section width100">
            <thead>
              <tr>
                <th>List Key</th>
                <th>List Label</th>
                <th>Type</th>
                <th>Parent</th>
                <th>System Defined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {_picklists(picklists)}

            </tbody>
            <tfoot id="botton_add_footer">
              <tr>
                <td>
                  <TextField
                    variant="outlined"
                    rows="1"
                    id="add_list_name"
                    label="List Name"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setFormerror({
                        ...formError,
                        listName: ''
                      });
                      setForm({
                        ...form,
                        listName: e.target.value,
                      });
                    }}
                    error={formError.listName}
                    helperText={formError.listName != '' ? formError.listName : ''}
                  />

                </td>
                <td>
                  <TextField
                    variant="outlined"
                    rows="1"
                    id="add_list_label"
                    label="List Label"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        listLabel: e.target.value,
                      });
                    }}
                  />

                </td>
                <td>
                  <Select
                    labelId="add_list_label-label"
                    id="add_list_type"
                    label="Type"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        listType: e.target.value,
                      });
                    }}
                  >
                    {
                      select_type_options.map(selectValues => (
                        <MenuItem value={selectValues.value}>{selectValues.label}</MenuItem>
                      ))
                    }
                  </Select>
                </td>
                <td>Parent</td>
                <td>Yes</td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<AddCircleIcon />}
                    className={classes.newIncidentButton}
                    disableElevation
                    id="save_new_picklist"
                    onClick={add_new}
                  >
                    Save
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Box>
    </PapperBlock>
  );
}

export default Picklists;
