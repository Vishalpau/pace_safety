import validator from "validator";

function InitialEvidenceValidate(data) {
  let isValid = true;
  const error = {};
  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].evidenceDocument.toString())) {
      error[`evidenceDocument${[i]}`] = "Please select file.";
      isValid = false;
    }
  
    if (validator.isEmpty(data[i].evidenceRemark.toString())) {
      error[`evidenceRemark${[i]}`] = "Please enter evidance remark";
      isValid = false;
    }

  }
//   if (validator.isEmpty(data.evidenceDocument.toString())) {
//     error.evidenceDocument = "Please select file";
//     isValid = false;
//   }
//   if (validator.isEmpty(data.evidenceRemark.toString())) {
//     error.evidenceRemark = "Please enter evidance remark";
//     isValid = false;
//   }

  return { error, isValid };
}

export default InitialEvidenceValidate;
