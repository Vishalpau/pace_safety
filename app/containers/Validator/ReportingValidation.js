import validator from "validator";

function ReportingValidation(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.reportedto.toString())) {
    error.reportedto = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.isnotificationsent)) {
    error.isnotificationsent = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.supervisorname)) {
    error.supervisorname = "This Field is Empty";
    isValid = false;
  }

  // if (validator.isEmpty(data.othername)){
  //     error.othername = "This Field is Empty"
  //     isValid = false
  // }

  if (data.fileupload.length == 0) {
    error.fileupload = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.reportingdate || "")) {
    error.reportingdate = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.reportingtime || "")) {
    error.reportingtime = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.reportedby)) {
    error.reportedby = "This Field is Empty";
    isValid = false;
  }

  if (data.reportedby == "Others" && validator.isEmpty(data.others)) {
    error.others = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.latereporting)) {
    error.latereporting = "This Field is Empty";
    isValid = false;
  }

  // if (validator.isEmpty(data.additionaldetails)){
  //     error.additionaldetails = "This Field is Empty"
  //     isValid = false
  // }

  return { error, isValid };
}

export default ReportingValidation;
