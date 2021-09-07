import validator from "validator";

function InitialNotificationValidator(data,projectStructure,levelLenght) {
  

  const error = {};
  let isValid = true;


  if(projectStructure?projectStructure.length<levelLenght:false){
    error.projectStructure = "Please select stage of project";
    isValid = false;
  }


  if (validator.isEmpty(data.observationDetails.toString())) {
    error.observationDetails = "Please enter observation details";
    isValid = false;
  }

  if (validator.isEmpty(data.location.toString())) {
    error.location = "Please enter the location";
    isValid = false;
  }

  if (validator.isEmpty(data.observationType.toString())) {
    error.observationType = "Please choose any one observation type";
    isValid = false;
  }
  
  if (validator.isEmpty(data.reportedByDepartment.toString())) {
    error.reportedByDepartment = "Please select the observer department";
    isValid = false;
  }
  
  if (validator.isEmpty(data.reportedByName.toString())) {
    error.reportedByName = "Please select the observed by";
    isValid = false;
  }

  if (data.observedAt === null) {
    error.observedAt = "Please select date and time";
    isValid = false;
  }
//   if (isNaN(data.supervisorByBadgeId)) {
//     error.supervisorByBadgeId = "Only numbers allowed in supervisor's badge number";
//     isValid = false;
//  }

if(data.isSituationAddressed === "Yes") {
  if(validator.isEmpty(data.actionTaken.toString())){
    error.actionTaken = "Please enter describe the actions taken";
    isValid = false;

  }
}

 if (validator.isEmpty(data.supervisorName.toString())) {
  error.supervisorName = "Please select the supervisor's name";
  isValid = false;
}

if (validator.isEmpty(data.acceptAndPledge.toString())) {
  error.acceptAndPledge = "Please check the Accept & Pledge";
  isValid = false;
}


return { error, isValid };
}

export default InitialNotificationValidator;
