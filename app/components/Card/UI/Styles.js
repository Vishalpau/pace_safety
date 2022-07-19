const Styles = (theme) => ({
  title: {
    fontSize: "1.25rem",
    fontFamily: "Montserrat-Regular",
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "500",
    lineHeight: "1.6",
  },
  titlespan: {
    fontSize: "11px",
    marginLeft: "10px",
    color: "#fff",
    padding: "4px 5px",
    background: "#ff6e0c",
    borderRadius: "3px",
    textTransform: "uppercase",
  },
  listHeadColor: { backgroundColor: "#fafafa" },
  marginTopBottom: {
    "& .MuiTypography-h6 .MuiTypography-h5": {
      fontFamily: "Montserrat-Regular",
    },
  },
  listingLabelName: {
    color: "#7692a4",
    fontSize: "0.88rem",
    fontFamily: "Montserrat-Regular",
  },
  listingLabelValue: {
    color: "#333333",
    fontSize: "0.88rem",
    fontFamily: "Montserrat-Regular",
    "& a": {
      paddingLeft: "5px",
      cursor: "pointer",
      color: "rgba(0, 0, 0, 0.87)",
      fontWeight: "600",
    },
    "&.green": {
      color: "#006400",
    },
  },
  sepHeightOne: {
    borderLeft: "3px solid #cccccc",
    height: "8px",
    verticalAlign: "middle",
    margin: "15px",
    fontSize: "10px",
  },
  floatRWithAbsolute: {
    float: "right",
    textTransform: "capitalize",
    ["@media (max-width:480px)"]: {
      float: "left",
    },
    position: "absolute",
    right: "5px",
    top: "5px",
    zIndex: 9,
  },
  userImage: {
    borderRadius: "50px",
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },
  cardLinkAction: {
    width: "100%",
    float: "left",
    padding: "14px",
    cursor: "pointer",
    textDecoration: "none !important",
    ["@media (max-width:800px)"]: {
      paddingTop: "85px",
    },
  },
  mLeftR5: {
    marginLeft: "5px",
    marginRight: "15px",
    ["@media (max-width:480px)"]: {
      marginLeft: "3px",
      marginRight: "3px",
    },
  },
  textRight: {
    textAlign: "right",
    ["@media (max-width:480px)"]: {
      textAlign: "left",
      padding: "0px 8px 15px 8px !important",
    },
  },
  sepHeightTen: {
    borderLeft: "3px solid #cccccc",
    height: "8px",
    verticalAlign: "middle",
    margin: "15px 10px 15px 15px",
    fontSize: "10px",
    ["@media (max-width:480px)"]: {
      margin: "10px 5px 10px 5px",
    },
  },
  floatR: {
    float: "right",
    textTransform: "capitalize",
    ["@media (max-width:480px)"]: {
      float: "left",
    },
  },
  iconteal: {
    color: "#06425c",
  },
  mright5: {
    marginRight: "5px",
    color: "#a7a7a7",
  },
  width100: {
    width: "100%",
    padding: "10px 15px",
  },
  commentLink: {
    marginLeft: "2px",
    cursor: "pointer",
  },
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
  iconteal: {
    color: "#517b8d",
    fontSize: "1.5rem",
  },
});

export default Styles;
