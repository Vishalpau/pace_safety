import validator from "validator";

function ReportingValidation(data, otherData) {
  console.log(data);
  let isValid = true;
  const error = {};
  const report = data.reportedto;

  if (report.length === 0) {
    error.reportedto = "Please select reportable to.";
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

  return { error, isValid };
}

export default ReportingValidation;
