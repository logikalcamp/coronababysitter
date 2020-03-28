import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {BASE_URL} from '../constants'
import moment from 'moment'
import Searchi from './Searchbox'
import _ from 'lodash'
import GeoMasking from '../utils/geoMasking'

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



const SelectInput = ({text,state,opt,functio,ke,blur})=>{
    const [err,setErr] = useState('')
    return(
        <InCon>
            <label>{text}</label>
            <select 
            style={{border: (err!="" ? "red 1px solid" : "1px solid #828282")}}
             onBlur={()=>{
                console.log("bluring")
                blur(setErr,ke,state,text)}} value={state[ke]} onChange={(e)=>{
                        let m = {...state}
                        m[ke] = e.target.value 
                        console.log(m)
                        functio(m)
            }}>
                {opt.map((x,i)=>{
                    return(<option key={i} value={x == "זכר" ? false : (x=="נקבה" ? true : 0)}>{x}</option>)
                })}
            </select>
            {err !="" && <label style={{color:"red"}}>{err}</label>}
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
    const [hob,setHob] = useState(["מוזיקה","בישול","ציור","ריקוד","ספורט"])
    return (
        <InCon >
            <label>{text}</label>
            <div >
                <div style={{display:"flex",flexWrap:"wrap",flexDirection: "unset"}}>
                {hob.map((x)=>{
                    return (
                        <React.Fragment>
                            <Chosen 
                            chosen={(state[ke].includes(x))}
                            onClick={()=>{
                                if(state[ke].includes(x)){
                                    console.log("a")
                                    let i = state[ke].indexOf(x)
                                    console.log(i)
                                    let d = {...state}
                                     d[ke].splice(i,1)
                                    functio(d)
                                }
                                else{
                                    console.log("b")
                                    let all = {...state}
                                    all[ke].push(x)
                                    functio(all)
                                }
                            }}>{x}</Chosen>
                            <input value={state[ke].includes(x)} type="checkbox" style={{display:"none"}} />
                        </React.Fragment>
                    )
                })}
                </div>
                <input placeholder="אחר" type="text"
                onBlur={(e)=>{
                    if(e.target.value!=''){
                        let all = {...state}
                        all[ke].push(e.target.value)

                        setHob([...hob,e.target.value])
                        functio(all)
                        e.target.value=""
                    }
                }}
                 onKeyDown={(e)=>{
                     if(e.key=="Enter" && e.target.value!=""){
                        e.preventDefault()
                        let all = {...state}
                        all[ke].push(e.target.value)
                        setHob([...hob,e.target.value])
                        functio(all)
                        e.target.value=""
                    }
                }}></input>
            </div>
        </InCon>
    )
}

const Text = ({text,state,functio,blur,ke}) => {
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

const Dates = ({text,state,functio,blur,ke}) => {
    const [err,setErr] = useState('')
    return(
        <InCon>
            <label>{text}</label>
            <input 
            placeholder={"DD/MM/YYYY"}
            style={{border: (err!="" ? "red 1px solid" : "1px solid #828282")}}
            value={state[ke]} onBlur={()=>blur(setErr,ke,state,text)} onChange={(e)=>{
                let d = {...state}

                if(e.target.value.length == 11){

                }else{
                    if(e.target.value.length == 2){
                        d[ke] = e.target.value + "/"
                    }else{
                        if(e.target.value.length == 3 && e.target.value[2] == "/"){
                            d[ke] = e.target.value.slice(0,-1)
                        }else{
                            if(e.target.value.length == 5){
                                d[ke] = e.target.value + "/"
                            }else{
                                if(e.target.value.length ==6 && e.target.value[5] == "/"){
                                    d[ke] = e.target.value.slice(0,-1)
                                }else{
                                    d[ke] = e.target.value
                                }
                            }
                        }
                    }
                }
                functio(d)
            }} type="text"/>
            
            {err !="" && <label style={{color:"red"}}>{err}</label>}
        </InCon>
    )
}

const Agreement = ({text,obj,setObj,ke,err,setErr}) =>{
    return (
        <div style={{maxWidth:"80%",margin:"auto"}}>
            <label>{text}</label>
            <p>אני מודע כי עמותת הקרן ע"ש רות וורובל היא, מנהליה, עובדיה (יחד, "הקרן") היא רק גורם מקשר בין המתנדבים לבין הפונים לקבלת מענים. ידוע לי כי הקרן לא תישא בכל אחריות כלפיי בגין נזק כלשהו (לרבות נזק ישיר, עקיף או תוצאתי) הנגרם עקב התנדבותי, לרבות נזק הנובע מפעילותי, וכי לא תהינה לי תביעות, דרישות או טענות כנגד הקרן או מי מטעמה בנוגע לנזקים כלשהם.</p>
            <div>
                <input
                type="checkbox" checked={obj} onChange={()=>{
                    setObj(!obj)
                    if(!obj){
                        let a = {...err}
                        delete a[ke]
                        setErr(a)
                    }else{
                        let a = {...err}
                        a[ke] = true
                        setErr(a)
                    }  
                }}/>
                <label>אני מאשר.ת את הסכם השימוש</label>
            </div>
        </div>
    )
}

export const Signup = (props) => {
    const [type,setType] = useState(props.match.params.type)
    const [step,setStep] = useState(1)
    const [step1,setStep1] = useState(false)
    const [img,setImg] = useState('')
    const [facebook,setFacebook] = useState('')
    const [details,setState] =  useState({})
    const [errors,setError] = useState({})
    const [agree,setAgreement] = useState(false)
    const [done,setDone] = useState(false)
    const [sent,setSent] = useState(true)

    useEffect(()=>{
        if(type=="medical"){
            setState({
                name:"",
                lastName:"",
                tz:"",
                institute:"",
                profession:"",
                email:"",
                phone:""   
            })
            setError({
                name:true,
                lastName:true,
                tz:true,
                institute:true,
                profession:true,
                email:true,
                phone:true
            })
        }
        else{
            setState({
                birthday: "",
                profession: "",
                address: "",
                lat:'',
                long:'',
                notes: "",
                city: "",
                tz: "",
                facebook: "",
                photo: "",
                phone: "",
                hobbies: [],
                isFemale:0,
                name: "",
                institute: "",
                email: "",
                lastName:""
            })
            setError({
                birthday: true,
                profession: true,
                address: true,
                tz: true,
                facebook: true,
                phone: true,
                name: true,
                lastName:true,
                institute: true,
                email: true,
                isFemale:true
            })
        }
    },[])

    const onBlur = (setErr,ke,state,text) => {
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

    useEffect(() => {
        console.log("boom",details.facebook)
        if(details.facebook!='' && details.facebook){
            axios.post(BASE_URL+'/api/getimage',{url:facebook})
            .then(res=>{
                setImg(res.data)
                console.log(res)})
        }
    }, [details.facebook])

    useEffect(() => {
        if(details.name=='' || details.lastName==''||details.tz==''||details.birthday==''||details.email==''||details.phone==''||details.gender=='יש לבחור'){
            setStep1(false)
        }else{
            setStep1(true)
        }
    }, [details])

    const handleChangeCenter =(lat,lng,address) =>{
        let b = GeoMasking(lat,lng)
        let d = {...details}
        d["lat"] = b.geometry.coordinates[0]
        d["long"] = b.geometry.coordinates[1]
        d["address"] = address
        let city = address.split(',')
        d["city"] = city[1].replace(" ","")
        let a = {...errors}
        delete a["address"]
        setError(a)
        setState(d)
    }

    return(
        <React.Fragment>
            <SignupCon>
                <h2>להצטרפות</h2>
                <h1>{type == "medical" ? "אני צוות רפואי":"אני מתנדב.ת"}</h1>
                {type!="medical" && <Stepper amount={2} step={step}/>}
                <SignupForm>
                {
                    step == 1 && 
                    <section>
                        <Text blur={onBlur} text={"שם פרטי"}  state={details} functio={setState} ke={'name'}/>
                        <Text blur={onBlur} text={"שם משפחה"}  state={details} functio={setState} ke={'lastName'}/>
                        <Text blur={onBlur} text={"ת.ז"} state={details} functio={setState} ke={"tz"} />
                        <Text blur={onBlur} text={"מייל"} state={details} functio={setState} ke={"email"}/>
                        <Text blur={onBlur} text={"מספר פלאפון"} state={details} functio={setState} ke={"phone"}/>
                        {type=="medical" ? 
                        <React.Fragment>
                            <Text blur={onBlur} text={"תפקיד"} state={details} functio={setState} ke={"profession"}/>
                            <Text blur={onBlur} text={"מקום עבודה"} state={details} functio={setState} ke={"institute"}/>
                            <Agreement err={errors} setErr={setError} text={"תנאי שימוש"} obj={agree} setObj={setAgreement} ke={"agreement"}/>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Dates blur={onBlur} text={"תאריך לידה"} state={details} functio={setState} ke={"birthday"}/>
                            <SelectInput blur={onBlur} text={"מין"} opt={["יש לבחור","זכר","נקבה"]} state={details} functio={setState} ke={"isFemale"}/>
                        </React.Fragment>
                        }
                        {step != 2 && type!="medical" &&<Butt   onClick={()=>setStep(step+1)}>הבא</Butt>}
                        {type=="medical" && <Butt 
                        disabled={!_.isEmpty(errors)}
                        s={!_.isEmpty(errors)}
                        onClick={()=>{
                            setDone(true)   
                        }}>סיים</Butt>}
                    </section>
                }
                {
                    step == 2 && type != "medical" &&
                    <section>
                        <Text blur={onBlur} text={"מסלול לימודים / מקצוע"} state={details} functio={setState} ke={'profession'} />
                        <Text blur={onBlur} text={"מוסד לימודים / מקום עבודה"}  state={details} functio={setState} ke={'institute'}/>
                        <InCon>
                            <label>כתובת</label>
                            <Searchi shay={handleChangeCenter}/>
                        </InCon>

                        <Text blur={onBlur} text={"לינק לפרופיל פייסבוק"} state={details} functio={setState} ke={"facebook"}/>

                        {img &&
                            <div style={{alignItems:"center"}}>
                                <img style={{width:"130px",height:"130px",margin:"auto"}} src={img} alt="profile" />
                                <input type='file'/>
                            </div>
                        }
                        <Text blur={onBlur} text={"הערות נוספות"} state={details} functio={setState} ke={'comments'}/>
                        <Tags text={"תחומי עניין"} state={details} functio={setState} ke={"hobbies"}/>
                        
                    </section>
                }
                
                </SignupForm>
                <Buttons step={step}>
                    {step != 1 && <button onClick={()=>setStep(step-1)}>הקודם</button>}
                    {step == 2 && <Butt 
                    disabled={!_.isEmpty(errors)}
                    s={!_.isEmpty(errors)}
                    onClick={()=>{
                        setDone(true)
                    }}>סיים</Butt>}
                    
                </Buttons>
            </SignupCon>    
            <Back open={done} onClick={()=>{setDone(false)
            window.location.href = '/'}
            }/>
            <Modal open={done}>
            {
                sent ? 
                <div>
                    <h2>שנייה לפני שמסיימים</h2>
                        <Agreement err={errors} setErr={setError} text={"תנאי שימוש"} obj={agree} setObj={setAgreement} ke={"agreement"}/>
                        {type=="medical" ? <Butt 
                        disabled={!agree}
                        s={!agree}
                        onClick={()=>{
                         axios.put(BASE_URL+'/api/doctor/register',details)
                         .then(res=>{
                             if(res.status == 200){
                                 setSent(false)
                             }
                         })
                           
                        }}>הירשם</Butt>
                        :
                        <Butt 
                        disabled={!agree}
                        s={!agree}
                        onClick={()=>{
                            let data = {...details}
                            data.birthday = new Date (moment(details.birthday,"DD/MM/YYYY").format())
                            console.log(data)
                            axios.put(BASE_URL+'/api/volunteer/register',data)
                            .then(res=>{
                                console.log(res)
                                if(res.status == 200){
                                    setSent(false)
                                }
                            })
                        }}>הירשם</Butt>
                        }
                </div>
                :
                <React.Fragment>
                    <h2>תודה על הרשמתך!</h2>
                    <p>הפנייה נקלטה , החמל בודק את בקשתך ותקבל מייל עדכון בקרוב</p>
                </React.Fragment>
            }            
            </Modal>
     </React.Fragment>
        )
} 

const Back = styled.div`

    opacity: 0.5;
    background: black; 
    z-index: 1000;
    display:${props=>props.open ? "block":"none"};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display:
`
const Modal = styled.div`
    position: fixed;
    display:${props=>props.open ? "block":"none"};
    top: 50%;
    z-index: 1010;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding:2rem;
    text-align:center;
    border-radius: 20px;
`

const SignupCon = styled.div`
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
    @media (max-width:900px) {
        width:80%;
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
    &:hover{
        background:${props=> props.s ? "#00C2CB":"#23898e" };
    }
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
    @media (max-width:900px) {
        width:80%;
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

const Chosen = styled.label`
    color:${props => props.chosen ? "#014649":"#828282"};
    background:${props=>props.chosen ? "#039BA3" :"#e2e2e2"} ;
    border:${props=>props.chosen ? "1px solid #00B5BD" :"0"} ;
    padding:0.5rem;
    border-radius:5px;
    margin:5px;
    cursor:pointer;

`