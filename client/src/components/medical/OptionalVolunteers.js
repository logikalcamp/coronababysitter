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

const Option = ({pic,firstName}) => {
  return (
    <div>
      <img src={pic} />
      {firstName}
    </div>
  )
}

const Optional = (arr) => {
  let show = []
  arr.map((x)=>{
    console.log(x)
    show.push( <Option pic={x.picture} firstName={x.firstName} /> )
  })
  return show
}


const array = ["aaa","vvv","bbb","ccc"]

const OptionalVolunteers = (props) => {
    const [openModal,setOpen] = useState(false)
    const [requests,setRequests] = useState([])
    const [chosen,setChosen] = useState('')
    const id = props.auth.user.userid

    const handleClick = (val,event) => {
      console.log(val,event)
      setRequests(event.data.volunteers_array_o)
      setChosen(`${moment(event.data.startTime).format("DD/MM")} ${moment(event.data.startTime).format("HH:mm")}`)
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
                      {
                        requests.length == 0 ?
                        <div>Choose some</div> 
                        :
                          Optional(requests)
                        }
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
