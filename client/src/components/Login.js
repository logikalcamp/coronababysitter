import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {BASE_URL} from '../constants'

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

const Login = () => {
    const classes = styles();

    const [loginDetails,setLoginDetails] =  useState({})
    const [isDoctorLogin, setIsDoctorLogin] = useState(false)
    const [email, setEmail] = useState('');
    const [isValidEmailFormat, setIsValidEmailFormat] = useState(false);
    const [error, setError] = useState('');
    const [loginState, setLoginState] = useState('email')
    const [code, setCode] = useState('')
    const [isCodeValid, setIsCodeValid] = useState(false)

    const login = async () => {
        if(!isValidEmailFormat) return;

        var loginApi = isDoctorLogin ? 'doctor' : 'volunteer';

        try {
            var response = await axios.post(BASE_URL + `/api/${loginApi}/login-email`, {email});

            setLoginState('code');
        }
        catch (error) {
            // TODO : Inform of error
        }
    }

    const confirmCode = () => {
        const login = async () => {
            if(!isCodeValid) return;
    
            var loginApi = isDoctorLogin ? 'doctor' : 'volunteer';
    
            try {
                var response = await axios.post(BASE_URL + `/api/login-user`, {email,code});

                // TODO : Login or not login
            }
            catch (error) {
    
            }
        }
    }

    var timeout = undefined;

    const checkCodeValid = (code) => {
        if(!code) return;
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

    return(
        <Container>
            <LoginDetailsContainer>
                <img className={classes.loginImage} src={window.location.origin + "/images/login.png"}></img>
                <ContainerTitle>
                    <div className={classes.title1}>{loginState == 'email' ? 'אהלן!' : 'מצוין!'}</div>
                    <div className={classes.title2}>{loginState == 'email' ? 'כיף לראות שחזרת, הזן אימייל להתחברות' : 'עוד מספר שניות תקבל קוד למייל, תזין אותו שם למטה'}</div>
                    <Toggle>
                    <ToggleOption onClick={() => {setIsDoctorLogin(false)}}>
                            מתנדב
                        </ToggleOption>
                        <ToggleOption onClick={() => {setIsDoctorLogin(true)}}>
                            צוות רפואי
                        </ToggleOption>
                        <ToggleHighlight left={isDoctorLogin} className={classes.selected}></ToggleHighlight>
                    </Toggle>
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
                <Button onClick={() => login()}>התחבר</Button>
            </LoginDetailsContainer>
        </Container>
    )
}

export default Login;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
`

const LoginDetailsContainer = styled.div`
    width: 410px;
    height: 560px;
    padding: 25px;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:white;
    box-shadow: 3px 3px 18px gray;
    border-radius: 8px;
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
    z-index: 999px;
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
    z-index: 1000px;
`

const ModalBackdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`