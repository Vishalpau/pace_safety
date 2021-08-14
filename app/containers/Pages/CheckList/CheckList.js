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
        border: '1px solid black'
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

    const [checkList, setCheckList] = useState([])


    const [modelOpen, setModelOpen] = useState(false)
    const [hasGroup, setHasGroup] = useState()
    const [groupsId, setGroupId] = useState({})

    const handleOpen = (value) => {
        setModelOpen(true)
        setHasGroup(value)
    }

    const handleClose = () => {
        setModelOpen(false)
    }

    const handelCheckListData = async () => {
        const temp = {}
        let res = await api.get("api/v1/core/checklist/")
        let checkListData = res.data.data.results
        checkListData.map((value) => {
            if (value.hasGroup == "Yes") {
                value.checklistGroups.map((group, index) => {
                    if (value.checklistId in temp) {
                        temp[value.checklistId].push(group.checklistgroupId)
                    } else {
                        temp[value.checklistId] = [group.checklistgroupId]
                    }
                })
            }
        })
        setCheckList(checkListData)
    }

    const getModalStyle = () => {
        return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
    }

    useEffect(() => {
        handelCheckListData()
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
                        <TableCell className={classes.tabelBorder}>List lable</TableCell>
                        <TableCell className={classes.tabelBorder}>Select</TableCell>
                        <TableCell className={classes.tabelBorder}>Has group?</TableCell>
                        <TableCell className={classes.tabelBorder}>Status</TableCell>
                        <TableCell className={classes.tabelBorder}>Actions</TableCell>
                    </TableRow>
                    {checkList.map((value) => (
                        <TableRow>
                            <TableCell className={classes.tabelBorder}>{value.checklistId}</TableCell>
                            <TableCell className={classes.tabelBorder}>{value.checkListName}</TableCell>
                            <TableCell className={classes.tabelBorder}>{value.checkListType}</TableCell>
                            <TableCell className={classes.tabelBorder}>{value.checkListLabel}</TableCell>
                            <TableCell className={classes.tabelBorder}>{value.checkListSelectType}</TableCell>
                            <TableCell className={classes.tabelBorder}>{value.hasGroup}</TableCell>
                            <TableCell className={classes.tabelBorder}></TableCell>
                            <TableCell className={classes.tabelBorder}><i className="ion-ios-more" onClick={(e) => handleOpen(value.hasGroup)} /></TableCell>
                        </TableRow>
                    ))}


                </TableBody>
            </Table>

            {/* dialg */}
            <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
            >
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={modelOpen}
                    onClose={(e) => handleClose()}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        {hasGroup == "Yes" ? <Button >Groups</Button> : null}
                        <Button>Check List</Button>
                    </div>
                </Modal>
            </Grid>
        </PapperBlock>
    )

}

export default CheckList;