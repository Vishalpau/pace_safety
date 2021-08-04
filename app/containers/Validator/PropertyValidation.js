import validator from "validator";

function PropertyValidate(data) {
 
  let isValid = true;
  const error = {};



  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].propertyType.toString())) {
      error[`propertyType${[i]}`] = "Please select property type";
      isValid = false;
    }

    if (data[i].propertyOtherType.length>55) {
      error[`propertyOtherType${[i]}`] = "Please enter less than 55 character";
      isValid = false;
    }

    if (validator.isEmpty(data[i].damageDetails.toString())) {
      error[`damageDetails${[i]}`] = "Please enter damage details";
      isValid = false;
    }
  }

  return { error, isValid };
}

export default PropertyValidate;
