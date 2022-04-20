const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  rootGeneral: {
    padding: theme.spacing(3)
  },
  divider: {
    margin: `${theme.spacing(1.5)}px 0`,
    background: 'none'
  },
  sliderWrap: {
    position: 'relative',
    display: 'block',
    boxShadow: theme.shadows[1],
    width: '100%',
    borderRadius: theme.rounded.medium,
    overflow: 'hidden'
  },
  loginTopDetailSection: {
    marginBottom: '30px',
  },
  selectCompTitle: {
    color: '#06425C',
    fontSize: '22px',
    fontFamily: 'Xolonium-Regular',
    lineHeight: '22px',
  },
  companyCardBox: {
    borderRadius: '10px',
    boxShadow: '0px 0px 5px 1px rgb(142 142 142 / 20%), 0px 10px 15px 15px rgb(243 243 243 / 14%), 0px 0px 8px 0px rgb(204 204 204 / 12%)',
    '& a': {
      border: '1px solid #ffffff',
      display: 'inline-block',
      width: '100%',
      float: 'left',
      position: 'relative',
      borderRadius: '10px',
      textDecoration: 'none',
      '&:hover': {
        borderColor: '#F28705',
      },
    },
  },
  companyTag: {
    fontSize: '16px',
    color: '#06425C',
    fontFamily: 'Montserrat-SemiBold !important',
    lineHeight: '21px',
  },
  companyName: {
    color: '#666666',
    fontSize: '16px',
    fontFamily: 'Montserrat-Regular !important',
    lineHeight: '21px',
    '& span': {
      fontFamily: 'Montserrat-Medium',
    },
  },
  noPadding: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    [theme.breakpoints.up('sm')]: {
      padding: '0 !important'
    }
  },
  companyLogo: {
    paddingTop: '24px',
    paddingLeft: '16px',
    paddingRight: '16px'
  },
  companyLogoIcon: {
    height: '4rem'
  },
  pacelogonBox: {
    height: '2.5rem',
    marginBottom: '16px'
  }
});

export default styles;
