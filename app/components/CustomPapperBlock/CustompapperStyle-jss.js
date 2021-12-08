import { lighten } from '@material-ui/core/styles/colorManipulator';
const styles = (theme) => ({
  // root: theme.mixins.gutters({
  //   //paddingTop: theme.spacing(3),
  //   //paddingBottom: theme.spacing(3),

  //   marginBottom: theme.spacing(3),
  //   //boxShadow: theme.shade.light,
  //   backgroundColor: 'transparent',
  //   color: theme.palette.text.primary,
  //   '&$noMargin': {
  //     margin: 0,
  //   },
  // }),

  root:{
    backgroundColor: 'transparent',
    marginBottom: '20px',
  },

  descBlock: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  titleText: {
    flex: 1,
  },
  title: {
    position: 'relative',
    // textTransform: "capitalize",
    fontSize: '24px!important',
    fontWeight: 400,
    fontFamily: 'Xolonium-Regular!important',
    paddingLeft: '5px',
    color:
      theme.palette.type === 'dark'
        ? theme.palette.primary.main
        : theme.palette.primary.dark,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
  },
  description: {
    maxWidth: 960,
    paddingTop: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  content: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2),
    },
  },
  whiteBg: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
  noMargin: {},
  colorMode: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
    '& $title': {
      color: theme.palette.grey[100],
      '&:after': {
        borderBottom: `5px solid ${theme.palette.primary.light}`,
      },
    },
    '& $description': {
      color: theme.palette.grey[100],
    },
  },
  overflowX: {
    width: '100%',
    overflowX: 'auto',
  },
  iconTitle: {
    //borderRadius: theme.rounded.small,
    // border:
    //   theme.palette.type === 'dark'
    //     ? 'none'
    //     : `1px solid ${lighten(theme.palette.primary.dark, 0.9)}`,
    // boxShadow: `0 2px 15px -5px ${theme.palette.primary.main}`,
    // background:
    //   theme.palette.type === 'dark'
    //     ? theme.palette.primary.main
    //     : lighten(theme.palette.primary.light, 0.5),
    width: 48,
    height: 48,
    textAlign: 'center',
    lineHeight: '46px',
    verticalAlign: 'middle',
    marginRight: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    // '& i': {
    //   fontSize: 28,
    //   verticalAlign: 'baseline',
    //   color:
    //     theme.palette.type === 'dark'
    //       ? theme.palette.common.white
    //       : theme.palette.primary.contrastText,
    // },
  },
});

export default styles;
