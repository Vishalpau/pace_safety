import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router';
import { useDropzone } from 'react-dropzone';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import appapi from "../../../utils/axios";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: '0.063rem solid rgba(0, 0, 0, .13)',
    borderRadius: '4px',
  },
  uploadFileBox: {
    padding: '1.25rem',
    '& input': {
      display: 'none',
    },
    '& span': {
      borderRadius: '5px',
    },
  },
  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2.188rem',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#06425c',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '0.625rem',
      cursor: 'pointer',
    },
  },
  uploadProgressBox: {
    padding: '0.313rem',
    marginTop: '1.25rem',
  },
  uploadFileDetail: {
    paddingTop: '0.625rem',
    display: 'block',
    fontSize: '1rem',
    color: '#06425c',
  },
  msgUploadSection: {
    flexGrow: 'initial',
    minWidth: '288px',
    width: '500px',
    backgroundColor: '#ff8533',
    color: '#ffffff',
    position: 'absolute',
    bottom: '0rem',
    left: '0%',
    '& .MuiCardContent-root': {
      paddingBottom: '1rem',
    },
  },
  buttonProgress: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-flex",
  },
}));

function ObservationBulkupload() {
  const [listToggle, setListToggle] = useState(false);
  const [loading, setLoading] = useState(false)

  const history = useHistory();
  const classes = useStyles();
  const projectId =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;
  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const [uploadFrom, setUploadForm] = useState({
    fkProjectId: projectId,
    entityContext: 'Observation',
    processer: 'OCR',
    filename: ''
  })
  const [fileError, setFileError] = useState("");
  const [messageShow, setMessageShow] = useState('')
  const [uploadBtn, setUploadBtn] = useState(false)
  const handleUpload = (e) => {
    let fileNameExt = e.currentTarget.files[0].name.split(".").pop();
    if (fileNameExt == "pdf") {
      let temp = {...uploadFrom}
      temp.filename = e.currentTarget.files[0];
      setUploadForm(temp)
      setFileError("")
      setUploadBtn(true)
    } else {
      setUploadBtn(false)
      setFileError("Please choose .pdf file")
    }
  }

  const handlsubmit = () => {
    setMessageShow('We are processing file please wait until is loading...')
    let data = new FormData();
    data.append("fkProjectId", uploadFrom.fkProjectId),
    data.append("entityContext", uploadFrom.entityContext),
    data.append("processer", uploadFrom.processer)
    data.append("filename", uploadFrom.filename)
    setLoading(true)
    const res = appapi.post(`/api/v1/core/modifiedrevisedocrform/?fkCompanyId=${fkCompanyId}`, data).then((res) =>
      history.push('/app/icare-bulkupload')
    ).catch((error) => console.log(error))
  }

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (

    <li key={file.path}>
      <LinearProgress variant="determinate" className={classes.uploadProgressBox} color="secondary" value="10" />
      <span className={classes.uploadFileDetail}>
        {file.path}
        {' '}
        -
        {file.size}
        {' '}
        bytes
      </span>
    </li>
  ));

  useEffect(() => {

  }, []);

  return (
    <CustomPapperBlock title="iCare Upload" icon='customDropdownPageIcon iCarePageIcon' whiteBg>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
          <Typography variant="h6" className="sectionHeading">
            <svg id="twotone-closed_caption-24px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path id="Path_5090" data-name="Path 5090" d="M0,0H24V24H0Z" fill="none" />
              <path id="Path_5091" data-name="Path 5091" d="M18.5,16H7A4,4,0,0,1,7,8H19.5a2.5,2.5,0,0,1,0,5H9a1,1,0,0,1,0-2h9.5V9.5H9a2.5,2.5,0,0,0,0,5H19.5a4,4,0,0,0,0-8H7a5.5,5.5,0,0,0,0,11H18.5Z" fill="#06425c" />
            </svg>  Attachment
          </Typography>
        </Grid>
        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
          <Paper elevation={1} className="paperSection">
            <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
                <Typography className="viewLabelValue">
                  <input
                    type="file"
                    id="attachment"
                    accept=".pdf"
                    onChange={(e) => {
                      handleUpload(e);
                    }} />
                </Typography>
                {messageShow}
              </Grid>
              <div style={{ color: "red" }}>{fileError}</div>

            </Grid>
          </Paper>
        </Grid>

        <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
          <div className={classes.loadingWrapper}>
            <Button size="medium"  onClick={(e) => handlsubmit(e)} variant="contained" color="primary" className="buttonStyle" disabled={loading || !uploadBtn}>
              Upload
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                className={classes.buttonProgress}
              />
            )}
          </div>

        </Grid>

        {/* <Card className={classes.msgUploadSection}>
          <CardContent>{messageShow}</CardContent>
        </Card> */}
      </Grid>
    </CustomPapperBlock>
  );
}

export default ObservationBulkupload;
