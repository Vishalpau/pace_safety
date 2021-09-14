import api from "../../utils/axios"
import { ACCOUNT_API_URL } from "../../utils/constants"
import * as actionsType from "../constants/authentication"
export const fetchPermission = (data)=>{
    // const res = api.get(`${ACCOUNT_API_URL}api/v1/applications/1/roles/4/`)
    return {
        type: actionsType.PERMISSION_DETAILS,
        payload: data
    }
}