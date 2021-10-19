import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import observationsLogoSymbol from 'dan-images/observationsLogoSymbol.png';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: '1px solid rgba(0, 0, 0, .13)',
    borderRadius: '4px',
  },
  uploadFileBox: {
    padding: '20px',
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
  uploadProgressBox: {
    padding: '5px',
    marginTop: '20px',
  },
  uploadFileDetail: {
    paddingTop: '10px',
    display: 'block',
    fontSize: '16px',
    color: '#06425c',
  },
  msgUploadSection: {
    flexGrow: 'initial',
    minWidth: '288px',
    width: '500px',
    backgroundColor: '#ff8533',
    color: '#ffffff',
    position: 'absolute',
    bottom: '0px',
    left: '0%',
    '& .MuiCardContent-root': {
      paddingBottom: '16px',
    },
  },
}));

function ObservationBulkupload() {
  const [listToggle, setListToggle] = useState(false);
  const history = useHistory();
  const [form, setForm] = useState([])

  const classes = useStyles();


  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (


    <li key={file.path}>

      <LinearProgress variant="determinate" className={classes.uploadProgressBox} color="secondary" value="50" />
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

  const handleClickStyle = () => {
    // let allfiles = []
    // for(i=0; i<form.length; i++){
    //   let data = formData();
    //   data.append(file = form[i].ff)
    //   allfiles.push(data)
    // }
    // console.log(allfiles,"AAAA")
    history.push('/app/observation-bulkupload')
  }

  const handleClick = (files) => {

    let temp = []

    files.map(file => {
      let tt = {}
      tt.ff = file
      temp.push(tt)
    })
    // if(temp.length >0){
    // setForm(temp)

    // }
    // tt.file = e
    // temp.push(tt)
    // console.log(temp)
  }
  useEffect(() => {

    handleClick(acceptedFiles)
  }
    , [files]);



  return (
    <CustomPapperBlock title="Observation Upload" icon={observationsLogoSymbol} whiteBg>
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
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <span align="center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="39.4" height="28.69" viewBox="0 0 39.4 28.69">
                        <g id="upload-outbox-svgrepo-com" transform="translate(0 0)">
                          <g id="Group_4970" data-name="Group 4970" transform="translate(13.004)">
                            <g id="Group_4969" data-name="Group 4969">
                              <path id="Path_3322" data-name="Path 3322" d="M180.343,76.859l-6.73-8.242a.307.307,0,0,0-.236-.113.3.3,0,0,0-.237.111l-6.73,8.244a.293.293,0,0,0,.237.482h2.268V84.35c0,.169.307.321.476.321h7.934c.169,0,.143-.152.143-.321V77.341h2.64a.293.293,0,0,0,.237-.482Z" transform="translate(-166.342 -68.504)" fill="#7890a4" />
                            </g>
                          </g>
                          <g id="Group_4972" data-name="Group 4972" transform="translate(0 12.502)">
                            <g id="Group_4971" data-name="Group 4971">
                              <path id="Path_3323" data-name="Path 3323" d="M38.893,234.386h.038l-5.083-4.954a3.307,3.307,0,0,0-2.263-1.008H26.115a.611.611,0,0,0,0,1.222h5.471a2.253,2.253,0,0,1,1.434.68l3.7,3.6H25.2a.6.6,0,0,0-.611.594,4.579,4.579,0,0,1-9.158,0,.6.6,0,0,0-.611-.6H3.008L6.7,230.33a2.261,2.261,0,0,1,1.439-.684H13.9a.611.611,0,1,0,0-1.222H8.138a3.357,3.357,0,0,0-2.287,1.012L.765,234.31A1.879,1.879,0,0,0,0,235.725v7.025a2,2,0,0,0,1.989,1.862H37.725A1.732,1.732,0,0,0,39.4,242.75v-7.025A1.76,1.76,0,0,0,38.893,234.386Z" transform="translate(0 -228.424)" fill="#7890a4" />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <p className="chooseFileDesign" >Drag and drop here or <span>Choose file</span></p>
                  </div>
                  <aside>
                    {/* <h4>Files</h4> */}
                    <ul>{files}</ul>
                  </aside>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
          <Button size="medium" disableElevation onClick={(e) => handleClickStyle(e)} variant="contained" color="primary" className="buttonStyle">
            Upload
          </Button>
        </Grid>



        <Card className={classes.msgUploadSection}>
          <CardContent>This is a message</CardContent>
        </Card>
      </Grid>
    </CustomPapperBlock>
  );
}

export default ObservationBulkupload;
