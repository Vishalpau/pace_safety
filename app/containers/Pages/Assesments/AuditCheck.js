import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import {
  SSO_URL,
  HEADER_AUTH,
} from '../../../utils/constants';
// import { api } from "../../../utils/axios";
import api from '../../../utils/axios';
import { useHistory } from 'react-router-dom'
import ActionTracker from "../../Forms/ActionTracker";
import { CircularProgress } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '.5rem 0',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
  },
  spacer: {
    padding: '.75rem 0',
  },
  spacerRight: {
    marginRight: '.75rem',
  },
  mToptewnty: {
    marginTop: '.50rem',
  },
  addButton: {
    '& .MuiButton-root': {
      marginTop: '9px',
      backgroundColor: '#ffffff',
      color: '#06425c',
      border: '1px solid #06425c',
      borderRadius: '4px',
      padding: '11px 12px',
    },
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-flex",
  },
  buttonProgress: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  radioInline: {
    flexDirection: 'row',
  },
  mtTen: {
    marginTop: '7px',
  },
  mrTen: {
    marginRight: '15px',
    width: '98%',
  },
  borderCategory: {
    borderLeft: '2px solid #06425c',
  },
  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '35px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#06425c',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '10px',
      cursor: 'pointer',
    },
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: '.5rem 0',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
  },
  spacerRight: {
    marginRight: '.75rem',
  },
  mToptewnty: {
    marginTop: '.75rem',
  },
  radioInline: {
    flexDirection: 'row',
  },
  tableRowColor: {
    backgroundColor: '#ffffff',
  },
  mttopThirty: {
    paddingTop: '30px',
  },
  mttopTen: {
    paddingTop: '20px',
  },
  curserPointer: {
    cursor: 'Pointer',
    textDecoration: 'underline',
  },
  paddZero: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  tableHeading: {
    '& tr th': {
      backgroundColor: '#06425c',
      color: '#ffffff',
      lineHeight: '0.5rem',
    },
  },
  headerBackground: {
    backgroundColor: '#ffffff',
    color: '#06425c',
  },
  pTopandRight: {
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '13px',
  },
  widthFl: {
    width: '250px',
  },
  formControlTwo: {
    width: '100%',
  },
  inputTab: {
    display: 'none',
  },
  widthSelect: {
    width: '150px',
  },
  table: {
    minWidth: 750,
  },
}));


const FlhaDetails = (props) => {
  let history = useHistory();

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [value, setValue] = React.useState('female');
  const [loading, setLoading] = React.useState(false);

  const [step1, setStep1] = React.useState('')
  const [step2, setStep2] = React.useState('')
  const [step3, setStep3] = React.useState('')
  const [step4, setStep4] = React.useState('')
  const [step5, setStep5] = React.useState('')
  const [step6, setStep6] = React.useState('')
  const [step7, setStep7] = React.useState('')
  const [step8, setStep8] = React.useState('')
  const [step9, setStep9] = React.useState('')

  const [remark1, setRemark1] = React.useState('')
  const [remark2, setRemark2] = React.useState('')
  const [remark3, setRemark3] = React.useState('')
  const [remark4, setRemark4] = React.useState('')
  const [remark5, setRemark5] = React.useState('')
  const [remark6, setRemark6] = React.useState('')
  const [remark7, setRemark7] = React.useState('')
  const [remark8, setRemark8] = React.useState('')
  const [remark9, setRemark9] = React.useState('')

  const [auditName, setAuditName] = React.useState('')

  const [isLock, setIsLock] = React.useState(false)

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [showRadioUnplanned, setRadioUnplanned] = React.useState(false);
  const onClick = () => setRadioUnplanned(true);

  const [checked, setChecked] = React.useState(true);

  const [users, setUser] = React.useState([])

  const { fkCompanyId } = JSON.parse(localStorage.getItem('company'));
  const fkProjectId = JSON.parse(localStorage.getItem('projectName'))
    .projectName.projectId;
  const fkUserId = JSON.parse(localStorage.getItem('userDetails')).id;

  const [auditForm, setAuditForm] = React.useState({
    auditor: "",
    auditType: "",
    auditCheck: "",
    auditRemarks: "",
    fkActionNumber: "",
    status: "",
    createdBy: "",
    fkFlhaId: ""
  });

  const auditUserList = () => {
    api.get(`${SSO_URL}/api/v1/companies/` + JSON.parse(localStorage.getItem("company")).fkCompanyId + '/company-users/')
      .then(response => {
        setUser(response.data.data.results.users.map(user => { return { title: user.name } }))
      })
  };

  const handleFlhaSummaryPush = async (id) => {
    history.push(
      "/app/pages/assesments/flhasummary/"+id
      // "/app/pages/flha/FlhaSummary"
    );
  };
  const parts = history.location.pathname.split('/');
  let last_part = parts[parts.length - 1].replace('-', ' ') * 1;

  const AuditCheckSubmit = () => {

    ninetimeCall('Identification information complete', remark1, step1)
    ninetimeCall('Job described accuratly', remark2, step2)
    ninetimeCall('Critical tasks identified', remark3, step3)
    ninetimeCall('Applicable hazards identified', remark4, step4)
    ninetimeCall('Controlled developed for hazards identified', remark5, step5)
    ninetimeCall('All present earnings identified at the job site', remark6, step6)
    ninetimeCall('Energies isolated or controlled', remark7, step7)
    ninetimeCall('Re-assesment of hazards completed after pause and resart', remark8, step8)
    ninetimeCall('Agreement signed', remark9, step9)
   
  }
  

  const ninetimeCall = async (auditType, auditRemarks, auditCheck) => {
    const parts = history.location.pathname.split('/');
    let last_part = parts[parts.length - 1].replace('-', ' ') * 1;

    const formData = new FormData(); // formdata object

    // formData.append('fkCompanyId', JSON.parse(localStorage.getItem('company')).fkCompanyId);
    // formData.append('fkProjectId', JSON.parse(localStorage.getItem('projectName')).projectName.projectId);
    // formData.append('projectName', JSON.parse(localStorage.getItem('projectName')).projectName.projectName);
    formData.append('createdBy', JSON.parse(localStorage.getItem('userDetails')).id);
    formData.append('auditor', auditName);
    formData.append('auditType', auditType);
    formData.append('auditRemarks', auditRemarks);
    formData.append('fkFlhaId', last_part);
    formData.append('auditCheck', auditCheck);
    
    const res = await api.post(`/api/v1/flhas/${last_part}/auditchecks/`, formData);
    await setLoading(true)
    if (auditType=='Agreement signed'){
    history.push(
      "/app/pages/assesments/flhasummary/"+last_part
      // "/app/pages/flha/FlhaSummary"
    );
    }
  }

  const auditData = () => {
    const parts = history.location.pathname.split('/');
    let last_part = parts[parts.length - 1].replace('-', ' ') * 1;
    const res = api.get(`/api/v1/flhas/${last_part}/auditchecks/`)
      .then(response => {

        if (response.data.data.results.length) {
          setStep1(response.data.data.results.filter(data => data.auditType == 'Identification information complete')[0].auditCheck)
          setStep2(response.data.data.results.filter(data => data.auditType == 'Job described accuratly')[0].auditCheck)
          setStep3(response.data.data.results.filter(data => data.auditType == 'Critical tasks identified')[0].auditCheck)
          setStep4(response.data.data.results.filter(data => data.auditType == 'Applicable hazards identified')[0].auditCheck)
          setStep5(response.data.data.results.filter(data => data.auditType == 'Controlled developed for hazards identified')[0].auditCheck)
          setStep6(response.data.data.results.filter(data => data.auditType == 'All present earnings identified at the job site')[0].auditCheck)
          setStep7(response.data.data.results.filter(data => data.auditType == 'Energies isolated or controlled')[0].auditCheck)
          setStep8(response.data.data.results.filter(data => data.auditType == 'Re-assesment of hazards completed after pause and resart')[0].auditCheck)
          setStep9(response.data.data.results.filter(data => data.auditType == 'Agreement signed')[0].auditCheck)

          setRemark1(response.data.data.results.filter(data => data.auditType == 'Identification information complete')[0].auditRemarks)
          setRemark2(response.data.data.results.filter(data => data.auditType == 'Job described accuratly')[0].auditRemarks)
          setRemark3(response.data.data.results.filter(data => data.auditType == 'Critical tasks identified')[0].auditRemarks)
          setRemark4(response.data.data.results.filter(data => data.auditType == 'Applicable hazards identified')[0].auditRemarks)
          setRemark5(response.data.data.results.filter(data => data.auditType == 'Controlled developed for hazards identified')[0].auditRemarks)
          setRemark6(response.data.data.results.filter(data => data.auditType == 'All present earnings identified at the job site')[0].auditRemarks)
          setRemark7(response.data.data.results.filter(data => data.auditType == 'Energies isolated or controlled')[0].auditRemarks)
          setRemark8(response.data.data.results.filter(data => data.auditType == 'Re-assesment of hazards completed after pause and resart')[0].auditRemarks)
          setRemark9(response.data.data.results.filter(data => data.auditType == 'Agreement signed')[0].auditRemarks)

          setAuditName(response.data.data.results.filter(data => data.auditType == 'Identification information complete')[0].auditor)
          setAuditName(response.data.data.results.filter(data => data.auditType == 'Job described accuratly')[0].auditor)
          setAuditName(response.data.data.results.filter(data => data.auditType == 'Critical tasks identified')[0].auditor)
          setAuditName(response.data.data.results.filter(data => data.auditType == 'Applicable hazards identified')[0].auditor)
          setAuditName(response.data.data.results.filter(data => data.auditType == 'Controlled developed for hazards identified')[0].auditor)
          setAuditName(response.data.data.results.filter(data => data.auditType == 'All present earnings identified at the job site')[0].auditor)
          setAuditName(response.data.data.results.filter(data => data.auditType == 'Energies isolated or controlled')[0].auditor)
          setAuditName(response.data.data.results.filter(data => data.auditType == 'Re-assesment of hazards completed after pause and resart')[0].auditor)
          setAuditName(response.data.data.results.filter(data => data.auditType == 'Agreement signed')[0].auditor)
          setIsLock(true)
        }
      })
  };


  React.useEffect(() => {
    auditUserList()
    auditData()
  }, []);

  return (
    <div>
      <PapperBlock title="XFLHA - Audit Check" icon="ion-ios-create-outline" desc="" color="primary">
        <Paper elevation={3}>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <Box padding={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item md={6} sm={6} xs={12}>
                        {auditName == '' ?
                          <Autocomplete
                            id="combo-box-demo"
                            className={classes.mtTen}
                            // value={auditName}
                            options={users}
                            // defaultValue={auditName}
                            getOptionLabel={(option) => option.title}
                            onChange={(e) => setAuditName(e.currentTarget.innerHTML)}
                            renderInput={(params) => <TextField {...params} label="Auditor" variant="outlined" />}
                          />
                          : 'Auditor Name: ' + auditName}

                      </Grid>
                      <Grid item xs={12}>
                        <TableContainer>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHeading}>
                              <TableRow>
                                <TableCell align="left">Check</TableCell>
                                <TableCell align="left">Control and isolation method</TableCell>
                                <TableCell align="left">Yes</TableCell>
                                <TableCell align="left">No</TableCell>
                                <TableCell align="left">Action</TableCell>
                                <TableCell align="left">Needs improvements (Specify)</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">
                                  Identification information complete
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step1 == 'Yes' ? true : false} onClick={() => setStep1('Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step1 == 'No' ? true : false} onClick={() => setStep1('No')} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    onChange={(e) => setRemark1(e.currentTarget.value)}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">2</TableCell>
                                <TableCell align="left">
                                  Job described accuratly
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step2 == 'Yes' ? true : false} onClick={() => setStep2('Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step2 == 'No' ? true : false} onClick={() => setStep2('No')} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon fontSize="medium" /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    onChange={(e) => setRemark2(e.currentTarget.value)}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">3</TableCell>
                                <TableCell align="left">
                                  Critical tasks identified
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step3 == 'Yes' ? true : false} onClick={() => setStep3('Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step3 == 'No' ? true : false} onClick={() => setStep3('No')} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    onChange={(e) => setRemark3(e.currentTarget.value)}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">4</TableCell>
                                <TableCell align="left">
                                  Applicable hazards identified
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step4 == 'Yes' ? true : false} onClick={() => setStep4('Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step4 == 'No' ? true : false} onClick={() => setStep4('No')} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    onChange={(e) => setRemark4(e.currentTarget.value)}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">5</TableCell>
                                <TableCell align="left">
                                  Controlled developed for hazards identified
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step5 == 'Yes' ? true : false} onClick={() => setStep5('Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step5 == 'No' ? true : false} onClick={() => setStep5('No')} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    onChange={(e) => setRemark5(e.currentTarget.value)}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">6</TableCell>
                                <TableCell align="left">
                                  All present earnings identified at the job site
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step6 == 'Yes' ? true : false} onClick={() => setStep6('Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step6 == 'No' ? true : false} onClick={() => setStep6('No')} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    onChange={(e) => setRemark6(e.currentTarget.value)}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">7</TableCell>
                                <TableCell align="left">
                                  Energies isolated or controlled
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step7 == 'Yes' ? true : false} onClick={() => setStep7('Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step7 == 'No' ? true : false} onClick={() => setStep7('No')} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    onChange={(e) => setRemark7(e.currentTarget.value)}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">8</TableCell>
                                <TableCell align="left">
                                  Re-assesment of hazards completed after pause and resart
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step8 == 'Yes' ? true : false} onClick={() => setStep8('Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step8 == 'No' ? true : false} onClick={() => setStep8('No')} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    onChange={(e) => setRemark8(e.currentTarget.value)}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">9</TableCell>
                                <TableCell align="left">
                                  Agreement signed
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step9 == 'Yes' ? true : false} onClick={() => setStep9('Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={step9 == 'No' ? true : false} onClick={() => setStep9('No')} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    value={remark9}
                                    onChange={(e) => setRemark9(e.currentTarget.value)}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Box marginTop={1}>
                          <div className={classes.loadingWrapper}>
                            {isLock ? '' : <Button size="medium" variant="contained" color="primary" className={classes.spacerRight} onClick={() => AuditCheckSubmit()} disabled={loading}>
                              Submit
                            </Button>}
                            {loading && (
                              <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                              />
                            )}
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </PapperBlock>
    </div>
  );
};

export default FlhaDetails;
