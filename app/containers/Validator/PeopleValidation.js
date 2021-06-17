import validator from 'validator';

function PeopleValidate(data){
    console.log(data)
    let isValid = true
    const error = {}

    if (validator.isEmpty(data.detailindividualeffected)){
        error.detailindividualeffected = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }
   

    if (validator.isEmpty(data.affectedpersons.persontype)){
        error.persontype = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedpersons.department)){
        error.department = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedpersons.name)){
        error.name = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedpersons.idnumber)){
        error.idnumber = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedpersons.ismedicalcare)){
        error.ismedicalcare = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedpersons.offsiteassesment)){
        error.offsiteassesment = "this filed is empty"
        isValid = false
    }

    if (validator.isEmpty(data.affectedpersons.locationdetails)){
        error.locationdetails = "this filed is empty"
        isValid = false
    }


    

    if (validator.isEmpty(data.describeactiontaken)){
        error.describeactiontaken = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    return { error, isValid }
} 

export default PeopleValidate
