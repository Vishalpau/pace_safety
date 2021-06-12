import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: 0,
    marginRight: ".5rem",
  },
  activeList: {
    color: theme.palette.primary.main,
    borderLeft: `5px solid ${theme.palette.primary.main}`,
  },
  notActiveList: {
    borderLeft: `5px solid ${theme.palette.primary.light}`,
  },
}));

import {
  INITIAL_NOTIFICATION_FORM,
  EVIDENCE_FORM,
  INVESTIGATION_FORM,
  ROOT_CAUSE_ANALYSIS,
  INITIAL_NOTIFICATION,
} from "../../utils/constants";

export const FormSideBar = (props) => {
  let linkBreak = Object.keys(props.listOfItems).indexOf(props.selectedItem);
  const classes = useStyles();
  return (
    <Paper elevation={1}>
      <Box padding={2} bgcolor="background.paper">
        <List>
          {Object.entries(props.listOfItems).map(([key, value], index) =>
            index >= linkBreak ? (
              index === linkBreak ? (
                <ListItem className={classes.activeList}>
                  <ListItemIcon className={classes.icon}>
                    <DoubleArrowIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={key} />
                  {/* {key} */}
                </ListItem>
              ) : (
                <ListItem className={classes.notActiveList}>
                  <ListItemText primary={key} />
                </ListItem>
              )
            ) : (
              <ListItem className={classes.notActiveList} button>
                <ListItemText primary={<a href={value}>{key}</a>} />
                {/* <a href={value}>{key}</a> */}
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Paper>
  );
};

export default FormSideBar;