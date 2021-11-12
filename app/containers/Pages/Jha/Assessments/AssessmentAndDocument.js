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
        marginTop: '12px',
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
    const [jobDetails, setJobDetails] = useState({});
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
        const apiDataPerformance = specificPerformance.data.data.results[0].checklistGroups;

        const documentCondition = await api.get(`${baseUrl}/api/v1/core/checklists/jha-document-conditions/${projectId}/`);
        const apiCondition = documentCondition.data.data.results[0].checklistValues;

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

    const handelJobDetails = async () => {
        const jhaId = handelJhaId();
        const res = await api.get(`/api/v1/jhas/${jhaId}/`);
        const apiData = res.data.data.results;
        setJobDetails(apiData);

        setAdditionalJobDetails({
            ...additinalJobDetails,
            humanPerformanceAspects: apiData.humanPerformanceAspects !== null ? apiData.humanPerformanceAspects.split(',') : [],
            workStopCondition: apiData.workStopCondition !== null ? apiData.workStopCondition.split(',') : [],
            additionalRemarks: apiData.additionalRemarks
        });
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
        delete jobDetails.jhaAssessmentAttachment;
        jobDetails.humanPerformanceAspects = additinalJobDetails.humanPerformanceAspects.toString();
        jobDetails.workStopCondition = additinalJobDetails.workStopCondition.toString();
        jobDetails.additionalRemarks = additinalJobDetails.additionalRemarks;
        const resJobDetails = await api.put(`/api/v1/jhas/${localStorage.getItem('fkJHAId')}/ `, jobDetails).catch(() => handelApiError());
        handelNextDocument()
        handelNavigate('next');

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

    const handelCallBack = async () => {
        await setLoading(true);
        await handelCheckList();
        await handelJobDetails();
        await handelActionLink();
        PickListData(78).then((results) => {
            setRisk(results);
        });
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

    const handelJobDetailsDocument = async () => {
        const jhaId = handelJhaId();
        const res = await api.get(`/api/v1/jhas/${jhaId}/`);
        const apiData = res.data.data.results;
        apiData.notifyTo == null ? apiData.notifyTo = '' : apiData.notifyTo = apiData.notifyTo.split(',');
        setFormDocument(apiData);
        handelCommonObject('commonObject', 'jha', 'projectStruct', apiData.fkProjectStructureIds);

        const companyId = JSON.parse(localStorage.getItem('company')).fkCompanyId;
        const { projectId } = JSON.parse(localStorage.getItem('projectName')).projectName;
        const config = {
            method: 'get',
            url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/incident/`,
            headers: HEADER_AUTH,
        };
        const notify = await api(config);
        if (notify.status === 200) {
            console.log(notify.data.data.results);
            const result = notify.data.data.results;
            setNotificationSentValue(result);
        }
    };

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
            data.append('link', formDocument.link);
            data.append('jhaAssessmentAttachment', formDocument.jhaAssessmentAttachment);
            await api.put(`/api/v1/jhas/${localStorage.getItem('fkJHAId')}/ `, data).catch(() => handelApiErrorDocument());
        } else {
            delete formDocument.jhaAssessmentAttachment;
            formDocument.notifyTo = formDocument.notifyTo.toString();
            await api.put(`/api/v1/jhas/${localStorage.getItem('fkJHAId')}/ `, formDocument).catch(() => handelApiErrorDocument());
        }
        history.push(SUMMARY_FORM.Summary);
        localStorage.setItem('Jha Status', JSON.stringify({ assessment: 'done' }));
        setsubmitLoaderDocumentDocument(false);
        setSubmitLoader(false);
    };

    useEffect(() => {
        handelJobDetailsDocument();
    }, []);
    // ---------------------------------------------

    return (
        <PapperBlock title="Assessments" icon="ion-md-list-box">
            {/* {console.log(form.Assessment)} */}
            {loading === false
                ? (
                    <Row>
                        <Col md={9}>
                            <Grid container spacing={3} className={classes.observationNewSection}>
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
                                            >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className={classes.headingColor}
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

                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    className={classes.createHazardbox}
                                    style={{ marginTop: '35px', marginBottom: '10px' }}
                                >
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        className={classes.labelName}
                                    >
                                        {preformace !== {} ? 'Specific human performance aspects that have been discussed  before commencing the work' : null}
                                    </Typography>
                                </Grid>
                                {Object.entries(preformace).map(([key, value]) => (
                                    <Grid item md={12}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">{key}</FormLabel>
                                            <FormGroup>
                                                {value.map((option) => (
                                                    <FormControlLabel
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

                                <Grid item md={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            {
                                                document.length > 0
                                                    ? 'Discuss and document conditions when the work must be stopped'
                                                    : null
                                            }
                                        </FormLabel>
                                        <FormGroup>
                                            {document.map((option) => (
                                                <FormControlLabel
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


                                <Grid
                                    item
                                    md={8}
                                    xs={12}
                                    className={classes.formBox}
                                >
                                    <Typography variant="h6" gutterBottom className={classes.labelName}>
                                        Risk assessment supporting documents
                                    </Typography>

                                    <Grid item xs={12} md={6}>
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
                                        <Typography title={handelFileName(formDocument.jhaAssessmentAttachment)}>
                                            {formDocument.jhaAssessmentAttachment !== ''
                                                && typeof formDocument.jhaAssessmentAttachment === 'string' ? (
                                                <Attachment value={formDocument.jhaAssessmentAttachment} />
                                            ) : (
                                                <p />
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <TextField
                                        label="Link"
                                        name="link"
                                        id="link"
                                        value={formDocument.link != null ? formDocument.link : ''}
                                        fullWidth
                                        variant="outlined"
                                        className={classes.formControl}
                                        onChange={(e) => setFormDocument({
                                            ...formDocument,
                                            link: e.target.value
                                        })}
                                    />
                                </Grid>

                                {notificationSentValue.length > 0
                                    ? (
                                        <Grid item md={12}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Notifications to be sent to</FormLabel>
                                                <FormGroup>
                                                    {notificationSentValue.map((value) => (
                                                        <FormControlLabel
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
                                    )
                                    : null}

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
                                            variant="outlined"
                                            onClick={(e) => handelNext()}
                                            className={classes.custmSubmitBtn}
                                            style={{ marginLeft: '10px' }}
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
                : <p>Loading....</p>
            }
        </PapperBlock>
    );
};

export default AssessmentAndDocument;
