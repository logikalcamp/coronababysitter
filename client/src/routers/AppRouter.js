import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute'
import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import {Landing} from '../components/Landing'
import {Signup} from '../components/Signup'
import {HomePage} from '../components/HomePage'
import { HamalVolunteersPage } from '../components/HamalVolunteers';
import { HamalDoctorsPage } from '../components/HamalDoctors';
import CompleteDoctor from '../components/CompleteDoctor'
import {VolunteerHomepage} from '../components/volunteer-homepage/VolunteerHomepage';
import {FindSession} from '../components/find-session/FindSession';
import MedicalDashboard from '../components/medical/Dashboard'
import OptionalVolunteers from '../components/medical/OptionalVolunteers'
import Policy from '../components/Policy'
import Login from '../components/Login'
import HamalHome from '../components/HamalHome';

import {Sandbox} from '../components/find-session/Sandbox';

const AppRouter = () =>(
    <Router>
      <Header/>
      <Switch>          
        <Route exact path="/" component={Landing}/>
        <Route exact path='/login' component={Login} />
        <Route exact path="/policy" component={Policy}/>
        <Route exact path="/doctor/:id" component={CompleteDoctor}/>
        <Route exact path="/Registration/:type" component={Signup}/>
        
        
        <Route exact path="/medical" component={MedicalDashboard}/>
        <Route exact path="/optionalvolunteers" component={OptionalVolunteers}/>
        {/* <Route exact path="/optionalvolunteers" component={CreateSession}/> */}

        
        {/* <Route exact path="/hamal" component={VolunteersPage}/> */}
        <Route exact path='/volunteer-homepage' component={VolunteerHomepage} />
        <Route exact path="/hamal/volunteers" component={HamalVolunteersPage}/>
        <Route exact path="/hamal/doctors" component={HamalDoctorsPage}/>
        <Route exact path="/hamal" component={HamalHome}/>
        <Route exact path='/find-session' component={FindSession} />
        <Route exact path='/sandbox' component={Sandbox} />
        
        
        
        {/* <Route exact path="/hamal" component={HamalVolunteersPage}/> */}
        {/* 
        <PrivateRoute exact path="/meeting/:id" component={Meeting} />
        <PrivateRoute exact path="/summary/:id" component={Summary} />
        */}
      </Switch>
      <Footer/>
    </Router>
);

export default AppRouter;
