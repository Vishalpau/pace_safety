import validator from "validator";

function ProjectDetailsValidator(data) {
  

  const error = {};
  let isValid = true;

  if (validator.isEmpty(data.description.toString())) {
    error.description = "Please enter description";
    isValid = false;
  }

  if (validator.isEmpty(data.location.toString())) {
    error.location = "Please enter the work location";
    isValid = false;
  }

  if (validator.isEmpty(data.permitToPerform.toString())) {
    error.permitToPerform = "Please choose any one ";
    isValid = false;
  }

  if (data.assessmentDate === null) {
    error.assessmentDate = "Please select date and time";
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

export default ProjectDetailsValidator;
