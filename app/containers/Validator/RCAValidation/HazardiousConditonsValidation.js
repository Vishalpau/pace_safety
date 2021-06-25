import validator from 'validator';


function HazardiousConditionsValidation(data) {
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.warningSystem.rcaSubType)) {
        error.warningSystem = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.energyTypes.rcaSubType)) {
        error.energyTypes = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.tools.rcaSubType)) {
        error.tools = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.safetyitems.rcaSubType)) {
        error.safetyitems = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.others.rcaSubType)) {
        error.others = "this filed is empty"
        isValid = false
    }


    console.log(error)
    return { error, isValid }
}

export default HazardiousConditionsValidation