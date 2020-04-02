import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import {BASE_URL} from '../../constants'
import _ from 'lodash'
import GridComp from '../Grid';

const UpcomingSessionsGridCommands = (props) => {
  const prefix = window.location.origin
  const onClick = (event) => {
    Axios.post(BASE_URL+'/api/session/delete',{sessionId:props.data._id})
    .then(res=>{
      if(res.status==200){
        props.onClick(props.data._id)
      }
    })
  };
  // console.log(props.data.contact.slice(1,10))
  // let phone = props.data.contact.phone.splice(1,10)
  let phone = props.data.contact.slice(1,10)
  return (
    <span className="grid-command">
      <img
        src={prefix + '/images/icons8_event_declined_96px.png'}
        onClick={onClick} 
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
  const [load,setload] = useState(true)
  const DeleteSession = (val) =>{
    let a = _.filter(upcomingSessions,function(o){return o._id != val})
    setUpcomingSessions(a)
  }
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
        const {firstName, lastName} = params.data.doctor_o[0];
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
      cellRenderer: "upcomingSessionsGridCommands",
      cellRendererParams: {
        onClick: DeleteSession
      }
    }
  ]);

  useEffect(() => {
    Axios.post(BASE_URL+`/api/session/${props.id}`,{isFilled:true}).then(result => {
      setUpcomingSessions(result.data);
      setTimeout(()=>{
        setload(false)

      },2000)
      console.log(result);
    })
  }, [])

  return (
    <React.Fragment>
      {
        load ? 
        <div style={{textAlign:"center"}}>
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
          :
        <GridComp 
          columnDefs={columnDefs}
          rowData={upcomingSessions}
          frameworkComponents={{
            upcomingSessionsGridCommands: UpcomingSessionsGridCommands
          }}
      />
      }
    </React.Fragment>
  )
};