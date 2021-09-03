import React , {useRef , useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import VisibilityIcon from "@material-ui/icons/Visibility";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightMedium,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      position: "absolute",
      width: 650,
      backgroundColor: theme.palette.background.paper,
      // boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
    },
    incidentTitle: {
      fontSize: "1.35rem !important",
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    modalButton: {
      width: "100%",
    },
  }));
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function AlertDialog({open, setOpen,documentUrl}) {
//   const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  let doc = documentUrl.split('-')
    let document = doc[doc.length - 1]
    let extension = document.split('.')
    let lastname = extension[extension.length - 1]
    let uname = lastname.toLowerCase()
  
  const handleClose = () => {
    setOpen(false);
  };
  const download = (image_link) => {
    let onlyImage_url = image_link.replace("https://", "");
    let image_url = "http://cors.digiqt.com/" + onlyImage_url;
    let imageArray = image_url.split("/");
    let image_name = imageArray[imageArray.length - 1];
    saveAs(image_url, image_name);
    handleClose();
  };

  return (
    <div>
     
     <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          PaperProps={{
            style: {
              width: 700,
            },
          }}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {" Please choose what do you want to?"}
          </DialogTitle>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <Close />
          </IconButton>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Grid container spacing={3}>
                
                {uname == "docx" || "pptx" || "doc" || "ppt" || "xls" || "xlsx" ? null :
                <Grid item xs={12} md={6}>
                  <Button
                    startIcon={<VisibilityIcon />}
                    variant="contained"
                    color="primary"
                    className={classes.modalButton}
                    href={`${documentUrl}`}
                    disableElevation
                    target="_blank"
                  >
                    View Attachment
                  </Button>
                  </Grid>}
                
                <Grid item xs={12} md={6}>
                  <Button
                    startIcon={<GetAppIcon />}
                    variant="contained"
                    color="primary"
                    className={classes.modalButton}
                    disableElevation
                    onClick={() => download(documentUrl)}
                  >
                    Download
                  </Button>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
     
    </div>
  );
}