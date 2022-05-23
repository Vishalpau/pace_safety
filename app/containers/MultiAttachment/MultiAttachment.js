import React, { useEffect, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const MultiAttachment = (props) => {

    const [files, setFiles] = useState();
    const [open, setOpen] = useState(false);

    // send selected files to parent component

    const attachmentHandler = () => {
        props.attachmentHandler(files);
    }

    // select multiple files

    const handleFile = async (e) => {

        const filesArray = e.target.files;
        const temparray = [];
        for (let i = 0; i < filesArray.length; i++) {
            if ((filesArray[i].size <= 1024 * 1024 * 25)) {
                temparray.push(filesArray[i]);
            }
            else {
                document.getElementById('attachment').value = '';
                await setOpen(true);
            }
        }

        await setFiles(temparray);

    };

    useEffect(() => {
        attachmentHandler();
    }, [files])

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                    <svg id="twotone-closed_caption-24px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path id="Path_5090" data-name="Path 5090" d="M0,0H24V24H0Z" fill="none" />
                        <path id="Path_5091" data-name="Path 5091" d="M18.5,16H7A4,4,0,0,1,7,8H19.5a2.5,2.5,0,0,1,0,5H9a1,1,0,0,1,0-2h9.5V9.5H9a2.5,2.5,0,0,0,0,5H19.5a4,4,0,0,0,0-8H7a5.5,5.5,0,0,0,0,11H18.5Z" fill="#06425c" />
                    </svg>
                    {' '}
                    Attachment
                </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                        <input
                            type="file"
                            multiple
                            name="file"
                            id="attachment"
                            accept=".png, .jpg , .xls , .xlsx , .ppt , .pptx, .doc, .docx, .text , .pdf ,  .mp4, .mov, .flv, .avi, .mkv"
                            onChange={(e) => {
                                handleFile(e);
                            }}
                        />
                    </Grid>
                </Paper>
            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    The file(s) you are attaching is bigger than the 25mb.
                </Alert>
            </Snackbar>
        </>
    )
}

export default MultiAttachment