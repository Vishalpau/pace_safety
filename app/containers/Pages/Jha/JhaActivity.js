import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles }  from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import PrintIcon from '@material-ui/icons/Print';
import Paper from '@material-ui/core/Paper';
import CommentIcon from '@material-ui/icons/Comment';
import HistoryIcon from '@material-ui/icons/History';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import flhaLogoSymbol from 'dan-images/flhaLogoSymbol.png';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LoopIcon from '@material-ui/icons/Loop';
import CancelIcon from '@material-ui/icons/Cancel';
import Comments from '../../Comments/Comments';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import Print from '@material-ui/icons/Print';
import { useHistory, useParams } from 'react-router';
// Icons
import Comment from '@material-ui/icons/Comment';
import History from '@material-ui/icons/History';
import ahaLogoSymbol from 'dan-images/ahaLogoSymbol.png';
import Activity from '../../Activity/Activity';

const useStyles = makeStyles((theme) => ({

}));

const JhaActivity = () => {
    const history = useHistory();
    const handleNewJhaPush = async () => {
        history.push(
          "/app/pages/jha/assessments"
        );
      };
      const handleJhaApprovalsPush = async () => {
        history.push(
          "/app/pages/jha/approvals/approvals"
        );
      };
      const handleJhaLessonLearnPush = async () => {
        history.push(
          "/app/pages/jha/lessons-learned/lessons-learned"
        );
      };
  
      const handleCommentsPush = async () => {
        history.push(
          "/app/pages/jha/jha-comment"
        );
      };
      const handleActivityPush = async () => {
        history.push(
          "/app/pages/jha/jha-activity"
        );
      };
    
    const classes = useStyles();
	return (

        <CustomPapperBlock title="JHA - Activity" icon={ahaLogoSymbol} whiteBg>
            <Grid container spacing={3}>	
                <Grid item md={9} xs={12}>
                    <Grid container spacing={3}>
                        <Grid item md={12} sm={12} xs={12}>
                            <Activity />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={3}>
                    <div className="quickActionSection">
                        <Typography variant="h5" className="rightSectiondetail">
                            Quick Actions
                        </Typography>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button>
                            <ListItemIcon>
                                <Edit />
                            </ListItemIcon>
                            <Link
                                variant="subtitle"
                                onClick={(e) => handleNewJhaPush(e)}
                            >
                                <ListItemText primary="Assessments" />
                            </Link>
                            </ListItem>

                            <ListItem button>
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <Link
                                variant="subtitle"
                                onClick={(e) => handleJhaApprovalsPush(e)}
                            >
                                <ListItemText primary="Approvals" />
                            </Link>
                            </ListItem>
                            
                            <ListItem button>
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <Link
                                variant="subtitle"
                                onClick={(e) => handleJhaLessonLearnPush(e)}
                            >
                                <ListItemText primary="Lessons learned" />
                            </Link>
                            </ListItem>

                            <ListItem button>
                            <ListItemIcon>
                                <Comment />
                            </ListItemIcon>
                            <Link
                                variant="subtitle"
                                onClick={(e) => handleCommentsPush(e)}
                            >
                                <ListItemText primary="Comments" />
                            </Link>
                            </ListItem>
                            
                            <ListItem button>
                            <ListItemIcon>
                                <History />
                            </ListItemIcon>
                            <Link
                                variant="subtitle"
                                onClick={(e) => handleActivityPush(e)}
                            >
                                <ListItemText primary="Activity history" />
                            </Link>
                            </ListItem>
                            <ListItem button>
                            <ListItemIcon>
                                <Print />
                            </ListItemIcon>
                            <Link
                                variant="subtitle"
                            >
                                <ListItemText primary="Print" />
                            </Link>
                            </ListItem>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </CustomPapperBlock>

    );
};

export default JhaActivity;
