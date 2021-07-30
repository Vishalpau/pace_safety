import validator from "validator";

function EventDetailsCostValidate(data) {
    const errorCost = {};

    for (let i = 0; i < data.length; i++) {
        if (validator.isEmpty(data[i].costType.toString())) {
            errorCost[`costType${[i]}`] = `Please select cost type ${i + 1}`;
        }
        if (validator.isEmpty(data[i].costAmount.toString())) {
            errorCost[`costAmount${[i]}`] = `Please fill cost amount ${i + 1}`;
        } else if (isNaN(parseInt(data[i].costAmount))) {
            errorCost[`costAmount${[i]}`] = `Please fill numeric values in cost amount ${i + 1}`;
        }
        if (validator.isEmpty(data[i].casualFactor.toString())) {
            errorCost[`casualFactor${[i]}`] = `Please select casual factor ${i + 1}`;
        }
    }

    return { errorCost };
}

export default EventDetailsCostValidate;
