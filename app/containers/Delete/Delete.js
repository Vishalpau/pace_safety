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
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { CircularProgress } from "@material-ui/core";

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
}));

const Delete = (props) => {

  const classes = useStyles();
  const [deleteQ, setDeleteQ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLength, setDataLength] = useState(props.dataLength);
  const [deleting, setDeleting] = useState(false);

  const sendValue = async () => {
    // props.loader(!props.loadingFlag);
    setLoading(true);
    setDeleteQ(false);
    setDeleting(true);
    if (props.item) {
      const res = await props.axiosObj
        .put(props.deleteUrl, props.item)
        .then((res) => {
          // props.loader(props.loadingFlag);
          props.afterDelete();
          if (props.dataLength === dataLength - 1) {
            setLoading(false);
          }
        })
        .catch((err) => {
          props.loader(props.loadingFlag);
          setDeleting(false);
        });
    } else {
      const res = await props.axiosObj
        .delete(props.deleteUrl)
        .then((res) => {
          // props.loader(props.loadingFlag);
          props.afterDelete();
          if (props.dataLength === dataLength - 1) {
            setLoading(false);
          }
        })
        .catch((err) => {
          props.loader(props.loadingFlag);
          setDeleting(false);
        });
    }
  };

  useEffect(() => {
    if (deleting) {
      props.deleting(deleting);
    }
  }, [deleting]);

  return (
    <>
      {props.checkDeletePermission ? (
        <Tooltip title="Delete" arrow>
          <Button
            // className={classes.mLeftR5}
            onClick={() => setDeleteQ(true)}
          >
            {loading ? (
              <CircularProgress size={12} />
            ) : (
              <>
                {props.deleteItem ? (
                  <DeleteForeverOutlinedIcon className={classes.iconteal} />
                ) : (
                  // <Link href="#">
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
                  // </Link>
                )}
              </>
            )}
          </Button>
        </Tooltip>
      ) : (
        <Button>
          <DeleteForeverOutlinedIcon
            className={classes.iconteal}
            style={{
              color: "#c0c0c0",
              cursor: "not-allowed",
              background: "white",
            }}
          />
        </Button>
      )}

      <Dialog
        open={deleteQ}
        // onClose={handleCloseDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
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
                  color="secondary"
                  variant="contained"
                  className="buttonStyle custmCancelBtn"
                  onClick={() => setDeleteQ(false)}
                >
                  {props.noBtn}
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Delete;
