import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import {BASE_URL} from '../../constants'
import GridComp from '../Grid';
import _ from 'lodash'
import {MdEventBusy} from "react-icons/md";


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
      <MdEventBusy style={{color:"red",width:"2rem",height:"2rem"}} onClick={onClick}/>   
    </span>
  )
}

export const OpenRequestsGrid = (props) => {
  console.log(props)

  const [notYetApprovedSessions, setNotYetApprovedSessions] = useState(props.arr);
  const DeleteSession = (val) =>{
    let a = _.filter(notYetApprovedSessions,function(o){return o._id != val})
    setNotYetApprovedSessions(a)
  }
  useEffect(() => {
    setNotYetApprovedSessions(props.arr)
  }, [props])
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
      headerName: "איש קשר",
      field: "contact",
      valueGetter: (params) => {
        const contact = params.data.contact.name;
        return contact ;
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
      headerName: "לביטול",
      field: "commands",
      width: 70,
      cellRenderer: "notYetApprovedSessionsGridCommands",
      cellRendererParams: {
        onClick: DeleteSession
      }
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

