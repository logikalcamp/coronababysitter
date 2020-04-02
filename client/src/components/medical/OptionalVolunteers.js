import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import Axios from 'axios';
import { MdAdd } from "react-icons/md";
import {connect} from 'react-redux'
import NewSessionModal from './newSessionModal'
import GridComp from '../Grid';
// import {UpcomingSessionsGrid} from './UpcomingSessionsGrid';
import {NotYetApprovedSessionsGrid} from './NotYetApprovedSessionsGrid';
import {OpenRequestsGrid} from './OpenRequestsGrid'
import request from 'request';
import {FaMapMarkerAlt,FaHeart} from "react-icons/fa";
import {MdWork} from "react-icons/md";
import { BASE_URL } from '../../constants';


const VolunteerDashboardComp = styled.div`
  height: 100%;
  padding:1rem;
  #Con{
    max-width: 1366px;
    height: 100%;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  }

  

  @media(max-width:450px) {
    height: 100%;
    padding: 0 5%;
    overflow-x: auto;
  }
`;

const HeaderComp = styled.div`
  height: 15%;
  padding: 0 100px;

  display: flex;
  justify-content: space-between;

  h1, h2 {
    font-weight: 300;
  }

  h1 {
    display: flex;
    align-items: center;

    img {
      margin: 0 0.5rem;
    }
    
  }

  #button {
    align-self: center;
    background-color: #53B493;
    padding: 1.5rem;
    border-radius: 8px;
    font-size: 18px;
    color: #ffffff;
    text-decoration: none;
    border:none;
    outline:none;
    display: flex;
    align-items: center;
  
    img {
      margin: 0 0.5rem;
    }
  }

  @media(max-width:800px){
    padding:0;
    div{
      display:flex;
    }
    
    #button {
      padding: .5rem;
      font-size: 18px;
    }
  }

`;

const HeaderButtonComp = styled.div`
  
`;

const DashboardComp = styled.div`
  height: 75%;
  padding: 0 100px;
  
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media(max-width:800px){
    padding:0;
  }
`;

const GridWrapper = styled.div`
  background: #fff;
  height: 100%;
  border-radius: 8px;
  width: ${props => props.primary ? "calc(65% - 10px)" : "calc(35% - 10px)" };

  & .grid-wrapper {
    height: calc(100% - 47px);
  }

  @media(max-width:450px) {
    width: 100%;
    margin-bottom: 10px;

    &:last-child: {
      margin-bottom: 0;
    }
  }
`;

const GridHeaderComp = styled.div`
  height: 27px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  font-size: 20px;

  position: relative;
  z-index : 1;

  img {
    width: 27px;
    height: 27px;
    padding-left: 10px;
  }

  &:before {
    content: "";
    position: absolute;
    left: 15px;
    bottom: 0;
    height: 1px;
    width: calc(100% - 30px);
    border-bottom: 1px solid #D1D1D1;
  }
`;


const Label = styled.label`
  font-size:14px;
`
const OptionCon = styled.div`
  padding:1rem;
  border:1px solid #828282;
  margin:1rem;
  border-radius:20px;
  display:flex;
  flex-direction:row;
  img{
    width:50px;
    height:50px;
  }
`

const Detail = styled.div`
  font-size:12px;
  svg{
    margin-left:3px;
    color:#828282;
  }
`
const Butt = styled.div`
    border:1px solid #53B493;
    color:#53B493;
    background:white;
    border-radius:5px;
    padding:10px;
    &:hover{
      background:#e2e2e2;
      cursor:pointer;
   } 
`


function calcCrow (lat1, lon1, lat2, lon2){
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  if(d<1){
    console.log(d)
    return (d*1000).toFixed(0)
  }
  else{
    return d.toFixed(0);
  }
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}






const array = ["aaa","vvv","bbb","ccc"]

const OptionalVolunteers = (props) => {
    const [openModal,setOpen] = useState(false)
    const [requests,setRequests] = useState([])
    const [chosen,setChosen] = useState('')
    const [even,setEvent] = useState('')
    const id = props.auth.user._id
    
    const handleClick = (val,event) => {
      setRequests(event.data.volunteers_array_o)
      setEvent(event.data)
      setChosen(`${moment(event.data.startTime).format("DD/MM")} ${moment(event.data.startTime).format("HH:mm")}`)
      document.getElementById("options").scrollIntoView()
    }
    
    const Option = ({pic,firstName,data}) => {
      let length = calcCrow(data.lat,data.lon,props.auth.user.lat,props.auth.user.lon)
      return (
        <OptionCon>
          <div>
            <img src={pic} />
          </div>
          <div style={{width:"100%"}}>
              <div>{data.firstName}, {data.isFemale ? `בת ${moment().diff(moment(data.birthday),"years")}` : `בן ${moment().diff(moment(data.birthday),"years")}`}</div>
              <Detail><MdWork/>{data.isFemale ? `עובדת/לומדת ב${data.institute}`:`עובד/לומד ב${data.institute}`}</Detail>
              <div>
                {data.hobbies.length!=0 && data.hobbies.map((x)=>{return <Detail><FaHeart/> {data.isFemale ? "אוהבת":"אוהב"} {x}</Detail>})}
              </div>
              <Detail>
              <FaMapMarkerAlt/> 
                מרחק {length} {length>99 ? "מטרים":'ק"מ'}
              </Detail>
              <div style={{justifyContent:"flex-end",display:"flex"}}>
                <Butt
                onClick={()=>{
                  Axios.post(BASE_URL+`/api/session/approve/${even._id}`,{volunteerId:data._id})
                  .then(res=>{
                    console.log(res)
                  })
                }}
                >קבל הצעה</Butt>
              </div>
          </div>
        </OptionCon>
      )
    }
    
    const Optional = (arr) => {
      let show = []
      arr.map((x)=>{
        console.log(x)
        show.push( <Option data={x} pic={x.picture} firstName={x.firstName} /> )

      })
      return show
    }
    


    return (
      <React.Fragment>
          {openModal && <NewSessionModal id={id} setOpen={setOpen}/>}
          <VolunteerDashboardComp>
              <div id="Con">
                  <HeaderComp>
                  <div>
                      <h1>ניהול בקשות פתוחות</h1>
                  </div>
                  <button onClick={()=>{setOpen(true)}} id="button">
                      <MdAdd style={{width:"1.5rem",height:"1.5rem"}}/>
                      בקשה חדשה
                  </button>
                  </HeaderComp>
                  <DashboardComp>
                  <GridWrapper primary>
                      <GridHeaderComp >
                      <img src={window.location.origin + '/images/icons8_today_96px_1.png'} />
                      בקשות פתוחות
                      </GridHeaderComp>
                      <OpenRequestsGrid handle={handleClick} id={id} />
                  </GridWrapper>
                  <GridWrapper>
                      <GridHeaderComp style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex"}}>
                        <img src={window.location.origin + '/images/icons8_today_96px_1.png'} />
                        הצעות התנדבות 
                      </div>
                        <Label>{chosen}</Label>
                      </GridHeaderComp>
                      <div id="options" style={{height:"100%",overflowY:"auto"}}>
                        {
                          requests.length == 0 ?
                          <div>
                            {chosen == '' ? 
                              <div style={{textAlign:"center",marginTop:"2rem"}}>
                                על מנת לראות הצעות התנדבות יש לבחור בקשה מימין
                              </div>
                              :
                              <div style={{textAlign:"center",marginTop:"2rem"}}>
                                נראה שעדיין אין הצעות לפגישה זו 
                              </div>
                            }
                          </div> 
                          :
                            Optional(requests)
                          }
                      </div>
                  </GridWrapper>
                  </DashboardComp>
              </div>
          </VolunteerDashboardComp>
        </React.Fragment>
        )
}

const ToProps = (state,props) => {
  return {
      auth: state.auth
  }
}

export default connect(ToProps)(OptionalVolunteers);
