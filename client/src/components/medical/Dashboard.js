import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import Axios from 'axios';
import { MdAdd } from "react-icons/md";
import {connect} from 'react-redux'
import GridComp from '../Grid';

import NewSessionModal from './newSessionModal'
import {UpcomingSessionsGrid} from './UpcomingSessionsGrid';
import {NotYetApprovedSessionsGrid} from './NotYetApprovedSessionsGrid';

const VolunteerDashboardComp = styled.div`
  height: 100%;
  padding:25px  50px;
  @media(max-width:450px) {
    height: 100%;
    padding: 0 5%;
    overflow-x: auto;
  }
`;
const Wrapper = styled.div`
  height: 100%;
  max-width: 1366px;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const HeaderComp = styled.div`
  /* height: 15%; */

  display: flex;
  justify-content: space-between;

  h1, h2 {
    font-weight: 300;
    margin:0;
  }

  h1 {
    display: flex;
    align-items: center;
    @media(max-width:450px){
      font-size:14px;
  }

    img {
      margin: 0 0.5rem;
    }
  }
  h2{

  margin-bottom:1rem;
    @media(max-width:450px){
      font-size:12px; 
    }
  }
  #button {
    align-self: center;
    background-color: #53B493;
    padding: 1.5rem;
    border-radius: 8px;
    font-size: 18px;
    color: #ffffff;
    border:none;
    outline:none;
    text-decoration: none;
    
    display: flex;
    align-items: center;
  
    img {
      margin: 0 0.5rem;
    }
  }
  @media(max-width:450px) {
    #button{
      padding:.5rem;
    }
    h1{
      font-size:1.5em
    }
    h2{
      font-size:1em
    }
  }
`;

const DashboardComp = styled.div`
  height: 75%;
  
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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

const Button = styled.button`
  border:1px solid #53B493;
  color:#53B493;
  background:white;
  border-radius:5px;
  &:hover{
    background:#e2e2e2;
    cursor:pointer;
  }
`

const MedicalDashboard = (props) => {
    const [openModal,setOpen] = useState(false)
    console.log(props)
  
    const id = props.auth.user._id
    return (
      <React.Fragment>
          {openModal && <NewSessionModal id={id} setOpen={setOpen}/>}
          <VolunteerDashboardComp>
              <Wrapper>
                  <HeaderComp>
                  <div>
                      <h1>
                      היי {props.auth.user.firstName}, כיף שבאת
                      <img src={window.location.origin + '/images/icons8_so_so_120px_2.png'} />
                      </h1>
                      <h2>אנחנו כאן לעזור לך ולדאוג שהמשפחה שלך תקבל את הטוב ביותר!</h2>
                  </div>
                  <button onClick={()=>{setOpen(true)}} id="button">
                      <MdAdd style={{width:"1.5rem",height:"1.5rem"}}/>
                      בקשה חדשה
                  </button>
                  </HeaderComp>
                  <DashboardComp>
                  <GridWrapper primary>
                      <GridHeaderComp>
                      <img src={window.location.origin + '/images/icons8_today_96px_1.png'} />
                      יומן פעילויות מתוזמנות
                      </GridHeaderComp>
                      <UpcomingSessionsGrid id={id} />
                  </GridWrapper>
                  <GridWrapper>
                      <GridHeaderComp style={{justifyContent:"space-between"}}>
                      <div style={{display:"flex"}}>
                        <img src={window.location.origin + '/images/icons8_today_96px_1.png'} />
                        בקשות פתוחות
                      </div>
                      <Link to="/optionalvolunteers"><Button>למסך ניהול בקשות פתוחות</Button></Link>
                      </GridHeaderComp>
                      <NotYetApprovedSessionsGrid  id={id}/>
                  </GridWrapper>
                  </DashboardComp>
                </Wrapper>
          </VolunteerDashboardComp>
        </React.Fragment>
        )
}

const ToProps = (state,props) => {
    return {
        auth: state.auth
    }
}
export default connect(ToProps)(MedicalDashboard);