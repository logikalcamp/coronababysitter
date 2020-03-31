import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import Axios from 'axios';
import { MdAdd } from "react-icons/md";
import GridComp from '../Grid';
// import {UpcomingSessionsGrid} from './UpcomingSessionsGrid';
// import {NotYetApprovedSessionsGrid} from './NotYetApprovedSessionsGrid';


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

  a {
    align-self: center;
    background-color: #53B493;
    padding: 1.5rem;
    border-radius: 8px;
    font-size: 18px;
    color: #ffffff;
    text-decoration: none;
    
    display: flex;
    align-items: center;
  
    img {
      margin: 0 0.5rem;
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
const CreateSession = () => {

    return (
        <VolunteerDashboardComp>
            <div id="Con">
                <HeaderComp>
                <div>
                    <h2>ניהול בקשות פתוחות</h2>
                </div>
                <Link to="/newsession">
                    <MdAdd style={{width:"1.5rem",height:"1.5rem"}}/>
                    בקשה חדשה
                </Link>
                </HeaderComp>
                <DashboardComp>
                <GridWrapper primary>
                    <GridHeaderComp>
                    <img src={window.location.origin + '/images/icons8_today_96px_1.png'} />
                    יומן פעילויות מתוזמנות
                    </GridHeaderComp>
                    {/* <UpcomingSessionsGrid /> */}
                </GridWrapper>
                <GridWrapper>
                    <GridHeaderComp>
                    <img src={window.location.origin + '/images/icons8_today_96px_1.png'} />
                    בקשות פתוחות
                    <button>מסך מלא</button>
                    </GridHeaderComp>
                    {/* <NotYetApprovedSessionsGrid /> */}
                </GridWrapper>
                </DashboardComp>
            </div>
        </VolunteerDashboardComp>
        )
}

export default CreateSession;