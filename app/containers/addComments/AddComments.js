import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import api from '../../utils/axios';
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/** COMPONENT INFORMATION
 * CommentCard Component
 * Comment component to add comment for all modules
 * @since v1.0.0
 * @mohit <mohitdubey037@gmail.com>
 * @example
        <AddComments
          commentPayload={commentPayload} // payload to send for example:
            const commentPayload = {
                fkCompanyId: value.fkCompanyId,
                fkProjectId: value.fkProjectId,
                commentContext: "compliance",
                contextReferenceIds: value.id,
                commentTags: "",
                comment: commentData,
                parent: 0,
                thanksFlag: 0,
                status: "Active",
                createdBy: value.createdBy,
            };
          commentOpen={commentsOpen} // state to open the component
          commentData={commentData} // initial comments to add on comment payload 
          hiddenn={hiddenn} // initial state to hide or show the component
          isLoading={isLoading} // state to show the loader while adding the comment
          setIsLoading={(val) => setIsLoading(val)} // function to change the state of loader i.e to make it
            false after sending the comments
          fetchAllData={fetchAllComplianceData} function to call after posting the comment i.e to fetchInitialData
          handleComments={(type) => handleComments(type)} function to add the comments into comment data
          handleVisibilityComments={handleVisibilityComments} function to make the comment visible or hide the component
          addComments={(value) => setCommentData(value)} function to add data into the comment data
        />
**/

/**
 * @file - AddComments.js
 * @location /app/containers/addComments
 * @description FIle to post a comment
 * @author mohit<mohitdubey037@gmail.com>
 * @since v1.1.0
 **/

const useStyles = makeStyles((theme) => ({
    loadingWrapper: {
        margin: theme.spacing(1),
        position: "relative",
        display: "inline-flex",
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
}));

function AddComments(props) {

    const classes = useStyles();

    const handleSendComments = async () => {
        if (props.commentData) {
            props.setIsLoading(true);
            await api.post("/api/v1/comments/", props.commentPayload)
                .then(async (res) => {
                    await props.fetchAllData();
                    props.setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    props.setIsLoading(false);
                });
        }
    };

    const addCommentData = (e) => {
        props.addComments(e.target.value)
    }

    return (
        <Grid
            item
            md={12}
            sm={12}
            xs={12}
            hidden={!props.hiddenn}
            onBlur={props.handleComments('handleCommentsClose')}
            onClick={props.handleComments('handleCommentsClick')}
            onClose={props.handleComments('handleCommentsClose')}
            onFocus={props.handleComments('handleCommentsOpen')}
            onMouseEnter={props.handleComments('handleCommentsOpen')}
            onMouseLeave={props.handleComments('handleCommentsClose')}
            open={props.commentsOpen}
            className="commentsShowSection"
        >
            <Paper elevation={1} className="paperSection">
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        {/* <Box padding={3}> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    variant="outlined"
                                    rows="1"
                                    id="JobTitle"
                                    label="Add your comments here"
                                    className="formControl"
                                    value={props.commentData}
                                    onChange={(e) => addCommentData(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.loadingWrapper}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className="spacerRight buttonStyle"
                                        disabled={props.isLoading}
                                        onClick={handleSendComments}
                                    >
                                        Respond
                                    </Button>
                                    {props.isLoading && (
                                        <CircularProgress
                                            size={24}
                                            className={classes.buttonProgress}
                                        />
                                    )}
                                </div>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    className="custmCancelBtn buttonStyle"
                                    disableElevation
                                    onClick={props.handleVisibilityComments}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default AddComments;



