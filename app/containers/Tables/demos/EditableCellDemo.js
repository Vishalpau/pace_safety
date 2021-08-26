import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { CrudTable, Notification } from 'dan-components';
import styles from 'dan-components/Tables/tableStyle-jss';
import {
  fetchAction,
  addAction,
  removeAction,
  updateAction,
  editAction,
  saveAction,
  closeNotifAction,
} from '../actions/crudTbActions';

const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  },{
    name: 'optionname',
    label: 'Option Name (Input Label)',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'inputvalue',
    label: 'Input Value',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, 
  
  {
    name: 'group',
    label: 'Group',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'available',
    label: 'Status',
    type: 'toggle',
    initialValue: true,
    width: '100',
    hidden: false
  }, {
    name: 'edited',
    label: '',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'action',
    label: 'Action',
    type: 'static',
    initialValue: '',
    width: '150',
    hidden: false
  },
];
const dataApi = [
  {
    id: 1,
    optionname: 'Option 1',
    inputvalue: '',
    group: '1',
    available: true,
    edited: false,
    
  }, {
    id: 2,
    optionname: 'Option 1',
    inputvalue: '',
    group: '1',
    available: true,
    edited: false,
    
  }, {
    id: 3,
    optionname: 'Option 1',
    inputvalue: '',
    group: '1',
    available: true,
    edited: false,
    
  }, {
    id: 4,
    optionname: 'Option 1',
    inputvalue: '',
    group: '1',
    available: true,
    edited: false,
    
  }, {
    id: 5,
    optionname: 'Option 1',
    inputvalue: '',
    group: '1',
    available: true,
    edited: false,
    
  }, {
    id: 6,
    optionname: 'Option 1',
    inputvalue: '',
    group: '1',
    available: true,
    edited: false,
    
  }
];

function CrudTableDemo(props) {
  const { classes } = props;

  // Redux State
  const branch = 'crudTableDemo';
  const dataTable = useSelector(state => state.getIn([branch, 'dataTable']));
  const messageNotif = useSelector(state => state.getIn([branch, 'notifMsg']));

  // Dispatcher
  const fetchData = useDispatch();
  const addEmptyRow = useDispatch();
  const removeRow = useDispatch();
  const updateRow = useDispatch();
  const editRow = useDispatch();
  const finishEditRow = useDispatch();
  const closeNotif = useDispatch();

  return (
    <div>
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      <div className={classes.rootTable}>
        <CrudTable
          dataInit={dataApi}
          anchor={anchorTable}
          title="Inventory Data"
          dataTable={dataTable}
          fetchData={(payload) => fetchData(fetchAction(payload, branch))}
          addEmptyRow={(payload) => addEmptyRow(addAction(payload, branch))}
          removeRow={(payload) => removeRow(removeAction(payload, branch))}
          updateRow={(e, payload) => updateRow(updateAction(e, payload, branch))}
          editRow={(payload) => editRow(editAction(payload, branch))}
          finishEditRow={(payload) => finishEditRow(saveAction(payload, branch))}
          branch={branch}
        />
      </div>
    </div>
  );
}

CrudTableDemo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTableDemo);
