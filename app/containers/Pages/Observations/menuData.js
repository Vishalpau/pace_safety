import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import "../../../styles/custom/customheader.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#06425c',
  },
  nested: {
    paddingLeft: theme.spacing(4),
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
  const handleType = (value) => {
    if(value === "Risk"){
      localStorage.setItem("type", "Risk");
    }else if(value === "Comments"){
      localStorage.setItem("type", "Comments");
    }else if(value === "Positive behavior"){
      localStorage.setItem("type", "Positive behavior");

    }
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button className={classes.selected}>
        <ListItemText primary="All" />
      </ListItem>
      <ListItem button className={classes.nested} onClick={(e) => handleType('Risk')}>
        <ListItemText primary="Risk" />
      </ListItem>
      <ListItem button className={classes.nested} onClick={(e) => handleType('Comments')}>
        <ListItemText primary="Comments" />
      </ListItem>
      <ListItem button className={classes.nested} onClick={(e) => handleType('Positive behavior')}>
        <ListItemText primary="Positive behavior" />
      </ListItem>
      {/* <ListItem button className={classes.nested}>
        <ListItemText primary="Staff Commission" />
      </ListItem>
      <ListItem button className={classes.nested}>
        <ListItemText primary="Staff Commission" />
      </ListItem> */}
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
