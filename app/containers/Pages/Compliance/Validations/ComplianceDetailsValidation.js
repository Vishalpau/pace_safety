import validator from "validator";
// for validations messages
function ComplianceValidation(data, projecStructureLength) {
  let error = {};
  let isValid = true;
// project str vaildations
  const breakdownValue = JSON.parse(localStorage.getItem("projectName"))
    .projectName.breakdown;
  for (let i = 0; i < breakdownValue.length; i++) {
    var element = projecStructureLength[i];
    if (projecStructureLength[i] === undefined) {
      error[`projectStructure${[i]}`] = `Please select ${
        breakdownValue[i].structure[0].name
      }`;
      isValid = false;
    }
  }

  if (data.auditType === "") {
    error.auditType = "Please select a audit type";
    isValid = false;
  }

  if (data.contractor === "") {
    error.contractor = "Please select a contractor";
    isValid = false;
  }

  // if (data.subContractor === "") {
  //   error.subContractor = "Please select a substractor";
  //   isValid = false;
  // }

  return { error, isValid };
}
export default ComplianceValidation;
