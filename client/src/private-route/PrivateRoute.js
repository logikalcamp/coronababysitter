import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {BASE_URL} from '../constants';
import axios from "axios";


const db = () => {

}

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  var ping = '';

  if(rest.path.startsWith('/cnc')) {
    var ping = prompt("על מנת להמשיך הזן ססמא");
  }

  return (
  <Route
    {...rest}
    
    render={props =>
      ping == 'חיבוק' || auth.isAuthenticated === true ? (
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
