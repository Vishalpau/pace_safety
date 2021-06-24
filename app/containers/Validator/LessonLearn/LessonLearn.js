import validator from 'validator';

function LessionLearned(data){
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.team)){
        error.team = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }
    
       
    if (validator.isEmpty(data.teamLearning)){
        error.teamLearning = "this filed is empty"
        isValid = false
    }

    
    console.log(error)
    return { error, isValid }
} 

export default LessionLearned;
