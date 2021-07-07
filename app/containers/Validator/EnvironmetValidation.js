import validator from "validator";

function EnvironmentValidate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].envQuestion.toString())) {
      error[`envQuestion${[i]}`] = "Please choose enviornment question.";
      isValid = false;
    }

    if (validator.isEmpty(data[i].envAnswerDetails.toString())) {
     
      error[`envAnswerDetails${[i]}`] =
        "Please enter enviornment answer details.";
      isValid = false;
    }
    if (validator.isEmpty(data[i].envQuestionOption.toString())) {
      error[`envQuestionOption${[i]}`] =
        "Please choose given option";
      isValid = false;
    }
  }

  console.log(error, isValid);
  return { error, isValid };
}

export default EnvironmentValidate;
