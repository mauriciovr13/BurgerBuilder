import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.module.css';

const DrawerToggle = ({clicked}) => (
  <div className={classes.DrawerToggle} onClick={clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

DrawerToggle.propTypes = {
  clicked: PropTypes.func
}

export default DrawerToggle;