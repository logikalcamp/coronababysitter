import React,{useState} from 'react'
import styled from 'styled-components'
import { MdCancel } from "react-icons/md";

const MessageCon = styled.div`
    position:fixed;
    top:0;
    min-height:90px;
    left:0;
    right:0;
    z-index:5;
    background: #5ce8b9;
    box-shadow:0 2px 8px rgba(0,0,0,0.2);
    border-radius:0 0 25px 25px;
    dispaly:flex;
    flex-direction:column;
    h4{
        margin:0;
    }
`

const MessageBar = ({message}) => {
    const [show,setShow] = useState(JSON.parse(localStorage.getItem('pwa')) == null ? true : JSON.parse(localStorage.getItem("pwa")))
    console.log(JSON.parse(localStorage.getItem('pwa')) == null)
    return (
        <React.Fragment>
        {
            show ? 
            <MessageCon>
                <div>
                    <MdCancel style={{color:"#828282"}} onClick={()=>{setShow(false)}}/>
                </div>
                <div style={{padding:"0 2rem"}}>   
                    <h4>{message[0]}</h4>
                    <div>{message[1]}</div>
                    <div>{message[2]}</div>
                </div>
            </MessageCon>
            :
            <div></div>
        }   
        </React.Fragment>
    )
}

export default MessageBar;