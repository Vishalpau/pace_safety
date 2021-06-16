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

    // for (let i = 0;i <= data.affectedpersons.length;i++){

    //     if (validator.isEmpty(data.affectedpersons.persontype)){
    //         error.affectedpersons = "this filed is empty"
    //         isValid = false
    //     }

    //     if (validator.isEmpty(data.affectedpersons.department)){
    //         error.affectedpersons.department = "this filed is empty"
    //         isValid = false
    //     }

    //     if (validator.isEmpty(data.affectedpersons.name)){
    //         error.affectedpersons.name = "this filed is empty"
    //         isValid = false
    //     }

    //     if (validator.isEmpty(data.affectedpersons.idnumber)){
    //         error.affectedpersons.idnumber = "this filed is empty"
    //         isValid = false
    //     }

    //     if (validator.isEmpty(data.affectedpersons.ismedicalcare)){
    //         error.affectedpersons.ismedicalcare = "this filed is empty"
    //         isValid = false
    //     }

    //     if (validator.isEmpty(data.affectedpersons.offsiteassesment)){
    //         error.affectedpersons.offsiteassesment = "this filed is empty"
    //         isValid = false
    //     }

    //     if (validator.isEmpty(data.affectedpersons.locationdetails)){
    //         error.affectedpersons.locationdetails = "this filed is empty"
    //         isValid = false
    //     }

    // }

    data.affectedpersons.forEach(element => console.log(element));

    if (validator.isEmpty(data.describeactiontaken)){
        error.describeactiontaken = "this filed is empty"
        isValid = false
    }else{
        isValid = true
    }

    return { error, isValid }
} 

export default PeopleValidate
