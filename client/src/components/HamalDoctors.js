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
import MailIcon from '@material-ui/icons/Mail';
import {BASE_URL} from '../constants'
import Axios from 'axios';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import * as DateUtils from '../utils/dateUtils';

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
    doctorDetails: {
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
    children: {
        flex: 1,
        borderTop: '1px solid gray',
        borderBottom: '1px solid gray',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3px 25px 3px 25px'
    },
    smallIcon: {
        width: '25px',
        marginLeft: '5px'
    },
    notes: {
        flex: 5,
        marginTop: '10px'
    }
  }));

export const HamalDoctorsPage = (props) => {
    const classes = styles();

    const [doctorMap, setDoctorMap] = useState('');
    const [doctors, setDoctors] = useState('');
    const [selectedDoctor,setSelectedDoctor] = useState(undefined)
    const [page,setPage] = useState(0)
    const [pageCount, setPageCount] = useState(0);
    const [pagesUI, setPagesUI] = useState('');

    const updateVolunteers = (newPage) => {
        if(newPage == page) return;

        setPage(newPage);
        Axios.get(BASE_URL+'/api/doctor/approved/' + newPage).then((result) => {
            createDoctorsUI(result.data);
        });
    }

    const createDoctorsUI = (doctorList) => {
        var vols = doctorList.map(item => <div className={classes.tableRow} onClick={() => setSelectedDoctor(item)}>
            <div className={classes.imageCell} >
                <img className={classes.userImage} src={item.picture ? item.picture : window.location.origin + "/images/profilePlaceholder.png"}></img>
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

        setDoctorMap(vols)
    }

    useEffect(() => {
        Promise.all([Axios.get(BASE_URL+'/api/doctor/approved/' + page), Axios.get(BASE_URL+'/api/doctor/count')]).then(result => {
            if(doctors) return;
            createDoctorsUI(result[0].data);

            setPageCount(result[1].data.count / 30);
            var pagesui = [];

            for(var i=0; i < pageCount + 1; i++) {
                pagesui.unshift((<Page className={page == i ? classes.selectedPage : ''} onClick={() => updateVolunteers(i)}>{i+1}</Page>))
            }

            setPagesUI((<Pages>
                <ChevronRightIcon onClick={() => updateVolunteers(Math.max(0, page - 1))}></ChevronRightIcon>
                    {pagesui}
                <ChevronLeftIcon onClick={() => updateVolunteers(Math.min(pageCount, page + 1))}></ChevronLeftIcon>
            </Pages>));
        })
    }, [doctors]);

    return (
        <div className={classes.root}>
            <div className={classes.titleFilter}>
                <div className={classes.title}>
                    מאגר רופאים
                </div>
                <div className={classes.margin}>
                    <TextField id="search-text" label="חפש רופא במאגר"
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
                    <div className={classes.titleCell}>שם</div>
                    <div className={classes.titleCell}>כתובת מגורים</div>
                    <div className={classes.titleCell}>כתובת אימייל</div>
                    <div className={classes.titleCell}>מספר טלפון</div>
                    <div className={classes.titleCell}>מוסד</div>
                    <div className={classes.titleCell}></div>
                </div>
                <TableBody>
                    <TableContent>
                        {doctorMap}
                    </TableContent>
                    {pagesUI}
                </TableBody>
            </div>
            <ModalCon open={selectedDoctor} onClick={() => setSelectedDoctor(undefined)} />
            <ModalContentCon open={selectedDoctor}>
                <div className={classes.modalContent}>
                    <div className={classes.backHeader} >
                      <ChevronRightIcon onClick={() => setSelectedDoctor(undefined)}/>
                      <div onClick={() => setSelectedDoctor(undefined)}>חזור</div>
                    </div>
                    <div className={classes.volunteerHeader}>
                        <img className={classes.volunteerImage} src={selectedDoctor ? selectedDoctor.picture ? selectedDoctor.picture : window.location.origin + "/images/profilePlaceholder.png" : ''}></img>
                        <div className={classes.modalTitle}>{selectedDoctor ? selectedDoctor.firstName + ' ' + selectedDoctor.lastName : ''}</div>
                        <div>גיל {DateUtils.calculateAge(selectedDoctor ? new Date(selectedDoctor.birthday) : new Date())}</div>
                    </div>
                    <div className={classes.doctorDetails}>
                      <div className={classes.detailsHeader}>
                          <div className={classes.modalTitle}>פרטים כלליים</div>
                          <div className={classes.iconText}>
                              <DeleteIcon className={classes.marginLeft}/>
                              מחק משתמש
                          </div>
                      </div>
                      <div className={classes.iconText}>
                        <PinDropIcon className={classes.marginLeft}/>
                        <div>{selectedDoctor ? selectedDoctor.address : ''}</div>
                      </div>
                      <div className={classes.iconText}>
                        <MailIcon className={classes.marginLeft}/>
                        <div>{selectedDoctor ? selectedDoctor.email : ''}</div>
                      </div>
                      <div className={classes.iconText}>
                        <AssignmentIndIcon className={classes.marginLeft}/>
                        <div>{selectedDoctor ? selectedDoctor.tz : ''}</div>
                      </div>
                      <div className={classes.iconText}>
                          <PhoneIcon className={classes.marginLeft}/>
                        <div>{selectedDoctor ? selectedDoctor.phone : ''}</div>
                      </div>
                      <div>
                          <div className={classes.iconText}>
                            <SchoolIcon className={classes.marginLeft}/>
                            <div>{selectedDoctor ? selectedDoctor.institute : ''}</div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.children}>
                        <div className={classes.iconText}>
                            <ChildCareIcon className={classes.smallIcon}/>
                            <div>{selectedDoctor && selectedDoctor.children.length > 0 ? selectedDoctor.children[1].isFemale ? 'בת ' : 'בן ' + selectedDoctor.children[0].age : ' '}</div>
                        </div>
                        <div className={classes.iconText}>
                            <ChildCareIcon className={classes.smallIcon}/>
                            <div>{selectedDoctor && selectedDoctor.children.length > 1 ? selectedDoctor.children[1].isFemale ? 'בת ' : 'בן ' + selectedDoctor.children[1].age : ' '}</div>
                        </div>
                        <div className={classes.iconText}>
                            <ChildCareIcon className={classes.smallIcon}/>
                            <div>{selectedDoctor && selectedDoctor.children.length > 2 ? selectedDoctor.children[2].isFemale ? 'בת ' : 'בן ' + selectedDoctor.children[2].age : ' '}</div>
                        </div>
                    </div>
                    <div className={classes.notes}>
                        <div className={classes.modalTitle}>
                            הערות
                        </div>
                        <div>
                        <div>{selectedDoctor ? selectedDoctor.notes : ' '}</div>
                        </div>
                    </div>
                </div>
            </ModalContentCon>
        </div>
    )
}

const TableBody = styled.div`
    height: 650px;
    overflow: hidden;   
`

const TableContent = styled.div`
    height:95%;
    width:100%;
    overflow-y: scroll;
    
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

const Pages = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`

const Page = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0px 10px 0px 10px;
    cursor:pointer;
`