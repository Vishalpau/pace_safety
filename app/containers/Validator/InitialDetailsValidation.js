import validator from "validator";

function initialdetailvalidate(data) {
  

  const error = {};

  if (validator.isEmpty(data.unitconstructionmanagername.toString())) {
    error.unitconstructionmanagername = "This field is empty";
  }

  if (validator.isEmpty(data.unitconstructionmanagercontact.toString())) {
    error.unitconstructionmanagercontact = "This field is empty";
  }

  if (validator.isEmpty(data.unithsespecialistname.toString())) {
    error.unithsespecialistname = "This field is empty";
  }

  if (validator.isEmpty(data.unithsespecialistcontactno.toString())) {
    error.unithsespecialistcontactno = "This field is empty";
  }

  return { error };
}

export default initialdetailvalidate;
