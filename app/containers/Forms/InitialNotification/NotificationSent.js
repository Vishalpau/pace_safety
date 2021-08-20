import React, { useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";


import FormControlLabel from "@material-ui/core/FormControlLabel";


import { makeStyles } from "@material-ui/core/styles";

import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";

import axios from "axios";

import FormSideBar from "../FormSideBar";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";



const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
  customLabel: {
    marginBottom: 0,
  },
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const NotificationSent = () => {
 
  const [notificationSentValue, setNotificationSentValue] = useState([]);

  const [notifyToList, setNotifyToList] = useState([]);




  // handle notify to
  const handelNotifyTo = async (e, index) => {
    if (e.target.checked === true) {
      let temp = [...notifyToList];
      let users = notificationSentValue[index].users;
      for (var i = 0; i < users.length; i++) {
        let id = users[i].id;
        temp = temp.concat(id);
      }
      let uniq = [...new Set(temp)];
      setNotifyToList(uniq);
    } else {
      let temp = [...notifyToList];
      let data = [];
      let users = notificationSentValue[index].users;
      for (var i = 0; i < users.length; i++) {
        let id = users[i].id;
        let newData = temp.filter((item) => item !== id);

        data = newData;
      }
      setNotifyToList(data);
    }
    setNotifyToList(data)
   }  
  
  



  // fetch value noticefication sent
  const fetchNotificationSent = async () => {
    try {
      let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
      let projectId = JSON.parse(localStorage.getItem("projectName"))
        .projectName.projectId;
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/incident/?subentity=incident`,
        headers: HEADER_AUTH,
      };
      const res = await api(config);
      if (res.status === 200) {
        const result = res.data.data.results;
        setNotificationSentValue(result);
      }
    } catch (error) {}
  };



  useEffect(() => {  
    fetchNotificationSent();
  }, []);

  const classes = useStyles();
  return (<>
        <Grid item xs={12}>
                <FormControl
                  error={error && error.notifyTo}
                  required
                  component="fieldset"
                >
                  <FormLabel component="legend">
                    Notification to be sent?
                  </FormLabel>
                  <FormGroup>
                    {notificationSentValue.map((value, index) => (
                      <FormControlLabel
                        id={index}
                        key={index}
                        value={value.roleName}
                        control={<Checkbox />}
                        label={value.roleName}
                        onChange={(e) => {
                          handelNotifyTo(e, index);
                        }}
                      />
                    ))}
                  </FormGroup>
                  {error && error.notifyTo && (
                    <FormHelperText>{error.notifyTo}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              </>
    );
};

export default NotificationSent;
