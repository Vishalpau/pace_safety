import validator from "validator";

function EventDetailsValidate(data) {
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
    if (data.temperature.length !== 0 && data.temperature.length > 45) {
        error.temperature = "Please fill less than 45 characters in temperature";
    }
    if (data.windSpeed.length !== 0 && data.windSpeed.length > 45) {
        error.windSpeed = "Please fill less than 45 characters in wind speed";
    }
    if (data.windDirection.length !== 0 && data.windDirection.length > 45) {
        error.windDirection = "Please fill less than 45 characters in wind direction";
    }
    if (data.spillsFluidAmount.length !== 0 && data.spillsFluidAmount.length > 45) {
        error.spillsFluidAmount = "Please fill less than 45 characters in fluid amount";
    }
    if (data.acceptableExplosiveLimit.length !== 0 && data.acceptableExplosiveLimit.length > 45) {
        error.acceptableExplosiveLimit = "Please fill less than 45 characters in AEL";
    }
    if (data.permissableExplosiveLimit.length !== 0 && data.permissableExplosiveLimit.length > 45) {
        error.permissableExplosiveLimit = "Please fill less than 45 characters in EPL";
    }
    if (data.propertyImpactInformation.length !== 0 && data.propertyImpactInformation.length > 75) {
        error.propertyImpactInformation = "Please fill less than 75 characters in impact information";
    }
    if (data.propertyCostImpact.length !== 0 && data.propertyCostImpact.length > 75) {
        error.propertyCostImpact = "Please fill less than 75 characters in cost information";
    }
    return { error, isValid };
}

export default EventDetailsValidate;

