import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Typography from "@material-ui/core/Typography";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import FlagIcon from "@material-ui/icons/Flag";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import Delete from "../../../containers/Delete/Delete";
import Bookmark from "../../../containers/Bookmark/Bookmark";
import Styles from "./Styles";
import { staticLabels } from "../CardConstants";
import Print from "../../Print/Print";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

import IconButton from "@material-ui/core/IconButton";

/**
 * @file - CardFooter.js
 * @location /app/components/Card/UI
 * @description Showing card footer which includes card actions and counts of attachment and comments.
 * @author Abhimanyu<abhimanyus@teknobuilt.com>
 * @since v1.1.0
 **/

const useStyles = makeStyles((theme) =>
  Styles({
    iconteal: {
      color: "#517b8d",
      fontSize: "24px",
    },
  })
);

const CardFooter = (props) => {
  const history = useHistory();

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
    dataLength,
  } = props.deleteFields;

  let printUrl, typeOfModule, number;

  if (Object.keys(props.printFields).length > 0) {
    printUrl = props.printFields.printUrl;
    typeOfModule = props.printFields.typeOfModule;
    number = props.printFields.number;
  }
  //Bookmarks Props
  let itemId, typeOfModuleBookmark, bookmarkTrueFalse, getBookmarkView;

  if (Object.keys(props.bookmarkFields).length > 0) {
    itemId = props.bookmarkFields.itemId;
    typeOfModuleBookmark = props.bookmarkFields.typeOfModule;
    bookmarkTrueFalse = props.bookmarkFields.bookmarkTrueFalse;
    getBookmarkView = props.bookmarkFields.getBookmarkView;
  }

  const RefreshBookmarkData = () => {
    props.RefreshBookmarkData();
  };

  const handlePushData = (commentPayload, redirectUrl) => {
    history.push({
      state: commentPayload,
      pathname: redirectUrl,
    });
  };

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
              className={classes.commentTextLink}
              onClick={() => props.handleVisibilityComments()}
            >
              <InsertCommentOutlinedIcon className={classes.mright5} />
              {staticLabels.comment}:{" "}
            </Typography>
            <Link
              color="secondary"
              aria-haspopup="true"
              className={classes.commentLink}
              onClick={() =>
                handlePushData(props.commentPayload, props.redirectUrl)
              }
            >
              {props.commentsCount}
            </Link>
          </Grid>

          <Grid item xs={12} md={7} sm={12} className={classes.textRight}>
            <div
              className={classes.floatR}
              style={{ display: "flex", alignItems: "center" }}
            >
              {props.isFlagPresent && props.isFlagPresent.flag > 0 ? (
                <>
                  <Typography variant="body1" display="inline">
                    <Tooltip title={props.isFlagPresent.flagReason} arrow>
                      <IconButton style={{ width: 45, height: 45 }}>
                        <EmojiFlagsIcon className={classes.iconteal} />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <span item xs={1} className={classes.sepHeightTen} />
                </>
              ) : (
                ""
              )}

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
                      RefreshBookmarkData={RefreshBookmarkData}
                      getBookmarkView={getBookmarkView}
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
                  dataLength={dataLength}
                  deleting={(bool) => props.deleting(bool)}
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
