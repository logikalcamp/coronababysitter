import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import {BASE_URL} from '../../constants'
import _ from 'lodash'
import GridComp from '../Grid';
import 'moment/locale/he'
import {MdEventBusy} from "react-icons/md";

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
  let phone = props.data.contact.phone.slice(1,10)
  // let phone = props.data.contact.slice(1,10)
  return (
    <span className="grid-command">
      {/* <img
        src={prefix + '/images/icons8_event_declined_96px.png'}
        onClick={onClick} 
      />     */}
      <span className="grid-command">
        <MdEventBusy style={{color:"red",width:"2rem",height:"2rem"}} onClick={onClick}/>   
      </span>
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
      headerName: "רופא",
      field: "contact",
      valueGetter: (params) => {
        const contact = params.data.doctor_o[0].firstName;
        return contact;
      }
    },
    {
      headerName: "שעות ההתנדבות",
      field: "sessionHours",
      valueGetter: (params) => {
        let {startTime, endTime} = params.data;

        startTime = moment(new Date(startTime).toLocaleString("he", {timeZone: "UTC"}));
        endTime = moment(new Date(endTime).toLocaleString("he", {timeZone: "UTC"}));
        
        return endTime.format("H:mm") + ' - ' + startTime.format("H:mm");
      }
    },
    { 
      headerName: "איש קשר זמין",
      field: "contact",
      valueGetter: (params) => {
        const contact = params.data.contact.name;
        return contact;
      }
    },
    { 
      headerName: "מתנדב",
      field: "volunteer",
      valueGetter: (params) => {
        const {firstName,lastName} = params.data.chosen_volunteer_o[0];
        return firstName + ' ' +lastName;
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
      setload(false)
      // setTimeout(()=>{

      // },4000)
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