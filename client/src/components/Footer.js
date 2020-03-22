import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

export const Footer = () => {
    return(
        <FooterCon>
            <div>
                <label>בייבי קורונה 2020</label>
            </div>
            <div>
                <a href="/mail">Mail</a>
                <a href="/facebook">Face</a>
                <a href="/instagram">Inst</a>
            </div>
            <div>
                <NavLink to="/policy">תנאים</NavLink>
                <NavLink to="/privacy">פרטיות</NavLink>
            </div>
        </FooterCon>
    )
}

const FooterCon = styled.div`
    bottom:0;
    display:flex;
    justify-content:space-around;
    left:0;
    position:absolute;
    padding:1rem;
    right:0;
`