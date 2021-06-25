import validator from 'validator';

function EvidenceValidate(data){
    console.log(data)
    
    const error = {}

    if (validator.isEmpty(data.available.toString())){
        error.available = "this filed is empty"
    
    }


    console.log(error)
    return { error}
} 

export default EvidenceValidate
