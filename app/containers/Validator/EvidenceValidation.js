import validator from 'validator';

function EvidenceValidate(data){
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.evidenceType.toString())){
        error.evidenceType = "this filed is empty"
        isValid = false   
    }
    else if (validator.isEmpty(data.available.toString())){
        error.available = "this filed is empty"
        isValid = false   
    }
    else if (validator.isEmpty(data.comment.toString())){
        error.comment = "this filed is empty"
        isValid = false   
    }

    return { error , isValid }
} 

export default EvidenceValidate
