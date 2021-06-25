import validator from 'validator';


function RootCauseValidation(data) {
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.causeOfIncident)) {
        error.causeOfIncident = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.correctiveAction)) {
        error.correctiveAction = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.wouldItPreventIncident)) {
        error.wouldItPreventIncident = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.recommendSolution)) {
        error.recommendSolution = "this filed is empty"
        isValid = false
    }


    console.log(error)
    return { error, isValid }
}

export default RootCauseValidation
