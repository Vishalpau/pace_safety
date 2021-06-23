import validator from 'validator';


function DetailValidation(data) {
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.evidenceSupport)) {
        error.evidenceSupport = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.evidenceContradiction)) {
        error.evidenceContradiction = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.evidenceNotSupport)) {
        error.evidenceNotSupport = "this filed is empty"
        isValid = false
    }

    return { error, isValid }
}

export default DetailValidation
