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
import Comments from '../../../Comments/Comments';

// Icons
import Print from '@material-ui/icons/Print';
import Share from '@material-ui/icons/Share';
import Close from '@material-ui/icons/Close';
import Comment from '@material-ui/icons/Comment';
import History from '@material-ui/icons/History';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory, useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({

}));

const ComplianceComment = () => {
    const history = useHistory();
    const handleNewComplianceUpdatePush = async () => {
        history.push(
          '/app/pages/compliance/compliance'
        );
      };
  
      const handleComplianceCommentPush = async () => {
        history.push(
          '/app/pages/compliance-comment'
        );
      };
      const handleComplianceActivityPush = async () => {
        history.push(
          '/app/pages/compliance-activity'
        );
      };
	
	return (

        <CustomPapperBlock title="Compliance - Comments" icon='customDropdownPageIcon compliancePageIcon' whiteBg>
            <Grid container spacing={3}>	
                <Grid item md={9} xs={12}>
                    <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12}>
                                <Comments />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <div className="quickActionSection">
                    <Typography variant="h5" className="rightSectiondetail">
                        Quick Actions
                    </Typography>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button >
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                        <Link
                            onClick={(e) => handleNewComplianceUpdatePush(e)}
                            to="#"
                            variant="subtitle"
                        >
                            <ListItemText primary="Update compliance" />
                        </Link>
                        </ListItem>

                        <ListItem button >
                        <ListItemIcon>
                            <Comment />
                        </ListItemIcon>
                        <Link
                            onClick={(e) => handleComplianceCommentPush(e)}
                            to="#"
                            variant="subtitle"
                        >
                            <ListItemText primary="Comments" />
                        </Link>
                        </ListItem>

                        <ListItem button >
                        <ListItemIcon>
                            <History />
                        </ListItemIcon>
                        <Link
                            onClick={(e) => handleComplianceActivityPush(e)}
                            to="#"
                            variant="subtitle"
                        >
                            <ListItemText primary="Activity history" />
                        </Link>
                        </ListItem>

                        <ListItem button >
                        <ListItemIcon>
                            <Print />
                        </ListItemIcon>
                        <Link
                            to="#"
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

export default ComplianceComment;
