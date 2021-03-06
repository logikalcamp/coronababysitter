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
    height:100%
`
const Con = styled.div`
    max-width:1366px;
    margin:auto;
`
const MainDiv = styled.div`

`

const ManageSessions = (props) => {
    const [tab,setTab] = useState(1)
    useEffect(() => {
        axios.post(BASE_URL+'/api/volunteer/countpending').then(res=>{
            console.log(res)
        })
        axios.post(BASE_URL+'/api/volunteer/pending/0').then(result => {
        //   setNotYetApprovedSessions(result.data);
        console.log(result)
        })
      }, [])
    return (
        <MainCon>
            <Con>
                <h1>בקשות למשתמשים שעדיין לא אושרו</h1>
                <Tabs>
                    <Tab onClick={()=>setTab(1)} selected={tab==1}>צוות רפואי</Tab>
                    <Tab onClick={()=>setTab(2)} selected={tab==2}>מתנדבים</Tab>
                </Tabs>
                {tab == 1 ? 
                <MainDiv>
                    צוות רפואי
                </MainDiv>
                :
                <MainDiv>
                    מתנדבים
                </MainDiv>
                }

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