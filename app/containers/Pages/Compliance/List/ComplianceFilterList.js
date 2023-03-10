import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import MenuData from "./MenuData";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "../../../../styles/custom/customheader.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ComplianceList from "./ComplianceList";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Menu from "@material-ui/core/Menu";
import {
  CircularProgress,
  Select,
  Tooltip,
  InputLabel,
  FormControl,
} from "@material-ui/core";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Montserrat-Medium",
    "& .MuiTab-root": {
      fontFamily: "Montserrat-Medium",
    },
  },
  appFrame: {
    height: "auto",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
  },
  appBar: {
    position: "absolute",
    padding: "0 0px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  "appBarShift-left": {
    marginLeft: drawerWidth,
  },
  "appBarShift-right": {
    marginRight: drawerWidth,
    "@media (max-width:480px)": {
      marginRight: "0px",
      width: "100%",
    },
  },
  menuButton: {
    marginLeft: 3,
    marginRight: 3,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    marginLeft: "10px",
    backgroundColor: "#06425c",
    color: "#ffffff",
    borderRadius: "10px",
    height: " auto",
    // minHeight: '392px',

    "& .MuiIconButton-root": {
      color: "#ffffff",
    },

    "& .MuiListItem-gutters": {
      borderBottom: "1px solid #688ca0",
    },
    "& .MuiListItem-button:hover": {
      borderBottom: "1px solid #688ca0",
      backgroundColor: "#f47607",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderBottom: "1px solid #608296",
    ...theme.mixins.toolbar,
    "& .MuiList-padding": { paddingTop: "0px!important" },
    "& .floatR": { float: "right" },
    "@media (max-width:800px)": {
      border: "none",
      minHeight: "52px",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  "content-left": {
    marginLeft: -drawerWidth,
  },
  "content-right": {
    marginRight: "-250px",
  },
  contentRightBox: {
    "& .MuiBox-root": {
      "@media (max-width:800px)": {
        paddingTop: "56px !important",
      },
      "@media (max-width:480px)": {
        paddingTop: "80px !important",
      },
    },
    "@media (max-width:1280px)": {
      marginRight: "0px !important",
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  "contentShift-left": {
    marginLeft: 0,
  },
  "contentShift-right": {
    marginRight: 0,
  },
  title: {
    flex: 1,
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
  },
  MuiAppBarColor: {
    color: "#06425c",
    backgroundColor: "#fafafa",
  },
  padd0: {
    padding: "0px !important",
  },
  floatL: {
    textAlign: "left !important",
    paddingLeft: "10px",
    width: "100%",
    fontSize: "18px",
  },
  catButton: {
    padding: "0px 2px 0px 18px",
    borderRadius: "5px",
    textTransform: "initial",
    fontWeight: "500",
    fontSize: "17px",
    fontFamily: "Xolonium !important",
    float: "right",
  },

  pLtenPRten: { padding: "0px 10px 0px 10px" },
  buttonsNewDays: {
    padding: "6px 5px 5px 6px",
    margin: "0px 10px",
    minWidth: "38px",
    backgroundColor: "#ffffff",
    color: "#23343e",
    borderRadius: "0px",
    fontFamily: "Montserrat-Medium",
  },
  activeFont: {
    backgroundColor: "#f47607",
    borderRadius: "5px",
    color: "#ffffff",
    margin: "0px 10px",
    minWidth: "38px",
    padding: "4px 5px 5px 4px",
  },
  textLeftone: {
    textAlign: "left",
    verticalAlign: "middle",
    padding: "16px!important",
    minWidth: "19% !important",
  },
  listingLabelName: {
    color: "#7692a4",
    fontSize: "0.88rem",
    fontFamily: "Montserrat-Regular",
    "& .MuiButton-containedPrimary:hover": {
      backgroundColor: "#f47607",
      borderRadius: "5px",
      color: "#fff",
    },
  },
  textRight: {
    textAlign: "right",
  },
  drawerList: {
    borderBottom: "1px solid #608296",
    backgroundColor: "#608296",
    padding: "0px",
  },
  floatR: { float: "right" },
  catSectionArea: {
    zIndex: "-9999",
    "& nav": {
      "@media (max-width:800px)": {
        paddingTop: "0px",
      },
    },
  },
  packageTitleBox: {
    padding: "20px 16px 20px 16px !important",
    "@media (max-width:480px)": {
      padding: "5px 12px !important",
    },
  },
  daysFilterBox: {
    padding: "15px 16px 20px 16px !important",
    "@media (max-width:480px)": {
      padding: "0px 12px !important",
    },
  },
  listroot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#06425c",
    "& .MuiListItemText-root": {
      whiteSpace: "normal",
    },
  },
  nested: {
    paddingLeft: theme.spacing(2),
    backgroundColor: "#7692a4",
  },
  selected: { backgroundColor: "#f47607" },
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
});

class ComplianceFilterList extends React.Component {
  state = {
    open: false,
    anchor: "right",
    button: true,
    type: "Categories",
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = (event) => {
    this.setState({
      anchor: event.target.value,
    });
  };

  handleClickButton = () => {
    this.setState({ button: !this.state.button });
  };

  handleType = (value) => {
    this.setState({ type: value });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <div className="catDrawerSection">
        <Drawer
          variant="persistent"
          anchor={anchor}
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.catSectionArea}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              onClick={this.handleDrawerClose}
              classNames={classes.floatR}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
            <Typography variant="h5" classNames={classes.floatL}>
              {this.state.type === "All" ? "Categories" : this.state.type}
            </Typography>
          </div>
          <Divider />
          {/* <List className={classes.drawerList}>{MenuData}</List> */}
          {/* <MenuData /> */}
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.listroot}
          >
            <ListItem
              button
              className={
                this.state.type === "All" || this.state.type === "Categories"
                  ? classes.selected
                  : classes.nested
              }
              onClick={() => this.handleType("All")}
            >
              <ListItemText primary="All" />
            </ListItem>
            <ListItem
              button
              className={
                this.state.type === "Company/Contractor Inspection"
                  ? classes.selected
                  : classes.nested
              }
              onClick={() => this.handleType("Company/Contractor Inspection")}
            >
              <ListItemText primary="Company/Contractor Inspection" />
            </ListItem>
            <ListItem
              button
              className={
                this.state.type === "Area/Focussed Inspection"
                  ? classes.selected
                  : classes.nested
              }
              onClick={() => this.handleType("Area/Focussed Inspection")}
            >
              <ListItemText primary="Area/Focussed Inspection" />
            </ListItem>
            <ListItem
              button
              className={
                this.state.type === "General Inspection"
                  ? classes.selected
                  : classes.nested
              }
              onClick={() => this.handleType("General Inspection")}
            >
              <ListItemText primary="General Inspection" />
            </ListItem>
            {/* <ListItem button onClick={handleClick}  className={classes.selected}>
              <ListItemText primary="Staff Commission" />
              {open ? <RemoveIcon /> : <AddIcon />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText primary="Starred" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText primary="Starred" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText primary="Starred" />
                </ListItem>
              </List>
            </Collapse> */}
          </List>
        </Drawer>
      </div>
    );

    const menuBtn = (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.handleDrawerOpen}
        className={classNames(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
    );

    let before = null;
    let after = null;
    let beforeBtn = null;
    let afterBtn = null;

    if (anchor === "left") {
      before = drawer;
      beforeBtn = menuBtn;
    } else {
      after = drawer;
      afterBtn = menuBtn;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, classes.MuiAppBarColor, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters className={classes.MuiAppBarColor}>
              {beforeBtn}
              <Grid container spacing={3}>
                <Grid
                  item
                  md={8}
                  sm={12}
                  xs={12}
                  className={classes.packageTitleBox}
                >
                  <Typography
                    className={classes.title}
                    variant="h5"
                    color="inherit"
                    noWrap
                  >
                    {this.props.compliance === "Bookmark List"
                      ? "Bookmark List"
                      : this.props.compliance === "Big Picture"
                      ? " All Compliance "
                      : " My Compliance"}
                  </Typography>
                </Grid>

                <Grid item md={4} sm={12} xs={12}>
                  <Typography
                    className={classes.textRight}
                    variant="h5"
                    color="inherit"
                    noWrap
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.catButton}
                    onClick={() => {
                      this.handleClickButton();
                    }}
                  >
                    {!this.state.open && (
                      <Typography variant="h5">
                        {this.state.type === "All"
                          ? "Categories"
                          : this.state.type}
                      </Typography>
                    )}

                    {afterBtn}
                  </Button>
                </Grid>
                {/*Download Section */}
                {/* <div className={classes.drawerHeader} />
                <Grid container spacing={2}>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.downloadListBox}
                  />
                  <Tooltip title="Download Files" arrow>
                    <IconButton
                      size="small"
                      className={classes.tableActionIcons}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      ///disabled={this.props.actions.length > 0 ? false : true}
                      //onClick={this.handleClick}
                    >
                      <CloudDownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    TransitionComponent={this.Fade}
                    className={classes.menuPopUpBox}
                    elevation={3}
                    id="simple-menu"
                    // anchorEl={anchorEl}
                    // open={Boolean(anchorEl)}
                    //onClose={this.handleClose}
                  >
                    <MenuItem>
                      <Tooltip title="Download in PDF" arrow>
                        <Button
                          //onClick={this.handleDownloadPdf}
                          // disabled={this.state.loadingPDF}
                          style={{ margin: 5 }}
                        >
                           {this.state.loadingPDF && (
                            <CircularProgress size={14} />
                          )} 
                          {!this.state.loadingPDF && (
                            <img
                              src="https://media.pace-os.com/icons/svg/pdf-24x24.svg"
                              alt="PDF file"
                            />
                          )}
                        </Button>
                      </Tooltip>
                    </MenuItem>
                    <MenuItem>
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
                  </MenuItem> 
                    <MenuItem>
                      <Tooltip title="Download in CSV" arrow>
                        <Button
                          onClick={this.handleDownloadCSV}
                          disabled={this.state.loadingCSV}
                          style={{ margin: 5 }}
                        >
                          {this.state.loadingCSV && (
                            <CircularProgress size={14} />
                          )}
                           {!this.state.loadingCSV && (
                          <img
                            src="https://media.pace-os.com/icons/svg/csv-24x24.svg"
                            alt="CSV File"
                          />
                        )} 
                        </Button>
                      </Tooltip>
                    </MenuItem>
                  </Menu>
                </Grid>*/}
              </Grid>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(
              classes.content,
              classes.contentRightBox,
              classes.padd0,
              classes[`content-${anchor}`],
              {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open,
              }
            )}
          >
            <div className={classes.drawerHeader} />
            <ComplianceList
              compliance={this.props.compliance}
              search={this.props.search}
              type={this.state.type}
              blank={this.props.blank}
            />
          </main>
          {after}
        </div>
      </div>
    );
  }
}

ComplianceFilterList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ComplianceFilterList);
