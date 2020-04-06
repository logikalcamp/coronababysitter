import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {BASE_URL} from '../../constants'
import moment from 'moment'


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
    overflow-y: auto;
`
const Con = styled.div`
    max-width:1366px;
    margin:auto;
    h1{
        text-align:center;
    }
    table {
        background:#f2f2f2;
        border-radius:5px;
        margin:auto;
    }
    td{
        border:1px solid #e7e7e7;
        padding:.7rem;
    }
    th{
        border-bottom:1px solid #4f4f4f;
        padding:5px 10px;
    }
`
const MainDiv = styled.div`

`

const ManageSessions = (props) => {
    const [tab,setTab] = useState(1)
    const [arr,setArr] = useState([])
    const [loader,setLoader] = useState(true)
    useEffect(() => {
        axios.post(BASE_URL+'/api/session/getAllFilledSessions').then(result => {
            setArr(result.data);
            setLoader(false)
        console.log(result)
        })
      }, [])
    return (
        <MainCon>
            <Con>
                <h1>סשנים שנקבעו במערכת </h1>
                {loader ? 
                    <div style={{textAlign:"center"}}>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                    :
                    <table cellSpacing="0">
                        <tbody>
                            <th>מועד התנדבות</th>
                            <th>צוות רפואי</th>
                            <th>טלפון צוות רפואי</th>
                            <th>מתנדב</th>
                            <th>טלפון צוות רפואי</th>
                            <th>עיר</th>
                            {
                                arr.map((event)=>{
                                    return (
                                        <tr>
                                            <td>{moment(event.startTime).format("DD/MM HH:mm")}</td>
                                            <td>{event.doctor_o[0].firstName + " " + event.doctor_o[0].lastName}</td>
                                            <td>{event.doctor_o[0].phone}</td>
                                            <td>{event.chosen_volunteer_o[0].firstName + " " + event.chosen_volunteer_o[0].lastName }</td>
                                            <td>{event.chosen_volunteer_o[0].phone}</td>
                                            <td>{event.doctor_o[0].city}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
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