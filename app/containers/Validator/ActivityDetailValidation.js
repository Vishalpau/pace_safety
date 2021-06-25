import validator from 'validator';

function ActivityDetailValidate(data){
    console.log('data',data)
    
    const error = {}

    if (validator.isEmpty(data.answer.toString())){
        error.answer = "this filed is empty"
    }



    console.log(error)
    return { error}
} 

export default ActivityDetailValidate