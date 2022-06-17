import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import UserProfile from "./UserProfile";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  cardContentSection: {
    position: "relative",
    "&:hover": {
      backgroundColor: "#f0f0f0",
      webkitBoxShadow: "0 1px 5px 2px #f0f0f0",
      boxShadow: "0 1px 5px 2px #f0f0f0",
    },
    "&:hover .MuiGrid-align-items-xs-flex-start": {
      backgroundColor: "#f0f0f0",
    },
  },
  card: {
    boxShadow: "0px 0px 2px #ccc",
    borderRadius: "10px",
    marginBottom: "30px",
  },
}));

const CardView = (props) => {
  const classes = useStyles();
  const [myUserPOpen, setMyUserPOpen] = React.useState(false);

  const handleSummaryPush = () => {
    props.handleSummaryPush(props.itemId);
  };

  const handleMyUserPClickOpen = (val) => {
    setMyUserPOpen(val);
  };

  const handleMyUserPClose = (val) => {
    setMyUserPOpen(val);
  };

  return (
    <>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Grid container spacing={3} className={classes.cardContentSection}>
            <CardHeader
              cardTitle={props.cardTitle}
              username={props.username}
              avatar={props.avatar}
              headerFields={props.headerFields}
              handleMyUserPClickOpen={(val) => {
                handleMyUserPClickOpen(val);
              }}
              handleSummaryPush={() => {
                handleSummaryPush();
              }}
            />
            <CardBody
              handleSummaryPush={() => {
                handleSummaryPush();
              }}
              bodyFields={props.bodyFields}
            />
          </Grid>
        </CardContent>
        <Divider />
        <CardFooter
          files={props.files}
          commentsCount={props.commentsCount}
          checkDeletePermission={props.checkDeletePermission}
          deleteFields={props.deleteFields}
          handleVisibilityComments={() => {
            props.handleVisibilityComments();
          }}
        />
        <UserProfile
          ifJsa={
            props.headerFields.filter((one) => one.value === "JSA").length > 0
          }
          open={myUserPOpen}
          handleMyUserPClose={(val) => {
            handleMyUserPClose(val);
          }}
        />
      </Card>
    </>
  );
};

CardHeader.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.any,
  headerFields: PropTypes.array.isRequired,
};

CardBody.propTypes = {
  bodyFields: PropTypes.array.isRequired,
};

CardFooter.propTypes = {
  files: PropTypes.number.isRequired,
  checkDeletePermission: PropTypes.bool,
};

UserProfile.propTypes = {
  ifJsa: PropTypes.bool,
};

export default CardView;
