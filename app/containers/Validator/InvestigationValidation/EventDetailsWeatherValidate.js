import validator from "validator";

function EventDetailsWeatherValidate(data) {
    const errorWeather = {};

    for (let i = 0; i < data.length; i++) {
        if (validator.isEmpty(data[i].weatherCondition.toString())) {
            errorWeather[`weatherCondition${[i]}`] = `Please select weather condition ${i + 1}`;

        }
    }

    return { errorWeather };
}

export default EventDetailsWeatherValidate;
