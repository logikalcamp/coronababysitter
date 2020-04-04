import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import {BASE_URL} from '../../constants'
import GridComp from '../Grid';
import _ from 'lodash'

const NotYetApprovedSessionsGridCommands = (props) => {
  const prefix = window.location.origin
  const onClick = (event) => {
    Axios.post(BASE_URL+'/api/session/delete',{sessionId:props.data._id})
    .then(res=>{
      if(res.status==200){
        props.onClick(props.data._id)
      }
    })
  };

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
  const [load,setload] = useState(true)
  const [notYetApprovedSessions, setNotYetApprovedSessions] = useState([]);
  const DeleteSession = (val) =>{
    let a = _.filter(notYetApprovedSessions,function(o){return o._id != val})
    setNotYetApprovedSessions(a)
  }
  const [columnDefs] = useState([
    { 
      headerName: "תאריך",
      field: "startTime",
      valueFormatter: (params) => {
        const startTime = moment(params.value);
        return startTime.format("DD-MM-YY");
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
      cellRenderer: "notYetApprovedSessionsGridCommands",
      cellRendererParams: {
        onClick: DeleteSession
      }
    }
  ]);
  
  useEffect(() => {
    Axios.post(BASE_URL+`/api/session/${props.id}`,{isFilled:false}).then(result => {
      console.log(result);
      setload(false)
      // setTimeout(()=>{

      // },2000)
      setNotYetApprovedSessions(result.data)
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
        rowData={notYetApprovedSessions}
        frameworkComponents={{
          notYetApprovedSessionsGridCommands: NotYetApprovedSessionsGridCommands
        }}
      />
    }
    </React.Fragment>
  )
};

