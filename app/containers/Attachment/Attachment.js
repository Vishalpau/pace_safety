import React, { useState } from "react";
import { IconButton } from "@material-ui/core";

import pdfIcon from 'dan-images/pdfIcon.png';
import excelIcon from 'dan-images/excelIcon.png';
import wordIcon from 'dan-images/wordIcon.png';
import pptIcon from 'dan-images/pptIcon.png';

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, green } from "@material-ui/core/colors";
import Tooltip from '@material-ui/core/Tooltip';
import AlertMessage from "./AttachmentModal.js";
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));
export const Attachment = ({ value }) => {
    console.log(value.size)
    const [open, setOpen] = useState(false)
    const classes = useStyles();
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    let extension = fileName.split(".");

    if (extension[1].toLowerCase() === "pdf") {
        return (
            <IconButton>
                <Tooltip title={fileName}>
                    <Avatar src={pdfIcon} size={1} variant="square" onClick={() => setOpen(true)} />
                </Tooltip>
                <AlertMessage documentUrl={value} open={open} setOpen={setOpen} />
            </IconButton>
        );
    } else if (
        extension[1].toLowerCase() === "xls" ||
        extension[1].toLowerCase() === "xlsx"
    ) {
        return (
            <IconButton>
                <Tooltip title={fileName}>
                    <Avatar src={excelIcon} variant="square" size={1} onClick={() => setOpen(true)} />
                </Tooltip>
                <AlertMessage documentUrl={value} open={open} setOpen={setOpen} />
            </IconButton>
        );
    } else if (
        extension[1].toLowerCase() === "word" ||
        extension[1].toLowerCase() === "docx" ||
        extension[1].toLowerCase() === "doc"
    ) {
        return (
            <IconButton>
                <Tooltip title={fileName}>
                    <Avatar src={wordIcon} size={1} variant="square" onClick={() => setOpen(true)} />
                </Tooltip>
                <AlertMessage documentUrl={value} open={open} setOpen={setOpen} />
            </IconButton>
        );
    } else if (extension[1].toLowerCase() === "pptx" || extension[1].toLowerCase() === "ppt") {
        return (
            <IconButton>
                <Tooltip title={fileName}>
                    <Avatar src={pptIcon} size={1} variant="square" onClick={() => setOpen(true)} />
                </Tooltip>
                <AlertMessage documentUrl={value} open={open} setOpen={setOpen} />

            </IconButton>
        );
    } else {
        return (
            <>
            <IconButton onClick={() => setOpen(true)}>
                    <Tooltip title={fileName}>
                        <Avatar
                            alt="image"
                            src={value}
                            variant="square"
                            className={classes.square}
                        />
                    </Tooltip>
                </IconButton>

                <AlertMessage documentUrl={value} open={open} setOpen={setOpen} />
            </>
        );
    }
};

export default Attachment;
