import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {BASE_URL} from '../constants'
import PinDropIcon from '@material-ui/icons/PinDrop';

const styles = makeStyles(theme => ({
    title1: {
        fontSize: '28px',
        marginBottom: '20px'
    },
    title2: {
        fontSize: '20px',
        textAlign: 'center'
    },
    icon: {
        width: '50px',
        height: '40px'
    }
}));

const HamalHome = () => {
    const classes = styles();

    return (
        <Container>
            <TopTitle>
                <div className={classes.title1}>הי שם משתמש!</div>
                <div className={classes.title2}>משפט מוטיבציה מפוצץ!</div>
            </TopTitle>
            <CountBlocksContainer>
                <CountBlock>
                    <CountBlockImageNumContainer>
                        <PinDropIcon className={classes.icon}></PinDropIcon>
                        <div>
                            159
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>יוזרים ממתינים לאישור</CountBlockText>
                </CountBlock>
                <CountBlock>
                    <CountBlockImageNumContainer>
                        <PinDropIcon className={classes.icon}></PinDropIcon>
                        <div>
                            159
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>יוזרים ממתינים לאישור</CountBlockText>
                </CountBlock>
                <CountBlock>
                    <CountBlockImageNumContainer>
                        <PinDropIcon className={classes.icon}></PinDropIcon>
                        <div>
                            159
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>יוזרים ממתינים לאישור</CountBlockText>
                </CountBlock>
                <CountBlock>
                    <CountBlockImageNumContainer>
                        <PinDropIcon className={classes.icon}></PinDropIcon>
                        <div>
                            159
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>יוזרים ממתינים לאישור</CountBlockText>
                </CountBlock>
                <CountBlock>
                    <CountBlockImageNumContainer>
                        <PinDropIcon className={classes.icon}></PinDropIcon>
                        <div>
                            159
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>יוזרים ממתינים לאישור</CountBlockText>
                </CountBlock>
            </CountBlocksContainer>
            <PageMainContent>

            </PageMainContent>
        </Container>
    )
}

export default HamalHome;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
`

const TopTitle = styled.div`
    display:flex;
    flex-direction: column;
    align-items:flex-start;
    flex:1;
    width: 100%;
`

const CountBlocksContainer = styled.div`
    width: 90%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex:1;
    padding-top: 20px;
    padding-bottom:20px;
`

const CountBlock = styled.div`
    height: 75px;
    background-color:white;
    border-box: 3px 3px 3px gray;
    clear:both;
    border-radius: 8px;
    flex-basis: 200px;
    margin: 0px 10px 0px 10px;
    padding: 5px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
`

const CountBlockImageNumContainer = styled.div`
    display:flex;
    justify-content: space-around;
    align-items:center;
    font-size: 32px;
    padding: 0px 20px 0px 20px;
`
const CountBlockText = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
    font-size: 18px;
`

const PageMainContent = styled.div`
    flex:10;
    display:flex;
    clear:both;
`