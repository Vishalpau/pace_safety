import api from "../../utils/axios"
import { ACCOUNT_API_URL } from "../../utils/constants"
import * as actionsType from "../constants/authentication"
export const fetchPermission = (data)=>{
    return {
        type: actionsType.PERMISSION_DETAILS,
        payload: data
    }
}