import validator from "validator";

function AdditionalDetailValidate(data) {
  console.log(data);

  const error = {};

  if (validator.isEmpty(data.ans1.toString())) {
    error.ans1 = "This Field is Empty";
  }
  if (validator.isEmpty(data.ans2.toString())) {
    error.ans2 = "This Field is Empty";
  }
  if (validator.isEmpty(data.ans3.toString())) {
    error.ans3 = "This Field is Empty";
  }
  if (validator.isEmpty(data.ans4.toString())) {
    error.ans4 = "This Field is Empty";
  }

  console.log(error);
  return { error };
}

export default AdditionalDetailValidate;
