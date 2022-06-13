import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
  const sendValue = async () => {
    props.loader(props.loadingFlag);
    setDeleteQ(false);
    const res = await props.axiosObj
      .put(props.deleteUrl, {
        fkCompanyId: props.item.fkCompanyId,
        fkProjectId: props.item.fkProjectId,
        fkProjectStructureIds: props.item.fkProjectStructureIds,
        location: props.item.location,
        assessmentDate: props.item.assessmentDate,
        permitToPerform: props.item.permitToPerform,
        description: props.item.description,
        classification: props.item.classification,
        createdBy: props.item.createdBy,
        status: "Delete",
      })
      .then((res) => props.afterDelete())
      .then((res) => props.loader(!props.loadingFlag));
  };

  return (
    <>
      <Link href="#" className={classes.mLeftR5}>
        <IconButton onClick={() => setDeleteQ(true)}>
          <DeleteForeverOutlinedIcon className={classes.iconteal} />
        </IconButton>
      </Link>

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
