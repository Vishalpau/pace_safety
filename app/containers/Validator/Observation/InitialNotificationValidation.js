import validator from "validator";

function InitialNotificationValidator(data, projectStructure) {


  const error = {};
  let isValid = true;
  console.log(data,"data")
  const breakdownValue = JSON.parse(localStorage.getItem('projectName')).projectName.breakdown
  for (let i = 0; i < breakdownValue.length; i++) {
    var element = projectStructure[i]
    //console.log({ element: element })
    if (projectStructure[i] === undefined) {
      error[`projectStructure${[i]}`] = `Select ${breakdownValue[i].structure[0].name}`;
      isValid = false;
    }
  }


  if (data.observationDetails == null || data.observationDetails == "") {
    error.observationDetails = "Enter iCare details";
    isValid = false;
  }
  

  if (data.isSituationAddressed == null || data.isSituationAddressed == "") {
    error.isSituationAddressed = "Select whether you addressed the situation";
    isValid = false;
  }

  if ((data.reportedByName == parseInt(data.reportedByName, 10)) === true) {
    error.reportedByName = "Only numbers are not allowed.";
    isValid = false;
  }

  // if (validator.isEmpty(data.reportedByDepartment.toString())) {
  //   error.reportedByDepartment = "Please select the observer department";
  //   isValid = false;
  // }

  if (data.reportedByName == null || data.reportedByName == "") {
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
    if (data.actionTaken == null || data.actionTaken == "") {
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

  if (data.acceptAndPledge == null || data.acceptAndPledge == ""){
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
