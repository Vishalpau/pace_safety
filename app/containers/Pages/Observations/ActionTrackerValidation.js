import validator from "validator";

function ActionTrackerValidator(data) {
  
console.log(data)
  const error = {};
  let isValid = true;

  if (data.actionTitle === undefined) {
    error.actionTitle = "Please enter action title";
    isValid = false;
  }

  if (data.assignTo == 0) {
    error.assignTo = "Please select the assignee";
    isValid = false;
  }
  if(data.actionTitle != undefined){
    if(data.actionTitle.length > 255){
        error.actionTitle = "Please enter less than 255 character" 
        isValid = false;
     }
  }
 
//   if (data.reviewedByName === null) {
//     error.reviewedByName = "Please select the reviewedBy";
//     isValid = false;
//   }

//   if (data.isCorrectiveActionTaken === null) {
//     error.isCorrectiveActionTaken = "Please select any one";
//     isValid = false;
//   }

//   if (validator.isEmpty(data.location.toString())) {
//     error.location = "Please enter the location";
//     isValid = false;
//   }

//   if (data.reviewedOn === null) {
//     error.reviewedOn = "Please select date and time";
//     isValid = false;
//   }

//   if(data.reviewedOn > new Date()){
//     error.reviewedOn = "Please select correct  time";
//     isValid = false;
//   }
//   if (isNaN(data.supervisorByBadgeId)) {
//     error.supervisorByBadgeId = "Only numbers allowed in supervisor's badge number";
//     isValid = false;
//  }

//  if (validator.isEmpty(data.supervisorName.toString())) {
//   error.supervisorName = "Please select the supervisor's name";
//   isValid = false;
// }

console.log("sdsd",error)
return { error, isValid };
}

export default ActionTrackerValidator;
