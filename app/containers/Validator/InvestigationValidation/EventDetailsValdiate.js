import validator from "validator";

function EventDetailsValidate(data) {
    let isValid = true;
    const error = {};

    if (validator.isEmpty(data.activity.toString())) {
        error.activity = "This field is empty";
        isValid = false;
    }

    if (validator.isEmpty(data.jobTask.toString())) {
        error.jobTask = "This field is empty";
        isValid = false;
    }

    if (validator.isEmpty(data.spillsFluidType.toString())) {
        error.spillsFluidType = "This field is empty";
        isValid = false;
    }

    return { error, isValid };
}

export default EventDetailsValidate;

