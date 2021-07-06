import validator from "validator";

function PeopleValidate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].personType.toString())) {
      error[`personType${[i]}`] = "Please select person type";
      isValid = false;
    }

    if (validator.isEmpty(data[i].personDepartment.toString())) {
      error[`personDepartment${[i]}`] = "Please select department.";
      isValid = false;
    }

    if (validator.isEmpty(data[i].personName.toString())) {
      error[`personName${[i]}`] = "Please enter person name.";
      isValid = false;
    }

    // if (validator.isEmpty(data[i].personIdentification.toString())) {
    //   error[`personIdentification${[i]}`] = "This field is empty";
    //   isValid = false;
    // }

    if (validator.isEmpty(data[i].personMedicalCare.toString())) {
      error[`personMedicalCare${[i]}`] = "Please choose medical care.";
      isValid = false;
    }

    // if (validator.isEmpty(data[i].workerOffsiteAssessment.toString())) {
    //   error[`workerOffsiteAssessment${[i]}`] = "This field is empty";
    //   isValid = false;
    // }

    // if (validator.isEmpty(data[i].locationAssessmentCenter.toString())) {
    //   error[`locationAssessmentCenter${[i]}`] = "This field is empty";
    //   isValid = false;
    // }
  }

  console.log(error);
  return { error, isValid };
}

export default PeopleValidate;
