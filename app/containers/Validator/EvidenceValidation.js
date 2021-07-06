import validator from "validator";

function EvidenceValidate(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.evidenceType.toString())) {
    error.evidenceType = "This field is empty";
    isValid = false;
  }
  if (validator.isEmpty(data.available.toString())) {
    error.available = "This field is empty";
    isValid = false;
  }
  if (validator.isEmpty(data.comment.toString())) {
    error.comment = "This field is empty";
    isValid = false;
  }

  return { error, isValid };
}

export default EvidenceValidate;
