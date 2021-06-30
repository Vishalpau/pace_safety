import validator from "validator";

function DetailValidation(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.evidenceSupport)) {
    error.evidenceSupport = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.evidenceContradiction)) {
    error.evidenceContradiction = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.evidenceNotSupport)) {
    error.evidenceNotSupport = "This Field is Empty";
    isValid = false;
  }

  return { error, isValid };
}

export default DetailValidation;
