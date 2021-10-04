import validator from "validator";

function CorrectiveActionValidator(data) {
  

  const error = {};
  let isValid = true;
  if (data.reviewedByName === null) {
    error.reviewedByName = "Select the reviewedBy";
    isValid = false;
  }

  if (data.isCorrectiveActionTaken === null) {
    error.isCorrectiveActionTaken = "Select any one";
    isValid = false;
  }

  if (data.reviewedOn === null) {
    error.reviewedOn = "Select date and time";
    isValid = false;
  }

  if(data.reviewedOn > new Date()){
    error.reviewedOn = "Select correct time";
    isValid = false;
  }

return { error, isValid };
}

export default CorrectiveActionValidator;
