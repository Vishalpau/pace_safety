import validator from "validator";

function WhyAnalysisValidate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].why)) {
      error[`why${[i]}`] = "This Field is Empty";
      isValid = false;
    }

    // if (validator.isEmpty(data[i].locationAssessmentCenter.toString())) {
    //     error[`locationAssessmentCenter${[i]}`] = "This Field is Empty"
    //     isValid = false
    // }
  }

  console.log(error);
  return { error, isValid };
}

export default WhyAnalysisValidate;
