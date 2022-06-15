import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  formControlOwnership: {
    width: "100%",
    marginBottom: "30px",
  },
  usrProfileListBox: {
    "& ul": {
      paddingTop: "0px",
      "& li": {
        paddingLeft: "0px",
        paddingTop: "0px",
        paddingBottom: "0px",
        "& div": {
          "& span": {
            display: "inline-block",
            float: "left",
            paddingRight: "14px",
            fontSize: "15px",
            fontWeight: "600",
          },
          "& p": {
            display: "inline-block",
            float: "left",
            fontSize: "15px",
          },
        },
      },
    },
  },
}));

const UserProfile = (props) => {
  const classes = useStyles();

  const handleMyUserPClose = () => {
    props.handleMyUserPClose(false);
  };

  const [value, setValue] = useState("");

  const handleChangeOne = (e, newValue) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          handleMyUserPClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle id="alert-dialog-title">{"Admin"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.ifJsaOrNot ? (
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                className={classes.usrProfileListBox}
              >
                <h6>Change ownership</h6>
                <FormControl
                  variant="outlined"
                  className={classes.formControlOwnership}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Ownership
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={value}
                    onChange={handleChangeOne}
                    label="Ownership"
                  >
                    <MenuItem value={10}>Self</MenuItem>
                    <MenuItem value={10}>Prakash</MenuItem>
                    <MenuItem value={20}>Ashutosh</MenuItem>
                    <MenuItem value={30}>Saddam</MenuItem>
                    <MenuItem value={30}>Sunil</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              ""
            )}
            <Grid
              item
              md={12}
              sm={12}
              xs={12}
              className={classes.usrProfileListBox}
            >
              <h3>Basic Information</h3>
              <List>
                <ListItem>
                  <ListItemText primary="Full Name:" secondary="Prakash" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Organization Type:"
                    secondary="Epc ORGANIZATION"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Organization Role:" secondary="N/A" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Role Title:" secondary="N/A" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Current Location:"
                    secondary="Delhi » NCT » India"
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid
              item
              md={12}
              sm={12}
              xs={12}
              className={classes.usrProfileListBox}
            >
              <h3>Company Information</h3>
              <List>
                <ListItem>
                  <ListItemText primary="Company Name:" secondary="JWIL" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Location:" secondary="Italy" />
                </ListItem>
              </List>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleMyUserPClose();
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
