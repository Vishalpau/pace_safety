
import validator from 'validator';

function validate(data){
    let isValid = true
    const error = {}
    console.log(data.projectname)


        if(data.projectname == 0){
            error.projectname = "Please choose project name."
            isValid = false
        }
        
    

    // if (validator.isEmpty(data.unitname)){
    //     error.unitname = "this filed is empty"
    //     isValid = false
    // }else{
    //     isValid = true
    // }

    if (validator.isEmpty(data.incidenttype)){
        error.incidenttype = "Please choose incident type."
        isValid = false
    }else{
        isValid = true
    }


   

    if (validator.isEmpty(data.title)){
        error.title = "Please enter incident title."
        isValid = false
    }else{
        isValid = true
    }

    // if (validator.isEmpty(data.description)){
    //     error.description = "this filed is empty"
    //     isValid = false
    // }else{
    //     isValid = true
    // }

    // if (validator.isEmpty(data.immediateactiontaken)){
    //     error.immediateactiontaken = "this filed is empty"
    //     isValid = false
    // }else{
    //     isValid = true
    // }

    // if (validator.isEmpty(data.location)){
    //     error.location = "this filed is empty"
    //     isValid = false
    // }else{
    //     isValid = true
    // }

    if (validator.isEmpty(data.contractor)){
        error.contractor = "Please choose contractor name."
        isValid = false
    }else{
        isValid = true
    }

    // if (validator.isEmpty(data.subcontractor)){
    //     error.subcontractor = "this filed is empty"
    //     isValid = false
    // }else{
    //     isValid = true
    // }

    if (validator.isEmpty(data.personaffected)){
        error.personaffected = "Please choose person affected."
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.propertyaffected)){
        error.propertyaffected = "Please choose property affected."
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.equiptmenteffected)){
        error.equiptmenteffected = "Please choose equipment affected."
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.environmentaffected)){
        error.environmentaffected = "Please choose enviornment affected."
        isValid = false
    }else{
        isValid = true
    }

    return { error, isValid }
} 

export default validate
