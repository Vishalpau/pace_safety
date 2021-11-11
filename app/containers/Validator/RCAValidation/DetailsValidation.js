import validator from "validator";

function DetailValidation(data) {
  // console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.evidenceSupport)) {
    error.evidenceSupport = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.evidenceContradiction)) {
    error.evidenceContradiction = "This field is empty";
    isValid = false;
  }

  // if (validator.isEmpty(data.evidenceNotSupport)) {
  //   error.evidenceNotSupport = "This field is empty";
  //   isValid = false;
  // }

  if (validator.isEmpty(data.rcaRecommended)) {
    error.rcaRecommended = "Please select RCA recommended";
    isValid = false;
  }
  return { error, isValid };
}

export default DetailValidation;
