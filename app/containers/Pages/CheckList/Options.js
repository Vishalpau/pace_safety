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

import api from "../../../utils/axios"
import { handelIncidentId } from "../../../utils/CheckerValue"
import { async } from "fast-glob";


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
            "fkGroupId": ""
        }
    )

    const [group, setGroup] = useState([])
    const [option, setOption] = useState([])

    const [checkListId, setCheckListId] = useState("")

    const handelGroup = async () => {
        const temp = {}
        let groupID = handelIncidentId()
        setCheckListId(groupID)
        const optionApiData = await api.get(`api/v1/core/checklists/${groupID}/options/`)
        const allOptions = optionApiData.data.data.results
        setOption(allOptions)

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

    const handelEdit = () => {
        let inputLabel = e.target.value
        let inputValue = e.target.value.replace(" ", "-")
        setForm({
            ...form,
            inputValue: inputValue,
            inputLabel: inputLabel,
            fkCheckListId: checkListId,
            fkGroupId: groupID
        })
    }

    const handelNext = async () => {
        console.log(form)
        const res = await api.post(`api/v1/core/checklists/${checkListId}/options/`, form)
        if (res.status == 201) {
            handelGroup()
        }
    }

    const classes = useStyles();

    useEffect(() => {
        handelGroup()
    }, [])

    return (

        <PapperBlock title="Groups" icon="ion-md-list-box" desc="">
            {console.log(option)}
            <Grid container spacing={12}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tabelBorder}>Sr.</TableCell>
                            <TableCell className={classes.tabelBorder}>Group name</TableCell>
                            <TableCell className={classes.tabelBorder}>Option</TableCell>
                            <TableCell className={classes.tabelBorder}>Is system ?</TableCell>

                        </TableRow>
                        {option.map((value, index) => (
                            <TableRow>
                                <TableCell className={classes.tabelBorder}>{index + 1}</TableCell>
                                <TableCell className={classes.tabelBorder}>
                                    <TextField
                                        id="filled-basic"
                                        variant="outlined"
                                        value={group[value.fkGroupId]}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell className={classes.tabelBorder}>
                                    <Editor
                                        type="text"
                                        value={value.inputLabel}
                                        column="name"
                                        save={async (e) => handelEdit(option.fkCheckListId, option.fkGroupId, option.id, option.inputLabel)}
                                    />
                                </TableCell>
                                <TableCell className={classes.tabelBorder}>{value.isSystem}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>

                            <TableCell className={classes.tabelBorder} >
                                <TextField
                                    id="filled-basic"
                                    label="sr no"
                                    variant="outlined"
                                    value={option.length + 1}
                                    disabled
                                />
                            </TableCell>

                            <TableCell className={classes.tabelBorder} >
                                <FormControl
                                    variant="outlined"
                                    className={classes.formControl}
                                >
                                    <Select
                                        id="Group-name"
                                        labelId="Group name"
                                        label="Group name"
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

                            <TableCell className={classes.tabelBorder} >
                                <TextField
                                    id="filled-basic"
                                    label="Option"
                                    variant="outlined"
                                    onChange={async (e) => handelOption(e)}
                                />
                            </TableCell>

                            <TableCell className={classes.tabelBorder} >
                                <button onClick={(e) => handelNext(e)}>Save</button>
                            </TableCell>
                        </TableRow>


                    </TableBody>
                </Table>

            </Grid>
        </PapperBlock>

    )

}

export default Option;