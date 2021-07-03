import validator from "validator";

function PropertyValidate(data) {
  // console.log(data)
  let isValid = true;
  const error = {};

  // if (validator.isEmpty(data.detailpropertyaffected)){
  //     error.detailpropertyaffected = "This Field is Empty"
  //     isValid = false
  // }else{
  //     isValid = true
  // }

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].propertyType.toString())) {
      error[`propertyType${[i]}`] = "This Field is Empty";
      isValid = false;
    }

    // if (validator.isEmpty(data[i].propertyOtherType.toString())) {
    //   error[`propertyOtherType${[i]}`] = "This Field is Empty";
    //   isValid = false;
    // }

    if (validator.isEmpty(data[i].damageDetails.toString())) {
      error[`damageDetails${[i]}`] = "This Field is Empty";
      isValid = false;
    }
  }

  // if (validator.isEmpty(data.describeactiontaken)){
  //     error.describeactiontaken = "This Field is Empty"
  //     isValid = false
  // }

  console.log(error);
  return { error, isValid };
}

export default PropertyValidate;
