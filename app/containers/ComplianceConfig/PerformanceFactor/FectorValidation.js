import React from 'react'

export default function FectorValidation(data) {
    console.log(data)
    let error = {}
    let isValid = true

    if(data.factorType == "") {
        error['factorType'] = "Please select fector type"
        isValid = false
    }
    
    if(data.factorName == "") {
        error['factorName'] = "Please select fector name"
        isValid = false
    }
    
    if(data.factorConstant == "") {
        error['factorConstant'] = "Please select fector constant"
        isValid = false
    }    


  return { error, isValid}
}
