import validator from "validator";

function EventDetailsCostValidate(data) {
    const errorCost = {};

    for (let i = 0; i < data.length; i++) {
        if (data[i].costType.length > 0 || data[i].casualFactor.length > 0) {

            if (validator.isEmpty(data[i].costAmount.toString())) {
                errorCost[`costAmount${[i]}`] = `please enter cost amount ${i + 1}`;
            } else if (isNaN(data[i].costAmount)) {
                errorCost[`costAmount${[i]}`] = `please enter numeric values in cost amount ${i + 1}`;
            } else if (!data[i].costAmount.toString().includes(".")) {
                errorCost[`costAmount${[i]}`] = `please enter only float values in cost amount ${i + 1}`;
            } else {
                let valueBeforDecimal = data[i].costAmount.toString().split(".")[0]
                let valueAfterDecimal = data[i].costAmount.toString().split(".")[1]
                if (valueBeforDecimal.length > 13) {
                    errorCost[`costAmount${[i]}`] = `please enter less than 12 character in cost amount ${i + 1}`;
                } else if (valueAfterDecimal.length > 2) {
                    errorCost[`costAmount${[i]}`] = `please enter only two values decimal value in cost amount ${i + 1}`;
                }
            }
        }
    }
    return { errorCost };
}

export default EventDetailsCostValidate;
