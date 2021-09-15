import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DoneIcon from '@material-ui/icons/Done';

import api from "../../../../utils/axios"


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    formControl: {
        width: "85%",
    },
}));

const EditOnlyOptionRow = ({ value, group }) => {

    const [editForm, setEditForm] = useState({})

    const handelParentShow = (value) => {
        if (value == 0) {
            return "Top"
        } else {
            return "Sub"
        }
    }

    const handelParentValue = (value) => {
        if (value == "Top") {
            setEditForm({
                ...editForm,
                parentGroup: "0",
            })
        } else {
            setEditForm({
                ...editForm,
                parentGroup: "1",
            })
        }

    }
    console.log(group, '----')
    const handelUpdate = async (checkListId, checkListGroupId) => {
        editForm["fkCheckListId"] = checkListId
        editForm["checklistgroupId"] = checkListGroupId
        editForm["createdBy"] = JSON.parse(localStorage.getItem("userDetails"))["id"]
        const res = await api.put(`api/v1/core/checklists/${checkListId}/groups/${checkListGroupId}/`, editForm)
        if (res.status == 200) {
            setViewUpdate(!viewUpdate)
        }
        handelEditClose()
    }

    const handelDelete = () => {

    }

    const classes = useStyles();
    return (
        <TableRow>
            <TableCell key={value.isSystem}>
                <TextField
                    id="filled-basic"
                    label="group name"
                    variant="outlined"
                    defaultValue={value.inputLabel}
                // onChange={async (e) => setEditForm({
                //     ...editForm,
                //     checkListGroupName: e.target.value
                // })}
                />

            </TableCell>
            <TableCell key={value.isSystem}>
                <TextField
                    id="filled-basic"
                    label="group name"
                    variant="outlined"
                    defaultValue={value.inputValue.toLowerCase().replace(" ", "-")}
                // onChange={async (e) => setEditForm({
                //     ...editForm,
                //     checkListGroupName: e.target.value
                // })}
                />
            </TableCell>
            {Object.keys(group).length > 0 ?
                <TableCell key={group[value.fkGroupId]}>
                    {/* <p>{group[value.fkGroupId]}</p> */}

                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        label="Group name"
                    >
                        <Select
                            id="Group-name"
                            className="inputCell"
                            labelId="Group name"
                            defaultValue="Top"
                        >

                            {Object.entries(group).map(([key, value]) => (
                                <MenuItem
                                    value={key}
                                // onClick={(e) => handelParentValue(value.parentGroup)}
                                >
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </TableCell>
                : null}

            <TableCell className={classes.tabelBorder}>
                <Switch
                    defaultChecked={value.status == undefined || value.status == "active" ? true : false}
                    onChange={(e) => handleStatusChange(e, value.fkCheckListId, value.checklistgroupId)}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </TableCell>

            <TableCell>
                <DoneIcon onClick={(e) => handleEditClick(e, value)} />
                <span style={{ marginLeft: "20px" }}>
                    <DeleteIcon onClick={(e) => handelDelete(value.fkCheckListId, value.checklistgroupId)} />
                </span>

            </TableCell>

        </TableRow>
    );
};

export default EditOnlyOptionRow;