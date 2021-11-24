import api from "../axios";

const allPickListDataValue = async () => {
    let pickListValues = {}
    let allPickList = await api.get(`${localStorage.getItem("apiBaseUrl")}/api/v1/lists/`);
    let allPickListValue = allPickList.data.data.results
    allPickListValue.map((value) => {
        let required_fields = []
        value.picklistValues.map((value) => {
            required_fields.push({ value: value.inputValue, label: value.inputLabel })
        })
        pickListValues[value["id"]] = required_fields
    })
    localStorage.setItem("pickList", JSON.stringify(pickListValues))
}

export default allPickListDataValue;




