import validator from "validator";

function QuestionEditValidation(data, projectStructure) {
  const error = {};
  let isValid = true;

  const breakdownValue = JSON.parse(localStorage.getItem("projectName"))
    .projectName.breakdown;
  for (let i = 0; i < breakdownValue.length; i++) {
    var element = projectStructure[i];
    if (projectStructure[i] === undefined) {
      error[`projectStructure${[i]}`] = `Please select ${breakdownValue[i].structure[0].name
        }`;
      isValid = false;
    }
  }

  if (data.question === "") {
    error["question"] = "Please enter question";
    isValid = false;
  }
  if (data.groupName === "") {
    error["groupError"] = "Please select a group and a subgroup"
    isValid = false;
  } else {
    if (data.subGroupName === "") {
      error["groupError"] = "Please select a sub group"
      isValid = false
    }
  }

  return { error, isValid };
}

export default QuestionEditValidation;
