import validator from "validator";

function ReportingValidation(data, otherData) {
  console.log(data);
  let isValid = true;
  const error = {};
  const report = data.reportedto;

  if (report.length === 0) {
    error.reportedto = "Please select reportable to.";
    console.log(report);
    isValid = false;
  } else {
    for (var i = 0; i < report.length; i++) {
      if (report[i] === "Others") {
        if (validator.isEmpty(otherData)) {
          error.otherData = "Please enter reported to";
          isValid = false;
        }
      }
    }
  }
  console.log(isValid);

  // if (validator.isEmpty(data.isnotificationsent)) {
  //   error.isnotificationsent = "This Field is Empty";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.supervisorname)) {
  //   error.supervisorname = "This Field is Empty";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.othername)){
  //     error.othername = "This field is empty"
  //     isValid = false
  // }

  // if (data.fileupload.length == 0) {
  //   error.fileupload = "This Field is Empty";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.reportingdate || "")) {
  //   error.reportingdate = "This Field is Empty";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.reportingtime || "")) {
  //   error.reportingtime = "This Field is Empty";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.reportedby)) {
  //   error.reportedby = "This Field is Empty";
  //   isValid = false;
  // }

  // if (data.reportedby == "Others" && validator.isEmpty(data.others)) {
  //   error.others = "This Field is Empty";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.latereporting)) {
  //   error.latereporting = "This Field is Empty";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.additionaldetails)){
  //     error.additionaldetails = "This field is empty"
  //     isValid = false
  // }

  return { error, isValid };
}

export default ReportingValidation;
