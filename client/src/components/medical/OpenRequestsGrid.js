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

export const OpenRequestsGrid = (props) => {
  console.log(props)

  const [notYetApprovedSessions, setNotYetApprovedSessions] = useState(props.arr);
  
  useEffect(() => {
    setNotYetApprovedSessions(props.arr)
  }, [props])
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
        const {firstName, lastName} = params.data.doctor_o[0];
        return firstName + ' ' + lastName;
      }
    },
    { 
      headerName: "כמות בקשות",
      field: "countReq",
      valueGetter: (params) => {
        const coun = params.data.requests.length;
        return coun;
      }
    },
    { 
      headerName: "",
      field: "commands",
      width: 70,
      cellRenderer: "notYetApprovedSessionsGridCommands"
    }
  ]);
  

  const handleClick = (e) => {
      props.handle(notYetApprovedSessions,e)
  }
  
  
  return (
    <React.Fragment>
    {
      props.load ? 
      <div style={{textAlign:"center"}}>
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
        :

        <GridComp 
        columnDefs={columnDefs}
        rowData={notYetApprovedSessions}
        onRowClicked={handleClick}
        frameworkComponents={{
          notYetApprovedSessionsGridCommands: NotYetApprovedSessionsGridCommands
        }}
      />
    }
    </React.Fragment>
  )
};

