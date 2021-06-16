import validator from 'validator';

function EquipmentValidate(data){
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.detailequipmentaffected)){
        error.detailequipmentaffected = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }
   

    if (validator.isEmpty(data.affectedequipment.equipmentytype)){
        error.equipmentytype = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedequipment.describe)){
        error.describe = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedequipment.damage)){
        error.damage = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.describeactiontaken)){
        error.describeactiontaken = "this filed is empty"
        isValid = false
    }

    

    return { error, isValid }
} 

export default EquipmentValidate
