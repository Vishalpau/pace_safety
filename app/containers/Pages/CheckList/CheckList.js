import React, { useState, useEffect } from "react";
import { PapperBlock } from "dan-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory, useParams } from "react-router";

import api from "../../../utils/axios"

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
}));

function CheckList() {

    const [chekListData, setCheckListData] = useState([])
    const history = useHistory();
    const handelCheckList = async () => {
        const temp = {}
        const res = await api.get("api/v1/core/checklists/")
        const result = res.data.data.results
        result.map((value) => {
            if (value.hasGroup == "Yes") {
                value.checklistGroups.map((groupValue) => {
                    if (temp[value.checklistId] in temp) {
                        temp[value.checklistId].push(groupValue.checklistgroupId)
                    } else {
                        temp[value.checklistId] = [groupValue.checklistgroupId]
                    }
                })
            }
        })
        setCheckListData(result)

    }

    const getModalStyle = () => {
        return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
    }

    const [open, setOpen] = useState(false)
    const [hagGroup, setHasGroup] = useState()
    const [checklistId, setCheckListID] = useState("")

    const handleOpen = (value, groupId) => {
        setOpen(true)
        setHasGroup(value)
        setCheckListID(groupId)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handelNavigate = (value) => {
        if (value == "groups") {
            history.push(`/app/pages/groups/${checklistId}`)
        } else if (value == "options") {
            history.push(`/app/pages/options/${checklistId}`)
        }

    }

    useEffect(() => {
        handelCheckList()
    }, [])

    const classes = useStyles();
    return (
        <PapperBlock title="Checklist manager" icon="ion-md-list-box" desc="">
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.tabelBorder}>Sr.</TableCell>
                        <TableCell className={classes.tabelBorder}>List name</TableCell>
                        <TableCell className={classes.tabelBorder}>List type</TableCell>
                        <TableCell className={classes.tabelBorder}>List label</TableCell>
                        <TableCell className={classes.tabelBorder}>Select</TableCell>
                        <TableCell className={classes.tabelBorder}>Has group?</TableCell>
                        <TableCell className={classes.tabelBorder}>Status</TableCell>
                        <TableCell className={classes.tabelBorder}>Actions</TableCell>
                    </TableRow>
                    {chekListData.map((value) => (
                        <TableRow>
                            <TableCell className={classes.tabelBorder}>{value.checklistId}</TableCell>
                            <TableCell className={classes.tabelBorder}>{value.checkListName}</TableCell>
                            <TableCell className={classes.tabelBorder}>{value.checkListType}</TableCell>
                            <TableCell className={classes.tabelBorder}>{value.checkListLabel}</TableCell>
                            <TableCell className={classes.tabelBorder}>0</TableCell>
                            <TableCell className={classes.tabelBorder}>{value.hasGroup}</TableCell>
                            <TableCell className={classes.tabelBorder}>0</TableCell>
                            <TableCell className={classes.tabelBorder}><i className="ion-ios-more" onClick={(e) => handleOpen(value.hasGroup, value.checklistId)} /></TableCell>
                        </TableRow>
                    ))}


                </TableBody>
            </Table>

            <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
            >
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={(e) => handleClose()}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        {hagGroup == "Yes" ?
                            <Typography variant="h6" id="modal-title">
                                <Button onClick={(e) => handelNavigate("groups")}>Group</Button>
                            </Typography> :
                            null
                        }
                        <Typography variant="subtitle1" id="simple-modal-description">
                            <Button onClick={(e) => handelNavigate("options")}>Options</Button>
                        </Typography>
                    </div>
                </Modal>
            </Grid>
        </PapperBlock>
    )

}

export default CheckList;