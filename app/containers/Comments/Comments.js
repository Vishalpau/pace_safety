import React from 'react';
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
    fontSize:'10px',
  },
  newIncidentButton: {
    marginTop: '20px',
    marginLeft: '5px',
  }
}));

const Comments = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const [expanded, setExpanded] = React.useState('panel1');
  const [comment, setComments] = React.useState('');
  const [parentComments, setParentComments] = React.useState('')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


//   const fetchComments = async()=>{
//       api.get(``)
//   }
  const handleComments = ()=>{
      const data = {
        
        fkCompanyId: fkCompanyId,
        fkProjectId: projectId,
        commentContext: "incident",
        contextReferenceIds: id,
        commentTags: 'string',
        comment: comment,
        parent: 0,
        private: 'No',
        thanksFlag: 0,
        status: Active,
        createdBy: 6
          
      }
      api.post(`api/v1/comments/incident/${id}/`)
  }
  const handleParentComments = ()=>{
    const data = {
      
      fkCompanyId: fkCompanyId,
      fkProjectId: projectId,
      commentContext: "incident",
      contextReferenceIds: id,
      commentTags: string,
      comment: string,
      parent: 0,
      private: Yes,
      thanksFlag: 0,
      status: Active,
      createdBy: 0
        
    }
}

  return (
    <>
      <PapperBlock title="Comments (4)" icon="ion-ios-create-outline" desc="" color="primary">
        <Paper elevation={1} className={classes.mTopfifty}>
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
                            onChange={(e)=> setComments(e.target.value)}
                          />
                      </Grid>
                      <Grid item xs={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.newIncidentButton}
                        disableElevation
                        onClick={(e) => handleNewJhaPush(e)}
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

        <Paper elevation={1} className={classes.mTopfifty}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Box padding={3}>
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
                          />
                      </Grid>
                      <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.newIncidentButton}
                        disableElevation
                        onClick={(e) => handleNewJhaPush(e)}
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
          
        <Paper elevation={1} className={classes.mTopfifty}>
        <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Box padding={3}>
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
            </Grid>
            </Grid>
          </Paper>
          
          <Grid item md={12} xs={12}>
              <Pagination count={10} variant="outlined" shape="rounded" className={classes.mTopThirtybtten} />
            </Grid>
      </PapperBlock>
    </>
  );
};

export default Comments;