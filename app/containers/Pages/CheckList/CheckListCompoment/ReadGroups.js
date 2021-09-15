import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
}));

const ReadOnlyRow = ({ value }) => {

    const handelParentShow = (value) => {
        if (value == 0) {
            return "Top"
        } else {
            return "Sub"
        }
    }

    const classes = useStyles();
    return (
        <TableRow>
            <TableCell className={classes.tabelBorder}>
                <p>{value.checkListGroupName}</p>
            </TableCell>
            <TableCell className={classes.tabelBorder}>
                <p>{handelParentShow(value.parentGroup)}</p>
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
                <EditIcon />
                <span style={{ marginLeft: "20px" }}>
                    <DeleteIcon />
                </span>

            </TableCell>

        </TableRow >
    );
};

export default ReadOnlyRow;