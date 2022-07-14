import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Typography from "@material-ui/core/Typography";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import IconButton from "@material-ui/core/IconButton";
import StarsIcon from "@material-ui/icons/Stars";
import Delete from "../../../containers/Delete/Delete";
import Bookmark from "../../../containers/Bookmark/Bookmark";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import BookmarkList from "../../../containers/Bookmark/BookmarkList";
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";

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
              Attachments:{" "}
            </Typography>
            <Typography variant="body2" display="inline">
              <Link
                onClick={() => props.handleVisibility()}
                color="secondary"
                aria-haspopup="true"
                className={classes.commentLink}
              >
                {props.files !== null ? <>{props.files}</> : 0}
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
              Comments:{" "}
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
              {/*<Typography variant="body1" display="inline">
                  <Link href="#" className={classes.mLeftR5}>
                    <IconButton>
                      <Share className={classes.iconteal} />
                    </IconButton>
                    
                  </Link>
  </Typography>
                <span item xs={1} className={classes.sepHeightTen} />*/}

              <Typography variant="body1" display="inline">
                <Link href="#" className={classes.mLeftR5}>
                  <IconButton>
                    <Print className={classes.iconteal} />
                  </IconButton>
                </Link>
              </Typography>

              <span item xs={1} className={classes.sepHeightTen} />
              <Typography variant="body1" display="inline">
                <Typography variant="body1" display="inline">
                  <Link href="#" className={classes.mLeftR5}>
                    <IconButton>
                      <StarsIcon className={classes.iconteal} />
                    </IconButton>
                  </Link>
                </Typography>
              </Typography>
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
