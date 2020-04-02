import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

import {FindSessionsGrid} from './FindSessionGrid';
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
//#endregion

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

  const handleDoubleClicked	 = (event) => {
    const {lat, lon} = event.data.doctor_o[0];

    setMapCenter({lat: lat, lng: lon});
  }

  const openSessionDetails = (event) => {
    console.log(event);
  }

  return (
    <FindSessionComp>
      <Wrapper>
        <TableWrapper isExpanded={isExpanded}>
          <FindSessionsGrid
            isExpanded={isExpanded}
            onExpanderClick={toggleIsExpanded}
            onDoubleClicked={handleDoubleClicked}
            openSessionDetails={openSessionDetails}

            availableSessions={availableSessions}
          />
        </TableWrapper>
        <MapWrapper isExpanded={isExpanded}>
          <Map 
            ownLocation={{lat: 32.344084 , lng: 34.870139}}
            mapCenter={mapCenter}
            openSessionDetails={openSessionDetails}

            availableSessions={availableSessions}
          />
        </MapWrapper>
      </Wrapper>
    </FindSessionComp>
  )
}