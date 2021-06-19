import validator from 'validator';

function PeopleValidate(data){
    console.log(data)
    let isValid = true
    const error = {}

   
    for (let i = 0;i < data.length;i++){
        if (validator.isEmpty(data[i].personType.toString())){
            error[`personType${[i]}`] = "this filed is empty"
            isValid = false
        }

        if (validator.isEmpty(data[i].personDepartment.toString())){
            error[`personDepartment${[i]}`] = "this filed is empty"
            isValid = false
        }

        if (validator.isEmpty(data[i].personName.toString())){
            error[`personName${[i]}`] = "this filed is empty"
            isValid = false
        }

        if (validator.isEmpty(data[i].personIdentification.toString())){
            error[`personIdentification${[i]}`] = "this filed is empty"
            isValid = false
        }

        if (validator.isEmpty(data[i].personMedicalCare.toString())){
            error[`personMedicalCare${[i]}`] = "this filed is empty"
            isValid = false
        }

        if (validator.isEmpty(data[i].workerOffsiteAssessment.toString())){
            error[`workerOffsiteAssessment${[i]}`] = "this filed is empty"
            isValid = false
        }

        if (validator.isEmpty(data[i].locationAssessmentCenter.toString())){
            error[`locationAssessmentCenter${[i]}`] = "this filed is empty"
            isValid = false
        }

    }
       
    console.log(error)
    return { error, isValid }
} 

export default PeopleValidate
