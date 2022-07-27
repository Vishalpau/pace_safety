import React, { useState, useEffect } from "react";
import StarsIcon from "@material-ui/icons/Stars";
import IconButton from "@material-ui/core/IconButton";
import api from "../../utils/axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import classNames from "classnames";
//import api, { appapi, setApiUrl } from "../../../utils/axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buckmarkIcon: {
    height: "35px",
    width: "35px",
  },
  minWd55: {
    minWidth: "55px !important",
  },
  hoverB: {
    "&:hover": {
      backgroundColor: "#f47607",
      opacity: "0.9",
    },
  },
}));
const BookmarkList = () => {
  const classes = useStyles();

  const handleBookmarkList = async () => {
    const currentCompanyId = JSON.parse(localStorage.getItem("company"))
      .fkCompanyId;
    const projectId = JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
    const selectBreakdown =
      JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : [];
    let struct = "";
    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    const loginId = JSON.parse(localStorage.getItem("userDetails")).id;

    const response = await api.get(
      `api/v1/observations/?companyId=${currentCompanyId}&projectId=${projectId}&projectStructureIds=${fkProjectStructureIds}&bookmarked_by=${loginId}`
    );
  };

  return (
    <>
      <Tabs>
        <Tab
          icon={<StarsIcon className={classes.buckmarkIcon} />}
          className={classNames(classes.hoverB, classes.minWd55)}
          onClick={handleBookmarkList}
        />
      </Tabs>
    </>
  );
};
//

export default BookmarkList;
