import validator from "validator";

function CorrectiveActionValidator(data) {
  

  const error = {};
  let isValid = true;
console.log(data);
  if (data.reviewedByName === null) {
    error.reviewedByName = "Please select the reviewedBy";
    isValid = false;
  }

  if (data.isCorrectiveActionTaken === null) {
    error.isCorrectiveActionTaken = "Please select any one";
    isValid = false;
  }

//   if (validator.isEmpty(data.location.toString())) {
//     error.location = "Please enter the location";
//     isValid = false;
//   }

  if (data.reviewedOn === null) {
    error.reviewedOn = "Please select date and time";
    isValid = false;
  }
//   if (isNaN(data.supervisorByBadgeId)) {
//     error.supervisorByBadgeId = "Only numbers allowed in supervisor's badge number";
//     isValid = false;
//  }

//  if (validator.isEmpty(data.supervisorName.toString())) {
//   error.supervisorName = "Please select the supervisor's name";
//   isValid = false;
// }


return { error, isValid };
}

export default CorrectiveActionValidator;
