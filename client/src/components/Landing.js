import React from 'react'
import styled from 'styled-components'

export const Landing = (props) => {
    console.log(props)
    return(
        <LandingCon>
                <h1>ברוכים הבאים</h1>
                <p>בלה בלה בלה בלה בלה בלה בלה בלה בלה בלה בלה בלה בלה בלה בלה בלה</p>
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
    max-width:1330px;
    width:80%;
    align-items:center;
    margin:auto;
    h1,h2,p{
        text-align:center;
    }
    div{
        display:flex;
        justify-content:space-around;
        width:80%;
        margin:auto;
    }
`