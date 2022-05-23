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
}));

const EditOnlyRow = ({ value, allGroupName, handelEditClose, viewUpdate, setViewUpdate }) => {
    const [error, setError] = useState(false);

    const [editForm, setEditForm] = useState({
        checkListGroupName: value.checkListGroupName,
        parentGroup: value.parentGroup,
        status: value.status
    })

    const handelParentShow = (value) => {
        if (value == 0) {
            return "Top"
        } else {
            return "Sub"
        }
    }

    const handelParentValue = (value) => {
        setEditForm({
            ...editForm,
            parentGroup: value
        })

    }

    const handleStatusChange = () => {
        if (editForm.status === 'Active') {
            setEditForm({
                ...editForm,
                status: 'Inactive'
            })
        } else {
            setEditForm({
                ...editForm,
                status: 'Active'
            })
        }
    }

    const handelUpdate = async (checkListId, checkListGroupId) => {
        if (editForm.checkListGroupName.trim()) {
            editForm["fkCheckListId"] = checkListId
            editForm["checklistgroupId"] = checkListGroupId
            editForm["createdBy"] = JSON.parse(localStorage.getItem("userDetails"))["id"]
            const res = await api.put(`api/v1/core/checklists/${checkListId}/groups/${checkListGroupId}/`, editForm)
            if (res.status == 200) {
                setViewUpdate(!viewUpdate)
            }
            setError(false)
            handelEditClose()
        } else {
            setError(true)
        }

    }

    const handelDelete = () => {

    }

    const classes = useStyles();
    return (
        <TableRow>
            <TableCell className={classes.tabelBorder}>
                <TextField
                    id="filled-basic"
                    label="Sub-group Name"
                    variant="outlined"
                    defaultValue={editForm.checkListGroupName}
                    onChange={async (e) => setEditForm({
                        ...editForm,
                        checkListGroupName: e.target.value
                    })}
                    error={(error && !editForm.checkListGroupName.trim())}
                    helperText={(error && !editForm.checkListGroupName.trim()) ? "Sub-group name is required" : ""}
                />
            </TableCell>
            <TableCell className={classes.tabelBorder}>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    label="Group name"
                >

                    {allGroupName && allGroupName.length > 0 && (
                        <Select
                            id="Group-name"
                            className="inputCell"
                            labelId="Group name"
                            value={editForm.parentGroup}
                        >
                            {allGroupName.map((selectValues) => (
                                <MenuItem
                                    value={selectValues.id}
                                    onClick={(e) => handelParentValue(selectValues.id)}
                                >
                                    {selectValues.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </FormControl>

            </TableCell>
            <TableCell className={classes.tabelBorder}>
                <Switch
                    defaultChecked={(editForm.status || editForm.status == "Active") ? true : false}
                    onChange={handleStatusChange}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </TableCell>

            <TableCell>
                <DoneIcon onClick={(e) => handelUpdate(value.fkCheckListId, value.checklistgroupId)} />
                <span style={{ marginLeft: "20px" }}>
                    <DeleteIcon />
                </span>

            </TableCell>


        </TableRow >
    );
};

export default EditOnlyRow;