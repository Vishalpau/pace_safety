import React, { useState } from 'react';
//import { CustomPapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import classNames from "classnames";
import QuestionsGroup from "./QuestionsGroup";
import Questions from './Questions';
import FormSideBar from "../../Forms/FormSideBar";
import {CONFIG} from '../ComplianceconfigConstants'
// import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';

// style
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  inlineControls: {
    flexDirection: 'row',
    gap: '1rem',
  },
  icon: {
    minWidth: 0,
  },
  activeList: {
    color: theme.palette.primary.main,
    borderLeft: `5px solid ${theme.palette.secondary.main}`,
  },
  notActiveList: {
    borderLeft: `5px solid ${theme.palette.primary.main}`,
  },
  rightMainLink: {
    paddingLeft: '45px',
  },
  subLink: {
    display: 'inline-block',
  },
  subLinkIcon: {
    verticalAlign: 'middle',
  },
  subSubLink: {
    display: 'block',
      width: '100%',
      float: 'left',
    '& span a': {
      color: '#000',
      fontSize: '14px',
    }
  },
}));

function QuestionsForm() {
    const [questionGroup, setQuestionGroup] = useState(false);
    const [question, setQuestion] = useState(false);

  //const history = useHistory();

  // Assigning useStyles() to 'classes' variable
  const classes = useStyles();

  return (
    <Grid item xs={12} md={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
            <>
                {(() => {
                  if (
                    questionGroup == true
                      || ( question === false)
                  ) {
                    return (
                        <>
                            <QuestionsGroup setQuestion={setQuestion}  setQuestionGroup={setQuestionGroup}/>
                        </>
                    );
                  }
                  if (question == true) {
                    return (
                        <>
                            <Questions setQuestion={setQuestion}  setQuestionGroup={setQuestionGroup} />
                        </>
                    );
                  }
                })()}
              </>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper elevation={1}>
          {/* <Grid item xs={12} md={3}> */}
              {/* <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={CONFIG}
                selectedItem="Question"
                onClick={() =>}
              /> */}
            {/* </Grid> */}
            <List dense>
              <ListItem 
                className={classes.activeList}
                onClick={(e) => {
                    setQuestionGroup(true);
                    setQuestion(false);
                }}
                >
                <ListItemIcon className={classes.icon}>
                  <DoubleArrowIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  primary={<Link href="#">Question group </Link>}
                />
              </ListItem>

              <ListItem
                className={classes.notActiveList}
                onClick={(e) => {
                    setQuestionGroup(false);
                    setQuestion(true);
                }}>
                <ListItemIcon className={classNames(classes.icon, classes.subLinkIcon)}>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  className={classes.subLink}
                  primary="Question"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.rightMainLink, classes.notActiveList)}
              >
                <ListItemIcon className={classNames(classes.icon, classes.subLinkIcon1)}>
                  <DoubleArrowIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle3' }}
                  className={classes.subSubLink}
                  primary={<Link href="#">Material #1</Link>}
                />
              </ListItem>
              <ListItem
                className={classNames(classes.rightMainLink, classes.notActiveList)}
              >
                <ListItemIcon className={classNames(classes.icon, classes.subLinkIcon1)}>
                  <DoubleArrowIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle4' }}
                  className={classes.subSubLink}
                  primary={<Link href="#">Electrical # 2</Link>}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default QuestionsForm;
