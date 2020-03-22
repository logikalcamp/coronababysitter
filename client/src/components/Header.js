import React, { useState } from 'react'
import styled from 'styled-components'

export const Header = () => {
    const [auth,setAuth] = useState(false)
    return(
        <HeaderCon>
            <div>
                <img></img>
                <label>בייבי קורונה</label>
            </div>
            <div>
                {auth && <label>שם משתמש |</label>}
                <button>{auth ? "התנתקות":"התחברות"}</button>
            </div>
        </HeaderCon>
    )
}

const HeaderCon = styled.div`
    background:#8412A1;
    display:flex;
    justify-content:space-between;
    padding:1rem;
`