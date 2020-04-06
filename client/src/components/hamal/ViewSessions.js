import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {BASE_URL} from '../../constants'

const Tabs = styled.div`
    display:flex;

`

const Tab = styled.div`
    padding:1rem;
    background:${props=>props.selected ? "blue":"red"};
    cursor:pointer;
`
const MainCon = styled.div`
    width:100%;
    height:100%;
`
const Con = styled.div`
    max-width:1366px;
    margin:auto;
`
const MainDiv = styled.div`

`

const ManageSessions = (props) => {
    const [tab,setTab] = useState(1)
    const [arr,setArr] = useState([])
    useEffect(() => {
        axios.post(BASE_URL+'/api/session/getUpcomingNotYetApprovedSessions').then(result => {
            setArr(result.data);
        console.log(result)
        })
      }, [])
    return (
        <MainCon>
            <Con>
                <h1>סשנים שנקבעו במערכת </h1>
                

            </Con>
        </MainCon>
    )
}

export default ManageSessions;


// const [notYetApprovedSessions, setNotYetApprovedSessions] = useState([]);
// const [columnDefs] = useState([
//   { 
//     headerName: "תאריך ושעה",
//     field: "startTime"
//   },
//   { 
//     headerName: "איש קשר",
//     field: "contact"
//   },
//   { 
//     headerName: "",
//     field: "commands",
//     width: 70,
//     cellRenderer: "notYetApprovedSessionsGridCommands"
//   }
// ]);

// useEffect(() => {
//   Axios.post(BASE_URL+'/api/session/getnotyetapprovedsessions/5e7ca72c343daa68c8d7277f').then(result => {
//     setNotYetApprovedSessions(result.data);
//   })
// }, [])

// return (
//   <GridComp 
//     columnDefs={columnDefs}
//     rowData={notYetApprovedSessions}
//     frameworkComponents={{
//       notYetApprovedSessionsGridCommands: NotYetApprovedSessionsGridCommands
//     }}
//   />
// )