import validator from "validator";

function EnvironmentValidate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.envQuestion.toString())) {
    error.envQuestion = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.envAnswerDetails.toString())) {
    error.envAnswerDetails = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.envQuestionOption.toString())) {
    error.envQuestionOption = "This Field is Empty";
    isValid = false;
  }

  // if (validator.isEmpty(data.releasedetails.toString())){
  //     error.releasedetails = "This Field is Empty"
  //     isValid = false
  // }

  // if (validator.isEmpty(data.iswildlifeimpact.toString())){
  //     error.iswildlifeimpact = "This Field is Empty"
  //     isValid = false
  // }

  // if (validator.isEmpty(data.wildlifeimpacedetails.toString())){
  //     error.wildlifeimpacedetails = "This Field is Empty"
  //     isValid = false
  // }

  // if (validator.isEmpty(data.iswaterbodyaffected.toString())){
  //     error.iswaterbodyaffected = "This Field is Empty"
  //     isValid = false
  // }

  // if (validator.isEmpty(data.waterbodyaffecteddetails.toString())){
  //     error.waterbodyaffecteddetails = "This Field is Empty"
  //     isValid = false
  // }

  // if (validator.isEmpty(data.comment.toString())){
  //     error.comment = "This Field is Empty"
  //     isValid = false
  // }
  console.log(error);
  return { error, isValid };
}

export default EnvironmentValidate;
