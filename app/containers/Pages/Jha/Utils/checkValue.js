


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