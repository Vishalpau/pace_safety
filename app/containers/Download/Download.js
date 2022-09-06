import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Menu from "@material-ui/core/Menu";
import { CircularProgress, Tooltip } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// const styles = (theme) => ({

const useStyles = makeStyles((theme) => ({
  tableActionIcons: {
    color: "#546e7a",
    "& svg": {
      fontSize: "30px",
      padding: "5px",
    },
  },
  downloadListBox: {
    textAlign: "right",
    margin: "8px 0px",
    padding: "5px",
  },
  menuPopUpBox: {
    "& li": {
      padding: "0px",

      "& svg": {
        marginRight: "5px",

        color: "#546e7a",

        verticalAlign: "middle",
      },

      "& a": {
        width: "100%",
        padding: "10px 15px",
        display: "inline-block",
        color: "#263238",
        fontSize: "14px",
        fontFamily: "Montserrat-Regular",
        textDecoration: "none",
      },
    },
  },
  // });
}));

const Download = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorE1] = useState(false);
  //   const [deleteQ, setDeleteQ] = useState(false);
  const { anchor1, setAnchor1 } = useState(false);
  //   const { open,setOpen } = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(true);

  const handleClick = (event) => {
    setAnchorE1(true);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  return (
    <>
      {/* <div className={classes.drawerHeader} /> */}
      {/* <Grid container spacing={2}> */}
      <Grid item md={12} sm={12} xs={12} className={classes.downloadListBox}>
        <Tooltip title="Download Files" arrow>
          <IconButton
            size="small"
            className={classes.tableActionIcons}
            aria-controls="simple-menu"
            aria-haspopup="true"
            disabled={true}
            //disabled={this.props.actions.length > 0 ? false : true}
            onClick={() => handleClick()}
          >
            <CloudDownloadIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Menu
        //TransitionComponent={Fade}
        className={classes.menuPopUpBox}
        elevation={3}
        id="simple-menu"
        //anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleClose}
      >
        <MenuItem>
          <Tooltip title="Download in PDF" arrow>
            <Button
              //   onClick={this.handleDownloadPdf}
              //   disabled={this.state.loadingPDF}
              style={{ margin: 5 }}
            >
              {/* {loadingPDF && <CircularProgress size={14} />}
                {loadingPDF && ( */}
              <img
                src="https://media.pace-os.com/icons/svg/pdf-24x24.svg"
                alt="PDF file"
              />
              {/* )} */}
            </Button>
          </Tooltip>
        </MenuItem>
        {/* <MenuItem>
      <Tooltip title="Download in Excel" arrow>
        <Button
          onClick={this.handleDownloadExcel}
          disabled={this.state.loadingXLS}
          style={{ margin: 5 }}
        >
          {this.state.loadingXLS && (
            <CircularProgress size={14} />
          )}
          {!this.state.loadingXLS && (
            <img
              src="https://media.pace-os.com/icons/svg/excel-24x24.svg"
              alt="Excel File"
            />
          )}
        </Button>
      </Tooltip>
    </MenuItem> */}
        <MenuItem>
          <Tooltip title="Download in CSV" arrow>
            <Button
              //   onClick={this.handleDownloadCSV}
              //   disabled={this.state.loadingCSV}
              style={{ margin: 5 }}
            >
              {/* {this.state.loadingCSV &&} */}
              {/* <CircularProgress size={14} /> */}
              {/* {!this.state.loadingCSV && */}

              <img
                src="https://media.pace-os.com/icons/svg/csv-24x24.svg"
                alt="CSV File"
              />
            </Button>
          </Tooltip>
        </MenuItem>
      </Menu>
      {/* </Grid> */}
    </>
  );
};

export default Download;
