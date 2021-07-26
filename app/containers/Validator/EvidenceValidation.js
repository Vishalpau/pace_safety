
import validator from "validator";

function EvidenceValidate(data) {
  let isValid = true;
  const error = {};

    for(let i = 0; i <data.length; i++){
        if (validator.isEmpty(data[i].evidenceCheck.toString())){
            error[`evidenceCheck${[i]}`] = "Please select any one";
            isValid = false;
        }
    }
  return { error, isValid };
}

export default EvidenceValidate;

