import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios';


export const Landing = (props) => {
    console.log(props)
    
    const [uploading, setUploading] = useState(false)

    var onChange = (file) => {
    
        setUploading(true);

        const formData = new FormData()
        formData.append("customPhoto", file);
    
        Axios({
            method: 'post',
            url: '/api/uploadphoto',
            data: formData,
            headers: {'Content-Type':'multipart-formdata'}
        }).then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      }

      const [image, setImage] = useState('');
      

    return(
        <LandingCon>
                <h1>ברוכים הבאים</h1>
                <p>
                מצב חירום! מחבקים את העורף הרפואי! 
                בואו נדאג יחד , לילדים של האנשים שדואגים לכולנו בימים אלו
                עמותת הקרן ע"ש רות ורובל בשיתוף עם אר"מ ביוזמה למען הצוותים הרפואיים העומדים בחזית -
                שירותי בייביסיטר התנדבותיים לצוותים הרפואיים במדינה
                </p>
                <h2>להצטרפות</h2>
                <div>
                    <button onClick={()=>props.history.push('/signup/volunteer')}>אני רוצה להתנדב</button>
                    <button onClick={()=>props.history.push('/signup/medical')}>אני צוות רפואי</button>
                </div>
                <input type='file' onChange={(e) => onChange(e.target.files[0])}/>
                <img src={image}/>
        </LandingCon>
    )
}

const LandingCon = styled.div`
    display:flex;
    flex-direction:column;
    max-width:1366px;
    width:60%;
    ${'' /* align-items:center; */}
    margin:2rem auto auto auto;
    h1,h2,p{
        text-align:center;
    }
    h2{
        margin-top:3rem;
    }
    p{margin:0;}
    div{
        display:flex;
        justify-content:space-around;
        width:80%;
        margin:3rem auto;
    }
    button{
        background:#00C2CB;
        border:none;
        padding:1rem ;
        border-radius:5px;
        color:white;
        font-weight:bold;
        cursor:pointer;
    }
    button:hover{
        background:#23898e;
    }
`