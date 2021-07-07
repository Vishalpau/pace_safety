
import validator from "validator";

function EvidenceValidate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

    for(let i = 0; i <data.length; i++){
        if (validator.isEmpty(data[i].evidenceCheck.toString())){
            error[`evidenceCheck${[i]}`] = "Please select any one";
            isValid = false;
        }
        if (validator.isEmpty(data[i].evidenceRemark.toString())){
            error[`evidenceRemark${[i]}`] = "This field is required";
            isValid = false;
        }
    }
    console.log("------", error);
  return { error, isValid };
}

export default EvidenceValidate;

