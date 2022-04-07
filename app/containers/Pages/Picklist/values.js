import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { PapperBlock } from 'dan-components';
import React, { useEffect, useState } from 'react';
import Editor from '../../../components/Editor';
import api from "../../../utils/axios";


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

function Pickvalues(props) {
  const [pickValues, setPickValues] = useState([]);
  const [listname, setlistname] = useState(props.location.pathname.split('/').pop());
  const [listToggle, setListToggle] = useState(false);

  const handelView = (e) => {
    setListToggle(!listToggle);
  };

  const load = async () => {
    const allPickvalues = await api.get(`api/v1/lists/` + props.location.pathname.split('/').pop() + '/value');
    await setPickValues(allPickvalues.data.data.results);
    await setForm({
      ...form,
      fkCompanyId: allPickvalues.data.data.results[0].fkCompanyId,
      parentListValue: allPickvalues.data.data.results[0].parentListValue,
    });
  };

  useEffect(() => {
    load();
  }, []);

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
      name: 'Action'
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

  const [form, setForm] = useState({
    fkCompanyId: localStorage.getItem('company_id'),
    fkPickListId: listname,
    groupInputBy: '',
    inputLabel: '',
    inputValue: '',
    isSelected: 0,
    parentListValue: '',
    status: 'Active',
    createdBy: JSON.parse(localStorage.getItem('userDetails')).id
  });

  const save = (text, column, id) => {
    // Update
    const val = {};

    if (column == 'value') {
      val.inputValue = text;
    }
    if (column == 'label') { val.inputLabel = text; }
    if (column == 'is_selected') { val.isSelected = (text == 'Yes') ? 1 : 0; }
    if (column == 'parent') { val.parentListValue = text; }
    if (column == 'group_by') { val.groupInputBy = text; }

    api.put('api/v1/lists/' + listname + '/value/' + id, val);
  };

  const validate = () => {
    const {
      groupInputBy, inputLabel, inputValue, isSelected
    } = form;
    if (groupInputBy == '' || inputLabel == '' || inputValue == '' || isSelected == '') return false;
    return true;
  };

  const add_new = () => {
    if (!validate()) { return; }
    // Post form data in API
    api.post('api/v1/lists/' + listname + '/value', form).then(response => {
      const update = [...pickValues];
      update.push(response.data.data.results);
      setPickValues(update);
      document.getElementById('add_inputLabel').value = '';
      document.getElementById('add_inputValue').value = '';
      document.getElementById('add_groupInputBy').value = '';
    });
  };

  const select_type_options = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' }
  ];

  const _pickvalues = list => list.map(listItem => (
    <tr>
      <td>
        <Editor
          type="text"
          id={listItem.id}
          value={listItem.inputLabel}
          column="label"
          save={save}
        />
      </td>
      <td>
        <Editor
          type="text"
          id={listItem.id}
          value={listItem.inputValue}
          column="value"
          save={save}
        />
      </td>
      <td>
        <Editor
          type="select"
          options={select_type_options}
          id={listItem.id}
          value={listItem.isSelected ? 1 : 0}
          column="is_selected"
          save={save}
        />
      </td>
      <td>
        <Editor
          type="text"
          id={listItem.id}
          value={listItem.parentListValue}
          column="parent"
          save={save}
        />
      </td>
      <td>
        <Editor
          type="text"
          id={listItem.id}
          value={listItem.groupInputBy ? listItem.groupInputBy : 'None'}
          column="group_by"
          save={save}
        />
      </td>
    </tr>
  ));

  return (
    <PapperBlock title="Values" icon="ion-md-list-box" desc="">

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
                  // to be changed
                  onClick={() => {
                    document.getElementById('add_inputLabel').focus();
                    document.getElementById('botton_add_footer').scrollIntoView();
                  }}
                >
                  New Value
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <div className="listView">
          <table id="picklistmanage_table" className="table table-striped table-bordered datatable_section width100">
            <thead>
              <tr>
                <th>Input Label</th>
                <th>Database Value</th>
                <th>Is Selected</th>
                <th>Parent</th>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>

              {_pickvalues(pickValues)}

            </tbody>
            <tfoot id="botton_add_footer">
              <tr>
                <td>
                  <TextField
                    variant="outlined"
                    rows="1"
                    id="add_inputLabel"
                    label="Input Label"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        inputLabel: e.target.value,
                      });
                    }}
                  />
                </td>
                <td>
                  <TextField
                    variant="outlined"
                    rows="1"
                    id="add_inputValue"
                    label="Database Value"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        inputValue: e.target.value,
                      });
                    }}
                  />
                </td>
                <td>
                  <Select
                    labelId="add_list_label-label"
                    id="add_isSelected"
                    label="Is Selected"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        isSelected: e.target.value,
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
                <td>{form.parentListValue}</td>
                <td>
                  <TextField
                    variant="outlined"
                    rows="1"
                    id="add_groupInputBy"
                    label="Group"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        groupInputBy: e.target.value,
                      });
                    }}
                  />
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<AddCircleIcon />}
                    className={classes.newIncidentButton}
                    disableElevation
                    id="save_new_pickvalue"
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

export default Pickvalues;
