import api from "../axios";


const ShiftPickListData = async (value) => {
    let severity_consequences = await api.get(`${localStorage.getItem("apiBaseUrl")}/api/v1/lists/${value}/value`);
    let data_array = severity_consequences.data.data.results;
    let company = JSON.parse(localStorage.getItem("company"));
    if (company.fkCompanyId != 3){
    data_array.push({ inputLabel: "Other", inputValue: "Other" });
    data_array.push({ inputLabel: "NA", inputValue: "NA" });
    }
    let required_fields = []
    data_array.map((value) => {
        required_fields.push({ value: value.inputValue, label: value.inputLabel })
    })
    console.log(required_fields,'required_fields')
    return required_fields
}

export default ShiftPickListData;
