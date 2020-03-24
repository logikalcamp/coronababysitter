import React,{useState,useEffect} from 'react'
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




const SelectInput = ({text,state,opt,functio,ke})=>{
    return(
        <InCon>
            <label>{text}</label>
            <select value={state[ke]} onChange={(e)=>{
                        let m = {...state}
                        m[ke] = e.target.value 
                        functio(m)
            }}>
                {opt.map((x,i)=>{
                    return(<option key={i} value={x}>{x}</option>)
                })}
            </select>
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

const Tags = ({text,state,functio,ke}) => {
    return (
        <InCon>
            <label>{text}</label>
            <div style={{border:"1px solid #828282",flexDirection:"row",borderRadius:"5px",display:"flex"}}>
                {state[ke].map((x)=>{
                    return <div style={{padding:".2rem",background:"#e2e2e2",margin:"0 3px",borderRadius:"5px"}}>{x}</div>
                })}
                <input style={{border:"none",width:"100%",outline:"none"}} onKeyDown={(e)=>{
                    console.log(e.key)
                    if(e.key=="Enter"){
                        e.preventDefault()
                        console.log(e.target.value)
                        let d= {...state}
                        d[ke] = d[ke].concat([e.target.value])
                        functio(d)
                        e.target.value=""
                    }
                }} type="text"/>
            </div>
        </InCon>
    )
}

const Text = ({text,state,functio,ke}) => {
    return(
        <InCon>
            <label>{text}</label>
            <input value={state[ke]} onChange={(e)=>{
                let d = {...state}
                d[ke] = e.target.value
                functio(d)
            }} type="text"/>
        </InCon>
    )
}

export const Signup = (props) => {
    const [type,setType] = useState(props.match.params.type)
    const [step,setStep] = useState(1)
    const [step1,setStep1] = useState(false)
    const [img,setImg] = useState('')
    const [facebook,setFacebook] = useState('')
    const [details,setState] = useState({
        privateName:'',
        lastName:'',
        tz:'',
        birthday:'',
        email:'',
        phone:'',
        gender:'יש לבחור',
        institue:'',
        proffesion:'',
        facebook:'',
        comment:'',
        hobbies:[]
    })

    useEffect(() => {
        if(facebook!=''){
            axios.post(BASE_URL+'/api/getimage',{url:facebook})
            .then(res=>{
                setImg(res.data)
                console.log(res)})
        }
    }, [facebook])

    useEffect(() => {
        console.log(details)
        if(details.privateName=='' || details.lastName==''||details.tz==''||details.birthday==''||details.email==''||details.phone==''||details.gender=='יש לבחור'){
            setStep1(false)
        }else{
            setStep1(true)
            console.log("boom")
        }
        
    }, [details])


    return(
            <SignupCon>
                <h2>להצטרפות</h2>
                <h1>{type == "medical" ? "אני צוות רפואי":"אני מתנדב.ת"}</h1>
                <Stepper amount={2} step={step}/>
                <SignupForm>
                {
                    step == 1 && 
                    <section>
                        <Text text={"שם פרטי"}  state={details} functio={setState} ke={'privateName'}/>
                        <Text text={"שם משפחה"}  state={details} functio={setState} ke={'lastName'}/>
                        <Text text={"ת.ז"} state={details} functio={setState} ke={"tz"} />
                        <Text text={"גיל"} state={details} functio={setState} ke={"birthday"}/>
                        <Text text={"מייל"} state={details} functio={setState} ke={"email"}/>
                        <Text text={"מספר טלפון"} state={details} functio={setState} ke={"phone"}/>
                        <SelectInput text={"מין"} opt={["יש לבחור","זכר","נקבה"]} state={details} functio={setState} ke={"gender"}/>
                        {step != 2 && <Butt disabled={!step1} s={!step1} onClick={()=>setStep(step+1)}>הבא</Butt>}
                    </section>
                }
                {
                    step == 2 && 
                    <section>
                        <Text text={"מסלול לימודים"} state={details} functio={setState} ke={'profession'} />
                        <Text text={"מוסד לימודים"}  state={details} functio={setState} ke={'institue'}/>
                        <InCon>
                            <label>לינק לפרופיל פייסבוק</label>
                            <input type="text" value={facebook} onChange={(e)=>setFacebook(e.target.value)}/>
                        </InCon>
                        {img &&
                            <div style={{alignItems:"center"}}>
                                <img style={{width:"130px",height:"130px",margin:"auto"}} src={img} alt="profile" />
                                <input type='file'/>
                            </div>
                        }
                        <Text text={"הערות נוספות"} state={details} functio={setState} ke={'comments'}/>
                        <Tags text={"תחומי עניין"} state={details} functio={setState} ke={"hobbies"}/>
                    </section>
                }
                
                </SignupForm>
                <Buttons step={step}>
                    {step != 1 && <button onClick={()=>setStep(step-1)}>הקודם</button>}
                    
                    {step == 2 && <button onClick={()=>alert("סיימת בהצלחה")}>סיים</button>}
                </Buttons>
            </SignupCon>    
        )
} 

const SignupCon = styled.div`
    max-width:1366px;
    margin:1rem auto ;
    section{
        height:31rem;
    }
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
    background:${props => props.active ? "#00C2CB":"#828282"};
`

const StepperCon = styled.div`
    display:flex;
    justify-content:center;
`

const SignupForm = styled.div`
    width:30%;
    margin:auto;
    display:flex;
    flex-direction:column;
    div{
        display:flex;
        flex-direction:column;
    }

`

const Butt = styled.button`
    background:#00C2CB;
    border:none;
    padding:.5rem 1rem ;
    border-radius:5px;
    color:white;
    font-weight:bold;
    float:left;
    cursor:${props=> props.s ? "unset":"pointer" };
    opacity:${props=> props.s ? "0.5":"1" };
`
const Buttons = styled.div`
    width:30%;
    margin:auto;
    display:flex;
    justify-content:${props=>props.step ==1 ? "flex-end":"space-between"};
    button{
        background:#00C2CB;
        border:none;
        padding:.5rem 1rem ;
        border-radius:5px;
        color:white;
        font-weight:bold;

    }
`
const InCon = styled.div`
    margin:auto;
    display:flex;
    flex-direction:column;
    margin-bottom:1rem;
    input,select{
        padding:0.5rem;
        border-radius:5px;
        border:1px solid #828282;
        outline-color:#00C2CB ;
        option{
            padding:.5rem 0;
        }
    }

`