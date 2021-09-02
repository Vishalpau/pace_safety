import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import CheckIcon from "@material-ui/icons/Check";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: 0,
  },
  activeList: {
    color: theme.palette.primary.main,
    borderLeft: `5px solid ${theme.palette.secondary.main}`,
    "& .MuiTypography-root": {
      whiteSpace: "normal",
    },
  },
  notActiveList: {
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    "& .MuiTypography-root": {
      whiteSpace: "normal",
    },
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
  const history = useHistory();
  const handelNavigate = (value, key) => {
    console.log(value,key)
    history.push(value)
  }

  const data = props.deleteForm || localStorage.getItem("deleteForm");
  return (
    <Paper elevation={1}>
      <List dense>
        {Object.entries(props.listOfItems).map(([key, value], index) =>
          !data.includes(key) ? (
            index >= linkBreak ? (
              index === linkBreak ? (
                <ListItem className={classes.activeList}>
                  <ListItemIcon className={classes.icon}>
                    <DoubleArrowIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "subtitle2" }}
                    primary={key}
                  />
                  {/* {key} */}
                </ListItem>
              ) : (
                <ListItem className={classes.notActiveList}>
                  <ListItemIcon className={classes.icon}>
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={key} />
                </ListItem>
              )
            ) : (
              <ListItem className={classes.notActiveList}>
                <ListItemIcon className={classes.icon}>
                  <CheckIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={<a onClick={(e) => handelNavigate(value,key)}>{key}</a>} />
                {/* <a href={value}>{key}</a> */}
              </ListItem>
            )
          ) : null
        )}
      </List>
    </Paper>
  );
};

export default FormSideBar;
