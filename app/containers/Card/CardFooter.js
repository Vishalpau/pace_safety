import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Typography from "@material-ui/core/Typography";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mLeftR5: {
    marginLeft: "5px",
    marginRight: "15px",
    ["@media (max-width:480px)"]: {
      marginLeft: "3px",
      marginRight: "3px",
    },
  },
  textRight: {
    textAlign: "right",
    ["@media (max-width:480px)"]: {
      textAlign: "left",
      padding: "0px 8px 15px 8px !important",
    },
  },
  sepHeightTen: {
    borderLeft: "3px solid #cccccc",
    height: "8px",
    verticalAlign: "middle",
    margin: "15px 15px 15px 8px",
    fontSize: "10px",
    ["@media (max-width:480px)"]: {
      margin: "10px 5px 10px 5px",
    },
  },
  floatR: {
    float: "right",
    textTransform: "capitalize",
    ["@media (max-width:480px)"]: {
      float: "left",
    },
  },
  iconteal: {
    color: "#06425c",
  },
  mright5: {
    marginRight: "5px",
    color: "#a7a7a7",
  },
  width100: {
    width: "100%",
    padding: "20px 15px",
  },
}));

const CardFooter = (props) => {
  const classes = useStyles();

  const handleDelete = () => {
    props.handleDelete();
  };

  return (
    <>
      <CardActions className={classes.width100}>
        <Grid container spacing={2} justify="flex-end" alignItems="left">
          <Grid item xs={12} md={5} sm={12}>
            <Typography variant="body1" display="inline" color="textPrimary">
              <AttachmentIcon className={classes.mright5} />
              Attachments:{" "}
            </Typography>
            <Typography variant="body2" display="inline">
              {props.files !== null ? <>{props.files}</> : 0}
            </Typography>
          </Grid>

          <Grid item xs={12} md={7} sm={12} className={classes.textRight}>
            <div className={classes.floatR}>
              <span item xs={1} className={classes.sepHeightTen} />
              <Typography variant="body1" display="inline">
                {!props.checkDeletePermission ? (
                  <DeleteForeverOutlinedIcon
                    className={classes.iconteal}
                    style={{
                      color: "#c0c0c0",
                      cursor: "not-allowed",
                    }}
                  />
                ) : (
                  <Link href="javascript:void(0)" className={classes.mLeftR5}>
                    <DeleteForeverOutlinedIcon
                      className={classes.iconteal}
                      onClick={() => handleDelete()}
                    />
                  </Link>
                )}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </CardActions>
    </>
  );
};

export default CardFooter;
