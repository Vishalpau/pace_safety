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
  const [msg, setMsg] = useState([])

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
    let fileNameExt = e.currentTarget.files[0];
    if (fileNameExt) {
      let temp = { ...uploadFrom }
      temp.filename = e.currentTarget.files[0];
      setUploadForm(temp)
      setFileError("")
      setUploadBtn(true)
    } else {
      setUploadBtn(false)
      setFileError("Please choose a file")
    }
  }

  const handlsubmit = async () => {
    setMessageShow('Please wait while we import your data.')
    let data = new FormData();
    data.append("fkProjectId", uploadFrom.fkProjectId),
      data.append("entityContext", uploadFrom.entityContext),
      data.append("processer", uploadFrom.processer)
    data.append("filename", uploadFrom.filename)
    setLoading(true)
    let res = await appapi.post(`/api/v1/core/uploadmultipleocrform/?fkCompanyId=${fkCompanyId}`, data)
      .then(function (res) {
        setLoading(false)
        // return res
        if (res.data.data.results.includes("uploaded already")) {
          setMsg(" File is already exist. Try with new file")
          setMessageShow('')
        } else {
           history.push('/app/icare-bulkupload')
        }

      }
      )
      .catch(function (error) { console.log(error) })
    //   if( res.data.data.results.includes("uploaded already")  ){
    //   setMsg(" File is already present in database")
    // }else {
      // history.push('/app/icare-bulkupload')
    // }
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
    <CustomPapperBlock title="iCare Uploads" icon='customDropdownPageIcon iCarePageIcon' whiteBg>
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
                  {/* <input
                    type="file"
                    id="attachment"
                    accept=".pdf"
                    onChange={(e) => {
                      handleUpload(e);
                    }} /> */}
                  <div {...getRootProps({ className: 'dropzone' })}>

                    {/* <span align="center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="39.4" height="28.69" viewBox="0 0 39.4 28.69">
                              <g id="upload-outbox-svgrepo-com" transform="translate(0 0)">
                                <g id="Group_4970" data-name="Group 4970" transform="translate(13.004)">
                                  <g id="Group_4969" data-name="Group 4969">
                                    <path id="Path_3322" data-name="Path 3322" d="M180.343,76.859l-6.73-8.242a.307.307,0,0,0-.236-.113.3.3,0,0,0-.237.111l-6.73,8.244a.293.293,0,0,0,.237.482h2.268V84.35c0,.169.307.321.476.321h7.934c.169,0,.143-.152.143-.321V77.341h2.64a.293.293,0,0,0,.237-.482Z" transform="translate(-166.342 -68.504)" fill="#7890a4"/>
                                  </g>
                                </g>
                                <g id="Group_4972" data-name="Group 4972" transform="translate(0 12.502)">
                                  <g id="Group_4971" data-name="Group 4971">
                                    <path id="Path_3323" data-name="Path 3323" d="M38.893,234.386h.038l-5.083-4.954a3.307,3.307,0,0,0-2.263-1.008H26.115a.611.611,0,0,0,0,1.222h5.471a2.253,2.253,0,0,1,1.434.68l3.7,3.6H25.2a.6.6,0,0,0-.611.594,4.579,4.579,0,0,1-9.158,0,.6.6,0,0,0-.611-.6H3.008L6.7,230.33a2.261,2.261,0,0,1,1.439-.684H13.9a.611.611,0,1,0,0-1.222H8.138a3.357,3.357,0,0,0-2.287,1.012L.765,234.31A1.879,1.879,0,0,0,0,235.725v7.025a2,2,0,0,0,1.989,1.862H37.725A1.732,1.732,0,0,0,39.4,242.75v-7.025A1.76,1.76,0,0,0,38.893,234.386Z" transform="translate(0 -228.424)" fill="#7890a4"/>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </span> */}
                    <p className="attachmentCenter">
                      <span>
                        <input
                          type="file"
                          id="attachment"
                          accept=".png, .jpg , .xls , .xlsx , .ppt , .pptx, .doc, .docx, .text , .pdf ,  .mp4, .mov, .flv, .avi, .mkv"
                          onChange={(e) => {
                            handleUpload(e);
                          }} />
                      </span>
                    </p>
                  </div>
                  <p className='marginT10'>{messageShow}</p>
                  <aside>
                    {/* <h4>Files</h4> */}
                    <ul>{files}</ul>
                  </aside>
                </Typography>
              </Grid>

              <div style={{ color: "red" }}>{fileError}</div>
            </Grid>

          </Paper>
        </Grid>

        <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
          <div className={classes.loadingWrapper}>
            <Button size="medium" onClick={(e) => handlsubmit(e)} variant="contained" color="primary" className="buttonStyle" disabled={loading || !uploadBtn}>
              Uploads
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                className={classes.buttonProgress}
              />
            )}
          </div>

          <div style={{ color: "red" }}>{msg}</div>
        </Grid>

        {/* <Card className={classes.msgUploadSection}>
          <CardContent>{messageShow}</CardContent>
        </Card> */}
      </Grid>
    </CustomPapperBlock>
  );
}

export default ObservationBulkupload;
