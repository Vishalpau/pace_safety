import validator from "validator";

function WhyAnalysisValidate(data) {
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].why)) {
      error[`why${[i]}`] = `Please enter why ${[i + 1]}`;
      isValid = false;
    }
  }
  return { error, isValid };
}
export default WhyAnalysisValidate;
