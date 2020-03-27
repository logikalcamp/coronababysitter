import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Axios from 'axios';

import GridComp from './Grid';

//#region Styles
const VolunteerDashboardComp = styled.div`
  height: calc(100% - 275px);
  padding: 50px 15% 100px 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const HeaderComp = styled.div`
  height: 20%;
`;

const DashboardComp = styled.div`
  height: 70%;
  display: flex;
  justify-content: space-between;
`;

const GridWrapper = styled.div`
  background: #fff;
  height: 100%;
  border-radius: 8px;
  width: ${props => props.primary ? "calc(65% - 10px)" : "calc(35% - 10px)" };
`;
//#endregion

const UpcomingSessionsGrid = (props) => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [columnDefs] = useState([
    { 
      headerName: "תאריך",
      field: "date",
      valueFormatter: (params) => {
        const startTime = moment(params.data.startTime);
        return startTime.format("DD-MM-YY");
      }
    },
    { 
      headerName: "איש קשר",
      field: "contact",
      valueGetter: (params) => {
        const {firstName, lastName} = params.data.doctor;
        return firstName + ' ' + lastName;
      }
    },
    {
      headerName: "טלפון",
      field: "phone",
      valueGetter: (params) => {
        const {phone} = params.data.doctor;
        return phone;
      }
    },
    {
      headerName: "שעות ההתנדבות",
      field: "sessionHours",
      valueGetter: (params) => {
        let {startTime, endTime} = params.data;

        startTime = moment(startTime);
        endTime = moment(endTime);

        return endTime.format("H:mm") + ' - ' + startTime.format("H:mm");
      }
    },
    { 
      headerName: "",
      field: "commands",
      width: 95,
      cellRenderer: (parmas) => {
        return '<span class="grid-command"><img src="' + window.location.origin + '/images/icons8_event_declined_96px.png" /><img src="' + window.location.origin + '/images/icons8_phone_96px_1.png" /></span>';
      }
    }
  ]);

  useEffect(() => {
    Axios.get('/api/session/getupcomingsessions/5e7ca72c343daa68c8d7277f').then(result => {
      setUpcomingSessions(result.data);
    })
  }, [])

  return (
    <GridWrapper primary>
      <GridComp 
        columnDefs={columnDefs}
        rowData={upcomingSessions}
      />
    </GridWrapper>
  )
};

const NotYetApprovedSessionsGrid = (props) => {
  const [notYetApprovedSessions, setNotYetApprovedSessions] = useState([]);
  const [columnDefs] = useState([
    { 
      headerName: "תאריך ושעה",
      field: "startTime",
      valueFormatter: (params) => {
        const startTime = moment(params.value);
        return startTime.format("H:mm DD-MM-YY");
      }
    },
    { 
      headerName: "איש קשר",
      field: "contact",
      valueGetter: (params) => {
        const {firstName, lastName} = params.data.doctor;
        return firstName + ' ' + lastName;
      }
    },
    { 
      headerName: "",
      field: "commands",
      width: 70,
      cellRenderer: (parmas) => {
        return '<span class="grid-command"><img src="' + window.location.origin + '/images/icons8_event_declined_96px.png" /></span>';
      }
    }
  ]);

  useEffect(() => {
    Axios.get('/api/session/getnotyetapprovedsessions/5e7ca72c343daa68c8d7277f').then(result => {
      setNotYetApprovedSessions(result.data);
    })
  }, [])

  return (
    <GridWrapper>
      <GridComp 
        columnDefs={columnDefs}
        rowData={notYetApprovedSessions}
      />
    </GridWrapper>
  )
};

export const VolunteerHomepage = (props) => {
  return (
    <VolunteerDashboardComp>
      <HeaderComp>Header</HeaderComp>
      <DashboardComp>
        <UpcomingSessionsGrid />
        <NotYetApprovedSessionsGrid />
      </DashboardComp>
    </VolunteerDashboardComp>
  )
};