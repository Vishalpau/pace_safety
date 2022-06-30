import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "./UI/CardHeader";
import CardBody from "./UI/CardBody";
import CardFooter from "./UI/CardFooter";
import UserProfile from "../UserProfile/Index";
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

    "&.latest": {
      borderColor: "#818181",
    },
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
      <Card
        variant="outlined"
        className={`${classes.card} ${
          props.ifPaperUpload ? props.ifPaperUpload : ""
        }`}
      >
        <CardContent>
          <Grid container spacing={3} className={classes.cardContentSection}>
            <CardHeader
              cardTitle={props.cardTitle} // Card Title
              username={props.username} // Profile Username
              avatar={props.avatar} // Card Avatar
              headerFields={props.headerFields} // Card Header labels and values
              handleMyUserPClickOpen={(val) => {
                // Open user profile pop up
                handleMyUserPClickOpen(val);
              }}
              handleSummaryPush={() => {
                // Go to detail page
                handleSummaryPush();
              }}
              ifPaperUpload={props.ifPaperUpload ? props.ifPaperUpload : ""} // If observation is uploaded by paper
            />
            <CardBody
              handleSummaryPush={() => {
                // Go to detail page
                handleSummaryPush();
              }}
              bodyFields={props.bodyFields} // Card Body labels and values
            />
          </Grid>
        </CardContent>
        <Divider />
        <CardFooter
          files={props.files} // Attachment counts
          commentsCount={props.commentsCount} // Comments counts
          checkDeletePermission={props.checkDeletePermission} // Check delete permission
          deleteFields={props.deleteFields} // Delete component fields
          handleVisibilityComments={() => {
            // Add comment box
            props.handleVisibilityComments();
          }}
          handleVisibility={() => props.handleVisibility()} // Show attachment box
        />
        <UserProfile
          ifJsa={
            // If card is from JSA
            props.headerFields.filter((one) => one.value === "JSA").length > 0
          }
          open={myUserPOpen} // State true or false to open popup
          handleMyUserPClose={(val) => {
            // Close popup function
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
