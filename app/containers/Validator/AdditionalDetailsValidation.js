import validator from 'validator';

function AdditionalDetailValidate(data){
    console.log(data)
    
    const error = {}

    if (validator.isEmpty(data.ans1.toString())){
        error.ans1 = "this filed is empty"
    
    }if (validator.isEmpty(data.ans2.toString())){
        error.ans2 = "this filed is empty"
    
    }if (validator.isEmpty(data.ans3.toString())){
        error.ans3 = "this filed is empty"
    
    }if (validator.isEmpty(data.ans4.toString())){
        error.ans4 = "this filed is empty"
    
    }

    console.log(error)
    return { error}
} 

export default AdditionalDetailValidate