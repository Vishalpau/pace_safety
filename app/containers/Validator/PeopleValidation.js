import validator from "validator";

function PeopleValidate(data) {
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].personType.toString())) {
      error[`personType${[i]}`] = "Please select person type";
      isValid = false;
    }

    if (validator.isEmpty(data[i].personDepartment.toString())) {
      error[`personDepartment${[i]}`] = "Please select department";
      isValid = false;
    }

    if (validator.isEmpty(data[i].personName.toString())) {
      error[`personName${[i]}`] = "Please enter person name";
      isValid = false;
    }
    if (data[i].personName.length > 45) {
      error[`personName${[i]}`] = "Please enter less than 45 character";
      isValid = false;
    }

    if (data[i].personIdentification.length > 45) {
      error[`personIdentification${[i]}`] = "Please enter less than 45 character";
      isValid = false;
    }

    if (validator.isEmpty(data[i].personMedicalCare.toString())) {
      error[`personMedicalCare${[i]}`] = "Please choose medical care";
      isValid = false;
    }

    if (data[i].workerOffsiteAssessment.length>255) {
      error[`workerOffsiteAssessment${[i]}`] = "Please enter less than 255 character";
      isValid = false;
    }

    if (data[i].locationAssessmentCenter.length>255) {
      error[`locationAssessmentCenter${[i]}`] ="Please enter less than 255 character";
      isValid = false;
    }
  }

  return { error, isValid };
}

export default PeopleValidate;
