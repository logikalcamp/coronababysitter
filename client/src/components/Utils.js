import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

export const Text = ({text,state,functio,blur,ke}) => {
    const [err,setErr] = useState('')
    return(
        <InCon>
            <label>{text}</label>
            <input 
            style={{border: (err!="" ? "red 1px solid" : "1px solid #828282")}}
            value={state[ke]} onBlur={()=>blur(setErr,ke,state,text)} onChange={(e)=>{
                let d = {...state}
                d[ke] = e.target.value
                functio(d)
            }} type={ke=="phone" || ke=="tz" ? "number":"text"}/>
            {err !="" && <label style={{color:"red"}}>{err}</label>}
        </InCon>
    )
}

export const SignupCon = styled.div`
    max-width:1366px;
    padding:1rem;
    height:100%;
    width:100%;

    margin:auto;
    section{
        /* height:31rem; */
    }
    h2{
        margin:0;
    }
    h1{
        margin:0;
    }
    button{
        font-size:18px;
    }
   
`

export const InCon = styled.div`
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

const errorRules = {
    birthday: "date",
    profession: "must",
    address: "must",
    tz: "tz",
    facebook: "must",
    phone: "phone",
    name: "must",
    lastName:"must",
    institute: "must",
    email: "email",
    isFemale:"gender"
}

export const onBlur = (setErr,ke,state,text, details) => {
    switch(errorRules[ke]){
        case "must":
            // check min 2 char
            if(details[ke].length < 2){
                setErr(text + " זה שדה חובה")
                let a = {...errors}
                a[ke] = true
                setError(a)
            }else{
                setErr('')
                let a = {...errors}
                delete a[ke]
                setError(a)
            }
            break;
        case "date":
            //check date
            let parts = details[ke].split("/")
            if(parseInt(parts[0]) < 0 || parseInt(parts[0]) >31 || parseInt(parts[1]) < 1 ||  parseInt(parts[1]) > 12 ||  parseInt(parts[2]) < 1940 ||  parseInt(parts[2]) > 2002 || !Number.isInteger(parseInt(parts[0]))|| !Number.isInteger(parseInt(parts[1])) || !Number.isInteger(parseInt(parts[2])) ){
                setErr(text + " לא תקין")
                let a = {...errors}
                a[ke] = true
                setError(a)       
            }
            else{
                setErr('')
                let a = {...errors}
                delete a[ke]
                setError(a)
            }
            break;
        case "tz":
            //min 8 max 9
            if(details[ke].length < 8 || details[ke].length > 9){
                setErr(text + " לא תקינה")
                let a = {...errors}
                a[ke] = true
                setError(a)
            }else{
                setErr('')
                let a = {...errors}
                delete a[ke]
                setError(a)
            }
            break;
        case "phone":
            //min 8
            if(details[ke].length != 10 ){
                setErr(text + " לא תקין")
                let a = {...errors}
                a[ke] = true
                setError(a)
            }else{
                setErr('')
                let a = {...errors}
                delete a[ke]
                setError(a)
            }
            break;
        case "email":
            //email format
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(String(details[ke]).toLowerCase())){
                setErr("פורמט "+text+" לא תקין")
                let a = {...errors}
                a[ke] = true
                setError(a)
            }
            else{
                setErr('')
                let a = {...errors}
                delete a[ke]
                setError(a)
            }
            break;
        case "gender":
            //gender format
            if(details[ke]== 0){
                setErr("יש לבחור "+text)
                let a = {...errors}
                a[ke] = true
                setError(a)
            }
            else{
                setErr('')
                let a = {...errors}
                delete a[ke]
                setError(a)
            }
            break;
    }
}