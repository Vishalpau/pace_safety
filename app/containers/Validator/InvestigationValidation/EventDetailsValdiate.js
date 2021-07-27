import validator from "validator";

function EventDetailsValidate(data) {
    console.log(data)
    let isValid = true;
    const error = {};

    if (validator.isEmpty(data.activity.toString())) {
        error.activity = "Please fill activity";
        isValid = false;
    }

    if (validator.isEmpty(data.jobTask.toString())) {
        error.jobTask = "Please fill job task";
        isValid = false;
    }

    if (validator.isEmpty(data.spillsFluidType.toString())) {
        error.spillsFluidType = "Please fill spills type";
        isValid = false;
    }

    return { error, isValid };
}

export default EventDetailsValidate;

