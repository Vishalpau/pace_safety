import React from 'react'
// for validation msgs
export default function MatrixValidation(data) {
    let error = {}
    let isValid = true;

    if (data.matrixConstant == "") {
        error['matrixConstant'] = "Please enter matrix constant"
        isValid = false
    }

    if (data.matrixConstantColor == "") {
        error['matrixConstantColor'] = "Please select matrix color"
        isValid = false
    }
    return { error, isValid }
}
