import React from 'react'

// for form validation msg
export default function FectorValidation(data) {
    console.log(data)
    let error = {}
    let isValid = true

    if(data.factorType == "") {
        error['factorType'] = "Please select factor type"
        isValid = false
    }
    
    if(data.factorName == "") {
        error['factorName'] = "Please select factor name"
        isValid = false
    }
    
    if(data.factorConstant == "") {
        error['factorConstant'] = "Please select factor constant"
        isValid = false
    }    


  return { error, isValid}
}
