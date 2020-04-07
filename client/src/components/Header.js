import React, { useState } from 'react'
import styled from 'styled-components'
import {Link,NavLink} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {CNC_CONNECTED} from '../constants'

const Header = (props) => {
    const [auth,setAuth] = useState(false)
    const [redirect,setRedirect] = useState(false)
    const [hasModal,setHasModal] = useState(false)
    const type ="medical"
    const isCncConnected = JSON.parse(localStorage.getItem(CNC_CONNECTED));
    console.log(props)
    return(
        <HeaderCon>
            <SubCon>
                <div style={{display:"flex"}}>
                {props.auth.isAuthenticated 
                ?
                (
                    props.auth.user.type == "medical" ? 
                    <Link to="/medicalhome">
                        <HeaderSubCon>
                            <img src={window.location.origin + "/images/newL.png"} alt="nel" />
                            <label id="lb">Sitter Seeker</label>
                        </HeaderSubCon>
                    </Link>
                    :
                    (
                        props.auth.user.type == "volunteer" ?
                        <Link to="/volunteer-homepage">
                            <HeaderSubCon>
                                <img src={window.location.origin + "/images/newL.png"} alt="nel" />
                                <label id="lb">Sitter Seeker</label>
                            </HeaderSubCon>
                        </Link>
                        :
                        <Link to="/cac">
                            <HeaderSubCon>
                                <img src={window.location.origin + "/images/newL.png"} alt="nel" />
                                <label id="lb">Sitter Seeker</label>
                            </HeaderSubCon>
                        </Link>
                    )
                )
                :
                <Link to="/">
                    <HeaderSubCon>
                        <img src={window.location.origin + "/images/newL.png"} alt="nel" />
                        <label id="lb">Sitter Seeker</label>
                    </HeaderSubCon>
                </Link>
                }
                    {
                        props.auth.isAuthenticated && 
                        <Tabs >
                            {
                                props.auth.user.type == "medical" &&
                                <React.Fragment>
                                    <NavLink to="/medicalhome" className="NavTab" activeClassName="NavTabActive">אירועים מתואמים</NavLink>
                                    <NavLink to="/optionalvolunteers" className="NavTab" activeClassName="NavTabActive">בקשות תיאום</NavLink> 
                                </React.Fragment>
                            }
                            {
                                props.auth.user.type=="volunteer" && 
                                <React.Fragment>
                                    <NavLink to="/volunteer-homepage" className="NavTab" activeClassName="NavTabActive">ההתנדבויות שלי</NavLink>
                                    <NavLink to="/find-session" className="NavTab" activeClassName="NavTabActive">בקשות לעזרה</NavLink>
                                </React.Fragment>
                            }
                        </Tabs>

                    }
                </div >
                <HeaderSubCon >
                    {props.auth.isAuthenticated && (window.innerWidth >800) && <label>{props.auth.user.firstName+" "+props.auth.user.lastName} | </label>}
                  <Link to={props.auth.isAuthenticated ? "/logout":"/login"}>
                    <label >{props.auth.isAuthenticated ? " התנתקות ":" התחברות "}</label>
                  </Link>
                </HeaderSubCon>
            </SubCon>
        </HeaderCon>
    )
}


const ToProps = (state,props) => {
    return {
        auth: state.auth
    }
}
export default connect(ToProps)(Header);

const Tabs = styled.div`
    display:flex;
    margin-right:2rem;
    @media(max-width:500px){
        margin:0;
    }
`

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
        a{
            label{
                font-size:16px;
            }
        }
        
    }
    img{
        width:2.5rem;
        padding:10px 0;
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
    a{
        cursor:pointer;
        label{
            margin-right:.5rem;
        }
    }
`

const SubCon = styled.div`
    max-width:1366px;
    margin:auto;
    display:flex;
    justify-content:space-between;
    padding:0 1rem;
    @media(max-width:450px){
        padding:0 1rem;
    }
`
