import validator from 'validator';

function EnvironmentValidate(data){
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.envQuestion.toString())){
        error.envQuestion = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    if (validator.isEmpty(data.envAnswerDetails.toString())){
        error.envAnswerDetails = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.envQuestionOption.toString())){
        error.envQuestionOption = "this filed is empty"
        isValid = false
    }

    // if (validator.isEmpty(data.releasedetails.toString())){
    //     error.releasedetails = "this filed is empty"
    //     isValid = false
    // }

    // if (validator.isEmpty(data.iswildlifeimpact.toString())){
    //     error.iswildlifeimpact = "this filed is empty"
    //     isValid = false
    // }

    // if (validator.isEmpty(data.wildlifeimpacedetails.toString())){
    //     error.wildlifeimpacedetails = "this filed is empty"
    //     isValid = false
    // }

    // if (validator.isEmpty(data.iswaterbodyaffected.toString())){
    //     error.iswaterbodyaffected = "this filed is empty"
    //     isValid = false
    // }

    // if (validator.isEmpty(data.waterbodyaffecteddetails.toString())){
    //     error.waterbodyaffecteddetails = "this filed is empty"
    //     isValid = false
    // }

    // if (validator.isEmpty(data.comment.toString())){
    //     error.comment = "this filed is empty"
    //     isValid = false
    // }
    console.log(error)
    return { error, isValid }
} 

export default EnvironmentValidate
