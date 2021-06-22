import validator from 'validator';

function investigationoverviewvalidate(data){
    console.log(data)
    
    const error = {}
    
    if (validator.isEmpty(data.unitconstructionmanagername.toString())){
        console.log("data.unitconstructionmanagername")
        error.unitconstructionmanagername = "this filed is empty"
        
    }

    if (validator.isEmpty(data.unitconstructionmanagercontact.toString())){
        error.unitconstructionmanagercontact = "this filed is empty"
        
    }

    if (validator.isEmpty(data.unithsespecialistname.toString())){
        error.unithsespecialistname = "this filed is empty"
        
    }
    

    if (validator.isEmpty(data.unithsespecialistcontactno.toString())){
        error.unithsespecialistcontactno = "this filed is empty"
        
    }

    if (validator.isEmpty(data.actualseveritylevel.toString())){
        error.actualseveritylevel = "this filed is empty"
        
    }

    if (validator.isEmpty(data.potentialseveritylevel.toString())){
        error.potentialseveritylevel = "this filed is empty"
        
    }

    if (validator.isEmpty(data.activity.toString())){
        error.activity = "this filed is empty"
        
    }

    if (validator.isEmpty(data.jobtask.toString())){
        error.jobtask = "this filed is empty"
        
    }

    if (validator.isEmpty(data.equipmentinvoked.toString())){
        error.equipmentinvoked = "this filed is empty"
        
    }

    if (validator.isEmpty(data.weather.toString())){
        error.weather = "this filed is empty"
        
    }

    if (validator.isEmpty(data.temprature.toString())){
        error.temprature = "this filed is empty"
        
    }

    if (validator.isEmpty(data.lighting.toString())){
        error.lighting = "this filed is empty"
        
    }

    if (validator.isEmpty(data.windspeed.toString())){
        error.windspeed = "this filed is empty"
        
    }

    if (validator.isEmpty(data.fluidamount.toString())){
        error.fluidamount = "this filed is empty"
        
    }

    if (validator.isEmpty(data.fluidtype.toString())){
        error.fluidtype = "this filed is empty"
        
    }

    if (validator.isEmpty(data.ael.toString())){
        error.ael = "this filed is empty"
        
    }

    if (validator.isEmpty(data.pel.toString())){
        error.pel = "this filed is empty"
        
    }
    console.log(error)
    return { error }
} 

export default investigationoverviewvalidate;
