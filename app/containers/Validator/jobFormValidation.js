import { ErrorOutline } from '@material-ui/icons';
import validator from 'validator';

function validate(data,projectStructure) {
  let isValid = true;
  const error = {};

    const breakdownValue = JSON.parse(localStorage.getItem('projectName')).projectName.breakdown
    for (let i = 0; i < breakdownValue.length; i++) {
      if (projectStructure[i] === undefined) {
        error[`projectStructure${[i]}`] = `Please select ${breakdownValue[i].structure[0].name}`;
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

  console.log(data, 'data')
  console.log(data.firstAid, data, 'datas')
  if (data.firstAid == "") {
    
    error.firstAid = "Please enter Aid/Medical";
    isValid = false;
  }

  if (data.jhaReviewed == "") {
    error.jhaReviewed = "Please enter reviewed of jsa";
    isValid = false;
  }

  if (data.Checked === false) {
    error.Checked = "Please Check the accept & pledge";
    isValid = false;
  }

  if (data.accessToJobProcedure == "") {
    error.accessToJobProcedure = "Please check job procedure";
    isValid = false;
  }

  return { error, isValid };
}

export default validate;
