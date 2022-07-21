import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";

const useStyles = makeStyles((theme) => ({
  formBox: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.75rem",
    borderWidth: "2px",
    borderRadius: "5px",
    borderColor: "#CBCBCB",
    borderStyle: "dashed",
    backgroundColor: "#ffffff",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    marginTop: "0.625rem",
    marginBottom: "0.625rem",
    cursor: "pointer",
    position: "relative",
    textAlign: "center",

    "& input": {
      position: "absolute",
      left: 0,
      top: 0,
      opacity: 0,
      width: "100%",
      height: "100%",
    },
  },
}));

const MultiAttachment = (props) => {
  const classes = useStyles();

  let fileTypes;

  if (props.docTypes && Object.keys(props.docTypes).length > 0) {
    if (props.docTypes.avi === "yes") {
      fileTypes = [
        "png",
        "jpg",
        "mp4",
        "mov",
        "flv",
        "avi",
        "mkv",
        "mp3",
        "wma",
      ];
    } else if (props.docTypes.pdf === "yes") {
      fileTypes = ["xls", "xlsx", "ppt", "pptx", "doc", "docx", "text", "pdf"];
    } else {
      fileTypes = [
        "png",
        "jpg",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "doc",
        "docx",
        "text",
        "pdf",
        "mp4",
        "mov",
        "flv",
        "avi",
        "mkv",
      ];
    }
  } else {
    fileTypes = [
      "png",
      "jpg",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "doc",
      "docx",
      "text",
      "pdf",
      "mp4",
      "mov",
      "flv",
      "avi",
      "mkv",
    ];
  }

  const [checkExt, setCheckExt] = useState(true);
  const [checkBiggerFile, setCheckBiggerFile] = useState(false);
  const [notSupported, setNotSupported] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (e) => {
      const filesArray = e;
      const temparray = [];
      console.log(e, "eeeeeeeeeeeeeeeeeee");

      debugger;

      const tempArr2 = [];

      let notSupportedExt = "";

      for (let i = 0; i < filesArray.length; i++) {
        const nameExtArr = filesArray[i].name.split(".");
        const nameExtension = nameExtArr[nameExtArr.length - 1];
        tempArr2.push(nameExtension);
      }

      tempArr2.forEach((element) => {
        if (!fileTypes.includes(element)) {
          notSupportedExt =
            notSupportedExt +
            element +
            `${tempArr2[tempArr2.length - 1] === element ? " " : " "}`;
        }
      });

      const containsAllBool = tempArr2.every((element) => {
        return fileTypes.includes(element);
      });

      setNotSupported(notSupportedExt);

      if (!containsAllBool) {
        setCheckExt(false);
        setCheckBiggerFile(false);
      } else {
        setCheckExt(true);
      }

      for (let i = 0; i < filesArray.length; i++) {
        if (
          filesArray[i].size <= 1024 * 1024 * 25 &&
          fileTypes.includes(
            filesArray[i].name.split(".")[
              filesArray[i].name.split(".").length - 1
            ]
          )
        ) {
          temparray.push(filesArray[i]);
        } else if (
          filesArray[i].size >= 1024 * 1024 * 25 &&
          fileTypes.includes(
            filesArray[i].name.split(".")[
              filesArray[i].name.split(".").length - 1
            ]
          )
        ) {
          await setCheckBiggerFile(true);
          await setOpen(true);
        } else if (
          filesArray[i].size >= 1024 * 1024 * 25 &&
          !fileTypes.includes(
            filesArray[i].name.split(".")[
              filesArray[i].name.split(".").length - 1
            ]
          )
        ) {
          await setCheckBiggerFile(true);
          await setCheckExt(false);
          await setOpen(true);
        } else {
          document.getElementById("attachment").value = "";
          await setOpen(true);
        }
      }

      await setFiles(temparray);
    },
  });

  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);

  // send selected files to parent component

  const attachmentHandler = () => {
    props.attachmentHandler(files);
  };

  useEffect(() => {
    if (files.length > 0) {
      attachmentHandler();
    }
  }, [files]);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
        <Typography variant="h6" className="sectionHeading">
          <svg
            id="twotone-closed_caption-24px"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              id="Path_5090"
              data-name="Path 5090"
              d="M0,0H24V24H0Z"
              fill="none"
            />
            <path
              id="Path_5091"
              data-name="Path 5091"
              d="M18.5,16H7A4,4,0,0,1,7,8H19.5a2.5,2.5,0,0,1,0,5H9a1,1,0,0,1,0-2h9.5V9.5H9a2.5,2.5,0,0,0,0,5H19.5a4,4,0,0,0,0-8H7a5.5,5.5,0,0,0,0,11H18.5Z"
              fill="#06425c"
            />
          </svg>{" "}
          {props.docTypes && props.docTypes.pdf === "yes"
            ? "Attachments"
            : props.docTypes && props.docTypes.avi === "yes"
            ? "Evidences"
            : "Attachments"}
        </Typography>
      </Grid>
      <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
        <Paper elevation={1} className="paperSection">
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
              <Typography className="viewLabelValue">
                <div {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    type="file"
                    multiple
                    name="file"
                    id="attachment"
                    style={{ display: "block" }}
                    accept={`.${fileTypes.join(", .")}`}
                  />
                </div>
                <span align="center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="39.4"
                    height="28.69"
                    viewBox="0 0 39.4 28.69"
                  >
                    <g
                      id="upload-outbox-svgrepo-com"
                      transform="translate(0 0)"
                    >
                      <g
                        id="Group_4970"
                        data-name="Group 4970"
                        transform="translate(13.004)"
                      >
                        <g id="Group_4969" data-name="Group 4969">
                          <path
                            id="Path_3322"
                            data-name="Path 3322"
                            d="M180.343,76.859l-6.73-8.242a.307.307,0,0,0-.236-.113.3.3,0,0,0-.237.111l-6.73,8.244a.293.293,0,0,0,.237.482h2.268V84.35c0,.169.307.321.476.321h7.934c.169,0,.143-.152.143-.321V77.341h2.64a.293.293,0,0,0,.237-.482Z"
                            transform="translate(-166.342 -68.504)"
                            fill="#7890a4"
                          />
                        </g>
                      </g>
                      <g
                        id="Group_4972"
                        data-name="Group 4972"
                        transform="translate(0 12.502)"
                      >
                        <g id="Group_4971" data-name="Group 4971">
                          <path
                            id="Path_3323"
                            data-name="Path 3323"
                            d="M38.893,234.386h.038l-5.083-4.954a3.307,3.307,0,0,0-2.263-1.008H26.115a.611.611,0,0,0,0,1.222h5.471a2.253,2.253,0,0,1,1.434.68l3.7,3.6H25.2a.6.6,0,0,0-.611.594,4.579,4.579,0,0,1-9.158,0,.6.6,0,0,0-.611-.6H3.008L6.7,230.33a2.261,2.261,0,0,1,1.439-.684H13.9a.611.611,0,1,0,0-1.222H8.138a3.357,3.357,0,0,0-2.287,1.012L.765,234.31A1.879,1.879,0,0,0,0,235.725v7.025a2,2,0,0,0,1.989,1.862H37.725A1.732,1.732,0,0,0,39.4,242.75v-7.025A1.76,1.76,0,0,0,38.893,234.386Z"
                            transform="translate(0 -228.424)"
                            fill="#7890a4"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <p className="chooseFileDesign">
                  Drag and drop here or <span>Choose files</span>
                </p>
                <p style={{ marginTop: 15 }}>(.{fileTypes.join(", .")})</p>
                <aside>
                  {files.length > 0 ? (
                    <ul style={{ marginTop: "15px" }}>
                      {files.map((file) => (
                        <li style={{ marginTop: "5px" }} key={file.name}>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </aside>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {checkExt === false && checkBiggerFile
            ? `File extension ${notSupported.toUpperCase()} is not supported and file(s) you are attaching is bigger than the 25mb.`
            : checkExt === false
            ? `File extension ${notSupported.toUpperCase()} is not supported.`
            : checkBiggerFile
            ? "The file(s) you are attaching is bigger than the 25mb."
            : ""}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MultiAttachment;
