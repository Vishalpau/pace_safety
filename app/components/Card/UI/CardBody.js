import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Styles from "./Styles";
import { handleSummaryPush } from "../CardFunctions"; // Imported functions from CardFunctions.js

/**
 * @file - CardBody.js
 * @location /app/components/Card/UI
 * @description Showing card body with labels and value
 * @author Abhimanyu<abhimanyus@teknobuilt.com>
 * @since v1.1.0
 **/

const useStyles = makeStyles((theme) => Styles());

const CardBody = (props) => {
  const classes = useStyles();

  // Mapping the labels and its values of Card Body

  const mappedBody = props.bodyFields.map((one) => {
    return (
      <>
        <Grid item md={3} sm={6} xs={12}>
          <Typography
            variant="body1"
            gutterBottom
            color="textPrimary"
            className={classes.listingLabelName}
          >
            {one.label}
          </Typography>
          <Typography gutterBottom className={classes.listingLabelValue}>
            {one.value ? one.value : "-"}
          </Typography>
        </Grid>
      </>
    );
  });

  return (
    <>
      <Link
        onClick={() => handleSummaryPush(props)}
        className={classes.cardLinkAction}
      >
        <Grid item sm={12} xs={12}>
          <Grid container spacing={3}>
            {mappedBody}
          </Grid>
        </Grid>
      </Link>
    </>
  );
};

export default CardBody;
