import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Route, Link } from 'react-router-dom';
import { checkACL } from '../../utils/helper' 

const Acl = (props) => checkACL(props.module, props.action) ? (
  <div>
    {props.html}
  </div>
) : (
  <>
    You do not have access to this page
  </>

);

export default Acl

