import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import GridComp from '../Grid';

const styles = makeStyles(theme => ({
    arrowIcon: {
        width: '40px',
        height: '40px',
        cursor:'pointer'
    }
}));

export const HamalNewRequests = (props) => {
    const classes = styles();
    const [urgentOpen, setUrgentOpen] = useState(true);
    const [otherOpen, setOtherOpen] = useState(false);
    const [urgentRequests, setUrgentRequests] = useState([])
    const [otherRequests, setOtherRequests] = useState([])

    const [columnDefs] = useState([
        { 
          headerName: "תאריך ושעה",
          field: "startTime"
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
        }
      ]);

      const isIn24Hours = (date) => {
        var timeStamp = Math.round(new Date().getTime() / 1000);
        var timeStampYesterday = timeStamp + (24 * 3600);
        var is24 = date >= new Date(timeStampYesterday*1000).getTime();
        return is24;
      }

      const getGridObjectFromSession = (session)  => {
        var gridObject = {
            startTime: session.startTime,
            fullName: session.firstName + ' ' + session.lastName,
            phone: session.phone,
            requestsCount: session.requests.count,
            fullSession: session
        }

        return gridObject;
      }

      useEffect(() => {
        if(urgentRequests.length > 0 || otherRequests.length > 0)
        Axios.get(BASE_API + "/api/session/getUpcomingNotYetApprovedSessions").then((result) => {
            var urgentRequestsNew = [];
            var otherRequestsNew = [];

            for(var i =0; i<result.data.length; i++) {
                var gridObject = getGridObjectFromSession(result.data[i]);

                if(isIn24Hours(resulsts.data[i].startDate)) {
                    urgentRequestsNew.push(gridObject);
                }
                else {
                    otherRequestsNew.push(gridObject);
                }
            }

            setUrgentOpen(urgentRequestsNew);
            setOtherOpen(otherRequestsNew);
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
                        <GridComp columnDefs={columnDefs} rowData={urgentRequests}/>
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
