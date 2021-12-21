import {
    Button, Grid, TextField, Typography
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import { PapperBlock } from 'dan-components';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router';
import Paper from '@material-ui/core/Paper';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Loader from "../../Loader"
import api from '../../../../utils/axios';
import { handelActionDataAssessment, handelCommonObject, handelFileName } from '../../../../utils/CheckerValue';
import {
    HEADER_AUTH,
    SSO_URL
} from '../../../../utils/constants';
import ActionShow from '../../../Forms/ActionShow';
import ActionTracker from '../../../Forms/ActionTracker';
import FormSideBar from '../../../Forms/FormSideBar';
import { handelJhaId, PickListData } from '../Utils/checkValue';
import { JHA_FORM_COMBINE, SUMMARY_FORM } from '../Utils/constants';
import Attachment from '../../../Attachment/Attachment';
import jhaLogoSymbol from 'dan-images/jhaLogoSymbol.png';




const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    observationNewSection: {

    },
    coponentTitleBox: {
        '& h5': {
            paddingBottom: '20px',
            borderBottom: '1px solid #ccc',
        },
    },
    formControl: {
        margin: '.5rem 0',
        width: '100%',
    },
    labelName: {
        fontSize: '0.88rem',
        fontWeight: '400',
        lineHeight: '1.2',
        color: '#737373',
    },
    labelValue: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#063d55',
    },
    custmSubmitBtn: {
        color: '#ffffff',
        backgroundColor: '#06425c',
        lineHeight: '30px',
        border: 'none',
        marginTop: '0px',
        '&:hover': {
            backgroundColor: '#ff8533',
            border: 'none',
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
    customCheckBoxList: {
        display: 'block',
        '& .MuiFormControlLabel-root': {
            width: '30%',
            [theme.breakpoints.down('xs')]: {
                width: '48%',
            },
        },
    },
    createHazardbox: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important',
        '& button': {
            marginTop: '8px',
        },
    },
    tableSection: {
        '& .MuiToolbar-root': {
            paddingLeft: '15px',
            paddingRight: '15px',
        },
        '& .MuiToolbar-root.MuiToolbar-regular': {
            minHeight: '40px',
            paddingTop: '20px',
        },
        '& h6': {
            fontSize: '18px',
            fontWeight: '400',
            color: '#06425c',
        },
        '& div table': {
            marginTop: '10px',
        },
        '& table thead th': {
            padding: '5px 16px',
        },
    },
    fullWidth: {
        width: '100%',
        margin: '.5rem 0',
        // boxShadow: 'inset 0px 0px 9px #dedede',
        '& td textHeight': {
            padding: '2.5px 5px',
            borderRadius: '8px',
        },
    },
    ratioColorgreen: {
        backgroundColor: 'green',
        padding: '16px!important',
        height: '56px',
        marginTop: '7px',
        borderRadius: '5px',
        color: '#ffffff',
    },
    ratioColorred: {
        backgroundColor: 'red',
        padding: '16px!important',
        height: '56px',
        marginTop: '7px',
        borderRadius: '5px',
        color: '#ffffff',
    },
    ratioColororange: {
        backgroundColor: 'orange',
        padding: '16px!important',
        height: '56px',
        marginTop: '7px',
        borderRadius: '5px',
        color: '#ffffff',
    },
    increaseRowBox: {
        marginTop: '10px',
        color: '#06425c',
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

const AssessmentAndDocument = () => {
    const [form, setForm] = useState([]);
    const history = useHistory();
    const [preformace, setPerformance] = useState({});
    const [document, setDocument] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);
    const [additinalJobDetails, setAdditionalJobDetails] = useState({
        additionalRemarks: '',
        humanPerformanceAspects: [],
        workStopCondition: [],
    });
    const [risk, setRisk] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);
    const [projectData, setProjectData] = useState({
        projectId: '',
        companyId: '',
        createdBy: '',
        projectStructId: ''
    });
    const [actionData, setActionData] = useState([]);

    const handelCheckList = async () => {
        const tempPerformance = {};
        const jhaId = handelJhaId();
        const res = await api.get(`/api/v1/jhas/${jhaId}/jobhazards/`);
        const apiData = res.data.data.results;

        const project = JSON.parse(localStorage.getItem('projectName'));
        const { projectId } = project.projectName;
        const baseUrl = localStorage.getItem('apiBaseUrl');
        const specificPerformance = await api.get(`${baseUrl}/api/v1/core/checklists/jha-human-performance-aspects/${projectId}/`);
        const apiDataPerformance = specificPerformance.data.data.results.length > 0 ?  specificPerformance.data.data.results[0].checklistGroups :[];

        const documentCondition = await api.get(`${baseUrl}/api/v1/core/checklists/jha-document-conditions/${projectId}/`);
        const apiCondition = documentCondition.data.data.results.length > 0 ? documentCondition.data.data.results[0].checklistValues : [];

        apiDataPerformance.map((value) => {
            const checkList = [];
            value.checkListValues.map((checkValue) => {
                const checkObj = {};
                checkObj.inputLabel = checkValue.inputLabel;
                checkObj.inputValue = checkValue.inputValue;
                checkObj.checkListId = checkValue.id;
                checkList.push(checkObj);
                return checkObj;
            });
            tempPerformance[value.checkListGroupName] = checkList;
            return tempPerformance;
        });

        await setPerformance(tempPerformance);
        await setDocument(apiCondition);
        const temp = [];
        apiData.map((value) => {
            temp.push({ id: value.id });
        });
        handelCommonObject('commonObject', 'jha', 'assessmentIds', temp);
        await setForm(apiData);
    };

    const handelActionTracker = async () => {
        const jhaId = localStorage.getItem('fkJHAId');
        const apiData = JSON.parse(localStorage.getItem('commonObject')).jha.assessmentIds;
        const allAction = await handelActionDataAssessment(jhaId, apiData, "all", "jha:hazard");
        setActionData(allAction);
    };
    const handelActionShow = (id) => (
        <Grid>
            {actionData.map((val) => (
                <>
                    {val.id === id
                        ? (
                            <>
                                {
                                    val.action.length > 0 && val.action.map((valueAction) => (
                                        <>
                                            <ActionShow
                                                action={valueAction}
                                                companyId={projectData.companyId}
                                                projectId={projectData.projectId}
                                                updatePage={updatePage}
                                            />
                                        </>
                                    ))
                                }
                            </>
                        )
                        : null}
                </>
            ))}
        </Grid>
    );


    const handelJobDetailsDocument = async () => {
        const jhaId = handelJhaId();
        const res = await api.get(`/api/v1/jhas/${jhaId}/`);
        const apiData = res.data.data.results;
        apiData.notifyTo == null ? apiData.notifyTo = '' : apiData.notifyTo = apiData.notifyTo.split(',');
        setFormDocument(apiData);

        setAdditionalJobDetails({
            ...additinalJobDetails,
            humanPerformanceAspects: apiData.humanPerformanceAspects !== null ? apiData.humanPerformanceAspects.split(',') : [],
            workStopCondition: apiData.workStopCondition !== null ? apiData.workStopCondition.split(',') : [],
            additionalRemarks: apiData.additionalRemarks
        });

        handelCommonObject('commonObject', 'jha', 'projectStruct', apiData.fkProjectStructureIds);

        const companyId = JSON.parse(localStorage.getItem('company')).fkCompanyId;
        const { projectId } = JSON.parse(localStorage.getItem('projectName')).projectName;
        const config = {
            method: 'get',
            url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/jha/?subentity=jha&roleType=custom`,
            headers: HEADER_AUTH,
        };
        const notify = await api(config);
        if (notify.status === 200) {
            const result = notify.data.data.results;
            setNotificationSentValue(result);
        }
    };

    const handelPreformance = (e, value) => {
        if (e.target.checked === false) {
            const newData = additinalJobDetails.humanPerformanceAspects.filter((item) => item !== value);
            setAdditionalJobDetails({
                ...additinalJobDetails,
                humanPerformanceAspects: newData
            });
        } else {
            setAdditionalJobDetails({
                ...additinalJobDetails,
                humanPerformanceAspects: [...additinalJobDetails.humanPerformanceAspects, value]
            });
        }
    };

    const handelWorkDocument = (e, value) => {
        if (e.target.checked === false) {
            const newData = additinalJobDetails.workStopCondition.filter((item) => item !== value);
            setAdditionalJobDetails({
                ...additinalJobDetails,
                workStopCondition: newData
            });
        } else {
            setAdditionalJobDetails({
                ...additinalJobDetails,
                workStopCondition: [...additinalJobDetails.workStopCondition, value]
            });
        }
    };

    const handelNavigate = (navigateType) => {
        if (navigateType === 'next') {
            history.push('/app/pages/jha/jha-summary');
        } else if (navigateType === 'previous') {
            history.push('/app/pages/jha/assessments/Job-hazards');
        }
    };

    const handelRiskAndControl = (changeType, index, value) => {
        const temp = [...form];
        if (changeType === 'risk') {
            temp[index].risk = value;
        } else if (changeType === 'control') {
            temp[index].control = value;
        }
        setForm(temp);
    };

    const handelApiError = () => {
        setSubmitLoader(false);
        history.push('/app/pages/error');
    };

    const handelNext = async () => {
        setSubmitLoader(true);
        const res = await api.put(`/api/v1/jhas/${localStorage.getItem('fkJHAId')}/bulkhazards/`, form).catch(() => handelApiError());
        await handelNextDocument()

    };

    const handelActionLink = () => {
        const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
            ? JSON.parse(localStorage.getItem('userDetails')).id
            : null;

        const projectId = JSON.parse(localStorage.getItem('projectName')) !== null
            ? JSON.parse(localStorage.getItem('projectName')).projectName.projectId
            : null;

        const fkCompanyId = JSON.parse(localStorage.getItem('company')) !== null
            ? JSON.parse(localStorage.getItem('company')).fkCompanyId
            : null;

        setProjectData({
            projectId,
            companyId: fkCompanyId,
            createdBy: userId,
            projectStructId: JSON.parse(localStorage.getItem('commonObject')).jha.projectStruct
        });
    };

    const classes = useStyles();

    let pickListValues = JSON.parse(localStorage.getItem("pickList"))

    const handelCallBack = async () => {
        await setLoading(true);
        await handelCheckList();
        await handelJobDetailsDocument();
        await handelActionLink();
        setRisk(pickListValues["78"])
        await handelActionTracker();
        await setLoading(false);
    };

    useEffect(() => {
        handelCallBack();
    }, []);

    // ---------------------------------------------
    const [formDocument, setFormDocument] = useState({});
    const [notificationSentValue, setNotificationSentValue] = useState([]);
    // const history = useHistory();

    const [open, setOpen] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');
    const [submitLoaderDocument, setsubmitLoaderDocumentDocument] = useState(false);
    const ref = useRef();

    

    const fileTypeError = 'Only pdf, png, jpeg, jpg, xls, xlsx, doc, word, ppt File is allowed!';
    const fielSizeError = 'Size less than 25Mb allowed';
    const handleFile = async (e) => {
        const acceptFileTypes = [
            'pdf',
            'png',
            'jpeg',
            'jpg',
            'xls',
            'xlsx',
            'doc',
            'word',
            'ppt',
        ];
        const file = e.target.files[0].name.split('.');

        if (
            acceptFileTypes.includes(file[file.length - 1])
            && e.target.files[0].size < 25670647
        ) {
            const temp = { ...formDocument };
            const filesAll = e.target.files[0];
            temp.jhaAssessmentAttachment = filesAll;
            await setFormDocument(temp);
        } else {
            ref.current.value = '';
            !acceptFileTypes.includes(file[file.length - 1])
                ? await setMessage(fileTypeError)
                : await setMessage(`${fielSizeError}`);
            await setMessageType('error');
            await setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            // setOpenError(false)
            return;
        }
        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handelNavigateDocument = (navigateType) => {
        if (navigateType === 'next') {
            history.push('/app/pages/jha/jha-summary');
        } else if (navigateType === 'previous') {
            history.push('/app/pages/Jha/assessments/assessment');
        }
    };

    const handelNotifyTo = async (e, value) => {
        if (e.target.checked === false) {
            const newData = formDocument.notifyTo.filter((item) => item !== value);
            setFormDocument({
                ...formDocument,
                notifyTo: newData
            });
        } else {
            setFormDocument({
                ...formDocument,
                notifyTo: [...formDocument.notifyTo, value]
            });
        }
    };

    const handelApiErrorDocument = () => {
        setsubmitLoaderDocumentDocument(false);
        history.push('/app/pages/error');
    };

    const handelNextDocument = async () => {
        setsubmitLoaderDocumentDocument(true);
        if (typeof formDocument.jhaAssessmentAttachment === 'object' && formDocument.jhaAssessmentAttachment != null) {
            const data = new FormData();
            data.append('fkCompanyId', formDocument.fkCompanyId);
            data.append('fkProjectId', formDocument.fkProjectId);
            data.append('location', formDocument.location);
            data.append('jhaAssessmentDate', formDocument.jhaAssessmentDate);
            data.append('permitToPerform', formDocument.permitToPerform);
            data.append('jobTitle', formDocument.jobTitle);
            data.append('description', formDocument.description);
            data.append('classification', formDocument.classification);
            data.append('workHours', formDocument.workHours);
            data.append('notifyTo', formDocument.notifyTo.toString());
            data.append('humanPerformanceAspects', additinalJobDetails.humanPerformanceAspects.toString());
            data.append('additionalRemarks', additinalJobDetails.additionalRemarks);
            data.append('workStopCondition', additinalJobDetails.workStopCondition.toString());
            data.append('link', "");
            data.append('jhaAssessmentAttachment', formDocument.jhaAssessmentAttachment);
            await api.put(`/api/v1/jhas/${localStorage.getItem('fkJHAId')}/ `, data).catch(() => handelApiErrorDocument());
        } else {
            delete formDocument.jhaAssessmentAttachment;
            formDocument["jhaStatus"] = "Open"
            formDocument["jhaStage"] = "Open"
            formDocument['link'] = ""
            formDocument['notifyTo'] = formDocument.notifyTo.toString();
            formDocument['humanPerformanceAspects'] = additinalJobDetails.humanPerformanceAspects.toString();
            formDocument['additionalRemarks'] = additinalJobDetails.additionalRemarks;
            formDocument['workStopCondition'] = additinalJobDetails.workStopCondition.toString();
            console.log(formDocument,">>>>>")
            await api.put(`/api/v1/jhas/${localStorage.getItem('fkJHAId')}/ `, formDocument).catch(() => handelApiErrorDocument());
        }
        history.push(SUMMARY_FORM.Summary);
        localStorage.setItem('Jha Status', JSON.stringify({ assessment: 'done' }));
        setsubmitLoaderDocumentDocument(false);
        setSubmitLoader(false);
    };

    return (
        <CustomPapperBlock title="Assessments" icon={jhaLogoSymbol} whiteBg>
            {/* {console.log(form.Assessment)} */}
            {loading === false
                ? (
                    <Row>
                        <Col md={9}>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                <Typography variant="h6" className="sectionHeading">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28.17" height="28.45" viewBox="0 0 28.17 28.45">
                                        <g id="Group_5478" data-name="Group 5478" transform="translate(-1261.812 -224.131)">
                                            <path id="market-research-analysis" d="M12.4,0A12.413,12.413,0,0,1,22.792,19.211l5.37,5.853-3.7,3.386-5.18-5.708A12.411,12.411,0,1,1,12.4,0Zm7.8,4.613a11.026,11.026,0,1,0,3.24,7.8A11.026,11.026,0,0,0,20.2,4.613Z" transform="translate(1261.82 224.131)" fill="#06425c" />
                                            <g id="attention-signal-and-construction-worker-svgrepo-com" transform="translate(1248.688 216.658)">
                                                <path id="iconos_43_" d="M24.719,21.254h1.615l.308-2.512.09-.718.051-.384H24.271Zm-.167.41h2v2h-2Zm.9-8.624a.425.425,0,0,0-.359.205l-1.615,2.806-.231.4-.231.4L18.748,24.24a.406.406,0,0,0-.051.205.334.334,0,0,0,.051.192.409.409,0,0,0,.359.205H31.819a.4.4,0,0,0,.41-.41.443.443,0,0,0-.09-.256l-6.33-10.931A.409.409,0,0,0,25.45,13.04ZM28.115,24.06h-8.3l4.165-7.2.231-.4.231-.4,1.038-1.781,5.651,9.778Z" fill="#06425c" />
                                            </g>
                                        </g>
                                    </svg> Job hazard analysis
                                </Typography>
                            </Grid>

                            <Grid >
                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                    <Paper elevation={1} className="paperSection">
                                        <Grid container spacing={3}>
                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                            >
                                                <div>
                                                    {form.map((value, index) => (
                                                        <Accordion
                                                            defaultExpanded
                                                            className={classes.backPaper}
                                                            key={index}
                                                            className="backPaperSubAccordianWithMargin"
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1bh-content"
                                                                id="panel1bh-header"
                                                                className="accordionSubHeaderSection"
                                                            >
                                                                <Typography className={classes.heading}>
                                                                    <MenuOpenOutlinedIcon className={classes.headingIcon} />
                                                                    {value.hazard}
                                                                </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Grid container spacing={2}>

                                                                    <Grid item md={5} sm={5} xs={5}>
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            requirement
                                                                            className={classes.formControl}
                                                                        >
                                                                            <InputLabel id="demo-simple-select-label">
                                                                                Risk
                                                                            </InputLabel>
                                                                            <Select
                                                                                labelId="jobstep_label"
                                                                                id="jobstep_label"
                                                                                label="Risk"
                                                                                value={form[index].risk}
                                                                            >
                                                                                {risk.map((value) => (
                                                                                    <MenuItem
                                                                                        value={value.value}
                                                                                        onClick={(e) => handelRiskAndControl('risk', index, value.value)}
                                                                                    >
                                                                                        {value.label}
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>

                                                                    <Grid item md={5} sm={5} xs={5}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            id="controls"
                                                                            multiline
                                                                            rows="1"
                                                                            label="Controls"
                                                                            className={classes.fullWidth}
                                                                            value={form[index].control}
                                                                            onChange={(e) => handelRiskAndControl('control', index, e.target.value)}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item md={2} sm={2} xs={2}>
                                                                        <Grid item xs={12} className={classes.createHazardbox}>
                                                                            <ActionTracker
                                                                                actionContext="jha:hazard"
                                                                                enitityReferenceId={`${localStorage.getItem('fkJHAId')}:${value.id}`}
                                                                                setUpdatePage={setUpdatePage}
                                                                                fkCompanyId={projectData.companyId}
                                                                                fkProjectId={projectData.projectId}
                                                                                fkProjectStructureIds={projectData.projectStructId}
                                                                                createdBy={projectData.createdBy}
                                                                                updatePage={updatePage}
                                                                                handelShowData={handelActionTracker}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} className={classes.createHazardbox}>
                                                                            {handelActionShow(value.id)}
                                                                        </Grid>
                                                                    </Grid>

                                                                </Grid>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    ))}
                                                </div>
                                                {false ?
                                                    <Grid item xs={12} className="formFieldBTNSection paddTRemove marginB15" align="left">
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            startIcon={<AddCircleIcon />}
                                                            className="marginT0"
                                                        >
                                                            New hazard
                                                        </Button>
                                                    </Grid>
                                                    :
                                                    null
                                                }
                                            </Grid>

                                            <Grid item md={12}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend" className="checkRadioLabel" >
                                                        {
                                                            document.length > 0
                                                                ? 'Discuss and document conditions when the work must be stopped'
                                                                : null
                                                        }
                                                    </FormLabel>
                                                    <FormGroup>
                                                        {document.map((option) => (
                                                            <FormControlLabel
                                                                className="selectLabel"
                                                                control={<Checkbox name={option.inputLabel} />}
                                                                label={option.inputLabel}
                                                                checked={additinalJobDetails.workStopCondition.includes(option.inputValue)}
                                                                onChange={async (e) => handelWorkDocument(e, option.inputValue)}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </FormControl>
                                                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
                                            </Grid>

                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                                className={classes.formBox}
                                            >
                                                <TextField
                                                    label="Additional Remarks"
                                                    margin="dense"
                                                    name="additionalremarks"
                                                    id="additionalremarks"
                                                    multiline
                                                    rows={4}
                                                    value={additinalJobDetails.additionalRemarks}
                                                    fullWidth
                                                    variant="outlined"
                                                    className={classes.formControl}
                                                    onChange={(e) => setAdditionalJobDetails({
                                                        ...additinalJobDetails,
                                                        additionalRemarks: e.target.value
                                                    })}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Paper>
                                </Grid>

                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                    <Typography variant="h6" className="sectionHeading">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30.458" height="31.8" viewBox="0 0 30.458 31.8">
                                            <path id="mechanical-engineering" d="M19.778,22.035V21.029l-1.45-.594-3.07,3.34H14.4l-3.07-3.34-1.45.594v8.008H8.744v-7.52L6.581,22.4v6.644H5.443v-6.2l-1.574.643a5.557,5.557,0,0,0-1.958,1.7,4.618,4.618,0,0,0-.778,2.295v1.556H0V27.476H0a.158.158,0,0,1,0-.036,5.705,5.705,0,0,1,.965-2.853,6.7,6.7,0,0,1,2.355-2.059c.026-.016.052-.026.078-.039l7.455-3.047V17.261q-.112-.1-.218-.2A7.432,7.432,0,0,1,8.692,12.2l-.376-.384a.534.534,0,0,1-.187-.4v-.895H9.268V11.2l.386.392a.519.519,0,0,1,.156.34h0A6.522,6.522,0,0,0,11.443,16.3a5.815,5.815,0,0,0,3.35,1.455,5.376,5.376,0,0,0,3.356-1.769,7.137,7.137,0,0,0,1.535-4.058.519.519,0,0,1,.119-.283h0l.347-.428v-.731h1.136v.876a.537.537,0,0,1-.119.376l-.363.449a8.225,8.225,0,0,1-1.789,4.494,5.705,5.705,0,0,1-.459.477v2.189l2.977,1.216a5.964,5.964,0,0,1,2.9-.747h0a6.024,6.024,0,0,1,5.225,9.016v.2h-.1a6.021,6.021,0,1,1-9.781-7Zm7.121.975a.358.358,0,0,0-.519,0l-.4.394a2.762,2.762,0,0,0-.335-.179c-.117-.052-.239-.1-.358-.14v-.628a.363.363,0,0,0-.36-.36h-.778a.368.368,0,0,0-.363.363v.56a2.629,2.629,0,0,0-.368.114,2.728,2.728,0,0,0-.342.158l-.438-.433a.34.34,0,0,0-.259-.109h0a.358.358,0,0,0-.259.109l-.539.537a.363.363,0,0,0,0,.519l.4.4a2.762,2.762,0,0,0-.179.335,3.784,3.784,0,0,0-.14.358h-.6a.358.358,0,0,0-.358.36v.762h0a.36.36,0,0,0,.106.259.342.342,0,0,0,.259.109h.563a3.314,3.314,0,0,0,.265.726l-.433.433a.335.335,0,0,0-.109.244h0a.358.358,0,0,0,.109.259l.537.537a.389.389,0,0,0,.259.1.384.384,0,0,0,.259-.1l.394-.4a2.214,2.214,0,0,0,.337.179,3.008,3.008,0,0,0,.358.14v.609a.358.358,0,0,0,.358.358h.762a.358.358,0,0,0,.358-.358v-.547a3.013,3.013,0,0,0,.368-.112c.122-.047.239-.1.36-.158l.43.433a.332.332,0,0,0,.259.109h0a.342.342,0,0,0,.259-.109L27.3,28.3a.386.386,0,0,0,0-.519l-.4-.394a2.8,2.8,0,0,0,.179-.337q.078-.176.14-.358h.612a.36.36,0,0,0,.259-.106.353.353,0,0,0,.106-.259v-.778h0a.368.368,0,0,0-.36-.363h-.56a3.583,3.583,0,0,0-.114-.358A3.443,3.443,0,0,0,27,24.48l.433-.438a.335.335,0,0,0,.109-.259h0a.363.363,0,0,0-.109-.259l-.537-.537h0Zm-1.066,2.295h0v.018h0a1.556,1.556,0,0,1,.091.519,1.5,1.5,0,0,1-2.069,1.38,1.483,1.483,0,0,1-.778-.744v-.016a1.494,1.494,0,1,1,2.749-1.172ZM12.372,1.6a.5.5,0,0,1-.187-.029c-1.66.742-3,2.37-3.371,5.085a.565.565,0,0,1-.635.472.55.55,0,0,1-.493-.607A7.127,7.127,0,0,1,11.742.553a6.986,6.986,0,0,1,3.21-.547,7.834,7.834,0,0,1,3.14.858,6.657,6.657,0,0,1,3.732,5.7.569.569,0,0,1-1.136.049,5.6,5.6,0,0,0-3.135-4.79l-.226-.112a.57.57,0,0,1-.2.031c-.519,0-.651.908-.682,2.15-.016.555,0,1.167,0,1.792,0,.5.021,1.006.021,1.343a.565.565,0,0,1-1.131,0c0-.55,0-.941-.016-1.325,0-.641-.023-1.263,0-1.839a4.961,4.961,0,0,1,.571-2.637,6.537,6.537,0,0,0-1-.135,6.2,6.2,0,0,0-1.26.054,5.37,5.37,0,0,1,.534,2.617c.013.594,0,1.242,0,1.906,0,.4-.016.8-.016,1.359a.55.55,0,1,1-1.1,0c0-.35,0-.866.018-1.377,0-.651.026-1.3,0-1.859-.029-1.273-.166-2.215-.692-2.2ZM11.99,18.036v1.455l2.852,3.094,2.593-2.816V17.995a7.147,7.147,0,0,1-2.521.848.578.578,0,0,1-.189,0,8.482,8.482,0,0,1-2.718-.809ZM7.743,7.254a2.126,2.126,0,0,0,.825.835,12.111,12.111,0,0,0,5.778,1.177A15.571,15.571,0,0,0,20.527,8.18,3,3,0,0,0,21.8,7.2l.975.56a4.043,4.043,0,0,1-1.745,1.4,16.7,16.7,0,0,1-6.688,1.2A13.1,13.1,0,0,1,7.948,9a3.2,3.2,0,0,1-1.24-1.3l1.037-.451Zm6.288,17.634h1.38v1.328h-1.38Zm0,2.725h1.38v1.328h-1.38V27.61Z" transform="translate(0.004 0.009)" fill="#06425c" />
                                        </svg>
                                        {preformace !== {} ? 'Specific human performance aspects that have been discussed before commencing the work' : null}

                                    </Typography>
                                </Grid>

                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                    <Paper elevation={1} className="paperSection">
                                        <Grid container spacing={3}>
                                            {Object.entries(preformace).map(([key, value]) => (
                                                <Grid item md={12}>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">{key}</FormLabel>
                                                        <FormGroup>
                                                            {value.map((option) => (
                                                                <FormControlLabel
                                                                    className="selectLabel"
                                                                    control={<Checkbox name={option.inputLabel} />}
                                                                    label={option.inputLabel}
                                                                    checked={additinalJobDetails.humanPerformanceAspects.includes(option.inputValue)}
                                                                    onChange={async (e) => handelPreformance(e, option.inputValue)}
                                                                />
                                                            ))}
                                                        </FormGroup>
                                                    </FormControl>
                                                    <Box borderTop={1} marginTop={2} borderColor="grey.300" />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Paper>
                                </Grid>

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
                                            {/* --------------- */}
                                            <Typography className="viewLabelValue">
                                                <div >
                                                    <input
                                                        id="selectFile"
                                                        type="file"
                                                        className={classes.fullWidth}
                                                        name="file"
                                                        ref={ref}
                                                        accept=".pdf, .png, .jpeg, .jpg,.xls,.xlsx, .doc, .word, .ppt"
                                                        // style={{
                                                        //   color:
                                                        //     typeof form.attachments === "string" && "transparent",
                                                        // }}
                                                        onChange={(e) => {
                                                            handleFile(e);
                                                        }}
                                                    />
                                                    <span align="center">
                                                        {formDocument.jhaAssessmentAttachment !== ''
                                                            && typeof formDocument.jhaAssessmentAttachment === 'string' ? (
                                                            <Attachment value={formDocument.jhaAssessmentAttachment} />
                                                        ) : (
                                                            <p />
                                                        )}
                                                    </span>
                                                </div>

                                            </Typography>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {notificationSentValue.length > 0
                                    ?
                                    <>
                                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                            <Typography variant="h6" className="sectionHeading">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22.84" height="27.004" viewBox="0 0 22.84 27.004">
                                                    <g id="Group_5468" data-name="Group 5468" transform="translate(-818 -215)">
                                                        <path id="lookup" d="M4.459,9.383a.634.634,0,0,1-.6-.653.623.623,0,0,1,.6-.653H14.68a.63.63,0,0,1,.6.653.62.62,0,0,1-.6.653Zm.007,3.493a.632.632,0,0,1-.6-.653.62.62,0,0,1,.6-.648H9.578a.634.634,0,0,1,.609.657.62.62,0,0,1-.6.653ZM19.16,3.968H21.3a1.537,1.537,0,0,1,1.53,1.53v7.276c-.046.479-1.22.486-1.32,0V5.5a.213.213,0,0,0-.218-.218H19.153v7.494c-.113.435-1.093.5-1.313,0V1.53a.213.213,0,0,0-.218-.218H1.523a.21.21,0,0,0-.218.218V19.72a.21.21,0,0,0,.218.218h8.515a.678.678,0,0,1,0,1.313H4.977v2.438a.213.213,0,0,0,.218.218h4.843c.479.053.634,1.144,0,1.313H5.2a1.533,1.533,0,0,1-1.53-1.53V21.25H1.53a1.5,1.5,0,0,1-1.079-.463A1.519,1.519,0,0,1,0,19.72V1.53A1.5,1.5,0,0,1,.463.463,1.516,1.516,0,0,1,1.53,0h16.1a1.507,1.507,0,0,1,1.079.463,1.514,1.514,0,0,1,.449,1.079V3.968ZM4.459,5.88a.634.634,0,0,1-.6-.653.623.623,0,0,1,.6-.653H14.68a.632.632,0,0,1,.6.653.623.623,0,0,1-.6.653Z" transform="translate(818 215)" fill="#06425c" />
                                                        <path id="Path_5192" data-name="Path 5192" d="M13.485,11.646V8.259a4.128,4.128,0,0,0-3.049-4.282V3.516a1.016,1.016,0,0,0-2.032,0v.461A4.116,4.116,0,0,0,5.355,8.259v3.387L4,13v.677H14.84V13Zm-3.387,0H8.742V10.291H10.1Zm0-2.71H8.742V6.226H10.1ZM9.42,15.711a1.359,1.359,0,0,0,1.355-1.355H8.065A1.355,1.355,0,0,0,9.42,15.711Z" transform="translate(826 226.293)" fill="#06425c" />
                                                    </g>
                                                </svg>  Notification
                                            </Typography>
                                        </Grid>

                                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                            <Paper elevation={1} className="paperSection">
                                                <Grid container spacing={3}>
                                                    <Grid item md={12}>
                                                        <FormControl component="fieldset">
                                                            <FormLabel className="checkRadioLabel" component="legend">Notifications to be sent to</FormLabel>
                                                            <FormGroup>
                                                                {notificationSentValue.map((value) => (
                                                                    <FormControlLabel
                                                                        className="selectLabel"
                                                                        control={<Checkbox name={value.roleName} />}
                                                                        label={value.roleName}
                                                                        checked={formDocument.notifyTo && formDocument.notifyTo !== null && formDocument.notifyTo.includes(value.id.toString())}
                                                                        onChange={async (e) => handelNotifyTo(e, value.id.toString())}
                                                                    />
                                                                ))}
                                                            </FormGroup>
                                                        </FormControl>
                                                        <Box borderTop={1} marginTop={2} borderColor="grey.300" />
                                                    </Grid>

                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    </>
                                    :
                                    null
                                }

                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <Button
                                        variant="outlined"
                                        size="medium"
                                        className={classes.custmSubmitBtn}
                                        onClick={(e) => handelNavigate('previous')}
                                    >
                                        Previous
                                    </Button>
                                    <div className={classes.loadingWrapper}>

                                        <Button
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            className="spacerRight buttonStyle"
                                            onClick={(e) => handelNext()}
                                            disabled={submitLoader}
                                        >

                                            Next
                                        </Button>
                                        {submitLoader && (
                                            <CircularProgress
                                                size={24}
                                                className={classes.buttonProgress}
                                            />
                                        )}</div>

                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="secondary"
                                        className="buttonStyle custmCancelBtn"
                                        onClick={(e) => history.push("/app/pages/jha/jha-summary")}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>

                        </Col>
                        <Col md={3}>
                            <FormSideBar
                                deleteForm="hideArray"
                                listOfItems={JHA_FORM_COMBINE}
                                selectedItem="Job hazard analysis"
                            />
                        </Col>
                    </Row>
                )
                : <Loader/>
            }
        </CustomPapperBlock>
    );
};

export default AssessmentAndDocument;
