import React, { useEffect, useState } from "react";
import { Button, Grid, Container } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HazardiousActsValidation from "../../Validator/RCAValidation/HazardiousActsValidation"


const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const HazardiousActs = () => {

  const [commonForm, setCommonForm] = useState({
    rcaNumber: "string",
    rcaType: "string",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: parseInt(localStorage.getItem("fkincidentId"))
  })

  // const [supervision, setSuperVision] = useState({
  //   rcaSubType: "",
  //   rcaRemark: [],
  // })

  const [error, setError] = useState({})

  const [form, setForm] = useState({
    supervision: { rcaSubType: "", rcaRemark: [] },
    workpackage: { rcaSubType: "", rcaRemark: [] },
    equipmentMachinery: { rcaSubType: "", rcaRemark: [] },
    behaviourIssue: { rcaSubType: "", rcaRemark: [] },
    safetyIssues: { rcaSubType: "", rcaRemark: [] },
    ergonimics: { rcaSubType: "", rcaRemark: [] },
    procedures: { rcaSubType: "", rcaRemark: [] },
    others: { rcaSubType: "", remarkType: "" }
  }
  )


  const selectValues = ["Option1", "Option2", "...."];

  const classes = useStyles();

  const handelNext = (e) => {
    let supervisionData = { ...commonForm, ...form.supervision }
    // console.log(supervisionData)
    const { error, isValid } = HazardiousActsValidation(form);
    setError(error);
  }

  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Typography variant="h6" gutterBottom>
            Immediate Causes - Hazardous acts
          </Typography>
          <Box marginBottom={4} borderBottom={1}>
            <Typography variant="body2" gutterBottom>
              Incident number: {localStorage.getItem("fkincidentId")}
            </Typography>
          </Box>
          <Grid container spacing={3}>

            <Grid container item md={9} spacing={3}>
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Supervision</FormLabel>

                  <FormGroup>

                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                        // onChange={(e) => setSuperVision({ rcaSubType: "Supervision", rcaRemark: [...supervision.rcaRemark, value] })}
                        onChange={async (e) => setForm({
                          ...form, supervision: {
                            rcaSubType: "Supervision",
                            rcaRemark: await [...form.supervision.rcaRemark, value]
                          }
                        })}
                      />
                    ))}

                  </FormGroup>
                </FormControl>
                {error && error.supervision && (
                  <p>{error.supervision}</p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend"> Work package </FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    {" "}
                    Equiptment & Machinery
                  </FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend"> Behaviour Issue</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend"> Saftey Items</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Ergohomics</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Procedure</FormLabel>
                  <FormGroup>
                    {selectValues.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                {/* <p>others</p> */}
                <TextField
                  className={classes.formControl}
                  id="filled-basic"
                  label="Others"
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item md={12}>
                <Box marginTop={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/details/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/hazardious-condtions/"
                    onClick={(e) => handelNext(e)}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={3}>
              {/* <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Hazardious acts"}
              /> */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default HazardiousActs;
