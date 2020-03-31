import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute'
import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import {Landing} from '../components/Landing'
import {Signup} from '../components/Signup'
import {HomePage} from '../components/HomePage'
import { HamalVolunteersPage } from '../components/Volunteers';
import CompleteDoctor from '../components/CompleteDoctor'
import {VolunteerHomepage} from '../components/volunteer-homepage/VolunteerHomepage';
import {FindSession} from '../components/FindSession';
import MedicalDashboard from '../components/medical/Dashboard'
import CreateSession from '../components/medical/CreateSession'
import OptionalVolunteers from '../components/medical/OptionalVolunteers'
import Policy from '../components/Policy'
import Login from '../components/Login'
import HamalHome from '../components/HamalHome';

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
        <Route exact path="/newsession" component={CreateSession}/>
        <Route exact path="/optionalvolunteers" component={OptionalVolunteers}/>
        {/* <Route exact path="/optionalvolunteers" component={CreateSession}/> */}

        
        {/* <Route exact path="/hamal" component={VolunteersPage}/> */}
        <Route exact path='/volunteer-homepage' component={VolunteerHomepage} />
        <Route exact path="/hamal-volunteers" component={HamalVolunteersPage}/>
        <Route exact path="/hamal-homepage" component={HamalHome}/>
        <Route exact path='/find-session' component={FindSession} />
        {/* 
        <PrivateRoute exact path="/meeting/:id" component={Meeting} />
        <PrivateRoute exact path="/summary/:id" component={Summary} />
        */}
      </Switch>
      <Footer/>
    </Router>
);

export default AppRouter;
