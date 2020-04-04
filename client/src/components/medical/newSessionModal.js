import React ,{useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {BASE_URL} from '../../constants'
import {MdCancel} from "react-icons/md";
import moment from 'moment'
import {Link} from 'react-router-dom'

const Background = styled.div`
    position:fixed;
    top:0;
    background:black;
    left:0;
    right:0;
    bottom:0;
    z-index:2;
    opacity:0.3;
`
const Back = styled.div`
    width:100% !important;
`

const Modal = styled.div`
    position:fixed;
    top:50%;
    left:50%;
    width:800px;
    margin-left:-400px;
    margin-top:-300px;
    z-index:5;
    background:white;
    border-radius:20px;
    div{
        display:flex;
        width:40%;
        margin:.5rem auto;
        flex-direction:column;
    }
    label{

    }
    input{
        padding:5px;
        border-radius:5px;
        border:1px solid #828282;
    }
    h2{
        width:40%;
        margin:auto;
    }
    button{
        padding:1rem;
        background:#53B493;
        border:0;
        outline:none;
        color:white;
        font-weight:bold;
        cursor:pointer;
        border-radius:5px;
    }
    button:hover{
        background:#419a7c;
    }
    
    @media(max-width:800px){
        div{
            width:80%;
        }
        width:350px;
        margin-left:-175px;
        h2{
            text-align:center;
            width:100%;
        }
    }
`
const DoneModal = styled.div`
    widht:100% !important;
    margin:auto;
    text-align:center;
    button{
        margin:5px 0;
        width:100%;
    }
`

const TimeDate = styled.div`
    display:flex !important;
    width:100% !important;
    flex-direction:row !important;
    margin:0 !important;
`


const numbers = ["0","1","2","3","4","5","6","7","8","9"]

const NewSession = ({setOpen,id}) =>{
    const [done,setDone] = useState(false)
    const [err,setErr] = useState('')
    const [details,setState] = useState({
        startTime:'',
        sHour:'',
        sDate:'',
        eHour:'',
        eDate:'',
        requests:[],
        doctor_id:id,
        timeRequested: new Date(),
        recurring:"once",
        endTime:'',
        tasks:[],
        didHappen:false,
        contact:''
    })
    console.log(window.location)
    return(
        <React.Fragment>
            <Background onClick={()=>{setOpen(false)}}></Background>
            <Modal>
                <Back><MdCancel style={{width:"3rem",height:"3rem",color:"#e7e7e7"}} onClick={()=>{setOpen(false)}}/></Back>
                {
                    done ? 
                    <DoneModal style={{width:"100%"}}>
                        <h2>יש! הבקשה הוזנה למערכת , תוכל.י להתעדכן על הצעות של המתנדבים דרך דף ניהול הבקשות </h2>
                        <div>
                            {
                                window.location.pathname == "/medicalhome" ? 
                                <button onClick={()=>{
                                setOpen(false)
                                setDone(false)}}>לדף ניהול בקשות</button>
                                :
                                <Link to="/medicalhome">
                                    <button >לדף ניהול בקשות</button>
                                </Link>
                            }
                            
                            <button onClick={()=>{
                                setDone(false)
                                setState({
                                    startTime:'',
                                    sHour:'',
                                    sDate:'',
                                    eHour:'',
                                    eDate:'',
                                    requests:[],
                                    doctor_id:id,
                                    "timeRequested": new Date(),
                                    recurring:"once",
                                    endTime:'',
                                    tasks:[],
                                    didHappen:false,
                                    contact:''
                                })
                            }}>ליצירת בקשה חדשה</button>
                        </div>
                    </DoneModal>
                    :
                    <React.Fragment>
                    <h2>הזנת פגישה </h2>
                    <div>
                        <label>תאריך </label>
                        <input type="date" value={details.sDate} onChange={(e)=>{
                            let d = {...details}
                            d.sDate = e.target.value
                            setState(d)
                        }} />
                    </div>
                    <div>
                        <label>שעת התחלה</label>
                        <input type="text" value={details.sHour} 
                        onKeyDown={(e)=>{
                            if(!numbers.includes(e.key)){
                                e.preventDefault()
                            }
                            if(e.key == "Backspace"){
                                if(e.target.value.length == 4){
                                    let d = {...details}
                                    let rep = d.sHour.slice(-2)
                                    d.sHour = d.sHour.replace(rep,"")
                                    setState(d)
                                }
                                else{
                                    let d = {...details}
                                    let rep = d.sHour.slice(-1)
                                    d.sHour = d.sHour.replace(rep,"")
                                    setState(d)
                                }
                            }
                        }}
                        onChange={(e)=>{
                            if(e.target.value.length==6){

                            }else{   
                                if(e.target.value.length == 1){
                                    if((e.target.value == 1)||(e.target.value==2)||(e.target.value==0)){
                                        let d = {...details}
                                        d.sHour = e.target.value
                                        setState(d)
                                    }else{
                                        let d = {...details}
                                        d.sHour = "0"+e.target.value+":"
                                        setState(d)
                                    }
                                }else{
                                    if(e.target.value.length == 2){
                                        let d = {...details}
                                        d.sHour = e.target.value+":"
                                        setState(d)
                                    }else{
                                        let d = {...details}
                                        d.sHour = e.target.value
                                        setState(d)
                                    }
                                }
                            }
                        }}/>
                    </div>
                    <div>
                        <label>מועד סיום</label>
                        <input type="text" value={details.eHour} 
                        onKeyDown={(e)=>{
                            if(!numbers.includes(e.key)){
                                e.preventDefault()
                            }
                            if(e.key == "Backspace"){
                                if(e.target.value.length == 4){
                                    let d = {...details}
                                    let rep = d.eHour.slice(-2)
                                    d.eHour = d.eHour.replace(rep,"")
                                    setState(d)
                                }
                                else{
                                    let d = {...details}
                                    let rep = d.eHour.slice(-1)
                                    d.eHour = d.eHour.replace(rep,"")
                                    setState(d)
                                }
                            }
                        }}
                        onChange={(e)=>{
                            if(e.target.value.length==6){

                            }else{   
                                if(e.target.value.length == 1){
                                    if((e.target.value == 1)||(e.target.value==2)||(e.target.value==0)){
                                        let d = {...details}
                                        d.eHour = e.target.value
                                        setState(d)
                                    }else{
                                        let d = {...details}
                                        d.eHour = "0"+e.target.value+":"
                                        setState(d)
                                    }
                                }else{
                                    if(e.target.value.length == 2){
                                        let d = {...details}
                                        d.eHour = e.target.value+":"
                                        setState(d)
                                    }else{
                                        let d = {...details}
                                        d.eHour = e.target.value
                                        setState(d)
                                    }
                                }
                            }
                        }}/>
                    </div>
                    <div>
                        <label>איש קשר</label>
                        <input value={details.contactName} onChange={(e)=>{
                            let d = {...details}
                            d.contactName = e.target.value
                            setState(d)
                        }} />
                    </div>
                    <div>
                        <label>טלפון איש קשר</label>
                        <input value={details.contact} onChange={(e)=>{
                            let d = {...details}
                            d.contact = e.target.value
                            setState(d)
                        }} />
                    </div>
                    <div>
                        <label>מטלות</label>
                        <input  value={details.tasks} onChange={(e)=>{
                            let d = {...details}
                            d.tasks = e.target.value
                            setState(d)
                        }}/>
                    </div>
                    <div>
                        <label>הערות נוספות</label>
                        <input value={details.notes} onChange={(e)=>{
                            let d = {...details}
                            d.notes = e.target.value
                            setState(d)
                        }}/>
                    </div>
                    {err!='' && <div>{err}</div>}
                    <div>
                        <button
                        onClick={()=>{
                            let sDate = moment(details.sDate).format("MM/DD/YYYY") + moment(details.sHour,"HH:mm").format("HH:mm")
                            let eDate = moment(details.sDate).format("MM/DD/YYYY") + moment(details.eHour,"HH:mm").format("HH:mm")
                            let data = {
                                startTime:new Date(moment(sDate,"MM/DD/YYYY HH:mm").format()),
                                requests:[],
                                doctor_id:id,
                               timeRequested new Date(),
                                recurring:"once",
                                endTime:new Date(moment(eDate,"MM/DD/YYYY HH:mm").format()),
                                tasks:[],
                                notes:'',
                                didHappen:false,
                                contact:{
                                    phone:details.contact,
                                    name:details.contactName
                                }
                            }
                            // console.log(data)
                            axios.post(BASE_URL+"/api/session",data)
                            .then((res)=>{
                                console.log(res)
                                if(res.status == 200){
                                    // alert("yai")
                                    setDone(true)
                                }
                                else{
                                    // alert("oops")
                                    setErr("משהו השתבש")
                                }
                            })
                        }}
                        >צור בקשה</button>
                    </div>
                    </React.Fragment>
                }
               
            </Modal>
        </React.Fragment>
    )
}

export default NewSession;