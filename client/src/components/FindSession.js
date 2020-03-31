import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import GridComp from './Grid';

//#region Styles
const FindSessionComp = styled.div`
  height: 100%;
  padding: 100px 50px 50px 50px;
`;
const Wrapper = styled.div`
  height: 100%;
  max-width: 1366px;
  margin: auto;

  flex-grow: 10;
  flex-shrink: 0;
  flex-basis: auto;
  display: flex;
`;
const TableWrapper = styled.div`
  min-width: 33.3%;

  flex-basis: ${props => props.isExpanded ? "66.7%" : "33.3%"};
  transition: flex-basis 500ms ease-in-out;
`;
const MapWrapper = styled.div`
  min-width: 33.3%;

  flex-basis: ${props => props.isExpanded ? "33.3%" : "66.7%" };
  transition: flex-basis 500ms ease-in-out;
`;
const GridWrapper = styled.div`
  background: #fff;
  height: 100%;
  width: calc(100% + 8px);
  border-radius: 8px;
  position: relative;
  z-index: 1;

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
const GridExpanderComp = styled.div`
  position: absolute;
  top: 50%;
  left: -21px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
`;
//#endregion

const FindSessionsGrid = (props) => {
  const [availableSessions, setAvailableSessions] = useState([]);
  const [columnDefs] = useState([
    { 
      headerName: "תאריך",
      field: "date"
    },
    { 
      headerName: "איש קשר",
      field: "contact"
    },
    {
      headerName: "שעות ההתנדבות",
      field: "sessionHours"
    }
  ]);

  useEffect(() => {}, []);

  return (
    <GridComp 
      columnDefs={columnDefs}
      rowData={availableSessions}
    />
  )
};

const Map = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    streetView = {false}
    defaultZoom={11}
    center={{ lat: 32.344084 , lng: 34.870139 }}
  >
    <Marker
      position={{ lat: 32.344084 , lng: 34.870139 }}
    />
  </GoogleMap>
));

export const FindSession = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <FindSessionComp>
      <Wrapper>
        <TableWrapper isExpanded={isExpanded}>
          <GridWrapper>
            <GridHeaderComp>
              <img src={window.location.origin + '/images/icons8_today_96px_1.png'} />
              ההתנדבויות הבאות שלי
            </GridHeaderComp>
            <FindSessionsGrid />
            <GridExpanderComp  onClick={toggleIsExpanded}>{isExpanded ? "-" : "+"}</GridExpanderComp>
          </GridWrapper>
        </TableWrapper>
        <MapWrapper isExpanded={isExpanded}>
          <Map    
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBWjEJbDvBvWtKFaV6Nf_1HCPZnJTmWHDQ&v=3.exp&libraries=geometry,drawing,places&language=iw"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%`, borderRadius: `8px` }} />}
          />  
        </MapWrapper>
      </Wrapper>
    </FindSessionComp>
  )
}