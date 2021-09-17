


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
        console.log("here")
        obj[mainKey] = {}
        obj[mainKey][subKey] = subValue
        localStorage.setItem(objName, JSON.stringify(obj))
    }
    else if (checkCommonObject[mainKey] == null) {
        console.log("here1")
        obj[mainKey][subKey] = subValue
        checkCommonObjectobj[[mainKey]][[subKey]] = subValue
        localStorage.setItem(objName, JSON.stringify(temp))
    }
    else if (checkCommonObject[mainKey] == null || checkCommonObject[mainKey][subKey] == null) {
        console.log("here2")
        checkCommonObject[mainKey][subKey] = subValue
        localStorage.setItem(objName, JSON.stringify(checkCommonObject))
    }
}