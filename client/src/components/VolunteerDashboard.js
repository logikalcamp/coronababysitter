import React, { useState } from 'react';
import styled from 'styled-components';

import GridComp from './Grid';

//#region Styles
const VolunteerDashboardComp = styled.div`
  height: calc(100% - 275px);

  padding: 50px 15% 100px 15%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const HeaderComp = styled.div`
  height: 20%;
`;

const DashboardComp = styled.div`
  height: 70%;

  display: flex;
  justify-content: space-between;
`;

const GridWrapper = styled.div`
  background: #fff;
  height: 100%;
  border-radius: 8px;

  width: ${props => props.primary ? "calc(65% - 10px)" : "calc(35% - 10px)" };
`;
//#endregion

const NextGrid = (props) => {
  const [columnDefs] = useState([
    { headerName: "תאריך ושעה", field: "datetime" },
    { headerName: "איש קשר", field: "contact" },
    { headerName: "", field: "commands" }
  ]);
  const [rowData] = useState([
  { datetime: "Toyota", contact: "Celica", commands: 35000 },
  { datetime: "Ford", contact: "Mondeo", commands: 32000 },
  { datetime: "Porsche", contact: "Boxter", commands: 72000 }]);

  return (
    <GridWrapper>
      <GridComp 
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </GridWrapper>
  )
};

const WaitingGrid = (props) => {
  return (
    <GridWrapper primary>
    </GridWrapper>
  )
};

export const VolunteerDashboard = (props) => {
  return (
    <VolunteerDashboardComp>
      <HeaderComp>Header</HeaderComp>
      <DashboardComp>
        <NextGrid />
        <WaitingGrid />
      </DashboardComp>
    </VolunteerDashboardComp>
  )
};