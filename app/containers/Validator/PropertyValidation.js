import validator from 'validator';

function PropertyValidate(data){
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.detailpropertyaffected)){
        error.detailpropertyaffected = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }
   

    if (validator.isEmpty(data.affectedproperty.propertytype)){
        error.propertytype = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedproperty.describe)){
        error.describe = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedproperty.damage)){
        error.damage = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.describeactiontaken)){
        error.describeactiontaken = "this filed is empty"
        isValid = false
    }

    

    return { error, isValid }
} 

export default PropertyValidate
