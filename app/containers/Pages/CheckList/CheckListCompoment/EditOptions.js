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

const EditOnlyOptionRow = ({ value, group, handelEditClose, setViewUpdate, viewUpdate }) => {

    const [editForm, setEditForm] = useState({})

    const handleStatusChange = async (e, checkListId, checkListOptionId) => {
        let editStatusForm = {}
        editStatusForm["status"] = e.target.checked == true ? "Active" : "Inactive"
        editStatusForm["fkCheckListId"] = checkListId
        editStatusForm["updatedBy"] = JSON.parse(localStorage.getItem("userDetails"))["id"]
        const res = await api.put(`api/v1/core/checklists/${checkListId}/options/${checkListOptionId}/`, editStatusForm)
        if (res.status == 200) {
            setViewUpdate(!viewUpdate)
        }
    }

    const handelUpdate = async (e, checkListId, checkListOptionId) => {
        editForm["fkCheckListId"] = checkListId
        editForm["updatedBy"] = JSON.parse(localStorage.getItem("userDetails"))["id"]
        const res = await api.put(`api/v1/core/checklists/${checkListId}/options/${checkListOptionId}/`, editForm)
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
                    onChange={async (e) => setEditForm({
                        ...editForm,
                        inputLabel: e.target.value
                    })}
                />

            </TableCell>
            <TableCell key={value.isSystem}>
                <TextField
                    id="filled-basic"
                    label="group name"
                    variant="outlined"
                    defaultValue={value.inputLabel.toLowerCase().replace(" ", "-")}
                    disabled
                />
            </TableCell>
            {Object.keys(group).length > 0 ?
                <TableCell key={group[value.fkGroupId]}>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        label="Group name"
                    >
                        <Select
                            id="Group-name"
                            className="inputCell"
                            labelId="Group name"
                            defaultValue={value.fkGroupId}
                        >
                            {Object.entries(group).map(([key, value]) => (
                                <MenuItem
                                    value={key}
                                    onClick={async (e) => setEditForm({
                                        ...editForm,
                                        fkGroupId: key
                                    })}
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
                    defaultChecked={value.status == "Active" ? true : false}
                    onChange={(e) => handleStatusChange(e, value.fkCheckListId, value.id)}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </TableCell>

            <TableCell>
                <DoneIcon onClick={(e) => handelUpdate(e, value.fkCheckListId, value.id)} />
                <span style={{ marginLeft: "20px" }}>
                    <DeleteIcon onClick={(e) => handelDelete(value.fkCheckListId, value.checklistgroupId)} />
                </span>

            </TableCell>

        </TableRow>
    );
};

export default EditOnlyOptionRow;