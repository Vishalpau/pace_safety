import *as actionsType from "../actions/incident"

export const actionShow = data=>{
    return{
      type:actionsType.ACTION_SHOW,
      payload:data
    }
   }