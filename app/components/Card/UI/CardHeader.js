import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import progress from "dan-images/progress.png";
import preplanning from "dan-images/preplanning.png";
import completed from "dan-images/completed.png";
import paceLogoSymbol from "dan-images/paceLogoSymbol.png";
import { handleSummaryPush, handleMyUserPClickOpen } from "../CardFunctions"; // Imported functions from CardFunctions.js
import Styles from "./Styles";

/**
 * @file - CardHeader.js
 * @location /app/components/Card/UI
 * @description Showing card header with labels and value + userprofile button
 * @author Abhimanyu<abhimanyus@teknobuilt.com>
 * @since v1.1.0
 **/

const useStyles = makeStyles((theme) => Styles());

const CardHeader = (props) => {
  const classes = useStyles();

  // Mapping the labels and its values of Card Header

  const mappedHeader = props.headerFields.map((one) => {
    return (
      <>
        <Typography display="inline" className={classes.listingLabelName}>
          {one.label}:{" "}
          <span
            className={
              (one.label === "Status" && one.value === "Closed") ||
              (one.label === "Stage" && one.value === "Closed") ||
              (one.label === "Status" && one.value === "Close") ||
              (one.label === "Stage" && one.value === "Close")
                ? `${classes.listingLabelValue} green`
                : `${classes.listingLabelValue}`
            }
          >
            {one.value ? one.value : "-"}{" "}
            {one.label === "Stage" && one.value === "Open" ? (
              <img src={preplanning} alt="preplaning" />
            ) : (one.label === "Stage" && one.value === "Closed") ||
              (one.label === "Stage" && one.value === "Close") ||
              (one.label === "Stage" && one.value === "Completed") ? (
              <img src={completed} alt="completed" />
            ) : (
              ""
            )}
            {one.label === "Status" && one.value === "Open" ? (
              <img src={preplanning} alt="preplaning" />
            ) : (one.label === "Status" && one.value === "Closed") ||
              (one.label === "Status" && one.value === "Close") ? (
              <img src={completed} alt="completed" />
            ) : (
              ""
            )}
          </span>
        </Typography>
        {one !== props.headerFields[props.headerFields.length - 1] ? (
          <span item xs={1} className={classes.sepHeightOne} />
        ) : (
          ""
        )}
      </>
    );
  });

  return (
    <>
      <Button
        className={classes.floatRWithAbsolute}
        onClick={() => handleMyUserPClickOpen(props)}
      >
        <img
          src={props.avatar !== null ? props.avatar : paceLogoSymbol}
          className={classes.userImage}
        />{" "}
        {props.username}
      </Button>

      <Link
        onClick={() => handleSummaryPush(props)}
        className={classes.cardLinkAction}
      >
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item sm={12} xs={12} className={classes.listHeadColor}>
              <Grid container spacing={3} alignItems="flex-start">
                <Grid item md={10} sm={12} xs={12}>
                  <Typography className={classes.title} variant="h6">
                    {props.cardTitle}
                    {props.ifPaperUpload ? (
                      <span className={classes.titlespan}>
                        {props.ifPaperUpload}
                      </span>
                    ) : (
                      ""
                    )}
                  </Typography>
                  {mappedHeader}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </>
  );
};

export default CardHeader;
