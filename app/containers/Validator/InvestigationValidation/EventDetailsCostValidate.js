import validator from "validator";

function EventDetailsCostValidate(data) {
    const errorCost = {};

    for (let i = 0; i < data.length; i++) {
        if (validator.isEmpty(data[i].costType.toString())) {
            errorCost[`costType${[i]}`] = `Please select cost type ${i + 1}`;
        }
        if (validator.isEmpty(data[i].costAmount.toString())) {
            errorCost[`costAmount${[i]}`] = `Please select cost amount ${i + 1}`;
        }
        if (validator.isEmpty(data[i].casualFactor.toString())) {
            errorCost[`casualFactor${[i]}`] = `Please select casual factor ${i + 1}`;
        }
    }

    return { errorCost };
}

export default EventDetailsCostValidate;
