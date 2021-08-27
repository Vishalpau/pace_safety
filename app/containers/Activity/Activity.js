import React, { useState } from 'react';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// List
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useHistory, useParams } from 'react-router';

// Icons
import Print from '@material-ui/icons/Print';
import Share from '@material-ui/icons/Share';
import Close from '@material-ui/icons/Close';
import Comment from '@material-ui/icons/Comment';
import History from '@material-ui/icons/History';
import Add from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';

//Timeline
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
// import projectpj from 'dan-images/projectpj.png';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Pagination from '@material-ui/lab/Pagination';

// Sidebar Links Helper Function
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
    statusButton: {
        borderRadius: 4,
        fontSize: 12,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    aLabelValue: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#063d55',
        float: 'left',
        width: '100%',
        paddingRight: '40px',
        '& div': {
            display: 'inline-block',
            float: 'right',
        },
    },
    updateLink: {
        float: 'left',
        fontSize: '0.88rem',
        fontWeight: '400',
        lineHeight: '1.2',
        '& a': {
            cursor: 'pointer',
            textDecoration: 'underline',
        },
        actionTitleLable: {
            float: 'right',
            width: 'calc(100% - 100px)',
            textAlign: 'right',
        },
    },
    spacerRight: {
        marginRight: '.75rem',
    },
    mTopfifty: {
        marginTop: '2rem',
    },
    pTopfifty: {
        paddingTop: '1rem',
        paddingbottom: '1rem',
    },
    radioInline: {
        flexDirection: 'row',
    },
    floatR: {
        float: 'right',
        fontSize: '10px',
    },
    AvatarWd: {
        float: 'left',
        marginRight: '15px',
    },
    maxWdtwohun: {
        maxWidth: '200px',
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
    paddingTop: {
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    headingIcon: {
        width: '35px',
        border: '1px solid rgb(229, 233, 235)',
        height: '35px',
        background: 'rgb(131, 166, 181)',
        boxShadow: '0 2px 15px -5px #06425c',
        textAlign: 'center',
        lineHeight: '44px',
        marginRight: '12px',
        borderRadius: '8px',
        verticalAlign: 'middle',
        padding: '3px',
        color: '#ffffff',
    },
    mTopThirtybtten: {
        marginTop: '2rem',
    },
}));

function AhaSummary() {
    const [assessments, setAssessments] = useState(false);
    const [approvals, setApprovals] = useState(false);
    const [lessonsLearned, setLessonsLearned] = useState(false);
    //const [summary, setSummary] = useState(false);
    const history = useHistory();
    const [expanded, setExpanded] = React.useState(false);


    const handleNewAhaPush = async () => {
        history.push(
            "/app/pages/aha/assessments"
        );
    };
    const handleNewAhaPushSummary = async () => {
        history.push(
            "/app/pages/assesments/flhasummary"
        );
    };
    const handleAhaApprovalsPush = async () => {
        history.push(
            "/app/pages/aha/approvals/approvals"
        );
    };
    const handleAhaLessonLearnPush = async () => {
        history.push(
            "/app/pages/aha/lessons-learned/lessons-learned"
        );
    };

    const handleCommentsPush = async () => {
        history.push(
            "/app/comments/comments"
        );
    };
    const handleActivityPush = async () => {
        history.push(
            "/app/activity/activity"
        );
    };


    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const classes = useStyles();
    return (
        // <PapperBlock title="Assessment Number: IR-15415415" icon="ion-md-list-box">
        <Box marginTop={1} marginLeft={1} marginRight={1}>
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <Paper className={classes.paddingTop}>
                        <Box paddingLeft={4} paddingBottom={4}>
                            <Grid item sm={12} xs={12}>
                                <Typography variant="h6"><DescriptionOutlinedIcon className={classes.headingIcon} /> User Activity</Typography>
                            </Grid>
                        </Box>
                        <React.Fragment>
                            <Timeline align="alternate">
                                <TimelineItem>
                                    <TimelineOppositeContent className={classes.maxWdtwohun}>
                                        <Typography color="textSecondary">August, 18, 11:15 AM</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary" />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography>
                                            {/* <Avatar alt="Remy Sharp" src={projectpj} className={classes.AvatarWd} /> */}
                                            User name</Typography>
                                        <Typography color="textSecondary">In progress | Dummy text | Dummy text</Typography>
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography>
                                            {/* <Avatar alt="Remy Sharp" src={projectpj} className={classes.AvatarWd} /> */}
                                            User name</Typography>
                                        <Typography color="textSecondary">In progress</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="seceondary" />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent className={classes.maxWdtwohun}>
                                        <Typography color="textSecondary">August, 18, 11:15 AM</Typography>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent className={classes.maxWdtwohun}>
                                        <Typography color="textSecondary">August, 18, 11:15 AM</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary" />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography>
                                            {/* <Avatar alt="Remy Sharp" src={projectpj} className={classes.AvatarWd} /> */}
                                            User name</Typography>
                                        <Typography color="textSecondary">In progress</Typography>
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography>
                                            {/* <Avatar alt="Remy Sharp" src={projectpj} className={classes.AvatarWd} /> */}
                                            User name</Typography>
                                        <Typography color="textSecondary">In progress</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="seceondary" />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent className={classes.maxWdtwohun}>
                                        <Typography color="textSecondary">August, 18, 11:15 AM</Typography>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent className={classes.maxWdtwohun}>
                                        <Typography color="textSecondary">August, 18, 11:15 AM</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary" />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography>
                                            {/* <Avatar alt="Remy Sharp" src={projectpj} className={classes.AvatarWd} /> */}
                                            User name</Typography>
                                        <Typography color="textSecondary">In progress</Typography>
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography>
                                            {/* <Avatar alt="Remy Sharp" src={projectpj} className={classes.AvatarWd} /> */}
                                            User name</Typography>
                                        <Typography color="textSecondary">In progress</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="secondary" />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent className={classes.maxWdtwohun}>
                                        <Typography color="textSecondary">August, 18, 11:15 AM</Typography>
                                    </TimelineContent>
                                </TimelineItem>

                            </Timeline>
                        </React.Fragment>
                    </Paper>
                </Grid>

            </Grid>
            <Grid item md={12} xs={12}>
                <Pagination count={0} variant="outlined" shape="rounded" className={classes.mTopThirtybtten} />
            </Grid>
        </Box>
        // </PapperBlock>
    );
}

export default AhaSummary;