import validator from 'validator';

function WhyAnalysisValidate(data) {
    console.log(data)
    let isValid = true
    const error = {}


    for (let i = 0; i < data.length; i++) {
        if (validator.isEmpty(data[i].why)) {
            error[`why${[i]}`] = "this filed is empty"
            isValid = false
        }

        // if (validator.isEmpty(data[i].locationAssessmentCenter.toString())) {
        //     error[`locationAssessmentCenter${[i]}`] = "this filed is empty"
        //     isValid = false
        // }

    }

    console.log(error)
    return { error, isValid }
}

export default WhyAnalysisValidate