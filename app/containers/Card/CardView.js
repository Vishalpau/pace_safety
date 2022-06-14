import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Incidents from 'dan-styles/IncidentsList.scss';
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';
import preplanning from 'dan-images/preplanning.png';
import { makeStyles } from '@material-ui/core/styles';
import completed_small from 'dan-images/completed-small.png';
import classNames from 'classnames';
import moment from 'moment';
import in_progress_small from 'dan-images/in_progress_small.png';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(4),
        borderRadius: '4px',
    },
    leftSide: {
        flexGrow: 1,
    },
    viewImageSection: {
        textAlign: 'center',
        '& MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-1': {
            textAlign: 'center',
            minHeight: '100px',
        },
    },
    rightSide: {
        flexGrow: 8,
        textAlign: 'right',
    },
    mb10: { marginBottom: '10px !important' },
    newIncidentButton: {
        backgroundColor: theme.palette.primary.dark,
    },
    search: {
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(1),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    filterIcon: {
        color: theme.palette.primary.dark,
        fontSize: '1.8rem',
    },
    toggleTitle: {
        marginRight: theme.spacing(1),
        fontSize: '1rem',
    },
    chipAction: {
        textAlign: 'right',
    },
    dataAction: {
        marginRight: theme.spacing(1),
    },
    actionMargin: {
        marginLeft: '2.5rem',
        lineHeight: '6rem'
    },
    marginLeft: {
        marginLeft: '2px',
        fontSize: '14px'
    },
    mLeft: {
        marginLeft: '2px',
    },
    mLeftR5: {
        marginLeft: '5px',
        marginRight: '15px',
        ['@media (max-width:480px)']: {
            marginLeft: '3px',
            marginRight: '3px',
        },
    },
    pLeft5: {
        paddingLeft: '5px',
    },
    mLeftfont: {
        marginLeft: '2px',
        fontSize: '14px',
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87) !important',
        fontWeight: '500',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    spacerRight: {
        marginRight: '4px',
    },
    paddZero: {
        padding: '0px',
    },
    listingLabelName: {
        color: '#7692a4',
        fontSize: '0.88rem',
        fontFamily: 'Montserrat-Regular',
    },
    statusCompleted: {
        color: '#024c9a',
        fontSize: '0.88rem',
        fontFamily: 'Montserrat-Regular',
        '& a': {
            paddingLeft: '5px',
            cursor: 'pointer',
            color: 'rgba(0, 0, 0, 0.87)',
            fontWeight: '600',
        },
    },
    listingLabelValue: {
        color: '#333333',
        fontSize: '0.88rem',
        fontFamily: 'Montserrat-Regular',
        '& a': {
            paddingLeft: '5px',
            cursor: 'pointer',
            color: 'rgba(0, 0, 0, 0.87)',
            fontWeight: '600',
        },
    },
    textPrimary: {
        color: '#06425c',
    },
    dataTableNew: {
        minWidth: '1360px !important',
    },

    title: {
        fontSize: '1.25rem',
        fontFamily: 'Montserrat-Regular',
        color: 'rgba(0, 0, 0, 0.87)',
        fontWeight: '500',
        lineHeight: '1.6',
    },
    pt30: {
        paddingTop: '30px',

    },

    mTopThirtybtten: {
        marginTop: '0rem',
        float: 'right',
    },

    TableToolbar: {
        display: 'none',
    },
    pLTen: {
        marginLeft: '5px',
    },
    mTtop15: {
        marginTop: '15px',
    },
    mTtop20: {
        marginTop: '20px',
    },
    mTtop30: {
        marginTop: '30px',
    },
    marginTopBottom: {
        marginBottom: '16px',
        borderRadius: '8px',
        ['@media (max-width:800px)']: {
            paddingTop: '55px',
        },
    },
    searchHeaderTop: {
        border: '1px solid #f1f1f1',
        backgroundColor: '#ffffff',
        padding: '0px 16px',
        borderRadius: '5px',
        marginTop: '20px',
    },
    greyBg: {
        backgroundColor: '#f3f3f3',
    },
    AppBarHeader: {
        color: 'inherit',
        backgroundColor: '#f7f7f7',
        border: '1px solid #e4e4e4',
        padding: '0px 16px 0px 10px',
        borderRadius: '8px',
    },
    buttonsNewChild: {
        borderRadius: '5px',
        backgroundColor: '#23343e',
        color: '#ffffff',
    },
    padd10: {
        padding: '10px 10px 10px 10px',
    },
    sepHeightTen: {
        borderLeft: '3px solid #cccccc',
        height: '8px',
        verticalAlign: 'middle',
        margin: '15px 15px 15px 8px',
        fontSize: '10px',
        ['@media (max-width:480px)']: {
            margin: '10px 5px 10px 5px',
        },
    },
    floatR: {
        float: 'right',
        textTransform: 'capitalize',
        ['@media (max-width:480px)']: {
            float: 'left',
        },
    },
    newIncidentButton: {
        marginTop: '20px',
        marginLeft: '5px',
    },
    Chip: {
        backgroundColor: '#eaeaea',
        borderRadius: ' 50px',
        paddingRight: '12px',
    },
    sepHeightOne: {
        borderLeft: '3px solid #cccccc',
        height: '8px',
        verticalAlign: 'middle',
        margin: '15px',
        fontSize: '10px',
    },
    mright5: {
        marginRight: '5px',
        color: '#a7a7a7',
    },
    iconColor: {
        color: '#a7a7a7',
    },
    iconteal: {
        color: '#06425c',
    },
    listHeadColor: { backgroundColor: '#fafafa', },
    marginTopBottom: {
        '& .MuiTypography-h6 .MuiTypography-h5': {
            fontFamily: 'Montserrat-Regular',
        },
    },
    textRight: {
        textAlign: 'right',
        ['@media (max-width:480px)']: {
            textAlign: 'left',
            padding: '0px 8px 15px 8px !important',
        },
    },
    userImage: {
        borderRadius: '50px',
        width: '50px',
        height: '50px',
        marginRight: '10px',
    },
    mrFifteen: {
        marginRight: '15px',
    },
    card: {
        boxShadow: '0px 0px 2px #ccc',
        borderRadius: '10px',
        marginBottom: '30px',
    },

    cardLinkAction: {
        width: '100%',
        float: 'left',
        padding: '14px',
        cursor: 'pointer',
        textDecoration: 'none !important',
        ['@media (max-width:800px)']: {
            paddingTop: '85px',
        }
    },
    userPictureBox: {
        position: 'absolute',
        right: '0px',
        ['@media (max-width:800px)']: {
            right: 'auto',
        },
    },
    cardContentSection: {
        position: 'relative',
        '&:hover': {
            backgroundColor: '#f0f0f0',
            webkitBoxShadow: '0 1px 5px 2px #f0f0f0',
            boxShadow: '0 1px 5px 2px #f0f0f0',
        },
        '&:hover .MuiGrid-align-items-xs-flex-start': {
            backgroundColor: '#f0f0f0',
        },
    },
    cardBottomSection: {
        '& p': {
            ['@media (max-width:480px)']: {
                fontSize: '12px !important',
            },
        },
        // '& p': {
        //   ['@media (max-width:375px)']: { 
        //     fontSize: '12px !important',
        //   },
        // },
    },
    formControlOwnership: {
        width: '100%',
        marginBottom: '30px',
    },
    cardActionBottomBox: {
        ['@media (max-width:480px)']: {
            padding: '8px !important',
        },
    },

    fullWidth: {
        width: '100%',
        margin: '.5rem 0',
    },
    usrProfileListBox: {
        '& ul': {
            paddingTop: '0px',
            '& li': {
                paddingLeft: '0px',
                paddingTop: '0px',
                paddingBottom: '0px',
                '& div': {
                    '& span': {
                        display: 'inline-block',
                        float: 'left',
                        paddingRight: '14px',
                        fontSize: '15px',
                        fontWeight: '600',
                    },
                    '& p': {
                        display: 'inline-block',
                        float: 'left',
                        fontSize: '15px',
                    },
                },
            },
        },
    },

    viewAttachmentDialog: {
        '& .MuiDialogContent-root': {
            overflowY: 'hidden !important',
            height: '90px !important',

        },
    },
    imageSectionHeight: {
        '& .MuiDialogContent-root': {
            height: '90px !important',
            minHeight: '90px !important',
        },
    },
    viewattch1: {
        padding: '12px 30px',
        backgroundColor: '#8a9299',
        color: '#fff',
        borderRadius: '2px',
        border: '1px solid #fff',
        display: 'inline',
    },
    viewattch2: {
        padding: '12px 8px',
        backgroundColor: '#06425c',
        color: '#fff',
        borderRadius: '2px',
        border: '1px solid #fff',
        display: 'inline',
    },
    plusIcon: {
        fontSize: '32px',
        marginRight: '10px',
        color: '#06425c',
    },
    minusIcon: {
        fontSize: '32px',
        color: '#06425c',
    },
    popUpButton: {
        paddingRight: "5px",
        marginLeft: "12px",
        '& .MuiDialogActions-root, img': {
            justifyContent: 'flex-start',
        },
    },
    pagination: {
        padding: "0px 0px 20px 0px",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: '-10px',
    },
}));


const CardView = (props) => {

    const classes = useStyles();

    const handleSummaryPush = () => {
        props.handleSummaryPush(props.itemIndex);
    }

    const handleMyUserPClickOpen = () => {
        props.handleMyUserPClickOpen(true);
    }

    const handleDelete = () => {
        props.handleDelete(props.data)
    }

    const returnAhaCard = () => {
        return (
            <>
                <Card variant="outlined" className={classes.card}>
                    <CardContent>
                        <Grid container spacing={3} className={classes.cardContentSection}>
                            <Grid item md={2} sm={4} xs={12}
                                className={classes.userPictureBox}
                            >
                                <Button className={classes.floatR}
                                    onClick={() => handleMyUserPClickOpen()}
                                >
                                    <img src={props.data[1].avatar !== null ? props.data[1].avatar : paceLogoSymbol} className={classes.userImage} /> {props.data[1].username}
                                </Button>
                            </Grid>
                            <Link
                                onClick={() => handleSummaryPush()}
                                className={classes.cardLinkAction}
                            >
                                <Grid item xs={12}>
                                    <Grid container spacing={3} alignItems="flex-start">
                                        <Grid item sm={12} xs={12} className={classes.listHeadColor}>
                                            <Grid container spacing={3} alignItems="flex-start">
                                                <Grid item md={10} sm={12} xs={12}>
                                                    <Typography
                                                        className={classes.title}
                                                        variant="h6"
                                                    >
                                                        {props.data[1]["description"]}
                                                    </Typography>
                                                    <Typography
                                                        display="inline"
                                                        className={classes.listingLabelName}
                                                    >
                                                        Number: <span><Link
                                                            onClick={() => handleSummaryPush()}
                                                            variant="h6"
                                                            className={classes.mLeftfont}
                                                        >
                                                            <span className={classes.listingLabelValue}>{props.data[1]["ahaNumber"]}</span>
                                                        </Link></span>
                                                    </Typography>
                                                    <span item xs={1} className={classes.sepHeightOne}></span>
                                                    <Typography
                                                        variant="body1"
                                                        gutterBottom
                                                        display="inline"
                                                        color="textPrimary"
                                                        className={classes.listingLabelName}
                                                    >
                                                        Category: <span className={classes.listingLabelValue}>AHA</span>
                                                    </Typography>
                                                    <span item xs={1} className={classes.sepHeightOne}></span>
                                                    <Typography
                                                        variant="body1"
                                                        gutterBottom
                                                        display="inline"
                                                        color="textPrimary"
                                                        className={classes.listingLabelName}
                                                    >
                                                        Stage: <span className={classes.listingLabelValue}>{props.data[1].ahaStage} <img src={props.data[1].ahaStage === "Open" ? preplanning : completed_small} className={classes.smallImage} /></span>
                                                        <span item xs={1} className={classes.sepHeightOne}></span>
                                                        Status: <span className={classes.listingLabelValue}>{props.data[1].ahaStatus} <img src={props.data[1].ahaStatus === "Open" ? preplanning : completed_small} className={classes.smallImage} /></span>
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={12} xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item md={3} sm={6} xs={12}>
                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                                color="textPrimary"
                                                className={classes.listingLabelName}
                                            >
                                                Work area:
                                            </Typography>

                                            <Typography
                                                gutterBottom
                                                className={classes.listingLabelValue}
                                            >
                                                {/* {props.data[1]["incidentReportedByName"]} */}
                                                {props.data[1].workArea}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3} sm={6} xs={12}>
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                                gutterBottom
                                                className={classes.listingLabelName}
                                            >
                                                Location:
                                            </Typography>
                                            <Typography

                                                className={classes.listingLabelValue}
                                            >
                                                {props.data[1].location}
                                            </Typography>
                                        </Grid>

                                        <Grid item md={3} sm={6} xs={12}>
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                                gutterBottom
                                                className={classes.listingLabelName}
                                            >
                                                Created on:
                                            </Typography>

                                            <Typography
                                                className={classes.listingLabelValue}
                                            >
                                                {moment(props.data[1]["createdAt"]).format(
                                                    "Do MMMM YYYY, h:mm:ss a"
                                                )}
                                            </Typography>
                                        </Grid>

                                        <Grid item md={3} sm={6} xs={12}>
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                                gutterBottom
                                                className={classes.listingLabelName}
                                            >
                                                Created by:
                                            </Typography>

                                            <Typography

                                                className={classes.listingLabelValue}
                                            >
                                                {props.data[1]["createdByName"]}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* <Grid item sm={2} xs={12}>
                      <Typography
                        variant="h6"
                        color="textPrimary"
                      >
                        <img src={qrcode} />
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                        29 Dec 2020
                      </Typography>
                    </Grid> */}
                            </Link>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions className={Incidents.cardActions}>
                        <Grid
                            container
                            spacing={2}
                            justify="flex-end"
                            alignItems="left"
                        >
                            <Grid item xs={12} md={5} sm={12} className={classes.pt15}>
                                <Typography
                                    variant="body1"
                                    display="inline"
                                    color="textPrimary"

                                >
                                    <AttachmentIcon className={classes.mright5} />
                                    Attachments: {" "}
                                </Typography>
                                <Typography variant="body2" display="inline">
                                    {/* <Link href="#" color="secondary" className={classes.mLeftR5}> */}
                                    {
                                        props.data[1].files !== null ? (
                                            <>
                                                {props.data[1].files.length}
                                            </>
                                        ) : (
                                            0
                                        )
                                    }
                                    {/* </Link> */}
                                </Typography>
                                {/* <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography
                        variant="body1"
                        display="inline"
                        color="textPrimary"
                        className={classes.mLeft}
                      >
                        <InsertCommentOutlinedIcon className={classes.mright5} />
                        Comments:
                      </Typography>
                      <Typography variant="body2" display="inline" className={classes.mLeft}>
                        <Link href="#" color="secondary" className={classes.mLeft}>{props.data[1].commentsCount}</Link>
                      </Typography> */}
                            </Grid>

                            <Grid item xs={12} md={7} sm={12} className={classes.textRight}>
                                <div className={classes.floatR}>
                                    {/* <Typography variant="body1" display="inline">
                      <WifiTetheringIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Network view</Link>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body1" display="inline">
                        <PrintOutlinedIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Print</Link>
                      </Typography> */}
                                    {/* <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body1" display="inline">
                      <Share className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Share</Link>
                      </Typography> */}
                                    {/* <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body1" display="inline">
                      <Link href="#" className={classes.mLeftR5}><StarsIcon className={classes.iconteal} /></Link>
                      </Typography> */}
                                    <span item xs={1} className={classes.sepHeightTen}></span>
                                    <Typography variant="body1" display="inline">

                                        {!props.checkDeletePermission
                                            ? (
                                                <DeleteForeverOutlinedIcon
                                                    className={classes.iconteal}
                                                    style={{
                                                        color: '#c0c0c0',
                                                        cursor: 'not-allowed'
                                                    }}
                                                />
                                            )
                                            : (
                                                <Link
                                                    href="javascript:void(0)"
                                                    className={classes.mLeftR5}
                                                >
                                                    <DeleteForeverOutlinedIcon
                                                        className={classes.iconteal}
                                                    // onClick={() => handleDelete()}
                                                    />
                                                </Link>
                                            )}
                                        {/* <Link href="#" className={classes.mLeftR5}>
                          <DeleteForeverOutlinedIcon className={classes.iconteal} onClick={(e) => handleDelete(item)} />
                        </Link> */}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </>
        )

    }

    const returnJhaCard = () => {
        return (
            <>
                <Card variant="outlined" className={classes.card}>
                    <CardContent>
                        <Grid container spacing={3} className={classes.cardContentSection}>
                            <Grid item md={2} sm={4} xs={12}
                                className={classes.userPictureBox}
                            >
                                <Button className={classNames(classes.floatR)}
                                    onClick={() => handleMyUserPClickOpen()}
                                >
                                    <img src={props.data[1]["avatar"]} className={classes.userImage} /> {props.data[1]["username"]}
                                </Button>
                            </Grid>
                            <Link
                                onClick={() => handleSummaryPush()}
                                className={classes.cardLinkAction}
                            >

                                <Grid item xs={12}>
                                    <Grid container spacing={3} alignItems="flex-start">
                                        <Grid item sm={12} xs={12} className={classes.listHeadColor}>
                                            <Grid container spacing={3} alignItems="flex-start">
                                                <Grid item md={10} sm={12} xs={12} className={classes.pr0}>
                                                    <Typography
                                                        className={classes.title}
                                                        variant="h6"
                                                    >
                                                        {props.data[1]["description"]}
                                                    </Typography>
                                                    <Typography
                                                        display="inline"
                                                        className={classes.listingLabelName}
                                                    >
                                                        Number: <span>
                                                            <Link
                                                                onClick={() => handleSummaryPush()}
                                                                variant="h6"
                                                                className={classes.mLeftfont}
                                                            >
                                                                <span className={classes.listingLabelValue}>{props.data[1]["jhaNumber"]}</span>
                                                            </Link></span>
                                                    </Typography>
                                                    <span item xs={1} className={classes.sepHeightOne}></span>
                                                    <Typography
                                                        variant="body1"
                                                        gutterBottom
                                                        display="inline"
                                                        color="textPrimary"
                                                        className={classes.listingLabelName}
                                                    >
                                                        Category: <span className={classes.listingLabelValue}>{props.data[1]["jhaNumber"].split("-")[0]}</span>
                                                    </Typography>
                                                    <span item xs={1} className={classes.sepHeightOne}></span>
                                                    <Typography
                                                        variant="body1"
                                                        gutterBottom
                                                        display="inline"
                                                        color="textPrimary"
                                                        className={classes.listingLabelName}
                                                    >
                                                        Stage: <span className={classes.listingLabelValue}>{props.data[1]["jhaStage"]}<img src={in_progress_small} className={classes.smallImage} /></span>
                                                        <span item xs={1} className={classes.sepHeightOne}></span>
                                                        Status: <span className="listingLabelValue statusColor_complete">{props.data[1]["jhaStatus"]}</span>
                                                    </Typography>

                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item sm={12} xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item md={3} sm={6} xs={12}>
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                                gutterBottom
                                                className={classes.listingLabelName}
                                            >
                                                Location:
                                            </Typography>
                                            <Typography

                                                className={classes.listingLabelValue}
                                            >
                                                {props.data[1]["location"]}
                                            </Typography>
                                        </Grid>

                                        <Grid item md={3} sm={6} xs={12}>
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                                gutterBottom
                                                className={classes.listingLabelName}
                                            >
                                                Created on:
                                            </Typography>

                                            <Typography

                                                className={classes.listingLabelValue}
                                            >
                                                {props.data[1]["jhaAssessmentDate"]}
                                            </Typography>
                                        </Grid>

                                        <Grid item md={3} sm={6} xs={12}>
                                            <Typography
                                                variant="body1"
                                                color="textPrimary"
                                                gutterBottom
                                                className={classes.listingLabelName}
                                            >
                                                Created by:
                                            </Typography>

                                            <Typography

                                                className={classes.listingLabelValue}
                                            >
                                                {props.data[1]["createdByName"]}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Link>

                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions className={Incidents.cardActions}>
                        <Grid
                            container
                            spacing={2}
                            justify="flex-end"
                            alignItems="left"
                        >
                            <Grid item xs={12} md={5} sm={12} className={classes.pt15}>
                                <Typography
                                    variant="body1"
                                    display="inline"
                                    color="textPrimary"

                                >
                                    <AttachmentIcon className={classes.mright5} />
                                    Attachments: {" "}
                                </Typography>
                                <Typography variant="body2" display="inline">
                                    <span>
                                        <Link href="#"
                                            // onClick={handleVisibility}
                                            color="secondary"
                                            aria-haspopup="true"
                                            className={classes.mLeft}>
                                            {
                                                props.data[1].files !== null ? (
                                                    <>
                                                        {props.data[1].files.length}
                                                    </>
                                                ) : (
                                                    0
                                                )
                                            }
                                        </Link>
                                    </span>
                                </Typography>
                                <span item xs={1} className={classes.sepHeightTen}></span>
                                {/* <Typography
                        variant="body1"
                        display="inline"
                        color="textPrimary"
                        className={classes.mLeft}
                      >
                        <InsertCommentOutlinedIcon className={classes.mright5} />
                        <Link href="#"
                          onClick={handleVisibilityComments}
                          aria-haspopup="true">
                          Comments:
                        </Link>

                      </Typography>
                      <Typography variant="body2" display="inline" className={classes.mLeft}>
                        <span>
                          <Link href="#"
                            color="secondary"
                            aria-haspopup="true"
                            className={classes.mLeft}>
                            {props.data[1]["commentsCount"]}
                          </Link>
                        </span>
                      </Typography> */}
                            </Grid>

                            <Grid item xs={12} md={7} sm={12} className={classes.textRight}>
                                <div className={classes.floatR}>
                                    {/* <Typography variant="body1" display="inline">
                      <WifiTetheringIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Network View</Link>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span> */}
                                    {/* <Typography variant="body1" display="inline">
                          <PrintOutlinedIcon className={classes.iconColor} /> <Link href="/app/pages/general-observation-prints" className={classes.mLeftR5}>Print</Link>
                        </Typography>
                        <span item xs={1} className={classes.sepHeightTen}></span>
                        <Typography variant="body1" display="inline"><Link href="#" className={classes.mLeftR5}><StarsIcon className={classes.iconteal} /></Link>
                        </Typography> */}
                                    <span item xs={1} className={classes.sepHeightTen}></span>
                                    <Typography variant="body1" display="inline">
                                        {!props.checkDeletePermission
                                            ? (
                                                <DeleteForeverOutlinedIcon
                                                    className={classes.iconteal}
                                                    style={{
                                                        color: '#c0c0c0',
                                                        cursor: 'not-allowed'
                                                    }}
                                                />
                                            )
                                            : (
                                                <Link
                                                    href="javascript:void(0)"
                                                    className={classes.mLeftR5}
                                                >
                                                    <DeleteForeverOutlinedIcon
                                                        className={classes.iconteal}
                                                    // onClick={(e) => handleDelete(value)}
                                                    />
                                                </Link>
                                            )}
                                        {/* <Link href="#" className={classes.mLeftR5}><DeleteForeverOutlinedIcon className={classes.iconteal} onClick={(e) => handleDelete(value)} /></Link> */}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </>
        )

    }

    console.log(props.data[1]);

    const returnCard = () => {
        if (('ahaNumber' in props.data[1])) {
            return (
                returnAhaCard()
            )
        } else if (('jhaNumber' in props.data[1])) {
            return (
                returnJhaCard()
            )
        }
    }

    return (
        <>
            {returnCard()}
        </>
    )
}

export default CardView