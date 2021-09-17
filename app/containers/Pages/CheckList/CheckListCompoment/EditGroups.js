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
            <TableCell className={classes.tabelBorder}>
                <TextField
                    id="filled-basic"
                    label="group name"
                    variant="outlined"
                    defaultValue={value.checkListGroupName}
                    onChange={async (e) => setEditForm({
                        ...editForm,
                        checkListGroupName: e.target.value
                    })}
                />
            </TableCell>
            <TableCell className={classes.tabelBorder}>
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
                        {allGroupName.map((selectValues) => (
                            <MenuItem
                                value={selectValues}
                                onClick={(e) => handelParentValue(value.parentGroup)}
                            >
                                {selectValues}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </TableCell>
            <TableCell className={classes.tabelBorder}>
                <Switch
                    checked={true}
                    // onChange={handleChange}
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