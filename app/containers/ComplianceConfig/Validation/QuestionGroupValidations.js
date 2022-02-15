import validator from "validator";

function QuestionGroupValidation(projectStructure) {
  

  const error = {};
  let isValid = true;

  const breakdownValue = JSON.parse(localStorage.getItem('projectName')).projectName.breakdown
for (let i = 0; i < breakdownValue.length; i++) {
  var element = projectStructure[i]
  if (projectStructure[i] === undefined) {
    error[`projectStructure${[i]}`] = `Please select ${breakdownValue[i].structure[0].name}`;
    isValid = false;
  }
}

return { error, isValid };
}

export default QuestionGroupValidation;
