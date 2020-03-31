import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {BASE_URL} from '../constants'
import PinDropIcon from '@material-ui/icons/PinDrop';
import * as Enumerable from 'linq';

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
    },
    userRowTitle: {
        fontWeight: 'bold'
    },
    flexFour: {
        flex:'4'
    }
}));

const HamalHome = () => {
    const classes = styles();
    const [page, setPage] = useState(0);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [pendingUsersUI, setPendingUsersUI] = useState([]);

    const getUsers = async () => {
        if(pendingUsers && pendingUsers.length > 0) return;

        try {
            var results = await Promise.all([axios.get(BASE_URL + '/api/volunteer/pending/' + page),
                                             axios.get(BASE_URL + '/api/doctor/pending/' + page)])

            var pendingUsers_temp = [];
            results[0].data.forEach((vol) => {
                vol.type= "vol";
            });
            results[1].data.forEach((med) => {
                med.type= "med";
            });

            pendingUsers_temp = pendingUsers_temp.concat(results[0].data);
            pendingUsers_temp = pendingUsers_temp.concat(results[1].data);

            pendingUsers_temp = Enumerable.from(pendingUsers_temp).orderBy(x => x.firstName + x.lastName).toArray();

            var pendingUsersUI = pendingUsers_temp.map(pendingUser => 
                    <UserRow>
                        <UserRowPart>12.12.2020</UserRowPart>
                        <UserRowPart>{pendingUser.firstName + ' ' + pendingUser.lastName}</UserRowPart>
                        <UserRowPart>{pendingUser.type == 'med' ? 'רופא' : 'מתנדב'}</UserRowPart>
                    </UserRow>
            );

            setPendingUsers(pendingUsers_temp);
            setPendingUsersUI(pendingUsersUI);
        }
        catch(error) {
            setPendingUsers([]);
        }
    }

    useEffect(() => {
        getUsers();
    },[pendingUsers])

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
                <div className={classes.flexFour}>
                    <Title>משתמשים הממתינים לאישור</Title>
                    <UserTableContainer>
                        <UserTable>
                            <UserRow className={classes.userRowTitle}>
                                <UserRowPart>תאריך הרשמה</UserRowPart>
                                <UserRowPart>שם</UserRowPart>
                                <UserRowPart>סוג</UserRowPart>
                            </UserRow>
                            {pendingUsersUI}
                        </UserTable>
                    </UserTableContainer>
                </div>
                <MeatingTableContainer>

                </MeatingTableContainer>
            </PageMainContent>
        </Container>
    )
}

export default HamalHome;

const Title = styled.div`
    font-weight:bold;
    font-size: 20px;
    margin-bottom: 10px;
`

const UserTableContainer = styled.div`
    overflow-y: scroll;
    height: 300px;
    background-color: white;
    border-radius: 8px;
    direction: ltr;
    &::-webkit-scrollbar {
        width: 5px;
     }
     /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #00C2CB;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`

const UserTable = styled.div`
    clear:both;
`

const UserRow = styled.div`
    width: 100%;
    display:flex;
    height: 50px;
`

const UserRowPart = styled.div`
    flex: 1;
    display:flex;
    justify-content:center;
    align-items:center;
`

const MeatingTableContainer = styled.div`
    flex:6  

`

const Container = styled.div`
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
    width: 100%;
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
    flex-direction:row;
    height: 100%;
    width: 100%;
`