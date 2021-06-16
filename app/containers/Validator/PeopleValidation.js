import validator from 'validator';

function PeopleValidate(data){
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.projectname)){
        error.projectname = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    

    return { error, isValid }
} 

export default PeopleValidate
