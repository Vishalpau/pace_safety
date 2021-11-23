import api from "../../../../utils/axios";

export const checkValue = (value) => {
    let noValue = "-"
    if (value !== null && value !== undefined && value !== "" && value !== "null") {
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


export const handelJhaId = () => {
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));
    let jhaID = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkJHAId");
    return jhaID
}

export const handelFileName = (value) => {
    if (value != null && value !== undefined && typeof value == "string") {
        const fileNameArray = value.split("/");
        const fileName = fileNameArray[fileNameArray.length - 1].split('-');
        const lastNameArray = fileName[fileName.length - 1]
        return lastNameArray;
    }
};

export const PickListData = async (value) => {
    let severity_consequences = await api.get(`${localStorage.getItem("apiBaseUrl")}/api/v1/lists/${value}/value`);
    let data_array = severity_consequences.data.data.results
    let required_fields = []
    data_array.map((value) => {
        required_fields.push({ value: value.inputValue, label: value.inputLabel })
    })
    return required_fields
}
