import React, { useState } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

export const Header = (props) => {
    const [auth,setAuth] = useState(false)
    const [redirect,setRedirect] = useState(false)
    const [hasModal,setHasModal] = useState(false)

    return(
        <HeaderCon>
            <SubCon>
                <Link to="/">
                    <HeaderSubCon>
                        <img src={window.location.origin + "/images/newL.png"} alt="nel" />
                        <label id="lb">Sitter Seeker</label>
                    </HeaderSubCon>
                </Link>
                <HeaderSubCon >
                    {auth && <label>שם משתמש |</label>}
                  <Link to={auth ? "/logout":"/login"}>
                    <button >{auth ? "התנתקות":"התחברות"}</button>
                  </Link>
                </HeaderSubCon>
            </SubCon>
            {redirect && <Redirect to={auth ? "/logout":"/login"}/>}
        </HeaderCon>
    )
}

const ModalCon = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0, 0.4);

    display:  ${props=> props.open ? "block" : "none"};
`;

const ModalContentCon = styled.div`
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 400px;
    height: 100%;
    background-color: #ffffff;

    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);

    animation: ${props=> props.open ? "slide-in 0.5s forwards" : "slide-out 0.5s forwards"};
    -webkit-animation: ${props=> props.open ? "slide-in 0.5s forwards" : "slide-out 0.5s forwards"};

    @keyframes slide-in {
        100% { transform: translateX(0%); }
    }
    
    @-webkit-keyframes slide-in {
        100% { -webkit-transform: translateX(0%); }
    }
        
    @keyframes slide-out {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
    }
    
    @-webkit-keyframes slide-out {
        0% { -webkit-transform: translateX(0%); }
        100% { -webkit-transform: translateX(-100%); }
    }
`;

const HeaderCon = styled.div`
    background:#00C2CB;
    a{
        text-decoration:none;
        outline:none;
        cursor:pointer;
    }
`
const HeaderSubCon = styled.div`
    display:flex;
    align-items:center;
    @media(max-width:500px){
        #lb{
            display:none;
        }
    }
    img{
        width:2.5rem;
        height:3rem;
        margin-left:1rem;
    }
    label{
        color:white;
        ${'' /* font-weight:bold; */}
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
    padding:.5rem 1rem;
`
