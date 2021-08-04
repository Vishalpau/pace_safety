import validator from "validator";

function InitialEvidenceValidate(data) {
  let isValid = true;
  const error = {};
  for (let i = 0; i < data.length; i++) {
  
    if (data[i].evidenceDocument !== null) {
      
      if(validator.isEmpty(data[i].evidenceRemark.toString())){
        
        error[`evidenceRemark${[i]}`] = "Please enter evidance remark";
        isValid = false;
      }
    }
    if (data[i].evidenceRemark.length>255) {
      error[`evidenceRemark${[i]}`] = "Please enter less than 255 character";
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
