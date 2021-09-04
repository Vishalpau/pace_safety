import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';;
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import api from '../../utils/axios';
import { useParams } from 'react-router';
import moment from 'moment';
import { findIndex } from 'lodash';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '.5rem 0',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
  },
  spacer: {
    padding: '.75rem 0',
  },
  pL20: {
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#b1b1b1',
  },
  spacerRight: {
    marginRight: '.75rem',
  },
  mTopfifty: {
    marginTop: '2rem',
  },
  mTopThirtybtten: {
    marginTop: '2rem',
  },
  radioInline: {
    flexDirection: 'row',
  },
  floatR: {
    float: 'right',
    fontSize: '10px',
  },
  newIncidentButton: {
    marginTop: '20px',
    marginLeft: '5px',
  }
}));

const Comments = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');
  const { id } = useParams()
  const [expanded, setExpanded] = React.useState('panel1');
  const [comment, setComments] = React.useState('');
  const [replyComments, setReplyComments] = React.useState('');
  const [commentDataList, setCommentDataList] = useState([]);
  const [replyCommentDataList, setReplyCommentDataList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const userDetails = JSON.parse(localStorage.getItem("userDetails"))

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleComments = async () => {
    const data = {

      fkCompanyId: 1,
      fkProjectId: 1,
      commentContext: "incident",
      contextReferenceIds: id,
      commentTags: 'string',
      comment: comment,
      parent: 0,
      private: 'No',
      thanksFlag: 0,
      status: 'Active',
      createdBy: userDetails.id

    }
    console.log(data)
    const res = await api.post(`api/v1/comments/`, data)
    if (res.status === 201) {
      fetchComments();
    }
    console.log(res)

  }
  const handleReplyComments = async (commentId) => {
    const data = {

      fkCompanyId: 1,
      fkProjectId: 1,
      commentContext: "incident",
      contextReferenceIds: id,
      commentTags: 'string',
      comment: replyComments,
      parent: commentId,
      private: 'No',
      thanksFlag: 0,
      status: 'Active',
      createdBy: userDetails.id
    }
    console.log(data)
    const res = await api.post(`api/v1/comments/`, data)
    if (res.status === 201) {
      await fetchComments();
      await setReplyComments("");
      handleChange();
      // let newData = await fetchReplyComment(commentId);
      
      // await setReplyCommentDataList([replyCommentDataList,{data:newData}])
    }
    console.log(newData)
  }
  const fetchReplyComment = async (parentId) => {

    const res = await api.get(`api/v1/comments/incident/${id}/?parent=${parentId}`)
    if (res.status = 200) {
      // let data = 
      return res.data.data.results.results
      // setReplyCommentDataList()
    }
    // console.log(res.data.data.results.results)
  }
  console.log(replyCommentDataList)
  const fetchComments = async () => {
    const res = await api.get(`api/v1/comments/incident/${id}/`)
    if (res.status === 200) {
      let result = res.data.data.results.results
      let data = res.data.data.results.results.filter(item => item.parent === 0)
      let newData = []
      await setCommentDataList(data)
      let pId = []
      for (let i in result) {
        let parentId = result[i].parent
        
        if (parentId > 0) {
          pId.push(parentId)
          // console.log({parentId:parentId})
          // let replyData = await fetchReplyComment(parentId)
          // // [...newData, {data:replyData}]
          // console.log(replyData)
        }
      }
      let uniquePId = [...new Set(pId)];
      for(let i in uniquePId){
        let replyData = await fetchReplyComment(uniquePId[i])
        newData.push({data:replyData})
        console.log(replyData)
      }
      await setReplyCommentDataList(newData)
      // console.log(newData)
      await setIsLoading(true)
    }

  }
  React.useEffect(() => {
    fetchComments();
    // fetchReplyComment();
  }, [])
  return (
    <>
      {isLoading ? <>
        {/* <PapperBlock title="Comments (4)" icon="ion-ios-create-outline" desc="" color="primary"> */}
        <Paper title="Comments (4)" elevation={1} className={classes.mTopfifty}>

          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Box padding={3}>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <TextField
                      multiline
                      variant="outlined"
                      rows="1"
                      id="JobTitle"
                      label="Add your comments here"
                      className={classes.fullWidth}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.newIncidentButton}
                      disableElevation
                      onClick={(e) => handleComments(e)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.newIncidentButton}
                      disableElevation
                      onClick={(e) => handleNewJhaPush(e)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        {commentDataList.reverse().map((comment, key) =>
          <Paper elevation={1} className={classes.mTopfifty}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>

                <Box padding={3}>
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                      <Avatar src={comment.avatar} alt={'A'}></Avatar>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography>{comment.username}<span className={classes.pL20}> {moment(comment.createdAt).format(" MMMM DD, YYYY, h:mm A")}</span></Typography>
                      <Typography>{comment.comment}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography><ThumbUpAltOutlinedIcon /></Typography>
                    </Grid>
                  </Grid>
                </Box>

              </Grid>
            </Grid>
            <Box padding={3} marginLeft={6} marginRight={6}>
              <Grid item md={12} xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>Reply</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box padding={3}>
                      <Grid container spacing={1}>
                        <Grid item xs={9}>
                          <TextField
                            multiline
                            variant="outlined"
                            rows="1"
                            id="JobTitle"
                            label="Add your reply here"
                            className={classes.fullWidth}
                            onChange={(e) => setReplyComments(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.newIncidentButton}
                            disableElevation
                            onClick={() => handleReplyComments(comment.id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.newIncidentButton}
                            disableElevation
                            onClick={(e) => handleNewJhaPush(e)}
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Box>
          </Paper>
        )}
        <Paper elevation={1} className={classes.mTopfifty}>
          {commentDataList.reverse().map((comment, key) =>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Box padding={3}>
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                      <Avatar src={comment.avatar} alt={'A'}></Avatar>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography>{comment.username}<span className={classes.pL20}> {moment(comment.createdAt).format(" MMMM DD, YYYY, h:mm A")}</span></Typography>
                      <Typography>{comment.comment}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography><ThumbUpAltOutlinedIcon /></Typography>
                    </Grid>
                  </Grid>
                </Box>
                {/* {console.log(replyCommentDataList.map(fstarr => fstarr.filter(item => item.parent === comment.id)))} */}
                {replyCommentDataList.length>0 ? replyCommentDataList[key].data.filter(item => item.parent == comment.id).map((replyComment, key) =>
                  <Box padding={3} marginLeft={6} marginRight={6}>
                    {console.log({ reply: replyComment })}
                    <Grid container spacing={1}>
                      <Grid item xs={1}>
                        <Avatar src={replyComment.avatar} alt={'A'}></Avatar>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography>{replyComment.username}<span className={classes.pL20}> {moment(replyComment.createdAt).format(" MMMM DD, YYYY, h:mm A")}</span></Typography>
                        <Typography>{replyComment.comment}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography><ThumbUpAltOutlinedIcon /></Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ) : null}
                {/* <Box padding={3} marginLeft={6} marginRight={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                    <Avatar>A</Avatar> 
                    </Grid>
                    <Grid item xs={10}>
                          <Typography>User Name<span className={classes.pL20}>August 4, 2021,  06 : 50 PM</span></Typography>
                          <Typography>This is a new comment from me and I am using the dummy content. Thanks.</Typography>
                    </Grid>
                    <Grid item xs={1}>
                          <Typography><ThumbUpAltOutlinedIcon /></Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box padding={3} marginLeft={6} marginRight={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                    <Avatar>A</Avatar> 
                    </Grid>
                    <Grid item xs={10}>
                          <Typography>User Name<span className={classes.pL20}>August 4, 2021,  06 : 50 PM</span></Typography>
                          <Typography>This is a new comment from me and I am using the dummy content. Thanks.</Typography>
                    </Grid>
                    <Grid item xs={1}>
                          <Typography><ThumbUpAltOutlinedIcon /></Typography>
                    </Grid>
                  </Grid>
                </Box>              
            */}
              </Grid>
            </Grid>
          )}
        </Paper>

        <Grid item md={12} xs={12}>
          <Pagination count={10} variant="outlined" shape="rounded" className={classes.mTopThirtybtten} />
        </Grid>
      </> : <h1>Loading...</h1>}
      {/* </PapperBlock> */}
    </>
  );
};

export default Comments;