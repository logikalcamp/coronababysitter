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

const styles = makeStyles(theme => ({
    arrowIcon: {
        width: '40px',
        height: '40px',
        cursor:'pointer'
    }
}));

const NotYetApprovedSessionsGridCommands = (props) => {
    const editClicked = (event) => console.log("Edit");
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

      useEffect(() => {
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
      }, [urgentRequests, otherRequests])

      const toggleCollapseables = () => {
            setUrgentOpen(!urgentOpen);
            setOtherOpen(!otherOpen);
      }

    return (
        <Container>
            <ContainerHeader>
                טיפול בבקשה דחופות
            </ContainerHeader>
            <ContainerContent>
                <TablesContent>
                    <Collapsable>
                        <CollapsableHeader>
                            <Title>בקשות דחופות</Title>
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
                            <Title>בקשות לא דחופות</Title>
                            {!otherOpen && <KeyboardArrowDownIcon className={classes.arrowIcon} onClick={toggleCollapseables}></KeyboardArrowDownIcon>}
                            {otherOpen && <KeyboardArrowUpIcon className={classes.arrowIcon} onClick={toggleCollapseables}></KeyboardArrowUpIcon>}
                        </CollapsableHeader>
                        <CollapsableContent open={otherOpen}>
                        <GridComp columnDefs={columnDefs} rowData={otherRequests}/>
                        </CollapsableContent>
                    </Collapsable>
                </TablesContent>
            </ContainerContent>
        </Container>
    );
};

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

const TablesContent = styled.div`
    display:flex;
    flex-direction:column;
    width: 50%;
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
