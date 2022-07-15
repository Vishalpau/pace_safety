import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Typography from "@material-ui/core/Typography";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import Delete from "../../../containers/Delete/Delete";
import Bookmark from "../../../containers/Bookmark/Bookmark";
import Styles from "./Styles";
import { staticLabels } from "../CardConstants";

/**
 * @file - CardFooter.js
 * @location /app/components/Card/UI
 * @description Showing card footer which includes card actions and counts of attachment and comments.
 * @author Abhimanyu<abhimanyus@teknobuilt.com>
 * @since v1.1.0
 **/

const useStyles = makeStyles((theme) => Styles());

const CardFooter = (props) => {
  const classes = useStyles();

  // Delete component props

  const {
    deleteUrl,
    axiosObj,
    afterDelete,
    item,
    loader,
    loadingFlag,
    deleteMsg,
    yesBtn,
    noBtn,
  } = props.deleteFields;

  return (
    <>
      <CardActions className={classes.width100}>
        <Grid container spacing={2} justify="flex-end" alignItems="center">
          <Grid item xs={12} md={5} sm={12}>
            <Typography variant="body1" display="inline" color="textPrimary">
              <AttachmentIcon className={classes.mright5} />
              {staticLabels.attachment}:{" "}
            </Typography>
            <Typography variant="body2" display="inline">
              <Link
                onClick={() => props.handleVisibility()}
                color="secondary"
                aria-haspopup="true"
                className={classes.commentLink}
              >
                {props.files !== null ? props.files : 0}
              </Link>
            </Typography>
            <span item xs={1} className={classes.sepHeightTen} />
            <Typography
              variant="body1"
              display="inline"
              color="textPrimary"
              className={classes.mLeft}
            >
              <InsertCommentOutlinedIcon className={classes.mright5} />
              {staticLabels.comment}:{" "}
            </Typography>
            <Link
              onClick={() => props.handleVisibilityComments()}
              color="secondary"
              aria-haspopup="true"
              className={classes.commentLink}
            >
              {props.commentsCount}
            </Link>
          </Grid>

          <Grid item xs={12} md={7} sm={12} className={classes.textRight}>
            <div
              className={classes.floatR}
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* <span item xs={1} className={classes.sepHeightTen} />
              <Typography variant="body1" display="inline">
                <Bookmark />
              </Typography> */}
              <span item xs={1} className={classes.sepHeightTen} />
              <Typography variant="body1" display="inline">
                <Delete
                  deleteUrl={deleteUrl}
                  afterDelete={afterDelete}
                  axiosObj={axiosObj}
                  item={item}
                  loader={loader}
                  loadingFlag={loadingFlag}
                  deleteMsg={deleteMsg}
                  yesBtn={yesBtn}
                  noBtn={noBtn}
                />
              </Typography>
            </div>
          </Grid>
        </Grid>
      </CardActions>
    </>
  );
};

export default CardFooter;
