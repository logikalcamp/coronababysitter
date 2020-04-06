import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {BASE_URL} from '../constants';
import axios from "axios";
import {loginUser} from '../actions/auth'


const db = () => {

}

const PrivateRoute = ({ component: Component, auth,dispatch, ...rest }) => {
  var ping = '';
  var cncConnected = JSON.parse(localStorage.getItem('cnc-connected'));

  if(rest.path.startsWith('/cnc') && !cncConnected) {
    var ping = prompt("על מנת להמשיך הזן ססמא");

    if(ping == 'חיבוק')
      localStorage.setItem("cnc-connected",true)
  }

  return (
  <Route
    {...rest}
    
    render={props =>
      ping == 'חיבוק' || cncConnected || auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
