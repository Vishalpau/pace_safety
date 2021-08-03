import validator from "validator";

function PropertyValidate(data) {
  // console.log(data)
  let isValid = true;
  const error = {};

  // if (validator.isEmpty(data.detailpropertyaffected)){
  //     error.detailpropertyaffected = "This field is empty"
  //     isValid = false
  // }else{
  //     isValid = true
  // }

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

  // if (validator.isEmpty(data.describeactiontaken)){
  //     error.describeactiontaken = "This field is empty"
  //     isValid = false
  // }

  return { error, isValid };
}

export default PropertyValidate;
