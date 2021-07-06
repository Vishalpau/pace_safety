import validator from "validator";

function ReportingValidation(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.reportedto.toString())) {
    error.reportedto = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.isnotificationsent)) {
    error.isnotificationsent = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.supervisorname)) {
    error.supervisorname = "This field is empty";
    isValid = false;
  }

  // if (validator.isEmpty(data.othername)){
  //     error.othername = "This field is empty"
  //     isValid = false
  // }

  if (data.fileupload.length == 0) {
    error.fileupload = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.reportingdate || "")) {
    error.reportingdate = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.reportingtime || "")) {
    error.reportingtime = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.reportedby)) {
    error.reportedby = "This field is empty";
    isValid = false;
  }

  if (data.reportedby == "Others" && validator.isEmpty(data.others)) {
    error.others = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.latereporting)) {
    error.latereporting = "This field is empty";
    isValid = false;
  }

  // if (validator.isEmpty(data.additionaldetails)){
  //     error.additionaldetails = "This field is empty"
  //     isValid = false
  // }

  return { error, isValid };
}

export default ReportingValidation;
