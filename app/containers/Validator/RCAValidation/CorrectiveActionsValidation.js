import validator from 'validator';


function CorrectiveActionValidation(data) {
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.managementControl.rcaSubType)) {
        error.managementControl = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.regionSupport.remarkType)) {
        error.regionSupport = "this filed is empty"
        isValid = false
    }

    return { error, isValid }
}

export default CorrectiveActionValidation