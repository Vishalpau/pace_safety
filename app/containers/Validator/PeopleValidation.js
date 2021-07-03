import validator from "validator";

function PeopleValidate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].personType.toString())) {
      error[`personType${[i]}`] = "This Field is Empty";
      isValid = false;
    }

    if (validator.isEmpty(data[i].personDepartment.toString())) {
      error[`personDepartment${[i]}`] = "This Field is Empty";
      isValid = false;
    }

    if (validator.isEmpty(data[i].personName.toString())) {
      error[`personName${[i]}`] = "This Field is Empty";
      isValid = false;
    }

    // if (validator.isEmpty(data[i].personIdentification.toString())) {
    //   error[`personIdentification${[i]}`] = "This Field is Empty";
    //   isValid = false;
    // }

    if (validator.isEmpty(data[i].personMedicalCare.toString())) {
      error[`personMedicalCare${[i]}`] = "This Field is Empty";
      isValid = false;
    }

    // if (validator.isEmpty(data[i].workerOffsiteAssessment.toString())) {
    //   error[`workerOffsiteAssessment${[i]}`] = "This Field is Empty";
    //   isValid = false;
    // }

    // if (validator.isEmpty(data[i].locationAssessmentCenter.toString())) {
    //   error[`locationAssessmentCenter${[i]}`] = "This Field is Empty";
    //   isValid = false;
    // }
  }

  console.log(error);
  return { error, isValid };
}

export default PeopleValidate;
