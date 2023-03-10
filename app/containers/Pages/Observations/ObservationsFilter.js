import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import "../../../styles/custom/customheader.css";
import ObservationsList from "./ObservationsList";
import ObservationsPackage from "./ObservationsPackage";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Montserrat-Medium",
    "& .MuiTab-root": {
      fontFamily: "Montserrat-Medium",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "#7692a4",
  },
  selected: { backgroundColor: "#f47607" },
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
    ["@media (max-width:480px)"]: {
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
    //minHeight: '392px',

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
    ["@media (max-width:800px)"]: {
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
      ["@media (max-width:800px)"]: {
        paddingTop: "56px !important",
      },
      ["@media (max-width:480px)"]: {
        paddingTop: "80px !important",
      },
    },
    ["@media (max-width:1280px)"]: {
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
  },
  packageTitleBox: {
    ["@media (max-width:480px)"]: {
      padding: "5px 12px !important",
    },
  },
  daysFilterBox: {
    ["@media (max-width:480px)"]: {
      padding: "0px 12px !important",
    },
  },
});

class ObservationsFilter extends React.Component {
  state = {
    open: false,
    anchor: "right",
    button: true,
    type: "Type",
  };
  componentDidMount() {}
  // props = {
  //   observations: props.observations,
  // }

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
    if (value === "Risk") {
      this.setState({ type: "Risk" });
    } else if (value === "Comments") {
      this.setState({ type: "Comments" });
    } else if (value === "Positive behaviour") {
      this.setState({ type: "Positive behavior" });
    } else if (value === "All") {
      this.setState({ type: "Type" });
    }
  };

  render() {
    const { classes, theme, observations } = this.props;
    const { anchor, open, type } = this.state;

    const drawer = (
      <div className="catDrawerSection">
        <Drawer
          variant="persistent"
          anchor={anchor}
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
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
              {this.state.type ? this.state.type : "All"}
            </Typography>
          </div>
          <Divider />
          {/* <List className={classes.drawerList}>{MenuData}</List> */}
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root_type}
          >
            <ListItem
              button
              className={
                this.state.type === "All" || this.state.type === "Type"
                  ? classes.selected
                  : classes.nested
              }
              onClick={(e) => this.handleType("All")}
            >
              <ListItemText primary="All" />
            </ListItem>
            <ListItem
              button
              className={
                this.state.type === "Risk" ? classes.selected : classes.nested
              }
              onClick={(e) => this.handleType("Risk")}
            >
              <ListItemText primary="Risk" />
            </ListItem>
            <ListItem
              button
              className={
                this.state.type === "Comments"
                  ? classes.selected
                  : classes.nested
              }
              onClick={(e) => this.handleType("Comments")}
            >
              <ListItemText primary="Comments" />
            </ListItem>
            <ListItem
              button
              className={
                this.state.type === "Positive behavior"
                  ? classes.selected
                  : classes.nested
              }
              onClick={(e) => this.handleType("Positive behaviour")}
            >
              <ListItemText primary="Positive behaviour" />
            </ListItem>
            {/* <ListItem button className={classes.nested}>
        <ListItemText primary="Staff Commission" />
      </ListItem>
      <ListItem button className={classes.nested}>
        <ListItemText primary="Staff Commission" />
      </ListItem> */}
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
          {/* <MenuData /> */}
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
        {this.props.value === 0 && (
          <div className={classes.appFrame}>
            <AppBar
              className={classNames(classes.appBar, classes.MuiAppBarColor, {
                [classes.appBarShift]: open,
                [classes[`appBarShift-${anchor}`]]: open,
              })}
            >
              <Toolbar disableGutters className={classes.MuiAppBarColor}>
                {beforeBtn}
                <Typography
                  className={classes.title}
                  variant="h5"
                  color="inherit"
                  noWrap
                >
                  {this.props.observation === "My Observations"
                    ? "My Observations"
                    : this.props.observation === "Bookmark List"
                    ? "Bookmark List"
                    : "All Observations"}
                </Typography>

                <Typography
                  className={classes.textRight}
                  variant="h6"
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
                      {this.state.type ? this.state.type : "Type"}
                    </Typography>
                  )}
                  {afterBtn}
                </Button>
              </Toolbar>
            </AppBar>
            {before}
            <main
              className={classNames(
                classes.content,
                classes.padd0,
                classes[`content-${anchor}`],
                {
                  [classes.contentShift]: open,
                  [classes[`contentShift-${anchor}`]]: open,
                }
              )}
            >
              <div className={classes.drawerHeader} />
              <ObservationsPackage
                type={this.state.type}
                observation={this.props.observation}
                searchIncident={this.props.search}
                status={this.props.status}
              />
            </main>
            {after}
          </div>
        )}
        {this.props.value === 1 && (
          <div className={classes.appFrame}>
            <main
              className={classNames(
                classes.content,
                classes.padd0,
                classes[`content-${anchor}`],
                {
                  [classes.contentShift]: open,
                  [classes[`contentShift-${anchor}`]]: open,
                }
              )}
            >
              <ObservationsList
                observation={this.props.observation}
                searchIncident={this.props.search}
                status={this.props.status}
              />
            </main>
            {after}
          </div>
        )}
      </div>
    );
  }
}

ObservationsFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ObservationsFilter);
