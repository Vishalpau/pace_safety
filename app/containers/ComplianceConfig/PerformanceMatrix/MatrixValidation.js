import React from 'react'

export default function MatrixValidation(data) {
    let error = {}
    let isValid = true;

    if (data.matrixConstant == "") {
        error['matrixConstant'] = "Please enter matrix constant"
        isValid = false
    }

    if (parseInt(data.matrixConstant) < 1 || parseInt(data.matrixConstant) > 5) {
        error['matrixConstant'] = "Matrix constant value should be between 1 and 5"
        isValid = false
    }

    if (data.matrixConstantColor == "") {
        error['matrixConstantColor'] = "Please select matrix color"
        isValid = false
    }
    return { error, isValid }
}
