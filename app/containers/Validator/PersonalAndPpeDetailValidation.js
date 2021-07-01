import validator from "validator";

function PersonalAndPpeDetailValidate(data) {
  console.log(data);

  const error = {};

  if (validator.isEmpty(data.ppeans1.toString())) {
    error.ppeans1 = "This Field is Empty";
  }
  if (validator.isEmpty(data.ppeans2.toString())) {
    error.ppeans2 = "This Field is Empty";
  }
  if (validator.isEmpty(data.ppeans3.toString())) {
    error.ppeans3 = "This Field is Empty";
  }
  if (validator.isEmpty(data.ppeans4.toString())) {
    error.ppeans4 = "This Field is Empty";
  }

  if (validator.isEmpty(data.supervisionans1.toString())) {
    error.supervisionans1 = "This Field is Empty";
  }
  if (validator.isEmpty(data.supervisionans2.toString())) {
    error.supervisionans2 = "This Field is Empty";
  }
  if (validator.isEmpty(data.supervisionans3.toString())) {
    error.supervisionans3 = "This Field is Empty";
  }
  if (validator.isEmpty(data.supervisionans4.toString())) {
    error.supervisionans4 = "This Field is Empty";
  }
  if (validator.isEmpty(data.supervisionans5.toString())) {
    error.supervisionans5 = "This Field is Empty";
  }

  if (validator.isEmpty(data.flagans1.toString())) {
    error.flagans1 = "This Field is Empty";
  }
  if (validator.isEmpty(data.flagans2.toString())) {
    error.flagans2 = "This Field is Empty";
  }
  if (validator.isEmpty(data.flagans3.toString())) {
    error.flagans3 = "This Field is Empty";
  }

  if (validator.isEmpty(data.otherans1.toString())) {
    error.otherans1 = "This Field is Empty";
  }
  if (validator.isEmpty(data.otherans2.toString())) {
    error.otherans2 = "This Field is Empty";
  }

  console.log(error);
  return { error };
}

export default PersonalAndPpeDetailValidate;
