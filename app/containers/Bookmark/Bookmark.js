import React, { useEffect, useState } from "react";
import StarsIcon from "@material-ui/icons/Stars";
import IconButton from "@material-ui/core/IconButton";
import api from "../../utils/axios";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  iconteal: {
    color: "#517b8d",
    fontSize: "24px",
  },
  buckmarkIcon: {
    height: "35px",
    width: "35px",
  },
  minWd55: {
    minWidth: "55px !important",
  },
  hoverB: {
    "&:hover": {
      backgroundColor: "#f47607",
      opacity: "0.9",
    },
  },
}));
const Bookmark = (props) => {
  const classes = useStyles();

  const [orange, setOrange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(0);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleBookmark = async () => {
    setLoading(true);
    const currentCompanyId = JSON.parse(localStorage.getItem("company"))
      .fkCompanyId;
    const projectId = JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
    const selectBreakdown =
      JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : [];
    let struct = "";
    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    const loginId = JSON.parse(localStorage.getItem("userDetails")).id;

    const bookmarkPayload = {
      fkCompanyId: currentCompanyId,
      fkProjectId: projectId,
      entity: props.typeOfModule,
      entityReferenceId: props.itemId,
      bookmarkedBy: loginId,
    };

    if (props.bookmarkTrueFalse || orange === true) {
      console.log("u r in  if");
      const response = await api
        .delete(`https://dev-safety1-api.paceos.io/api/v1/core/bookmarks/114/`)
        .then((res) => {
          console.log(res, "response");
          if (res.data.data) {
            setOpen(0);
            setLoading(false);
            setOrange(false);
          } else if (
            res.data.status_code === 400 ||
            res.data.status_code === 401
          ) {
            setOpen(2);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("u r in  else");
      const response = await api
        .post(
          "https://dev-safety1-api.paceos.io/api/v1/core/bookmarks/",
          bookmarkPayload
        )
        .then((res) => {
          console.log(res, "response");
          if (res.data.data) {
            setOpen(3);
            setLoading(false);
            setOrange(true);
          }
          if (res.data.status_code === 400 || res.data.status_code === 401) {
            setOpen(1);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    if (props.bookmarkTrueFalse) {
      setOrange(true);
    }
  }, []);
  useEffect(() => {
    // console.log(orange, "orange");
  }, [orange]);
  return (
    <>
      <IconButton onClick={handleBookmark} style={{ width: 45, height: 45 }}>
        {loading ? (
          <CircularProgress size={10} />
        ) : (
          <StarsIcon
            color={
              props.bookmarkTrueFalse || orange === true
                ? "secondary"
                : "primary"
            }
            className={classes.buckmarkIcon}
            style={{ width: 24, height: 24 }}
          />
        )}
      </IconButton>
      <Snackbar
        open={open === 1 || open === 2 || open === 3}
        autoHideDuration={800}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={open === 3 ? "success" : "error"}
        >
          {open === 1
            ? "Failed to add bookmark"
            : open === 2
            ? "Failed to remove the bookmark"
            : open === 3
            ? "Bookmark added successfully."
            : ""}
        </Alert>
      </Snackbar>
    </>
  );
};
//

export default Bookmark;
