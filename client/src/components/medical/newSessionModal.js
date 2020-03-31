import React ,{useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {BASE_URL} from '../../constants'
import {MdCancel} from "react-icons/md";

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
const Modal = styled.div`
    position:fixed;
    top:50%;
    left:50%;
    height:600px;
    width:800px;
    margin-left:-400px;
    margin-top:-300px;
    z-index:5;
    background:white;
    border-radius:20px;
    
    
    @media(max-width:800px){
        width:350px;
        margin-left:-175px;
        h2{
            text-align:center;
        }
    }



`




const NewSession = ({setOpen,id}) =>{
    const [details,setState] = useState({
        startTime:'',
        requests:[],
        doctor_id:id,
        "timeRequested": new Date(),
        recurring:"once",
        endTime:'',
        tasks:[],
        didHappen:false,
        contact:''
    })
    return(
        <React.Fragment>
            <Background onClick={()=>{setOpen(false)}}></Background>
            <Modal>
                <div><MdCancel style={{width:"3rem",height:"3rem",color:"#e7e7e7"}} onClick={()=>{setOpen(false)}}/></div>
                <h2>הזנת פגישה </h2>
                <div>
                    <label>שעת התחלה</label>
                    <input value={details.startTime} onChange={()=>{}} />
                </div>
                <div>
                    <label>שעת סיום</label>
                    <input />
                </div>
                <div>
                    <label>איש קשר</label>
                    <input />
                </div>
                <div>
                    <label>טלפון איש קשר</label>
                    <input />
                </div>
                <div>
                    <label>מטלות</label>
                    <input />
                </div>
                <div>
                    <label>הערות נוספות</label>
                    <input />
                </div>
                <div>
                    <button>צור בקשה</button>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default NewSession;