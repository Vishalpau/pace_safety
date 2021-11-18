import { ErrorOutline } from '@material-ui/icons';
import validator from 'validator';

function validate(data) {
  let isValid = true;
  const error = {};

  console.log(data);
  const selectBreakdown =
    JSON.parse(localStorage.getItem("selectBreakDown")) !== null
      ? JSON.parse(localStorage.getItem("selectBreakDown"))
      : [];
  let struct = "";
  for (const i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }

  const breakdownValue = JSON.parse(localStorage.getItem('projectName')).projectName.breakdown
  for (let i = 0; i < breakdownValue.length; i++) {
    var element = selectBreakdown[i]
    if (selectBreakdown[i] === undefined && !atID ) {
      error[`selectBreakdown${[i]}`] = `Select ${breakdownValue[i].structure[0].name}`;
      isValid = false;
    }
  }

  if (data.jobTitle == '') {
    error.jobTitle = 'Please enter job title';
    isValid = false;
  }

  if (data.jobDetails == '') {
    error.jobDetails = 'Please enter job details';
    isValid = false;
  }

  if (data.permitToWork == "") {
    error.permitToWork = "Please specify permit to work";
    isValid = false;
  }

  if (data.firstAid == "") {
    error.firstAid = "Please enter Aid/Medical";
    isValid = false;
  }

  if (data.jhaReviewed == "") {
    error.jhaReviewed = "Please enter reviewed of jsa";
    isValid = false;
  }

  // if (data.accessToJobProcedure == "") {
  //   error.accessToJobProcedure = "Please enter reviewed of job";
  //   isValid = false;
  // }
  if (data.accessToJobProcedure == "") {
    error.accessToJobProcedure = "Please check job procedure";
    isValid = false;
  }

  return { error, isValid };
}

export default validate;
