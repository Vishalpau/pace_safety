import * as notification from 'dan-redux/constants/notifConstants';
import * as types from '../constants/crudTbConstants';

export const fetchAction = (items, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA}`,
  items,
  
});
export const addAction = (anchor, branch) => ({
  branch,
  type: `${branch}/${types.ADD_EMPTY_ROW}`,
  anchor
});
export const removeAction = (item, branch) => (
  {
  branch,
  type: `${branch}/${types.REMOVE_ROW}`,
  item
});
export const updateAction = (event, item, branch) => (
  console.log({event:event,item:item,branch:branch})
  ,{
  branch,
  type: `${branch}/${types.UPDATE_ROW}`,
  event,
  item
});
export const editAction = (item, branch) => (console.log({item:item,branch:branch}),{
  branch,
  type: `${branch}/${types.EDIT_ROW}`,
  item
});
export const saveAction = (item, branch) => (console.log({item:item}),{
  branch,
  type: `${branch}/${types.SAVE_ROW}`,
  item
});
export const closeNotifAction = branch => ({
  branch,
  type: `${branch}/${notification.CLOSE_NOTIF}`,
});
