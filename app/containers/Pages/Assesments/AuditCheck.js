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

  const [step1, setStep1] = React.useState('No')
  const [step2, setStep2] = React.useState('No')
  const [step3, setStep3] = React.useState('No')
  const [step4, setStep4] = React.useState('No')
  const [step5, setStep5] = React.useState('No')
  const [step6, setStep6] = React.useState('No')
  const [step7, setStep7] = React.useState('No')
  const [step8, setStep8] = React.useState('No')
  const [step9, setStep9] = React.useState('No')

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
  const parts = history.location.pathname.split('/');
    let last_part = parts[parts.length - 1].replace('-', ' ') * 1;

  const ninetimeCall = (auditType, auditRemarks, auditCheck) => {
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

    const res = api.post(`/api/v1/flhas/${last_part}/auditchecks/`, formData);
    setAuditForm({auditor: "",
    auditType: "",
    auditCheck: "",
    auditRemarks: "",
    fkActionNumber: "",
    })

  }

  const auditData = () => {
    const parts = history.location.pathname.split('/');
    let last_part = parts[parts.length - 1].replace('-', ' ') * 1;
    const res = api.get(`/api/v1/flhas/${last_part}/auditchecks/`)
      .then(response => {
        console.log(response.data.data.results, 'data')
        setStep1(response.data.data.results)
        setStep2(response.data.data.results)
        setStep3(response.data.data.results)
        setStep4(response.data.data.results)
        setStep5(response.data.data.results)
        setStep6(response.data.data.results)
        setStep7(response.data.data.results)
        setStep8(response.data.data.results)
        setStep9(response.data.data.results)

        setRemark1(response.data.data.results)
        setRemark2(response.data.data.results)
        setRemark3(response.data.data.results)
        setRemark4(response.data.data.results)
        setRemark5(response.data.data.results)
        setRemark6(response.data.data.results)
        setRemark7(response.data.data.results)
        setRemark8(response.data.data.results)
        setRemark9(response.data.data.results)

        setAuditName(response.data.data.results)
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
                        <Autocomplete
                          id="combo-box-demo"
                          className={classes.mtTen}
                          options={users}
                          getOptionLabel={(option) => option.title}
                          onChange={(e) => setAuditName(e.currentTarget.innerHTML)}
                          renderInput={(params) => <TextField {...params} label="Auditor" variant="outlined" />}
                        />
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
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={auditForm.auditCheck} onClick={() => setStep1(step1 == 'Yes' ? 'No' : 'Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
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
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={auditForm.auditCheck} onClick={() => setStep2(step2 == 'Yes' ? 'No' : 'Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
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
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={auditForm.auditCheck} onClick={() => setStep3(step3 == 'Yes' ? 'No' : 'Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
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
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={auditForm.auditCheck} onClick={() => setStep4(step4 == 'Yes' ? 'No' : 'Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
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
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={auditForm.auditCheck} onClick={() => setStep5(step5 == 'Yes' ? 'No' : 'Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
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
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={auditForm.auditCheck} onClick={() => setStep6(step6 == 'Yes' ? 'No' : 'Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
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
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={auditForm.auditCheck} onClick={() => setStep7(step7 == 'Yes' ? 'No' : 'Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
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
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={auditForm.auditCheck} onClick={() => setStep8(step8 == 'Yes' ? 'No' : 'Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
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
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={auditForm.auditCheck} onClick={() => setStep9(step9 == 'Yes' ? 'No' : 'Yes')} />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                </TableCell>
                                <TableCell align="left"><OfflineBoltIcon /></TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
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
                          <Button size="medium" variant="contained" color="primary" className={classes.spacerRight} onClick={() => AuditCheckSubmit()}>
                            Submit
                          </Button>
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
