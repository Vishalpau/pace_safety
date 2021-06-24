import { is } from 'immutable';
import validator from 'validator';

function LessionLearnedValidator(data){
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.team)){
      
        error.team = "this filed is empty"
        isValid = false
    } 
    
    if (validator.isEmpty(data.teamLearning)){
        error.teamLearning = "this filed is empty"
        isValid = false
    }
    
    // const result = 

    
    // console.log('roor',error, isValid)
    return { error, isValid }
} 

export default LessionLearnedValidator;
