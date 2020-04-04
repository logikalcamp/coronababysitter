import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute'
import Header from '../components/Header'
import {Footer} from '../components/Footer'
import Landing from '../components/Landing'
import {Signup} from '../components/Signup'
import {HomePage} from '../components/HomePage'
import { HamalVolunteersPage } from '../components/HamalVolunteers';
import { HamalDoctorsPage } from '../components/HamalDoctors';
import CompleteDoctor from '../components/CompleteDoctor'
import VolunteerHomepage from '../components/volunteer-homepage/VolunteerHomepage';
import FindSession from '../components/find-session/FindSession';
import MedicalDashboard from '../components/medical/Dashboard'
import OptionalVolunteers from '../components/medical/OptionalVolunteers'
import Policy from '../components/Policy'
import Login from '../components/Login'
import HamalHome from '../components/HamalHome';
import MessageBar from '../utils/MessageBar'
import {HamalNewRequests} from '../components/hamal/HamalNewRequests'
import Logout from '../components/Logout'
// import ManageSessions from '../components/hamal/ManageSessions'
import {HamalPendingUsers} from '../components/hamal/HamalPendingUsers'
// import ViewSessions from '../components/hamal/ViewSessions'
// import ManageUsers from '../components/hamal/ManageUsers'
import ErrorPage from '../components/ErrorPage'
import {connect} from 'react-redux'


const AppRouter = (props) =>{
  const [type,setType] = useState('none')

  useEffect(() => {
    if(props.auth.isAuthenticated){
     setType(props.auth.user.type)
    }
    else{
      setType("none")
    }
  }, [props])
  console.log(type)
  return(
    <Router>
      <Header/>
      {window.innerWidth < 600 && <MessageBar message={["כדי לקבל את החוויה הטובה ביותר",'באנדרואיד - "הגדרות" -> "הוספה למסך הבית"','באייפון - רק בדפדפן ספארי - "הגדרות" -> "הוסף למסך הבית"']}/> }
      <Switch>          
        <Route exact path="/" component={Landing}/>
        <Route exact path="/logout" component={Logout}/>
        <Route exact path='/login' component={Login} />
        <Route exact path="/policy" component={Policy}/>
        <Route exact path="/doctors/:id" component={CompleteDoctor}/>
        <Route exact path="/Registration/:type" component={Signup}/>
        
        {
          
          type == "medical" &&
          <React.Fragment>
            <PrivateRoute exact path="/medicalhome" component={MedicalDashboard}/>
            <PrivateRoute exact path="/optionalvolunteers" component={OptionalVolunteers}/>
          </React.Fragment>
           
        }
        {/* {
          type == "medical" &&
          
        } */}
        {
          type =="volunteer" &&
          <PrivateRoute exact path='/volunteer-homepage' component={VolunteerHomepage} />
        }
        {
          type =="volunteer" &&
          <PrivateRoute exact path='/find-session' component={FindSession} />
        }
        
        <Route exact path="/cnc/pendingusers" component={HamalPendingUsers}/>
        <Route exact path="/cnc/newrequests" component={HamalNewRequests}/>
        <Route exact path="/cnc/volunteers" component={HamalVolunteersPage}/>
        <Route exact path="/cnc/doctors" component={HamalDoctorsPage}/>
        <Route exact path="/cnc" component={HamalHome}/>
        
        <Route path="/" component={ErrorPage} />
      </Switch>
      <Footer/>
    </Router>
  )
}
  


const ToProps = (state,props) => {
  return {
      auth: state.auth
  }
}
export default connect(ToProps)(AppRouter);
