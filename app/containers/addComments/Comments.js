const addCommentsComponent = (props) => {

    const handleSendComments = async () => {
        if (props.commentData) {
            props.setIsLoading(true);
            await api.post("/api/v1/comments/", props.commentPayload)
                .then((res) => {
                    props.fetchAllComplianceData();
                    props.setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    props.setIsLoading(false);
                });
        }
    };

    const addComments = (event) => {
        setCommentData(event.target.value);
    };
    
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
                        <Box padding={3}>
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
                                        onChange={(e) => addComments(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className="spacerRight buttonStyle"
                                        disableElevation
                                        onClick={handleSendComments}
                                    >
                                        Respond
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        className="custmCancelBtn buttonStyle"
                                        disableElevation
                                        onClick={props.handleComments('handleVisibilityComments')}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default addCommentsComponent;



