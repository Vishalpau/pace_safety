import { ErrorOutline } from '@material-ui/icons';
import validator from 'validator';

function AuditCheckValidator(data) {
  let isValid = true;
  const error = {};

  if (data.auditor == '') {
    error.auditor = 'Please select auditor';
    isValid = false;
  }

 

  return { error, isValid };
}

export default AuditCheckValidator;
