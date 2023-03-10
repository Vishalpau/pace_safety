/**
 * Combine all reducers in this file and export the combined reducers.
 */

 import { reducer as form } from 'redux-form/immutable';
 import { combineReducers } from 'redux-immutable';
 import { connectRouter } from 'connected-react-router/immutable';
 import history from 'utils/history';
 
 import languageProviderReducer from 'containers/LanguageProvider/reducer';
 import uiReducer from './modules/ui';
 import initval from './modules/initForm';
 import login from './modules/login';
 import treeTable from '../containers/Tables/reducers/treeTbReducer';
 import crudTable from '../containers/Tables/reducers/crudTbReducer';
 import crudTableForm from '../containers/Tables/reducers/crudTbFrmReducer';
 import ecommerce from '../containers/SampleApps/Ecommerce/reducers/ecommerceReducer';
 import contact from '../containers/SampleApps/Contact/reducers/contactReducer';
 import chat from '../containers/SampleApps/Chat/reducers/chatReducer';
 import email from '../containers/SampleApps/Email/reducers/emailReducer';
 import calendar from '../containers/SampleApps/Calendar/reducers/calendarReducer';
 import socmed from '../containers/SampleApps/Timeline/reducers/timelineReducer';
 import taskboard from '../containers/SampleApps/TaskBoard/reducers/taskboardReducer';
 import crudGroupTableForm from '../containers/Tables/reducers/crudTbGroupReducer';
 import crudPicklistValueTableForm from '../containers/Tables/reducers/crudTbPicklistValueReducer';
 import crudTbPerformanceFactorForm from '../containers/Tables/reducers/crudTbPerformanceFactor';
 import crudTbPerformanceMatrixForm from '../containers/Tables/reducers/crudTbPerformanceMatrix';
 
 import InitialDetailsReducer from './modules/initialDetails';
 import AuthReducer from './modules/authentication';
import IncidentReducer from './modules/incident';
/**
 * Branching reducers to use one reducer for many components
 */

function branchReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { branch } = action;
    const isInitializationCall = state === undefined;
    if (branch !== reducerName && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    AuthReducer,
    InitialDetailsReducer,
    form,
    ui: uiReducer,
    initval,
    login,
    socmed,
    calendar,
    ecommerce,
    contact,
    chat,
    email,
    taskboard,
    treeTableArrow: branchReducer(treeTable, 'treeTableArrow'),
    treeTablePM: branchReducer(treeTable, 'treeTablePM'),
    crudTableDemo: branchReducer(crudTable, 'crudTableDemo'),
    crudTableOption: branchReducer(crudTable, 'crudTableOption'),
    crudTableGroup: branchReducer(crudGroupTableForm, 'crudTableGroup'),
    crudTablePicklistValue: branchReducer(crudPicklistValueTableForm, 'crudTablePicklistValue'),
    CrudTablePerformanceFactor: branchReducer(crudTbPerformanceFactorForm, 'CrudTablePerformanceFactor'),
    crudTablePerformanceMatrix: branchReducer(crudTbPerformanceMatrixForm, 'crudTablePerformanceMatrix'),
    crudTableForm,
    crudTbFrmDemo: branchReducer(crudTableForm, 'crudTbFrmDemo'),
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
    IncidentReducer,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}

// /**
//  * Combine all reducers in this file and export the combined reducers.
//  */
//  import { reducer as form } from 'redux-form/immutable';
//  import { combineReducers } from 'redux-immutable';
//  import { connectRouter } from 'connected-react-router/immutable';
//  import history from 'utils/history';
 
//  import treeTable from '../containers/Tables/reducers/treeTbReducer';
//  import crudTable from '../containers/Tables/reducers/crudTbReducer';
//  import crudTableForm from '../containers/Tables/reducers/crudTbFrmReducer';
//  import crudGroupTableForm from '../containers/Tables/reducers/crudTbGroupReducer';
//  import crudPicklistValueTableForm from '../containers/Tables/reducers/crudTbPicklistValueReducer';
//  import crudTbPerformanceFactorForm from '../containers/Tables/reducers/crudTbPerformanceFactor';
//  import crudTbPerformanceMatrixForm from '../containers/Tables/reducers/crudTbPerformanceMatrix';
//  import languageProviderReducer from 'containers/LanguageProvider/reducer';
//  import login from './modules/login';
//  import uiReducer from './modules/ui';
//  import initval from './modules/initForm';
 
 
 
 
//  /**
//   * Branching reducers to use one reducer for many components
//   */
 
//   function branchReducer(reducerFunction, reducerName) {
//    return (state, action) => {
//      const { branch } = action;
//      const isInitializationCall = state === undefined;
//      if (branch !== reducerName && !isInitializationCall) {
//        return state;
//      }
//      return reducerFunction(state, action);
//    };
//  }
 
//  /**
//   * Merges the main reducer with the router state and dynamically injected reducers
//   */
 
//  export default function createReducer(injectedReducers = {}) {
//    const rootReducer = combineReducers({
//      form,
//      login,
//      ui: uiReducer,
//      initval,
//      treeTableArrow: branchReducer(treeTable, 'treeTableArrow'),
//      treeTablePM: branchReducer(treeTable, 'treeTablePM'),
//      crudTableOption: branchReducer(crudTable, 'crudTableOption'),
//      crudTableGroup: branchReducer(crudGroupTableForm, 'crudTableGroup'),
//      crudTablePicklistValue: branchReducer(crudPicklistValueTableForm, 'crudTablePicklistValue'),
//      CrudTablePerformanceFactor: branchReducer(crudTbPerformanceFactorForm, 'CrudTablePerformanceFactor'),
//      crudTablePerformanceMatrix: branchReducer(crudTbPerformanceMatrixForm, 'crudTablePerformanceMatrix'),
//      crudTableForm,
//      crudTbFrmDemo: branchReducer(crudTableForm, 'crudTbFrmDemo'),
//      language: languageProviderReducer,
//      router: connectRouter(history),
//      ...injectedReducers,
//    });
 
//    // Wrap the root reducer and return a new root reducer with router state
//    const mergeWithRouterState = connectRouter(history);
//    return mergeWithRouterState(rootReducer);
//  }
 
 