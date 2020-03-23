import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute'
import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import {Landing} from '../components/Landing'
import {Signup} from '../components/Signup'

import {VolunteerDashboard} from '../components/VolunteerDashboard';

const AppRouter = () =>(
    <Router>
      <Header/>
      <Switch>          
        <Route exact path="/" component={VolunteerDashboard}/>
        <Route exact path="/signup/:type" component={Signup}/>
        {/* <PrivateRoute exact path="/meeting/:id" component={Meeting} />
        <PrivateRoute exact path="/summary/:id" component={Summary} /> */}
      </Switch>
      <Footer/>
    </Router>
);

export default AppRouter;
