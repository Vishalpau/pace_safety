import validator from "validator";

function investigationoverviewvalidate(data) {
  console.log(data);

  const error = {};

  if (validator.isEmpty(data.constructionManagerName.toString())) {
    error.constructionManagerName = "this filed is empty";
  }

  if (validator.isEmpty(data.unitconstructionmanagercontact.toString())) {
    error.unitconstructionmanagercontact = "this filed is empty";
  }

  if (validator.isEmpty(data.unithsespecialistname.toString())) {
    error.unithsespecialistname = "this filed is empty";
  }

  if (validator.isEmpty(data.unithsespecialistcontactno.toString())) {
    error.unithsespecialistcontactno = "this filed is empty";
  }

  if (validator.isEmpty(data.actualseveritylevel.toString())) {
    error.actualseveritylevel = "this filed is empty";
  }

  if (validator.isEmpty(data.potentialseveritylevel.toString())) {
    error.potentialseveritylevel = "this filed is empty";
  }
  return { error };
}

export default initialdetailvalidate;
