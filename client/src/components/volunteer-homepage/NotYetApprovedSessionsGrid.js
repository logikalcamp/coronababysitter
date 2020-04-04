import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import {BASE_URL} from '../../constants'

import GridComp from '../Grid';

const NotYetApprovedSessionsGridCommands = (props) => {
  const prefix = window.location.origin
  const onClick = (event) => console.log(event);

  return (
    <span className="grid-command">
      <img
        src={prefix + '/images/icons8_event_declined_96px.png'}
        onClick={onClick} 
      />     
    </span>
  )
}

export const NotYetApprovedSessionsGrid = (props) => {
  const [notYetApprovedSessions, setNotYetApprovedSessions] = useState([]);
  const [columnDefs] = useState([
    { 
      headerName: "תאריך ושעה",
      field: "startTime"
    },
    { 
      headerName: "איש קשר",
      field: "contact"
    },
    { 
      headerName: "",
      field: "commands",
      width: 70,
      cellRenderer: "notYetApprovedSessionsGridCommands"
    }
  ]);
  
  useEffect(() => {
    Axios.post(BASE_URL+'/api/session/getnotyetapprovedsessions/5e7ca72c343daa68c8d7277f').then(result => {
      setNotYetApprovedSessions(result.data);
    })
  }, [])
  
  return (
    <GridComp 
      columnDefs={columnDefs}
      rowData={notYetApprovedSessions}
      frameworkComponents={{
        notYetApprovedSessionsGridCommands: NotYetApprovedSessionsGridCommands
      }}
    />
  )
};