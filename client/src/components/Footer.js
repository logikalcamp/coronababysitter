import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

export const Footer = () => {
    return(
        <FooterCon>
            <SubCon>
                <div>
                    <img src={window.location.origin + "/images/logo.png"} alt="logo" style={{width:"25px",height:"25px"}}/>
                    <label>בייבי קורונה 2020</label>
                </div>
                <div>
                    <a href="/mail"><img src={window.location.origin + "/images/mail.png"} alt="mail"/></a>
                    <a href="/facebook"><img src={window.location.origin + "/images/facebook.png"} alt="facebook"/></a>
                    <a href="/instagram"><img src={window.location.origin + "/images/instagram.png"} alt="instagram"/></a>
                </div>
                <div>
                    <NavLink to="/policy">תנאים</NavLink>
                    <span>&bull;</span>
                    <NavLink to="/privacy">פרטיות</NavLink>
                </div>
            </SubCon>
        </FooterCon>
    )
}

const FooterCon = styled.div`
    bottom:0;
    display:flex;
    justify-content:space-around;
    left:0;
    position:absolute;
    padding:1rem;
    right:0;
    border-top:1px solid #828282;
    img{
        width:28px;
        height:28px;
        margin:0 10px;
    }
`


const SubCon = styled.div`
    max-width:1366px;
    margin:auto;
    width:100%;
    display:flex;
    justify-content:space-around;
    div,a{
        display:flex;
        align-items:center;
        font-size:18px;
        color:#AEAEAE;
        text-decoration:none;
    }
    span{
        margin: 0 5px;
    }
`