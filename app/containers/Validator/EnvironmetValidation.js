import validator from "validator";

function EnvironmentValidate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].envQuestion.toString())) {
      error[`envQuestion${[i]}`] = "This field is empty";
      isValid = false;
    }

    if (validator.isEmpty(data[i].envAnswerDetails.toString())) {
      error[`envAnswerDetails${[i]}`] = "This field is empty";
      isValid = false;
    }
  }

  console.log(error);
  return { error, isValid };
}

export default EnvironmentValidate;
