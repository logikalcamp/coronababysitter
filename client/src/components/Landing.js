import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios';


export const Landing = (props) => {
    // console.log(props)
    return(
        <LandingCon>
                <h1>ברוכים הבאים</h1>
                <p>
                מצב חירום! מחבקים את העורף הרפואי! 
                בואו נדאג יחד , לילדים של האנשים שדואגים לכולנו בימים אלו
                עמותת הקרן ע"ש רות ורובל בשיתוף עם אר"מ ביוזמה למען הצוותים הרפואיים העומדים בחזית -
                שירותי בייביסיטר התנדבותיים לצוותים הרפואיים במדינה
                </p>
                <h2>להצטרפות</h2>
                <div>
                    <img onClick={()=>props.history.push('/Registration/medical')} src={window.location.origin + '/images/1.png'} alt="" />
                    <img onClick={()=>props.history.push('/Registration/volunteer')} src={window.location.origin + '/images/2.png'} alt="" />
                </div>
        </LandingCon>
    )
}

const LandingCon = styled.div`
    display:flex;
    flex-direction:column;
    max-width:1366px;
    width:60%;
    ${'' /* align-items:center; */}
    margin:2rem auto auto auto;
    h1,h2,p{
        text-align:center;
    }
    h2{
        margin-top:3rem;
    }
    p{margin:0;}
    div{
        display:flex;
        justify-content:space-around;
        width:80%;
        margin:1rem auto;
    }
    button{
        background:#00C2CB;
        border:none;
        padding:1rem ;
        border-radius:5px;
        color:white;
        font-weight:bold;
        cursor:pointer;
    }
    img{
        height:12rem;
        width:12rem;
        cursor:pointer;
    }
    button:hover{
        background:#23898e;
    }

    @media(max-width:450px){
        width:80%;
  
        button{
            margin:0 5px;
        }
        img{
            height:10rem;
            width:10rem;
        }
        div{
            width:100%;
            margin:auto;
        }
    }
`