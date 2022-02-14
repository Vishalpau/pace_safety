function QuestionValidation(data) {
    let error = [...data]
    let isValid = true;
    for(let i = 0; i < data.length; i++){
        let qq = data[i]["question"] 
        for(let j = 0; j < qq.length; j++){
            if(qq[j].question === ""){
                qq[j].errorquestion = "Enter a question"
                isValid = false
            }else{
               delete qq[j].errorquestion 
                isValid = true
            }
        }
    }
    return { error, isValid }

}
export default QuestionValidation;