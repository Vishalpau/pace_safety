import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Typography from "@material-ui/core/Typography";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import Delete from "../Delete/Delete";
import Bookmark from "../Bookmark/Bookmark";
import BookmarkList from "../Bookmark/BookmarkList";

const useStyles = makeStyles((theme) => ({
  mLeftR5: {
    marginLeft: "5px",
    marginRight: "15px",
    "@media (max-width:480px)": {
      marginLeft: "3px",
      marginRight: "3px",
    },
  },
  textRight: {
    textAlign: "right",
    "@media (max-width:480px)": {
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
    "@media (max-width:480px)": {
      margin: "10px 5px 10px 5px",
    },
  },
  floatR: {
    float: "right",
    textTransform: "capitalize",
    "@media (max-width:480px)": {
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
    padding: "14px 15px",
  },
  commentLink: {
    marginLeft: "2px",
    cursor: "pointer",
  },
}));

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
              <span item xs={1} className={classes.sepHeightTen} />
              <Typography variant="body1" display="inline">
                {/* <Bookmark /> */}

                {/* <Switch>
                <Route exact path="/bookmarklist" component={BookmarkList} />
              </Switch> */}
                {/* <BookmarkList /> */}
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
