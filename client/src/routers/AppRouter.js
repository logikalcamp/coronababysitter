import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute'
import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import {Landing} from '../components/Landing'
import {Signup} from '../components/Signup'
import {HomePage} from '../components/HomePage'
import { VolunteersPage } from '../components/Volunteers';
import {VolunteerHomepage} from '../components/volunteer-homepage/VolunteerHomepage';

import Policy from '../components/Policy'
const AppRouter = () =>(
    <Router>
      <Header/>
      <Switch>          
        <Route exact path="/" component={Landing}/>
        <Route exact path="/policy" component={Policy}/>
        <Route exact path="/signup/:type" component={Signup}/>
        <Route exact path="/homepage" component={HomePage}/>
        <Route exact path="/hamal" component={VolunteersPage}/>
        <Route exact path='/volunteer-homepage' component={VolunteerHomepage} />
        {/* 
        <PrivateRoute exact path="/meeting/:id" component={Meeting} />
        <PrivateRoute exact path="/summary/:id" component={Summary} />
        */}
      </Switch>
      <Footer/>
    </Router>
);

export default AppRouter;
