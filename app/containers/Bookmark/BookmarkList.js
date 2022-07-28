import React, { useState, useEffect } from "react";
import StarsIcon from "@material-ui/icons/Stars";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buckmarkIcon: {
    height: "35px",
    width: "35px",
  },
  minWd55: {
    minWidth: "55px !important",
  },
  hoverB: {
    "&:hover": {
      backgroundColor: "#f47607",
      opacity: "0.9",
    },
  },
}));
const BookmarkList = () => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        className={classNames(classes.hoverB, classes.minWd55)}
        style={{ color: "#fff" }}
      >
        <StarsIcon className={classes.buckmarkIcon} />
      </IconButton>
    </>
  );
};
//

export default BookmarkList;
