import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import progress from "dan-images/progress.png";
import preplanning from "dan-images/preplanning.png";
import completed from "dan-images/completed.png";
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.25rem",
    fontFamily: "Montserrat-Regular",
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "500",
    lineHeight: "1.6",
  },
  listHeadColor: { backgroundColor: "#fafafa" },
  marginTopBottom: {
    "& .MuiTypography-h6 .MuiTypography-h5": {
      fontFamily: "Montserrat-Regular",
    },
  },
  listingLabelName: {
    color: "#7692a4",
    fontSize: "0.88rem",
    fontFamily: "Montserrat-Regular",
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
  sepHeightOne: {
    borderLeft: "3px solid #cccccc",
    height: "8px",
    verticalAlign: "middle",
    margin: "15px",
    fontSize: "10px",
  },
  floatR: {
    float: "right",
    textTransform: "capitalize",
    ["@media (max-width:480px)"]: {
      float: "left",
    },
    position: "absolute",
    right: "5px",
    top: "5px",
    zIndex: 9,
  },
  userImage: {
    borderRadius: "50px",
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },
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
}));

const CardHeader = (props) => {
  const classes = useStyles();

  const handleMyUserPClickOpen = () => {
    props.handleMyUserPClickOpen(true);
  };

  const handleSummaryPush = () => {
    props.handleSummaryPush();
  };

  const mappedHeader = props.headerFields.map((one) => {
    return (
      <>
        <Typography display="inline" className={classes.listingLabelName}>
          {one.label}:{" "}
          <span
            className={
              (one.label === "Status" && one.value === "Closed") || (one.label === "Stage" && one.value === "Closed") || 
              (one.label === "Status" && one.value === "Close") || (one.label === "Stage" && one.value === "Close")
                ? `${classes.listingLabelValue} green`
                : `${classes.listingLabelValue}`
            }
          >
            {one.value}{" "}
            {one.label === "Stage" && one.value === "Open" ? (
              <img src={preplanning} alt="preplaning" />
            ) : (one.label === "Stage" && one.value === "Closed") || (one.label === "Stage" && one.value === "Close") ? (
              <img src={completed} alt="completed" />
            ) : (
              ""
            )}
            {one.label === "Status" && one.value === "Open" ? (
              <img src={preplanning} alt="preplaning" />
            ) : (one.label === "Status" && one.value === "Closed") || (one.label === "Status" && one.value === "Close") ? (
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
        className={classes.floatR}
        onClick={() => handleMyUserPClickOpen()}
      >
        <img
          src={props.avatar !== null ? props.avatar : paceLogoSymbol}
          className={classes.userImage}
        />{" "}
        {props.username}
      </Button>

      <Link
        onClick={() => handleSummaryPush()}
        className={classes.cardLinkAction}
      >
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item sm={12} xs={12} className={classes.listHeadColor}>
              <Grid container spacing={3} alignItems="flex-start">
                <Grid item md={10} sm={12} xs={12}>
                  <Typography className={classes.title} variant="h6">
                    {props.cardTitle}
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