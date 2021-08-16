import React, { useState, useEffect } from "react";
import { PapperBlock } from "dan-components";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

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
}));

function Group() {

    const [form, setForm] = useState(
        {
            "fkCompanyId": 0,
            "fkProjectId": 0,
            "fkCheckListId": "",
            "checkListGroupName": "",
            "parentGroup": 0,
            "createdBy": 0,
            "updatedBy": 0
        }
    )

    const [group, setGroup] = useState([])

    const [checkListId, setCheckListId] = useState("")

    const handelGroup = async () => {
        let groupID = handelIncidentId()
        setCheckListId(groupID)
        const res = await api.get(`api/v1/core/checklists/${groupID}/groups/`)
        const result = res.data.data.results
        let allGroups = result
        setGroup(allGroups)
    }

    const handelCheckList = (e) => {
        setForm({
            ...form,
            checkListGroupName: e.target.value,
            fkCheckListId: checkListId
        })
    }

    const handelNext = async () => {
        const res = await api.post(`api/v1/core/checklists/${checkListId}/groups/`, form)
        if (res.status == 201) {
            setForm({
                ...form,
                checkListGroupName: "",
                fkCheckListId: ""
            })
            handelGroup()
        }
    }



    const classes = useStyles();

    useEffect(() => {
        handelGroup()
    }, [])

    return (

        <PapperBlock title="Groups" icon="ion-md-list-box" desc="">
            <Grid container spacing={12}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tabelBorder}>Sr.</TableCell>
                            <TableCell className={classes.tabelBorder}>Checklist group name</TableCell>
                            <TableCell className={classes.tabelBorder}>Parent group</TableCell>

                        </TableRow>
                        {group.map((value, index) => (
                            <TableRow>
                                <TableCell className={classes.tabelBorder}>{index + 1}</TableCell>
                                <TableCell className={classes.tabelBorder}>{value.checkListGroupName}</TableCell>
                                <TableCell className={classes.tabelBorder}>{value.parentGroup}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>

                            <TableCell className={classes.tabelBorder} >

                                <TextField
                                    id="filled-basic"
                                    label="sr no"
                                    variant="outlined"
                                    value={group.length + 1}
                                    disabled
                                />
                            </TableCell>

                            <TableCell className={classes.tabelBorder} >
                                <TextField
                                    id="filled-basic"
                                    label="group name"
                                    variant="outlined"
                                    onChange={async (e) => handelCheckList(e)}
                                />
                            </TableCell>

                            <TableCell className={classes.tabelBorder} >
                                <TextField
                                    id="filled-basic"
                                    label="parent group"
                                    variant="outlined"
                                    value={0}
                                    disabled
                                />
                                <button onClick={(e) => handelNext(e)}>Save</button>
                            </TableCell>
                        </TableRow>


                    </TableBody>
                </Table>

            </Grid>
        </PapperBlock>

    )

}

export default Group;