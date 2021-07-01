import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { PapperBlock } from "dan-components";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router";
import AdditionalDetailValidate from "../../Validator/AdditionalDetailsValidation";

import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    margin: "1rem 0",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AdditionalDetails = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [error, setError] = React.useState({});

  const { id } = useParams();
  const history = useHistory();
  const [activtyList, setActvityList] = useState([]);

  const [ad22, setAd22] = useState({});
  const [ad23, setAd23] = useState({});
  const [ad24, setAd24] = useState({});
  const [ad25, setAd25] = useState({});
  const [ad26, setAd26] = useState({});

  const handleNext = async () => {
    if (id !== undefined && activtyList.length > 0) {
      history.push(
        "/app/incident-management/registration/evidence/personal-and-ppedetails/"
      );
    } else {
      const selectedQuestion = [ad01, ad02, ad03, ad04, ad05, ad06, ad07];
      console.log(selectedQuestion);
      for (let i = 0; i < selectedQuestion.length; i++) {
        const valdation = selectedQuestion[i];
        console.log(valdation);
        const { isValid, error } = ActivityDetailValidate(valdation);
        setError(error);
        const res = await api.post(
          `api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/activities/`,
          selectedQuestion[i]
        );
        console.log(res);
      }
      history.push(
        "/app/incident-management/registration/evidence/personal-and-ppedetails/"
      );
    }
  };

  const handleUpdateActivityList = async (e, key, fieldname, activityId) => {
    const temp = activtyList;
    console.log(temp);
    const { value } = e.target;
    temp[key][fieldname] = value;
    temp[key].updatedBy = 0;
    temp[key].updatedAt = moment(new Date()).toISOString();
    console.log(temp[key]);

    const res = await api.put(
      `api/v1/incidents/${id}/activities/${activityId}/`,
      temp[key]
    );
    console.log(res);
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const fetchActivityList = async () => {
    const res = await api.get(`api/v1/incidents/${id}/activities/`);
    const result = res.data.data.results;
    await setActvityList(result);
    console.log(result);
  };
  useEffect(() => {
    fetchActivityList();
  }, []);
  return (
    <PapperBlock title="Additional Details" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
            <Box>
              <Typography variant="body2" gutterBottom>
                Incident number: nnnnnnnnnn
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" gutterBottom>
              Incident Description
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
              debitis saepe corporis quo inventore similique fugiat voluptatem
              alias et quae temporibus necessitatibus ut, magni ea quisquam vel,
              officiis cupiditate aperiam.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <FormControl className={classes.formControl}>
              <TextField
                id="filled-basic"
                variant="outlined"
                label="Any Part/Equipment Sent For Anlysis"
                error={error.ans1}
                helperText={error.ans1 ? error.ans1 : ""}
                multiline
                rows="4"
                onChange={(e) => {
                  setAd01({
                    ...ad01,
                    questionCode: "AD-01",
                    question: "Did the Job Require Work Permit ?",
                    answer: e.target.value,
                    activityGroup: "Evidence",
                    status: "Active",
                    updatedBy: 0,
                    createdBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={12}>
            {/* <p>Evidence analysis notes</p> */}

            <FormControl className={classes.formControl}>
              <TextField
                id="filled-basic"
                variant="outlined"
                label="Evidence Analysis Notes"
                error={error.ans2}
                helperText={error.ans2 ? error.ans2 : ""}
                onChange={(e) => {
                  setForm({ ...form, ans2: e.target.value });
                }}
                multiline
                rows="4"
              />
            </FormControl>
          </Grid>

          <Grid item md={12}>
            {/* <p>Evidence summary</p> */}

            <FormControl className={classes.formControl}>
              <TextField
                id="filled-basic"
                variant="outlined"
                label="Evidence Summary"
                error={error.ans3}
                helperText={error.ans3 ? error.ans3 : ""}
                onChange={(e) => {
                  setForm({ ...form, ans3: e.target.value });
                }}
                multiline
                rows="4"
              />
            </FormControl>
          </Grid>

          <Grid item md={12}>
            {/* <p>Additional notes if any</p> */}

            <FormControl className={classes.formControl}>
              <TextField
                id="filled-basic"
                variant="outlined"
                label="Additional Notes If Any"
                error={error.ans4}
                helperText={error.ans4 ? error.ans4 : ""}
                onChange={(e) => {
                  setForm({ ...form, ans4: e.target.value });
                }}
                multiline
                rows="4"
              />
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="/app/incident-management/registration/evidence/personal-and-ppedetails/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handleNext()}
              href={
                Object.keys(error).length == 0
                  ? "http://localhost:3000/app/incident-management/registration/root-cause-analysis/details/"
                  : "#"
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={EVIDENCE_FORM}
            selectedItem="Additional detail"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default AdditionalDetails;
