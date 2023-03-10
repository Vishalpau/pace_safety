import React, { useEffect, useState, lazy } from "react";
import { PapperBlock } from "dan-components";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "../../styles/custom/customheader.css";
import DateFormat from "../../components/Date/DateFormat";
import { useHistory, useParams } from "react-router";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Link from "@material-ui/core/Link";

import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";
// import paceComment from "dan-images/paceComment.png";

import api from "../../utils/axios";
import Delete from "../Delete/Delete";
const Loader = lazy(() => import("../Pages/Loader.js"));

const useStyles = makeStyles((theme) => ({
  commentMore: {
    maxWidth: "21%",
    marginTop: "0.7rem",
  },
  viewMore: {
    cursor: "pointer",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Comments() {

  const history = useHistory();
  const { module } = useParams();
  const classes = useStyles();

  let moduleName = module;
  if (module === "observations") {
    moduleName = "icare";
  } else if (module === "jha" || module === "aha" || module === "flha") {
    moduleName = module.toUpperCase();
  } else {
    moduleName = module.charAt(0).toUpperCase() + module.slice(1);
  }
  const { moduleId } = useParams();

  const commentPayload = history.location.state;
  console.log(commentPayload, 'commentPayloadssssssssssssss');
  const userId = JSON.parse(localStorage.getItem("userDetails"));

  const [commentData, setCommentData] = useState([]);
  const [singleComment, setSingleComment] = useState("");
  const [sortData, setSortData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [errors, setErrors] = useState({
    mainCommentError: '',
    childCommentError: ''
  });

  const handleChange = (event) => {
    if (event.target.name === "sort-data") {
      setSortData(event.target.value);
    } else {
      setSingleComment(event.target.value);
    }
  };

  useEffect(() => {
    if (sortData === "Newest-one") {
      commentData.slice(0, 1);
    } else if (sortData === "Newest-two") {
      commentData.slice(0, 2);
    }
  }, [sortData]);

  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const thanksCounter = (commentPayload, isThanked, thanksCallback) => {
    // console.log(commentPayload, 'adddddddddddd');
    thanksCallback(!isThanked);
    if (commentPayload.thanksFlag === '0') {
      commentPayload.thanksFlag = '1';
    }
    else if (commentPayload.thanksFlag === '1') {
      commentPayload.thanksFlag = '0';
    }

    api.put(`api/v1/comments/${module}/${moduleId}/${commentPayload.id}/`, commentPayload)
      .then(res => {
        getComments();
      })
      .catch(err => {
        console.log(err);
      })
  }

  const updateComments = (payload) => {
    if (payload.comment) {
      delete payload.avatar;
      delete payload.username;
      setIsLoading(true);
      api.put(`api/v1/comments/${module}/${moduleId}/${payload.id}/`, payload)
        .then((res) => {
          setIsLoading(false);
          getComments();
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
    else {
      handleClickSnackBar()
    }
  };

  const postComments = (commentPayload, name) => {
    if (commentPayload.comment) {
      setErrors('');
      setIsLoading(true);
      api.post(`api/v1/comments/`, commentPayload)
        .then((res) => {
          setIsLoading(false);
          getComments();
          setSingleComment("");
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
    else {
      handleClickSnackBar()
    }
  };

  const getComments = async () => {
    api.get(`api/v1/comments/${module}/${moduleId}/`)
      .then((res) => {
        setCommentData(res.data.data.results);
      })
      .catch((err) => console.log(err));
  };

  // const handleModulePush = async () => {
  //   history.push(commentPayload.redirectUrl);
  // };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    console.log(commentData, 'commentData');
  },[commentData])


  ////////////************************* single card data ************************//////////////////////
  const SingleCardData = ({ item, index }) => {
    // console.log(item, "iiteeeeeee");
    const [editState, setEditState] = useState(item.comment);
    const [isEdit, setIsEdit] = useState(false);
    const [replyState, setReplyState] = useState("");
    const [isReply, setIsReply] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handelCommentReply = (e) => {
      setIsReply(true);
      setIsEdit(false);
    };

    const handleCommentReplyClose = (e) => {
      setIsReply(false);
    }

    const closeCommentEdit = (comment) => {
      setIsEdit(false);
      setEditState(comment);
    };

    const handelCommentEdit = (e) => {
      setIsEdit(true);
      setIsReply(false);
    };

    return (
      <>
        <Grid container spacing={3} style={
          deleting
            ? {
              opacity: 0.4,
              transition: "0.3s all ease",
              borderColor: "#f4760798",
            }
            : { opacity: 1, transition: "0.3s all ease" }
        }>
          <Grid item md={3} sm={4} xs={12} className="commentUserDetail">
            <Typography variant="h6" className="commentUserTitle" align="right">
              <img className="comment-image" src={item.avatar} />{" "}
              {item.username}
            </Typography>
            <Typography
              variant="h6"
              className="commentTimeDateTitle"
              align="right"
            >
              {/* {moment(item.updatedAt).format("MMMM Do YYYY, h:mm a")} */}
              {DateFormat(item.updatedAt, true)}
            </Typography>
          </Grid>
          <Grid item md={9} sm={8} xs={12} className="commentContentSetion">
            <Paper elevation={1} className="paperSection">
              {!isEdit ? (
                <Typography variant="body1" className="commentText">
                  {item.comment}
                </Typography>
              ) : (
                <>
                  <TextField
                    id="commentdescription"
                    label="Comments"
                    multiline
                    rows={4}
                    defaultValue={item.comment}
                    variant="outlined"
                    className="formControl"
                    name="main-comment"
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                  />
                  <Grid item md={12} sm={12} xs={12} className="marginT15">
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      className="spacerRight buttonStyle"
                      onClick={() =>
                        updateComments({
                          ...item,
                          comment: editState,
                          updatedBy: userId.id,
                        })
                      }
                    >
                      Update
                    </Button>
                    <Button
                      size="medium"
                      variant="contained"
                      color="secondary"
                      className="buttonStyle custmCancelBtn"
                      onClick={() => closeCommentEdit(item.comment)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </>
              )}
              <Typography variant="body1" className="commentActionBox">
                <Link onClick={(e) => handelCommentEdit(e)}>
                  <svg
                    id="baseline-border_color-24px"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_1219"
                      data-name="Path 1219"
                      d="M17.75,7,14,3.25l-10,10V17H7.75Zm2.96-2.96a1,1,0,0,0,0-1.41L18.37.29a1,1,0,0,0-1.41,0L15,2.25,18.75,6Z"
                      transform="translate(-0.501 3.501)"
                      fill="#7890a4"
                    />
                    <path
                      id="Path_1220"
                      data-name="Path 1220"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                  </svg>
                </Link>
                <span item xs={1} className="verticalSepareterLine" />
                <Link onClick={(e) => handelCommentReply(e)}>
                  <svg
                    id="baseline-reply-24px"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_978"
                      data-name="Path 978"
                      d="M10,9V5L3,12l7,7V14.9c5,0,8.5,1.6,11,5.1C20,15,17,10,10,9Z"
                      fill="#7890a4"
                    />
                    <path
                      id="Path_979"
                      data-name="Path 979"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                  </svg>
                </Link>
                <span className="commentThanksRightSection">
                  {/* <span onClick={() => thanksCounter(item.id, item.thanksFlag)}> */}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.848"
                      height="17.609"
                      viewBox="0 0 20.848 17.609"
                    >
                      <g
                        id="Group_5520"
                        data-name="Group 5520"
                        transform="translate(-613.8 -611.001)"
                      >
                        <g
                          id="chat-svgrepo-com"
                          transform="translate(613.8 587.926)"
                        >
                          <path
                            id="Path_6326"
                            data-name="Path 6326"
                            d="M14.467,34.2a2.215,2.215,0,0,0,2.212-2.212v-6.7a2.215,2.215,0,0,0-2.212-2.212H2.212A2.215,2.215,0,0,0,0,25.287v6.7A2.215,2.215,0,0,0,2.212,34.2h1.61v2.316A.7.7,0,0,0,5.01,37L7.817,34.2h6.65Z"
                            transform="translate(0 0)"
                            fill="#7890a4"
                          />
                          <path
                            id="Path_6327"
                            data-name="Path 6327"
                            d="M111.33,105.583h-1.119V108.7a3.329,3.329,0,0,1-3.326,3.326H100.7l-1.3,1.3a1.939,1.939,0,0,0,1.908,1.608h5.388l2.26,2.26a.7.7,0,0,0,1.188-.492v-1.768h1.191A1.939,1.939,0,0,0,113.266,113v-5.48A1.939,1.939,0,0,0,111.33,105.583Z"
                            transform="translate(-92.418 -76.716)"
                            fill="#7890a4"
                          />
                        </g>
                      </g>
                    </svg>{" "}
                    Total response : {item.replies ? item.replies.length : 0}
                  </span>
                  <span item xs={1} className="verticalSepareterLine" />
                  <span >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15.88"
                      height="20.933"
                      viewBox="0 0 15.88 20.933"
                    >
                      <g
                        id="Group_5519"
                        data-name="Group 5519"
                        transform="translate(-900.75 -607.75)"
                      >
                        <g id="Layer_2" transform="translate(890.2 603.6)">
                          <g
                            id="Group_431"
                            data-name="Group 431"
                            transform="translate(10.8 4.4)"
                          >
                            <path
                              id="Path_6323"
                              data-name="Path 6323"
                              d="M23.043,11.7a5.047,5.047,0,0,0-3.566,1.477h0A5.043,5.043,0,1,0,23.043,11.7ZM26.1,19.8a4.336,4.336,0,0,1-3.062,1.261A4.4,4.4,0,0,1,19.981,19.8a4.336,4.336,0,0,1-1.261-3.062,4.4,4.4,0,0,1,1.261-3.062,4.336,4.336,0,0,1,3.062-1.261A4.4,4.4,0,0,1,26.1,13.681a4.336,4.336,0,0,1,1.261,3.062A4.4,4.4,0,0,1,26.1,19.8Z"
                              transform="translate(-15.407 -9.071)"
                              fill="#7890a4"
                              stroke="#7890a4"
                              stroke-width="0.5"
                            />
                            <path
                              id="Path_6324"
                              data-name="Path 6324"
                              d="M24.665,20.7l-1.333-1.333-.252.252L22,20.77l2.7,2.7L29.168,19l-1.4-1.4Zm.036,1.765L23.009,20.77l.36-.4L24.7,21.706l3.1-3.1.4.4Z"
                              transform="translate(-17.966 -12.846)"
                              fill="#7890a4"
                              stroke="#7890a4"
                              stroke-width="0.5"
                            />
                            <path
                              id="Path_6325"
                              data-name="Path 6325"
                              d="M26.108,11.208a2.379,2.379,0,0,0-.18-.54c-.144-.216-.324-.4-.432-.576a1.278,1.278,0,0,1-.288-.432.8.8,0,0,1-.036-.324V8.758a1.819,1.819,0,0,0-.18-.828,1.382,1.382,0,0,0-.4-.4,5.441,5.441,0,0,0-.648-.324,1.514,1.514,0,0,1-.432-.252,3.184,3.184,0,0,1-.36-.648l-.216-.432a1.382,1.382,0,0,0-.4-.4,1.619,1.619,0,0,0-.828-.144h-.576a.8.8,0,0,1-.324-.036,1.684,1.684,0,0,1-.576-.432,1.6,1.6,0,0,0-.4-.288.885.885,0,0,0-.54-.18h-.108a1.15,1.15,0,0,0-.5.108,2.418,2.418,0,0,0-.612.288,1.849,1.849,0,0,1-.432.18h-.072a1.778,1.778,0,0,1-.54-.108,2.355,2.355,0,0,0-.756-.144.844.844,0,0,0-.4.072,1.48,1.48,0,0,0-.468.288,3.006,3.006,0,0,0-.432.576c-.144.18-.252.324-.36.36a.521.521,0,0,1-.252.072c-.18.036-.4.072-.648.144A1.517,1.517,0,0,0,13,6.6a1.65,1.65,0,0,0-.288.468,6.36,6.36,0,0,0-.144.72,1.018,1.018,0,0,1-.144.468,1.843,1.843,0,0,1-.54.468c-.108.108-.252.18-.4.324a1.034,1.034,0,0,0-.288.468,1.532,1.532,0,0,0-.072.4,2.354,2.354,0,0,0,.144.756,2,2,0,0,1,.108.54v.072a1.557,1.557,0,0,1-.252.612,4.823,4.823,0,0,0-.216.432,1.15,1.15,0,0,0-.108.5v.108a2.379,2.379,0,0,0,.18.54c.144.216.324.4.432.576a1.278,1.278,0,0,1,.288.432.8.8,0,0,1,.036.324v.576a1.819,1.819,0,0,0,.18.828,1.382,1.382,0,0,0,.4.4,5.441,5.441,0,0,0,.648.324,1.514,1.514,0,0,1,.432.252,3.184,3.184,0,0,1,.36.648l.216.432a1.382,1.382,0,0,0,.4.4c.036.036.108.036.144.072L13,23.238l2.377-.756,1.441,2.053L18.472,19.6a.035.035,0,0,0,.036-.036L20.165,24.5l1.441-2.053,2.377.756L22.29,18.159l.036-.036a1.219,1.219,0,0,1,.288-.108c.18-.036.4-.072.648-.144a1.517,1.517,0,0,0,.72-.36,1.65,1.65,0,0,0,.288-.468,6.36,6.36,0,0,0,.144-.72,1.018,1.018,0,0,1,.144-.468,1.843,1.843,0,0,1,.54-.468c.108-.108.252-.18.4-.324a1.034,1.034,0,0,0,.288-.468,1.532,1.532,0,0,0,.072-.4,2.354,2.354,0,0,0-.144-.756,2,2,0,0,1-.108-.54v-.072a1.557,1.557,0,0,1,.252-.612,4.823,4.823,0,0,0,.216-.432,1.15,1.15,0,0,0,.108-.5A.077.077,0,0,1,26.108,11.208ZM16.527,22.914l-.9-1.3-1.513.468,1.117-3.278h.54a.8.8,0,0,1,.324.036,1.684,1.684,0,0,1,.576.432,1.6,1.6,0,0,0,.4.288.885.885,0,0,0,.54.18h0Zm4.718-1.3-.9,1.3L19.12,19.24c.036,0,.108-.036.144-.036h.072a1.778,1.778,0,0,1,.54.108,2.354,2.354,0,0,0,.756.144.844.844,0,0,0,.4-.072A1.48,1.48,0,0,0,21.5,19.1c.072-.072.144-.18.216-.252l1.081,3.278Zm4.106-10.049c-.072.144-.144.324-.252.54a2.23,2.23,0,0,0-.252.684v.144a2.355,2.355,0,0,0,.144.756,2,2,0,0,1,.108.54c0,.072,0,.108-.036.144a.632.632,0,0,1-.144.18,2.643,2.643,0,0,1-.468.36,1.925,1.925,0,0,0-.54.54,1.259,1.259,0,0,0-.18.468c-.072.252-.072.468-.144.648a.813.813,0,0,1-.18.4.586.586,0,0,1-.216.108c-.144.072-.36.072-.576.144a2.162,2.162,0,0,0-.72.252,3.153,3.153,0,0,0-.684.72,2.059,2.059,0,0,1-.252.288c-.072.072-.144.108-.18.144-.036,0-.072.036-.144.036a1.778,1.778,0,0,1-.54-.108,2.354,2.354,0,0,0-.756-.144h-.144a2.254,2.254,0,0,0-.9.36,2.613,2.613,0,0,0-.324.18.916.916,0,0,1-.252.072H17.68a.512.512,0,0,1-.216-.072,2.1,2.1,0,0,1-.468-.4,1.961,1.961,0,0,0-.648-.4,1.685,1.685,0,0,0-.576-.072,3.054,3.054,0,0,1-.576,0,1.035,1.035,0,0,1-.432-.072.39.39,0,0,1-.144-.18,3.869,3.869,0,0,1-.252-.54,2.413,2.413,0,0,0-.4-.648,3.142,3.142,0,0,0-.864-.5,1.3,1.3,0,0,1-.324-.18c-.072-.072-.144-.108-.18-.144a1.034,1.034,0,0,1-.072-.432v-.576a1.685,1.685,0,0,0-.072-.576,2.419,2.419,0,0,0-.576-.828,1.181,1.181,0,0,1-.216-.288.356.356,0,0,1-.072-.216v-.036a.388.388,0,0,1,.072-.252c.072-.144.144-.324.252-.54a2.23,2.23,0,0,0,.252-.684v-.144a2.355,2.355,0,0,0-.144-.756,2,2,0,0,1-.108-.54c0-.072,0-.108.036-.144a.632.632,0,0,1,.144-.18,2.643,2.643,0,0,1,.468-.36,1.925,1.925,0,0,0,.54-.54,1.259,1.259,0,0,0,.18-.468c.072-.252.072-.468.144-.648a.813.813,0,0,1,.18-.4h0a.586.586,0,0,1,.216-.108c.144-.072.36-.072.576-.144a2.162,2.162,0,0,0,.72-.252,3.153,3.153,0,0,0,.684-.72,2.059,2.059,0,0,1,.252-.288c.072-.072.144-.108.18-.144.036,0,.072-.036.144-.036a1.778,1.778,0,0,1,.54.108,2.354,2.354,0,0,0,.756.144h.144a2.254,2.254,0,0,0,.9-.36,2.614,2.614,0,0,0,.324-.18.916.916,0,0,1,.252-.072h.036a.512.512,0,0,1,.216.072,2.1,2.1,0,0,1,.468.4,1.961,1.961,0,0,0,.648.4,1.76,1.76,0,0,0,.468.036,3.053,3.053,0,0,1,.576,0,1.034,1.034,0,0,1,.432.072.39.39,0,0,1,.144.18,3.869,3.869,0,0,1,.252.54,2.413,2.413,0,0,0,.4.648A3.142,3.142,0,0,0,23.8,8a1.3,1.3,0,0,1,.324.18c.072.072.144.108.18.144a1.034,1.034,0,0,1,.072.432v.576a1.685,1.685,0,0,0,.072.576,2.419,2.419,0,0,0,.576.828,1.181,1.181,0,0,1,.216.288.356.356,0,0,1,.072.216v.036C25.424,11.388,25.388,11.46,25.352,11.568Z"
                              transform="translate(-10.8 -4.4)"
                              fill="#7890a4"
                              stroke="#7890a4"
                              stroke-width="0.5"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>{" "}
                    Thanks : {item.thanksFlag}
                  </span>
                  <span item xs={1} className="verticalSepareterLine" />
                  <Delete
                    checkDeletePermission={true}
                    deleteUrl={`/api/v1/comments/${module}/${moduleId}/${item.id
                      }/`}
                    afterDelete={getComments}
                    axiosObj={api}
                    loader={setIsLoading}
                    loadingFlag={false}
                    deleteMsg="Are you sure you want to delete this Comments?"
                    yesBtn="Yes"
                    noBtn="No"
                    deleting={(bool) => setDeleting(bool)}
                  />
                </span>
              </Typography>
              {isReply ? (
                <>
                  <TextField
                    multiline
                    variant="outlined"
                    rows="2"
                    id="description"
                    label="Add your comments here"
                    value={replyState}
                    onChange={(e) => setReplyState(e.target.value)}
                    className="formControl marginT15"
                  />
                  <Grid item md={12} sm={12} xs={12} className="marginT15">
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      className="spacerRight buttonStyle"
                      name="add"
                      onClick={(e) =>
                        postComments({
                          ...commentPayload,
                          parent: item.id,
                          comment: replyState,
                        })
                      }
                    >
                      Add
                    </Button>
                    <Button
                      size="medium"
                      variant="contained"
                      color="secondary"
                      className="buttonStyle custmCancelBtn"
                      onClick={() => handleCommentReplyClose()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </>
              ) : (
                ""
              )}
            </Paper>
          </Grid>
        </Grid>

        {item.replies &&
          item.replies.map((ad) => {
            return <ChildCardData item={item} ad={ad} index={index} />;
          })}
      </>
    );
  };

  /*************************************child card data ********************************/
  const ChildCardData = ({ item, ad, index }) => {
    // console.log(item, 'items')
    const [isReplyEdit, setIsReplyEdit] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [replyEditState, setReplyEditState] = useState(ad.comment);
    const [isThanked, setIsThanked] = useState();

    const handleReplyEdit = () => {
      setIsReplyEdit(true);
    };

    useEffect(() => {
      if (ad.thanksFlag === '0') {
        setIsThanked(false);
      }
      else if (ad.thanksFlag === "1") {
        setIsThanked(true);
      }
      else {
        setIsThanked(false);
      }
    }, [])

    // useEffect(() => {
    //   console.log(replyEditState, 'replyEditState');
    // },[replyEditState])

    const closeReplyEdit = () => {
      setIsReplyEdit(false);
    };

    return (
      <Grid container spacing={3} style={
        deleting
          ? {
            opacity: 0.4,
            transition: "0.3s all ease",
            borderColor: "#f4760798",
          }
          : { opacity: 1, transition: "0.3s all ease" }
      } >
        <Grid item md={3} sm={2} xs={12} />
        <Grid item md={9} sm={10} xs={12}>
          <Grid container spacing={3}>
            <Grid item md={3} sm={4} xs={12} className="commentUserDetail">
              <Typography
                variant="h6"
                className="commentUserTitle"
                align="right"
              >
                <img className="comment-image" src={ad.avatar} />{" "}
                {item.username}
              </Typography>
              <Typography
                variant="h6"
                className="commentTimeDateTitle"
                align="right"
              >
                {moment(ad.updatedAt).format("MMMM Do YYYY, h:mm a")}
              </Typography>
            </Grid>
            <Grid item md={9} sm={8} xs={12} className="commentContentSetion">
              <Paper elevation={1} className="paperSection">
                {!isReplyEdit ? (
                  <Typography variant="body1" className="commentText">
                    {ad.comment}
                  </Typography>
                ) : (
                  <>
                    <TextField
                      id="commentdescription"
                      label="Comments"
                      multiline
                      rows={4}
                      defaultValue={ad.comment}
                      variant="outlined"
                      className="formControl"
                      name="main-comment"
                      value={replyEditState}
                      onChange={(e) => setReplyEditState(e.target.value)}
                    />
                    <Grid item md={12} sm={12} xs={12} className="marginT15">
                      <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        className="spacerRight buttonStyle"
                        onClick={() =>
                          updateComments({
                            ...ad,
                            comment: replyEditState,
                            updatedBy: userId.id,
                          })
                        }
                      >
                        Update
                      </Button>
                      <Button
                        size="medium"
                        variant="contained"
                        color="secondary"
                        className="buttonStyle custmCancelBtn"
                        onClick={closeReplyEdit}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </>
                )}

                <Typography variant="body1" className="commentActionBox">
                  <Link onClick={(e) => handleReplyEdit(e)}>
                    <svg
                      id="baseline-border_color-24px"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        id="Path_1219"
                        data-name="Path 1219"
                        d="M17.75,7,14,3.25l-10,10V17H7.75Zm2.96-2.96a1,1,0,0,0,0-1.41L18.37.29a1,1,0,0,0-1.41,0L15,2.25,18.75,6Z"
                        transform="translate(-0.501 3.501)"
                        fill="#7890a4"
                      />
                      <path
                        id="Path_1220"
                        data-name="Path 1220"
                        d="M0,0H24V24H0Z"
                        fill="none"
                      />
                    </svg>
                  </Link>
                  <span className="commentThanksRightSection">
                    <span onClick={() => thanksCounter(
                      {
                        ...ad,
                        id: ad.id,
                        comment: replyEditState,
                        updatedBy: userId.id,
                      },
                      isThanked,
                      (thankState) => setIsThanked(thankState),
                    )}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15.88"
                        height="20.933"
                        viewBox="0 0 15.88 20.933"
                      >
                        <g
                          id="Group_5519"
                          data-name="Group 5519"
                          transform="translate(-900.75 -607.75)"
                        >
                          <g id="Layer_2" transform="translate(890.2 603.6)">
                            <g
                              id="Group_431"
                              data-name="Group 431"
                              transform="translate(10.8 4.4)"
                            >
                              <path
                                id="Path_6323"
                                data-name="Path 6323"
                                d="M23.043,11.7a5.047,5.047,0,0,0-3.566,1.477h0A5.043,5.043,0,1,0,23.043,11.7ZM26.1,19.8a4.336,4.336,0,0,1-3.062,1.261A4.4,4.4,0,0,1,19.981,19.8a4.336,4.336,0,0,1-1.261-3.062,4.4,4.4,0,0,1,1.261-3.062,4.336,4.336,0,0,1,3.062-1.261A4.4,4.4,0,0,1,26.1,13.681a4.336,4.336,0,0,1,1.261,3.062A4.4,4.4,0,0,1,26.1,19.8Z"
                                transform="translate(-15.407 -9.071)"
                                fill={isThanked ? "#f38e12" : "#7890a4"}
                                stroke={isThanked ? "#f38e12" : "#7890a4"}
                                stroke-width="0.5"
                              />
                              <path
                                id="Path_6324"
                                data-name="Path 6324"
                                d="M24.665,20.7l-1.333-1.333-.252.252L22,20.77l2.7,2.7L29.168,19l-1.4-1.4Zm.036,1.765L23.009,20.77l.36-.4L24.7,21.706l3.1-3.1.4.4Z"
                                transform="translate(-17.966 -12.846)"
                                fill={isThanked ? "#f38e12" : "#7890a4"}
                                stroke={isThanked ? "#f38e12" : "#7890a4"}
                                stroke-width="0.5"
                              />
                              <path
                                id="Path_6325"
                                data-name="Path 6325"
                                d="M26.108,11.208a2.379,2.379,0,0,0-.18-.54c-.144-.216-.324-.4-.432-.576a1.278,1.278,0,0,1-.288-.432.8.8,0,0,1-.036-.324V8.758a1.819,1.819,0,0,0-.18-.828,1.382,1.382,0,0,0-.4-.4,5.441,5.441,0,0,0-.648-.324,1.514,1.514,0,0,1-.432-.252,3.184,3.184,0,0,1-.36-.648l-.216-.432a1.382,1.382,0,0,0-.4-.4,1.619,1.619,0,0,0-.828-.144h-.576a.8.8,0,0,1-.324-.036,1.684,1.684,0,0,1-.576-.432,1.6,1.6,0,0,0-.4-.288.885.885,0,0,0-.54-.18h-.108a1.15,1.15,0,0,0-.5.108,2.418,2.418,0,0,0-.612.288,1.849,1.849,0,0,1-.432.18h-.072a1.778,1.778,0,0,1-.54-.108,2.355,2.355,0,0,0-.756-.144.844.844,0,0,0-.4.072,1.48,1.48,0,0,0-.468.288,3.006,3.006,0,0,0-.432.576c-.144.18-.252.324-.36.36a.521.521,0,0,1-.252.072c-.18.036-.4.072-.648.144A1.517,1.517,0,0,0,13,6.6a1.65,1.65,0,0,0-.288.468,6.36,6.36,0,0,0-.144.72,1.018,1.018,0,0,1-.144.468,1.843,1.843,0,0,1-.54.468c-.108.108-.252.18-.4.324a1.034,1.034,0,0,0-.288.468,1.532,1.532,0,0,0-.072.4,2.354,2.354,0,0,0,.144.756,2,2,0,0,1,.108.54v.072a1.557,1.557,0,0,1-.252.612,4.823,4.823,0,0,0-.216.432,1.15,1.15,0,0,0-.108.5v.108a2.379,2.379,0,0,0,.18.54c.144.216.324.4.432.576a1.278,1.278,0,0,1,.288.432.8.8,0,0,1,.036.324v.576a1.819,1.819,0,0,0,.18.828,1.382,1.382,0,0,0,.4.4,5.441,5.441,0,0,0,.648.324,1.514,1.514,0,0,1,.432.252,3.184,3.184,0,0,1,.36.648l.216.432a1.382,1.382,0,0,0,.4.4c.036.036.108.036.144.072L13,23.238l2.377-.756,1.441,2.053L18.472,19.6a.035.035,0,0,0,.036-.036L20.165,24.5l1.441-2.053,2.377.756L22.29,18.159l.036-.036a1.219,1.219,0,0,1,.288-.108c.18-.036.4-.072.648-.144a1.517,1.517,0,0,0,.72-.36,1.65,1.65,0,0,0,.288-.468,6.36,6.36,0,0,0,.144-.72,1.018,1.018,0,0,1,.144-.468,1.843,1.843,0,0,1,.54-.468c.108-.108.252-.18.4-.324a1.034,1.034,0,0,0,.288-.468,1.532,1.532,0,0,0,.072-.4,2.354,2.354,0,0,0-.144-.756,2,2,0,0,1-.108-.54v-.072a1.557,1.557,0,0,1,.252-.612,4.823,4.823,0,0,0,.216-.432,1.15,1.15,0,0,0,.108-.5A.077.077,0,0,1,26.108,11.208ZM16.527,22.914l-.9-1.3-1.513.468,1.117-3.278h.54a.8.8,0,0,1,.324.036,1.684,1.684,0,0,1,.576.432,1.6,1.6,0,0,0,.4.288.885.885,0,0,0,.54.18h0Zm4.718-1.3-.9,1.3L19.12,19.24c.036,0,.108-.036.144-.036h.072a1.778,1.778,0,0,1,.54.108,2.354,2.354,0,0,0,.756.144.844.844,0,0,0,.4-.072A1.48,1.48,0,0,0,21.5,19.1c.072-.072.144-.18.216-.252l1.081,3.278Zm4.106-10.049c-.072.144-.144.324-.252.54a2.23,2.23,0,0,0-.252.684v.144a2.355,2.355,0,0,0,.144.756,2,2,0,0,1,.108.54c0,.072,0,.108-.036.144a.632.632,0,0,1-.144.18,2.643,2.643,0,0,1-.468.36,1.925,1.925,0,0,0-.54.54,1.259,1.259,0,0,0-.18.468c-.072.252-.072.468-.144.648a.813.813,0,0,1-.18.4.586.586,0,0,1-.216.108c-.144.072-.36.072-.576.144a2.162,2.162,0,0,0-.72.252,3.153,3.153,0,0,0-.684.72,2.059,2.059,0,0,1-.252.288c-.072.072-.144.108-.18.144-.036,0-.072.036-.144.036a1.778,1.778,0,0,1-.54-.108,2.354,2.354,0,0,0-.756-.144h-.144a2.254,2.254,0,0,0-.9.36,2.613,2.613,0,0,0-.324.18.916.916,0,0,1-.252.072H17.68a.512.512,0,0,1-.216-.072,2.1,2.1,0,0,1-.468-.4,1.961,1.961,0,0,0-.648-.4,1.685,1.685,0,0,0-.576-.072,3.054,3.054,0,0,1-.576,0,1.035,1.035,0,0,1-.432-.072.39.39,0,0,1-.144-.18,3.869,3.869,0,0,1-.252-.54,2.413,2.413,0,0,0-.4-.648,3.142,3.142,0,0,0-.864-.5,1.3,1.3,0,0,1-.324-.18c-.072-.072-.144-.108-.18-.144a1.034,1.034,0,0,1-.072-.432v-.576a1.685,1.685,0,0,0-.072-.576,2.419,2.419,0,0,0-.576-.828,1.181,1.181,0,0,1-.216-.288.356.356,0,0,1-.072-.216v-.036a.388.388,0,0,1,.072-.252c.072-.144.144-.324.252-.54a2.23,2.23,0,0,0,.252-.684v-.144a2.355,2.355,0,0,0-.144-.756,2,2,0,0,1-.108-.54c0-.072,0-.108.036-.144a.632.632,0,0,1,.144-.18,2.643,2.643,0,0,1,.468-.36,1.925,1.925,0,0,0,.54-.54,1.259,1.259,0,0,0,.18-.468c.072-.252.072-.468.144-.648a.813.813,0,0,1,.18-.4h0a.586.586,0,0,1,.216-.108c.144-.072.36-.072.576-.144a2.162,2.162,0,0,0,.72-.252,3.153,3.153,0,0,0,.684-.72,2.059,2.059,0,0,1,.252-.288c.072-.072.144-.108.18-.144.036,0,.072-.036.144-.036a1.778,1.778,0,0,1,.54.108,2.354,2.354,0,0,0,.756.144h.144a2.254,2.254,0,0,0,.9-.36,2.614,2.614,0,0,0,.324-.18.916.916,0,0,1,.252-.072h.036a.512.512,0,0,1,.216.072,2.1,2.1,0,0,1,.468.4,1.961,1.961,0,0,0,.648.4,1.76,1.76,0,0,0,.468.036,3.053,3.053,0,0,1,.576,0,1.034,1.034,0,0,1,.432.072.39.39,0,0,1,.144.18,3.869,3.869,0,0,1,.252.54,2.413,2.413,0,0,0,.4.648A3.142,3.142,0,0,0,23.8,8a1.3,1.3,0,0,1,.324.18c.072.072.144.108.18.144a1.034,1.034,0,0,1,.072.432v.576a1.685,1.685,0,0,0,.072.576,2.419,2.419,0,0,0,.576.828,1.181,1.181,0,0,1,.216.288.356.356,0,0,1,.072.216v.036C25.424,11.388,25.388,11.46,25.352,11.568Z"
                                transform="translate(-10.8 -4.4)"
                                fill={isThanked ? "#f38e12" : "#7890a4"}
                                stroke={isThanked ? "#f38e12" : "#7890a4"}
                                stroke-width="0.5"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>{" "}
                      {/* Thanks  */}
                      {/* : {ad.thanksFlag} */}
                    </span>
                    <span item xs={1} className="verticalSepareterLine" />
                    <Delete
                      deleteUrl={`/api/v1/comments/${module}/${moduleId}/${ad.id}/`}
                      checkDeletePermission={true}
                      afterDelete={getComments}
                      axiosObj={api}
                      loader={setIsLoading}
                      loadingFlag={false}
                      deleteMsg="Are you sure you want to delete this Reply?"
                      yesBtn="Yes"
                      noBtn="No"
                      deleting={(bool) => setDeleting(bool)}
                    />
                  </span>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box>
      {isLoading ? (
        <Loader />
      ) : (
        <CustomPapperBlock
          title={`${module.charAt(0).toUpperCase() + module.slice(1)} Comments`}
          icon="customDropdownPageIcon compliancePageIcon"
          whiteBg
        >
          <Grid container spacing={3}>
            {/* <Grid item md={9} xs={12}> */}
            {/* <Paper elevation={1} className="paperSection"> */}
            {/* <Grid container spacing={3}> */}
            <Grid item md={12} sm={12} xs={12}>
              {/* <Grid container spacing={3}> */}
              {/* <Grid item md={12} sm={12} xs={12}> */}
              <Grid container spacing={3}>
                <Grid item md={7} sm={7} xs={12}>
                  <Typography variant="h6" className="sectionHeading">
                    {`Comments ${commentData.length}`}
                  </Typography>
                </Grid>
                <Grid item md={5} sm={5} xs={12}>
                  <FormControl variant="outlined" className="formControl">
                    <InputLabel id="newestcomment">Newest first</InputLabel>
                    <Select
                      id="newestcomment"
                      labelId="newestcomment"
                      label="Newest first"
                      value={sortData}
                      name="sort-data"
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value="Newest-one">Newest One</MenuItem>
                      <MenuItem value="Newest-two">Newest Two</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <TextField
                    multiline
                    variant="outlined"
                    rows="1"
                    id="description"
                    label="Add your comments here"
                    className="formControl"
                    name="main-comment"
                    value={singleComment}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.mainCommentError &&
                    <div style={{ color: "red" }}>
                      {errors.mainCommentError}
                    </div>
                  }
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    className="spacerRight buttonStyle"
                    name="save"
                    onClick={(e) =>
                      postComments({
                        ...commentPayload,
                        comment: singleComment,
                      })
                    }
                  >
                    Save
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    color="secondary"
                    onClick={() => history.goBack()}
                    className="spacerbuttonStyle custmCancelBtn"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="marginB15">
                  <Divider light />
                </Grid>
              </Grid>
              {commentData.length
                ? sortData === "Newest-one"
                  ? commentData
                    .slice(0, 1)
                    .map((cd, index) => (
                      <SingleCardData key={cd.id} item={cd} index={index} />
                    ))
                  : sortData === "Newest-two"
                    ? commentData
                      .slice(0, 2)
                      .map((cd, index) => (
                        <SingleCardData key={cd.id} item={cd} index={index} />
                      ))
                    : commentData.map((cd, index) => (
                      <SingleCardData key={cd.id} item={cd} index={index} />
                    ))
                : "No Comments "}
              {/* </Grid> */}
              {(sortData === "Newest-one" || sortData === "Newest-two") && (
                <Grid
                  item
                  md={3}
                  sm={4}
                  xs={12}
                  className={classes.commentMore}
                >
                  <Typography
                    variant="h6"
                    className="commentMoreLinkTitle"
                    align="right"
                    onClick={() => setSortData("")}
                  >
                    <Link>View All Comments</Link>
                  </Typography>
                </Grid>
              )}
              {/* </Grid> */}
            </Grid>
            {/* </Grid> */}
            {/* </Paper> */}
            {/* </Grid> */}

            {/* <Grid item xs={12} md={3}>
              <div className="quickActionSection">
                <Typography variant="h5" className="rightSectiondetail">
                  Quick Actions
                </Typography>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <Link
                      onClick={() => handleModulePush()}
                      to="#"
                      variant="subtitle"
                    >
                      <ListItemText primary={`Update ${moduleName}`} />
                    </Link>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Comment />
                    </ListItemIcon>
                    <Link
                      onClick={(e) => handleComplianceCommentPush(e)}
                      to="#"
                      variant="subtitle"
                    >
                      <ListItemText primary="Comments" />
                    </Link>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Print />
                    </ListItemIcon>
                    <Link to="#" variant="subtitle">
                      <ListItemText primary="Print" />
                    </Link>
                  </ListItem>
                </List>
              </div>
            </Grid> */}
          </Grid>
          <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
          >
            <Alert onClose={handleCloseSnackBar} severity="warning">
              Please add the comments
            </Alert>
          </Snackbar>
        </CustomPapperBlock>
      )}
    </Box>
  );
}

export default Comments;
