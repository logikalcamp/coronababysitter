import React,{useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {BASE_URL} from '../constants'

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


const Text = ({text,value}) => {
    return(
        <InCon>
            <label>{text}</label>
            <input value={value} type="text"/>
        </InCon>
    )
}

const SelectInput = ({text,value})=>{
    return(
        <InCon>
            <label>{text}</label>
            <input value={value} type="text"/>
        </InCon>
    )
}

const Checkbox = ({text,value}) => {
    return(
        <InCon>
            <label>{text}</label>
            <input value={value} type="checkbox"/>
        </InCon>
    )
}

const Tags = ({text,value}) => {
    return (
        <InCon>
            <label>{text}</label>
            <input value={value} type="text"/>
        </InCon>
    )
}

export const Signup = (props) => {
    const [type,setType] = useState(props.match.params.type)
    const [step,setStep] = useState(1)
    console.log(props)
    return(
            <SignupCon>
                <h2 onClick={()=>{
                    axios.post(BASE_URL+'/api/getimage',{url:"https://www.facebook.com/aviram.roisman"})
                    .then(res=>console.log(res))
                }}>להצטרפות</h2>
                <h1>{type == "medical" ? "אני צוות רפואי":"אני מתנדב.ת"}</h1>
                <Stepper amount={2} step={step}/>
                <SignupForm>
                {
                    step == 1 && 
                    <section>
                        <Text text={"שם פרטי"} value={""} />
                        <Text text={"שם משפחה"} value={""} />
                        <Text text={"ת.ז"} value={""} />
                        <Text text={"גיל"} value={""} />
                        <Text text={"מייל"} value={""} />
                        <Text text={"מספר טלפון"} value={""} />
                        <Checkbox text={"מגדר"} value={""} />

                    </section>
                }
                {
                    step == 2 && 
                    <section>
                        <Text text={"מסלול לימודים"} value={""} />
                        <Text text={"מוסד לימודים"} value={""} />
                        <Text text={"חשבון פייסבוק"} value={""} />
                        <Text text={"הערות נוספות"} value={""} />
                        <Tags text={"תחומי עניין"} value={[]}/>
                    </section>
                }
                
                </SignupForm>
                <Buttons step={step}>
                    {step != 1 && <button onClick={()=>setStep(step-1)}>הקודם</button>}
                    {step != 2 && <button onClick={()=>setStep(step+1)}>הבא</button>}
                    {step == 2 && <button onClick={()=>alert("סיימת בהצלחה")}>סיים</button>}
                </Buttons>
            </SignupCon>    
        )
} 

const SignupCon = styled.div`
    max-width:1366px;
    margin:1rem auto ;
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
const InCon = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    margin-bottom:1rem;
    input{
        width:80%;
    }
`