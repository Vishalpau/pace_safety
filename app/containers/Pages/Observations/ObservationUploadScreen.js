import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import observationsLogoSymbol from 'dan-images/observationsLogoSymbol.png';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import React, { useEffect, useState } from 'react';


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
  const [files, setFiles] = useState([]);
  const classes = useStyles();
  const [fileObjects, setFileObjects] = useState([]);

  const handleChange = (file) => {
    setFiles(file);
  };

  const handleClick = () => {
    console.log(fileObjects);
    const data = new FormData();
    for (let i = 0; i < fileObjects.length; i += 1) {
      data.append('images', fileObjects[i]);
    }
    console.log(data)
  };

  const handleDelete = (deleted) => {
    setFileObjects(fileObjects.filter(f => f !== deleted));
  };

  useEffect(() => {
    // handleClick(acceptedFiles)
  },
    [files]);


  return (
    <CustomPapperBlock title="Observation Upload" icon={observationsLogoSymbol} whiteBg>
      <Grid container spacing={3}>

        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
          <Typography
            variant="h6"
            className="sectionHeading
          "
          >
            <svg
              id="twotone-closed_caption-24px"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                id="Path_5090"
                data-name="Path 5090"
                d="M0,0H24V24H0Z"
                fill="none"
              />
              <path
                id="Path_5091"
                data-name="Path 5091"
                d="M18.5,16H7A4,4,0,0,1,7,8H19.5a2.5,2.5,0,0,1,0,5H9a1,1,0,0,1,0-2h9.5V9.5H9a2.5,2.5,0,0,0,0,5H19.5a4,4,0,0,0,0-8H7a5.5,5.5,0,0,0,0,11H18.5Z"
                fill="#06425c"
              />
            </svg>
            Attachment
          </Typography>
        </Grid>

        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
          <Paper elevation={1} className="paperSection">
            <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
                <Typography className="viewLabelValue">
                  <DropzoneAreaBase
                    fileObjects={fileObjects}
                    onAdd={newFileObjs => {
                      setFileObjects([].concat(fileObjects, newFileObjs));
                    }}
                    onClick={(e) => handleChange(e)}
                    filesLimit={5}
                    maxFileSize={5000000.00}
                    onDelete={handleDelete}
                  />
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
          <Button size="medium" disableElevation onClick={() => handleClick()} variant="contained" color="primary" className="buttonStyle">
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
