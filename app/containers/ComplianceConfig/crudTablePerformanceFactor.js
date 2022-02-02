import React from 'react';  
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
//import { CrudTable, Notification } from 'dan-components';
import { Notification } from 'dan-components';
import CrudTable from 'dan-components/Tables/CrudTable';
import styles from 'dan-components/Tables/tableStyle-jss';
import {
  fetchAction,
  addAction,
  removeAction,
  updateAction,
  editAction,
  saveAction,
  closeNotifAction,
} from '../Tables/actions/crudTbActions';

const useStyles = makeStyles((theme) => ({
  // rootTable: {
  //   paddingTop: '0rem',
  //   '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
  //     borderColor: 'transparent',
  //   },
  // },
}));

const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  },{
    name: 'factortype',
    label: 'Factor type',
    type: 'selection',
    initialValue: 'Criticality',
    options: ['Criticality', 'Status'],
    width: 'auto',
    hidden: false
  },
   {
    name: 'factorname',
    label: 'Factor name',
    type: 'selection',
    initialValue: 'High',
    options: ['High', 'Medium', 'Low'],
    width: 'auto',
    hidden: false
  },
  {
    name: 'factorconstant',
    label: 'Factor constant',
    type: 'selection',
    initialValue: '2',
    options: ['2', '4', '5', '8'],
    width: 'auto',
    hidden: false
  },
  {
    name: 'status',
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
  },
   {
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
    factortype: 'Criticality',
    factorname: 'High',
    factorconstant: '2',
    status: true,
    edited: false,
  }, {
    id: 2,
    factortype: 'Criticality',
    factorname: 'High',
    factorconstant: '2',
    status: true,
    edited: false,
  }, {
    id: 3,
    factortype: 'Criticality',
    factorname: 'High',
    factorconstant: '2',
    status: true,
    edited: false,
  }, {
    id: 4,
    factortype: 'Criticality',
    factorname: 'High',
    factorconstant: '2',
    status: true,
    edited: false,
  }, {
    id: 5,
    factortype: 'Criticality',
    factorname: 'High',
    factorconstant: '2',
    status: true,
    edited: false,
  }
];

function CrudTablePerformanceFactor(props) {
  const classes = useStyles();
  //const classes = props;
  //console.log(props)
  // Redux State
  const branch = 'CrudTablePerformanceFactor';
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
          className="dataTableSectionDesign"
          //title=""
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

CrudTablePerformanceFactor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTablePerformanceFactor);