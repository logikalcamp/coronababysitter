import React, { useState } from 'react'
import styled from 'styled-components'
import {Redirect} from 'react-router-dom'

export const Header = (props) => {
    const [auth,setAuth] = useState(false)
    const [redirect,setRedirect] = useState(false)
    return(
        <HeaderCon>
            <SubCon>
                <HeaderSubCon >
                    <img src={window.location.origin + "/images/newL.png"} alt="nel" />
                    <label>בייבי קורונה</label>
                </HeaderSubCon>
                <HeaderSubCon >
                    {auth && <label>שם משתמש |</label>}
                    <button onClick={()=>{
                        setRedirect(true)
                    }}>{auth ? "התנתקות":"התחברות"}</button>
                </HeaderSubCon>
            </SubCon>
            {redirect && <Redirect to={auth ? "/logout":"/login"}/>}
        </HeaderCon>
    )
}

const HeaderCon = styled.div`
    background:#00C2CB;
`
const HeaderSubCon = styled.div`
    display:flex;
    align-items:center;
    img{
        width:2rem;
        height:2rem;
        margin-left:1rem;
    }
    label{
        color:white;
        font-weight:bold;
        font-size:22px;
    }
    button{
        background:transparent;
        border: 0;
        color:white;
        font-size:18px;
        outline:none;
        cursor:pointer;
    }
`

const SubCon = styled.div`
    max-width:1366px;
    margin:auto;
    display:flex;
    justify-content:space-between;
    padding:1rem;
`
