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
  console.log(props)
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
      cellRenderer: "notYetApprovedSessionsGridCommands"
    }
  ]);
  
  useEffect(() => {
    Axios.post(BASE_URL+`/api/session/${props.id}`).then(result => {
      // setNotYetApprovedSessions(result.data)
      console.log(result,"dddd");
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

