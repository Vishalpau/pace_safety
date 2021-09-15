import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import api from "../../../../utils/axios"




const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
}));

const ReadOnlyOptionRow = ({ value, group }) => {

    const handelParentShow = (value) => {
        if (value == 0) {
            return "Top"
        } else {
            return "Sub"
        }
    }

    const handleStatusChange = async (e, checkListId, checkListGroupId) => {
        console.log(e.target.checked)
        let editForm = {}
        editForm["status"] = e.target.checked == true ? "active" : "inactive"
        editForm["createdBy"] = JSON.parse(localStorage.getItem("userDetails"))["id"]
        const res = await api.put(`api/v1/core/checklists/${checkListId}/groups/${checkListGroupId}/`, editForm)
        if (res.status == 200) {
            setViewUpdate(!viewUpdate)
        }
    }

    const handelDelete = async (checkListId, checkListGroupId) => {
        const res = await api.delete(`api/v1/core/checklists/${checkListId}/groups/${checkListGroupId}/`)
        setViewUpdate(!viewUpdate)
    }

    const classes = useStyles();
    return (
        <TableRow>
            <TableCell key={value.isSystem}>
                {value.inputLabel}
            </TableCell>
            <TableCell key={value.isSystem}>{value.inputLabel.toLowerCase().replace(" ", "-")}</TableCell>
            {Object.keys(group).length > 0 ?
                <TableCell key={group[value.fkGroupId]}>
                    <p>{group[value.fkGroupId]}</p>
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
                <EditIcon onClick={(e) => handleEditClick(e, value)} />
                <span style={{ marginLeft: "20px" }}>
                    <DeleteIcon onClick={(e) => handelDelete(value.fkCheckListId, value.checklistgroupId)} />
                </span>

            </TableCell>

        </TableRow>
    );
};

export default ReadOnlyOptionRow;