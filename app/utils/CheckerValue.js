import axios from "axios";
import moment from 'moment';
import apiAction from "./axiosActionTracker";
import {
    access_token,
    ACCOUNT_API_URL,
} from "./constants";

export const checkValue = (value) => {
    let noValue = "-"
    if (value !== null && value !== undefined && value !== "") {
        return value
    } else {
        return noValue
    }
}

export const handelApiValue = (value) => {
    if (value !== null && value !== undefined && value !== "") {
        return value
    } else {
        return []
    }
}

export const handelConvert = (value) => {
    let wordArray = value.split(/(?=[A-Z])/);
    let wordArrayCombined = wordArray.join(" ");
    var newString = wordArrayCombined
        .toLowerCase()
        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
            return c.toUpperCase();
        });
    return newString;
};

export const handelIncidentId = () => {
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));
    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    return incidentId
}

export const handelFileName = (value) => {
    if (value != null && value !== undefined && typeof value == "string") {
        const fileNameArray = value.split("/");
        const fileName = fileNameArray[fileNameArray.length - 1].split('-');
        const lastNameArray = fileName[fileName.length - 1]
        return lastNameArray;
    }
};

export const handelCommonObject = (objName, mainKey, subKey, subValue) => {

    let checkCommonObject = JSON.parse(localStorage.getItem(objName))

    let obj = {}
    if (checkCommonObject == null) {
        obj[mainKey] = {}
        obj[mainKey][subKey] = subValue
        localStorage.setItem(objName, JSON.stringify(obj))
    }
    else if (checkCommonObject[mainKey] == null) {
        obj[mainKey] = {}
        obj[mainKey][subKey] = subValue
        checkCommonObject = { ...checkCommonObject, ...obj }
        localStorage.setItem(objName, JSON.stringify(checkCommonObject))
    }
    else if (checkCommonObject[mainKey] == null || checkCommonObject[mainKey][subKey] == null) {
        checkCommonObject[mainKey][subKey] = subValue
        localStorage.setItem(objName, JSON.stringify(checkCommonObject))
    } else if (JSON.parse(localStorage.getItem(objName))[mainKey][subKey] !== subValue) {
        checkCommonObject[mainKey][subKey] = subValue
        localStorage.setItem(objName, JSON.stringify(checkCommonObject))
    }
}

export const handleTimeOutError = (res) => { }

export const handelActionData = async (incidentId, apiData, type = "all") => {
    const fkCompanyId =
        JSON.parse(localStorage.getItem("company")) !== null
            ? JSON.parse(localStorage.getItem("company")).fkCompanyId
            : null;

    // Infininte Api
    const actionSelect = await apiAction.get(`api/v1/core/companies/select/${fkCompanyId}/`)

    if (actionSelect.status === 200) {
        const allActionData = await apiAction.get(`api/v1/actions/?enitityReferenceId=${incidentId}`)
        const allAction = allActionData.data.data.results.results

        if (type == "all") {
            let apiAllData = Array.isArray(apiData) ? apiData : [apiData]
            apiAllData.map((value) => {
                allAction.map((valueAction) => {
                    if (value.id == valueAction.enitityReferenceId.split(":")[1]) {
                        const tempAction = {
                            "number": valueAction.actionNumber,
                            "id": valueAction.id,
                            "title": valueAction.actionTitle
                        };
                        if (value["action"] == undefined) {
                            value["action"] = [tempAction]
                        } else if (value["action"] !== undefined) {
                            value["action"].push(tempAction)
                        }
                    }
                })
                if (value["action"] == undefined) {
                    value["action"] = []
                }
            })
            return apiAllData
        } else {
            return allAction
        }
    }

}

export const handelActionWithEntity = async (incidentId, actionContextValue) => {

    const fkCompanyId =
        JSON.parse(localStorage.getItem("company")) !== null
            ? JSON.parse(localStorage.getItem("company")).fkCompanyId
            : null;

    const actionSelect = await apiAction.get(`api/v1/core/companies/select/${fkCompanyId}/`)
    const allActionData = await apiAction.get(`api/v1/actions/?actionContext=${actionContextValue}&enitityReferenceId=${incidentId}`)
    const allAction = allActionData.data.data.results.results
    return allAction
}

export const handelActionDataAssessment = async (incidentId, apiData, type = "all", actionContext) => {
    const fkCompanyId =
        JSON.parse(localStorage.getItem("company")) !== null
            ? JSON.parse(localStorage.getItem("company")).fkCompanyId
            : null;

    const actionSelect = await apiAction.get(`api/v1/core/companies/select/${fkCompanyId}/`)

    if (actionSelect.status === 200) {
        const allActionData = await apiAction.get(`api/v1/actions/?actionContext=${actionContext}&enitityReferenceId=${incidentId}`)
        const allAction = allActionData.data.data.results.results

        if (type == "all") {
            let apiAllData = Array.isArray(apiData) ? apiData : [apiData]
            apiAllData.map((value) => {
                allAction.map((valueAction) => {
                    if (value.id == valueAction.enitityReferenceId.split(":")[1]) {
                        const tempAction = {
                            "number": valueAction.actionNumber,
                            "id": valueAction.id,
                            "title": valueAction.actionTitle
                        };
                        if (value["action"] == undefined) {
                            value["action"] = [tempAction]
                        } else if (value["action"] !== undefined) {
                            value["action"].push(tempAction)
                        }
                    }
                })
                if (value["action"] == undefined) {
                    value["action"] = []
                }
            })
            return apiAllData
        } else {
            return allAction
        }
    }
}

export const handelDateTime = (value, showTime = true) => {
    if (value == null) {
        return
    }
    let observedDateAndTime = value.split("T")
    let observedDate = moment(value.split("T")[0]).format('MMMM Do YYYY')
    let observedTime = observedDateAndTime[1].replace("Z", "")
    var timeString = observedTime;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? " AM" : " PM";
    timeString = h + timeString.substr(2, 3) + ampm;

    return showTime ? `${observedDate} ${timeString}` : observedDate

}

export const handelValueToLabel = (value) => {
    let label = ""
    if (value !== null && value !== undefined && value !== "") {
        let arrVal = value.split("-")
        label = arrVal.slice(0, arrVal.length - 1).join(' ') + " " + arrVal.slice(-1)
    } else {
        label = "-"
    }
    return label
}

export const handelActionIcare = async (incidentId, apiData, type = "all", actionContext) => {
    const fkCompanyId =
        JSON.parse(localStorage.getItem("company")) !== null
            ? JSON.parse(localStorage.getItem("company")).fkCompanyId
            : null;

    const actionSelect = await apiAction.get(`api/v1/core/companies/select/${fkCompanyId}/`)

    if (actionSelect.status === 200) {
        const allActionData = await apiAction.get(`api/v1/actions/?enitityReferenceId=${incidentId}&actionContext=${actionContext}`)
        const allAction = allActionData.data.data.results.results

        if (type == "all") {
            let apiAllData = Array.isArray(apiData) ? apiData : [apiData]
            apiAllData.map((value) => {
                allAction.map((valueAction) => {
                    if (value.id == valueAction.enitityReferenceId.split(":")[1]) {
                        const tempAction = {
                            "number": valueAction.actionNumber,
                            "id": valueAction.id,
                            "title": valueAction.actionTitle
                        };
                        if (value["action"] == undefined) {
                            value["action"] = [tempAction]
                        } else if (value["action"] !== undefined) {
                            value["action"].push(tempAction)
                        }
                    }
                })
                if (value["action"] == undefined) {
                    value["action"] = []
                }
            })
            return apiAllData
        } else {
            return allAction
        }
    }

}

export const fetchReportedBy = async () => {
    let allUser;
    let appId = JSON.parse(localStorage.getItem("BaseUrl"))["appId"]
    let companyId =
        JSON.parse(localStorage.getItem("company")) !== null
            ? JSON.parse(localStorage.getItem("company")).fkCompanyId
            : null;
    const config = {
        method: "get",
        url: `${ACCOUNT_API_URL}api/v1/companies/${companyId}/application/${appId}/users/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        let allData = await axios(config)
        let allUsers = allData.data.data.results[0]["users"]
        allUser = allUsers
    } catch {
        let allUsers = ["No users found"]
        allUser = allUsers
    }
    return allUser;
};


export const fetchDepartmentName = async () => {
    let alldept;
    let companyId =
        JSON.parse(localStorage.getItem("company")) !== null
            ? JSON.parse(localStorage.getItem("company")).fkCompanyId
            : null;

    const config = {
        method: "get",
        url: `${ACCOUNT_API_URL}api/v1/companies/${companyId}/departments/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    try {
        let filterDepartmentName = [];
        let allData = await axios(config)
        const result = allData.data.data.results;
        for (var i in result) {
            filterDepartmentName.push(result[i].departmentName);
        }
        alldept = filterDepartmentName;
    } catch {
        let allData = ["No deptartmetn found"]
        alldept = allData
    }
    return alldept;
};

export const OtherNA = (type) => {
    let data = [];
    if (type == "Other") {
        let temp = {}
        data.push(temp.label = "Other");
        data.push(temp.value = "Other");

    } else if (type == "NA") {
        let temp = {}
        data.push(temp.label = "NA");
        data.push(temp.value = "NA");
    } else {
        let temp = { label: "Other", value: "Other" }
        let temp1 = { label: "NA", value: "NA" }
        data = [temp, temp1]

    }
    return data

}