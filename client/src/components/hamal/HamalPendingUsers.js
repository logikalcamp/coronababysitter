import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import GridComp from '../Grid';
import {BASE_URL} from '../../constants'
import Axios from 'axios';
import BlockIcon from '@material-ui/icons/Block';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FavoriteIcon from '@material-ui/icons/Favorite';
import * as DateUtils from '../../utils/dateUtils';
import DotLoader from "react-spinners/DotLoader";
import { Collapsable, CollapsableContent, CollapsableHeader, Title, Button, ModalBackdrop, Modal, ContainerTitle } from '../Utils'
import InfoIcon from '@material-ui/icons/Info';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PhoneIcon from '@material-ui/icons/Phone';
import SchoolIcon from '@material-ui/icons/School';
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';

const styles = makeStyles(theme => ({
    verifyIcon : {
        color:'green'
    },
    blockIcon : {
        color:'red'
    },
    marginLeft: {
        marginLeft: '5px'
    },
    blockUser : {
        cursor:'pointer',
        color:'red'
    },
    hobbies: {
        flex: 1,
        borderTop: '1px solid gray',
        borderBottom: '1px solid gray',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3px 10px 3px 10px'
    },
    smallIcon: {
        width: '15px',
        marginLeft: '5px'
    },
    notes: {
        flex: 5,
        marginTop: '10px'
    },
    title1: {
        fontSize: '28px',
        marginBottom: '20px'
    },
    title2: {
        fontSize: '20px',
        textAlign: 'center'
    },
}));

const actionCallbacks = {}

const registerForAction = (actionName, callbackKey, callback) => {
    if(!actionCallbacks[actionName]) {
        actionCallbacks[actionName] = {};
    }
    actionCallbacks[actionName][callbackKey] = callback;
}

const InformAction = (actionName, ...params) => {
    if(!actionCallbacks[actionName]) return;

    var callbackKeys = Object.keys(actionCallbacks[actionName]);
    
    callbackKeys.forEach((key) => {
        actionCallbacks[actionName][key](...params);
    })
}

const pendingUsersGridCommands = (props) => {
    const approveClicked = (event) => InformAction("ApproveClicked",props.data.user);
    const blockClicked = (event) => InformAction("RejectClicked",props.data.user);
    const infoClicked = (event) => InformAction("InfoClicked",props.data.user);
  
    return (
        <span>
            <VerifiedUserIcon onClick={approveClicked} className="grid-command-green"></VerifiedUserIcon>
            <BlockIcon onClick={blockClicked} className="grid-command-red"></BlockIcon>
            {props.data.user.role == 'volunteer' && <InfoIcon onClick={infoClicked} className="grid-command-theme"></InfoIcon>}
        </span>
    )
  }

export const HamalPendingUsers = (props) => {
    const classes = styles();

    const [doctorsPending, setDoctorsPending] = useState(undefined)
    const [volunteersPending, setVolunteersPending] = useState(undefined)

    const [doctorsOpen, setDoctorsOpen] = useState(false);
    const [volunteersOpen, setVolunteersOpen] = useState(true);
    const [selectedUser, setSelectedUser] = useState(undefined);

    const [isModalLoading, setIsModalLoading] = useState(false)
    const [modalData, setModalData] = useState({
        open: false,
        title: 'כותרת ראשית',
        secondaryTitle: 'כותרת משנית',
        buttons: [{text: '', action: () => {}}]
    })

    const [columnDefs] = useState([
        { 
          headerName: "שם",
          field: "name",

        },
        { 
          headerName: "טלפון",
          field: "phone"
        },
        { 
            headerName: "מוסד לימודים \ מקום עבודה",
            field: "institute"
        },
        { 
            headerName: "מקצוע \ תחום לימודים",
            field: "profession"
        },
        { 
            headerName: "",
            field: "commands",
            width: 70,
            cellRenderer: "pendingUsersGridCommands"
        }
      ]);

    const toggleCollapsables = () => {
        setDoctorsOpen(!doctorsOpen);
        setVolunteersOpen(!volunteersOpen);
    }

    const toggleModal = (open, title= '', secondaryTitle= '', buttons = []) => {
        setModalData({open, title,secondaryTitle, buttons});
    }

    const onInfoClicked = (user) => {
        setSelectedUser(user);
    }

    const onApproveClicked = (user) => {
        var modalData = {
            open: true,
            title: 'האם אתה בטוח שברצונך לאשר משתמש זה?',
            secondaryTitle: `${user.firstName} ${user.lastName} - ${user.role == 'volunteer' ? 'מתנדב' : 'צוות רפואי'}`,
            buttons: [
                {
                    text: 'כן',
                    action: () => {
                        setIsModalLoading(true);
                        modalData.title = 'מתבצעת אישור'
                        modalData.secondaryTitle = 'אנא המתן'
                        setModalData(modalData)
                        approveOrRejectUser(user,true).then(result => {
                            setIsModalLoading(false);
                            setDoctorsPending(undefined);
                            setVolunteersPending(undefined);
                            setSelectedUser(undefined);
                            toggleModal(false);
                        }).catch((error) => {
                            setIsModalLoading(false);
                            toggleModal(false);
                        });
                    }
                },
                {
                    text: 'לא',
                    action: () => {
                        toggleModal(false)
                    },
                    backgroundColor:'red'
                }
            ]
        }

        setModalData(modalData);
    }

    const onRejectClicked = (user) => {
        var modalData = {
            open: true,
            title: 'האם אתה בטוח שברצונך לדחות משתמש זה?',
            secondaryTitle: `${user.firstName} ${user.lastName} - ${user.role == 'volunteer' ? 'מתנדב' : 'צוות רפואי'}`,
            buttons: [
                {
                    text: 'כן',
                    action: () => {
                        setIsModalLoading(true);
                        modalData.title = 'מתבצעת דחייה'
                        modalData.secondaryTitle = 'אנא המתן'
                        setModalData(modalData)
                        approveOrRejectUser(user,false).then(result => {
                            setIsModalLoading(false);
                            setDoctorsPending(undefined);
                            setVolunteersPending(undefined);
                            setSelectedUser(undefined);
                            toggleModal(false);
                        }).catch((error) => {
                            setIsModalLoading(false);
                            toggleModal(false);
                        });
                    },
                    backgroundColor:'red'
                },
                {
                    text: 'לא',
                    action: () => {
                        toggleModal(false)
                    }
                }
            ]
        }

        setModalData(modalData);
    }

    const approveOrRejectUser = (user, isApproved) => {
        return Axios.post(BASE_URL + `/api/hamal/approve-reject/${user._id}`, {
            isApproved,
            hamalUserId: '5e887c4a77885033c8d53af5',
            role: user.role
        });
    }

    registerForAction("InfoClicked", "f1",onInfoClicked);
    registerForAction("ApproveClicked", "f1",onApproveClicked);
    registerForAction("RejectClicked", "f1",onRejectClicked);

    const loadPage = () => {
        if((doctorsPending) || (volunteersPending)) return;

        Promise.all([Axios.post(BASE_URL + '/api/volunteer/pending'),Axios.post(BASE_URL + '/api/doctor/pending')]).then(results => {
            var doctorsPendingNew = [];
            var volunteersPendingNew = [];

            for(var i =0; i < results[0].data.length; i++) {
                results[0].data[i].role ="volunteer";
                var gridObject = getGridObjectFromSession(results[0].data[i]);
                volunteersPendingNew.push(gridObject);
            }

            for(var i =0; i < results[1].data.length; i++) {
                results[1].data[i].role="doctor";
                var gridObject = getGridObjectFromSession(results[1].data[i]);
                doctorsPendingNew.push(gridObject);
            }

            setDoctorsPending(doctorsPendingNew);
            setVolunteersPending(volunteersPendingNew);
        })
      }

    useEffect(loadPage, [doctorsPending, volunteersPending]);

    const getGridObjectFromSession = (user)  => {
          var gridObject = {
              name: user.firstName + ' ' + user.lastName,
              phone: user.phone,
              institute: user.institute,
              profession: user.profession,
              user: user
          }

          return gridObject;
    }

    return (
        <div style={{height:"100%",width:"100%",overflowY:"auto"}}>
        <Container>
            <ModalBackdrop open={modalData.open}>
                <Modal open={modalData.open}>
                    <ContainerTitle>
                        <div className={classes.title1}>{modalData.title}</div>
                        <div className={classes.title2}>{modalData.secondaryTitle}</div>
                    </ContainerTitle>
                    {!isModalLoading && <ButtonsContainer>
                                            {modalData.buttons[0] && <Button color={modalData.buttons[0].color} backgroundColor={modalData.buttons[0].backgroundColor} onClick={() => modalData.buttons[0].action()}>{modalData.buttons[0].text}</Button>}
                                            {modalData.buttons[1] && <Button color={modalData.buttons[1].color} backgroundColor={modalData.buttons[1].backgroundColor} onClick={() => modalData.buttons[1].action()}>{modalData.buttons[1].text}</Button>}
                                        </ButtonsContainer>}
                    {isModalLoading && <DotLoader size={70} color={"#00C2CB"}></DotLoader>}
                </Modal>
            </ModalBackdrop>
            <ContainerHeader>
                משתמשים הממתינים לאישור {doctorsPending && volunteersPending ? `(${doctorsPending.length + volunteersPending.length})` : ''}
            </ContainerHeader>
            <ContainerContent>
                <UsersContent>
                    <Collapsable>
                        <CollapsableHeader>
                            <Title>צוותים רפואיים {doctorsPending ? `(${doctorsPending.length})` : ''}</Title>
                            {!doctorsOpen && <KeyboardArrowDownIcon className={classes.arrowIcon} onClick={toggleCollapsables}></KeyboardArrowDownIcon>}
                            {doctorsOpen && <KeyboardArrowUpIcon className={classes.arrowIcon} onClick={toggleCollapsables}></KeyboardArrowUpIcon>}
                        </CollapsableHeader>
                        <CollapsableContent open={doctorsOpen}>
                        <GridComp columnDefs={columnDefs} rowData={doctorsPending} 
                                                    frameworkComponents={{
                                                                         pendingUsersGridCommands: pendingUsersGridCommands}}/>
                        </CollapsableContent>
                    </Collapsable>
                    <Collapsable>
                        <CollapsableHeader>
                            <Title>מתנדבים {volunteersPending ? `(${volunteersPending.length})` : ''}</Title>
                            {!volunteersOpen && <KeyboardArrowDownIcon className={classes.arrowIcon} onClick={toggleCollapsables}></KeyboardArrowDownIcon>}
                            {volunteersOpen && <KeyboardArrowUpIcon className={classes.arrowIcon} onClick={toggleCollapsables}></KeyboardArrowUpIcon>}
                        </CollapsableHeader>
                        <CollapsableContent open={volunteersOpen}>
                        <GridComp columnDefs={columnDefs} rowData={volunteersPending} 
                                                    frameworkComponents={{
                                                                         pendingUsersGridCommands: pendingUsersGridCommands}}/>
                        </CollapsableContent>
                    </Collapsable>
                </UsersContent>
                {selectedUser && selectedUser.role == 'volunteer' && <SelectedUserContent>
                    <SelectedUserHeader>
                        <UserImage src={selectedUser ? selectedUser.picture ? selectedUser.picture : window.location.origin + "/images/profilePlaceholder.png" : ''}/>
                        <SelectedUserTitle>{selectedUser ? selectedUser.firstName + ' ' + selectedUser.lastName : ''}</SelectedUserTitle>
                        <div>גיל {DateUtils.calculateAge(selectedUser ? new Date(selectedUser.birthday) : new Date())}</div>
                    </SelectedUserHeader>
                    <UserDetails>
                        <DetailsHeader>
                            <SelectedUserTitle>פרטים כלליים</SelectedUserTitle>
                            <IconText className={classes.blockUser} onClick={() => onRejectClicked(selectedUser)}>
                                <BlockIcon className={classes.marginLeft}/>
                                דחה משתמש
                            </IconText>
                        </DetailsHeader>
                        <IconText>
                            <PinDropIcon className={classes.marginLeft + ' ' + 'theme-color'}/>
                            <div>{selectedUser ? selectedUser.address : ''}</div>
                        </IconText>
                        <IconText>
                            <MailIcon className={classes.marginLeft + ' ' + 'theme-color'}/>
                            <div>{selectedUser ? selectedUser.email : ''}</div>
                        </IconText>
                        <IconText>
                            <AssignmentIndIcon className={classes.marginLeft + ' ' + 'theme-color'}/>
                            <div>{selectedUser ? selectedUser.tz : ''}</div>
                        </IconText>
                        <IconText>
                            <PhoneIcon className={classes.marginLeft + ' ' + 'theme-color'}/>
                            <div>{selectedUser ? selectedUser.phone : ''}</div>
                        </IconText>
                        <IconText>
                            <FacebookIcon className={classes.marginLeft + ' ' + 'theme-color'}/>
                            <div>{selectedUser ? selectedUser.facebook : ''}</div>
                        </IconText>
                        <div>
                          <IconText>
                            <SchoolIcon className={classes.marginLeft + ' ' + 'theme-color'}/>
                            <div>{selectedUser ? selectedUser.institute : ''}</div>
                        </IconText>
                      </div>
                      <div className={classes.hobbies}>
                        <IconText>
                            <FavoriteIcon className={classes.smallIcon + ' ' + 'red-color'}/>
                            <div>{selectedUser ? selectedUser.hobbies[0] : ' '}</div>
                        </IconText>
                        <IconText>
                            <FavoriteIcon className={classes.smallIcon + ' ' + 'red-color'}/>
                            <div>{selectedUser ? selectedUser.hobbies[1] : ' '}</div>
                        </IconText>
                        <IconText>
                            <FavoriteIcon className={classes.smallIcon + ' ' + 'red-color'}/>
                            <div>{selectedUser ? selectedUser.hobbies[2] : ' '}</div>
                        </IconText>
                    </div>
                    <div className={classes.notes}>
                        <SelectedUserTitle>
                            הערות
                        </SelectedUserTitle>
                        <div>
                            <div>{selectedUser ? selectedUser.notes : ' '}</div>
                        </div>
                    </div>
                    <ButtonsContainer>
                        <Button onClick={() => onApproveClicked(selectedUser)}>אשר</Button>
                    </ButtonsContainer>
                    </UserDetails>
                </SelectedUserContent>}
            </ContainerContent>
        </Container>
        </div>
    );
};

const ButtonsContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width: 100%;
`

const DetailsHeader = styled.div`
    display:flex;
    justify-content:space-between;
`

const SelectedUserTitle = styled.div`
    font-weight:bold;
`

const Container = styled.div`
    height: 100%;
    max-width:1366px;
    margin:auto;
    padding: 15px 50px 50px 50px;
    display:flex;
    flex-direction:column;
`

const ContainerHeader = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    font-size: 34px;
    height: 15%;
    margin: auto;
    width: 70%;
`

const ContainerContent = styled.div`
    display:flex;
    justify-content:flex-start;
    height: 85%;
    width: 100%;
`

const UsersContent = styled.div`
    display:flex;
    flex-direction:column;
    width: 70%;
    margin:auto;
`

const SelectedUserContent = styled.div`
    width: calc(30% - 15px);
    border-radius: 8px;
    background-color:white;
    height:auto;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    margin-right: 15px;
    padding: 10px;
    display:flex;
    flex-direction:column;
`

const SelectedUserHeader = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    flex:3;
`

const UserImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius:50%;
`

const UserDetails = styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
`

const IconText = styled.div`
    display:flex;
    margin-top: 5px;
    margin-bottom: 5px;
`