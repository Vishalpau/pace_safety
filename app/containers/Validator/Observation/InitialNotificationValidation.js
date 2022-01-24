import validator from "validator";

function InitialNotificationValidator(data, projectStructure) {


  const error = {};
  let isValid = true;
  console.log(data)
  const breakdownValue = JSON.parse(localStorage.getItem('projectName')).projectName.breakdown
  for (let i = 0; i < breakdownValue.length; i++) {
    var element = projectStructure[i]
    console.log({ element: element })
    if (projectStructure[i] === undefined) {
      error[`projectStructure${[i]}`] = `Select ${breakdownValue[i].structure[0].name}`;
      isValid = false;
    }
  }


  if (validator.isEmpty(data.observationDetails.toString())) {
    error.observationDetails = "Enter iCare details";
    isValid = false;
  }

  if (validator.isEmpty(data.isSituationAddressed.toString())) {
    error.isSituationAddressed = "Select whether you addressed the situation";
    isValid = false;
  }

  if (validator.isEmpty(data.observationType.toString())) {
    error.observationType = "Choose any one iCare type";
    isValid = false;
  }

  // if (validator.isEmpty(data.reportedByDepartment.toString())) {
  //   error.reportedByDepartment = "Please select the observer department";
  //   isValid = false;
  // }

  if (validator.isEmpty(data.reportedByName.toString())) {
    error.reportedByName = "Select the observed by";
    isValid = false;
  }

  if (data.observedAt === null) {
    error.observedAt = "Select date and time";
    isValid = false;
  }
  //   if (isNaN(data.supervisorByBadgeId)) {
  //     error.supervisorByBadgeId = "Only numbers allowed in supervisor's badge number";
  //     isValid = false;
  //  }

  if (data.isSituationAddressed === "Yes") {
    if (validator.isEmpty(data.actionTaken.toString())) {
      error.actionTaken = "Enter actions taken";
      isValid = false;

    }
  }

  // if (data.observationTitle.length > 255) {
  //   error.observationTitle = "Enter less than 255 characters";
  //   isValid = false;
  // }

  //  if (validator.isEmpty(data.supervisorName.toString())) {
  //   error.supervisorName = "Please select the supervisor's name";
  //   isValid = false;
  // }

  if (validator.isEmpty(data.acceptAndPledge.toString())) {
    error.acceptAndPledge = "Check the accept & pledge";
    isValid = false;
  }

  if (data.departmentName !== "") {
    if (data.assigneeName === "") {
      error.assigneeName = "Select the assignee";
      isValid = false;
    }

  }


  return { error, isValid };
}

export default InitialNotificationValidator;
