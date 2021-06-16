import validator from 'validator';

function validate(data){
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.projectname)){
        error.projectname = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.unitname)){
        error.unitname = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.incidenttype)){
        error.incidenttype = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    // if (validator.isEmpty(data.incidentdata)){
    //     error.incidentdata = "this filed is empty"
    //     isValid = false
    // }else{
    //     isValid = true
    // }

    // if (validator.isEmpty(data.incidenttime)){
    //     error.incidenttime = "this filed is empty"
    //     isValid = false
    // }else{
    //     isValid = true
    // }

    if (validator.isEmpty(data.title)){
        error.title = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.description)){
        error.description = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.immediateactiontaken)){
        error.immediateactiontaken = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.location)){
        error.location = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.contractor)){
        error.contractor = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.subcontractor)){
        error.subcontractor = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.personaffected)){
        error.personaffected = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.propertyaffected)){
        error.propertyaffected = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.equiptmenteffected)){
        error.equiptmenteffected = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.environmentaffected)){
        error.environmentaffected = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    return { error, isValid }
} 

export default validate
