import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {BASE_URL} from '../constants'
import PinDropIcon from '@material-ui/icons/PinDrop';
import * as Enumerable from 'linq';
import PersonIcon from '@material-ui/icons/Person';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

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
    },
    flexSix: {
        flex:'6',
        paddingRight: '20px'
    }
}));

const HamalHome = () => {
    const classes = styles();
    const [page, setPage] = useState(0);
    const [pendingUsers, setPendingUsers] = useState(undefined);
    const [pendingUsersUI, setPendingUsersUI] = useState([]);
    const [counts, setCounts] = useState({
        pendingVolunteers: 0,
        volunteers: 0,
        doctors: 0,
        urgentRequests: 0,
        matchedSessions: 0
    })

    const getUsers = async () => {
        if(pendingUsers) return;

        try {
            var results = await Promise.all([axios.post(BASE_URL + '/api/volunteer/pending'),
                                             axios.post(BASE_URL + '/api/doctor/pending'),
                                             axios.post(BASE_URL+'/api/volunteer/countpending'),
                                             axios.post(BASE_URL+'/api/volunteer/count'),
                                             axios.post(BASE_URL+'/api/doctor/count'),
                                             axios.post(BASE_URL+'/api/session/counturgentpending'),
                                             axios.post(BASE_URL+'/api/session/countmatched')]);

            var counts = {
                pendingVolunteers: results[2].data.count,
                volunteers: results[3].data.count,
                doctors: results[4].data.count,
                urgentRequests: results[5].data.count,
                matchedSessions: results[6].data.count
            }

            setCounts(counts)

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
                    <Row>
                        <RowPart>12.12.2020</RowPart>
                        <RowPart>{pendingUser.firstName + ' ' + pendingUser.lastName}</RowPart>
                        <RowPart>{pendingUser.type == 'med' ? 'רופא' : 'מתנדב'}</RowPart>
                    </Row>
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
                        <PersonIcon className={classes.icon}></PersonIcon>
                        <div>
                            {counts.pendingVolunteers}
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>יוזרים ממתינים לאישור</CountBlockText>
                </CountBlock>
                <CountBlock>
                    <CountBlockImageNumContainer>
                        <PriorityHighIcon className={classes.icon}></PriorityHighIcon>
                        <div>
                        {counts.urgentRequests}
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>בקשות דחופות</CountBlockText>
                </CountBlock>
                <CountBlock>
                    <CountBlockImageNumContainer>
                        <FavoriteIcon className={classes.icon}></FavoriteIcon>
                        <div>
                            {counts.volunteers}
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>מתנדבים</CountBlockText>
                </CountBlock>
                <CountBlock>
                    <CountBlockImageNumContainer>
                        <LocalHospitalIcon className={classes.icon}></LocalHospitalIcon>
                        <div>
                            {counts.doctors}
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>צוות רפואי</CountBlockText>
                </CountBlock>
                <CountBlock>
                    <CountBlockImageNumContainer>
                        <EventAvailableIcon className={classes.icon}></EventAvailableIcon>
                        <div>
                            {counts.matchedSessions}
                        </div>
                    </CountBlockImageNumContainer>
                    <CountBlockText>התנדבויות תואמו</CountBlockText>
                </CountBlock>
            </CountBlocksContainer>
            <PageMainContent>
                <div className={classes.flexFour}>
                    <Title>משתמשים הממתינים לאישור</Title>
                    <UserTableContainer>
                        <UserTable>
                            <Row className={classes.userRowTitle}>
                                <RowPart>תאריך הרשמה</RowPart>
                                <RowPart>שם</RowPart>
                                <RowPart>סוג</RowPart>
                            </Row>
                            {pendingUsersUI}
                        </UserTable>
                    </UserTableContainer>
                </div>
                <div className={classes.flexSix}>
                    <Title>בקשות דחופות</Title>
                    <MeatingTableContainer>
                        <Row className={classes.userRowTitle}>
                            <RowPart>מספר הצעות</RowPart>
                            <RowPart>טווח שעות</RowPart>
                            <RowPart>שם המתנדב</RowPart>
                            <RowPart>תאריך</RowPart>
                        </Row>
                    </MeatingTableContainer>
                </div>
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
    background-color: white;
    border-radius: 8px;
    direction: ltr;
    max-height: 500px;
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

const Row = styled.div`
    width: 100%;
    display:flex;
    height: 50px;
`

const RowPart = styled.div`
    flex: 1;
    display:flex;
    justify-content:center;
    align-items:center;
`

const MeatingTableContainer = styled.div`
    clear:both;
    overflow-y: scroll;
    background-color: white;
    border-radius: 8px;
    direction: ltr;
    max-height: 500px;
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

const Container = styled.div`
    height: 100%;
    width: 100%;
    max-width: 1366px;
    margin: auto;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const TopTitle = styled.div`
    display:flex;
    flex-direction: column;
    align-items:flex-start;
    width: 100%;
    height: 10%
`

const CountBlocksContainer = styled.div`
    width: 100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-top: 20px;
    padding-bottom:20px;
    height: 15%
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
    display:flex;
    clear:both;
    flex-direction:row;
    height: 100%;
    width: 100%;
    height: 75%
`