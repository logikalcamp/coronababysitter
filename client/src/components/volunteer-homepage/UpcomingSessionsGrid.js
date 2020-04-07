import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import {BASE_URL} from '../../constants'
import _ from 'lodash'
import GridComp from '../Grid';

const UpcomingSessionsGridCommands = (props) => {
  const prefix = window.location.origin;
  const phone = props.data.contact.phone.slice(1,10);

  return (
    <span className="grid-command">
      <img
        src={prefix + '/images/icons8_event_declined_96px.png'}
        onClick={() => props.onClick(props.data._id,props.data.doctor_o[0]._id)} 
      />
      <a href={`tel:+972${phone}`}>
        <img 
          src={prefix + '/images/icons8_phone_96px_1.png'}
        />  
      </a>   
    </span>
  )
}

export const UpcomingSessionsGrid = (props) => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const deleteSession = (id,did) => { 
    let text = "האם את.ה בטוח.ה שאת.ה רוצה לבטל את הרשמתך להתנדבות הזו ? "
    if(window.confirm(text)){
      Axios.post(BASE_URL + '/session/volunteerWithraw', {
        session_id: id,
        doctor_id:did
      }).then(res=>{
        let arr = _.filter(upcomingSessions,(o)=>{return o._id != id})
        setUpcomingSessions(arr)
      })
    }
  };

  const [columnDefs] = useState([
    { 
      headerName: "תאריך",
      field: "date",
      valueFormatter: (params) => {
        console.log(params.data.startTime)
        let time = _.get(params.data, 'startTime');
        if (time) return moment(time).format("DD/MM/YYYY")
        return params.value;
      }
    },
    { 
      headerName: "איש קשר",
      field: "contact.name"
    },
    {
      headerName: "שעות ההתנדבות",
      field: "sessionHours",
      valueFormatter: (params) => {
        console.log(params)
        let stime = _.get(params.data, 'startTime');
        let etime = _.get(params.data, 'endTime');
        let time = moment(stime).format("HH:mm") +"-"+moment(etime).format("HH:mm")
        if (time) return time
        return params.value;
      }
    },
    { 
      headerName: "",
      field: "commands",
      width: 95,
      cellRenderer: "upcomingSessionsGridCommands",
      cellRendererParams: {
        onClick: deleteSession
      }
    }
  ]);

  useEffect(() => {
    Axios.post(BASE_URL+`/api/session/getupcomingsessions/${props.id}`).then(result => {
      console.log(result)
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