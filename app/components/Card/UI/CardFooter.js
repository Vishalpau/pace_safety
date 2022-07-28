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
import Print from "../../Print/Print";

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

  let printUrl, typeOfModule, number;

  if (Object.keys(props.printFields).length > 0) {
    printUrl = props.printFields.printUrl;
    typeOfModule = props.printFields.typeOfModule;
    number = props.printFields.number;
  }
  //Bookmarks Props
  let itemId, typeOfModuleBookmark, bookmarkTrueFalse;

  if (Object.keys(props.bookmarkFields).length > 0) {
    itemId = props.bookmarkFields.itemId;
    typeOfModuleBookmark = props.bookmarkFields.typeOfModule;
    bookmarkTrueFalse = props.bookmarkFields.bookmarkTrueFalse;
  }

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
              {Object.keys(props.printFields).length > 0 ? (
                <>
                  <Typography variant="body1" display="inline">
                    <Print
                      printUrl={printUrl}
                      typeOfModule={typeOfModule}
                      number={number}
                    />
                  </Typography>
                  <span item xs={1} className={classes.sepHeightTen} />
                </>
              ) : (
                ""
              )}
              {Object.keys(props.bookmarkFields).length > 0 ? (
                <>
                  <Typography variant="body1" display="inline">
                    <Bookmark
                      itemId={itemId}
                      typeOfModule={typeOfModuleBookmark}
                      bookmarkTrueFalse={bookmarkTrueFalse}
                    />
                  </Typography>
                  <span item xs={1} className={classes.sepHeightTen} />
                </>
              ) : (
                ""
              )}
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
                  checkDeletePermission={props.checkDeletePermission}
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
