import React from 'react'
import styled from 'styled'

const Login = () => {
    return(
        <React.Fragment>
            <SignupCon>
                <h2>להצטרפות</h2>
                <h1>{type == "medical" ? "אני צוות רפואי":"אני מתנדב.ת"}</h1>
                {type!="medical" && <Stepper amount={2} step={step}/>}
                <SignupForm>
                </SignupForm>
            </SignupCon>
        </React.Fragment>
    )
}

export default Login;