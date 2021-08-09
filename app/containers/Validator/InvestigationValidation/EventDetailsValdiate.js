import validator from "validator";

function EventDetailsValidate(data) {
    let isValid = true;
    const error = {};

    if (validator.isEmpty(data.activity.toString())) {
        error.activity = "please select activity";
        isValid = false;
    }

    if (validator.isEmpty(data.jobTask.toString())) {
        error.jobTask = "please select job task";
        isValid = false;
    }

    if (validator.isEmpty(data.spillsFluidType.toString())) {
        error.spillsFluidType = "please select spills type";
        isValid = false;
    }
    if (data.temperature.length !== 0 && data.temperature.length > 45) {
        error.temperature = "please enter less than 45 characters in temperature";
    }
    if (data.windSpeed.length !== 0 && data.windSpeed.length > 45) {
        error.windSpeed = "please enter less than 45 characters in wind speed";
    }
    if (data.windDirection.length !== 0 && data.windDirection.length > 45) {
        error.windDirection = "please enter less than 45 characters in wind direction";
    }
    if (data.spillsFluidAmount.length !== 0 && data.spillsFluidAmount.length > 45) {
        error.spillsFluidAmount = "please enter less than 45 characters in fluid amount";
    }
    if (data.acceptableExplosiveLimit.length !== 0 && data.acceptableExplosiveLimit.length > 45) {
        error.acceptableExplosiveLimit = "please enter less than 45 characters in AEL";
    }
    if (data.permissableExplosiveLimit.length !== 0 && data.permissableExplosiveLimit.length > 45) {
        error.permissableExplosiveLimit = "please enter less than 45 characters in EPL";
    }
    if (data.propertyImpactInformation.length !== 0 && data.propertyImpactInformation.length > 75) {
        error.propertyImpactInformation = "please enter less than 75 characters in impact information";
    }
    if (data.propertyCostImpact.length !== 0 && data.propertyCostImpact.length > 75) {
        error.propertyCostImpact = "please enter less than 75 characters in cost information";
    }
    return { error, isValid };
}

export default EventDetailsValidate;

