import validator from 'validator';

function PersonalAndPpeDetailValidate(data){
    console.log(data)
    let isValid = true;
    const error = []
    for (let key in data) {
      console.log(key)
        const dataObj = data[key];
        if (dataObj) {
          if (validator.isEmpty(dataObj.answer.toString())) {
            dataObj.error = "This filed is empty";
            error.push(dataObj);
            isValid = false;
            continue;
          }
        }
    
        error.push(dataObj);
      }

    console.log(error)
    return { error , isValid}
} 

export default PersonalAndPpeDetailValidate
