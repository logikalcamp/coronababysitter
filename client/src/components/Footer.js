import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

export const Footer = () => {
    return(
        <FooterCon>
            <SubCon>
                <div>
                    <img src={window.location.origin + "/images/logo.png"} alt="logo" style={{width:"150px",height:"50px"}}/>
                </div>
                <div>
                    <a href="/mail"><img src={window.location.origin + "/images/mail.png"} alt="mail"/></a>
                    <a href="https://www.facebook.com/RuthVrobel/"><img src={window.location.origin + "/images/facebook.png"} alt="facebook"/></a>
                    <a id="phonem" href="tel:+972526384738"><img src={window.location.origin + "/images/phone.png"} alt="instagram"/></a>
                    <a id="phonedesktop" href="tel:+972526384738"><img src={window.location.origin + "/images/phone.png"} alt="instagram"/></a>
                    <a href="https://www.youtube.com/channel/UCkjW1hsjTfcOpcrj2sQeXFQ/featured"><img src={window.location.origin + "/images/youtube.png"} alt="instagram"/></a>
                </div>
                <div>
                    <NavLink to="/policy">תקנון שימוש</NavLink>
                </div>
            </SubCon>
        </FooterCon>
    )
}

const FooterCon = styled.div`
    /* bottom:0;
    position:absolute;
    left:0;
    right:0; */
    /* display:flex;
    justify-content:space-around; */
    background:#ffffff;
    padding:.5rem 1rem;
    border-top:1px solid #828282;
    img{
        width:28px;
        height:28px;
        margin:0 10px;
    }
    #phonem{
        display:none
    }
    #phonedesktop{
        display:flex;
    }
    @media(max-width:900px){
        #phone{
            display:flex;
        }
        #phonedesktop{
            display:none
        }
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