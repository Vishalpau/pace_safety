import validator from "validator";

function EnvironmentValidate(data) {
  console.log(data)
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].envQuestion.toString())) {
      error[`envQuestion${[i]}`] = "Please choose enviornment question.";
      isValid = false;
    }

    if (validator.isEmpty(data[i].envQuestionOption.toString())) {
      let message =  data[i].envQuestion.slice(11) 
      error[`envQuestionOption${[i]}`] =
        `Please select were there  ${message}`;
      isValid = false;
    }
    if(data[i].envQuestionOption === "Yes"){
      if (validator.isEmpty(data[i].envAnswerDetails.toString())) {
        let message =  data[i].envQuestion.slice(14)  
        error[`envAnswerDetails${[i]}`] =
          `Please enter details of ${message.slice(0,-1)}`;
        isValid = false;
      }
    }
  }


  return { error, isValid };
}

export default EnvironmentValidate;
