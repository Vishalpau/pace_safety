import { object } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import StarsIcon from '@material-ui/icons/Stars';
import { makeStyles } from '@material-ui/core/styles';

function handleBookmarkList() {
  console.log('BookmarkList');
  // adding bookmarked component in an empty array
}

// displaying the list of bookmarklist using filter and map

const useStyles = makeStyles((theme) => ({
  hoverB: {
    '&:hover': {
      backgroundColor: '#f47607 !important',
      opacity: '0.9',
    },
  },
  minWd55: {
    minWidth: '55px !important',
  },
  hoverB: {
    '&:hover': {
      backgroundColor: '#f47607 !important',
      opacity: '0.9',
    },
  },
  buckmarkIcon: {
    height: '35px',
    width: '35px',
  },
}));

export default function BookmarkList() {
  return (
    <>
      <Tab
        icon={<StarsIcon className={classes.buckmarkIcon} />}
        {...a11yProps(3)}
        className={classNames(classes.hoverB, classes.minWd55)}
      />
    </>
  );
}
