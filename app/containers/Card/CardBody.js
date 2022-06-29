import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardLinkAction: {
    width: "100%",
    float: "left",
    padding: "14px",
    cursor: "pointer",
    textDecoration: "none !important",
    ["@media (max-width:800px)"]: {
      paddingTop: "85px",
    },
  },
  listingLabelValue: {
    color: "#333333",
    fontSize: "0.88rem",
    fontFamily: "Montserrat-Regular",
    "& a": {
      paddingLeft: "5px",
      cursor: "pointer",
      color: "rgba(0, 0, 0, 0.87)",
      fontWeight: "600",
    },
    "&.green": {
      color: "#006400",
    },
  },
  listingLabelName: {
    color: "#7692a4",
    fontSize: "0.88rem",
    fontFamily: "Montserrat-Regular",
  },
}));

const CardBody = (props) => {
  const classes = useStyles();

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

  const handleSummaryPush = () => {
    props.handleSummaryPush();
  };

  return (
    <>
      <Link
        onClick={() => handleSummaryPush()}
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
