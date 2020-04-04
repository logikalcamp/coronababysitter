import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {BASE_URL} from '../constants'
import {connect} from 'react-redux'
import {loginUser} from '../actions/auth'

const styles = makeStyles(theme => ({
    title1: {
        fontSize: '28px',
        marginBottom: '20px'
    },
    title2: {
        fontSize: '20px',
        textAlign: 'center'
    },
    loginImage: {
        width: '200px'
    },
    errorText: {
        border: '1px solid red',
        outlineColor:'red'
    }
}));

const Login = (props) => {
    const classes = styles();
    const history = useHistory();

    const [loginDetails,setLoginDetails] =  useState({})
    const [isDoctorLogin, setIsDoctorLogin] = useState(false)
    const [email, setEmail] = useState('');
    const [isValidEmailFormat, setIsValidEmailFormat] = useState(false);
    const [error, setError] = useState('');
    const [loginState, setLoginState] = useState('email')
    const [code, setCode] = useState('')
    const [isCodeValid, setIsCodeValid] = useState(false)
    const [modalData, setModalData] = useState({
        open: false,
        title: 'כותרת ראשית',
        secondaryTitle: 'כותרת משנית',
        button: {text: '', action: () => {}}
    })

    const toggleModal = (open, title= '', secondaryTitle= '', button ={}) => {
        setModalData({open, title,secondaryTitle, button});
    }

    const showMessageWithClose = (title1, title2) => {
        toggleModal(true, title1, title2, 
        {
            text:'סגור', 
            action :() => {
                toggleModal(false)
            }
        });
    }

    const login = async () => {
        if(!isValidEmailFormat) return;

        var loginApi = isDoctorLogin ? 'doctor' : 'volunteer';

        try {
            var response = await axios.post(BASE_URL + `/api/${loginApi}/loginemail`, {email: email.toLowerCase()});
            if(response.data == "E-1") {
                showMessageWithClose('מייל שגוי', 'מייל לא נמצא במערכת');
            }
            else if(response.data == "E-2") {
                showMessageWithClose('אימות', 'משתמש עדיין לא עבר אימות של החמ"ל');
            }
            else if(response.data == "E-3") {
                showMessageWithClose('תהליך הרישום', 'תהליך הרישום עדיין לא הושלם');
            }
            else {
                setLoginState('code');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const confirmCode = async () => {
        if(!isCodeValid) return;
        
        var loginApi = isDoctorLogin ? 'doctor' : 'volunteer';

        try {
            var response = await axios.post(BASE_URL + `/api/utils/login-user`, {email,code});

            if(response.data.valid) {
                let data = response.data.user
                if(isDoctorLogin) {
                    data.type = "medical"
                }
                else{
                    data.type = "volunteer"
                }
                props.dispatch(loginUser(data))
                if(isDoctorLogin) {
                    history.push("/medicalhome");
                }
                else {
                    history.push("/volunteer-homepage");
                }
            }
            else {
                showMessageWithClose('קוד שגוי', 'אנא וודא שוב שהקוד שהזנת תקין');
            }
        }
        catch (error) {
            toggleModal(true, 'התרחשה שגיאה', 'הצוות דואג לזה, לא לדאוג', 
            {
                text:'סגור', 
                action :() => {
                    toggleModal(false)
                }
            });
        }
    }

    var timeout = undefined;

    const checkCodeValid = (code) => {
        if(!code) return;

        if(code.length == 6 && !isNaN(code)) {
            setIsCodeValid(true);
            setError('');
            setCode(parseInt(code));
        }
        else {
            setError("הקוד לא תקין");
            setIsCodeValid(false);
            setCode('');
        }
    }

    const checkEmailFormat = (email) => {
        if(timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout((() => {
            if(!email || email == '') {
                setError(false)
            }
    
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(String(email).toLowerCase())){
                setError("האימייל שהזנת אינו תקין");
                setIsValidEmailFormat(false);
            }
            else {
                setEmail(email);
                setError('');
                setIsValidEmailFormat(true);
            }
        }).bind(this), 350)
    }

    const performAction = () => {
        if (loginState == 'email') {
            login();
        }
        else {
            confirmCode();
        }
    }

    return(
        <div style={{height:"100%"}}>
            <Link to="/" ><Background /></Link>
            <Container>
                <ModalBackdrop open={modalData.open}>
                    <Modal open={modalData.open}>
                        <ContainerTitle>
                            <div className={classes.title1}>{modalData.title}</div>
                            <div className={classes.title2}>{modalData.secondaryTitle}</div>
                        </ContainerTitle>
                        <Button onClick={() => modalData.button.action()}>{modalData.button.text}</Button>
                    </Modal>
                </ModalBackdrop>
                <LoginDetailsContainer>
                    <img className={classes.loginImage} src={window.location.origin + "/images/login.png"}></img>
                    <ContainerTitle>
                        <div className={classes.title1}>{loginState == 'email' ? 'אהלן!' : 'מצוין!'}</div>
                        <div className={classes.title2}>{loginState == 'email' ? 'כיף לראות שחזרת, הזנ.י אימייל להתחברות' : 'עוד מספר שניות תקבל.י קוד למייל'}</div>
                        {loginState == 'email' && (
                            <Toggle>
                                <ToggleOption selected={!isDoctorLogin} onClick={() => {setIsDoctorLogin(false)}}>
                                    מתנדב
                                </ToggleOption>
                                <ToggleOption selected={isDoctorLogin} onClick={() => {setIsDoctorLogin(true)}}>
                                    צוות רפואי
                                </ToggleOption>
                                {window.innerWidth > 800 && <ToggleHighlight left={isDoctorLogin} className={classes.selected}></ToggleHighlight>}
                            </Toggle>
                        )}
                    </ContainerTitle>
                    
                        { loginState == 'email' && (
                            <InputField>
                                <InputLabel>אימייל</InputLabel>
                                <Text className={!isValidEmailFormat && error!='' ? classes.errorText : ''} onChange={(e) => checkEmailFormat(e.target.value)}></Text>
                                <ErrorLabel>{error}</ErrorLabel>
                            </InputField>
                        )}
                        { loginState == 'code' && (
                            <InputField>
                                <InputLabel>קוד אימות</InputLabel>
                                <Text className={!isCodeValid && error!='' ? classes.errorText : ''} onChange={(e) => checkCodeValid(e.target.value)}></Text>
                                <ErrorLabel>{error}</ErrorLabel>
                            </InputField>
                        )}
                    <Button onClick={() => performAction()}>{loginState == 'email' ? 'שלח' : 'המשך'}</Button>
                </LoginDetailsContainer>
            </Container>
        </div>
    )
}

const ToProps = (state,props) => {
    return {
        auth: state.auth
    }
}
export default connect(ToProps)(Login);

const LoginDetailsContainer = styled.div`
    width: 410px;
    height: 530px;
    padding: 25px;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:white;
    box-shadow: 3px 3px 18px gray;
    border-radius: 8px;
    @media(max-width:800px){
        width:350px;
    }
`

const InputField = styled.div`
    width: 100%;
    display: flex;
    align-items:flex-start;
    justify-content: center;
    margin-bottom: 20px;
    flex-direction: column
`

const InputLabel = styled.div`
    font-size: 18px;
    display:flex;
    algin-items:center;
    text-align:center;
    justify-content: center;
    flex-direction: column;
`

const ErrorLabel = styled.div`
    font-size: 16px;
    display:flex;
    algin-items:center;
    text-align:center;
    justify-content: center;
    flex-direction: column;
    color: red;
    clear:both;
    height: 20px;
`

const Text = styled.input`
    padding:0.5rem;
    border-radius:5px;
    border:1px solid #828282;
    outline-color:#00C2CB ;
    width: 375px;
    @media(max-width:800px){
        width:100%;
    }
`

const Button = styled.div`
    width: 100px;
    height: 35px;
    background-color: #00C2CB;
    display:flex;
    align-items:center;
    justify-content:center;
    color:whitesmoke;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 400;
    cursor:pointer;
`

const ContainerTitle = styled.div`
    margin-bottom: 30px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const ToggleHighlight = styled.div`
    background-color: rgba(0,194,203,0.3);
    position: absolute;
    top: 0px;
    width: 90px;
    height: 50px;
    clear:both;
    border-radius: 8px;

    animation: ${props => props.left ? "toggle-left 0.5s forwards" : "toggle-right 0.5s forwards"};
    -webkit-animation: ${props=> props.left ? "toggle-left 0.5s forwards" : "toggle-right 0.5s forwards"};

    @keyframes toggle-left {
        0% {left: 90px; }
        100% { left: 0px; }
    }
    
    @-webkit-keyframes toggle-left {
        0% {left: 90px; }
        100% { left: 0px; }
    }
        
    @keyframes toggle-right {
        0% { left:0px; }
        100% { left: 90px }
    }
    
    @-webkit-keyframes toggle-right {
        0% { -webkit-transform: translateX(0%); }
        100% { -webkit-transform: translateX(-100%); }
    }
`

const Toggle = styled.div`
    width: 175px;
    display:flex;
    margin: 20px 0px 20px 0px;
    border: 1px solid #00C2CB;
    border-radius: 8px;
    overflow:hidden;
    position:relative;
`

const ToggleOption = styled.div`
    flex:1;
    display: flex;
    justify-content: center;
    align-items:center;
    text-align:center;
    cursor: pointer;
    height: 50px;
    padding: 0px 5px 0px 5px;
    background-color:transparent;
    @media(max-width:800px){
        background:${props=>props.selected ? "rgba(0,194,203,0.3)":"transparent"}
    }
`

const ModalBackdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.35);
    top: 0;
    left: 0;
    display:${props=>props.open ? "flex":"none"};
    justify-content: center;
    align-items: center;
    z-index:1000;
`

const Modal = styled.div`
    width: 550px;
    background-color:white;
    height: 150px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px gray;
    padding: 15px;
    display:${props=>props.open ? "flex":"none"};
    flex-direction: column;
    align-items:center;
    justify-content:space-between;
    @media(max-width:800px){

}
`
const Background = styled.div`
    position:fixed;
    top:0;
    background:black;
    left:0;
    right:0;
    bottom:0;
    z-index:2;
    opacity:0.3;
`
const Container = styled.div`
    position:fixed;
    top:50%;
    left:50%;
    margin-left:-205px;
    margin-top:-265px;
    z-index:5;
    background:white;
    border-radius:20px;
    @media(max-width:800px){
        margin-left:-200px;
    }
`