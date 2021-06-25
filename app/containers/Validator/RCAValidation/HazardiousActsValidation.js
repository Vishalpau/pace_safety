import validator from 'validator';


function HazardiousActsValidation(data) {
    let isValid = true
    const error = {}
    console.log(data.supervision.rcaSubType)

    if (validator.isEmpty(data.supervision.rcaSubType)) {
        error.supervision = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.workpackage.rcaSubType)) {
        error.workpackage = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.equipmentMachinery.rcaSubType)) {
        error.equipmentMachinery = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.behaviourIssue.rcaSubType)) {
        error.behaviourIssue = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.safetyIssues.rcaSubType)) {
        error.safetyIssues = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.ergonimics.rcaSubType)) {
        error.ergonimics = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.procedures.rcaSubType)) {
        error.procedures = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.others.rcaSubType)) {
        error.others = "this filed is empty"
        isValid = false
    }


    console.log(error)
    return { error, isValid }
}

export default HazardiousActsValidation