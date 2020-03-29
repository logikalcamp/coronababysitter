import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';

import GridComp from '../Grid';

const UpcomingSessionsGridCommands = (props) => {
  const prefix = window.location.origin
  const onClick = (event) => console.log(event);

  return (
    <span className="grid-command">
      <img
        src={prefix + '/images/icons8_event_declined_96px.png'}
        onClick={onClick} 
      />
      <img 
        src={prefix + '/images/icons8_phone_96px_1.png'}
        onClick={onClick}
      />     
    </span>
  )
}

export const UpcomingSessionsGrid = (props) => {
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
      cellRenderer: "upcomingSessionsGridCommands"
    }
  ]);

  useEffect(() => {
    Axios.get('/api/session/getupcomingsessions/5e7ca72c343daa68c8d7277f').then(result => {
      setUpcomingSessions(result.data);
    })
  }, [])

  return (
    <GridComp 
        columnDefs={columnDefs}
        rowData={upcomingSessions}
        frameworkComponents={{
          upcomingSessionsGridCommands: UpcomingSessionsGridCommands
        }}
    />
  )
};