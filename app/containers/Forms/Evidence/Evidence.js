import React, { useState, useEffect } from "react";
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
  const classes = useStyles();
  const [form, setForm] = React.useState({
    available: "",
    comment: "",
    document: "",
  });

  // On the next button click function call.
  const handleNext = async () => {
    error, (isValid = EvidenceValidate(form));
    setError(error);

    if (!isValid) {
      return;
    }

    let data = new FormData();
    data.append("evidenceCheck", form.available);
    data.append("evidenceCategory", "string");
    data.append("evidenceRemark", form.comment);
    data.append("evidenceDocument", form.document);
    data.append("status", "Active");
    data.append("updatedBy", "");

    // If update is the case.
    if (id) {
      const res = await api.put(`/api/v1/incidents/91/evidences/92/`, data);
      // If non update case is there.
    } else {
      data.append("createdAt", "");
      data.append("createdBy", "1");
      data.append("updatedAt", "");
      data.append("updatedBy", "");
      data.append("fkIncidentId", "91");
      const res = await api.post(`/api/v1/incidents/91/evidences/92/`, data);
    }

    const res = await api.post(`/api/v1/incidents/91/evidences/`, formData);
    console.log(res);
    const result = res.data.data.results;
    // console.log('sagar');
    await setEvidenceListdata(result);
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No", "N/A"];
  return (
    <PapperBlock title=" Evidences" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Number
            </Typography>

            <Typography varint="body1" className={Type.labelValue}>
              98865686
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Description
            </Typography>
            <Typography className={Type.labelValue}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
              debitis saepe corporis quo inventore similique fugiat voluptatem
              alias et quae temporibus necessitatibus ut, magni ea quisquam vel,
              officiis cupiditate aperiam.
            </Typography>
          </Grid>

          {/* <Grid item md={12}>
            <TableContainer component={Paper}>
              <Table size="small" className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Evidence Type</TableCell>
                    <TableCell>Available</TableCell>
                    <TableCell>Comments</TableCell>
                    <TableCell>Attatchments</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Evidence Type 1</TableCell>
                    <TableCell>
                      <RadioGroup
                        className={classes.inlineRadioGroup}
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
                    </TableCell>
                    <TableCell>
                      <TextField size="small" />
                    </TableCell>
                    <TableCell>Sample</TableCell>
                    <TableCell align="right">
                      <Chip
                        // icon={<InsertDriveFileIcon />}
                        onClick={() => alert("Uploaded")}
                        size="small"
                        color="primary"
                        label="Upload"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid> */}

          <Grid item md={2}>
            <Box marginBottom={2}>
              <Typography variant="body">Evidence Type</Typography>
            </Box>
            <Typography variant="body2">Evidence Type 1</Typography>
          </Grid>

          <Grid item md={3} justify="center">
            <Box marginBottom={2}>
              <Typography variant="body">Available *</Typography>
            </Box>
            <RadioGroup
              className={classes.inlineRadioGroup}
              error={error.available}
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

              // href={
              //   Object.keys(error).length == 0
              //     ? 'http://localhost:3000/app/incident-management/registration/evidence/activity-detail/'
              //     : '#'
              // }
            >
              Next
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateEvidence()}

              // href={
              //   Object.keys(error).length == 0
              //     ? 'http://localhost:3000/app/incident-management/registration/evidence/activity-detail/'
              //     : '#'
              // }
            >
              update
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
    </PapperBlock>
  );
};
export default Evidence;
