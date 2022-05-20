import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import api from "../../../../utils/axios"





const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    projectDialog: {
        minWidth: 600,
    },
    projectCloseButton: {
        position: "absolute",
        right: theme.spacing(2),
        top: theme.spacing(2),
    },
}));

const ReadOnlyOptionRow = ({ value, group, handleEditClick, setViewUpdate, viewUpdate }) => {
    const [open, setOpen] = React.useState(false)

    const handelParentShow = (value) => {
        if (value == 0) {
            return "Top"
        } else {
            return "Sub"
        }
    }

    const handleDeleteDialog = () => {
        setOpen(!open)
    }
    const DialogTitle = withStyles()((props) => {
        const { children, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                <IconButton
                    aria-label="close"
                    className={classes.projectCloseButton}
                    onClick={handleDeleteDialog}
                >
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
        );
    });

    const DialogActions = withStyles((theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
        },
    }))(MuiDialogActions)

    const handleStatusChange = async (e, checkListId, checkListOptionId) => {
        let editForm = {}
        editForm["status"] = e.target.checked == true ? "Active" : "Inactive"
        editForm["fkCheckListId"] = checkListId
        editForm["createdBy"] = JSON.parse(localStorage.getItem("userDetails"))["id"]

        editForm["updatedBy"] = JSON.parse(localStorage.getItem("userDetails"))["id"]
        const res = await api.put(`api/v1/core/checklists/${checkListId}/options/${checkListOptionId}/`, editForm)
        if (res.status == 200) {
            setViewUpdate(!viewUpdate)
        }
    }

    const handelDelete = async (checkListId, checkListGroupId) => {
        const res = await api.delete(`api/v1/core/checklists/${checkListId}/groups/${checkListGroupId}/`)
        setViewUpdate(!viewUpdate)
        setOpen(false)
    }

    const classes = useStyles();
    return (
        <>
            <Dialog
                className={classes.projectDialog}
                open={open}
                onClose={handleDeleteDialog}
                PaperProps={{
                    style: {
                        width: "100%",
                        maxWidth: 400,
                    },
                }}
            >
                <DialogTitle>
                    Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                        >
                            Are you sure you want to delete group?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Tooltip title="Cancel">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => handleDeleteDialog()}
                        >
                            No
                        </Button>
                    </Tooltip>
                    <Tooltip title="Ok">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handelDelete(value.fkCheckListId, value.fkGroupId)}
                        >
                            Yes
                        </Button>
                    </Tooltip>
                </DialogActions>
            </Dialog>

            <TableRow>
                <TableCell key={value.isSystem}>
                    {value.inputLabel}
                </TableCell>
                <TableCell key={value.isSystem}>{value.inputValue.replace(" ", "-")}</TableCell>
                {Object.keys(group).length > 0 ?
                    <TableCell key={group[value.fkGroupId]}>
                        <p>{group[value.fkGroupId]}</p>
                    </TableCell>
                    : null}
                <TableCell className={classes.tabelBorder}>
                    <Switch
                        defaultChecked={value.status === "Active" ? true : false}
                        onChange={(e) => handleStatusChange(e, value.fkCheckListId, value.id)}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </TableCell>

                <TableCell>
                    <EditIcon onClick={(e) => handleEditClick(e, value)} />
                    <span style={{ marginLeft: "20px" }}>
                        {/* <DeleteIcon onClick={(e) => handelDelete(value.fkCheckListId, value.checklistgroupId)} /> */}
                        <DeleteIcon onClick={(e) => handleDeleteDialog()} />
                    </span>

                </TableCell>

            </TableRow>
        </>
    );
};

export default ReadOnlyOptionRow;