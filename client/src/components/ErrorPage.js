import React from 'react'

const ErrorPage = () => {
    return (
        <div style={{height:"100%",width:"100%",display:"flex",textAlign:"center"}}>
            <div style={{margin:"auto"}}>
                <div style={{fontSize:"100px"}}>
                    אופס..
                </div>
                <div>
                     נראה שדף זה לא קיים או שאין לך הרשאות אליו , אנא לחצ.י על הלוגו בימין למעלה לחזרה לדף הבית            
                </div>
                <img style={{height:"13rem"}} src={window.location.origin + '/images/oops.png'} alt="aa"/>
            </div>
        </div>
    )
}

export default ErrorPage;