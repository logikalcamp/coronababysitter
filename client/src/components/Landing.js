import React from 'react'
import styled from 'styled-components'

export const Landing = (props) => {
    console.log(props)
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
                <p>יש למלא פרטים ואז לאחר אימות יישלח לינק למערכת</p>
                <div>
                    <button onClick={()=>props.history.push('/signup/volunteer')}>אני רוצה להתנדב</button>
                    <button onClick={()=>props.history.push('/signup/medical')}>אני צוות רפואי</button>
                </div>
        </LandingCon>
    )
}

const LandingCon = styled.div`
    display:flex;
    flex-direction:column;
    max-width:1366px;
    width:80%;
    align-items:center;
    margin:auto;
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
        margin:3rem auto;
    }
    button{
        background:#8412A1;
        border:none;
        padding:1rem ;
        border-radius:5px;
        color:white;
        font-weight:bold;
        cursor:pointer;
    }
    button:hover{
        background:#a745bf;
    }
`