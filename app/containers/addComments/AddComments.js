import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import api from '../../utils/axios';
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
                .then(async(res) => {
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



