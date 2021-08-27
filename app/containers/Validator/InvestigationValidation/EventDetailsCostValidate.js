import validator from "validator";

function EventDetailsCostValidate(data) {
    const errorCost = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i].costType.length > 0 || data[i].casualFactor.length > 0) {

            if (validator.isEmpty(data[i].costAmount.toString())) {
                errorCost[`costAmount${[i]}`] = `please enter cost amount`;
            } else if (isNaN(data[i].costAmount)) {
                errorCost[`costAmount${[i]}`] = `please enter numeric values in cost amount`;    
            }else if (data[i].costAmount.toString().includes(".")) {
                let valueBeforDecimal = data[i].costAmount.toString().split(".")[0]
                let valueAfterDecimal = data[i].costAmount.toString().split(".")[1]
                if (valueBeforDecimal.length > 13) {
                    errorCost[`costAmount${[i]}`] = `Please enter upto 12 digits in cost amount`;
                } else if (valueAfterDecimal.length > 2) {
                    errorCost[`costAmount${[i]}`] = `enter upto 2 decimal digits in cost amount`;
                }
            }else if (data[i].costAmount.toString().includes(".") == false){
                if (data[i].costAmount.toString().length > 13) {
                    errorCost[`costAmount${[i]}`] = `Please enter upto 12 digits in cost amount`;
                } 
            }
        }
    }
    return { errorCost };
}

export default EventDetailsCostValidate;
