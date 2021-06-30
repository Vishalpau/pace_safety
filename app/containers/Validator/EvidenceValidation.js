import validator from "validator";

function EvidenceValidate(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.evidenceType.toString())) {
    error.evidenceType = "This Field is Empty";
    isValid = false;
  } else if (validator.isEmpty(data.available.toString())) {
    error.available = "This Field is Empty";
    isValid = false;
  } else if (validator.isEmpty(data.comment.toString())) {
    error.comment = "This Field is Empty";
    isValid = false;
  }

  return { error, isValid };
}

export default EvidenceValidate;
