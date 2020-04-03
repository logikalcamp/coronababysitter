import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import GridComp from '../Grid';
import {BASE_URL} from '../../constants'
import Axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SchoolIcon from '@material-ui/icons/School';
import * as DateUtils from '../../utils/dateUtils';
import DotLoader from "react-spinners/DotLoader";


const styles = makeStyles(theme => ({
    arrowIcon: {
        width: '40px',
        height: '40px',
        cursor:'pointer'
    },
    descriptionText: {
        fontSize: '20px'
    },
    heartIcon : {
        width:'20px',
        height: '20px',
        color:'#00C2CB'
    },
    hobbiesText: {
        marginRight: '5px'
    },
    loader: {
        margin:'auto'
    }
}));

const actionCallbacks = {}

const registerForAction = (actionName, callbackKey, callback) => {
    if(!actionCallbacks[actionName]) {
        actionCallbacks[actionName] = {};
    }
    actionCallbacks[actionName][callbackKey] = callback;
}

const InformAction = (actionName, ...params) => {
    if(!actionCallbacks[actionName]) return;

    var callbackKeys = Object.keys(actionCallbacks[actionName]);
    
    callbackKeys.forEach((key) => {
        actionCallbacks[actionName][key](...params);
    })
}

const NotYetApprovedSessionsGridCommands = (props) => {
    const editClicked = (event) => InformAction("EditSession",props.data.fullSession);
    const removeClicked = (event) => console.log("Remove");
  
    return (
        <span>
            <DeleteIcon onClick={removeClicked} className="grid-command"></DeleteIcon>
            <EditIcon onClick={editClicked} className="grid-command"></EditIcon>
        </span>
    )
  }

export const HamalNewRequests = (props) => {
    const classes = styles();
    const [urgentOpen, setUrgentOpen] = useState(true);
    const [otherOpen, setOtherOpen] = useState(false);
    const [urgentRequests, setUrgentRequests] = useState(undefined)
    const [otherRequests, setOtherRequests] = useState(undefined)

    const [selectedSession, setSelectedSession] = useState({});
    const [selectedSessionRequests, setSelectedSessionRequests] = useState([])
    const [isApproving, setIsApproving] = useState(false)

    const [columnDefs] = useState([
        { 
          headerName: "תאריך ושעה",
          field: "startTime",
          type:'dateColumn',

        },
        { 
          headerName: "שם המבקש",
          field: "fullName"
        },
        { 
            headerName: "טלפון",
            field: "phone"
        },
        { 
            headerName: "כמות הצעות",
            field: "requestsCount"
        },
        { 
            headerName: "",
            field: "commands",
            width: 70,
            cellRenderer: "notYetApprovedSessionsGridCommands"
        }
      ]);

    const approveSession = (sessionId, volunteerId) => {
        setIsApproving(true);
        Axios.post(BASE_URL + `/api/session/approve/${sessionId}`, {volunteerId:volunteerId}).then(result => {
          setUrgentRequests(undefined);
          setOtherRequests(undefined);
          setSelectedSessionRequests([]);
          setIsApproving(false);
        }).catch(error => {
            console.log(error)
        })
    }

    const editUrgentRequest = (session) => {
        setSelectedSession(session);

        if(!session.requests || session.requests.length == 0) {
            setSelectedSessionRequests([]);
        }
        else {
            var requestsUI = [];

            for(var i = 0; i < session.volunteers_array_o.length; i++) {
                var volunteerRequested = session.volunteers_array_o[i];
                var age = DateUtils.calculateAge(new Date(volunteerRequested.birthday));
                var descriptionText = volunteerRequested.firstName + ' ' + volunteerRequested.lastName + ',' + age;
                var schoolText = volunteerRequested.isFemale ? 'לומדת' : 'לומד' + ' ב' + volunteerRequested.institute;
                
                requestsUI.push(<RequestBox>
                                    <VolunteerImage>
                                        <img src={volunteerRequested.picture}/>
                                    </VolunteerImage>
                                    <VolunteerDescription>
                                        <div className={classes.descriptionText}>{descriptionText}</div>
                                        <VolunteerInfo>
                                            <SchoolIcon className={classes.heartIcon}/>
                                            <div className={classes.hobbiesText}>{schoolText}</div>
                                        </VolunteerInfo>
                                        <VolunteerInfo>
                                            <FavoriteIcon className={classes.heartIcon}/>
                                            <div className={classes.hobbiesText}>{volunteerRequested.hobbies.join(', ')}</div>
                                        </VolunteerInfo>
                                        <AcceptButton onClick={() => {approveSession(session._id, volunteerRequested._id)}}>
                                            קבל
                                        </AcceptButton>
                                    </VolunteerDescription>
                                </RequestBox>);
            }

            setSelectedSessionRequests(requestsUI);
        }
    }

    registerForAction("EditSession", "f1", editUrgentRequest);

      const isIn24Hours = (date) => {
        var timeStamp = Math.round(new Date().getTime() / 1000);
        var timeStampTomorrow = timeStamp + (24 * 3600);
        var is24 = date <= new Date(timeStampTomorrow*1000).getTime();
        return is24;
      }

      const getGridObjectFromSession = (session)  => {
        var gridObject = {
            startTime: new Date(session.startTime),
            fullName: session.doctor_o[0].firstName + ' ' + session.doctor_o[0].lastName,
            phone: session.doctor_o[0].phone,
            requestsCount: session.requests.length,
            fullSession: session
        }

        return gridObject;
      }
      
      const loadPage = () => {
        if((urgentRequests && urgentRequests.length > 0) || (otherRequests && otherRequests.length > 0)) return;

        Axios.get(BASE_URL + "/api/session/getUpcomingNotYetApprovedSessions").then((result) => {
            var urgentRequestsNew = [];
            var otherRequestsNew = [];

            for(var i =0; i<result.data.length; i++) {
                var gridObject = getGridObjectFromSession(result.data[i]);

                if(isIn24Hours(new Date(result.data[i].startTime))) {
                    urgentRequestsNew.push(gridObject);
                }
                else {
                    otherRequestsNew.push(gridObject);
                }
            }

            setUrgentRequests(urgentRequestsNew);
            setOtherRequests(otherRequestsNew);
        })
      }

      useEffect(loadPage, [urgentRequests, otherRequests])

      const toggleCollapseables = () => {
            setUrgentOpen(!urgentOpen);
            setOtherOpen(!otherOpen);
      }

    return (
        <Container>
            <ContainerHeader>
                טיפול בבקשה פתוחות {urgentRequests && otherRequests ? `(${urgentRequests.length + otherRequests.length})` : ''}
            </ContainerHeader>
            <ContainerContent>
                <SessionsContent>
                    <Collapsable>
                        <CollapsableHeader>
                            <Title>בקשות דחופות {urgentRequests ? `(${urgentRequests.length})` : ''}</Title>
                            {!urgentOpen && <KeyboardArrowDownIcon className={classes.arrowIcon} onClick={toggleCollapseables}></KeyboardArrowDownIcon>}
                            {urgentOpen && <KeyboardArrowUpIcon className={classes.arrowIcon} onClick={toggleCollapseables}></KeyboardArrowUpIcon>}
                        </CollapsableHeader>
                        <CollapsableContent open={urgentOpen}>
                        <GridComp columnDefs={columnDefs} rowData={urgentRequests} 
                            frameworkComponents={{
                                                  notYetApprovedSessionsGridCommands: NotYetApprovedSessionsGridCommands}}/>
                        </CollapsableContent>
                    </Collapsable>
                    <Collapsable>
                    <CollapsableHeader>
                            <Title>בקשות לא דחופות {otherRequests ? `(${otherRequests.length})` : ''}</Title>
                            {!otherOpen && <KeyboardArrowDownIcon className={classes.arrowIcon} onClick={toggleCollapseables}></KeyboardArrowDownIcon>}
                            {otherOpen && <KeyboardArrowUpIcon className={classes.arrowIcon} onClick={toggleCollapseables}></KeyboardArrowUpIcon>}
                        </CollapsableHeader>
                        <CollapsableContent open={otherOpen}>
                        <GridComp columnDefs={columnDefs} rowData={otherRequests}frameworkComponents={{
                                                  notYetApprovedSessionsGridCommands: NotYetApprovedSessionsGridCommands}}/>
                        </CollapsableContent>
                    </Collapsable>
                </SessionsContent>
                <RequestsContent>
                    <RequestsTitle>הצעות להתנדבות</RequestsTitle>
                    <RequestBoxContainer>
                                {!isApproving && selectedSessionRequests}
                                {isApproving && <div className={classes.loader}><DotLoader size={70} 
                                                           color={"#00C2CB"}></DotLoader></div>}
                    </RequestBoxContainer>
                </RequestsContent>
            </ContainerContent>
        </Container>
    );
};

const AcceptButton = styled.div`
    background-color:#00C2CB;
    color:white;
    font-weight:bold;
    width: 85px;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    float: left;
    cursor:pointer;
`

const RequestsContent = styled.div`
    width: calc(30% - 15px);
    border-radius: 8px;
    background-color:white;
    height:auto;
    box-shadow: 5px 5px 5px gray;
    margin-right: 15px;
    padding: 10px;
`

const RequestsTitle = styled.div`
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    height: 30px;
    border-bottom: 1px solid gray;
    font-size: 24px;
    height: 10%;
`
const RequestBoxContainer = styled.div`
    overflow:scroll;
    display:flex;
    flex-direction:column;
    height: 90%;
    max-height:600px;
`

const RequestBox = styled.div`
    border-bottom:1px solid #00C2CB;
    height: 100px;
    padding: 10px 10px 5px 10px;
    display:flex;
    flex-direction:row;
`

const VolunteerImage = styled.div`
    width: 20%;
    display:flex;
    justify-content:center;
    align-items:center;

    img {
        width: 70px;
        height:70px;
        border-radius:50%;
    }
`

const VolunteerDescription = styled.div`
    margin-right:5%;
    width: 80%;
`

const VolunteerInfo = styled.div`
    display:flex;
    justift-content:flex-start;
    align-items:center;
`

const Container = styled.div`
    height: 100%;
    padding: 15px 50px 50px 50px;
    display:flex;
    flex-direction:column;
`

const ContainerHeader = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    font-size: 34px;
    height: 15%;
`

const ContainerContent = styled.div`
    display:flex;
    justify-content:flex-start;
    height: 85%;
    width: 100%;
`

const SessionsContent = styled.div`
    display:flex;
    flex-direction:column;
    width: 70%;
`

const Collapsable = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:white;
    border-radius: 8px;
    box-shadow: 5px 5px 5px gray;
    height: auto;
    clear:both;
    padding: 20px 10px 20px 10px;
    margin-bottom: 20px;
    flex-direction:column;
`

const CollapsableHeader = styled.div`
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    height: 30px;
    border-bottom: 1px solid gray;
    padding-bottom:5px;
`

const Title = styled.div`
    font-size: 24px;
    
`

const CollapsableContent = styled.div`
    height:100%;
    width: 100%;
    clear:both;

    animation: ${props => props.open ? "toggle-down 0.5s forwards" : "toggle-up 0.5s forwards"};
    -webkit-animation: ${props=> props.open ? "toggle-down 0.5s forwards" : "toggle-up 0.5s forwards"};

    @keyframes toggle-up {
        0% {height: 500px; }
        100% { height: 0px; }
    }
    
    @-webkit-keyframes toggle-up {
        0% {height: 500px; }
        100% { height: 0px; }
    }
        
    @keyframes toggle-down {
        0% {height: 0px; }
        100% { height: 500px; }
    }
    
    @-webkit-keyframes toggle-down {
        0% {height: 0px; }
        100% { height: 500px; }
    }

    & .grid-wrapper {
        height: 100%;
      }

    .ag-body-viewport {
        &::-webkit-scrollbar {
            width: 5px;
        }
        /* Track */
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
    
        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #00C2CB;
        }
    
        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
`