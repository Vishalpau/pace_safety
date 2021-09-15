import React, { useState, useEffect } from "react";
import { PapperBlock } from "dan-components";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Editor from '../../../components/Editor';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import api from "../../../utils/axios"
import { handelIncidentId } from "../../../utils/CheckerValue"
import { async } from "fast-glob";
import ReadOnlyOptionRow from "./CheckListCompoment/ReadOptions";
import EditOnlyOptionRow from "./CheckListCompoment/EditOptions"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    table: {
        minWidth: 650,
    },
    tabelBorder: {
        width: 110,
        fontWeight: 600,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    formControl: {
        width: "85%",
    },
}));

function Option() {

    const [form, setForm] = useState(
        {
            "fkCompanyId": 0,
            "fkProjectId": 0,
            "parentCheckListValue": 0,
            "inputValue": "",
            "inputLabel": "",
            "isSystem": "No",
            "status": "Active",
            "createdBy": 0,
            "updatedBy": 0,
            "fkCheckListId": "",
            "fkGroupId": "",
            "id": "",
        }
    )

    const [group, setGroup] = useState([])
    const [option, setOption] = useState([])

    const [checkListId, setCheckListId] = useState("")

    const [optionTemp, setOptionTemp] = useState("")

    const handelGroup = async () => {
        const temp = {}
        let groupID = handelIncidentId()
        setCheckListId(groupID)
        const optionApiData = await api.get(`api/v1/core/checklists/${groupID}/options/`)
        const allOptions = optionApiData.data.data.results
        setOption(allOptions)
        console.log(allOptions)
        const groupApiData = await api.get(`api/v1/core/checklists/${groupID}/groups/`)
        const result = groupApiData.data.data.results
        let allGroups = result
        allGroups.map((value) => {
            temp[value.checklistgroupId] = value.checkListGroupName
        })
        setGroup(temp)
    }

    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }

    const handelOption = (e) => {
        let inputLabel = e.target.value
        let inputValue = e.target.value.replace(" ", "-")
        setForm({
            ...form,
            inputValue: inputValue,
            inputLabel: inputLabel,
            fkCheckListId: checkListId,
        })
    }

    const handelGroupId = (value) => {
        let groupName = value
        let groupId = getKeyByValue(group, value)
        setForm({ ...form, fkGroupId: groupId })
    }

    const isvalidate = (text, column, id) => {
        console.log(text)
        setOptionTemp(text)
        // const val = picklists.filter(value => value.listName == text);
        // if (val.length && column == 'name') {
        //     return false;
        // }
        return true;
    };

    const handelNext = async (reqType) => {
        if (reqType == "Post") {
            delete form["id"]
            const res = await api.post(`api/v1/core/checklists/${checkListId}/options/`, form)
            if (res.status == 201) {
                handelGroup()
                document.getElementsByClassName("inputCell").value = ""
            }
        } else if (reqType == "Put") {
            console.log(form)
            const res = await api.put(`api/v1/core/checklists/${checkListId}/options/${form["id"]}/`, form)
            if (res.status == 200) {
                handelGroup()
            }
        }
    }

    const handelEdit = async (chekListId, GroupId = 0, OptionId) => {
        let inputLabel = optionTemp
        let inputValue = optionTemp.replace(" ", "-")
        let checkListId = chekListId
        let groupID = GroupId

        const temp = {
            "fkCompanyId": 0,
            "fkProjectId": 0,
            "parentCheckListValue": 0,
            "inputValue": inputValue,
            "inputLabel": inputLabel,
            "isSystem": "No",
            "status": "Active",
            "createdBy": 0,
            "updatedBy": 0,
            "fkCheckListId": chekListId,
            "fkGroupId": GroupId,
            "id": OptionId,
        }

        const res = await api.put(`api/v1/core/checklists/${checkListId}/options/${OptionId}/`, temp)
        // if (res.status == 200) {
        //     handelGroup()
        // }


        // await setForm({
        //     ...form,
        //     inputValue: inputValue,
        //     inputLabel: inputLabel,
        //     fkCheckListId: checkListId,
        //     fkGroupId: groupID,
        //     id: OptionId

        // })
        // await handelNext("Put")
    }


    const classes = useStyles();

    useEffect(() => {
        handelGroup()
    }, [])

    return (

        <PapperBlock title="Check List Option" icon="ion-md-list-box" desc="">
            {/* {console.log(form)} */}
            <Grid container spacing={12}>
                <Table className={classes.table}>

                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tabelBorder}>
                                Option Name(Input Label)
                            </TableCell>
                            <TableCell className={classes.tabelBorder}>
                                Input Value
                            </TableCell>
                            {Object.keys(group).length > 0 ?
                                <TableCell className={classes.tabelBorder}>
                                    Group name
                                </TableCell>
                                : null}
                            <TableCell className={classes.tabelBorder}>
                                Status
                            </TableCell>
                            <TableCell className={classes.tabelBorder}>
                                Action
                            </TableCell>
                        </TableRow>

                        {option.map((value, index) => (
                            <>
                                <ReadOnlyOptionRow
                                    value={value}
                                    group={group}
                                />
                                <EditOnlyOptionRow
                                    value={value}
                                    group={group}
                                />
                            </>
                        ))}

                        <TableRow>

                            <TableCell className={classes.tabelBorder} >
                                <TextField
                                    id="filled-basic"
                                    label="sr no"
                                    className="inputCell"
                                    variant="outlined"
                                    value={option.length + 1}
                                    disabled
                                />
                            </TableCell>
                            {Object.keys(group).length > 0 ?
                                <TableCell className={classes.tabelBorder} >
                                    <FormControl
                                        variant="outlined"
                                        className={classes.formControl}
                                        label="Group name"
                                    >
                                        <Select
                                            id="Group-name"
                                            className="inputCell"
                                            labelId="Group name"
                                        >
                                            {Object.values(group).map((selectValues) => (
                                                <MenuItem
                                                    value={selectValues}
                                                    onClick={(e) => handelGroupId(selectValues)}
                                                >
                                                    {selectValues}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                : null}

                            <TableCell className={classes.tabelBorder} >
                                <TextField
                                    id="filled-basic"
                                    label="Option"
                                    variant="outlined"
                                    onChange={async (e) => handelOption(e)}
                                />
                            </TableCell>

                            <TableCell className={classes.tabelBorder} >
                                <button onClick={(e) => handelNext("Post")}>Save</button>
                            </TableCell>
                        </TableRow>


                    </TableBody>
                </Table>

            </Grid>
        </PapperBlock>

    )

}

export default Option;