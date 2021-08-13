import React, { useState, useEffect } from "react";
import { PapperBlock } from "dan-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


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
    }
}));

function CheckList() {
    const classes = useStyles();
    return (
        <PapperBlock title="Checklist manager" icon="ion-md-list-box" desc="">
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.tabelBorder}>Sr.</TableCell>
                        <TableCell className={classes.tabelBorder}>List name</TableCell>
                        <TableCell className={classes.tabelBorder}>List type</TableCell>
                        <TableCell className={classes.tabelBorder}>Select</TableCell>
                        <TableCell className={classes.tabelBorder}>Has group?</TableCell>
                        <TableCell className={classes.tabelBorder}>Status</TableCell>
                        <TableCell className={classes.tabelBorder}>Actions</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tabelBorder}>1</TableCell>
                        <TableCell className={classes.tabelBorder}>Hazardious acts</TableCell>
                        <TableCell className={classes.tabelBorder}>Satey items</TableCell>
                        <TableCell className={classes.tabelBorder}>items and accessory</TableCell>
                        <TableCell className={classes.tabelBorder}>Yes</TableCell>
                        <TableCell className={classes.tabelBorder}>Active</TableCell>
                        <TableCell className={classes.tabelBorder}>Numerious</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </PapperBlock>
    )

}

export default CheckList;