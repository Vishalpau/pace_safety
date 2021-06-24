import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import CheckCircle from "@material-ui/icons/CheckCircle";
import AccessTime from "@material-ui/icons/AccessTime";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import api from "../../utils/axios";

// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

// Icons
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import Comment from "@material-ui/icons/Comment";
import History from "@material-ui/icons/History";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";

// Styles
import Styles from "dan-styles/Summary.scss";
import Type from "dan-styles/Typography.scss";
import Fonts from "dan-styles/Fonts.scss";
import moment from "moment";



const LessionLearnSummary = () => {

    const [lessionlearn, setLessionLearn] = useState([]);
    const [fkid , setFkid] = useState(93)

    // // useEffect(() => {
    // //     setFkid(localStorage.getItem("fkincidentId"))
    // //   });
   
    const fetchLessionLearnData = async () => {
        const allIncidents = await api.get(
          `api/v1/incidents/${fkid}/learnings/`
        );
        await setLessionLearn(allIncidents.data.data.results);
      };
     
      

      
    console.log(lessionlearn)
    useEffect(() => {
        fetchLessionLearnData();
        
    
    }, []);

  return (
        <div>
            <PapperBlock>
                <Grid container spacing={5}>
                    <Grid container item md={9} spacing={3}>
                        {lessionlearn.length !== 0 ? 
                            lessionlearn.map((lession,key) => (
                            <Grid container item md={9} spacing={3} key={key}>
                            
                                <Grid lg={6} md={6}>
                                    <Typography
                                    variant="h6"
                                    gutterBottom
                                    className={Fonts.labelName}
                                    >
                                    {" "}
                                    Team Or Department{" "}
                                    </Typography>
                                    <Typography
                                    variant="p"
                                    gutterBottom
                                    className={Fonts.labelName}
                                    >
                                    {" "}
                                    {lession.teamOrDepartment}{" "}
                                    </Typography>
                                </Grid>
                                <Grid lg={6} md={6}>
                                    <Typography
                                    variant="h6"
                                    gutterBottom
                                    className={Fonts.labelName}
                                    >
                                    {" "}
                                    Learnings{" "}
                                    </Typography>
                                    <Typography
                                    variant="p"
                                    gutterBottom
                                    className={Fonts.labelName}
                                    >
                                    {" "}
                                    {lession.learnings}{" "}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )): null}
                    </Grid>
                </Grid>
            </PapperBlock>

        </div>)
    // 
  
};
export default LessionLearnSummary;
