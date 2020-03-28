import React,{useState,useEffect} from 'react'
import {BASE_URL} from '../constants'
import axios from 'axios'
import styled from 'styled-components'
import Searchi from './Searchbox'
import _ from 'lodash'
import GeoMasking from '../utils/geoMasking'


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

const SelectInput = ({text,state,keq,opt,functio,ke})=>{
    const [err,setErr] = useState('')
    console.log(state,state[ke],keq)
    return(
        <InCon>
            <label>{text}</label>
            <select 
            style={{border: (err!="" ? "red 1px solid" : "1px solid #828282")}}
             value={state[ke][keq].isFemale} onChange={(e)=>{
                        let m = {...state}
                        m[ke][keq].isFemale = e.target.value 
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
const Text = ({text,state,functio,ke}) => {
    const [err,setErr] = useState('')
    return(
        <InCon>
            <label>{text}</label>
            <input 
            style={{border: (err!="" ? "red 1px solid" : "1px solid #828282")}}
            value={state[ke]} onChange={(e)=>{
                let d = {...state}
                d[ke] = e.target.value
                functio(d)
            }} type={ke=="phone" || ke=="tz" ? "number":"text"}/>
            {err !="" && <label style={{color:"red"}}>{err}</label>}
        </InCon>
    )
}

const CompleteDoctor = (props) => {
    const id = props.match.params.id
    const [loader,setLoader] = useState(true)
    const [error,setError] = useState(false)
    const [details,setState] = useState({})
    const [children,setChildren] = useState(1)

    useEffect(() => {
        console.log(id)
        axios.get(BASE_URL+`/api/doctor/${id}`)
        .then(res=>{
            let d = {...res.data}
            d["children"] = [{age:0,isFemale:0}]
            d["hobbies"] = []
            setState(d)
            setLoader(false)
            console.log(res.data)
            if(_.isEmpty(res.data)  ){
                setError(true)
            }else{
                if(res.data.address ){
                    setError(true)
                }
            }
        })    
    }, [])

    useEffect(()=>{
        console.log(details)
    },[details])

    const handleChangeCenter =(lat,lng,address) =>{
        let b = GeoMasking(lat,lng)
        let d = {...details}
        d["lat"] = b.geometry.coordinates[0]
        d["long"] = b.geometry.coordinates[1]
        d["address"] = address
        let city = address.split(',')
        d["city"] = city[1].replace(" ","")
        // let a = {...errors}
        // delete a["address"]
        // setError(a)
        setState(d)
    }

    const childrens = (amount) => {
        let d =[]
        for(let i =0;i<amount;i++){
            d.push( 
                <React.Fragment>
                    <label>ילד {i+1}</label>
                    <Child>
                        <InCon>
                            <label >גיל הילד</label>
                            <input value={details.children[i].age} type="number" onChange={(e)=>{
                                let d ={...details}
                                d.children[i].age = e.target.value
                                setState(d)
                            }}/>
                        </InCon>
                        <SelectInput  keq={i} text={"מין"} opt={["יש לבחור","זכר","נקבה"]} state={details} functio={setState} ke={"children"}/>
                    </Child>
                </React.Fragment>
            )
        }
        return d
    }

    const onBlur = () => {
        console.log("asd")
    }
    return (
        
        <React.Fragment>
        {error ? 
            <div>
                היי , קרתה שגיאה והלינק התחברות שגוי , אנא פנה/י לחמ"ל לבדיקה חוזרת 
                050222222222222
            </div>
            :
            <React.Fragment>
                {
                    loader ? 
                    <div>loading</div>
                    :
                    <SignupCon amount={children}>
                        <h2>השלמת התחברות</h2>
                        <h1> היי {details.firstName} , כיף שחזרת !</h1>
                        <SignupForm>
                            <InCon>
                                <label>כתובת</label>
                                <Searchi shay={handleChangeCenter}/>
                            </InCon>
                            <InCon>
                                <label>כמות ילדים</label>
                                <input type="number" value={children} onChange={(e)=>{
                                    setChildren(e.target.value)
                                    let chi = []
                                    for(let i =0;i<e.target.value;i++){
                                        chi.push({age:0,isFemale:0})
                                    }
                                    let st = {...details}
                                    st["children"] = chi
                                    setState(st)
                                }}/>
                            </InCon>
                            <div >
                                {
                                    childrens(children)
                                }
                            </div>
                            <Tags text={"תחומי עניין של הילדים"} state={details} functio={setState} ke={"hobbies"}/>
                            <Text text={"הערות נוספות"} state={details} functio={setState} ke={'comments'}/>
                            <div>
                                <Butt 
                                // disabled={!_.isEmpty(errors)}
                                // s={!_.isEmpty(errors)}
                                onClick={()=>{
                                    let data ={...details}
                                    delete data._id
                                    delete data.isApproved
                                    // data.id = id
                                    console.log(data)
                                    axios.put(BASE_URL+`/doctor/create/${id}`,data)
                                    .then(res=>{
                                        console.log(res)
                                    })
                                }}>סיים</Butt>
                            </div>
                        </SignupForm>
                    </SignupCon>
                }
            </React.Fragment>
            }
        </React.Fragment>
    )
}

export default CompleteDoctor;


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
    height:${props=>props.amount >= 3 ? "unset":"100%"};
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
    @media(max-width:550px){
        width:unset;
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
    ${'' /* margin:auto; */}
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

const Child = styled.div`
    border:1px solid #828282;
    border-radius:10px;
    padding:2rem;
    margin:5px 0;
`