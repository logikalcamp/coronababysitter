import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import moment from 'moment';

import GridComp from '../Grid';
import {Map} from './Map';
import {BASE_URL} from '../../constants'

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

  position: relative;
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
  const [columnDefs] = useState([
    { 
      headerName: "תאריך",
      field: "date",
      valueFormatter: (params) => {
        const startTime = moment(params.value);
        return startTime.format("DD-MM-YY");
      }
    },
    { 
      headerName: "איש קשר",
      field: "contact"
    },
    {
      headerName: "שעות ההתנדבות",
      field: "sessionHours",
      valueGetter: (params) => {
        let {startTime, endTime} = params.data;

        startTime = moment(startTime);
        endTime = moment(endTime);

        return endTime.format("H:mm") + ' - ' + startTime.format("H:mm");
      }
    }
  ]);

  return (
    <GridComp 
      columnDefs={columnDefs}
      rowData={props.availableSessions}
      onRowClicked={props.handleRowClicked}
    />
  )
};

export const FindSession = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 32.344084 , lng: 34.870139});

  useEffect(() => {
    Axios.get(BASE_URL+'/api/session/getavailablesessions/5e7ca72c343daa68c8d7277f').then(result => {
      setAvailableSessions(result.data);
    })
  }, []);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  const handleRowClicked = (event) => {
    const {lat, lon} = event.data.doctor_o[0];

    setMapCenter({lat: lat, lng: lon});
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
            <FindSessionsGrid 
              availableSessions={availableSessions}
              handleRowClicked={handleRowClicked}
            />
            <GridExpanderComp  onClick={toggleIsExpanded}>{isExpanded ? "-" : "+"}</GridExpanderComp>
          </GridWrapper>
        </TableWrapper>
        <MapWrapper isExpanded={isExpanded}>
          <Map 
            ownLocation={{lat: 32.344084 , lng: 34.870139}}
            mapCenter={mapCenter}
            availableSessions={availableSessions}
          />
        </MapWrapper>
      </Wrapper>
    </FindSessionComp>
  )
}