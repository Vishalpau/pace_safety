import validator from 'validator';

function EnvironmentValidate(data){
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.isspills)){
        error.isspills = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.spilldetails)){
        error.spilldetails = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.isrelease)){
        error.isrelease = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.releasedetails)){
        error.releasedetails = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.iswildlifeimpact)){
        error.iswildlifeimpact = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.wildlifeimpacedetails)){
        error.wildlifeimpacedetails = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.iswaterbodyaffected)){
        error.iswaterbodyaffected = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.waterbodyaffecteddetails)){
        error.waterbodyaffecteddetails = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.comment)){
        error.comment = "this filed is empty"
        isValid = false
    }

    return { error, isValid }
} 

export default EnvironmentValidate
