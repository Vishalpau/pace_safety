


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
