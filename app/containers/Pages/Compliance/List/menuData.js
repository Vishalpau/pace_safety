import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#06425c',
    '& .MuiListItemText-root':{
      whiteSpace: 'normal',
    },
  },
  nested: {
    paddingLeft: theme.spacing(2),
    backgroundColor: '#7692a4'
  },
  selected: {backgroundColor: '#f47607'},
}));

export default function MenuData() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button className={classes.selected}>
        <ListItemText primary="All" />
      </ListItem>
      <ListItem button className={classes.nested}>
        <ListItemText primary="Company/Contractor Inspection" />
      </ListItem>
      <ListItem button className={classes.nested}>
        <ListItemText primary="Area/Focussed Inspection" />
      </ListItem>
      <ListItem button className={classes.nested}>
        <ListItemText primary="General Inspection" />
      </ListItem>
      {/* <ListItem button onClick={handleClick}  className={classes.selected}>
        <ListItemText primary="Staff Commission" />
        {open ? <RemoveIcon /> : <AddIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>            
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse> */}
    </List>
  );
}
