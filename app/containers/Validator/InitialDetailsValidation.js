import validator from "validator";

function initialdetailvalidate(data) {
  console.log(data);

  const error = {};

  if (validator.isEmpty(data.unitconstructionmanagername.toString())) {
    console.log("data.unitconstructionmanagername");
    error.unitconstructionmanagername = "This Field is Empty";
  }

  if (validator.isEmpty(data.unitconstructionmanagercontact.toString())) {
    error.unitconstructionmanagercontact = "This Field is Empty";
  }

  if (validator.isEmpty(data.unithsespecialistname.toString())) {
    error.unithsespecialistname = "This Field is Empty";
  }

  if (validator.isEmpty(data.unithsespecialistcontactno.toString())) {
    error.unithsespecialistcontactno = "This Field is Empty";
  }

  if (validator.isEmpty(data.actualseveritylevel.toString())) {
    error.actualseveritylevel = "This Field is Empty";
  }

  if (validator.isEmpty(data.potentialseveritylevel.toString())) {
    error.potentialseveritylevel = "This Field is Empty";
  }

  if (validator.isEmpty(data.activity.toString())) {
    error.activity = "This Field is Empty";
  }

  if (validator.isEmpty(data.projectname.toString())) {
    error.projectname = "This Field is Empty";
  }

  if (validator.isEmpty(data.jobtask.toString())) {
    error.jobtask = "This Field is Empty";
  }

  if (validator.isEmpty(data.equipmentinvoked.toString())) {
    error.equipmentinvoked = "This Field is Empty";
  }

  if (validator.isEmpty(data.weather.toString())) {
    error.weather = "This Field is Empty";
  }

  if (validator.isEmpty(data.temprature.toString())) {
    error.temprature = "This Field is Empty";
  }

  if (validator.isEmpty(data.lighting.toString())) {
    error.lighting = "This Field is Empty";
  }

  if (validator.isEmpty(data.windspeed.toString())) {
    error.windspeed = "This Field is Empty";
  }

  if (validator.isEmpty(data.fluidamount.toString())) {
    error.fluidamount = "This Field is Empty";
  }

  if (validator.isEmpty(data.fluidtype.toString())) {
    error.fluidtype = "This Field is Empty";
  }

  if (validator.isEmpty(data.ael.toString())) {
    error.ael = "This Field is Empty";
  }

  if (validator.isEmpty(data.pel.toString())) {
    error.pel = "This Field is Empty";
  }
  console.log(error);
  return { error };
}

export default initialdetailvalidate;
