import validator from "validator";

function EventDetailsCostValidate(data) {
    const errorCost = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i].costAmount.toString().length > 0) {
            {
                if (isNaN(data[i].costAmount)) {
                    errorCost[`costAmount${[i]}`] = `please enter numeric values in cost amount`;
                } else if (data[i].costAmount.toString().includes(".")) {
                    let valueBeforDecimal = data[i].costAmount.toString().split(".")[0]
                    let valueAfterDecimal = data[i].costAmount.toString().split(".")[1]
                    if (valueBeforDecimal.length > 13) {
                        errorCost[`costAmount${[i]}`] = `Please enter upto 12 digits in cost amount`;
                    } else if (valueAfterDecimal.length > 2) {
                        errorCost[`costAmount${[i]}`] = `enter upto 2 decimal digits in cost amount`;
                    }
                }
                if (!data[i].costAmount.toString().includes(".") &&
                    data[i].costAmount.toString().length > 13) {
                    console.log("here")
                    errorCost[`costAmount${[i]}`] = `Please enter upto 12 digits in cost amount`;
                }
            }
        } else if (data[i].costType.toString().length > 0 || data[i].casualFactor.toString().length) {
            errorCost[`costAmount${[i]}`] = `please enter cost amount`;
        }
    }
    return { errorCost };
}

export default EventDetailsCostValidate;
