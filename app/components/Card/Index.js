import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "./UI/CardHeader";
import CardBody from "./UI/CardBody";
import CardFooter from "./UI/CardFooter";
import UserProfile from "../../containers/UserProfile/Index";
import PropTypes from "prop-types";
import Styles from "./UI/Styles";

/** COMPONENT INFORMATION
 * PaceCommonCard 
 * Common card component for all modules
 * @param cardTitle > string > description or title of the card
 * @param avatar > string (link) > user image link
 * @param username > string > user name (ex: Teknobuilt Admin)
 * @param itemId > number > card item id
 * @param headerFields > array of object > Card header key and value pairs
 * @param bodyFields > array of object > Card body key and value pairs
 * @param deleteFields > array of object > Props to pass in delete componenet
 * @param handleVisibility > function > To show attachment box
 * @param handleVisibilityComments > function > To show "Add comment" box
 * @param files > number > Attachment counts
 * @param commentsCount > number > Comments counts
 * @param handleSummaryPush > function > Function to navigate to detail page
 * @param checkDeletePermission > boolean > check the permission to delete
 * @since v1.0.0
 * @Abhimanyu <abhimanyus@teknobuilt.com>
 * @example
      <CardView
        commentPayload={item.commentPayload} // payload to send
        redirectUrl = {item.url} // redirect url
        cardTitle={item.description} // Card title
        avatar={item.avatar} // Card avatar
        username={item.username} // Profile username
        itemId={item.id} // Item ID
        headerFields={[
          // Card header labels and values for each item
          { label: ahaLabels.header[0], value: item.ahaNumber },
          { label: ahaLabels.header[1], value: "AHA" },
          { label: ahaLabels.header[2], value: item.ahaStage },
          {
            label: ahaLabels.header[3],
            value: item.ahaStatus === "Assessment" ? "Open" : item.ahaStatus,
          },
        ]}
        bodyFields={[
          // Card body labels and values for each item
          { label: ahaLabels.body[0], value: item.workArea },
          { label: ahaLabels.body[1], value: item.location },
          {
            label: ahaLabels.body[2],
            value: moment(item.createdAt).format("Do MMMM YYYY, h:mm:ss a"),
          },
          { label: ahaLabels.body[3], value: item.createdByName },
        ]}
        printFields={{
          // Print component props
          typeOfModule: "Observation",
          printUrl: `api/v1/observations/${item.id}/print/`,
          number: item.observationNumber,
        }}
        bookmarkFields={{
          // Bookmark component props
          typeOfModule: "observations",
          itemId: item.id,
        }}
        RefreshBookmarkData={fetchInitialiObservation} // Refreshing data after removing as bookmark
        deleteFields={{
          // Delete component props
          deleteUrl: `/api/v1/ahas/${item.id}/`,
          afterDelete: () => {
            fetchAllAHAData();
          },
          axiosObj: api,
          item: deleteItem,
          loader: setIsLoading,
          loadingFlag: false,
          deleteMsg: "Are you sure you want to delete this AHA?",
          yesBtn: "Yes",
          noBtn: "No",
        }}
        handleVisibility={() => handleVisibility()} // Show attachment box
        handleVisibilityComments={() => handleVisibilityComments()} // Show "add comment" box
        files={item.files !== null ? item.files.length : 0} // Attachment counts
        commentsCount={item.commentsCount} // Comments count
        handleSummaryPush={() => handleSummaryPush(item, commentPayload)} // Go to detail page function
        checkDeletePermission={checkDeletePermission} // Check delete permission
      />
**/

/**
 * @file - index.js
 * @location /app/components/Card
 * @description Landing file for all sub components
 * @author Abhimanyu<abhimanyus@teknobuilt.com>
 * @since v1.1.0
 **/

const useStyles = makeStyles((theme) => Styles());

const CardView = (props) => {
  console.log(props.redirectUrl, 'proooooooooooooo');
  const classes = useStyles();
  const [myUserPOpen, setMyUserPOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const RefreshBookmarkData = () => {
    props.RefreshBookmarkData();
  };

  return (
    <>
      <Card
        variant="outlined"
        className={`${classes.card} ${
          props.ifPaperUpload ? props.ifPaperUpload : ""
        }`}
        style={
          deleting
            ? {
                opacity: 0.4,
                transition: "0.3s all ease",
                borderColor: "#f4760798",
              }
            : { opacity: 1, transition: "0.3s all ease" }
        }
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
                setMyUserPOpen(val);
              }}
              handleSummaryPush={() => {
                // Go to detail page
                props.handleSummaryPush(props.itemId);
              }}
              ifPaperUpload={props.ifPaperUpload ? props.ifPaperUpload : ""} // If observation is uploaded by paper
            />
            <CardBody
              handleSummaryPush={() => {
                // Go to detail page
                props.handleSummaryPush(props.itemId);
              }}
              bodyFields={props.bodyFields} // Card Body labels and values
            />
          </Grid>
        </CardContent>
        <Divider />
        <CardFooter
          commentPayload={props.commentPayload} // Payload for sending the data
          redirectUrl = {props.redirectUrl} // Url to redirect the data
          files={props.files} // Attachment counts
          commentsCount={props.commentsCount} // Comments counts
          checkDeletePermission={props.checkDeletePermission} // Check delete permission
          deleteFields={props.deleteFields} // Delete component fields
          isFlagPresent={props.isFlagPresent}
          printFields={props.printFields ? props.printFields : ""}
          bookmarkFields={props.bookmarkFields ? props.bookmarkFields : ""}
          handleVisibilityComments={() => {
            // Add comment box
            props.handleVisibilityComments();
          }}
          RefreshBookmarkData={RefreshBookmarkData}
          handleVisibility={() => props.handleVisibility()} // Show attachment box
          deleting={(bool) => setDeleting(bool)}
        />
        <UserProfile
          ifJsa={
            // If card is from JSA
            props.headerFields.filter((one) => one.value === "JSA").length > 0
          }
          open={myUserPOpen} // State true or false to open popup
          handleMyUserPClose={(val) => {
            // Close popup function
            setMyUserPOpen(val);
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
