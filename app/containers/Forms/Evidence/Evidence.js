import React, { useState, useEffect ,useRef } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { PapperBlock } from "dan-components";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FormHelperText } from "@material-ui/core";
import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import EvidenceValidate from "../../Validator/EvidenceValidation";
import { useHistory, useParams } from 'react-router';
import FormHeader from "../FormHeader";
// import FormData from "form-data";
import fs from "fs";
// import Upload from "material-ui-upload/Upload";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
    margin: "1rem 0",
  },
  button: {
    margin: theme.spacing(1),
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
}));
const Evidence = () => {
  // States definations.
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  let [error, setError] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const [evideceData, setEvideceData] = useState ({
  evidenceCheck: "",
  evidenceDocument: "",
  evidenceRemark: "",
  evidenceCategory : ""
  });
  const classes = useStyles();
  const [form, setForm] = React.useState({
    evidenceType: "",
    available: "",
    comment: "",
    document: "",
  });
  const [isLoading , setIsLoading] = React.useState(false)
 
  const fetchEvidenceList = async () => {
    const res = await api.get(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/evidences/${id}/`);
    const result = res.data.data.results;
    await setForm({ ...form, available: result.evidenceCheck})
    await setForm({ ...form, comment : result.evidenceRemark})
    await setForm({ ...form, evidenceType : result.evidenceCategory})
    await setEvideceData(result);
    await setIsLoading(true);
    
  }
  
  useEffect(() => {
      if (id){
        fetchEvidenceList();       
      }
      else{setIsLoading(true);} 
  }, []);
  // On the next button click function call.
  const handleNext = async () => {
    const {error, isValid} = EvidenceValidate(form);
    setError(error);
    
    let data = new FormData();
    data.append("evidenceCheck", form.available);
    data.append("evidenceCategory", form.evidenceType);
    data.append("evidenceRemark", form.comment);
    data.append("evidenceDocument", form.document);
    data.append("status", "Active");
    data.append("updatedBy", "");

    // If update is the case.
    if (id) {
      const res = await api.put(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/evidences/${id}/`, data);
      if (res.status === 200){
        history.push(`/app/incident-management/registration/evidence/activity-detail/${id}`)
      }
      // If non update case is there.
    } else {
      data.append("createdAt", "");
      data.append("createdBy", "1");
      data.append("updatedAt", "");
      data.append("updatedBy", "");
      data.append("fkIncidentId", localStorage.getItem('fkincidentId'));
      
      if (Object.keys(error).length == 0) {
        const res = await api.post(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/evidences/`, data);
      
        if( res.status === 201 ) {
        history.push(
          '/app/incident-management/registration/evidence/activity-detail/'
        );
        }  
      }    
    }
  };

  const radioDecide = ["Yes", "No", "N/A"];
  return (
    <PapperBlock title=" Evidences" icon="ion-md-list-box">
    {isLoading ? 
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
            <Typography variant="body" gutterBottom>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
              debitis saepe corporis quo inventore similique fugiat voluptatem
              alias et quae temporibus necessitatibus ut, magni ea quisquam vel,
              officiis cupiditate aperiam.
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Box marginBottom={2}>
              <Typography variant="body">Evidence Type</Typography>
            </Box>
            <TextField
              id="filled-basic"
              variant="outlined"
              label="Evidence Type"
              error={error.evidenceType}
              helperText={error.evidenceType ? error.evidenceType : ""}
              defaultValue = {form.evidenceType || evideceData.evidenceCategory}
              onChange={(e) => {
                setForm({ ...form, evidenceType : e.target.value });
              }}
            />
          </Grid>

          <Grid item md={3} justify="center">
            <Box marginBottom={2}>
              <Typography variant="body">Available *</Typography>
            </Box>
            <RadioGroup
              className={classes.inlineRadioGroup}
              error={error.available}
              defaultValue = {form.available || evideceData.evidenceCheck}
              onChange={(e) => {
                setForm({ ...form, available: e.target.value });
              }}
            >
              {radioDecide.map((value) => (
                <FormControlLabel
                  value={value}
                  
                  control={<Radio />}
                  label={value}
                />
              ))}
            </RadioGroup>
            {error && error.available && (
              <FormHelperText>{error.available}</FormHelperText>
            )}
          </Grid>
          <Grid item md={4}>
            <Box marginBottom={2}>
              <Typography variant="body">Comments *</Typography>
            </Box>
            <TextField
              id="filled-basic"
              variant="outlined"
              label="Type...."
              error={error.comment}
              helperText={error.comment ? error.comment : ""}
              defaultValue = {form.comment || evideceData.evidenceRemark}
              onChange={(e) => {
                setForm({ ...form, comment: e.target.value });
              }}
            />
          </Grid>
          <Grid item md={3}>
            <p>Attachments</p>
            <Box>
              <input
                type="file"
                name="file"
                onChange={(e) =>
                  setForm({ ...form, document: e.target.files[0] })
                }
              />
            </Box>
            <DeleteForeverIcon />
          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNext()}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={EVIDENCE_FORM}
            selectedItem="Evidence"
          />
        </Grid>
      </Grid>
       : <h1>Loading...</h1>}
    </PapperBlock>
  );
};
export default Evidence;
