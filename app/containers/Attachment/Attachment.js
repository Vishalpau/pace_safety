import React, { useState } from "react";
import { IconButton } from "@material-ui/core";

import pdfIcon from 'dan-images/pdfIcon.png';
import excelIcon from 'dan-images/excelIcon.png';
import wordIcon from 'dan-images/wordIcon.png';
import pptIcon from 'dan-images/pptIcon.png';

import audioIcon from 'dan-images/audioIcon.png';
import videoIcon from 'dan-images/videoIcon.png';


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
    const [open, setOpen] = useState(false)
    const classes = useStyles();
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    // let extension = fileName.split("?").pop();
    let extension = fileName.split(/[#?]/)[0].split('.').pop().trim()
    if (extension.toLowerCase() === "pdf") {
        return (
            <IconButton>
                <Tooltip title={fileName}>
                    <Avatar src={pdfIcon} size={1} variant="square" onClick={() => setOpen(true)} />
                </Tooltip>
                <AlertMessage documentUrl={value} open={open} setOpen={setOpen} />
            </IconButton>
        );
    } else if (
        extension.toLowerCase() === "xls" ||
        extension.toLowerCase() === "xlsx"
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
        extension.toLowerCase() === "word" ||
        extension.toLowerCase() === "docx" ||
        extension.toLowerCase() === "doc"
    ) {
        return (
            <IconButton>
                <Tooltip title={fileName}>
                    <Avatar src={wordIcon} size={1} variant="square" onClick={() => setOpen(true)} />
                </Tooltip>
                <AlertMessage documentUrl={value} open={open} setOpen={setOpen} />
            </IconButton>
        );
    } else if (extension.toLowerCase() === "pptx" || extension.toLowerCase() === "ppt") {
        return (
            <IconButton>
                <Tooltip title={fileName}>
                    <Avatar src={pptIcon} size={1} variant="square" onClick={() => setOpen(true)} />
                </Tooltip>
                <AlertMessage documentUrl={value} open={open} setOpen={setOpen} />

            </IconButton>
        );
    } else if (
        // extension.toLowerCase() === "png" ||
        // extension.toLowerCase() === "jpg" ||
        extension.toLowerCase() === "mp4" ||
        extension.toLowerCase() === "mov" ||
        extension.toLowerCase() === "flv" ||
        extension.toLowerCase() === "avi" ||
        extension.toLowerCase() === "mkv") {
        return (
            <IconButton>
                <Tooltip title={fileName}>
                    <Avatar src={videoIcon } size={1} variant="square" onClick={() => setOpen(true)} />
                </Tooltip>
                <AlertMessage documentUrl={value} open={open} setOpen={setOpen} />

            </IconButton>
        );
    }
    else {
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