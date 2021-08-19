import api from "../../../utils/axios";


const CheckListData = async (value) => {
    let severity_consequences = await api.get(`/api/v1/core/checklists/1/`);
    console.log(severity_consequences)
    let data_array = severity_consequences.data.data.results.checklistGroups
    let sorting = data_array.sort((a, b) => a.checklistgroupId - b.checklistgroupId)
    console.log(sorting)
    const checkListValues = sorting[value].checkListValues

    let required_fields = []
    checkListValues.map((value) => {
        required_fields.push({ value: value.inputValue, label: value.inputLabel })
    })
    return required_fields
}

export default CheckListData;