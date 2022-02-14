// import React from 'react';  
import React, { useState, Fragment ,useEffect } from "react";
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

import { SketchPicker } from 'react-color';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import api from "../../utils/axios";

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
    name: 'matrixConstant',
    label: 'Matrix constant',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  },
   {
    name: 'matrixConstantName',
    label: 'Matrix constant name',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  },
  {
    name: 'matrixConstantColor',
    label: 'Matrix constant Color',
    type: 'text',
    initialValue: '',
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
    matrixConstant: '124',
    matrixConstantName: 'Matrix',
    matrixConstantColor: 'FFFFFF',
    status: true,
    edited: false,
  }, {
    id: 2,
    matrixConstant: '124',
    matrixConstantName: 'Matrix',
    matrixConstantColor: 'FFFFFF',
    status: true,
    edited: false,
  }, {
    id: 3,
    matrixConstant: '124',
    matrixConstantName: 'Matrix',
    matrixConstantColor: 'FFFFFF',
    status: true,
    edited: false,
  }, {
    id: 4,
    matrixConstant: '124',
    matrixConstantName: 'Matrix',
    matrixConstantColor: 'FFFFFF',
    status: true,
    edited: false,
  }, {
    id: 5,
    matrixConstant: '124',
    matrixConstantName: 'Matrix',
    matrixConstantColor: 'FFFFFF',
    status: true,
    edited: false,
  }
];

function CrudTablePerformanceMatrix(props) {
  const classes = useStyles();
  //const classes = props;
  //console.log(props)
  // Redux State
  const branch = 'crudTablePerformanceMatrix';
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

  const [colorPick, setColorPick] = useState('#06425c');
  const [hidden, setHidden] = useState(false);
  const [matrixData, setMatrixData] = useState([])
  const [isLoading , setIsLoading] = useState(false);
  const fetchMatrixData = async () => {
    const res = await api.get(`/api/v1/configaudits/matrix/?company=1&project=1&projectStructure=`)
    const result = res.data.data.results
    let temp = []
    for(let i = 0; i < result.length; i++) {
      temp.push({
        id: result[i].id,
        matrixConstant: result[i].matrixConstant,
        matrixConstantName: result[i].matrixConstantName,
        matrixConstantColor: result[i].matrixConstantColor,
        status: true,
        edited: false,
      })
    }
    await setMatrixData(temp)
    await setIsLoading(true)
  }
  useEffect(() => {
    fetchMatrixData()
  },[])

  return (
    <div >
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      <div className={classes.rootTable}>
        <div className="customColorPickerSection">
          {hidden && (
            <SketchPicker color={colorPick} onChange={updateColor => setColorPick(updateColor.hex)} />
          )}
          <Tooltip title="Matrix constant Color">
            <Button size="medium" className="marginR5" variant="contained" color="primary" onClick={() => setHidden(!hidden)} >
              Color picker
            </Button>
          </Tooltip>
          <span className="customColorDisplay" onClick={() => setHidden(false)}>{colorPick}</span>
        </div>
        {isLoading ? 
        <CrudTable
          dataInit={matrixData}
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
        />:"Loading..."}
      </div>
    </div>
  );
}

CrudTablePerformanceMatrix.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTablePerformanceMatrix);