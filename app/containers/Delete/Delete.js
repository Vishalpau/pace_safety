import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
//import SwipeToDelete from "react-swipe-to-delete-component";
// Import styles of the react-swipe-to-delete-component
//import "react-swipe-to-delete-component/dist/swipe-to-delete.css";

const useStyles = makeStyles((theme) => ({
  iconteal: {
    color: "#517b8d",
    fontSize: "24px",
  },
  mLeftR5: {
    marginLeft: "0.313rem",
    marginRight: "0.938rem",
    ["@media (max-width:480px)"]: {
      marginLeft: "0.188rem",
      marginRight: "0.188rem",
    },
  },
  dailogBoxCustomStyle: {
    "& .MuiPaper-root": {
      maxWidth: "520px",
      width: "100%",
    },
  },
  dailogBoxCustomStyleAuto: {
    "& .MuiPaper-root": {
      maxWidth: "370px",
      width: "100%",
    },
    "& .MuiDialogContentText-root": {
      marginBottom: "0px",
    },
  },
  successMessTitle: {
    color: "#06425C",

    fontSize: "30px",

    fontFamily: "Montserrat-SemiBold",

    lineHeight: "37px",

    paddingTop: "5px",
  },

  successMessContent: {
    color: "#666666",

    fontSize: "20px",

    fontFamily: "Montserrat-Medium",

    lineHeight: "24px",

    padding: "25px 0px 20px 0px",
  },
  successMessContentAuto: {
    color: "#666666",
    fontSize: "20px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "24px",
    padding: "10px 0px 0px 0px",
  },
  actionSection: {
    marginTop: "20px",
  },

  buttonStyle: {
    color: "#ffffff !important",

    padding: "5px 20px",

    fontSize: "16px",

    //marginRight: '15px',

    textTransform: "none",

    backgroundColor: "#06425C",

    borderRadius: "25px",

    boxShadow: "none",

    border: "1px solid #06425C",

    "&:hover": {
      backgroundColor: "#F28705",

      borderColor: "#F28705",
    },
  },
  deleteMassBox: {
    paddingBottom: "10px",

    paddingTop: "10px",
  },
  custmCancelBtn: {
    color: "#06425C",

    padding: "5px 20px",

    fontSize: "16px",

    marginLeft: "15px",

    textTransform: "none",

    backgroundColor: "#ffffff",

    borderRadius: "25px",

    boxShadow: "none",

    border: "1px solid #06425C",

    "&:hover": {
      backgroundColor: "#F28705",

      color: "#ffffff",

      borderColor: "#F28705",
    },
  },
}));

const Delete = (props) => {
  const classes = useStyles();
  const [deleteQ, setDeleteQ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLength, setDataLength] = useState(props.dataLength);
  const [succesPopupOpen, setSuccesPopupOpen] = useState(false);
  const [maxWidthCP, setMaxWidthCP] = useState("sm");
  const handleSuccessPopoupClose = () => {
    setSuccesPopupOpen(false);
  };

  const sendValue = async () => {
    if (props.item.fkProjectStructureIds !== "") {
      setLoading(true);
      setDeleteQ(false);

      if (props.item) {
        const res = await props.axiosObj
          .put(props.deleteUrl, props.item)
          .then((res) => {
            setSuccesPopupOpen(true);
            props.afterDelete();

            if (props.dataLength !== dataLength - 1) {
              setLoading(false);
            }
          })

          .catch((err) => {
            props.loader(props.loadingFlag);
          });
      } else {
        const res = await props.axiosObj
          .delete(props.deleteUrl)
          .then((res) => {
            props.afterDelete();
            if (props.dataLength !== dataLength - 1) {
              setLoading(false);
            }
          })
          .catch((err) => {
            props.loader(props.loadingFlag);
          });
      }
    } else {
      setLoading(true);
      setDeleteQ(false);
    }
  };

  return (
    <>
      <Button onClick={() => setDeleteQ(true)}>
        {loading ? (
          <CircularProgress size={12} />
        ) : (
          <>
            <Tooltip title="Delete" arrow>
              {props.deleteItem ? (
                <DeleteForeverOutlinedIcon className={classes.iconteal} />
              ) : (
                <svg
                  id="baseline-delete-24px"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="Path_221"
                    data-name="Path 221"
                    d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM19,4H15.5l-1-1h-5l-1,1H5V6H19Z"
                    fill="#7890a4"
                  />
                  <path
                    id="Path_222"
                    data-name="Path 222"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  />
                </svg>
              )}
            </Tooltip>
          </>
        )}
      </Button>
      {/* <div className="list-group">
        <SwipeToDelete> */}
      <Dialog
        open={deleteQ}
        //onClose={handleCloseDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* New changes  */}
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                align="center"
                className={classes.successMessgBox}
              >
                <Typography variant="body1" align="center">
                  <img
                    src="https://media.pace-os.com/icons/svg/delete-72x72.svg"
                    alt="Alert"
                  />
                </Typography>
                {/* <Typography
                  variant="h2"
                  className={classes.successMessTitle}
                  align="center"
                >
                  Confirmation
                </Typography> */}
                <Typography
                  variant="h6"
                  className={classes.successMessContent}
                  align="center"
                >
                  {props.deleteMsg}
                </Typography>
              </Grid>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                align="center"
                className={classes.deleteMassBox}
              >
                <Button
                  size="medium"
                  variant="contained"
                  className={classes.buttonStyle}
                  onClick={() => sendValue()}
                >
                  Delete
                </Button>

                <Button
                  size="medium"
                  variant="contained"
                  className={classes.custmCancelBtn}
                  onClick={() => setDeleteQ(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="checkRadioLabel">
                    {props.deleteMsg}
                  </FormLabel>
                </FormControl>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  className="spacerRight buttonStyle"
                  onClick={() => sendValue()}
                >
                  {props.yesBtn}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className="spacerRight buttonStyle"
                  onClick={() => setDeleteQ(false)}
                >
                  {props.noBtn}
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent> */}
      </Dialog>
      {/* </SwipeToDelete>*/}
      {/* </div> */}

      {/* {new ui changes} */}
      <Dialog
        maxWidth={maxWidthCP}
        open={succesPopupOpen}
        onClose={handleSuccessPopoupClose}
        className={classes.dailogBoxCustomStyleAuto}
      >
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                align="center"
                className={classes.successMessgBox}
              >
                <Typography variant="body1" align="center">
                  <img
                    src="https://media.pace-os.com/icons/svg/success-72x72.svg"
                    alt="Thanks"
                  />
                </Typography>
                <Typography
                  variant="h2"
                  className={classes.successMessTitle}
                  align="center"
                >
                  Done
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.successMessContentAuto}
                  align="center"
                >
                  Deleted!
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Delete;
