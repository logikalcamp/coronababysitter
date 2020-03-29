import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PhoneIcon from '@material-ui/icons/Phone';
import SchoolIcon from '@material-ui/icons/School';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import {BASE_URL} from '../constants'
import Axios from 'axios';

const styles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection:'column',
      padding: "25px 75px 0px 75px"
    },
    titleFilter: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: '20px'
    },
    title: {
        fontSize: '22px'
    },
    table: {
        width: '100%'
    },
    tableHeader: {
        display:'flex',
        flexDirection:'row',
        width: '100%',
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '8px',
        background: '#FFFFFF 0% 0% no-repeat padding-box'
    },
    titleCell: {
        flex:'1',
        textAlign: 'center',
        color:'#A0A0A0',
        fontSize: '12px',
        padding:'5px 0px 5px 0px'
    },
    imageCell: {
        flex:1,
        textAlign:'center',
        height: 65,
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    rowCell: {
        flex:1,
        textAlign:'center',
        height: 65,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    tableRow: {
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 1px 6px #00000029',
        background:'#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius:'8px',
        margin:'5px 0px 5px 0px'
    },
    tableBody: {
        height: '650px',
        overflow: 'hidden',
    },
    tableContent: {
        height:'100%',
        width:'100%',
        overflow: 'auto',
        WebkitScrollBar: 'none'

    },
    userImage: {
        width: '45px',
        borderRadius: '50%',
        marginRight: '20px'
    },
    userFullName: {
        marginRight: '20px',
        fontWeight: 'bold'
    },
    margin: {
        margin: theme.spacing(1)
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        color:'gray',
        height: '100%',
        padding: '0px 15px 0px 15px',
    },
    backHeader: {
        display: 'flex',
        flexDirection: 'row',
        flex:1
    },
    volunteerHeader :{
        flex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    volunteerImage: {
        height: '150px',
        borderRadius: '50%'
    },
    modalTitle: {
        fontWeight:'bold',
        color: 'black'
    },
    volunteerDetails: {
        flex: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    detailsHeader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    iconText: {
        display: 'flex',
    },
    marginLeft: {
        marginLeft: '5px'
    },
    hobbies: {
        flex: 1,
        borderTop: '1px solid gray',
        borderBottom: '1px solid gray',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3px 20px 3px 20px'
    },
    smallIcon: {
        width: '15px',
        marginLeft: '5px'
    },
    notes: {
        flex: 5,
        marginTop: '10px'
    }
  }));

export const VolunteersPage = (props) => {
    const classes = styles();

    const [volunteersMap, setVolunteersMap] = useState('');
    const [volunteers, setVolunteers] = useState('');
    const [selectedVolunteer,setSelectedVolunteer] = useState(undefined)

    useEffect(() => {
        Axios.get('/api/volunteer/all').then(result => {
            if(volunteers) return;
            var vols = result.data.map(item => <div className={classes.tableRow} onClick={() => setSelectedVolunteer(item)}>
                <div className={classes.imageCell} >
                    <img className={classes.userImage} src={item.picture}></img>
                    <div className={classes.userFullName}>
                        {item.firstName + ' ' + item.lastName}
                    </div>
                </div>
                <div className={classes.rowCell}>{item.address}</div>
                <div className={classes.rowCell}>{item.email}</div>
                <div className={classes.rowCell}>{item.phone}</div>
                <div className={classes.rowCell}>{item.institute}</div>
                <div className={classes.rowCell}></div>
            </div>);

            setVolunteersMap(vols)
        })
    }, [volunteers]);

    return (
        <div className={classes.root}>
            <div className={classes.titleFilter}>
                <div className={classes.title}>
                    מאגר המתנדבים
                </div>
                <div className={classes.margin}>
                    <TextField id="search-text" label="חפש מתנדב במאגר"
                     InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />        
                </div>
            </div>
            <div className={classes.table}>
                <div className={classes.tableHeader}>
                    <div className={classes.titleCell}>שם המתנדב</div>
                    <div className={classes.titleCell}>כתובת מגורים</div>
                    <div className={classes.titleCell}>כתובת אימייל</div>
                    <div className={classes.titleCell}>מספר טלפון</div>
                    <div className={classes.titleCell}>מוסד לימודים</div>
                    <div className={classes.titleCell}></div>
                </div>
                <div className={classes.tableBody}>
                    <div className={classes.tableContent}>
                        {volunteersMap}
                    </div>
                </div>
            </div>
            <ModalCon open={selectedVolunteer} onClick={() => setSelectedVolunteer(undefined)} />
            <ModalContentCon open={selectedVolunteer}>
                <div className={classes.modalContent}>
                    <div className={classes.backHeader} >
                      <ChevronRightIcon onClick={() => setSelectedVolunteer(undefined)}/>
                      <div onClick={() => setSelectedVolunteer(undefined)}>חזור</div>
                    </div>
                    <div className={classes.volunteerHeader}>
                        <img className={classes.volunteerImage} src={selectedVolunteer ? selectedVolunteer.picture ? selectedVolunteer.picture : window.location.origin + "/images/profilePlaceholder.png" : ''}></img>
                        <div className={classes.modalTitle}>{selectedVolunteer ? selectedVolunteer.firstName + ' ' + selectedVolunteer.lastName : ''}</div>
                        <div>גיל XX</div>
                    </div>
                    <div className={classes.volunteerDetails}>
                      <div className={classes.detailsHeader}>
                          <div className={classes.modalTitle}>פרטים כלליים</div>
                          <div className={classes.iconText}>
                              <DeleteIcon className={classes.marginLeft}/>
                              מחק משתמש
                          </div>
                      </div>
                      <div className={classes.iconText}>
                        <PinDropIcon className={classes.marginLeft}/>
                        <div>{selectedVolunteer ? selectedVolunteer.address : ''}</div>
                      </div>
                      <div className={classes.iconText}>
                        <MailIcon className={classes.marginLeft}/>
                        <div>{selectedVolunteer ? selectedVolunteer.email : ''}</div>
                      </div>
                      <div className={classes.iconText}>
                        <AssignmentIndIcon className={classes.marginLeft}/>
                        <div>{selectedVolunteer ? selectedVolunteer.tz : ''}</div>
                      </div>
                      <div className={classes.iconText}>
                          <PhoneIcon className={classes.marginLeft}/>
                        <div>{selectedVolunteer ? selectedVolunteer.phone : ''}</div>
                      </div>
                      <div className={classes.iconText}>
                          <FacebookIcon className={classes.marginLeft}/>
                        <div>{selectedVolunteer ? selectedVolunteer.facebook : ''}</div>
                      </div>
                      <div>
                          <div className={classes.iconText}>
                            <SchoolIcon className={classes.marginLeft}/>
                            <div>{selectedVolunteer ? selectedVolunteer.institute : ''}</div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.hobbies}>
                        <div className={classes.iconText}>
                            <FavoriteIcon className={classes.smallIcon}/>
                            <div>{selectedVolunteer ? selectedVolunteer.hobbies[0] : ' '}</div>
                        </div>
                        <div className={classes.iconText}>
                            <FavoriteIcon className={classes.smallIcon}/>
                            <div>{selectedVolunteer ? selectedVolunteer.hobbies[1] : ' '}</div>
                        </div>
                        <div className={classes.iconText}>
                            <FavoriteIcon className={classes.smallIcon}/>
                            <div>{selectedVolunteer ? selectedVolunteer.hobbies[2] : ' '}</div>
                        </div>
                    </div>
                    <div className={classes.notes}>
                        <div className={classes.modalTitle}>
                            הערות
                        </div>
                        <div>
                        <div>{selectedVolunteer ? selectedVolunteer.notes : ' '}</div>
                        </div>
                    </div>
                </div>
            </ModalContentCon>
        </div>
    )
}

const ModalCon = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0, 0.4);

    display:  ${props=> props.open ? "block" : "none"};
`;

const ModalContentCon = styled.div`
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 400px;
    height: 100%;
    background-color: #ffffff;

    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);

    animation: ${props=> props.open ? "slide-in 0.5s forwards" : "slide-out 0.5s forwards"};
    -webkit-animation: ${props=> props.open ? "slide-in 0.5s forwards" : "slide-out 0.5s forwards"};

    @keyframes slide-in {
        100% { transform: translateX(0%); }
    }
    
    @-webkit-keyframes slide-in {
        100% { -webkit-transform: translateX(0%); }
    }
        
    @keyframes slide-out {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
    }
    
    @-webkit-keyframes slide-out {
        0% { -webkit-transform: translateX(0%); }
        100% { -webkit-transform: translateX(-100%); }
    }
`;