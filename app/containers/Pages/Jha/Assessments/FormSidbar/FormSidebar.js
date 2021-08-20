import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import CheckIcon from '@material-ui/icons/Check';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
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
}));

function FormSidebar() {
  const classes = useStyles();
  return (
    <Paper elevation={1}>
      <List dense>

        <ListItem className={classes.activeList}>
          <ListItemIcon className={classes.icon}>
            <DoubleArrowIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ variant: 'subtitle2' }}
            primary={<Link href="#">Project Details </Link>}
          />
        </ListItem>

        <ListItem className={classes.notActiveList}>
          <ListItemIcon className={classes.icon}>
            <RemoveCircleOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ variant: 'subtitle2' }}
            primary="Project Area Hazards"
          />
        </ListItem>
        <ListItem className={classes.notActiveList}>
          <ListItemIcon className={classes.icon}>
            <RemoveCircleOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ variant: 'subtitle2' }}
            primary="Assessment"
          />
        </ListItem>
        <ListItem className={classes.notActiveList}>
          <ListItemIcon className={classes.icon}>
            <RemoveCircleOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ variant: 'subtitle2' }}
            primary="Documents & Notifications"
          />
        </ListItem>
      </List>
    </Paper>
  );
}

export default FormSidebar;
