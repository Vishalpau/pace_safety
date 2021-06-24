import validator from 'validator';


function BasicCauseValidation(data) {
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.personal.rcaSubType)) {
        error.personal = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.wellnessFactors.rcaSubType)) {
        error.wellnessFactors = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.otherHumanFactor.rcaSubType)) {
        error.otherHumanFactor = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.leadership.rcaSubType)) {
        error.leadership = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.processes.rcaSubType)) {
        error.processes = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.otherJobFactors.rcaSubType)) {
        error.otherJobFactors = "this filed is empty"
        isValid = false
    }


    console.log(error)
    return { error, isValid }
}

export default BasicCauseValidation