import React , {useState} from "react";
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

import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import api from "../../../utils/axios";

import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import EvidenceValidate from "../../Validator/EvidenceValidation";
import FormHeader from "../FormHeader";
import { FormHelperText } from "@material-ui/core";

const Evidence = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [evidenceListData, setEvidenceListdata] = useState([]);
  const [fileUploadData, setFileUploadData] = useState([]);
  const [error, setError] = useState({});
  const [detailsOfEnvAffect, setDetailsOfEnvAffect] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [form , setForm] = React.useState({
    available : "",
    comment : "", 
    document : ""
  })

  const handleNext = async () => {
    console.log(form);
    const { error } = EvidenceValidate(form);
    setError(error);
    
  
   
    const formData = {
      
      "evidenceCheck": form.available,
      "evidenceNumber": "string",
      "evidenceCategory": "string",
      "evidenceRemark": "string",
      "createdBy": 0,
      "fkIncidentId": localStorage.getItem("fkincidentId"),
      "evidenceDocument" : form.document
      
      }
    console.log(formData)
    const res = await api.post(`/api/v1/${localStorage.getItem("fkincidentId")}/evidences/`,formData);
    console.log(res)
    const result = res.data.data.results;
    // console.log('sagar');
    await setEvidenceListdata(result);

    
    
         
  };
  // const handleChange =(event)=>{ 
    
  //   setForm({...form, available : event.target.value})
  //   console.log("a",event.target.value)   
  // }

  // const handleNext = () => {
    
  //   // const nextPath =  JSON.parse(localStorage.getItem("nextPath"));
  //   // console.log(nextPath)

    
  // };
  
  const selectValues = [1, 2, 3, 4];
  
  const radioDecide = ["Yes", "No", "N/A"];
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            {/* <Box marginBottom={5}>
              <FormHeader selectedHeader={"Evidence collection"} />
            </Box> */}

            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Evidences
              </Typography>
            </Box>
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
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nobis debitis saepe corporis quo inventore similique fugiat
                    voluptatem alias et quae temporibus necessitatibus ut, magni
                    ea quisquam vel, officiis cupiditate aperiam.
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Box marginBottom={2}>
                    <Typography variant="body">Evidence Type</Typography>
                  </Box>
                  <Typography variant="body2">Evidence Type 1</Typography>
                </Grid>

                <Grid item md={3} justify="center">
                  <Box marginBottom={2}>
                    <Typography variant="body">Available</Typography>
                  </Box>
                  <RadioGroup
                    onChange={(e) => {
                      setForm({...form, available : e.target.value})
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
                  {error && error.available && <h1>{error.available}</h1>}

                </Grid>
                <Grid item md={4}>
                  <Box marginBottom={2}>
                    <Typography variant="body"
                    >Comments</Typography>
                  </Box>

                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    label="Type...."
                    onChange={(e) => {
                      setForm({...form, comment : e.target.value})
                    }}
                  />
                </Grid>
                <Grid item md={3}>
                  <p>Attachments</p>
                  <Box>
                  
                    <input type="file" name="file" onChange={(e)=> {
                      setForm({ ...form,document : e.target.value})
                    }} />

                  </Box>
                  <DeleteForeverIcon />
                </Grid>

                <Grid item md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>handleNext()}
                    href={Object.keys(error).length == 0 ? "http://localhost:3000/app/incident-management/registration/evidence/activity-detail/" : "#"}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                deleteForm={[1,2,3]}
                  listOfItems={EVIDENCE_FORM}
                  selectedItem={"Evidence"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Evidence;
