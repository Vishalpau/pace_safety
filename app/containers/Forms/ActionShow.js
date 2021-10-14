import { Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { SSO_URL } from "../../utils/constants"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';




const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
    button: {
        margin: theme.spacing(1),
    },
    dialogCloseButton: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
    },
    actionLink: {
        fontSize: "14px",
        lineHeight: "1.7",
        marginTop: "10px"
    },
    actionLinkListSection: {
        paddingBottom: '0px',
        '& li': {
            padding: '0px',
            '& a': {
                margin: '0px',
            },
        },
    },
    actionLinkList: {
        marginTop: '0px',
        '& span': {
            fontFamily: 'Montserrat-Medium !important',
            color: '#7692a4 !important',
        },
    },
}));


const ActionShow = (props) => {
    // console.log(props)
    const classes = useStyles();
    let updatPage = props.updatePage !== undefined ? props.updatePage : ""

    const link = () => {
        return (
            <Link
                className={classes.actionLink}
                display="block"
                href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=${JSON.parse(localStorage.getItem("BaseUrl"))["actionClientID"]}&response_type=code&companyId=${props.companyId
                    }&projectId=${props.projectId
                    }&targetPage=/action/details/&targetId=${props.action.id
                    }`}
                target="_blank"
            >
                {props.action.number}
            </Link>
        )
    }
    console.log(props.index)
    useEffect(() => { }, [updatPage]);

    return (
        <Grid container spacing={3}>

            <Grid item md={6} sm={6} xs={12} className={classes.actionLinkListSection} >
                {props.title !== undefined ?
                    <>
                        <ListItem>
                            <ListItemText className={classes.actionLinkList} primary={props.title} secondary={link()} />
                        </ListItem>
                        {/* <Grid item md={6}>
                                    <Typography>
                                        {props.title}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    {link()}
                                </Grid> */}
                    </>
                    :
                    <>
                        {link()}
                    </>
                }
            </Grid>




        </Grid>
    )
}

export default ActionShow;
