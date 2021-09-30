import validator from "validator";

function InitialNotificationValidator(data, projectStructure) {


  const error = {};
  let isValid = true;

  const breakdownValue = JSON.parse(localStorage.getItem('projectName')).projectName.breakdown
  for (let i = 0; i < breakdownValue.length; i++) {
    var element = projectStructure[i]
    console.log({ element: element })
    if (projectStructure[i] === undefined) {
      error[`projectStructure${[i]}`] = `Please select ${breakdownValue[i].structure[0].name}`;
      isValid = false;
    }
  }


  if (validator.isEmpty(data.observationDetails.toString())) {
    error.observationDetails = "Please enter observation details";
    isValid = false;
  }

  if (validator.isEmpty(data.isSituationAddressed.toString())) {
    error.isSituationAddressed = "Please select any one";
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

  if (data.isSituationAddressed === "Yes") {
    if (validator.isEmpty(data.actionTaken.toString())) {
      error.actionTaken = "Please enter describe the actions taken";
      isValid = false;

    }
  }

  if (data.observationTitle.length > 255) {
    error.observationTitle = "Please enter less than 255 characters";
    isValid = false;
  }

  //  if (validator.isEmpty(data.supervisorName.toString())) {
  //   error.supervisorName = "Please select the supervisor's name";
  //   isValid = false;
  // }

  if (validator.isEmpty(data.acceptAndPledge.toString())) {
    error.acceptAndPledge = "Please check the Accept & Pledge";
    isValid = false;
  }


  return { error, isValid };
}

export default InitialNotificationValidator;
