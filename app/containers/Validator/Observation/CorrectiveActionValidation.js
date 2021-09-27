import validator from "validator";

function CorrectiveActionValidator(data) {
  

  const error = {};
  let isValid = true;
  if (data.reviewedByName === null) {
    error.reviewedByName = "Please select the reviewedBy";
    isValid = false;
  }

  if (data.isCorrectiveActionTaken === null) {
    error.isCorrectiveActionTaken = "Please select any one";
    isValid = false;
  }

  if (data.reviewedOn === null) {
    error.reviewedOn = "Please select date and time";
    isValid = false;
  }

  if(data.reviewedOn > new Date()){
    error.reviewedOn = "Please select correct  time";
    isValid = false;
  }

return { error, isValid };
}

export default CorrectiveActionValidator;
