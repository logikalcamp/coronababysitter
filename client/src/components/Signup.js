import React,{useState} from 'react'
import styled from 'styled-components'

const Stepper = ({step,amount}) => {
    let steps = []
    for(let i = 0;i<amount;i++){
        steps.push(<Step active={i+1==step} key={i}></Step>)
    }
    return(
        <StepperCon>
            {steps}
        </StepperCon>
    )
}


export const Signup = (props) => {
    const [type,setType] = useState(props.match.params.type)
    const [step,setStep] = useState(1)
    console.log(props)
    return(
            <SignupCon>
                <h2>להצטרפות</h2>
                <h1>{type == "medical" ? "אני צוות רפואי":"אני מתנדב.ת"}</h1>
                <Stepper amount={3} step={step}/>
                <SignupForm>
                {
                    step == 1 && 
                    <section>
                        <div>
                            <label>step 1</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                    </section>
                }
                {
                    step == 2 && 
                    <section>
                        <div>
                            <label>step 2</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                    </section>
                }
                {
                    step == 3 && 
                    <section>
                        <div>
                            <label>step 3</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                    </section>
                }              
                </SignupForm>
                <Buttons step={step}>
                    {step != 1 && <button onClick={()=>setStep(step-1)}>הקודם</button>}
                    {step != 3 && <button onClick={()=>setStep(step+1)}>הבא</button>}
                    {step == 3 && <button onClick={()=>alert("סיימת בהצלחה")}>סיים</button>}
                </Buttons>
            </SignupCon>    
        )
} 

const SignupCon = styled.div`
    max-width:1330px;
    margin:auto 1rem;
    h2{
        margin-bottom:0;
    }
    h1{
        margin:0;
    }
`

const Step = styled.div`
    width:1rem;
    height:1rem;
    border-radius:50px;
    margin:10px;
    background:${props => props.active ? "#8412A1":"#828282"};
`

const StepperCon = styled.div`
    display:flex;
    justify-content:center;
`

const SignupForm = styled.div`
    width:40%;
    margin:auto;
    display:flex;
    flex-direction:column;
    div{
        display:flex;
        flex-direction:column;
    }
`
const Buttons = styled.div`
    width:40%;
    margin:auto;
    display:flex;
    justify-content:${props=>props.step ==1 ? "flex-end":"space-between"}
`