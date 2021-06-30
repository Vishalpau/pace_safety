import validator from 'validator';

function ActivityDetailValidate(data){
    console.log('data',data)
    
    
    const error = {}
    for(let i = 0;i < data.length;i++){
        console.log(data[i])
        if(data[i]){
            {if (validator.isEmpty(data[i].answer.toString()))
                error.answer = "this filed is empty"
                error.push(data[i])
            
            }
        }
    }
    
        
    
    // if(data[1]){
    //     {if (validator.isEmpty(data[1].answer.toString()))
    //         error.answer = "this filed is empty"
    //     }
    // }
    



    console.log(error)
    return { error}
} 

export default ActivityDetailValidate