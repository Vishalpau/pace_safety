import apiAction from "./axiosActionTracker"

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

export const handleTimeOutError = (res) => {
}

export const handelActionData = async (incidentId, apiData, type = "all") => {

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
