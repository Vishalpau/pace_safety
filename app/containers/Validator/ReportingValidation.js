import validator from 'validator';

function ReportingValidation(data) {
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.reportedto.toString())) {
        error.reportedto = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.isnotificationsent)) {
        error.isnotificationsent = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.supervisorname)) {
        error.supervisorname = "this filed is empty"
        isValid = false
    }

    // if (validator.isEmpty(data.othername)){
    //     error.othername = "this filed is empty"
    //     isValid = false
    // }

    if (data.fileupload.length == 0) {
        error.fileupload = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.reportingdate || "")) {
        error.reportingdate = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.reportingtime || "")) {
        error.reportingtime = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.reportedby)) {
        error.reportedby = "this filed is empty"
        isValid = false
    }

    if (data.reportedby == "Others" && validator.isEmpty(data.others)) {
        error.others = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.latereporting)) {
        error.latereporting = "this filed is empty"
        isValid = false
    }

    // if (validator.isEmpty(data.additionaldetails)){
    //     error.additionaldetails = "this filed is empty"
    //     isValid = false
    // }


    return { error, isValid }
}

export default ReportingValidation
