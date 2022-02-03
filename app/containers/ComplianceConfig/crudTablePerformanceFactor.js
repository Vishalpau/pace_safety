import React , {useState , useEffect} from 'react';  
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
import api from "../../utils/axios"

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
  const [fectorData , setFectorData] = React.useState([])
  const [isLoading , setIsLoading] = React.useState(false)
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

  const fetchFectorData = async () =>{
    let res = await api.get('/api/v1/configaudits/factors/?company=1&project=1&projectStructure=')
    const result = res.data.data.results
    let temp = []
    for(let i = 0; i < result.length; i++) {
      temp.push({
        id: result[i].id,
        factortype: result[i].factorType,
        factorname: result[i].factorName,
        factorconstant: result[i].factorConstant,
        status: true,
        edited: false,
      })
    }
    await setFectorData(temp)
    await setIsLoading(true)
    // console.log(res,"::::::::::::::::::::::::::::")
  }
  console.log(fectorData,"LLLLLLLLLLLLLLLLLLLLLLLLL")
  useEffect(() => {
    fetchFectorData();
  },[])

  return (
    <div>
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      {isLoading ? 
      <div className={classes.rootTable}>
        <CrudTable
          dataInit={fectorData}
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
      :"Loading..."}
    </div>
  );
}

CrudTablePerformanceFactor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTablePerformanceFactor);